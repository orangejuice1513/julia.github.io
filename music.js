/* Builds the decorative background: blossom trees, falling petals,
   glowberry vines, and pool caustics. Pure DOM, no dependencies. */

const el = (cls, style) => {
  const d = document.createElement('div');
  d.className = cls;
  if (style) Object.assign(d.style, style);
  return d;
};

/* ---------- cherry blossom trees ---------- */
// [left, top, canopyWidth(px), opacity, tone]
const TREES = [
  ['-6%', '-90px', 380, 0.8, 'deep'],
  ['68%', '-120px', 440, 0.7, 'soft'],
  ['34%', '-160px', 300, 0.5, 'deep'],
];
const BLOSSOMS = [
  ['0%', '18%', '46%', '2px'], ['12%', '0%', '40%', '3px'],
  ['10%', '52%', '44%', '3px'], ['34%', '14%', '38%', '2px'],
  ['36%', '48%', '40%', '3px'], ['26%', '30%', '42%', '1px'],
];

const treeLayer = document.querySelector('.trees');
TREES.forEach(([left, top, width, opacity, tone]) => {
  const light = tone === 'deep' ? '#f7a7c8' : '#ffd3e4';
  const dark = tone === 'deep' ? '#d1719b' : '#f0a2c3';
  const tree = el('tree', { left, top, width: width + 'px', opacity });
  const canopy = el('canopy', { height: Math.round(width * 0.62) + 'px' });
  BLOSSOMS.forEach(([t, l, size, blur]) => {
    canopy.appendChild(el('blossom', {
      top: t, left: l, width: size, height: size, filter: `blur(${blur})`,
      background: `radial-gradient(circle at 40% 35%, ${light}, ${dark} 75%)`,
    }));
  });
  tree.appendChild(canopy);
  treeLayer.appendChild(tree);
});

/* ---------- falling petals ---------- */
const PETALS = [
  ['12%', 7, '#f7c3da', '11s', '0s'], ['28%', 6, '#eba9c6', '14s', '2s'],
  ['47%', 8, '#f7c3da', '12s', '5s'], ['63%', 6, '#eba9c6', '15s', '1s'],
  ['78%', 7, '#f7c3da', '13s', '7s'], ['90%', 6, '#eba9c6', '16s', '3s'],
];
const petalLayer = document.querySelector('.petals');
PETALS.forEach(([left, size, color, dur, delay]) => {
  petalLayer.appendChild(el('petal', {
    left, width: size + 'px', height: size + 'px',
    background: color, animationDuration: dur, animationDelay: delay,
  }));
});

/* ---------- glowberry vines ---------- */
// [left, height(px), swayDuration, berry offsets(px)]
const VINES = [
  ['3%', 320, '7s', [110, 250]],
  ['9%', 190, '6s', [80]],
  ['15%', 420, '8.5s', [140, 300, 390]],
  ['23%', 150, '6.5s', [60]],
  ['57%', 240, '7.5s', [90, 200]],
  ['73%', 175, '6.2s', [120]],
  ['86%', 370, '8.2s', [130, 280]],
  ['95%', 220, '7.8s', [95, 185]],
];
const GREENS = ['#4f7a45', '#5d8c4d', '#3f6638'];
const vineLayer = document.querySelector('.vines');
VINES.forEach(([left, height, sway, berries]) => {
  const vine = el('vine', { left, height: height + 'px', animationDuration: sway });
  vine.appendChild(el('stem'));
  let n = 0;
  for (let y = 18; y < height - 10; y += 22) {
    const right = n % 2 === 0;
    vine.appendChild(el('leaf', {
      top: y + 'px', left: right ? '9px' : '0px',
      width: right ? '7px' : '6px', background: GREENS[n % 3],
    }));
    n++;
  }
  berries.forEach((top, i) => {
    vine.appendChild(el('berry', { top: top + 'px', animationDuration: (2.6 + i * 0.5) + 's' }));
  });
  vineLayer.appendChild(vine);
});

/* ---------- pool caustics ---------- */
const CAUSTICS = [
  ['70px', '10%', '90px', '5px', '5s'], ['120px', '26%', '60px', '4px', '6.5s'],
  ['95px', '48%', '110px', '5px', '7s'], ['165px', '18%', '70px', '4px', '5.8s'],
  ['140px', '66%', '95px', '5px', '6.2s'], ['205px', '40%', '80px', '4px', '7.4s'],
  ['190px', '78%', '65px', '4px', '5.4s'],
];
const causticLayer = document.querySelector('.caustics');
CAUSTICS.forEach(([top, left, w, h, dur]) => {
  causticLayer.appendChild(el('caustic', {
    top, left, width: w, height: h, animationDuration: dur,
  }));
});

/* ---------- pixel axolotls ---------- */
const AXOLOTL_ART = [
  '.........g.g.g..........',
  '........GGGGGGG.........',
  '.........GGGGG..........',
  '...F......PPPPPPPPPP....',
  '..FF....PPPPPPPPPPPPPP..',
  '..FFPPPPPPPPPPPPPEEPPPP.',
  '.FFFPPPPPPPPPPPPWEEPPPPP',
  'FFFFLLLLLLLLLLLLLLLLLPPD',
  'FFFFLLLLLLLLLLLLLLLLLLDD',
  '.FFFLLLLLLLLLLLLLLLLLD..',
  '..FF...LL......LL...D...',
  '.......PP.....PP........',
  '......PPP.....PPP.......',
];
// palette swap: one pink axolotl, one blue
const PINK = { P: '#f6b3d0', L: '#ffe0ee', F: '#eda3c6', D: '#c9749d', G: '#ff92c2', g: '#e56ba3' };
const BLUE = { P: '#a8cdf2', L: '#dfeeff', F: '#93bde8', D: '#6a8fbd', G: '#8fc4ff', g: '#6b9ad9' };
const SHARED = {
  E: '#2b1b22', W: '#ffffff',
  S: '#b9c2c8', s: '#7d878e', i: '#4d5a62', A: '#58c8c0', '.': 'transparent',
};
const PAINT = { ...PINK, ...SHARED };
// [top, pixelSize, swimDuration, delay, bobDuration, palette]
const AXOLOTLS = [
  ['0px', '9px', '26s', '0s', '3.2s', PINK],
  ['96px', '7px', '34s', '6s', '4.1s', BLUE],
];

const swimLayer = document.querySelector('.swimmers');
AXOLOTLS.forEach(([top, px, dur, delay, bob, pal]) => {
  const map = { ...pal, ...SHARED };
  const swimmer = el('swimmer', { top, animationDuration: dur, animationDelay: delay });
  const bobber = el('bobber', { animationDuration: bob });
  const sprite = el('sprite');
  sprite.style.setProperty('--px', px);
  AXOLOTL_ART.forEach((row) => row.split('').forEach((ch) => {
    const cell = document.createElement('i');
    cell.style.background = map[ch];
    sprite.appendChild(cell);
  }));
  bobber.appendChild(sprite);
  swimmer.appendChild(bobber);
  swimLayer.appendChild(swimmer);
});

/* ---------- bucket: click to scoop / release an axolotl ---------- */
const BUCKET_EMPTY = [
  '.SSSSSSSSSS.', '.SiiiiiiiiS.', '.SiiiiiiiiS.', '.SiiiiiiiiS.', '.SiiiiiiiiS.',
  '..SiiiiiiS..', '..SiiiiiiS..', '..SiiiiiiS..', '...SssssS...', '...SSSSSS...',
];
const BUCKET_FULL = [
  '.SSSSSSSSSS.', '.SAAGAGAAAS.', '.SAGPPPPGAS.', '.SAAPEPPAAS.', '.SAAPPPPAAS.',
  '..SAAAAAAS..', '..SAAAAAAS..', '..SAAAAAAS..', '...SssssS...', '...SSSSSS...',
];

const bucket = document.querySelector('.bucket');
const bucketLabel = document.querySelector('.bucket-label');
let caught = false;

function paintBucket() {
  bucket.textContent = '';
  (caught ? BUCKET_FULL : BUCKET_EMPTY).forEach((row) => row.split('').forEach((ch) => {
    const cell = document.createElement('i');
    cell.style.background = PAINT[ch];
    bucket.appendChild(cell);
  }));
  bucketLabel.textContent = caught
    ? 'bucket of axolotl — click to release'
    : 'click the bucket to scoop one up';
  // the big axolotl disappears from the pool while it's in the bucket
  const first = swimLayer.firstElementChild;
  if (first) first.style.display = caught ? 'none' : '';
}

bucket.addEventListener('click', () => { caught = !caught; paintBucket(); });
bucket.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bucket.click(); }
});
paintBucket();
