(()=>{
  const necks=[
    ['Round Neck','Simple round neckline'],['V Neck','Classic V neckline'],['Deep V Neck','Deep V neckline'],['U Neck','Soft U neckline'],['Deep U Neck','Deep U neckline'],['Square Neck','Clean square neckline'],['Boat Neck','Wide boat neckline'],['Sweetheart Neck','Sweetheart neckline'],['Keyhole Neck','Keyhole opening'],['High Neck','High closed neckline'],['Collar Neck','Classic collar neckline'],['Peter Pan Collar','Rounded collar style'],['Mandarin Collar','Standing collar'],['Halter Neck','Halter style'],['Halter V Neck','Halter V neckline'],['Off Shoulder','Off-shoulder neckline'],['One Shoulder','One-shoulder style'],['Asymmetric Neck','Asymmetric neckline'],['Bateau Neck','Elegant bateau shape'],['Scoop Neck','Wide scoop neckline'],['Jewel Neck','High round jewel neck'],['Queen Anne','Queen Anne shape'],['Illusion Neck','Illusion neckline'],['Notch Neck','Notch neckline'],['Cowl Neck','Soft cowl neckline'],['Dori Neck','Dori tie neckline'],['Potli Neck','Potli button neckline'],['Angrakha Neck','Angrakha overlap'],['Cutwork Neck','Cutwork neckline'],['Embroidered Neck','Embroidered neckline'],['Pipe Neck','Piping detail neckline'],['Beaded Neck','Beaded neckline'],['Scallop Neck','Scalloped edge neckline'],['Petal Neck','Petal neckline'],['V-Notch Neck','V notch neckline'],['Front Open Neck','Front-open neckline'],['Back Deep Neck','Deep back neckline'],['Back Keyhole','Back keyhole neckline'],['Back U Neck','Back U neckline'],['Back V Neck','Back V neckline']
  ];
  const esc=s=>String(s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\':'&#92;'}[m]));
  function neckPath(i){
    const p=[
      'M45 38 Q60 55 75 38','M45 38 L60 58 L75 38','M45 38 L60 68 L75 38','M45 38 Q60 63 75 38','M45 38 Q60 76 75 38','M45 38 L45 57 L75 57 L75 38','M42 38 Q60 49 78 38','M45 38 Q52 56 60 51 Q68 56 75 38','M60 38 L60 53 Q67 57 60 63 Q53 57 60 53','M47 38 L47 55 L73 55 L73 38','M43 38 L52 49 L60 42 L68 49 L77 38','M42 38 Q60 53 78 38 L72 48 Q60 59 48 48 Z','M45 38 L75 38 L69 52 L51 52 Z','M48 38 Q60 50 72 38 L67 56 L53 56 Z','M45 38 L60 61 L75 38','M43 38 L50 54 L70 54 L77 38','M45 38 L60 52 L75 38 L60 62 Z','M46 38 L74 56','M42 38 Q60 48 78 38','M44 38 Q60 58 76 38','M48 38 Q60 49 72 38 Q60 54 48 38','M45 38 Q60 48 75 38 L70 54 L50 54 Z','M46 38 Q60 53 74 38 L70 55 Q60 60 50 55 Z','M45 38 L54 47 L60 42 L66 47 L75 38','M45 38 Q60 57 75 38 Q70 62 60 62 Q50 62 45 38','M60 38 L60 56 M53 50 Q60 57 67 50','M53 38 Q60 48 67 38 L67 56 Q60 63 53 56 Z','M46 38 L60 57 L74 38','M47 38 L73 38 M51 44 L69 44 M54 50 L66 50','M45 38 Q60 50 75 38 M48 44 Q60 56 72 44','M47 38 Q60 54 73 38','M45 38 L75 38 M48 44 L72 44 M51 50 L69 50','M45 38 Q60 54 75 38 M49 43 Q60 49 71 43','M48 38 Q60 48 72 38 L69 51 Q60 58 51 51 Z','M45 38 L60 56 L75 38 M52 43 L68 43','M45 38 L60 58 L75 38 M60 58 L60 66','M45 38 L75 38 L75 52','M45 38 Q60 63 75 38 M52 50 Q60 57 68 50','M45 38 L60 57 L75 38 M53 48 Q60 55 67 48','M45 38 Q60 56 75 38 M55 48 Q60 53 65 48'
    ];
    return p[i%p.length];
  }
  function art(name,i){
    const colors=['#e88ca8','#6d9fe8','#d7a74e','#69b5a4','#9a82d7','#e7805b','#647c9b','#d56f91'];
    const c=colors[i%colors.length],dark='#3d3854',light='#fffdf9',gold='#d6a53d';
    const back=(i>=36)?'<path d="M38 36 L82 36 L76 76 L44 76 Z" fill="#f6e8ee" stroke="'+dark+'" stroke-width="2" opacity=".9"/>':'<path d="M30 34 L90 34 L101 52 L88 61 L80 55 L80 96 L40 96 L40 55 L32 61 L19 52 Z" fill="'+c+'" stroke="'+dark+'" stroke-width="2.5"/>';
    const collar=(i===10||i===11||i===12)?'<path d="M42 37 L50 49 L60 41 L70 49 L78 37" fill="none" stroke="'+gold+'" stroke-width="4"/>':'';
    const detail=(i%5===0)?'<circle cx="55" cy="70" r="2.5" fill="'+gold+'"/><circle cx="60" cy="74" r="2.5" fill="'+gold+'"/><circle cx="65" cy="70" r="2.5" fill="'+gold+'"/>':(i%5===1)?'<path d="M42 82 Q60 90 78 82" fill="none" stroke="'+light+'" stroke-width="3"/>':(i%5===2)?'<path d="M44 65 L76 65 M46 71 L74 71" stroke="'+gold+'" stroke-width="2"/>':(i%5===3)?'<path d="M45 79 L75 79" stroke="'+light+'" stroke-width="3"/>':'<path d="M49 84 Q60 90 71 84" fill="none" stroke="'+gold+'" stroke-width="2"/>';
    return '<svg viewBox="0 0 120 120" role="img" aria-label="'+esc(name)+'"><rect x="5" y="5" width="110" height="110" rx="18" fill="#faf9ff"/>'+back+'<path d="'+neckPath(i)+'" fill="none" stroke="'+gold+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'+collar+detail+'</svg>';
  }
  const css=`<style id="sg-blouse-neck-style">
  .sg-neck-overlay{position:fixed;inset:0;background:#0007;z-index:9999;display:flex;align-items:flex-end}
  .sg-neck-sheet{background:#fff;width:100%;max-width:760px;margin:auto;border-radius:24px 24px 0 0;max-height:94vh;overflow:auto;padding:18px;box-shadow:0 -10px 35px #0003}
  .sg-neck-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px}.sg-neck-head h2{margin:0;font-size:23px}.sg-neck-close{background:#eee;padding:10px 14px;font-size:22px}
  .sg-neck-note{background:#f8f7ff;border:1px solid #ddd7ff;border-radius:14px;padding:11px;margin:10px 0;color:#555;font-size:12px;text-align:center}
  .sg-neck-tools{display:flex;gap:8px;margin:10px 0}.sg-neck-search{flex:1}.sg-neck-count{color:#5b4bdb;font-weight:800;font-size:12px;align-self:center;white-space:nowrap}
  .sg-neck-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.sg-neck-card{border:1px solid #e5e6ef;border-radius:16px;background:#fff;overflow:hidden;box-shadow:0 3px 12px #2221}.sg-neck-art{height:155px;background:#faf9ff;display:flex;align-items:center;justify-content:center}.sg-neck-art svg{width:142px;height:142px}.sg-neck-name{font-weight:800;font-size:13px;padding:8px 9px 2px}.sg-neck-desc{font-size:11px;color:#73778c;padding:0 9px 8px}.sg-neck-save{margin:0 8px 9px;width:calc(100% - 16px);background:#efeeff;color:#5144bd;padding:8px;font-size:11px}
  @media(max-width:500px){.sg-neck-grid{grid-template-columns:repeat(2,1fr)}.sg-neck-art{height:135px}.sg-neck-art svg{width:122px;height:122px}}
  </style>`;
  function open(){
    const old=document.getElementById('sgNeckOverlay');if(old)old.remove();
    const wrap=document.createElement('div');wrap.id='sgNeckOverlay';wrap.className='sg-neck-overlay';
    wrap.innerHTML=css+`<div class="sg-neck-sheet"><div class="sg-neck-head"><h2>👚 Blouse Neck Designs</h2><button class="sg-neck-close" type="button">×</button></div><div class="sg-neck-note">Blouse folder ke andar sabhi tarah ke neck designs hain. Ek-ek design dekhkar baad mein Save karke apni library mein rakh sakte hain.</div><div class="sg-neck-tools"><input class="sg-neck-search" placeholder="🔎 Search neck design..."/><span class="sg-neck-count"></span></div><div class="sg-neck-grid"></div></div>`;
    document.body.appendChild(wrap);
    const grid=wrap.querySelector('.sg-neck-grid'),search=wrap.querySelector('.sg-neck-search'),count=wrap.querySelector('.sg-neck-count');
    const render=()=>{const q=search.value.trim().toLowerCase();const list=necks.map((n,i)=>({n,i})).filter(x=>(x.n[0]+' '+x.n[1]).toLowerCase().includes(q));count.textContent=list.length+' designs';grid.innerHTML=list.map(x=>`<div class="sg-neck-card"><div class="sg-neck-art">${art(x.n[0],x.i)}</div><div class="sg-neck-name">${esc(x.n[0])}</div><div class="sg-neck-desc">${esc(x.n[1])}</div><button class="sg-neck-save" type="button">☆ Save</button></div>`).join('');};
    render();search.addEventListener('input',render);wrap.querySelector('.sg-neck-close').onclick=()=>wrap.remove();wrap.addEventListener('click',e=>{if(e.target===wrap)wrap.remove();if(e.target.matches('.sg-neck-save')){e.target.textContent='✓ Saved';e.target.style.background='#e9fff4';e.target.style.color='#16704a';}});
  }
  function shouldOpen(){
    const title=(document.getElementById('mt')?.textContent||'').toLowerCase();
    return title.includes('blouse')&&title.includes('design');
  }
  const mo=new MutationObserver(()=>{if(shouldOpen()&&!document.getElementById('sgNeckOverlay'))setTimeout(open,30);});
  mo.observe(document.body,{subtree:true,childList:true,characterData:true});
  document.addEventListener('click',e=>{
    const card=e.target.closest('.garment-library-card');
    if(card&&/blouse/i.test(card.textContent||'')){e.preventDefault();e.stopImmediatePropagation();open();}
    else if(shouldOpen()&&e.target.closest('#mb')){setTimeout(()=>{if(shouldOpen()&&!document.getElementById('sgNeckOverlay'))open();},20);}
  },true);
})();
