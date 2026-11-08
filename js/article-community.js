/* Shared public article reactions. Local storage holds a session, never public counts/comments. */
(() => {
  'use strict';
  if (window.__cdjCommunityLoaded) return;
  window.__cdjCommunityLoaded = true;
  const root = new URL('../', document.currentScript.src);
  const sessionKey = 'cdj-community-session-v1';
  const path = location.pathname.replace(/\/+$/, '');
  const detail = /^\/articles\/[^/]+\.html$/.test(path);
  const listing = path === '/articles.html';
  if (!detail && !listing) return;
  const el = (tag, cls, value) => {
    const e = document.createElement(tag); if (cls) e.className = cls;
    if (value !== undefined) e.textContent = value; return e;
  };
  let config, session, loginPromise, loading = false, busy = false, page = 0, lastStats;
  let widget, like, note, list, more, submit, name, content, commentCount, refresh;
  const readSession = () => { try { return JSON.parse(localStorage.getItem(sessionKey)); } catch (_) { return null; } };
  const saveSession = s => { session = s; try { localStorage.setItem(sessionKey, JSON.stringify(s)); } catch (_) {} };
  async function request(route, body, token) {
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(config.supabaseUrl + route, {
        method: 'POST', signal: controller.signal,
        headers: {'apikey': config.publishableKey, 'Content-Type': 'application/json', ...(token ? {'Authorization': 'Bearer ' + token} : {})},
        body: JSON.stringify(body)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) { const e = new Error(data.message || data.msg || data.error_description || data.error || '連線失敗'); e.code = data.code; e.status = response.status; throw e; }
      return data;
    } finally { clearTimeout(timer); }
  }
  const rpc = (fn, args, token) => request('/rest/v1/rpc/' + fn, args, token);
  async function token(create = false) {
    session = readSession() || session;
    if (session?.access_token && session.expires_at > Date.now() / 1000 + 60) return session.access_token;
    if (!session?.refresh_token && !create) return undefined;
    if (!loginPromise) {
      const run = async () => {
        session = readSession() || session;
        if (session?.access_token && session.expires_at > Date.now() / 1000 + 60) return session.access_token;
        let data;
        if (session?.refresh_token) {
          try { data = await request('/auth/v1/token?grant_type=refresh_token', {refresh_token: session.refresh_token}); }
          catch (e) { if (e.status !== 400 && e.status !== 401) throw e; session = null; try { localStorage.removeItem(sessionKey); } catch (_) {} }
        }
        if (!data && create) data = await request('/auth/v1/signup', {data: {source: 'chickendad-community'}});
        if (!data) return undefined;
        if (!data.access_token || !data.refresh_token) throw new Error('暫時無法建立讀者身分，請稍後再試。');
        saveSession({...data, expires_at: data.expires_at || Math.floor(Date.now() / 1000) + data.expires_in});
        return session.access_token;
      };
      loginPromise = (navigator.locks ? navigator.locks.request('cdj-community-session', run) : run()).finally(() => { loginPromise = null; });
    }
    return loginPromise;
  }
  function message(error) {
    console.warn('CDJ community request:', error.code || error.status || '', error.message);
    if (error.message.includes('CDJ_WAIT')) return '留言已送出過囉，請稍等 30 秒再留下一則。';
    if (error.message.includes('CDJ_LIMIT')) return '今天已留下很多分享，明天再來聊聊吧。';
    if (error.message.includes('Anonymous sign-ins are disabled')) return '互動功能尚未啟用，請稍後再來。';
    return '暫時無法連線，請稍後重試。你的文字仍保留在這裡。';
  }
  function status(text) { if (note) note.textContent = text; }
  function updateStats(s) {
    if (!s) return; lastStats = s;
    like.textContent = (s.liked ? '♥ 已按讚' : '♡ 喜歡這篇') + ' · ' + s.likes;
    like.setAttribute('aria-pressed', String(s.liked));
    commentCount.textContent = '聊聊這篇日常 · ' + s.comments + ' 則留言';
  }
  async function loadComments(t, reset) {
    const offset = reset ? 0 : page;
    const rows = await rpc('cdj_comments', {p_article: path, p_offset: offset}, t);
    if (reset) { list.replaceChildren(); page = 0; }
    rows.forEach(row => {
      const item = el('article', 'cdj-comment'), header = el('div', 'cdj-comment-meta');
      const time = el('time', '', new Date(row.created_at).toLocaleString('zh-TW', {dateStyle: 'medium', timeStyle: 'short'}));
      time.dateTime = row.created_at;
      header.append(el('strong', '', row.nickname), time);
      item.append(header, el('p', 'cdj-comment-text', row.body)); list.append(item);
    });
    page += rows.length;
    if (!page) list.append(el('p', 'cdj-community-empty', '還沒有留言，歡迎留下第一句話。'));
    more.hidden = rows.length < 20 || page >= Number(lastStats?.comments || 0);
  }
  async function reload(reset = true) {
    if (loading || busy) return; loading = true;
    try {
      const t = await token();
      const stats = await rpc('cdj_stats', {p_articles: [path]}, t);
      updateStats(stats[0]);
      await loadComments(t, reset);
      like.disabled = false; submit.disabled = false;
      status('大家都看得到這裡的讚數和留言。');
    } catch (_) { status('互動區暫時無法載入，請按「重新整理留言」再試一次。'); }
    finally { loading = false; }
  }
  async function initDetail() {
    const main = document.querySelector('main'); if (!main) return;
    widget = el('section', 'cdj-community'); widget.id = 'article-community';
    widget.setAttribute('aria-labelledby', 'cdj-community-title');
    widget.append(el('p', 'cdj-community-kicker', '讀完了，留下一點回音'));
    const heading = el('h2', '', '喜歡這篇日常嗎？'); heading.id = 'cdj-community-title'; widget.append(heading);
    like = el('button', 'cdj-like', '♡ 喜歡這篇 · 載入中'); like.type = 'button'; like.disabled = true; like.setAttribute('aria-pressed', 'false');
    widget.append(like);
    commentCount = el('h3', '', '聊聊這篇日常'); widget.append(commentCount);
    const form = el('form', 'cdj-comment-form');
    name = el('input'); name.id = 'cdj-comment-name'; name.name = 'nickname'; name.required = true; name.maxLength = 30; name.autocomplete = 'nickname'; name.placeholder = '怎麼稱呼你？';
    content = el('textarea'); content.id = 'cdj-comment-body'; content.name = 'comment'; content.required = true; content.maxLength = 1000; content.rows = 4; content.placeholder = '留一句感想，或分享你家的日常……';
    const nameLabel = el('label', '', '暱稱'); nameLabel.htmlFor = name.id;
    const bodyLabel = el('label', '', '想說的話'); bodyLabel.htmlFor = content.id;
    const hint = el('p', 'cdj-community-hint', '不必註冊，填暱稱就能留言。留言與暱稱會公開，請不要填寫電話、地址等私人資料。');
    submit = el('button', 'cdj-submit', '送出留言'); submit.type = 'submit'; submit.disabled = true;
    note = el('p', 'cdj-community-status', '正在載入大家的回音……'); note.setAttribute('role', 'status');
    form.append(nameLabel, name, bodyLabel, content, hint, submit); widget.append(form, note);
    list = el('div', 'cdj-comments'); list.setAttribute('aria-label', '讀者留言');
    more = el('button', 'cdj-community-more', '載入更多留言'); more.type = 'button'; more.hidden = true;
    refresh = el('button', 'cdj-community-refresh', '重新整理留言'); refresh.type = 'button';
    widget.append(list, more, refresh);
    const reading = main.querySelector('.cdj-article-reading'); if (reading) reading.before(widget); else main.append(widget);
    like.addEventListener('click', async () => {
      if (busy || loading || !lastStats) return; busy = true; like.disabled = true;
      try {
        const t = await token(true);
        const s = await rpc('cdj_like', {p_article: path, p_liked: !lastStats.liked}, t);
        updateStats(s[0]); status(lastStats.liked ? '謝謝你的喜歡！' : '已收回按讚。');
      } catch (e) { status(message(e)); }
      finally { busy = false; like.disabled = false; }
    });
    form.addEventListener('submit', async event => {
      event.preventDefault(); if (busy || loading || !form.reportValidity()) return;
      if (!name.value.trim() || !content.value.trim()) { status('請填寫暱稱和留言內容。'); return; }
      busy = true; submit.disabled = true;
      let sent = false;
      try {
        const t = await token(true);
        await rpc('cdj_comment', {p_article: path, p_nickname: name.value.trim(), p_body: content.value.trim()}, t);
        content.value = ''; sent = true;
      } catch (e) { status(message(e)); }
      finally { busy = false; submit.disabled = false; }
      if (sent) { await reload(); status('留言已公開，謝謝你留下這段日常。'); }
    });
    refresh.addEventListener('click', () => reload());
    more.addEventListener('click', async () => {
      if (loading || busy) return; loading = true; more.disabled = true;
      try { await loadComments(await token(), false); } catch (_) { status('留言暫時無法載入，請重試。'); }
      finally { loading = false; more.disabled = false; }
    });
    await reload();
    setInterval(() => { if (!document.hidden && !content.value.trim()) reload(); }, 30000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) reload(); });
    window.addEventListener('storage', event => { if (event.key === sessionKey) reload(); });
  }
  async function initListing() {
    const cards = [...document.querySelectorAll('a.story-card[href*="/articles/"]')];
    for (let i = 0; i < cards.length; i += 100) {
      const chunk = cards.slice(i, i + 100);
      try {
        const stats = await rpc('cdj_stats', {p_articles: chunk.map(a => new URL(a.href).pathname)});
        const map = new Map(stats.map(s => [s.article, s]));
        chunk.forEach(a => {
          const s = map.get(new URL(a.href).pathname); if (!s) return;
          const label = el('span', 'cdj-card-counts', '♡ ' + s.likes + '　留言 ' + s.comments);
          label.setAttribute('aria-label', s.likes + ' 個讚，' + s.comments + ' 則留言'); a.append(label);
        });
      } catch (_) { /* Never display invented zero counts when the service is unavailable. */ }
    }
  }
  async function init() {
    const css = el('link'); css.rel = 'stylesheet'; css.href = new URL('css/article-community.css?v=20261108-1', root); document.head.append(css);
    try {
      const response = await fetch(new URL('cloud-config.json', root), {cache: 'no-store'});
      if (!response.ok) throw new Error('config');
      config = await response.json(); config.supabaseUrl = config.supabaseUrl?.replace(/\/$/, '');
      if (!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(config.supabaseUrl || '') || !config.publishableKey) throw new Error('config');
      if (detail) await initDetail(); else await initListing();
    } catch (_) {
      if (detail && !widget) {
        const notice = el('section', 'cdj-community', '按讚與留言服務暫時無法載入，請稍後重新整理。'); document.querySelector('main')?.append(notice);
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once: true}); else init();
})();

(()=>{if(!document.querySelector('script[src*="site-entry-nav.js"]')){const s=document.createElement('script');s.src='/js/site-entry-nav.js?v=20261108-room6';s.defer=true;document.head.append(s);}})();
