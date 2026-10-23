# Documentação de IHC — Jovem Aprendiz Digital

> Este documento é para quem vai **avaliar** o projeto (professora/banca), não
> para quem vai dar manutenção no código depois. A documentação técnica
> completa (arquitetura, rotas da API, modelo de dados) está no
> [`README_TECNICO.md`](README_TECNICO.md); o diagnóstico de UX que originou
> os ajustes de conteúdo está em [`AUDITORIA_UX.md`](AUDITORIA_UX.md). Aqui o
> foco é só o que a correção pede: front-end e qualidade de código. Para o
> roteiro rápido de navegação do sistema, veja o [`README.md`](README.md).

---

## 1. Visão geral do projeto

**Jovem Aprendiz Digital** é um sistema web de capacitação digital voltado a
jovens em situação de vulnerabilidade que estão começando agora na
tecnologia. Ele nasceu do **Board UX** de pesquisa da disciplina — persona
**Maria Alice**, mapa de empatia e jornada do usuário — e existe para
resolver um problema bem específico do board: tecnologia é vista por essa
persona como "coisa para outras pessoas", e o pouco contato que ela tem é
pelo **smartphone**, não por computador.

O sistema oferece três trilhas de aprendizagem curtas (Primeiros Passos no
Computador, Ferramentas de IA no Dia a Dia, e Pronta para o Mercado de
Trabalho), cada uma dividida em módulos com conteúdo em várias seções curtas,
uma atividade de múltipla escolha ao final de cada módulo (que confirma o
aprendizado em vez de um botão manual de "concluí"), progresso salvo
automaticamente por usuário, e um mural de comunidade onde a turma troca
dúvidas e dicas em posts com respostas.

Cada uma dessas peças responde a um insight do board — não são decisões de
tela soltas. A trilha 1 ataca a insegurança explícita com e-mail e
planilhas; a atividade ao final do módulo responde ao "medo de não entender"
substituindo um clique vazio por uma prova concreta de compreensão; e o
mural responde ao traço "trabalha em grupo" da persona, para que ela não
precise resolver tudo sozinha. A tabela da seção 2 detalha essa ligação
funcionalidade a funcionalidade.

---

## 2. Rastreabilidade UX → funcionalidade

| Funcionalidade | Insight do board que a originou |
|---|---|
| **Onboarding** (tela de apresentação antes do cadastro, com selos "de graça / feito para o celular / sem instalar nada", prévia das 3 trilhas e "como funciona" em 3 passos) | "Tecnologia não é pra pessoas como ele" — medo de não entender o que é o sistema antes de se comprometer com um cadastro |
| **Trilhas e módulos** com conteúdo em seções curtas (introdução → explicações → exemplo → dica → resumo) | Persona só tem acesso pelo **smartphone**: conteúdo precisa ser fatiado em telas pequenas, uma seção por vez, nunca um texto corrido longo |
| **Atividade de fixação** (múltipla escolha) ao final de cada módulo, com conclusão automática ao acertar tudo | "Medo de não entender" — a atividade dá prova concreta de aprendizado; ao contrário de reprovar, o feedback de erro é sempre de incentivo, e a atividade pode ser refeita quantas vezes quiser |
| **Progresso automático** (barra de progresso da trilha e do módulo, card de resumo no painel) | A curva emocional da jornada cai mais forte **no início** — mostrar progresso cedo (e não um "0%" no primeiro acesso) ajuda a manter a motivação |
| **Comunidade com comentários** (mural para postar, responder e ver quantas respostas cada post já tem) | Traço de personalidade "trabalha em grupo"; a jornada aponta que um mural sem resposta não vira troca de verdade |

O detalhamento critério a critério dessa auditoria (o que já estava certo, o
que foi corrigido e como) está em [`AUDITORIA_UX.md`](AUDITORIA_UX.md).

---

## 3. Conformidade WCAG 2 nível AA

Todos os critérios abaixo foram conferidos e ajustados nesta refatoração.
Nenhuma dependência nova foi usada — tudo em HTML/CSS/JS puro.

| # | Critério WCAG 2 AA | Onde foi aplicado | Como |
|---|---|---|---|
| 1 | **1.3.1 Informações e Relações** (estrutura semântica) | Todos os `.html` em `public/` | `<header>` na barra de topo, `<nav aria-label="Navegação principal">` na barra inferior, `<main id="conteudo">` envolvendo o conteúdo de cada página, `<footer>` nos rodapés de `index.html`. Nada de `<div>` para papéis que o HTML nativo já resolve |
| 2 | **1.3.1 / 2.4.6 Rótulos ou Cabeçalhos** (hierarquia sem pular nível) | `dashboard.html`, `comunidade.html` | As duas páginas ganharam um `<h1>` de página (antes não tinham nenhum) promovendo o título da barra de topo; as demais (`index.html`, `trilha.html`) já tinham `<h1>` único e `<h2>` como filhos diretos, sem saltar para `<h3>` |
| 3 | **3.3.2 Rótulos ou Instruções** / **1.3.1** (formulários) | `index.html`, `comunidade.html`, `public/js/comunidade.js` | Todo `<input>`/`<textarea>` tem `<label for="...">` de verdade — inclusive a caixa de resposta de cada post, gerada em JavaScript, que ganhou um `<label class="sr-only">` próprio. O texto de ajuda da senha de cadastro é ligado ao campo via `aria-describedby="cad-senha-ajuda"` |
| 4 | **1.1.1 Conteúdo Não Textual** (imagens) | Todo o projeto | O sistema não usa nenhuma tag `<img>` — todo ícone é SVG embutido via `public/js/icones.js`, sempre com `aria-hidden="true"` porque acompanha um texto visível equivalente (rótulo do botão, título, etc.), que é quem carrega a informação para o leitor de tela |
| 5 | **2.1.1 Teclado** (interatividade) | `public/js/trilha.js`, `public/js/comunidade.js` | Toda ação clicável (abrir um módulo, avançar de seção, abrir os comentários de um post, verificar respostas) é um `<button type="button">` nativo — nunca uma `<div onclick>`. Botões nativos recebem foco por Tab e respondem a Enter/Espaço sem nenhum código extra |
| 6 | **2.4.7 Foco Visível** | `public/css/style.css` | Regra única `:focus-visible` (botões, links, campos, elementos com `tabindex`) com `outline: 3px solid var(--teal); outline-offset: 2px`. A antiga regra `outline: none` sem substituto (no título da tela de acesso) foi removida — hoje não existe nenhum `outline: none` no CSS sem um contorno visível equivalente no lugar |
| 7 | **4.1.2 Nome, Função, Valor** e **4.1.3 Mensagens de Status** (ARIA com moderação) | `public/js/comunidade.js`, `public/js/trilha.js`, HTML dos 4 arquivos | `aria-expanded` no botão "Responder" de cada post; `role="alert"` nas mensagens de erro de formulário; `role="status" aria-live="polite"` no feedback de acerto/erro da atividade e da resposta do mural; `aria-label` no botão de voltar (ícone sem texto) e na navegação inferior |
| 8 | **2.4.1 Bloqueios** (skip link) | Topo de `dashboard.html`, `trilha.html`, `comunidade.html` | `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>` como primeiro elemento do `<body>`, focável por Tab, apontando para `<main id="conteudo">`. `index.html` não tem: é a landing pública, sem cabeçalho/menu repetitivo antes do conteúdo (só o link avulso "Entrar") — não há bloco de navegação para pular |
| 9 | Técnica de suporte a **4.1.2 / 2.4.6** (ocultar sem tirar do leitor de tela) | `public/css/style.css`, `.sr-only` | Classe `.sr-only` (clip-technique padrão) usada no rótulo da caixa de resposta de cada post do mural, que não tem espaço visual para um rótulo próprio |
| 10 | **1.4.3 Contraste (Mínimo)** | `public/css/style.css`, variáveis `:root` | Na AV2 a paleta foi trocada pela paleta lúdica (seção 8). Cada par de texto/fundo usado foi calculado com a fórmula de luminância relativa do WCAG antes de entrar no CSS — todos ≥ 4.5:1; a tabela completa está na seção 8. Nenhuma cor literal fica fora do `:root` (só `#fff`) |
| 11 | **2.3.3 Animação por Interações** (nível AAA, aplicado aqui por precaução) | `public/css/style.css` | `@media (prefers-reduced-motion: reduce)` zera a duração de toda transição/animação do projeto (barras de progresso, seta do "Responder", skip link, pulso do esqueleto de carregamento) e tira o `transform` dos botões grossos e dos cards ao tocar, para quem pede menos movimento ao sistema operacional |
| 12 | **1.4.1 Uso de Cor** | `public/js/trilha.js` | O feedback de acerto/erro da atividade sempre combina cor **com** ícone e texto — nunca só a cor: `✓ Isso mesmo!` / ícone de X + "Revise esta resposta — volte no resumo do módulo e tente de novo." Na AV2, como o radio da alternativa ficou visualmente escondido (continua real e focável), a alternativa escolhida ganhou um ícone de check, e a errada um X, além da cor da borda |

---

## 4. Responsividade — desktop e mobile como cidadãos de primeira classe

O sistema nasceu mobile-first (a persona só acessa pelo celular — ver seção 1) e
por isso ficava desconfortável em telas grandes: colunas estreitas perdidas no
meio de janelas largas, barra de navegação pensada só para o rodapé do celular,
e um elemento de rolagem horizontal sem nenhuma pista visual de que dava para
arrastar. A tabela abaixo é atualizada página a página conforme a revisão avança.

| Página | O que estava desconfortável em tela grande | Correção |
|---|---|---|
| `dashboard.html` | Container travava em 580px mesmo em telas largas; trilhas empilhadas numa única coluna cercada de vazio; barra de navegação (pensada pro rodapé do celular) sobrava sozinha no rodapé de uma janela grande | A partir de 860px: **menu lateral fixo** à esquerda (ver seção 8), conteúdo até 1040px, card do próximo módulo ao lado do card "Seu mini curso" e trilhas em grid (`repeat(auto-fill, minmax(260px, 1fr))`). No celular a navegação continua fixa embaixo e os dois cards do topo viram um só |
| `index.html` (apresentação) | Mesma coluna estreita; textos corridos ficariam com linhas de ~900px se o container só fosse alargado | Prévia das trilhas e os 3 passos de "Como funciona" viram grid de 3 colunas a partir de 860px; parágrafos e blocos de texto ganham `max-width: 32em` para manter a medida de leitura, mesmo dentro de um container mais largo |
| `login.html`, `cadastro.html`, `esqueci-senha.html`, `redefinir-senha.html`, `verificar-email.html` | No celular, card colado no topo com um vazio enorme embaixo em telas altas. Em desktop, além disso, o card ficava pequeno e sozinho no meio de uma tela larga, sem nenhuma composição pensada para o espaço extra | No celular, `body.pagina-auth` centraliza o card verticalmente (sem mudança). A partir de 860px, um `<aside class="painel-marca">` (nome do sistema, mesma frase de efeito e os 3 selos da apresentação — "De graça" / "Feito para o celular" / "Sem instalar nada", tudo texto real) ocupa a coluna ao lado do formulário; o card ganha um pouco mais de padding/fonte. Largura do próprio formulário mantida curta, de propósito — o que muda é a composição ao redor dele, não o formulário |
| `trilha.html` | O stepper de seções (rolagem horizontal) cortava a última pastilha na borda do card sem nenhuma pista de que dava para arrastar; a lista de módulos era uma pilha de fichas | Sombra de fade nas duas bordas do stepper (`.stepper-wrap::before/::after`), ligada/desligada por `trilha.js` conforme a posição do scroll. Na AV2 a lista virou um **caminho** (seção 8) e, a partir de 1100px, ganha ao lado o painel do próximo módulo (entre 860 e 1099px o painel desce para baixo do caminho). O texto do módulo aberto continua na medida de leitura (até 720px) — alargar pioraria a legibilidade; só o passo da atividade usa até 960px, com as alternativas em grade |
| `comunidade.html` | Mesmo problema do dashboard: nav pensada pro rodapé do celular sobrando sozinha no rodapé de uma janela grande; coluna de 580px cercada de vazio | Mesmo menu lateral do dashboard a partir de 860px; feed até 720px — um pouco mais largo que a leitura de módulo (é um feed, não texto corrido longo), mas sem virar grade, porque a ordem cronológica dos posts importa e cada um tem altura diferente |

**Nota sobre a sombra do stepper e contraste (1.4.3):** a sombra fica por cima
das pastilhas (elas têm fundo próprio opaco, então uma sombra "atrás" delas
seria invisível). Isso significa que ela também passa por cima do texto nas
pastilhas mais próximas da borda — a opacidade foi calibrada para o pior caso.
Cada pastilha mostra o número da parte numa bolinha e o nome curto do capítulo;
na concluída (`.visitado`) o número continua na bolinha e um ✓ vem depois do
nome (o "(concluída)" é só para leitor de tela). Medido com a fórmula de
luminância do WCAG 2, sem sombra e no pico da sombra (`--ink` a 8% composto
por cima do texto e do fundo):

| Par | Sem sombra | No pico |
|---|---|---|
| Nome da pastilha concluída: `--ok-ink` sobre branco | 7.13:1 | 6.53:1 |
| Bolinha da concluída: `--ok-ink` sobre `--ok-bg` | 6.49:1 | 5.96:1 |
| Nome da pastilha comum: `--sub` sobre branco | 7.58:1 | 6.88:1 |
| Bolinha da comum: `--teal-dark` sobre `--teal-soft` | 6.73:1 | 6.15:1 |
| Pastilha atual: branco sobre `--ink` (nome e, invertido, a bolinha) | 14.63:1 | 12.59:1 |
| Atividade: `--coral-dark` sobre branco | 7.31:1 | 6.76:1 |
| Atividade atual: branco sobre `--coral` | 5.18:1 | 4.91:1 |

O mais apertado é a atividade atual (4.91:1), ainda acima de 4.5:1. A
opacidade continua 0.08: uma maior (testada em 0.16 na paleta antiga)
derrubava o pior caso abaixo de 4.5:1.

O cabeçalho de cada seção mostra "Parte N de M" (o mesmo total do topo do
módulo) e, só para introdução, exemplo, dica e resumo, um selo com o tipo. A
seção comum não tem selo. Pares (sem a sombra, que não chega ali): `--ink`
sobre branco 14.63:1 (introdução), `--teal-dark` sobre branco 7.58:1
(seção comum), `--amber-ink` sobre `--amber-tint` 8.75:1 (exemplo),
`--coral-dark` sobre `--coral-soft` 6.63:1 (dica) e `--ok-ink` sobre `--ok-bg`
6.49:1 (resumo).

**Falso positivo conhecido do axe em `comunidade.html`:** rodar o axe nessa
página aponta "incomplete" (não confirmado) de contraste nos dois `<textarea>`
(publicar / responder), com a mensagem "background color could not be
determined because it's partially obscured by another element". É a alcinha
nativa de redimensionar do textarea (`resize: vertical`) confundindo a
detecção — o CSS do campo usa `background: #fff` sólido, sem transparência
nenhuma (ver `input[type=text], ... textarea` em `style.css`), então o
contraste real é normal. Documentado aqui para não ser confundido com uma
falha de verdade ao reproduzir a auditoria.

**Mesmo falso positivo em `trilha.html` (stepper):** com um módulo aberto, o
axe (4.10, testado via injeção manual no navegador) aponta 0 violações e só
"incomplete" de contraste nas pastilhas do stepper, com a mesma mensagem de
"partially obscured by another element" — desta vez apontando para a sombra
de fade (`.stepper-wrap::before/::after`), que é justamente um elemento
posicionado por cima das pastilhas (ver seção 4). O axe sinaliza a pastilha
inteira como incerta mesmo quando a sombra daquele lado está com opacidade 0
(ex.: a pastilha "atual", à esquerda, com a sombra esquerda desligada), porque
avalia a sobreposição geométrica dos elementos e não o valor computado da
opacidade. O contraste real já foi calculado à mão para o pior caso (ver nota
acima) e fica em 6.53:1, acima do mínimo de 4.5:1.

**Mesma classe de falso positivo no painel de marca das telas de
autenticação (`login.html`, `cadastro.html` etc.):** o axe aponta
"incomplete" com a mensagem "background color could not be determined due
to a background gradient" no título, no texto e nos três itens da lista do
`.painel-marca`, porque o fundo é um `linear-gradient` (`--ink` #1E293B →
`--ink-deep` #0F172A) e o axe não calcula contraste sobre gradiente.
Conferido à mão contra a ponta mais clara do gradiente (o pior caso): texto
`--on-dark` (#E2E8F0) fica em 11.87:1 e o branco em 14.6:1, folgados acima
de 4.5:1.

**Falso positivo novo da AV2 no anel de progresso do Início
(`.anel-num`, `.anel-rotulo`):** o número "X/9" fica por cima do SVG do anel
e o axe marca "incomplete" por não conseguir determinar o fundo. Os pares
reais são branco sobre `--coral` no celular (5.18:1) e `--ink`/`--sub` sobre
branco no computador (14.63:1 / 7.58:1).

---

## 5. Princípios de Norman aplicados

| Princípio | Exemplo concreto no sistema |
|---|---|
| **Affordance** (o botão parece clicável) | O botão "Criar minha conta" (`index.html`) é um bloco sólido coral com o texto em branco, cantos arredondados e uma seta — nada de texto azul sublinhado fingindo ser link. O mesmo vale para "Verificar respostas" no fim de cada módulo: fica visualmente pesado e destacado, sinalizando que é a ação principal daquela tela |
| **Feedback imediato** | Ao tocar em "Entrar" ou "Criar minha conta", o botão muda na hora para "Entrando..."/"Criando conta..." e fica desabilitado — a pessoa sabe que o toque funcionou antes mesmo da resposta do servidor chegar. O mesmo padrão foi acrescentado ao publicar no mural e ao responder um post. No módulo, o botão "Responder" gira a seta e expõe `aria-expanded` ao abrir os comentários de um post |
| **Redução de carga cognitiva** | `trilha.html` mostra **uma seção do módulo por vez** (nunca as 7 seções abertas juntas), com um stepper indicando onde a pessoa está e o que já viu — em vez de uma parede de texto. O painel inicial também resume o progresso em um único card, sem expor todos os números de uma vez |
| **Linguagem do usuário** | Nenhuma mensagem do sistema usa jargão técnico: erros de servidor viram "Algo deu errado do nosso lado. Tente de novo em instantes.", uma rota inexistente vira "Não encontramos essa página.", e um campo obrigatório ausente nunca aparece com o nome da coluna do banco (ex.: não existe mais `licao_id é obrigatório`, e sim "Não foi possível identificar a lição. Volte e tente de novo.") — ver `server.js` |

---

## 6. Arquitetura resumida

O projeto é deliberadamente simples: sem framework de front-end, sem build
step, sem ORM. O front-end é HTML/CSS/JS puro separado por página, que fala
com um back-end em Node.js usando só módulos nativos (`http`, `crypto`), que
por sua vez lê e grava num banco SQLite via libSQL (local em arquivo, ou
Turso hospedado — troca de um só transtroca de duas variáveis de ambiente).

```
Navegador (mobile-first)
│
├─ index.html       ─┐
├─ dashboard.html    │  cada página carrega:
├─ trilha.html       │   1) icones.js  (ícones SVG)
├─ comunidade.html   │   2) formato.js (só em trilha.html — texto -> HTML seguro)
│                    │   3) api.js     (fetch autenticado, sessão, barra inferior)
│                   ─┘   4) <pagina>.js (lógica específica daquela tela)
│
│  fetch("/api/...", { Authorization: "Bearer <token>" })
▼
server.js  (Node.js nativo — roteamento manual, sem Express)
│  valida sessão, lê/grava dados
▼
db.js  (@libsql/client)
│
▼
SQLite local (data/aprendiz.db)  ──ou──  Turso (banco hospedado)
```

Cada página HTML termina só com as tags `<script src="..." defer></script>`
necessárias — toda a lógica mora nos arquivos de `public/js/`, na ordem
correta de dependência (ícones e formatação antes de `api.js`, que vem antes
do script da página).

---

## 7. Como rodar e onde ver cada critério na prática

### Rodando localmente

```bash
npm install
npm start
```

Abra **http://localhost:3000** no navegador. Na primeira execução o banco
local é criado e semeado sozinho (trilhas, módulos, atividades e um post de
boas-vindas no mural) — não precisa de nenhuma configuração extra para
avaliar o sistema.

### Testando por teclado (sem mouse)

1. Abra qualquer página e aperte **Tab** uma vez: o link "Pular para o
   conteúdo" aparece no canto superior esquerdo — **Enter** leva direto ao
   `<main>`, pulando a barra de topo.
2. Continue com **Tab/Shift+Tab**: dá para alcançar e acionar (com
   **Enter** ou **Espaço**) todo botão, campo e link do sistema — abrir um
   módulo, avançar/voltar de seção, marcar uma alternativa da atividade,
   abrir os comentários de um post — sem tocar no mouse. O contorno teal de
   3px sempre indica onde o foco está.
3. No formulário de cadastro, dá para chegar no campo de senha e ouvir (ou
   ler, se estiver inspecionando o HTML) o texto de ajuda ligado por
   `aria-describedby`.

### Testando com leitor de tela

Com o **NVDA** (Windows, gratuito) ou o **VoiceOver** (Mac/iOS, embutido)
ativo, navegue pela mesma sequência acima. Pontos para prestar atenção:

- Cada página anuncia um único título de nível 1 (`<h1>`) ao entrar.
- As mensagens de erro de login/cadastro/publicação são anunciadas assim
  que aparecem (`role="alert"`), sem precisar navegar até elas.
- O feedback de "Isso mesmo!" / "Revise esta resposta" na atividade é lido
  na hora (`aria-live="polite"`), com o texto completo — nunca só a cor.
- O botão "Responder" de um post anuncia se está expandido ou recolhido
  (`aria-expanded`).

---

## 8. Redesign lúdico (AV2)

Na 2ª avaliação o visual ficou mais lúdico **sem mudar o comportamento**:
mesmas rotas, mesmo banco, mesmo fluxo de atividade. Só HTML, CSS e o código
que monta a tela em `public/js/` mudaram. Não entrou nenhum recurso de
gamificação (sequência de dias, XP, vidas, cadeado, troféu): o curso é curto
e termina, e o progresso é sempre "X de 9 módulos".

### Paleta e contraste

Todas as cores são tokens no `:root` de `style.css`. Fora dele só existe
`#fff`. Pares de texto usados, com contraste calculado pela fórmula de
luminância relativa do WCAG 2.0:

| Texto | Fundo | Contraste | Onde |
|---|---|---|---|
| branco | coral `#C2410C` | 5.18:1 | botões principais, card "Seu próximo módulo" |
| coral `#C2410C` | `#FFF1EC` | 4.70:1 | item ativo do menu |
| branco | teal `#0F766E` | 5.47:1 | cabeçalho da trilha, letra da alternativa marcada |
| `#CCFBF1` | teal | 4.86:1 | descrição no cabeçalho da trilha |
| branco | ok `#15803D` | 5.02:1 | botão "Voltar aos módulos" ao acertar tudo |
| branco | erro `#BE123C` | 6.29:1 | letra da alternativa errada |
| ink `#1E293B` | bg `#F3F6FB` | 13.50:1 | texto principal |
| sub `#475569` | bg `#F3F6FB` | 7.00:1 | texto de apoio |
| sub-claro `#64748B` | branco | 4.76:1 | só sobre branco, nunca sobre `--bg` |
| `#166534` | ok-bg `#DCFCE7` | 6.49:1 | faixa "Você acertou tudo!" |
| `#166534` | branco | 7.13:1 | "Isso mesmo!", pastilha visitada do stepper |
| erro-ink `#9F1239` | erro-bg `#FFE4E6` | 6.68:1 | mensagens de erro |
| teal-dark `#115E59` | teal-soft `#CCFBF1` | 6.73:1 | selo e ícone da trilha 1, convite ao mural |
| coral-dark `#9A3412` | coral-tint `#FFEDD5` | 6.38:1 | selo e ícone da trilha 3 |
| roxo-dark `#5B21B6` | roxo-soft `#EDE9FE` | 7.57:1 | selo e ícone da trilha 2 |
| roxo-dark `#5B21B6` | bg `#F3F6FB` | 8.29:1 | "Agora é sua vez", número da pergunta |
| amber-ink `#78350F` | amber-soft `#FDE68A` | 7.28:1 | selo de nível, "Quase lá!" |

### Tipografia, botões e navegação

- **Nunito** (Google Fonts, pesos 600–900, `display=swap`) em tudo,
  inclusive nos títulos, que antes usavam Georgia com serifa. Corpo em 17px,
  peso 600; rótulos e botões em 800–900.
- **Espaçamento em escala de 8** (`--s1` 4px … `--s7` 48px). Os valores
  soltos do CSS antigo foram para o degrau mais próximo.
- **Botões "grossos"**: o botão principal tem uma sombra sólida embaixo
  (`0 5px 0`) e "afunda" 4px ao ser tocado, o que reforça a affordance de
  "isto é apertável" (Norman). Cards clicáveis (trilhas, módulos, alternativas)
  seguem o mesmo padrão com sombra mais leve. O efeito de hover só existe em
  `@media (hover: hover) and (pointer: fine)` (mouse), para não "grudar" no
  celular, e o movimento some com `prefers-reduced-motion`.
- **Menu lateral no computador**: a partir de 860px a barra inferior vira um
  menu fixo à esquerda, com marca, Início/Comunidade e, embaixo, o nome da
  pessoa e o botão Sair. No celular continua a barra inferior, com o item
  ativo em coral sobre fundo claro (não só pela cor do texto).
- **Trilha como caminho**: os módulos aparecem como círculos ligados por uma
  linha pontilhada, com o próximo em destaque ("Começar"). Nada é bloqueado:
  todo módulo continua clicável.
- **Atividade**: alternativas como cards com a letra A–D. O radio continua
  real, só fica visualmente escondido e recebe foco. A escolha aparece pela
  borda **e** por um ícone de check (ou de X, se estiver errada). O
  "Verificar respostas" fica preso no rodapé da tela.

### Itens da matriz da 2ª avaliação

| Item | Problema | Correção | Situação |
|---|---|---|---|
| R2-A | Títulos com serifa (Georgia) | Títulos em Nunito, a mesma fonte do corpo | **Corrigido** |
| R2-B | Só o botão "Entrar" do topo tinha hover | Hover em botões e cards, só com ponteiro fino | **Corrigido** |
| R2-C | Carregamento indicado só por texto | Esqueleto (blocos cinza com pulso) com `aria-busy` e "Carregando..." para leitor de tela, no Início, na trilha, no mural e nas respostas | **Corrigido** |
| R2-D | Erro ao carregar não oferecia saída | Botão "Tentar de novo", que refaz a mesma carga, no Início, na trilha, no mural e nas respostas | **Corrigido** |
| R2-E | Espaçamentos com valores soltos | Escala de 8 em tokens | **Corrigido** |

### Antes e depois

A auditoria automática (axe-core WCAG 2.1 AA + Lighthouse Acessibilidade,
em 390px e 1440px) está em [`auditorias/av2/`](auditorias/av2/): o resultado
lado a lado em [`comparacao.md`](auditorias/av2/comparacao.md), e todas as
fotos com o mesmo nome em [`antes/`](auditorias/av2/antes/) e
[`depois/`](auditorias/av2/depois/). Antes e depois: **0 violações no axe e
Lighthouse 100** nas 9 páginas, nos dois tamanhos. Fotos dos estados novos
(atividade, esqueleto, erro com "Tentar de novo") em
[`depois/extra/`](auditorias/av2/depois/extra/).

| Tela | Antes | Depois |
|---|---|---|
| Início (celular) | [antes](auditorias/av2/antes/mobile-dashboard-progresso.png) | [depois](auditorias/av2/depois/mobile-dashboard-progresso.png) |
| Início (computador) | [antes](auditorias/av2/antes/desktop-dashboard-progresso.png) | [depois](auditorias/av2/depois/desktop-dashboard-progresso.png) |
| Trilha (celular) | [antes](auditorias/av2/antes/mobile-trilha-progresso.png) | [depois](auditorias/av2/depois/mobile-trilha-progresso.png) |
| Trilha (computador) | [antes](auditorias/av2/antes/desktop-trilha-progresso.png) | [depois](auditorias/av2/depois/desktop-trilha-progresso.png) |
| Atividade (celular) | [antes](auditorias/av2/antes/mobile-trilha-atividade.png) | [depois](auditorias/av2/depois/mobile-trilha-atividade.png) |
| Comunidade (computador) | [antes](auditorias/av2/antes/desktop-comunidade.png) | [depois](auditorias/av2/depois/desktop-comunidade.png) |
| Carregando (R2-C) | — | [depois](auditorias/av2/depois/extra/m390-c-esqueleto-dashboard.png) |
| Erro com saída (R2-D) | — | [depois](auditorias/av2/depois/extra/m390-d-erro-dashboard.png) |
