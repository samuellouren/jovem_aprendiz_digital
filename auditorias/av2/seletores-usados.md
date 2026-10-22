# Seletores, classes e atributos usados pelo JavaScript do front-end

Auditoria somente leitura, feita para o redesign de CSS/HTML não quebrar o JS.
Escopo: `public/js/*.js` (12 arquivos) cruzado com `public/*.html` e `public/css/style.css`.

Legenda: **[ID]** = id consultado por `getElementById` ou por seletor `#`; **[CLASSE]** = classe manipulada, escrita ou consultada; **[DATA]** = atributo `data-*`; **[ARIA]** = atributo de acessibilidade ou de estado.

---

## 1. `api.js`

**Carregado em:** todas as páginas com JS de tela (depois de `icones.js`, e antes de `formato.js` quando houver).

1. **Seletores consultados**
   - `getElementById("tabbar")`: id `tabbar` (presente em `dashboard.html` e `comunidade.html`). Sem o id, `montarTabbar` sai sem fazer nada.
2. **Classes manipuladas**
   - `classList.add("show")` em `mostrarErroForm` e `mostrarSucessoForm` (no elemento recebido por parâmetro).
3. **Classes e ids em markup gerado**
   - `ic()`: `<span class="icone" aria-hidden="true">` (usado por todo o JS de tela).
   - Mensagens de formulário: `<span class='txt'>`.
   - Tabbar: `<a class="active">` ou `class=""`, com `<span class="ic">`. Os links são `/dashboard.html` (Início) e `/comunidade.html` (Comunidade).
4. **Atributos**
   - [ARIA] `aria-current="page"` no link ativo da tabbar.
   - [ARIA] `aria-hidden="true"` no `<span>` do ícone.
   - `href` escrito (`/login.html` em `sair` e `exigirLogin`). O `href` do tabbar também é escrito.

---

## 2. `cadastro.js` (`cadastro.html`)

1. **Seletores**: `#form-cadastrar`, `#erro-cadastrar`, `#cad-nome`, `#cad-email`, `#cad-senha`, e `button[type=submit]` dentro do form (via `e.target.querySelector`).
2. **Classes**: `classList.remove("show")` em `#erro-cadastrar` (antes de cada envio).
3. **Markup**: nenhum. Os erros passam por `mostrarErroForm` (api.js).
4. **Atributos**: `disabled` (true/false) e `textContent` no botão (troca para "Criando conta..." e volta ao rótulo original). Valores de `value` dos três campos. O `role="alert"` do erro está no HTML e o comentário do JS depende dele.

---

## 3. `comunidade.js` (`comunidade.html`)

1. **Seletores**
   - Globais: `#lista-posts` (2x), `#form-post`, `#erro-post`, `#novo-post`, `button[type=submit]` dentro de `#form-post`.
   - Dentro de cada post montado (relativos ao `div.post-card`): `.btn-responder`, `.respostas`, `.lista-comentarios`, `.rotulo`, `.form-resposta`, `.erro-msg`, `textarea` (primeiro textarea do form), `button` (primeiro button do form, seletor genérico).
   - Atributo do label/textarea: `#resposta-<id>` (id dinâmico, `"resposta-" + p.id`).
2. **Classes**
   - `div.className = "card post-card"`.
   - `classList.contains("aberta")` e `classList.toggle("aberta", ...)` em `.respostas`.
   - `classList.toggle("aberto", ...)` em `.btn-responder`.
   - `classList.remove("show")` em `.erro-msg` e em `#erro-post`.
3. **Markup gerado**
   - Post: `.post-autor`, `.post-data`, `.post-conteudo`, `.btn-responder` (com `.icone.seta` e `.rotulo`), `.respostas`, `.lista-comentarios`, `.respostas-vazio`, `.form-resposta` (com `novalidate`), `label.sr-only`, `textarea` (com `placeholder`, `required`), `.erro-msg` (com `role="alert"`), `button.btn-secondary`.
   - Comentários: `.respostas-vazio`, `.comentario`, `.comentario-autor`, `.comentario-data`.
   - Lista vazia ou erro de carga: `p.vazio`.
4. **Atributos**
   - [ARIA] `aria-expanded` no `.btn-responder` ("true"/"false"), `aria-live="polite"` em `.lista-comentarios`, `role="alert"` em `.erro-msg`, `aria-hidden` no ícone.
   - `type="button"` e `type="submit"`, `required`, `novalidate`, `placeholder`.
   - `disabled` no `button` do form de resposta e no botão do form de post.
   - `value`/`textContent` do textarea e do rótulo do botão de respostas.

---

## 4. `dashboard.js` (`dashboard.html`)

1. **Seletores**: `#btn-sair`, `#saudacao`, `#aviso-verificacao`, `#resumo-card`, `#lista-trilhas` (2x). O `#tabbar` é montado por `api.js`.
2. **Classes**
   - `card.className = "resumo-card boas-vindas"` e `card.className = "resumo-card"`. Atribuição direta, substitui a lista inteira de classes do card.
   - `div.className = "card trilha-card"` (criado como `<a>`).
3. **Markup gerado**
   - Resumo sem progresso: `h2`, `p`, `a.btn-comecar` (com `href="/trilha.html?id=…"` e ícone `arrow-right`).
   - Resumo com progresso: `div` sem classe, `.pct`, `.barra-fundo`, `.barra-preenchida` (com `style="width:N%"`), `.resumo-texto`.
   - Card de trilha: `.trilha-icone`, `.trilha-info`, `.trilha-nivel`, `h2.trilha-titulo`, `p.trilha-descricao`, `.trilha-progresso-texto`.
   - Erro de carga: `p.vazio`.
4. **Atributos**
   - `hidden`: escrito como `false` em `#aviso-verificacao` (ver achado na seção final).
   - [ARIA] `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="Progresso geral"` no `.barra-fundo`.
   - `href` do card de trilha (`/trilha.html?id=`).
   - `style="width:…%"` inline na barra preenchida.
   - `textContent` de `#saudacao` e de `#aviso-verificacao`.

---

## 5. `esqueci-senha.js` (`esqueci-senha.html`)

1. **Seletores**: `#form-esqueci-senha`, `#erro-form`, `#sucesso-form`, `#email`, `button[type=submit]` dentro do form.
2. **Classes**: `classList.remove("show")` em `#erro-form` e em `#sucesso-form`.
3. **Markup**: nenhum direto (sucesso e erro usam `mostrarSucessoForm` e `mostrarErroForm`).
4. **Atributos**: `disabled` (true; volta a false só no erro), `textContent` do botão ("Enviando..."), `form.reset()`.

---

## 6. `index.js` (`index.html`)

1. **Seletores**: nenhum seletor de DOM. Só `Api.token()` e redirecionamento.
2. **Classes / ids**: nenhum.
3. **Markup**: nenhum.
4. **Atributos**: nenhum.

---

## 7. `login.js` (`login.html`)

1. **Seletores**: `#form-entrar`, `#erro-entrar`, `#login-email`, `#login-senha`, `button[type=submit]` dentro do form.
2. **Classes**: `classList.remove("show")` em `#erro-entrar`.
3. **Markup**: nenhum direto.
4. **Atributos**: `disabled`, `textContent` do botão ("Entrando...").

---

## 8. `redefinir-senha.js` (`redefinir-senha.html`)

1. **Seletores**: `#aviso-sem-token`, `#painel-form`, `#painel-sucesso`, `#form-redefinir-senha`, `#erro-form`, `#nova-senha`, `#confirmar-senha`, `#sucesso-form`, `#texto-aviso-sem-token`, `button[type=submit]` dentro do form.
2. **Classes**: `classList.remove("show")` em `#erro-form`. As mensagens `show` são adicionadas por `mostrarErroForm` / `mostrarSucessoForm`.
3. **Markup**: nenhum direto.
4. **Atributos**
   - `hidden`: lido (`painelForm.hidden === false`) e escrito (`true`/`false`) em `#aviso-sem-token`, `#painel-form` e `#painel-sucesso`.
   - `disabled` e `textContent` do botão ("Salvando...").
   - `textContent` de `#texto-aviso-sem-token`.
   - Os campos `#nova-senha` e `#confirmar-senha` são lidos por `value`.

---

## 9. `trilha.js` (`trilha.html`)

Arquivo mais denso: 496 linhas, telas de trilha, módulo, stepper, seções e atividade.

1. **Seletores consultados**
   - Por id (getElementById): `#cabecalho-trilha`, `#lista-modulos` (2x), `#tela-modulo` (2x), `#tela-trilha` (2x), `#titulo-topo` (2x), `#subtitulo-topo` (2x), `#modulo-topo`, `#stepper` (3x), `#stepper-wrap`, `#conteudo-passo`, `#secao-nav`.
   - Por classe/seletor (querySelector/querySelectorAll):
     - `.btn-voltar-modulos` (dentro de `#modulo-topo`).
     - `.passo.atual` (dentro de `#stepper`, para o scroll).
     - `.convite-mural` (busca global em `document`, para remover o convite antigo).
     - `.alternativa` (querySelectorAll em cada `.questao`).
     - `input` (primeiro input dentro de `label.alternativa`; seletor genérico).
     - `.questao` (querySelectorAll no bloco de teste).
     - `.feedback-questao` (dentro de `.questao`).
     - `.verificar` e `.feedback-final` (dentro do bloco de teste).
     - `input[name="questao-${q.id}"]:checked`.
     - `.questao[data-questao="${res.questao_id}"]`.
2. **Classes manipuladas**
   - `className` atribuído:
     - `btn.className = "modulo-card" + " feito"`.
     - `btn.className = "passo" + " atual"` ou `" visitado"`.
     - `btn.className = "passo passo-teste" + " atual"`.
     - `artigo.className = "secao secao-" + tipo` (tipo válido: `introducao`, `explicacao`, `exemplo`, `dica`, `resumo`; caso contrário, `explicacao`).
     - `voltar`/`anterior` = `"btn-anterior"`. `lista`/`proximo` = `"btn-proximo ir-atividade"` ou `"btn-proximo"` + `" ir-atividade"`.
     - `convite.className = "convite-mural"`, `box.className = "bloco-teste"`.
     - `final.className = "feedback-final tente-de-novo show"`, `"feedback-final tudo-certo show"`.
     - `fb.className = "feedback-questao show " + ("certa" | "errada")`.
   - `classList.toggle("rola-esquerda", …)` e `classList.toggle("rola-direita", …)` em `#stepper-wrap`.
   - `classList.toggle("marcada", …)` em `label.alternativa` (lê `input.checked`).
   - `classList.toggle("certa" | "errada", …)` em `.questao`. `classList.remove("certa", "errada")` e `classList.remove("show")` no `.feedback-questao` ao trocar alternativa.
3. **Markup gerado** (classes escritas em strings e template literals)
   - Cabeçalho da trilha: `.trilha-cabecalho`, `.etiqueta-nivel`, `h1`, `p.desc`, `.barra-fundo`, `.barra-preenchida`, `.progresso-texto`.
   - Lista de módulos: `button.modulo-card` com `.modulo-numero`, `.modulo-corpo`, `.modulo-titulo`, `.modulo-resumo`, `.modulo-meta`, `.feito-txt`, `.icone.seta`.
   - Topo do módulo (`#modulo-topo`): `.btn-voltar-modulos`, `.modulo-etiqueta`, `h1`, `p.modulo-resumo`, `.modulo-progresso`, `.barra-fundo`, `.barra-preenchida`, `.passo-texto`.
   - Stepper: `button.passo` com `.atual`, `.visitado`, `.passo-teste`. Texto em `<span>` (rótulo "(concluída)" quando visto).
   - Seção: `article.secao.secao-<tipo>`, `.secao-tipo`, `h2`, `.secao-texto`. Conteúdo gerado por `Formato.paraHtml`, que gera `ul.secao-lista`.
   - Navegação (`#secao-nav`): `.btn-anterior` (com `aria-label`), `.btn-proximo`, `.ir-atividade`. Convite final: `a.convite-mural` (com `href="/comunidade.html"`).
   - Atividade: `.bloco-teste`, `.teste-cabecalho`, `.teste-selo`, `fieldset.questao[data-questao]`, `legend.questao-numero`, `.questao-enunciado`, `label.alternativa` (com `input[type=radio][name="questao-<id>"][value]` e `span`), `.feedback-questao`, `button.btn-primary.verificar`, `.feedback-final`. Mensagens finais com `span.txt` e `span.sub`. Classes de estado: `.certa`, `.errada`, `.tudo-certo`, `.tente-de-novo`, `.show`.
   - Ícones via `ic()` e `Icones.svg()`: `.icone`, `.ic`, `.seta`, `.teste-selo`.
   - Erro de carga: `p.vazio`.
4. **Atributos**
   - [ARIA] `aria-current="step"` no passo atual do stepper.
   - [ARIA] `aria-label="Parte anterior"` no `.btn-anterior`.
   - [ARIA] `aria-hidden` em ícones, `.modulo-numero` e `.teste-selo`.
   - [ARIA] `role="progressbar"` com `aria-valuenow`, `aria-valuemin`, `aria-valuemax` e `aria-label` ("Progresso da trilha" e "Progresso do módulo"), escritos em template.
   - [ARIA] `role="status"` e `aria-live="polite"` nos `.feedback-questao` e `.feedback-final` (escritos em template).
   - `hidden`: escrito em `#tela-modulo` e `#tela-trilha` (alternam a tela).
   - `disabled`: escrito em `.btn-anterior` (quando `passoAtual === 0`) e em `.verificar` (durante a verificação).
   - `type="button"` em todos os botões gerados.
   - `data-questao` escrito no `fieldset` e lido via seletor.
   - `name="questao-<id>"`, `value="<alternativa id>"`, `type="radio"`: lidos e escritos. `input.checked` é escrito (`true`) para restaurar a última resposta, e lido em `marcarSelecionada` e na checagem.
   - `href`: `/comunidade.html` (convite) e `/trilha.html?id=` no botão do dashboard (não é deste arquivo).
   - `style="width:N%"` inline nas barras de progresso.
   - Dependência de layout: `scrollWidth`, `clientWidth`, `scrollLeft` em `#stepper` (decide quais sombras aparecem); `scrollIntoView` no `.passo.atual`; `window.scrollTo`.

---

## 10. `verificar-email.js` (`verificar-email.html`)

1. **Seletores**: `#carregando`, `#sucesso-form`, `#erro-form`.
2. **Classes**: nenhuma direta. `mostrarErroForm` e `mostrarSucessoForm` fazem `classList.add("show")`.
3. **Markup**: nenhum direto.
4. **Atributos**: `hidden` escrito como `true` em `#carregando` (nas três saídas do fluxo).

---

## 11. `formato.js` (usado por `trilha.html`)

1. **Seletores**: nenhum seletor de DOM. Só cria um `div` temporário para escapar texto.
2. **Classes**: nenhuma manipulada.
3. **Markup gerado**: `ul.secao-lista` (classe com estilo em `style.css`), `li`, `p`, `strong`.
4. **Atributos**: nenhum.

---

## 12. `icones.js` (todas as páginas)

1. **Seletores consultados**: `querySelectorAll("[data-icone]")` dentro de `aplicar(raiz)`.
2. **Classes manipuladas**: nenhuma. Não usa `classList`.
3. **Markup gerado**: `<svg viewBox="0 0 24 24" width=… height=… fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">`. A opção `classe` existe, mas nenhum arquivo a passa.
4. **Atributos**
   - [DATA] lê `data-icone` (nome do ícone) e `data-icone-tamanho` (tamanho em px, padrão 24).
   - Escreve `innerHTML` do elemento marcado. Qualquer texto dentro desse elemento é apagado.
   - Nome desconhecido cai no ícone `circle` (fallback).

### Atributos `data-icone` usados no HTML (estáticos)

| Página | Nomes de ícone (`data-icone`) |
|---|---|
| `cadastro.html` | `graduation-cap` (28 e 26), `check` (15), `smartphone` (15), `globe` (15), `arrow-left` (17) |
| `comunidade.html` | `message-circle` (20), `send` (18) |
| `dashboard.html` | `graduation-cap` (20) |
| `esqueci-senha.html` | `graduation-cap` (28 e 26), `check`, `smartphone`, `globe` (15), `arrow-left` (17) |
| `index.html` | `graduation-cap` (34), `check`, `smartphone`, `globe` (15), `book-open` (19), `monitor` (26), `sparkles` (26), `target` (26), `list-checks` (19), `clock` (17), `message-circle` (20), `arrow-right` (18) |
| `login.html` | `graduation-cap` (28 e 26), `check`, `smartphone`, `globe` (15), `arrow-left` (17) |
| `redefinir-senha.html` | `graduation-cap` (28 e 26), `check`, `smartphone`, `globe` (15) |
| `trilha.html` | `arrow-left` (22), `layers` (19) |
| `verificar-email.html` | `graduation-cap` (28 e 26), `check`, `smartphone`, `globe` (15) |

Todos esses nomes existem em `CAMINHOS`. Os nomes que o JS monta (`t.icone` vindo da API, `TIPOS`, etc.) também são resolvidos em tempo de execução, e os desconhecidos viram `circle`.

---

## Cruzamento: ids que cada HTML precisa ter

Todos os ids consultados pelo JS existem nos HTML correspondentes. Não há id faltando.

| HTML | Ids que o JS exige | Carregado por |
|---|---|---|
| `cadastro.html` | `form-cadastrar`, `erro-cadastrar` (role=alert), `cad-nome`, `cad-email`, `cad-senha`; submit com `type="submit"` | `cadastro.js` |
| `comunidade.html` | `tabbar`, `lista-posts`, `form-post`, `erro-post`, `novo-post`; submit com `type="submit"` | `comunidade.js` |
| `dashboard.html` | `tabbar`, `btn-sair`, `saudacao`, `aviso-verificacao` (hidden), `resumo-card`, `lista-trilhas` | `dashboard.js` |
| `esqueci-senha.html` | `form-esqueci-senha`, `erro-form`, `sucesso-form`, `email`; submit com `type="submit"` | `esqueci-senha.js` |
| `index.html` | nenhum | `index.js` (só redireciona) |
| `login.html` | `form-entrar`, `erro-entrar`, `login-email`, `login-senha`; submit com `type="submit"` | `login.js` |
| `redefinir-senha.html` | `aviso-sem-token` (hidden), `texto-aviso-sem-token`, `painel-form` (hidden), `form-redefinir-senha`, `nova-senha`, `confirmar-senha`, `erro-form`, `sucesso-form`, `painel-sucesso` (hidden); submit com `type="submit"` | `redefinir-senha.js` |
| `trilha.html` | `cabecalho-trilha`, `lista-modulos`, `tela-trilha`, `tela-modulo` (hidden), `titulo-topo`, `subtitulo-topo`, `modulo-topo`, `stepper`, `stepper-wrap`, `conteudo-passo`, `secao-nav` | `formato.js`, `trilha.js` |
| `verificar-email.html` | `carregando`, `sucesso-form`, `erro-form` | `verificar-email.js` |

Ids presentes no HTML que o JS **não** consulta (podem ser renomeados sem quebrar o JS, mas alguns são referenciados por `aria-describedby`):
- `btn-topo-voltar` (`trilha.html`, link "Voltar para o início").
- `conteudo` (todas as páginas).
- `vista-apresentacao` (`index.html`).
- `titulo-cadastro`, `titulo-login`.
- `cad-senha-ajuda`, `nova-senha-ajuda`, `novo-post-ajuda`: **não** tocar sem atualizar o `aria-describedby` de `cad-senha`, `nova-senha` e `novo-post`.

Quanto ao `submit`: os cinco formulários usam `button[type=submit]`. Esse seletor depende do atributo `type="submit"` escrito explicitamente (hoje presente nos cinco).

---

## Achados relevantes para o redesign

1. **Aviso de verificação de e-mail nunca aparece.** Em `dashboard.html` (linha 30), `#aviso-verificacao` tem `class="sucesso-msg"` e `hidden`. Em `dashboard.js`, o JS só faz `aviso.hidden = false` e não adiciona `show`. Em `style.css`, `.sucesso-msg` tem `display: none` e só `.sucesso-msg.show` volta a mostrar. Resultado: o aviso fica invisível. Isso é um bug existente, não um problema do redesign. Correção possível: `aviso.classList.add("show")` no JS, ou remover `sucesso-msg` do HTML.
2. **Classes que o JS usa e que não têm regra no CSS:** `rotulo` (comunidade), `lista-comentarios` (comunidade) e `verificar` (trilha). São hooks de consulta do JS. Não quebram visual, mas remover ou renomear quebra o comportamento (`querySelector(".rotulo")`, `querySelector(".lista-comentarios")`, `querySelector(".verificar")`).
3. **Seletores genéricos e frágeis:** `querySelector("button")` em `comunidade.js` (primeiro button do form de resposta), `querySelector("input")` em `trilha.js` (primeiro input do label), `querySelector("textarea")`, e `button[type=submit]` em todos os forms. Se o redesign adicionar um botão ou input antes dos atuais, o JS passa a usar o elemento errado.
4. **Hidden atributo sem `[hidden]{display:none}` no CSS.** O CSS não tem regra global para `[hidden]`. Se alguma regra futura definir `display` nos elementos que o JS esconde com `hidden` (`#tela-modulo`, `#tela-trilha`, `#painel-form`, `#painel-sucesso`, `#aviso-sem-token`, `#carregando`, `#aviso-verificacao`), o `hidden` deixa de funcionar. Sugestão: adicionar `[hidden] { display: none !important; }` antes de qualquer redesign.
5. **`className` sobrescrito por inteiro:** `card.className = "resumo-card"` (dashboard), `btn.className = …` (trilha), `div.className = "card post-card"` (comunidade). Qualquer classe extra posta no HTML ou por CSS-in-JS nesses elementos é apagada. Esses nomes são gerados só pelo JS, então devem continuar exatamente iguais.
6. **Exibição de mensagens de formulário depende de `.show`:** `.erro-msg` e `.sucesso-msg` têm `display: none` por padrão. Qualquer mudança de CSS nesses componentes precisa manter `.show` como o único gatilho de exibição.
7. **Stepper depende de layout:** `atualizarSombraStepper` mede `scrollWidth`, `clientWidth` e `scrollLeft` de `#stepper`, e liga/desliga `.rola-esquerda` / `.rola-direita` em `#stepper-wrap`. Se o redesign mudar o overflow ou o elemento que rola, as sombras param de funcionar.
8. **Seletores com estado:** `:checked` (trilha), `.passo.atual`, `.questao[data-questao=…]`. O `data-questao` e o `name="questao-<id>"` precisam continuar iguais.
9. **Ids também como classes:** `#secao-nav` é id no HTML, e `.secao-nav` é classe no CSS. `#lista-trilhas` e `#resumo-card` aparecem como seletores `#` no CSS. Mudar um deles mexe nos dois usos.
10. **Ids dinâmicos:** `resposta-<id>` (comunidade) é gerado para cada post. O `for` do label usa o mesmo valor. Não é estático, então não aparece na lista consolidada como id fixo.

---

## Lista consolidada — NÃO renomear

### IDs (42 estáticos + 1 dinâmico)

aviso-sem-token
aviso-verificacao
btn-sair
cabecalho-trilha
cad-email
cad-nome
cad-senha
carregando
confirmar-senha
conteudo-passo
email
erro-cadastrar
erro-entrar
erro-form
erro-post
form-cadastrar
form-entrar
form-esqueci-senha
form-post
form-redefinir-senha
lista-modulos
lista-posts
lista-trilhas
login-email
login-senha
modulo-topo
nova-senha
novo-post
painel-form
painel-sucesso
resposta-<id> (dinâmico, em comunidade.js)
resumo-card
saudacao
secao-nav
stepper
stepper-wrap
subtitulo-topo
sucesso-form
tabbar
tela-modulo
tela-trilha
texto-aviso-sem-token
titulo-topo

### Classes (92 únicas, usadas pelo JS)

aberta
aberto
active
alternativa
atual
barra-fundo
barra-preenchida
bloco-teste
boas-vindas
btn-anterior
btn-comecar
btn-primary
btn-proximo
btn-responder
btn-secondary
btn-voltar-modulos
card
certa
comentario
comentario-autor
comentario-data
convite-mural
desc
errada
erro-msg
etiqueta-nivel
feedback-final
feedback-questao
feito
feito-txt
form-resposta
ic
icone
ir-atividade
lista-comentarios
marcada
modulo-card
modulo-corpo
modulo-etiqueta
modulo-meta
modulo-numero
modulo-progresso
modulo-resumo
modulo-titulo
passo
passo-teste
passo-texto
pct
post-autor
post-card
post-conteudo
post-data
progresso-texto
questao
questao-enunciado
questao-numero
respostas
respostas-vazio
resumo-card
resumo-texto
rola-direita
rola-esquerda
rotulo
secao
secao-dica
secao-exemplo
secao-explicacao
secao-introducao
secao-lista
secao-resumo
secao-texto
secao-tipo
seta
show
sr-only
sub
tente-de-novo
teste-cabecalho
teste-selo
trilha-cabecalho
trilha-card
trilha-descricao
trilha-icone
trilha-info
trilha-nivel
trilha-progresso-texto
trilha-titulo
tudo-certo
txt
verificar
vazio
visitado
