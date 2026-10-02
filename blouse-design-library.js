/* SILAI GURU — authoritative Blouse Design Library addition */
(function(){
  'use strict';
  const original = window.garmentDesignsFor;
  const blouseImage = './ChatGPT%20Image%20Sep%2030,%202026,%2004_00_59%20PM.png';
  const blouseDesign = {
    id: 'silai-guru-blouse-neck-sheet-20260930',
    type: 'Blouse',
    name: 'Blouse Neck Designs — Latest & Traditional Collection',
    image: blouseImage,
    source: 'SILAI GURU Design Library'
  };
  window.garmentDesignsFor = function(type){
    const base = typeof original === 'function' ? original(type) : [];
    if(String(type) === 'Blouse') return [blouseDesign].concat(base || []);
    return base || [];
  };
})();
