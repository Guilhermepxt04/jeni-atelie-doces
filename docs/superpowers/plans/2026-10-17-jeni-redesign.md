# Redesign Jeni Ateliê: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark "stationery" landing page with a light, cute-premium, fluid one ("Morango & caramelo") that shows the real menu with prices and sends a ready-made order to WhatsApp.

**Architecture:**
- Same app in `jeni-atelie/` (single page, prerendered).
- Menu data and pure order logic live in typed modules (`content.ts`, `cart.ts`, `seo.ts`) covered by Vitest.
- UI is rebuilt section by section on top of the existing motion primitives.
- Old sections that no longer fit (Occasions, BoxBuilder, Process, Letter, Visit) are deleted.
- Photos come from Jeni's real photos (background removed locally with `rembg`) plus the Gemini set.

**Tech Stack:** Vite 8, React 19, TypeScript 6, Tailwind 4, framer-motion 14 (LazyMotion `domAnimation`), Lenis, @number-flow/react, @phosphor-icons/react, vite-imagetools, Vitest 5 (new), Python + rembg (new, dev-only script).

**Spec:** `docs/superpowers/specs/2026-10-17-jeni-redesign-design.md` (read it before starting; mockup: `.superpowers/brainstorm/1972-1792254883/content/structure-v2.html`).

## Global Constraints

- **Palette** (spec §5): creme `#FFF4EC` (page ground), morango `#E8466B` (action), rosa `#FFD9DF`, caramelo `#D8843E`, manteiga `#FFC94D`, chocolate `#3A1D14` (text, never black).
- **Fonts:** Fraunces variable, SOFT 100 and WONK 1 (titles); Figtree variable (text/UI). Self-hosted via `@fontsource-variable/*`. Cormorant Garamond and Montserrat are removed.
- **Shapes:** photos in arches (rounded top), pills for tags and buttons, round tilted stickers, large radii. No square-cornered boxes in rows.
- **Ordering:**
  - WhatsApp is the only working channel.
  - iFood and 99Food appear as "em breve" with no link.
  - Delivery is free in **Vila Cosmopolita** and **Tatuapé**, and pickup is also possible.
  - There is no minimum order.
  - The CEP 08421-135 is never published.
- **Availability:** menu items are pronta-entrega while stock lasts. Whole cakes and out-of-stock items are made to order and the lead time depends on the sweet. Never promise "for today" as a guarantee.
- **Menu and prices:** exactly the table in spec §7, with Brownies Tradicional R$ 15, Ninho R$ 20, 50% Cacau R$ 18 and Ferrero Rocher R$ 22.
- **Photos:**
  - No stock or internet photos on the page.
  - Real photos go first and Gemini photos complete the rest.
  - The footer carries the note "Algumas fotos são ilustrativas."
- **Motion:**
  - Animate transform and opacity only.
  - Every move respects `prefers-reduced-motion`: content stays visible and only the travel is removed.
- **Accessibility kept from the audits:**
  - AA contrast on every tone background;
  - 44 px touch targets;
  - visible focus;
  - `inert` on the hidden nav;
  - focus trap in the mobile menu;
  - plain-text live region for counts;
  - VLibras and Sienna loaded after `load`.
- **Copy:** pt-BR, written with the `copywriting` skill, with no AI tells. Placeholders still to confirm: WhatsApp number, e-mail, Instagram, domain, hours, FAQ answers.

## Review Focus

1. **Order message with accents and symbols.** "Prestígio" and "Ninho com Nutella" arrive in WhatsApp readable, and the whole text is URL-encoded once. → Task 2, `buildOrderMessage` and `whatsappUrl` tests.
2. **Quantities and totals.** Adding the same flavor twice shows "2×", removing down to zero drops the line and hides the bar, and the count never goes negative. → Task 2 tests.
3. **Price formatting.** Whole reais render as "R$ 15", never "R$ 15,00" in one place and "R$ 15" in another, and the total uses the same format. → Task 1 test for `formatBRL`.
4. **Mobile carousel versus page scroll.** A vertical swipe over the menu carousel scrolls the page, and a horizontal swipe moves the cards. → Task 7 browser check with touch emulation.
5. **Reduced motion.** With reduced motion on, the ribbon stops, tab switches cut instead of spinning, and every section is visible without scrolling animations. → Task 11 browser check.

---

## File Structure

All paths are relative to `jeni-atelie/`.

| File | Responsibility | Action |
|---|---|---|
| `src/content.ts` | Menu groups, items and prices, contacts, delivery areas, channel flags, copy that is data (FAQ, steps) | Rewrite |
| `src/content.test.ts` | Menu data and `formatBRL` tests | Create |
| `src/cart.ts` | Pure cart reducer, totals, WhatsApp messages | Create |
| `src/cart.test.ts` | Cart and message tests | Create |
| `src/cart-context.tsx` | `CartProvider` and `useCart()` | Create |
| `src/seo.ts` + `src/seo.test.ts` | JSON-LD `Bakery` with `hasMenu` and `areaServed` | Create |
| `scripts/tratar-fotos.py` | Removes backgrounds and grades Jeni's photos into `src/assets/img/jeni/` | Create |
| `src/assets/img/jeni/*.png`, `src/assets/img/gerada/*.jpg` | Final photos | Create |
| `src/images.ts` | `photos: Record<PhotoKey, Picture>`, `selo` | Rewrite |
| `src/index.css`, `src/theme.ts` | Tokens for direction A, fonts, keyframes | Rewrite |
| `src/components/ui.tsx` | `Arch`, `Sticker`, `SoonBadge` primitives | Create |
| `src/components/motion.tsx` | `Cta`, `TextLink`, `Magnetic`, `ScrollProgress` (re-toned) | Modify |
| `src/components/Nav.tsx`, `Hero.tsx`, `FlavorRibbon.tsx`, `FloatingWhatsapp.tsx`, `Ambient.tsx`, `Faq.tsx`, `Footer.tsx` | Kept, re-themed and re-written | Modify |
| `src/components/Showcase.tsx` | Menu tabs and group cards | Create |
| `src/components/CartBar.tsx` | Bottom bar that sends the order | Create |
| `src/components/CakeOrder.tsx` | Whole cakes to order | Create |
| `src/components/HowToOrder.tsx`, `About.tsx` | How to order, Who makes it | Create |
| `src/components/{Occasions,Menu,BoxBuilder,Process,Letter,Visit}.tsx` | Old sections | Delete |
| `index.html`, `scripts/prerender.js`, `src/entry-server.tsx` | Meta, OG, JSON-LD injection, font preload | Modify |

---

### Task 1: Test harness and menu data

**Files:**
- Modify: `package.json` (add `vitest` dev dependency and `"test": "vitest run"`)
- Rewrite: `src/content.ts`
- Create: `src/content.test.ts`

**Interfaces:**
- Produces:
  - `type GroupId = 'potes' | 'brownies' | 'fatias' | 'coxinhas' | 'unitarios' | 'salgado'`
  - `type Tone = 'caramelo' | 'cacau' | 'pessego' | 'rosa' | 'lilas' | 'manteiga'`
  - `type MenuItem = { id: string; name: string; price: number }` (price in whole reais)
  - `type MenuGroup = { id: GroupId; title: string; blurb: string; tone: Tone; photos: PhotoKey[]; items: MenuItem[] }`
  - `export const menu: MenuGroup[]`
  - `export const findItem(id: string): MenuItem & { group: GroupId } | undefined`
  - `export const formatBRL(value: number): string`
  - `export const WHATSAPP_NUMBER`, `WHATSAPP_DISPLAY`, `EMAIL`, `INSTAGRAM` (placeholders, same values as today)
  - `export const areas = ['Vila Cosmopolita', 'Tatuapé'] as const`
  - `export const channels = { ifood: { label: 'iFood', soon: true, url: null }, food99: { label: '99Food', soon: true, url: null } }`
  - `export const hours`, `export const faq: { q: string; a: string }[]`, `export const steps: string[]`
  - `type PhotoKey`: re-exported from `images.ts` (Task 3). Until Task 3 lands, declare it here as a string union of the keys listed in Task 3.

- [ ] **Step 1: Install Vitest.**
  Run `npm i -D vitest@5` and add `"test": "vitest run"` to `scripts`.
- [ ] **Step 2: Write the failing tests** in `src/content.test.ts`:
  - `menu has 22 priced items across 6 groups`: `menu.length === 6` and the sum of `items.length === 22`.
  - `brownie prices`: `findItem('brownie-tradicional')?.price === 15`, `-ferrero` 22, `-ninho` 20, `-cacau-50` 18.
  - `pote prices`: `pote-choco-maracuja` 22, `pote-branca-maracuja` 22, `pote-ninho-morango` 20, `pote-belga` 20, `pote-cenoura` 22, `pote-prestigio` 20, `pote-pudim` 20.
  - `fatias prices`: `fatia-choco-maracuja` 15, `fatia-ninho-morango` 18, `fatia-torta-maracuja` 14, `fatia-pudim` 16, `fatia-banoffee` 18.
  - `coxinhas prices`: `coxinha-belga` 20, `coxinha-ninho-nutella` 20, `coxinha-ferrero` 22.
  - `unitarios and salgado`: `surpresa-de-uva` 15, `morango-cravejado` 18, `empadao-frango` 18.
  - `ids are unique`.
  - `formatBRL`: `formatBRL(15) === 'R$ 15'`, `formatBRL(64) === 'R$ 64'`, and `formatBRL(6.5) === 'R$ 6,50'` (with a regular space after `R$`, normalising the NBSP that `Intl` emits).
- [ ] **Step 3: Run `npm test` and confirm the tests fail** (the exports do not exist).
- [ ] **Step 4: Rewrite `src/content.ts`.**
  - Item names follow spec §7 verbatim.
  - Groups, in this order: potes "Bolos de pote" (tone caramelo), brownies "Brownies" (cacau), fatias "Fatias" (pessego), coxinhas "Coxinhas de morango" (rosa), unitarios "Surpresa de uva e morango" (lilas), salgado "Salgado" (manteiga).
  - `photos` per group: potes `['jeni-pote', 'gerada-pote']`, brownies `['gerada-brownies']`, fatias `['jeni-fatia', 'gerada-pudim', 'gerada-torta', 'gerada-banoffee']`, coxinhas `['gerada-coxinhas']`, unitarios `['gerada-uva']`, salgado `['jeni-empadao', 'gerada-empadao']`.
  - `formatBRL` uses `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: Number.isInteger(v) ? 0 : 2 })` and replaces ` ` with a space.
  - Blurbs, FAQ and steps are written with the copywriting skill and follow the availability and delivery rules in Global Constraints.
  - Drop `occasions`, `process`, `letter`, `boxSizes`, `flavors`, `credits` and the old `menu`.
- [ ] **Step 5: Run `npm test` and confirm it passes.** `npx tsc -b` will still fail where old components import removed exports; Task 11 deletes them, so only `npm test` must pass here.
- [ ] **Step 6: Commit** with `git commit -m "Cardápio real com preços e testes"`.

### Task 2: Cart logic and WhatsApp messages

**Files:**
- Create: `src/cart.ts`, `src/cart.test.ts`, `src/cart-context.tsx`
- Modify: `src/content.ts` (move `whatsappUrl` here or keep it there, but there must be a single definition)

**Interfaces:**
- Consumes: `findItem`, `formatBRL`, `WHATSAPP_NUMBER` (Task 1).
- Produces:
  - `type CartLine = { id: string; qty: number }`
  - `type Cart = CartLine[]`
  - `addItem(cart: Cart, id: string): Cart`
  - `removeItem(cart: Cart, id: string): Cart` (decrements; the line disappears at 0; a missing id is a no-op)
  - `cartCount(cart: Cart): number`
  - `cartTotal(cart: Cart): number`
  - `buildOrderMessage(cart: Cart): string`
  - `buildCakeMessage(size: CakeSize): string`, with `type CakeSize = 'ate-10' | '20' | '30-mais'`
  - `whatsappUrl(text?: string): string`
  - `CartProvider`
  - `useCart(): { lines: Cart; count: number; total: number; add(id: string): void; remove(id: string): void; clear(): void; qtyOf(id: string): number }`

- [ ] **Step 1: Write the failing tests** in `src/cart.test.ts`:
  - `adding twice makes one line with qty 2`.
  - `remove to zero drops the line`, and `remove on empty cart returns []`.
  - `total` of 2× `pote-choco-maracuja` and 1× `coxinha-belga` is `64`, and the count is `3`.
  - `order message`:

    ```ts
    expect(buildOrderMessage([{ id: 'pote-prestigio', qty: 2 }, { id: 'coxinha-ninho-nutella', qty: 1 }])).toBe(
      'Oi, Jeni! Quero fazer um pedido:\n\n' +
      '• 2× Bolo de pote Prestígio (R$ 40)\n' +
      '• 1× Coxinha de morango Ninho com Nutella (R$ 20)\n\n' +
      'Total: R$ 60\n\n' +
      'Retirar ou receber em casa?\n' +
      'Pode ser para quando? Se algum sabor tiver acabado, combinamos uma data.'
    );
    ```

    The item label is the group's singular noun followed by the flavor. Each group defines its own prefix: potes "Bolo de pote", brownies "Brownie", fatias "Fatia", coxinhas "Coxinha de morango", and for unitarios and salgado the name alone.
  - `cake message`: `buildCakeMessage('20')` contains `'bolo inteiro'`, `'20 pessoas'` and `'data'`.
  - `whatsappUrl encodes once`: `whatsappUrl('Prestígio & cia')` ends with `?text=Prest%C3%ADgio%20%26%20cia`, and `whatsappUrl()` has a default greeting.
- [ ] **Step 2: Run `npm test` and confirm the new tests fail.**
- [ ] **Step 3: Implement `src/cart.ts`** with pure functions only; `buildOrderMessage` uses `formatBRL` for line totals and the total.
- [ ] **Step 4: Implement `src/cart-context.tsx`** with a `useReducer` over the pure functions. The context default throws if it is used outside the provider.
- [ ] **Step 5: Run `npm test` and confirm it passes.**
- [ ] **Step 6: Commit** with `git commit -m "Sacolinha: lógica do pedido e mensagem do WhatsApp"`.

### Task 3: Photos

**Files:**
- Create: `scripts/tratar-fotos.py`, the `src/assets/img/jeni/` outputs, and the `src/assets/img/gerada/` copies
- Rewrite: `src/images.ts`
- Delete: the old stock photos in `src/assets/img/` (`picsum-*`, `chocolate-*`, `piping-*`, `brigadeiros.jpg`), `src/assets/credits.json` and the unused seal variants. Keep `selo-jeni-limpo.png`.

**Interfaces:**
- Produces:
  - `type PhotoKey = 'capa' | 'jeni-pote' | 'jeni-fatia' | 'jeni-empadao' | 'jeni-potes-mesa' | 'gerada-pote' | 'gerada-brownies' | 'gerada-fatia' | 'gerada-pudim' | 'gerada-torta' | 'gerada-banoffee' | 'gerada-coxinhas' | 'gerada-uva' | 'gerada-empadao'`
  - `export const photos: Record<PhotoKey, Picture & { alt: string }>`
  - `export const selo: string`

- [ ] **Step 1: Copy the Gemini set** from `../Fotos Gemini/` to `src/assets/img/gerada/` with these names:
  - `0a584cec…jfif` → `banoffee.jpg`
  - `37319057…jfif` → `coxinhas.jpg`
  - `83a58e9d…jfif` → `surpresa-de-uva.jpg`
  - `a6292ce8…jfif` → `brownies.jpg`
  - `ce57c303…jfif` → `capa.jpg`
  - `ead18250…jfif` → `torta-de-maracuja.jpg`
  - `watermarked_img_10794…jpg` → `bolo-de-pote.jpg`
  - `watermarked_img_13056…jpg` → `pudim.jpg`
  - `watermarked_img_7147…jpg` → `fatia.jpg`
  - `watermarked_img_9143…jpg` → `empadao.jpg`

  Convert `.jfif` files with Pillow (`.convert('RGB').save(..., quality=90)`).
- [ ] **Step 2: Write `scripts/tratar-fotos.py`.**
  - Input: `../fotos-jeni/`. Output: `src/assets/img/jeni/`.
  - For `pote-maracuja-granito.jpg`, `fatia-pudim-foil.jpg` and `empadao-foil.jpg`: run `rembg.remove`, crop to the alpha bounding box with 6 % padding, apply a light warm grade (brightness ×1.06, saturation ×1.08), and save a PNG with alpha as `pote.png`, `fatia.png` and `empadao.png`.
  - For `potes-mesa-natal.webp`: no cutout. Crop the right 60 % (the cups), apply the same grade and save as `potes-mesa.jpg`.
  - Install with `pip install rembg[cpu] pillow`. The first run downloads the u2net model (~170 MB).
- [ ] **Step 3: Run `python scripts/tratar-fotos.py` and open each output.**
  - The pass criteria: the dessert is whole, no hand or glove is visible, no date stamp is visible, and the edges are clean.
  - If a cutout fails these criteria, delete it and point its `jeni-*` key in `images.ts` to the matching `gerada-*` file (spec §8 fallback). Write the decision as a comment next to the key.
- [ ] **Step 4: Rewrite `src/images.ts`.**
  - Use the existing `pic()` helper and imagetools queries.
  - Cutouts: `?w=480;800&format=webp&as=metadata` (webp keeps the alpha channel). Gerada photos: `?w=480;765&format=webp&as=metadata`. Capa: `?w=640;1024&format=webp&as=metadata`.
  - Each entry carries a pt-BR `alt` that describes the dessert, for example "Bolo de pote de chocolate com maracujá, em camadas, no pote transparente".
- [ ] **Step 5: Run `npx vite build`** (the app may still fail typing; here only the asset pipeline matters) and confirm the outputs exist under `dist/assets` as `bolo-de-pote-*.webp`, `pote-*.webp` and so on.
- [ ] **Step 6: Commit** with `git commit -m "Fotos reais tratadas e fotos geradas no projeto"`.

### Task 4: Design tokens, fonts and primitives

**Files:**
- Modify: `package.json` (add `@fontsource-variable/fraunces` and `@fontsource-variable/figtree`; remove the Cormorant and Montserrat packages)
- Rewrite: `src/index.css` (`@theme`), `src/theme.ts`, `src/main.tsx` (font imports)
- Modify: `src/components/motion.tsx` (`Cta` tones), `src/components/Ambient.tsx` (glow colors), `scripts/prerender.js` (preload regex)
- Create: `src/components/ui.tsx`

**Interfaces:**
- Produces:
  - Tailwind colors `creme`, `morango`, `rosa`, `caramelo`, `manteiga`, `chocolate`, `chocolate-suave` (`#6B4A3C`, AA on every tone).
  - Tone colors: `tone-caramelo` `#FFE6C9`, `tone-cacau` `#F2DCCD`, `tone-pessego` `#FFE4D6`, `tone-rosa` `#FFD9DF`, `tone-lilas` `#EADCF7`, `tone-manteiga` `#FFF0B8`.
  - Fonts `font-display` (Fraunces) and `font-sans` (Figtree).
  - The five text steps already in `@theme`, kept by name.
  - `Cta` tones: `'morango' | 'chocolate' | 'branco'`, defaulting to `'morango'`.
  - `<Arch className? children>`: rounded-top frame with `overflow-hidden`. `<Arch wide>` gives the capsule used for the horizontal capa.
  - `<Sticker tone="manteiga|morango|rosa" rotate={number}>`: round badge that "sticks" with a spring (scale from 0.6, rotate from rotate−8) when it enters view.
  - `<SoonBadge label="iFood" />`: renders "iFood · em breve" as a non-link `span` with `aria-label="iFood: em breve"`.

- [ ] **Step 1: Install the fonts** with `npm i @fontsource-variable/fraunces @fontsource-variable/figtree` and `npm rm @fontsource-variable/cormorant-garamond @fontsource-variable/montserrat`.
  - Check whether `node_modules/@fontsource-variable/fraunces/full.css` exists. If it does, import it to get the SOFT and WONK axes. If not, import `index.css` and drop the SOFT and WONK settings.
- [ ] **Step 2: Rewrite the `@theme` tokens and `theme.ts`.**
  - Every `font-display` element gets `font-variation-settings: 'SOFT' 100, 'WONK' 1` through a base rule.
  - Remove the papelaria utilities: `.edge-scallop`, `.edge-zigzag`, `.edge-postcard`, `.perforation`, `.leader`.
  - Body background `creme`, text `chocolate`.
- [ ] **Step 3: Update `prerender.js`** so the preload regex matches `fraunces-latin-*-normal-*.woff2`.
- [ ] **Step 4: Create `ui.tsx`** with `Arch`, `Sticker` and `SoonBadge` as specified in Interfaces. `Sticker` uses `inView` and spring `settle` from `theme.ts`, and under reduced motion it renders static.
- [ ] **Step 5: Check the contrast** of `chocolate` and `chocolate-suave` on each tone, and of white on `morango`, with a small node or Python script (WCAG formula). Expected: at least 4.5 for body text and at least 3 for large text. If a pair fails, adjust that token and note it in `theme.ts`.
- [ ] **Step 6: Commit** with `git commit -m "Tokens da direção A, Fraunces + Figtree e primitivas"`.

### Task 5: Nav and Hero

**Files:**
- Modify: `src/components/Nav.tsx`, `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `Arch`, `Sticker`, `SoonBadge` (Task 4), `photos.capa` (Task 3), `Cta`, `Magnetic`, `whatsappUrl`, `channels`.

- [ ] **Step 1: Restyle Nav.**
  - Same behavior: inert while hidden, focus trap and Esc.
  - The pill is white on creme, with the seal and "Jeni Ateliê" in Fraunces.
  - Links: Cardápio `#cardapio`, Encomendas `#encomendas`, Como pedir `#como-pedir`, plus a "Pedir" Cta. Pedir scrolls to `#cardapio`.
  - The mobile overlay becomes creme with chocolate links. The `on-dark` focus override is no longer needed there.
- [ ] **Step 2: Rewrite Hero** as a two-column layout on large screens and a stacked one on phones.
  - The title is two short lines, the second in `text-morango`, plus one supporting sentence that names pronta-entrega and free delivery in the two neighborhoods. Write both with the copywriting skill.
  - Buttons: Cta "Ver o cardápio" `#cardapio`, and a secondary white Cta "Chamar no WhatsApp" with the WhatsApp icon.
  - Add `SoonBadge` for iFood and 99Food.
  - `photos.capa` sits in `<Arch wide>`, scaling from 1.08 inside the arch on load.
  - Two stickers: "feito toda semana" (manteiga) and `a partir de ${formatBRL(min price)}` (morango, computed from `menu`).
  - The remove the crossfade slideshow and its pause button: one photo means no auto-moving content.
- [ ] **Step 3: Run `npm run dev`** and check at 1440 and 390 px: the title is two lines at each width, the main button sits above the fold at 390×844, and nothing overlaps the title.
- [ ] **Step 4: Commit** with `git commit -m "Capa e navegação na direção A"`.

### Task 6: Flavor ribbon

**Files:**
- Modify: `src/components/FlavorRibbon.tsx`, `src/index.css` (keyframes stay)

- [ ] **Step 1: Restyle the ribbon** as a morango strip with white Fraunces text, rotated −2deg and full-bleed.
  - Item names come from `menu`, one per group plus two signature flavors.
  - The separators are a small drawn flower or heart SVG in manteiga; middle dots are not allowed.
  - It pauses on hover and is static under `motion-reduce`.
- [ ] **Step 2: Check in the browser** that the ribbon causes no horizontal page scroll at 390 px: `document.documentElement.scrollWidth === innerWidth`.
- [ ] **Step 3: Commit** with `git commit -m "Faixa de sabores em morango"`.

### Task 7: Menu showcase

**Files:**
- Create: `src/components/Showcase.tsx`

**Interfaces:**
- Consumes: `menu`, `formatBRL` (Task 1), `useCart` (Task 2), `photos` (Task 3), `Arch` (Task 4).
- Produces: a `<section id="cardapio">` with the heading "O que sai do forno" (or a better line from the copywriting skill; spec §9 says never "o que tem pra hoje").

- [ ] **Step 1: Build the tabs** following the WAI-ARIA tabs pattern: `role="tablist"`, `role="tab"` with `aria-selected`, roving `tabIndex`, Left and Right arrow keys, and `role="tabpanel"` labelled by its tab. Pills use the active tone and the selected one is `bg-morango text-white`.
- [ ] **Step 2: Build the group card** (large screens).
  - The card background is the group tone.
  - Left side: `photos[group.photos[0]]` in an `Arch`. Extra photos sit as two small round thumbnails that float with a gentle loop.
  - Right side: title, blurb and the item list.
  - Each item row is a `button` (min-height 44 px) showing the name, the price, and a "+" circle that turns into a quantity badge when `qtyOf(id) > 0`. Its `aria-label` is `Adicionar ${name}, ${formatBRL(price)}`.
  - Switching tabs crossfades the card with `AnimatePresence mode="wait"`: the photo rotates ±6° and scales from 0.9, and the tone background transitions. Under reduced motion this is a plain cut.
- [ ] **Step 3: Build the phone layout.**
  - Below `lg` the tabs are hidden and the groups render as a horizontal carousel: `overflow-x: auto`, `scroll-snap-type: x mandatory`, cards at 85 vw, `touch-action: pan-x pan-y`, with no JS drag handler.
  - Each card keeps the tab panel content, so the cart works the same way.
- [ ] **Step 4: Check in the browser** with the mobile preset (touch emulated):
  - A vertical drag that starts on a card scrolls the page.
  - A horizontal drag snaps to the next card.
  - No horizontal page scroll.
  - Tabs work with the keyboard only at 1440 px.
- [ ] **Step 5: Commit** with `git commit -m "Cardápio em vitrine com abas e carrossel"`.

### Task 8: Cart bar

**Files:**
- Create: `src/components/CartBar.tsx`
- Modify: `src/components/FloatingWhatsapp.tsx` (hide it while the cart bar is visible)

**Interfaces:**
- Consumes: `useCart`, `buildOrderMessage`, `whatsappUrl`, `formatBRL`, `findItem`.

- [ ] **Step 1: Build the CartBar.**
  - It is fixed at the bottom, centered, in a chocolate pill, and slides up when `count > 0`.
  - It shows the summary "N doces · R$ X" (NumberFlow for both numbers), an expandable list (button "ver itens") with − and + per line, and a Cta "Enviar pedido no WhatsApp" that links to `whatsappUrl(buildOrderMessage(lines))`.
  - The count badge bounces (scale 1 → 1.25 → 1 spring) on each change.
  - A visually hidden `aria-live="polite"` paragraph announces "N doces na sacolinha, total R$ X".
  - It respects `env(safe-area-inset-bottom)`.
- [ ] **Step 2: Coordinate with FloatingWhatsapp:** it reads `useCart().count` and stays hidden when `count > 0`.
- [ ] **Step 3: Check in the browser:**
  - Add 2× Prestígio and 1× Coxinha Ninho com Nutella. The link `text=` decodes to the exact message in Task 2's test.
  - Remove everything. The bar leaves and the WhatsApp float returns after scrolling.
- [ ] **Step 4: Commit** with `git commit -m "Sacolinha presa no pé da tela"`.

### Task 9: Whole cakes to order

**Files:**
- Create: `src/components/CakeOrder.tsx`

**Interfaces:**
- Consumes: `buildCakeMessage`, `CakeSize` (Task 2), `Cta`, `Sticker`.

- [ ] **Step 1: Build `<section id="encomendas">` on a rosa ground.**
  - On the left, a graphic placeholder takes the place of the photo: a drawn layer-cake SVG in the palette inside a big circle, with a manteiga sticker "sob encomenda". Leave a `// TODO foto: docs/prompts-gemini.md item 8` comment where the photo goes.
  - On the right, the title, a sentence about lead time ("o prazo depende do bolo"), size chips as a radio group (`ate-10` "até 10 pessoas", `20` "20 pessoas", `30-mais` "30 ou mais") with the same sliding-pill pattern as the old size selector, and a Cta "Encomendar meu bolo" that links to `whatsappUrl(buildCakeMessage(size))`.
- [ ] **Step 2: Check in the browser** that changing the chip changes the link text.
- [ ] **Step 3: Commit** with `git commit -m "Seção de bolos sob encomenda"`.

### Task 10: How to order, Who makes it, FAQ and footer

**Files:**
- Create: `src/components/HowToOrder.tsx`, `src/components/About.tsx`
- Modify: `src/components/Faq.tsx`, `src/components/Footer.tsx`

- [ ] **Step 1: Build HowToOrder (`#como-pedir`).**
  - The three `steps` from `content.ts` are big Fraunces numerals drawn as stickers. This is the one place where numbering is allowed, because order matters.
  - Add a line about free delivery in `areas` (no CEP) and pickup, plus the two `SoonBadge`s.
- [ ] **Step 2: Build About.**
  - `photos['jeni-potes-mesa']` sits in an `Arch`.
  - A short first-person note from Jeni, written with the copywriting skill; it is a placeholder for the client to confirm.
- [ ] **Step 3: Restyle the FAQ** in creme and rosa, keeping the spring accordion. The answers come from `content.faq`, rewritten for the new rules: pronta-entrega or encomenda, lead time varies, free delivery in the two neighborhoods, no minimum.
- [ ] **Step 4: Rewrite the footer** in chocolate on rosa.
  - Contents: the big seal, contacts, `hours`, `areas`, and the note "Algumas fotos são ilustrativas."
  - Remove the photo credits block.
- [ ] **Step 5: Commit** with `git commit -m "Como pedir, quem faz, dúvidas e rodapé"`.

### Task 11: Wiring, SEO and cleanup

**Files:**
- Modify: `src/App.tsx`, `index.html`, `src/entry-server.tsx`, `scripts/prerender.js`
- Create: `src/seo.ts`, `src/seo.test.ts`
- Delete: `src/components/{Occasions,Menu,BoxBuilder,Process,Letter,Visit}.tsx`
- Replace: `public/og-image.jpg` (built from `capa.jpg` and the seal on creme, 1200×630)

**Interfaces:**
- Produces: `buildJsonLd(): object` (a schema.org `Bakery`).

- [ ] **Step 1: Write the failing tests** in `src/seo.test.ts`:
  - `hasMenu` has 6 `MenuSection` entries.
  - The total `MenuItem` count is 22.
  - The `brownie-tradicional` offer is `{ '@type': 'Offer', price: '15.00', priceCurrency: 'BRL' }`.
  - `areaServed` names "Vila Cosmopolita" and "Tatuapé".
  - The serialised JSON does not contain "08421".
- [ ] **Step 2: Implement `src/seo.ts`** and make the tests pass.
  - `entry-server.tsx` exports `jsonLd = JSON.stringify(buildJsonLd())`.
  - `prerender.js` replaces the static JSON-LD block in `index.html` with `<script type="application/ld+json">${jsonLd}</script>`.
- [ ] **Step 3: Update `index.html`:**
  - `title` "Jeni Ateliê | Bolo de pote e doces na Vila Cosmopolita e Tatuapé".
  - The description mentions pronta-entrega, encomendas and free delivery.
  - The OG text matches.
  - `theme-color` is `#FFF4EC` and `color-scheme` is `light`.
- [ ] **Step 4: Wire App.**
  - Order: Nav, Hero, FlavorRibbon, Showcase, CakeOrder, HowToOrder, About, Faq, Footer, then CartBar and FloatingWhatsapp inside `CartProvider`.
  - The skip link targets `#cardapio`.
  - Delete the old components.
- [ ] **Step 5: Run the gates and confirm each one passes:**
  - `npm test`;
  - `npx tsc -b`;
  - `npx eslint .`;
  - `npm run build` (prints "prerender: dist/index.html gerado" and `dist/index.html` contains "Bolos de pote" and `"hasMenu"`);
  - `"<impeccable>/scripts/impeccable" detect --json jeni-atelie/src` prints `[]`;
  - `node <design-taste-frontend>/scripts/inspect.mjs http://localhost:5188 --allow palette-claude,gradient` has 0 FAIL. Fix any FAIL; a `covered-text` FAIL caused by the Sienna accessibility button may be documented instead.
- [ ] **Step 6: Run the browser checks** at 1440 and 390 px:
  - every Review Focus item;
  - with `prefers-reduced-motion: reduce` emulated (DevTools rendering, or the Playwright `emulateMedia({ reducedMotion: 'reduce' })` MCP tool), all sections are visible and the ribbon is static;
  - no console errors in the `vite preview` build.
- [ ] **Step 7: Update `README.md`** with the new sections, `npm test`, `scripts/tratar-fotos.py`, and the placeholders still to confirm.
- [ ] **Step 8: Commit** with `git commit -m "Redesign: montagem, SEO de cardápio e limpeza"`.
