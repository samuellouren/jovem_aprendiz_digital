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


// ---------- Erro ligado ao campo (WCAG 3.3.1 e 3.3.3) ----------
// A mensagem fica logo abaixo do campo, com ícone + texto, e o campo recebe
// aria-invalid e aria-describedby: o leitor de tela lê "campo inválido" e a
// explicação de como resolver quando o foco chega nele.
function limparCampoInvalido(input) {
  input.removeAttribute("aria-invalid");
  const idErro = input.id + "-erro";
  const el = document.getElementById(idErro);
  if (el) el.remove();
  const ds = (input.getAttribute("aria-describedby") || "").split(" ").filter((x) => x && x !== idErro);
  if (ds.length) input.setAttribute("aria-describedby", ds.join(" "));
  else input.removeAttribute("aria-describedby");
}

function marcarCampoInvalido(input, mensagem) {
  const idErro = input.id + "-erro";
  let el = document.getElementById(idErro);
  if (!el) {
    el = document.createElement("p");
    el.id = idErro;
    el.className = "campo-erro";
    input.insertAdjacentElement("afterend", el);
  }
  el.innerHTML = ic("alert-circle", 16) + "<span>" + escHtml(mensagem) + "</span>";
  input.setAttribute("aria-invalid", "true");
  const ds = (input.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
  if (!ds.includes(idErro)) ds.push(idErro);
  input.setAttribute("aria-describedby", ds.join(" "));
  // Some assim que a pessoa começa a corrigir
  input.addEventListener("input", () => limparCampoInvalido(input), { once: true });
}

// regras: [{ id: "login-email", validar: (valor) => "mensagem" | null }]
// Retorna true se está tudo certo. Se não, marca os campos, resume no aviso do
// formulário e leva o foco para o primeiro campo com problema.
function validarCampos(form, erroEl, regras) {
  const primeiros = [];
  regras.forEach((r) => {
    const input = form.querySelector("#" + r.id);
    if (!input) return;
    limparCampoInvalido(input);
    const msg = r.validar(input.value.trim(), input);
    if (msg) {
      marcarCampoInvalido(input, msg);
      primeiros.push(input);
    }
  });
  if (!primeiros.length) return true;
  mostrarErroForm(
    erroEl,
    primeiros.length === 1
      ? "Falta um ajuste para continuar. Veja o campo marcado."
      : "Faltam " + primeiros.length + " ajustes para continuar. Veja os campos marcados."
  );
  primeiros[0].focus();
  return false;
}

const Validar = {
  email(valor) {
    if (!valor) return "Digite seu e-mail. Exemplo: nome@email.com";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Esse e-mail parece incompleto. Use o formato nome@email.com";
    return null;
  },
  obrigatorio(msg) {
    return (valor) => (valor ? null : msg);
  },
  senhaNova(valor) {
    if (!valor) return "Crie uma senha para continuar.";
    if (valor.length < 4) return "Essa senha ficou curta. Use pelo menos 4 caracteres.";
    return null;
  },
};

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
