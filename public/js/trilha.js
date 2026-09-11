// trilha.js — lógica da página de trilha, módulo e atividade (trilha.html)

Api.exigirLogin();

const params = new URLSearchParams(window.location.search);
const trilhaId = params.get("id");
const esc = Formato.escapar;

// Estado da tela: os dados da trilha, qual módulo está aberto e em que passo
let trilha = null;
let licoes = [];
let moduloAberto = null; // índice em `licoes`, ou null quando está na lista
let passoAtual = 0;

// Guarda até onde a pessoa já chegou em cada módulo, para o stepper mostrar
// as seções já vistas. Só nesta visita — não é progresso salvo no servidor.
const passosVistos = new Map(); // licao_id -> Set de índices

// Como cada tipo de seção se apresenta: rótulo e ícone.
const TIPOS = {
  introducao: { rotulo: "Introdução", icone: "compass" },
  explicacao: { rotulo: "Explicação", icone: "book-open" },
  exemplo: { rotulo: "Exemplo prático", icone: "layers" },
  dica: { rotulo: "Dica e erro comum", icone: "lightbulb" },
  resumo: { rotulo: "Resumo", icone: "list-checks" },
};
const TIPO_PADRAO = { rotulo: "Conteúdo", icone: "file-text" };
const tipoDe = (t) => TIPOS[t] || TIPO_PADRAO;

function ic(nome, tamanho) {
  return '<span class="icone" aria-hidden="true">' + Icones.svg(nome, { tamanho: tamanho || 18 }) + "</span>";
}

// Um módulo tem N seções + 1 passo final (a atividade), quando ela existe
function totalPassos(licao) {
  return licao.secoes.length + (licao.questoes.length ? 1 : 0);
}
function ehPassoAtividade(licao, indice) {
  return licao.questoes.length > 0 && indice === licao.secoes.length;
}

/* =================================================================
   TELA 1 — a trilha e a lista de módulos
   ================================================================= */
function pintarCabecalhoTrilha() {
  const total = licoes.length;
  const feitos = licoes.filter((l) => l.concluida).length;
  const pct = total ? Math.round((feitos / total) * 100) : 0;

  document.getElementById("cabecalho-trilha").innerHTML = `
    <div class="trilha-cabecalho">
      <span class="etiqueta-nivel">
        ${ic(trilha.icone, 13)} ${esc(trilha.nivel || "")}
      </span>
      <h1>${esc(trilha.titulo)}</h1>
      <p class="desc">${esc(trilha.descricao || "")}</p>
      <div class="barra-fundo" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso da trilha">
        <div class="barra-preenchida" style="width:${pct}%"></div>
      </div>
      <div class="progresso-texto">
        ${ic("trending-up", 15)}
        ${feitos} de ${total} módulos concluídos (${pct}%)
      </div>
    </div>`;
}

function pintarListaModulos() {
  const wrap = document.getElementById("lista-modulos");
  wrap.innerHTML = "";

  licoes.forEach((l, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "modulo-card" + (l.concluida ? " feito" : "");
    btn.innerHTML = `
      <span class="modulo-numero" aria-hidden="true">${l.concluida ? Icones.svg("check", { tamanho: 19 }) : i + 1}</span>
      <span class="modulo-corpo">
        <span class="modulo-titulo">${esc(l.titulo)}</span>
        <span class="modulo-resumo">${esc(l.conteudo)}</span>
        <span class="modulo-meta">
          <span>${ic("book-open", 13)} ${l.secoes.length} seções</span>
          ${l.questoes.length ? `<span>${ic("edit-3", 13)} atividade</span>` : ""}
          ${l.concluida ? `<span class="feito-txt">${ic("check-circle", 13)} concluído</span>` : ""}
        </span>
      </span>
      <span class="icone seta" aria-hidden="true">${Icones.svg("chevron-right", { tamanho: 20 })}</span>`;
    btn.addEventListener("click", () => abrirModulo(i));
    wrap.appendChild(btn);
  });
}

function mostrarTelaTrilha() {
  moduloAberto = null;
  document.getElementById("tela-modulo").hidden = true;
  document.getElementById("tela-trilha").hidden = false;
  document.getElementById("titulo-topo").textContent = trilha.titulo;
  document.getElementById("subtitulo-topo").textContent = "Trilha de aprendizagem";
  pintarCabecalhoTrilha();
  pintarListaModulos();
  window.scrollTo(0, 0);
}

/* =================================================================
   TELA 2 — o módulo aberto
   ================================================================= */
function abrirModulo(indice) {
  moduloAberto = indice;
  passoAtual = 0;
  const licao = licoes[indice];
  if (!passosVistos.has(licao.id)) passosVistos.set(licao.id, new Set());

  document.getElementById("tela-trilha").hidden = true;
  document.getElementById("tela-modulo").hidden = false;
  document.getElementById("titulo-topo").textContent = licao.titulo;
  document.getElementById("subtitulo-topo").textContent =
    "Módulo " + (indice + 1) + " de " + licoes.length;

  pintarModulo();
  window.scrollTo(0, 0);
}

function pintarModulo() {
  const licao = licoes[moduloAberto];
  passosVistos.get(licao.id).add(passoAtual);

  pintarTopoModulo(licao);
  pintarStepper(licao);
  pintarPasso(licao);
  pintarNavegacao(licao);
}

function pintarTopoModulo(licao) {
  const total = totalPassos(licao);
  const pct = Math.round(((passoAtual + 1) / total) * 100);
  const naAtividade = ehPassoAtividade(licao, passoAtual);

  document.getElementById("modulo-topo").innerHTML = `
    <button class="btn-voltar-modulos" type="button">
      ${ic("arrow-left", 16)} Todos os módulos
    </button>
    <span class="modulo-etiqueta">Módulo ${moduloAberto + 1} de ${licoes.length}</span>
    <h1>${esc(licao.titulo)}</h1>
    <p class="modulo-resumo">${esc(licao.conteudo)}</p>
    <div class="modulo-progresso">
      <div class="barra-fundo" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do módulo">
        <div class="barra-preenchida" style="width:${pct}%"></div>
      </div>
      <div class="passo-texto">
        <span>${naAtividade ? "Atividade final" : "Parte " + (passoAtual + 1) + " de " + total}</span>
        <span>${pct}%</span>
      </div>
    </div>`;

  document
    .querySelector(".btn-voltar-modulos")
    .addEventListener("click", mostrarTelaTrilha);
}

// Stepper: uma pastilha por seção, mais a da atividade.
// Rola sozinho para deixar a pastilha atual visível no celular.
function pintarStepper(licao) {
  const vistos = passosVistos.get(licao.id);
  const stepper = document.getElementById("stepper");
  stepper.innerHTML = "";

  licao.secoes.forEach((s, i) => {
    const t = tipoDe(s.tipo);
    const jaVisto = i !== passoAtual && vistos.has(i);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "passo" + (i === passoAtual ? " atual" : jaVisto ? " visitado" : "");
    if (i === passoAtual) btn.setAttribute("aria-current", "step");
    btn.innerHTML =
      Icones.svg(jaVisto ? "check" : t.icone, { tamanho: 14 }) +
      "<span>" + esc(t.rotulo) + (jaVisto ? " (concluída)" : "") + "</span>";
    btn.addEventListener("click", () => irParaPasso(i));
    stepper.appendChild(btn);
  });

  if (licao.questoes.length) {
    const i = licao.secoes.length;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "passo passo-teste" + (i === passoAtual ? " atual" : "");
    if (i === passoAtual) btn.setAttribute("aria-current", "step");
    btn.innerHTML = Icones.svg("edit-3", { tamanho: 14 }) + "<span>Atividade</span>";
    btn.addEventListener("click", () => irParaPasso(i));
    stepper.appendChild(btn);
  }

  const atual = stepper.querySelector(".passo.atual");
  if (atual) atual.scrollIntoView({ block: "nearest", inline: "center" });
}

function pintarPasso(licao) {
  const alvo = document.getElementById("conteudo-passo");
  alvo.innerHTML = "";

  if (ehPassoAtividade(licao, passoAtual)) {
    alvo.appendChild(montarAtividade(licao));
    return;
  }

  const s = licao.secoes[passoAtual];
  const t = tipoDe(s.tipo);
  const artigo = document.createElement("article");
  // A classe vem da lista conhecida de tipos — nunca do valor cru do banco
  const tipoClasse = TIPOS[s.tipo] ? s.tipo : "explicacao";
  artigo.className = "secao secao-" + tipoClasse;
  artigo.innerHTML = `
    <span class="secao-tipo">${ic(t.icone, 15)} ${esc(t.rotulo)}</span>
    <h2>${esc(s.titulo)}</h2>
    <div class="secao-texto">${Formato.paraHtml(s.conteudo)}</div>`;
  alvo.appendChild(artigo);
}

function pintarNavegacao(licao) {
  const nav = document.getElementById("secao-nav");
  const conviteAntigo = document.querySelector(".convite-mural");
  if (conviteAntigo) conviteAntigo.remove();
  const total = totalPassos(licao);
  const ultimo = passoAtual >= total - 1;
  const proximoEhAtividade = ehPassoAtividade(licao, passoAtual + 1);

  nav.innerHTML = "";
  if (ultimo) {
    // No último passo, o caminho natural é voltar para a lista de módulos
    const voltar = document.createElement("button");
    voltar.type = "button";
    voltar.className = "btn-anterior";
    voltar.innerHTML = ic("chevron-left", 18);
    voltar.setAttribute("aria-label", "Parte anterior");
    voltar.addEventListener("click", () => irParaPasso(passoAtual - 1));

    const lista = document.createElement("button");
    lista.type = "button";
    lista.className = "btn-proximo ir-atividade";
    lista.innerHTML = ic("layers", 17) + " Voltar aos módulos";
    lista.addEventListener("click", mostrarTelaTrilha);

    nav.appendChild(voltar);
    nav.appendChild(lista);
    mostrarConviteMural();
    return;
  }

  const anterior = document.createElement("button");
  anterior.type = "button";
  anterior.className = "btn-anterior";
  anterior.innerHTML = ic("chevron-left", 18);
  anterior.setAttribute("aria-label", "Parte anterior");
  anterior.disabled = passoAtual === 0;
  anterior.addEventListener("click", () => irParaPasso(passoAtual - 1));

  const proximo = document.createElement("button");
  proximo.type = "button";
  proximo.className = "btn-proximo" + (proximoEhAtividade ? " ir-atividade" : "");
  proximo.innerHTML = proximoEhAtividade
    ? ic("edit-3", 17) + " Ir para a atividade"
    : "Continuar " + ic("chevron-right", 18);
  proximo.addEventListener("click", () => irParaPasso(passoAtual + 1));

  nav.appendChild(anterior);
  nav.appendChild(proximo);
}

// Convite para o mural no fim do módulo: a persona "trabalha em grupo",
// e a hora de perguntar é agora, não quando ela lembrar de abrir a aba.
function mostrarConviteMural() {
  const nav = document.getElementById("secao-nav");
  // A caixa inteira é o link, para virar um alvo de toque grande
  const convite = document.createElement("a");
  convite.className = "convite-mural";
  convite.href = "/comunidade.html";
  convite.innerHTML =
    ic("message-circle", 18) +
    " <span><strong>Ficou com dúvida? Pergunte para a turma</strong>" +
    "<br>No mural ninguém julga pergunta básica.</span>";
  nav.insertAdjacentElement("afterend", convite);
}

function irParaPasso(indice) {
  const licao = licoes[moduloAberto];
  if (indice < 0 || indice >= totalPassos(licao)) return;
  passoAtual = indice;
  pintarModulo();
  window.scrollTo(0, 0);
}

/* =================================================================
   A atividade — o "modo teste" que fecha o módulo
   ================================================================= */
function marcarSelecionada(questaoEl) {
  questaoEl.querySelectorAll(".alternativa").forEach((label) => {
    label.classList.toggle("marcada", label.querySelector("input").checked);
  });
}

function montarAtividade(licao) {
  const box = document.createElement("div");
  box.className = "bloco-teste";

  const perguntas = licao.questoes
    .map(
      (q, i) => `
      <fieldset class="questao" data-questao="${q.id}">
        <legend class="questao-numero">Pergunta ${i + 1} de ${licao.questoes.length}</legend>
        <div class="questao-enunciado">${esc(q.enunciado)}</div>
        ${q.alternativas
          .map(
            (a) => `
          <label class="alternativa">
            <input type="radio" name="questao-${q.id}" value="${a.id}">
            <span>${esc(a.texto)}</span>
          </label>`
          )
          .join("")}
        <div class="feedback-questao" role="status" aria-live="polite"></div>
      </fieldset>`
    )
    .join("");

  box.innerHTML = `
    <div class="teste-cabecalho">
      <span class="teste-selo" aria-hidden="true">${Icones.svg("edit-3", { tamanho: 22 })}</span>
      <div>
        <h2>Agora é sua vez</h2>
        <p>
          Responda para fixar o que você acabou de estudar. Acertando tudo, o módulo
          é concluído sozinho — e dá para refazer quantas vezes quiser.
        </p>
      </div>
    </div>
    ${perguntas}
    <button type="button" class="btn-primary verificar">Verificar respostas</button>
    <div class="feedback-final" role="status" aria-live="polite"></div>`;

  // Deixa marcada a resposta que a pessoa já tinha dado antes
  licao.questoes.forEach((q) => {
    if (!q.alternativa_escolhida) return;
    const input = box.querySelector(
      `input[name="questao-${q.id}"][value="${q.alternativa_escolhida}"]`
    );
    if (input) input.checked = true;
  });
  box.querySelectorAll(".questao").forEach(marcarSelecionada);

  // Ao trocar de alternativa, limpa o feedback anterior daquela pergunta
  box.querySelectorAll(".questao").forEach((questaoEl) => {
    questaoEl.addEventListener("change", () => {
      marcarSelecionada(questaoEl);
      questaoEl.classList.remove("certa", "errada");
      questaoEl.querySelector(".feedback-questao").classList.remove("show");
    });
  });

  const btn = box.querySelector(".verificar");
  const final = box.querySelector(".feedback-final");

  btn.addEventListener("click", async () => {
    const respostas = [];
    let faltando = false;
    licao.questoes.forEach((q) => {
      const escolhida = box.querySelector(`input[name="questao-${q.id}"]:checked`);
      if (!escolhida) faltando = true;
      else respostas.push({ questao_id: q.id, alternativa_id: Number(escolhida.value) });
    });

    if (faltando) {
      final.className = "feedback-final tente-de-novo show";
      final.innerHTML =
        ic("alert-circle", 18) +
        "<span class='txt'>Falta escolher uma resposta em cada pergunta.</span>";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Verificando...";
    try {
      const r = await Api.chamar("POST", "/licoes/" + licao.id + "/responder", { respostas });

      r.resultados.forEach((res) => {
        const questaoEl = box.querySelector(`.questao[data-questao="${res.questao_id}"]`);
        const fb = questaoEl.querySelector(".feedback-questao");
        questaoEl.classList.toggle("certa", res.correta);
        questaoEl.classList.toggle("errada", !res.correta);
        fb.className = "feedback-questao show " + (res.correta ? "certa" : "errada");
        // A cor nunca é a única pista: ícone + texto sempre acompanham
        // ("✓ Isso mesmo" / "Revise esta resposta").
        fb.innerHTML =
          ic(res.correta ? "check-circle" : "x-circle", 16) +
          "<span>" +
          (res.correta
            ? "Isso mesmo!"
            : "Revise esta resposta — volte no resumo do módulo e tente de novo.") +
          "</span>";
      });

      if (r.todas_corretas) {
        final.className = "feedback-final tudo-certo show";
        final.innerHTML =
          ic("award", 20) +
          "<span class='txt'>Você acertou tudo! Módulo concluído." +
          "<span class='sub'>Seu progresso já foi atualizado no painel.</span></span>";
        licao.concluida = true;
      } else {
        const acertos = r.resultados.filter((x) => x.correta).length;
        final.className = "feedback-final tente-de-novo show";
        final.innerHTML =
          ic("trending-up", 20) +
          `<span class='txt'>Você acertou ${acertos} de ${r.resultados.length}. Quase lá!` +
          "<span class='sub'>Reveja o resumo do módulo e tente de novo — sem pressa, dá pra refazer quantas vezes quiser.</span></span>";
      }
      btn.textContent = "Verificar respostas";
    } catch (err) {
      final.className = "feedback-final tente-de-novo show";
      final.innerHTML = ic("alert-circle", 18) + "<span class='txt'>" + esc(err.message) + "</span>";
      btn.textContent = "Verificar respostas";
    } finally {
      btn.disabled = false;
    }
  });

  return box;
}

/* =================================================================
   Carga inicial
   ================================================================= */
async function carregar() {
  try {
    const dados = await Api.chamar("GET", "/trilhas/" + trilhaId);
    trilha = dados.trilha;
    licoes = dados.licoes.map((l) => ({ ...l, secoes: l.secoes || [], questoes: l.questoes || [] }));
    mostrarTelaTrilha();
  } catch (err) {
    document.getElementById("lista-modulos").innerHTML =
      `<p class="vazio">${ic("alert-circle", 30)}${esc(err.message)}</p>`;
  }
}
carregar();
