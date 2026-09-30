/* SG_KURTI_NECK_CATALOG_V1 */
(function(){
  const IMG=['./kurti-neck-catalog-1.jpg','./kurti-neck-catalog-2.jpg','./kurti-neck-catalog-3.jpg'];
  const TITLES=['Kurti Front & Back Neck Designs – Collection 1','Kurti Front & Back Neck Designs – Collection 2','Kurti Front & Back Neck Designs – Collection 3'];

  function esc(x){return String(x||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}

  function showKurtiCatalog(){
    const modal=document.getElementById('modal'), title=document.getElementById('mt'), body=document.getElementById('mb');
    if(!modal||!title||!body)return;
    title.textContent='👗 Kurti Neck Designs';
    body.innerHTML=
      '<button class="secondary" id="sgkBack" style="margin-bottom:10px">← Garments</button>'+
      '<div class="sgk-note"><b>Kurti Front & Back Neck Collection</b><br>Yahan aapke uploaded catalogue images directly app ke Kurti section me available hain.</div>'+
      '<div class="sgk-grid">'+
      IMG.map((src,i)=>'<div class="sgk-card"><div class="sgk-photo"><img src="'+src+'" alt="'+esc(TITLES[i])+'" loading="lazy"></div><div class="sgk-name">'+esc(TITLES[i])+'</div><button class="primary sgk-show" data-i="'+i+'">👁 Full Catalogue</button></div>').join('')+
      '</div>';
    modal.classList.add('show');
    document.getElementById('sgkBack').onclick=function(){showGarments();};
    body.querySelectorAll('.sgk-show').forEach(function(btn){
      btn.onclick=function(){
        const i=+btn.dataset.i;
        body.innerHTML='<button class="secondary" id="sgkPreviewBack" style="margin-bottom:10px">← Kurti Neck Designs</button><h2>'+esc(TITLES[i])+'</h2><div class="sgk-preview"><img src="'+IMG[i]+'" alt="'+esc(TITLES[i])+'"></div>';
        document.getElementById('sgkPreviewBack').onclick=showKurtiCatalog;
      };
    });
  }

  function showGarments(){
    const modal=document.getElementById('modal'), title=document.getElementById('mt'), body=document.getElementById('mb');
    if(!modal||!title||!body)return;
    const types=['Kurti','Blouse','Salwar Suit','Lehenga','Sherwani','Gown','Dress','Kameez','Saree Blouse','Choli','Shirt','Pant','Salwar','Suit','Blazer','Waistcoat','Pajama','School Uniform','Coat','Other'];
    title.textContent='👗 Garments';
    body.innerHTML=
      '<div class="sgk-note"><b>Garment Section</b><br>Kurti ke andar ab Front & Back Neck Designs ke uploaded catalogues available hain.</div>'+
      '<div class="sgk-garments">'+
      types.map(function(t){
        if(t==='Kurti') return '<button class="sgk-garment kurti" id="sgkKurti"><span class="sgk-gicon">👗</span><b>Kurti</b><small>Neck Design Catalogue</small></button>';
        return '<div class="sgk-garment"><span class="sgk-gicon">👗</span><b>'+esc(t)+'</b><small>Garment Type</small></div>';
      }).join('')+
      '</div>';
    modal.classList.add('show');
    document.getElementById('sgkKurti').onclick=showKurtiCatalog;
  }

  const style=document.createElement('style');
  style.textContent='.sgk-grid{display:grid;grid-template-columns:1fr;gap:12px}.sgk-card{background:#fff;border:1px solid #e5e6ef;border-radius:16px;overflow:hidden;padding:8px}.sgk-photo{width:100%;background:#faf9ff;border-radius:12px;overflow:hidden}.sgk-photo img{width:100%;display:block}.sgk-name{font-size:13px;font-weight:800;padding:8px 3px}.sgk-card button{width:100%;margin-top:4px}.sgk-preview{max-width:520px;margin:10px auto;background:#faf9ff;border:1px solid #e5e6ef;border-radius:16px;overflow:hidden}.sgk-preview img{width:100%;display:block}.sgk-note{background:#f8f7ff;border:1px solid #ddd7ff;border-radius:14px;padding:11px;margin:8px 0 12px;font-size:12px;color:#555}.sgk-garments{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.sgk-garment{border:1px solid #e5e6ef;border-radius:15px;background:#fff;padding:14px 8px;text-align:center;min-height:105px}.sgk-garment.kurti{cursor:pointer;border:2px solid #5b4bdb;background:#f8f7ff}.sgk-gicon{display:block;font-size:34px;margin-bottom:5px}.sgk-garment b{display:block;font-size:13px}.sgk-garment small{display:block;color:#73778c;font-size:10px;margin-top:4px}@media(max-width:500px){.sgk-garments{grid-template-columns:repeat(2,1fr)}}';
  document.head.appendChild(style);

  function patch(){
    if(typeof window.openM!=='function' || window.__sgKurtiNeckPatched)return;
    const old=window.openM;
    window.openM=function(t){
      if(t==='garments'){showGarments();return;}
      return old.apply(this,arguments);
    };
    window.__sgKurtiNeckPatched=true;
  }
  patch();
  setTimeout(patch,300);
  setTimeout(patch,1000);
})();
