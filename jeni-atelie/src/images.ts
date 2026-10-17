// Fotos do site em webp responsivo; o navegador escolhe pelo `sizes` de cada <img>.
// jeni/  = fotos reais da Jeni, sem fundo (scripts/tratar-fotos.py)
// gerada/ = fotos geradas no Gemini a partir de referências (docs/prompts-gemini.md)
import capa from './assets/img/gerada/capa.jpg?w=640;1024&format=webp&as=metadata';
import jeniPote from './assets/img/jeni/pote.png?w=480;629&format=webp&as=metadata';
import jeniEmpadao from './assets/img/jeni/empadao.png?w=379&format=webp&as=metadata';
import jeniPotesMesa from './assets/img/jeni/potes-mesa.jpg?w=461&format=webp&as=metadata';
import geradaPote from './assets/img/gerada/bolo-de-pote.jpg?w=480;765&format=webp&as=metadata';
import geradaBrownies from './assets/img/gerada/brownies.jpg?w=480;765&format=webp&as=metadata';
import geradaFatia from './assets/img/gerada/fatia.jpg?w=480;765&format=webp&as=metadata';
import geradaPudim from './assets/img/gerada/pudim.jpg?w=480;765&format=webp&as=metadata';
import geradaTorta from './assets/img/gerada/torta-de-maracuja.jpg?w=480;765&format=webp&as=metadata';
import geradaBanoffee from './assets/img/gerada/banoffee.jpg?w=480;765&format=webp&as=metadata';
import geradaCoxinhas from './assets/img/gerada/coxinhas.jpg?w=480;765&format=webp&as=metadata';
import geradaUva from './assets/img/gerada/surpresa-de-uva.jpg?w=480;765&format=webp&as=metadata';
import geradaEmpadao from './assets/img/gerada/empadao.jpg?w=480;765&format=webp&as=metadata';
// selo sem o grão e a sombra do papel da foto original
import seloUrl from './assets/img/selo-jeni-limpo.png?w=600&format=webp&quality=78';

export type Picture = { srcSet: string; src: string; width: number; height: number };

export type PhotoKey =
  | 'capa'
  | 'jeni-pote' | 'jeni-fatia' | 'jeni-empadao' | 'jeni-potes-mesa'
  | 'gerada-pote' | 'gerada-brownies' | 'gerada-fatia' | 'gerada-pudim' | 'gerada-torta'
  | 'gerada-banoffee' | 'gerada-coxinhas' | 'gerada-uva' | 'gerada-empadao';

// Converte as versões do imagetools em srcSet/src/width/height (a proporção evita salto ao carregar)
// (com uma largura só, o imagetools devolve um objeto em vez de lista)
const pic = (versions: ImageVersion[] | ImageVersion, alt: string): Picture & { alt: string } => {
  const list = [versions].flat().sort((a, b) => a.width - b.width);
  const big = list[list.length - 1];
  const mid = list[Math.floor((list.length - 1) / 2)];
  return { srcSet: list.map((v) => `${v.src} ${v.width}w`).join(', '), src: mid.src, width: big.width, height: big.height, alt };
};

const fatia = pic(geradaFatia, 'Fatia de bolo com pão de ló, pudim, doce de leite e chantilly, num pratinho com garfo');

export const photos: Record<PhotoKey, Picture & { alt: string }> = {
  capa: pic(capa, 'Bolo de pote de maracujá, coxinhas de morango, pudim e brownies sobre uma mesa rosa'),
  'jeni-pote': pic(jeniPote, 'Bolo de pote de chocolate com maracujá feito pela Jeni, em camadas, com sementes de maracujá por cima'),
  // o recorte da foto real da fatia manteve a mão e o carimbo de data; usa a versão do Gemini,
  // gerada a partir dessa mesma foto (plano, Tarefa 3, passo 3)
  'jeni-fatia': fatia,
  'jeni-empadao': pic(jeniEmpadao, 'Dois empadões de frango da Jeni em marmitas de alumínio, com a massa dourada'),
  'jeni-potes-mesa': pic(jeniPotesMesa, 'Fileira de bolos de pote da Jeni sobre a mesa, prontos para entregar'),
  'gerada-pote': pic(geradaPote, 'Bolo de pote de chocolate com maracujá ao lado de meio maracujá'),
  'gerada-brownies': pic(geradaBrownies, 'Quatro brownies: tradicional, com Ferrero Rocher, com cobertura de ninho e 50% cacau'),
  'gerada-fatia': fatia,
  'gerada-pudim': pic(geradaPudim, 'Pudim de leite com calda de caramelo escorrendo num pratinho de vidro'),
  'gerada-torta': pic(geradaTorta, 'Fatia de torta de maracujá com cobertura de polpa e sementes'),
  'gerada-banoffee': pic(geradaBanoffee, 'Banoffee no pote com banana, doce de leite e chantilly com canela'),
  'gerada-coxinhas': pic(geradaCoxinhas, 'Coxinhas de morango de chocolate belga, ninho com Nutella e Ferrero Rocher, uma cortada mostrando o morango'),
  'gerada-uva': pic(geradaUva, 'Surpresa de uva no pote, com creme branco, uvas verdes e chocolate por cima'),
  'gerada-empadao': pic(geradaEmpadao, 'Empadão de frango com massa dourada em treliça e recheio cremoso'),
};

export const selo = seloUrl;
