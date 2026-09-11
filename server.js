// server.js — Servidor HTTP puro (sem framework) + API REST + arquivos estáticos
const http = require("node:http");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");
const db = require("./db");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

// ---------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------
function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) req.destroy(); // limite simples anti-abuso
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("JSON inválido"));
      }
    });
    req.on("error", reject);
  });
}

function hashSenha(senha, salt) {
  return crypto.scryptSync(senha, salt, 64).toString("hex");
}

async function criarSessao(usuarioId) {
  const token = crypto.randomBytes(32).toString("hex");
  await db.run("INSERT INTO sessoes (token, usuario_id) VALUES (?, ?)", [token, usuarioId]);
  return token;
}

async function usuarioDoToken(req) {
  const auth = req.headers["authorization"] || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return null;
  const row = await db.get(
    `SELECT u.id, u.nome, u.email FROM sessoes s
     JOIN usuarios u ON u.id = s.usuario_id
     WHERE s.token = ?`,
    [token]
  );
  return row || null;
}

async function exigirAuth(req, res) {
  const user = await usuarioDoToken(req);
  if (!user) {
    sendJson(res, 401, { erro: "Faça login para continuar." });
    return null;
  }
  return user;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function serveStatic(res, pathname) {
  let filePath = pathname === "/" ? "/index.html" : pathname;
  filePath = path.normalize(filePath).replace(/^(\.\.[/\\])+/, "");
  const fullPath = path.join(PUBLIC_DIR, filePath);
  if (!fullPath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end("Proibido");
  }
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end("<h1>404</h1><p>Página não encontrada. <a href='/'>Voltar</a></p>");
    }
    const ext = path.extname(fullPath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

// ---------------------------------------------------------------
// Rotas da API
// ---------------------------------------------------------------
const rotas = [];
function rota(method, regex, handler) {
  rotas.push({ method, regex, handler });
}

// Cadastro
rota("POST", /^\/api\/cadastro$/, async (req, res) => {
  const { nome, email, senha } = await readBody(req);
  if (!nome || !email || !senha || senha.length < 4) {
    return sendJson(res, 400, { erro: "Preencha nome, e-mail e uma senha com pelo menos 4 caracteres." });
  }
  const existe = await db.get("SELECT id FROM usuarios WHERE email = ?", [email.toLowerCase().trim()]);
  if (existe) return sendJson(res, 409, { erro: "Já existe uma conta com esse e-mail." });

  const nomeLimpo = nome.trim();
  const emailLimpo = email.toLowerCase().trim();
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashSenha(senha, salt);
  const r = await db.run("INSERT INTO usuarios (nome, email, senha_hash, senha_salt) VALUES (?, ?, ?, ?)", [
    nomeLimpo,
    emailLimpo,
    hash,
    salt,
  ]);
  const usuarioId = Number(r.lastInsertRowid);
  const token = await criarSessao(usuarioId);
  sendJson(res, 201, { token, usuario: { id: usuarioId, nome: nomeLimpo, email: emailLimpo } });
});

// Login
rota("POST", /^\/api\/login$/, async (req, res) => {
  const { email, senha } = await readBody(req);
  const user = await db.get("SELECT * FROM usuarios WHERE email = ?", [(email || "").toLowerCase().trim()]);
  if (!user) return sendJson(res, 401, { erro: "E-mail ou senha incorretos." });
  const hash = hashSenha(senha || "", user.senha_salt);
  if (hash !== user.senha_hash) return sendJson(res, 401, { erro: "E-mail ou senha incorretos." });
  const token = await criarSessao(user.id);
  sendJson(res, 200, { token, usuario: { id: user.id, nome: user.nome, email: user.email } });
});

// Usuário logado
rota("GET", /^\/api\/me$/, async (req, res) => {
  const user = await exigirAuth(req, res);
  if (!user) return;
  sendJson(res, 200, { usuario: user });
});

// Lista de trilhas (com contagem de lições e progresso do usuário, se logado)
rota("GET", /^\/api\/trilhas$/, async (req, res) => {
  const user = await usuarioDoToken(req);
  const trilhas = await db.all("SELECT * FROM trilhas ORDER BY ordem");
  const resultado = [];
  for (const t of trilhas) {
    const total = (await db.get("SELECT COUNT(*) AS n FROM licoes WHERE trilha_id = ?", [t.id])).n;
    let concluidas = 0;
    if (user) {
      concluidas = (
        await db.get(
          `SELECT COUNT(*) AS n FROM progresso p
           JOIN licoes l ON l.id = p.licao_id
           WHERE p.usuario_id = ? AND l.trilha_id = ?`,
          [user.id, t.id]
        )
      ).n;
    }
    resultado.push({ ...t, total_licoes: total, licoes_concluidas: concluidas });
  }
  sendJson(res, 200, { trilhas: resultado });
});

// Detalhe de uma trilha + módulos (lições) + seções + atividade + progresso
//
// Cada lição volta com o array `secoes` já ordenado — é o conteúdo do módulo,
// dividido em introdução, explicações, exemplo, dica e resumo — e com as
// `questoes` da atividade que fecha o módulo.
//
// Tudo vem junto numa requisição só porque a trilha é uma tela só: a pessoa
// percorre as seções do módulo e já responde a atividade ali mesmo, sem
// esperar carregamento a cada passo (importante: a persona usa 3G/4G).
// O campo `correta` das alternativas NUNCA vai para o cliente — a correção
// acontece só no servidor, em POST /api/licoes/:id/responder.
rota("GET", /^\/api\/trilhas\/(\d+)$/, async (req, res, params) => {
  const trilhaId = Number(params[0]);
  const trilha = await db.get("SELECT * FROM trilhas WHERE id = ?", [trilhaId]);
  if (!trilha) return sendJson(res, 404, { erro: "Trilha não encontrada." });

  const user = await usuarioDoToken(req);
  const licoes = await db.all("SELECT * FROM licoes WHERE trilha_id = ? ORDER BY ordem", [trilhaId]);

  let concluidasSet = new Set();
  if (user) {
    const rows = await db.all(
      `SELECT licao_id FROM progresso WHERE usuario_id = ? AND licao_id IN (
         SELECT id FROM licoes WHERE trilha_id = ?
       )`,
      [user.id, trilhaId]
    );
    concluidasSet = new Set(rows.map((r) => r.licao_id));
  }

  // Seções de todos os módulos da trilha, numa consulta só
  const secoes = await db.all(
    `SELECT s.id, s.licao_id, s.tipo, s.titulo, s.conteudo, s.ordem
     FROM secoes s JOIN licoes l ON l.id = s.licao_id
     WHERE l.trilha_id = ? ORDER BY s.licao_id, s.ordem, s.id`,
    [trilhaId]
  );
  const secoesPorLicao = new Map();
  secoes.forEach((s) => {
    if (!secoesPorLicao.has(s.licao_id)) secoesPorLicao.set(s.licao_id, []);
    secoesPorLicao.get(s.licao_id).push({
      id: s.id,
      tipo: s.tipo,
      titulo: s.titulo,
      conteudo: s.conteudo,
      ordem: s.ordem,
    });
  });

  // Questões e alternativas da trilha inteira em duas consultas só
  const questoes = await db.all(
    `SELECT q.id, q.licao_id, q.enunciado, q.ordem
     FROM questoes q JOIN licoes l ON l.id = q.licao_id
     WHERE l.trilha_id = ? ORDER BY q.licao_id, q.ordem, q.id`,
    [trilhaId]
  );
  const alternativas = await db.all(
    `SELECT a.id, a.questao_id, a.texto, a.ordem
     FROM alternativas a
     JOIN questoes q ON q.id = a.questao_id
     JOIN licoes l ON l.id = q.licao_id
     WHERE l.trilha_id = ? ORDER BY a.questao_id, a.ordem, a.id`,
    [trilhaId]
  );

  // O que esse usuário já respondeu (pra atividade abrir já preenchida)
  const respostasPorQuestao = new Map();
  if (user) {
    const rows = await db.all(
      `SELECT r.questao_id, r.alternativa_id, r.correta
       FROM respostas_usuario r
       JOIN questoes q ON q.id = r.questao_id
       JOIN licoes l ON l.id = q.licao_id
       WHERE r.usuario_id = ? AND l.trilha_id = ?`,
      [user.id, trilhaId]
    );
    rows.forEach((r) => respostasPorQuestao.set(r.questao_id, r));
  }

  const altsPorQuestao = new Map();
  alternativas.forEach((a) => {
    if (!altsPorQuestao.has(a.questao_id)) altsPorQuestao.set(a.questao_id, []);
    altsPorQuestao.get(a.questao_id).push({ id: a.id, texto: a.texto, ordem: a.ordem });
  });

  const questoesPorLicao = new Map();
  questoes.forEach((q) => {
    const resposta = respostasPorQuestao.get(q.id);
    if (!questoesPorLicao.has(q.licao_id)) questoesPorLicao.set(q.licao_id, []);
    questoesPorLicao.get(q.licao_id).push({
      id: q.id,
      enunciado: q.enunciado,
      ordem: q.ordem,
      alternativas: altsPorQuestao.get(q.id) || [],
      respondida: !!resposta,
      alternativa_escolhida: resposta ? resposta.alternativa_id : null,
      acertou: resposta ? !!resposta.correta : null,
    });
  });

  const licoesComStatus = licoes.map((l) => ({
    ...l,
    concluida: concluidasSet.has(l.id),
    secoes: secoesPorLicao.get(l.id) || [],
    questoes: questoesPorLicao.get(l.id) || [],
  }));
  sendJson(res, 200, { trilha, licoes: licoesComStatus });
});

// Responder a atividade de uma lição (todas as questões de uma vez).
// Pode ser refeita quantas vezes a pessoa quiser: a resposta é sobrescrita.
rota("POST", /^\/api\/licoes\/(\d+)\/responder$/, async (req, res, params) => {
  const user = await exigirAuth(req, res);
  if (!user) return;

  const licaoId = Number(params[0]);
  const licao = await db.get("SELECT id FROM licoes WHERE id = ?", [licaoId]);
  if (!licao) return sendJson(res, 404, { erro: "Lição não encontrada." });

  const { respostas } = await readBody(req);
  if (!Array.isArray(respostas) || !respostas.length) {
    return sendJson(res, 400, { erro: "Escolha uma resposta em cada pergunta antes de verificar." });
  }

  const questoesDaLicao = await db.all("SELECT id FROM questoes WHERE licao_id = ? ORDER BY ordem, id", [licaoId]);
  if (!questoesDaLicao.length) {
    return sendJson(res, 400, { erro: "Essa lição ainda não tem atividade." });
  }
  const idsDaLicao = new Set(questoesDaLicao.map((q) => q.id));

  // 1) Validar: cada questão precisa ser mesmo dessa lição, sem repetição,
  //    e a alternativa escolhida precisa pertencer àquela questão
  const escolhas = new Map();
  for (const r of respostas) {
    const questaoId = Number(r && r.questao_id);
    const alternativaId = Number(r && r.alternativa_id);
    if (!idsDaLicao.has(questaoId)) {
      return sendJson(res, 400, { erro: "Essa pergunta não faz parte desta lição." });
    }
    const alt = await db.get("SELECT id, correta FROM alternativas WHERE id = ? AND questao_id = ?", [
      alternativaId,
      questaoId,
    ]);
    if (!alt) return sendJson(res, 400, { erro: "Resposta inválida para uma das perguntas." });
    escolhas.set(questaoId, alt);
  }

  if (escolhas.size !== idsDaLicao.size) {
    return sendJson(res, 400, { erro: "Escolha uma resposta em cada pergunta antes de verificar." });
  }

  // 2) Gravar (refazer sobrescreve a resposta anterior)
  const resultados = [];
  for (const q of questoesDaLicao) {
    const alt = escolhas.get(q.id);
    const acertou = alt.correta ? 1 : 0;
    await db.run(
      `INSERT INTO respostas_usuario (usuario_id, questao_id, alternativa_id, correta)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(usuario_id, questao_id) DO UPDATE SET
         alternativa_id = excluded.alternativa_id,
         correta = excluded.correta,
         respondido_em = CURRENT_TIMESTAMP`,
      [user.id, q.id, alt.id, acertou]
    );
    resultados.push({ questao_id: q.id, correta: !!acertou });
  }

  // 3) Acertou tudo => lição concluída automaticamente.
  //    Se errar numa refeita, o que já foi conquistado não é tirado dela.
  const todasCorretas = resultados.every((r) => r.correta);
  if (todasCorretas) {
    await db.run("INSERT OR IGNORE INTO progresso (usuario_id, licao_id) VALUES (?, ?)", [user.id, licaoId]);
  }
  const concluida = !!(await db.get("SELECT 1 AS ok FROM progresso WHERE usuario_id = ? AND licao_id = ?", [
    user.id,
    licaoId,
  ]));

  sendJson(res, 200, { resultados, todas_corretas: todasCorretas, concluida });
});

// Marcar / desmarcar lição como concluída
rota("POST", /^\/api\/progresso$/, async (req, res) => {
  const user = await exigirAuth(req, res);
  if (!user) return;
  const { licao_id } = await readBody(req);
  if (!licao_id) return sendJson(res, 400, { erro: "Não foi possível identificar a lição. Volte e tente de novo." });
  await db.run("INSERT OR IGNORE INTO progresso (usuario_id, licao_id) VALUES (?, ?)", [user.id, licao_id]);
  sendJson(res, 200, { ok: true });
});

rota("DELETE", /^\/api\/progresso\/(\d+)$/, async (req, res, params) => {
  const user = await exigirAuth(req, res);
  if (!user) return;
  await db.run("DELETE FROM progresso WHERE usuario_id = ? AND licao_id = ?", [user.id, Number(params[0])]);
  sendJson(res, 200, { ok: true });
});

// Resumo para o dashboard
rota("GET", /^\/api\/resumo$/, async (req, res) => {
  const user = await exigirAuth(req, res);
  if (!user) return;
  const totalLicoes = (await db.get("SELECT COUNT(*) AS n FROM licoes")).n;
  const concluidas = (await db.get("SELECT COUNT(*) AS n FROM progresso WHERE usuario_id = ?", [user.id])).n;
  const percentual = totalLicoes ? Math.round((concluidas / totalLicoes) * 100) : 0;
  sendJson(res, 200, { total_licoes: totalLicoes, licoes_concluidas: concluidas, percentual });
});

// Comunidade — mural simples
// Cada post já vem com quantas respostas tem, pra mostrar "3 respostas" na
// listagem. Os comentários em si só são buscados quando a pessoa abre o post.
rota("GET", /^\/api\/comunidade$/, async (_req, res) => {
  const posts = await db.all(
    `SELECT p.id, p.conteudo, p.criado_em, u.nome AS autor,
            (SELECT COUNT(*) FROM comentarios c WHERE c.post_id = p.id) AS total_comentarios
     FROM posts p JOIN usuarios u ON u.id = p.usuario_id
     ORDER BY p.id DESC LIMIT 50`
  );
  sendJson(res, 200, { posts });
});

rota("POST", /^\/api\/comunidade$/, async (req, res) => {
  const user = await exigirAuth(req, res);
  if (!user) return;
  const { conteudo } = await readBody(req);
  if (!conteudo || !conteudo.trim()) return sendJson(res, 400, { erro: "Escreva algo antes de publicar." });
  await db.run("INSERT INTO posts (usuario_id, conteudo) VALUES (?, ?)", [user.id, conteudo.trim().slice(0, 500)]);
  sendJson(res, 201, { ok: true });
});

// Respostas de um post (carregadas só quando a pessoa abre o post)
rota("GET", /^\/api\/comunidade\/(\d+)\/comentarios$/, async (_req, res, params) => {
  const postId = Number(params[0]);
  const post = await db.get("SELECT id FROM posts WHERE id = ?", [postId]);
  if (!post) return sendJson(res, 404, { erro: "Essa publicação não existe mais." });

  const comentarios = await db.all(
    `SELECT c.id, c.conteudo, c.criado_em, u.nome AS autor
     FROM comentarios c JOIN usuarios u ON u.id = c.usuario_id
     WHERE c.post_id = ? ORDER BY c.id ASC`,
    [postId]
  );
  sendJson(res, 200, { comentarios });
});

// Responder a um post
rota("POST", /^\/api\/comunidade\/(\d+)\/comentarios$/, async (req, res, params) => {
  const user = await exigirAuth(req, res);
  if (!user) return;

  const postId = Number(params[0]);
  const post = await db.get("SELECT id FROM posts WHERE id = ?", [postId]);
  if (!post) return sendJson(res, 404, { erro: "Essa publicação não existe mais." });

  const { conteudo } = await readBody(req);
  if (!conteudo || !conteudo.trim()) return sendJson(res, 400, { erro: "Escreva sua resposta antes de enviar." });

  await db.run("INSERT INTO comentarios (post_id, usuario_id, conteudo) VALUES (?, ?, ?)", [
    postId,
    user.id,
    conteudo.trim().slice(0, 500),
  ]);
  sendJson(res, 201, { ok: true });
});

// ---------------------------------------------------------------
// Servidor HTTP
// ---------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname.startsWith("/api/")) {
    for (const r of rotas) {
      if (r.method !== req.method) continue;
      const m = pathname.match(r.regex);
      if (m) {
        try {
          return await r.handler(req, res, m.slice(1));
        } catch (e) {
          console.error(e);
          return sendJson(res, 500, { erro: "Algo deu errado do nosso lado. Tente de novo em instantes." });
        }
      }
    }
    return sendJson(res, 404, { erro: "Não encontramos essa página." });
  }

  serveStatic(res, pathname);
});

db.iniciar()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`\n  Sistema Jovem Aprendiz rodando em http://localhost:${PORT}\n`);
    });
  })
  .catch((err) => {
    console.error("Erro ao iniciar o banco de dados:", err);
    process.exit(1);
  });
