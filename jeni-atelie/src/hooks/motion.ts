import { useEffect, useSyncExternalStore } from 'react';
import type { Variants } from 'framer-motion';
import Lenis from 'lenis';
import { easeOutExpo } from '../theme';

// Preferência por menos movimento, segura para hidratação: o HTML pré-renderizado assume "false"
// e o React troca para o valor real logo depois, sem divergir do servidor
const query = '(prefers-reduced-motion: reduce)';
const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};
export const useReducedMotion = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);

// Rolagem suave (Lenis), desligada para quem prefere menos movimento
export const useLenis = () => {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 } });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, [reduce]);
};

// Entradas: o contêiner só escalona, os filhos sobem com opacidade. Disparam uma vez.
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
export const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
};
export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } } as const;
