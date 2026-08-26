// formato.js — Converte o texto das seções do módulo em HTML seguro.
//
// O texto vem do banco em formato bem simples (ver conteudo.js):
//   - linha em branco separa parágrafos
//   - linha começando com "- " vira item de lista
//   - **negrito** entre dois pares de asteriscos
//
// A ordem aqui é a parte que importa para a segurança: o texto é
// ESCAPADO PRIMEIRO e só depois as marcações são traduzidas para HTML.
// Assim, se alguém um dia cadastrar uma seção com <script> dentro, ele
// chega no navegador como texto visível, não como código executável.

const Formato = (function () {
  // Escapa &, <, > e aspas usando o próprio DOM (sem regex frágil).
  function escapar(txt) {
    const d = document.createElement("div");
    d.textContent = txt == null ? "" : String(txt);
    return d.innerHTML;
  }

  // Aplica só o negrito, e só DEPOIS do escape.
  function marcacoes(trechoEscapado) {
    return trechoEscapado.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  // Texto completo -> string de HTML com <p> e <ul>.
  function paraHtml(texto) {
    const blocos = String(texto == null ? "" : texto).split(/\n\s*\n/);

    return blocos
      .map((bloco) => {
        const linhas = bloco.split("\n").filter((l) => l.trim() !== "");
        if (!linhas.length) return "";

        // Bloco de lista: todas as linhas começam com "- "
        const ehLista = linhas.every((l) => l.trim().startsWith("- "));
        if (ehLista) {
          const itens = linhas
            .map((l) => "<li>" + marcacoes(escapar(l.trim().slice(2))) + "</li>")
            .join("");
          return "<ul class='secao-lista'>" + itens + "</ul>";
        }

        // Parágrafo comum (quebras simples viram espaço)
        return "<p>" + marcacoes(escapar(linhas.join(" "))) + "</p>";
      })
      .join("");
  }

  return { paraHtml, escapar };
})();
