import { useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import { whatsappUrl } from '../content';
import { settle } from '../theme';

const floatShadow = 'shadow-[0_16px_40px_-12px_rgba(46,28,22,0.55)]'; // taste-skill-ignore: botão fixo que flutua sobre o conteúdo

// Atalho do WhatsApp no celular: aparece depois da capa e sai de cena perto do contato e do rodapé
export const FloatingWhatsapp = () => {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const contact = document.getElementById('contato');
    const nearEnd = contact ? y + window.innerHeight > contact.offsetTop + 120 : false;
    setShow(y > window.innerHeight * 0.9 && !nearEnd);
  });

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
          className={`fixed right-4 z-40 rounded-full bg-papel/80 p-1.5 ${floatShadow} lg:hidden`}
        >
          <span className="grid size-13 place-items-center rounded-full bg-cobre text-papel">
            <WhatsappLogo size={26} weight="light" />
          </span>
        </m.a>
      )}
    </AnimatePresence>
  );
};
