/* Basic consent mode: no Google script or analytics request until opt-in. */
(() => {
  'use strict';
  if (window.cdjPrivacy) return;
  const ID = 'G-3L4BC9J8FE';
  const KEY = 'cdj.analytics-consent.v1';
  const DAYS = 180, TTL = DAYS * 86400000;
  let started = false, enabled = false, expiryTimer, panel, opener;
  function read() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      return v && ['granted', 'denied'].includes(v.choice) && v.at <= Date.now() && Date.now() - v.at < TTL ? v : null;
    } catch (_) { return null; }
  }
  function clearCookies() {
    const paths = ['/', ...location.pathname.split('/').slice(0, -1).map((_, i, a) => a.slice(0, i + 1).join('/') || '/')];
    for (const item of document.cookie.split(';')) {
      const name = item.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const path of paths) for (const domain of ['', '; domain=' + location.hostname, '; domain=.' + location.hostname]) {
        document.cookie = name + '=; Max-Age=0; path=' + path + domain + '; SameSite=Lax';
      }
    }
  }
  function tag() { window.dataLayer.push(arguments); }
  function start() {
    enabled = true;
    window['ga-disable-' + ID] = false;
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = tag;
    tag('consent', 'default', {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
    tag('consent', 'update', {analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
    tag('js', new Date());
    const page = new URL(location.origin + location.pathname);
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
      const v = new URL(location.href).searchParams.get(k);
      if (v && /^[a-zA-Z0-9_-]{1,100}$/.test(v)) page.searchParams.set(k, v);
    }
    let referrer = '';
    try { referrer = new URL(document.referrer).origin + '/'; } catch (_) {}
    tag('config', ID, {page_location: page.href, page_referrer: referrer, cookie_domain: 'none', cookie_expires: TTL / 1000, cookie_update: false, allow_google_signals: false, allow_ad_personalization_signals: false});
    const script = document.createElement('script');
    script.id = 'cdj-ga4'; script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(script);
  }
  function stop() {
    enabled = false;
    window['ga-disable-' + ID] = true;
    clearCookies();
    // Reload after disabling to remove all vendor timers/listeners, including enhanced measurement.
    if (started) location.reload();
  }
  function schedule(record) {
    clearTimeout(expiryTimer);
    // Browsers cap timer delays; check the fixed consent expiry at least daily.
    expiryTimer = setTimeout(() => { const v = read(); if (!v) { stop(); show(); } else schedule(v); }, Math.min(86400000, Math.max(1, TTL - (Date.now() - record.at))));
  }
  function choose(choice) {
    const record = {choice, at: Date.now()};
    try { localStorage.setItem(KEY, JSON.stringify(record)); } catch (_) {}
    panel.hidden = true;
    if (opener) opener.focus();
    if (choice === 'granted') start(); else stop();
    schedule(record);
  }
  function show() {
    if (!panel) return;
    opener = document.activeElement;
    panel.hidden = false;
    const status = read();
    panel.querySelector('[data-status]').textContent = '目前設定：' + (status ? status.choice === 'granted' ? '已接受分析追蹤' : '已拒絕分析追蹤' : '尚未選擇（不追蹤）');
    panel.querySelector('button').focus();
  }
  window.cdjPrivacy = {open: show};
  window['ga-disable-' + ID] = true;
  function init() {
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = '/css/analytics-consent.css'; document.head.appendChild(css);
    panel = document.createElement('section'); panel.id = 'cdj-consent'; panel.hidden = true;
    panel.setAttribute('role', 'region'); panel.setAttribute('aria-labelledby', 'cdj-consent-title');
    panel.innerHTML = '<h2 id="cdj-consent-title">隱私與分析追蹤</h2><p>經您同意後，本站才會載入 Google Analytics 4，使用 Cookie 分析瀏覽與互動情形，並將資料傳送至 Google。拒絕仍可正常閱讀，亦可隨時於頁尾撤回同意。</p><p><a href="/privacy.html">閱讀隱私權與 Cookie 說明</a></p><p data-status></p><div class="cdj-consent-actions"><button type="button" data-choice="denied">拒絕／撤回分析追蹤</button><button type="button" data-choice="granted">接受分析追蹤</button><button type="button" data-close>稍後決定／關閉</button></div>';
    panel.querySelectorAll('[data-choice]').forEach(b => b.addEventListener('click', () => choose(b.dataset.choice)));
    panel.querySelector('[data-close]').addEventListener('click', () => {panel.hidden = true; if (opener) opener.focus();});
    const footer = document.createElement('div'); footer.className = 'cdj-privacy-footer';
    footer.innerHTML = '<a href="/privacy.html">隱私權說明</a><button type="button">隱私與 Cookie 設定</button>';
    footer.querySelector('button').addEventListener('click', show);
    (document.querySelector('footer') || document.body).appendChild(footer);
    document.body.appendChild(panel);
    const record = read();
    if (record) { if (record.choice === 'granted') start(); else clearCookies(); schedule(record); }
    else { clearCookies(); show(); }
  }
  window.addEventListener('storage', e => { if (e.key !== KEY && e.key !== null) return; const r = read(); if (r && r.choice === 'granted') {start(); schedule(r); if(panel) panel.hidden = true;} else {stop(); if(panel) panel.hidden = true;} });
  window.addEventListener('pageshow', e => { if(e.persisted) {const r=read(); if(!r || r.choice !== 'granted') stop();} });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
