import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Fraunces com todos os eixos (SOFT, WONK, opsz, wght) para os títulos; Figtree no texto
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource-variable/figtree'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// No build o HTML já vem pronto (scripts/prerender.js); no dev o root chega vazio
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
