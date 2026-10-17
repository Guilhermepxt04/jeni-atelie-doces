// Todo o texto da página fica aqui, para a Jeni revisar num lugar só.
// Preços, prazos, bairro, contatos e a carta são EXEMPLO: confirme com a cliente antes de publicar.

// WhatsApp do ateliê: código do país + DDD + número, só dígitos
export const WHATSAPP_NUMBER = '5511999999999';
export const WHATSAPP_DISPLAY = '(11) 99999-9999';
export const EMAIL = 'contato@jeniatelie.com.br';
export const INSTAGRAM = 'jeniatelie';
export const BAIRRO = 'Vila Mariana, São Paulo';

export const whatsappUrl = (text = 'Olá, Jeni! Vim pelo site e queria fazer um orçamento.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Monte sua caixa', href: '#caixa' },
  { label: 'Como encomendar', href: '#como' },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Contato', href: '#contato' },
];

export const hero = {
  title: ['Doces finos,', 'feitos à mão'],
  lede: 'Brigadeiros, bem-casados, bolos e caixas de presente que a Jeni prepara na semana da sua festa, em poucas encomendas por vez.',
  cta: 'Montar minha caixa',
  secondary: 'Ver o cardápio',
};

export const occasions = {
  statement: 'Uma caixa para cada ocasião. Os sabores mudam com a festa, o número de convidados e o recado escrito no cartão.',
  note: 'Estas são as encomendas que mais saem do ateliê.',
  slips: [
    { title: 'Aniversário', lines: ['100 docinhos para 40 convidados', '40 brigadeiros belgas', '30 ninho com Nutella', '30 beijinhos de coco queimado', 'Forminhas na cor do tema', 'Cartão com o nome'], h: 92, r: -1.5 },
    { title: 'Casamento', lines: ['300 bem-casados', 'Fita de cetim na cor da festa', 'Tag com as iniciais', 'Docinhos finos para a mesa', 'Degustação 30 dias antes'], h: 80, r: 0 },
    { title: 'Chá de bebê', lines: ['60 docinhos', 'Ninho e beijinho', 'Forminhas em tom claro', '12 cupcakes com o nome'], h: 66, r: 1.2 },
    { title: 'Presente', lines: ['Caixa com 9', 'Sabores à sua escolha', 'Laço de cetim', 'Cartão escrito à mão', 'Entrega no endereço'], h: 86, r: 0 },
    { title: 'Empresas', lines: ['A partir de 20 caixas com 4', 'Tag com a sua marca', 'Entrega agendada'], h: 70, r: -1 },
    { title: 'Páscoa', lines: ['Ovo de colher, 350 g', 'Recheio de brigadeiro belga ou ninho com Nutella', 'Pedidos abertos em março'], h: 78, r: 0 },
  ],
};

export type MenuItem = { name: string; desc: string; price: string };
export const menu: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Docinhos finos, o cento',
    items: [
      { name: 'Brigadeiro tradicional', desc: 'Chocolate 50% cacau e granulado', price: 'R$ 190' },
      { name: 'Brigadeiro belga', desc: 'Chocolate belga 54%, enrolado no cacau', price: 'R$ 230' },
      { name: 'Beijinho de coco queimado', desc: 'Coco fresco, tostado no dia', price: 'R$ 200' },
      { name: 'Ninho com Nutella', desc: 'Leite em pó com centro de creme de avelã', price: 'R$ 240' },
      { name: 'Pistache', desc: 'Pistache torrado por dentro e por fora', price: 'R$ 290' },
      { name: 'Camafeu de nozes', desc: 'Nozes, fondant e meia noz por cima', price: 'R$ 280' },
      { name: 'Bicho de pé', desc: 'Morango, passado no açúcar cristal', price: 'R$ 200' },
    ],
  },
  {
    title: 'Por unidade',
    items: [
      { name: 'Bem-casado', desc: 'Pão de ló, doce de leite e fita de cetim', price: 'R$ 6,50' },
      { name: 'Cupcake decorado', desc: 'Chocolate ou baunilha, buttercream', price: 'R$ 12' },
      { name: 'Pão de mel', desc: 'Recheio de doce de leite, banho de chocolate', price: 'R$ 9' },
    ],
  },
  {
    title: 'Bolos, o quilo',
    items: [
      { name: 'Bolo de festa', desc: 'Massa branca ou de chocolate, dois recheios', price: 'R$ 140' },
      { name: 'Brigadeiro com morango', desc: 'Massa de chocolate, morangos inteiros', price: 'R$ 150' },
      { name: 'Semi naked de frutas vermelhas', desc: 'Creme de baunilha, cobertura fina', price: 'R$ 160' },
    ],
  },
  {
    title: 'Caixas de presente',
    items: [
      { name: 'Caixa com 4', desc: 'Sabores à escolha, laço e cartão', price: 'R$ 22' },
      { name: 'Caixa com 9', desc: 'Sabores à escolha, laço e cartão', price: 'R$ 45' },
      { name: 'Caixa com 16', desc: 'Sabores à escolha, laço e cartão', price: 'R$ 78' },
    ],
  },
];

export type Topping = 'granulado' | 'cacau' | 'coco' | 'ninho' | 'pistache' | 'noz' | 'acucar';
export type Flavor = { id: string; name: string; note: string; ball: string; top: Topping };
export const flavors: Flavor[] = [
  { id: 'trad', name: 'Brigadeiro tradicional', note: 'granulado', ball: '#3d2318', top: 'granulado' },
  { id: 'belga', name: 'Brigadeiro belga', note: 'no cacau', ball: '#2a160f', top: 'cacau' },
  { id: 'beij', name: 'Beijinho de coco queimado', note: 'coco tostado', ball: '#efe2c8', top: 'coco' },
  { id: 'ninho', name: 'Ninho com Nutella', note: 'leite em pó', ball: '#f4ead6', top: 'ninho' },
  { id: 'pist', name: 'Pistache', note: 'pistache picado', ball: '#a9b36e', top: 'pistache' },
  { id: 'cama', name: 'Camafeu de nozes', note: 'meia noz', ball: '#e9dcc0', top: 'noz' },
  { id: 'bicho', name: 'Bicho de pé', note: 'açúcar cristal', ball: '#e2a29b', top: 'acucar' },
];

export const boxSizes = [
  { size: 4, cols: 2, price: 22 },
  { size: 9, cols: 3, price: 45 },
  { size: 16, cols: 4, price: 78 },
] as const;

export const process = {
  title: 'Do pedido à entrega',
  text: 'Os doces são feitos na semana da festa. É por isso que o ateliê pede sete dias de antecedência e aceita poucas encomendas por fim de semana.',
  groups: [
    { when: 'Hoje', rows: [['Você escolhe sabores e quantidades', '10 min'], ['A Jeni confirma a data e o valor', 'no mesmo dia'], ['Sinal de 50% no Pix reserva a data', 'até 24 h']] },
    { when: 'Na semana da festa', rows: [['Compra dos ingredientes frescos', '3 dias antes'], ['Massa no fogo e enrolados à mão', '2 dias antes'], ['Forminhas, caixas, laço e cartão', '1 dia antes']] },
    { when: 'No dia', rows: [['Retirada no ateliê ou entrega', 'hora marcada']] },
  ],
  total: ['Seus doces, frescos', '7 dias'],
};

export const letter = [
  'Comecei fazendo brigadeiro para os aniversários da família. Depois vieram os amigos, os amigos dos amigos, e a cozinha de casa ficou pequena.',
  'O ateliê nasceu assim: uma bancada, uma panela de cobre e uma regra que nunca mudou. {Cada doce é enrolado à mão, um por um,} na semana da sua festa.',
  'Por isso trabalho só com encomenda, e com poucas por vez. Prefiro recusar uma data a entregar um doce feito às pressas.',
  'Quando você escreve, sou eu quem responde. A gente conversa sobre a festa, as cores e quem vai estar lá, e eu monto os sabores a partir disso.',
  'Obrigada por pensar no ateliê para um dia importante.',
];

export const faq = {
  title: 'Antes de encomendar',
  facts: ['Encomendas de terça a sábado', 'Sete dias de antecedência, trinta para casamentos', 'Retirada no ateliê ou entrega com taxa por bairro'],
  items: [
    { q: 'Qual é o pedido mínimo?', a: '25 unidades por sabor nos docinhos finos. Caixas de presente, bolos e bem-casados não têm mínimo.' },
    { q: 'Quanto tempo os doces duram?', a: 'Brigadeiros e beijinhos ficam bons por três dias em lugar fresco, fora da geladeira. Bolos com fruta vão para a geladeira e devem ser servidos em até dois dias.' },
    { q: 'Fazem doces sem lactose ou sem glúten?', a: 'Alguns sabores, sob consulta. A cozinha também usa farinha de trigo, então os doces não são indicados para quem tem doença celíaca.' },
    { q: 'Como funciona o pagamento?', a: 'Sinal de 50% no Pix para reservar a data. O restante é pago até a véspera da entrega.' },
    { q: 'Posso escolher as forminhas e a fita?', a: 'Pode. Mande a paleta da festa ou uma foto do convite e a Jeni separa forminhas e fitas no mesmo tom.' },
    { q: 'Vocês entregam no salão de festas?', a: 'Entregam, com hora marcada. A taxa depende do bairro e vem junto com o orçamento.' },
  ],
};

export const hours = [
  ['Terça a sexta', '9h–18h'],
  ['Sábado', '9h–13h'],
  ['Domingo e segunda', 'fechado'],
];

export const credits = [
  { title: 'Brigadeiros', author: 'Rodrigogomesonetwo', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', page: 'https://commons.wikimedia.org/w/index.php?curid=89908490' },
  { title: 'Chocolate truffles, prep1', author: 'gran', license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/', page: 'https://commons.wikimedia.org/w/index.php?curid=14996151' },
  { title: 'Piping buttercream onto cake', author: 'Michael Prudhomme', license: 'CC BY 2.5', licenseUrl: 'https://creativecommons.org/licenses/by/2.5/', page: 'https://commons.wikimedia.org/wiki/File:Piping_buttercream_onto_cake.JPG' },
  { title: 'Piping Nozzle, Star', author: 'Museums Victoria', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', page: 'https://collections.museumsvictoria.com.au/items/1347681' },
  { title: 'Chocolate Cupcakes with Raspberry Buttercream', author: 'Whitney', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', page: 'https://commons.wikimedia.org/w/index.php?curid=10390036' },
  { title: 'Framboesas e mel', author: 'Glen Carrie, Ben Moore e Sonja Langford', license: 'Licença Unsplash', licenseUrl: 'https://unsplash.com/license', page: 'https://unsplash.com/license' },
];
