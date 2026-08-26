# Auditoria UX — Jovem Aprendiz Digital

Comparação entre o sistema implementado e o **Board UX** de pesquisa (persona Maria Alice, mapa de empatia e jornada do usuário).

- **Data:** 26/08/2026
- **Método:** leitura do código-fonte, extração de todos os textos visíveis (HTML, JS e mensagens de erro da API), varredura programática do conteúdo das 63 seções, e teste de layout em viewport de **390px** (iframe, com as media queries avaliando de verdade contra essa largura)
- **Escopo:** `public/*.html`, `public/js/*`, `public/css/style.css`, `server.js`, `db.js`, `conteudo.js`

> **A tabela e a análise abaixo são o diagnóstico original, do estado do
> sistema em 26/08/2026 — ficaram como estavam, para servir de retrato do
> antes.** O que já foi corrigido desde então está marcado item a item na
> seção *Ajustes recomendados*, mais adiante, e resumido no fim do documento.

---

## Tabela de conformidade

| # | Critério do board | Implementado? | Onde no código | O que falta |
|---|---|---|---|---|
| 1.1 | Trilha cobre e-mail formal, planilhas e organização de arquivos (dores explícitas) | **Sim** | `conteudo.js` → trilha 1, 3 módulos × 7 seções | — |
| 1.2 | Trilha de IA para quem "não sabe por onde começar" | **Sim** | `conteudo.js` → trilha 2; ferramentas citadas são gratuitas | — |
| 1.3 | Trilha de preparação para o mercado (ser efetivada) | **Sim** | `conteudo.js` → trilha 3 (currículo, reuniões, rotina) | — |
| 1.4 | Conteúdo não pressupõe saber programar / usar ferramenta avançada | **Sim** | Varredura em 63 seções | "programar" e "código" só aparecem para **tranquilizar** ("ninguém vai te pedir para programar", "quem nunca escreveu uma linha de código") |
| 1.5 | Conteúdo coerente com "só tem acesso pelo smartphone" | **Parcial** | `conteudo.js` → "Organizando arquivos e pastas" | **28 referências a computador vs 37 a celular.** O módulo 1.1 tem 20 refs desktop contra 4 mobile: ensina Explorador de Arquivos, tecla Windows, F2, Ctrl+X, botão direito, e o exemplo da Maria Alice usa notebook. A persona **não tem computador em casa** |
| 1.6 | Jargão técnico sempre explicado | **Sim** | `conteudo.js` | Termos como extensão, célula, prompt, alucinação, Cc/Cco são definidos no próprio texto antes do uso |
| 2.1 | Linguagem simples, em português, sem jargão nas telas | **Parcial** | `server.js:341` | `"licao_id é obrigatório."` vaza nome de campo em snake_case para a tela. Também `"Erro interno do servidor."` e `"Rota não encontrada."` |
| 2.2 | Tom não professoral nem condescendente | **Sim** | Todos os textos de retorno | "Quase lá!", "sem pressa, dá pra refazer quantas vezes quiser", "errar aqui faz parte" — nunca reprova |
| 2.3 | Vocabulário consistente entre telas | **Não** | `dashboard.html:56` vs `trilha.html` | Dashboard diz **"lições"**, tela de trilha diz **"módulos"** (16 ocorrências). Mesma coisa com dois nomes, logo após a refatoração |
| 3.1 | Sem rolagem horizontal em tela pequena | **Sim** | Teste a 390px | `scrollWidth - innerWidth = -15` em **todas** as telas (login, dashboard, lista, seção, atividade, comunidade) |
| 3.2 | Nada de texto cortado / elemento estourando | **Sim** | Teste a 390px | Zero elementos fora do viewport (fora o stepper, que tem rolagem horizontal proposital) |
| 3.3 | Sem dependência de hover | **Sim** | `style.css` | **Nenhuma** regra `:hover` no CSS inteiro — correto para toque |
| 3.4 | Botões grandes o bastante para o dedo (≥44px) | **Parcial** | `style.css` | Abaixo de 44px: pastilhas do stepper (**35px**), "Todos os módulos" (**30px**), seta de voltar (**34px**), "Responder"/"1 resposta" (**29px**), "Sair" (**34px**). As alternativas do quiz estão corretas (a label inteira é o alvo) |
| 3.5 | Permitir zoom (dedos + texto pequeno) | **Não** | Os 4 HTML, linha 5 | `maximum-scale=1` **bloqueia o pinch-zoom** nas quatro telas. Contraria WCAG 1.4.4 e é grave para leitura longa em celular |
| 4.1 | Progresso do módulo visível durante a leitura | **Sim** | `trilha.html` → `pintarTopoModulo` | Barra própria do módulo + "Parte 1 de 8 — 13%". Avança já no primeiro passo |
| 4.2 | Stepper mostra onde a pessoa está e o que já viu | **Sim** | `trilha.html` → `pintarStepper` | Pastilha atual destacada, vistas com check, rola sozinha |
| 4.3 | **Progresso motivador logo nas primeiras interações** | **Não** | `dashboard.html` | Recém-cadastrada vê **"0%"** em destaque (2rem, âmbar), barra vazia, "0 de 9 lições concluídas" e mais **três** "0 de 3". São **cinco zeros** no exato momento que o board aponta como o de maior queda emocional |
| 4.4 | Conclusão de módulo comemorada | **Sim** | `trilha.html` → feedback final | Ícone de medalha + "Você acertou tudo! Módulo concluído." |
| 5.1 | Onboarding antes do cadastro | **Não** | `index.html` | A pessoa cai direto nas abas Entrar/Criar conta. Só há um subtítulo de uma linha. **Não explica o que é o sistema, o que vai aprender, quanto tempo leva, nem que é gratuito** |
| 5.2 | Prévia do conteúdo antes de se comprometer | **Não** | `index.html` | As 3 trilhas só aparecem **depois** do cadastro. Quem chega não sabe se serve para ela |
| 5.3 | Não exigir conhecimento prévio | **Sim** | `index.html:61` | "Feito para quem está começando agora na tecnologia — não precisa saber nada antes." |
| 6.1 | Mural existe e permite troca | **Sim** | `comunidade.html`, `server.js` | Post + comentários, carregados sob demanda |
| 6.2 | Estado vazio acolhedor | **Sim** | `comunidade.html` | "Ainda não tem nenhuma publicação. Seja a primeira pessoa a escrever!" / "Ninguém respondeu ainda. Que tal ser a primeira pessoa?" |
| 6.3 | Nenhuma sugestão de julgamento por pergunta básica | **Parcial** | `db.js` → post semeado | A frase "Aqui ninguém julga pergunta 'básica'" está **só no post de boas-vindas**, que some conforme o mural cresce. O formulário de publicar não repete esse acolhimento |
| 6.4 | Reduz a sensação de estar sozinha | **Parcial** | `comunidade.html` | Funciona, mas é **passivo**: nada convida a postar a partir da lição. Quem trava num módulo não é levada ao mural |
| 7.1 | Ícones profissionais, sem emoji | **Sim** | `public/js/icones.js` | 0 emoji em HTML, JS e nos 63 registros de conteúdo do banco |
| 7.2 | Identidade ainda acolhedora (não corporativa demais) | **Parcial** | `style.css` | Ver análise de tom abaixo |

---

## Análise de tom visual (critério 7)

**O que sustenta o acolhimento:** a paleta continua quente (coral no CTA principal, âmbar no progresso), os títulos são em serifa — o que dá um ar editorial, não de software corporativo —, os cantos são arredondados (14px), e as seções de exemplo/dica têm fundo levemente tingido em vez de caixas cinzas. O texto de apoio segue caloroso ("sem pressa", "Quase lá!"). Os ícones outline pesam menos que emoji coloridos, mas vêm sempre acompanhados de rótulo em português.

**Onde o tom endureceu depois da troca:**

1. **O bloco de atividade ficou com cara de prova.** Borda tracejada em coral + selo quadrado + o rótulo interno "modo teste" no CSS. Para quem tem "medo de não entender", moldura de prova é justamente o gatilho. O título "Agora é sua vez" e o subtítulo suavizam, mas o enquadramento visual diz outra coisa.
2. **O cabeçalho da trilha é um bloco navy sólido e grande**, e a topbar também é navy. Em telas pequenas, o topo da tela fica dominado por azul-escuro institucional.
3. **A ficha do módulo é bem "sistema"**: número em círculo, "7 seções", "atividade", chevron. Legível e organizado, mas sem nenhum elemento de calor humano.
4. **Perda pequena, mas real:** o antigo "💚" no post de boas-vindas e o "💛" nos estados vazios faziam trabalho afetivo que os ícones não repõem. Não é caso de voltar com emoji — é caso de compensar na escrita.

**Veredito:** não ficou intimidador, mas ficou **mais neutro**. O acolhimento hoje está quase todo no texto; o visual virou suporte neutro, quando antes reforçava.

---

## Ajustes recomendados, em ordem de prioridade

### Prioridade alta — recomendo resolver antes de entregar

1. **[FEITO] Liberar o zoom** — remover `maximum-scale=1` dos 4 HTML. É uma linha por arquivo, e é o item mais sério da auditoria: bloqueia um recurso de acessibilidade em um app cuja persona lê texto longo no celular.

   *Como ficou:* os quatro arquivos usam `width=device-width, initial-scale=1`; o pinch-zoom voltou.

2. **[FEITO] Reescrever o módulo 1.1 para o celular** — hoje ele ensina Explorador de Arquivos, tecla Windows, F2 e Ctrl+X para alguém que **só tem smartphone**. É a contradição mais direta com o board. Sugiro reescrever as seções de explicação e o exemplo com o app **Arquivos do Android** e o **Google Drive** como caminho principal, deixando o computador como "quando você tiver acesso a um". Também há alguns atalhos de teclado no módulo 1.3.

   *Como ficou:* seis das sete seções do módulo 1.1 foram reescritas com o app **Arquivos** e o **Google Drive** como caminho principal — inclusive o exemplo da Maria Alice, que agora diz explicitamente que ela não tem computador em casa e resolve tudo no ônibus, pelo celular (tocar e segurar para marcar, três pontinhos para renomear, "Mover para", lupa para buscar). O computador aparece só como aside ("quando você tiver acesso a um"), e os atalhos do Windows sobraram apenas na última linha do resumo, como equivalência. A proporção do módulo saiu de **20 referências a desktop contra 4 a celular** para **19 contra 64** — e as 19 restantes são todas do tipo "no computador é assim". No módulo 1.3, os atalhos de teclado ganharam o gesto equivalente no Google Planilhas do celular (bolinha azul, barra de fórmulas, seta de desfazer) e os "clique" viraram "toque". A pergunta da atividade "Pra que serve criar pastas no computador?" virou "no celular ou no computador", com os distratores acompanhando.

   *Migração:* `sincronizarSecoes()` em `db.js` compara as seções gravadas com `conteudo.js` por (lição, ordem) e reescreve só o que mudou — 17 registros na primeira subida, 0 na segunda. Progresso e respostas ficaram intactos (nenhum dos dois aponta para uma seção), o que foi conferido antes e depois no banco local.

3. **[FEITO] Trocar o "0%" de estreia por um estado de boas-vindas** — em vez do zero em destaque no momento de maior insegurança, mostrar algo como "Vamos começar? Sua primeira lição leva uns 10 minutos" com um CTA para a trilha 1. A barra de progresso volta a aparecer assim que houver o primeiro módulo concluído. Cumpre o insight-chave do board, que hoje está contrariado na primeira tela.

   *Como ficou:* `pintarResumo` em `dashboard.html` troca o card por "Vamos começar?" enquanto `licoes_concluidas === 0`, com botão para a primeira trilha. Nenhum zero aparece na estreia.

4. **[FEITO] Corrigir `licao_id é obrigatório.`** — nome de campo de banco de dados exposto ao usuário, exatamente o tipo de jargão que o board manda eliminar. Vale revisar junto "Erro interno do servidor." e "Rota não encontrada.".

   *Como ficou:* "Não foi possível identificar a lição. Volte e tente de novo.", "Algo deu errado do nosso lado. Tente de novo em instantes." e "Não encontramos essa página.".

### Prioridade média — melhoram a aderência ao board

5. **[FEITO] Unificar "lição" e "módulo"** — escolher um termo e aplicar nas duas telas. Recomendo **"módulo"**, que é o que a tela de estudo usa e o que a estrutura virou. Envolve `dashboard.html`, `/api/resumo` (rótulos) e `comunidade.html`.

   *Como ficou:* "módulo" nas três telas — zero ocorrências de "lição/lições" no que a pessoa lê. O nome `licao` continua só no banco e nas rotas.

6. **[FEITO] Aumentar os alvos de toque para 44px** — pastilhas do stepper, "Todos os módulos", "Responder" e a seta de voltar. É só padding e `min-height` no CSS; nenhuma mudança estrutural.

   *Como ficou:* `min-height: 44px` no stepper, em "Todos os módulos", "Responder", "Sair" e na seta de voltar da topbar.

7. **[FEITO] Criar uma tela ou seção de apresentação antes do login** — as 3 trilhas com uma linha cada, "como funciona" em 3 passos, e a informação de que é gratuito e não precisa saber nada antes. Hoje quem chega decide se cadastrar sem saber o que vai encontrar. É a lacuna de onboarding que o board pedia no item 1 das decisões originais.

   *Como ficou:* `index.html` passou a ter duas vistas. A apresentação abre com os selos "de graça / feito para o celular / sem instalar nada", mostra as 3 trilhas com nível e número de módulos, "como funciona" em 3 passos, o tempo por módulo e o convite ao mural. O formulário fica na segunda vista, alcançável pelo CTA, pelo atalho "Entrar" no topo e pelos endereços `/#entrar` e `/#criar-conta` — que é para onde `Api.sair()` manda quem sai da conta. Cada troca de vista entra no histórico, então o botão voltar do celular devolve para a apresentação.

### Prioridade baixa — refinamento

8. **[FEITO] Suavizar o bloco de atividade** — trocar a borda tracejada por borda sólida clara, ou usar teal/âmbar no lugar do coral de alerta, e revisar o nome interno "modo teste" no CSS. Manter "Agora é sua vez".

   *Como ficou:* borda sólida clara sobre fundo levemente tingido, sem tracejado. "Agora é sua vez" continua.

9. **[FEITO] Tornar o acolhimento da comunidade permanente** — mover "aqui ninguém julga pergunta básica" do post semeado (que some) para o próprio formulário de publicar, como texto de apoio fixo.

   *Como ficou:* a frase é texto fixo acima do campo de publicar, em `comunidade.html`.

10. **[FEITO] Ligar o módulo ao mural** — um link discreto tipo "Ficou com dúvida? Pergunte para a turma" ao final do módulo. Fecha o traço "trabalha em grupo" da persona no momento em que a dúvida existe, em vez de esperar que ela lembre de ir ao mural.

    *Como ficou:* bloco `.convite-mural` no fim do módulo, levando para a comunidade.

11. **[FEITO] Foco visível nos botões** — hoje só `input` e `textarea` têm `:focus`. Acrescentar `:focus-visible` nos botões ajuda quem navega por teclado.

    *Como ficou:* `button:focus-visible`, `a:focus-visible` e `label.alternativa:focus-within` com contorno teal.

---

## Resumo

Do diagnóstico de 26/08/2026:

| Situação | Quantidade |
|---|---|
| Critérios **atendidos** | 14 |
| Critérios **parciais** | 6 |
| Critérios **não atendidos** | 5 |

Situação dos 11 ajustes recomendados:

| Situação | Itens |
|---|---|
| **Feitos** | 1 a 11 — todos |
| **Pendentes** | nenhum |

O sistema está sólido no que o board pedia de conteúdo, linguagem e estrutura mobile — nenhuma tela quebra a 390px, não há dependência de hover, e o conteúdo cobre todas as dores do mapa de empatia sem pressupor conhecimento prévio.

As falhas se concentravam em três frentes, e todas tinham rastreabilidade direta com o board: **o zoom bloqueado** (acessibilidade), **o módulo 1.1 assumindo um computador que a persona não tem** (contradição com o mapa de empatia), e **o "0%" de estreia** (contradiz o insight-chave da jornada, de mostrar progresso justamente onde a curva emocional é mais baixa). A lacuna de onboarding antes do cadastro era a quarta, e a única que exigia tela nova.

As quatro foram corrigidas, junto com os outros sete ajustes da lista — o detalhe de cada uma está em *Ajustes recomendados*, acima.
