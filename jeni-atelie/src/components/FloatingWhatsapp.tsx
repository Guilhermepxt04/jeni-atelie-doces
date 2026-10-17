import { useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import { whatsappUrl } from '../cart';
import { useCart } from '../cart-context';
import { settle } from '../theme';

const floatShadow = 'shadow-[0_16px_40px_-12px_rgba(58,29,20,0.4)]'; // taste-skill-ignore: botão fixo que flutua sobre o conteúdo

// Atalho do WhatsApp no celular: aparece depois da capa, sai de cena perto do rodapé
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
          whileTap={{ scale: 0.92 }}
          style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          className={`fixed right-4 z-40 rounded-full bg-white/85 p-1.5 ${floatShadow} lg:hidden`}
        >
          <span className="grid size-13 place-items-center rounded-full bg-morango-forte text-white">
            <WhatsappLogo size={26} weight="light" />
          </span>
        </m.a>
      )}
    </AnimatePresence>
  );
};
