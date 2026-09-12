// verificar-email.js — confirma o token assim que a página abre

const params = new URLSearchParams(location.search);
const token = params.get("token");

const carregandoEl = document.getElementById("carregando");
const sucessoEl = document.getElementById("sucesso-form");
const erroEl = document.getElementById("erro-form");

async function confirmar() {
  if (!token) {
    carregandoEl.hidden = true;
    mostrarErroForm(erroEl, "Link de confirmação inválido. Verifique se copiou o endereço completo do e-mail.");
    return;
  }

  try {
    const dados = await Api.chamar("POST", "/verificar-email", { token });
    carregandoEl.hidden = true;
    mostrarSucessoForm(sucessoEl, dados.mensagem);
  } catch (err) {
    carregandoEl.hidden = true;
    mostrarErroForm(erroEl, err.message);
  }
}
confirmar();
