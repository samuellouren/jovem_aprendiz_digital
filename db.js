// db.js — Banco de dados via libSQL (@libsql/client)
//
// Funciona em dois modos, sem mudar nenhuma linha de SQL:
//  - LOCAL (padrão): grava em data/aprendiz.db, não precisa de conta em nada
//  - TURSO (produção): defina TURSO_DATABASE_URL e TURSO_AUTH_TOKEN
//    (veja README.md -> "Usando com Turso")
const { createClient } = require("@libsql/client");
const path = require("node:path");
const fs = require("node:fs");

// Todo o texto do curso (trilhas, seções dos módulos e atividades) mora
// em conteudo.js. Aqui ficam só o esquema e a lógica de semear/migrar.
const { TRILHAS, SECOES, ATIVIDADES } = require("./conteudo");

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const usandoTurso = !!process.env.TURSO_DATABASE_URL;

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || `file:${path.join(dataDir, "aprendiz.db")}`,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

console.log(usandoTurso ? "Conectado ao Turso (banco remoto)." : "Usando banco local (data/aprendiz.db).");

// ---------------------------------------------------------------
// Helpers — sempre retornam objetos simples (seguros para JSON)
// ---------------------------------------------------------------
function linhaParaObjeto(rs, linha) {
  const obj = {};
  rs.columns.forEach((col, i) => (obj[col] = linha[i]));
  return obj;
}

async function run(sql, args = []) {
  const rs = await client.execute({ sql, args });
  return { lastInsertRowid: rs.lastInsertRowid, changes: rs.rowsAffected };
}

async function get(sql, args = []) {
  const rs = await client.execute({ sql, args });
  if (!rs.rows.length) return undefined;
  return linhaParaObjeto(rs, rs.rows[0]);
}

async function all(sql, args = []) {
  const rs = await client.execute({ sql, args });
  return rs.rows.map((linha) => linhaParaObjeto(rs, linha));
}

async function exec(sql) {
  await client.executeMultiple(sql);
}

// ---------------------------------------------------------------
// Esquema (roda sempre; CREATE IF NOT EXISTS é seguro de repetir)
// ---------------------------------------------------------------
async function criarTabelas() {
  await exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha_hash TEXT NOT NULL,
      senha_salt TEXT NOT NULL,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessoes (
      token TEXT PRIMARY KEY,
      usuario_id INTEGER NOT NULL,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS trilhas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      nivel TEXT,
      icone TEXT,
      ordem INTEGER
    );

    CREATE TABLE IF NOT EXISTS licoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      trilha_id INTEGER NOT NULL,
      titulo TEXT NOT NULL,
      conteudo TEXT NOT NULL,
      ordem INTEGER,
      FOREIGN KEY (trilha_id) REFERENCES trilhas(id) ON DELETE CASCADE
    );

    -- Seções que compõem o módulo de estudo de uma lição.
    -- tipo: introducao | explicacao | exemplo | dica | resumo
    CREATE TABLE IF NOT EXISTS secoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      licao_id INTEGER NOT NULL,
      tipo TEXT NOT NULL,
      titulo TEXT NOT NULL,
      conteudo TEXT NOT NULL,
      ordem INTEGER,
      FOREIGN KEY (licao_id) REFERENCES licoes(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_secoes_licao ON secoes(licao_id);

    CREATE TABLE IF NOT EXISTS progresso (
      usuario_id INTEGER NOT NULL,
      licao_id INTEGER NOT NULL,
      concluido_em TEXT DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (usuario_id, licao_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (licao_id) REFERENCES licoes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      conteudo TEXT NOT NULL,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );

    -- Respostas (comentários) de um post do mural da comunidade
    CREATE TABLE IF NOT EXISTS comentarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      conteudo TEXT NOT NULL,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_comentarios_post ON comentarios(post_id);

    -- Atividade de uma lição: perguntas de múltipla escolha
    CREATE TABLE IF NOT EXISTS questoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      licao_id INTEGER NOT NULL,
      enunciado TEXT NOT NULL,
      ordem INTEGER,
      FOREIGN KEY (licao_id) REFERENCES licoes(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS alternativas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      questao_id INTEGER NOT NULL,
      texto TEXT NOT NULL,
      correta INTEGER NOT NULL DEFAULT 0,
      ordem INTEGER,
      FOREIGN KEY (questao_id) REFERENCES questoes(id) ON DELETE CASCADE
    );

    -- Uma linha por (usuário, questão): refazer a atividade sobrescreve
    CREATE TABLE IF NOT EXISTS respostas_usuario (
      usuario_id INTEGER NOT NULL,
      questao_id INTEGER NOT NULL,
      alternativa_id INTEGER NOT NULL,
      correta INTEGER NOT NULL DEFAULT 0,
      respondido_em TEXT DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (usuario_id, questao_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (questao_id) REFERENCES questoes(id) ON DELETE CASCADE,
      FOREIGN KEY (alternativa_id) REFERENCES alternativas(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_questoes_licao ON questoes(licao_id);
    CREATE INDEX IF NOT EXISTS idx_alternativas_questao ON alternativas(questao_id);
  `);
}



// ---------------------------------------------------------------
// Seeds (cada um roda uma vez; é seguro chamar de novo)
// ---------------------------------------------------------------
async function semearTrilhas() {
  const jaTemTrilhas = await get("SELECT COUNT(*) AS n FROM trilhas");
  if (jaTemTrilhas.n > 0) return; // já semeado, não repete

  console.log("Semeando trilhas e lições iniciais...");

  for (const t of TRILHAS) {
    const r = await run(
      "INSERT INTO trilhas (titulo, descricao, nivel, icone, ordem) VALUES (?, ?, ?, ?, ?)",
      [t.titulo, t.descricao, t.nivel, t.icone, t.ordem]
    );
    const trilhaId = Number(r.lastInsertRowid);
    for (let idx = 0; idx < t.licoes.length; idx++) {
      const [titulo, conteudo] = t.licoes[idx];
      await run(
        "INSERT INTO licoes (trilha_id, titulo, conteudo, ordem) VALUES (?, ?, ?, ?)",
        [trilhaId, titulo, conteudo, idx + 1]
      );
    }
  }

  const eq = await run(
    "INSERT INTO usuarios (nome, email, senha_hash, senha_salt) VALUES (?, ?, ?, ?)",
    ["Equipe do Programa", "equipe@jovemaprendiz.local", "x", "x"]
  );
  await run("INSERT INTO posts (usuario_id, conteudo) VALUES (?, ?)", [
    Number(eq.lastInsertRowid),
    POST_BOAS_VINDAS,
  ]);
}

// Texto do post de boas-vindas. Fica numa constante porque a migração
// precisa reconhecer e substituir a versão antiga (que tinha emoji).
const POST_BOAS_VINDAS =
  "Bem-vinda(o)! Esse é o mural da turma — pode postar dúvidas, dicas ou o que aprendeu essa semana. Aqui ninguém julga pergunta 'básica'.";

// Semeia as seções de cada módulo. Roda separado dos outros seeds de
// propósito: um banco que já existia antes das seções recebe os módulos
// completos na próxima subida, sem perder progresso nem respostas.
async function semearSecoes() {
  const jaTemSecoes = await get("SELECT COUNT(*) AS n FROM secoes");
  if (jaTemSecoes.n > 0) return;

  console.log("Semeando as seções dos módulos...");

  let total = 0;
  for (const [tituloLicao, secoes] of Object.entries(SECOES)) {
    const licao = await get("SELECT id FROM licoes WHERE titulo = ?", [tituloLicao]);
    if (!licao) continue; // lição não existe nesse banco — segue o baile

    for (let i = 0; i < secoes.length; i++) {
      const [tipo, titulo, conteudo] = secoes[i];
      await run(
        "INSERT INTO secoes (licao_id, tipo, titulo, conteudo, ordem) VALUES (?, ?, ?, ?, ?)",
        [licao.id, tipo, titulo, conteudo, i + 1]
      );
      total++;
    }
  }
  console.log(`  ${total} seções criadas.`);
}

// Roda separado do seed das trilhas de propósito: assim um banco que já
// existia antes das atividades também recebe as perguntas na próxima subida.
async function semearAtividades() {
  const jaTemQuestoes = await get("SELECT COUNT(*) AS n FROM questoes");
  if (jaTemQuestoes.n > 0) return;

  console.log("Semeando atividades das lições...");

  for (const [tituloLicao, questoes] of Object.entries(ATIVIDADES)) {
    const licao = await get("SELECT id FROM licoes WHERE titulo = ?", [tituloLicao]);
    if (!licao) continue; // lição não existe nesse banco — segue o baile

    for (let q = 0; q < questoes.length; q++) {
      const { enunciado, alternativas } = questoes[q];
      const r = await run("INSERT INTO questoes (licao_id, enunciado, ordem) VALUES (?, ?, ?)", [
        licao.id,
        enunciado,
        q + 1,
      ]);
      const questaoId = Number(r.lastInsertRowid);
      for (let a = 0; a < alternativas.length; a++) {
        const [texto, correta] = alternativas[a];
        await run("INSERT INTO alternativas (questao_id, texto, correta, ordem) VALUES (?, ?, ?, ?)", [
          questaoId,
          texto,
          correta ? 1 : 0,
          a + 1,
        ]);
      }
    }
  }
}

// Deixa as seções gravadas iguais às de conteudo.js.
//
// Existe porque o texto dos módulos é revisado depois que o banco já
// está em uso — foi o caso da reescrita do módulo "Organizando arquivos
// e pastas" para o celular. `semearSecoes` só age em banco vazio, então
// sem isto um banco antigo continuaria mostrando o texto velho para
// sempre.
//
// Compara por (lição, ordem) e só escreve o que mudou: nada de apagar e
// recriar. O progresso é registrado por lição, e as respostas por questão
// — nenhum dos dois aponta para uma seção, então trocar o texto aqui não
// derruba nada do que a pessoa já fez.
async function sincronizarSecoes() {
  let mudancas = 0;

  for (const [tituloLicao, secoes] of Object.entries(SECOES)) {
    const licao = await get("SELECT id FROM licoes WHERE titulo = ?", [tituloLicao]);
    if (!licao) continue;

    const gravadas = await all("SELECT id, ordem, tipo, titulo, conteudo FROM secoes WHERE licao_id = ?", [licao.id]);
    if (!gravadas.length) continue; // banco novo: quem semeia é semearSecoes

    for (let i = 0; i < secoes.length; i++) {
      const [tipo, titulo, conteudo] = secoes[i];
      const ordem = i + 1;
      const atual = gravadas.find((s) => s.ordem === ordem);

      if (!atual) {
        // Seção nova no fim de um módulo que já existia
        await run("INSERT INTO secoes (licao_id, tipo, titulo, conteudo, ordem) VALUES (?, ?, ?, ?, ?)", [
          licao.id,
          tipo,
          titulo,
          conteudo,
          ordem,
        ]);
        mudancas++;
      } else if (atual.tipo !== tipo || atual.titulo !== titulo || atual.conteudo !== conteudo) {
        await run("UPDATE secoes SET tipo = ?, titulo = ?, conteudo = ? WHERE id = ?", [
          tipo,
          titulo,
          conteudo,
          atual.id,
        ]);
        mudancas++;
      }
    }

    // Sobras: seções que o módulo tinha e não tem mais. É o único DELETE
    // da migração, e ele só alcança texto de curso — nunca dado de usuário.
    for (const sobra of gravadas.filter((s) => s.ordem > secoes.length)) {
      await run("DELETE FROM secoes WHERE id = ?", [sobra.id]);
      mudancas++;
    }
  }

  return mudancas;
}

// ---------------------------------------------------------------
// Migração de conteúdo (idempotente e não-destrutiva)
//
// Um banco criado antes desta etapa tem emoji nos ícones das trilhas,
// a descrição curta antiga nas lições, o texto antigo das seções e
// questões desatualizadas. Aqui tudo isso é atualizado *no lugar*:
// nenhum DROP e nenhum DELETE de dado de usuário — progresso, respostas,
// posts e comentários ficam intactos, porque nada disso depende do texto
// que está sendo trocado. As questões são atualizadas por substituição de
// texto, e não recriadas, justamente para os ids das alternativas
// continuarem os mesmos das respostas já dadas.
// ---------------------------------------------------------------
async function migrarConteudo() {
  let mudancas = 0;
  const contar = (r) => (mudancas += r.changes || 0);

  for (const t of TRILHAS) {
    // Ícone: de emoji para o nome do ícone SVG (ver public/js/icones.js)
    contar(await run("UPDATE trilhas SET icone = ? WHERE titulo = ? AND icone IS NOT ?", [t.icone, t.titulo, t.icone]));

    // Descrição curta da lição — hoje é o subtítulo do módulo, não o conteúdo
    for (const [titulo, resumo] of t.licoes) {
      contar(
        await run("UPDATE licoes SET conteudo = ? WHERE titulo = ? AND conteudo IS NOT ?", [resumo, titulo, resumo])
      );
    }
  }

  mudancas += await sincronizarSecoes();

  // O corpo do e-mail passou de 4 para 5 partes na lição reescrita:
  // a questão correspondente é atualizada junto, senão a atividade
  // cobraria algo que o módulo não ensina mais.
  const trocasQuestao = [
    [
      "questoes",
      "enunciado",
      "Qual é a ordem das quatro partes de um e-mail formal simples, como vimos na lição?",
      "Qual é a ordem das cinco partes do corpo de um e-mail formal, como vimos na lição?",
    ],
    [
      "alternativas",
      "texto",
      "Saudação, motivo da mensagem, pedido claro e despedida",
      "Saudação, contexto, motivo da mensagem, pedido claro e despedida",
    ],
    ["alternativas", "texto", "Pedido, saudação, despedida e motivo", "Pedido, saudação, contexto, despedida e motivo"],
    [
      "alternativas",
      "texto",
      "Despedida, motivo, saudação e pedido",
      "Despedida, motivo, contexto, saudação e pedido",
    ],
    // O módulo de arquivos passou a ser escrito para o celular: a pergunta
    // e os distratores não podem seguir falando só em computador.
    [
      "questoes",
      "enunciado",
      "Pra que serve criar pastas no computador?",
      "Pra que serve criar pastas no celular ou no computador?",
    ],
    ["alternativas", "texto", "Pra deixar o computador mais rápido", "Pra deixar o aparelho mais rápido"],
    ["alternativas", "texto", "Pra proteger o computador de vírus", "Pra proteger o aparelho de vírus"],
  ];
  for (const [tabela, coluna, de, para] of trocasQuestao) {
    contar(await run(`UPDATE ${tabela} SET ${coluna} = ? WHERE ${coluna} = ?`, [para, de]));
  }

  // O post de boas-vindas tinha um emoji no fim (o sistema não usa mais emoji)
  contar(
    await run("UPDATE posts SET conteudo = ? WHERE conteudo LIKE ? AND conteudo IS NOT ?", [
      POST_BOAS_VINDAS,
      "Bem-vinda(o)! Esse é o mural da turma%",
      POST_BOAS_VINDAS,
    ])
  );

  if (mudancas) console.log(`Migração de conteúdo: ${mudancas} registro(s) atualizado(s).`);
}

async function iniciar() {
  await criarTabelas();
  await semearTrilhas();
  await semearAtividades();
  await semearSecoes();
  await migrarConteudo();
}

module.exports = { run, get, all, iniciar };
