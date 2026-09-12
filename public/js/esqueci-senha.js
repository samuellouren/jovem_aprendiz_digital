// esqueci-senha.js — pede o e-mail e dispara o link de redefinição

document.getElementById("form-esqueci-senha").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erroEl = document.getElementById("erro-form");
  const sucessoEl = document.getElementById("sucesso-form");
  erroEl.classList.remove("show");
  sucessoEl.classList.remove("show");

  const form = e.target;
  const botao = form.querySelector("button[type=submit]");
  const rotuloOriginal = botao.textContent;
  botao.disabled = true;
  botao.textContent = "Enviando...";

  try {
    const dados = await Api.chamar("POST", "/esqueci-senha", {
      email: document.getElementById("email").value,
    });
    mostrarSucessoForm(sucessoEl, dados.mensagem);
    form.reset();
    botao.textContent = rotuloOriginal;
    // Continua desabilitado depois do envio: pedir de novo sem sair da
    // tela não muda o resultado (a resposta é sempre a mesma mensagem).
  } catch (err) {
    mostrarErroForm(erroEl, err.message);
    botao.disabled = false;
    botao.textContent = rotuloOriginal;
  }
});
