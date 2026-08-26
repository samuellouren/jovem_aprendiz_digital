# Jovem Aprendiz Digital

Sistema web de capacitação digital, criado a partir do **Board UX** de pesquisa (persona Maria Alice, mapa de empatia e jornada do usuário) desenvolvido na disciplina de Interação Humano-Computador (IHC).

## Por que cada parte existe (rastreabilidade com a pesquisa)

| Funcionalidade | Insight do board que a originou |
|---|---|
| Interface simples, mobile-first, com poucos cliques | Persona só tem acesso à tecnologia pelo **smartphone** |
| Onboarding direto, sem jargão técnico em nenhuma tela | "Tecnologia não é pra pessoas como ele" — medo de não entender |
| Trilha **"Primeiros Passos no Computador"** (e-mail, planilhas, arquivos) | Dor explícita: insegurança com e-mail formal, planilhas e organização de arquivos |
| Trilha **"Ferramentas de IA no Dia a Dia"** | "Quer aprender IA mas não sabe por onde começar" |
| Trilha **"Pronta para o Mercado de Trabalho"** | Objetivo da persona: ser efetivada / conseguir emprego |
| Barra de progresso e % logo no topo do painel | A curva emocional da jornada cai mais forte **no início** — mostrar progresso cedo ajuda a manter a motivação |
| Aba **Comunidade** (mural para postar e trocar dicas) | Traço de personalidade: "trabalha em grupo"; oportunidade identificada na jornada: incentivar troca entre colegas |
| **Respostas nos posts** da comunidade | Um mural onde ninguém responde não vira troca: quem posta uma dúvida precisa ver que alguém voltou. Fecha o ciclo do "trabalha em grupo" |
| **Atividade ao final de cada lição** (múltipla escolha) | "Medo de não entender" — o botão manual de "concluí" não dizia se ela tinha entendido de verdade. A atividade dá a ela uma prova concreta de que aprendeu |
| **Lição virou módulo completo** (introdução, explicações, exemplo, dica, resumo) | A atividade tinha virado, na prática, o único conteúdo real da lição. Quem tem pouco contato prévio com tecnologia precisa do conteúdo antes do teste, não do teste no lugar do conteúdo |
| **Navegação por seção (stepper) e barra de progresso do módulo** | Conteúdo longo no celular precisa ser fatiado: uma seção por tela, com indicação clara de onde a pessoa está e quanto falta — senão a rolagem infinita desanima |
| **Ícones de linha no lugar de emoji, em todo o sistema** | Emoji muda de desenho conforme o aparelho, não segue a paleta e destoa do board de pesquisa em PDF, que usa ícones outline. Consistência visual sustenta a percepção de que o sistema é sério |

## A etapa mais recente: cada lição virou um módulo

### O problema que motivou a mudança

Na etapa anterior, cada lição era um texto de duas ou três frases (`licoes.conteudo`) seguido da atividade de múltipla escolha. O efeito colateral ficou evidente ao usar: **a atividade tinha virado o único conteúdo de aprendizado real da lição.** Ela deveria ser o reforço no final, não o conteúdo em si.

Agora cada lição é um **módulo completo**, no espírito de um curso EAD: a pessoa percorre várias seções de conteúdo e só então chega à atividade, que fecha o módulo como fixação.

### A tabela `secoes`

```sql
CREATE TABLE secoes (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  licao_id INTEGER NOT NULL,          -- FK -> licoes(id) ON DELETE CASCADE
  tipo     TEXT NOT NULL,             -- introducao | explicacao | exemplo | dica | resumo
  titulo   TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  ordem    INTEGER
);
```

Cada uma das 9 lições tem **7 seções**, sempre na mesma sequência pedagógica — **63 seções no total**:

| Ordem | Tipo | Papel no módulo |
|---|---|---|
| 1 | `introducao` | Contextualiza por que aquilo importa no dia a dia de quem está começando agora, conectado com a persona |
| 2 a 4 | `explicacao` | O conteúdo em si, passo a passo, do básico ao aplicável — com analogias simples, sem infantilizar |
| 5 | `exemplo` | Um caso concreto ("veja como fica na prática"), quase sempre com a própria Maria Alice |
| 6 | `dica` | O erro em que gente iniciante tropeça, e como evitar |
| 7 | `resumo` | Recapitula os pontos principais **antes** da atividade |

O volume de conteúdo saiu de ~200 caracteres por lição para **~10.000 caracteres por módulo**.

### Formato do texto das seções

O texto é guardado em um formato mínimo, sem HTML no banco:

- linha em branco separa parágrafos
- linha começando com `- ` vira item de lista
- `**texto**` vira negrito

Quem traduz isso para HTML é `public/js/formato.js`, e a ordem das operações é a parte que importa: **o texto é escapado primeiro e só depois as marcações são aplicadas.** Assim, uma seção que contivesse `<script>` chegaria à tela como texto visível, nunca como código executável.

### Como a tela ficou (inspirada em plataformas EAD)

`public/trilha.html` deixou de ser um accordion e passou a ter **duas telas**:

**1. Lista de módulos** — cabeçalho da trilha (nível, título, descrição e barra de progresso da trilha) seguido de um cartão por módulo, com número ou marca de concluído, título, resumo e metadados (quantas seções, se tem atividade).

**2. Módulo aberto** — uma seção por vez, com:

- **cabeçalho do módulo**: "Módulo 2 de 3", título, resumo e **barra de progresso do próprio módulo** (separada da barra da trilha inteira)
- **stepper horizontal** com uma pastilha por seção mais a da atividade — mostra em que ponto a pessoa está, marca o que já foi visto e permite pular direto para qualquer seção. Rola sozinho para manter a pastilha atual visível no celular
- **corpo da seção** com hierarquia tipográfica: rótulo do tipo, título destacado e texto com entrelinha confortável para leitura longa
- **navegação** com "Continuar" / "Anterior" ao pé da tela

Cada tipo de seção tem um destaque visual próprio (borda lateral colorida e, em alguns casos, fundo levemente tingido), sempre dentro da paleta já existente — `exemplo` em âmbar, `dica` em coral, `resumo` em verde, `introducao` em navy, `explicacao` em teal. Assim a pessoa reconhece "isso é um exemplo" ou "isso é um alerta" antes mesmo de ler.

A atividade fica no último passo, visualmente separada como um **bloco "modo teste"**: borda tracejada em coral, selo de ícone e o título **"Agora é sua vez"**, deixando explícito que ali termina o estudo e começa a fixação.

### Ícones no lugar de emoji, no sistema inteiro

Nenhuma tela usa emoji. Cada um foi substituído por um ícone de linha (outline) no mesmo estilo do board de pesquisa em PDF: traço de 2px, pontas arredondadas, sem preenchimento, herdando a cor do texto.

Os ícones vivem em **`public/js/icones.js`** — SVGs no estilo Feather/Lucide embutidos como strings, **sem CDN e sem build step**, mantendo a filosofia "sem dependência" do projeto (o `package.json` continua com uma dependência só). São duas formas de usar:

```html
<!-- 1. em HTML estático: o script preenche sozinho ao carregar a página -->
<span class="icone" data-icone="graduation-cap"></span>
```

```js
// 2. em JavaScript, gerando string
elemento.innerHTML = Icones.svg("search", { tamanho: 20 });
```

Como o traço usa `currentColor`, mudar a cor de um ícone é só mudar o `color` do elemento pai — nenhuma cor nova foi introduzida na paleta.

Os SVGs levam `aria-hidden="true"`: o ícone sempre acompanha um texto visível, então o leitor de tela deve ler o texto e não anunciar o desenho.

### Rota atualizada

| Método | Rota | O que mudou |
|---|---|---|
| `GET` | `/api/trilhas/:id` | Cada lição agora traz também `secoes` (array ordenado com `id`, `tipo`, `titulo`, `conteudo`, `ordem`), além das `questoes` que já retornava |

Tudo continua vindo em **uma requisição só** para a trilha inteira (~34 KB), de propósito: a persona usa celular em rede móvel, e esperar carregamento a cada troca de seção seria pior do que baixar tudo de uma vez.

### A migração não apaga nada

`db.js` roda, na subida do servidor, `semearSecoes()` e `migrarConteudo()` — as duas **idempotentes e não-destrutivas**, sem nenhum `DELETE` ou `DROP`:

- `semearSecoes()` só insere se a tabela `secoes` estiver vazia
- `migrarConteudo()` atualiza **no lugar** o que ficou defasado num banco antigo: ícones das trilhas (de emoji para nome de ícone), o resumo curto de cada lição, o post de boas-vindas (que tinha um emoji) e uma questão da atividade de e-mail — porque o módulo reescrito passou a descrever **cinco** partes no corpo do e-mail, e a pergunta antiga cobrava quatro

Nada disso toca em `usuarios`, `sessoes`, `progresso`, `respostas_usuario`, `posts` ou `comentarios`. **Um banco com progresso de usuário recebe os módulos novos sem perder nada** — verificado subindo o servidor sobre um `data/aprendiz.db` já existente.

### Conteúdo separado do banco

Todo o texto do curso saiu de `db.js` e passou a morar em **`conteudo.js`** (`TRILHAS`, `SECOES`, `ATIVIDADES`). `db.js` ficou com o que é dele: esquema, seeds e migração. Editar uma lição agora é mexer num arquivo de conteúdo, não no arquivo de banco de dados.

## Etapas anteriores

### Respostas (comentários) nos posts da comunidade

Cada publicação do mural pode receber respostas dos colegas.

- Na listagem, o post já mostra quantas respostas tem (`3 respostas`) — assim dá pra ver de relance onde a conversa está acontecendo, sem abrir nada.
- As respostas em si só são buscadas do servidor **quando a pessoa abre o post** (carregamento sob demanda). Abrir e fechar não recarrega a página.
- Quem responde vê a própria resposta aparecer na hora, e o contador se atualiza junto.

Tabela: `comentarios` (`id`, `post_id`, `usuario_id`, `conteudo`, `criado_em`), com chaves estrangeiras para `posts` e `usuarios` em `ON DELETE CASCADE` — apagar um post leva junto as respostas dele.

| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/api/comunidade` | Lista os posts, com `total_comentarios` em cada um |
| `GET` | `/api/comunidade/:id/comentarios` | Lista as respostas de um post (autor, conteúdo, data) |
| `POST` | `/api/comunidade/:id/comentarios` | Publica uma resposta (precisa estar logado), corpo `{ conteudo }` |

### Atividades para testar o que foi aprendido

Antes, cada lição terminava num botão "marcar como concluída" — a pessoa clicava e pronto, sem nenhuma confirmação de que tinha entendido. A conclusão passou a vir de ter demonstrado a compreensão: **conteúdo → atividade → conclusão automática**.

- A atividade traz 2 perguntas de múltipla escolha (4 alternativas, 1 certa) escritas especificamente sobre aquele conteúdo. Hoje ela é o **último passo do módulo**, no bloco "Agora é sua vez".
- A pessoa escolhe as respostas e toca em **Verificar respostas**. Cada pergunta ganha um retorno visual — verde para acerto, coral para "ainda não é essa".
- Acertando todas, a lição é marcada como concluída **sozinha**.
- Errando alguma, a mensagem é de incentivo ("Você acertou 1 de 2. Quase lá!"), nunca de reprovação — coerente com uma persona insegura com tecnologia. **A atividade pode ser refeita quantas vezes a pessoa quiser**, e as respostas anteriores voltam já marcadas quando ela reabre o módulo.

Tabelas:

- `questoes` (`id`, `licao_id`, `enunciado`, `ordem`)
- `alternativas` (`id`, `questao_id`, `texto`, `correta`, `ordem`)
- `respostas_usuario` (`usuario_id`, `questao_id`, `alternativa_id`, `correta`, `respondido_em`) — chave primária composta `(usuario_id, questao_id)`, então refazer a atividade sobrescreve a resposta antiga em vez de acumular lixo

O seed traz **2 questões para cada uma das 9 lições** (18 questões, 72 alternativas).

| Método | Rota | O que faz |
|---|---|---|
| `POST` | `/api/licoes/:id/responder` | Recebe `{ respostas: [{ questao_id, alternativa_id }, ...] }` com todas as questões da lição de uma vez e devolve `{ resultados, todas_corretas, concluida }` |

Duas decisões de segurança que valem registro:

- **O campo `correta` nunca é enviado para o navegador.** A correção acontece só no servidor — não dá pra "ver a resposta" no código-fonte da página.
- O `POST .../responder` valida que cada questão enviada pertence mesmo àquela lição e que cada alternativa pertence mesmo àquela questão, e exige que todas as perguntas tenham resposta antes de corrigir.

## Arquitetura (bem simples, de propósito)

- **Front-end**: HTML + CSS + JavaScript puro (sem framework, sem build step)
- **Back-end**: Node.js usando módulos nativos (`http`, `crypto`) + `@libsql/client`
- **Banco de dados**: SQLite via **libSQL** — roda 100% local (arquivo `data/aprendiz.db`) sem precisar de conta em nada, e migra para **Turso** (banco hospedado) só trocando duas variáveis de ambiente, sem mudar nenhuma linha de SQL

```
webapp/
├── server.js            servidor HTTP + rotas da API
├── db.js                conexão libSQL + esquema + seeds + migração
├── conteudo.js          todo o texto do curso: trilhas, seções e atividades
├── package.json
├── .env.example         modelo das variáveis de ambiente do Turso
├── data/
│   └── aprendiz.db      (gerado automaticamente no modo local)
└── public/
    ├── index.html       apresentação + login / cadastro
    ├── dashboard.html   painel com progresso e trilhas
    ├── trilha.html      módulos da trilha + leitura do módulo + atividade
    ├── comunidade.html  mural da turma
    ├── css/style.css
    └── js/
        ├── api.js       autenticação, chamadas à API e barra inferior
        ├── icones.js    ícones SVG de linha (sem CDN, sem build)
        └── formato.js   texto das seções -> HTML seguro (escapa antes de marcar)
```

## Como rodar

Requer **Node.js 20.6 ou mais recente**.

```bash
cd webapp
npm install
npm start
```

Depois é só abrir **http://localhost:3000** no navegador (ou no celular, na mesma rede, trocando `localhost` pelo IP do computador — já que a persona usa o celular no dia a dia).

Na primeira execução o banco local é criado e semeado automaticamente. Para começar do zero de novo, apague a pasta `data/`.

## Usando com Turso (banco hospedado)

1. Crie uma conta grátis em **https://turso.tech** e instale a CLI (ou use o painel web).
2. Crie um banco:
   ```bash
   turso db create jovem-aprendiz
   turso db show jovem-aprendiz --url          # copia a TURSO_DATABASE_URL
   turso db tokens create jovem-aprendiz        # gera o TURSO_AUTH_TOKEN
   ```
3. Copie `.env.example` para `.env` e preencha os dois valores:
   ```bash
   cp .env.example .env
   ```
   ```
   TURSO_DATABASE_URL=libsql://jovem-aprendiz-xxxx.turso.io
   TURSO_AUTH_TOKEN=eyJhbGciOi...
   ```
4. Rode normalmente com `npm start` — o `db.js` detecta as variáveis e passa a usar o Turso automaticamente (as tabelas e o conteúdo inicial são criados lá na primeira execução, do mesmo jeito que no banco local).

Sem essas duas variáveis, o sistema volta a usar o arquivo local — ótimo para desenvolver sem depender de internet.

## Modelo de dados

- `usuarios` — cadastro (senha nunca fica em texto puro: hash com salt via `crypto.scrypt`)
- `sessoes` — token de login (sem biblioteca de JWT, token aleatório simples)
- `trilhas` / `licoes` — conteúdo educacional, hierárquico (cada lição é um módulo)
- `secoes` — as partes que compõem o módulo de cada lição (introdução, explicações, exemplo, dica, resumo)
- `progresso` — quais lições cada usuário já concluiu
- `posts` — mural da comunidade
- `comentarios` — respostas dos colegas em cada post do mural
- `questoes` / `alternativas` — a atividade de múltipla escolha de cada lição
- `respostas_usuario` — o que cada pessoa respondeu em cada questão (e se acertou)

O seed é dividido em três etapas independentes (`semearTrilhas`, `semearAtividades` e `semearSecoes`), cada uma com sua própria verificação de "já rodou", mais a `migrarConteudo` descrita acima. Isso é de propósito: um banco criado **antes** das atividades ou das seções existirem recebe o conteúdo novo na próxima vez que o servidor sobe, sem precisar apagar a pasta `data/` e sem perder progresso.

## Por que Turso e não outro banco hospedado

Para esse projeto — poucas tabelas, bem relacionais, escala pequena — um banco SQL simples resolve bem. Entre as opções:

| Banco | Quando faz mais sentido |
|---|---|
| **Turso** (escolhido) | Mesma linguagem SQLite que já usamos; migração sem reescrever queries; free tier generoso |
| Supabase (Postgres) | Se quiserem autenticação pronta, storage de arquivos e um Postgres "completo" |
| Neon (Postgres) | Parecido com Supabase, mais focado só no banco |
| Firebase/Firestore | Só valeria se os dados fossem menos relacionais — não é o caso aqui |

## Próximos passos possíveis

- Painel para a equipe do programa cadastrar novas trilhas/lições **e questões** pela interface (hoje é só via seed)
- Mostrar para a equipe quais questões mais erram — é um sinal direto de qual conteúdo precisa ser reescrito
- Curtir e marcar uma resposta da comunidade como "essa me ajudou"
- Notificações simples de lembrete (ligando com a dor "esquecimento"/inconstância)
- Métricas agregadas de uso para a equipe entender onde os jovens travam (fechando o ciclo de pesquisa contínua do board)
