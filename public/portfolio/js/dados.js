/* ARQUIVO PARA EDITAR: é aqui que você atualiza os resultados dos testes com pessoas.
   O portfólio (index.html) e os slides (slides.html) leem este arquivo.

   status:  "feito"  -> teste realizado (preencha participantes, resultado e mudanca)
            "pendente" -> ainda sem participantes (aparece como "roteiro pronto")
   Escreva só o que aconteceu de verdade. Se uma pessoa disse algo, copie as palavras dela. */
window.PORTFOLIO = {
  links: {
    sistema: "/",
    figma: "https://www.figma.com/design/EtfKwLCiXPP42Y0eDv7FXT",
    videoNvda: "https://youtu.be/TBN7UMd0FWk",
    videoNvdaId: "TBN7UMd0FWk",
  },

  // Sessão com leitor de tela (NVDA). Escreva o que você ouviu; deixe [] se preferir só mostrar o vídeo.
  nvda: {
    funcionouBem: ["tudo de texto foi lido sem nenhum erro."],
    problemas: [
      "Botões de módulo da trilha: o nome que o leitor falava não continha o texto que aparece na tela. Isso quebrava o comando de voz (“clicar em Começar”), e o leitor de tela lia diferente do que estava escrito. Agora o nome acessível vem do próprio conteúdo, com “Módulo N:” só para leitor de tela. Exemplo do que o NVDA lê: “Módulo 1: Começar Organizando arquivos e pastas 7 seções · atividade”. Foi a única regra do axe violada na trilha, afetando os 3 botões.",
    ],
  },

  testes: [
    {
      nome: "Avaliação heurística (autoavaliação)",
      status: "feito",
      participantes: "1 (autor, com apoio de IA)",
      resultado:
        "11 achados: 2 corrigidos, 8 justificados com plano e 1 sem problema (seção Heurística).",
      mudanca:
        "Aviso de e-mail pendente em âmbar; campo da comunidade com altura maior.",
    },
    {
      nome: "Avaliação heurística cruzada (outro grupo)",
      status: "pendente",
      participantes: "",
      resultado: "",
      mudanca: "",
    },
    {
      nome: "Teste de 5 segundos",
      status: "pendente",
      participantes: "",
      resultado: "",
      mudanca: "",
    },
    {
      nome: "Teste A/B simples",
      status: "pendente",
      participantes: "",
      resultado: "",
      mudanca: "",
    },
    {
      nome: "Tarefas gravadas (3 a 5 pessoas)",
      status: "pendente",
      participantes: "",
      resultado: "",
      mudanca: "",
    },
    {
      nome: "Card sorting",
      status: "pendente",
      participantes: "",
      resultado: "",
      mudanca: "",
    },
    {
      nome: "Teste de árvore",
      status: "pendente",
      participantes: "",
      resultado: "",
      mudanca: "",
    },
    {
      nome: "Leitor de tela (NVDA)",
      status: "feito",
      participantes: "1 (autor)",
      resultado: "Tarefa completa gravada em vídeo, com o áudio do leitor.",
      mudanca: "Veja os achados na seção Acessibilidade.",
    },
  ],

  // O que o processo mostrou (edite com as suas palavras depois dos testes).
  aprendizados: [
    "O axe (ferramenta automática) deu 10 violações e não viu o problema mais sério: a borda dos campos tinha contraste 1,23:1. Só a medição à parte mostrou.",
    'Erro de formulário que só diz "algo deu errado" não ajuda. Ligar a mensagem ao campo e dizer como resolver mudou a tela inteira.',
    'Documentar o design system no Figma obrigou a conferir cada valor no CSS; o que estava só "de cabeça" apareceu.',
    "Sem testes com pessoas, tudo aqui é indício técnico, não prova de que o público entende o sistema. Esse é o principal limite deste trabalho.",
  ],
};

/* ---- Funções de exibição (não precisa mexer) ---- */
window.PORTFOLIO.rotuloStatus = function (t) {
  return t.status === "feito"
    ? '<span class="tag ok">✓ Realizado</span>'
    : '<span class="tag neutro">Roteiro pronto, sem participantes ainda</span>';
};
window.PORTFOLIO.renderTestes = function (el) {
  if (!el) return;
  var linhas = window.PORTFOLIO.testes
    .map(function (t) {
      var feito = t.status === "feito";
      return (
        "<tr><td><b>" +
        t.nome +
        "</b></td><td>" +
        window.PORTFOLIO.rotuloStatus(t) +
        "</td><td>" +
        (feito ? t.participantes : "—") +
        "</td><td>" +
        (feito ? t.resultado : "—") +
        "</td><td>" +
        (feito ? t.mudanca : "—") +
        "</td></tr>"
      );
    })
    .join("");
  el.innerHTML =
    '<div class="tabela-rolagem" tabindex="0" role="region" aria-label="Situação de cada teste (role para o lado, se precisar)"><table><caption>Situação de cada teste</caption><thead><tr><th scope="col">Teste</th><th scope="col">Situação</th><th scope="col">Participantes</th><th scope="col">Resultado</th><th scope="col">O que mudou</th></tr></thead><tbody>' +
    linhas +
    "</tbody></table></div>";
};
window.PORTFOLIO.renderLista = function (el, itens, vazio) {
  if (!el) return;
  el.innerHTML = itens.length
    ? "<ul>" +
      itens
        .map(function (i) {
          return "<li>" + i + "</li>";
        })
        .join("") +
      "</ul>"
    : vazio || "";
};
