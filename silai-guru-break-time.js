/* SILAI GURU — Break Time / मनोरंजन v1 */
(function(){
'use strict';
if(window.__sgBreakTime)return; window.__sgBreakTime=true;
const css=`.sg-break-card{margin:14px 0;background:linear-gradient(135deg,#fff,#f4f1ff);border:1px solid #ddd7ff;border-radius:18px;padding:15px;box-shadow:0 5px 18px #2022380c}.sg-break-head{display:flex;align-items:center;justify-content:space-between;gap:10px}.sg-break-head h3{margin:0;color:#5144bd}.sg-break-sub{font-size:12px;color:#73778c;margin:5px 0 12px}.sg-break-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.sg-break-btn{border:1px solid #e2defa;background:#fff;border-radius:13px;padding:11px 8px;text-align:center;cursor:pointer;font-weight:800;color:#353946}.sg-break-btn b{display:block;font-size:24px;margin-bottom:4px}.sg-break-btn small{font-size:11px;color:#73778c}.sg-break-modal{position:fixed;inset:0;background:#0008;z-index:2147483000;display:none;align-items:flex-end}.sg-break-modal.open{display:flex}.sg-break-sheet{width:100%;max-width:760px;margin:auto;background:#fff;border-radius:24px 24px 0 0;padding:18px;max-height:88vh;overflow:auto}.sg-break-top{display:flex;align-items:center;justify-content:space-between;gap:8px}.sg-break-top h2{margin:0;color:#5144bd}.sg-break-close{background:#eee;border-radius:10px;padding:8px 11px}.sg-break-box{background:#f8f7ff;border:1px solid #ddd7ff;border-radius:16px;padding:16px;margin-top:12px}.sg-break-answer{font-size:18px;font-weight:800;text-align:center;min-height:55px;display:flex;align-items:center;justify-content:center}.sg-break-big{font-size:30px;text-align:center;font-weight:900;color:#5144bd;padding:12px}.sg-break-actions{display:flex;gap:8px;margin-top:10px}.sg-break-actions button{flex:1}.sg-break-primary{background:#5b4bdb;color:#fff}.sg-break-secondary{background:#efeeff;color:#5144bd}`;
const style=document.createElement('style');style.id='sg-break-time-style';style.textContent=css;document.head.appendChild(style);
const root=document.createElement('div');root.id='sg-break-time';root.innerHTML=`<section class="sg-break-card"><div class="sg-break-head"><h3>🎉 Break Time</h3><span>5 मिनट</span></div><div class="sg-break-sub">काम करते-करते थक गए? थोड़ा मज़ा और दिमाग की कसरत करें।</div><div class="sg-break-grid"><button class="sg-break-btn" data-break="joke"><b>😂</b>मज़ेदार बात<small>एक छोटा joke</small></button><button class="sg-break-btn" data-break="riddle"><b>🧠</b>पहेली<small>दिमाग लगाइए</small></button><button class="sg-break-btn" data-break="color"><b>🎨</b>Design Fun<small>रंग चुनें</small></button><button class="sg-break-btn" data-break="challenge"><b>🎲</b>Surprise Me<small>कुछ नया करें</small></button></div></section>`;
const modal=document.createElement('div');modal.className='sg-break-modal';modal.innerHTML=`<div class="sg-break-sheet"><div class="sg-break-top"><h2 id="sgBreakTitle">Break Time</h2><button class="sg-break-close" type="button">✕</button></div><div class="sg-break-box"><div id="sgBreakBody"></div><div class="sg-break-actions"><button class="sg-break-primary" id="sgBreakAgain">फिर से</button><button class="sg-break-secondary" id="sgBreakDone">काम पर वापस</button></div></div></div>`;
function add(){
 const target=document.querySelector('.app .wrap')||document.querySelector('.wrap')||document.querySelector('.app');
 if(!target)return false;
 if(document.getElementById('sg-break-time'))return true;
 target.insertBefore(root,target.firstChild||null);document.body.appendChild(modal);return true;
}
const jokes=['Tailor ka sabse bada puzzle: “Bas thoda sa fitting kar dena!” 😄','Customer: “Same design chahiye, bas thoda different.” Tailor: “Ji bilkul!” 😂','Silai machine bhi kabhi-kabhi kehti hai: aaj bas, kal silenge! 🧵'];
const riddles=[['Main kapde ko jodta hoon, par khud kapda nahi hoon. Main kaun?','🧵 Dhaga'],['Mere bina silai mushkil, par main sui nahi hoon. Main kaun?','✂️ Kainchi'],['Main rang badal sakta hoon aur design ko naya bana sakta hoon. Main kya?','🎨 Color combination']];
const colors=['💜 Purple + White','💙 Royal Blue + Cream','🌸 Pink + Wine','💚 Green + Gold','🧡 Peach + Maroon','🤍 Ivory + Black'];
let mode='joke';
function show(type){mode=type;const title=document.getElementById('sgBreakTitle'),body=document.getElementById('sgBreakBody');if(!title||!body)return;
 if(type==='joke'){title.textContent='😂 मज़ेदार बात';body.innerHTML='<div class="sg-break-answer">'+jokes[Math.floor(Math.random()*jokes.length)]+'</div>'}
 else if(type==='riddle'){const q=riddles[Math.floor(Math.random()*riddles.length)];title.textContent='🧠 आज की पहेली';body.innerHTML='<div class="sg-break-answer">'+q[0]+'</div><button class="sg-break-primary" id="sgBreakReveal" style="width:100%;margin-top:8px">उत्तर देखें</button>';document.getElementById('sgBreakReveal').onclick=()=>{body.innerHTML='<div class="sg-break-answer">'+q[1]+'</div>'}}
 else if(type==='color'){title.textContent='🎨 Design Fun';body.innerHTML='<div class="sg-break-big">'+colors[Math.floor(Math.random()*colors.length)]+'</div><div class="sg-break-answer">इस combination से आज कोई नया design try करें!</div>'}
 else {const all=['😂 Joke','🧠 Puzzle','🎨 Color idea','✂️ नया design challenge'];title.textContent='🎲 Surprise Me';body.innerHTML='<div class="sg-break-big">'+all[Math.floor(Math.random()*all.length)]+'</div><div class="sg-break-answer">आज का छोटा break पूरा! 😊</div>'}
 modal.classList.add('open');history.pushState({sgBreak:true},'','#sg-break');}
root.addEventListener('click',e=>{const b=e.target.closest('[data-break]');if(b)show(b.dataset.break)});
modal.querySelector('.sg-break-close').onclick=close;modal.querySelector('#sgBreakDone').onclick=close;modal.querySelector('#sgBreakAgain').onclick=()=>show(mode);
function close(){modal.classList.remove('open');if(history.state?.sgBreak)history.back()}
window.addEventListener('popstate',()=>{if(modal.classList.contains('open'))modal.classList.remove('open')});
function boot(){if(!add())setTimeout(boot,300)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
