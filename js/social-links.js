/* Official follow links. Threads and Facebook groups are intentionally excluded. */
(() => {
  'use strict';
  const profiles = [
    ['facebook', 'Facebook 粉絲專頁', 'https://www.facebook.com/ChickenDadJournal/'],
    ['instagram', 'Instagram', 'https://www.instagram.com/chickendadjournal/'],
    ['tiktok', 'TikTok', 'https://www.tiktok.com/@chickendad_official'],
    ['vocus', 'Vocus 方格子', 'https://vocus.cc/salon/jisoopama-baby-cat'],
    ['youtube', 'YouTube', 'https://www.youtube.com/@ChickenDadJournal']
  ];
  function init() {
    if (!document.querySelector('link[href="/css/social-links.css"]')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet'; style.href = '/css/social-links.css'; document.head.append(style);
    }
    let nav = document.querySelector('.cdj-social-links');
    if (!nav) {
      nav = document.createElement('nav'); nav.className = 'cdj-social-links';
      const host = document.querySelector('footer, .footer-cta') || document.body;
      host.insertBefore(nav, host.querySelector(':scope > .cdj-privacy-footer'));
    }
    nav.setAttribute('aria-label', '追蹤雞爸爸');
    const heading = document.createElement('span'); heading.className = 'cdj-social-label'; heading.textContent = '追蹤雞爸爸';
    nav.replaceChildren(heading);
    for (const [platform, title, url] of profiles) {
      const link = document.createElement('a');
      link.href = url; link.textContent = title; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.addEventListener('click', () => {
        if (typeof window.gtag === 'function' && window['ga-disable-G-3L4BC9J8FE'] === false) {
          window.gtag('event', 'social_click', {platform, link_url: url, placement: 'footer'});
        }
      });
      nav.append(link);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true});
  else init();
})();
