// dashboard.js — lógica do painel inicial (dashboard.html)

Api.exigirLogin();
montarTabbar("/dashboard.html");

document.getElementById("btn-sair").addEventListener("click", () => Api.sair());

const usuario = Api.usuario();
document.getElementById("saudacao").textContent = "Olá, " + (usuario?.nome?.split(" ")[0] || "") + "!";

// Aviso não bloqueante: o login funciona sem confirmar o e-mail (ver
// server.js), mas a pessoa precisa saber que o e-mail ainda não foi
// confirmado, caso um dia isso passe a ser exigido.
if (usuario && usuario.email_verificado === false) {
  const aviso = document.getElementById("aviso-verificacao");
  aviso.textContent = "Ainda falta confirmar seu e-mail (" + usuario.email + "). Veja sua caixa de entrada.";
  aviso.classList.add("show"); // o CSS só exibe .sucesso-msg com .show
  aviso.hidden = false;
}

// Evita que texto vindo do banco seja interpretado como HTML
function esc(txt) {
  const d = document.createElement("div");
  d.textContent = txt == null ? "" : String(txt);
  return d.innerHTML;
}

const CIRCUNFERENCIA = 2 * Math.PI * 52; // anel de raio 52 (viewBox 120)

// Anel de progresso: o SVG é só desenho (aria-hidden); o número "X/9" é texto
// real e o container expõe o valor como progressbar para leitor de tela.
function anelHtml(feitos, total) {
  const fracao = total > 0 ? feitos / total : 0;
  const falta = (CIRCUNFERENCIA * (1 - fracao)).toFixed(2);
  return (
    "<div class=\"anel\" role=\"progressbar\" aria-label=\"Progresso no mini curso\"" +
      " aria-valuemin=\"0\" aria-valuemax=\"" + total + "\" aria-valuenow=\"" + feitos + "\"" +
      " aria-valuetext=\"" + feitos + " de " + total + " módulos\">" +
      "<svg viewBox=\"0 0 120 120\" aria-hidden=\"true\" focusable=\"false\">" +
        "<circle class=\"anel-trilho\" cx=\"60\" cy=\"60\" r=\"52\" fill=\"none\" stroke-width=\"12\"/>" +
        "<circle class=\"anel-arco\" cx=\"60\" cy=\"60\" r=\"52\" fill=\"none\" stroke-width=\"12\" stroke-linecap=\"round\"" +
          " stroke-dasharray=\"" + CIRCUNFERENCIA.toFixed(2) + "\" stroke-dashoffset=\"" + falta + "\"" +
          " transform=\"rotate(-90 60 60)\"/>" +
      "</svg>" +
      "<span class=\"anel-centro\"><span class=\"anel-num\">" + feitos + "/" + total + "</span>" +
      "<span class=\"anel-rotulo\">módulos</span></span>" +
    "</div>"
  );
}

function setaBranco() {
  return Icones.svg("arrow-right", { tamanho: 18 });
}

// Card coral ("próximo módulo"). `proximo` = { titulo, descricao, meta, href, botao, etiqueta }
function proximoHtml(p) {
  return (
    "<section class=\"resumo-proximo\">" +
      "<div class=\"resumo-etiqueta\">" + esc(p.etiqueta) + "</div>" +
      "<h2 class=\"resumo-titulo\">" + esc(p.titulo) + "</h2>" +
      (p.descricao ? "<p class=\"resumo-desc\">" + esc(p.descricao) + "</p>" : "") +
      (p.meta ? "<p class=\"resumo-meta\">" + esc(p.meta) + "</p>" : "") +
      (p.href
        ? "<a class=\"btn-branco\" href=\"" + esc(p.href) + "\">" + esc(p.botao) + " " + setaBranco() + "</a>"
        : "") +
    "</section>"
  );
}

// O board aponta que a queda emocional é mais forte NO INÍCIO. Mostrar
// "0%" ou "0/9" em destaque bem nesse momento desanima em vez de motivar —
// então, enquanto não há nenhum módulo concluído, o card vira um convite para
// começar e o card de progresso só descreve o curso (sem anel nem zeros).
// `proximo` é o módulo da API (pode ser null; aí o card fica no nível da trilha).
function pintarResumo(resumo, trilhas, proximo) {
  const card = document.getElementById("resumo-card");
  const primeira = trilhas[0];
  const total = resumo.total_licoes;
  const feitos = resumo.licoes_concluidas;

  if (feitos === 0) {
    card.className = "resumo-card resumo-inicio";
    card.innerHTML =
      proximoHtml({
        etiqueta: "Primeiro passo",
        titulo: "Vamos começar?",
        descricao: "O primeiro módulo leva uns 10 minutos e começa do zero — você não precisa saber nada antes.",
        href: primeira ? "/trilha.html?id=" + primeira.id : "",
        botao: "Começar o primeiro módulo",
      }) +
      "<section class=\"resumo-mini\">" +
        "<div class=\"resumo-mini-texto\">" +
          "<h2 class=\"resumo-mini-titulo\">Seu mini curso</h2>" +
          "<p>" + total + " módulos curtos em " + trilhas.length + " trilhas, uns 10 minutos cada.</p>" +
        "</div>" +
      "</section>";
    return;
  }

  const fechar = trilhas.length === 3 ? "as três trilhas" : "todas as trilhas";
  if (feitos >= total) {
    card.className = "resumo-card resumo-completo";
    card.innerHTML =
      proximoHtml({
        etiqueta: "Mini curso completo",
        titulo: "Você fechou " + fechar + "!",
        descricao: "Quando quiser, volte a qualquer módulo para rever o que aprendeu.",
        href: primeira ? "/trilha.html?id=" + primeira.id : "",
        botao: "Revisar os módulos",
      }) +
      miniHtml(feitos, total, "Você concluiu os " + total + " módulos.");
    return;
  }

  const faltam = total - feitos;
  const alvo = trilhas.find((t) => t.licoes_concluidas < t.total_licoes) || primeira;

  let p;
  if (proximo && proximo.licao) {
    const secoes = Array.isArray(proximo.licao.secoes) ? proximo.licao.secoes.length : 0;
    p = {
      etiqueta: "Seu próximo módulo",
      titulo: proximo.licao.titulo,
      descricao: proximo.licao.conteudo,
      meta: (secoes ? secoes + " seções · " : "") + "uns 10 minutos",
      href: "/trilha.html?id=" + proximo.trilhaId,
      botao: "Começar módulo",
    };
  } else {
    p = {
      etiqueta: "Continue de onde parou",
      titulo: alvo ? alvo.titulo : "Suas trilhas",
      descricao: alvo ? alvo.descricao : "",
      meta: "uns 10 minutos por módulo",
      href: alvo ? "/trilha.html?id=" + alvo.id : "",
      botao: "Continuar trilha",
    };
  }

  card.className = "resumo-card resumo-andamento";
  card.innerHTML =
    proximoHtml(p) +
    miniHtml(feitos, total,
      (faltam === 1 ? "Falta 1 módulo" : "Faltam " + faltam + " módulos") + " para fechar " + fechar + ".");
}

function miniHtml(feitos, total, texto) {
  return (
    "<section class=\"resumo-mini\">" +
      anelHtml(feitos, total) +
      "<div class=\"resumo-mini-texto\">" +
        "<h2 class=\"resumo-mini-titulo\">Seu mini curso</h2>" +
        "<p>" + esc(texto) + "</p>" +
      "</div>" +
    "</section>"
  );
}

// Cartão de trilha: cor por posição (teal, roxo, coral), selo de nível no
// canto, e barra de progresso só quando já existe progresso.
function cartaoTrilha(t, i) {
  const a = document.createElement("a");
  a.href = "/trilha.html?id=" + t.id;
  a.className = "card trilha-card trilha-cor-" + ((i % 3) + 1);
  const comProgresso = t.licoes_concluidas > 0;
  const pct = t.total_licoes > 0 ? Math.round((t.licoes_concluidas / t.total_licoes) * 100) : 0;
  a.innerHTML =
    "<div class=\"trilha-topo\">" +
      "<div class=\"trilha-icone\" aria-hidden=\"true\">" + Icones.svg(t.icone || "book-open", { tamanho: 28 }) + "</div>" +
      "<span class=\"trilha-nivel\">" + esc(t.nivel) + "</span>" +
    "</div>" +
    "<div class=\"trilha-info\">" +
      "<h3 class=\"trilha-titulo\">" + esc(t.titulo) + "</h3>" +
      "<p class=\"trilha-descricao\">" + esc(t.descricao || "") + "</p>" +
      (comProgresso
        ? "<div class=\"barra-fundo\" role=\"progressbar\" aria-label=\"Progresso em " + esc(t.titulo) + "\"" +
            " aria-valuemin=\"0\" aria-valuemax=\"" + t.total_licoes + "\" aria-valuenow=\"" + t.licoes_concluidas + "\"" +
            " aria-valuetext=\"" + t.licoes_concluidas + " de " + t.total_licoes + " módulos\">" +
            "<div class=\"barra-preenchida\" style=\"width:" + pct + "%\"></div></div>"
        : "") +
      "<div class=\"trilha-progresso-texto\">" +
        (comProgresso ? t.licoes_concluidas + " de " + t.total_licoes + " módulos concluídos" : t.total_licoes + " módulos") +
      "</div>" +
    "</div>";
  return a;
}

// Busca o primeiro módulo não concluído da primeira trilha em andamento.
// Roda depois da renderização e, se falhar, o card fica no nível da trilha.
async function buscarProximoModulo(trilhas) {
  const alvo = trilhas.find((t) => t.licoes_concluidas < t.total_licoes);
  if (!alvo) return null;
  const dados = await Api.chamar("GET", "/trilhas/" + alvo.id);
  const licao = (dados.licoes || []).find((l) => !l.concluida);
  return licao ? { trilhaId: alvo.id, licao } : null;
}

function mostrarEsqueleto() {
  const lista = document.getElementById("lista-trilhas");
  lista.setAttribute("aria-busy", "true");
  lista.innerHTML =
    '<span class="sr-only">Carregando...</span>' +
    '<div class="esqueleto esq-trilhas" aria-hidden="true">' +
    '<span class="esqueleto-bloco esq-card"></span>'.repeat(3) +
    "</div>";
  const card = document.getElementById("resumo-card");
  card.className = "";
  card.innerHTML = '<div class="esqueleto" aria-hidden="true"><span class="esqueleto-bloco esq-resumo"></span></div>';
}

async function carregar() {
  try {
    const [{ trilhas }, resumo] = await Promise.all([
      Api.chamar("GET", "/trilhas"),
      Api.chamar("GET", "/resumo"),
    ]);

    const lista = document.getElementById("lista-trilhas");
    lista.removeAttribute("aria-busy");
    lista.innerHTML = "";
    trilhas.forEach((t, i) => lista.appendChild(cartaoTrilha(t, i)));

    // O card de resumo é pintado uma vez só, já com o próximo módulo (se
    // houver), para não trocar de conteúdo diante da pessoa.
    let proximo = null;
    if (resumo.licoes_concluidas > 0 && resumo.licoes_concluidas < resumo.total_licoes) {
      try {
        proximo = await buscarProximoModulo(trilhas);
      } catch (e) {
        // Sem o detalhe do módulo, o card fica no nível da trilha.
      }
    }
    pintarResumo(resumo, trilhas, proximo);
  } catch (err) {
    const lista = document.getElementById("lista-trilhas");
    lista.removeAttribute("aria-busy");
    document.getElementById("resumo-card").innerHTML = "";
    lista.innerHTML =
      `<div class="estado-erro"><p class="vazio">Não deu para carregar agora. ${esc(err.message)}</p>` +
      `<button type="button" class="btn-secondary tentar-de-novo">Tentar de novo</button></div>`;
    lista.querySelector(".tentar-de-novo").addEventListener("click", () => {
      mostrarEsqueleto();
      carregar();
    });
  }
}
carregar();
