// Todo o texto e o cardápio da página ficam aqui, para a Jeni revisar num lugar só.
// Preços e sabores são reais (passados pela cliente). WhatsApp, e-mail, Instagram,
// horários e as respostas das dúvidas ainda são EXEMPLO: confirme antes de publicar.
import type { PhotoKey } from './images';

// WhatsApp do ateliê: código do país + DDD + número, só dígitos
export const WHATSAPP_NUMBER = '5511999999999';
export const WHATSAPP_DISPLAY = '(11) 99999-9999';
export const EMAIL = 'contato@jeniatelie.com.br';
export const INSTAGRAM = 'jeniatelie';

// Bairros atendidos, com entrega grátis. O CEP de referência não vai para a página.
export const areas = ['Vila Cosmopolita', 'Tatuapé'] as const;
export const CITY = 'São Paulo';

// iFood e 99Food estão fechados: aparecem como "em breve", sem link.
// Quando reabrirem, preencha url e troque soon para false.
export const channels = {
  ifood: { label: 'iFood', soon: true, url: null as string | null },
  food99: { label: '99Food', soon: true, url: null as string | null },
};

export type GroupId = 'potes' | 'brownies' | 'fatias' | 'coxinhas' | 'unitarios' | 'salgado';
export type Tone = 'caramelo' | 'cacau' | 'pessego' | 'rosa' | 'lilas' | 'manteiga';
export type MenuItem = { id: string; name: string; price: number };
export type MenuGroup = {
  id: GroupId;
  title: string;
  /** como o item aparece na mensagem do pedido: "Bolo de pote Prestígio" */
  prefix: string;
  blurb: string;
  tone: Tone;
  photos: PhotoKey[];
  items: MenuItem[];
};

export const menu: MenuGroup[] = [
  {
    id: 'potes',
    title: 'Bolos de pote',
    prefix: 'Bolo de pote',
    blurb: 'Camadas de massa fofinha e creme até a borda do pote. Dá para comer de colher, gelado.',
    tone: 'caramelo',
    photos: ['jeni-pote', 'gerada-pote'],
    items: [
      { id: 'pote-choco-maracuja', name: 'Chocolate com maracujá', price: 22 },
      { id: 'pote-branca-maracuja', name: 'Massa branca com maracujá', price: 22 },
      { id: 'pote-ninho-morango', name: 'Ninho com morango', price: 20 },
      { id: 'pote-belga', name: 'Chocolate belga', price: 20 },
      { id: 'pote-cenoura', name: 'Cenoura com chocolate', price: 22 },
      { id: 'pote-prestigio', name: 'Prestígio', price: 20 },
      { id: 'pote-pudim', name: 'Bolo de pudim', price: 20 },
    ],
  },
  {
    id: 'brownies',
    title: 'Brownies',
    prefix: 'Brownie',
    blurb: 'Casquinha que estala por cima e o meio molhadinho, do jeito que brownie tem que ser.',
    tone: 'cacau',
    photos: ['gerada-brownies'],
    items: [
      { id: 'brownie-tradicional', name: 'Tradicional', price: 15 },
      { id: 'brownie-ferrero', name: 'Ferrero Rocher', price: 22 },
      { id: 'brownie-ninho', name: 'Ninho', price: 20 },
      { id: 'brownie-cacau-50', name: '50% Cacau', price: 18 },
    ],
  },
  {
    id: 'fatias',
    title: 'Fatias',
    prefix: 'Fatia',
    blurb: 'Uma fatia generosa para quem quer um pedaço de bolo sem esperar a festa.',
    tone: 'pessego',
    photos: ['jeni-fatia', 'gerada-pudim', 'gerada-torta', 'gerada-banoffee'],
    items: [
      { id: 'fatia-choco-maracuja', name: 'Chocolate com maracujá', price: 15 },
      { id: 'fatia-ninho-morango', name: 'Ninho com morango', price: 18 },
      { id: 'fatia-torta-maracuja', name: 'Torta de maracujá', price: 14 },
      { id: 'fatia-pudim', name: 'Pudim', price: 16 },
      { id: 'fatia-banoffee', name: 'Banoffee', price: 18 },
    ],
  },
  {
    id: 'coxinhas',
    title: 'Coxinhas de morango',
    prefix: 'Coxinha de morango',
    blurb: 'Um morango inteiro escondido no brigadeiro. A primeira mordida é sempre a melhor.',
    tone: 'rosa',
    photos: ['gerada-coxinhas'],
    items: [
      { id: 'coxinha-belga', name: 'Chocolate belga', price: 20 },
      { id: 'coxinha-ninho-nutella', name: 'Ninho com Nutella', price: 20 },
      { id: 'coxinha-ferrero', name: 'Ferrero Rocher', price: 22 },
    ],
  },
  {
    id: 'unitarios',
    title: 'Surpresa de uva e morango',
    prefix: '',
    blurb: 'Fruta fresca com creme e chocolate, para quem gosta do doce com um azedinho.',
    tone: 'lilas',
    photos: ['gerada-uva'],
    items: [
      { id: 'surpresa-de-uva', name: 'Surpresa de uva', price: 15 },
      { id: 'morango-cravejado', name: 'Morango cravejado', price: 18 },
    ],
  },
  {
    id: 'salgado',
    title: 'Salgado',
    prefix: '',
    blurb: 'Para equilibrar a mesa: massa que desmancha e recheio cremoso de frango.',
    tone: 'manteiga',
    photos: ['jeni-empadao', 'gerada-empadao'],
    items: [{ id: 'empadao-frango', name: 'Empadão de frango', price: 18 }],
  },
];

const itemIndex = new Map(menu.flatMap((g) => g.items.map((i) => [i.id, { ...i, group: g.id }] as const)));

export const findItem = (id: string): (MenuItem & { group: GroupId }) | undefined => itemIndex.get(id);
export const findGroup = (id: GroupId): MenuGroup => menu.find((g) => g.id === id)!;

/** "R$ 15" para valores inteiros, "R$ 6,50" quando há centavos; espaço normal depois do R$. */
export const formatBRL = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/ /g, ' ');

export const minPrice = Math.min(...menu.flatMap((g) => g.items.map((i) => i.price)));

export const steps = [
  'Escolha os doces aqui no cardápio e envie o pedido pelo WhatsApp.',
  'A Jeni confirma o que tem pronto e combina o dia do que for por encomenda.',
  'Você retira ou recebe em casa, sem taxa, na Vila Cosmopolita e no Tatuapé.',
];

export const hours = [
  ['Terça a sexta', '9h–18h'],
  ['Sábado', '9h–13h'],
  ['Domingo e segunda', 'fechado'],
] as const;

export const faq = [
  {
    q: 'Os doces são pronta-entrega?',
    a: 'Os doces do cardápio ficam prontos enquanto durar o estoque. Se um sabor acabar, a Jeni faz sob encomenda e combina a data com você.',
  },
  {
    q: 'Com quanto tempo de antecedência encomendo um bolo inteiro?',
    a: 'Depende do bolo e do tamanho. Mande a data da festa pelo WhatsApp e a Jeni responde com o prazo e o valor.',
  },
  {
    q: 'Vocês entregam?',
    a: 'Entregamos sem taxa na Vila Cosmopolita e no Tatuapé. Se preferir, é só retirar com a Jeni no horário combinado.',
  },
  {
    q: 'Tem pedido mínimo?',
    a: 'Não. Pode pedir um bolo de pote só para você.',
  },
  {
    q: 'Quanto tempo os doces duram?',
    a: 'Bolos de pote, fatias e pudim ficam bons por até três dias na geladeira. Brownie dura um pouco mais, bem fechado, fora dela.',
  },
  {
    q: 'Como pago?',
    a: 'Pix, cartão ou dinheiro na entrega ou na retirada. A Jeni confirma tudo junto com o pedido.',
  },
];
