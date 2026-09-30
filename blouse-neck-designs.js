(()=>{
  const catalogueImage='https://raw.githubusercontent.com/vaghmaresantosh09-tech/silai-guru/main/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2004_00_59%20PM.png';
  window.sgBlouseDesignCatalog=[{
    id:'blouse_catalogue_original',
    type:'Blouse',
    name:'Blouse Neck Designs Catalogue',
    desc:'Original Blouse Neck Designs catalogue',
    index:0,
    image:catalogueImage,
    svg:'',
    original:true
  }];

  window.sgOpenBlouseNeck=function(){
    const modal=document.getElementById('modal');
    const title=document.getElementById('mt');
    const body=document.getElementById('mb');
    if(!modal||!title||!body)return;
    title.textContent='👚 Blouse Neck Designs';
    body.innerHTML=`<div class="design-back" style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <button type="button" class="secondary" id="sgBlouseBack">← Back</button>
      <b>Blouse Neck Designs</b>
    </div>
    <div class="card" style="padding:8px;text-align:center">
      <img src="${catalogueImage}" alt="Blouse Neck Designs Catalogue" style="display:block;width:100%;height:auto;max-height:75vh;object-fit:contain;border-radius:14px;background:#fff">
    </div>`;
    modal.classList.add('modal','show');
    const back=document.getElementById('sgBlouseBack');
    if(back)back.onclick=function(){
      modal.classList.remove('show');
      if(typeof window.openGarmentLibrary==='function'){
        setTimeout(function(){try{window.openGarmentLibrary();}catch(e){}},0);
      }
    };
  };
})();
