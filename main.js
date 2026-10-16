// Número do WhatsApp do ateliê (DDI + DDD + número, só dígitos). Trocar antes de publicar.
const WHATSAPP = '5511999999999';

document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const waLink = (text) => `https://wa.me/${WHATSAPP}${text ? '?text=' + encodeURIComponent(text) : ''}`;

document.querySelectorAll('[data-whats]').forEach((a) => {
  if (!a.closest('.box')) a.href = waLink('Olá, Jeni! Vim pelo site e queria fazer um orçamento.');
});

/* ── entradas: cada parte da seção sobe em sequência ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

document.querySelectorAll('section, footer').forEach((sec) => {
  sec.querySelectorAll('[data-rise]').forEach((el, i) => {
    el.style.setProperty('--d', `${Math.min(i, 6) * 80}ms`);
    io.observe(el);
  });
});

/* ── capa: as fotos trocam devagar, como luz mudando na cozinha ── */
(() => {
  const imgs = [...document.querySelectorAll('.hero__photo img')];
  if (reduce || imgs.length < 2) return;
  let i = 0, timer;
  const next = () => {
    imgs[i].classList.remove('is-on');
    i = (i + 1) % imgs.length;
    imgs[i].classList.add('is-on');
  };
  const start = () => { clearInterval(timer); timer = setInterval(next, 5600); };
  document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(timer) : start()));
  start();
})();

/* ── monte sua caixa ── */
(() => {
  const root = document.querySelector('.box');
  if (!root) return;
  const controls = root.querySelector('[data-builder]');
  const flavorsEl = root.querySelector('.flavors');
  const svg = root.querySelector('.box__svg');
  const countEl = root.querySelector('.box__count');
  const priceEl = root.querySelector('.box__price');
  const sendEl = root.querySelector('[data-whats]');
  const clearEl = root.querySelector('[data-clear]');
  controls.hidden = false;

  const SIZES = { 4: { cols: 2, price: '22' }, 9: { cols: 3, price: '45' }, 16: { cols: 4, price: '78' } };
  const FLAVORS = [
    { id: 'trad', name: 'Brigadeiro tradicional', note: 'granulado', ball: '#3d2318', top: 'granulado' },
    { id: 'belga', name: 'Brigadeiro belga', note: 'no cacau', ball: '#2a160f', top: 'cacau' },
    { id: 'beij', name: 'Beijinho de coco queimado', note: 'coco tostado', ball: '#efe2c8', top: 'coco' },
    { id: 'ninho', name: 'Ninho com Nutella', note: 'leite em pó', ball: '#f4ead6', top: 'ninho' },
    { id: 'pist', name: 'Pistache', note: 'pistache picado', ball: '#a9b36e', top: 'pistache' },
    { id: 'cama', name: 'Camafeu de nozes', note: 'meia noz', ball: '#e9dcc0', top: 'noz' },
    { id: 'bicho', name: 'Bicho de pé', note: 'açúcar cristal', ball: '#e2a29b', top: 'acucar' },
  ];
  const byId = Object.fromEntries(FLAVORS.map((f) => [f.id, f]));
  const NS = 'http://www.w3.org/2000/svg';

  let size = 9;
  let slots = Array(size).fill(null);

  // forminha de papel: círculo de babados
  const cupPath = (cx, cy, r, n = 18) => {
    let d = '';
    for (let k = 0; k <= n; k++) {
      const a = (k / n) * Math.PI * 2;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      if (k === 0) { d += `M${x.toFixed(1)} ${y.toFixed(1)}`; continue; }
      const m = ((k - 0.5) / n) * Math.PI * 2;
      const qx = cx + Math.cos(m) * (r * 1.12), qy = cy + Math.sin(m) * (r * 1.12);
      d += `Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d + 'Z';
  };

  // pontinhos fixos para a cobertura de cada sabor
  const seeded = (seed) => () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const topping = (f, cx, cy, r, seed = 7) => {
    const rnd = seeded(seed);
    const bits = [];
    const spot = () => {
      const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * r * 0.82;
      return [cx + Math.cos(a) * d, cy + Math.sin(a) * d];
    };
    const n = { granulado: 26, cacau: 30, coco: 22, ninho: 18, pistache: 14, acucar: 26 }[f.top] || 0;
    for (let k = 0; k < n; k++) {
      const [x, y] = spot();
      if (f.top === 'granulado') bits.push(`<rect x="${x - r * .09}" y="${y - r * .03}" width="${r * .18}" height="${r * .06}" rx="${r * .03}" fill="#1b0c07" transform="rotate(${(rnd() * 180) | 0} ${x} ${y})"/>`);
      if (f.top === 'cacau') bits.push(`<circle cx="${x}" cy="${y}" r="${r * .035}" fill="#4a2a1d"/>`);
      if (f.top === 'coco') bits.push(`<rect x="${x}" y="${y}" width="${r * .14}" height="${r * .05}" fill="#c9965c" transform="rotate(${(rnd() * 180) | 0} ${x} ${y})"/>`);
      if (f.top === 'ninho') bits.push(`<circle cx="${x}" cy="${y}" r="${r * .05}" fill="#fffaf0"/>`);
      if (f.top === 'pistache') bits.push(`<rect x="${x}" y="${y}" width="${r * .12}" height="${r * .1}" fill="#6d7a3a"/>`);
      if (f.top === 'acucar') bits.push(`<circle cx="${x}" cy="${y}" r="${r * .04}" fill="#fff7f2"/>`);
    }
    if (f.top === 'noz') bits.push(`<ellipse cx="${cx}" cy="${cy - r * .1}" rx="${r * .42}" ry="${r * .3}" fill="#8a5a33"/><path d="M${cx - r * .38} ${cy - r * .1}H${cx + r * .38}" stroke="#6b4224" stroke-width="${r * .06}"/>`);
    return bits.join('');
  };

  const sweet = (f, cx, cy, r, seed) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f.ball}"/>` +
    `<circle cx="${cx - r * .32}" cy="${cy - r * .34}" r="${r * .22}" fill="#fff" opacity=".14"/>` +
    topping(f, cx, cy, r, seed);

  // botões de sabor
  flavorsEl.innerHTML = FLAVORS.map((f) => `
    <button type="button" class="flavor" data-id="${f.id}" data-n="0" aria-label="Adicionar ${f.name}">
      <svg viewBox="0 0 40 40" aria-hidden="true"><path d="${cupPath(20, 20, 15)}" fill="#d9b8a3"/>${sweet(f, 20, 20, 13, 3)}</svg>
      <span>${f.name}<small>${f.note}</small></span>
    </button>`).join('');

  const render = (popIndex = -1) => {
    const { cols, price } = SIZES[size];
    const cell = 360 / cols;
    const r = cell * 0.34;
    let out = '';
    slots.forEach((id, k) => {
      const cx = (k % cols) * cell + cell / 2;
      const cy = Math.floor(k / cols) * cell + cell / 2;
      const f = id && byId[id];
      out += `<g class="slot${k === popIndex ? ' pop' : ''}" data-k="${k}" role="button" tabindex="${f ? 0 : -1}" aria-label="${f ? 'Tirar ' + f.name : 'Espaço vazio'}">
        <rect x="${cx - cell / 2 + 3}" y="${cy - cell / 2 + 3}" width="${cell - 6}" height="${cell - 6}" fill="#3b2620"/>
        <path d="${cupPath(cx, cy, r * 1.18)}" fill="${f ? '#d9b8a3' : '#5a3d32'}"/>
        ${f ? `<g class="ball">${sweet(f, cx, cy, r, k + 11)}</g>` : ''}
      </g>`;
    });
    svg.innerHTML = out;

    const filled = slots.filter(Boolean).length;
    countEl.textContent = `${filled} de ${size} doces`;
    priceEl.textContent = `R$ ${price}`;
    root.classList.toggle('is-full', filled === size);
    clearEl.hidden = filled === 0;

    const tally = {};
    slots.forEach((id) => id && (tally[id] = (tally[id] || 0) + 1));
    flavorsEl.querySelectorAll('.flavor').forEach((b) => (b.dataset.n = tally[b.dataset.id] || 0));

    const lines = Object.entries(tally).map(([id, n]) => `• ${n} ${byId[id].name}`);
    const missing = size - filled;
    let msg = `Olá, Jeni! Quero encomendar uma caixa com ${size} doces (R$ ${price}).`;
    if (lines.length) msg += `\n\n${lines.join('\n')}`;
    if (missing) msg += `\n\n${missing === size ? 'Pode escolher os sabores por mim.' : `Faltam ${missing}: pode completar com o que achar melhor.`}`;
    msg += '\n\nData que preciso: ';
    sendEl.href = waLink(msg);
  };

  flavorsEl.addEventListener('click', (e) => {
    const b = e.target.closest('.flavor');
    if (!b) return;
    const k = slots.indexOf(null);
    if (k === -1) {
      countEl.textContent = 'Caixa cheia. Toque num doce para tirar.';
      countEl.classList.remove('shake'); void countEl.offsetWidth; countEl.classList.add('shake');
      return;
    }
    slots[k] = b.dataset.id;
    render(reduce ? -1 : k);
  });

  const removeAt = (g) => {
    const k = +g.dataset.k;
    if (!slots[k]) return;
    slots[k] = null;
    render();
  };
  svg.addEventListener('click', (e) => { const g = e.target.closest('.slot'); if (g) removeAt(g); });
  svg.addEventListener('keydown', (e) => {
    const g = e.target.closest('.slot');
    if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); removeAt(g); }
  });

  root.querySelectorAll('input[name="size"]').forEach((inp) => inp.addEventListener('change', () => {
    const kept = slots.filter(Boolean);
    size = +inp.value;
    slots = Array(size).fill(null).map((_, k) => kept[k] || null);
    render();
  }));

  clearEl.addEventListener('click', () => { slots = Array(size).fill(null); render(); });

  // começa com a caixa de 9 já sugerida, para mostrar como fica
  ['belga', 'ninho', 'pist', 'beij', 'belga', 'cama', 'bicho', 'ninho', 'trad'].forEach((id, k) => (slots[k] = id));
  render();
})();
