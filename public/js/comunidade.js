// comunidade.js — lógica do mural e dos comentários (comunidade.html)

Api.exigirLogin();
montarTabbar("/comunidade.html");

// Evita que texto vindo do banco seja interpretado como HTML
function esc(txt) {
  const d = document.createElement("div");
  d.textContent = txt == null ? "" : String(txt);
  return d.innerHTML;
}

function tempoAtras(dataStr) {
  const diffMs = Date.now() - new Date(dataStr.replace(" ", "T") + "Z").getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "agora";
  if (min < 60) return min + " min atrás";
  const h = Math.floor(min / 60);
  if (h < 24) return h + "h atrás";
  return Math.floor(h / 24) + "d atrás";
}

function textoRespostas(n) {
  if (n === 0) return "Responder";
  if (n === 1) return "1 resposta";
  return n + " respostas";
}

// Desenha a lista de comentários já carregados de um post
function pintarComentarios(caixa, comentarios) {
  if (!comentarios.length) {
    caixa.innerHTML = `<p class="respostas-vazio">Ninguém respondeu ainda. Que tal ser a primeira pessoa?</p>`;
    return;
  }
  caixa.innerHTML = comentarios
    .map(
      (c) => `
      <div class="comentario">
        <div class="comentario-autor">${esc(c.autor)}</div>
        <div class="comentario-data">${tempoAtras(c.criado_em)}</div>
        <p>${esc(c.conteudo)}</p>
      </div>`
    )
    .join("");
}

function montarPost(p) {
  const div = document.createElement("div");
  div.className = "card post-card";
  const idResposta = "resposta-" + p.id;
  div.innerHTML = `
    <div class="post-autor">${esc(p.autor)}</div>
    <div class="post-data">${tempoAtras(p.criado_em)}</div>
    <p class="post-conteudo">${esc(p.conteudo)}</p>

    <button class="btn-responder" type="button" aria-expanded="false">
      <span class="icone seta" aria-hidden="true">${Icones.svg("chevron-down", { tamanho: 16 })}</span>
      <span class="rotulo">${textoRespostas(p.total_comentarios)}</span>
    </button>

    <div class="respostas">
      <div class="lista-comentarios" aria-live="polite"><p class="respostas-vazio">Carregando respostas...</p></div>
      <form class="form-resposta" novalidate>
        <label for="${idResposta}" class="sr-only">Sua resposta para essa publicação</label>
        <textarea id="${idResposta}" placeholder="Escreva sua resposta..." required></textarea>
        <div class="erro-msg" role="alert"></div>
        <button type="submit" class="btn-secondary">Enviar resposta</button>
      </form>
    </div>`;

  const botao = div.querySelector(".btn-responder");
  const painel = div.querySelector(".respostas");
  const lista = div.querySelector(".lista-comentarios");
  const rotulo = div.querySelector(".rotulo");
  const form = div.querySelector(".form-resposta");
  const erroEl = form.querySelector(".erro-msg");

  let jaCarregou = false;

  // Só busca os comentários quando a pessoa abre o post (lazy load)
  async function buscarComentarios() {
    try {
      const { comentarios } = await Api.chamar("GET", "/comunidade/" + p.id + "/comentarios");
      jaCarregou = true;
      pintarComentarios(lista, comentarios);
      rotulo.textContent = textoRespostas(comentarios.length);
    } catch (err) {
      lista.innerHTML = `<p class="respostas-vazio">${esc(err.message)}</p>`;
    }
  }

  botao.addEventListener("click", () => {
    const abrindo = !painel.classList.contains("aberta");
    painel.classList.toggle("aberta", abrindo);
    botao.classList.toggle("aberto", abrindo);
    botao.setAttribute("aria-expanded", String(abrindo));
    if (abrindo && !jaCarregou) buscarComentarios();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroEl.classList.remove("show");
    const campo = form.querySelector("textarea");
    const enviar = form.querySelector("button");
    enviar.disabled = true;
    try {
      await Api.chamar("POST", "/comunidade/" + p.id + "/comentarios", { conteudo: campo.value });
      campo.value = "";
      await buscarComentarios();
    } catch (err) {
      erroEl.textContent = err.message;
      erroEl.classList.add("show");
    } finally {
      enviar.disabled = false;
    }
  });

  return div;
}

async function carregarPosts() {
  try {
    const { posts } = await Api.chamar("GET", "/comunidade");
    const lista = document.getElementById("lista-posts");
    if (!posts.length) {
      lista.innerHTML =
        `<p class="vazio">` +
        Icones.svg("message-circle", { tamanho: 30 }) +
        `Ainda não tem nenhuma publicação. Seja a primeira pessoa a escrever!</p>`;
      return;
    }
    lista.innerHTML = "";
    posts.forEach((p) => lista.appendChild(montarPost(p)));
  } catch (err) {
    document.getElementById("lista-posts").innerHTML = `<p class="vazio">${esc(err.message)}</p>`;
  }
}

document.getElementById("form-post").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erroEl = document.getElementById("erro-post");
  erroEl.classList.remove("show");
  const texto = document.getElementById("novo-post");
  const botao = e.target.querySelector("button[type=submit]");
  botao.disabled = true;
  try {
    await Api.chamar("POST", "/comunidade", { conteudo: texto.value });
    texto.value = "";
    await carregarPosts();
  } catch (err) {
    erroEl.textContent = err.message;
    erroEl.classList.add("show");
  } finally {
    botao.disabled = false;
  }
});

carregarPosts();
