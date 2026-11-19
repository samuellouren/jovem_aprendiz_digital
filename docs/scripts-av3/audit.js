// Uso: node audit.js <rotulo> <urlBase>  -> gera /home/claude/audit/out/<rotulo>/*
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const [,, rotulo, base] = process.argv;
const out = path.join(__dirname, 'out', rotulo); fs.mkdirSync(out, { recursive: true });

const PAGINAS = [
  ['index', '/', false], ['login', '/login.html', false], ['cadastro', '/cadastro.html', false],
  ['esqueci-senha', '/esqueci-senha.html', false], ['redefinir-senha', '/redefinir-senha.html?token=x', false],
  ['verificar-email', '/verificar-email.html?token=x', false],
  ['trilha-modulo', '/trilha.html?id=1', true, async (p) => { await p.click('.modulo-no'); await p.waitForTimeout(300); }],
  ['trilha-atividade', '/trilha.html?id=1', true, async (p) => { await p.click('.modulo-no'); await p.waitForTimeout(200); for (let i = 0; i < 8; i++) { const b = p.locator('#secao-nav .btn-proximo'); const t = await b.textContent(); await b.click(); await p.waitForTimeout(150); if (/atividade/i.test(t)) break; } }],
  ['trilha-atividade-erro', '/trilha.html?id=1', true, async (p) => { await p.click('.modulo-no'); await p.waitForTimeout(200); for (let i = 0; i < 8; i++) { const b = p.locator('#secao-nav .btn-proximo'); const t = await b.textContent(); await b.click(); await p.waitForTimeout(150); if (/atividade/i.test(t)) break; } const v = p.getByRole('button', { name: /verificar/i }); await v.click(); await p.waitForTimeout(300); }],
  ['dashboard', '/dashboard.html', true], ['comunidade', '/comunidade.html', true],
  ['trilha', '/trilha.html?id=1', true], ['404', '/pagina-que-nao-existe', false],
];

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const r = await (await fetch(base + '/api/cadastro', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ nome: 'Teste Auditoria', email: 'aud' + Date.now() + '@example.com', senha: 'senha1234' }) })).json();
  const resultado = { axe: {}, zoom: {}, toque: {}, extra: {} };

  async function nova(w, h) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    await ctx.addInitScript(([t, u]) => { try { localStorage.setItem('token', t); localStorage.setItem('usuario', JSON.stringify(u)); } catch {} }, [r.token, r.usuario]);
    return ctx;
  }
  async function abrir(ctx, url, auth, acao) {
    const p = await ctx.newPage();
    if (!auth) await p.addInitScript(() => { try { localStorage.clear(); } catch {} });
    await p.route(/fonts\.(googleapis|gstatic)\.com/, (rt) => rt.abort());
    await p.goto(base + url, { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
    if (acao) await acao(p);
    return p;
  }

  // 1) axe — desktop 1280 e mobile 390
  for (const [nome, url, auth, acao] of PAGINAS) {
    resultado.axe[nome] = {};
    for (const [vp, w, h] of [['desktop', 1280, 800], ['mobile', 390, 844]]) {
      const ctx = await nova(w, h); const p = await abrir(ctx, url, auth, acao);
      await p.addScriptTag({ content: axeSrc });
      const res = await p.evaluate(async () => await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
      resultado.axe[nome][vp] = {
        violacoes: res.violations.map(v => ({ id: v.id, impacto: v.impact, ajuda: v.help, nos: v.nodes.length, exemplo: v.nodes[0] && v.nodes[0].target.join(' ') })),
        passou: res.passes.length, incompletos: res.incomplete.map(v => v.id),
      };
      if (vp === 'desktop') await p.screenshot({ path: path.join(out, `desktop-${nome}.png`), fullPage: true });
      if (vp === 'mobile') await p.screenshot({ path: path.join(out, `mobile-${nome}.png`), fullPage: true });
      await ctx.close();
    }
  }

  // 2) Zoom 200% (1280px -> 640 CSS px) e reflow 400% (320 CSS px): sem rolagem horizontal e sem corte
  for (const [nome, url, auth, acao] of PAGINAS) {
    resultado.zoom[nome] = {};
    for (const [rot, w] of [['200%', 640], ['400%', 320]]) {
      const ctx = await nova(w, 720); const p = await abrir(ctx, url, auth, acao);
      const info = await p.evaluate(() => {
        const de = document.documentElement;
        const estoura = de.scrollWidth - de.clientWidth;
        const cortados = [];
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          const b = el.getBoundingClientRect(); if (!b.width) continue;
          if (b.right > de.clientWidth + 1 && !el.closest('[hidden]')) { cortados.push((el.tagName + '.' + (el.className && el.className.baseVal === undefined ? el.className : '')).slice(0, 60)); }
          if ((cs.overflowX === 'hidden' || cs.textOverflow === 'ellipsis') && el.scrollWidth > el.clientWidth + 1 && el.textContent.trim()) cortados.push('texto-cortado:' + el.tagName + '.' + el.className);
        }
        return { estouro_px: estoura, cortados: [...new Set(cortados)].slice(0, 8) };
      });
      resultado.zoom[nome][rot] = info;
      if (rot === '200%') await p.screenshot({ path: path.join(out, `zoom200-${nome}.png`), fullPage: false });
      await ctx.close();
    }
  }

  // 3) Alvos de toque no celular (>=44px; links dentro de parágrafo são exceção da WCAG 2.5.8)
  for (const [nome, url, auth, acao] of PAGINAS) {
    const ctx = await nova(390, 844); const p = await abrir(ctx, url, auth, acao);
    resultado.toque[nome] = await p.evaluate(() => {
      const sel = 'a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=tab],summary';
      const ruins = [];
      for (const el of document.querySelectorAll(sel)) {
        const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[hidden]')) continue;
        if (el.classList.contains('skip-link') || el.classList.contains('sr-only')) continue;
        let b = el.getBoundingClientRect();
        if (el.type === 'checkbox' || el.type === 'radio') { const l = el.closest('label') || (el.id && document.querySelector(`label[for="${el.id}"]`)); if (l) b = l.getBoundingClientRect(); }
        if (!b.width || !b.height) continue;
        const inline = el.tagName === 'A' && el.closest('p,li,small') && cs.display === 'inline';
        if (inline) continue;
        if (b.width < 43.5 || b.height < 43.5) ruins.push({ el: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className ? '.' + String(el.className).split(' ')[0] : ''), txt: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30), w: Math.round(b.width), h: Math.round(b.height) });
      }
      return ruins;
    });
    await ctx.close();
  }

  // 4) Extras: nomes acessíveis (proxy de leitor de tela) e labels
  for (const [nome, url, auth, acao] of PAGINAS) {
    const ctx = await nova(1280, 800); const p = await abrir(ctx, url, auth, acao);
    resultado.extra[nome] = await p.evaluate(() => {
      const semLabel = [...document.querySelectorAll('input:not([type=hidden]),select,textarea')].filter(i => !(i.labels && i.labels.length) && !i.getAttribute('aria-label') && !i.getAttribute('aria-labelledby')).map(i => i.id || i.name);
      const semDescricaoErro = [...document.querySelectorAll('[id*=erro],[id*=msg],.form-msg')].filter(e => !e.hasAttribute('role') && !e.hasAttribute('aria-live')).map(e => e.id || e.className);
      return { lang: document.documentElement.lang, titulo: document.title, h1: document.querySelectorAll('h1').length, landmarks: { main: !!document.querySelector('main'), nav: !!document.querySelector('nav'), header: !!document.querySelector('header') }, semLabel, semDescricaoErro };
    });
    await ctx.close();
  }
  fs.writeFileSync(path.join(out, 'resultado.json'), JSON.stringify(resultado, null, 1));
  await browser.close();

  // resumo
  let tv = 0; for (const n in resultado.axe) for (const v in resultado.axe[n]) tv += resultado.axe[n][v].violacoes.length;
  console.log('violacoes axe (soma paginas x viewports):', tv);
  for (const n in resultado.axe) for (const v in resultado.axe[n]) for (const x of resultado.axe[n][v].violacoes) console.log(' ', n, v, x.id, x.impacto, x.nos, x.exemplo);
  for (const n in resultado.zoom) for (const z in resultado.zoom[n]) { const i = resultado.zoom[n][z]; if (i.estouro_px > 0 || i.cortados.length) console.log(' zoom', n, z, JSON.stringify(i)); }
  for (const n in resultado.toque) if (resultado.toque[n].length) console.log(' toque', n, JSON.stringify(resultado.toque[n]));
  for (const n in resultado.extra) { const e = resultado.extra[n]; if (e.semLabel.length || e.h1 !== 1 || e.semDescricaoErro.length) console.log(' extra', n, JSON.stringify(e)); }
})();
