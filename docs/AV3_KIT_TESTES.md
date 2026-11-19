# 3ª AV — Kit para os testes com pessoas

Tudo que dependia só de você já foi feito. O que sobra precisa de gente de verdade, e a 2ª AV perdeu pontos por "não realizaram o teste de usuários". Este kit deixa cada teste pronto para rodar. Plano de uma rodada só: **5 pessoas × ~20 minutos**, com gravação de tela (Xbox Game Bar no Windows: Win + Alt + R; ou o gravador do celular).

Quem chamar: colegas de turma, família, grupo do WhatsApp. Se alguém for jovem aprendiz de verdade, melhor. Peça autorização para gravar e não grave rosto se a pessoa preferir.

## 0. Antes de começar
- Deixe o sistema no ar (a URL pública) e uma conta de teste já criada.
- Ficha por pessoa: nome ou apelido, idade, usa mais celular ou computador, experiência com e-mail e planilha (nenhuma / pouca / boa).
- Diga: "Estou testando o sistema, não você. Se algo for difícil, a culpa é do sistema. Pense em voz alta."
- Não ajude. Anote onde a pessoa hesita.

## 1. Teste de 5 segundos (2 minutos por pessoa)
1. Mostre a página inicial (`/`) por **5 segundos** e esconda.
2. Pergunte: "O que é esse sistema?", "Para quem ele é?" e "O que você faria primeiro?".
3. Anote as respostas com as palavras da pessoa.

Resultado esperado: a maioria diz algo como "curso de computador para jovem". Se não, a hierarquia da home precisa de ajuste (título, subtítulo, botão principal).

| Pessoa | "O que é?" | "Para quem?" | "O que faria?" | Entendeu? (sim/em parte/não) |
|---|---|---|---|---|

## 2. Teste A/B simples (5 minutos por pessoa)
Escolha **um único elemento** para variar. Sugestões baseadas no que existe hoje:
- **A:** botão "Começar módulo" / **B:** "Ir para a atividade" no mesmo ponto; ou
- **A:** rótulo do menu "Comunidade" / **B:** "Fale com a turma"; ou
- **A:** botão do cadastro "Criar minha conta" / **B:** "Começar agora".

Como rodar: metade das pessoas vê A, metade vê B (alterne). Meça uma coisa só: quantas clicam certo na primeira tentativa e quanto tempo levam. Conclusão justificada em duas frases ("B teve 4 de 5 acertos contra 2 de 5; ficamos com B porque…"). Com 5 pessoas é um indício, não prova; diga isso na conclusão.

| Versão | Pessoa | Acertou de primeira? | Tempo | Comentário |
|---|---|---|---|---|

## 3. Tarefas de usabilidade com gravação (10 minutos por pessoa)
1. "Crie uma conta e entre."
2. "Encontre o primeiro módulo e comece."
3. "Chegue até a atividade e responda."
4. "Você ficou com uma dúvida. Peça ajuda para a turma."

Para cada tarefa anote: conseguiu? onde hesitou? o que disse? Grave a tela com a voz da pessoa.

## 4. Card sorting aberto (10 minutos)
Cartões (um por papelzinho ou no Miro/Figma):

Entrar · Criar conta · Esqueci minha senha · Confirmar e-mail · Minhas trilhas · Primeiros Passos no Computador · Ferramentas de IA no Dia a Dia · Pronta para o Mercado de Trabalho · Progresso no mini curso · Continue de onde parou · Atividade do módulo · Refazer atividade · Mural da turma · Fazer uma pergunta · Responder alguém · Sair

Peça: "Junte os cartões que combinam e dê um nome para cada grupo." Anote os grupos e os nomes.
Depois compare com o menu atual (Início, Comunidade, Sair). Se vários grupos não cabem em nenhum item do menu, mude o menu e **registre a mudança**: é isso que a professora quer ver.

## 5. Teste de árvore (5 minutos)
Mostre só a árvore de textos (sem desenho):

```
Início
  Continue de onde parou
  Progresso no mini curso
  Trilhas
    Primeiros Passos no Computador
    Ferramentas de IA no Dia a Dia
    Pronta para o Mercado de Trabalho
Comunidade
  Publicar
  Responder
Sair
```

Perguntas: "Onde você clicaria para…"
1. continuar o módulo que parou?
2. aprender a escrever um e-mail?
3. tirar uma dúvida com outras pessoas?
4. sair da conta?
5. ver o quanto já fez?

Anote o primeiro clique de cada pessoa e se foi o certo.

## 6. Leitor de tela (10 minutos, só você)
1. Instale o **NVDA** (gratuito, nvaccess.org) e abra o sistema no Chrome. Grave a tela **com o áudio do computador**.
2. Feche os olhos ou apague a tela (ou apenas não olhe).
3. Cumpra a tarefa inteira: **entrar → abrir o primeiro módulo → ir até a atividade → responder e verificar**.
4. Anote tudo que o NVDA falou de estranho (botão sem nome, ordem estranha, erro não lido).
5. Atalhos úteis: Tab (próximo item), Shift+Tab (anterior), Enter (acionar), H (próximo título), D (próxima região).

## 7. Avaliação heurística cruzada
Troque de sistema com outro grupo. Use as 10 heurísticas de Nielsen e dê **gravidade de 0 a 4** a cada problema (0 = não é problema, 4 = catástrofe). Tabela:

| Problema | Heurística violada | Gravidade (0–4) | Onde | Corrigiu ou justificou? |
|---|---|---|---|---|

Se não houver outro grupo disponível, combine com a professora uma troca com colega de outra equipe.

## 8. Depois dos testes
1. Preencha as tabelas de `AV3_ARQUITETURA_DA_INFORMACAO.md` e `AV3_PORTFOLIO_UX.md`.
2. Para cada problema achado: corrija, tire print do antes e do depois e acrescente ao `AV3_CHANGELOG.md`.
3. Atualize persona e jornada com 2 ou 3 frases reais que as pessoas disseram.
