// conteudo.js — Todo o conteúdo educacional do sistema, separado da lógica de banco.
//
// Três blocos:
//   TRILHAS    — as trilhas e os títulos das lições de cada uma
//   SECOES     — o módulo de estudo de cada lição, em seções ordenadas
//   ATIVIDADES — a atividade de múltipla escolha que fecha cada módulo
//
// Sobre o formato do texto das seções:
//   - parágrafos são separados por uma linha em branco
//   - uma linha começando com "- " vira item de lista
//   - **texto entre dois asteriscos** vira negrito
// O navegador escapa o texto ANTES de aplicar essas marcações (public/js/formato.js),
// então nada que vier do banco consegue injetar HTML.
//
// Tipos de seção válidos: introducao | explicacao | exemplo | dica | resumo

const TRILHAS = [
  {
    titulo: "Primeiros Passos no Computador",
    descricao: "O básico que ninguém te ensinou, sem pressa e sem jargão.",
    nivel: "iniciante",
    icone: "monitor",
    ordem: 1,
    licoes: [
      [
        "Organizando arquivos e pastas",
        "Criar pastas, nomear arquivos e voltar a encontrar tudo depois — pelo celular, com o app Arquivos e o Google Drive, do jeito que quem trabalha com isso usa todo dia.",
      ],
      [
        "Escrevendo um e-mail profissional",
        "A estrutura de um e-mail formal do zero: assunto, saudação, motivo, pedido e despedida — com modelos prontos para adaptar.",
      ],
      [
        "Introdução a planilhas",
        "Célula, linha, coluna, a primeira fórmula e como montar uma lista que a planilha consegue somar, ordenar e filtrar por você.",
      ],
    ],
  },
  {
    titulo: "Ferramentas de IA no Dia a Dia",
    descricao: "Inteligência artificial explicada sem enrolação, direto ao ponto.",
    nivel: "intermediário",
    icone: "sparkles",
    ordem: 2,
    licoes: [
      [
        "O que é inteligência artificial (sem enrolação)",
        "O que a IA realmente faz por baixo, onde você já usa sem perceber, e — igualmente importante — o que ela não é e onde ela erra.",
      ],
      [
        "Usando IA para resumir e estudar",
        "Resumir um texto grande, pedir a explicação de um assunto difícil em outro nível e transformar a IA em parceira de estudo antes de uma prova.",
      ],
      [
        "Criando pedidos (prompts) simples e úteis",
        "As quatro peças de um pedido que funciona, como dar exemplos para a IA e por que a segunda tentativa quase sempre é melhor que a primeira.",
      ],
    ],
  },
  {
    titulo: "Pronta para o Mercado de Trabalho",
    descricao: "Habilidades práticas para o trabalho e para o futuro emprego.",
    nivel: "intermediário",
    icone: "target",
    ordem: 3,
    licoes: [
      [
        "Currículo e perfil online básico",
        "Como montar um currículo de uma página sendo primeiro emprego, e um perfil online que diga o que você já sabe fazer.",
      ],
      [
        "Reuniões online sem susto",
        "O que fazer antes, durante e depois de uma chamada de vídeo — microfone, câmera, chat, compartilhar tela e o que fazer se a internet cair.",
      ],
      [
        "Organizando sua rotina de estudo e trabalho",
        "Um sistema simples e gratuito para não perder prazo: tirar tudo da cabeça, dar prioridade e revisar uma vez por semana.",
      ],
    ],
  },
];

// ---------------------------------------------------------------
// SECOES — o módulo de estudo de cada lição.
// Cada item é [tipo, titulo, conteudo]. A ordem do array é a ordem
// em que a pessoa percorre o módulo.
// ---------------------------------------------------------------
const SECOES = {
  // ===============================================================
  // Trilha 1 — Primeiros Passos no Computador
  // ===============================================================
  "Organizando arquivos e pastas": [
    [
      "introducao",
      "Por que começar por aqui",
      `No primeiro dia de trabalho quase ninguém vai te pedir para programar. Mas alguém vai te pedir para "me manda o comprovante que você recebeu semana passada", "salva esse arquivo na pasta do setor" ou "abre aquele documento que a gente usou na reunião". São pedidos simples — e são exatamente os que travam quem nunca parou para organizar os próprios arquivos.

O que costuma acontecer: tudo que chega por WhatsApp, por e-mail e por download cai solto no aparelho. Em duas semanas são centenas de arquivos com nomes como documento.pdf, documento (1).pdf, IMG_20240412_141233.jpg e scan_0001.pdf. Achar qualquer coisa vira uma caçada de dez minutos, na frente de todo mundo.

A boa notícia é que organizar arquivos não exige talento especial nem equipamento nenhum além do que você já tem na mão. É um punhado de regras simples que, uma vez aprendidas, você usa pelo resto da vida — no celular, no trabalho e em qualquer computador que apareça pela frente. É por isso que essa é a primeira lição de todas: ela é a base de praticamente tudo o que vem depois.

**Este módulo é escrito para quem faz tudo pelo celular**, que é a realidade da maior parte das pessoas que estão começando agora. Onde o computador muda alguma coisa, está avisado no meio do caminho — assim, no dia em que você sentar na frente de um, nada vai ser novidade.

Ao final você vai saber criar uma estrutura de pastas que faz sentido, nomear arquivos de um jeito que o "você do futuro" agradeça, e encontrar qualquer coisa em segundos usando a busca.`,
    ],
    [
      "explicacao",
      "Arquivo, pasta e caminho: o vocabulário mínimo",
      `Antes de organizar, três palavras precisam ficar claras. Elas aparecem o tempo todo no trabalho, e quem não sabe o que significam fica perdido em conversas simples.

**Arquivo** é uma coisa só: um documento, uma foto, uma planilha, um vídeo. Todo arquivo tem um nome e uma **extensão** — as letrinhas depois do ponto, que dizem que tipo de coisa ele é:

- .pdf — documento pronto para leitura e impressão, ninguém edita por acidente
- .docx — documento de texto do Word, esse dá para editar
- .xlsx — planilha do Excel
- .jpg e .png — imagens
- .mp4 — vídeo

**Pasta** é uma caixa que guarda arquivos e outras pastas. Ela não tem conteúdo próprio: serve só para agrupar. Uma pasta dentro de outra é chamada de subpasta, e isso pode se repetir quantas vezes você quiser.

**Caminho** é o endereço completo de um arquivo, ou seja, a sequência de pastas até chegar nele. Quando alguém escreve algo como Documentos > Trabalho > 2024 > contrato.pdf, está te dando um caminho: abra Documentos, dentro dela Trabalho, dentro dela 2024, e lá está o contrato.

Onde tudo isso aparece na tela do celular: o aplicativo que mostra suas pastas costuma se chamar **Arquivos** no Android, ou **Meus Arquivos** nos aparelhos Samsung. Se o seu não tiver nenhum dos dois, o **Google Drive** faz o mesmo papel — e ainda guarda tudo na internet, então seus arquivos continuam existindo mesmo se o aparelho se perder. Nos dois, pasta e caminho funcionam exatamente como descrito aqui.

Duas coisas do celular que confundem no começo:

- Muitos aparelhos **escondem a extensão** e mostram só o ícone do tipo. Aquele quadradinho vermelho escrito PDF é a mesma coisa que ".pdf" no fim do nome.
- O que você baixa não fica solto na tela inicial: vai para uma pasta chamada **Download**, e o que chega pelo WhatsApp vai para pastas do próprio aplicativo. Nenhuma das duas é lugar de morar: são lugares de passagem.

E no computador, quando você tiver acesso a um: o mesmo programa se chama **Explorador de Arquivos** no Windows (o ícone de pastinha na barra de tarefas) e **Finder** no Mac. Muda o nome e o desenho; arquivo, pasta e caminho são os mesmos.`,
    ],
    [
      "explicacao",
      "Dando nomes que o você do futuro vai entender",
      `Essa é a parte que mais faz diferença e a que mais gente ignora. O nome do arquivo é a única pista que você terá daqui a seis meses. Um bom nome responde três perguntas sem você precisar abrir nada: **o que é**, **de quem ou de quê**, e **de quando**.

A receita que funciona em qualquer situação:

- Comece pelo assunto, não por palavras genéricas. contrato-estagio é melhor do que documento-importante.
- Use a data no formato ano-mês-dia: 2024-03-15. Parece estranho no começo, mas é o único formato que faz o aparelho ordenar os arquivos na ordem cronológica certa sozinho. Se você escrever 15-03-2024, ele ordena pelo dia e mistura tudo.
- Troque espaços por hífen: relatorio-mensal-marco.pdf. Espaços dão problema em sistemas antigos e em links.
- Evite acento e caracteres especiais no nome do arquivo (á, ç, ~, /, ?). O conteúdo pode ter acento à vontade; o nome do arquivo, é melhor não.
- Nada de "final", "final2", "final-agora-vai". Se precisa de versão, numere: proposta-v1, proposta-v2, proposta-v3.

Compare os dois lados:

- Ruim: doc final (2).pdf — não diz nada, e daqui a um mês você abre um por um para descobrir qual é.
- Bom: 2024-03-15-comprovante-matricula-senai.pdf — você sabe o que é, de onde é e de quando é sem abrir.

Regra de bolso: se o nome do arquivo não faz sentido lido em voz alta por outra pessoa, ele ainda não está bom.`,
    ],
    [
      "explicacao",
      "Uma estrutura de pastas que não desmonta",
      `Muita gente erra para os dois lados: ou joga tudo solto, ou cria quarenta pastas com uma coisa dentro de cada. O equilíbrio é uma estrutura rasa — poucos níveis, nomes claros.

Um modelo que funciona bem para quem está começando, com quatro pastas grandes:

- **Trabalho** — tudo do emprego ou do programa de aprendiz
- **Estudos** — apostilas, exercícios, certificados de curso
- **Pessoal** — RG, CPF, comprovantes, coisas suas
- **Arquivo morto** — o que você não usa mais, mas não quer apagar

**Onde criar essas pastas no celular.** Você tem dois lugares, e vale usar os dois. No aplicativo **Arquivos**, dentro de "Armazenamento interno" ou "Documentos", ficam as pastas do aparelho. No **Google Drive** — que já vem na maioria dos Androids, é gratuito e só precisa da sua conta do Google — fica a cópia que não depende do celular. Se puder manter só um dos dois em dia, que seja o Drive: o que está lá você abre de qualquer aparelho, inclusive de um computador emprestado.

Dentro de Trabalho e Estudos, o segundo nível pode ser por ano (2024, 2025) ou por projeto e matéria. Só desça para um terceiro nível quando a pasta realmente ficar grande demais. Três níveis já resolvem quase tudo.

**E a pasta Download?** Trate como caixa de entrada, não como armário. Tudo que você baixa cai ali, e é normal. O mesmo vale para o que chega pelo WhatsApp, que fica guardado em pastas do próprio aplicativo. O que não pode é ficar ali para sempre. Uma vez por semana, abra a pasta Download e, para cada arquivo, faça uma de três coisas: renomear e mover para a pasta certa, apagar, ou deixar se ainda for usar hoje. São cinco minutos por semana — cabem numa viagem de ônibus.

**A busca é sua rede de segurança.** Mesmo bem organizado, você vai esquecer onde salvou algo. Tanto no aplicativo Arquivos quanto no Google Drive existe uma **lupa** no alto da tela: toque nela e digite um pedaço do nome. Se lembrar só de "matricula", digite só isso. É por isso que nomes descritivos importam: eles são o que a busca consegue encontrar. (No computador é a mesma ideia: no Windows, aperte a tecla Windows e comece a digitar.)`,
    ],
    [
      "exemplo",
      "Na prática: a primeira semana da Maria Alice",
      `A Maria Alice entrou como jovem aprendiz no setor administrativo. Ela não tem computador em casa: faz tudo pelo celular. Na primeira semana recebeu, por e-mail e WhatsApp, o contrato de aprendizagem em PDF, a apostila de integração, uma planilha de controle de ponto, três fotos do crachá e o comprovante de matrícula do curso técnico. Caiu tudo espalhado — parte na pasta Download, parte nas pastas do WhatsApp, as fotos na galeria.

Na sexta-feira, no ônibus, ela parou dez minutos e fez o seguinte.

**1. Criou a estrutura.** Abriu o **Google Drive**, tocou no botão **+** (Novo), escolheu **Pasta** e criou Trabalho, Estudos e Pessoal. Entrou em Trabalho e criou 2024 do mesmo jeito.

**2. Renomeou cada arquivo.** No aplicativo **Arquivos**, tocou e segurou o dedo em cima do arquivo até ele ficar marcado, tocou nos **três pontinhos** e escolheu **Renomear**:

- contrato assinado.pdf virou 2024-02-05-contrato-aprendizagem-assinado.pdf
- Apostila (1).pdf virou 2024-02-05-apostila-integracao.pdf
- planilha.xlsx virou 2024-02-controle-ponto.xlsx
- IMG_20240206_141233.jpg virou 2024-02-06-cracha-frente.jpg

**3. Mandou cada um para o lugar certo.** Com o arquivo ainda marcado, usou **Mover para** (em alguns aparelhos é **Compartilhar > Salvar no Drive**) e apontou a pasta Trabalho > 2024. O comprovante de matrícula foi para Estudos. As fotos do crachá ela enviou direto da galeria, pelo botão de compartilhar.

**4. Testou.** Fechou tudo, abriu o Drive, tocou na **lupa** e digitou "contrato". O arquivo apareceu na hora.

Duas semanas depois, o RH pediu no WhatsApp: "me manda o contrato assinado". Ela abriu o Drive, buscou, tocou em compartilhar e enviou. Onze segundos. Antes, teria levado dez minutos remexendo na pasta Download — e um pouco de vergonha.

**Se o seu celular for diferente:** os nomes dos botões mudam de aparelho para aparelho — pode ser "Meus Arquivos" no lugar de "Arquivos", "Enviar para" no lugar de "Mover para". O caminho é sempre o mesmo: segurar o dedo no arquivo para marcá-lo, procurar o menu de três pontinhos e escolher renomear ou mover.`,
    ],
    [
      "dica",
      "Erro comum: a pasta que vira depósito",
      `O erro que mais derruba quem começa a se organizar não é criar pastas erradas — é criar uma pasta chamada **Diversos**, **Outros** ou **Vários**.

Parece inofensivo. Você tem um arquivo que não se encaixa em lugar nenhum, cria "Diversos" e joga lá. Na semana seguinte aparece outro caso duvidoso, e vai para lá também. Em três meses, "Diversos" tem duzentos arquivos e é exatamente o caos de onde você estava tentando sair — só que agora com um nome bonito.

Quando um arquivo não se encaixa, escolha uma destas saídas, nunca a terceira:

- Coloque na pasta mais próxima do assunto, mesmo que não seja perfeita. Um comprovante do curso em Estudos está bom o suficiente.
- Se aparecerem três ou mais arquivos do mesmo tipo novo, aí sim crie uma pasta específica para eles.
- Se você não vai precisar dele nunca mais, apague. Guardar tudo "por via das dúvidas" é o que enche a memória do aparelho.

**Outros dois tropeços frequentes:**

Comer a extensão ao renomear. Se o seu celular mostra o final do nome (.pdf, .jpg), mude só a parte antes do ponto. Se apagar o ".pdf" sem querer, o arquivo continua inteiro — o aparelho é que deixa de saber com qual aplicativo abrir. É só renomear de novo e devolver o final.

Confiar numa cópia só. Celular cai no chão, molha, some no busão, e um dia a assistência técnica formata tudo "para resolver". Documento importante merece estar em dois lugares: no aparelho e no **Google Drive** (ou OneDrive). Arquivo que existe em um lugar só é arquivo que você já perdeu, só ainda não sabe. Vale ligar o backup automático do Google Fotos e mandar para o Drive, na hora em que chegar, todo documento que importa.

E tem um bônus: com os documentos no Drive, no dia em que você precisar usar um computador — na escola, na empresa, na casa de alguém — é só entrar na sua conta do Google e está tudo lá.`,
    ],
    [
      "resumo",
      "Recapitulando antes da atividade",
      `Os pontos que valem levar deste módulo:

- **Arquivo** é uma coisa só; **pasta** é a caixa que agrupa; **caminho** é o endereço até chegar lá.
- A **extensão** (.pdf, .docx, .xlsx) diz que tipo de arquivo é. Não mexa nela ao renomear — no celular ela costuma ficar escondida atrás do ícone.
- Um bom nome responde o quê, de quê e de quando: 2024-03-15-comprovante-matricula.pdf.
- Datas sempre no formato **ano-mês-dia**, para o aparelho ordenar sozinho na ordem certa.
- Prefira estrutura **rasa**: poucas pastas grandes, dois ou três níveis, nomes claros.
- **Download é caixa de entrada**, não armário — e o que chega pelo WhatsApp também. Esvazie uma vez por semana.
- A **busca** (a lupa) encontra o que você esqueceu, mas só encontra bem o que tem nome descritivo.
- Nunca crie a pasta "Diversos". E mantenha o que é importante em dois lugares: no aparelho e no Google Drive.

No celular, três gestos resolvem quase tudo: **tocar e segurar** para marcar um arquivo, os **três pontinhos** para abrir o menu (renomear, mover, apagar) e a **lupa** para buscar. No dia em que você usar um computador com Windows, os equivalentes são **F2** para renomear, **Ctrl+X** e **Ctrl+V** para mover e **Ctrl+Z** para desfazer.`,
    ],
  ],

  "Escrevendo um e-mail profissional": [
    [
      "introducao",
      "O e-mail continua sendo a porta de entrada",
      `Você conversa com seus amigos por WhatsApp e áudio. No trabalho, muita coisa ainda acontece por e-mail — e não é por atraso tecnológico. E-mail deixa registro, tem assunto, dá para anexar documento, e qualquer pessoa consegue voltar nele seis meses depois. Empresa, RH, escola técnica, banco, processo seletivo: todos falam por e-mail.

O problema é que ninguém ensina a escrever um. A pessoa abre a caixa de mensagem, olha o campo em branco e trava. "Começo com oi ou com prezado?" "Posso usar emoji?" "É muito curto?" "É muito puxa-saco?" O resultado costuma ser um dos dois extremos: ou um e-mail seco de uma linha, tipo "e aí, quando é o treinamento?", ou um texto enorme e cheio de rodeios que a pessoa lê e não entende o que você quer.

A verdade é que e-mail profissional tem uma fórmula. É a mesma há décadas, cabe em cinco partes, e depois que você aprende dá para escrever qualquer e-mail em três minutos.

Neste módulo você vai montar essa estrutura peça por peça, ver um e-mail completo pronto para copiar e adaptar, e conhecer os deslizes que fazem um e-mail parecer amador mesmo quando o conteúdo está certo.`,
    ],
    [
      "explicacao",
      "Os campos: para, cópia, assunto e anexo",
      `Antes do texto em si, quatro campos aparecem em toda tela de e-mail. Errar neles causa mais problema do que errar uma vírgula.

**Para** — quem precisa responder ou agir. Se são duas pessoas que precisam agir, coloque as duas. Se ninguém precisa agir, provavelmente não era um e-mail.

**Cc (com cópia)** — quem só precisa ficar sabendo, mas não precisa fazer nada. Exemplo típico: você escreve para o supervisor e coloca o RH em cópia, para o RH acompanhar. Todo mundo vê quem está em cópia.

**Cco (cópia oculta)** — igual ao Cc, só que os outros não veem quem está aí. Use pouco, e para um caso específico: mandar o mesmo e-mail para muita gente sem expor o endereço de todo mundo.

**Assunto** — talvez o campo mais importante do e-mail inteiro. É por ele que a pessoa decide se abre agora, depois ou nunca, e é por ele que ela encontra sua mensagem daqui a um mês na busca. Um bom assunto é específico e tem de três a oito palavras:

- Ruim: "oi", "dúvida", "URGENTE!!!", ou assunto em branco
- Bom: "Dúvida sobre o horário do treinamento de sexta"
- Bom: "Envio do comprovante de matrícula — Maria Alice Silva"

**Anexo** — o arquivo que vai junto (aquele que você aprendeu a nomear direito na lição anterior). O nome do anexo aparece para quem recebe, então comprovante-matricula-maria-alice.pdf passa uma impressão bem diferente de documento(3).pdf.`,
    ],
    [
      "explicacao",
      "As cinco partes do corpo do e-mail",
      `Agora o texto. Toda mensagem formal simples cabe nesta sequência, e ela funciona tanto para pedir uma informação quanto para responder uma cobrança.

**1. Saudação.** Uma linha. "Bom dia, Carla," ou "Olá, Carla," resolvem quase tudo. "Prezada Carla," é mais formal e cabe em contato com quem você nunca falou. Se não souber o nome: "Bom dia," ou "Prezados,". Evite "Oi!!" e evite "Querida".

**2. Contexto ou apresentação.** Uma ou duas linhas dizendo quem é você e de onde vem esse assunto — sobretudo se a pessoa não te conhece. "Sou a Maria Alice, jovem aprendiz do setor administrativo desde fevereiro." Se vocês já falam todo dia, pule esta parte.

**3. Motivo da mensagem.** Diga logo por que está escrevendo, na primeira ou segunda frase. Quem lê e-mail no trabalho lê rápido, muitas vezes no celular, entre uma tarefa e outra. Não guarde a informação principal para o final.

**4. Pedido claro.** A parte que mais some nos e-mails de iniciante. Termine com o que você espera da outra pessoa, e quando: "Você poderia me confirmar o horário até quinta-feira?" é um pedido. "Fico no aguardo de um retorno" também serve, mas é mais vago. Se houver prazo, escreva o prazo.

**5. Despedida e assinatura.** "Obrigada desde já," ou "Atenciosamente," seguido do seu nome numa linha. Se for contato externo, acrescente o cargo e um telefone. Três linhas no máximo.

Sobre o tamanho: um e-mail de trabalho bom raramente passa de cinco ou seis linhas. Se o seu está muito maior, provavelmente tem rodeio para cortar — ou o assunto pedia uma conversa, não um e-mail.`,
    ],
    [
      "explicacao",
      "Tom: nem íntimo demais, nem robô",
      `A dúvida mais comum de quem está começando não é a estrutura, é o tom. E dá para acertar sem decorar fórmula antiga.

**Escreva como você falaria com essa pessoa pessoalmente, num corredor, de forma educada.** Nem mais solto do que isso, nem mais duro.

O que puxa o tom para o lado informal demais, e é melhor evitar em e-mail de trabalho:

- Emoji, "rs", "kkk", abreviação de internet (vc, blz, pfv, tbm)
- Ponto de exclamação repetido: "obrigada!!!!"
- Letras maiúsculas em frase inteira — na internet, isso é lido como grito
- Áudio mental transcrito: "então tipo, eu queria saber se por acaso talvez..."

O que puxa para o lado engessado, e também não ajuda:

- "Venho por meio desta solicitar" e outras fórmulas de cartório
- Parágrafos gigantes sem quebra de linha
- Pedir desculpa por existir: "desculpe incomodar, sei que você está muito ocupado, desculpe mesmo..."

Dois hábitos que elevam qualquer e-mail:

**Releia antes de enviar.** Uma leitura de trinta segundos pega erro de digitação, o nome errado e o anexo esquecido. Ler em voz alta baixinho ajuda ainda mais.

**Responda no mesmo assunto.** Quando alguém te escreve, use Responder em vez de criar um e-mail novo. Assim a conversa fica junta e a pessoa não precisa procurar o que foi dito antes. Só troque o assunto se o tema realmente mudou.`,
    ],
    [
      "exemplo",
      "Um e-mail completo, pronto para adaptar",
      `A situação: a Maria Alice foi avisada de um treinamento na sexta, mas não sabe o horário nem se é presencial. Ela precisa saber para se organizar com o transporte.

**Como ela escreveu antes deste módulo:**

"oi, boa noite, é sobre o treinamento, qria saber que horas é pq preciso ver o ônibus, obrigada!!"

Assunto: dúvida

**Como ela escreveu depois:**

Assunto: Dúvida sobre o horário do treinamento de sexta (05/04)

Bom dia, Carla,

Sou a Maria Alice, jovem aprendiz do setor administrativo. Recebi o aviso do treinamento de sexta-feira, dia 05/04, mas não localizei o horário nem se será presencial ou online.

Você poderia me confirmar essas duas informações até quinta-feira? Preciso organizar o horário do transporte com antecedência.

Obrigada desde já,
Maria Alice Silva
Jovem aprendiz — Setor administrativo

Repare no que mudou. O assunto agora diz o que é e dá a data. A primeira frase apresenta quem escreve. A segunda diz exatamente o que falta. O pedido tem prazo e um motivo curto e razoável. A despedida tem nome e cargo. E some tudo o que não era necessário — nada de desculpas, nada de exclamação tripla.

Mesmo tamanho de leitura, resultado completamente diferente: o segundo e-mail é respondido no mesmo dia; o primeiro fica esperando alguém ter paciência para decifrar.`,
    ],
    [
      "dica",
      "Erro comum: o anexo que ficou para trás",
      `O tropeço mais universal do e-mail: escrever "segue em anexo o comprovante", clicar em enviar e... não anexar nada. Acontece com estagiário e com diretor.

O jeito de nunca mais passar por isso: **anexe o arquivo primeiro, escreva o texto depois.** Inverta a ordem e o problema desaparece. Alguns serviços, como o Gmail, avisam quando você escreve a palavra "anexo" e não anexou nada — mas não conte com isso.

Outros três deslizes que valem conhecer:

**Responder a todos sem querer.** Existem dois botões: Responder (volta só para quem escreveu) e Responder a todos (vai para todo mundo que estava na mensagem). Se sua resposta interessa a uma pessoa só, use Responder. Mandar "ok, obrigada" para catorze pessoas é o tipo de coisa que incomoda no trabalho.

**Escrever com raiva.** Se o e-mail te irritou, escreva a resposta, salve como rascunho e volte nela depois do almoço. E-mail é registro permanente: fica na caixa da outra pessoa e pode ser encaminhado para qualquer um. O que você escreve com raiva às duas da tarde pode ser lido pelo RH na semana seguinte.

**Endereço de e-mail informal.** Se o seu e-mail pessoal é algo como gatinha_do_role@..., crie um endereço separado só para trabalho e estudo. O formato seguro é nome.sobrenome@ ou uma variação com número, se o seu nome já estiver em uso. É gratuito e leva três minutos.

**Prazo de resposta.** Num ambiente de trabalho, o combinado tácito é responder em até 24 horas úteis, mesmo que seja para dizer "recebi, vou verificar e te retorno amanhã". Silêncio preocupa mais do que uma resposta parcial.`,
    ],
    [
      "resumo",
      "Recapitulando antes da atividade",
      `O que levar deste módulo:

- **Para** é quem age; **Cc** é quem só acompanha; **Cco** esconde a lista de destinatários.
- O **assunto** decide se seu e-mail é aberto e se é encontrado depois. Específico, de três a oito palavras.
- O corpo tem cinco partes: **saudação, contexto, motivo, pedido claro e despedida**.
- Diga o motivo já na primeira ou segunda frase. Não guarde o principal para o fim.
- Todo e-mail que espera algo precisa de um **pedido explícito**, de preferência com prazo.
- Tom: como você falaria com a pessoa pessoalmente, de forma educada. Sem emoji, sem abreviação de internet, sem fórmula de cartório.
- **Anexe primeiro, escreva depois** — assim o anexo nunca fica para trás.
- Use **Responder** em vez de criar e-mail novo, para a conversa ficar junta.
- E-mail é registro permanente. Escreveu com raiva? Salve como rascunho e releia depois.

Um endereço profissional (nome.sobrenome@) e uma releitura de trinta segundos antes de enviar já colocam você à frente de muita gente.`,
    ],
  ],

  "Introdução a planilhas": [
    [
      "introducao",
      "A ferramenta mais subestimada do escritório",
      `Planilha assusta. É uma tela cheia de quadradinhos cinza, com letras em cima e números do lado, e a sensação imediata é de que aquilo é coisa de contador. Muita gente que domina o celular inteiro trava na primeira planilha.

Mas repare no que a planilha realmente é: uma tabela que sabe fazer conta sozinha. Só isso. E é justamente por isso que ela está em todo lugar — controle de ponto, lista de presença, estoque, gastos do mês, cronograma de tarefas, notas de curso. Em praticamente todo primeiro emprego administrativo alguém vai te mandar uma planilha e dizer "dá uma olhada aí".

O ponto que muda tudo: **você não precisa saber fórmula avançada.** Quem usa planilha no dia a dia usa umas cinco coisas, e o resto vai aprendendo quando precisa. Somar uma coluna, ordenar uma lista, filtrar o que interessa: com isso você já resolve a maior parte do que aparece.

Neste módulo você vai entender o vocabulário da planilha, escrever sua primeira fórmula, montar uma lista organizada do jeito que a planilha entende, e conhecer os erros que fazem uma planilha parar de funcionar do nada.

Onde praticar de graça: **Google Planilhas** (basta ter uma conta Google, funciona no navegador e no celular) ou **Excel Online**. Não precisa comprar nada.`,
    ],
    [
      "explicacao",
      "Célula, linha, coluna e endereço",
      `A tela da planilha é uma grade. Cada quadradinho dela é uma **célula** — é onde você digita uma informação. Uma informação por célula, sempre.

As **colunas** são as faixas verticais, identificadas por letras no topo: A, B, C, D... As **linhas** são as faixas horizontais, identificadas por números na lateral: 1, 2, 3, 4...

Juntando os dois você tem o **endereço** da célula, sempre no formato letra + número:

- A1 é a célula da coluna A, linha 1 — o canto superior esquerdo
- C5 é a célula da coluna C, linha 5
- B2:B10 é um **intervalo**: da célula B2 até a B10, tudo o que estiver entre elas

Esse endereço é o coração da planilha. É assim que você diz para ela "some tudo o que está de B2 até B10" sem precisar digitar os valores de novo. E é assim que colegas conversam: "o total está em D12".

Três detalhes práticos que evitam confusão logo no começo. No celular, quem faz tudo isso é o aplicativo do **Google Planilhas**, que é gratuito:

**Selecionar.** Um toque na célula seleciona ela. Para pegar um intervalo, toque numa célula e arraste a **bolinha azul** do canto até a última que você quer. Um toque na letra da coluna seleciona a coluna inteira.

**Editar.** Toque duas vezes na célula para abrir o teclado e corrigir sem apagar tudo. O conteúdo também aparece na **barra de fórmulas**, acima da planilha, e dá para editar por lá — em tela pequena, costuma ser mais fácil.

**Desfazer.** A **seta curva para a esquerda**, no alto da tela, volta atrás na última coisa que você fez. Você vai usar bastante.

No computador é a mesma lógica, com teclado: dois cliques (ou F2) editam a célula, Enter desce uma linha, Tab anda uma para a direita, as setas movem em qualquer direção e Ctrl+Z desfaz.`,
    ],
    [
      "explicacao",
      "Sua primeira fórmula: o sinal de igual",
      `Aqui está a única regra mágica da planilha: **toda fórmula começa com o sinal de igual (=)**. É esse sinal que avisa "o que vem a seguir não é texto, é conta — calcule para mim".

Se você digitar 2+2 numa célula, ela mostra o texto "2+2". Se digitar =2+2, ela mostra 4. A diferença é o sinal.

E a força de verdade aparece quando, em vez de números, você usa **endereços de células**:

- =A1+A2 soma o que estiver nas duas células
- =B5*3 multiplica por três o valor de B5
- =D10-D11 subtrai

A vantagem: se você mudar o valor em A1, o resultado se atualiza sozinho, na hora. A planilha refaz a conta a cada mudança. Isso é o que a diferencia de uma tabela no papel.

**A fórmula que você mais vai usar: SOMA.** Para somar uma coluna inteira de números:

=SOMA(B2:B10)

Leia assim: some tudo que está de B2 até B10. Se depois você acrescentar um valor em B7, o total já muda sozinho.

Outras três que resolvem o dia a dia:

- =MÉDIA(B2:B10) — a média dos valores
- =MÁXIMO(B2:B10) — o maior valor do intervalo
- =CONT.VALORES(B2:B10) — quantas células têm algo escrito (bom para contar itens de uma lista)

Um atalho que vale ouro: selecione a célula logo abaixo de uma coluna de números e toque no botão de somatório (o símbolo Σ, na barra de ferramentas). A planilha escreve a fórmula de SOMA sozinha, já com o intervalo certo.

**Copiando fórmula para o lado.** Toque na célula com a fórmula, segure o quadradinho do canto inferior direito e arraste. A planilha ajusta os endereços automaticamente: se em C2 estava =A2*B2, ao arrastar para C3 ela vira =A3*B3. É assim que se preenche uma coluna inteira em dois segundos.`,
    ],
    [
      "explicacao",
      "Montando uma lista que a planilha entende",
      `Fórmula é metade da história. A outra metade é organizar os dados de um jeito que a planilha consiga trabalhar. Existe um formato que ela espera, e seguir ele libera recursos poderosos de graça.

**As três regras do formato de lista:**

**1. A primeira linha é o cabeçalho.** Uma linha só, no topo, com o nome de cada coluna: Data, Descrição, Categoria, Valor. Deixe em negrito para separar visualmente.

**2. Cada linha é um registro completo.** Uma linha por gasto, por pessoa, por item — nunca duas informações do mesmo tipo empilhadas na mesma célula.

**3. Cada coluna guarda um tipo só de informação.** Data numa coluna, valor em outra, descrição em outra. Não escreva "15/03 - almoço - 18 reais" tudo numa célula: separado em três colunas, a planilha consegue somar, ordenar e filtrar; junto, ela vê só texto.

Com a lista nesse formato, três recursos passam a funcionar:

**Ordenar.** Selecione a área da tabela, vá em Dados > Classificar intervalo, e escolha a coluna. Sua lista se reorganiza por data, por valor ou em ordem alfabética.

**Filtrar.** Em Dados > Criar filtro, aparecem setinhas no cabeçalho. Tocando nelas você mostra só as linhas que interessam — só a categoria "transporte", só o mês de março. Os outros dados continuam lá, apenas escondidos.

**Congelar o cabeçalho.** Em Exibir > Congelar > 1 linha, o cabeçalho fica fixo enquanto você rola a lista para baixo. Numa lista longa, isso resolve o problema de esquecer qual coluna é qual.

Um toque final de apresentação: selecione a coluna de dinheiro e toque no botão de formato de moeda. A planilha passa a exibir R$ 18,00 em vez de 18 — sem mudar o número que ela usa nas contas.`,
    ],
    [
      "exemplo",
      "Na prática: o controle de gastos da semana",
      `A Maria Alice quer descobrir para onde está indo o vale-transporte e o dinheiro do lanche. Ela abriu o Google Planilhas no celular e montou isto em dez minutos.

**Linha 1 (cabeçalho):** A1 = Data, B1 = Descrição, C1 = Categoria, D1 = Valor

**Linhas 2 a 6 (os registros):**

- 04/03 | Passagem ida e volta | Transporte | 9,20
- 04/03 | Salgado e suco | Alimentação | 12,00
- 05/03 | Passagem ida e volta | Transporte | 9,20
- 06/03 | Caderno para o curso | Estudos | 14,50
- 06/03 | Passagem ida e volta | Transporte | 9,20

**Linha 8 (o total):** em C8 ela escreveu Total da semana, e em D8 escreveu:

=SOMA(D2:D6)

A planilha respondeu 54,10 na hora.

Na sexta ela lembrou de mais um gasto e inseriu uma linha nova. Aqui está o detalhe que importa: como a linha nova entrou **dentro** do intervalo D2:D6, a fórmula se ajustou sozinha para D2:D7 e o total atualizou sem ela mexer em nada.

Depois ela criou o filtro (Dados > Criar filtro), tocou na setinha da coluna Categoria e deixou marcado só "Transporte". O total visível mostrou 27,60 — e ficou claro na hora que transporte era metade de tudo. Com essa informação ela pediu ajuda ao RH sobre o vale-transporte.

Repare que ela não usou nada além de: cabeçalho, uma coluna por tipo de informação, uma fórmula de SOMA e um filtro. Isso é planilha suficiente para muito trabalho de verdade.`,
    ],
    [
      "dica",
      "Erro comum: número que a planilha lê como texto",
      `Você monta a tabela, escreve =SOMA(D2:D10) e o resultado vem zero, ou vem menor do que deveria. A planilha não está com defeito: ela não reconheceu alguns valores como número.

Isso acontece quando a célula tem, junto do número, alguma coisa que a planilha lê como texto:

- Você digitou "18 reais" ou "R$ 18" na mão, em vez de digitar 18 e aplicar o formato de moeda
- Ficou um espaço antes ou depois do número (comum ao colar de outro lugar)
- Você usou ponto onde a planilha espera vírgula. Em português, a vírgula separa os centavos: 18,50. Se você digitar 18.50 numa planilha configurada em português, ela pode interpretar como data ou como texto.

**Como identificar rápido:** por padrão, a planilha alinha número à direita e texto à esquerda. Se um valor numa coluna de valores aparece encostado na esquerda, ele está sendo tratado como texto. Corrija digitando o número puro e depois formatando a coluna como moeda.

**Outros três tropeços clássicos:**

**Célula mesclada.** Aquele botão que junta várias células numa só deixa a planilha bonita e quebra ordenação e filtro. Use só em título, nunca dentro da área de dados.

**Linha em branco no meio da tabela.** Muitos recursos entendem a linha vazia como "acabou a tabela aqui" e ignoram tudo abaixo dela. Mantenha a lista contínua.

**Não salvar.** No Google Planilhas isso não é problema, nem no celular nem no computador: ele salva sozinho a cada mudança, e é por isso que ele é a melhor porta de entrada. Só no Excel instalado num computador é preciso salvar na mão, com Ctrl+S, conferindo a pasta onde o arquivo está indo.

E o mais importante para quem está começando: **experimentar não quebra nada.** A seta de desfazer volta qualquer coisa (Ctrl+Z, no computador), e no Google Planilhas o menu Arquivo > Histórico de versões traz a planilha de volta para como ela estava ontem. Pode mexer sem medo.`,
    ],
    [
      "resumo",
      "Recapitulando antes da atividade",
      `O essencial deste módulo:

- **Célula** é cada quadradinho; **coluna** é vertical (letras); **linha** é horizontal (números).
- O **endereço** junta os dois: A1, C5. Um **intervalo** usa dois pontos: B2:B10.
- **Toda fórmula começa com =.** Sem o sinal de igual, a planilha entende texto.
- A fórmula que mais aparece: **=SOMA(B2:B10)**. Também valem MÉDIA, MÁXIMO e CONT.VALORES.
- Usar endereços em vez de números faz a conta se **atualizar sozinha** quando os dados mudam.
- Arrastar o quadradinho do canto **copia a fórmula** ajustando os endereços.
- Formato de lista: **cabeçalho na linha 1**, uma linha por registro, um tipo de informação por coluna.
- Nesse formato você ganha **ordenar, filtrar e congelar o cabeçalho** de graça.
- Soma deu zero? Provavelmente algum valor está como **texto** — número puro alinha à direita.
- Evite **célula mesclada** e **linha em branco** dentro da tabela.

E lembre: a seta de desfazer volta atrás (Ctrl+Z, no computador), e o histórico de versões traz a planilha de volta. Dá para experimentar sem medo de estragar.`,
    ],
  ],

  // ===============================================================
  // Trilha 2 — Ferramentas de IA no Dia a Dia
  // ===============================================================
  "O que é inteligência artificial (sem enrolação)": [
    [
      "introducao",
      "Tirando o mistério da frente",
      `"Inteligência artificial" é um nome grande demais para o que a coisa realmente é, e esse nome atrapalha. Ele faz pensar em robô de filme, em computador que pensa, em algo que só gente de faculdade de exatas entende. Aí a pessoa conclui que aquilo não é para ela e nem tenta.

Só que a IA já está na sua mão há anos. Quando o celular sugere a próxima palavra que você ia digitar, quando o aplicativo de música monta uma playlist com a sua cara, quando o banco bloqueia uma compra estranha no seu cartão, quando o mapa recalcula a rota por causa do trânsito — é tudo IA. Você já usa. Só não chamava assim.

O que mudou de uns anos para cá foi o surgimento de ferramentas de IA com as quais você **conversa em português comum**, como o ChatGPT, o Gemini e o Claude. Antes, para usar IA era preciso programar. Agora basta escrever o que você quer, como escreveria para uma pessoa. Isso é o que colocou a IA ao alcance de quem nunca escreveu uma linha de código.

Neste módulo você vai entender, sem termo técnico, o que essas ferramentas realmente fazem por baixo, onde elas ajudam de verdade e — a parte que quase ninguém conta — em que situações elas erram com uma confiança perigosa.`,
    ],
    [
      "explicacao",
      "O que a IA realmente faz por baixo",
      `Vamos ao ponto, sem matemática.

Imagine alguém que leu uma quantidade absurda de texto: livros, sites, manuais, conversas, notícias, receitas. Não decorou nada palavra por palavra — mas, de tanto ler, ficou muito bom em perceber **padrões**. Sabe que depois de "bom" costuma vir "dia", que uma receita começa com ingredientes, que um e-mail formal tem certa cara, que perguntas sobre planilha costumam ser respondidas de certo jeito.

É basicamente isso que uma IA de conversa faz. Ela foi **treinada** com uma montanha de texto e aprendeu padrões de como as palavras se combinam. Quando você escreve um pedido, ela vai montando a resposta pedaço por pedaço, escolhendo a cada passo o que faz mais sentido vir a seguir, com base em tudo o que viu no treino.

Duas consequências importantes disso, e elas explicam quase tudo:

**Ela é muito boa em coisas de linguagem.** Resumir, reescrever, explicar de outro jeito, traduzir, organizar ideias soltas, sugerir um começo de texto, corrigir português. É o terreno natural dela.

**Ela não "sabe" as coisas do jeito que uma pessoa sabe.** Ela não tem certeza nem dúvida; ela tem padrão. Por isso, quando não tem uma boa base sobre algo, ela não diz "não sei" — ela completa com o que **parece** certo. E parece muito bem.

Duas palavras que você vai ouvir e agora não precisam assustar: **modelo** é o programa treinado em si; **prompt** é simplesmente o pedido que você escreve. Ponto final, sem mistério.`,
    ],
    [
      "explicacao",
      "Onde ela ajuda de verdade no seu dia",
      `Deixando o conceito de lado, o que dá para fazer hoje, de graça, pelo celular. Estes são os usos que mais resolvem para quem está começando a vida profissional:

**Entender algo difícil.** Cole um texto complicado — um trecho de contrato, uma apostila, um e-mail cheio de jargão — e peça: "explique isso em palavras simples, como se eu nunca tivesse visto o assunto". Essa é provavelmente a melhor coisa que a IA faz por quem está começando.

**Destravar o começo de um texto.** Aquela paralisia diante da tela em branco. Peça um rascunho, e depois corrija com as suas palavras. Sair de "não sei como começar" para "tenho algo para melhorar" é metade do trabalho.

**Revisar antes de enviar.** "Revise este e-mail: corrija o português e me diga se o pedido está claro." Ela devolve o texto corrigido e aponta o que ficou vago.

**Preparar-se para uma situação.** "Vou ter uma entrevista para jovem aprendiz numa empresa de logística. Que perguntas costumam fazer?" Depois: "me faça essas perguntas uma por vez e comente minhas respostas".

**Traduzir e comparar.** Do inglês para o português e vice-versa, com a vantagem de você poder perguntar por que uma palavra foi escolhida.

**Organizar o que está bagunçado.** Jogue lá suas anotações soltas de reunião e peça uma lista de tarefas com responsáveis e prazos.

Duas coisas que ela **não** é: não é buscador — para saber o horário de um posto de saúde hoje, use o site oficial; e não é conselheiro médico, jurídico ou financeiro. Ela ajuda a entender um assunto; a decisão continua sendo de gente qualificada.`,
    ],
    [
      "explicacao",
      "O que ela não é, e onde ela erra",
      `Esta é a parte que separa quem usa IA bem de quem se dá mal com ela. Prestar atenção aqui vale mais do que qualquer truque.

**Ela pode errar com toda a confiança do mundo.** Existe até um nome para isso: **alucinação**. A IA inventa um dado, um nome de lei, um número, uma citação, uma referência — e escreve com a mesma segurança com que escreve o que está certo. Não há tom de voz diferente para o que ela inventou. Por isso: **todo número, nome, data ou regra que for usado para valer precisa ser conferido na fonte oficial.**

**Ela não sabe o que aconteceu depois do treino dela.** Cada modelo foi treinado até certo momento. Notícia de ontem, mudança recente em uma regra, preço atual: pode estar desatualizado. Algumas ferramentas hoje consultam a internet, e nesse caso costumam mostrar os links — confira os links.

**Ela não conhece a sua situação.** Ela não sabe as regras da sua empresa, o combinado do seu setor, o contexto do seu supervisor. Ela responde com o caso geral. Você é quem sabe se aquilo se aplica.

**Ela não pensa nem sente.** Escreve "entendo como você se sente" porque esse é o padrão em textos parecidos, não porque sentiu algo. Isso não a torna inútil — só significa que a companhia dela não substitui gente.

**Cuidado com o que você digita nela.** Não coloque dado sensível: CPF, senha, dados de cliente, informação confidencial da empresa. Muitas ferramentas guardam as conversas. A regra prática: se você não escreveria num grupo de WhatsApp do trabalho, não escreva na IA.

**Usar não é o mesmo que entregar.** No trabalho e no curso, use a IA para entender e rascunhar. O que sai com o seu nome tem que ser revisado e entendido por você — porque a responsabilidade pelo resultado é sua, e porque numa reunião vão te perguntar sobre ele.`,
    ],
    [
      "exemplo",
      "Na prática: a mesma pergunta, dois resultados",
      `A Maria Alice recebeu um e-mail do RH com este trecho: "a compensação de horas deverá observar o limite do banco de horas previsto em acordo coletivo, vedada a cumulação superior ao interstício legal". Ela leu três vezes e não entendeu.

**Primeira tentativa dela na IA:**

Pedido: "o que significa isso?" — colando o trecho.

Resposta: um parágrafo tão técnico quanto o original, cheio de "interstício" e "acordo coletivo". Ela continuou sem entender e quase desistiu.

**Segunda tentativa, depois de aprender a pedir melhor:**

Pedido: "Explique o trecho abaixo em português bem simples, como se eu tivesse 15 anos e nunca tivesse lido nada de trabalhista. Depois me diga, em uma frase, o que isso muda na prática para uma jovem aprendiz. Trecho: ..."

Resposta: uma explicação clara de que banco de horas é um acerto entre horas extras e folgas, que existe um teto de horas acumuladas e um prazo para usar, e a frase final: "na prática, você não pode juntar horas indefinidamente — precisa compensar dentro do prazo combinado".

**O que ela fez em seguida, e é a parte mais importante:** levou a dúvida ao RH. "Entendi que existe um prazo para compensar as horas. Qual é o prazo aqui na empresa?"

Repare no papel que a IA teve. Ela não decidiu nada e não substituiu o RH. Ela transformou um texto intimidador em algo compreensível, e com isso a Maria Alice conseguiu fazer uma pergunta específica em vez de ficar calada por não saber nem o que perguntar. Esse é o uso mais valioso da ferramenta.`,
    ],
    [
      "dica",
      "Erro comum: aceitar a primeira resposta como verdade",
      `O tropeço número um de quem começa: fazer uma pergunta, receber um texto bonito e bem escrito, e tratar aquilo como resposta final. Texto bem escrito engana — a IA escreve com a mesma elegância quando está certa e quando está inventando.

Três hábitos que resolvem quase todo o risco:

**Peça a fonte, e vá até ela.** "De onde vem essa informação? Tem link oficial?" Se ela não conseguir apontar uma fonte, trate o dado como suspeita, não como fato. E quando ela der um link, abra o link.

**Desconfie de tudo que for específico demais.** Número exato, artigo de lei, data, nome de pessoa, valor de multa, estatística. É exatamente aí que a alucinação se concentra. Assunto geral ela acerta muito; detalhe pontual é onde escorrega.

**Peça de novo, diferente.** Se a resposta ficou confusa, não desista nem aceite: "não entendi essa parte, explique com um exemplo do dia a dia" ou "me dê essa resposta em cinco tópicos curtos". Conversar é o método, não uma segunda chance.

**E dois cuidados de convivência:**

Não cole resposta de IA e mande como sua num trabalho ou tarefa sem entender o conteúdo. Além da questão de honestidade, é constrangedor: alguém pergunta um detalhe e você não sabe responder sobre o texto que assinou.

Cuidado com o efeito "muleta". Usar IA para entender é ótimo; usar IA para nunca precisar entender atrofia justamente o que faria você crescer no trabalho. A pergunta certa é: depois desta conversa, eu sei mais do que sabia antes? Se a resposta for não, você usou como atalho, não como ferramenta de aprendizado.`,
    ],
    [
      "resumo",
      "Recapitulando antes da atividade",
      `O que levar deste módulo:

- IA não é robô que pensa. É um programa **treinado com muito texto** que aprendeu padrões de linguagem.
- Você já usava IA antes de saber o nome: teclado que sugere palavra, playlist, mapa, antifraude do banco.
- **Prompt** é só o nome do pedido que você escreve. **Modelo** é o programa treinado.
- Ela é excelente em **linguagem**: resumir, explicar de outro jeito, revisar, traduzir, organizar.
- Ela **não sabe** como uma pessoa sabe — quando falta base, ela completa com o que parece certo.
- **Alucinação**: inventar informação com toda a confiança. Confira número, nome, data e regra na fonte oficial.
- Ela não conhece o contexto da sua empresa nem o que aconteceu depois do treino dela.
- **Não coloque dado sensível** — CPF, senha, informação de cliente. Se não mandaria no grupo do trabalho, não mande para a IA.
- Usar IA para **entender e rascunhar** é ótimo. O que sai com o seu nome, você revisa e entende.

E a mensagem central: IA é ferramenta, como planilha ou e-mail. Não é coisa de outro mundo, e você não precisa de nenhuma formação prévia para começar a usar hoje.`,
    ],
  ],

  "Usando IA para resumir e estudar": [
    [
      "introducao",
      "Quando o material é grande e o tempo é curto",
      `A rotina de quem é jovem aprendiz é apertada: trabalho durante o dia, curso à noite ou aos sábados, transporte no meio, e ainda a apostila que ninguém tem fôlego para ler inteira. É nesse aperto que a maior parte das pessoas desiste de estudar direito — não por falta de vontade, mas por falta de tempo e de método.

Aqui a IA muda o jogo de forma concreta. Ela não estuda por você (isso não existe), mas resolve dois problemas que custam muito tempo: **transformar material longo em algo que cabe no seu tempo** e **explicar o que ficou confuso, quantas vezes você precisar, sem que ninguém perca a paciência**.

Esse segundo ponto merece um destaque. Muita gente não tira dúvida por vergonha — de perguntar de novo, de parecer que não acompanhou, de tomar o tempo do outro. Com a IA você pode pedir a mesma explicação cinco vezes, de cinco jeitos diferentes, às onze da noite, sem julgamento nenhum. Para quem tem medo de "não entender", isso vale muito.

Neste módulo você vai aprender a pedir um resumo que realmente serve, a fazer a IA explicar no seu nível, e a usá-la como parceira de estudo — inclusive fazendo ela te dar prova antes da prova de verdade.`,
    ],
    [
      "explicacao",
      "Resumir de um jeito que sirva para estudar",
      `Pedir "resuma isso" funciona, mas devolve o resumo genérico. Um resumo bom para estudar precisa de duas informações que só você tem: **para que serve** e **em que formato**.

O esqueleto do pedido:

- Cole ou anexe o texto
- Diga para que você vai usar: prova, reunião, entender um contrato
- Peça um formato específico: tópicos, número de linhas, tabela
- Diga o seu nível de partida: "nunca estudei isso antes"

Compare os resultados:

- Genérico: "resuma esse texto"
- Útil: "Resuma o texto abaixo em 8 tópicos curtos, para eu revisar antes de uma prova. Nunca estudei esse assunto antes, então explique os termos técnicos que aparecerem."

**Variações de resumo que resolvem situações diferentes:**

**Resumo em camadas.** "Me dê primeiro um resumo de três linhas. Depois, um resumo de uma página." A camada curta te dá o mapa; a longa você lê já sabendo onde está pisando.

**Só o que importa para a prova.** "Que pontos deste material têm mais chance de cair numa prova? Liste em ordem de importância."

**Glossário.** "Liste os termos técnicos que aparecem neste texto com uma explicação de uma linha para cada." Excelente para apostila de área nova.

**Comparação.** Se o material contrasta conceitos, peça uma tabela: "monte uma tabela comparando X e Y, com as colunas: o que é, quando usar, exemplo".

Um cuidado prático: se o texto é muito longo, mande em pedaços e peça o resumo de cada parte, e só no fim um resumo dos resumos. Material grande de uma vez costuma sair superficial.

E a regra que fecha tudo: **resumo é para orientar a leitura, não para substituí-la.** Leia o resumo, depois vá ao material original nas partes que importam. Quem só decora resumo trava na primeira pergunta que sai do roteiro.`,
    ],
    [
      "explicacao",
      "Fazendo a IA explicar no seu nível",
      `Esta é a habilidade que mais rende. A IA consegue explicar o mesmo assunto de dez formas diferentes — mas só faz isso se você pedir. Frases que você pode usar hoje, do jeito que estão:

**Para descer o nível:** "explique como se eu tivesse 12 anos"; "explique sem nenhum termo técnico"; "explique em três frases curtas".

**Para usar analogia:** "explique isso usando uma comparação com algo do dia a dia". Analogia é o atalho mais rápido entre não entender e entender.

**Para pedir exemplo:** "me dê dois exemplos concretos disso acontecendo no trabalho de um escritório". Conceito abstrato fica no ar; exemplo gruda.

**Para atacar um ponto específico:** não diga "não entendi". Diga "entendi até a parte de X, mas travei quando você falou de Y". Quanto mais preciso o ponto, melhor a explicação.

**Para ir do zero ao aplicável:** "me ensine isso em três níveis: primeiro a ideia básica, depois como funciona, depois como eu usaria no trabalho".

**A técnica mais poderosa de todas: explicar de volta.** Depois de achar que entendeu, escreva com suas palavras e peça correção:

"Deixa eu ver se entendi: banco de horas é quando as horas extras viram folga em vez de dinheiro, e existe um prazo para usar. Está certo? O que eu errei ou deixei de fora?"

Isso se chama aprender ensinando, e é uma das formas mais eficientes que existem. Você descobre na hora exatamente onde seu entendimento está furado — e essa é uma informação que resumo nenhum te dá.`,
    ],
    [
      "explicacao",
      "A IA como parceira de estudo antes da prova",
      `Resumir é o começo. O salto de qualidade é usar a IA na fase ativa do estudo, aquela em que você testa o que sabe em vez de reler o mesmo texto.

**Peça um simulado.** "Com base no material abaixo, me faça 10 perguntas de múltipla escolha, uma por vez. Espere minha resposta antes de mandar a próxima e explique por que a resposta certa é certa." O detalhe "uma por vez" muda tudo: vira conversa, não lista.

**Peça perguntas abertas.** "Me faça 5 perguntas dissertativas sobre este conteúdo e depois comente minhas respostas apontando o que faltou."

**Peça flashcards.** "Transforme este material em 15 pares de pergunta e resposta curtas, para eu revisar no ônibus."

**Peça um plano de estudo realista.** "Tenho a prova em 5 dias e consigo estudar 40 minutos por noite. Monte um plano dividindo este material nesses dias, deixando o último dia para revisão."

**Peça o resumo do erro.** Depois do simulado: "que assuntos eu errei mais? O que eu deveria revisar primeiro?"

Uma técnica que vale conhecer: **teste antes de estudar.** Peça as perguntas do simulado *antes* de ler o material. Você vai errar quase tudo — e é esse o ponto. Errar primeiro faz o cérebro prestar muito mais atenção quando a resposta certa aparece na leitura. Parece contraintuitivo e funciona.

E o ritual que fecha o ciclo, cinco minutos por sessão: no fim do estudo, escreva de memória o que ficou, sem olhar o material, e mande para a IA conferir. É a diferença entre "eu li" e "eu sei".`,
    ],
    [
      "exemplo",
      "Na prática: cinco dias para a prova de logística",
      `A Maria Alice tem prova do curso técnico na segunda. É sexta à noite, ela chegou às 20h e tem uma apostila de 40 páginas sobre gestão de estoque. Consegue estudar 40 minutos por dia. Foi assim:

**Sexta (40 min).** Fotografou as páginas e mandou em três blocos, pedindo para cada um: "Resuma em 6 tópicos curtos, explicando os termos técnicos. É para uma prova de curso técnico e eu nunca estudei estoque." Depois: "junte os três resumos em um só, sem repetir nada". Resultado: uma página que ela conseguiu ler no ônibus.

**Sábado (40 min).** Antes de reler qualquer coisa, pediu: "com base neste resumo, me faça 10 perguntas de múltipla escolha, uma por vez, e explique cada resposta". Acertou 4 de 10. Em vez de desanimar, tinha agora um mapa exato do que não sabia — curva ABC e giro de estoque.

**Domingo de manhã (40 min).** Só os dois pontos fracos: "explique curva ABC como se eu tivesse 12 anos, com um exemplo de uma loja de material de construção". Depois testou o entendimento explicando de volta: "então curva ABC é separar os produtos em três grupos por importância de valor, e o grupo A é o que merece mais atenção. Está certo?" A IA corrigiu um detalhe que ela tinha invertido — e foi justamente esse detalhe que caiu na prova.

**Domingo à noite (20 min).** Novo simulado, agora com 12 perguntas. Acertou 10.

**Segunda, no ônibus (15 min).** Só os flashcards que tinha pedido no sábado.

Duas horas e meia bem distribuídas, em vez de uma virada de noite lendo 40 páginas no domingo. E o mais importante: ela chegou sabendo o que sabia — o que, para quem tem medo de não entender, vale tanto quanto a nota.`,
    ],
    [
      "dica",
      "Erro comum: confundir ler resumo com estudar",
      `A armadilha mais comum: pedir o resumo, achar o texto claro, sentir aquela sensação boa de "entendi tudo" e parar por aí. Aí a prova chega e o conteúdo não está lá.

O que aconteceu: você reconheceu o assunto, não aprendeu o assunto. Reconhecer é fácil e dá uma falsa sensação de domínio. Aprender exige **tentar lembrar sem olhar** — e é a parte que dá trabalho, então é a que a gente pula.

O antídoto é simples: **nunca termine uma sessão de estudo lendo. Termine testando.** Um simulado curto, um "explique de volta", um resumo escrito de memória. Cinco minutos de teste valem mais que trinta de releitura.

**Outros quatro tropeços frequentes:**

**Confiar em resumo de material técnico sem conferir.** Se a apostila tem números, prazos, fórmulas ou nomes de norma, confira no original. É exatamente onde a IA alucina com mais frequência.

**Deixar tudo para a véspera e mandar 40 páginas de uma vez.** O resumo sai raso, e você não tem mais tempo para testar. Material grande, sempre em pedaços.

**Colar resposta de IA num trabalho sem entender.** Além da questão de honestidade acadêmica, se o professor pergunta um detalhe você fica sem resposta sobre um texto que assinou.

**Estudar sem contexto.** Se você não disser à IA o que é a prova, de que curso, e o seu nível, ela devolve o resumo médio da internet — e não o que serve para você.

E um lembrete que importa mais do que parece: **a IA não substitui perguntar ao professor ou ao colega.** Ela é ótima para você chegar na aula com uma pergunta boa, específica, em vez de um "não entendi nada". Quem faz pergunta específica é quem parece mais preparado — não menos.`,
    ],
    [
      "resumo",
      "Recapitulando antes da atividade",
      `O que levar deste módulo:

- Um bom pedido de resumo diz **para que serve**, **em que formato** e **qual é o seu nível**.
- Resumo em **camadas** (3 linhas, depois uma página) ajuda a ler o material já com o mapa na cabeça.
- Material longo: mande em **pedaços**, e só no final peça o resumo dos resumos.
- Para entender: peça **nível mais simples**, **analogia** e **exemplo concreto**. E aponte o ponto exato onde travou.
- **Explicar de volta** com suas palavras e pedir correção é a técnica mais eficiente do módulo.
- Use a IA na fase ativa: **simulado uma pergunta por vez**, flashcards, plano de estudo realista.
- Testar **antes** de estudar parece estranho, mas faz o conteúdo grudar muito melhor depois.
- **Ler resumo não é estudar.** Termine toda sessão testando, nunca relendo.
- Confira no material original tudo que for número, prazo ou nome de norma.
- A IA te ajuda a chegar na aula com uma **pergunta específica** — ela não substitui o professor.

E vale repetir: pode pedir a mesma explicação quantas vezes precisar. Ninguém vai perder a paciência, e não existe pergunta boba aqui.`,
    ],
  ],

  "Criando pedidos (prompts) simples e úteis": [
    [
      "introducao",
      "A diferença entre uma resposta inútil e uma que resolve",
      `Duas pessoas usam a mesma ferramenta de IA no mesmo dia. Uma sai dizendo "isso não serve para nada, só me deu texto genérico". A outra economizou uma hora de trabalho. A ferramenta era idêntica. O que mudou foi o **pedido**.

Isso costuma frustrar quem está começando, porque parece que existe um segredo escondido. Não existe. A IA não adivinha o que está na sua cabeça: ela responde exatamente o que você escreveu. Se o pedido foi vago, a resposta será vaga — e ela vai preencher as lacunas com o caso mais comum da internet, que quase nunca é o seu caso.

Um exemplo que resume tudo. Pedido: "escreva um e-mail". A IA não sabe para quem, sobre o quê, com que tom, com que urgência. Ela chuta um e-mail médio, e o resultado é aquele texto sem cara de nada que você teria que reescrever inteiro.

A boa notícia: escrever bons pedidos não é técnico. É a mesma habilidade de explicar uma tarefa para um colega novo que acabou de chegar — competente, disposto, mas que não conhece nada da sua realidade e vai fazer exatamente o que você mandar, ao pé da letra.

Neste módulo você vai aprender as quatro peças de um pedido que funciona, como usar exemplos, e por que a segunda tentativa quase sempre é melhor que a primeira.`,
    ],
    [
      "explicacao",
      "As quatro peças de um bom pedido",
      `Um pedido que funciona costuma ter quatro partes. Nem sempre você precisa das quatro — mas quando a resposta vem ruim, quase sempre está faltando uma delas.

**1. Tarefa — o verbo, o que fazer.** Comece por um verbo claro: escreva, resuma, explique, revise, compare, liste, corrija, traduza, organize. "Me ajuda com o e-mail" não é tarefa. "Escreva um e-mail" é.

**2. Contexto — quem, para quem, por quê.** É a peça que mais falta e a que mais melhora o resultado. Quem é você, para quem vai a resposta, qual é a situação. "Sou jovem aprendiz no setor administrativo. O e-mail é para a minha supervisora, com quem tenho contato diário."

**3. Formato — o tamanho e o formato da resposta.** Sem isso a IA escolhe por você, e costuma escolher longo. Diga: "em no máximo 5 linhas", "em tópicos", "em uma tabela com três colunas", "em dois parágrafos".

**4. Tom — como deve soar.** "Formal", "simples e direto", "educado mas informal", "sem termos técnicos", "acolhedor".

Juntando tudo, veja a diferença:

- Vago: "escreva um e-mail pedindo folga"
- Completo: "Escreva um e-mail para a minha supervisora pedindo folga na sexta-feira, dia 12, por consulta médica marcada. Sou jovem aprendiz e temos contato diário. Máximo 5 linhas, tom educado e direto, sem exagero de desculpas. Já vou compensar as horas na semana seguinte."

O segundo pedido leva vinte segundos a mais para escrever e devolve um e-mail que você usa quase sem mexer. O primeiro devolve um texto que você reescreve inteiro.

Um teste rápido antes de enviar: **se um colega recém-chegado lesse só o seu pedido, ele conseguiria fazer a tarefa?** Se não, falta contexto.`,
    ],
    [
      "explicacao",
      "Exemplos, restrições e papéis",
      `Com as quatro peças você já resolve 80% dos casos. Três recursos a mais elevam bastante o resultado, e nenhum deles é técnico.

**Dê um exemplo do que você quer.** Este é o recurso mais subestimado. Se você tem um texto parecido que ficou bom, cole junto: "escreva no mesmo estilo deste exemplo". A IA é muito boa em imitar padrão — e um exemplo comunica o que dez linhas de instrução não conseguem.

**Diga o que você NÃO quer.** Restrições evitam os defeitos típicos: "sem introdução, vá direto ao ponto"; "não use palavras difíceis"; "não invente dados — se não souber, diga que não sabe"; "não use emoji". Essa última, aliás, resolve o problema mais comum em texto de trabalho.

**Dê um papel a ela.** Começar com "aja como..." muda o vocabulário e a profundidade da resposta:

- "Aja como um profissional de RH avaliando meu currículo. O que você cortaria?"
- "Aja como um professor de planilhas explicando para alguém que nunca abriu uma."
- "Aja como um entrevistador para vaga de jovem aprendiz e me faça as perguntas uma por vez."

**E dois recursos que resolvem casos específicos:**

**Peça para ela te perguntar antes.** "Antes de escrever, me faça as perguntas que você precisa para fazer isso bem." Ótimo quando você mesmo não sabe explicar direito o que quer — ela conduz.

**Peça mais de uma versão.** "Me dê 3 versões deste assunto de e-mail, uma mais formal, uma mais direta e uma mais curta." Escolher entre opções é mais fácil do que avaliar uma opção sozinha.`,
    ],
    [
      "explicacao",
      "Conversar é o método, não a segunda chance",
      `O erro de expectativa mais comum: achar que o pedido precisa sair perfeito de primeira, e concluir que a ferramenta não presta quando a primeira resposta decepciona.

Não é assim que funciona bem. **A IA é uma conversa.** A primeira resposta é um rascunho para você reagir, e o resultado bom quase sempre aparece na segunda ou terceira mensagem. Quem usa IA com desenvoltura raramente para na primeira.

Frases de ajuste que você pode usar exatamente como estão:

- "Ficou longo demais. Corte pela metade."
- "Está formal demais para o meu caso. Deixe mais natural."
- "Gostei do segundo parágrafo. Reescreva o resto no mesmo tom."
- "Você inventou esse dado? Me mostre a fonte."
- "Refaça, mas agora considerando que quem vai ler não conhece o assunto."
- "Está bom. Agora só revise o português e me devolva."

Um detalhe que ajuda muito: **ela lembra do que foi dito na mesma conversa.** Não precisa repetir o contexto a cada mensagem — dentro daquele bate-papo, ela continua sabendo que você é jovem aprendiz do administrativo. Mas em uma conversa **nova**, ela não sabe mais nada. Por isso vale manter uma conversa por assunto, em vez de misturar tudo.

Duas práticas de quem usa bem:

**Guarde os pedidos que funcionaram.** Anote num bloco de notas os cinco ou seis que você mais usa (revisar e-mail, resumir texto, simulado de estudo). Colar e adaptar é mais rápido que reescrever.

**Faça uma coisa por vez.** Pedido que junta cinco tarefas devolve as cinco pela metade. Peça o texto, ajuste, depois peça a revisão. Fica melhor e você mantém o controle do resultado.`,
    ],
    [
      "exemplo",
      "Na prática: o mesmo objetivo, três tentativas",
      `A Maria Alice precisa avisar a supervisora de que não vai conseguir entregar um relatório na quarta, porque o setor de compras ainda não mandou os dados. Ela está insegura — é a primeira vez que precisa avisar um atraso.

**Tentativa 1 (vaga):**

"escreva um e-mail avisando que vou atrasar"

Resultado: um e-mail genérico e cheio de desculpas, com "peço sinceras desculpas pelo transtorno causado" e três parágrafos de rodeio. Não parecia ela, e não explicava nada.

**Tentativa 2 (com as quatro peças):**

"Escreva um e-mail para a minha supervisora avisando que o relatório de estoque, previsto para quarta, vai atrasar porque o setor de compras ainda não enviou os dados de entrada. Sou jovem aprendiz, temos contato diário, tom educado e direto. Máximo 5 linhas. Não peça desculpas em excesso — quero soar responsável, não culpada."

Resultado: bem melhor. Curto, claro, sem drama.

**Tentativa 3 (o ajuste que fechou):**

"Ficou bom. Só acrescente uma linha propondo uma solução: posso entregar na sexta se os dados chegarem até quinta de manhã. E me dê também um assunto para o e-mail."

Resultado final, que ela enviou com uma pequena edição:

Assunto: Relatório de estoque — nova previsão de entrega

Bom dia, Carla,

O relatório de estoque previsto para quarta vai atrasar: o setor de compras ainda não enviou os dados de entrada, e sem eles não consigo fechar os números.

Se os dados chegarem até quinta de manhã, consigo entregar na sexta. Já solicitei o envio ao compras e aviso assim que receber.

Obrigada,
Maria Alice Silva

Repare no caminho: da tentativa 1 para a 3 o que mudou não foi a ferramenta, foi a especificidade. E note que o ajuste mais importante — propor uma solução junto com o problema — veio dela, não da IA. A IA escreveu; o julgamento profissional foi dela.`,
    ],
    [
      "dica",
      "Erro comum: pedir tudo de uma vez",
      `O tropeço clássico de quem já pegou o jeito e se empolga: escrever um pedido gigante com sete tarefas de uma vez. "Resuma este texto, monte uma apresentação, escreva um e-mail para a equipe, crie 10 perguntas de prova, faça um cronograma e revise tudo."

O que volta é uma resposta enorme com todas as sete tarefas feitas pela metade — e agora você tem que revisar sete coisas mal feitas em vez de fazer uma bem feita. **Uma tarefa por mensagem.** Termine uma, ajuste, e só então vá para a próxima.

**Outros quatro deslizes que valem evitar:**

**Achar que ser educado com a IA melhora a resposta.** "Por favor" e "obrigada" não fazem mal, mas não é isso que muda o resultado — o que muda é contexto e clareza. Não gaste esforço no lugar errado.

**Escrever pedido enorme achando que quantidade é qualidade.** Não é tamanho, é precisão. Um pedido de quatro linhas específicas ganha de um de vinte linhas cheias de rodeio.

**Colocar dado sensível no pedido.** CPF, endereço, senha, dado de cliente, informação confidencial da empresa. Quando precisar de um exemplo com dados, troque por dados fictícios: "cliente João da Silva, pedido 123".

**Aceitar um resultado que não é seu.** Se o texto não soa como você falaria, ajuste antes de enviar. Um e-mail com cara de robô é tão ruim quanto um e-mail mal escrito — e num ambiente de trabalho, as pessoas percebem.

E o hábito que fecha o módulo, o mais valioso de todos: **releia como se você fosse quem vai receber.** A pergunta não é "a IA fez o que pedi?", é "isso resolve para quem vai ler?". Esse julgamento é seu, e é ele que continua sendo a sua parte do trabalho.`,
    ],
    [
      "resumo",
      "Recapitulando antes da atividade",
      `O que levar deste módulo:

- A IA não adivinha. Ela responde ao que você escreveu — pedido vago, resposta vaga.
- As quatro peças: **tarefa** (o verbo), **contexto** (quem, para quem, por quê), **formato** (tamanho e forma) e **tom**.
- O **contexto** é a peça que mais falta e a que mais melhora o resultado.
- **Dar um exemplo** do que você quer comunica mais do que dez linhas de instrução.
- Diga também o que você **não** quer: sem enrolação, sem termo difícil, sem inventar dado.
- **"Aja como..."** muda o vocabulário e a profundidade da resposta.
- Conversar é o método: a boa resposta costuma vir na **segunda ou terceira** mensagem, não na primeira.
- Dentro da mesma conversa ela lembra do contexto. Em conversa nova, ela não sabe nada.
- **Uma tarefa por mensagem.** Pedido com cinco tarefas devolve as cinco pela metade.
- Nada de dado sensível. Use dados fictícios quando precisar de exemplo.

O teste que resolve quase tudo antes de enviar o pedido: **um colega que chegou hoje conseguiria fazer essa tarefa lendo só isso?**`,
    ],
  ],

  // ===============================================================
  // Trilha 3 — Pronta para o Mercado de Trabalho
  // ===============================================================
  "Currículo e perfil online básico": [
    [
      "introducao",
      "O currículo de quem ainda não teve emprego",
      `A pergunta que trava todo mundo no primeiro currículo: "o que eu coloco, se eu nunca trabalhei?"

Essa pergunta parte de uma ideia errada — a de que currículo é uma lista de empregos anteriores. Não é. **Currículo é um argumento**: um documento curto que responde "por que vale a pena me chamar para uma conversa". Emprego anterior é só uma das evidências possíveis, e para vaga de jovem aprendiz ninguém espera encontrar essa evidência.

Quem contrata aprendiz sabe que você está começando. O que está sendo avaliado é outra coisa: se você se comunica com clareza, se demonstra responsabilidade, se tem alguma noção de ferramenta básica, e se parece alguém com quem dá para trabalhar. Tudo isso cabe numa página, mesmo sem carteira assinada.

E existe um segundo documento hoje: o **perfil online**. Muita gente que recebe seu currículo vai procurar seu nome na internet. Ter um perfil simples e organizado no LinkedIn não é frescura de executivo — é a versão pública e sempre atualizada do seu currículo, e é gratuita.

Neste módulo você vai montar as seções do currículo, aprender a descrever o que já fez de um jeito que conte, e configurar um perfil online básico sem precisar inventar nada.`,
    ],
    [
      "explicacao",
      "As seções do currículo, na ordem certa",
      `Currículo de quem está começando tem **uma página**. Uma. Se passou disso, tem coisa sobrando. A ordem abaixo funciona porque coloca no topo o que é mais forte para quem tem pouca experiência.

**1. Cabeçalho — dados de contato.** Nome completo em destaque. Logo abaixo, numa linha: cidade e estado, telefone com DDD, e-mail profissional. Se tiver LinkedIn, o link entra aqui.

O que **não** vai: RG, CPF, estado civil, nome dos pais, número da carteira de trabalho, foto (no Brasil não é obrigatória e pode gerar viés — deixe a foto para o LinkedIn). Idade e data de nascimento só se a vaga exigir, o que é comum em aprendiz por causa da faixa etária legal.

**2. Objetivo — uma linha.** Curta e específica para a vaga: "Vaga de Jovem Aprendiz na área administrativa". Nada de frase pronta tipo "busco uma oportunidade de crescimento profissional em empresa sólida onde eu possa aplicar meus conhecimentos" — isso não diz nada e todo recrutador já leu mil vezes.

**3. Formação.** Curso, instituição, e o período (ou "em andamento, previsão de conclusão em 2026"). Ensino médio em andamento é formação e entra aqui normalmente.

**4. Cursos e certificações.** Aqui está o ouro de quem não tem experiência. Curso de informática, curso online gratuito, oficina no CRAS, curso do Senai, treinamento de primeiros socorros, curso de inglês, este próprio programa de capacitação digital. Coloque nome do curso, instituição e carga horária.

**5. Experiências.** E aqui vale a leitura ampla do termo: trabalho voluntário, ajudar no negócio da família, monitoria na escola, organização de evento da igreja ou da comunidade, projeto escolar, venda de doce para juntar dinheiro. Tudo isso é experiência real e ensina responsabilidade, prazo e lidar com gente.

**6. Habilidades.** Ferramentas e idiomas, com honestidade: "Pacote Office — nível básico", "Google Planilhas — básico", "Inglês — leitura básica".

Formato do arquivo: **PDF, sempre**. Word desconfigura no computador dos outros. E o nome do arquivo (você já sabe da primeira trilha): curriculo-maria-alice-silva.pdf.`,
    ],
    [
      "explicacao",
      "Descrevendo o que você fez de um jeito que conta",
      `Duas pessoas fizeram exatamente a mesma coisa. Uma escreve "ajudei na loja da minha tia". A outra escreve "atendi clientes e organizei o controle de estoque em planilha na loja de material de construção da família, aos sábados, durante 1 ano". A segunda é chamada para a entrevista.

Não houve invenção nenhuma. Houve **descrição concreta** em vez de descrição vaga.

A fórmula: **verbo de ação + o que exatamente + resultado ou tamanho**.

- Verbo de ação: organizei, atendi, ajudei, cadastrei, montei, controlei, ensinei, participei
- O que exatamente: nada de "várias tarefas" — diga quais
- Resultado ou tamanho: quantas pessoas, quanto tempo, quantos itens, com que frequência

Veja como fica em quatro casos que aparecem muito:

- Antes: "trabalho voluntário na igreja"
  Depois: "Organizei a lista de doações e o controle de entrega para cerca de 40 famílias, uma vez por mês, durante 2 anos"

- Antes: "ajudei na escola"
  Depois: "Monitoria voluntária de matemática para 6 colegas do 9º ano, duas vezes por semana"

- Antes: "sei mexer em computador"
  Depois: "Word e Google Documentos (formatação e revisão de textos), Google Planilhas (fórmulas básicas e filtros)"

- Antes: "organizei uma festa"
  Depois: "Coordenei a organização da festa junina da escola: divisão de tarefas entre 12 voluntários e controle do orçamento em planilha"

Repare no que essas descrições provam sem precisar dizer: responsabilidade, prazo, trabalho em grupo, uso de ferramenta. É isso que quem contrata está procurando em alguém sem experiência formal.

**E cuidado com o extremo oposto: nunca invente.** Não é só uma questão ética — é prático. Currículo é roteiro de entrevista. Tudo que está escrito ali pode virar pergunta, e a hora de descobrir que você não sabe é a pior possível. Descrever bem o que é verdade sempre funciona melhor do que inventar o que não é.`,
    ],
    [
      "explicacao",
      "O perfil online, sem complicação",
      `Além do PDF, vale ter uma versão sua na internet. A rede padrão do mundo do trabalho é o **LinkedIn**: é gratuita, funciona bem pelo celular e muita empresa procura candidato por lá. Não é rede social de postar rotina — é currículo público.

O mínimo que já funciona, e leva menos de uma hora:

**Foto.** Não precisa de foto profissional cara. Precisa de: fundo neutro (parede lisa), luz na sua frente e não atrás, rosto ocupando boa parte do quadro, roupa que você usaria no trabalho, e uma expressão tranquila. Foto de festa, com filtro pesado ou recortada de foto em grupo passa a impressão errada.

**Título.** A linha embaixo do nome, e é o que mais aparece nas buscas. "Estudante" é fraco. Melhor: "Estudante de Administração | Buscando vaga de Jovem Aprendiz | Pacote Office e Google Planilhas".

**Sobre.** Três ou quatro linhas em primeira pessoa: quem você é, o que está estudando, o que procura e algo verdadeiro sobre como você trabalha. Sem frase de autoajuda.

**Experiência, formação e cursos.** O mesmo conteúdo do currículo. O LinkedIn tem uma seção de licenças e certificados que é excelente para quem tem muitos cursos e pouca experiência.

**Personalize o endereço do seu perfil.** Nas configurações dá para trocar aquele link cheio de números por linkedin.com/in/mariaalicesilva. Fica muito melhor no currículo.

**E a higiene digital, que é a parte que mais elimina candidato:** pesquise seu próprio nome no Google. O que aparece é o que quem contrata vai ver. Deixe privado o que não gostaria que sua supervisora visse, e confira se sua foto de perfil do WhatsApp — que aparece para qualquer contato de trabalho — passa a imagem que você quer.

Uma boa prática por semana: comente algo relevante num post da sua área ou publique o que aprendeu num curso. Perfil com movimento aparece mais nas buscas do que perfil parado.`,
    ],
    [
      "exemplo",
      "Na prática: o currículo da Maria Alice",
      `Maria Alice, 17 anos, ensino médio em andamento, nunca teve carteira assinada. Ela achava que não tinha "nada para colocar". Veja o que apareceu quando ela parou para listar tudo o que já tinha feito.

**MARIA ALICE SILVA**
São Paulo, SP | (11) 91234-5678 | maria.alice.silva@email.com | linkedin.com/in/mariaalicesilva

**Objetivo**
Vaga de Jovem Aprendiz na área administrativa

**Formação**
Ensino Médio — E.E. Prof. João Ribeiro | conclusão prevista em dezembro de 2025
Curso Técnico em Administração — Senai (em andamento, 2º semestre)

**Cursos e certificações**
- Capacitação Digital — Jovem Aprendiz Digital (40h, 2024): organização de arquivos, e-mail profissional, planilhas e ferramentas de IA
- Informática Básica — CRAS Vila Nova (60h, 2023)
- Inglês Básico — curso online gratuito (30h, 2023)

**Experiências**
*Auxiliar no comércio da família — Materiais de Construção Silva (2022 a 2024, aos sábados)*
- Atendi clientes no balcão e por WhatsApp, tirando dúvidas sobre produtos e preços
- Organizei o controle de estoque em planilha, com cerca de 120 itens
- Emiti pedidos e conferi notas de entrada junto com a responsável pela loja

*Voluntária — Campanha de doações do bairro (2023, 2024)*
- Organizei a lista de doações e a entrega para cerca de 40 famílias, uma vez por mês
- Coordenei a divisão de tarefas entre 6 voluntários nos dias de entrega

**Habilidades**
- Google Planilhas e Excel — básico (fórmulas de soma, ordenação e filtros)
- Word e Google Documentos — básico
- E-mail profissional e ferramentas de reunião online (Meet, Teams)
- Inglês — leitura básica

Uma página. Nada inventado. E repare: o que parecia "não ter nada" virou dois blocos sólidos de experiência assim que ela descreveu com verbo, detalhe e tamanho. É quase sempre assim — a experiência já existia, faltava a descrição.`,
    ],
    [
      "dica",
      "Erro comum: o currículo genérico enviado para todo lugar",
      `O hábito que mais desperdiça esforço: montar um currículo e disparar exatamente o mesmo arquivo para vinte vagas diferentes. Dá a sensação de estar fazendo muito, e converte pouquíssimo.

O ajuste custa cinco minutos por vaga e muda o resultado: **leia o anúncio e alinhe duas coisas** — o objetivo (com o nome da vaga como está escrito no anúncio) e a ordem dos cursos e habilidades, deixando na frente o que a vaga pediu. Se a vaga fala em atendimento, sua experiência de balcão sobe. Se fala em planilhas, Google Planilhas vem primeiro na lista de habilidades.

**Outros cinco tropeços que eliminam candidato antes da entrevista:**

**E-mail informal.** gatinha_do_role@ ou tigrao2007@ no cabeçalho do currículo. Crie um endereço nome.sobrenome@ — leva três minutos e é gratuito.

**Erro de português na primeira linha.** Passe o corretor, leia em voz alta e peça para outra pessoa ler. Ninguém espera texto perfeito de quem está começando, mas "Objetivio" logo no topo é a única coisa que o recrutador vai lembrar.

**Enviar em Word.** O arquivo abre desconfigurado no computador de quem recebe. **Sempre PDF.**

**Currículo de três páginas.** Sem experiência formal, três páginas significam enchimento. Uma página, bem cheia de conteúdo real.

**Telefone ou e-mail errado.** Parece impossível e acontece o tempo todo. Confira dígito por dígito, e mantenha o WhatsApp com uma foto e um nome apresentáveis — é por ali que muito recrutador faz o primeiro contato.

E um lembrete que importa: **não ser chamada não significa que seu currículo é ruim.** Processo de aprendiz tem centenas de candidatos para poucas vagas. Continue enviando, continue fazendo curso, continue melhorando a descrição. O número de tentativas faz parte do processo, e não é medida do seu valor.`,
    ],
    [
      "resumo",
      "Recapitulando antes da atividade",
      `O que levar deste módulo:

- Currículo não é lista de empregos: é um **argumento** de por que vale a pena te chamar.
- **Uma página**, em **PDF**, com nome de arquivo descritivo.
- Seções: contato, objetivo, formação, cursos, experiências, habilidades.
- Não coloque RG, CPF, estado civil, nome dos pais ou foto no currículo.
- Sem experiência formal, **cursos e trabalho voluntário são a sua experiência** — e contam de verdade.
- Descreva com **verbo de ação + o que exatamente + resultado ou tamanho**.
- **Nunca invente.** O currículo vira roteiro da entrevista.
- **Perfil no LinkedIn**: foto simples com fundo neutro, título específico, sobre em três linhas, link personalizado.
- Pesquise seu nome no Google e ajuste o que aparece. Inclusive a foto do WhatsApp.
- **Adapte o currículo para cada vaga** — objetivo com o nome da vaga e o que ela pede na frente.

E-mail profissional (nome.sobrenome@), zero erro de português e PDF: três detalhes pequenos que colocam você à frente de muita gente na primeira triagem.`,
    ],
  ],

  "Reuniões online sem susto": [
    [
      "introducao",
      "O nervosismo que ninguém admite",
      `Reunião online tem um tipo de nervosismo próprio. Não é medo de falar em público exatamente — é o medo de que a tecnologia te exponha. E se o microfone não funcionar? E se aparecer a bagunça atrás de mim? E se travar bem na hora em que me perguntarem algo? E se eu falar por cima de alguém?

Esse receio é tão comum que existe um comportamento clássico: entrar na reunião com câmera desligada, microfone mudo, e passar cinquenta minutos torcendo para ninguém chamar seu nome. Funciona no sentido de sobreviver à reunião. Não funciona no sentido de ser lembrada quando surgir uma oportunidade.

A verdade que tira metade do peso: **reunião online tem umas seis funções, e todo mundo usa as mesmas seis.** Microfone, câmera, chat, levantar a mão, compartilhar tela, sair. Não existe função escondida que só os experientes conhecem. Uma vez que essas seis estão dominadas, sobra atenção para o que importa — o conteúdo da conversa.

E vale dizer: **problema técnico acontece com todo mundo**, inclusive com o gerente, inclusive com quem trabalha com isso há vinte anos. O que separa o profissional do amador não é nunca ter problema — é resolver sem drama.

Neste módulo você vai ver o que fazer antes, durante e depois da reunião, incluindo o plano B para quando a internet cai.`,
    ],
    [
      "explicacao",
      "Antes da reunião: dez minutos que evitam o susto",
      `Quase todo apuro em chamada de vídeo é resolvido antes dela começar. Um pequeno ritual, e o nervosismo cai bastante.

**Descubra qual é a ferramenta.** Google Meet, Microsoft Teams e Zoom são as três mais comuns. Elas são muito parecidas, mas mudam de lugar os botões. Se for a primeira vez naquela, abra o link com antecedência e olhe a tela com calma.

**Teste o som e a imagem antes.** Todas elas mostram uma tela de preparação antes de você entrar, com sua imagem e uma barrinha que se mexe quando você fala. Fale "teste" e veja se a barra reage. Se não reagir, o microfone selecionado está errado — nas configurações dá para escolher qual usar.

**Fone de ouvido resolve 80% dos problemas de áudio.** Qualquer um, até o do celular. Ele elimina o eco (que acontece quando o som da caixa volta pelo microfone) e faz sua voz chegar bem mais limpa. É o item que mais melhora sua presença numa reunião, e é o mais barato.

**Cuide do enquadramento e da luz.** Câmera na altura dos olhos (empilhe livros embaixo do notebook, ou apoie o celular em algo firme — não segure na mão). Rosto no centro, com um pouco de espaço acima da cabeça. **Luz na sua frente**, nunca atrás: se a janela estiver às suas costas, você vira uma silhueta escura. Se o fundo for bagunçado, todas as ferramentas têm a opção de desfocar o fundo, que é mais discreta e mais leve que fundo virtual.

**Escolha o lugar e avise em casa.** Um canto com o mínimo de circulação, e um recado para quem mora com você: "vou estar em reunião das 14h às 15h".

**Entre dois ou três minutos antes.** Chegar em cima da hora é onde mora o desastre — é quando o link não abre, a atualização começa ou o áudio não funciona. Alguns minutos de folga transformam pânico em ajuste tranquilo.`,
    ],
    [
      "explicacao",
      "Durante: os botões e o combinado social",
      `Os controles ficam numa barra na parte de baixo da tela (no celular, às vezes é preciso tocar na tela para ela aparecer). São estes:

**Microfone.** O botão mais importante. A regra: **fique no mudo por padrão e ative só quando for falar.** Isso não é timidez, é etiqueta — evita que barulho de casa, digitação e respiração entrem na chamada de todo mundo. Atalho que vale decorar: em muitas ferramentas, segurar a **barra de espaço** ativa o microfone só enquanto você segura.

**Câmera.** Ligada é melhor, sobretudo em reunião pequena e para quem está começando: quem aparece é lembrada. Se a internet estiver ruim, desligar a câmera é a primeira coisa a fazer — o áudio melhora na hora. E se precisar desligar por um motivo qualquer, é normal, ninguém deve satisfação.

**Chat.** O melhor amigo de quem tem vergonha de interromper. Dá para escrever a dúvida sem abrir o microfone, e o chat também guarda links e nomes citados. Uma pergunta bem escrita no chat pode chamar mais atenção positiva do que uma falada com pressa.

**Levantar a mão.** Um ícone de mãozinha que avisa que você quer falar, sem cortar ninguém. Em reunião com muita gente, é o jeito certo de pedir a vez. Lembre-se de baixar a mão depois.

**Compartilhar tela.** Mostra o que está no seu computador para os outros. Antes de clicar, **feche o que não deve aparecer** — WhatsApp Web, e-mails pessoais, abas abertas. E prefira compartilhar **uma janela específica**, não a tela inteira: assim as notificações que chegarem não aparecem para a reunião.

**Sobre falar:** espere um instante quando alguém terminar — o áudio tem um pequeno atraso, e é aí que nascem as falas sobrepostas. Se acontecer de falarem juntos, resolva rápido e sem constrangimento: "pode falar" e pronto.

**E se você não entendeu algo:** pergunte. "Só para eu confirmar se entendi: a entrega é na quinta ou na sexta?" Essa frase não expõe você — ela mostra atenção. Quem nunca pergunta é quem entrega errado depois.`,
    ],
    [
      "explicacao",
      "Quando dá problema, e o que fazer depois",
      `**Se o áudio falhar.** Antes de entrar em pânico, três verificações, nesta ordem: o botão de mudo está desativado? O aplicativo tem permissão para usar o microfone (no celular, o sistema pergunta na primeira vez)? Está selecionado o microfone certo nas configurações? Se nada resolver, escreva no chat: "estou sem áudio, vou sair e entrar de novo". Sair e entrar resolve uma quantidade surpreendente de casos.

**Se a internet cair.** Não some. Mande uma mensagem por outro canal — WhatsApp para alguém da reunião, ou e-mail: "caiu minha internet, estou tentando voltar". Isso mostra responsabilidade, e é a diferença entre "teve um problema" e "sumiu no meio da reunião". Se estiver ruim, desligue a câmera; se continuar ruim, entre pelo celular usando dados móveis.

**Se travar bem na hora de falar.** Diga com naturalidade: "acho que travou, vocês estão me ouvindo?" Todo mundo já passou por isso e ninguém julga.

**Se alguém aparecer atrás de você.** Não é o fim do mundo, e acontece em casa. Desligue a câmera por um instante, resolva e volte. Uma frase basta: "desculpe, um segundo".

**Depois que a reunião acabar** — a parte que quase ninguém faz e que mais impressiona:

**Anote na hora.** Nos cinco minutos seguintes, enquanto está fresco, escreva: o que ficou decidido, o que é tarefa sua, e para quando. Reunião sem anotação vira reunião esquecida.

**Confirme o que é seu.** Se ficou alguma tarefa para você, mande uma mensagem curta: "só confirmando o que ficou comigo: organizar a planilha de estoque até quinta". Isso evita mal-entendido e mostra que você acompanhou.

**Se ficou uma dúvida.** Aquela que você não teve coragem de fazer na hora — mande depois, por mensagem. Pergunta feita depois ainda é pergunta feita. Pergunta engolida vira trabalho errado.`,
    ],
    [
      "exemplo",
      "Na prática: a primeira reunião da Maria Alice",
      `Reunião de alinhamento do setor, quarta-feira às 14h, pelo Google Meet. Seis pessoas. Era a primeira da Maria Alice, e ela estava com medo de "fazer feio".

**13h45 — preparação.** Pegou o fone de ouvido do celular. Sentou de frente para a janela, com a parede lisa atrás. Apoiou o notebook em dois livros para a câmera ficar na altura dos olhos. Avisou a irmã: "estou em reunião até as 15h".

**13h57 — entrou.** Na tela de preparação, falou "teste" e viu a barrinha se mexer. Ativou o desfoque de fundo. Entrou com a câmera ligada e o microfone no mudo.

**14h02 — a apresentação.** A supervisora pediu que ela se apresentasse. Ela desativou o mudo, disse o nome, o setor e há quanto tempo estava na empresa, em duas frases, e voltou para o mudo. Simples assim.

**14h20 — a dúvida.** Alguém citou "o relatório do fechamento" e ela não sabia o que era. Em vez de ficar perdida os quarenta minutos restantes, escreveu no chat: "Desculpa a dúvida básica: o relatório do fechamento é o mesmo da planilha de estoque?" A supervisora respondeu no chat em dez segundos, sem interromper a reunião. Ninguém achou ruim — e ela acompanhou o resto entendendo.

**14h35 — o susto.** A internet oscilou e a imagem travou. Ela desligou a câmera, o áudio estabilizou, e ela seguiu ouvindo. Ninguém comentou nada.

**14h50 — a tarefa.** A supervisora pediu que ela organizasse a planilha de estoque até sexta. Ela ativou o microfone e confirmou: "combinado, planilha de estoque até sexta".

**14h58 — depois.** Anotou no bloco de notas do celular as três decisões da reunião e a tarefa dela. Às 15h05, mandou uma mensagem: "Confirmando o que ficou comigo: planilha de estoque organizada até sexta. Qualquer coisa te aviso antes."

Nenhum truque avançado. Fone, luz, chegar antes, usar o chat, confirmar a tarefa. E ela saiu da reunião tendo sido notada pelo motivo certo.`,
    ],
    [
      "dica",
      "Erro comum: a fala no mudo (e o contrário, pior)",
      `Existem dois erros gêmeos, e o segundo é bem pior que o primeiro.

**Falar no mudo.** Você toma coragem, fala trinta segundos, e alguém diz: "você está no mudo". Constrangedor por dois segundos e absolutamente universal — acontece com todo mundo, em toda empresa. Só respire e repita: "desculpa, agora foi". Vira um segundo de riso e acabou. Costume que ajuda: olhe o ícone do microfone antes de começar a falar.

**Esquecer o microfone aberto.** Este é o que dói. É a conversa paralela, a discussão em casa, a televisão, o comentário sobre alguém da reunião — tudo ao vivo para todo mundo. Por isso a regra do mudo por padrão não é exagero: ela protege você.

**Outros quatro tropeços frequentes:**

**Compartilhar a tela inteira sem preparar.** Notificação de WhatsApp aparecendo, aba do banco aberta, conversa pessoal. Feche tudo antes, e compartilhe **uma janela específica** em vez da tela toda.

**Comer durante a reunião.** Com o microfone aberto, isso soa muito alto para os outros. Água, sem problema. Almoço, é melhor não.

**Chegar em cima da hora.** É onde estão quase todos os desastres técnicos. Dois minutos de antecedência é um investimento pequeno com retorno grande.

**Passar a reunião inteira invisível.** Câmera desligada, mudo, zero participação, sempre. Do lado de fora, isso parece desinteresse — mesmo quando é só vergonha. Você não precisa falar muito: uma pergunta no chat, um "bom dia" no começo, um "combinado" ao receber uma tarefa. É pouco e muda completamente a impressão que fica.

E o alívio final: **ninguém está te avaliando pela sua internet.** Trava, corta, cai — acontece com todo mundo. O que fica registrado é como você lida: avisar, resolver, voltar. Isso, sim, as pessoas notam.`,
    ],
    [
      "resumo",
      "Recapitulando antes da atividade",
      `O que levar deste módulo:

- Toda reunião online usa as mesmas seis funções: **microfone, câmera, chat, levantar a mão, compartilhar tela e sair**.
- **Antes:** teste o áudio, use fone de ouvido, luz na frente, câmera na altura dos olhos, entre 2 minutos antes.
- **Fone de ouvido** é o item que mais melhora sua presença — e elimina o eco.
- **Mudo por padrão**, ative só para falar. Isso é etiqueta, não timidez.
- Câmera ligada ajuda a ser lembrada. Internet ruim? Desligar a câmera é a primeira medida.
- O **chat** é a saída para perguntar sem interromper. Pergunta escrita conta tanto quanto falada.
- Ao compartilhar tela, feche o que é pessoal e prefira **uma janela**, não a tela inteira.
- Internet caiu? **Avise por outro canal** em vez de sumir.
- **Depois da reunião:** anote as decisões e confirme por escrito a tarefa que ficou com você.
- Não passe a reunião inteira invisível. Um cumprimento e uma pergunta já mudam a impressão.

Problema técnico acontece com todo mundo, inclusive com quem manda na reunião. O que conta é resolver sem drama.`,
    ],
  ],

  "Organizando sua rotina de estudo e trabalho": [
    [
      "introducao",
      "Quando trabalho e curso acontecem na mesma semana",
      `A rotina de jovem aprendiz é uma das mais apertadas que existem: trabalho durante o dia, curso à noite ou aos sábados, transporte comendo duas horas, e ainda a vida — família, casa, amigos, descanso. É muita coisa disputando a mesma cabeça.

O que acontece quando não há um sistema: você não esquece as tarefas porque é desorganizada, esquece porque **está tentando guardar tudo na memória ao mesmo tempo**. E memória humana não foi feita para isso. O resultado é aquele estado de fundo de "tem alguma coisa que eu deveria estar fazendo agora" que cansa mais do que o trabalho em si.

Aqui vale desfazer um mito: organização não é sobre disciplina de ferro nem sobre acordar às cinco da manhã. É sobre **tirar as coisas da cabeça e colocar em algum lugar confiável**. Quando você confia no lugar onde as coisas estão anotadas, a cabeça para de vigiar — e sobra energia para o que interessa.

Outro mito que atrapalha: o de que é preciso um aplicativo sofisticado. Não é. Papel funciona. O bloco de notas do celular funciona. O que faz diferença não é a ferramenta, é o hábito de olhar para ela.

Neste módulo você vai montar um sistema simples e gratuito, com quatro peças, que sobrevive a uma semana ruim — porque é justamente na semana ruim que os sistemas complicados desmoronam.`,
    ],
    [
      "explicacao",
      "Peça 1: uma lista só, para tudo",
      `O primeiro passo é o que mais alivia, e leva vinte minutos.

**Tire tudo da cabeça de uma vez.** Sente com o celular ou um caderno e escreva absolutamente tudo o que está pendente: trabalho, curso, casa, pessoal, saúde. Tudo, sem filtrar, sem julgar, sem organizar. "Entregar planilha", "estudar para a prova", "marcar dentista", "renovar bilhete de transporte", "responder e-mail da coordenadora", "comprar caderno".

Duas coisas acontecem quando você faz isso. A primeira é que a lista costuma ser menor do que a sensação — o peso na cabeça vem da bagunça, não do volume. A segunda é que a cabeça relaxa na hora, porque para de tentar segurar tudo.

**A regra que sustenta o sistema: uma lista só.** Não uma no papel, outra no celular, outra na cabeça e outra no WhatsApp para si mesma. Listas espalhadas significam nenhuma lista confiável, e você volta a usar a memória para lembrar onde estão as coisas.

**Escolha o lugar dessa lista pensando no celular**, que é onde você está o tempo todo:

- **Google Keep** — gratuito, sincroniza com a conta Google, tem lembrete por hora e lugar
- **Microsoft To Do** — gratuito, integra com o e-mail da empresa se for Outlook
- **Bloco de notas do celular** — sem instalar nada, e resolve bem
- **Caderninho** — funciona perfeitamente, e tem a vantagem de não ter notificação para te distrair

**Depois, a regra de manutenção:** toda tarefa nova entra na lista **na hora em que aparece**. Alguém te pede algo no corredor, você anota ali mesmo, na frente da pessoa. Isso não é falta de memória — é o que profissional organizado faz, e passa uma ótima impressão.

**E a regra dos dois minutos:** se a tarefa leva menos de dois minutos, faça agora em vez de anotar. Anotar custaria quase o mesmo.`,
    ],
    [
      "explicacao",
      "Peças 2 e 3: prazo e prioridade",
      `Uma lista de trinta itens sem ordem nenhuma é quase tão paralisante quanto nenhuma lista. Faltam duas informações em cada item.

**Peça 2 — data.** Toda tarefa recebe um dia. Não "essa semana": um dia específico. Tarefa sem data é tarefa que fica sendo empurrada para sempre, porque nunca é hoje.

Aqui entra o **calendário do celular** (Google Agenda ou o do sistema), que faz uma coisa que a lista não faz: avisa você. Vale colocar nele:

- Tudo que tem hora marcada: aula, reunião, prova, consulta
- Prazos de entrega, como um evento no dia
- Um lembrete um ou dois dias **antes** dos prazos importantes, para dar tempo de reagir

E uma distinção útil: **calendário é o que tem hora marcada; lista é o que precisa ser feito em algum momento.** Misturar os dois é o que faz a agenda virar um monstro que ninguém abre.

**Peça 3 — prioridade.** Nem tudo tem o mesmo peso, e uma classificação simples em três níveis já resolve:

- **Hoje** — o que precisa sair hoje, sem exceção. No máximo 3 itens.
- **Esta semana** — importante, mas cabe em outro dia
- **Depois** — bom fazer, sem urgência

O limite de **três itens em "Hoje"** é o detalhe mais importante desta seção. Parece pouco. É exatamente o ponto: uma lista de doze itens para hoje termina com dois feitos e uma sensação de fracasso; três itens escolhidos com cuidado terminam com três feitos e a sensação de que o dia rendeu. Essa diferença de sensação é o que faz você continuar usando o sistema na semana seguinte.

E quando a tarefa for grande demais para caber num dia — "estudar para a prova" — quebre em pedaços concretos: "ler capítulo 3", "fazer os exercícios do 3", "fazer simulado". Tarefa vaga é tarefa adiada.`,
    ],
    [
      "explicacao",
      "Peça 4: a revisão semanal (e a rotina que sustenta)",
      `As três primeiras peças fazem o sistema existir. A quarta é a que faz ele durar mais de duas semanas — e é a que quase todo mundo pula.

**Quinze minutos, um dia fixo por semana.** Domingo à noite ou sexta no fim do expediente funcionam bem. Nesses quinze minutos, quatro perguntas:

- O que ficou pendente da semana passada? Ainda faz sentido, ou pode ser riscado?
- O que tem prazo na semana que vem?
- Quais são as três coisas mais importantes desta semana?
- Onde eu travei? Faltou tempo, faltou informação, ou faltou pedir ajuda?

Essa última pergunta é a que mais rende com o tempo. Se toda semana você trava no mesmo ponto, o problema não é a semana — é algo estrutural que precisa de outra solução.

**Uma rotina semanal esboçada ajuda muito.** Não precisa ser rígida: só saber, mais ou menos, onde estão seus blocos de tempo. "Segunda e quarta à noite: estudo. Terça: academia. Sábado de manhã: curso. Domingo à noite: revisão semanal." Ter horário definido para estudar acaba com a negociação diária de "será que estudo hoje?", que consome mais energia do que o estudo em si.

**Blocos curtos vencem maratonas.** Quarenta minutos concentrada rendem mais que três horas com o celular ao lado. Uma técnica simples e conhecida: 25 minutos de foco, 5 de pausa, e a cada quatro ciclos uma pausa maior. Durante os 25 minutos, celular longe e notificações desligadas — não no silencioso na mesa, longe mesmo.

**Aproveite o transporte.** Se você passa uma hora no ônibus, isso é sete horas por semana. Não precisa ser estudo pesado: flashcards, ouvir uma explicação, reler o resumo, planejar o dia. Muita coisa cabe aí.

**E proteja o descanso como se fosse uma tarefa.** Rotina de trabalho mais curso já é pesada. Sono e um tempo sem obrigação nenhuma não são luxo — são o que permite você aguentar o semestre inteiro. Cansaço acumulado é o que mais faz gente desistir de curso técnico, mais do que dificuldade de conteúdo.`,
    ],
    [
      "exemplo",
      "Na prática: a semana da Maria Alice",
      `A Maria Alice trabalha das 8h às 14h, tem curso técnico terça e quinta à noite, e aula aos sábados de manhã. Ela vivia esquecendo prazos e chegou a perder a entrega de um trabalho. Montou o sistema num domingo à noite, em vinte minutos.

**Ferramentas:** Google Keep para a lista e Google Agenda para o que tem hora. Só isso, os dois no celular, gratuitos.

**Domingo, 20h — a revisão semanal (15 min).** Abriu o Keep e olhou o que tinha ficado da semana anterior. Riscou duas coisas que já não faziam sentido. Olhou a agenda da semana que vem: prova de logística na quinta, entrega da planilha de estoque na sexta, consulta no dentista na quarta às 16h.

Escolheu as três prioridades da semana: **estudar para a prova, entregar a planilha, e organizar os documentos do curso.**

**A lista dela, no Keep:**

*Hoje (segunda):*
- Pedir os dados de entrada ao setor de compras (para a planilha)
- Ler o resumo do capítulo 4 (40 min, à noite)

*Esta semana:*
- Montar a planilha de estoque — quarta
- Simulado de logística — quarta à noite
- Revisar os pontos errados — quinta de manhã, no ônibus
- Levar RG e comprovante para a secretaria do curso — sábado

*Depois:*
- Atualizar o currículo com o curso novo
- Pesquisar curso de Excel intermediário

**No Google Agenda:** aula terça e quinta 19h, dentista quarta 16h, prova quinta 19h, **e um lembrete na terça às 8h: "planilha vence sexta — os dados chegaram?"**

Foi esse lembrete que salvou a semana. Na terça de manhã ela viu que o compras não tinha respondido, cobrou na hora, e os dados chegaram na quarta. Sem o lembrete, ela descobriria na sexta — quando já não daria tempo.

**Sexta, 17h.** Planilha entregue, prova feita, documentos entregues no sábado. E o mais importante: ela passou a semana sem aquela sensação de estar esquecendo alguma coisa.`,
    ],
    [
      "dica",
      "Erro comum: o sistema grande demais para durar",
      `Quase todo mundo começa a se organizar do jeito errado, e o erro é sempre o mesmo: **começar grande demais**.

O roteiro é previsível. A pessoa se empolga, baixa três aplicativos, assiste a vídeos sobre método de produtividade, monta um sistema com etiquetas coloridas, cinco categorias e um quadro bonito. Funciona por seis dias. Na primeira semana corrida, manter o sistema vira mais trabalho que as tarefas — e ele é abandonado inteiro. Aí vem a conclusão errada: "não sou uma pessoa organizada".

Você é. O sistema é que era grande demais.

**Comece com o mínimo:** uma lista, com data e três níveis de prioridade. Use por duas semanas. Só acrescente algo quando sentir falta de verdade — e nunca porque viu alguém usando.

**Outros quatro tropeços frequentes:**

**Listas espalhadas.** Uma no papel, uma no Keep, uma no WhatsApp para você mesma, uma na cabeça. Escolha um lugar e leve tudo para lá.

**Anotar e nunca olhar.** Lista que não é aberta é diário, não é sistema. Amarre a consulta a um momento fixo do dia: ao acordar, no ônibus, ao chegar no trabalho.

**Lista de "Hoje" com doze itens.** Você termina o dia com metade feita e a sensação de fracasso, mesmo tendo trabalhado bastante. Três itens. No máximo três.

**Abandonar tudo depois de uma semana ruim.** Vai ter semana em que nada funciona — doença, imprevisto, cansaço. Isso não quebra o sistema. Na revisão semanal seguinte, você recomeça. **Um sistema de organização não é uma prova que dá para reprovar; é uma ferramenta que está lá quando você voltar.**

E o lembrete final: o objetivo não é fazer mais coisas. É parar de carregar tudo na cabeça o tempo todo. Se no fim da semana você está menos ansiosa, o sistema está funcionando — mesmo que a lista não tenha sido zerada. Ninguém zera a lista.`,
    ],
    [
      "resumo",
      "Recapitulando antes da atividade",
      `O que levar deste módulo:

- Você não esquece por ser desorganizada. Esquece porque está **guardando tudo na memória**.
- **Peça 1 — uma lista só**, num lugar que esteja sempre com você. Tarefa nova entra na hora em que aparece.
- **Regra dos dois minutos:** se leva menos de dois minutos, faça agora.
- **Peça 2 — data.** Tarefa sem dia específico é tarefa adiada para sempre.
- Calendário é o que tem **hora marcada**; lista é o que precisa ser feito. Não misture.
- Coloque **lembrete um ou dois dias antes** de prazos importantes — é o que dá tempo de reagir.
- **Peça 3 — prioridade** em três níveis: Hoje, Esta semana, Depois. **No máximo 3 itens em Hoje.**
- Tarefa grande vira várias pequenas e concretas. "Estudar" não é tarefa; "ler o capítulo 3" é.
- **Peça 4 — revisão semanal de 15 minutos**, em dia fixo. É ela que faz o sistema durar.
- **Blocos curtos de foco** com o celular longe rendem mais que maratonas distraídas.
- Comece com o **mínimo**. Sistema complicado não sobrevive à primeira semana corrida.
- Semana ruim não quebra o sistema. Você recomeça na revisão seguinte.

E proteja o descanso: numa rotina de trabalho mais curso, dormir bem não é luxo — é o que permite chegar até o fim.`,
    ],
  ],
};

const ATIVIDADES = {
  "Organizando arquivos e pastas": [
    {
      enunciado:
        "Você baixou o comprovante de matrícula do seu curso e quer achar esse arquivo daqui a um mês. Qual nome ajuda mais?",
      alternativas: [
        ["comprovante-matricula-curso.pdf", true],
        ["documento1.pdf", false],
        ["novo (2).pdf", false],
        ["aaaaa.pdf", false],
      ],
    },
    {
      enunciado: "Pra que serve criar pastas no celular ou no computador?",
      alternativas: [
        ["Pra juntar num lugar só os arquivos que têm a ver um com o outro, e achar tudo depois", true],
        ["Pra deixar o aparelho mais rápido", false],
        ["Pra apagar sozinho os arquivos antigos", false],
        ["Pra proteger o aparelho de vírus", false],
      ],
    },
  ],
  "Escrevendo um e-mail profissional": [
    {
      enunciado:
        "Você vai mandar um e-mail perguntando o horário do treinamento. Qual assunto ajuda mais quem vai ler?",
      alternativas: [
        ["Dúvida sobre o horário do treinamento", true],
        ["oi", false],
        ["URGENTE!!!!! responde", false],
        ["Deixar o assunto em branco", false],
      ],
    },
    {
      enunciado: "Qual é a ordem das cinco partes do corpo de um e-mail formal, como vimos na lição?",
      alternativas: [
        ["Saudação, contexto, motivo da mensagem, pedido claro e despedida", true],
        ["Pedido, saudação, contexto, despedida e motivo", false],
        ["Despedida, motivo, contexto, saudação e pedido", false],
        ["Só o pedido — o resto não precisa", false],
      ],
    },
  ],
  "Introdução a planilhas": [
    {
      enunciado: "Numa planilha, o que é uma 'célula'?",
      alternativas: [
        ["Cada quadradinho da tabela onde você digita uma informação", true],
        ["O arquivo inteiro da planilha", false],
        ["Um tipo de gráfico colorido", false],
        ["O nome do programa de planilhas", false],
      ],
    },
    {
      enunciado:
        "Você anotou os gastos da semana, um embaixo do outro, e quer saber o total. O que a planilha faz por você?",
      alternativas: [
        ["Soma a coluna automaticamente, sem você precisar de calculadora", true],
        ["Nada: é preciso somar na calculadora e digitar o resultado", false],
        ["Só soma se você souber programar", false],
        ["Só soma na versão paga", false],
      ],
    },
  ],
  "O que é inteligência artificial (sem enrolação)": [
    {
      enunciado: "Depois da explicação, qual frase descreve melhor o que é inteligência artificial?",
      alternativas: [
        ["Uma ferramenta de computador que aprendeu com muitos exemplos e ajuda em tarefas do dia a dia", true],
        ["Um robô que pensa e sente igual a uma pessoa", false],
        ["Um programa que só cientistas conseguem usar", false],
        ["Um site de buscas igual a qualquer outro", false],
      ],
    },
    {
      enunciado:
        "Uma colega diz: 'isso de IA não é pra mim, é coisa de quem trabalha com tecnologia'. O que a lição responde pra ela?",
      alternativas: [
        ["Que IA é só mais uma ferramenta, e qualquer pessoa pode aprender a usar no seu ritmo", true],
        ["Que ela tem razão e é melhor nem tentar", false],
        ["Que só dá pra usar com um computador muito caro", false],
        ["Que é preciso fazer faculdade antes de usar", false],
      ],
    },
  ],
  "Usando IA para resumir e estudar": [
    {
      enunciado: "Você tem um texto grande da apostila e pouco tempo. Como a IA pode te ajudar?",
      alternativas: [
        ["Fazendo um resumo com os pontos principais, pra você estudar a partir dele", true],
        ["Estudando no seu lugar e fazendo a prova por você", false],
        ["Apagando o texto pra você não precisar ler", false],
        ["Não ajuda: IA só serve pra escrever textos novos", false],
      ],
    },
    {
      enunciado: "A IA explicou um assunto, mas teve uma parte que você não entendeu. Qual é a melhor atitude?",
      alternativas: [
        ["Pedir pra ela explicar de novo, mais simples e com um exemplo do dia a dia", true],
        ["Copiar do jeito que veio, mesmo sem entender", false],
        ["Desistir do assunto: se não entendeu de primeira, é difícil demais", false],
        ["Apagar a conversa e nunca mais perguntar", false],
      ],
    },
  ],
  "Criando pedidos (prompts) simples e úteis": [
    {
      enunciado: "Qual desses pedidos tem mais chance de trazer uma resposta útil?",
      alternativas: [
        ["'Escreva um e-mail curto e educado pedindo pra remarcar a reunião de sexta'", true],
        ["'me ajuda'", false],
        ["'texto'", false],
        ["'faz aí pra mim'", false],
      ],
    },
    {
      enunciado: "Segundo a lição, o que faz um pedido para a IA ser bom?",
      alternativas: [
        ["Dizer com clareza o que você quer, pra quem é e como a resposta deve ser", true],
        ["Ser bem comprido — quanto mais palavras, melhor", false],
        ["Usar palavras técnicas difíceis pra IA levar a sério", false],
        ["Escrever tudo em letras maiúsculas", false],
      ],
    },
  ],
  "Currículo e perfil online básico": [
    {
      enunciado: "Você ainda não teve emprego registrado. O que colocar no currículo?",
      alternativas: [
        ["Cursos, trabalhos voluntários e as coisas que você já sabe fazer", true],
        ["Deixar quase tudo em branco e esperar a primeira vaga", false],
        ["Inventar uma experiência que você não teve", false],
        ["Só o nome e o telefone, o resto não importa", false],
      ],
    },
    {
      enunciado: "Qual endereço de e-mail passa uma imagem mais profissional num currículo?",
      alternativas: [
        ["maria.alice.silva@email.com", true],
        ["gatinha_do_role@email.com", false],
        ["naoseioquecolocaraqui@email.com", false],
        ["Nenhum: currículo não precisa de e-mail", false],
      ],
    },
  ],
  "Reuniões online sem susto": [
    {
      enunciado: "A reunião vai começar e você não vai falar agora. Qual é a boa prática?",
      alternativas: [
        ["Deixar o microfone no mudo, pra não entrar barulho de casa na chamada", true],
        ["Deixar o microfone aberto o tempo todo", false],
        ["Sair e entrar de novo várias vezes", false],
        ["Desligar a internet até chegar a sua vez", false],
      ],
    },
    {
      enunciado:
        "Você tem uma dúvida, mas está com vergonha de falar na frente de todo mundo. O que a reunião online oferece?",
      alternativas: [
        ["O chat, pra você escrever a pergunta sem precisar abrir o microfone", true],
        ["Nada: só dá pra perguntar falando", false],
        ["O botão de aumentar o volume", false],
        ["O botão de desligar a câmera, que envia a pergunta", false],
      ],
    },
  ],
  "Organizando sua rotina de estudo e trabalho": [
    {
      enunciado: "Você vive esquecendo os prazos das tarefas. Qual é a saída mais simples que a lição sugere?",
      alternativas: [
        ["Anotar cada tarefa com o prazo numa lista ou no calendário do celular", true],
        ["Confiar só na memória e torcer pra lembrar", false],
        ["Deixar tudo pra última hora, que rende mais", false],
        ["Pedir pra outra pessoa lembrar por você", false],
      ],
    },
    {
      enunciado: "Qual é um bom jeito de começar a se organizar sem se sobrecarregar?",
      alternativas: [
        ["Escolher uma ferramenta simples e anotar poucas tarefas por dia", true],
        ["Baixar dez aplicativos de organização de uma vez", false],
        ["Planejar o ano inteiro numa tarde só", false],
        ["Esperar sobrar bastante tempo livre pra só então começar", false],
      ],
    },
  ],
};

module.exports = { TRILHAS, SECOES, ATIVIDADES };
