// api.js — funções compartilhadas de autenticação e chamadas à API
const Api = {
  base: "/api",

  token() {
    return localStorage.getItem("token");
  },

  usuario() {
    const raw = localStorage.getItem("usuario");
    return raw ? JSON.parse(raw) : null;
  },

  salvarSessao(token, usuario) {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
  },

  sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login.html";
  },

  async chamar(metodo, caminho, corpo) {
    const headers = { "Content-Type": "application/json" };
    const t = this.token();
    if (t) headers["Authorization"] = "Bearer " + t;
    const resp = await fetch(this.base + caminho, {
      method: metodo,
      headers,
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
    let dados = {};
    try { dados = await resp.json(); } catch {}
    if (!resp.ok) throw new Error(dados.erro || "Algo deu errado. Tente de novo.");
    return dados;
  },

  exigirLogin() {
    if (!this.token()) window.location.href = "/login.html";
  },
};

// Mensagens de erro/sucesso de formulário: ícone + texto, nunca só a cor
// de fundo (WCAG 1.4.1 — Uso de Cor). Mesmo padrão já usado no feedback
// da atividade de cada módulo (ver trilha.js).
function ic(nome, tamanho) {
  return '<span class="icone" aria-hidden="true">' + Icones.svg(nome, { tamanho: tamanho || 18 }) + "</span>";
}

function escHtml(txt) {
  const d = document.createElement("div");
  d.textContent = txt == null ? "" : String(txt);
  return d.innerHTML;
}

function mostrarErroForm(el, mensagem) {
  el.innerHTML = ic("alert-circle", 18) + "<span class='txt'>" + escHtml(mensagem) + "</span>";
  el.classList.add("show");
}

function mostrarSucessoForm(el, mensagem) {
  el.innerHTML = ic("check-circle", 18) + "<span class='txt'>" + escHtml(mensagem) + "</span>";
  el.classList.add("show");
}

function montarTabbar(ativo) {
  const el = document.getElementById("tabbar");
  if (!el) return;
  // Os ícones vêm de public/js/icones.js — a página precisa carregá-lo antes
  const itens = [
    ["/dashboard.html", "home", "Início"],
    ["/comunidade.html", "message-circle", "Comunidade"],
  ];
  el.innerHTML = itens
    .map(([href, icone, label]) => {
      const ativa = href === ativo;
      return (
        `<a href="${href}" class="${ativa ? "active" : ""}"${ativa ? ' aria-current="page"' : ""}>` +
        `<span class="ic">${Icones.svg(icone, { tamanho: 22 })}</span>${label}</a>`
      );
    })
    .join("");
}
