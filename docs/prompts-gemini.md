# Prompts para gerar as fotos no Google AI Studio (Gemini)

Como usar:

1. Abra https://aistudio.google.com e escolha o modelo de imagem do Gemini.
2. Gere uma imagem por vez: copie o bloco inteiro do item (o estilo já vem junto).
3. Nos itens marcados **"com foto da Jeni"**, anexe a foto indicada antes de enviar o texto.
4. Se gostar, baixe na maior resolução e salve em `C:\Github\jeni-atelie-doces\fotos-gemini\` com o nome indicado.
5. Se não gostar, peça um ajuste na mesma conversa, por exemplo: "mais luz", "fundo mais rosado", "doce maior no quadro" ou "sem o garfo".

Todas as fotos seguem a mesma direção (A, morango e caramelo): fundo creme-baunilha, superfície rosa-clarinho, luz de manhã e cara de doce fresquinho. Os prompts estão em inglês porque o modelo de imagem responde melhor assim.

---

## 1. Capa: `capa.png` (horizontal)

```
Bright, airy, joyful food photography for a cute premium Brazilian home bakery. A generous spread of homemade treats on a soft blush-pink surface (#FFD9DF) against a seamless vanilla-cream background (#FFF4EC): a clear square dessert cup with layers of chocolate cake and passion fruit mousse topped with glossy passion fruit seeds, a strawberry covered in milk chocolate and chopped peanuts, a mini Brazilian flan with shiny caramel, two fudgy brownie squares, and a chocolate "strawberry coxinha" covered in chocolate sprinkles. Desserts grouped on the right two-thirds of the frame, the left third left clean and empty for text. Soft diffused morning light from the left, gentle shadows, camera about 30 degrees above, shallow depth of field, a few scattered crumbs, fresh strawberries and passion fruit halves as props. Colors warm and candy-like: strawberry pink, caramel, butter yellow, chocolate. Horizontal 16:9. No text, no logos, no hands, no people.
```

## 1b. Capa larga: `capa-larga.png` (anexe a capa atual: `jeni-atelie/src/assets/img/gerada/capa.jpg`)

A capa agora aparece inteira, com o título por cima da metade esquerda. Para o texto não encostar nos doces, a foto precisa ser mais larga e ter a esquerda vazia. Escolha "21:9" no formato, se o AI Studio oferecer, e baixe na maior resolução (ideal: 2560 px de largura ou mais).

```
Extend this exact photo to a wider 21:9 horizontal frame. Keep every dessert, prop, color, light and camera angle exactly as they are, and keep all of them grouped in the right half of the frame. Fill the new left half only with more of the same empty soft blush-pink tabletop and the same seamless vanilla-cream wall, smooth and uncluttered, with the same soft morning light from the left, so a title can sit there. Nothing in the left half: no crumbs, no leaves, no props, no shadows of objects. High resolution, sharp, at least 2560 pixels wide. No text, no logos, no hands, no people.
```

Salve na pasta `Fotos Gemini/` e me avise: troco a capa no site.

## 2. Brownies: `brownies.png`

```
Bright, airy food photography for a cute premium home bakery. Four thick fudgy brownie squares arranged in a playful staggered row on a soft blush-pink surface (#FFD9DF), seamless vanilla-cream background (#FFF4EC): one classic with a crackly shiny top, one topped with a Ferrero Rocher bonbon and chopped hazelnuts, one covered with creamy white powdered-milk (Ninho) frosting, one extra dark chocolate with cocoa dusting. One brownie cut to show the gooey center. Soft diffused daylight from the left, gentle shadows, camera about 30 degrees above, shallow depth of field, a few crumbs. Vertical 3:4. No text, no logos, no hands, no people.
```

## 3. Surpresa de uva: `surpresa-de-uva.png`

```
Bright, airy food photography for a cute premium home bakery. Brazilian "surpresa de uva": round bonbons of creamy white condensed-milk brigadeiro, each wrapped around a whole green grape, in small white fluted paper cups. One bonbon cut in half to reveal the juicy green grape inside. Arranged on a soft blush-pink surface (#FFD9DF), seamless vanilla-cream background (#FFF4EC), a small bunch of fresh green grapes as a prop. Soft diffused daylight from the left, gentle shadows, camera about 30 degrees above, shallow depth of field. Vertical 3:4. No text, no logos, no hands, no people.
```

## 4. Coxinhas de morango: `coxinhas-de-morango.png`

```
Bright, airy food photography for a cute premium home bakery. Brazilian "coxinha de morango": teardrop-shaped sweets made of chocolate brigadeiro wrapped around a whole fresh strawberry, three versions side by side: one covered in Belgian chocolate sprinkles, one in white powdered-milk (Ninho) coating with a drizzle of Nutella, one rolled in chopped hazelnuts with a Ferrero Rocher on top. One coxinha cut in half showing the bright red strawberry inside. On a soft blush-pink surface (#FFD9DF), seamless vanilla-cream background (#FFF4EC), a few fresh strawberries around. Soft diffused daylight from the left, gentle shadows, camera about 30 degrees above, shallow depth of field. Vertical 3:4. No text, no logos, no hands, no people.
```

## 5. Pudim: `pudim.png`

```
Bright, airy food photography for a cute premium home bakery. A single Brazilian milk flan (pudim de leite) with a hole in the middle, smooth and creamy, with shiny amber caramel sauce dripping down its sides and pooling on a small clear dessert plate. On a soft blush-pink surface (#FFD9DF), seamless vanilla-cream background (#FFF4EC). Soft diffused daylight from the left creating a glossy highlight on the caramel, gentle shadows, camera about 25 degrees above, shallow depth of field. Vertical 3:4. No text, no logos, no hands, no people.
```

## 6. Torta de maracujá: `torta-de-maracuja.png`

```
Bright, airy food photography for a cute premium home bakery. A triangular slice of passion fruit tart: buttery crumbly cookie base, thick pale-yellow passion fruit mousse, topped with a glossy layer of passion fruit pulp with black seeds. Served on a small white plate with a dessert fork, half a fresh passion fruit beside it. On a soft blush-pink surface (#FFD9DF), seamless vanilla-cream background (#FFF4EC). Soft diffused daylight from the left, gentle shadows, camera about 30 degrees above, shallow depth of field. Vertical 3:4. No text, no logos, no hands, no people.
```

## 7. Banoffee: `banoffee.png`

```
Bright, airy food photography for a cute premium home bakery. A banoffee pie dessert in a clear round cup: crumbly biscuit base, thick dulce de leche layer, fresh banana slices, a cloud of whipped cream dusted with cinnamon on top. A spoon lifting a bite to show the layers. On a soft blush-pink surface (#FFD9DF), seamless vanilla-cream background (#FFF4EC), a few banana slices as props. Soft diffused daylight from the left, gentle shadows, camera about 30 degrees above, shallow depth of field. Vertical 3:4. No text, no logos, no hands, no people.
```

## 8. Bolo inteiro sob encomenda: `bolo-inteiro.png`

```
Bright, airy food photography for a cute premium home bakery. A whole two-tier celebration cake on a white cake stand: smooth vanilla-cream frosting, soft blush-pink buttercream rosettes, fresh strawberries and a delicate caramel drip. One slice cut and pulled out to show moist layers with strawberry and condensed-milk cream filling. On a soft blush-pink surface (#FFD9DF), seamless vanilla-cream background (#FFF4EC). Soft diffused daylight from the left, gentle shadows, camera slightly above eye level, shallow depth of field. Vertical 3:4. No text, no logos, no people.
```

## 9. Empadão de frango: `empadao.png`

```
Bright, airy food photography for a cute premium home bakery. A Brazilian chicken pot pie (empadão de frango) in an individual foil tray, golden flaky crust with a lattice pattern, one corner spooned open to reveal creamy shredded chicken filling with melted cheese. On a soft blush-pink surface (#FFD9DF), seamless vanilla-cream background (#FFF4EC), a small sprig of parsley as a prop. Warm soft daylight from the left, gentle shadows, camera about 30 degrees above, shallow depth of field. Vertical 3:4. No text, no logos, no hands, no people.
```

---

## Com foto da Jeni (anexe a foto antes de colar o texto)

Assim a imagem continua sendo o doce dela, só com cara de vitrine.

### 10. Bolo de pote: `bolo-de-pote.png` (anexe a foto do pote de maracujá na bancada de granito)

```
Use this exact dessert as the reference: same square clear cup, same layers of chocolate cake and passion fruit mousse, same glossy passion fruit topping with seeds. Recreate it as bright, airy food photography for a cute premium home bakery: remove the granite counter and the room, place the cup on a soft blush-pink surface (#FFD9DF) against a seamless vanilla-cream background (#FFF4EC), add half a passion fruit and a few cake crumbs beside it. Soft diffused daylight from the left, glossy highlights on the topping, camera about 25 degrees above, shallow depth of field. Keep the dessert looking homemade and real. Vertical 3:4. No text, no logos, no hands.
```

### 11. Fatia de bolo: `fatia.png` (anexe a foto da fatia na marmita de alumínio)

```
Use this exact dessert as the reference: same layers of sponge cake, creamy flan, dulce de leche and whipped cream. Recreate it as bright, airy food photography for a cute premium home bakery: move the slice out of the foil tray onto a small white plate with a dessert fork, on a soft blush-pink surface (#FFD9DF) against a seamless vanilla-cream background (#FFF4EC). Show the side of the slice so every layer is visible. Soft diffused daylight from the left, gentle shadows, shallow depth of field. Keep it looking homemade and real. Remove the date stamp. Vertical 3:4. No text, no logos, no hands.
```

### 12. Morango cravejado: `morango-cravejado.png` (anexe a foto do morango na embalagem segurada na mão)

```
Use this exact dessert as the reference: same chocolate-covered strawberry dessert with chopped peanuts and chocolate drizzle. Recreate it as bright, airy food photography for a cute premium home bakery: out of the plastic box and the hand, placed on a soft blush-pink surface (#FFD9DF) against a seamless vanilla-cream background (#FFF4EC), with one piece cut to show the fresh red strawberry inside and a couple of fresh strawberries beside it. Soft diffused daylight from the left, glossy chocolate highlights, camera about 30 degrees above, shallow depth of field. Vertical 3:4. No text, no logos, no hands.
```
