# Jovem Aprendiz Digital

Plataforma de aprendizado de tecnologia básica para jovens aprendizes de Maceió — projeto da disciplina de Interação Humano-Computador (IHC).

**Sistema no ar:** https://jovem-aprendiz-digital.onrender.com/

## Roteiro rápido de navegação (30 segundos)

1. **Apresentação** — a própria URL acima abre a tela de apresentação do sistema, com a proposta, as três trilhas e o link para criar conta.
2. **Criar conta** — botão "Criar minha conta" na apresentação, ou direto em `/cadastro.html`. Leva alguns segundos: nome, e-mail e senha.
3. **Login** — botão "Entrar" no topo da apresentação, ou direto em `/login.html`, para quem já tem conta.
4. **Painel (dashboard)** — primeira tela após o login: resumo de progresso e acesso às três trilhas (Primeiros Passos no Computador, Ferramentas de IA no Dia a Dia, Pronta para o Mercado de Trabalho).
5. **Trilhas** — ao abrir uma trilha, cada módulo mostra o conteúdo em seções curtas (introdução, explicações, exemplo, dica, resumo) seguidas de uma atividade de múltipla escolha que conclui o módulo automaticamente ao acertar tudo.
6. **Mural da comunidade** — aba "Comunidade" na barra inferior (mobile) ou barra secundária (desktop): posts da turma com respostas em thread.

A barra de navegação fica fixa na parte inferior da tela no celular (a persona do projeto usa o sistema majoritariamente pelo smartphone) e vira uma barra normal logo abaixo do cabeçalho em telas maiores.

## Stack técnica (resumo)

- **Front-end:** HTML, CSS e JavaScript puro — sem framework, sem build step.
- **Back-end:** Node.js com módulos nativos (`http`), sem Express.
- **Banco de dados:** SQLite via libSQL, hospedado no Turso.
- **E-mail transacional:** Resend (verificação de conta e redefinição de senha).
- **Deploy:** Render.

Detalhes de arquitetura, modelo de dados e rotas da API estão no [`README_TECNICO.md`](README_TECNICO.md).

## Acessibilidade

O front-end foi construído e auditado para **WCAG 2 nível AA**:

- **Lighthouse:** pontuação 100 de acessibilidade em todas as páginas (relatórios salvos em [`auditorias/`](auditorias/)).
- **axe-core:** 0 violações em todas as páginas do sistema.
- Estrutura semântica, navegação completa por teclado, foco sempre visível, contraste calibrado (≥ 4.5:1), skip link, e feedback que nunca depende só de cor.

O detalhamento critério a critério — o que foi verificado e como — está em [`DOCUMENTACAO_IHC.md`](DOCUMENTACAO_IHC.md).

## Para aprofundar

- [`DOCUMENTACAO_IHC.md`](DOCUMENTACAO_IHC.md) — decisões de design, rastreabilidade entre o Board UX (persona Maria Alice) e as funcionalidades, conformidade WCAG 2 AA critério a critério, e princípios de Norman aplicados.
- [`AUDITORIA_UX.md`](AUDITORIA_UX.md) — diagnóstico de UX que originou os ajustes de conteúdo.
- [`README_TECNICO.md`](README_TECNICO.md) — arquitetura, setup local, modelo de dados e rotas da API.
