import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useScroll, useTransform } from 'framer-motion';
import { hero, navLinks } from '../content';
import { img, selo, type Picture } from '../images';
import { easeOutExpo } from '../theme';
import { Cta, Magnetic, TextLink } from './motion';
import { useReducedMotion } from '../hooks/motion';

const slides: { pic: Picture; alt: string }[] = [
  { pic: img.framboesas, alt: 'Xícara branca cheia de framboesas frescas sobre mesa de madeira clara' },
  { pic: img.chocolate, alt: 'Barra de chocolate picada na tábua, ao lado da faca' },
  { pic: img.confeitando, alt: 'Mão decorando a lateral de um bolo branco com saco de confeitar' },
  { pic: img.mel, alt: 'Pegador de mel escorrendo sobre um pote de cerâmica' },
];

const BARS = 26;

// Título e texto partem visíveis e só assentam no lugar: o conteúdo principal pinta antes do JS
const line = { hidden: { y: '0.4em' }, show: { y: 0, transition: { duration: 1.1, ease: easeOutExpo } } };

export const Hero = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // o selo gira devagar e a foto afunda enquanto a capa sai da tela
  const sealRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%']);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  // a foto troca devagar, como a luz mudando na cozinha; pausa com a aba escondida
  useEffect(() => {
    if (reduce) return;
    let id = 0;
    const start = () => { id = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 5600); };
    const onVis = () => { clearInterval(id); if (!document.hidden) start(); };
    start();
    document.addEventListener('visibilitychange', onVis);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', onVis); };
  }, [reduce]);

  return (
    <section ref={ref} aria-label="Jeni Ateliê" className="grid min-h-[100dvh] gap-3 bg-blush p-3 lg:grid-cols-2">
      {/* cartão do ateliê */}
      <div className="relative order-2 -mt-6 flex flex-col bg-papel lg:order-1 lg:mt-0 lg:min-h-[calc(100dvh-1.5rem)]">
        <div aria-hidden="true" className="flex h-10 shrink-0 overflow-hidden lg:h-14">
          {Array.from({ length: BARS }, (_, i) => (
            <m.span
              key={i}
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.15 + i * 0.025 }}
              className={`h-full flex-1 origin-top ${i % 2 === 0 ? 'bg-cobre' : 'bg-transparent'}`}
            />
          ))}
        </div>

        <m.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }} className="flex flex-1 flex-col items-center justify-center px-6 pt-8 pb-6 text-center sm:px-12 lg:px-16">
          <m.img
            src={selo}
            alt="Selo do Jeni Ateliê, Doces Artesanais"
            width={640}
            height={640}
            style={{ rotate: sealRotate }}
            initial={reduce ? false : { opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo }}
            className="mb-6 w-[44%] max-w-[300px] lg:mb-9 lg:w-[clamp(200px,21vw,300px)]"
          />
          <h1 className="font-display text-display text-tinta">
            {hero.title.map((t) => (
              <m.span key={t} variants={line} className="block">{t}</m.span>
            ))}
          </h1>
          <m.p variants={line} className="mx-auto mt-5 mb-8 max-w-[38ch]">{hero.lede}</m.p>
          <m.div variants={line} className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-7">
            <Magnetic className="w-full sm:w-auto">
              <Cta href="#caixa" className="w-full sm:w-auto">{hero.cta}</Cta>
            </Magnetic>
            <TextLink href="#cardapio" className="text-tinta">{hero.secondary}</TextLink>
          </m.div>
        </m.div>

        <nav aria-label="Seções" className="hidden flex-wrap justify-center gap-x-1 px-6 pb-6 lg:flex">
          {navLinks.slice(2).map(({ label, href }) => (
            <a key={href} href={href} className="rounded-full px-4 py-2 text-note text-tinta-suave transition-colors duration-300 hover:bg-papel-2 hover:text-tinta">
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* foto que troca devagar */}
      <figure className="relative order-1 h-[34dvh] overflow-hidden bg-cacau lg:sticky lg:top-3 lg:order-2 lg:h-[calc(100dvh-1.5rem)]">
        <m.div style={{ y: photoY, scale: photoScale }} className="absolute inset-0">
          <AnimatePresence initial={false}>
            <m.img
              key={slide}
              srcSet={slides[slide].pic.srcSet}
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={slides[slide].pic.src}
              width={slides[slide].pic.width}
              height={slides[slide].pic.height}
              alt={slides[slide].alt}
              fetchPriority={slide === 0 ? 'high' : undefined}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1, transition: { opacity: { duration: 1.6, ease: 'easeOut' }, scale: { duration: 7, ease: easeOutExpo } } }}
              exit={{ opacity: 0, transition: { duration: 1.6, delay: 0.2 } }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
        </m.div>
        <div className="absolute bottom-4 left-4 flex gap-1.5" aria-hidden="true">
          {slides.map((_, i) => (
            <span key={i} className="h-1 w-6 overflow-hidden rounded-full bg-papel/35">
              {i === slide && !reduce && (
                <m.span key={slide} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5.6, ease: 'linear' }} className="block h-full origin-left bg-papel" />
              )}
              {i === slide && reduce && <span className="block h-full bg-papel" />}
            </span>
          ))}
        </div>
      </figure>
    </section>
  );
};
