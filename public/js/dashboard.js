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
  aviso.hidden = false;
}

// Evita que texto vindo do banco seja interpretado como HTML
function esc(txt) {
  const d = document.createElement("div");
  d.textContent = txt == null ? "" : String(txt);
  return d.innerHTML;
}

// O board aponta que a queda emocional é mais forte NO INÍCIO. Mostrar
// "0%" em destaque bem nesse momento desanima em vez de motivar — então,
// enquanto não há nenhum módulo concluído, o card vira um convite para
// começar. A barra de progresso aparece assim que existe o que mostrar.
function pintarResumo(resumo, trilhas) {
  const card = document.getElementById("resumo-card");
  const primeira = trilhas[0];

  if (resumo.licoes_concluidas === 0) {
    card.className = "resumo-card boas-vindas";
    card.innerHTML =
      "<h2>Vamos começar?</h2>" +
      "<p>O primeiro módulo leva uns 10 minutos e começa do zero — " +
      "você não precisa saber nada antes.</p>" +
      (primeira
        ? "<a class=\"btn-comecar\" href=\"/trilha.html?id=" + primeira.id + "\">" +
          "Começar o primeiro módulo " + Icones.svg("arrow-right", { tamanho: 18 }) + "</a>"
        : "");
    return;
  }

  card.className = "resumo-card";
  card.innerHTML =
    "<div>Seu progresso</div>" +
    "<div class=\"pct\">" + resumo.percentual + "%</div>" +
    "<div class=\"barra-fundo\" role=\"progressbar\" aria-valuenow=\"" + resumo.percentual +
      "\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-label=\"Progresso geral\">" +
      "<div class=\"barra-preenchida\" style=\"width:" + resumo.percentual + "%\"></div></div>" +
    "<div class=\"resumo-texto\">" + resumo.licoes_concluidas + " de " +
      resumo.total_licoes + " módulos concluídos</div>";
}

async function carregar() {
  try {
    const [{ trilhas }, resumo] = await Promise.all([
      Api.chamar("GET", "/trilhas"),
      Api.chamar("GET", "/resumo"),
    ]);

    pintarResumo(resumo, trilhas);

    const lista = document.getElementById("lista-trilhas");
    lista.innerHTML = "";
    trilhas.forEach((t) => {
      const div = document.createElement("a");
      div.href = "/trilha.html?id=" + t.id;
      div.className = "card trilha-card";
      div.innerHTML = `
        <div class="trilha-icone">${Icones.svg(t.icone || "book-open", { tamanho: 26 })}</div>
        <div class="trilha-info">
          <div class="trilha-nivel">${esc(t.nivel)}</div>
          <h2 class="trilha-titulo">${esc(t.titulo)}</h2>
          <p class="trilha-descricao">${esc(t.descricao || "")}</p>
          <div class="trilha-progresso-texto">${t.licoes_concluidas === 0 ? t.total_licoes + " módulos" : t.licoes_concluidas + " de " + t.total_licoes + " módulos concluídos"}</div>
        </div>`;
      lista.appendChild(div);
    });
  } catch (err) {
    document.getElementById("lista-trilhas").innerHTML =
      `<p class="vazio">Não deu para carregar agora. ${esc(err.message)}</p>`;
  }
}
carregar();
