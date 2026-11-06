/* Kids' spoken instructions and questions. Never reads hidden answers or game state. */
(() => {
'use strict';
function text(node){return String(node?.textContent||'').replace(/\s+/g,' ').trim();}
function visible(node){for(let n=node;n;n=n.parentElement)if(n.hidden||n.getAttribute?.('aria-hidden')==='true')return false;return true;}
function speakable(value){
return String(value||'').replace(/https?:\/\/\S+/g,'')
.replace(/(\d{1,2})[：:](\d{2})/g,(_,h,m)=>Number(h)+'點'+(Number(m)?Number(m)+'分':'整'))
.replace(/👿/g,'小惡魔，').replace(/⭐|★/g,'星星，').replace(/○/g,'圓形，').replace(/△/g,'三角形，').replace(/□/g,'正方形，').replace(/☾/g,'月亮，').replace(/？/g,'問號').replace(/✓/g,'對，').replace(/✕/g,'不對，').replace(/[＝=]/g,'等於').replace(/＋/g,'加').replace(/[−]/g,'減').replace(/\s+/g,' ').trim();
}
function promptFor(ctx){
const stage=ctx.stage;
const nodes=Array.from(stage.querySelectorAll('.question,.fg-claim,.fg-hero-word,.mg-big-letter,.mg-letter-mail,.sp-pattern,.sp-receipt,.fg-grocery,.mg-door')).filter(visible);
const parts=nodes.filter(n=>!nodes.some(other=>other!==n&&other.contains(n))).map(text).filter(Boolean);
if(ctx.classic){
const target=stage.querySelector('#target');if(target&&visible(target))parts.push('題目是，'+text(target));
}
const face=stage.querySelector('.fg-clock svg,.fg-clock');
if(face?.getAttribute('aria-label'))parts.push(face.getAttribute('aria-label'));
if(!parts.length)stage.querySelectorAll('h3').forEach(n=>{if(visible(n))parts.push(text(n));});
const choiceIds=new Set(['truthdetective','opposite','snackshop','codequest','clock','grocery','tidy','dayplan','storytiles','trashsort','bath','doors','coop','chores']);
if(choiceIds.has(ctx.id)){
const choices=Array.from(stage.querySelectorAll('.mg-choices .mg-choice,.fg-list-buttons button,.sp-story-choices button')).filter(visible).map(text).filter(Boolean);
if(choices.length)parts.push('選項有，'+choices.join('。'));
}
const marker=text(stage.querySelector('.sp-progress,.mg-counter,#progress')).match(/^第\s*\d+\s*\/\s*\d+/)?.[0]||'';
return{sentence:speakable(parts.join('。')),signature:marker+'|'+parts.join('|')};
}
function voiceScore(v){
const lang=(v.lang||'').replace('_','-').toLowerCase();if(!/^zh|^cmn/.test(lang))return-1000;
const name=v.name||'',female=/female|女|xiaoxiao|xiaoyi|hanhan|hsiaoyu|xiaozhen|huihui|yaoyao|ting.?ting|mei.?jia/i.test(name),male=!female&&/male|男|yunjhe|yunye|zhiwei|kangkang|yunxi|yunjian|yunyang|yunfeng|yunhao|yunze/i.test(name);
return(lang==='zh-tw'?60:40)+(male?70:0)-(female?70:0);
}
if(typeof module!=='undefined'&&module.exports){module.exports={text,visible,speakable,promptFor,voiceScore};return;}
if(typeof document==='undefined'||window.cdjKidsVoice)return;
const main=document.querySelector('main');if(!main)return;
const supported='speechSynthesis'in window&&'SpeechSynthesisUtterance'in window;
const synth=supported?window.speechSynthesis:null;
let enabled=true;try{enabled=localStorage.getItem('cdj-kids-voice')!=='off';}catch(_){}
let voice=null,timer=0,generation=0,current=null,lastStage=null,lastSignature='',lastFeedback='',videoActive=false;
const guides=[];
const style=document.createElement('style');style.textContent=`
.kv-guide{padding:16px 18px;border:1px solid #d7e2cc;border-radius:20px;background:#eff5e7;margin:22px 0;display:flex;align-items:center;gap:12px;flex-wrap:wrap}.kv-guide button{font:inherit;font-size:18px;min-height:50px;padding:12px 16px;border:1px solid #a5bd94;border-radius:14px;background:#fff;color:#36552e;cursor:pointer}.kv-guide button[aria-pressed=true]{background:#426b54;color:white}.kv-guide p{font-size:15px;color:#66795b;margin:0;line-height:1.8;flex-basis:100%}.kv-guide button:focus-visible{outline:3px solid #d9a044;outline-offset:4px}@media(max-width:760px){.kv-guide{padding:16px;gap:10px}.kv-guide button{font-size:20px;min-height:54px;flex:1 1 auto}.kv-guide p{font-size:17px!important}}
`;document.head.append(style);
function stop(){clearTimeout(timer);generation++;current=null;if(synth)synth.cancel();}
function chooseVoice(){if(!synth)return;const voices=synth.getVoices().filter(v=>voiceScore(v)>-1000).sort((a,b)=>voiceScore(b)-voiceScore(a));let saved='';try{saved=localStorage.getItem('cdj-reader-voice')||'';}catch(_){}voice=voices.find(v=>v.voiceURI===saved)||voices[0]||null;}
function say(value){
if(!supported||!enabled||videoActive)return;
const phrase=speakable(value);if(!phrase)return;
stop();const token=generation,chars=Array.from(phrase),chunks=[];while(chars.length)chunks.push(chars.splice(0,120).join(''));
function next(){if(token!==generation||!enabled||videoActive||!chunks.length)return;const u=new window.SpeechSynthesisUtterance(chunks.shift());u.lang=voice?.lang||'zh-TW';if(voice)u.voice=voice;u.rate=.88;u.pitch=.96;current=u;u.onend=next;u.onerror=()=>{if(token===generation)current=null;};try{synth.speak(u);}catch(_){current=null;}}
next();
}
function context(){
const mini=Array.from(document.querySelectorAll('.mg-panel')).find(visible);
if(mini){const stage=mini.querySelector('.mg-stage');if(stage)return{stage,id:stage.dataset.gameId||'',title:text(mini.querySelector('h2')),classic:false};}
const classic=Array.from(document.querySelectorAll('.mg-classic')).find(visible);
if(classic){const isDodo=classic.closest('#panel-dodo'),kind=classic.dataset.activity||'';return{stage:classic,id:kind,title:isDodo?'鼠姊姊的小活動':'龍弟弟的小活動',classic:true};}
return null;
}
function read(force=false,choice=''){
const ctx=context();if(!ctx)return false;
const p=promptFor(ctx),feedbackNode=ctx.stage.querySelector('.mg-status,#learn-feedback,#cat-feedback'),feedback=visible(feedbackNode)?text(feedbackNode):'';
const newStage=ctx.stage!==lastStage,changed=newStage||p.signature!==lastSignature,newFeedback=feedback&&feedback!==lastFeedback;
lastStage=ctx.stage;lastSignature=p.signature;lastFeedback=feedback;
if(force||changed){say((newStage||force?ctx.title+'。':'')+p.sentence);return true;}
if(newFeedback&&!['jump','rhythm','drum'].includes(ctx.id)){const range=ctx.id==='numberhunt'?text(ctx.stage.querySelector('.fg-number-range')):'';say(feedback+'。'+range);return true;}
if(choice&& !['jump','rhythm','drum','memory'].includes(ctx.id)){say(choice);return true;}return false;
}
function refreshGuides(){guides.forEach(({toggle,note})=>{toggle.textContent=enabled?'🔊 語音引導：開':'🔇 語音引導：關';toggle.setAttribute('aria-pressed',String(enabled));note.textContent=!supported?'這個瀏覽器暫時不支援語音，遊戲仍然可以玩。':'點遊戲會念玩法，題目換了也會念。看影片時會停止說話；聲音依裝置提供。';});}
document.querySelectorAll('#panel-dodo,#panel-dragon').forEach(host=>{
const guide=document.createElement('aside');guide.className='kv-guide';guide.setAttribute('aria-label','兒童語音引導');
const toggle=document.createElement('button');toggle.type='button';const repeat=document.createElement('button');repeat.type='button';repeat.textContent='🔊 聽題目與玩法';const note=document.createElement('p');toggle.disabled=repeat.disabled=!supported;
toggle.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem('cdj-kids-voice',enabled?'on':'off');}catch(_){}stop();refreshGuides();if(enabled&&!videoActive){if(!read(true))say('語音引導打開了，選一個遊戲，我會念給你聽。');}});
repeat.addEventListener('click',()=>{if(!enabled){enabled=true;try{localStorage.setItem('cdj-kids-voice','on');}catch(_){}refreshGuides();}if(!videoActive){if(!read(true))say('先選一個遊戲，我再念題目和玩法給你聽。');}});
guide.append(toggle,repeat,note);host.querySelector('.panel-head')?.after(guide);guides.push({toggle,note});
});
refreshGuides();chooseVoice();if(synth)synth.addEventListener('voiceschanged',chooseVoice);
document.addEventListener('cdj-video-start',()=>{videoActive=true;stop();});
document.addEventListener('click',event=>{
const button=event.target.closest?.('button');if(!button||button.closest('.kv-guide'))return;
if(button.closest('.dv-corner')){if(button.classList.contains('dv-stop'))videoActive=false;return;}
if(button.matches('.tab[role=tab]')){stop();videoActive=false;lastStage=null;lastSignature='';lastFeedback='';return;}
if(button.matches('.mg-card')){videoActive=false;read(true);return;}
const ctx=context();if(!ctx)return;
if(['jump','rhythm','drum'].includes(ctx.id)&&button.closest('.mg-stage,.playbox')){stop();return;}
const label=button.closest('.sp-story-piece,.mg-choice,.fg-list-buttons button,.sp-direction,.hc-tile,.hc-stain')?button.getAttribute('aria-label')||text(button):'';
read(false,label);
});
const observer=new MutationObserver(records=>{
if(records.every(r=>r.target.closest?.('.kv-guide')))return;
clearTimeout(timer);timer=setTimeout(()=>{if(!videoActive)read();},160);
});
observer.observe(main,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['hidden']});
window.addEventListener('pagehide',stop);
window.cdjKidsVoice={read:()=>read(true),stop};
})();

