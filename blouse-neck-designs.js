(()=>{
  const necks=[
    ['Round Neck','◯','Simple round neckline'],['V Neck','▽','Classic V neckline'],['Deep V Neck','▽','Deep V neckline'],['U Neck','∪','Soft U neckline'],['Deep U Neck','∪','Deep U neckline'],['Square Neck','□','Clean square neckline'],['Boat Neck','⌒','Wide boat neckline'],['Sweetheart Neck','♡','Sweetheart neckline'],['Keyhole Neck','◉','Keyhole opening'],['High Neck','▔','High closed neckline'],['Collar Neck','⌄','Collar neckline'],['Peter Pan Collar','⌄','Rounded collar style'],['Mandarin Collar','▔','Standing collar'],['Halter Neck','△','Halter style'],['Halter V Neck','▽','Halter V neckline'],['Off Shoulder','⌒','Off-shoulder neckline'],['One Shoulder','◢','One-shoulder style'],['Asymmetric Neck','╱','Asymmetric neckline'],['Bateau Neck','⌒','Elegant bateau shape'],['Scoop Neck','∪','Wide scoop neckline'],['Jewel Neck','○','High round jewel neck'],['Queen Anne','⌒','Queen Anne shape'],['Illusion Neck','◇','Illusion neckline'],['Notch Neck','∨','Notch neckline'],['Cowl Neck','≈','Soft cowl neckline'],['Dori Neck','◉','Dori tie neckline'],['Potli Neck','●','Potli button neckline'],['Angrakha Neck','╲','Angrakha overlap'],['Cutwork Neck','✣','Cutwork neckline'],['Embroidered Neck','✿','Embroidered neckline'],['Pipe Neck','◎','Piping detail neckline'],['Beaded Neck','✦','Beaded neckline'],['Scallop Neck','⌁','Scalloped edge neckline'],['Petal Neck','❀','Petal neckline'],['V-Notch Neck','∨','V notch neckline'],['Front Open Neck','╫','Front-open neckline'],['Back Deep Neck','⌄','Deep back neckline'],['Back Keyhole','◉','Back keyhole neckline'],['Back U Neck','∪','Back U neckline'],['Back V Neck','▽','Back V neckline']
  ];
  const esc=s=>String(s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\':'&#92;'}[m]));
  const icon=(symbol,i)=>`<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M30 18h60v22c-8 5-15 8-30 8s-22-3-30-8z" fill="#f2efff" stroke="#5b4bdb" stroke-width="4"/><path d="M42 22c2 13 10 21 18 21s16-8 18-21" fill="none" stroke="#d94f83" stroke-width="6" stroke-linecap="round"/><path d="M30 40v58M90 40v58" stroke="#5b4bdb" stroke-width="4"/><path d="M30 98h60" stroke="#8267f5" stroke-width="4"/><text x="60" y="83" text-anchor="middle" font-size="24" font-weight="700" fill="#5b4bdb">${esc(symbol)}</text></svg>`;
  const css=`<style id="sg-blouse-neck-style">
  .sg-neck-overlay{position:fixed;inset:0;background:#0007;z-index:9999;display:flex;align-items:flex-end}
  .sg-neck-sheet{background:#fff;width:100%;max-width:760px;margin:auto;border-radius:24px 24px 0 0;max-height:94vh;overflow:auto;padding:18px;box-shadow:0 -10px 35px #0003}
  .sg-neck-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}.sg-neck-head h2{margin:0;font-size:23px}.sg-neck-close{background:#eee;padding:10px 14px;font-size:22px}
  .sg-neck-note{background:#f8f7ff;border:1px solid #ddd7ff;border-radius:14px;padding:11px;margin:10px 0;color:#555;font-size:12px;text-align:center}
  .sg-neck-tools{display:flex;gap:8px;margin:10px 0}.sg-neck-search{flex:1}.sg-neck-count{color:#5b4bdb;font-weight:800;font-size:12px;align-self:center;white-space:nowrap}
  .sg-neck-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.sg-neck-card{border:1px solid #e5e6ef;border-radius:16px;background:#fff;overflow:hidden;box-shadow:0 3px 12px #2221}.sg-neck-art{height:150px;background:#faf9ff;display:flex;align-items:center;justify-content:center}.sg-neck-art svg{width:135px;height:135px}.sg-neck-name{font-weight:800;font-size:13px;padding:8px 9px 2px}.sg-neck-desc{font-size:11px;color:#73778c;padding:0 9px 8px}.sg-neck-save{margin:0 8px 9px;width:calc(100% - 16px);background:#efeeff;color:#5144bd;padding:8px;font-size:11px}
  @media(max-width:500px){.sg-neck-grid{grid-template-columns:repeat(2,1fr)}.sg-neck-art{height:132px}.sg-neck-art svg{width:118px;height:118px}}
  </style>`;
  function open(){
    if(document.getElementById('sgNeckOverlay')) return;
    const wrap=document.createElement('div');wrap.id='sgNeckOverlay';wrap.className='sg-neck-overlay';
    wrap.innerHTML=css+`<div class="sg-neck-sheet"><div class="sg-neck-head"><h2>👚 Blouse Neck Designs</h2><button class="sg-neck-close" type="button">×</button></div><div class="sg-neck-note">Blouse folder ke andar abhi sirf blouse neck designs rakhe gaye hain. Ek-ek design ko dekhkar baad mein Save karke apni library mein rakh sakte hain.</div><div class="sg-neck-tools"><input class="sg-neck-search" placeholder="🔎 Search neck design..."/><span class="sg-neck-count"></span></div><div class="sg-neck-grid"></div></div>`;
    document.body.appendChild(wrap);
    const grid=wrap.querySelector('.sg-neck-grid'),search=wrap.querySelector('.sg-neck-search'),count=wrap.querySelector('.sg-neck-count');
    const render=()=>{const q=search.value.trim().toLowerCase();const list=necks.filter(n=>(n[0]+' '+n[2]).toLowerCase().includes(q));count.textContent=list.length+' designs';grid.innerHTML=list.map((n,i)=>`<div class="sg-neck-card"><div class="sg-neck-art">${icon(n[1],i)}</div><div class="sg-neck-name">${esc(n[0])}</div><div class="sg-neck-desc">${esc(n[2])}</div><button class="sg-neck-save" type="button" data-name="${esc(n[0])}">☆ Save</button></div>`).join('');};
    render();search.addEventListener('input',render);wrap.querySelector('.sg-neck-close').onclick=()=>wrap.remove();wrap.addEventListener('click',e=>{if(e.target===wrap)wrap.remove();if(e.target.matches('.sg-neck-save')){e.target.textContent='✓ Saved';e.target.style.background='#e9fff4';e.target.style.color='#16704a';}});
  }
  document.addEventListener('click',e=>{
    const card=e.target.closest('.garment-library-card');
    if(!card) return;
    const lib=card.closest('.garment-library');
    if(!lib) return;
    if((card.textContent||'').toLowerCase().includes('blouse')){e.preventDefault();e.stopImmediatePropagation();open();}
  },true);
})();
