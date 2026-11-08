/* Existing daily picture routines, relocated to Mom's room. */
(()=>{'use strict';
 const life=document.querySelector('#mom-life');if(!life)return;let flow='morning';
 const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 const button=(text,fn,cls='dr-button')=>{const b=make('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;};
 const sprite=(n,cls='dr-picture')=>{const p=make('span',cls);p.setAttribute('aria-hidden','true');p.style.setProperty('--dr-x',((n%4)/3*100)+'%');p.style.setProperty('--dr-y',(Math.floor(n/4)/3*100)+'%');return p;};
 function stop(){window.cdjKidsVoice?.stop();if('speechSynthesis'in window)window.speechSynthesis.cancel();}
 function voice(text,force=false){
  stop();let enabled=true;try{enabled=localStorage.getItem('cdj-kids-voice')!=='off';}catch(_){}
  if((!enabled&&!force)||!('speechSynthesis'in window)||typeof SpeechSynthesisUtterance==='undefined')return;
  const u=new SpeechSynthesisUtterance(text);u.lang='zh-TW';u.rate=.85;
  const voices=speechSynthesis.getVoices();u.voice=voices.find(v=>v.lang==='zh-TW')||voices.find(v=>v.lang.startsWith('zh'))||null;
  speechSynthesis.speak(u);
 }
 const actions={
  wake:['起床',0],toilet:['上廁所',1],inhaler:['噴氣喘藥',2,true],nose:['噴鼻子藥',3,true],brush:['刷牙',4],face:['洗臉',5],cleaneyes:['擦眼睛',6,true],drops:['點眼藥水',7,true],breakfast:['吃早餐',8],clothes:['換衣服',9],socks:['穿襪子',10],shoes:['穿鞋子',11],leave:['出門',12],bag:['放書包',13],hands:['洗手',14],bath:['洗澡',15]
 };
 const flows={
  morning:{label:'起床',art:0,steps:['wake','toilet','inhaler','nose','brush','face','cleaneyes','drops','breakfast','clothes','socks','shoes','leave']},
  home:{label:'回家',art:13,steps:['bag','hands','clothes']},
  bedtime:{label:'睡覺前',art:15,steps:['bath','brush','face','drops']}
 };
 const key='cdj-dodo-routines-v1';
 const date=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
 let state={date:date(),done:{}};
 function restore(){try{const saved=JSON.parse(localStorage.getItem(key));if(saved?.date===date()&&saved.done&&typeof saved.done==='object')state={date:saved.date,done:saved.done};else state={date:date(),done:{}};}catch(_){state={date:date(),done:{}};}}
 function save(){try{localStorage.setItem(key,JSON.stringify(state));return true;}catch(_){return false;}}
 restore();
 const welcome=make('h3','dr-heading','我會照顧自己了！');
 const caption=make('p','dr-caption','做完一件，再點圖片打勾。用藥和眼睛照護，請大人陪你一起完成。');
 const flowTabs=make('div','dr-flows');flowTabs.setAttribute('role','group');flowTabs.setAttribute('aria-label','選擇生活流程');
 const flowButtons=[];
 Object.entries(flows).forEach(([id,f])=>{const b=button('',()=>{stop();flow=id;render();},'dr-flow');b.append(sprite(f.art,'dr-picture dr-flow-art'),make('strong','',f.label));b.dataset.flow=id;b.setAttribute('aria-pressed',String(id===flow));flowTabs.append(b);flowButtons.push(b);});
 const tools=make('div','dr-tools'),progress=make('p','dr-progress'),board=make('div','dr-steps'),feedback=make('p','dr-feedback');
 progress.setAttribute('role','status');feedback.setAttribute('role','status');
 const meter=make('progress','dr-meter');meter.setAttribute('aria-label','生活流程完成進度');
 const listen=button('聽下一步',()=>{const next=flows[flow].steps.find(id=>!state.done[flow+':'+id]);voice(next?'接下來是，'+actions[next][0]+'。'+(actions[next][2]?'請大人陪你完成。':'做完再點圖片打勾。'):'這一組全部完成了，你好棒！',true);});
 const reset=button('重新練習這一組',()=>{stop();flows[flow].steps.forEach(id=>delete state.done[flow+':'+id]);save();render();feedback.textContent='這一組已重新開始。';});
 tools.append(listen,reset);life.append(welcome,caption,flowTabs,progress,meter,tools,board,feedback);
 function render(){
  if(state.date!==date())state={date:date(),done:{}};
  const f=flows[flow],count=f.steps.filter(id=>state.done[flow+':'+id]).length,next=f.steps.find(id=>!state.done[flow+':'+id]);
  flowButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.flow===flow)));
  progress.textContent=f.label+' · '+count+' / '+f.steps.length+' 完成'+(count===f.steps.length?'，你好棒！':'');
  meter.max=f.steps.length;meter.value=count;board.replaceChildren();feedback.textContent='';
  f.steps.forEach((id,index)=>{
   const [label,art,adult]=actions[id],checked=!!state.done[flow+':'+id];
   const b=button('',()=>{
    if(state.date!==date()){restore();render();return;}
    const target=flow+':'+id;state.done[target]=!state.done[target];const complete=state.done[target],saved=save();render();
    feedback.textContent=complete?label+'，完成了！':label+'，還要再做一下。';
    if(!saved)feedback.textContent+=' 這個瀏覽器無法儲存，離開頁面後會重設。';
    if(complete)voice(label+'，完成了！'+(flows[flow].steps.every(x=>state.done[flow+':'+x])?'這一組都做好了，你好棒！':''));
   },'dr-step'+(checked?' is-done':'')+(id===next?' is-next':''));
   b.setAttribute('aria-pressed',String(checked));b.setAttribute('aria-label',(index+1)+'，'+label+'，'+(checked?'已完成，點一下取消':'還沒完成，完成後點一下'));
   const badge=make('span','dr-step-number',String(index+1));badge.setAttribute('aria-hidden','true');
   const check=make('span','dr-check',checked?'✓':'○');check.setAttribute('aria-hidden','true');
   b.append(badge,sprite(art),make('strong','',label),check);
   if(adult)b.append(make('small','dr-adult','和大人一起'));
   board.append(b);
  });
 }
 render();
 const initial=new URLSearchParams(location.search);if(Object.prototype.hasOwnProperty.call(flows,initial.get('flow'))) {flow=initial.get('flow');render();}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(state.date!==date()){restore();render();}});
 window.addEventListener('storage',e=>{if(e.key===key){restore();render();}});

})();
