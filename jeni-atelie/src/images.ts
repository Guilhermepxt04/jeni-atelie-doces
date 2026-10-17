// Fotos do site em webp responsivo; o navegador escolhe pelo `sizes` de cada <img>.
// jeni/  = fotos reais da Jeni, sem fundo (scripts/tratar-fotos.py)
// gerada/ = fotos geradas no Gemini a partir de referências (docs/prompts-gemini.md)
import capa from './assets/img/gerada/capa.jpg?w=800;1600;2400&format=webp&as=metadata';
import jeniPote from './assets/img/jeni/pote.png?w=480;629&format=webp&as=metadata';
import jeniEmpadao from './assets/img/jeni/empadao.png?w=379&format=webp&as=metadata';
import geradaPote from './assets/img/gerada/bolo-de-pote.jpg?w=480;765&format=webp&as=metadata';
import geradaBrownies from './assets/img/gerada/brownies.jpg?w=480;765&format=webp&as=metadata';
import geradaFatia from './assets/img/gerada/fatia.jpg?w=480;765&format=webp&as=metadata';
import geradaPudim from './assets/img/gerada/pudim.jpg?w=480;800;1200&format=webp&as=metadata';
// gerado no Gemini a partir da foto real dos potes da Jeni (fotos-jeni/)
import geradaPotesMesa from './assets/img/gerada/potes-mesa.jpg?w=480;800;1200&format=webp&as=metadata';
import geradaTorta from './assets/img/gerada/torta-de-maracuja.jpg?w=480;765&format=webp&as=metadata';
import geradaBanoffee from './assets/img/gerada/banoffee.jpg?w=480;765&format=webp&as=metadata';
import geradaCoxinhas from './assets/img/gerada/coxinhas.jpg?w=480;765&format=webp&as=metadata';
import geradaUva from './assets/img/gerada/surpresa-de-uva.jpg?w=480;765&format=webp&as=metadata';
import geradaEmpadao from './assets/img/gerada/empadao.jpg?w=480;765&format=webp&as=metadata';
// gerado no Gemini a partir da foto real do bolo da Jeni (fotos-jeni/bolo-inteiro-real.jpeg)
import geradaBoloInteiro from './assets/img/gerada/bolo-inteiro.jpg?w=480;800;1200&format=webp&as=metadata';
// selo sem o grão e a sombra do papel da foto original
import seloUrl from './assets/img/selo-jeni-limpo.png?w=600&format=webp&quality=78';

export type Picture = { srcSet: string; src: string; width: number; height: number };

export type PhotoKey =
  | 'capa'
  | 'jeni-pote' | 'jeni-fatia' | 'jeni-empadao' 
  | 'gerada-pote' | 'gerada-potes-mesa' | 'gerada-brownies' | 'gerada-fatia' | 'gerada-pudim' | 'gerada-torta'
  | 'gerada-banoffee' | 'gerada-coxinhas' | 'gerada-uva' | 'gerada-empadao' | 'gerada-bolo-inteiro';

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
  'gerada-pote': pic(geradaPote, 'Bolo de pote de chocolate com maracujá ao lado de meio maracujá'),
  'gerada-brownies': pic(geradaBrownies, 'Quatro brownies: tradicional, com Ferrero Rocher, com cobertura de ninho e 50% cacau'),
  'gerada-fatia': fatia,
  'gerada-pudim': pic(geradaPudim, 'Fatia de bolo pudim com pão de ló, creme e pudim com calda de caramelo, num pratinho com garfo'),
  'gerada-potes-mesa': pic(geradaPotesMesa, 'Fileira de bolos de pote de vários sabores sobre a mesa rosa, prontos para entregar'),
  'gerada-torta': pic(geradaTorta, 'Fatia de torta de maracujá com cobertura de polpa e sementes'),
  'gerada-banoffee': pic(geradaBanoffee, 'Banoffee no pote com banana, doce de leite e chantilly com canela'),
  'gerada-coxinhas': pic(geradaCoxinhas, 'Coxinhas de morango de chocolate belga, ninho com Nutella e Ferrero Rocher, uma cortada mostrando o morango'),
  'gerada-uva': pic(geradaUva, 'Surpresa de uva no pote, com creme branco, uvas verdes e chocolate por cima'),
  'gerada-empadao': pic(geradaEmpadao, 'Empadão de frango com massa dourada em treliça e recheio cremoso'),
  'gerada-bolo-inteiro': pic(geradaBoloInteiro, 'Bolo inteiro de massa branca com recheio de morango, coberto de creme e morangos banhados no chocolate branco, com uma fatia servida ao lado'),
};

export const selo = seloUrl;
