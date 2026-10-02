/* SILAI GURU — legacy garment selector retired.
   New Order garment selection is owned only by silai-guru-order-ui.js.
   This file is intentionally kept as a harmless compatibility shim so older
   service-worker asset lists remain valid. It must not replace initGarments,
   addGarment, or inject a second garment picker. */
(function(){
  'use strict';
  window.__sgLegacyGarmentSelectorDisabled = true;
})();
