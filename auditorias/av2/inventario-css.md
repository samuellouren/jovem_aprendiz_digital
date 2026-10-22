# Inventário de CSS: public/css/style.css

Arquivo analisado: `public/css/style.css` (1153 linhas). Somente leitura; nenhum outro arquivo foi alterado.

Escopo: o bloco `:root` (linhas 6 a 23) foi excluído das tabelas 1 e 2 e das declarações de font-family. Cada linha da tabela corresponde a uma declaração. Quando uma declaração tem vários valores (ex.: `padding: 20px 18px 90px`), a coluna de valor mostra a declaração inteira e o token sugerido mostra o mapeamento de cada valor, na mesma ordem.

Regra de mapeamento usada: valor → token da escala mais próximo; empate arredonda para cima (para valores negativos, empate vai para o maior módulo, coerente com o caso `-14px`); `0` permanece `0`. Os valores ⚠ são aqueles em que o arredondamento muda o valor em mais de 4px.

Observação sobre a regra: o enunciado dá o exemplo "18/20→--s5", mas pela regra de proximidade 18px fica a 2px de 16px (--s4) e a 6px de 24px (--s5). Apliquei a regra de proximidade e marquei o caso na tabela 2 (token --s4). Se a intenção for --s5 para 18px, ajustar o mapeamento antes de aplicar os tokens.

---

## Tabela 1: cores literais fora do `:root`

Total: 53 declarações com cor literal, mais 1 ocorrência em comentário (linha 1121). Valores literais distintos: 22.

| Linha | Seletor | Propriedade | Valor |
|---|---|---|---|
| 51 | `.skip-link` | color | `#fff` |
| 142 | `.topbar` | color | `#fff` |
| 162 | `.topbar .voltar` | color | `#fff` |
| 169 | `.topbar strong, .topbar .topbar-titulo` | color | `#fff` |
| 172 | `.topbar small` | color | `#B9CBD4` |
| 175 | `.topbar button.sair` | background | `rgba(255,255,255,0.12)` |
| 176 | `.topbar button.sair` | border | `1px solid rgba(255,255,255,0.3)` |
| 177 | `.topbar button.sair` | color | `#fff` |
| 199 | `.btn-primary` | color | `#fff` |
| 213 | `input[type=text], input[type=email], input[type=password], textarea` | background | `#fff` |
| 284 | `.btn-entrar-topo:hover` | color | `#fff` |
| 285 | `.btn-entrar-topo:active` | color | `#fff` |
| 396 | `.resumo-card` | color | `#fff` |
| 402 | `.resumo-card .barra-fundo` | background | `rgba(255,255,255,0.18)` |
| 414 | `.resumo-card .resumo-texto` | color | `#B9CBD4` |
| 417 | `.resumo-card.boas-vindas h2` | color | `#fff` |
| 418 | `.resumo-card.boas-vindas p` | color | `#B9CBD4` |
| 421 | `.btn-comecar` | color | `#fff` |
| 464 | `.trilha-cabecalho` | color | `#fff` |
| 469 | `.trilha-cabecalho h1` | color | `#fff` |
| 470 | `.trilha-cabecalho .desc` | color | `#B9CBD4` |
| 473 | `.etiqueta-nivel` | background | `rgba(0,0,0,0.18)` |
| 481 | `.trilha-cabecalho .barra-fundo` | background | `rgba(255,255,255,0.18)` |
| 490 | `.trilha-cabecalho .progresso-texto` | color | `#B9CBD4` |
| 515 | `.modulo-card:active` | background | `#FAFCFD` |
| 516 | `.modulo-card.feito` | border-color | `#BFE3D2` |
| 527 | `.modulo-card.feito .modulo-numero` | color | `#fff` |
| 618 | `.stepper-wrap::before` | background | `linear-gradient(to right, rgba(27,58,75,0.08), rgba(27,58,75,0))` |
| 619 | `.stepper-wrap::after` | background | `linear-gradient(to left, rgba(27,58,75,0.08), rgba(27,58,75,0))` |
| 649 | `.passo.visitado` | border-color | `#BFE3D2` |
| 651 | `.passo.atual` | color | `#fff` |
| 653 | `.passo.passo-teste` | border-color | `#E9C3B7` |
| 654 | `.passo.passo-teste.atual` | color | `#fff` |
| 697 | `.secao-exemplo` | background | `#FFFCF6` |
| 703 | `.secao-dica` | background | `#FFF9F7` |
| 733 | `.secao-nav .btn-proximo` | color | `#fff` |
| 741 | `.bloco-teste` | border | `2px solid #F0DCD4` |
| 743 | `.bloco-teste` | background | `#FFF9F7` |
| 753 | `.teste-cabecalho` | border-bottom | `1.5px solid #F3DDD6` |
| 759 | `.teste-selo` | color | `#fff` |
| 785 | `.questao` | background | `#fff` |
| 817 | `.alternativa` | background | `#fff` |
| 830 | `.alternativa:has(input:checked)` | background | `#F0F7F8` |
| 831 | `.alternativa.marcada` | background | `#F0F7F8` |
| 857 | `.feedback-final.tente-de-novo` | background | `#FDF3E2` |
| 857 | `.feedback-final.tente-de-novo` | color | `#8A5A12` |
| 920 | `.tabbar` | background | `#fff` |
| 963 | `.convite-mural:active` | background | `#D9EDE3` |
| 1013 | `.tabbar-inline` (dentro de @media min-width 860px) | background | `#fff` |
| 1105 | `.painel-marca` (dentro de @media min-width 860px) | background | `linear-gradient(160deg, var(--navy) 0%, #12262F 100%)` |
| 1106 | `.painel-marca` (dentro de @media min-width 860px) | color | `#fff` |
| 1111 | `.painel-marca-icone` (dentro de @media min-width 860px) | background | `rgba(255,255,255,0.14)` |
| 1125 | `.painel-marca-texto` (dentro de @media min-width 860px) | color | `#D7E2E7` |
| 1121 | (comentário, não declaração) | - | `#D7E2E7` |

---

## Tabela 2: espaçamentos em px (padding, margin, gap)

Total: 178 declarações com px. Valores ⚠ (mudança do arredondamento maior que 4px): linhas 117, 986, 1086, 1104 e 1137.

| Linha | Seletor | Propriedade | Valor | Token sugerido |
|---|---|---|---|---|
| 36 | `.sr-only` | margin | `-1px` | `calc(-1 * var(--s1))` |
| 52 | `.skip-link` | padding | `12px 18px` | `var(--s3) var(--s4)` (18 → s4, ver observação) |
| 117 | `.container` | padding | `20px 18px 90px` | `var(--s5) var(--s4) var(--s7)` ⚠ (90 → 48, muda 42px) |
| 143 | `.topbar` | padding | `16px 18px` | `var(--s4) var(--s4)` |
| 146 | `.topbar` | gap | `10px` | `var(--s3)` |
| 161 | `.topbar .voltar` | margin-left | `-12px` | `calc(-1 * var(--s3))` |
| 179 | `.topbar button.sair` | padding | `10px 16px` | `var(--s3) var(--s4)` |
| 190 | `button, .btn` | padding | `14px 18px` | `var(--s4) var(--s4)` |
| 196 | `button, .btn` | gap | `8px` | `var(--s2)` |
| 202 | `.btn-link` | padding | `10px` | `var(--s3)` |
| 206 | `label` | margin | `14px 0 6px` | `var(--s4) 0 var(--s2)` |
| 210 | `input[type=text], input[type=email], input[type=password], textarea` | padding | `13px 14px` | `var(--s3) var(--s4)` |
| 220 | `.erro-msg` | padding | `10px 14px` | `var(--s3) var(--s4)` |
| 220 | `.erro-msg` | margin-top | `12px` | `var(--s3)` |
| 221 | `.erro-msg` | gap | `8px` | `var(--s2)` |
| 224 | `.erro-msg .icone` | margin-top | `1px` | `var(--s1)` |
| 228 | `.sucesso-msg` | padding | `10px 14px` | `var(--s3) var(--s4)` |
| 228 | `.sucesso-msg` | margin-top | `12px` | `var(--s3)` |
| 229 | `.sucesso-msg` | gap | `8px` | `var(--s2)` |
| 232 | `.sucesso-msg .icone` | margin-top | `1px` | `var(--s1)` |
| 240 | `.card` | padding | `18px` | `var(--s4)` |
| 241 | `.card` | margin-bottom | `14px` | `var(--s4)` |
| 248 | `.hero` | padding | `34px 6px 10px` | `var(--s6) var(--s2) var(--s3)` |
| 252 | `.hero .marca` | margin | `0 auto 12px` | `0 auto var(--s3)` |
| 261 | `.hero-compacto` | padding | `10px 6px 2px` | `var(--s3) var(--s2) var(--s1)` |
| 263 | `.hero-compacto .marca` | margin-bottom | `10px` | `var(--s3)` |
| 267 | `.acoes-form` | margin-top | `20px` | `var(--s5)` |
| 267 | `.acoes-form` | gap | `4px` | `var(--s1)` |
| 272 | `.apre-topo` | margin-bottom | `-14px` | `calc(-1 * var(--s4))` |
| 281 | `.btn-entrar-topo` | padding | `10px 18px` | `var(--s3) var(--s4)` |
| 287 | `.hero-apre` | padding-top | `14px` | `var(--s4)` |
| 293 | `.selos` | gap | `7px` | `var(--s2)` |
| 295 | `.selos` | margin | `6px 0 22px` | `var(--s2) 0 var(--s5)` |
| 299 | `.selo` | gap | `5px` | `var(--s1)` |
| 303 | `.selo` | padding | `7px 13px` | `var(--s2) var(--s3)` |
| 310 | `.apre-titulo` | gap | `8px` | `var(--s2)` |
| 312 | `.apre-titulo` | margin | `24px 0 12px` | `var(--s5) 0 var(--s3)` |
| 321 | `.previa-titulo` | margin-bottom | `4px` | `var(--s1)` |
| 329 | `.previa-meta` | margin-top | `7px` | `var(--s2)` |
| 333 | `.passos-como` | margin | `0 0 16px` | `0 0 var(--s4)` |
| 333 | `.passos-como` | padding | `18px 16px` | `var(--s4) var(--s4)` (18 → s4, ver observação) |
| 335 | `.passos-como li` | gap | `12px` | `var(--s3)` |
| 336 | `.passos-como li` | margin-bottom | `14px` | `var(--s4)` |
| 351 | `.apre-tempo` | gap | `8px` | `var(--s2)` |
| 353 | `.apre-tempo` | margin | `0 0 14px` | `0 0 var(--s4)` |
| 353 | `.apre-tempo` | padding | `0 2px` | `0 var(--s1)` |
| 358 | `.apre-mural` | gap | `9px` | `var(--s2)` |
| 361 | `.apre-mural` | padding | `12px 14px` | `var(--s3) var(--s4)` |
| 363 | `.apre-mural` | margin | `0 0 22px` | `0 0 var(--s5)` |
| 365 | `.apre-mural .icone` | margin-top | `2px` | `var(--s1)` |
| 368 | `.apre-acoes` | gap | `8px` | `var(--s2)` |
| 374 | `.btn-ja-tenho` | padding | `12px` | `var(--s3)` |
| 381 | `.apre-rodape` | margin-top | `16px` | `var(--s4)` |
| 385 | `.btn-voltar-apre` | gap | `6px` | `var(--s2)` (6 → s2, empate para cima) |
| 389 | `.btn-voltar-apre` | padding | `10px 12px 10px 0` | `var(--s3) var(--s3) var(--s3) 0` |
| 390 | `.btn-voltar-apre` | margin | `2px 0 -8px -2px` | `var(--s1) 0 calc(-1 * var(--s2)) calc(-1 * var(--s1))` |
| 398 | `.resumo-card` | padding | `20px` | `var(--s5)` |
| 399 | `.resumo-card` | margin-bottom | `18px` | `var(--s4)` (18 → s4, ver observação) |
| 405 | `.resumo-card .barra-fundo` | margin-top | `12px` | `var(--s3)` |
| 414 | `.resumo-card .resumo-texto` | margin-top | `8px` | `var(--s2)` |
| 417 | `.resumo-card.boas-vindas h2` | margin | `0 0 6px` | `0 0 var(--s2)` |
| 418 | `.resumo-card.boas-vindas p` | margin | `0 0 16px` | `0 0 var(--s4)` |
| 420 | `.btn-comecar` | gap | `8px` | `var(--s2)` |
| 422 | `.btn-comecar` | padding | `14px 18px` | `var(--s4) var(--s4)` |
| 429 | `.trilha-card` | gap | `14px` | `var(--s4)` |
| 447 | `.trilha-nivel` | margin-bottom | `3px` | `var(--s1)` |
| 449 | `.trilha-progresso-texto` | margin-top | `6px` | `var(--s2)` |
| 450 | `.trilha-titulo` | margin-bottom | `4px` | `var(--s1)` |
| 466 | `.trilha-cabecalho` | padding | `20px 18px` | `var(--s5) var(--s4)` |
| 467 | `.trilha-cabecalho` | margin-bottom | `18px` | `var(--s4)` |
| 469 | `.trilha-cabecalho h1` | margin-bottom | `6px` | `var(--s2)` |
| 470 | `.trilha-cabecalho .desc` | margin | `0 0 14px` | `0 0 var(--s4)` |
| 472 | `.etiqueta-nivel` | gap | `6px` | `var(--s2)` |
| 477 | `.etiqueta-nivel` | padding | `4px 11px` | `var(--s1) var(--s3)` |
| 478 | `.etiqueta-nivel` | margin-bottom | `10px` | `var(--s3)` |
| 489 | `.trilha-cabecalho .progresso-texto` | gap | `6px` | `var(--s2)` |
| 490 | `.trilha-cabecalho .progresso-texto` | margin-top | `8px` | `var(--s2)` |
| 495 | `.secao-titulo-lista` | gap | `8px` | `var(--s2)` |
| 498 | `.secao-titulo-lista` | margin | `0 0 12px` | `0 0 var(--s3)` |
| 504 | `.modulo-card` | gap | `13px` | `var(--s3)` |
| 510 | `.modulo-card` | padding | `15px 14px` | `var(--s4) var(--s4)` |
| 511 | `.modulo-card` | margin-bottom | `11px` | `var(--s3)` |
| 536 | `.modulo-titulo` | margin-bottom | `3px` | `var(--s1)` |
| 541 | `.modulo-resumo` | margin-bottom | `7px` | `var(--s2)` |
| 545 | `.modulo-meta` | gap | `4px 12px` | `var(--s1) var(--s3)` |
| 548 | `.modulo-meta span` | gap | `4px` | `var(--s1)` |
| 557 | `.modulo-topo` | padding | `16px 16px 14px` | `var(--s4) var(--s4) var(--s4)` |
| 558 | `.modulo-topo` | margin-bottom | `14px` | `var(--s4)` |
| 561 | `.btn-voltar-modulos` | gap | `6px` | `var(--s2)` |
| 563 | `.btn-voltar-modulos` | padding | `0 12px 10px 0` | `0 var(--s3) var(--s3) 0` |
| 564 | `.btn-voltar-modulos` | margin-left | `-2px` | `calc(-1 * var(--s1))` |
| 572 | `.modulo-etiqueta` | margin-bottom | `4px` | `var(--s1)` |
| 574 | `.modulo-topo h1` | margin-bottom | `8px` | `var(--s2)` |
| 575 | `.modulo-topo .modulo-resumo` | margin-bottom | `14px` | `var(--s4)` |
| 588 | `.modulo-progresso .passo-texto` | gap | `8px` | `var(--s2)` |
| 589 | `.modulo-progresso .passo-texto` | margin-top | `7px` | `var(--s2)` |
| 600 | `.stepper-wrap` | margin | `0 -18px` | `0 calc(-1 * var(--s4))` (-18 → -16, ver observação) |
| 627 | `.stepper` | gap | `7px` | `var(--s2)` |
| 629 | `.stepper` | padding | `2px 18px 12px` | `var(--s1) var(--s4) var(--s3)` |
| 636 | `.passo` | gap | `6px` | `var(--s2)` |
| 641 | `.passo` | padding | `7px 14px` | `var(--s2) var(--s4)` |
| 661 | `.secao` | padding | `20px 18px` | `var(--s5) var(--s4)` |
| 662 | `.secao` | margin-bottom | `14px` | `var(--s4)` |
| 666 | `.secao-tipo` | gap | `6px` | `var(--s2)` |
| 670 | `.secao-tipo` | margin-bottom | `8px` | `var(--s2)` |
| 675 | `.secao h2` | margin-bottom | `14px` | `var(--s4)` |
| 717 | `.secao-nav` | gap | `10px` | `var(--s3)` |
| 718 | `.secao-nav` | margin-bottom | `10px` | `var(--s3)` |
| 722 | `.secao-nav button` | padding | `13px 12px` | `var(--s3) var(--s3)` |
| 744 | `.bloco-teste` | padding | `18px 15px` | `var(--s4) var(--s4)` (18 → s4, ver observação) |
| 745 | `.bloco-teste` | margin-bottom | `14px` | `var(--s4)` |
| 750 | `.teste-cabecalho` | gap | `12px` | `var(--s3)` |
| 751 | `.teste-cabecalho` | padding-bottom | `14px` | `var(--s4)` |
| 752 | `.teste-cabecalho` | margin-bottom | `16px` | `var(--s4)` |
| 764 | `.teste-cabecalho h2` | margin | `0 0 3px` | `0 0 var(--s1)` |
| 783 | `.questao` | padding | `14px` | `var(--s4)` |
| 784 | `.questao` | margin-bottom | `12px` | `var(--s3)` |
| 793 | `.questao-enunciado` | margin-bottom | `10px` | `var(--s3)` |
| 805 | `.questao-numero` | margin-bottom | `4px` | `var(--s1)` |
| 812 | `.alternativa` | gap | `10px` | `var(--s3)` |
| 813 | `.alternativa` | padding | `11px 12px` | `var(--s3) var(--s3)` |
| 816 | `.alternativa` | margin-bottom | `8px` | `var(--s2)` |
| 827 | `.alternativa input[type=radio]` | margin | `1px 0 0` | `var(--s1) 0 0` |
| 834 | `.feedback-questao` | margin-top | `10px` | `var(--s3)` |
| 839 | `.feedback-questao` | gap | `7px` | `var(--s2)` |
| 848 | `.feedback-final` | padding | `14px` | `var(--s4)` |
| 849 | `.feedback-final` | margin-top | `12px` | `var(--s3)` |
| 854 | `.feedback-final.show` | gap | `10px` | `var(--s3)` |
| 858 | `.feedback-final .sub` | margin-top | `4px` | `var(--s1)` |
| 863 | `.selo-concluida` | gap | `6px` | `var(--s2)` |
| 869 | `.selo-concluida` | padding | `4px 12px` | `var(--s1) var(--s3)` |
| 870 | `.selo-concluida` | margin-top | `10px` | `var(--s3)` |
| 876 | `.post-data` | margin-bottom | `6px` | `var(--s2)` |
| 882 | `.btn-responder` | gap | `7px` | `var(--s2)` |
| 885 | `.btn-responder` | padding | `10px 12px 10px 0` | `var(--s3) var(--s3) var(--s3) 0` |
| 887 | `.btn-responder` | margin-left | `-2px` | `calc(-1 * var(--s1))` |
| 897 | `.respostas` | margin-top | `12px` | `var(--s3)` |
| 898 | `.respostas` | padding-top | `12px` | `var(--s3)` |
| 906 | `.comentario` | padding | `10px 12px` | `var(--s3) var(--s3)` |
| 907 | `.comentario` | margin-bottom | `8px` | `var(--s2)` |
| 910 | `.comentario-data` | margin-bottom | `4px` | `var(--s1)` |
| 914 | `.form-resposta .btn-secondary` | margin-top | `8px` | `var(--s2)` |
| 914 | `.form-resposta .btn-secondary` | padding | `11px` | `var(--s3)` |
| 915 | `.respostas-vazio` | margin-bottom | `10px` | `var(--s3)` |
| 923 | `.tabbar` | padding | `6px 0 max(6px, env(safe-area-inset-bottom))` | `var(--s2) 0 max(var(--s2), env(safe-area-inset-bottom))` |
| 933 | `.tabbar a` | padding | `8px 4px 4px` | `var(--s2) var(--s1) var(--s1)` |
| 935 | `.tabbar a .ic` | margin-bottom | `2px` | `var(--s1)` |
| 938 | `.vazio` | padding | `30px 10px` | `var(--s6) var(--s3)` |
| 939 | `.vazio .icone` | margin | `0 auto 10px` | `0 auto var(--s3)` |
| 941 | `.ajuda-form` | margin | `0 0 10px` | `0 0 var(--s3)` |
| 947 | `.campos-obrigatorios` | margin | `0 0 4px` | `0 0 var(--s1)` |
| 952 | `.convite-mural` | gap | `8px` | `var(--s2)` |
| 955 | `.convite-mural` | padding | `12px 14px` | `var(--s3) var(--s4)` |
| 957 | `.convite-mural` | margin | `0 0 10px` | `0 0 var(--s3)` |
| 961 | `.convite-mural .icone` | margin-top | `2px` | `var(--s1)` |
| 966 | `.container` (@media min-width 520px) | padding-top | `32px` | `var(--s6)` |
| 973 | `.secao` (@media min-width 720px) | padding | `26px 24px` | `var(--s5) var(--s5)` |
| 975 | `.modulo-topo` (@media min-width 720px) | padding | `20px` | `var(--s5)` |
| 986 | `.container-dashboard` (@media min-width 860px) | padding-bottom | `40px` | `var(--s7)` ⚠ (40 → 48, muda 8px) |
| 992 | `#lista-trilhas` (@media min-width 860px) | gap | `16px` | `var(--s4)` |
| 1009 | `.tabbar-inline` (@media min-width 860px) | gap | `32px` | `var(--s6)` |
| 1012 | `.tabbar-inline` (@media min-width 860px) | padding | `8px 0` | `var(--s2) 0` |
| 1019 | `.tabbar-inline a` (@media min-width 860px) | gap | `8px` | `var(--s2)` |
| 1021 | `.tabbar-inline a` (@media min-width 860px) | padding | `10px 18px` | `var(--s3) var(--s4)` |
| 1046 | `.previa-trilhas` (@media min-width 860px) | gap | `16px` | `var(--s4)` |
| 1053 | `.passos-como` (@media min-width 860px) | gap | `18px` | `var(--s4)` (18 → s4, ver observação) |
| 1054 | `.passos-como` (@media min-width 860px) | padding | `22px` | `var(--s5)` |
| 1062 | `.passo-num` (@media min-width 860px) | margin-bottom | `4px` | `var(--s1)` |
| 1086 | `.container-comunidade` (@media min-width 860px) | padding-bottom | `40px` | `var(--s7)` ⚠ (40 → 48, muda 8px) |
| 1104 | `.painel-marca` (@media min-width 860px) | padding | `64px 56px` | `var(--s7) var(--s7)` ⚠ (64 → 48, muda 16px; 56 → 48, muda 8px) |
| 1113 | `.painel-marca-icone` (@media min-width 860px) | margin-bottom | `22px` | `var(--s5)` |
| 1118 | `.painel-marca-titulo` (@media min-width 860px) | margin | `0 0 12px` | `0 0 var(--s3)` |
| 1125 | `.painel-marca-texto` (@media min-width 860px) | margin-bottom | `26px` | `var(--s5)` |
| 1126 | `.painel-marca-lista` (@media min-width 860px) | gap | `12px` | `var(--s3)` |
| 1127 | `.painel-marca-lista li` (@media min-width 860px) | gap | `10px` | `var(--s3)` |
| 1137 | `.container-auth` (@media min-width 860px) | padding | `40px` | `var(--s7)` ⚠ (40 → 48, muda 8px) |
| 1145 | `.container-auth .card` (@media min-width 860px) | padding | `30px 32px` | `var(--s6) var(--s6)` |
| 1150 | `.container-auth input[type=text], ...[type=email], ...[type=password]` (@media min-width 860px) | padding | `15px 16px` | `var(--s4) var(--s4)` |

Nota: `top`, `left`, `bottom` e `width`/`height` (ex.: linhas 45 a 47, 57 a 59, 607 e 618 a 619 no caso de `bottom`/`width`) não são padding, margin nem gap, por isso ficaram fora desta tabela.

---

## Tabela 3: font-family

Total: 6 declarações `font-family`. Nota: `font: inherit` (linhas 186, 209, 512, 643) é shorthand e não entra nesta contagem.

| Linha | Seletor | Valor |
|---|---|---|
| 101 | `body` | `-apple-system, "Segoe UI", Roboto, Calibri, Arial, sans-serif` |
| 108 | `h1, h2, h3` | `Georgia, "Times New Roman", serif` |
| 167 | `.topbar strong, .topbar .topbar-titulo` | `inherit` |
| 496 | `.secao-titulo-lista` | `Georgia, "Times New Roman", serif` |
| 566 | `.btn-voltar-modulos` | `inherit` |
| 1116 | `.painel-marca-titulo` (@media min-width 860px) | `Georgia, "Times New Roman", serif` |

---

## Resumo

- Cores literais fora do `:root`: 53 declarações (22 valores literais distintos), mais 1 comentário (linha 1121). Os valores mais repetidos são `#fff` e `#B9CBD4`.
- Espaçamentos em px: 178 declarações, com 34 valores px distintos, excluindo o 0.
- Valores ⚠ (mudança maior que 4px): 40px (linhas 986, 1086 e 1137), 56px e 64px (linha 1104) e 90px (linha 117, padding-bottom do `.container`).
- font-family: 6 declarações (2 com Georgia, 2 com `inherit`, 1 com a pilha do body, repetindo Georgia em 3 lugares).

Valores px distintos e token:

| Valor | Token | Valor | Token |
|---|---|---|---|
| -18px | calc(-1 * var(--s4)) | 10px | var(--s3) |
| -14px | calc(-1 * var(--s4)) | 11px | var(--s3) |
| -12px | calc(-1 * var(--s3)) | 12px | var(--s3) |
| -8px | calc(-1 * var(--s2)) | 13px | var(--s3) |
| -2px | calc(-1 * var(--s1)) | 14px | var(--s4) |
| -1px | calc(-1 * var(--s1)) | 15px | var(--s4) |
| 1px | var(--s1) | 16px | var(--s4) |
| 2px | var(--s1) | 18px | var(--s4) (ver observação) |
| 3px | var(--s1) | 20px | var(--s5) |
| 4px | var(--s1) | 22px | var(--s5) |
| 5px | var(--s1) | 24px | var(--s5) |
| 6px | var(--s2) | 26px | var(--s5) |
| 7px | var(--s2) | 30px | var(--s6) |
| 8px | var(--s2) | 32px | var(--s6) |
| 9px | var(--s2) | 34px | var(--s6) |
| | | 40px ⚠ | var(--s7) |
| | | 56px ⚠ | var(--s7) |
| | | 64px ⚠ | var(--s7) |
| | | 90px ⚠ | var(--s7) |

Observação: o caso 18px segue a regra de proximidade (16px, --s4). O enunciado sugere --s5 para 18px. Se a intenção for --s5, as 14 declarações que contêm 18px mudam de token: linhas 52, 117, 143, 281, 333, 399, 422, 466, 600 (-18px), 661, 744, 1021 e 1053 (gap).