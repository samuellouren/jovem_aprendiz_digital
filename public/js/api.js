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
    window.location.href = "/#entrar";
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
    if (!this.token()) window.location.href = "/";
  },
};

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
