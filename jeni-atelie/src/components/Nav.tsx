import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { navLinks } from '../content';
import { selo } from '../images';
import { easeDrawer, easeOutExpo } from '../theme';

const floatShadow = 'shadow-[0_18px_50px_-18px_rgba(46,28,22,0.45)]'; // taste-skill-ignore: a ilha da navegação é fixa e flutua sobre a página

// Ilha flutuante: some sobre a capa (o cartão já tem tudo), aparece depois dela
// e se recolhe enquanto a pessoa desce lendo, voltando ao menor gesto para cima.
export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const pastHero = y > window.innerHeight * 0.75;
    setShown(pastHero && (y < prev || y - prev < 2));
  });

  // menu aberto: trava a rolagem, foca o primeiro link, Esc fecha e devolve o foco
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.documentElement.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  const visible = shown || open;

  return (
    <>
      <m.nav
        aria-label="Principal"
        initial={false}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.7, ease: easeDrawer }}
        style={{ top: 'max(1rem, env(safe-area-inset-top))' }}
        className="fixed inset-x-0 z-50 flex justify-center px-4"
      >
        <div className={`flex items-center gap-2 rounded-full bg-papel/95 p-1.5 pl-2 ${floatShadow} ring-1 ring-tinta/6`}>
          <a href="#" aria-label="Jeni Ateliê, voltar ao início" className="flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1">
            <img src={selo} alt="" width={40} height={40} className="size-10" />
            <span translate="no" className="font-display text-[1.375rem] leading-none">Jeni Ateliê</span>
          </a>
          <ul className="hidden items-center lg:flex">
            {navLinks.slice(0, 4).map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="block rounded-full px-4 py-2.5 text-note font-medium text-tinta-suave transition-colors duration-300 hover:bg-papel-2 hover:text-tinta">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#caixa" className="hidden rounded-full bg-cobre px-5 py-3 text-note font-semibold text-papel transition-[background-color,transform] duration-500 ease-[var(--ease-drawer)] hover:bg-tinta active:scale-[0.97] sm:block">
            Montar caixa
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-tela"
            className="relative grid size-11 place-items-center rounded-full bg-papel-2 transition-transform duration-300 active:scale-95 lg:hidden"
          >
            <span aria-hidden="true" className={`absolute h-[1.5px] w-5 bg-tinta transition-transform duration-500 ease-[var(--ease-drawer)] ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
            <span aria-hidden="true" className={`absolute h-[1.5px] w-5 bg-tinta transition-transform duration-500 ease-[var(--ease-drawer)] ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
          </button>
        </div>
      </m.nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-tela"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: easeDrawer }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-cacau px-6 pt-28 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-papel lg:hidden"
          >
            <m.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}>
              {navLinks.map(({ label, href }) => (
                <li key={href} className="overflow-hidden">
                  <m.a
                    href={href}
                    onClick={() => setOpen(false)}
                    variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease: easeOutExpo } } }}
                    className="block py-2 font-display text-[clamp(2.5rem,11vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
                  >
                    {label}
                  </m.a>
                </li>
              ))}
            </m.ul>
            <m.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 } }} className="mt-10 text-note text-papel/70">
              Encomendas de terça a sábado, com sete dias de antecedência.
            </m.p>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};
