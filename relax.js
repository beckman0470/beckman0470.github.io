/* ChickenDad's adult corner. All choices stay in this page; no account required. */
(() => {
'use strict';
const $=s=>document.querySelector(s);
const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
const topics={
 '上班':[
 ['能者多勞，勞者還要回報進度。','今天的「順便」，是不是又順便到你身上？'],
 ['事情做完了，\n只是還沒有人知道可以再加給你。','下班前，先把自己的時間留一點回來。'],
 ['會議最穩定的產出，\n是下一次會議。','今天先散會，讓腦袋也下班。']],
 '婚姻':[
 ['婚姻裡最遙遠的距離，\n是「等一下」和「你怎麼還沒做」。','有些默契，需要直接說出口。'],
 ['「我都可以」的下一句，\n通常是「可是那個不要」。','今晚吃什麼，果然是每天的大題。'],
 ['兩個人都覺得自己做比較多，\n可能是真的事情太多。','今天的家務，能不能一起少做一件？']],
 '育兒':[
 ['孩子終於睡了，\n換家事醒了。','爸媽的下班鐘，總是有人偷偷關掉。'],
 ['親子時間的單位，\n是「再一次」。','再一次溜滑梯，再一次講故事，再一次抱抱。'],
 ['以前怕孩子不會說話，\n現在怕他說「為什麼」。','有些問題，爸爸也需要回去查一下。']],
 '人生':[
 ['人生沒有白走的路，\n但有些路真的可以先查導航。','放慢一點，看看自己要去哪裡。'],
 ['放下不是想通了，\n有時候只是手痠了。','手上的事情太多，就先放一件下來。'],
 ['今天沒有變得更厲害，\n也可以準時收工。','休息不需要先拿出一張成績單。']]
};
let topic='上班',quote=null,lastQuote=-1;
function chips(host,items,selected,select){host.replaceChildren();items.forEach(item=>{const b=make('button','chip',item);b.type='button';b.setAttribute('aria-pressed',String(item===selected));b.addEventListener('click',()=>select(item));host.append(b);});}
function topicChips(){chips($('#quote-topics'),Object.keys(topics),topic,t=>{topic=t;lastQuote=-1;quote=null;topicChips();$('#quote-label').textContent='小惡魔・'+topic;$('#quote-text').textContent='今天的'+topic+'，有什麼話想說？';$('#quote-note').textContent='抽一句，讓小惡魔幫你說。';$('#quote-feedback').textContent='';$('#save-quote').disabled=$('#copy-quote').disabled=true;$('#draw-quote').textContent='抽一句 ↗';});}
$('#draw-quote').addEventListener('click',()=>{const pool=topics[topic];let i=Math.floor(Math.random()*(pool.length-1));if(i>=lastQuote&&lastQuote>=0)i++;if(lastQuote<0)i=Math.floor(Math.random()*pool.length);lastQuote=i;quote=pool[i];$('#quote-text').textContent=quote[0];$('#quote-note').textContent=quote[1];$('#save-quote').disabled=$('#copy-quote').disabled=false;$('#draw-quote').textContent='再抽一句 ↻';$('#quote-feedback').textContent='';});
const escapeXML=s=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
function quoteSVG(text,category){const lines=text.split('\n').flatMap(line=>{const chars=Array.from(line);const parts=[];while(chars.length)parts.push(chars.splice(0,17).join(''));return parts;});return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><rect width="1080" height="1080" fill="#faf7ef"/><rect x="62" y="62" width="956" height="956" rx="40" fill="#f2e5d4" stroke="#d4b99a"/><g font-family="system-ui,Microsoft JhengHei,sans-serif" fill="#694b37"><text x="125" y="175" font-size="25" letter-spacing="5">小惡魔・${escapeXML(category)}</text>${lines.map((s,i)=>`<text x="125" y="${360+i*90}" font-size="48" font-weight="600">${escapeXML(s)}</text>`).join('')}<text x="125" y="867" font-size="28">雞爸爸內心小惡魔｜互動新句</text><text x="125" y="925" font-size="22">beckman0470.github.io/relax.html</text></g></svg>`;}
$('#save-quote').addEventListener('click',()=>{if(!quote)return;const url=URL.createObjectURL(new Blob([quoteSVG(quote[0],topic)],{type:'image/svg+xml;charset=utf-8'}));const a=make('a');a.href=url;a.download='雞爸爸小惡魔-'+topic+'.svg';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);$('#quote-feedback').textContent='金句卡已準備下載（SVG 圖檔）。';});
$('#copy-quote').addEventListener('click',async()=>{if(!quote)return;try{await navigator.clipboard.writeText(quote[0]+'\n— 雞爸爸內心小惡魔｜互動新句\nhttps://beckman0470.github.io/relax.html');$('#quote-feedback').textContent='已複製，可以貼給一起有感的人。';}catch(_){$('#quote-feedback').textContent='裝置未允許自動複製，請長按或選取卡片文字複製。';}});
const stories=[
 {tag:'龍弟弟的半夜警報',setup:'三更半夜，龍弟弟堅持說「便便」。鼠媽媽檢查時，尿布真的鼓鼓的。',q:'打開之後，裡面是什麼？',choices:['真的便便了，這次沒有說錯。','一台有四個輪子的小車。','一包偷偷藏好的小餅乾。'],answer:1,reveal:'沒有便便，卻有一台車車！龍弟弟把小車塞進了尿布，還成功讓鼠媽媽起床開燈。兔阿嬤聽完，笑到不行。',reflection:'孩子會說話以後，事情沒有變簡單，只是大人要猜的題目換了。',url:'/articles/vocus-20260831-01756392.html'},
 {tag:'雞老師的第一堂課',setup:'雞爸爸陪鼠姊姊玩注音 App。手機突然傳來「ㄅ——什麼ㄅ……」，雞老師還以為 App 在罵人。',q:'原本只說好學四個注音，後來呢？',choices:['鼠姊姊自己加碼，一路玩到ㄏ。','雞老師立刻宣布下課。','大家一起改看卡通。'],answer:0,reveal:'鼠姊姊自己一路從ㄅ、ㄆ、ㄇ、ㄈ，加碼玩到ㄏ。睡前還說「雞爸爸教得比老師還好」。雞老師差一點就想開補習班。',reflection:'也許她喜歡的，是爸爸陪她一起玩正在學的東西。',url:'/articles/vocus-20260916-01b5a802.html'},
 {tag:'爸爸的省電模式',setup:'下大雨、接小孩、買晚餐、陪點眼睛。雞爸爸終於覺得：「好了，今天差不多可以結束了吧。」',q:'鼠姊姊走出來的第一句話是？',choices:['爸爸，辛苦了，我們回家睡覺。','爸爸，我今天不想再吃東西。','爸爸，剛剛我的米糕呢？'],answer:2,reveal:'她問的竟然是「爸爸，剛剛我的米糕呢？」爸爸記得一整晚的奔波，她記得的，卻是媽媽幫忙吹頭髮和好吃的米糕。',reflection:'爸爸真的很累、米糕真的很好吃，這兩件事可以同時存在。',url:'/articles/vocus-20260902-0189853b.html'}
];
let storyIndex=0;
function story(){const s=stories[storyIndex],host=$('#story-stage');host.replaceChildren();const top=make('div','panel-top');top.append(make('span','eyebrow','02 / 家庭故事小劇場'),make('h2','',s.tag),make('p','','改編自雞爸爸已刊登的故事。猜猜下一幕，不用得分。'));host.append(top,make('p','story-context',s.setup),make('h3','story-question',s.q));const choices=make('div','story-options');const reveal=make('div','story-reveal');reveal.hidden=true;let answered=false;s.choices.forEach((text,i)=>{const b=make('button','story-option',String.fromCharCode(65+i)+'　'+text);b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{if(answered)return;answered=true;b.setAttribute('aria-pressed','true');choices.querySelectorAll('button').forEach(x=>x.disabled=x!==b);reveal.hidden=false;reveal.replaceChildren(make('h3','',i===s.answer?'你猜到了，事情真的這樣發生！':'這一幕，雞爸爸家是這樣演的……'),make('p','',s.reveal),make('p','',s.reflection));const a=make('a','','看看完整故事 →');a.href=s.url;reveal.append(a);reveal.setAttribute('role','status');});choices.append(b);});const actions=make('div','actions');const next=make('button','secondary',storyIndex===stories.length-1?'再從第一幕玩 ↻':'換一個故事 →');next.addEventListener('click',()=>{storyIndex=(storyIndex+1)%stories.length;story();});actions.append(next,make('span','story-count',(storyIndex+1)+' / '+stories.length+' 個故事'));host.append(choices,reveal,actions);}
const moods={ '想笑一下':/好笑|笑|搞笑|趣|便便|車車|貓咪|幽默|假警報/, '有點累了':/累|疲|休息|忙|喘|放鬆|心靈|放下|生活哲學/, '想懂孩子':/孩子|教養|陪伴|鼠姊姊|龍弟弟|親子|幼兒園/, '想想自己':/人生|自我|閱讀|修行|創作|選擇|敏感|內心|心靈/};
let mood='想笑一下',minutes='5 分鐘',cataloguePromise=null,readingRun=0;
function invalidateReading(){readingRun++;$('#recommend').disabled=false;$('#reading-results').replaceChildren(make('p','quiet','選擇已更新，按「幫我挑一篇」重新推薦。'));}
function moodChips(){chips($('#reading-moods'),Object.keys(moods),mood,v=>{mood=v;moodChips();invalidateReading();});}
function timeChips(){chips($('#reading-times'),['3 分鐘','5 分鐘','10 分鐘','不趕時間'],minutes,v=>{minutes=v;timeChips();invalidateReading();});}
function safeURL(value){try{const u=new URL(value,location.origin);return ['http:','https:'].includes(u.protocol)?u.href:null;}catch(_){return null;}}
function rankArticles(articles,wanted,limit){const seen=new Set();const candidates=articles.filter(a=>{if(!a||!a.title||a.status&&a.status!=='published'||!safeURL(a.url)||seen.has(a.url))return false;seen.add(a.url);return true;});const tagged=candidates.map(a=>({a,score:(String(a.title).match(moods[wanted])?4:0)+(String(a.summary).match(moods[wanted])?2:0)+(JSON.stringify(a.tags||[]).match(moods[wanted])?1:0)})).filter(x=>x.score>0);const within=tagged.filter(x=>Number(x.a.readingTime)>0&&Number(x.a.readingTime)<=limit);const pool=within.length?within:tagged;pool.sort((a,b)=>b.score-a.score||String(b.a.date||'').localeCompare(String(a.a.date||'')));return {items:pool.slice(0,3).map(x=>x.a),fallback:!within.length&&Number.isFinite(limit)};}
async function recommend(){const run=++readingRun,wanted=mood,limit=minutes==='不趕時間'?Infinity:parseInt(minutes,10);const out=$('#reading-results');out.replaceChildren(make('p','quiet','正在書架上找找……'));$('#recommend').disabled=true;try{if(!cataloguePromise)cataloguePromise=fetch('/data/articles.json').then(r=>{if(!r.ok)throw Error('catalogue');return r.json();}).then(a=>{if(!Array.isArray(a))throw Error('catalogue');return a;}).catch(e=>{cataloguePromise=null;throw e;});const all=await cataloguePromise;if(run!==readingRun)return;const result=rankArticles(all,wanted,limit);out.replaceChildren(make('p','match-note',result.items.length?(result.fallback?'這個心情暫時沒有符合時間的文章，先挑幾篇相關故事；實際預估時間列在各篇下方。':'為「'+wanted+'」挑了這幾篇。時間是網站的預估，慢慢讀也可以。'):'目前沒有符合的故事，換個心情試試，或逛逛全部文章。'));const grid=make('div','reading-grid');result.items.forEach(a=>{const card=make('article','reading-card');if(safeURL(a.cover)){const img=make('img');img.src=safeURL(a.cover);img.alt='';img.loading='lazy';card.append(img);}const body=make('div','reading-body');body.append(make('span','reading-meta',(a.category||'生活故事')+' · '+(Number(a.readingTime)>0?'約 '+a.readingTime+' 分鐘':'時間未標示')),make('h3','',a.title),make('p','',String(a.summary||'').slice(0,95)+(String(a.summary||'').length>95?'……':'')));const link=make('a','','就讀這一篇 →');link.href=safeURL(a.url);body.append(link);card.append(body);grid.append(card);});out.append(grid);const allLink=make('a','quiet','瀏覽所有文章 →');allLink.href='/articles.html';out.append(allLink);}catch(_){out.replaceChildren(make('p','quiet','書架暫時連不上，請稍後再試，或直接瀏覽文章。'));const a=make('a','','直接逛文章 →');a.href='/articles.html';out.append(a);}finally{if(run===readingRun)$('#recommend').disabled=false;}}
$('#recommend').addEventListener('click',recommend);
const tabNames=['quotes','stories','zschen','reading'];function selectTab(name){readingRun++;$('#recommend').disabled=false;tabNames.forEach(n=>{const selected=n===name,b=$('#tab-'+n);b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;$('#'+n).hidden=!selected;});}
tabNames.forEach((n,i)=>{const b=$('#tab-'+n);b.addEventListener('click',()=>selectTab(n));b.addEventListener('keydown',e=>{let next;if(e.key==='Home')next=0;else if(e.key==='End')next=tabNames.length-1;else if(e.key==='ArrowRight')next=(i+1)%tabNames.length;else if(e.key==='ArrowLeft')next=(i+tabNames.length-1)%tabNames.length;else return;e.preventDefault();selectTab(tabNames[next]);$('#tab-'+tabNames[next]).focus();});});
topicChips();story();moodChips();timeChips();
if(location.hash==='#zschen')selectTab('zschen');
})();
