import { useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import { whatsappUrl } from '../cart';
import { useCart } from '../cart-context';
import { settle } from '../theme';

const floatShadow = 'shadow-[0_16px_40px_-12px_rgba(58,29,20,0.4)]'; // taste-skill-ignore: botão fixo que flutua sobre o conteúdo

// Cobertura de glacê com granulado, por cima do docinho de morango que é o botão
const Frosting = () => (
  <svg aria-hidden="true" viewBox="0 0 64 64" className="absolute inset-0 size-full">
    <path className="fill-creme" d="M0 0H64V22C60 22 59 30 55 30C51 30 51 20 46 20C41 20 42 33 37 33C32 33 33 22 28 22C23 22 24 28 19 28C14 28 15 20 10 20C6 20 5 25 0 25Z" />
    <g strokeLinecap="round" strokeWidth="2.6">
      <path className="stroke-manteiga" d="M17 11l4 -2" />
      <path className="stroke-caramelo" d="M30 8l3 3" />
      <path className="stroke-chocolate" d="M42 13l4 1" />
      <path className="stroke-morango" d="M24 17l-2 3" />
      <path className="stroke-manteiga" d="M50 7l-3 3" />
    </g>
  </svg>
);

// Atalho do WhatsApp no canto: aparece depois da capa, sai de cena perto do rodapé
// e some enquanto a sacolinha estiver na tela (ela já tem o botão do pedido)
export const FloatingWhatsapp = () => {
  const [past, setPast] = useState(false);
  const { count } = useCart();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const footer = document.querySelector('footer');
    const nearEnd = footer ? y + window.innerHeight > footer.offsetTop + 120 : false;
    setPast(y > window.innerHeight * 0.9 && !nearEnd);
  });
  const show = past && count === 0;

  return (
    <AnimatePresence>
      {show && (
        <m.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener"
          aria-label="Encomendar pelo WhatsApp"
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 20 }}
          transition={settle}
          whileHover={{ rotate: -8, scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          className="fixed right-4 z-40 rounded-full lg:right-8"
        >
          <span className={`relative grid size-16 place-items-center overflow-hidden rounded-full bg-morango-forte text-white ring-4 ring-white ${floatShadow}`}>
            <Frosting />
            <WhatsappLogo size={28} weight="bold" className="relative translate-y-2" />
          </span>
        </m.a>
      )}
    </AnimatePresence>
  );
};
