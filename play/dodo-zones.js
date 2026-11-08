/* Dodo's learning filters and personal daily picture routines. */
(() => {
 'use strict';
 const initial=new URLSearchParams(location.search);if(initial.get('zone')==='life'){location.replace('/rooms.html?room=mom&flow='+encodeURIComponent(initial.get('flow')||'morning')+'#mom-life');return;}
 const host=document.querySelector('#panel-dodo');
 if(!host||host.querySelector('.dr-zones'))return;
 const menu=host.querySelector('.mg-section'),grid=menu?.querySelector('.mg-grid');
 if(!menu||!grid)return;
 const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 const button=(text,fn,cls='dr-button')=>{const b=make('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;};
 const sprite=(n,cls='dr-picture')=>{const p=make('span',cls);p.setAttribute('aria-hidden','true');p.style.setProperty('--dr-x',((n%4)/3*100)+'%');p.style.setProperty('--dr-y',(Math.floor(n/4)/3*100)+'%');return p;};
 const tabs=make('div','dr-zones');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','鼠姊姊的專區');
 const learn=make('section','dr-learning'),life=make('section','dr-life');learn.id='dodo-learning';life.id='dodo-life';
 learn.setAttribute('role','tabpanel');life.setAttribute('role','tabpanel');life.hidden=true;
 const heading=menu.querySelector('.mg-menu-heading');if(heading)learn.append(heading);
 let zone='learning',flow='morning';
 const tabButtons=[];
 function stop(){window.cdjKidsVoice?.stop();if('speechSynthesis'in window)window.speechSynthesis.cancel();}
 function voice(text,force=false){
  stop();let enabled=true;try{enabled=localStorage.getItem('cdj-kids-voice')!=='off';}catch(_){}
  if((!enabled&&!force)||!('speechSynthesis'in window)||typeof SpeechSynthesisUtterance==='undefined')return;
  const u=new SpeechSynthesisUtterance(text);u.lang='zh-TW';u.rate=.85;
  const voices=speechSynthesis.getVoices();u.voice=voices.find(v=>v.lang==='zh-TW')||voices.find(v=>v.lang.startsWith('zh'))||null;
  speechSynthesis.speak(u);
 }
 function chooseZone(next){
  stop();zone=next;learn.hidden=next!=='learning';life.hidden=next!=='life';
  tabButtons.forEach(b=>{const active=b.dataset.zone===next;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
  const video=host.querySelector('.dv-corner');if(video){video.querySelector('.dv-stop')?.click();video.hidden=next==='life';}

 }
 [['learning','學習專區','ㄅ ABC 123']].forEach(([key,label,small])=>{
  const b=button('',()=>chooseZone(key),'dr-zone');b.dataset.zone=key;b.id='dodo-zone-'+key;b.setAttribute('role','tab');b.setAttribute('aria-controls','dodo-'+key);b.setAttribute('aria-selected',String(key==='learning'));b.tabIndex=key==='learning'?0:-1;
  b.append(make('strong','',label),make('span','',small));tabButtons.push(b);tabs.append(b);(key==='learning'?learn:life).setAttribute('aria-labelledby',b.id);
  b.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const target=event.key==='Home'?tabButtons[0]:event.key==='End'?tabButtons.at(-1):tabButtons.find(x=>x!==b);target.click();target.focus();}});
 });
 const subjects={zh:new Set(['classic-zh','phonetic','storytiles','truthdetective']),abc:new Set(['classic-abc','post']),math:new Set(['count','numberhunt','snackshop','clock','codequest'])};
 const filters=make('div','dr-subjects');filters.setAttribute('role','group');filters.setAttribute('aria-label','選擇學習內容');
 const filterButtons=[];
 function subject(key){
  filterButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.subject===key)));
  [...grid.querySelectorAll('.mg-card')].forEach(card=>{const id=card.dataset.gameId;card.hidden=key==='more'?Object.values(subjects).some(s=>s.has(id)):!subjects[key].has(id);});
 }
 [['zh','ㄅㄆㄇ'],['abc','ABC'],['math','123 數學'],['more','其他小遊戲']].forEach(([key,label])=>{const b=button(label,()=>subject(key),'dr-subject');b.dataset.subject=key;b.setAttribute('aria-pressed','false');filterButtons.push(b);filters.append(b);});
 learn.append(filters,grid);
 const lifeLink=make('a','dr-button','鼠姊姊的一天 → 到鼠窩');lifeLink.href='/rooms.html?room=mom#mom-life';menu.replaceChildren(tabs,lifeLink,learn);subject('zh');
})();
