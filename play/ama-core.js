(function(root){'use strict';
const goal=()=>[1,2,3,4,5,6,7,8,0];
function neighbors(i){return [i-3,i+3,i%3?i-1:-1,i%3<2?i+1:-1].filter(n=>n>=0&&n<9)}
function solved(b){return b.every((v,i)=>v===goal()[i])}
function move(b,i){const z=b.indexOf(0);if(!neighbors(z).includes(i))return null;const n=b.slice();[n[z],n[i]]=[n[i],n[z]];return n}
function shuffled(steps=30,rng=Math.random){let b=goal(),previous=-1;for(let i=0;i<steps;i++){const z=b.indexOf(0),a=neighbors(z).filter(n=>n!==previous);const n=a[Math.floor(rng()*a.length)];b=move(b,n);previous=z}return solved(b)?shuffled(steps+1,rng):b}
const quotes=[
 {text:'心量要大，自我要小。',volume:1,number:7},
 {text:'隨遇而安，隨緣奉獻。',volume:1,number:37},
 {text:'踏實的體驗生命，就是禪修。',volume:2,number:89},
 {text:'操心就有事，放心便無事。',volume:2,number:102},
 {text:'道心之中有施無畏。',volume:3,number:11},
 {text:'人上有人，山高水長。',volume:3,number:50},
 {text:'得理讓三分，理直氣要柔。',volume:4,number:2},
 {text:'後悔是煩惱，懺悔是修行。',volume:4,number:17}
];
function dateKey(date=new Date()){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(date)}
function dailyIndex(key){let h=0;for(const c of key)h=(h*31+c.charCodeAt(0))>>>0;return h%quotes.length}
const api={goal,neighbors,solved,move,shuffled,quotes,dateKey,dailyIndex};if(typeof module!=='undefined')module.exports=api;else root.AmaCore=api;
})(typeof window!=='undefined'?window:this);

