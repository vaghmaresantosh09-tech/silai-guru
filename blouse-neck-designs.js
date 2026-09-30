(()=>{
  const catalogueImage='https://raw.githubusercontent.com/vaghmaresantosh09-tech/silai-guru/main/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2004_00_59%20PM.png';
  const esc=s=>String(s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\':'&#92;'}[m]));
  function open(){
    const old=document.getElementById('sgNeckOverlay');if(old)old.remove();
    const wrap=document.createElement('div');wrap.id='sgNeckOverlay';wrap.className='sg-neck-overlay';
    wrap.innerHTML=`<style>
      .sg-neck-overlay{position:fixed;inset:0;background:#0009;z-index:99999;display:flex;align-items:flex-end}
      .sg-neck-sheet{background:#fff;width:100%;max-width:760px;margin:auto;border-radius:26px 26px 0 0;max-height:96vh;overflow:auto;padding:16px;box-shadow:0 -10px 40px #0005}
      .sg-neck-head{display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#fff;z-index:2;padding-bottom:8px}
      .sg-neck-head h2{margin:0;color:#4f35a8;font-size:21px}
      .sg-neck-close{border:0;border-radius:12px;background:#eee;font-size:22px;padding:7px 13px}
      .sg-neck-banner{background:linear-gradient(135deg,#5b35a8,#c44791);color:#fff;border-radius:20px;padding:17px;margin:10px 0;text-align:center}
      .sg-neck-banner b{display:block;font-size:23px}.sg-neck-banner small{display:block;margin-top:5px}
      .sg-catalogue{border:1px solid #e4e0ed;border-radius:18px;background:#fff;overflow:hidden;box-shadow:0 5px 18px #33225518}
      .sg-catalogue img{width:100%;height:auto;display:block;background:#faf7ff}
      .sg-caption{text-align:center;font-weight:900;padding:12px;color:#302b3c}
      .sg-neck-credit{font-size:10px;color:#777;text-align:center;padding:12px 4px}
    </style>
    <div class="sg-neck-sheet">
      <div class="sg-neck-head"><h2>👚 Blouse Neck Designs</h2><button class="sg-neck-close" type="button">×</button></div>
      <div class="sg-neck-banner"><b>Latest & Traditional Collection</b><small>Har Design • Har Style Aapke Liye</small></div>
      <div class="sg-catalogue"><img src="${catalogueImage}" alt="Silai Guru Blouse Neck Designs Catalogue" loading="eager"><div class="sg-caption">Blouse Neck Designs Catalogue</div></div>
      <div class="sg-neck-credit">Silai Guru • Seekhe Silai Karo Aage Badho</div>
    </div>`;
    document.body.appendChild(wrap);
    wrap.querySelector('.sg-neck-close').onclick=()=>wrap.remove();
    wrap.addEventListener('click',e=>{if(e.target===wrap)wrap.remove()});
  }
  window.sgOpenBlouseNeck=open;
})();