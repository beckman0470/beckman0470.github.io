/* Homepage selections use the same public article catalogue as the archive. */
(()=>{'use strict';
function localURL(value,origin){if(typeof value!=='string'||!value.trim())return null;try{const u=new URL(value,origin);return u.origin===new URL(origin).origin&&/^https?:$/.test(u.protocol)?u:null;}catch(_){return null;}}
function latest(data,origin){const seen=new Set();return(Array.isArray(data)?data:[]).filter(a=>{if(!a||!a.title||(a.status&&a.status!=='published'))return false;const u=localURL(a.url,origin);if(!u||!/^\/articles\/[^/]+\.html$/.test(u.pathname)||seen.has(u.pathname))return false;seen.add(u.pathname);return true;}).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))).slice(0,3);}
if(typeof module!=='undefined'&&module.exports){module.exports={latest,localURL};return;}
const target=document.querySelector('[data-home-latest]');if(!target)return;
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;}
function card(a){const link=el('a','entry-article');link.href=localURL(a.url,location.href).href;const cover=localURL(a.cover,location.href);if(cover){const image=el('img');image.src=cover.href;image.alt='';image.loading='lazy';image.width=600;image.height=400;image.addEventListener('error',()=>{image.hidden=true;});link.append(image);}
const body=el('div','entry-article-body'),summary=String(a.summary||'');body.append(el('p','entry-article-meta',[a.roomLabel||a.category,a.date].filter(Boolean).join(' · ')),el('h3','',a.title),el('p','entry-article-summary',summary.length>85?summary.slice(0,85)+'…':summary),el('span','entry-article-link','讀這段日常 →'));link.append(body);return link;}
fetch('/data/articles.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Catalogue unavailable');return r.json();}).then(data=>{const items=latest(data,location.href);if(items.length)target.replaceChildren(...items.map(card));}).catch(()=>{/* Keep the three bundled story cards. */});
})();

