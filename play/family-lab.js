/* Family topic games: small, repeatable rounds without time pressure. */
(() => {
'use strict';
const topics=[
 {id:'buddhism',host:'ama',title:'兔阿嬤的佛教小學堂',desc:'認識三寶，練習慈悲與分享。',kind:'quiz',questions:[
 ['佛教說的「三寶」是哪三樣？',['佛、法、僧','金、銀、珠寶','太陽、月亮、星星'],0,'三寶指佛、法、僧，不是三件昂貴的寶物。'],
 ['有人跌倒了，哪一個行動比較有慈悲心？',['在旁邊笑','請大人幫忙，關心對方','假裝沒有看見'],1,'慈悲可以從關心別人、減少別人的痛苦開始。'],
 ['兔阿嬤說「布施」，可以怎麼練習？',['只收別人的禮物','把玩具全部藏起來','分享時間，幫忙整理'],2,'布施可以是分享物品，也可以付出時間與協助。'],
 ['到佛寺參觀，怎樣比較尊重別人？',['輕聲說話，遵守現場指引','在大殿追逐','碰所有法器'],0,'不同寺院有不同規範，先看指引，也可以請問現場人員。'],
 ['想減少傷害小生命，可以怎麼做？',['故意踩螞蟻','觀察牠，不故意傷害牠','追著動物跑'],1,'尊重生命，是可以在日常練習的態度。']
 ]},
 {id:'baseball',host:'dad',title:'雞爸爸的棒球打擊場',desc:'看準來球，抓時機揮棒！',kind:'batting',questions:[
 ['打者累積四個壞球，通常會怎樣？',['直接得一分','四壞球保送上一壘','直接出局'],1,'四壞球保送讓打者上一壘；是否得分，要看壘上情況。'],
 ['守備方完成幾個出局，通常就交換攻守？',['一個','兩個','三個'],2,'一個半局通常以三個出局結束，接著交換攻守。'],
 ['打者揮棒落空，通常記作什麼？',['好球','壞球','全壘打'],0,'揮棒沒有擊中球，通常會增加一個好球數。'],
 ['跑壘的正確順序是哪一個？',['三壘、二壘、一壘、本壘','一壘、二壘、三壘、本壘','二壘、本壘、一壘、三壘'],1,'擊球後依一壘、二壘、三壘、本壘的方向跑。'],
 ['兩好球後，把一般界外球打出界，通常會怎樣？',['一定三振','一定保送','維持兩好球'],2,'一般界外球不會成為第三好球；兩好球後的觸擊界外是例外。']
 ]},
 {id:'kingdoms',host:'dad',title:'赤壁之戰：五人回合冒險',desc:'選魏蜀吳、組五人隊、升級換裝闖八關。',kind:'chibi',questions:[
 ['《三國演義》故事中，常拿羽扇的軍師是誰？',['諸葛亮','張飛','呂布'],0,'小說常以羽扇描寫諸葛亮；這是故事中的人物形象。'],
 ['《三國演義》的桃園結義是哪三位？',['曹操、孫權、司馬懿','劉備、關羽、張飛','諸葛亮、周瑜、呂布'],1,'桃園結義是小說名場面，不等於有史料證明的真實事件。'],
 ['歷史上的三國，通常指哪三個政權？',['秦、漢、唐','宋、元、明','魏、蜀、吳'],2,'魏、蜀、吳是三國時期的三個主要政權。'],
 ['讀到《三國演義》的神奇計策，應該怎麼想？',['小說每個細節都是真實歷史','分辨小說情節和史料記載','只要有名就一定是真的'],1,'《三國演義》是歷史小說，人物與情節需要和史料分開看。'],
 ['大家一起解難題，哪個方法比較像好團隊？',['互相聽想法，再分工','只搶功勞','不讓別人說話'],0,'這是從故事延伸的合作練習，不是某段三國史實。']
 ]},
 {id:'wuxia',host:'dad',title:'江湖修練錄：金庸角色冒險',desc:'令狐沖、張無忌、段譽：拜師、練功、學秘笈闖十關。',kind:'wuxia'},
 {id:'basketball',host:'dad',title:'雞爸爸的節奏投籃',desc:'鎖定左右方向，再鎖定力度，挑戰三種難度。',kind:'hoop'},
 {id:'strategy',host:'dad',title:'雞爸爸的迷你三國志',desc:'經營城池、招募士兵、出征攻城。',kind:'strategy'},
 {id:'physics',host:'dad',title:'雞爸爸的坡道實驗室',desc:'改變高度，看小球滑得多快。',kind:'ramp'},
 {id:'math',host:'dad',title:'雞爸爸的數學小商店',desc:'付錢、找零，自己算算看。',kind:'shop'},
 {id:'coffee',host:'mom',title:'鼠媽媽的咖啡小幫手',desc:'轉動磨豆機、按住注水、端出手沖咖啡。',kind:'brew'},
 {id:'english',host:'mom',title:'鼠媽媽的英文聽聽看',desc:'聽一個英文單字，找中文意思。',kind:'english',questions:[
 ['cat',['貓咪','狗狗','小鳥'],0,'Cat 是貓咪。'],['apple',['香蕉','蘋果','橘子'],1,'Apple 是蘋果。'],['book',['球','車子','書本'],2,'Book 是書本。'],['water',['水','牛奶','果汁'],0,'Water 是水。'],['family',['學校','家人','公園'],1,'Family 是家人。'],['happy',['生氣','難過','快樂'],2,'Happy 是快樂。'],['ball',['球','桌子','門'],0,'Ball 是球。'],['thank you',['早安','謝謝你','晚安'],1,'Thank you 是謝謝你。']
 ]},
 {id:'christian',host:'mom',title:'鼠媽媽的聖經故事屋',desc:'從好撒馬利亞人的故事練習關心。',kind:'quiz',questions:[
 ['《路加福音》好撒馬利亞人的故事裡，誰停下來照顧傷者？',['撒馬利亞人','所有路過的人','沒有人'],0,'故事中的撒馬利亞人停下來，照顧路上受傷的人。'],
 ['他看到傷者後，做了什麼？',['嘲笑傷者','包紮傷口，帶去照顧','把東西拿走'],1,'這個故事用實際幫助，說明關愛他人的行動。'],
 ['故事讓我們想一想：幫助別人需要先看什麼？',['是不是自己的好朋友','是不是穿得漂亮','對方需要什麼幫助'],2,'故事鼓勵人以憐憫與行動關心有需要的人。'],
 ['小朋友遇到受傷的人，怎麼幫忙比較安全？',['找可信任的大人協助','自己亂用藥','圍著看熱鬧'],0,'這是生活延伸練習：先確保安全，請大人協助。'],
 ['朋友和自己的信仰不同，可以怎麼相處？',['不准對方說話','互相尊重，聽聽對方的故事','一定要吵贏'],1,'這是相處練習：尊重不同信仰，也能一起學習與幫忙。']
 ]}
];
const hosts={ama:{name:'兔阿嬤',image:'ama'},dad:{name:'雞爸爸',image:'dad'},mom:{name:'鼠媽媽',image:'mom'}};
function shuffle(a){const copy=[...a];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
function rampSpeed(height){return Math.sqrt(2*9.8*height/100);}
function changeFor(price,paid){return paid-price;}
if(typeof module!=='undefined'&&module.exports){module.exports={topics,rampSpeed,changeFor};return;}
const menu=document.getElementById('topic-menu'),stage=document.getElementById('topic-stage'),play=document.getElementById('topic-play'),title=document.getElementById('game-title'),feedback=document.getElementById('feedback'),read=document.getElementById('read'),voiceToggle=document.getElementById('voice-toggle');
let disposeAction=null;
function clearAction(){if(disposeAction){disposeAction();disposeAction=null;}}
let current=null,round=0,deck=[],solved=false,autoVoice=true,spoken='',language='zh-TW',generation=0;
const supported='speechSynthesis'in window&&'SpeechSynthesisUtterance'in window;
function stop(){generation++;if(supported)speechSynthesis.cancel();}
function say(text,lang='zh-TW'){if(!supported)return;stop();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.85;const voices=speechSynthesis.getVoices().filter(v=>lang==='en-US'?v.lang.startsWith('en'):v.lang.toLowerCase().startsWith('zh'));u.voice=voices.find(v=>/yunjhe|yunxi|kangkang|male/i.test(v.name))||voices.find(v=>v.lang===lang)||voices[0]||null;speechSynthesis.speak(u);}
function announce(text,lang='zh-TW'){spoken=text;language=lang;if(autoVoice)say(text,lang);}
function message(text,correct){feedback.textContent=text;feedback.className=correct?'feedback good':'feedback';if(autoVoice)say(text);}
function button(label,fn,cls=''){const b=document.createElement('button');b.type='button';b.textContent=label;b.className=cls;b.addEventListener('click',fn);return b;}
function heading(text){const h=document.createElement('h3');h.textContent=text;play.append(h);}
function nextButton(){play.append(button(round+1>=deck.length?'完成這一回合':'下一題',()=>{round++;if(round>=deck.length)finish();else renderQuiz();},'primary next'));}
function finish(){stop();play.replaceChildren();feedback.textContent='';heading('這回合完成了！慢慢想，也是一種進步。');play.append(button('再玩一回合',()=>start(current.id),'primary'));announce('這回合完成了！你可以再玩一回合，或選其他主題。');}
function renderQuiz(){stop();play.replaceChildren();feedback.textContent='';solved=false;const q=deck[round];heading('第 '+(round+1)+' 題，共 '+deck.length+' 題');let prompt=current.kind==='english'?'聽聽看，這個英文是什麼意思？':q[0];heading(prompt);if(current.kind==='english'){play.append(button('再聽一次英文',()=>say(q[0],'en-US'),'primary'));play.append(button('顯示英文單字',e=>{e;word.hidden=false;}));const word=document.createElement('p');word.textContent=q[0];word.hidden=true;play.append(word);}
const choices=document.createElement('div');choices.className='choices';q[1].map((text,i)=>({text,i})).sort(()=>Math.random()-.5).forEach(o=>choices.append(button(o.text,()=>{if(solved)return;if(o.i===q[2]){solved=true;choices.querySelectorAll('button').forEach(b=>b.disabled=true);message('答對了！'+q[3],true);nextButton();}else message('再想一想，可以換一個答案。',false);})));play.append(choices);announce(current.kind==='english'?q[0]:prompt+'。選項有：'+q[1].join('、'),current.kind==='english'?'en-US':'zh-TW');}
function renderRamp(){heading('把坡道升高，預測小球會更快還是更慢？');const label=document.createElement('label');label.textContent='坡道高度：';const range=document.createElement('input');range.type='range';range.min='10';range.max='60';range.step='10';range.value='20';range.id='height';label.htmlFor='height';const output=document.createElement('output');const diagram=document.createElement('div');diagram.className='ramp';diagram.innerHTML='<div class="slope"></div><div class="ball">●</div>';const ball=diagram.querySelector('.ball');let frame=0;
function update(){cancelAnimationFrame(frame);ball.style.transform='';output.textContent=range.value+' 公分';diagram.style.setProperty('--rise',Number(range.value)*1.8+'px');feedback.textContent='';}
range.addEventListener('input',update);update();play.append(label,range,output,diagram,button('放球，觀察一次',()=>{cancelAnimationFrame(frame);const token=generation,start=performance.now(),duration=2400/rampSpeed(Number(range.value));function move(now){if(token!==generation)return;const p=Math.min(1,(now-start)/duration);ball.style.transform='translate('+((diagram.clientWidth-42)*p)+'px,'+(Number(range.value)*1.8*p)+'px)';if(p<1)frame=requestAnimationFrame(move);else message('理想模型中，高度越高，到底部的速度越快。試試另一個高度！',true);}frame=requestAnimationFrame(move);},'primary'));
const note=document.createElement('p');note.className='note';note.textContent='這是忽略摩擦、把小球當質點的示意模型；真實滾球還會有轉動與摩擦。動畫放慢，方便比較。';play.append(note);announce('調整坡道高度，再按放球，觀察一次。');}
function renderShop(){const price=5+Math.floor(Math.random()*15),paid=price<=10?10:20;heading('一本故事小冊 '+price+' 元，付 '+paid+' 元，應該找回多少？');const board=document.createElement('div');board.className='cash';let value=0;const total=document.createElement('p');function update(){total.textContent='我的找零：'+value+' 元';}update();board.append(total,button('加 1 元',()=>{value++;update();}),button('加 5 元',()=>{value+=5;update();}),button('重算',()=>{value=0;update();}),button('算好了',()=>{if(value===changeFor(price,paid)){message('剛剛好！付的錢減掉價錢，就是找零。',true);if(!board.querySelector('.next'))board.append(button('換一筆買賣',()=>start('math'),'primary next'));}else message(value>paid-price?'找太多了，按重算再試試。':'還差一點，再加一些零錢。',false);},'primary'));play.append(board);announce('一本故事小冊 '+price+' 元，付 '+paid+' 元，應該找回多少？');}
function renderCoffee(){const steps=['放濾紙，潤濕並倒掉潤紙水','加入咖啡粉','少量注水，等待悶蒸','慢慢分次注水','滴濾完成，移開濾杯'];let index=0;heading('照順序幫鼠媽媽準備一杯手沖咖啡');const progress=document.createElement('p'),list=document.createElement('div');list.className='choices';progress.textContent='已完成 0 / 5 個步驟';shuffle(steps).forEach(s=>list.append(button(s,()=>{if(s===steps[index]){index++;list.querySelectorAll('button').forEach(b=>{if(b.textContent===s)b.disabled=true;});progress.textContent='已完成 '+index+' / 5 個步驟';message(index===5?'完成了！這是基本手沖順序，配方也可以有不同變化。':'做得好！接下來呢？',true);if(index===5)play.append(button('再排一次',()=>start('coffee'),'primary'));}else message('這個步驟還沒到，再找找前面的步驟。',false);})));play.append(progress,list);const note=document.createElement('p');note.className='note';note.textContent='這裡是螢幕模擬；熱水由大人操作。小朋友可以幫忙排步驟，不需要喝咖啡。';play.append(note);announce('照順序幫鼠媽媽準備手沖咖啡。先想想，濾紙和咖啡粉，哪個先準備？');}
function start(id){clearAction();stop();current=topics.find(t=>t.id===id);if(!current)return;stage.hidden=false;title.textContent=current.title;play.replaceChildren();feedback.textContent='';menu.querySelectorAll('[data-topic]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.topic===id)));if(current.kind==='wuxia'){disposeAction=window.CDJWuxia.mount(play,{message,announce});}else if(current.kind==='chibi'){disposeAction=window.CDJChibi.mount(play,{message,announce});}else if(['batting','battle','brew','strategy','hoop'].includes(current.kind)){disposeAction=window.CDJActionGames.mount(current.id,play,{message,announce});}else if(current.kind==='quiz'||current.kind==='english'){deck=shuffle(current.questions).slice(0,5);round=0;renderQuiz();}else if(current.kind==='ramp')renderRamp();else if(current.kind==='shop')renderShop();else renderCoffee();stage.scrollIntoView({behavior:'smooth',block:'start'});title.focus({preventScroll:true});}
Object.entries(hosts).forEach(([id,host])=>{const group=document.createElement('section');group.className='host';group.dataset.host=id;const h=document.createElement('h2');h.textContent=host.name+'帶你玩';const img=document.createElement('img');img.src='/assets/img/portrait-'+host.image+'.png';img.alt=host.name;img.className='host-photo';group.append(img,h);topics.filter(t=>t.host===id).forEach(t=>{const b=button(t.title+'\n'+t.desc,()=>start(t.id),'topic');b.dataset.topic=t.id;b.setAttribute('aria-pressed','false');group.append(b);});menu.append(group);});
read.addEventListener('click',()=>say(spoken,language));voiceToggle.addEventListener('click',()=>{autoVoice=!autoVoice;voiceToggle.setAttribute('aria-pressed',String(autoVoice));voiceToggle.textContent=autoVoice?'自動念題：開':'自動念題：關';if(!autoVoice)stop();});document.getElementById('stop').addEventListener('click',stop);document.getElementById('back-topics').addEventListener('click',()=>{clearAction();stop();stage.hidden=true;menu.querySelector('[data-topic="'+current.id+'"]').focus();});if(!supported){read.disabled=true;voiceToggle.disabled=true;document.getElementById('voice-note').textContent='此瀏覽器沒有語音功能，可以看題目一起玩。英文也能顯示單字。';}window.addEventListener('pagehide',()=>{clearAction();stop();});document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
})();




