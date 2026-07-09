// ChickenDad Journal homepage section title patch v4.5
// Changes only:
// ❦ 探索雞爸爸一家的生活研究 ❦
// into:
// ❦ 生活研究室 ❦
// 行勝於言 厚德載物

document.addEventListener('DOMContentLoaded', () => {
  const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
  const target = headings.find((el) =>
    (el.textContent || '').replace(/\s+/g, '').includes('探索雞爸爸一家的生活研究')
  );

  if (!target) return;

  target.textContent = '生活研究室';

  const titleRow =
    target.closest('.section-title-row') ||
    target.closest('.section-heading') ||
    target.parentElement;

  if (!titleRow) return;

  titleRow.classList.add('cdj-lab-section-heading');

  // Remove duplicate subtitle if script runs twice.
  const oldSubtitle = titleRow.parentElement?.querySelector('.cdj-lab-section-subtitle');
  if (oldSubtitle) oldSubtitle.remove();

  const subtitle = document.createElement('p');
  subtitle.className = 'cdj-lab-section-subtitle';
  subtitle.textContent = '行勝於言 厚德載物';

  titleRow.insertAdjacentElement('afterend', subtitle);
});
