# Redesign do site do Jeni Ateliê

Data: 17/10/2026 · Projeto: `jeni-atelie/` (Vite + React 19 + TypeScript + Tailwind 4 + framer-motion + Lenis, HTML pré-renderizado no build)

## 1. Por quê

A versão atual do site passa uma imagem séria, escura e "realista demais", com fundo cacau, fotos genéricas de banco de imagem, papelaria e cartas. Ela não abre o apetite. O cliente quer que quem chegue ao site **sinta vontade de comprar para comer**: um mundo de doces **fofo e premium**, claro, colorido e fluido, com animações.

Referências que o cliente escolheu: **FIX Dessert Chocolatier** (cada produto é o herói, com cor própria e um carrossel de vitrine) e **Bernice Bakery** (fundo claro, poucas cores vivas, tipografia arredondada, fotos em arco, selos redondos colados e texto em curva).

## 2. Objetivos

- Fazer o visitante querer pedir: fotos apetitosas, preços claros e caminho curto até o WhatsApp.
- Mostrar o cardápio inteiro, com sabores e preços, de forma que dá prazer navegar.
- Visual claro, vivo, fofo e premium, com formas arredondadas e animações fluidas (sem "interface de caixas").
- Bom SEO local: cardápio como dado estruturado, textos e alt das fotos em português, página rápida.

## 3. Não objetivos

- Pagamento online e checkout. O pedido termina no WhatsApp.
- Integração real com iFood e 99Food (estão fechados; entram só como "em breve").
- Painel para a Jeni editar o cardápio. O conteúdo fica em `src/content.ts`.
- Outras páginas. Continua sendo uma página só.

## 4. Antiobjetivos (fracasso mesmo que "funcione")

- Voltar a parecer escuro, sério ou editorial (papelaria, cartas, cacau como fundo).
- Interface "caixificada": cartões de canto reto enfileirados e grade de ícones.
- Fotos que mostrem doces que não são os da Jeni como se fossem dela. Fotos de internet servem só como referência para gerar novas.
- Animação que atrapalha a leitura ou o pedido, ou que ignora "reduzir movimento".
- Texto com cara de IA (frases-clichê, "não é X, é Y", tríades forçadas).

## 5. Identidade visual (decidida)

A logo (selo redondo cobre sobre papel, com "Jeni" em script) serve **só para identificar a marca**. Ela aparece pequena, como assinatura (na barra de navegação e no rodapé), e não dita as cores da página.

**Direção A, "Morango & caramelo"** (escolhida pelo cliente). As cores são análogas e quentes, partindo do cobre da logo:

| Papel | Cor |
|---|---|
| Fundo da página | creme-baunilha `#FFF4EC` |
| Ação (botões, destaques) | rosa-morango `#E8466B` |
| Rosa claro (etiquetas, superfícies) | `#FFD9DF` |
| Caramelo (o cobre da logo, mais vivo) | `#D8843E` |
| Selos e brilhos | amarelo-manteiga `#FFC94D` |
| Texto | chocolate `#3A1D14` (nunca preto) |

Cada grupo do cardápio pode ter um tom próprio derivado dessa paleta (pote em caramelo claro, coxinha em rosa, pudim em manteiga, surpresa de uva num lilás discreto, como no esboço). O texto precisa manter contraste AA sobre todos esses fundos.

**Tipografia:** Fraunces (variável, eixo SOFT no máximo e WONK ligado) nos títulos, que é uma serifa arredondada e fofa. Figtree no texto corrido e na interface. Auto-hospedadas via `@fontsource`, como no projeto atual.

**Formas:** fotos em **arco** (topo redondo), etiquetas e botões em **pílula**, **selos redondos** inclinados colados sobre as fotos e cartões com raio grande. Botão principal em pílula com a seta dentro de um círculo, padrão que já existe no projeto (`Cta`).

## 6. Estrutura da página (aprovada pelo esboço)

Esboço de referência: `.superpowers/brainstorm/1972-1792254883/content/structure-v2.html`.

1. **Barra de navegação:** pílula branca flutuante com "Jeni Ateliê", links (Cardápio, Encomendas, Como pedir) e o botão "Pedir".
2. **Capa:** título grande em Fraunces, com a segunda linha em rosa-morango, e uma frase de apoio. Botões "Ver o cardápio" (principal) e "Chamar no WhatsApp" (secundário). Selos "iFood · em breve" e "99Food · em breve". A foto da capa fica num arco, com selos colados ("feito essa semana", "a partir de R$ 14").
3. **Faixa de sabores:** fita rosa-morango, levemente inclinada, com nomes dos doces separados por um pequeno ornamento, correndo devagar e parando no hover.
4. **Cardápio (vitrine):** título ("O que tem pra hoje" ou similar) e abas por grupo. Cada grupo é um cartão de cor própria com a foto em arco e a lista de sabores e preços. Tocar num sabor coloca o item na sacolinha. Ao trocar de aba, a foto e a cor mudam com transição. No celular, os grupos viram um carrossel de arrastar.
5. **Sacolinha:** barra presa ao pé da tela, que aparece no primeiro item. Mostra a contagem, o resumo e o total, e tem o botão "Enviar pedido no WhatsApp". A mensagem vai pronta, com os itens, as quantidades, o total e o pedido de data.
6. **Bolos inteiros sob encomenda:** a pessoa escolhe o tamanho em chips e o botão "Encomendar meu bolo" abre o WhatsApp com a mensagem pedindo data, sabor e tamanho.
7. **Como pedir:** três passos curtos (pede pelo WhatsApp, a Jeni confirma o dia, retira ou recebe) e os selos do iFood e do 99Food "em breve".
8. **Quem faz:** recado curto da Jeni com uma foto real dela ou dos potes.
9. **Dúvidas:** perguntas que abrem com mola.
10. **Rodapé:** selo grande, contatos, horários e créditos.

## 7. Cardápio (conteúdo real, do cliente)

| Grupo | Item | Preço |
|---|---|---|
| Brownies | Tradicional | R$ 15 |
| | Ferrero Rocher | R$ 22 |
| | Ninho | R$ 20 |
| | 50% Cacau | R$ 18 |
| Bolos de pote | Chocolate com maracujá | R$ 22 |
| | Massa branca com maracujá | R$ 22 |
| | Ninho com morango | R$ 20 |
| | Chocolate belga | R$ 20 |
| | Cenoura com chocolate | R$ 22 |
| | Prestígio | R$ 20 |
| | Bolo de pudim | R$ 20 |
| Fatias | Chocolate com maracujá | R$ 15 |
| | Ninho com morango | R$ 18 |
| | Torta de maracujá | R$ 14 |
| | Pudim | R$ 16 |
| | Banoffee | R$ 18 |
| Coxinhas de morango | Chocolate belga | R$ 20 |
| | Ninho com Nutella | R$ 20 |
| | Ferrero Rocher | R$ 22 |
| Unitários | Surpresa de uva | R$ 15 |
| | Morango cravejado | R$ 18 |
| Salgado | Empadão de frango | R$ 18 |
| Sob encomenda | Bolos inteiros | sem preço fixo |

Os nomes dos grupos e a ordem das abas ficam a critério de quem constrói. O esboço usou: Bolos de pote, Brownies, Fatias, Coxinhas de morango, Pudim e surpresas, Salgado.

## 8. Imagens

- **Prioridade para fotos reais da Jeni, tratadas:** remover o fundo, corrigir luz, cor e enquadramento e aplicar sobre a paleta. Em uso: `C:\Users\T-GAMER\AppData\Local\Temp\claude\C--Github-jeni-atelie-doces\98a37d26-5f86-4298-b563-b28ed60271b2\images\` (2, 7, 9, 10 e 14). Essas fotos devem ser copiadas para o projeto antes de a pasta temporária sumir.
- **Fotos geradas no Gemini** a partir de referências (`Fotos Gemini/` na raiz do repositório): banoffee, coxinhas, surpresa de uva (versão de travessa), brownies, capa (horizontal), torta de maracujá, bolo de pote, pudim, fatia e empadão. Têm cerca de 765×1024 px, e a capa tem 1024×572. Os nomes de arquivo são aleatórios; o mapa de qual arquivo é qual doce está em `.superpowers/brainstorm/1972-1792254883/content/` (arquivos `g-*.jpg`).
- **Faltam:** o bolo inteiro (prompt pronto em `docs/prompts-gemini.md`, item 8) e o morango cravejado (sem foto por enquanto; o item aparece no cardápio sem foto própria).
- **Tratamento das fotos reais (decisão do construtor):** o recorte e o tratamento são feitos no próprio projeto, com remoção de fundo automática (por exemplo `rembg`) e ajustes de luz e cor. A foto também deve perder o carimbo de data, a mão e a toalha de Natal. Se o recorte ficar ruim, o grupo usa a versão do Gemini do mesmo doce, e a foto real vai para a seção "Quem faz", inteira e só enquadrada no arco.
- **Resolução (decisão do construtor):** as fotos do cardápio (~765 px de largura) atendem cartões de até ~380 px exibidos. A capa (1024×572) é horizontal: a moldura da capa deve ser um arco largo e horizontal (ou cápsula), sem recorte vertical. Se depois houver capa maior, troca-se o arquivo.
- **Bolo inteiro sem foto (decisão do construtor):** a seção vai ao ar com uma composição gráfica no lugar da foto (selo grande, forma de bolo desenhada na paleta) e troca para a foto quando ela for gerada com o prompt 8.
- **Fotos de internet** que o cliente mandou servem só de referência e não vão para o site.
- Todas as imagens: webp responsivo (já há `vite-imagetools` no projeto), `alt` descritivo em português e carregamento preguiçoso fora da capa. Uma nota discreta no rodapé informa que algumas fotos são ilustrativas.
- As fotos de banco usadas hoje (framboesas, chocolate, Wikimedia) e a seção de créditos saem do site.

## 9. Pedido e canais

**Disponibilidade e prazo (do cliente):** os doces do cardápio ficam em estoque para pronta-entrega. Bolos grandes e doces fora de estoque são feitos sob encomenda, com antecedência que varia conforme o doce.

- *Decisão do construtor:* o site não mostra estoque em tempo real. Os textos dizem "pronta-entrega enquanto durar o estoque" e, nas encomendas, "o prazo depende do doce; a Jeni confirma no WhatsApp". A mensagem da sacolinha termina com "Pode ser para quando? Se algum sabor tiver acabado, combinamos uma data." Por isso a capa não deve prometer "o que tem pra hoje" como garantia: use algo como "Feito toda semana" ou "Pronta-entrega e encomendas".

**Retirada e entrega (do cliente):** dá para retirar ou receber em casa, **sem taxa de entrega** e **sem pedido mínimo**. A área atendida é a **Vila Cosmopolita** (CEP 08421-135, zona leste de São Paulo) e o **Tatuapé**.

- *Decisão do construtor:* o CEP não é publicado; o site mostra só os nomes dos bairros. A sacolinha não precisa escolher retirada ou entrega: a mensagem pergunta "Retirar ou receber em casa?". O selo "entrega grátis na Vila Cosmopolita e no Tatuapé" entra na capa ou em "Como pedir". O antigo "mínimo de 25 unidades" sai.


- O WhatsApp é o canal principal. Todo botão de pedido leva para lá com a mensagem já escrita.
- Os selos do iFood e do 99Food aparecem com "em breve", sem link. Quando reabrirem, basta trocar a configuração em `content.ts`.
- A sacolinha substitui o atual "Monte sua caixa" e fica disponível só para os itens com preço. O bolo inteiro abre a conversa própria (seção 6.6).

## 10. Movimento

- Rolagem suave (Lenis), entradas que sobem, aparecem e saem de um leve desfoque, botões magnéticos e a curva única do projeto. Tudo isso já existe e deve ser reaproveitado.
- **Momentos assinatura:**
  - foto da capa que cresce de dentro do arco;
  - selos que "colam" com um pulinho;
  - faixa correndo;
  - troca de aba do cardápio com a foto girando e a cor deslizando;
  - número da sacolinha que quica;
  - perguntas que abrem com mola.
- Todo movimento usa só transform e opacidade e respeita "reduzir movimento": o conteúdo continua visível, só a viagem some.

## 11. SEO

- `title` e `description` focados em "doces de pote", "bolo de pote", "confeitaria" e "Jeni Ateliê", com os bairros (Vila Cosmopolita, Tatuapé, zona leste de São Paulo).
- JSON-LD com `areaServed` nos dois bairros.
- JSON-LD `Bakery` com o cardápio real em `hasMenu` (`Menu`, `MenuSection` e `MenuItem` com `offers` e preço em BRL), horários e telefone.
- Open Graph com uma imagem nova, na cara da direção A.
- HTML pré-renderizado (já existe), `alt` em português, `sitemap.xml` e `robots.txt`.

## 12. Restrições e o que se mantém

- Mesma base técnica e mesmas práticas de acessibilidade que já passaram na auditoria:
  - foco visível;
  - alvos de toque de 44 px;
  - região viva para anúncios;
  - `inert` na navegação escondida;
  - menu com foco preso;
  - VLibras e Sienna carregados depois da página.
- Deploy estático (`dist/`, `wrangler.jsonc` para Cloudflare).
- Continuam como exemplo a confirmar: número do WhatsApp, e-mail, Instagram, domínio, horários e as respostas das dúvidas. O bairro deixa de ser exemplo: Vila Cosmopolita e Tatuapé, em São Paulo (zona leste); "Vila Mariana", da versão antiga, sai.

## 13. Fica a critério de quem constrói

- Textos finais (título da capa, frases, recado da Jeni, dúvidas), seguindo a voz fofa e premium e a skill de copywriting.
- Ornamento da faixa, desenho exato dos selos e raios.
- Componentes visuais: o que reaproveitar da versão atual e o que reescrever.
- Ordem das abas e nomes dos grupos.
