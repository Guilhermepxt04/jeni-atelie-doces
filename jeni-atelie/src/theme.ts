// Espelho da paleta do @theme em src/index.css, para valores que o framer-motion precisa interpolar
// (ele não anima var(--...)). Altere os dois arquivos juntos.
export const palette = {
  creme: '#FFF4EC',
  morango: '#E8466B',
  morangoForte: '#E3224E',
  rosa: '#FFD9DF',
  caramelo: '#D8843E',
  manteiga: '#FFC94D',
  chocolate: '#3A1D14',
  tone: {
    caramelo: '#FFE6C9',
    cacau: '#F2DCCD',
    pessego: '#FFE4D6',
    rosa: '#FFD9DF',
    lilas: '#EADCF7',
    manteiga: '#FFF0B8',
  },
} as const;

// As mesmas curvas de --ease-out-expo e --ease-drawer, no formato que o framer-motion aceita
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeDrawer = [0.32, 0.72, 0, 1] as const;

// Mola padrão das peças que "assentam" (selos, doces na sacolinha)
export const settle = { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 } as const;
// Mola com pulinho, para o que "cola" ou quica
export const pop = { type: 'spring', stiffness: 420, damping: 14 } as const;
