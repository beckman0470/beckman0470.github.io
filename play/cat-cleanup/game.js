const board = document.querySelector('#board');
const vacuum = document.querySelector('#vacuum');
const demo = document.querySelector('#demo');
const progress = document.querySelector('#progress');
const count = document.querySelector('#count');
const finished = document.querySelector('#finished');
const next = document.querySelector('#next');
const locations = [
  [[27,24],[73,19],[49,42],[18,60],[71,65],[40,83]],
  [[18,22],[48,19],[79,27],[31,43],[62,50],[18,69],[78,72],[47,84]]
];
let level = 0;
let remaining;
let pointer;
let previous;

function start() {
  pointer = previous = null;
  board.classList.remove('dragging');
  board.classList.toggle('rug', level === 1);
  board.hidden = false;
  finished.hidden = true;
  board.querySelectorAll('.fur').forEach(pile => pile.remove());
  demo.hidden = level !== 0;
  remaining = progress.max = locations[level].length;
  updateProgress();
  locations[level].forEach(([x, y], i) => {
    const pile = document.createElement('button');
    pile.type = 'button';
    pile.className = 'fur';
    pile.style.left = x + '%';
    pile.style.top = y + '%';
    pile.setAttribute('aria-label', '吸掉第 ' + (i + 1) + ' 團貓毛');
    pile.innerHTML = '<img src="fur.webp" alt="" draggable="false">';
    pile.addEventListener('click', () => clean(pile));
    board.append(pile);
  });
}
function updateProgress() {
  progress.value = progress.max - remaining;
  count.textContent = progress.value + ' / ' + progress.max;
}
function clean(pile) {
  if (pile.disabled) return;
  pile.disabled = true;
  pile.classList.add('cleaned');
  demo.hidden = true;
  remaining--;
  updateProgress();
  if (remaining > 0) return;
  const focusResult = board.contains(document.activeElement);
  board.hidden = true;
  finished.hidden = false;
  document.querySelector('#result').textContent = level === 0 ? '地板乾淨了！' : '地板和地毯都乾淨了！';
  document.querySelector('#next-picture').src = level === 0 ? 'rug.webp' : 'vacuum.webp';
  document.querySelector('#next-label').textContent = level === 0 ? '繼續吸地毯 →' : '再玩一次 ↻';
  if (focusResult) next.focus();
}
function sweep(event) {
  const bounds = board.getBoundingClientRect();
  const point = [event.clientX - bounds.left, event.clientY - bounds.top];
  vacuum.style.left = point[0] + 'px';
  vacuum.style.top = point[1] + 'px';
  const [x, y] = previous ?? point;
  const dx = point[0] - x;
  const dy = point[1] - y;
  const lengthSquared = dx * dx + dy * dy;
  for (const pile of board.querySelectorAll('.fur:not(:disabled)')) {
    const target = pile.getBoundingClientRect();
    const cx = target.left - bounds.left + target.width / 2;
    const cy = target.top - bounds.top + target.height / 2;
    const t = lengthSquared ? Math.max(0, Math.min(1, ((cx - x) * dx + (cy - y) * dy) / lengthSquared)) : 0;
    if (Math.hypot(cx - x - t * dx, cy - y - t * dy) < target.width * .55) clean(pile);
  }
  previous = point;
}
board.addEventListener('pointerdown', event => {
  if (pointer !== null || event.button !== 0) return;
  pointer = event.pointerId;
  board.setPointerCapture(pointer);
  board.classList.add('dragging');
  demo.hidden = true;
  sweep(event);
});
board.addEventListener('pointermove', event => {
  if (!board.hidden && event.pointerId === pointer) sweep(event);
});
function stop(event) {
  if (event.pointerId !== pointer) return;
  pointer = previous = null;
  board.classList.remove('dragging');
}
for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) board.addEventListener(event, stop);
next.addEventListener('click', () => {
  level = (level + 1) % locations.length;
  start();
  board.querySelector('.fur').focus({preventScroll:true});
});
start();
