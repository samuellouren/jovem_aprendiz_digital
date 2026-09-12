// index.js — tela de apresentação (index.html)
//
// Login e cadastro viraram páginas próprias (login.html / login.js e
// cadastro.html / cadastro.js) — os botões daqui são links diretos para
// elas, sem troca de vista em JS.

if (Api.token()) window.location.href = "/dashboard.html";
