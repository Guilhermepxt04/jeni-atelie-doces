import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Ambient } from './components/Ambient';
import { FlavorRibbon } from './components/FlavorRibbon';
import { Showcase } from './components/Showcase';
import { CakeOrder } from './components/CakeOrder';
import { HowToOrder } from './components/HowToOrder';
import { About } from './components/About';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { CartProvider } from './cart-context';
import { CartBar } from './components/CartBar';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';
import { ScrollProgress } from './components/motion';
import { useLenis } from './hooks/motion';

export default function App() {
  useLenis();
  return (
    // domAnimation basta: nada usa layoutId nem animação de layout; reducedMotion "user" respeita o sistema
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <CartProvider>
        <a href="#cardapio" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3">
          Pular para o cardápio
        </a>
        <Ambient />
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <FlavorRibbon />
          <Showcase />
          <CakeOrder />
          <HowToOrder />
          <About />
          <Faq />
        </main>
        <Footer />
        <CartBar />
        <FloatingWhatsapp />
      </CartProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
