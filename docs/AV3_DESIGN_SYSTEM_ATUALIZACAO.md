# 3ª AV — Design system: o que entrou e o que mudou

Este documento complementa o design system da 2ª AV (`documentacao-av2/index.html`). Tudo aqui existe no código (`public/css/style.css`) e foi medido.

## 1. Contrastes verificados (fórmula de luminância da WCAG 2)

Texto normal exige 4,5:1; elementos de interface (bordas de campo, ícones) exigem 3:1.

| Par | Uso | Razão | Mínimo | Resultado |
|---|---|---|---|---|
| `--border-campo` #7B8BA1 sobre branco | Borda de campo e alternativa (**novo**) | 3,47:1 | 3:1 | Passa |
| `--border` #E2E8F0 sobre branco | Antes usado nas bordas de campo | 1,23:1 | 3:1 | Reprovava; agora só decora cartões |
| `--erro-ink` #9F1239 sobre `--erro-bg` #FFE4E6 | Mensagem de erro | 6,68:1 | 4,5:1 | Passa |
| `--erro` #BE123C sobre branco | Borda de campo com erro | 6,29:1 | 3:1 | Passa |
| `--teal` #0F766E sobre branco | Anel de foco (3px) | 5,47:1 (5,05:1 sobre o fundo `--bg`) | 3:1 | Passa |

Os demais pares da paleta continuam na tabela da 2ª AV.

## 2. Tipografia

- Família: **Nunito** (Google Fonts), pesos 600, 800 e 900, com reserva `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`.
- Escala em `rem` (respeita zoom e fonte do aparelho): 12 / 14 / 17 / 20 / 24 / 30 / 34 px (`--fs-xs` a `--fs-2xl`).
- Corpo em 17px (acima de 16px, o iOS não dá zoom ao focar o campo). Nenhum texto de leitura abaixo de 14px.
- Altura de linha: 1,2 (título), 1,4 (interface), 1,55 (corpo), 1,65 (leitura longa).

## 3. Espaçamentos

Escala de 8: 4 · 8 · 12 · 16 · 24 · 32 · 48 px (`--s1` a `--s7`). Raios: 12 · 14 · 16 · 18 · 24 · 28 px.

## 4. Componentes e estados

| Componente | Normal | Hover | Foco | Desabilitado | Erro | Sucesso |
|---|---|---|---|---|---|---|
| Botão principal (`.btn-primary`) | coral, sombra inferior | escurece 5% | contorno teal 3px | opacidade 55% | n/a | n/a |
| Botão secundário (`.btn-secondary`) | branco com borda | borda teal | contorno teal 3px | opacidade 55% | n/a | n/a |
| Campo (`input`, `textarea`) | borda `--border-campo` | n/a | borda teal + contorno 3px | n/a | borda `--erro` **+ mensagem com ícone** (`.campo-erro`) | n/a |
| Alternativa da atividade (`.alternativa`) | cartão com borda `--border-campo` | n/a | contorno teal 3px | n/a | ícone "X" + "Revise esta resposta" | ícone de check + explicação |
| Alerta de formulário (`.erro-msg`, `.sucesso-msg`) | n/a | n/a | n/a | n/a | fundo rosa + ícone | fundo verde + ícone |
| Cartão (`.card`) | branco com borda | n/a | n/a | n/a | n/a | n/a |

Toda área de toque tem pelo menos 44×44px (medido em todas as telas).

### Componentes novos na 3ª AV

| Componente | Classe | Regras |
|---|---|---|
| Erro de campo | `.campo-erro` | Ícone + texto abaixo do campo; o campo recebe `aria-invalid="true"` e `aria-describedby` |
| Página 404 | `.pagina-404` | Ícone, código, título, explicação e dois caminhos de saída |
| Estado vazio | `.vazio` | Ícone centralizado acima do texto; texto convida a agir |
| Carregando | `.esqueleto` | Blocos cinza no formato do conteúdo; `aria-busy` e texto "Carregando..." para leitor de tela |
| Erro de carregamento | `.estado-erro` | Mensagem + botão "Tentar de novo" |
| Confirmação | `.sucesso-msg` com `role="status"` | Ex.: "Publicado! Sua mensagem já está no mural da turma." |

## 4.1 Estados de tela (capturas)

`auditorias/av3-validacao/depois/`: `comunidade-estado-vazio-*`, `comunidade-estado-erro-*`, `comunidade-estado-carregando-*`, `comunidade-publicado-mobile`, `form-login-erro-mobile`, `form-cadastro-erro-mobile`, `404-*`.

## 5. Figma e código

**Pendente.** O protótipo da 2ª AV foi o próprio sistema web (a professora aceitou). A 3ª AV pede componentes no Figma usados de verdade nas telas. Ao montar o arquivo, use exatamente os tokens da seção 1 a 3 (nome por nome) e as variantes da tabela da seção 4, para que Figma e código fiquem iguais.
