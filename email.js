// email.js — envio de e-mails transacionais (verificação de conta e
// redefinição de senha) via Resend.
//
// Modo de teste do Resend: sem domínio próprio verificado, o remetente
// onboarding@resend.dev só consegue ENTREGAR e-mails para o endereço da
// própria conta Resend (a pessoa dona da RESEND_API_KEY). É suficiente
// para desenvolver e demonstrar o projeto localmente; para outras pessoas
// receberem de verdade, é preciso verificar um domínio próprio no Resend.
const { Resend } = require("resend");

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Remetente fixo por enquanto (domínio de teste, sem verificação própria).
//
// TROQUE AQUI quando houver um domínio verificado no Resend, por algo como:
//   const REMETENTE = "Jovem Aprendiz Digital <contato@seudominio.com>";
const REMETENTE = "onboarding@resend.dev";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

// Escapa dado vindo do usuário (nome, e-mail) antes de interpolar no HTML
// do corpo do e-mail — sem isso, um nome como "<b>oi</b>" ou contendo aspas
// entraria cru no template (ver templates abaixo).
function escHtml(txt) {
  return String(txt ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layoutEmail(titulo, corpoHtml) {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color:#1B3A4B; line-height: 1.5;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">${titulo}</h1>
      ${corpoHtml}
      <p style="margin-top: 32px; font-size: 12px; color: #6b7280;">
        Jovem Aprendiz Digital — se você não pediu isso, pode ignorar este e-mail.
      </p>
    </div>
  `;
}

function botao(href, texto) {
  return `<p><a href="${href}" style="display:inline-block; background:#BC5339; color:#fff; padding:12px 22px; border-radius:10px; text-decoration:none; font-weight:bold;">${texto}</a></p>`;
}

// Envia e não deixa o e-mail derrubar o fluxo principal (cadastro/login
// continuam funcionando mesmo se o Resend estiver fora do ar ou, no modo
// de teste, recusar um destinatário que não é o dono da conta).
async function enviar({ to, subject, html }) {
  if (!resend) {
    console.warn(`RESEND_API_KEY não configurada — e-mail "${subject}" não foi enviado (destinatário: ${to}).`);
    return;
  }
  try {
    const { error } = await resend.emails.send({ from: REMETENTE, to, subject, html });
    if (error) console.error(`Resend recusou o e-mail "${subject}" para ${to}:`, error);
  } catch (e) {
    console.error(`Falha ao enviar e-mail "${subject}" para ${to}:`, e);
  }
}

async function enviarEmailVerificacao(destino, nome, token) {
  const link = `${APP_URL}/verificar-email.html?token=${token}`;
  await enviar({
    to: destino,
    subject: "Confirme seu e-mail — Jovem Aprendiz Digital",
    html: layoutEmail(
      `Olá, ${escHtml(nome)}!`,
      `<p>Falta só confirmar seu e-mail para garantir o acesso à sua conta.</p>` +
        botao(link, "Confirmar meu e-mail") +
        `<p style="font-size:13px; color:#6b7280;">Ou copie e cole este link no navegador:<br>${link}</p>`
    ),
  });
}

async function enviarEmailRedefinicao(destino, nome, token) {
  const link = `${APP_URL}/redefinir-senha.html?token=${token}`;
  await enviar({
    to: destino,
    subject: "Redefinir sua senha — Jovem Aprendiz Digital",
    html: layoutEmail(
      `Olá, ${escHtml(nome)}!`,
      `<p>Recebemos um pedido para redefinir a senha da sua conta. Este link é válido por 1 hora.</p>` +
        botao(link, "Redefinir minha senha") +
        `<p style="font-size:13px; color:#6b7280;">Ou copie e cole este link no navegador:<br>${link}</p>` +
        `<p>Se você não pediu essa redefinição, é só ignorar este e-mail — sua senha continua a mesma.</p>`
    ),
  });
}

module.exports = { enviarEmailVerificacao, enviarEmailRedefinicao };
