// Espelho da paleta do @theme em src/index.css, para valores que o framer-motion precisa interpolar
// (ele não anima var(--...)). Altere os dois arquivos juntos.
export const palette = {
  cacau: '#2e1c16',
  cacau2: '#3b2620',
  papel: '#f4f2ea',
  papel2: '#e6e3d8',
  tinta: '#33201a',
  cobre: '#8e5034',
  cobreClaro: '#c79a80',
} as const;

// As mesmas curvas de --ease-out-expo e --ease-drawer, no formato que o framer-motion aceita
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeDrawer = [0.32, 0.72, 0, 1] as const;

// Mola padrão das peças que "assentam" (papéis, doces na caixa)
export const settle = { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 } as const;
