import '@vaadin/polymer-legacy-adapter/style-modules.js';
import '@vaadin/login/theme/lumo/vaadin-login-form.js';
import '@vaadin/vertical-layout/theme/lumo/vaadin-vertical-layout.js';
import '@vaadin/common-frontend/ConnectionIndicator.js';
import '@vaadin/vaadin-lumo-styles/color-global.js';
import '@vaadin/vaadin-lumo-styles/typography-global.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';

const loadOnDemand = (key) => {
  const pending = [];
  if (key === '0e2199f23fde506d846792ec2ab8ef2a8d1394160d60f8d1a254a10e607e2212') {
    pending.push(import('./chunks/chunk-d15f0d5ac4106d25f2897f0d2d5a285a2def4e4da5b00e1281e0c79e1e6dc72f.js'));
  }
  if (key === '8851329ae9ac005994d0f80a662f2fa68d81314a4f4a9322c08c189ff4747771') {
    pending.push(import('./chunks/chunk-cb145b72a37249bd7a5eea0d5306df4b60793e29e0408ef6afcc5af19af85aa9.js'));
  }
  if (key === 'a76a92cdebdce2ecc16230ab640cea2e20b078ce16c2c264e6e3ce5a4d8911d9') {
    pending.push(import('./chunks/chunk-fa419cbc59dc6dd4a868a153b68a386c965555cc0dac77fc74a005d14941a2c9.js'));
  }
  if (key === '9d8f9c1eefb1fe33c1217426c1a34be84766e7dbb7f71fd9830ed0d877fb387a') {
    pending.push(import('./chunks/chunk-51990b9b535cc2570cd9a877069cdc2ac586120cb859ef97d639ba8e5279d730.js'));
  }
  if (key === 'bead4d513889252b982c2f17ea6c6e33f4f4608fe0574cdd5a2b7137a61e7f24') {
    pending.push(import('./chunks/chunk-51990b9b535cc2570cd9a877069cdc2ac586120cb859ef97d639ba8e5279d730.js'));
  }
  if (key === '731e958ea612bdcd3169165855702d4901d2ee0514a8847d19a2b2ee6369dda5') {
    pending.push(import('./chunks/chunk-51990b9b535cc2570cd9a877069cdc2ac586120cb859ef97d639ba8e5279d730.js'));
  }
  if (key === '1896bf2bb7117bb10699c77fae2ee99e0cae536ed48c35344da2370a4205f152') {
    pending.push(import('./chunks/chunk-fa419cbc59dc6dd4a868a153b68a386c965555cc0dac77fc74a005d14941a2c9.js'));
  }
  if (key === '4821d6675257d3904d54f9502a4d85d47c59566fdc8043c4a6b08067a14b1056') {
    pending.push(import('./chunks/chunk-51990b9b535cc2570cd9a877069cdc2ac586120cb859ef97d639ba8e5279d730.js'));
  }
  if (key === 'c2daa186b50ba961b8ebad5f99046ca8bc342915afb1b4a26f500e8278fa5d5e') {
    pending.push(import('./chunks/chunk-64691d34f3187555d09b4c4575060794c1ca8cf17fa91cf0988de68048e729eb.js'));
  }
  return Promise.all(pending);
}

window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow.loadOnDemand = loadOnDemand;
window.Vaadin.Flow.resetFocus = () => {
 let ae=document.activeElement;
 while(ae&&ae.shadowRoot) ae = ae.shadowRoot.activeElement;
 return !ae || ae.blur() || ae.focus() || true;
}