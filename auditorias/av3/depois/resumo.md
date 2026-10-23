# Auditoria de acessibilidade: depois

Ferramentas: axe-core (WCAG 2.0/2.1 A e AA, tags wcag2a, wcag2aa, wcag21a, wcag21aa) e Lighthouse (categoria accessibility, 0-100). Viewports 390x844 (mobile) e 1440x900 (desktop). Servidor local em http://localhost:3000.

## Parte 1: 9 páginas (13 estados) x 2 viewports

Lighthouse foi rodado só nos 9 estados de página "puros" (LH "-" = não medido).

| Página | Axe mobile (viol. / incomplete) | LH mobile | Console mobile | Axe desktop (viol. / incomplete) | LH desktop | Console desktop |
|---|---|---|---|---|---|---|
| index | 0 / 0 | 100 | 0 | 0 / 0 | 100 | 0 |
| login | 0 / 0 | 100 | 0 | 0 / 1 | 100 | 0 |
| cadastro | 0 / 0 | 100 | 0 | 0 / 1 | 100 | 0 |
| esqueci-senha | 0 / 0 | 100 | 0 | 0 / 1 | 100 | 0 |
| redefinir-senha | 0 / 0 | 100 | 0 | 0 / 1 | 100 | 0 |
| verificar-email | 0 / 0 | 100 | 0 | 0 / 1 | 100 | 0 |
| dashboard | 0 / 0 | 100 | 0 | 0 / 0 | 100 | 0 |
| trilha | 0 / 0 | 100 | 0 | 0 / 0 | 100 | 0 |
| comunidade | 0 / 1 | 100 | 0 | 0 / 1 | 100 | 0 |
| dashboard-progresso (joana) | 0 / 1 | - | 0 | 0 / 1 | - | 0 |
| trilha-progresso (joana) | 0 / 0 | - | 0 | 0 / 0 | - | 0 |
| trilha-modulo | 0 / 1 | - | 0 | 0 / 1 | - | 0 |
| trilha-atividade | 0 / 1 | - | 0 | 0 / 1 | - | 0 |

Sem violações axe, sem auditorias Lighthouse reprovadas, sem erros de console e sem falhas de execução.

## Parte 2: estados da atividade (trilha 1, módulo 1)

| Estado | Mobile (axe viol. / incomplete, console, scroll H) | Desktop (axe viol. / incomplete, console, scroll H) | Checks |
|---|---|---|---|
| modulo | 0 / 1, 0, não | 0 / 1, 0, não | ok |
| atividade-erro | 0 / 1, 0, não | 0 / 1, 0, não | ok |
| atividade-refazer | 0 / 1, 0, não | 0 / 1, 0, não | ok |
| atividade-certa | 0 / 1, 0, não | 0 / 1, 0, não | ok |
| atividade-concluida-reaberta | 0 / 1, 0, não | 0 / 1, 0, não | ok |

Checks: explicação em cada questão ([1,1] nas 2 questões) e botão "Refazer atividade" no estado de erro; nenhum radio marcado nem desabilitado após refazer; barra concluída no acerto e ao reabrir; explicações visíveis ao reabrir sem verificar. Todos passaram.

## Violações

Nenhuma violação axe e nenhuma auditoria Lighthouse reprovada, nos 13 estados x 2 viewports.

## Incomplete por id

Todos os incomplete são do id `color-contrast` (não são violações: o axe não conseguiu concluir a checagem de contraste automaticamente; exige revisão manual).

- login, cadastro, esqueci-senha, redefinir-senha, verificar-email (desktop): `.painel-marca-titulo` e `.painel-marca-texto li`.
- comunidade (mobile e desktop): `#novo-post`.
- dashboard-progresso (mobile e desktop): `.anel-num` e `.anel-rotulo`.
- trilha-modulo e trilha-atividade (mobile e desktop): itens do stepper `.passo` e `.passo-teste`.
- Estados da Parte 2: `color-contrast` x1 em cada estado e viewport (ver estados.json).

## Arquivos

- Páginas: `auditorias/av3/depois/paginas/` (26 PNG, resultado.json, resumo.md)
- Incomplete por id das páginas: `auditorias/av3/depois/incomplete-paginas.json`
- Estados da atividade: `auditorias/av3/depois/estados.json`
- Fotos da atividade: `auditorias/av3/depois/mobile-{modulo,modulo-stepper,atividade-erro,atividade-refazer,atividade-certa,atividade-reaberta}.png` e `desktop-*` com os mesmos nomes
- Este resumo: `auditorias/av3/depois/resumo.md`

Duas fotos conferidas com Read: `mobile-atividade-erro.png` (questão errada com dica, certa com explicação, botões Refazer e Voltar) e `desktop-modulo.png` (módulo aberto com stepper). Ambas com conteúdo, não em branco.

Scripts (em TOOLS, não no projeto): `auditar.js`, `auditar-av3-estados.js` (novo), `incomplete.js`.

## Nova rodada dos estados após as correções do revisor

Depois do commit `7ad71b2` (posição da alternativa certa variando, dicas reescritas), a Parte 2 foi rodada de novo (`estados.json` e as fotos `mobile-`/`desktop-` desta pasta são dessa nova rodada): **0 violações axe** nos 5 estados × 2 viewports, todos os checks passando e nenhuma rolagem horizontal. O único erro de console registrado (`mobile-modulo`, 404) é o `/favicon.ico` pedido quando o roteiro abre `/api/resumo` (uma resposta JSON) para gravar a sessão no navegador — efeito do roteiro de teste, não das páginas do sistema (as 9 páginas da Parte 1 têm 0 erros de console).

Os `incomplete` são todos `color-contrast` não confirmados, os mesmos falsos positivos já documentados em `DOCUMENTACAO_IHC.md` (seção 4): sombra de fade sobre as pastilhas do stepper, gradiente do painel de marca, número sobre o anel de progresso e a alça de redimensionar do `textarea`.
