/* Curated creator links supplied by ChickenDad. Embeds load only after a click. */
(()=>{'use strict';
const catalogue=[{"id":"o-sQ_Jv10NE","title":"我們家的逃脫大師——雅虎","topic":"cats","platform":"youtube"},{"id":"1hCKokMDKkU","title":"重陽節的小小傳承人","topic":"family","platform":"youtube"},{"id":"O4YFsT49e3A","title":"六歲生日三部曲①｜回憶","topic":"family","platform":"youtube"},{"id":"J3kxrQiTCE4","title":"他一眼認出爸爸，卻不認識照片上的名字","topic":"family","platform":"youtube"},{"id":"na8xmuYIZt8","title":"以為孩子會說話，半夜就不用猜了，結果…｜龍弟弟便便假警報","topic":"family","platform":"youtube"},{"id":"E8pch2cpCPs","title":"雞爸爸原來是一家人的樣子｜雞爸爸ChickenDad","topic":"about","platform":"youtube"},{"id":"P4aFn87ne_4","title":"龍弟弟的西瓜皮，是雞爸爸愛的形狀｜雞爸爸ChickenDad","topic":"family","platform":"youtube"},{"id":"NBuFWuU_zIE","title":"原本想練背肌，卻成了推鞦韆專員｜雞爸爸ChickenDad","topic":"family","platform":"youtube"},{"id":"F5M63xP-a3k","title":"「阿格！～阿格！」龍弟弟跟兔阿嬤的優格俱樂部｜雞爸爸ChickenDad","topic":"family","platform":"youtube"},{"id":"DdDxFSbRbU5","title":"今年七夕不寫卡片了：Lucy，妳在哪裡？請收這篇情書","topic":"family","platform":"instagram"},{"id":"DdD4NURMvoO","title":"雞爸爸的心靈暑期作業－歸納生活","topic":"about","platform":"instagram"},{"id":"DdDp_eWRH37","title":"方格新手最後一天：寫著寫著，雞爸爸終於找到自己的樣子","topic":"about","platform":"instagram"}];
function valid(item){return !!item&&typeof item.title==='string'&&(item.platform==='youtube'?/^[A-Za-z0-9_-]{11}$/.test(item.id):item.platform==='instagram'&&/^[A-Za-z0-9_-]+$/.test(item.id));}
function watchURL(item){if(!valid(item))return null;return item.platform==='youtube'?'https://www.youtube.com/shorts/'+item.id:'https://www.instagram.com/p/'+item.id+'/';}
function embedURL(item){if(!valid(item))return null;return item.platform==='youtube'?'https://www.youtube-nocookie.com/embed/'+item.id+'?autoplay=1&playsinline=1&rel=0&start=0':'https://www.instagram.com/p/'+item.id+'/embed/';}
function filterItems(items,platform='all',topic='all'){return items.filter(item=>valid(item)&&(platform==='all'||item.platform===platform)&&(topic==='all'||item.topic===topic));}
if(typeof module!=='undefined'&&module.exports){module.exports={catalogue,valid,watchURL,embedURL,filterItems};return;}
if(typeof document==='undefined'||document.querySelector('[data-media-dialog]'))return;
const dialog=document.createElement('dialog');dialog.className='media-modal';dialog.dataset.mediaDialog='true';dialog.setAttribute('aria-labelledby','media-dialog-title');
const head=document.createElement('div');head.className='media-modal-head';
const title=document.createElement('h2');title.id='media-dialog-title';
const close=document.createElement('button');close.type='button';close.className='media-close';close.textContent='關閉 ✕';close.setAttribute('aria-label','關閉影片並停止播放');
head.append(title,close);const frame=document.createElement('div');frame.className='media-frame';
const foot=document.createElement('p');foot.className='media-modal-foot';const original=document.createElement('a');original.target='_blank';original.rel='noopener noreferrer';
foot.append(document.createTextNode('如果無法載入、播放，或平台要求登入，請 '),original);dialog.append(head,frame,foot);document.body.append(dialog);
let launcher=null,restoreFocus=true;
function clearPlayer(){frame.replaceChildren();}
function onClosed(){clearPlayer();if(restoreFocus&&launcher?.isConnected)launcher.focus({preventScroll:true});launcher=null;}
function closePlayer(restore=true){restoreFocus=restore;clearPlayer();if(dialog.open)dialog.close();else onClosed();}
function openPlayer(item,button){
if(!valid(item))return;
clearPlayer();launcher=button;restoreFocus=true;title.textContent=item.title;dialog.dataset.platform=item.platform;
original.href=watchURL(item);original.textContent=item.platform==='youtube'?'到 YouTube 觀看 ↗':'到 Instagram 觀看 ↗';
if(typeof dialog.showModal!=='function'){window.open(watchURL(item),'_blank','noopener,noreferrer');return;}
try{if(!dialog.open)dialog.showModal();}catch(_){window.open(watchURL(item),'_blank','noopener,noreferrer');return;}
if(window.cdjKidsVoice)window.cdjKidsVoice.stop();
const iframe=document.createElement('iframe');iframe.src=embedURL(item);iframe.title=item.title+(item.platform==='youtube'?' — YouTube 影片':' — Instagram 貼文');
iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.setAttribute('allow','autoplay; encrypted-media; picture-in-picture; fullscreen');iframe.setAttribute('allowfullscreen','');frame.append(iframe);close.focus({preventScroll:true});
}
close.addEventListener('click',()=>closePlayer());
dialog.addEventListener('cancel',event=>{event.preventDefault();closePlayer();});
dialog.addEventListener('close',onClosed);
dialog.addEventListener('click',event=>{if(event.target===dialog)closePlayer();});
original.addEventListener('click',()=>closePlayer());
document.addEventListener('click',event=>{
const button=event.target.closest?.('button[data-media-id]');if(!button)return;
const item=catalogue.find(x=>x.id===button.dataset.mediaId);if(!item)return;openPlayer(item,button);
});
const library=document.querySelector('[data-media-grid]');
if(library){
let platform='all',topic='all';const cards=Array.from(library.querySelectorAll('[data-media-platform]')),result=document.querySelector('[data-media-result]'),empty=document.querySelector('[data-media-empty]');
function apply(){let count=0;cards.forEach(card=>{const show=(platform==='all'||card.dataset.mediaPlatform===platform)&&(topic==='all'||card.dataset.mediaTopic===topic);card.hidden=!show;if(show)count++;});if(result)result.textContent='顯示 '+count+' / '+cards.length+' 則影音';if(empty)empty.hidden=count>0;}
document.querySelectorAll('[data-media-platform-filter]').forEach(button=>button.addEventListener('click',()=>{platform=button.dataset.mediaPlatformFilter;document.querySelectorAll('[data-media-platform-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));apply();}));
document.querySelectorAll('[data-media-topic-filter]').forEach(button=>button.addEventListener('click',()=>{topic=button.dataset.mediaTopicFilter;document.querySelectorAll('[data-media-topic-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));apply();}));
apply();
}
window.addEventListener('pagehide',()=>closePlayer(false));
})();

