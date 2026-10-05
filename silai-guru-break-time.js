/* SILAI GURU — Break Time Game Zone v5
   Original tailoring-themed mini games. No external game assets.
*/
(function(){
'use strict';
if(window.__sgBreakTimeV5)return; window.__sgBreakTimeV5=true;
const css=`
.sg-zone{margin:18px 0;padding:16px;border:1px solid #ddd7ff;border-radius:20px;background:#fff}
.sg-zone h3{margin:0;color:#5144bd}.sg-zone small{color:#666}
.sg-games{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:12px}
.sg-game-btn{min-height:96px;border:1px solid #e2defa;border-radius:16px;background:#faf9ff;padding:12px;text-align:left;font-weight:800}
.sg-game-btn b{display:block;font-size:16px;margin-bottom:4px}.sg-game-btn span{font-size:12px;color:#666;font-weight:600}
.sg-game-modal{position:fixed;inset:0;background:rgba(10,10,20,.78);z-index:2147483000;display:none;align-items:center;justify-content:center;padding:12px;box-sizing:border-box}
.sg-game-modal.on{display:flex}.sg-game-box{position:relative;width:min(96%,760px);max-height:94%;overflow:auto;background:#fff;border-radius:22px;padding:12px;box-sizing:border-box}
.sg-game-head{display:flex;align-items:center;justify-content:space-between;font-weight:900}.sg-close{border:0;border-radius:10px;padding:9px 13px;font-size:20px}
.sg-canvas{display:block;width:100%;height:auto;margin-top:8px;border-radius:15px;background:#f7f5ff;touch-action:none}
.sg-controls{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:9px}.sg-controls button{height:52px;border:0;border-radius:14px;font-size:24px;font-weight:900}
.sg-score{text-align:center;font-weight:800;margin-top:7px}.sg-msg{text-align:center;color:#666;font-size:12px;margin-top:6px}
.sg-overlay{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(82%,300px);background:#fff;padding:22px;border-radius:18px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.25);z-index:5}
.sg-overlay button{padding:12px 22px;border:0;border-radius:12px;background:#5144bd;color:#fff;font-weight:900}
@media(max-width:430px){.sg-games{grid-template-columns:1fr}.sg-game-box{width:100%}}
`;
const st=document.createElement('style');st.id='sg-break-v5-style';st.textContent=css;document.head.appendChild(st);
const root=document.createElement('section');root.className='sg-zone';
root.innerHTML='<h3>🎮 Break Time — Tailor Game Zone</h3><small>Kaam ke beech 2–5 minute mind fresh karein. Sab games tailoring material par based hain.</small><div class="sg-games"><button class="sg-game-btn" data-game="match">🔘 <b>Button & Thread Match</b><span>Same material ko 3 ya zyada match karo.</span></button><button class="sg-game-btn" data-game="bubble">🧶 <b>Thread Bubble Shooter</b><span>Same colour ke thread balls group karo.</span></button><button class="sg-game-btn" data-game="run">🏃 <b>Tailor Run</b><span>Thread aur buttons collect karo, scissors se bacho.</span></button><button class="sg-game-btn" data-game="arrow">🪡 <b>Needle Arrow Puzzle</b><span>Di hui direction ko jaldi tap karo.</span></button></div>';
const modal=document.createElement('div');modal.className='sg-game-modal';modal.innerHTML='<div class="sg-game-box"><div class="sg-game-head"><span id="sgTitle">Break Time</span><button class="sg-close" id="sgClose" type="button">✕</button></div><canvas id="sgCanvas" class="sg-canvas" width="720" height="430"></canvas><div id="sgScore" class="sg-score"></div><div id="sgMsg" class="sg-msg"></div><div id="sgControls" class="sg-controls"></div></div></div>';document.body.appendChild(modal);
const cv=modal.querySelector('#sgCanvas'),ctx=cv.getContext('2d'),title=modal.querySelector('#sgTitle'),scoreEl=modal.querySelector('#sgScore'),msg=modal.querySelector('#sgMsg'),controls=modal.querySelector('#sgControls');let raf=0,mode='',score=0,over=false,state={};
function stop(){cancelAnimationFrame(raf);raf=0}
function openGame(m){mode=m;score=0;over=false;stop();modal.classList.add('on');title.textContent={match:'🔘 Button & Thread Match',bubble:'🧶 Thread Bubble Shooter',run:'🏃 Tailor Run',arrow:'🪡 Needle Arrow Puzzle'}[m];controls.innerHTML='';if(m==='match')startMatch();if(m==='bubble')startBubble();if(m==='run')startRun();if(m==='arrow')startArrow()}
function finish(text){over=true;stop();const o=document.createElement('div');o.className='sg-overlay';o.innerHTML='<h2>'+text+'</h2><p>Score: <b>'+score+'</b></p><button type="button">Play Again</button>';modal.querySelector('.sg-game-box').appendChild(o);o.querySelector('button').onclick=()=>{o.remove();openGame(mode)}}
function hud(){scoreEl.textContent='Score: '+score}
function drawBase(){ctx.clearRect(0,0,720,430);ctx.fillStyle='#f7f5ff';ctx.fillRect(0,0,720,430)}
function startMatch(){
 state.grid=[];const colors=['#d95b83','#e6b63e','#5144bd','#4aa88a','#e07d3c'];for(let i=0;i<42;i++)state.grid.push(Math.floor(Math.random()*colors.length));state.colors=colors;state.moves=0;msg.textContent='3 same material ko line mein match karo. 30 moves!';
 const W=6,H=7,sz=70,ox=150,oy=35;
 function draw(){drawBase();ctx.font='bold 13px sans-serif';ctx.fillStyle='#222';ctx.fillText('Buttons • Thread • Fabric',18,25);for(let r=0;r<H;r++)for(let c=0;c<W;c++){let k=r*W+c,x=ox+c*sz+35,y=oy+r*sz+35;ctx.fillStyle=state.colors[state.grid[k]];ctx.beginPath();ctx.arc(x,y,27,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 12px sans-serif';ctx.fillText(['B','T','F','L','N'][state.grid[k]],x-5,y+4)}hud();raf=requestAnimationFrame(()=>{})}
 function check(){let remove=new Set();for(let r=0;r<H;r++)for(let c=0;c<W-2;c++){let a=state.grid[r*W+c];if(a===state.grid[r*W+c+1]&&a===state.grid[r*W+c+2]){remove.add(r*W+c);remove.add(r*W+c+1);remove.add(r*W+c+2)}}for(let c=0;c<W;c++)for(let r=0;r<H-2;r++){let a=state.grid[r*W+c];if(a===state.grid[(r+1)*W+c]&&a===state.grid[(r+2)*W+c]){remove.add(r*W+c);remove.add((r+1)*W+c);remove.add((r+2)*W+c)}}if(remove.size){score+=remove.size*10;let keep=[];for(let c=0;c<W;c++){let col=[];for(let r=H-1;r>=0;r--){let k=r*W+c;if(!remove.has(k))col.push(state.grid[k])}while(col.length<H)col.push(Math.floor(Math.random()*state.colors.length));for(let r=H-1;r>=0;r--)state.grid[r*W+c]=col[H-1-r]} }else score=Math.max(0,score-2);state.moves++;if(score>=300)finish('🏆 Match Master!');else if(state.moves>=30)finish('⏰ Time Up!');draw()}
 cv.onclick=e=>{if(mode!=='match'||over)return;const rect=cv.getBoundingClientRect(),x=(e.clientX-rect.left)*720/rect.width,y=(e.clientY-rect.top)*430/rect.height;const W=6,sz=70,ox=150,oy=35,c=Math.floor((x-ox)/sz),r=Math.floor((y-oy)/sz);if(c>=0&&c<W&&r>=0&&r<H){const k=r*W+c;let best=k;if(c<W-1){state.grid[k]=state.grid[k+1];state.grid[k+1]=state.grid[best];best=k+1}check()}};draw()
}
function startBubble(){
 const colors=['#d95b83','#e6b63e','#5144bd','#4aa88a'];state.balls=[];state.current=0;state.shots=0;msg.textContent='Thread ball ko same colour ke group par shoot karo.';
 function spawn(){for(let i=0;i<28;i++)state.balls.push({x:70+(i%7)*88,y:55+Math.floor(i/7)*52,r:21,c:Math.floor(Math.random()*4)})}
 function draw(){drawBase();for(const b of state.balls){ctx.fillStyle=colors[b.c];ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.fillText('🧶',b.x-8,b.y+4)}ctx.fillStyle='#333';ctx.font='bold 16px sans-serif';ctx.fillText('Next: 🧶',18,405);ctx.fillStyle=colors[state.current];ctx.beginPath();ctx.arc(360,390,22,0,Math.PI*2);ctx.fill();hud()}
 spawn();draw();cv.onclick=e=>{if(mode!=='bubble'||over)return;const rect=cv.getBoundingClientRect(),tx=(e.clientX-rect.left)*720/rect.width,ty=(e.clientY-rect.top)*430/rect.height;let best=null,bd=1e9;for(const b of state.balls){const d=Math.hypot(b.x-tx,b.y-ty);if(d<bd){bd=d;best=b}}if(best&&bd<180){const c=best.c;state.balls=state.balls.filter(b=>b.c!==c||Math.hypot(b.x-best.x,b.y-best.y)>85);score+=30;state.shots++;state.current=Math.floor(Math.random()*4);if(state.balls.length<6)finish('🏆 Thread Master!');else draw()}}
}
function startRun(){
 state.p={x:80,y:320,w:34,h:48,vy:0,on:false};state.items=[];state.obs=[];state.t=0;state.left=false;state.right=false;for(let i=0;i<24;i++){state.items.push({x:220+i*190,y:250-(i%3)*45,taken:false});if(i%2===0)state.obs.push({x:350+i*190,y:335,w:45,h:30,t:'✂️'});else state.obs.push({x:500+i*190,y:300,w:40,h:65,t:'🧶'})}msg.textContent='Buttons + thread collect karo, scissors se bacho.';controls.innerHTML='<button type="button" id="sgL">◀</button><button type="button" id="sgJ">⬆️</button><button type="button" id="sgR">▶</button>';const hold=(id,k)=>{const b=controls.querySelector(id);b.onpointerdown=e=>{e.preventDefault();state[k]=true};['pointerup','pointercancel','pointerleave'].forEach(n=>b.addEventListener(n,()=>state[k]=false))};hold('#sgL','left');hold('#sgR','right');controls.querySelector('#sgJ').onclick=()=>{if(state.p.on){state.p.vy=-12;state.p.on=false}};runLoop()
}
function runLoop(){if(mode!=='run'||over)return;const p=state.p;p.vy+=.6;p.x+=(state.right?4:0)-(state.left?4:0);p.x=Math.max(0,p.x);p.y+=p.vy;if(p.y+p.h>=370){p.y=370-p.h;p.vy=0;p.on=true}for(const it of state.items)if(!it.taken&&Math.abs(p.x-it.x)<35&&Math.abs(p.y-it.y)<50){it.taken=true;score+=10}for(const o of state.obs)if(Math.abs(p.x-o.x)<35&&p.y+42>o.y) return finish('✂️ Oops!');if(p.x>state.items[state.items.length-1].x+150)return finish('🏆 Tailor Champion!');drawBase();ctx.fillStyle='#fff0bd';ctx.fillRect(0,370,720,60);ctx.fillStyle='#c88f5a';for(let x=0;x<720;x+=55)ctx.fillRect(x,370,42,60);for(const it of state.items)if(!it.taken){ctx.fillStyle='#e6b63e';ctx.beginPath();ctx.arc(it.x,220,16,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='12px sans-serif';ctx.fillText('B',it.x-4,224)}for(const o of state.obs){ctx.font='30px sans-serif';ctx.fillText(o.t,o.x,o.y+28)}ctx.fillStyle='#5144bd';ctx.fillRect(p.x,p.y,p.w,p.h);ctx.fillStyle='#f0c5a5';ctx.beginPath();ctx.arc(p.x+17,p.y-8,14,0,Math.PI*2);ctx.fill();ctx.fillStyle='#222';ctx.fillRect(p.x+5,p.y-20,25,7);ctx.fillStyle='#222';ctx.font='bold 17px sans-serif';ctx.fillText('Score: '+score,18,28);raf=requestAnimationFrame(runLoop)}
function startArrow(){
 state.q=0;state.good=0;state.time=Date.now();state.dir=['⬆️','➡️','⬇️','⬅️'];msg.textContent='Jo arrow dikhe, wahi button jaldi tap karo.';controls.innerHTML=state.dir.map((d,i)=>'<button type="button" data-d="'+i+'">'+d+'</button>').join('');controls.querySelectorAll('button').forEach(b=>b.onclick=()=>arrowTap(Number(b.dataset.d)));arrowRound()
}
function arrowRound(){if(mode!=='arrow'||over)return;state.need=Math.floor(Math.random()*4);drawBase();ctx.fillStyle='#5144bd';ctx.font='bold 110px sans-serif';ctx.textAlign='center';ctx.fillText(state.dir[state.need],360,240);ctx.textAlign='left';ctx.fillStyle='#222';ctx.font='bold 18px sans-serif';ctx.fillText('Round '+(state.q+1)+' / 20',18,30);hud()}
function arrowTap(n){if(mode!=='arrow'||over)return;if(n===state.need){score+=10;state.good++;state.q++;if(state.q>=20)return finish('🏆 Needle Master!');arrowRound()}else finish('❌ Wrong Direction')}
modal.querySelector('#sgClose').onclick=()=>{stop();modal.classList.remove('on');mode='';document.querySelectorAll('.sg-overlay').forEach(x=>x.remove())};
root.querySelectorAll('[data-game]').forEach(b=>b.addEventListener('click',()=>openGame(b.dataset.game)));
function add(){const host=document.querySelector('.wrap')||document.querySelector('.app');if(!host)return false;if(document.querySelector('.sg-zone'))return true;host.appendChild(root);return true}
function boot(){if(!add())setTimeout(boot,300)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();