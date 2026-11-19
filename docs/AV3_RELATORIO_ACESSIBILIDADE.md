# 3ª AV — Relatório de acessibilidade (WCAG 2.1 AA), antes e depois

Data da medição: 19/11/2026. Sistema rodando em servidor local, em 13 telas/estados × 2 tamanhos de tela (390×844 celular e 1280×800 computador) = 26 execuções por rodada.

Telas/estados medidos: index, login, cadastro, esqueci-senha, redefinir-senha, verificar-email, dashboard, comunidade, trilha (lista), trilha com módulo aberto, trilha na atividade, trilha na atividade com erro e a página 404.

Ferramentas: **axe-core 4** (tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa e best-practice), **Playwright + Chrome** para zoom, alvos de toque e fluxos de formulário, e simulação de daltonismo por matrizes de Machado et al. (2009).

## 1. Relatório de ferramenta automática (axe)

| | Antes | Depois |
|---|---|---|
| Violações (soma das 26 execuções) | **10** | **0** |
| Páginas com violação | 404, trilha | nenhuma |

Detalhe do "antes" (todas corrigidas):

| Tela | Regra axe | Gravidade | Problema | Correção |
|---|---|---|---|---|
| 404 | `html-has-lang` | séria | Página sem idioma declarado: leitor de tela lê com sotaque errado | Nova `public/404.html` com `lang="pt-BR"` |
| 404 | `document-title` | séria | Página sem título | Título "Página não encontrada — Jovem Aprendiz Digital" |
| 404 | `landmark-one-main` e `region` | moderada | Sem região principal; conteúdo solto | `<main id="conteudo">` + link "Pular para o conteúdo" |
| Trilha (3 botões de módulo) | `label-content-name-mismatch` (WCAG 2.5.3) | séria | O nome lido ("Módulo 1: Título — começar") não continha o texto visível ("Começar", título e contagem). Quem usa comando de voz ("clicar em Começar") não conseguia acionar | Removido o `aria-label`; o nome vem do próprio conteúdo, com "Módulo N:" no começo, só para leitor de tela |

Os itens "incomplete" do axe (todos `color-contrast`) são os mesmos falsos positivos já documentados em `DOCUMENTACAO_IHC.md`, seção 4: sombra do stepper, gradiente do painel de marca, número do anel de progresso e alça do `textarea`.

Os arquivos brutos estão em `auditorias/av3-validacao/antes/resultado.json` e `.../depois/resultado.json`.

## 2. O que o axe não pega, medido à parte

| Critério | Antes | Depois | O que mudou |
|---|---|---|---|
| 1.4.11 Contraste de não-texto: borda de campos e alternativas | **1,23:1** (borda `#E2E8F0` sobre branco; mínimo 3:1) | **3,47:1** (`--border-campo: #7B8BA1`) | Campos e alternativas passam a ser visíveis para quem tem baixa visão |
| 2.5.8 Alvos de toque ≥ 24px (meta do projeto: 44px) | 0 alvos abaixo de 44px no celular | 0 alvos abaixo de 44px | Medido em todos os botões, links e campos visíveis (links no meio de parágrafo são exceção da norma) |
| 1.4.4 e 1.4.10 Zoom 200% e reflow em 400% | Sem rolagem horizontal em nenhuma tela | Sem rolagem horizontal em nenhuma tela | Medido com janela de 640px (200% sobre 1280px) e 320px (400%). A única faixa que rola de lado é o stepper de seções, que é intencional e tem pista visual de rolagem |
| 3.3.1 / 3.3.3 Erro identificado e explicado | Erro anunciado (`role="alert"`), mas **não ligado ao campo** e sem dizer o formato esperado | Erro junto do campo, com ícone + texto, `aria-invalid`, `aria-describedby` e foco no primeiro campo com problema | Veja a seção 3 |
| 1.4.1 Uso de cor | Ok | Ok | Veja a seção 4 |

## 3. Formulários acessíveis

Antes, login, cadastro, esqueci-senha, redefinir-senha e o mural mostravam um aviso geral e deixavam a pessoa descobrir qual campo estava errado. Agora (`public/js/api.js`: `validarCampos`, `marcarCampoInvalido`):

- cada campo tem `<label for>` visível (já existia; o placeholder só dá exemplo);
- o erro aparece **logo abaixo do campo**, com ícone e texto, e diz como resolver;
- o campo ganha `aria-invalid="true"` e `aria-describedby` apontando para a mensagem;
- o foco vai para o primeiro campo com problema, e o aviso geral (`role="alert"`) resume quantos ajustes faltam;
- o erro some assim que a pessoa começa a corrigir;
- a borda vermelha nunca é o único sinal.

Mensagens (linguagem simples, sem jargão):

| Situação | Mensagem |
|---|---|
| E-mail vazio | Digite seu e-mail. Exemplo: nome@email.com |
| E-mail sem formato | Esse e-mail parece incompleto. Use o formato nome@email.com |
| Senha vazia no login | Digite sua senha. Se esqueceu, use o link "Esqueci minha senha". |
| Senha curta | Essa senha ficou curta. Use pelo menos 4 caracteres. |
| Senhas diferentes | As senhas são diferentes. Digite a mesma senha nos dois campos. |
| Nome vazio | Digite seu nome. É assim que você aparece na comunidade. |
| Mural vazio | Escreva algo antes de publicar. Pode ser uma dúvida curta. |

Testes automáticos desse comportamento: 14 de 14 passaram (`auditorias/av3-validacao/depois/testes-funcionais.json`), incluindo o axe com a tela de login **em estado de erro** (0 violações).

## 4. Daltonismo

Simulação de protanopia, deuteranopia, tritanopia e acromatopsia (visão só em cinza) em 4 telas: atividade com resposta errada, início, cadastro com erros e 404. Imagens: `auditorias/av3-validacao/depois/daltonismo-*.png`.

Resultado: nenhuma informação depende só de cor.

- Resposta errada na atividade: ícone "X" + texto "Revise esta resposta" + borda mais grossa. Continua claro mesmo em escala de cinza.
- Erros de formulário: ícone de alerta + texto + mensagem abaixo do campo.
- Estado do módulo na trilha: ícone (check, seta, número) + rótulo escrito ("Concluído", "Começar").

## 5. Leitor de tela

**O que foi feito aqui:** a árvore de acessibilidade das telas de início e trilha foi extraída (`arvore-acessibilidade-*.txt`), e o fluxo de login foi concluído **só com teclado** (Tab até o link "Pular para o conteúdo", e-mail, senha, Enter). A árvore mostra o que um leitor de tela anuncia: regiões (`navigation`, `main`), títulos em ordem, botões com nome claro (por exemplo, `Módulo 1: Começar Organizando arquivos e pastas 7 seções · atividade`).

**O que NÃO foi feito:** uma sessão real com NVDA (ou VoiceOver). A árvore é um bom indício, mas não substitui ouvir a voz. O passo a passo de 10 minutos está em `docs/AV3_KIT_TESTES.md`, seção 6. Para a entrega, grave a tela com o áudio do leitor.

## 6. Limitações desta medição

- A fonte Nunito vem do Google Fonts e a rede do ambiente de teste bloqueia esse domínio; as medições usaram a fonte de reserva do sistema. Contraste, estrutura e rótulos não mudam, mas quebras de linha podem ter pequenas diferenças. Vale rodar o Lighthouse no seu computador antes de entregar (aba Lighthouse do Chrome, categoria Acessibilidade) e anexar o relatório do "depois".
- O relatório "antes" foi tirado do código como estava no início desta etapa, não do início do projeto.
