/* Original deterministic cooking rules; seconds are game time, not food guidance. */
((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.Yakiniku=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
 'use strict';
 const foods=[{id:'beef',name:'薄切牛肉',icon:'🥩',seconds:5,color:'#c76864'},{id:'pork',name:'豬里肌',icon:'🥓',seconds:7,color:'#e69b92'},{id:'mushroom',name:'香菇',icon:'🍄',seconds:6,color:'#b29274'}];
 const level=(t,f)=>t>=f.seconds*1.8?'烤焦':t>=f.seconds*1.4?'偏老':t>=f.seconds?'剛好':t>0?'加熱中':'生';
 function create(id){return {food:foods.find(f=>f.id===id)||foods[0],sides:[0,0],down:0};}
 function heat(piece,dt){piece.sides[piece.down]+=Math.max(0,dt);return piece;}
 function judge(piece){const states=piece.sides.map(t=>level(t,piece.food));if(states.includes('烤焦'))return {kind:'burnt',points:-30};if(piece.sides.some(t=>t<piece.food.seconds))return {kind:'raw',points:-20};return {kind:states.every(x=>x==='剛好')?'perfect':'well',points:states.every(x=>x==='剛好')?100:60};}
 return {foods,level,create,heat,judge};
});
