import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

// Usado só no build (scripts/prerender.js): gera o HTML da página para ela não abrir em branco
export const render = () => renderToString(
  <StrictMode>
    <App />
  </StrictMode>,
)
