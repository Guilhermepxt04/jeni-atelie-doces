import { m } from 'framer-motion';
import { EMAIL, letter } from '../content';
import { selo } from '../images';
import { easeOutExpo } from '../theme';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';

// Trecho entre { } vira o grifo que se acende quando a carta entra na tela
const Paragraph = ({ text }: { text: string }) => {
  const reduce = useReducedMotion();
  const match = text.match(/^(.*)\{(.*)\}(.*)$/);
  if (!match) return <m.p variants={rise}>{text}</m.p>;
  const [, before, marked, after] = match;
  return (
    <m.p variants={rise}>
      {before}
      <m.mark
        initial={reduce ? false : { backgroundColor: 'rgba(230, 211, 203, 0)' }}
        whileInView={{ backgroundColor: 'rgba(230, 211, 203, 1)' }}
        viewport={{ once: true, margin: '0px 0px -25% 0px' }}
        transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.4 }}
        className="bg-blush px-[0.15em] text-inherit [box-decoration-break:clone]"
      >
        {marked}
      </m.mark>
      {after}
    </m.p>
  );
};

export const Letter = () => (
  <section id="sobre" aria-labelledby="sobre-t" className="flex flex-col items-center px-3 py-24 sm:px-6 lg:py-44">
    <h2 id="sobre-t" className="sr-only">Uma carta da Jeni</h2>
    <m.article
      initial={{ opacity: 0, y: 60, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.3, ease: easeOutExpo }}
      className="relative w-full max-w-[40rem]"
    >
      <m.div {...inView} variants={stagger(0.06, 0.15)} className="relative space-y-[1.4em] rounded-[2rem] bg-papel px-6 pt-12 pb-16 sm:px-15">
        <m.img variants={rise} src={selo} alt="" width={640} height={640} loading="lazy" className="size-16" />
        {letter.map((p) => <Paragraph key={p} text={p} />)}
        <m.div variants={rise} className="pt-4">
          <p className="font-display text-statement italic">Jeni</p>
          <p className="text-note text-tinta-suave">Confeiteira e dona do ateliê</p>
        </m.div>
      </m.div>
    </m.article>

    <m.div {...inView} variants={rise} className="mt-3 w-full max-w-[40rem] overflow-clip rounded-[1.75rem] bg-papel px-6 pb-6 sm:px-15">
      <div aria-hidden="true" className="perforation -mx-6 mb-5 sm:-mx-15" />
      <p>
        Para orçamentos por e-mail:{' '}
        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent('Orçamento de doces')}`} className="font-semibold underline underline-offset-4 transition-colors hover:text-cobre">
          {EMAIL}
        </a>
      </p>
    </m.div>
  </section>
);
