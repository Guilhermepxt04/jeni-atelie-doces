import { m, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/motion';

// degradê radial de propósito: é a luz ambiente pedida no padrão da Eleva Tech
const glowCobre = 'bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-cobre)_38%,transparent),transparent)]'; // taste-skill-ignore: luz ambiente no estilo Eleva, pedida pelo cliente
const glowBlush = 'bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-blush)_14%,transparent),transparent)]'; // taste-skill-ignore: luz ambiente no estilo Eleva, pedida pelo cliente
const glowClaro = 'bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-cobre-claro)_16%,transparent),transparent)]'; // taste-skill-ignore: luz ambiente no estilo Eleva, pedida pelo cliente

// Manchas de luz cor de cobre e rosado atrás de tudo, como na Eleva Tech:
// ficam fixas e derivam devagar com a rolagem, aparecendo entre os painéis.
// Fora do fluxo, sem custo de layout; só transform.
export const Ambient = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : -320]);
  const y2 = useTransform(scrollY, [0, 4000], [0, reduce ? 0 : 420]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <m.div style={{ y: y1 }} className={`absolute top-[-20%] left-[-25%] size-[80vw] ${glowCobre}`} />
      <m.div style={{ y: y2 }} className={`absolute top-[30%] right-[-25%] size-[70vw] ${glowBlush}`} />
      <m.div style={{ y: y1 }} className={`absolute bottom-[-40%] left-[10%] size-[90vw] ${glowClaro}`} />
    </div>
  );
};
