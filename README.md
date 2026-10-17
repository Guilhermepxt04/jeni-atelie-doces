# Jeni Ateliê

Landing page da confeitaria Jeni Ateliê. O app fica em `jeni-atelie/`: Vite, React 19, TypeScript, Tailwind 4, framer-motion e Lenis, com o HTML pré-renderizado no build (mesma base da landing da Eleva Tech).

```bash
cd jeni-atelie
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ já com o conteúdo da página no HTML
```

Publicação: `dist/` é estático. O `wrangler.jsonc` já serve a pasta no Cloudflare, com a `404.html`.

## Antes de publicar

- `src/content.ts`: WhatsApp, e-mail, Instagram, bairro, preços, prazos e a carta da Jeni são exemplo.
- Domínio de exemplo `jeniatelie.com.br` em `index.html`, `public/robots.txt` e `public/sitemap.xml`.
- Fotos: são de acervos abertos, com crédito no rodapé (`content.ts > credits`). Troque pelas fotos dos doces da Jeni quando houver.
- Logo: o selo foi recortado de uma foto. Uma versão em vetor deixa a página mais leve e nítida.
