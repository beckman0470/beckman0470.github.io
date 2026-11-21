/* Chicken Dad Journal · family menu mini-game, isolated to the dining room. */
(()=>{'use strict';
if(location.pathname!=='/rooms.html'||new URLSearchParams(location.search).get('room')!=='dining')return;
const init=()=>{
 const menu=document.getElementById('dining-mom-menu');const games=document.querySelector('#dining-games .house-cards');
 if(!menu||!games||document.getElementById('cdj-family-menu-game'))return;
 const s=document.createElement('style');s.textContent=`
 #cdj-family-menu-game{margin:12px 0 20px;padding:clamp(15px,2.2vw,26px);border:2px solid #dfdecb;border-radius:22px;background:linear-gradient(130deg,#fffdf4,#f4f6e7);color:#365440;box-shadow:0 9px 26px #3348270e;font-family:system-ui,'Microsoft JhengHei',sans-serif}
 #cdj-family-menu-game *,#cdj-family-menu-game *:before{box-sizing:border-box}
 #cdj-family-menu-game h3{margin:0 0 8px;font-size:clamp(20px,2vw,26px)}
 #cdj-family-menu-game p{margin:5px 0 12px;line-height:1.6}
 #cdj-family-menu-game .fm-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:14px}
 #cdj-family-menu-game .fm-order{border:2px solid #efd8a8;border-radius:18px;padding:15px;background:#fff6de}
 #cdj-family-menu-game .fm-order-name{font-size:clamp(21px,2.5vw,29px);font-weight:900;display:block;margin:5px 0}
 #cdj-family-menu-game .fm-person{font-size:15px;color:#806a4b}
 #cdj-family-menu-game .fm-target{margin:10px 0;min-height:46px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}
 #cdj-family-menu-game .fm-target span{border-radius:50px;padding:7px 10px;background:#fff;border:1px solid #dec8a8;font-size:14px}
 #cdj-family-menu-game .fm-ingredients{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
 #cdj-family-menu-game .fm-ing{border:2px solid #d7dfc7;border-radius:16px;background:#fffef8;min-height:82px;padding:10px 4px;font-size:15px;cursor:pointer;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2px;touch-action:manipulation;color:#32503c}
 #cdj-family-menu-game .fm-ing .fm-emoji{font-size:31px;line-height:1.2}
 #cdj-family-menu-game .fm-ing[aria-pressed=true]{border-color:#468e64;background:#dbf0df;box-shadow:inset 0 0 0 1px #468e64}
 #cdj-family-menu-game .fm-ing:focus-visible,#cdj-family-menu-game button:focus-visible{outline:3px solid #d98336;outline-offset:2px}
 #cdj-family-menu-game .fm-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:13px 0}
 #cdj-family-menu-game .fm-actions button{background:#396d50;color:white;border:0;border-radius:99px;padding:11px 18px;font-weight:750;cursor:pointer;min-height:46px;font-size:16px}
 #cdj-family-menu-game .fm-actions button.fm-secondary{background:#fff;border:1px solid #afc6ad;color:#355c48}
 #cdj-family-menu-game .fm-status{border-radius:12px;background:#ecf3e8;padding:10px 12px;min-height:45px;font-weight:700}
 #cdj-family-menu-game .fm-score{font-size:17px;font-weight:850;white-space:nowrap}
 #cdj-family-menu-game .fm-recipe-toggle{margin:14px 0 0;padding-top:10px;border-top:1px dashed #bbc6aa;font-size:14px}
 #cdj-family-menu-game .fm-recipe-toggle a{color:#2b6d50;font-weight:750}
 #dining-games .house-card.cdj-menu-cover .dining-card-picture{background-size:cover!important;background-position:center!important;aspect-ratio:1/1;}
 @media(max-width:680px){#cdj-family-menu-game .fm-layout{grid-template-columns:1fr}#cdj-family-menu-game .fm-ingredients{grid-template-columns:repeat(3,minmax(0,1fr))}#cdj-family-menu-game .fm-ing{min-height:74px;font-size:13px}}
 `;document.head.append(s);
 const item=document.createElement('a');item.className='house-card cdj-menu-cover';item.href='#cdj-family-menu-game';item.innerHTML='<span class="dining-card-picture" aria-hidden="true"></span><div><h3>雞爸爸一家的菜單</h3><p>接下家人的訂單，挑三樣食材，完成料理送上桌！</p><span>開始玩 →</span></div>';
 item.querySelector('.dining-card-picture').style.backgroundImage="url('/assets/play-covers/v1/family-menu.webp?v=20261121')";
 games.prepend(item);
 const recipes=[
 {name:'番茄蛋花湯',who:'鼠姊姊',emoji:'🥣',need:['番茄','雞蛋','蔥花']},
 {name:'義大利麵',who:'雞爸爸',emoji:'🍝',need:['義大利麵','番茄','豬絞肉']},
 {name:'蛤蠣湯',who:'鼠姊姊',emoji:'🍲',need:['蛤蠣','薑絲','蔥花']},
 {name:'寶寶粥',who:'龍弟弟',emoji:'🥣',need:['白米','紅蘿蔔','豬絞肉']},
 {name:'滷肉飯',who:'鼠媽媽',emoji:'🍚',need:['白米','豬絞肉','醬油']}
 ];
 const stock=[['番茄','🍅'],['雞蛋','🥚'],['蔥花','🌿'],['義大利麵','🍝'],['豬絞肉','🥩'],['蛤蠣','🐚'],['薑絲','🫚'],['白米','🍚'],['紅蘿蔔','🥕'],['醬油','🫙'],['玉米','🌽'],['香蕉','🍌']];
 const box=document.createElement('section');box.id='cdj-family-menu-game';box.setAttribute('aria-label','雞爸爸一家的菜單互動遊戲');
 box.innerHTML=`<h3>🍽️ 雞爸爸一家的菜單｜點餐小廚師</h3>
 <p>玩法：<b>看家人的訂單 → 點選 3 樣食材 → 按「完成出餐」</b>。選錯也能重新挑，沒有倒數計時。</p>
 <div class="fm-layout"><div class="fm-order"><span class="fm-person" id="fm-person"></span><strong class="fm-order-name" id="fm-order-name"></strong><div>訂單需要：</div><div class="fm-target" id="fm-target"></div><div class="fm-score" id="fm-score">完成 0 / 5 道　⭐ 0</div></div>
 <div><strong>食材架｜點選 3 樣</strong><div class="fm-ingredients" id="fm-ingredients"></div><div class="fm-actions"><button type="button" id="fm-serve">🍽️ 完成出餐</button><button type="button" id="fm-clear" class="fm-secondary">重新挑選</button><button type="button" id="fm-restart" class="fm-secondary">重玩</button></div><div class="fm-status" id="fm-status" role="status" aria-live="polite"></div></div></div>
 <p class="fm-recipe-toggle">想學真正的作法？下面原本的食譜卡片仍然可以逐張點開閱讀。</p>`;
 menu.querySelector('.dining-dish-grid')?.before(box);
 const $=id=>box.querySelector('#'+id);let round=0,stars=0,picks=new Set();
 function render(){const r=recipes[round];$('fm-person').textContent=r?'來自 '+r.who+' 的訂單':'今日任務完成';$('fm-order-name').textContent=r?r.emoji+' '+r.name:'🎉 全部完成！';$('fm-target').replaceChildren();
 if(r){r.need.forEach((n)=>{const v=document.createElement('span');v.textContent='✓ '+n;$('fm-target').append(v);});}else {$('fm-target').textContent='你已經幫全家人準備好五道料理！';}
 $('fm-score').textContent='完成 '+round+' / '+recipes.length+' 道　⭐ '+stars;
 $('fm-ingredients').replaceChildren();stock.forEach(([name,emoji])=>{const b=document.createElement('button');b.className='fm-ing';b.type='button';b.disabled=!r;b.setAttribute('aria-pressed',String(picks.has(name)));b.innerHTML='<span class="fm-emoji" aria-hidden="true">'+emoji+'</span><span></span>';b.lastChild.textContent=name;b.onclick=()=>{if(picks.has(name))picks.delete(name);else if(picks.size<3)picks.add(name);else {$('fm-status').textContent='一次挑三樣食材喔！可以先取消其中一樣。';return;}render();};$('fm-ingredients').append(b);});
 $('fm-serve').disabled=!r;$('fm-clear').disabled=!r;
 }
 function status(t){$('fm-status').textContent=t;}
 $('fm-serve').onclick=()=>{const r=recipes[round];if(!r)return;if(picks.size!==3){status('請先挑選三樣食材，再完成出餐。');return;}const missing=r.need.filter(x=>!picks.has(x));if(missing.length){status('再看看訂單喔！食材還沒配對正確，可以取消後重選。');return;}round++;stars+=3;picks.clear();render();status(round===recipes.length?'🎉 五道菜全部完成！太棒了，家人都吃飽了！':'🌟 出餐成功！得到 3 顆星，下一張訂單來囉！');};
 $('fm-clear').onclick=()=>{picks.clear();render();status('已清空食材，重新挑選吧！');};
 $('fm-restart').onclick=()=>{round=0;stars=0;picks.clear();render();status('開店囉！先看訂單，挑出三樣食材。');};
 item.addEventListener('click',()=>{menu.open=true;setTimeout(()=>box.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'}),0);});
 render();status('開店囉！先看訂單，挑出三樣食材。');
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
