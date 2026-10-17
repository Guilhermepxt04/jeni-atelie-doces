// Depois do build: injeta o HTML renderizado da página em dist/index.html.
// O conteúdo aparece antes do JavaScript carregar, e o React só "hidrata" o que já está na tela.
import { readFile, writeFile, rm, readdir } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const indexPath = `${root}dist/index.html`
const ssrDir = `${root}dist-ssr`

const { render } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href)
const template = await readFile(indexPath, 'utf-8')

const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder)) {
  throw new Error(`prerender: "${placeholder}" não encontrado em dist/index.html`)
}

// pré-carrega a fonte latina da Cormorant Garamond (títulos) (o nome do arquivo muda a cada build por causa do hash)
const font = (await readdir(`${root}dist/assets`)).find((f) => /^cormorant-garamond-latin-wght-normal-.*.woff2$/.test(f))
const preload = font ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />\n  ` : ''
if (!font) console.warn('prerender: fonte Cormorant Garamond não encontrada em dist/assets, sem preload')

await writeFile(indexPath, template
  .replace('</head>', `${preload}</head>`)
  .replace(placeholder, `<div id="root">${render()}</div>`))
await rm(ssrDir, { recursive: true, force: true })
console.log('prerender: dist/index.html gerado com o conteúdo da página')
