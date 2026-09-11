// index.js — lógica da tela de apresentação, login e cadastro (index.html)

if (Api.token()) window.location.href = "/dashboard.html";

function mostrarAba(qual) {
  const entrando = qual === "entrar";
  document.getElementById("tab-entrar").classList.toggle("active", entrando);
  document.getElementById("tab-entrar").setAttribute("aria-pressed", String(entrando));
  document.getElementById("tab-cadastrar").classList.toggle("active", !entrando);
  document.getElementById("tab-cadastrar").setAttribute("aria-pressed", String(!entrando));

  const painelEntrar = document.getElementById("painel-entrar");
  const painelCadastrar = document.getElementById("painel-cadastrar");
  painelEntrar.classList.toggle("active", entrando);
  painelEntrar.hidden = !entrando;
  painelCadastrar.classList.toggle("active", !entrando);
  painelCadastrar.hidden = entrando;
}

// Troca entre a apresentação e o formulário.
//
// Cada troca entra no histórico (pushState) por dois motivos: o botão
// "voltar" do celular precisa devolver a pessoa à apresentação em vez de
// tirá-la do site, e o endereço passa a poder ser guardado — quem sai da
// conta cai em "/#entrar" (ver Api.sair) e vai direto para o login, sem
// reler a apresentação inteira toda vez.
function mostrarVista(aba) {
  const noAcesso = Boolean(aba);
  document.getElementById("vista-apresentacao").classList.toggle("ativa", !noAcesso);
  document.getElementById("vista-acesso").classList.toggle("ativa", noAcesso);
  if (noAcesso) {
    mostrarAba(aba);
    // Foco no título da vista, não no campo: no celular, focar o input
    // abriria o teclado por cima da tela antes de a pessoa ver onde chegou.
    document.getElementById("titulo-acesso").focus();
  }
  window.scrollTo(0, 0);
}

function abaDoEndereco() {
  if (location.hash === "#entrar") return "entrar";
  if (location.hash === "#criar-conta") return "cadastrar";
  return null;
}

function irParaAcesso(aba) {
  history.pushState(null, "", aba === "entrar" ? "#entrar" : "#criar-conta");
  mostrarVista(aba);
}

function voltarParaApresentacao() {
  history.pushState(null, "", location.pathname);
  mostrarVista(null);
}

window.addEventListener("popstate", () => mostrarVista(abaDoEndereco()));

document.getElementById("btn-entrar-topo").addEventListener("click", () => irParaAcesso("entrar"));
document.getElementById("btn-criar-conta").addEventListener("click", () => irParaAcesso("cadastrar"));
document.getElementById("btn-ja-tenho").addEventListener("click", () => irParaAcesso("entrar"));
document.getElementById("btn-voltar-apre").addEventListener("click", voltarParaApresentacao);
document.getElementById("tab-entrar").addEventListener("click", () => mostrarAba("entrar"));
document.getElementById("tab-cadastrar").addEventListener("click", () => mostrarAba("cadastrar"));

// Estado inicial: respeita o endereço com que a pessoa chegou.
mostrarVista(abaDoEndereco());

// Mostra o erro de um formulário de um jeito que o leitor de tela anuncia
// na hora (role="alert" já está no HTML) e sem termos técnicos de servidor.
function mostrarErroForm(erroEl, mensagem) {
  erroEl.textContent = mensagem;
  erroEl.classList.add("show");
}

document.getElementById("form-entrar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erroEl = document.getElementById("erro-entrar");
  erroEl.classList.remove("show");
  const botao = e.target.querySelector("button[type=submit]");
  const rotuloOriginal = botao.textContent;
  botao.disabled = true;
  botao.textContent = "Entrando...";
  try {
    const dados = await Api.chamar("POST", "/login", {
      email: document.getElementById("login-email").value,
      senha: document.getElementById("login-senha").value,
    });
    Api.salvarSessao(dados.token, dados.usuario);
    window.location.href = "/dashboard.html";
  } catch (err) {
    mostrarErroForm(erroEl, err.message);
    botao.disabled = false;
    botao.textContent = rotuloOriginal;
  }
});

document.getElementById("form-cadastrar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erroEl = document.getElementById("erro-cadastrar");
  erroEl.classList.remove("show");
  const botao = e.target.querySelector("button[type=submit]");
  const rotuloOriginal = botao.textContent;
  botao.disabled = true;
  botao.textContent = "Criando conta...";
  try {
    const dados = await Api.chamar("POST", "/cadastro", {
      nome: document.getElementById("cad-nome").value,
      email: document.getElementById("cad-email").value,
      senha: document.getElementById("cad-senha").value,
    });
    Api.salvarSessao(dados.token, dados.usuario);
    window.location.href = "/dashboard.html";
  } catch (err) {
    mostrarErroForm(erroEl, err.message);
    botao.disabled = false;
    botao.textContent = rotuloOriginal;
  }
});
