(function(){
  'use strict';

  const PROFILE_KEY='sg_profile';
  const INDIA_STATES={
    "Andhra Pradesh":["Visakhapatnam","Vijayawada","Guntur","Tirupati","Nellore","Kurnool","Rajahmundry"],
    "Arunachal Pradesh":["Itanagar","Naharlagun","Pasighat","Tawang"],
    "Assam":["Guwahati","Dibrugarh","Silchar","Jorhat","Tezpur"],
    "Bihar":["Patna","Gaya","Muzaffarpur","Bhagalpur","Darbhanga","Purnia"],
    "Chhattisgarh":["Raipur","Bhilai","Bilaspur","Korba","Durg","Jagdalpur"],
    "Goa":["Panaji","Margao","Vasco da Gama","Mapusa"],
    "Gujarat":["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Gandhinagar","Anand","Bharuch","Vapi","Navsari","Valsad"],
    "Haryana":["Gurugram","Faridabad","Panipat","Ambala","Hisar","Rohtak","Karnal"],
    "Himachal Pradesh":["Shimla","Dharamshala","Mandi","Solan","Kullu"],
    "Jharkhand":["Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar","Hazaribagh"],
    "Karnataka":["Bengaluru","Mysuru","Mangaluru","Hubballi","Belagavi","Dharwad","Shivamogga","Tumakuru"],
    "Kerala":["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Kannur","Alappuzha"],
    "Madhya Pradesh":["Bhopal","Indore","Jabalpur","Gwalior","Ujjain","Sagar","Rewa"],
    "Maharashtra":["Mumbai","Pune","Nagpur","Nashik","Thane","Aurangabad","Navi Mumbai","Kolhapur","Solapur","Amravati","Akola","Nanded"],
    "Manipur":["Imphal","Thoubal","Bishnupur"],
    "Meghalaya":["Shillong","Tura","Jowai"],
    "Mizoram":["Aizawl","Lunglei","Champhai"],
    "Nagaland":["Kohima","Dimapur","Mokokchung"],
    "Odisha":["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri","Balasore"],
    "Punjab":["Amritsar","Ludhiana","Jalandhar","Patiala","Bathinda","Mohali","Pathankot"],
    "Rajasthan":["Jaipur","Jodhpur","Udaipur","Kota","Ajmer","Bikaner","Alwar","Bharatpur"],
    "Sikkim":["Gangtok","Namchi","Gyalshing"],
    "Tamil Nadu":["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Erode","Vellore"],
    "Telangana":["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam"],
    "Tripura":["Agartala","Udaipur","Dharmanagar"],
    "Uttar Pradesh":["Lucknow","Kanpur","Ghaziabad","Agra","Varanasi","Prayagraj","Meerut","Noida","Bareilly","Aligarh","Moradabad","Gorakhpur"],
    "Uttarakhand":["Dehradun","Haridwar","Haldwani","Roorkee","Nainital"],
    "West Bengal":["Kolkata","Howrah","Durgapur","Siliguri","Asansol","Darjeeling"],
    "Delhi":["New Delhi","Delhi"],
    "Jammu and Kashmir":["Srinagar","Jammu","Anantnag","Baramulla"],
    "Ladakh":["Leh","Kargil"],
    "Puducherry":["Puducherry","Karaikal"],
    "Chandigarh":["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu":["Daman","Diu","Silvassa"],
    "Lakshadweep":["Kavaratti"],
    "Andaman and Nicobar Islands":["Port Blair"]
  };

  function norm(s){return String(s||'').trim().replace(/\s+/g,' ').toLowerCase();}
  function esc(s){return String(s||'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));}
  function allCities(state){const key=Object.keys(INDIA_STATES).find(x=>norm(x)===norm(state));return key?INDIA_STATES[key]:[];}
  function resolveState(q){const n=norm(q);return Object.keys(INDIA_STATES).find(s=>norm(s)===n)||Object.keys(INDIA_STATES).find(s=>n.length>=2&&norm(s).startsWith(n));}
  function makeList(id){let d=document.getElementById(id);if(!d){d=document.createElement('datalist');d.id=id;document.body.appendChild(d)}return d}
  function fillList(d,items){d.innerHTML=[...new Set(items)].map(x=>'<option value="'+esc(x)+'"></option>').join('')}
  function hint(input,msg,ok){if(!input)return;input.setCustomValidity(msg||'');input.title=msg||'';input.style.borderColor=ok?'#36a269':(msg?'#d33':'')}

  function setupProfile(){
    const saveBtn=document.getElementById('profileSaveBtn');
    const pn=document.getElementById('pn'),pm=document.getElementById('pm'),ps=document.getElementById('ps'),pe=document.getElementById('pe'),pa=document.getElementById('pa'),pst=document.getElementById('pst'),pc=document.getElementById('pc'),pp=document.getElementById('pp');
    if(!saveBtn||!pn||!pm||!ps||!pe||!pa||!pst||!pc||!pp)return;
    pn.placeholder='Mr / Mrs / Miss + Full Name';pm.placeholder='+91 9876543210';ps.placeholder='Shop Owner / Shop Name';pe.placeholder='name@gmail.com';pa.placeholder='Full shop address';pst.placeholder='Guj / Maha / Raj...';pc.placeholder='Start typing city...';pp.placeholder='6-digit pincode';
    const stateList=makeList('sgStateList'),cityList=makeList('sgCityList'),pinList=makeList('sgPinList');pst.setAttribute('list','sgStateList');pc.setAttribute('list','sgCityList');pp.setAttribute('list','sgPinList');
    function updateStates(){const q=norm(pst.value);fillList(stateList,Object.keys(INDIA_STATES).filter(s=>!q||norm(s).startsWith(q)).slice(0,12))}
    function updateCities(){const st=resolveState(pst.value),cities=st?allCities(st):[];fillList(cityList,cities.filter(c=>norm(c).startsWith(norm(pc.value))).slice(0,15));if(st&&norm(pst.value)!==norm(st))pst.value=st}
    function apiPostOffice(name){return fetch('https://api.postalpincode.in/postoffice/'+encodeURIComponent(name),{cache:'no-store'}).then(r=>r.json()).then(a=>Array.isArray(a)&&a[0]&&a[0].Status==='Success'?a[0].PostOffice||[]:[])}
    function apiPin(pin){return fetch('https://api.postalpincode.in/pincode/'+encodeURIComponent(pin),{cache:'no-store'}).then(r=>r.json()).then(a=>Array.isArray(a)&&a[0]&&a[0].Status==='Success'?a[0].PostOffice||[]:[])}
    let cityTimer=0;
    pst.addEventListener('input',()=>{updateStates();pc.value='';pp.value='';fillList(pinList,[])})
    pst.addEventListener('change',()=>{const st=resolveState(pst.value);if(st)pst.value=st;updateCities()})
    pc.addEventListener('input',()=>{updateCities();clearTimeout(cityTimer);const q=pc.value.trim();if(q.length<3)return;cityTimer=setTimeout(async()=>{try{const rows=await apiPostOffice(q),st=resolveState(pst.value),names=rows.filter(x=>!st||norm(x.State)===norm(st)).map(x=>x.District||x.Name).filter(Boolean);if(names.length)fillList(cityList,[...names,...allCities(st||'')].slice(0,20))}catch(_){ }},250)})
    pc.addEventListener('change',async()=>{const st=resolveState(pst.value);if(st)pst.value=st;try{const rows=await apiPostOffice(pc.value.trim()),filtered=rows.filter(x=>!st||norm(x.State)===norm(st));if(!filtered.length){hint(pc,'City is not in the selected State.',false);return}fillList(pinList,filtered.map(x=>x.Pincode).filter(Boolean));hint(pc,'',true)}catch(_){ }})
    pp.addEventListener('input',()=>{pp.value=pp.value.replace(/\D/g,'').slice(0,6)})
    pp.addEventListener('change',async()=>{const pin=pp.value.trim(),st=resolveState(pst.value);if(!/^\d{6}$/.test(pin)){hint(pp,'Pincode must be exactly 6 digits.',false);return}try{const rows=await apiPin(pin),filtered=rows.filter(x=>!st||norm(x.State)===norm(st)),city=norm(pc.value),cityOk=filtered.some(x=>norm(x.District)===city||norm(x.Name)===city||norm(x.Block)===city||norm(x.Region)===city);if(!filtered.length||!cityOk){hint(pp,'This pincode does not match the selected State/City.',false);return}hint(pp,'',true)}catch(_){hint(pp,'Pincode verification needs an internet connection.',false)}})
    pm.addEventListener('input',()=>{let raw=pm.value.replace(/\D/g,'');if(raw.startsWith('91'))raw=raw.slice(2);pm.value='+91 '+raw.slice(0,10)})
    pn.addEventListener('input',()=>{if(!/^(Mr|Mrs|Miss)\s+[A-Za-z][A-Za-z .'-]{1,59}$/i.test(pn.value.trim()))hint(pn,'Use Mr / Mrs / Miss followed by full name.',false);else hint(pn,'',true)})
    pm.addEventListener('change',()=>{if(!/^\+91\s[6-9]\d{9}$/.test(pm.value.trim()))hint(pm,'Use +91 followed by a valid 10-digit Indian mobile number.',false);else hint(pm,'',true)})
    ps.addEventListener('input',()=>{if(ps.value.trim().length<2)hint(ps,'Enter the shop/owner name.',false);else hint(ps,'',true)})
    pe.addEventListener('input',()=>{pe.value=pe.value.replace(/\s/g,'')})
    pe.addEventListener('change',()=>{if(!/^[A-Za-z0-9._%+-]+@(gmail\.com|gmail\.in|yahoo\.com|yahoo\.in|outlook\.com|hotmail\.com)$/i.test(pe.value.trim()))hint(pe,'Use a valid email such as name@gmail.com or name@yahoo.com.',false);else hint(pe,'',true)})
    pa.addEventListener('input',()=>{if(pa.value.trim().length<8)hint(pa,'Enter the complete shop address.',false);else hint(pa,'',true)})
    saveBtn.onclick=async function(e){
      e.preventDefault();
      const profile={name:pn.value.trim(),mobile:pm.value.trim(),shop:ps.value.trim(),email:pe.value.trim(),address:pa.value.trim(),state:pst.value.trim(),city:pc.value.trim(),pin:pp.value.trim()};
      const st=resolveState(profile.state);let ok=true,first=null;function bad(el,msg){ok=false;hint(el,msg,false);if(!first)first=el}
      if(!/^(Mr|Mrs|Miss)\s+[A-Za-z][A-Za-z .'-]{1,59}$/i.test(profile.name))bad(pn,'Username must start with Mr, Mrs or Miss and contain a full name.')
      if(!/^\+91\s[6-9]\d{9}$/.test(profile.mobile))bad(pm,'Mobile must be +91 followed by 10 digits.')
      if(profile.shop.length<2)bad(ps,'Enter a valid shop/owner name.')
      if(!/^[A-Za-z0-9._%+-]+@(gmail\.com|gmail\.in|yahoo\.com|yahoo\.in|outlook\.com|hotmail\.com)$/i.test(profile.email))bad(pe,'Enter a valid email address.')
      if(profile.address.length<8)bad(pa,'Enter the complete address.')
      if(!st)bad(pst,'Select a valid Indian State from the suggestions.');else if(norm(profile.state)!==norm(st))bad(pst,'Select the State from the list.')
      if(!allCities(st||'').some(c=>norm(c)===norm(profile.city)))bad(pc,'Select a valid City for the selected State.')
      if(!/^\d{6}$/.test(profile.pin))bad(pp,'Pincode must be exactly 6 digits.')
      if(!ok){first.focus();first.scrollIntoView({behavior:'smooth',block:'center'});alert('Profile save nahi hoga. Har field ki sahi detail select/enter karein.');return}
      try{const rows=await apiPin(profile.pin),filtered=rows.filter(x=>norm(x.State)===norm(st)),city=norm(profile.city),cityOk=filtered.some(x=>norm(x.District)===city||norm(x.Name)===city||norm(x.Block)===city||norm(x.Region)===city);if(!filtered.length||!cityOk){hint(pp,'Pincode does not match the selected State/City.',false);pp.focus();return}}catch(_){hint(pp,'Pincode verification needs an internet connection.',false);pp.focus();return}
      localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));
      try{window.p=profile}catch(_){ }
      const ob=document.getElementById('onboard');if(ob){ob.hidden=true;ob.style.display='none'}
      if(typeof window.render==='function')window.render();window.scrollTo(0,0)
    };
    updateStates();updateCities();
  }

  function installNavigation(){
    const modal=document.getElementById('modal');if(!modal||window.__sgNavCore)return;window.__sgNavCore=true;
    const originalOpen=window.openM,originalClose=window.closeM;
    function closeHome(){if(originalClose)originalClose();else modal.classList.remove('show')}
    function ensureBack(){const sheet=modal.querySelector('.sheet');if(!sheet)return;let b=sheet.querySelector('#sgCoreBackBtn');if(!b){b=document.createElement('button');b.id='sgCoreBackBtn';b.type='button';b.className='secondary';b.textContent='← Back';b.style.margin='0 0 8px 0';const close=sheet.querySelector('.close');if(close)close.insertAdjacentElement('afterend',b);else sheet.insertBefore(b,sheet.firstChild)}b.onclick=()=>history.back()}
    window.openM=function(t){const r=originalOpen&&originalOpen(t);history.pushState({sgCoreModal:true,t},'',location.href.split('#')[0]+'#'+encodeURIComponent(t));setTimeout(ensureBack,0);return r}
    window.closeM=function(){closeHome();if(location.hash)history.replaceState({sgCoreRoot:true},'',location.href.split('#')[0])}
    if(!history.state)history.replaceState({sgCoreRoot:true},'',location.href)
    window.addEventListener('popstate',e=>{if(e.state&&e.state.sgCoreModal){closeHome();setTimeout(ensureBack,0)}else if(modal.classList.contains('show'))closeHome();else history.pushState({sgCoreRoot:true},'',location.href.split('#')[0])})
    document.addEventListener('click',e=>{const x=e.target.closest&&e.target.closest('.close');if(x){e.preventDefault();e.stopImmediatePropagation();closeHome();history.replaceState({sgCoreRoot:true},'',location.href.split('#')[0])}},true)
  }

  function installZoom(){
    if(window.__sgZoomCore)return;window.__sgZoomCore=true;
    function bind(){document.querySelectorAll('.preview-large img,#sgCoreZoomImg').forEach(img=>{if(img.dataset.sgZoomBound==='1')return;img.dataset.sgZoomBound='1';const box=img.closest('.preview-large')||img.parentElement;if(!box)return;box.style.touchAction='none';box.style.overflow='hidden';let scale=1,x=0,y=0,startDist=0,startScale=1,lastX=0,lastY=0;function apply(){img.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+scale+')';img.style.transformOrigin='center center'}box.addEventListener('touchstart',e=>{if(e.touches.length===2){startDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);startScale=scale}else if(e.touches.length===1&&scale>1){lastX=e.touches[0].clientX-x;lastY=e.touches[0].clientY-y}},{passive:true});box.addEventListener('touchmove',e=>{if(e.touches.length===2&&startDist){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);scale=Math.max(1,Math.min(12,startScale*d/startDist));apply()}else if(e.touches.length===1&&scale>1){x=e.touches[0].clientX-lastX;y=e.touches[0].clientY-lastY;apply()}},{passive:true});let lastTap=0;box.addEventListener('touchend',()=>{const now=Date.now();if(now-lastTap<320){scale=scale===1?2:1;x=0;y=0;apply()}lastTap=now},{passive:true})})}
    new MutationObserver(bind).observe(document.documentElement,{childList:true,subtree:true});bind()
  }

  function boot(){setupProfile();installNavigation();installZoom()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
