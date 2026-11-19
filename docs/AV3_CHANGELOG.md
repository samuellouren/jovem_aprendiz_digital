# 3ª AV — Changelog desde a 2ª AV

Cada linha: o que mudou, por quê, e onde ver.

## Após a avaliação da 2ª AV (pedidos da professora, 23/10/2026)

| Mudança | Por quê |
|---|---|
| Fontes tipográficas informadas no design system (Nunito, pesos 600/800/900, e a fonte de reserva do sistema) | Pedido da professora: informar as fontes das letras |
| Capítulos dos módulos com título próprio e selo de tipo (Introdução, Exemplo prático, Dica e erro comum, Resumo) em vez de "Explicação, Explicação…" | Pedido da professora: deixar os capítulos mais claros |
| Cada pergunta da atividade explica a resposta após acerto ou erro; o botão "Verificar respostas" vira "Refazer atividade" quando há erro | Pedido da professora; também atende à heurística 9 de Nielsen (ajudar a reconhecer e corrigir erros) |

Detalhes e capturas: `auditorias/av3/`.

## 3ª AV (19/11/2026)

| Mudança | Por quê | Critério |
|---|---|---|
| Página 404 amigável (`public/404.html`), com status HTTP 404 correto, saída para o início e para a comunidade | A anterior era só `<h1>404</h1>`, sem idioma, título nem região principal (4 violações no axe) | Microinterações; heurística 9 |
| Botões de módulo: nome acessível vem do texto visível | O leitor de tela e o comando de voz não batiam com o que estava escrito na tela (3 violações no axe) | WCAG 2.5.3 |
| Borda de campos e alternativas mais escura (`--border-campo`, 3,47:1) | Contorno em 1,23:1 deixava o campo quase invisível para baixa visão | WCAG 1.4.11 |
| Erro de formulário junto do campo: texto + ícone + `aria-invalid` + `aria-describedby` + foco | Erro era só um aviso geral; a pessoa não sabia qual campo corrigir | WCAG 3.3.1, 3.3.3; heurísticas 5 e 9 |
| Mensagens que dizem como resolver (ex.: "Use o formato nome@email.com") | Mensagens genéricas | Linguagem; heurística 9 |
| Confirmação "Publicado! Sua mensagem já está no mural da turma." ao publicar | A publicação aparecia na lista, mas sem confirmação anunciada | Heurística 1 (visibilidade do status) |
| Estado vazio da comunidade: ícone centralizado acima do texto | O ícone ficava solto ao lado do texto | Microinterações |
| Relatório antes/depois, zoom 200%, daltonismo, alvos de toque, árvore de acessibilidade | Evidências da 3ª AV | `docs/AV3_RELATORIO_ACESSIBILIDADE.md` |
| Mapa do site e fluxograma da tarefa principal | Exigência da 3ª AV | `docs/AV3_ARQUITETURA_DA_INFORMACAO.md` |

## Ainda pendente (depende de outras pessoas)

Avaliação heurística cruzada, teste A/B, teste de 5 segundos, card sorting, teste de árvore, sessão com leitor de tela e atualização de persona/jornada com os achados. Veja `docs/AV3_KIT_TESTES.md`.
