// ChickenDad Journal homepage hero scheme B patch v4.1
// Static browser-side patch. No Python needed.
// Only changes homepage hero text. It does not change images or other sections.

document.addEventListener('DOMContentLoaded', () => {
  const heroCopy = document.querySelector('.hero-copy');
  if (!heroCopy) return;

  const kicker = heroCopy.querySelector('.hero-kicker');
  if (kicker) {
    kicker.setAttribute('aria-hidden', 'true');
  }

  const title = heroCopy.querySelector('h1');
  if (title) {
    title.classList.add('hero-title');
    title.innerHTML = '用科學理解生活 用陪伴記錄成長';
  }

  const quote = heroCopy.querySelector('.hero-quote');
  if (quote) {
    quote.innerHTML = '學問求知識，研究生智慧；<br>覺悟得玄機，了解道真理。';
  }
});
