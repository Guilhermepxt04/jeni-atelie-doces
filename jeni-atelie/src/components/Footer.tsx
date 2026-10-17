import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { BAIRRO, EMAIL, INSTAGRAM, WHATSAPP_DISPLAY, credits, whatsappUrl } from '../content';
import { img, seloClaro } from '../images';
import { inView, rise, stagger, useReducedMotion } from '../hooks/motion';

// O rodapé é o verso do cartão: recado, endereço, selo de correio e, por fim, o selo grande.
export const Footer = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -35, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.86, 1]);

  const links = [
    { label: `WhatsApp ${WHATSAPP_DISPLAY}`, href: whatsappUrl(), external: true },
    { label: EMAIL, href: `mailto:${EMAIL}` },
    { label: `Instagram @${INSTAGRAM}`, href: `https://instagram.com/${INSTAGRAM}`, external: true },
    { label: BAIRRO, href: '#contato' },
  ];

  return (
    <footer className="bg-cacau px-4 pt-24 pb-10 text-papel sm:px-6 lg:pt-44">
      <div className="mx-auto max-w-[74rem]">
        <div aria-hidden="true" className="edge-postcard" />
        <m.div {...inView} variants={stagger(0.08)} className="relative grid gap-10 bg-papel px-6 pt-14 pb-8 text-tinta sm:px-12 lg:min-h-[26rem] lg:grid-cols-2 lg:px-18 lg:pt-18">
          <m.div variants={rise} className="max-w-[40ch] pr-20 lg:pr-0">
            <p className="mb-5 font-display text-statement">Até a próxima festa</p>
            <p>Obrigada pela visita. Se a data ainda está longe, guarde este cartão. Se está perto, escreva logo: a agenda do mês fecha rápido.</p>
            <p className="mt-3">Com carinho, Jeni.</p>
          </m.div>
          <m.div variants={rise} className="lg:relative lg:pt-32">
            <m.img
              whileHover={{ rotate: 0, scale: 1.04 }}
              initial={{ rotate: 4 }}
              srcSet={img.brigadeiros.srcSet}
              sizes="96px"
              src={img.brigadeiros.src}
              width={img.brigadeiros.width}
              height={img.brigadeiros.height}
              alt="Brigadeiros, beijinhos e bichos de pé em forminhas"
              loading="lazy"
              className="absolute top-6 right-6 aspect-[3/4] w-16 border-[6px] border-papel bg-papel object-cover outline-1 outline-tinta/10 sm:w-22 lg:top-0 lg:right-0"
            />
            <ul className="grid gap-3 text-[1.0625rem]">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})} className="transition-colors duration-300 hover:text-cobre hover:underline hover:underline-offset-4">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
          <p className="self-end text-center text-note text-tinta-suave lg:col-span-2">© 2026 Jeni Ateliê · Doces Artesanais</p>
        </m.div>

        <m.img
          ref={ref}
          style={{ rotate, scale }}
          src={seloClaro}
          alt="Jeni Ateliê"
          width={640}
          height={640}
          loading="lazy"
          className="mx-auto mt-24 w-[min(78vw,34rem)] lg:mt-36"
        />

        <div className="mx-auto mt-20 max-w-[62ch] text-note text-papel/70">
          <p>Fotos ilustrativas, de acervos abertos. Não são produtos do ateliê.</p>
          <p className="mt-1.5">
            {credits.map((c, i) => (
              <span key={c.title}>
                “{c.title}”, {c.author}, <a href={c.licenseUrl} className="underline underline-offset-2 hover:text-papel">{c.license}</a>
                {c.page !== c.licenseUrl && <>, <a href={c.page} className="underline underline-offset-2 hover:text-papel">fonte</a></>}
                {i < credits.length - 1 ? '. ' : '.'}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};
