(()=>{
  const COLORS={Kurti:'#6f58c9',Blouse:'#d85b78','Salwar Suit':'#4f86d9',Kameez:'#c9823f','Saree Blouse':'#d85b78',Lehenga:'#d85b78',Gown:'#8b6bd8',Dress:'#e58b55',Shirt:'#4f86d9',Pant:'#3f78c7',Palazzo:'#7a62c7',Choli:'#c9823f',Sherwani:'#3f78c7',Waistcoat:'#c9823f',Pajama:'#4f86d9',Suit:'#6f58c9',Blazer:'#4f86d9',Uniform:'#4f86d9',Plazo:'#7a62c7',Other:'#6f58c9'};
  const key=s=>{s=(s||'').trim(); const hit=Object.keys(COLORS).find(k=>s.toLowerCase()===k.toLowerCase()); return hit||s};
  function svg(name){const c=COLORS[key(name)]||'#6f58c9'; const n=key(name); let body='';
    if(['Pant','Pajama','Plazo','Palazzo'].includes(n)) body=`<path d="M28 10h44l-4 78H48L40 54 32 88H12l-4-78z" fill="${c}" opacity=".18" stroke="${c}" stroke-width="3"/><path d="M40 10v44" stroke="${c}" stroke-width="3"/>`;
    else if(['Lehenga','Gown','Dress'].includes(n)) body=`<path d="M35 10h30l3 20-22 6 28 46H6l28-46-22-6z" fill="${c}" opacity=".18" stroke="${c}" stroke-width="3"/>`;
    else body=`<path d="M29 13l11 7 11-7 20 12 10 20-14 7-8-13v41H21V39l-8 13-14-7 10-20z" fill="${c}" opacity=".18" stroke="${c}" stroke-width="3"/><path d="M29 13l11 7 11-7M40 20v53M27 55h26" fill="none" stroke="${c}" stroke-width="3"/>`;
    return `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" aria-label="${n}">${body}</svg>`;
  }
  function labelFrom(el){return key(el?.dataset?.garment||el?.getAttribute('data-garment')||el?.querySelector('b')?.textContent||el?.querySelector('.garment-title')?.textContent||el?.textContent||'');}
  function paint(){
    document.querySelectorAll('.garment-library-card .libpic').forEach(el=>{const n=labelFrom(el.closest('.garment-library-card')); if(n&&el.dataset.sgPainted!==n){el.innerHTML=svg(n);el.dataset.sgPainted=n;}});
    document.querySelectorAll('.photo-g-option .gpic').forEach(el=>{const n=labelFrom(el.closest('.photo-g-option')); if(n&&el.dataset.sgPainted!==n){el.innerHTML=svg(n);el.dataset.sgPainted=n;}});
    document.querySelectorAll('.sg-selected-garment .sg-garment-icon').forEach(el=>{const n=labelFrom(el.closest('.sg-selected-garment')); if(n&&el.dataset.sgPainted!==n){el.innerHTML=svg(n);el.dataset.sgPainted=n;}});
  }
  const obs=new MutationObserver(paint); obs.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',paint); paint();
})();