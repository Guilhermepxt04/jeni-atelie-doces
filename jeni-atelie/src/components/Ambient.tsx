import { m, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/motion';

// degradê radial de propósito: manchas de luz morango, manteiga e rosa atrás dos painéis
const glowRosa = 'bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-rosa)_70%,transparent),transparent)]'; // taste-skill-ignore: luz ambiente fluida, pedida pelo cliente
const glowManteiga = 'bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-manteiga)_22%,transparent),transparent)]'; // taste-skill-ignore: luz ambiente fluida, pedida pelo cliente
const glowMorango = 'bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-morango)_10%,transparent),transparent)]'; // taste-skill-ignore: luz ambiente fluida, pedida pelo cliente

// Manchas de luz rosa, manteiga e morango atrás de tudo, bem suaves sobre o creme:
// ficam fixas e derivam devagar com a rolagem, aparecendo entre os painéis.
// Fora do fluxo, sem custo de layout; só transform.
export const Ambient = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : -320]);
  const y2 = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : 420]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <m.div style={{ y: y1 }} className={`absolute top-[-20%] left-[-25%] size-[80vw] ${glowRosa}`} />
      <m.div style={{ y: y2 }} className={`absolute top-[30%] right-[-25%] size-[70vw] ${glowManteiga}`} />
      <m.div style={{ y: y1 }} className={`absolute bottom-[-40%] left-[10%] size-[90vw] ${glowMorango}`} />
    </div>
  );
};
