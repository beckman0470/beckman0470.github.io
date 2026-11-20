/* Targeted game embeds for Chicken Dad Journal rooms, 2026-11-20.
 * Loads one game/video rather than a second copy of its portal page.
 * Remains isolated to iframe content and leaves the room navigation unchanged.
 */
(()=>{'use strict';
  const bridge=window.CDJRoomFrame;
  if(!bridge||typeof bridge.attach!=='function')return;
  const original=bridge.attach;
  const baseStyle=`
    html,body{height:auto!important;min-height:0!important;overflow-x:hidden!important}
    body>header,body>footer,body .site-header,body .site-footer,
    body .cdj-unified-header,body .entry-subnav,
    body main>.cdj-welcome,body main>.intro,
    body main>.tabs,body .family-host-switch,
    body #topic-menu,body #arcade-tabs,body #adult-catalog,
    body .ama-top,body .ama-tabs{display:none!important}
    html body main, html body main.cdj-welcome-main{
      width:100%!important;max-width:none!important;
      min-height:0!important;margin:0!important;padding:12px!important;
    }
    body.cdj-embed-topic main>:not(#topic-stage){display:none!important}
    body.cdj-embed-topic #topic-stage{margin:0!important;padding:8px!important;width:100%!important}
    body.cdj-embed-topic #back-topics{display:none!important}
    body.cdj-embed-video main>:not(#panel-dodo):not(#panel-dragon){display:none!important}
    body.cdj-embed-video #panel-dodo,body.cdj-embed-video #panel-dragon{margin:0!important;padding:8px!important;min-height:0!important}
    body.cdj-embed-video .panel-head,body.cdj-embed-video .panel>.modes,
    body.cdj-embed-video .panel>.playbox,
    body.cdj-embed-video .panel>.notice{display:none!important}
    body.cdj-embed-video .dv-corner{display:block!important;margin:0!important;padding:0!important;border:0!important}
    body.cdj-embed-video .dv-player:not([hidden]),
    body.cdj-embed-video .dv-filters{display:block}
    body.cdj-embed-video .dv-grid{grid-template-columns:repeat(auto-fit,minmax(170px,1fr))!important}
    body.cdj-embed-play .panel-head{display:none!important}
    body.cdj-embed-play .dv-corner{display:none!important}
    body.cdj-embed-play main>.tabs{display:none!important}
    body.cdj-embed-cat main{max-width:850px!important;margin:auto!important}
    .cdj-cat-game{background:#fffdf5;border:1px solid #e3e6d8;border-radius:18px;padding:16px;color:#34533e;font:16px/1.6 system-ui,"Microsoft JhengHei",sans-serif}
    .cdj-cat-game h2{font-size:23px;margin:0 0 8px}
    .cdj-cat-game p{margin:8px 0}
    .cdj-cat-scene{display:grid;grid-template-columns:minmax(120px,1fr) minmax(120px,1fr);gap:12px;align-items:center;min-height:245px;background:#f4f1e8;border-radius:16px;padding:12px}
    .cdj-cat-art{height:215px;background-position:center;background-repeat:no-repeat;background-size:contain;animation:cdj-cat-bob 2.2s ease-in-out infinite}
    @keyframes cdj-cat-bob{50%{transform:translateY(-5px)}}
    .cdj-cat-bowl{width:min(100%,230px);min-height:90px;border-radius:50%;background:#d3a86d;border:8px solid #b98a56;display:grid;place-items:center;font-size:25px;font-weight:bold;color:#5a4937;margin:auto}
    .cdj-cat-bowl.ready{background:#a8d7e9}
    .cdj-cat-actions{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0}
    .cdj-cat-actions button{padding:12px 18px;border:1px solid #9eb69d;border-radius:12px;background:#e6f0df;color:#34533e;font:600 16px system-ui;cursor:pointer;min-height:44px}
    .cdj-cat-progress{font-size:15px;color:#526b55}
    @media(prefers-reduced-motion:reduce){.cdj-cat-art{animation:none!important}}
  `;
  function addStyle(doc){const style=doc.createElement('style');style.setAttribute('data-cdj-targeted-embed','');style.textContent=baseStyle;doc.head.append(style);return style;}
  function makeCatGame(doc,id){
    const isYahoo=id==='chores',name=isYahoo?'雅虎':'右右';
    doc.body.classList.add('cdj-embed-cat');
    let main=doc.querySelector('main');if(!main){main=doc.createElement('main');}
    // This is a dedicated small activity, not the entire /play/ portal.
    doc.body.replaceChildren(main);
    main.replaceChildren();
    const host=doc.createElement('section');host.className='cdj-cat-game';
    const heading=doc.createElement('h2');heading.textContent=isYahoo?'雅虎喝水':'右右吃飯';
    const intro=doc.createElement('p');intro.textContent=isYahoo?'幫雅虎把水碗加滿，再點一下牠，看牠開心喝水。':'幫右右準備晚餐，等牠慢慢享用。';
    const scene=doc.createElement('div');scene.className='cdj-cat-scene';
    const art=doc.createElement('div');art.className='cdj-cat-art';art.setAttribute('role','img');art.setAttribute('aria-label',name);
    art.style.backgroundImage='url('+JSON.stringify(isYahoo?'/cat-yahoo-peek.png':'/cat-youyou-sleep.png')+')';
    const bowl=doc.createElement('div');bowl.className='cdj-cat-bowl';bowl.setAttribute('role','img');
    bowl.setAttribute('aria-label',isYahoo?'水碗':'食物碗');bowl.textContent=isYahoo?'空水碗':'空碗';
    scene.append(art,bowl);
    const actions=doc.createElement('div');actions.className='cdj-cat-actions';
    const fill=doc.createElement('button');fill.type='button';fill.textContent=isYahoo?'倒入新鮮的水':'放入貓咪飼料';
    const enjoy=doc.createElement('button');enjoy.type='button';enjoy.textContent=isYahoo?'讓雅虎喝水':'讓右右吃飯';
    enjoy.disabled=true;
    const reset=doc.createElement('button');reset.type='button';reset.textContent='再玩一次';
    const note=doc.createElement('p');note.setAttribute('role','status');note.setAttribute('aria-live','polite');note.className='cdj-cat-progress';
    let rounds=0,ready=false;
    function update(){bowl.classList.toggle('ready',ready);bowl.textContent=ready?(isYahoo?'新鮮的水':'美味飼料'):(isYahoo?'空水碗':'空碗');enjoy.disabled=!ready;note.textContent='完成 '+rounds+' 次照顧 · '+(ready?'準備好了，可以請貓咪來！':'先準備碗裡的東西。');}
    fill.onclick=()=>{ready=true;update()};
    enjoy.onclick=()=>{if(!ready)return;rounds++;ready=false;update();note.textContent=name+(isYahoo?'喝到水，開心地喵了一聲！':'吃飽後，舒服地伸了個懶腰！')+' · 完成 '+rounds+' 次';};
    reset.onclick=()=>{rounds=0;ready=false;update()};
    actions.append(fill,enjoy,reset);host.append(heading,intro,scene,actions,note);main.append(host);update();
  }
  function showPlay(doc,url){
    const area=url.searchParams.get('area')||'dragon';
    const video=url.searchParams.get('roomview')==='video';
    doc.body.classList.add(video?'cdj-embed-video':'cdj-embed-play');
    const dodo=doc.getElementById('panel-dodo'),dragon=doc.getElementById('panel-dragon');
    const selected=area==='dodo'?dodo:dragon,other=area==='dodo'?dragon:dodo;
    if(other){other.hidden=true;other.style.setProperty('display','none','important');}
    if(selected){selected.hidden=false;selected.style.setProperty('display','block','important');}
    if(video){
      if(selected)selected.querySelectorAll('.panel-head,.modes,.playbox').forEach(e=>e.style.setProperty('display','none','important'));
      const corner=selected?.querySelector('.dv-corner');
      if(corner)corner.style.setProperty('display','block','important');
    }
  }
  function showTopic(doc,url){
    const game=url.searchParams.get('game');
    if(!game)return;
    const button=doc.querySelector('#topic-menu [data-topic="'+CSS.escape(game)+'"]');
    if(!button){doc.body.classList.add('cdj-embed-topic');return;}
    // The source page does not interpret ?game=... on its own.
    // Trigger the original game's click handler to preserve its quiz logic.
    button.click();
    const stage=doc.getElementById('topic-stage');
    if(stage)stage.hidden=false;
    doc.body.classList.add('cdj-embed-topic');
  }
  bridge.attach=function(frame,opts){
    const driver=original.call(this,frame,opts);
    const doc=frame.contentDocument;
    if(!doc?.body)return driver;
    const style=addStyle(doc);
    const url=new URL(opts.url,opts.base);
    const path=url.pathname;
    const game=url.searchParams.get('game');
    if(path.startsWith('/play/')&&(game==='chores'||game==='feed'))makeCatGame(doc,game);
    else if(path.startsWith('/play/'))showPlay(doc,url);
    else if(path==='/relax-family.html')showTopic(doc,url);
    return {...driver,dispose(){style.remove();driver.dispose()}};
  };
})();
