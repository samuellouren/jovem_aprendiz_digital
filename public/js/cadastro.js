// cadastro.js — lógica da tela de criar conta (cadastro.html)

if (Api.token()) window.location.href = "/dashboard.html";

// mostrarErroForm vem de api.js (ícone + texto, nunca só cor — WCAG 1.4.1).
// A mensagem chega pronta e sem termos técnicos de servidor; o role="alert"
// já está no HTML, então o leitor de tela anuncia assim que ela aparece.

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
