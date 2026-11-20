/* Bathroom picture quiz: pictorial answers + Taiwanese Mandarin question playback. */
(()=>{'use strict';
if(location.pathname!=='/rooms.html'||new URLSearchParams(location.search).get('room')!=='bathroom')return;
const questions=[
 {q:'要上廁所了，先做什麼比較安全？',a:['站在馬桶旁，準備好並請大人幫忙','站在馬桶蓋上','在浴室跑來跑去'],correct:0,feedback:'很好！先準備好、穩穩地使用馬桶，需要時請大人幫忙。'},
 {q:'上完廁所，接著要做什麼？',a:['不沖水就跑走','做好清潔、整理好，再沖水','把玩具丟進馬桶'],correct:1,feedback:'答對了！做好清潔、沖水，再去洗手。'},
 {q:'洗手要怎麼洗才乾淨？',a:['手碰一下水就好','用肥皂仔細搓洗雙手','把手擦在衣服上'],correct:1,feedback:'太棒了！用肥皂洗手心、手背和指縫，再沖乾淨擦乾。'},
 {q:'地板濕濕的，怎麼做比較安全？',a:['慢慢走，請大人擦乾地板','在濕地板上跑步','從積水上跳過去'],correct:0,feedback:'好棒！慢慢走，請大人幫忙保持地板乾燥。'},
 {q:'刷完牙、洗完臉，接著做什麼？',a:['把牙刷與毛巾收好','讓水一直流','把毛巾丟在地上'],correct:0,feedback:'答對了！關好水龍頭，收好牙刷，把毛巾掛好。'}
];
function taiwanVoice(){if(!('speechSynthesis'in window))return null;const v=speechSynthesis.getVoices();return v.find(x=>/^zh[-_]TW$/i.test(x.lang)&&/female|xiaoxiao|hsiao|美|曉|雅|佳|婷/i.test(x.name))||v.find(x=>/^zh[-_]TW$/i.test(x.lang))||null;}
function speak(text,notify){if(!('speechSynthesis'in window)){notify('這台裝置尚未提供語音功能，題目可以請家人一起讀喔！');return;}speechSynthesis.cancel();const voice=taiwanVoice();if(!voice){notify('請在裝置語音設定加入「中文（台灣）」聲音，便能聽老師念題目。');return;}const u=new SpeechSynthesisUtterance(text);u.voice=voice;u.lang='zh-TW';u.rate=1.06;u.pitch=1.18;u.volume=1;speechSynthesis.speak(u)}
function launch(){const host=document.getElementById('room-activity-bathroom');if(!host)return false;
 const link=document.createElement('link');link.rel='stylesheet';link.href='/css/bathroom-picture-quiz.css?v=20261120-pictorial1';document.head.append(link);
 host.classList.add('bath-visual');host.innerHTML='<div class="bath-hero"><div><h2>浴室安全圖片小學堂</h2><p class="bath-intro">看圖找答案・聽題目學習浴室安全</p></div><span class="bath-total" aria-hidden="true">★ 0 / 5</span></div><div id="bathroom-quiz-app"></div>';
 const root=host.querySelector('#bathroom-quiz-app');let n=0,score=0,locked=false;
 function render(){locked=false;if(n>=questions.length){host.querySelector('.bath-total').textContent='★ '+score+' / 5';root.innerHTML='<div class="bath-finale"><strong>闖關完成！</strong><p>你拿到 '+score+' 顆安全小星星！<br>跟兔阿嬤一起記住浴室安全的小祕訣。</p><button type="button" class="bath-restart">再玩一次</button></div>';root.querySelector('button').onclick=()=>{n=0;score=0;render()};return;}
 const q=questions[n];host.querySelector('.bath-total').textContent='★ '+score+' / 5';root.innerHTML='<div class="bath-bars">'+questions.map((_,i)=>'<span class="bath-bar '+(i<n?'done':i===n?'now':'')+'"></span>').join('')+'</div><div class="bath-progress"><strong>第 '+(n+1)+' / '+questions.length+' 題</strong><span class="bath-stars" aria-label="答對 '+score+' 題">'+('★'.repeat(score)||'☆')+'</span></div><div class="bath-question"><div class="bath-ask"><h3>'+q.q+'</h3><button type="button" class="bath-speak" aria-label="朗讀題目">🔊 聽題目</button></div><p class="bath-hint">仔細看看三張圖片，選一張最安全的做法。</p></div><div class="bath-choices"></div><div class="bath-result" role="status" aria-live="polite">選一張圖片，看看你的判斷！</div><button type="button" class="bath-next" hidden>下一題 →</button>';
 const result=root.querySelector('.bath-result');root.querySelector('.bath-speak').onclick=()=>speak(q.q,t=>result.textContent=t);
 const choices=root.querySelector('.bath-choices');q.a.forEach((description,i)=>{const b=document.createElement('button');b.type='button';b.className='bath-card';b.setAttribute('aria-label','選項 '+(i+1)+'：'+description);b.innerHTML='<img src="/assets/bathroom-quiz/q'+(n+1)+'-'+(i+1)+'.webp" alt="" loading="eager"><span class="bath-number" aria-hidden="true">'+(i+1)+'</span>';b.onclick=()=>{
 if(locked)return;locked=true;if('speechSynthesis' in window)speechSynthesis.cancel();const good=i===q.correct;if(good)score++;
 [...choices.children].forEach((x,j)=>{x.disabled=true;x.classList.toggle('is-correct',j===q.correct);x.classList.toggle('is-wrong',j===i&&!good)});
 result.textContent=(good?'答對了，得到一顆安全小星星！ ':'一起看看最安全的圖片！ ')+q.feedback;
 const next=root.querySelector('.bath-next');next.hidden=false;next.textContent=n===questions.length-1?'看闖關成績 →':'下一題 →';next.onclick=()=>{n++;render();host.scrollIntoView({behavior:'smooth',block:'start'})};
 };choices.appendChild(b)});
 }
 render();return true;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',launch,{once:true});else launch();
})();
