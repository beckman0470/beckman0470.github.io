/* Article reader. Device speech, explicit play only, no recorded voice assets. */
(() => {
'use strict';
const maleNames=/male|男|yunjhe|yunye|zhiwei|kangkang|yunxi|yunjian|yunyang|yunfeng|yunhao|yunze|yunxia/i;
const femaleNames=/female|女|xiaoxiao|xiaoyi|xiaozhen|hsiaoyu|hanhan|huihui|yaoyao|ting.?ting|mei.?jia|meijia/i;
const isChinese=v=>/^zh(?:-|_|$)|^cmn(?:-|_|$)/i.test(v.lang||'');
const isMale=v=>maleNames.test(v.name||'')&&!femaleNames.test(v.name||'');
function voiceScore(v){
if(!isChinese(v))return -1000;
const lang=(v.lang||'').replace('_','-').toLowerCase();
return (lang==='zh-tw'?60:lang.startsWith('zh')||lang.startsWith('cmn')?40:0)+(isMale(v)?70:0)-(femaleNames.test(v.name||'')?70:0)+(v.localService?3:0)+(v.default?1:0);
}
function cleanText(value){return String(value||'').replace(/https?:\/\/\S+/g,'').replace(/[\u200b-\u200d\ufeff]/g,'').replace(/\s+/g,' ').trim();}
function chunkText(value,max=130){
const chars=Array.from(cleanText(value)),result=[];let start=0;
while(start<chars.length){
 let end=Math.min(start+max,chars.length);
 if(end<chars.length){let cut=-1;for(let i=start+Math.floor(max*.4);i<end;i++)if(/[。！？!?；;]/.test(chars[i]))cut=i+1;
 if(cut<0)for(let i=start+Math.floor(max*.6);i<end;i++)if(/[，、, ]/.test(chars[i]))cut=i+1;if(cut>start)end=cut;}
 const text=chars.slice(start,end).join('').trim();if(text)result.push(text);start=end;
}return result;
}
function extractSegments(body,title){
const segments=[];
if(title){const text=cleanText(title.textContent);chunkText(text).forEach(t=>segments.push({text:t,node:title}));}
const clone=body.cloneNode(true);
clone.querySelectorAll('script,style,noscript,button,nav,aside,iframe,video,audio,pre,code,.article-actions,.article-tags,.article-people,.source-note,.cdj-article-reading,.cdj-reader,[hidden],[aria-hidden="true"]').forEach(n=>n.remove());
clone.querySelectorAll('br').forEach(n=>n.replaceWith(document.createTextNode('，')));
const candidates=Array.from(clone.querySelectorAll('h2,h3,h4,p,li,blockquote,figcaption'));
const selected=candidates.filter(n=>!candidates.some(other=>other!==n&&other.contains(n)));
if(!selected.length){chunkText(clone.textContent).forEach(t=>segments.push({text:t,node:body}));return segments;}
selected.forEach(n=>{const text=cleanText(n.textContent);if(!text||/^vocus[｜|]/i.test(text))return;chunkText(text).forEach(t=>segments.push({text:t,node:body}));});
return segments;
}
if(typeof module!=='undefined'&&module.exports){module.exports={voiceScore,isChinese,isMale,cleanText,chunkText,extractSegments};return;}
if(typeof document==='undefined'||document.querySelector('.cdj-reader'))return;
const body=document.querySelector('.article-body, .article-content, [data-article-body]');
const title=document.querySelector('h1.article-title,main h1,h1');
if(!body||!title)return;
const widget=document.createElement('section');widget.className='cdj-reader';widget.setAttribute('aria-label','文章朗讀');
const heading=document.createElement('h2');heading.textContent='🔊 聽雞爸爸的生活故事';
const intro=document.createElement('p');intro.className='cdj-reader-intro';intro.textContent='放慢一點，讓文字陪你休息一下。';
widget.append(heading,intro);title.after(widget);
const style=document.createElement('style');style.textContent=`
.cdj-reader{font-family:"Microsoft JhengHei","PingFang TC",system-ui,sans-serif;background:#f0f3e8;border:1px solid #d8e1cb;border-radius:22px;padding:24px;margin:24px 0;color:#344b38}.cdj-reader h2{font-size:23px;line-height:1.5;margin:0 0 8px}.cdj-reader p{line-height:1.8;margin:8px 0}.cdj-reader-intro{font-size:17px}.cdj-reader-controls,.cdj-reader-settings{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:18px 0}.cdj-reader button{font:inherit;font-size:18px;min-height:48px;padding:12px 18px;border:1px solid #a6b998;border-radius:14px;color:#38553b;background:#fff;cursor:pointer}.cdj-reader button.primary{color:#fff;background:#426b54;border-color:#426b54}.cdj-reader button:disabled{opacity:.5;cursor:default}.cdj-reader label{display:flex;align-items:center;gap:8px;font-size:17px;flex-wrap:wrap}.cdj-reader select{font:inherit;font-size:17px;min-height:46px;padding:8px;border:1px solid #b4c3a6;border-radius:12px;background:#fff;max-width:100%;color:#344b38}.cdj-reader-voice-label{flex:1 1 260px}.cdj-reader-voice-label select{width:min(100%,380px)}.cdj-reader progress{display:block;width:100%;height:10px;accent-color:#426b54;margin:16px 0 10px}.cdj-reader-status{font-size:17px;color:#476b45}.cdj-reader-note{font-size:15px;color:#65725e}.cdj-reader button:focus-visible,.cdj-reader select:focus-visible{outline:3px solid #c68943;outline-offset:4px}
@media(max-width:760px){.cdj-reader{padding:20px 16px}.cdj-reader h2{font-size:24px!important}.cdj-reader button{font-size:20px;min-height:54px;flex:1 1 auto}.cdj-reader select,.cdj-reader label{font-size:18px!important}.cdj-reader .cdj-reader-note{font-size:17px!important}.cdj-reader-settings{align-items:flex-start;flex-direction:column}.cdj-reader-voice-label{flex:auto;width:100%}.cdj-reader-voice-label select{width:100%}}
`;document.head.append(style);
function element(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;}
if(!('speechSynthesis'in window)||!('SpeechSynthesisUtterance'in window)){widget.append(element('p','cdj-reader-note','這個瀏覽器暫時不支援朗讀。可以改用手機或電腦上的其他瀏覽器試試看。'));return;}
const synth=window.speechSynthesis,segments=extractSegments(body,title);
if(!segments.length){widget.append(element('p','cdj-reader-note','這篇文章目前沒有可朗讀的正文。'));return;}
const controls=element('div','cdj-reader-controls');
function button(text,cls,fn){const b=element('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
const play=button('▶ 開始朗讀','primary',playArticle),pause=button('暫停','',pauseArticle),stop=button('停止並回到開頭','',()=>stopArticle('已停止，準備好可以再從開頭聽。'));
controls.append(play,pause,stop);
const settings=element('div','cdj-reader-settings'),rateLabel=element('label','','語速'),rateSelect=element('select');rateSelect.setAttribute('aria-label','朗讀語速');
[['0.78','慢一點'],['0.9','溫和語速'],['1.05','稍快一點']].forEach(([value,text])=>{const opt=element('option','',text);opt.value=value;rateSelect.append(opt);});rateSelect.value='0.9';rateLabel.append(rateSelect);
const voiceLabel=element('label','cdj-reader-voice-label','聲音'),voiceSelect=element('select');voiceSelect.setAttribute('aria-label','選擇朗讀聲音');voiceLabel.append(voiceSelect);
const sample=button('試聽聲音','',sampleVoice);settings.append(rateLabel,voiceLabel,sample);
const progress=document.createElement('progress');progress.max=segments.length;progress.value=0;progress.setAttribute('aria-label','文章朗讀進度');
const counter=element('p','cdj-reader-note','尚未開始 · 共 '+segments.length+' 句');
const status=element('p','cdj-reader-status','按「開始朗讀」，從文章標題開始聽。');status.setAttribute('role','status');
const note=element('p','cdj-reader-note');widget.append(controls,settings,progress,counter,status,note);
let voices=[],chosen=null,index=0,offset=0,boundary=0,generation=0,state='idle',current=null,sampling=false;
let preferred='';try{preferred=localStorage.getItem('cdj-reader-voice')||'';const saved=localStorage.getItem('cdj-reader-rate');if(['0.78','0.9','1.05'].includes(saved))rateSelect.value=saved;}catch(_){}
function save(key,value){try{localStorage.setItem(key,value);}catch(_){}}
function updateButtons(){play.disabled=state==='playing';pause.disabled=state!=='playing';stop.disabled=state==='idle'&&!sampling;play.textContent=state==='paused'?'▶ 繼續朗讀':state==='ended'?'↻ 再聽一次':'▶ 開始朗讀';progress.value=state==='ended'?segments.length:index;counter.textContent=state==='ended'?'這篇文章已朗讀完畢。':'第 '+Math.min(index+1,segments.length)+' / '+segments.length+' 句';}
function populateVoices(){
const all=synth.getVoices();voices=all.filter(isChinese).sort((a,b)=>voiceScore(b)-voiceScore(a)||a.name.localeCompare(b.name));
voiceSelect.replaceChildren();
if(!voices.length){const option=element('option','','裝置預設中文語音');option.value='';voiceSelect.append(option);chosen=null;voiceSelect.disabled=true;note.textContent='尚未找到裝置的中文聲音，播放時會請裝置使用中文；若發音不合適，可以稍後重新整理或換個瀏覽器。';return;}
voiceSelect.disabled=false;chosen=voices.find(v=>v.voiceURI===preferred)||voices[0];voices.forEach(v=>{const option=element('option','',v.name+'（'+v.lang+'）');option.value=v.voiceURI;voiceSelect.append(option);});voiceSelect.value=chosen.voiceURI;
note.textContent=(isMale(chosen)?'目前優先使用名稱可辨識的中文男聲。':'這台裝置目前沒有已選用的可辨識中文男聲，可從選單試聽其他聲音。')+'實際聲線依裝置而異，這是裝置語音，不是雞爸爸本人錄音。';
}
function cancelCurrent(){generation++;current=null;synth.cancel();}
function preservePosition(){offset=Math.min(segments[index]?.text.length||0,offset+boundary);boundary=0;if(index<segments.length&&offset>=segments[index].text.length){index++;offset=0;}}
function speakCurrent(){
if(index>=segments.length){state='ended';current=null;status.textContent='故事讀完了，謝謝你一起聽。';updateButtons();return;}
boundary=0;const token=generation,utterance=new window.SpeechSynthesisUtterance(segments[index].text.slice(offset));
utterance.lang=chosen?.lang||'zh-TW';if(chosen)utterance.voice=chosen;utterance.rate=Number(rateSelect.value)||.9;utterance.pitch=.94;utterance.volume=1;current=utterance;
utterance.onboundary=e=>{if(token===generation&&state==='playing'&&Number.isFinite(e.charIndex))boundary=Math.max(0,e.charIndex);};
utterance.onend=()=>{if(token!==generation||state!=='playing')return;index++;offset=0;boundary=0;current=null;updateButtons();speakCurrent();};
utterance.onerror=e=>{if(token!==generation)return;if(e.error==='canceled'||e.error==='interrupted')return;state='paused';current=null;status.textContent='朗讀暫時中斷，按繼續可再試；也可以換一個聲音。';updateButtons();};
updateButtons();try{synth.speak(utterance);}catch(_){state='paused';status.textContent='目前無法播放，請換一個聲音或稍後再試。';updateButtons();}
}
function playArticle(){
if(state==='playing')return;
if(state==='ended'){index=0;offset=0;}
cancelCurrent();sampling=false;state='playing';status.textContent='正在朗讀文章。';speakCurrent();
}
function pauseArticle(){if(state!=='playing')return;preservePosition();state='paused';cancelCurrent();status.textContent='已暫停。繼續時可能會從目前這一小句重新讀起。';updateButtons();}
function stopArticle(message){state='idle';sampling=false;cancelCurrent();index=0;offset=0;boundary=0;status.textContent=message||'已停止朗讀。';updateButtons();}
function sampleVoice(){
stopArticle();sampling=true;const token=generation,utterance=new window.SpeechSynthesisUtterance('你好，放慢一點，讓我們一起聽聽今天的故事。');
utterance.lang=chosen?.lang||'zh-TW';if(chosen)utterance.voice=chosen;utterance.rate=Number(rateSelect.value)||.9;utterance.pitch=.94;current=utterance;status.textContent='正在試聽目前的聲音。';updateButtons();
utterance.onend=()=>{if(token!==generation)return;sampling=false;current=null;status.textContent='喜歡這個聲音的話，就按開始朗讀。';updateButtons();};
utterance.onerror=()=>{if(token!==generation)return;sampling=false;current=null;status.textContent='這個聲音暫時無法使用，可以換一個試試。';updateButtons();};
try{synth.speak(utterance);}catch(_){sampling=false;current=null;status.textContent='試聽暫時無法播放，可以換一個聲音。';updateButtons();}
}
function changedSetting(){const wasPlaying=state==='playing';if(wasPlaying){preservePosition();state='paused';cancelCurrent();playArticle();}else if(sampling)stopArticle('聲音設定已更新，按試聽或開始朗讀。');}
rateSelect.addEventListener('change',()=>{save('cdj-reader-rate',rateSelect.value);changedSetting();});
voiceSelect.addEventListener('change',()=>{preferred=voiceSelect.value;save('cdj-reader-voice',preferred);chosen=voices.find(v=>v.voiceURI===preferred)||null;changedSetting();populateVoices();});
synth.addEventListener('voiceschanged',populateVoices);window.addEventListener('pagehide',()=>stopArticle('已停止朗讀。'));populateVoices();updateButtons();
})();

