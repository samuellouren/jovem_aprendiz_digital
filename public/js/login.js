// login.js — lógica da tela de entrar (login.html)

if (Api.token()) window.location.href = "/dashboard.html";

// mostrarErroForm vem de api.js (ícone + texto, nunca só cor — WCAG 1.4.1).
// A mensagem chega pronta e sem termos técnicos de servidor; o role="alert"
// já está no HTML, então o leitor de tela anuncia assim que ela aparece.

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
