import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Ambient } from './components/Ambient';
import { ScrollProgress } from './components/motion';
import { useLenis } from './hooks/motion';

export default function App() {
  useLenis();
  return (
    // domAnimation basta: nada usa layoutId nem animação de layout; reducedMotion "user" respeita o sistema
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a href="#cardapio" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3">
          Pular para o cardápio
        </a>
        <Ambient />
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}
