// redefinir-senha.js — lê o token da URL e define a nova senha

const params = new URLSearchParams(location.search);
const token = params.get("token");

const painelSemToken = document.getElementById("aviso-sem-token");
const painelForm = document.getElementById("painel-form");
const painelSucesso = document.getElementById("painel-sucesso");

if (!token) {
  painelSemToken.hidden = false;
} else {
  painelForm.hidden = false;
}

if (painelForm.hidden === false) {
  document.getElementById("form-redefinir-senha").addEventListener("submit", async (e) => {
    e.preventDefault();
    const erroEl = document.getElementById("erro-form");
    erroEl.classList.remove("show");

    const senha = document.getElementById("nova-senha").value;
    const confirmar = document.getElementById("confirmar-senha").value;
    if (senha !== confirmar) {
      mostrarErroForm(erroEl, "As duas senhas precisam ser iguais.");
      return;
    }

    const botao = e.target.querySelector("button[type=submit]");
    const rotuloOriginal = botao.textContent;
    botao.disabled = true;
    botao.textContent = "Salvando...";

    try {
      const dados = await Api.chamar("POST", "/redefinir-senha", { token, senha });
      painelForm.hidden = true;
      mostrarSucessoForm(document.getElementById("sucesso-form"), dados.mensagem);
      painelSucesso.hidden = false;
    } catch (err) {
      // Token inválido/expirado: a mensagem do servidor já é clara, mas
      // troca pra tela de "pedir novo link" em vez de deixar o formulário
      // ali sem saída.
      erroEl.classList.remove("show");
      painelForm.hidden = true;
      document.getElementById("texto-aviso-sem-token").textContent = err.message;
      painelSemToken.hidden = false;
    }
  });
}
