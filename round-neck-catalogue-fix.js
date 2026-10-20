/* SILAI GURU — Round Neck Catalogue direct fix v107 */
(function(){
  'use strict';
  const NAMES=['Simple Round Neck','Deep Round Neck','Wide Round Neck','Round Neck with Piping','Embroidered Round Neck','Beaded Round Neck','Scalloped Round Neck','Round Neck with Keyhole','Round Neck with Tie Detail','Round Neck with Contrast Border','Round Neck with Mirror Work','Festive Round Neck'];
  const ID='sgRoundNeckFixModal';
  function esc(s){return String(s||'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));}
  function saved(){try{return JSON.parse(localStorage.getItem('sg_saved_designs')||'[]')}catch(e){return []}}
  function put(a){localStorage.setItem('sg_saved_designs',JSON.stringify(a));}
  function visual(i){return typeof window.designVisual==='function'?window.designVisual('Blouse',i):'<div style="font-size:48px">👚</div>'}
  function open(index){
    let m=document.getElementById(ID); if(m)m.remove();
    m=document.createElement('div');m.id=ID;m.className='modal show';m.style.zIndex='100001';
    m.innerHTML='<div class="sheet" style="max-height:94vh"><button class="close" type="button" id="sgRNClose">✕</button><div style="font-size:19px;font-weight:900;margin-bottom:4px">🎨 Round Neck Catalogue</div><div class="muted">12 designs — design par <b>Save</b> ya <b>Select</b> karein</div><div class="design-grid" id="sgRNGrid" style="margin-top:12px">'+NAMES.map((n,i)=>'<div class="design-card"><div class="design-img">'+visual(i)+'</div><div class="design-name">'+esc(n)+'</div><div class="design-actions"><button type="button" class="primary" data-rn-select="'+i+'">✓ Select</button><button type="button" class="secondary" data-rn-save="'+i+'">💾 Save</button></div></div>').join('')+'</div><div style="margin-top:14px;padding:12px;border:1px solid #ddd8ff;border-radius:15px;background:#f8f7ff"><b>➕ Naya Round Neck Design</b><div class="muted" style="margin:4px 0 9px">Camera, Gallery ya Website se image add karein.</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px"><button type="button" class="secondary" id="sgRNCamera">📷 Camera</button><button type="button" class="secondary" id="sgRNGallery">🖼️ Gallery</button><button type="button" class="secondary" id="sgRNUrl">🌐 Website</button></div><input id="sgRNFile" type="file" accept="image/*" capture="environment" style="display:none"><input id="sgRNUrlInput" type="url" placeholder="Image URL paste karein" style="display:none;margin-top:8px"><button type="button" class="primary" id="sgRNSaveNew" style="display:none">💾 Save New Design</button></div></div>';
    document.body.appendChild(m);
    m.querySelector('#sgRNClose').onclick=()=>m.remove();
    m.addEventListener('click',e=>{if(e.target===m)m.remove()});
    m.querySelectorAll('[data-rn-save]').forEach(b=>b.onclick=()=>saveBuiltin(Number(b.dataset.rnSave)));
    m.querySelectorAll('[data-rn-select]').forEach(b=>b.onclick=()=>selectBuiltin(index,Number(b.dataset.rnSelect)));
    const file=m.querySelector('#sgRNFile'),url=m.querySelector('#sgRNUrlInput'),saveNew=m.querySelector('#sgRNSaveNew');
    m.querySelector('#sgRNCamera').onclick=()=>{file.setAttribute('capture','environment');file.click()};
    m.querySelector('#sgRNGallery').onclick=()=>{file.removeAttribute('capture');file.click()};
    m.querySelector('#sgRNUrl').onclick=()=>{url.style.display=url.style.display==='none'?'block':'none';saveNew.style.display=url.style.display==='block'?'block':'none'};
    file.onchange=()=>{if(file.files&&file.files[0]){saveNew.dataset.image='';const r=new FileReader();r.onload=()=>{saveNew.dataset.image=r.result;saveNew.style.display='block'};r.readAsDataURL(file.files[0])}};
    saveNew.onclick=()=>saveNewDesign(url.value.trim()||saveNew.dataset.image||'');
  }
  function saveBuiltin(i){
    const id='builtin-blouse-round-neck-'+i,a=saved();
    if(!a.some(x=>x.id===id))a.push({id:id,type:'Blouse',name:'Round Neck - '+NAMES[i],svg:visual(i),index:i,savedAt:Date.now(),source:'Round Neck Catalogue'}); else alert('Ye design pehle se saved hai.');
    put(a); if(typeof window.renderDesignLibrary==='function')window.renderDesignLibrary();
    alert('Design Blouse folder mein save ho gaya.');
  }
  function selectBuiltin(index,i){
    if(index!==undefined && index!==null && window.orderDesignTargets){window.orderDesignTargets[index]={source:'SILAI GURU',name:'Round Neck - '+NAMES[i],url:'',image:''};if(typeof window.backToOrderPicker==='function'){document.getElementById(ID)?.remove();window.backToOrderPicker();return;}}
    saveBuiltin(i);
  }
  function saveNewDesign(src){
    if(!src){alert('Pehle image select karein ya Website se image URL dalein.');return}
    const a=saved();a.push({id:'user-round-neck-'+Date.now(),type:'Blouse',name:'My Round Neck Design '+(a.filter(x=>x.type==='Blouse').length+1),image:src,url:src.indexOf('data:image')===0?'':src,savedAt:Date.now(),source:'Round Neck Catalogue'});put(a);alert('Naya design Blouse folder mein save ho gaya.');
  }
  window.openRoundNeckCatalogueFix=open;
  document.addEventListener('click',function(e){
    const b=e.target.closest('button');if(!b)return;
    if(b.textContent.trim()==='👁 View Catalogue'){
      const card=b.closest('.design-card');
      if(card && /Round Neck Catalogue/i.test(card.textContent)){e.preventDefault();e.stopImmediatePropagation();open(window.orderDesignTargetIndex);}
    }
  },true);
})();
