// Fotos em webp, em mais de um tamanho; o navegador escolhe pelo `sizes` de cada <img>.
import framboesas from './assets/img/picsum-429.jpg?w=640;1100;1600&format=webp&as=metadata';
import chocolate from './assets/img/chocolate-truffles-prep1.jpg?w=640;1100;1600&format=webp&as=metadata';
import confeitando from './assets/img/piping-buttercream-onto-cake.jpg?w=640;1100;1600&format=webp&as=metadata';
import mel from './assets/img/picsum-312.jpg?w=640;1100;1600&format=webp&as=metadata';
import cupcake from './assets/img/chocolate-cupcakes-with-raspberry-buttercream-detail.jpg?w=640;1100;1600&format=webp&as=metadata';
import bico from './assets/img/piping-nozzle-star-cake-decorating-karl-muffler.jpg?w=480;900&format=webp&as=metadata';
import parapeito from './assets/img/picsum-102.jpg?w=800;1600&format=webp&as=metadata';
import brigadeiros from './assets/img/brigadeiros.jpg?w=240;480&format=webp&as=metadata';
import seloUrl from './assets/img/selo-jeni.png?w=600&format=webp&quality=78';
import seloClaroUrl from './assets/img/selo-jeni-claro.png?w=600&format=webp&quality=78';

export type Picture = { srcSet: string; src: string; width: number; height: number };

// Converte as versões do imagetools em srcSet/src/width/height (a proporção evita salto ao carregar)
const pic = (versions: ImageVersion[]): Picture => {
  const list = [...versions].sort((a, b) => a.width - b.width);
  const big = list[list.length - 1];
  const mid = list[Math.floor((list.length - 1) / 2)];
  return { srcSet: list.map((v) => `${v.src} ${v.width}w`).join(', '), src: mid.src, width: big.width, height: big.height };
};

export const img = {
  framboesas: pic(framboesas),
  chocolate: pic(chocolate),
  confeitando: pic(confeitando),
  mel: pic(mel),
  cupcake: pic(cupcake),
  bico: pic(bico),
  parapeito: pic(parapeito),
  brigadeiros: pic(brigadeiros),
};

export const selo = seloUrl;
export const seloClaro = seloClaroUrl;
