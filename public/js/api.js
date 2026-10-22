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

// Navegação principal. No celular é a barra inferior fixa (só os itens); a
// partir de 860px o CSS a transforma em menu lateral e passa a mostrar também
// a marca e o bloco do usuário (com o botão Sair), montados aqui.
function montarTabbar(ativo, ariaCurrent) {
  const atual = ariaCurrent || "page";
  const el = document.getElementById("tabbar");
  if (!el) return;
  // Os ícones vêm de public/js/icones.js — a página precisa carregá-lo antes
  const itens = [
    ["/dashboard.html", "home", "Início"],
    ["/comunidade.html", "message-circle", "Comunidade"],
  ];
  const usuario = Api.usuario();
  const nome = (usuario && usuario.nome) || "";
  const inicial = nome.trim().charAt(0).toUpperCase();

  el.innerHTML =
    '<div class="menu-logo">' +
      '<span class="menu-logo-icone" aria-hidden="true">' + Icones.svg("graduation-cap", { tamanho: 24 }) + "</span>" +
      '<span class="menu-logo-texto">Jovem Aprendiz <span class="menu-logo-destaque">Digital</span></span>' +
    "</div>" +
    '<div class="menu-itens">' +
    itens
      .map(([href, icone, label]) => {
        const ativa = href === ativo;
        return (
          `<a href="${href}" class="${ativa ? "active" : ""}"${ativa ? ' aria-current="' + atual + '"' : ""}>` +
          `<span class="ic">${Icones.svg(icone, { tamanho: 22 })}</span>${label}</a>`
        );
      })
      .join("") +
    "</div>" +
    '<div class="menu-usuario">' +
      '<div class="menu-perfil">' +
        '<span class="menu-avatar" aria-hidden="true">' + escHtml(inicial) + "</span>" +
        '<span class="menu-nome">' + escHtml(nome) + "</span>" +
      "</div>" +
      '<button type="button" class="btn-secondary menu-sair">' + Icones.svg("log-out", { tamanho: 18 }) + " Sair</button>" +
    "</div>";

  const sair = el.querySelector(".menu-sair");
  if (sair) sair.addEventListener("click", () => Api.sair());
  // Botões "Sair" da topbar em páginas sem JS próprio para isso (o do
  // dashboard usa #btn-sair e é ligado em dashboard.js).
  document.querySelectorAll("[data-sair]").forEach((b) => b.addEventListener("click", () => Api.sair()));
}

// Páginas cujo JS não monta a navegação (trilha.html) declaram
// data-tabbar-ativo no <body>; os scripts são defer, então o DOM já existe.
(function montarAutomatico() {
  const ativo = document.body && document.body.dataset.tabbarAtivo;
  const el = document.getElementById("tabbar");
  if (ativo && el && !el.children.length) montarTabbar(ativo, "true");
})();
