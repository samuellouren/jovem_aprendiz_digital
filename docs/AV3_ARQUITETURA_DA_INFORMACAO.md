# 3ª AV — Arquitetura da informação

## 1. Mapa do site

```mermaid
flowchart TD
  H["/ Apresentação"]
  L["/login.html Entrar"]
  C["/cadastro.html Criar conta"]
  ES["/esqueci-senha.html Esqueci minha senha"]
  RS["/redefinir-senha.html Nova senha (link do e-mail)"]
  VE["/verificar-email.html Confirmar e-mail (link do e-mail)"]
  D["/dashboard.html Início: trilhas e progresso"]
  T["/trilha.html Trilha: lista de módulos"]
  M["Módulo: seções, uma por vez"]
  A["Atividade do módulo"]
  CO["/comunidade.html Mural e respostas"]
  E404["404 Página não encontrada"]
  H --> L
  H --> C
  L --> ES --> RS --> L
  C --> VE
  L --> D
  C --> D
  D --> T --> M --> A
  A -->|acertou tudo| T
  A -->|errou| A
  D --- CO
  M -.->|Ficou com dúvida?| CO
  E404 --> D
  E404 --> CO
```

Menu principal (barra inferior no celular, lateral no computador): **Início** e **Comunidade**, mais o botão **Sair**. Duas opções só, de propósito: o público tem pouca experiência além do celular e o conteúdo é finito.

## 2. Fluxograma da tarefa principal: concluir um módulo

```mermaid
flowchart TD
  I(["Início"]) --> L{"Tem conta?"}
  L -->|não| C["Criar conta"] --> D
  L -->|sim| E["Entrar"] --> OK{"Dados corretos?"}
  OK -->|não| ERR["Erro junto do campo, com como resolver"] --> E
  OK -->|sim| D["Início: escolher trilha"]
  D --> T["Trilha: escolher módulo"]
  T --> M["Ler seções: Continuar"]
  M --> A["Responder atividade"]
  A --> V{"Todas respondidas?"}
  V -->|não| AV["Aviso: escolha uma resposta em cada pergunta"] --> A
  V -->|sim| R{"Acertou tudo?"}
  R -->|não| X["Explicação de cada resposta + Refazer atividade"] --> A
  R -->|sim| F(["Módulo concluído"])
```

Todos os becos sem saída foram eliminados: a 404 oferece "Voltar para o início" e "Pedir ajuda na comunidade"; o erro de carregamento oferece "Tentar de novo".

## 3. Rótulos: o que o usuário lê

| Rótulo | Por que está assim |
|---|---|
| Início | Palavra do dia a dia no lugar de "Dashboard" (a página se chama dashboard só no endereço) |
| Comunidade | Nome simples, sem termo técnico |
| Módulos da trilha | "Módulo" é o termo usado em cursos que o público já conhece |
| Começar / Concluído | Estado escrito, não só ícone |
| Pergunte para a turma | Linguagem de convite, não de sistema |

## 4. Card sorting e teste de árvore (precisam de pessoas)

Materiais prontos em `docs/AV3_KIT_TESTES.md` (seções 4 e 5). Abaixo, o espaço para o resultado. **Não preencha com dados inventados**: a 2ª AV foi criticada justamente por falta de teste real.

### Resultado do card sorting
- Participantes: _[preencher]_
- Agrupamentos mais comuns: _[preencher]_
- O que mudou no menu por causa disso: _[preencher]_

### Resultado do teste de árvore
| Tarefa | Acertos / participantes | Caminho mais escolhido | Mudança feita |
|---|---|---|---|
| _[preencher]_ | | | |
