/* SILAI GURU — guided order review step v1 */
(function(){
'use strict';
function enhance(){
 const form=document.getElementById('orderForm');
 const head=form&&form.querySelector('.sg-wizard-head');
 if(!form||!head||form.dataset.sgReviewReady==='1') return false;
 const dots=[...head.querySelectorAll('.sg-wizard-dot')];
 if(dots.length<3) return false;
 form.dataset.sgReviewReady='1';
 const groups=[...form.querySelectorAll(':scope > .form')];
 const customerGroup=groups[0],detailsGroup=groups[groups.length-1];
 const title=[...form.querySelectorAll('.section-title')].find(x=>/Garments/i.test(x.textContent));
 const banner=[...form.querySelectorAll('.banner')].find(x=>/Measurement names/i.test(x.textContent));
 const wrap=form.querySelector('#garmentsWrap'),submit=form.querySelector('button[type="submit"]');
 const pick=form.querySelector('#sgSavedCustomer')?.closest('.sg-wizard-customer');
 const note=[...form.querySelectorAll('.sg-wizard-note')][0];
 const oldActions=form.querySelector('.sg-wizard-actions');
 if(!customerGroup||!detailsGroup||!wrap||!submit||!oldActions) return false;
 const back=oldActions.querySelector('button:first-child');
 const oldNext=oldActions.querySelector('button:last-child');
 if(!back||!oldNext)return false;
 const next=oldNext.cloneNode(true); oldNext.replaceWith(next);
 dots[2].textContent='3 · Order';
 const d4=document.createElement('div');d4.className='sg-wizard-dot';d4.textContent='4 · Review';head.querySelector('.sg-wizard-track').appendChild(d4);
 const review=document.createElement('div');review.className='sg-wizard-customer';review.id='sgGuidedReview';review.style.display='none';form.insertBefore(review,oldActions);
 let step=1;
 const val=id=>String(form.querySelector('#'+id)?.value||'').trim();
 const esc=v=>String(v||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 function buildReview(){
  const cards=[...form.querySelectorAll('[data-selected-type]')];
  const garments=cards.map(card=>{
   const type=card.dataset.selectedType||'Garment';
   const design=card.querySelector('.selected-design')?.textContent?.trim()||'Design select nahi kiya';
   const ms=[...card.querySelectorAll('.g-measure')].map(i=>(i.dataset.name||'Measurement')+': '+(i.value.trim()||'—')).join(' · ');
   return '<div style="padding:10px 0;border-bottom:1px solid var(--line,#e5e6ef)"><b>👗 '+esc(type)+'</b><div style="font-size:12px;margin-top:4px">🎨 '+esc(design)+'</div><div style="font-size:11px;color:var(--muted,#73778c);margin-top:4px">📏 '+esc(ms||'Measurement not entered')+'</div></div>';
  }).join('');
  const total=Number(val('ct')||0), advance=Number(val('ca')||0), balance=Math.max(0,total-advance);
  review.innerHTML='<b style="font-size:16px">🔍 Order Review</b><div style="margin-top:10px;line-height:1.8">👤 <b>'+esc(val('cn'))+'</b><br>📞 '+esc(val('cm'))+'<br>🗓 Work Date: '+esc(val('cwd')||'—')+'<br>🚚 Delivery: '+esc(val('cd')||'—')+'<br>💰 Total: ₹'+total.toLocaleString('en-IN')+'<br>💵 Advance: ₹'+advance.toLocaleString('en-IN')+'<br>🧾 Balance: ₹'+balance.toLocaleString('en-IN')+'</div><div style="margin-top:12px"><b>Garment & Design</b>'+ (garments||'<div class="muted" style="margin-top:6px">Garment select nahi hua.</div>')+'</div><div style="margin-top:10px;font-size:12px;color:var(--muted,#73778c)">📝 Notes: '+esc(val('co')||'—')+'</div><div style="margin-top:12px;padding:10px;border-radius:10px;background:#f1fff8;border:1px solid #b9ead1;font-size:12px">Sab details sahi hain to neeche <b>Save Order</b> dabaiye.</div>';
 }
 function show(n){
  step=n;
  if(pick)pick.style.display=n===1?'block':'none';
  customerGroup.style.display=n===1?'':'none';
  if(title)title.style.display=n===2?'':'none';
  if(banner)banner.style.display=n===2?'':'none';
  if(note)note.style.display=n===2?'':'none';
  wrap.style.display=n===2?'':'none';
  detailsGroup.style.display=n===3?'':'none';
  review.style.display=n===4?'block':'none';
  submit.style.display=n===4?'':'none';
  oldActions.style.display='flex';
  back.style.display=n===1?'none':'';
  next.textContent=n===4?'✓ Save Order':(n===3?'Review Order →':'Next →');
  head.querySelectorAll('.sg-wizard-dot').forEach((d,i)=>d.classList.toggle('active',i===n-1));
  if(n===4)buildReview();
  form.scrollIntoView({behavior:'smooth',block:'start'});
 }
 back.onclick=function(){show(Math.max(1,step-1));};
 next.onclick=function(){
  if(step===1){
   const name=form.querySelector('#cn'),mobile=form.querySelector('#cm');
   if(!name?.value.trim()||!mobile?.value.trim()){alert('Customer Name aur Mobile zaroor bhariye.');return;}
   show(2);return;
  }
  if(step===2){
   if(!form.querySelector('[data-selected-type]')){alert('Pehle kam se kam ek garment select kijiye.');return;}
   show(3);return;
  }
  if(step===3){
   const delivery=form.querySelector('#cd');
   if(delivery && !delivery.value){delivery.reportValidity();return;}
   show(4);return;
  }
  if(typeof form.requestSubmit==='function')form.requestSubmit();else submit.click();
 };
 show(1);
 return true;
}
function watch(){
 if(enhance()) return;
 const mo=new MutationObserver(()=>{if(enhance())mo.disconnect();});
 mo.observe(document.body,{childList:true,subtree:true});
 setTimeout(()=>mo.disconnect(),15000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch,{once:true});else watch();
})();
