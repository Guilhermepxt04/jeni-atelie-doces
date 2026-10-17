# Jeni Ateliê

Landing page da confeitaria Jeni Ateliê: bolos de pote, fatias, coxinhas de morango, brownies e bolos inteiros sob encomenda, com pedido pelo WhatsApp.

O app fica em `jeni-atelie/`: Vite, React 19, TypeScript, Tailwind 4, framer-motion e Lenis, com o HTML pré-renderizado no build (mesma base da landing da Eleva Tech).

```bash
cd jeni-atelie
npm install
npm run dev      # http://localhost:5173
npm test         # cardápio, sacolinha, mensagens do WhatsApp, fotos e JSON-LD
npm run build    # gera dist/ já com o conteúdo e o JSON-LD do cardápio no HTML
```

Publicação: `dist/` é estático. O `wrangler.jsonc` já serve a pasta no Cloudflare, com a `404.html`.

## Como a página está montada

| Seção | Arquivo |
|---|---|
| Capa | `src/components/Hero.tsx` |
| Faixa de sabores | `src/components/FlavorRibbon.tsx` |
| Cardápio (abas no computador, carrossel no celular) | `src/components/Showcase.tsx` |
| Sacolinha (pedido pronto no WhatsApp) | `src/components/CartBar.tsx`, `src/cart.ts`, `src/cart-context.tsx` |
| Bolos sob encomenda | `src/components/CakeOrder.tsx` |
| Como pedir, Quem faz, Dúvidas, Rodapé | `HowToOrder.tsx`, `About.tsx`, `Faq.tsx`, `Footer.tsx` |

Todo o texto e o cardápio (sabores e preços) ficam em `src/content.ts`. As cores e as fontes ficam em `src/index.css` e `src/theme.ts` (direção "Morango & caramelo").

## Fotos

- Fotos reais da Jeni: originais em `fotos-jeni/`. O script `jeni-atelie/scripts/tratar-fotos.py` remove o fundo e ajusta a luz e a cor (`pip install "rembg[cpu]" pillow`).
- Fotos geradas no Gemini a partir de referências: `Fotos Gemini/` e `jeni-atelie/src/assets/img/gerada/`. Os prompts estão em `docs/prompts-gemini.md`.
- A foto do bolo inteiro da seção de encomendas foi gerada no Gemini a partir da foto real (`fotos-jeni/bolo-inteiro-real.jpeg`).
- O morango cravejado aparece no cardápio sem foto própria.

## Antes de publicar

- Em `src/content.ts`, troque o número do WhatsApp, o e-mail, o Instagram e os horários, que ainda são exemplo, e confira as respostas das dúvidas. Os horários também aparecem em `src/seo.ts`.
- Ainda em `src/content.ts`, quando o iFood ou o 99Food reabrirem, preencha `channels.<canal>.url` e troque `soon` para `false`.
- O site ainda não tem domínio. Quando tiver, preencha `SITE_URL` em `src/seo.ts`, coloque o `<link rel="canonical">` e o `og:url` em `index.html`, crie `public/sitemap.xml` e aponte para ele no `public/robots.txt`.
