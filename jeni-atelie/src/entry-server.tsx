import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { buildJsonLd } from './seo'

// Usado só no build (scripts/prerender.js): gera o HTML da página para ela não abrir em branco
export const render = () => renderToString(
  <StrictMode>
    <App />
  </StrictMode>,
)

// JSON-LD da confeitaria com o cardápio real, injetado no <head> pelo prerender
// (< escapado para não fechar o <script> por engano)
export const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c')
