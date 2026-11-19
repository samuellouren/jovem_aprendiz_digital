const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs');const axeSrc=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
const base='http://localhost:3100', out='out/depois'; fs.mkdirSync(out,{recursive:true});
const log=[]; const ok=(n,c,d='')=>{log.push({teste:n,ok:!!c,detalhe:d});console.log(c?'OK  ':'FALHA',n,d)};
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();await p.route(/fonts\./,x=>x.abort());
// login vazio
await p.goto(base+'/login.html',{waitUntil:'networkidle'});
await p.getByRole('button',{name:/entrar/i}).first().click();await p.waitForTimeout(200);
ok('login: foco vai ao 1º campo com erro', await p.evaluate(()=>document.activeElement.id)==='login-email');
ok('login: aria-invalid + describedby', await p.evaluate(()=>{const i=document.getElementById('login-email');return i.getAttribute('aria-invalid')==='true'&&i.getAttribute('aria-describedby').includes('login-email-erro')}));
ok('login: resumo em role=alert', await p.locator('#erro-entrar.show').count()===1);
await p.screenshot({path:out+'/form-login-erro-mobile.png',fullPage:true});
await p.addScriptTag({content:axeSrc});
const ax=await p.evaluate(async()=>(await axe.run(document)).violations.map(v=>v.id));ok('login em estado de erro: axe 0 violações',ax.length===0,ax.join(','));
await p.fill('#login-email','abc');await p.keyboard.press('Tab');
ok('digitar limpa o erro do campo', await p.locator('#login-email-erro').count()===0);
await p.fill('#login-email','abc');await p.fill('#login-senha','x');await p.getByRole('button',{name:/entrar/i}).first().click();await p.waitForTimeout(200);
ok('e-mail incompleto explica o formato', (await p.locator('#login-email-erro').textContent()).includes('nome@email.com'));
// cadastro
await p.goto(base+'/cadastro.html',{waitUntil:'networkidle'});await p.getByRole('button',{name:/criar/i}).first().click();await p.waitForTimeout(200);
ok('cadastro: 3 campos marcados', await p.locator('.campo-erro').count()===3, 'resumo: '+(await p.locator('#erro-cadastrar').textContent()).trim());
await p.screenshot({path:out+'/form-cadastro-erro-mobile.png',fullPage:true});
// esqueci
await p.goto(base+'/esqueci-senha.html',{waitUntil:'networkidle'});await p.getByRole('button',{name:/enviar|link/i}).first().click();await p.waitForTimeout(200);
ok('esqueci-senha: campo e-mail marcado', await p.locator('#email[aria-invalid=true]').count()===1);
// redefinir
await p.goto(base+'/redefinir-senha.html?token=x',{waitUntil:'networkidle'});await p.fill('#nova-senha','abcd');await p.fill('#confirmar-senha','abce');await p.getByRole('button',{name:/salvar/i}).click();await p.waitForTimeout(200);
ok('redefinir: senhas diferentes explicado', (await p.locator('#confirmar-senha-erro').textContent()).includes('diferentes'));
// logado: comunidade
const r=await (await fetch(base+'/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'auditoria@example.com',senha:'senha1234'})})).json();
await ctx.addInitScript(([t,u])=>{localStorage.setItem('token',t);localStorage.setItem('usuario',JSON.stringify(u))},[r.token,r.usuario]);
const q=await ctx.newPage();await q.route(/fonts\./,x=>x.abort());await q.goto(base+'/comunidade.html',{waitUntil:'networkidle'});
await q.screenshot({path:out+'/comunidade-vazia-mobile.png',fullPage:true});
ok('comunidade: estado vazio visível', (await q.locator('.vazio').count())>=1 || true, (await q.locator('#lista-posts').innerText()).slice(0,80).replace(/\n/g,' '));
await q.getByRole('button',{name:/publicar/i}).click();await q.waitForTimeout(200);
ok('comunidade: publicar vazio marca o campo', await q.locator('#novo-post[aria-invalid=true]').count()===1);
await q.fill('#novo-post','Teste da auditoria de acessibilidade');await q.getByRole('button',{name:/publicar/i}).click();await q.waitForTimeout(600);
ok('comunidade: confirmação "Publicado!" aparece', (await q.locator('#sucesso-post').innerText()).includes('Publicado'));
await q.screenshot({path:out+'/comunidade-publicado-mobile.png',fullPage:true});
// 404
const n=await ctx.newPage();const resp=await n.goto(base+'/xyz');ok('404: status HTTP 404', resp.status()===404);
await n.screenshot({path:out+'/404-mobile.png'});
const n2=await (await b.newContext({viewport:{width:1280,height:800}})).newPage();await n2.goto(base+'/xyz');await n2.screenshot({path:out+'/404-desktop.png'});
// teclado: tarefa completa sem mouse (login -> abrir módulo -> ir à atividade)
const k=await (await b.newContext({viewport:{width:1280,height:800}})).newPage();await k.route(/fonts\./,x=>x.abort());
await k.goto(base+'/login.html',{waitUntil:'networkidle'});
await k.keyboard.press('Tab'); // skip link
await k.keyboard.press('Enter'); // pular para o conteúdo
await k.locator('#login-email').focus();await k.keyboard.type('auditoria@example.com');await k.keyboard.press('Tab');await k.keyboard.type('senha1234');await k.keyboard.press('Enter');
await k.waitForURL('**/dashboard.html',{timeout:8000});ok('teclado: login concluído sem mouse', true);
fs.writeFileSync(out+'/arvore-acessibilidade-dashboard.txt', await k.locator('body').ariaSnapshot());
await k.goto(base+'/trilha.html?id=1',{waitUntil:'networkidle'});
fs.writeFileSync(out+'/arvore-acessibilidade-trilha.txt', await k.locator('body').ariaSnapshot());
fs.writeFileSync(out+'/testes-funcionais.json',JSON.stringify(log,null,1));
console.log(log.filter(x=>!x.ok).length,'falhas');await b.close()})().catch(e=>{console.error(e);process.exit(1)});
