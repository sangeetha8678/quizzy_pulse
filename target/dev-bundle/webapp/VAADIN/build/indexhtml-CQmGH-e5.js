(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.webPush=!1;window.Vaadin.featureFlags.formFillerAddon=!1;window.Vaadin.featureFlags.reactRouter=!1;const Pr="modulepreload",Ir=function(t,e){return new URL(t,e).href},Wo={},f=function(e,o,i){let r=Promise.resolve();if(o&&o.length>0){const n=document.getElementsByTagName("link");r=Promise.all(o.map(a=>{if(a=Ir(a,i),a in Wo)return;Wo[a]=!0;const l=a.endsWith(".css"),s=l?'[rel="stylesheet"]':"";if(!!i)for(let m=n.length-1;m>=0;m--){const u=n[m];if(u.href===a&&(!l||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${s}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":Pr,l||(d.as="script",d.crossOrigin=""),d.href=a,document.head.appendChild(d),l)return new Promise((m,u)=>{d.addEventListener("load",m),d.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${a}`)))})}))}return r.then(()=>e()).catch(n=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=n,window.dispatchEvent(a),!a.defaultPrevented)throw n})};function _t(t){return t=t||[],Array.isArray(t)?t:[t]}function ee(t){return`[Vaadin.Router] ${t}`}function Or(t){if(typeof t!="object")return String(t);const e=Object.prototype.toString.call(t).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(t)}`:e}const Et="module",St="nomodule",uo=[Et,St];function qo(t){if(!t.match(/.+\.[m]?js$/))throw new Error(ee(`Unsupported type for bundle "${t}": .js or .mjs expected.`))}function Yi(t){if(!t||!Q(t.path))throw new Error(ee('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=t.bundle,o=["component","redirect","bundle"];if(!_e(t.action)&&!Array.isArray(t.children)&&!_e(t.children)&&!kt(e)&&!o.some(i=>Q(t[i])))throw new Error(ee(`Expected route config "${t.path}" to include either "${o.join('", "')}" or "action" function but none found.`));if(e)if(Q(e))qo(e);else if(uo.some(i=>i in e))uo.forEach(i=>i in e&&qo(e[i]));else throw new Error(ee('Expected route bundle to include either "'+St+'" or "'+Et+'" keys, or both'));t.redirect&&["bundle","component"].forEach(i=>{i in t&&console.warn(ee(`Route config "${t.path}" has both "redirect" and "${i}" properties, and "redirect" will always override the latter. Did you mean to only use "${i}"?`))})}function Go(t){_t(t).forEach(e=>Yi(e))}function Ko(t,e){let o=document.head.querySelector('script[src="'+t+'"][async]');return o||(o=document.createElement("script"),o.setAttribute("src",t),e===Et?o.setAttribute("type",Et):e===St&&o.setAttribute(St,""),o.async=!0),new Promise((i,r)=>{o.onreadystatechange=o.onload=n=>{o.__dynamicImportLoaded=!0,i(n)},o.onerror=n=>{o.parentNode&&o.parentNode.removeChild(o),r(n)},o.parentNode===null?document.head.appendChild(o):o.__dynamicImportLoaded&&i()})}function Lr(t){return Q(t)?Ko(t):Promise.race(uo.filter(e=>e in t).map(e=>Ko(t[e],e)))}function qe(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:t==="go",detail:e}))}function kt(t){return typeof t=="object"&&!!t}function _e(t){return typeof t=="function"}function Q(t){return typeof t=="string"}function Xi(t){const e=new Error(ee(`Page not found (${t.pathname})`));return e.context=t,e.code=404,e}const Ie=new class{};function zr(t){const e=t.port,o=t.protocol,n=o==="http:"&&e==="80"||o==="https:"&&e==="443"?t.hostname:t.host;return`${o}//${n}`}function Jo(t){if(t.defaultPrevented||t.button!==0||t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const o=t.composedPath?t.composedPath():t.path||[];for(let l=0;l<o.length;l++){const s=o[l];if(s.nodeName&&s.nodeName.toLowerCase()==="a"){e=s;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||zr(e))!==window.location.origin)return;const{pathname:r,search:n,hash:a}=e;qe("go",{pathname:r,search:n,hash:a})&&(t.preventDefault(),t&&t.type==="click"&&window.scrollTo(0,0))}const Mr={activate(){window.document.addEventListener("click",Jo)},inactivate(){window.document.removeEventListener("click",Jo)}},Vr=/Trident/.test(navigator.userAgent);Vr&&!_e(window.PopStateEvent)&&(window.PopStateEvent=function(t,e){e=e||{};var o=document.createEvent("Event");return o.initEvent(t,!!e.bubbles,!!e.cancelable),o.state=e.state||null,o},window.PopStateEvent.prototype=window.Event.prototype);function Yo(t){if(t.state==="vaadin-router-ignore")return;const{pathname:e,search:o,hash:i}=window.location;qe("go",{pathname:e,search:o,hash:i})}const Dr={activate(){window.addEventListener("popstate",Yo)},inactivate(){window.removeEventListener("popstate",Yo)}};var Fe=ir,jr=wo,Ur=Wr,Fr=er,Br=or,Qi="/",Zi="./",Hr=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function wo(t,e){for(var o=[],i=0,r=0,n="",a=e&&e.delimiter||Qi,l=e&&e.delimiters||Zi,s=!1,c;(c=Hr.exec(t))!==null;){var d=c[0],m=c[1],u=c.index;if(n+=t.slice(r,u),r=u+d.length,m){n+=m[1],s=!0;continue}var y="",ne=t[r],G=c[2],nt=c[3],Bt=c[4],W=c[5];if(!s&&n.length){var oe=n.length-1;l.indexOf(n[oe])>-1&&(y=n[oe],n=n.slice(0,oe))}n&&(o.push(n),n="",s=!1);var Ce=y!==""&&ne!==void 0&&ne!==y,Te=W==="+"||W==="*",Ht=W==="?"||W==="*",ae=y||a,at=nt||Bt;o.push({name:G||i++,prefix:y,delimiter:ae,optional:Ht,repeat:Te,partial:Ce,pattern:at?qr(at):"[^"+pe(ae)+"]+?"})}return(n||r<t.length)&&o.push(n+t.substr(r)),o}function Wr(t,e){return er(wo(t,e))}function er(t){for(var e=new Array(t.length),o=0;o<t.length;o++)typeof t[o]=="object"&&(e[o]=new RegExp("^(?:"+t[o].pattern+")$"));return function(i,r){for(var n="",a=r&&r.encode||encodeURIComponent,l=0;l<t.length;l++){var s=t[l];if(typeof s=="string"){n+=s;continue}var c=i?i[s.name]:void 0,d;if(Array.isArray(c)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but got array');if(c.length===0){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var m=0;m<c.length;m++){if(d=a(c[m],s),!e[l].test(d))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'"');n+=(m===0?s.prefix:s.delimiter)+d}continue}if(typeof c=="string"||typeof c=="number"||typeof c=="boolean"){if(d=a(String(c),s),!e[l].test(d))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but got "'+d+'"');n+=s.prefix+d;continue}if(s.optional){s.partial&&(n+=s.prefix);continue}throw new TypeError('Expected "'+s.name+'" to be '+(s.repeat?"an array":"a string"))}return n}}function pe(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function qr(t){return t.replace(/([=!:$/()])/g,"\\$1")}function tr(t){return t&&t.sensitive?"":"i"}function Gr(t,e){if(!e)return t;var o=t.source.match(/\((?!\?)/g);if(o)for(var i=0;i<o.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return t}function Kr(t,e,o){for(var i=[],r=0;r<t.length;r++)i.push(ir(t[r],e,o).source);return new RegExp("(?:"+i.join("|")+")",tr(o))}function Jr(t,e,o){return or(wo(t,o),e,o)}function or(t,e,o){o=o||{};for(var i=o.strict,r=o.start!==!1,n=o.end!==!1,a=pe(o.delimiter||Qi),l=o.delimiters||Zi,s=[].concat(o.endsWith||[]).map(pe).concat("$").join("|"),c=r?"^":"",d=t.length===0,m=0;m<t.length;m++){var u=t[m];if(typeof u=="string")c+=pe(u),d=m===t.length-1&&l.indexOf(u[u.length-1])>-1;else{var y=u.repeat?"(?:"+u.pattern+")(?:"+pe(u.delimiter)+"(?:"+u.pattern+"))*":u.pattern;e&&e.push(u),u.optional?u.partial?c+=pe(u.prefix)+"("+y+")?":c+="(?:"+pe(u.prefix)+"("+y+"))?":c+=pe(u.prefix)+"("+y+")"}}return n?(i||(c+="(?:"+a+")?"),c+=s==="$"?"$":"(?="+s+")"):(i||(c+="(?:"+a+"(?="+s+"))?"),d||(c+="(?="+a+"|"+s+")")),new RegExp(c,tr(o))}function ir(t,e,o){return t instanceof RegExp?Gr(t,e):Array.isArray(t)?Kr(t,e,o):Jr(t,e,o)}Fe.parse=jr;Fe.compile=Ur;Fe.tokensToFunction=Fr;Fe.tokensToRegExp=Br;const{hasOwnProperty:Yr}=Object.prototype,po=new Map;po.set("|false",{keys:[],pattern:/(?:)/});function Xo(t){try{return decodeURIComponent(t)}catch{return t}}function Xr(t,e,o,i,r){o=!!o;const n=`${t}|${o}`;let a=po.get(n);if(!a){const c=[];a={keys:c,pattern:Fe(t,c,{end:o,strict:t===""})},po.set(n,a)}const l=a.pattern.exec(e);if(!l)return null;const s=Object.assign({},r);for(let c=1;c<l.length;c++){const d=a.keys[c-1],m=d.name,u=l[c];(u!==void 0||!Yr.call(s,m))&&(d.repeat?s[m]=u?u.split(d.delimiter).map(Xo):[]:s[m]=u&&Xo(u))}return{path:l[0],keys:(i||[]).concat(a.keys),params:s}}function rr(t,e,o,i,r){let n,a,l=0,s=t.path||"";return s.charAt(0)==="/"&&(o&&(s=s.substr(1)),o=!0),{next(c){if(t===c)return{done:!0};const d=t.__children=t.__children||t.children;if(!n&&(n=Xr(s,e,!d,i,r),n))return{done:!1,value:{route:t,keys:n.keys,params:n.params,path:n.path}};if(n&&d)for(;l<d.length;){if(!a){const u=d[l];u.parent=t;let y=n.path.length;y>0&&e.charAt(y)==="/"&&(y+=1),a=rr(u,e.substr(y),o,n.keys,n.params)}const m=a.next(c);if(!m.done)return{done:!1,value:m.value};a=null,l++}return{done:!0}}}}function Qr(t){if(_e(t.route.action))return t.route.action(t)}function Zr(t,e){let o=e;for(;o;)if(o=o.parent,o===t)return!0;return!1}function en(t){let e=`Path '${t.pathname}' is not properly resolved due to an error.`;const o=(t.route||{}).path;return o&&(e+=` Resolution had failed on route: '${o}'`),e}function tn(t,e){const{route:o,path:i}=e;if(o&&!o.__synthetic){const r={path:i,route:o};if(!t.chain)t.chain=[];else if(o.parent){let n=t.chain.length;for(;n--&&t.chain[n].route&&t.chain[n].route!==o.parent;)t.chain.pop()}t.chain.push(r)}}class Ke{constructor(e,o={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=o.baseUrl||"",this.errorHandler=o.errorHandler,this.resolveRoute=o.resolveRoute||Qr,this.context=Object.assign({resolver:this},o.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){Go(e);const o=[..._t(e)];this.root.__children=o}addRoutes(e){return Go(e),this.root.__children.push(..._t(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const o=Object.assign({},this.context,Q(e)?{pathname:e}:e),i=rr(this.root,this.__normalizePathname(o.pathname),this.baseUrl),r=this.resolveRoute;let n=null,a=null,l=o;function s(c,d=n.value.route,m){const u=m===null&&n.value.route;return n=a||i.next(u),a=null,!c&&(n.done||!Zr(d,n.value.route))?(a=n,Promise.resolve(Ie)):n.done?Promise.reject(Xi(o)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},o,n.value),tn(l,n.value),Promise.resolve(r(l)).then(y=>y!=null&&y!==Ie?(l.result=y.result||y,l):s(c,d,y)))}return o.next=s,Promise.resolve().then(()=>s(!0,this.root)).catch(c=>{const d=en(l);if(c?console.warn(d):c=new Error(d),c.context=c.context||l,c instanceof DOMException||(c.code=c.code||500),this.errorHandler)return l.result=this.errorHandler(c),l;throw c})}static __createUrl(e,o){return new URL(e,o)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const o=this.__effectiveBaseUrl,i=this.constructor.__createUrl(e,o).href;if(i.slice(0,o.length)===o)return i.slice(o.length)}}Ke.pathToRegexp=Fe;const{pathToRegexp:Qo}=Ke,Zo=new Map;function nr(t,e,o){const i=e.name||e.component;if(i&&(t.has(i)?t.get(i).push(e):t.set(i,[e])),Array.isArray(o))for(let r=0;r<o.length;r++){const n=o[r];n.parent=e,nr(t,n,n.__children||n.children)}}function ei(t,e){const o=t.get(e);if(o&&o.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return o&&o[0]}function ti(t){let e=t.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function on(t,e={}){if(!(t instanceof Ke))throw new TypeError("An instance of Resolver is expected");const o=new Map;return(i,r)=>{let n=ei(o,i);if(!n&&(o.clear(),nr(o,t.root,t.root.__children),n=ei(o,i),!n))throw new Error(`Route "${i}" not found`);let a=Zo.get(n.fullPath);if(!a){let s=ti(n),c=n.parent;for(;c;){const y=ti(c);y&&(s=y.replace(/\/$/,"")+"/"+s.replace(/^\//,"")),c=c.parent}const d=Qo.parse(s),m=Qo.tokensToFunction(d),u=Object.create(null);for(let y=0;y<d.length;y++)Q(d[y])||(u[d[y].name]=!0);a={toPath:m,keys:u},Zo.set(s,a),n.fullPath=s}let l=a.toPath(r,e)||"/";if(e.stringifyQueryParams&&r){const s={},c=Object.keys(r);for(let m=0;m<c.length;m++){const u=c[m];a.keys[u]||(s[u]=r[u])}const d=e.stringifyQueryParams(s);d&&(l+=d.charAt(0)==="?"?d:`?${d}`)}return l}}let oi=[];function rn(t){oi.forEach(e=>e.inactivate()),t.forEach(e=>e.activate()),oi=t}const nn=t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&e!=="none"},an=(t,e)=>{const o=()=>{t.removeEventListener("animationend",o),e()};t.addEventListener("animationend",o)};function ii(t,e){return t.classList.add(e),new Promise(o=>{if(nn(t)){const i=t.getBoundingClientRect(),r=`height: ${i.bottom-i.top}px; width: ${i.right-i.left}px`;t.setAttribute("style",`position: absolute; ${r}`),an(t,()=>{t.classList.remove(e),t.removeAttribute("style"),o()})}else t.classList.remove(e),o()})}const sn=256;function Kt(t){return t!=null}function ln(t){const e=Object.assign({},t);return delete e.next,e}function K({pathname:t="",search:e="",hash:o="",chain:i=[],params:r={},redirectFrom:n,resolver:a},l){const s=i.map(c=>c.route);return{baseUrl:a&&a.baseUrl||"",pathname:t,search:e,hash:o,routes:s,route:l||s.length&&s[s.length-1]||null,params:r,redirectFrom:n,getUrl:(c={})=>ft(me.pathToRegexp.compile(ar(s))(Object.assign({},r,c)),a)}}function ri(t,e){const o=Object.assign({},t.params);return{redirect:{pathname:e,from:t.pathname,params:o}}}function cn(t,e){e.location=K(t);const o=t.chain.map(i=>i.route).indexOf(t.route);return t.chain[o].element=e,e}function gt(t,e,o){if(_e(t))return t.apply(o,e)}function ni(t,e,o){return i=>{if(i&&(i.cancel||i.redirect))return i;if(o)return gt(o[t],e,o)}}function dn(t,e){if(!Array.isArray(t)&&!kt(t))throw new Error(ee(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${t}`));e.__children=[];const o=_t(t);for(let i=0;i<o.length;i++)Yi(o[i]),e.__children.push(o[i])}function ut(t){if(t&&t.length){const e=t[0].parentNode;for(let o=0;o<t.length;o++)e.removeChild(t[o])}}function ft(t,e){const o=e.__effectiveBaseUrl;return o?e.constructor.__createUrl(t.replace(/^\//,""),o).pathname:t}function ar(t){return t.map(e=>e.path).reduce((e,o)=>o.length?e.replace(/\/$/,"")+"/"+o.replace(/^\//,""):e,"")}class me extends Ke{constructor(e,o){const i=document.head.querySelector("base"),r=i&&i.getAttribute("href");super([],Object.assign({baseUrl:r&&Ke.__createUrl(r,document.URL).pathname.replace(/[^\/]*$/,"")},o)),this.resolveRoute=a=>this.__resolveRoute(a);const n=me.NavigationTrigger;me.setTriggers.apply(me,Object.keys(n).map(a=>n[a])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=K({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const o=e.route;let i=Promise.resolve();_e(o.children)&&(i=i.then(()=>o.children(ln(e))).then(n=>{!Kt(n)&&!_e(o.children)&&(n=o.children),dn(n,o)}));const r={redirect:n=>ri(e,n),component:n=>{const a=document.createElement(n);return this.__createdByRouter.set(a,!0),a}};return i.then(()=>{if(this.__isLatestRender(e))return gt(o.action,[e,r],o)}).then(n=>{if(Kt(n)&&(n instanceof HTMLElement||n.redirect||n===Ie))return n;if(Q(o.redirect))return r.redirect(o.redirect);if(o.bundle)return Lr(o.bundle).then(()=>{},()=>{throw new Error(ee(`Bundle not found: ${o.bundle}. Check if the file name is correct`))})}).then(n=>{if(Kt(n))return n;if(Q(o.component))return r.component(o.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,o=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),o||this.__onNavigationEvent(),this.ready}render(e,o){const i=++this.__lastStartedRenderId,r=Object.assign({search:"",hash:""},Q(e)?{pathname:e}:e,{__renderId:i});return this.ready=this.resolve(r).then(n=>this.__fullyResolveChain(n)).then(n=>{if(this.__isLatestRender(n)){const a=this.__previousContext;if(n===a)return this.__updateBrowserHistory(a,!0),this.location;if(this.location=K(n),o&&this.__updateBrowserHistory(n,i===1),qe("location-changed",{router:this,location:this.location}),n.__skipAttach)return this.__copyUnchangedElements(n,a),this.__previousContext=n,this.location;this.__addAppearingContent(n,a);const l=this.__animateIfNeeded(n);return this.__runOnAfterEnterCallbacks(n),this.__runOnAfterLeaveCallbacks(n,a),l.then(()=>{if(this.__isLatestRender(n))return this.__removeDisappearingContent(),this.__previousContext=n,this.location})}}).catch(n=>{if(i===this.__lastStartedRenderId)throw o&&this.__updateBrowserHistory(r),ut(this.__outlet&&this.__outlet.children),this.location=K(Object.assign(r,{resolver:this})),qe("error",Object.assign({router:this,error:n},r)),n}),this.ready}__fullyResolveChain(e,o=e){return this.__findComponentContextAfterAllRedirects(o).then(i=>{const n=i!==o?i:e,l=ft(ar(i.chain),i.resolver)===i.pathname,s=(c,d=c.route,m)=>c.next(void 0,d,m).then(u=>u===null||u===Ie?l?c:d.parent!==null?s(c,d.parent,u):u:u);return s(i).then(c=>{if(c===null||c===Ie)throw Xi(n);return c&&c!==Ie&&c!==i?this.__fullyResolveChain(n,c):this.__amendWithOnBeforeCallbacks(i)})})}__findComponentContextAfterAllRedirects(e){const o=e.result;return o instanceof HTMLElement?(cn(e,o),Promise.resolve(e)):o.redirect?this.__redirect(o.redirect,e.__redirectCount,e.__renderId).then(i=>this.__findComponentContextAfterAllRedirects(i)):o instanceof Error?Promise.reject(o):Promise.reject(new Error(ee(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Or(o)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(o=>o===this.__previousContext||o===e?o:this.__fullyResolveChain(o))}__runOnBeforeCallbacks(e){const o=this.__previousContext||{},i=o.chain||[],r=e.chain;let n=Promise.resolve();const a=()=>({cancel:!0}),l=s=>ri(e,s);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let s=0;s<Math.min(i.length,r.length)&&!(i[s].route!==r[s].route||i[s].path!==r[s].path&&i[s].element!==r[s].element||!this.__isReusableElement(i[s].element,r[s].element));s=++e.__divergedChainIndex);if(e.__skipAttach=r.length===i.length&&e.__divergedChainIndex==r.length&&this.__isReusableElement(e.result,o.result),e.__skipAttach){for(let s=r.length-1;s>=0;s--)n=this.__runOnBeforeLeaveCallbacks(n,e,{prevent:a},i[s]);for(let s=0;s<r.length;s++)n=this.__runOnBeforeEnterCallbacks(n,e,{prevent:a,redirect:l},r[s]),i[s].element.location=K(e,i[s].route)}else for(let s=i.length-1;s>=e.__divergedChainIndex;s--)n=this.__runOnBeforeLeaveCallbacks(n,e,{prevent:a},i[s])}if(!e.__skipAttach)for(let s=0;s<r.length;s++)s<e.__divergedChainIndex?s<i.length&&i[s].element&&(i[s].element.location=K(e,i[s].route)):(n=this.__runOnBeforeEnterCallbacks(n,e,{prevent:a,redirect:l},r[s]),r[s].element&&(r[s].element.location=K(e,r[s].route)));return n.then(s=>{if(s){if(s.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(s.redirect)return this.__redirect(s.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,o,i,r){const n=K(o);return e.then(a=>{if(this.__isLatestRender(o))return ni("onBeforeLeave",[n,i,this],r.element)(a)}).then(a=>{if(!(a||{}).redirect)return a})}__runOnBeforeEnterCallbacks(e,o,i,r){const n=K(o,r.route);return e.then(a=>{if(this.__isLatestRender(o))return ni("onBeforeEnter",[n,i,this],r.element)(a)})}__isReusableElement(e,o){return e&&o?this.__createdByRouter.get(e)&&this.__createdByRouter.get(o)?e.localName===o.localName:e===o:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,o,i){if(o>sn)throw new Error(ee(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(o||0)+1,__renderId:i})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(ee(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:o="",hash:i=""},r){if(window.location.pathname!==e||window.location.search!==o||window.location.hash!==i){const n=r?"replaceState":"pushState";window.history[n](null,document.title,e+o+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,o){let i=this.__outlet;for(let r=0;r<e.__divergedChainIndex;r++){const n=o&&o.chain[r].element;if(n)if(n.parentNode===i)e.chain[r].element=n,i=n;else break}return i}__addAppearingContent(e,o){this.__ensureOutlet(),this.__removeAppearingContent();const i=this.__copyUnchangedElements(e,o);this.__appearingContent=[],this.__disappearingContent=Array.from(i.children).filter(n=>this.__addedByRouter.get(n)&&n!==e.result);let r=i;for(let n=e.__divergedChainIndex;n<e.chain.length;n++){const a=e.chain[n].element;a&&(r.appendChild(a),this.__addedByRouter.set(a,!0),r===i&&this.__appearingContent.push(a),r=a)}}__removeDisappearingContent(){this.__disappearingContent&&ut(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(ut(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,o){if(o)for(let i=o.chain.length-1;i>=e.__divergedChainIndex&&this.__isLatestRender(e);i--){const r=o.chain[i].element;if(r)try{const n=K(e);gt(r.onAfterLeave,[n,{},o.resolver],r)}finally{this.__disappearingContent.indexOf(r)>-1&&ut(r.children)}}}__runOnAfterEnterCallbacks(e){for(let o=e.__divergedChainIndex;o<e.chain.length&&this.__isLatestRender(e);o++){const i=e.chain[o].element||{},r=K(e,e.chain[o].route);gt(i.onAfterEnter,[r,{},e.resolver],i)}}__animateIfNeeded(e){const o=(this.__disappearingContent||[])[0],i=(this.__appearingContent||[])[0],r=[],n=e.chain;let a;for(let l=n.length;l>0;l--)if(n[l-1].route.animate){a=n[l-1].route.animate;break}if(o&&i&&a){const l=kt(a)&&a.leave||"leaving",s=kt(a)&&a.enter||"entering";r.push(ii(o,l)),r.push(ii(i,s))}return Promise.all(r).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:o,search:i,hash:r}=e?e.detail:window.location;Q(this.__normalizePathname(o))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:o,search:i,hash:r},!0))}static setTriggers(...e){rn(e)}urlForName(e,o){return this.__urlForName||(this.__urlForName=on(this)),ft(this.__urlForName(e,o),this)}urlForPath(e,o){return ft(me.pathToRegexp.compile(e)(o),this)}static go(e){const{pathname:o,search:i,hash:r}=Q(e)?this.__createUrl(e,"http://a"):e;return qe("go",{pathname:o,search:i,hash:r})}}const un=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,bt=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function pn(){function t(){return!0}return sr(t)}function mn(){try{return hn()?!0:vn()?bt?!gn():!pn():!1}catch{return!1}}function hn(){return localStorage.getItem("vaadin.developmentmode.force")}function vn(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function gn(){return!!(bt&&Object.keys(bt).map(e=>bt[e]).filter(e=>e.productionMode).length>0)}function sr(t,e){if(typeof t!="function")return;const o=un.exec(t.toString());if(o)try{t=new Function(o[1])}catch(i){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",i)}return t(e)}window.Vaadin=window.Vaadin||{};const ai=function(t,e){if(window.Vaadin.developmentMode)return sr(t,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=mn());function fn(){}const bn=function(){if(typeof ai=="function")return ai(fn)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});bn();me.NavigationTrigger={POPSTATE:Dr,CLICK:Mr};var Jt,A;(function(t){t.CONNECTED="connected",t.LOADING="loading",t.RECONNECTING="reconnecting",t.CONNECTION_LOST="connection-lost"})(A||(A={}));class yn{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(o=>{var i;(i=o.active)===null||i===void 0||i.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=A.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount(A.CONNECTED)}loadingFailed(){this.decreaseLoadingCount(A.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const o=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const i of this.stateChangeListeners)i(o,this.connectionState)}}get online(){return this.connectionState===A.CONNECTED||this.connectionState===A.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=A.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const xn=t=>!!(t==="localhost"||t==="[::1]"||/^127\.\d+\.\d+\.\d+$/u.exec(t)),pt=window;if(!(!((Jt=pt.Vaadin)===null||Jt===void 0)&&Jt.connectionState)){let t;xn(window.location.hostname)?t=!0:t=navigator.onLine,pt.Vaadin||(pt.Vaadin={}),pt.Vaadin.connectionState=new yn(t?A.CONNECTED:A.CONNECTION_LOST)}function H(t,e,o,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(a=t[l])&&(n=(r<3?a(n):r>3?a(e,o,n):a(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wn=!1,yt=globalThis,_o=yt.ShadowRoot&&(yt.ShadyCSS===void 0||yt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Eo=Symbol(),si=new WeakMap;class So{constructor(e,o,i){if(this._$cssResult$=!0,i!==Eo)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=o}get styleSheet(){let e=this._styleSheet;const o=this._strings;if(_o&&e===void 0){const i=o!==void 0&&o.length===1;i&&(e=si.get(o)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),i&&si.set(o,e))}return e}toString(){return this.cssText}}const _n=t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},lr=t=>new So(typeof t=="string"?t:String(t),void 0,Eo),x=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((i,r,n)=>i+_n(r)+t[n+1],t[0]);return new So(o,t,Eo)},En=(t,e)=>{if(_o)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(const o of e){const i=document.createElement("style"),r=yt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,t.appendChild(i)}},Sn=t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return lr(e)},li=_o||wn?t=>t:t=>t instanceof CSSStyleSheet?Sn(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:kn,defineProperty:Cn,getOwnPropertyDescriptor:ci,getOwnPropertyNames:Tn,getOwnPropertySymbols:$n,getPrototypeOf:di}=Object,j=globalThis;let ie;const ui=j.trustedTypes,An=ui?ui.emptyScript:"",xt=j.reactiveElementPolyfillSupportDevMode;var qi;{const t=j.litIssuedWarnings??(j.litIssuedWarnings=new Set);ie=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))},ie("dev-mode","Lit is in dev mode. Not recommended for production!"),(qi=j.ShadyDOM)!=null&&qi.inUse&&xt===void 0&&ie("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")}const Yt=t=>{j.emitLitDebugLogEvents&&j.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))},Oe=(t,e)=>t,Ct={toAttribute(t,e){switch(e){case Boolean:t=t?An:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);break}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}break}return o}},ko=(t,e)=>!kn(t,e),pi={attribute:!0,type:String,converter:Ct,reflect:!1,hasChanged:ko};Symbol.metadata??(Symbol.metadata=Symbol("metadata"));j.litPropertyMetadata??(j.litPropertyMetadata=new WeakMap);class ce extends HTMLElement{static addInitializer(e){this.__prepare(),(this._initializers??(this._initializers=[])).push(e)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(e,o=pi){if(o.state&&(o.attribute=!1),this.__prepare(),this.elementProperties.set(e,o),!o.noAccessor){const i=Symbol.for(`${String(e)} (@property() cache)`),r=this.getPropertyDescriptor(e,i,o);r!==void 0&&Cn(this.prototype,e,r)}}static getPropertyDescriptor(e,o,i){const{get:r,set:n}=ci(this.prototype,e)??{get(){return this[o]},set(a){this[o]=a}};if(r==null){if("value"in(ci(this.prototype,e)??{}))throw new Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);ie("reactive-property-without-getter",`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get(){return r==null?void 0:r.call(this)},set(a){const l=r==null?void 0:r.call(this);n.call(this,a),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??pi}static __prepare(){if(this.hasOwnProperty(Oe("elementProperties")))return;const e=di(this);e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Oe("finalized")))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(Oe("properties"))){const o=this.properties,i=[...Tn(o),...$n(o)];for(const r of i)this.createProperty(r,o[r])}const e=this[Symbol.metadata];if(e!==null){const o=litPropertyMetadata.get(e);if(o!==void 0)for(const[i,r]of o)this.elementProperties.set(i,r)}this.__attributeToPropertyMap=new Map;for(const[o,i]of this.elementProperties){const r=this.__attributeNameForProperty(o,i);r!==void 0&&this.__attributeToPropertyMap.set(r,o)}this.elementStyles=this.finalizeStyles(this.styles),this.hasOwnProperty("createProperty")&&ie("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"),this.hasOwnProperty("getPropertyDescriptor")&&ie("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)o.unshift(li(r))}else e!==void 0&&o.push(li(e));return o}static __attributeNameForProperty(e,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){var e;this.__updatePromise=new Promise(o=>this.enableUpdating=o),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)==null||e.forEach(o=>o(this))}addController(e){var o;(this.__controllers??(this.__controllers=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((o=e.hostConnected)==null||o.call(e))}removeController(e){var o;(o=this.__controllers)==null||o.delete(e)}__saveInstanceProperties(){const e=new Map,o=this.constructor.elementProperties;for(const i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this.__instanceProperties=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return En(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)==null||e.forEach(o=>{var i;return(i=o.hostConnected)==null?void 0:i.call(o)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)==null||e.forEach(o=>{var i;return(i=o.hostDisconnected)==null?void 0:i.call(o)})}attributeChangedCallback(e,o,i){this._$attributeToProperty(e,i)}__propertyToAttribute(e,o){var a;const r=this.constructor.elementProperties.get(e),n=this.constructor.__attributeNameForProperty(e,r);if(n!==void 0&&r.reflect===!0){const s=(((a=r.converter)==null?void 0:a.toAttribute)!==void 0?r.converter:Ct).toAttribute(o,r.type);this.constructor.enabledWarnings.includes("migration")&&s===void 0&&ie("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this.__reflectingProperty=null}}_$attributeToProperty(e,o){var n;const i=this.constructor,r=i.__attributeToPropertyMap.get(e);if(r!==void 0&&this.__reflectingProperty!==r){const a=i.getPropertyOptions(r),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:Ct;this.__reflectingProperty=r,this[r]=l.fromAttribute(o,a.type),this.__reflectingProperty=null}}requestUpdate(e,o,i,r=!1,n){if(e!==void 0){i??(i=this.constructor.getPropertyOptions(e));const a=i.hasChanged??ko,l=r?n:this[e];if(a(l,o))this._$changeProperty(e,o,i);else return}this.isUpdatePending===!1&&(this.__updatePromise=this.__enqueueUpdate())}_$changeProperty(e,o,i){this._$changedProperties.has(e)||this._$changedProperties.set(e,o),i.reflect===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties??(this.__reflectingProperties=new Set)).add(e)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){const e=this.performUpdate();return this.constructor.enabledWarnings.includes("async-perform-update")&&typeof(e==null?void 0:e.then)=="function"&&ie("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`),e}performUpdate(){var i;if(!this.isUpdatePending)return;if(Yt==null||Yt({kind:"update"}),!this.hasUpdated){this.renderRoot??(this.renderRoot=this.createRenderRoot());{const a=[...this.constructor.elementProperties.keys()].filter(l=>this.hasOwnProperty(l)&&l in di(this));if(a.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${a.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(const[n,a]of this.__instanceProperties)this[n]=a;this.__instanceProperties=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,a]of r)a.wrapped===!0&&!this._$changedProperties.has(n)&&this[n]!==void 0&&this._$changeProperty(n,this[n],a)}let e=!1;const o=this._$changedProperties;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),(i=this.__controllers)==null||i.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(o)):this.__markUpdated()}catch(r){throw e=!1,this.__markUpdated(),r}e&&this._$didUpdate(o)}willUpdate(e){}_$didUpdate(e){var o;(o=this.__controllers)==null||o.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update")&&ie("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties&&(this.__reflectingProperties=this.__reflectingProperties.forEach(o=>this.__propertyToAttribute(o,this[o]))),this.__markUpdated()}updated(e){}firstUpdated(e){}}ce.elementStyles=[];ce.shadowRootOptions={mode:"open"};ce[Oe("elementProperties")]=new Map;ce[Oe("finalized")]=new Map;xt==null||xt({ReactiveElement:ce});{ce.enabledWarnings=["change-in-update","async-perform-update"];const t=function(e){e.hasOwnProperty(Oe("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};ce.enableWarning=function(e){t(this),this.enabledWarnings.includes(e)||this.enabledWarnings.push(e)},ce.disableWarning=function(e){t(this);const o=this.enabledWarnings.indexOf(e);o>=0&&this.enabledWarnings.splice(o,1)}}(j.reactiveElementVersions??(j.reactiveElementVersions=[])).push("2.0.2");j.reactiveElementVersions.length>1&&ie("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis,E=t=>{M.emitLitDebugLogEvents&&M.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))};let Rn=0,Je;M.litIssuedWarnings??(M.litIssuedWarnings=new Set),Je=(t,e)=>{e+=t?` See https://lit.dev/msg/${t} for more information.`:"",M.litIssuedWarnings.has(e)||(console.warn(e),M.litIssuedWarnings.add(e))},Je("dev-mode","Lit is in dev mode. Not recommended for production!");var Gi,Ki;const X=(Gi=M.ShadyDOM)!=null&&Gi.inUse&&((Ki=M.ShadyDOM)==null?void 0:Ki.noPatch)===!0?M.ShadyDOM.wrap:t=>t,Tt=M.trustedTypes,mi=Tt?Tt.createPolicy("lit-html",{createHTML:t=>t}):void 0,Nn=t=>t,jt=(t,e,o)=>Nn,Pn=t=>{if(ke!==jt)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");ke=t},In=()=>{ke=jt},mo=(t,e,o)=>ke(t,e,o),cr="$lit$",se=`lit$${String(Math.random()).slice(9)}$`,dr="?"+se,On=`<${dr}>`,Ee=document,Ye=()=>Ee.createComment(""),Xe=t=>t===null||typeof t!="object"&&typeof t!="function",ur=Array.isArray,Ln=t=>ur(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Xt=`[ 	
\f\r]`,zn=`[^ 	
\f\r"'\`<>=]`,Mn=`[^\\s"'>=/]`,Be=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,hi=1,Qt=2,Vn=3,vi=/-->/g,gi=/>/g,fe=new RegExp(`>|${Xt}(?:(${Mn}+)(${Xt}*=${Xt}*(?:${zn}|("|')|))|$)`,"g"),Dn=0,fi=1,jn=2,bi=3,Zt=/'/g,eo=/"/g,pr=/^(?:script|style|textarea|title)$/i,Un=1,$t=2,Co=1,At=2,Fn=3,Bn=4,Hn=5,To=6,Wn=7,mr=t=>(e,...o)=>(e.some(i=>i===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),o.some(i=>i==null?void 0:i._$litStatic$)&&Je("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`),{_$litType$:t,strings:e,values:o}),b=mr(Un),Pe=mr($t),Se=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),yi=new WeakMap,xe=Ee.createTreeWalker(Ee,129);let ke=jt;function hr(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw")){let o="invalid template strings array";throw o=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(o)}return mi!==void 0?mi.createHTML(e):e}const qn=(t,e)=>{const o=t.length-1,i=[];let r=e===$t?"<svg>":"",n,a=Be;for(let s=0;s<o;s++){const c=t[s];let d=-1,m,u=0,y;for(;u<c.length&&(a.lastIndex=u,y=a.exec(c),y!==null);)if(u=a.lastIndex,a===Be){if(y[hi]==="!--")a=vi;else if(y[hi]!==void 0)a=gi;else if(y[Qt]!==void 0)pr.test(y[Qt])&&(n=new RegExp(`</${y[Qt]}`,"g")),a=fe;else if(y[Vn]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else a===fe?y[Dn]===">"?(a=n??Be,d=-1):y[fi]===void 0?d=-2:(d=a.lastIndex-y[jn].length,m=y[fi],a=y[bi]===void 0?fe:y[bi]==='"'?eo:Zt):a===eo||a===Zt?a=fe:a===vi||a===gi?a=Be:(a=fe,n=void 0);console.assert(d===-1||a===fe||a===Zt||a===eo,"unexpected parse state B");const ne=a===fe&&t[s+1].startsWith("/>")?" ":"";r+=a===Be?c+On:d>=0?(i.push(m),c.slice(0,d)+cr+c.slice(d)+se+ne):c+se+(d===-2?s:ne)}const l=r+(t[o]||"<?>")+(e===$t?"</svg>":"");return[hr(t,l),i]};class Qe{constructor({strings:e,["_$litType$"]:o},i){this.parts=[];let r,n=0,a=0;const l=e.length-1,s=this.parts,[c,d]=qn(e,o);if(this.el=Qe.createElement(c,i),xe.currentNode=this.el.content,o===$t){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(r=xe.nextNode())!==null&&s.length<l;){if(r.nodeType===1){{const m=r.localName;if(/^(?:textarea|template)$/i.test(m)&&r.innerHTML.includes(se)){const u=`Expressions are not supported inside \`${m}\` elements. See https://lit.dev/msg/expression-in-${m} for more information.`;if(m==="template")throw new Error(u);Je("",u)}}if(r.hasAttributes())for(const m of r.getAttributeNames())if(m.endsWith(cr)){const u=d[a++],ne=r.getAttribute(m).split(se),G=/([.?@])?(.*)/.exec(u);s.push({type:Co,index:n,name:G[2],strings:ne,ctor:G[1]==="."?Kn:G[1]==="?"?Jn:G[1]==="@"?Yn:Ut}),r.removeAttribute(m)}else m.startsWith(se)&&(s.push({type:To,index:n}),r.removeAttribute(m));if(pr.test(r.tagName)){const m=r.textContent.split(se),u=m.length-1;if(u>0){r.textContent=Tt?Tt.emptyScript:"";for(let y=0;y<u;y++)r.append(m[y],Ye()),xe.nextNode(),s.push({type:At,index:++n});r.append(m[u],Ye())}}}else if(r.nodeType===8)if(r.data===dr)s.push({type:At,index:n});else{let u=-1;for(;(u=r.data.indexOf(se,u+1))!==-1;)s.push({type:Wn,index:n}),u+=se.length-1}n++}E&&E({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,o){const i=Ee.createElement("template");return i.innerHTML=e,i}}function Me(t,e,o=t,i){var a,l;if(e===Se)return e;let r=i!==void 0?(a=o.__directives)==null?void 0:a[i]:o.__directive;const n=Xe(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((l=r==null?void 0:r._$notifyDirectiveConnectionChanged)==null||l.call(r,!1),n===void 0?r=void 0:(r=new n(t),r._$initialize(t,o,i)),i!==void 0?(o.__directives??(o.__directives=[]))[i]=r:o.__directive=r),r!==void 0&&(e=Me(t,r._$resolve(t,e.values),r,i)),e}class Gn{constructor(e,o){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=o}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){const{el:{content:o},parts:i}=this._$template,r=((e==null?void 0:e.creationScope)??Ee).importNode(o,!0);xe.currentNode=r;let n=xe.nextNode(),a=0,l=0,s=i[0];for(;s!==void 0;){if(a===s.index){let c;s.type===At?c=new it(n,n.nextSibling,this,e):s.type===Co?c=new s.ctor(n,s.name,s.strings,this,e):s.type===To&&(c=new Xn(n,this,e)),this._$parts.push(c),s=i[++l]}a!==(s==null?void 0:s.index)&&(n=xe.nextNode(),a++)}return xe.currentNode=Ee,r}_update(e){let o=0;for(const i of this._$parts)i!==void 0&&(E&&E({kind:"set part",part:i,value:e[o],valueIndex:o,values:e,templateInstance:this}),i.strings!==void 0?(i._$setValue(e,i,o),o+=i.strings.length-2):i._$setValue(e[o])),o++}}class it{get _$isConnected(){var e;return((e=this._$parent)==null?void 0:e._$isConnected)??this.__isConnected}constructor(e,o,i,r){this.type=At,this._$committedValue=$,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=o,this._$parent=i,this.options=r,this.__isConnected=(r==null?void 0:r.isConnected)??!0,this._textSanitizer=void 0}get parentNode(){let e=X(this._$startNode).parentNode;const o=this._$parent;return o!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=o.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,o=this){var i;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Me(this,e,o),Xe(e))e===$||e==null||e===""?(this._$committedValue!==$&&(E&&E({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=$):e!==this._$committedValue&&e!==Se&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((i=this.options)==null?void 0:i.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else Ln(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return X(X(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var o;if(this._$committedValue!==e){if(this._$clear(),ke!==jt){const i=(o=this._$startNode.parentNode)==null?void 0:o.nodeName;if(i==="STYLE"||i==="SCRIPT"){let r="Forbidden";throw i==="STYLE"?r="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":r="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(r)}}E&&E({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==$&&Xe(this._$committedValue)){const o=X(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=mo(o,"data","property")),e=this._textSanitizer(e),E&&E({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}else{const o=Ee.createTextNode("");this._commitNode(o),this._textSanitizer===void 0&&(this._textSanitizer=mo(o,"data","property")),e=this._textSanitizer(e),E&&E({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}this._$committedValue=e}_commitTemplateResult(e){var n;const{values:o,["_$litType$"]:i}=e,r=typeof i=="number"?this._$getTemplate(e):(i.el===void 0&&(i.el=Qe.createElement(hr(i.h,i.h[0]),this.options)),i);if(((n=this._$committedValue)==null?void 0:n._$template)===r)E&&E({kind:"template updating",template:r,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:o}),this._$committedValue._update(o);else{const a=new Gn(r,this),l=a._clone(this.options);E&&E({kind:"template instantiated",template:r,instance:a,parts:a._$parts,options:this.options,fragment:l,values:o}),a._update(o),E&&E({kind:"template instantiated and updated",template:r,instance:a,parts:a._$parts,options:this.options,fragment:l,values:o}),this._commitNode(l),this._$committedValue=a}}_$getTemplate(e){let o=yi.get(e.strings);return o===void 0&&yi.set(e.strings,o=new Qe(e)),o}_commitIterable(e){ur(this._$committedValue)||(this._$committedValue=[],this._$clear());const o=this._$committedValue;let i=0,r;for(const n of e)i===o.length?o.push(r=new it(this._insert(Ye()),this._insert(Ye()),this,this.options)):r=o[i],r._$setValue(n),i++;i<o.length&&(this._$clear(r&&X(r._$endNode).nextSibling,i),o.length=i)}_$clear(e=X(this._$startNode).nextSibling,o){var i;for((i=this._$notifyConnectionChanged)==null||i.call(this,!1,!0,o);e&&e!==this._$endNode;){const r=X(e).nextSibling;X(e).remove(),e=r}}setConnected(e){var o;if(this._$parent===void 0)this.__isConnected=e,(o=this._$notifyConnectionChanged)==null||o.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Ut{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(e,o,i,r,n){this.type=Co,this._$committedValue=$,this._$disconnectableChildren=void 0,this.element=e,this.name=o,this._$parent=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$committedValue=new Array(i.length-1).fill(new String),this.strings=i):this._$committedValue=$,this._sanitizer=void 0}_$setValue(e,o=this,i,r){const n=this.strings;let a=!1;if(n===void 0)e=Me(this,e,o,0),a=!Xe(e)||e!==this._$committedValue&&e!==Se,a&&(this._$committedValue=e);else{const l=e;e=n[0];let s,c;for(s=0;s<n.length-1;s++)c=Me(this,l[i+s],o,s),c===Se&&(c=this._$committedValue[s]),a||(a=!Xe(c)||c!==this._$committedValue[s]),c===$?e=$:e!==$&&(e+=(c??"")+n[s+1]),this._$committedValue[s]=c}a&&!r&&this._commitValue(e)}_commitValue(e){e===$?X(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=ke(this.element,this.name,"attribute")),e=this._sanitizer(e??""),E&&E({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),X(this.element).setAttribute(this.name,e??""))}}class Kn extends Ut{constructor(){super(...arguments),this.type=Fn}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=ke(this.element,this.name,"property")),e=this._sanitizer(e),E&&E({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===$?void 0:e}}class Jn extends Ut{constructor(){super(...arguments),this.type=Bn}_commitValue(e){E&&E({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==$),options:this.options}),X(this.element).toggleAttribute(this.name,!!e&&e!==$)}}class Yn extends Ut{constructor(e,o,i,r,n){if(super(e,o,i,r,n),this.type=Hn,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${o}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,o=this){if(e=Me(this,e,o,0)??$,e===Se)return;const i=this._$committedValue,r=e===$&&i!==$||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==$&&(i===$||r);E&&E({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:r,addListener:n,oldListener:i}),r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var o;typeof this._$committedValue=="function"?this._$committedValue.call(((o=this.options)==null?void 0:o.host)??this.element,e):this._$committedValue.handleEvent(e)}}class Xn{constructor(e,o,i){this.element=e,this.type=To,this._$disconnectableChildren=void 0,this._$parent=o,this.options=i}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){E&&E({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Me(this,e)}}const to=M.litHtmlPolyfillSupportDevMode;to==null||to(Qe,it);(M.litHtmlVersions??(M.litHtmlVersions=[])).push("3.1.0");M.litHtmlVersions.length>1&&Je("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");const we=(t,e,o)=>{if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const i=Rn++,r=(o==null?void 0:o.renderBefore)??e;let n=r._$litPart$;if(E&&E({kind:"begin render",id:i,value:t,container:e,options:o,part:n}),n===void 0){const a=(o==null?void 0:o.renderBefore)??null;r._$litPart$=n=new it(e.insertBefore(Ye(),a),a,void 0,o??{})}return n._$setValue(t),E&&E({kind:"end render",id:i,value:t,container:e,options:o,part:n}),n};we.setSanitizer=Pn,we.createSanitizer=mo,we._testOnlyClearSanitizerFactoryDoNotCallOrElse=In;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qn=(t,e)=>t;let vr;{const t=globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);vr=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}class N extends ce{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var o;const e=super.createRenderRoot();return(o=this.renderOptions).renderBefore??(o.renderBefore=e.firstChild),e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=we(o,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)==null||e.setConnected(!1)}render(){return Se}}N._$litElement$=!0;N[Qn("finalized")]=!0;var Ji;(Ji=globalThis.litElementHydrateSupport)==null||Ji.call(globalThis,{LitElement:N});const oo=globalThis.litElementPolyfillSupportDevMode;oo==null||oo({LitElement:N});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.2");globalThis.litElementVersions.length>1&&vr("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let gr;{const t=globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);gr=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}const Zn=(t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,o):void 0},ea={attribute:!0,type:String,converter:Ct,reflect:!1,hasChanged:ko},ta=(t=ea,e,o)=>{const{kind:i,metadata:r}=o;r==null&&gr("missing-class-metadata",`The class ${e} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(o.name,t),i==="accessor"){const{name:a}=o;return{set(l){const s=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,s,t)},init(l){return l!==void 0&&this._$changeProperty(a,void 0,t),l}}}else if(i==="setter"){const{name:a}=o;return function(l){const s=this[a];e.call(this,l),this.requestUpdate(a,s,t)}}throw new Error(`Unsupported decorator location: ${i}`)};function w(t){return(e,o)=>typeof o=="object"?ta(t,e,o):Zn(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function P(t){return w({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oa=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);function rt(t,e){return(o,i,r)=>{const n=a=>{var s;return((s=a.renderRoot)==null?void 0:s.querySelector(t))??null};return oa(o,i,{get(){return n(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ia={ATTRIBUTE:1,CHILD:2},ra=t=>(...e)=>({_$litDirective$:t,values:e});class na{constructor(e){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(e,o,i){this.__part=e,this._$parent=o,this.__attributeIndex=i}_$resolve(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class aa extends na{constructor(e){var o;if(super(e),e.type!==ia.ATTRIBUTE||e.name!=="class"||((o=e.strings)==null?void 0:o.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(o=>e[o]).join(" ")+" "}update(e,[o]){var r,n;if(this._previousClasses===void 0){this._previousClasses=new Set,e.strings!==void 0&&(this._staticClasses=new Set(e.strings.join(" ").split(/\s/).filter(a=>a!=="")));for(const a in o)o[a]&&!((r=this._staticClasses)!=null&&r.has(a))&&this._previousClasses.add(a);return this.render(o)}const i=e.element.classList;for(const a of this._previousClasses)a in o||(i.remove(a),this._previousClasses.delete(a));for(const a in o){const l=!!o[a];l!==this._previousClasses.has(a)&&!((n=this._staticClasses)!=null&&n.has(a))&&(l?(i.add(a),this._previousClasses.add(a)):(i.remove(a),this._previousClasses.delete(a)))}return Se}}const $o=ra(aa),io="css-loading-indicator";var J;(function(t){t.IDLE="",t.FIRST="first",t.SECOND="second",t.THIRD="third"})(J||(J={}));class O extends N{static create(){var e,o;const i=window;return!((e=i.Vaadin)===null||e===void 0)&&e.connectionIndicator||(i.Vaadin||(i.Vaadin={}),i.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(i.Vaadin.connectionIndicator)),(o=i.Vaadin)===null||o===void 0?void 0:o.connectionIndicator}constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=J.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=A.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}render(){return b`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${$o({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const o=window;!((e=o.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=o.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const o=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=o===A.CONNECTION_LOST,this.reconnecting=o===A.RECONNECTING,this.updateLoading(o===A.LOADING),this.loading?!1:o!==this.lastMessageState?(this.lastMessageState=o,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=J.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=J.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=J.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=J.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(io)){const e=document.createElement("style");e.id=io,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(io);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case J.IDLE:return"display: none";case J.FIRST:case J.SECOND:case J.THIRD:return"display: block";default:return""}}timeoutFor(e,o,i,r){return e!==0&&window.clearTimeout(e),o?window.setTimeout(i,r):0}static get instance(){return O.create()}}H([w({type:Number})],O.prototype,"firstDelay",void 0);H([w({type:Number})],O.prototype,"secondDelay",void 0);H([w({type:Number})],O.prototype,"thirdDelay",void 0);H([w({type:Number})],O.prototype,"expandedDuration",void 0);H([w({type:String})],O.prototype,"onlineText",void 0);H([w({type:String})],O.prototype,"offlineText",void 0);H([w({type:String})],O.prototype,"reconnectingText",void 0);H([w({type:Boolean,reflect:!0})],O.prototype,"offline",void 0);H([w({type:Boolean,reflect:!0})],O.prototype,"reconnecting",void 0);H([w({type:Boolean,reflect:!0})],O.prototype,"expanded",void 0);H([w({type:Boolean,reflect:!0})],O.prototype,"loading",void 0);H([w({type:String})],O.prototype,"loadingBarState",void 0);H([w({type:Boolean})],O.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",O);O.instance;var xi;const Rt=window;Rt.Vaadin||(Rt.Vaadin={});(xi=Rt.Vaadin).registrations||(xi.registrations=[]);Rt.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class wi extends Error{}const He=window.document.body,k=window;class sa{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",He.$=He.$||[],this.config=e||{},k.Vaadin=k.Vaadin||{},k.Vaadin.Flow=k.Vaadin.Flow||{},k.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const o=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||o&&o.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,k.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,k.Vaadin.connectionState.loadingFinished(),!k.Vaadin.listener&&(k.Vaadin.listener={},document.addEventListener("click",e=>{e.target&&(e.target.hasAttribute("router-link")?this.navigation="link":e.composedPath().some(o=>o.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async e=>{if(this.pathname=e.pathname,k.Vaadin.connectionState.online)try{await this.flowInit()}catch(o){if(o instanceof wi)return k.Vaadin.connectionState.state=A.CONNECTION_LOST,this.offlineStubAction();throw o}else return this.offlineStubAction();return this.container.onBeforeEnter=(o,i)=>this.flowNavigate(o,i),this.container.onBeforeLeave=(o,i)=>this.flowLeave(o,i),this.container}}async flowLeave(e,o){const{connectionState:i}=k.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||i.offline?Promise.resolve({}):new Promise(r=>{this.loadingStarted(),this.container.serverConnected=n=>{r(o&&n?o.prevent():{}),this.loadingFinished()},He.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,o){return this.response?new Promise(i=>{this.loadingStarted(),this.container.serverConnected=(r,n)=>{o&&r?i(o.prevent()):o&&o.redirect&&n?i(o.redirect(n.pathname)):(this.container.style.display="",i(this.container)),this.loadingFinished()},this.container.serverPaused=()=>{this.loadingFinished()},He.$server.connectClient(this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state,this.navigation),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:e,appConfig:o}=this.response;typeof e=="string"&&await this.loadScript(e);const{appId:i}=o;await(await f(()=>import("./FlowBootstrap-CHUuW4WK.js"),__vite__mapDeps([]),import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(i),await this.config.imports());const n=`flow-container-${i.toLowerCase()}`,a=document.querySelector(n);a?this.container=a:(this.container=document.createElement(n),this.container.id=i),He.$[i]=this.container;const l=await f(()=>import("./FlowClient-ByngIRrK.js"),__vite__mapDeps([]),import.meta.url);await this.flowInitClient(l),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((o,i)=>{const r=document.createElement("script");r.onload=()=>o(),r.onerror=i,r.src=e,document.body.appendChild(r)})}injectAppIdScript(e){const o=e.substring(0,e.lastIndexOf("-")),i=document.createElement("script");i.type="module",i.setAttribute("data-app-id",o),document.body.append(i)}async flowInitClient(e){return e.init(),new Promise(o=>{const i=setInterval(()=>{Object.keys(k.Vaadin.Flow.clients).filter(n=>n!=="TypeScript").reduce((n,a)=>n||k.Vaadin.Flow.clients[a].isActive(),!1)||(clearInterval(i),o())},5)})}async flowInitUi(){const e=k.Vaadin&&k.Vaadin.TypeScript&&k.Vaadin.TypeScript.initial;return e?(k.Vaadin.TypeScript.initial=void 0,Promise.resolve(e)):new Promise((o,i)=>{const n=new XMLHttpRequest,a=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;n.open("GET",a),n.onerror=()=>i(new wi(`Invalid server response when initializing Flow UI.
        ${n.status}
        ${n.responseText}`)),n.onload=()=>{const l=n.getResponseHeader("content-type");l&&l.indexOf("application/json")!==-1?o(JSON.parse(n.responseText)):n.onerror()},n.send()})}addConnectionIndicator(){O.create(),k.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){k.Vaadin.connectionState.state=A.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{k.Vaadin.connectionState.state=A.CONNECTED},e.onerror=()=>{k.Vaadin.connectionState.state=A.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),k.addEventListener("offline",()=>{this.isFlowClientLoaded()||(k.Vaadin.connectionState.state=A.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),o="./offline-stub.html";e.setAttribute("src",o),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let i;const r=()=>{i!==void 0&&(k.Vaadin.connectionState.removeStateChangeListener(i),i=void 0)};return e.onBeforeEnter=(n,a,l)=>{i=()=>{k.Vaadin.connectionState.online&&(r(),l.render(n,!1))},k.Vaadin.connectionState.addStateChangeListener(i)},e.onBeforeLeave=(n,a,l)=>{r()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:la}=new sa({imports:()=>f(()=>import("./generated-flow-imports-Bpwr3sc_.js"),__vite__mapDeps([]),import.meta.url)}),ca=[...la],da=new me(document.querySelector("#outlet"));da.setRoutes(ca);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var t="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),o=new WeakMap,i=typeof DOMException=="object"?Error:DOMException,r=Object.defineProperty,n=Array.prototype.forEach,a=/@import.+?;?$/gm;function l(p){var h=p.replace(a,"");return h!==p&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),h.trim()}function s(p){return"isConnected"in p?p.isConnected:document.contains(p)}function c(p){return p.filter(function(h,_){return p.indexOf(h)===_})}function d(p,h){return p.filter(function(_){return h.indexOf(_)===-1})}function m(p){p.parentNode.removeChild(p)}function u(p){return p.shadowRoot||o.get(p)}var y=["addRule","deleteRule","insertRule","removeRule"],ne=CSSStyleSheet,G=ne.prototype;G.replace=function(){return Promise.reject(new i("Can't call replace on non-constructed CSSStyleSheets."))},G.replaceSync=function(){throw new i("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function nt(p){return typeof p=="object"?$e.isPrototypeOf(p)||G.isPrototypeOf(p):!1}function Bt(p){return typeof p=="object"?G.isPrototypeOf(p):!1}var W=new WeakMap,oe=new WeakMap,Ce=new WeakMap,Te=new WeakMap;function Ht(p,h){var _=document.createElement("style");return Ce.get(p).set(h,_),oe.get(p).push(h),_}function ae(p,h){return Ce.get(p).get(h)}function at(p,h){Ce.get(p).delete(h),oe.set(p,oe.get(p).filter(function(_){return _!==h}))}function Vo(p,h){requestAnimationFrame(function(){h.textContent=W.get(p).textContent,Te.get(p).forEach(function(_){return h.sheet[_.method].apply(h.sheet,_.args)})})}function st(p){if(!W.has(p))throw new TypeError("Illegal invocation")}function Wt(){var p=this,h=document.createElement("style");e.body.appendChild(h),W.set(p,h),oe.set(p,[]),Ce.set(p,new WeakMap),Te.set(p,[])}var $e=Wt.prototype;$e.replace=function(h){try{return this.replaceSync(h),Promise.resolve(this)}catch(_){return Promise.reject(_)}},$e.replaceSync=function(h){if(st(this),typeof h=="string"){var _=this;W.get(_).textContent=l(h),Te.set(_,[]),oe.get(_).forEach(function(D){D.isConnected()&&Vo(_,ae(_,D))})}},r($e,"cssRules",{configurable:!0,enumerable:!0,get:function(){return st(this),W.get(this).sheet.cssRules}}),r($e,"media",{configurable:!0,enumerable:!0,get:function(){return st(this),W.get(this).sheet.media}}),y.forEach(function(p){$e[p]=function(){var h=this;st(h);var _=arguments;Te.get(h).push({method:p,args:_}),oe.get(h).forEach(function(F){if(F.isConnected()){var L=ae(h,F).sheet;L[p].apply(L,_)}});var D=W.get(h).sheet;return D[p].apply(D,_)}}),r(Wt,Symbol.hasInstance,{configurable:!0,value:nt});var Do={childList:!0,subtree:!0},jo=new WeakMap;function Ae(p){var h=jo.get(p);return h||(h=new Bo(p),jo.set(p,h)),h}function Uo(p){r(p.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return Ae(this).sheets},set:function(h){Ae(this).update(h)}})}function qt(p,h){for(var _=document.createNodeIterator(p,NodeFilter.SHOW_ELEMENT,function(F){return u(F)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),D=void 0;D=_.nextNode();)h(u(D))}var lt=new WeakMap,Re=new WeakMap,ct=new WeakMap;function Rr(p,h){return h instanceof HTMLStyleElement&&Re.get(p).some(function(_){return ae(_,p)})}function Fo(p){var h=lt.get(p);return h instanceof Document?h.body:h}function Gt(p){var h=document.createDocumentFragment(),_=Re.get(p),D=ct.get(p),F=Fo(p);D.disconnect(),_.forEach(function(L){h.appendChild(ae(L,p)||Ht(L,p))}),F.insertBefore(h,null),D.observe(F,Do),_.forEach(function(L){Vo(L,ae(L,p))})}function Bo(p){var h=this;h.sheets=[],lt.set(h,p),Re.set(h,[]),ct.set(h,new MutationObserver(function(_,D){if(!document){D.disconnect();return}_.forEach(function(F){t||n.call(F.addedNodes,function(L){L instanceof Element&&qt(L,function(Ne){Ae(Ne).connect()})}),n.call(F.removedNodes,function(L){L instanceof Element&&(Rr(h,L)&&Gt(h),t||qt(L,function(Ne){Ae(Ne).disconnect()}))})})}))}if(Bo.prototype={isConnected:function(){var p=lt.get(this);return p instanceof Document?p.readyState!=="loading":s(p.host)},connect:function(){var p=Fo(this);ct.get(this).observe(p,Do),Re.get(this).length>0&&Gt(this),qt(p,function(h){Ae(h).connect()})},disconnect:function(){ct.get(this).disconnect()},update:function(p){var h=this,_=lt.get(h)===document?"Document":"ShadowRoot";if(!Array.isArray(p))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+_+": Iterator getter is not callable.");if(!p.every(nt))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+_+": Failed to convert value to 'CSSStyleSheet'");if(p.some(Bt))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+_+": Can't adopt non-constructed stylesheets");h.sheets=p;var D=Re.get(h),F=c(p),L=d(D,F);L.forEach(function(Ne){m(ae(Ne,h)),at(Ne,h)}),Re.set(h,F),h.isConnected()&&F.length>0&&Gt(h)}},window.CSSStyleSheet=Wt,Uo(Document),"ShadowRoot"in window){Uo(ShadowRoot);var Ho=Element.prototype,Nr=Ho.attachShadow;Ho.attachShadow=function(h){var _=Nr.call(this,h);return h.mode==="closed"&&o.set(this,_),_}}var dt=Ae(document);dt.isConnected()?dt.connect():document.addEventListener("DOMContentLoaded",dt.connect.bind(dt))})();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fr=Symbol.for(""),ua=t=>{if((t==null?void 0:t.r)===fr)return t==null?void 0:t._$litStatic$},pa=t=>{if(t._$litStatic$!==void 0)return t._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},mt=(t,...e)=>({_$litStatic$:e.reduce((o,i,r)=>o+pa(i)+t[r+1],t[0]),r:fr}),_i=new Map,ma=t=>(e,...o)=>{const i=o.length;let r,n;const a=[],l=[];let s=0,c=!1,d;for(;s<i;){for(d=e[s];s<i&&(n=o[s],(r=ua(n))!==void 0);)d+=r+e[++s],c=!0;s!==i&&l.push(n),a.push(d),s++}if(s===i&&a.push(e[i]),c){const m=a.join("$$lit$$");e=_i.get(m),e===void 0&&(a.raw=a,_i.set(m,e=a)),o=l}return t(e,...o)},ha=ma(b),va="modulepreload",ga=function(t){return"/"+t},Ei={},g=function(t,e,o){return!e||e.length===0?t():(document.getElementsByTagName("link"),Promise.all(e.map(i=>{if(i=ga(i),i in Ei)return;Ei[i]=!0;const r=i.endsWith(".css"),n=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${n}`))return;const a=document.createElement("link");if(a.rel=r?"stylesheet":va,r||(a.as="script",a.crossOrigin=""),a.href=i,document.head.appendChild(a),r)return new Promise((l,s)=>{a.addEventListener("load",l),a.addEventListener("error",()=>s(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t()).catch(i=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}))};function v(t,e,o,i){var r=arguments.length,n=r<3?e:i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(a=t[l])&&(n=(r<3?a(n):r>3?a(e,o,n):a(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}function fa(t){var e;const o=[];for(;t&&t.parentNode;){const i=ho(t);if(i.nodeId!==-1){if((e=i.element)!=null&&e.tagName.startsWith("FLOW-CONTAINER-"))break;o.push(i)}t=t.parentElement?t.parentElement:t.parentNode.host}return o.reverse()}function ho(t){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,i=Object.keys(o);for(const r of i){const n=o[r];if(n.getNodeId){const a=n.getNodeId(t);if(a>=0)return{nodeId:a,uiId:n.getUIId(),element:t}}}}return{nodeId:-1,uiId:-1,element:void 0}}function ba(t,e){if(t.contains(e))return!0;let o=e;const i=e.ownerDocument;for(;o&&o!==i&&o!==t;)o=o.parentNode||(o instanceof ShadowRoot?o.host:null);return o===t}const ya=(t,e)=>{const o=t[e];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((i,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e)))})};var R;(function(t){t.text="text",t.checkbox="checkbox",t.range="range",t.color="color"})(R||(R={}));const te={lumoSize:["--lumo-size-xs","--lumo-size-s","--lumo-size-m","--lumo-size-l","--lumo-size-xl"],lumoSpace:["--lumo-space-xs","--lumo-space-s","--lumo-space-m","--lumo-space-l","--lumo-space-xl"],lumoBorderRadius:["0","--lumo-border-radius-m","--lumo-border-radius-l"],lumoFontSize:["--lumo-font-size-xxs","--lumo-font-size-xs","--lumo-font-size-s","--lumo-font-size-m","--lumo-font-size-l","--lumo-font-size-xl","--lumo-font-size-xxl","--lumo-font-size-xxxl"],lumoTextColor:["--lumo-header-text-color","--lumo-body-text-color","--lumo-secondary-text-color","--lumo-tertiary-text-color","--lumo-disabled-text-color","--lumo-primary-text-color","--lumo-error-text-color","--lumo-success-text-color"],basicBorderSize:["0px","1px","2px","3px"]},xa=Object.freeze(Object.defineProperty({__proto__:null,presets:te},Symbol.toStringTag,{value:"Module"})),le={textColor:{propertyName:"color",displayName:"Text color",editorType:R.color,presets:te.lumoTextColor},fontSize:{propertyName:"font-size",displayName:"Font size",editorType:R.range,presets:te.lumoFontSize,icon:"font"},fontWeight:{propertyName:"font-weight",displayName:"Bold",editorType:R.checkbox,checkedValue:"bold"},fontStyle:{propertyName:"font-style",displayName:"Italic",editorType:R.checkbox,checkedValue:"italic"}},Z={backgroundColor:{propertyName:"background-color",displayName:"Background color",editorType:R.color},borderColor:{propertyName:"border-color",displayName:"Border color",editorType:R.color},borderWidth:{propertyName:"border-width",displayName:"Border width",editorType:R.range,presets:te.basicBorderSize,icon:"square"},borderRadius:{propertyName:"border-radius",displayName:"Border radius",editorType:R.range,presets:te.lumoBorderRadius,icon:"square"},padding:{propertyName:"padding",displayName:"Padding",editorType:R.range,presets:te.lumoSpace,icon:"square"},gap:{propertyName:"gap",displayName:"Spacing",editorType:R.range,presets:te.lumoSpace,icon:"square"}},wa={height:{propertyName:"height",displayName:"Size",editorType:R.range,presets:te.lumoSize,icon:"square"},paddingInline:{propertyName:"padding-inline",displayName:"Padding",editorType:R.range,presets:te.lumoSpace,icon:"square"}},vo={iconColor:{propertyName:"color",displayName:"Icon color",editorType:R.color,presets:te.lumoTextColor},iconSize:{propertyName:"font-size",displayName:"Icon size",editorType:R.range,presets:te.lumoFontSize,icon:"font"}},_a=[Z.backgroundColor,Z.borderColor,Z.borderWidth,Z.borderRadius,Z.padding],Ea=[le.textColor,le.fontSize,le.fontWeight,le.fontStyle],Sa=[vo.iconColor,vo.iconSize],ka=Object.freeze(Object.defineProperty({__proto__:null,fieldProperties:wa,iconProperties:vo,shapeProperties:Z,standardIconProperties:Sa,standardShapeProperties:_a,standardTextProperties:Ea,textProperties:le},Symbol.toStringTag,{value:"Module"}));function br(t){const e=t.charAt(0).toUpperCase()+t.slice(1);return{tagName:t,displayName:e,elements:[{selector:t,displayName:"Element",properties:[Z.backgroundColor,Z.borderColor,Z.borderWidth,Z.borderRadius,Z.padding,le.textColor,le.fontSize,le.fontWeight,le.fontStyle]}]}}const Ca=Object.freeze(Object.defineProperty({__proto__:null,createGenericMetadata:br},Symbol.toStringTag,{value:"Module"})),Ta=t=>ya(Object.assign({"./components/defaults.ts":()=>g(()=>Promise.resolve().then(()=>ka),void 0),"./components/generic.ts":()=>g(()=>Promise.resolve().then(()=>Ca),void 0),"./components/presets.ts":()=>g(()=>Promise.resolve().then(()=>xa),void 0),"./components/vaadin-accordion-heading.ts":()=>g(()=>f(()=>import("./vaadin-accordion-heading-c0acdd6d-C532oU4y.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-accordion-panel.ts":()=>g(()=>f(()=>import("./vaadin-accordion-panel-616e55d6-TpRr2Q-0.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-accordion.ts":()=>g(()=>f(()=>import("./vaadin-accordion-eed3b794-C4x_UakD.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-app-layout.ts":()=>g(()=>f(()=>import("./vaadin-app-layout-e56de2e9-BESartiP.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-avatar.ts":()=>g(()=>f(()=>import("./vaadin-avatar-7599297d-Cey4c3e1.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-big-decimal-field.ts":()=>g(()=>f(()=>import("./vaadin-big-decimal-field-e51def24-CzFMke4m.js"),__vite__mapDeps([0,1,2]),import.meta.url),["assets/vaadin-big-decimal-field-e51def24.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-board-row.ts":()=>g(()=>f(()=>import("./vaadin-board-row-c70d0c55-US9tvAcx.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-board.ts":()=>g(()=>f(()=>import("./vaadin-board-828ebdea-BNkEIde0.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-button.ts":()=>g(()=>f(()=>import("./vaadin-button-2511ad84-CtEhsTkA.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-chart.ts":()=>g(()=>f(()=>import("./vaadin-chart-5192dc15-T04rofh2.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-checkbox-group.ts":()=>g(()=>f(()=>import("./vaadin-checkbox-group-a7c65bf2-BYl8iJdl.js"),__vite__mapDeps([3,1,4]),import.meta.url),["assets/vaadin-checkbox-group-a7c65bf2.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-checkbox-4e68df64.js"]),"./components/vaadin-checkbox.ts":()=>g(()=>f(()=>import("./vaadin-checkbox-4e68df64-BThz5U5s.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-combo-box.ts":()=>g(()=>f(()=>import("./vaadin-combo-box-96451ddd-p3qfP0U9.js"),__vite__mapDeps([5,1]),import.meta.url),["assets/vaadin-combo-box-96451ddd.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-confirm-dialog.ts":()=>g(()=>f(()=>import("./vaadin-confirm-dialog-4d718829-C4TCq13I.js"),__vite__mapDeps([6,2]),import.meta.url),["assets/vaadin-confirm-dialog-4d718829.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-cookie-consent.ts":()=>g(()=>f(()=>import("./vaadin-cookie-consent-46c09f8b-Vfyd_T4A.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-crud.ts":()=>g(()=>f(()=>import("./vaadin-crud-8d161a22-6wFw9oCk.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-custom-field.ts":()=>g(()=>f(()=>import("./vaadin-custom-field-42c85b9e-DhjmgTDV.js"),__vite__mapDeps([7,1]),import.meta.url),["assets/vaadin-custom-field-42c85b9e.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-date-picker.ts":()=>g(()=>f(()=>import("./vaadin-date-picker-f2001167-Bsjp3QoC.js"),__vite__mapDeps([8,1]),import.meta.url),["assets/vaadin-date-picker-f2001167.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-date-time-picker.ts":()=>g(()=>f(()=>import("./vaadin-date-time-picker-c8c047a7-Cus42mS5.js"),__vite__mapDeps([9,1]),import.meta.url),["assets/vaadin-date-time-picker-c8c047a7.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-details-summary.ts":()=>g(()=>f(()=>import("./vaadin-details-summary-351a1448-DnVf85DM.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-details.ts":()=>g(()=>f(()=>import("./vaadin-details-bf336660-BvFAKL15.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-dialog.ts":()=>g(()=>f(()=>import("./vaadin-dialog-53253a08-BD80_xgl.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-email-field.ts":()=>g(()=>f(()=>import("./vaadin-email-field-d7a35f04-CqhwhP4Z.js"),__vite__mapDeps([10,1,2]),import.meta.url),["assets/vaadin-email-field-d7a35f04.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-form-layout.ts":()=>g(()=>f(()=>import("./vaadin-form-layout-47744b1d-BzUGMvq9.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-grid-pro.ts":()=>g(()=>f(()=>import("./vaadin-grid-pro-ff415555-By7FHJLx.js"),__vite__mapDeps([11,4,12,1]),import.meta.url),["assets/vaadin-grid-pro-ff415555.js","assets/vaadin-checkbox-4e68df64.js","assets/vaadin-grid-0a4791c2.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-grid.ts":()=>g(()=>f(()=>import("./vaadin-grid-0a4791c2-5NhYkU1i.js"),__vite__mapDeps([12,4]),import.meta.url),["assets/vaadin-grid-0a4791c2.js","assets/vaadin-checkbox-4e68df64.js"]),"./components/vaadin-horizontal-layout.ts":()=>g(()=>f(()=>import("./vaadin-horizontal-layout-3193943f-BX0da9bi.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-icon.ts":()=>g(()=>f(()=>import("./vaadin-icon-601f36ed-C-HnGCB-.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-integer-field.ts":()=>g(()=>f(()=>import("./vaadin-integer-field-85078932-DtBqRDU8.js"),__vite__mapDeps([13,1,2]),import.meta.url),["assets/vaadin-integer-field-85078932.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-list-box.ts":()=>g(()=>f(()=>import("./vaadin-list-box-d7a8433b-BVywyWKK.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-login-form.ts":()=>g(()=>f(()=>import("./vaadin-login-form-638996c6-CmBnIbGB.js"),__vite__mapDeps([14,1,2]),import.meta.url),["assets/vaadin-login-form-638996c6.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-login-overlay.ts":()=>g(()=>f(()=>import("./vaadin-login-overlay-f8a5db8a-fRlFYEet.js"),__vite__mapDeps([15,1,2]),import.meta.url),["assets/vaadin-login-overlay-f8a5db8a.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-map.ts":()=>g(()=>f(()=>import("./vaadin-map-d40a0116-B2e9oHM5.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-menu-bar.ts":()=>g(()=>f(()=>import("./vaadin-menu-bar-3f5ab096-CsPgn89G.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-message-input.ts":()=>g(()=>f(()=>import("./vaadin-message-input-996ac37c-BOSWiDEG.js"),__vite__mapDeps([16,1]),import.meta.url),["assets/vaadin-message-input-996ac37c.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-message-list.ts":()=>g(()=>f(()=>import("./vaadin-message-list-70a435ba-DMSV0sQC.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-multi-select-combo-box.ts":()=>g(()=>f(()=>import("./vaadin-multi-select-combo-box-a3373557-BKgMNAfJ.js"),__vite__mapDeps([17,1]),import.meta.url),["assets/vaadin-multi-select-combo-box-a3373557.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-notification.ts":()=>g(()=>f(()=>import("./vaadin-notification-bd6eb776-DsV-Pef2.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-number-field.ts":()=>g(()=>f(()=>import("./vaadin-number-field-cb3ee8b2-D-7FSH4c.js"),__vite__mapDeps([18,1,2]),import.meta.url),["assets/vaadin-number-field-cb3ee8b2.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-password-field.ts":()=>g(()=>f(()=>import("./vaadin-password-field-d289cb18-B0hWA2_-.js"),__vite__mapDeps([19,1,2]),import.meta.url),["assets/vaadin-password-field-d289cb18.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-progress-bar.ts":()=>g(()=>f(()=>import("./vaadin-progress-bar-309ecf1f-wYlqzFGr.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-radio-group.ts":()=>g(()=>f(()=>import("./vaadin-radio-group-88b5afd8-B-ye9SoE.js"),__vite__mapDeps([20,1]),import.meta.url),["assets/vaadin-radio-group-88b5afd8.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-rich-text-editor.ts":()=>g(()=>f(()=>import("./vaadin-rich-text-editor-8cd892f2-DMg_ewEl.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-scroller.ts":()=>g(()=>f(()=>import("./vaadin-scroller-35e68818-JgVmjSrj.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-select.ts":()=>g(()=>f(()=>import("./vaadin-select-df6e9947-BktKJpLf.js"),__vite__mapDeps([21,1]),import.meta.url),["assets/vaadin-select-df6e9947.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-side-nav-item.ts":()=>g(()=>f(()=>import("./vaadin-side-nav-item-34918f92-D0zASjci.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-side-nav.ts":()=>g(()=>f(()=>import("./vaadin-side-nav-ba80d91d-7R-86hEn.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-split-layout.ts":()=>g(()=>f(()=>import("./vaadin-split-layout-80c92131-BEzMF68T.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-spreadsheet.ts":()=>g(()=>f(()=>import("./vaadin-spreadsheet-59d8c5ef-DqWck8NF.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-tab.ts":()=>g(()=>f(()=>import("./vaadin-tab-aaf32809-2hz9oO2X.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-tabs.ts":()=>g(()=>f(()=>import("./vaadin-tabs-d9a5e24e-lqhe27nG.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-tabsheet.ts":()=>g(()=>f(()=>import("./vaadin-tabsheet-dd99ed9a-CNPq90Cq.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-text-area.ts":()=>g(()=>f(()=>import("./vaadin-text-area-83627ebc-BYBKyrnW.js"),__vite__mapDeps([22,1,2]),import.meta.url),["assets/vaadin-text-area-83627ebc.js","assets/vaadin-text-field-0b3db014.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-text-field.ts":()=>g(()=>f(()=>import("./vaadin-text-field-0b3db014-Bhe5HKkb.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-time-picker.ts":()=>g(()=>f(()=>import("./vaadin-time-picker-715ec415-DRiaHBAG.js"),__vite__mapDeps([23,1]),import.meta.url),["assets/vaadin-time-picker-715ec415.js","assets/vaadin-text-field-0b3db014.js"]),"./components/vaadin-upload.ts":()=>g(()=>f(()=>import("./vaadin-upload-d3c162ed-De-xPrQF.js"),__vite__mapDeps([24,2]),import.meta.url),["assets/vaadin-upload-d3c162ed.js","assets/vaadin-button-2511ad84.js"]),"./components/vaadin-vertical-layout.ts":()=>g(()=>f(()=>import("./vaadin-vertical-layout-ad4174c4-BaP-0fXb.js"),__vite__mapDeps([]),import.meta.url),[]),"./components/vaadin-virtual-list.ts":()=>g(()=>f(()=>import("./vaadin-virtual-list-96896203-D9H5VbTQ.js"),__vite__mapDeps([]),import.meta.url),[])}),`./components/${t}.ts`);class $a{constructor(e=Ta){this.loader=e,this.metadata={}}async getMetadata(e){var o;const i=(o=e.element)==null?void 0:o.localName;if(!i)return null;if(!i.startsWith("vaadin-"))return br(i);let r=this.metadata[i];if(r)return r;try{r=(await this.loader(i)).default,this.metadata[i]=r}catch{console.warn(`Failed to load metadata for component: ${i}`)}return r||null}}const Aa=new $a,wt={crosshair:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
   <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
   <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
   <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
   <path d="M9 12l6 0"></path>
   <path d="M12 9l0 6"></path>
</svg>`,square:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
</svg>`,font:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 20l3 0"></path>
   <path d="M14 20l7 0"></path>
   <path d="M6.9 15l6.9 0"></path>
   <path d="M10.2 6.3l5.8 13.7"></path>
   <path d="M5 20l6 -16l2 0l7 16"></path>
</svg>`,undo:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
</svg>`,redo:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
</svg>`,cross:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>`};var Ve;(function(t){t.disabled="disabled",t.enabled="enabled",t.missing_theme="missing_theme"})(Ve||(Ve={}));var I;(function(t){t.local="local",t.global="global"})(I||(I={}));function ro(t,e){return`${t}|${e}`}class he{constructor(e){this._properties={},this._metadata=e}get metadata(){return this._metadata}get properties(){return Object.values(this._properties)}getPropertyValue(e,o){return this._properties[ro(e,o)]||null}updatePropertyValue(e,o,i,r){if(!i){delete this._properties[ro(e,o)];return}let n=this.getPropertyValue(e,o);n?(n.value=i,n.modified=r||!1):(n={elementSelector:e,propertyName:o,value:i,modified:r||!1},this._properties[ro(e,o)]=n)}addPropertyValues(e){e.forEach(o=>{this.updatePropertyValue(o.elementSelector,o.propertyName,o.value,o.modified)})}getPropertyValuesForElement(e){return this.properties.filter(o=>o.elementSelector===e)}static combine(...e){if(e.length<2)throw new Error("Must provide at least two themes");const o=new he(e[0].metadata);return e.forEach(i=>o.addPropertyValues(i.properties)),o}static fromServerRules(e,o,i){const r=new he(e);return e.elements.forEach(n=>{const a=De(n,o),l=i.find(s=>s.selector===a.replace(/ > /g,">"));l&&n.properties.forEach(s=>{const c=l.properties[s.propertyName];c&&r.updatePropertyValue(n.selector,s.propertyName,c,!0)})}),r}}function De(t,e){const o=t.selector;if(e.themeScope===I.global)return o;if(!e.localClassName)throw new Error("Can not build local scoped selector without instance class name");const i=o.match(/^[\w\d-_]+/),r=i&&i[0];if(!r)throw new Error(`Selector does not start with a tag name: ${o}`);return`${r}.${e.localClassName}${o.substring(r.length,o.length)}`}function Ra(t,e,o,i){const r=De(t,e),n={[o]:i};return o==="border-width"&&(parseInt(i)>0?n["border-style"]="solid":n["border-style"]=""),{selector:r,properties:n}}function Na(t){const e=Object.entries(t.properties).map(([o,i])=>`${o}: ${i};`).join(" ");return`${t.selector} { ${e} }`}let ht,Si="";function Ao(t){ht||(ht=new CSSStyleSheet,document.adoptedStyleSheets=[...document.adoptedStyleSheets,ht]),Si+=t.cssText,ht.replaceSync(Si)}const yr=x`
  .editor-row {
    display: flex;
    align-items: baseline;
    padding: var(--theme-editor-section-horizontal-padding);
    gap: 10px;
  }

  .editor-row > .label {
    flex: 0 0 auto;
    width: 120px;
  }

  .editor-row > .editor {
    flex: 1 1 0;
  }
`,ki="__vaadin-theme-editor-measure-element",Ci=/((::before)|(::after))$/,Ti=/::part\(([\w\d_-]+)\)$/;Ao(x`
  .__vaadin-theme-editor-measure-element {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
`);async function Pa(t){const e=new he(t),o=document.createElement(t.tagName);o.classList.add(ki),document.body.append(o),t.setupElement&&await t.setupElement(o);const i={themeScope:I.local,localClassName:ki};try{t.elements.forEach(r=>{$i(o,r,i,!0);let n=De(r,i);const a=n.match(Ci);n=n.replace(Ci,"");const l=n.match(Ti),s=n.replace(Ti,"");let c=document.querySelector(s);if(c&&l){const u=`[part~="${l[1]}"]`;c=c.shadowRoot.querySelector(u)}if(!c)return;c.style.transition="none";const d=a?a[1]:null,m=getComputedStyle(c,d);r.properties.forEach(u=>{const y=m.getPropertyValue(u.propertyName)||u.defaultValue||"";e.updatePropertyValue(r.selector,u.propertyName,y)}),$i(o,r,i,!1)})}finally{try{t.cleanupElement&&await t.cleanupElement(o)}finally{o.remove()}}return e}function $i(t,e,o,i){if(e.stateAttribute){if(e.stateElementSelector){const r=De({...e,selector:e.stateElementSelector},o);t=document.querySelector(r)}t&&(i?t.setAttribute(e.stateAttribute,""):t.removeAttribute(e.stateAttribute))}}function Ai(t){return t.trim()}function Ia(t){const e=t.element;if(!e)return null;const o=e.querySelector("label");if(o&&o.textContent)return Ai(o.textContent);const i=e.textContent;return i?Ai(i):null}class Oa{constructor(){this._localClassNameMap=new Map}get stylesheet(){return this.ensureStylesheet(),this._stylesheet}add(e){this.ensureStylesheet(),this._stylesheet.replaceSync(e)}clear(){this.ensureStylesheet(),this._stylesheet.replaceSync("")}previewLocalClassName(e,o){if(!e)return;const i=this._localClassNameMap.get(e);i&&(e.classList.remove(i),e.overlayClass=null),o?(e.classList.add(o),e.overlayClass=o,this._localClassNameMap.set(e,o)):this._localClassNameMap.delete(e)}ensureStylesheet(){this._stylesheet||(this._stylesheet=new CSSStyleSheet,this._stylesheet.replaceSync(""),document.adoptedStyleSheets=[...document.adoptedStyleSheets,this._stylesheet])}}const be=new Oa;var Y;(function(t){t.response="themeEditorResponse",t.loadComponentMetadata="themeEditorComponentMetadata",t.setLocalClassName="themeEditorLocalClassName",t.setCssRules="themeEditorRules",t.loadRules="themeEditorLoadRules",t.history="themeEditorHistory",t.openCss="themeEditorOpenCss",t.markAsUsed="themeEditorMarkAsUsed"})(Y||(Y={}));var go;(function(t){t.ok="ok",t.error="error"})(go||(go={}));class La{constructor(e){this.pendingRequests={},this.requestCounter=0,this.wrappedConnection=e;const o=this.wrappedConnection.onMessage;this.wrappedConnection.onMessage=i=>{i.command===Y.response?this.handleResponse(i.data):o.call(this.wrappedConnection,i)}}sendRequest(e,o){const i=(this.requestCounter++).toString(),r=o.uiId??this.getGlobalUiId();return new Promise((n,a)=>{this.wrappedConnection.send(e,{...o,requestId:i,uiId:r}),this.pendingRequests[i]={resolve:n,reject:a}})}handleResponse(e){const o=this.pendingRequests[e.requestId];if(!o){console.warn("Received response for unknown request");return}delete this.pendingRequests[e.requestId],e.code===go.ok?o.resolve(e):o.reject(e)}loadComponentMetadata(e){return this.sendRequest(Y.loadComponentMetadata,{nodeId:e.nodeId})}setLocalClassName(e,o){return this.sendRequest(Y.setLocalClassName,{nodeId:e.nodeId,className:o})}setCssRules(e){return this.sendRequest(Y.setCssRules,{rules:e})}loadRules(e){return this.sendRequest(Y.loadRules,{selectors:e})}markAsUsed(){return this.sendRequest(Y.markAsUsed,{})}undo(e){return this.sendRequest(Y.history,{undo:e})}redo(e){return this.sendRequest(Y.history,{redo:e})}openCss(e){return this.sendRequest(Y.openCss,{selector:e})}getGlobalUiId(){if(this.globalUiId===void 0){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,i=Object.keys(o);for(const r of i){const n=o[r];if(n.getNodeId){this.globalUiId=n.getUIId();break}}}}return this.globalUiId??-1}}const z={index:-1,entries:[]};class za{constructor(e){this.api=e}get allowUndo(){return z.index>=0}get allowRedo(){return z.index<z.entries.length-1}get allowedActions(){return{allowUndo:this.allowUndo,allowRedo:this.allowRedo}}push(e,o,i){const r={requestId:e,execute:o,rollback:i};if(z.index++,z.entries=z.entries.slice(0,z.index),z.entries.push(r),o)try{o()}catch(n){console.error("Execute history entry failed",n)}return this.allowedActions}async undo(){if(!this.allowUndo)return this.allowedActions;const e=z.entries[z.index];z.index--;try{await this.api.undo(e.requestId),e.rollback&&e.rollback()}catch(o){console.error("Undo failed",o)}return this.allowedActions}async redo(){if(!this.allowRedo)return this.allowedActions;z.index++;const e=z.entries[z.index];try{await this.api.redo(e.requestId),e.execute&&e.execute()}catch(o){console.error("Redo failed",o)}return this.allowedActions}static clear(){z.entries=[],z.index=-1}}class Ma extends CustomEvent{constructor(e,o,i){super("theme-property-value-change",{bubbles:!0,composed:!0,detail:{element:e,property:o,value:i}})}}class q extends N{constructor(){super(...arguments),this.value=""}static get styles(){return[yr,x`
        :host {
          display: block;
        }

        .editor-row .label .modified {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: orange;
          border-radius: 3px;
          margin-left: 3px;
        }
      `]}update(e){super.update(e),(e.has("propertyMetadata")||e.has("theme"))&&this.updateValueFromTheme()}render(){var e;return b`
      <div class="editor-row">
        <div class="label">
          ${this.propertyMetadata.displayName}
          ${(e=this.propertyValue)!=null&&e.modified?b`<span class="modified"></span>`:null}
        </div>
        <div class="editor">${this.renderEditor()}</div>
      </div>
    `}updateValueFromTheme(){var e;this.propertyValue=this.theme.getPropertyValue(this.elementMetadata.selector,this.propertyMetadata.propertyName),this.value=((e=this.propertyValue)==null?void 0:e.value)||""}dispatchChange(e){this.dispatchEvent(new Ma(this.elementMetadata,this.propertyMetadata,e))}}v([w({})],q.prototype,"elementMetadata",void 0);v([w({})],q.prototype,"propertyMetadata",void 0);v([w({})],q.prototype,"theme",void 0);v([P()],q.prototype,"propertyValue",void 0);v([P()],q.prototype,"value",void 0);class Nt{get values(){return this._values}get rawValues(){return this._rawValues}constructor(e){if(this._values=[],this._rawValues={},e){const o=e.propertyName,i=e.presets??[];this._values=(i||[]).map(n=>n.startsWith("--")?`var(${n})`:n);const r=document.createElement("div");r.style.borderStyle="solid",r.style.visibility="hidden",document.body.append(r);try{this._values.forEach(n=>{r.style.setProperty(o,n);const a=getComputedStyle(r);this._rawValues[n]=a.getPropertyValue(o).trim()})}finally{r.remove()}}}tryMapToRawValue(e){return this._rawValues[e]??e}tryMapToPreset(e){return this.findPreset(e)??e}findPreset(e){const o=e&&e.trim();return this.values.find(i=>this._rawValues[i]===o)}}class Ri extends CustomEvent{constructor(e){super("change",{detail:{value:e}})}}let Pt=class extends N{constructor(){super(...arguments),this.value="",this.showClearButton=!1}static get styles(){return x`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem 0.375rem;
        color: inherit;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border: none;
      }

      button {
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      button svg {
        width: 16px;
        height: 16px;
      }

      button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      :host(.show-clear-button) input {
        padding-right: 20px;
      }

      :host(.show-clear-button) button {
        display: block;
      }
    `}update(t){super.update(t),t.has("showClearButton")&&(this.showClearButton?this.classList.add("show-clear-button"):this.classList.remove("show-clear-button"))}render(){return b`
      <input class="input" .value=${this.value} @change=${this.handleInputChange} />
      <button @click=${this.handleClearClick}>${wt.cross}</button>
    `}handleInputChange(t){const e=t.target;this.dispatchEvent(new Ri(e.value))}handleClearClick(){this.dispatchEvent(new Ri(""))}};v([w({})],Pt.prototype,"value",void 0);v([w({})],Pt.prototype,"showClearButton",void 0);Pt=v([V("vaadin-dev-tools-theme-text-input")],Pt);class Va extends CustomEvent{constructor(e){super("class-name-change",{detail:{value:e}})}}let Ze=class extends N{constructor(){super(...arguments),this.editedClassName="",this.invalid=!1}static get styles(){return[yr,x`
        .editor-row {
          padding-top: 0;
        }

        .editor-row .editor .error {
          display: inline-block;
          color: var(--dev-tools-red-color);
          margin-top: 4px;
        }
      `]}update(t){super.update(t),t.has("className")&&(this.editedClassName=this.className,this.invalid=!1)}render(){return b` <div class="editor-row local-class-name">
      <div class="label">CSS class name</div>
      <div class="editor">
        <vaadin-dev-tools-theme-text-input
          type="text"
          .value=${this.editedClassName}
          @change=${this.handleInputChange}
        ></vaadin-dev-tools-theme-text-input>
        ${this.invalid?b`<br /><span class="error">Please enter a valid CSS class name</span>`:null}
      </div>
    </div>`}handleInputChange(t){this.editedClassName=t.detail.value;const e=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;this.invalid=!this.editedClassName.match(e),!this.invalid&&this.editedClassName!==this.className&&this.dispatchEvent(new Va(this.editedClassName))}};v([w({})],Ze.prototype,"className",void 0);v([P()],Ze.prototype,"editedClassName",void 0);v([P()],Ze.prototype,"invalid",void 0);Ze=v([V("vaadin-dev-tools-theme-class-name-editor")],Ze);class Da extends CustomEvent{constructor(e){super("scope-change",{detail:{value:e}})}}Ao(x`
  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] {
    --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
    z-index: 100000 !important;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector']::part(overlay) {
    background: #333;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item {
    color: rgba(255, 255, 255, 0.8);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(content) {
    font-size: 13px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item .title {
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark) {
    margin: 6px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark)::before {
    color: rgba(255, 255, 255, 0.95);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`);let et=class extends N{constructor(){super(...arguments),this.value=I.local}static get styles(){return x`
      vaadin-select {
        --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
        width: 100px;
      }

      vaadin-select::part(input-field) {
        background: rgba(0, 0, 0, 0.2);
      }

      vaadin-select vaadin-select-value-button,
      vaadin-select::part(toggle-button) {
        color: var(--dev-tools-text-color);
      }

      vaadin-select:hover vaadin-select-value-button,
      vaadin-select:hover::part(toggle-button) {
        color: var(--dev-tools-text-color-emphasis);
      }

      vaadin-select vaadin-select-item {
        font-size: 13px;
      }
    `}update(t){var e;super.update(t),t.has("metadata")&&((e=this.select)==null||e.requestContentUpdate())}render(){return b` <vaadin-select
      theme="small vaadin-dev-tools-theme-scope-selector"
      .value=${this.value}
      .renderer=${this.selectRenderer.bind(this)}
      @value-changed=${this.handleValueChange}
    ></vaadin-select>`}selectRenderer(t){var e;const o=((e=this.metadata)==null?void 0:e.displayName)||"Component",i=`${o}s`;we(b`
        <vaadin-list-box>
          <vaadin-item value=${I.local} label="Local">
            <span class="title">Local</span>
            <br />
            <span>Edit styles for this ${o}</span>
          </vaadin-item>
          <vaadin-item value=${I.global} label="Global">
            <span class="title">Global</span>
            <br />
            <span>Edit styles for all ${i}</span>
          </vaadin-item>
        </vaadin-list-box>
      `,t)}handleValueChange(t){const e=t.detail.value;e!==this.value&&this.dispatchEvent(new Da(e))}};v([w({})],et.prototype,"value",void 0);v([w({})],et.prototype,"metadata",void 0);v([rt("vaadin-select")],et.prototype,"select",void 0);et=v([V("vaadin-dev-tools-theme-scope-selector")],et);let Ni=class extends q{static get styles(){return[q.styles,x`
        .editor-row {
          align-items: center;
        }
      `]}handleInputChange(t){const e=t.target.checked?this.propertyMetadata.checkedValue:"";this.dispatchChange(e||"")}renderEditor(){const t=this.value===this.propertyMetadata.checkedValue;return b` <input type="checkbox" .checked=${t} @change=${this.handleInputChange} /> `}};Ni=v([V("vaadin-dev-tools-theme-checkbox-property-editor")],Ni);let Pi=class extends q{handleInputChange(t){this.dispatchChange(t.detail.value)}renderEditor(){var t;return b`
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}};Pi=v([V("vaadin-dev-tools-theme-text-property-editor")],Pi);let It=class extends q{constructor(){super(...arguments),this.selectedPresetIndex=-1,this.presets=new Nt}static get styles(){return[q.styles,x`
        :host {
          --preset-count: 3;
          --slider-bg: #fff;
          --slider-border: #333;
        }

        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-row .input {
          flex: 0 0 auto;
          width: 80px;
        }

        .slider-wrapper {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #aaa;
        }

        .icon.prefix > svg {
          transform: scale(0.75);
        }

        .slider {
          flex: 1 1 0;
          -webkit-appearance: none;
          background: linear-gradient(to right, #666, #666 2px, transparent 2px);
          background-size: calc((100% - 13px) / (var(--preset-count) - 1)) 8px;
          background-position: 5px 50%;
          background-repeat: repeat-x;
        }

        .slider::-webkit-slider-runnable-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-moz-range-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .custom-value {
          opacity: 0.5;
        }

        .custom-value:hover,
        .custom-value:focus-within {
          opacity: 1;
        }

        .custom-value:not(:hover, :focus-within) {
          --slider-bg: #333;
          --slider-border: #666;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Nt(this.propertyMetadata)),super.update(t)}renderEditor(){var t;const e={"slider-wrapper":!0,"custom-value":this.selectedPresetIndex<0},o=this.presets.values.length;return b`
      <div class=${$o(e)}>
        ${null}
        <input
          type="range"
          class="slider"
          style="--preset-count: ${o}"
          step="1"
          min="0"
          .max=${(o-1).toString()}
          .value=${this.selectedPresetIndex}
          @input=${this.handleSliderInput}
          @change=${this.handleSliderChange}
        />
        ${null}
      </div>
      <vaadin-dev-tools-theme-text-input
        class="input"
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleValueChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleSliderInput(t){const e=t.target,o=parseInt(e.value),i=this.presets.values[o];this.selectedPresetIndex=o,this.value=this.presets.rawValues[i]}handleSliderChange(){this.dispatchChange(this.value)}handleValueChange(t){this.value=t.detail.value,this.updateSliderValue(),this.dispatchChange(this.value)}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||""),this.updateSliderValue()}updateSliderValue(){const t=this.presets.findPreset(this.value);this.selectedPresetIndex=t?this.presets.values.indexOf(t):-1}};v([P()],It.prototype,"selectedPresetIndex",void 0);v([P()],It.prototype,"presets",void 0);It=v([V("vaadin-dev-tools-theme-range-property-editor")],It);const je=(t,e=0,o=1)=>t>o?o:t<e?e:t,U=(t,e=0,o=Math.pow(10,e))=>Math.round(o*t)/o,xr=({h:t,s:e,v:o,a:i})=>{const r=(200-e)*o/100;return{h:U(t),s:U(r>0&&r<200?e*o/100/(r<=100?r:200-r)*100:0),l:U(r/2),a:U(i,2)}},fo=t=>{const{h:e,s:o,l:i}=xr(t);return`hsl(${e}, ${o}%, ${i}%)`},no=t=>{const{h:e,s:o,l:i,a:r}=xr(t);return`hsla(${e}, ${o}%, ${i}%, ${r})`},ja=({h:t,s:e,v:o,a:i})=>{t=t/360*6,e=e/100,o=o/100;const r=Math.floor(t),n=o*(1-e),a=o*(1-(t-r)*e),l=o*(1-(1-t+r)*e),s=r%6;return{r:U([o,a,n,n,l,o][s]*255),g:U([l,o,o,a,n,n][s]*255),b:U([n,n,l,o,o,a][s]*255),a:U(i,2)}},Ua=t=>{const{r:e,g:o,b:i,a:r}=ja(t);return`rgba(${e}, ${o}, ${i}, ${r})`},Fa=t=>{const e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return e?Ba({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},Ba=({r:t,g:e,b:o,a:i})=>{const r=Math.max(t,e,o),n=r-Math.min(t,e,o),a=n?r===t?(e-o)/n:r===e?2+(o-t)/n:4+(t-e)/n:0;return{h:U(60*(a<0?a+6:a)),s:U(r?n/r*100:0),v:U(r/255*100),a:i}},Ha=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},Wa=(t,e)=>t.replace(/\s/g,"")===e.replace(/\s/g,""),Ii={},wr=t=>{let e=Ii[t];return e||(e=document.createElement("template"),e.innerHTML=t,Ii[t]=e),e},Ro=(t,e,o)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:o}))};let Le=!1;const bo=t=>"touches"in t,qa=t=>Le&&!bo(t)?!1:(Le||(Le=bo(t)),!0),Oi=(t,e)=>{const o=bo(e)?e.touches[0]:e,i=t.el.getBoundingClientRect();Ro(t.el,"move",t.getMove({x:je((o.pageX-(i.left+window.pageXOffset))/i.width),y:je((o.pageY-(i.top+window.pageYOffset))/i.height)}))},Ga=(t,e)=>{const o=e.keyCode;o>40||t.xy&&o<37||o<33||(e.preventDefault(),Ro(t.el,"move",t.getMove({x:o===39?.01:o===37?-.01:o===34?.05:o===33?-.05:o===35?1:o===36?-1:0,y:o===40?.01:o===38?-.01:0},!0)))};class No{constructor(e,o,i,r){const n=wr(`<div role="slider" tabindex="0" part="${o}" ${i}><div part="${o}-pointer"></div></div>`);e.appendChild(n.content.cloneNode(!0));const a=e.querySelector(`[part=${o}]`);a.addEventListener("mousedown",this),a.addEventListener("touchstart",this),a.addEventListener("keydown",this),this.el=a,this.xy=r,this.nodes=[a.firstChild,a]}set dragging(e){const o=e?document.addEventListener:document.removeEventListener;o(Le?"touchmove":"mousemove",this),o(Le?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!qa(e)||!Le&&e.button!=0)return;this.el.focus(),Oi(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),Oi(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":Ga(this,e);break}}style(e){e.forEach((o,i)=>{for(const r in o)this.nodes[i].style.setProperty(r,o[r])})}}class Ka extends No{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:fo({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${U(e)}`)}getMove(e,o){return{h:o?je(this.h+e.x*360,0,360):360*e.x}}}class Ja extends No{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:fo(e)},{"background-color":fo({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${U(e.s)}%, Brightness ${U(e.v)}%`)}getMove(e,o){return{s:o?je(this.hsva.s+e.x*100,0,100):e.x*100,v:o?je(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const Ya=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',Xa="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",Qa="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",vt=Symbol("same"),ao=Symbol("color"),Li=Symbol("hsva"),so=Symbol("update"),zi=Symbol("parts"),Ot=Symbol("css"),Lt=Symbol("sliders");let Za=class extends HTMLElement{static get observedAttributes(){return["color"]}get[Ot](){return[Ya,Xa,Qa]}get[Lt](){return[Ja,Ka]}get color(){return this[ao]}set color(t){if(!this[vt](t)){const e=this.colorModel.toHsva(t);this[so](e),this[ao]=t}}constructor(){super();const t=wr(`<style>${this[Ot].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(t.content.cloneNode(!0)),e.addEventListener("move",this),this[zi]=this[Lt].map(o=>new o(e))}connectedCallback(){if(this.hasOwnProperty("color")){const t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,e,o){const i=this.colorModel.fromAttr(o);this[vt](i)||(this.color=i)}handleEvent(t){const e=this[Li],o={...e,...t.detail};this[so](o);let i;!Ha(o,e)&&!this[vt](i=this.colorModel.fromHsva(o))&&(this[ao]=i,Ro(this,"color-changed",{value:i}))}[vt](t){return this.color&&this.colorModel.equal(t,this.color)}[so](t){this[Li]=t,this[zi].forEach(e=>e.update(t))}};class es extends No{constructor(e){super(e,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(e){this.hsva=e;const o=no({...e,a:0}),i=no({...e,a:1}),r=e.a*100;this.style([{left:`${r}%`,color:no(e)},{"--gradient":`linear-gradient(90deg, ${o}, ${i}`}]);const n=U(r);this.el.setAttribute("aria-valuenow",`${n}`),this.el.setAttribute("aria-valuetext",`${n}%`)}getMove(e,o){return{a:o?je(this.hsva.a+e.x):e.x}}}const ts=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;class os extends Za{get[Ot](){return[...super[Ot],ts]}get[Lt](){return[...super[Lt],es]}}const is={defaultColor:"rgba(0, 0, 0, 1)",toHsva:Fa,fromHsva:Ua,equal:Wa,fromAttr:t=>t};class rs extends os{get colorModel(){return is}}/**
* @license
* Copyright (c) 2017 - 2023 Vaadin Ltd.
* This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/function ns(t){const e=[];for(;t;){if(t.nodeType===Node.DOCUMENT_NODE){e.push(t);break}if(t.nodeType===Node.DOCUMENT_FRAGMENT_NODE){e.push(t),t=t.host;continue}if(t.assignedSlot){t=t.assignedSlot;continue}t=t.parentNode}return e}const lo={start:"top",end:"bottom"},co={start:"left",end:"right"},Mi=new ResizeObserver(t=>{setTimeout(()=>{t.forEach(e=>{e.target.__overlay&&e.target.__overlay._updatePosition()})})}),as=t=>class extends t{static get properties(){return{positionTarget:{type:Object,value:null},horizontalAlign:{type:String,value:"start"},verticalAlign:{type:String,value:"top"},noHorizontalOverlap:{type:Boolean,value:!1},noVerticalOverlap:{type:Boolean,value:!1},requiredVerticalSpace:{type:Number,value:0}}}static get observers(){return["__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)","__overlayOpenedChanged(opened, positionTarget)"]}constructor(){super(),this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}__addUpdatePositionEventListeners(){window.addEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes=ns(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)})}__removeUpdatePositionEventListeners(){window.removeEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null)}__overlayOpenedChanged(e,o){if(this.__removeUpdatePositionEventListeners(),o&&(o.__overlay=null,Mi.unobserve(o),e&&(this.__addUpdatePositionEventListeners(),o.__overlay=this,Mi.observe(o))),e){const i=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(r=>{this.__margins[r]=parseInt(i[r],10)})),this.setAttribute("dir",i.direction),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__positionSettingsChanged(){this._updatePosition()}__onScroll(e){this.contains(e.target)||this._updatePosition()}_updatePosition(){if(!this.positionTarget||!this.opened)return;const e=this.positionTarget.getBoundingClientRect(),o=this.__shouldAlignStartVertically(e);this.style.justifyContent=o?"flex-start":"flex-end";const i=this.__isRTL,r=this.__shouldAlignStartHorizontally(e,i),n=!i&&r||i&&!r;this.style.alignItems=n?"flex-start":"flex-end";const a=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,a,this.noVerticalOverlap,lo,this,o),s=this.__calculatePositionInOneDimension(e,a,this.noHorizontalOverlap,co,this,r);Object.assign(this.style,l,s),this.toggleAttribute("bottom-aligned",!o),this.toggleAttribute("top-aligned",o),this.toggleAttribute("end-aligned",!n),this.toggleAttribute("start-aligned",n)}__shouldAlignStartHorizontally(e,o){const i=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const r=Math.min(window.innerWidth,document.documentElement.clientWidth),n=!o&&this.horizontalAlign==="start"||o&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,i,r,this.__margins,n,this.noHorizontalOverlap,co)}__shouldAlignStartVertically(e){const o=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const i=Math.min(window.innerHeight,document.documentElement.clientHeight),r=this.verticalAlign==="top";return this.__shouldAlignStart(e,o,i,this.__margins,r,this.noVerticalOverlap,lo)}__shouldAlignStart(e,o,i,r,n,a,l){const s=i-e[a?l.end:l.start]-r[l.end],c=e[a?l.start:l.end]-r[l.start],d=n?s:c,m=d>(n?c:s)||d>o;return n===m}__adjustBottomProperty(e,o,i){let r;if(e===o.end){if(o.end===lo.end){const n=Math.min(window.innerHeight,document.documentElement.clientHeight);if(i>n&&this.__oldViewportHeight){const a=this.__oldViewportHeight-n;r=i-a}this.__oldViewportHeight=n}if(o.end===co.end){const n=Math.min(window.innerWidth,document.documentElement.clientWidth);if(i>n&&this.__oldViewportWidth){const a=this.__oldViewportWidth-n;r=i-a}this.__oldViewportWidth=n}}return r}__calculatePositionInOneDimension(e,o,i,r,n,a){const l=a?r.start:r.end,s=a?r.end:r.start,c=parseFloat(n.style[l]||getComputedStyle(n)[l]),d=this.__adjustBottomProperty(l,r,c),m=o[a?r.start:r.end]-e[i===a?r.end:r.start],u=d?`${d}px`:`${c+m*(a?-1:1)}px`;return{[l]:u,[s]:""}}};class ss extends CustomEvent{constructor(e){super("color-picker-change",{detail:{value:e}})}}const _r=x`
  :host {
    --preview-size: 24px;
    --preview-color: rgba(0, 0, 0, 0);
  }

  .preview {
    --preview-bg-size: calc(var(--preview-size) / 2);
    --preview-bg-pos: calc(var(--preview-size) / 4);

    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    position: relative;
    overflow: hidden;
    background: none;
    border: solid 2px #888;
    border-radius: 4px;
    box-sizing: content-box;
  }

  .preview::before,
  .preview::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview::before {
    content: '';
    background: white;
    background-image: linear-gradient(45deg, #666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(45deg, transparent 75%, #666 75%),
      linear-gradient(45deg, #666 25%, transparent 25%);
    background-size: var(--preview-bg-size) var(--preview-bg-size);
    background-position: 0 0, 0 0, calc(var(--preview-bg-pos) * -1) calc(var(--preview-bg-pos) * -1),
      var(--preview-bg-pos) var(--preview-bg-pos);
  }

  .preview::after {
    content: '';
    background-color: var(--preview-color);
  }
`;let tt=class extends N{constructor(){super(...arguments),this.commitValue=!1}static get styles(){return[_r,x`
        #toggle {
          display: block;
        }
      `]}update(t){super.update(t),t.has("value")&&this.overlay&&this.overlay.requestContentUpdate()}firstUpdated(){this.overlay=document.createElement("vaadin-dev-tools-color-picker-overlay"),this.overlay.renderer=this.renderOverlayContent.bind(this),this.overlay.owner=this,this.overlay.positionTarget=this.toggle,this.overlay.noVerticalOverlap=!0,this.overlay.addEventListener("vaadin-overlay-escape-press",this.handleOverlayEscape.bind(this)),this.overlay.addEventListener("vaadin-overlay-close",this.handleOverlayClose.bind(this)),this.append(this.overlay)}render(){const t=this.value||"rgba(0, 0, 0, 0)";return b` <button
      id="toggle"
      class="preview"
      style="--preview-color: ${t}"
      @click=${this.open}
    ></button>`}open(){this.commitValue=!1,this.overlay.opened=!0,this.overlay.style.zIndex="1000000";const t=this.overlay.shadowRoot.querySelector('[part="overlay"]');t.style.background="#333"}renderOverlayContent(t){const e=getComputedStyle(this.toggle,"::after").getPropertyValue("background-color");we(b` <div>
        <vaadin-dev-tools-color-picker-overlay-content
          .value=${e}
          .presets=${this.presets}
          @color-changed=${this.handleColorChange.bind(this)}
        ></vaadin-dev-tools-color-picker-overlay-content>
      </div>`,t)}handleColorChange(t){this.commitValue=!0,this.dispatchEvent(new ss(t.detail.value)),t.detail.close&&(this.overlay.opened=!1,this.handleOverlayClose())}handleOverlayEscape(){this.commitValue=!1}handleOverlayClose(){const t=this.commitValue?"color-picker-commit":"color-picker-cancel";this.dispatchEvent(new CustomEvent(t))}};v([w({})],tt.prototype,"value",void 0);v([w({})],tt.prototype,"presets",void 0);v([rt("#toggle")],tt.prototype,"toggle",void 0);tt=v([V("vaadin-dev-tools-color-picker")],tt);let zt=class extends N{static get styles(){return[_r,x`
        :host {
          display: block;
          padding: 12px;
        }

        .picker::part(saturation),
        .picker::part(hue) {
          margin-bottom: 10px;
        }

        .picker::part(hue),
        .picker::part(alpha) {
          flex: 0 0 20px;
        }

        .picker::part(saturation),
        .picker::part(hue),
        .picker::part(alpha) {
          border-radius: 3px;
        }

        .picker::part(saturation-pointer),
        .picker::part(hue-pointer),
        .picker::part(alpha-pointer) {
          width: 20px;
          height: 20px;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(6, var(--preview-size));
          grid-column-gap: 10px;
          grid-row-gap: 6px;
          margin-top: 16px;
        }
      `]}render(){return b` <div>
      <vaadin-dev-tools-rgba-string-color-picker
        class="picker"
        .color=${this.value}
        @color-changed=${this.handlePickerChange}
      ></vaadin-dev-tools-rgba-string-color-picker>
      ${this.renderSwatches()}
    </div>`}renderSwatches(){if(!this.presets||this.presets.length===0)return;const t=this.presets.map(e=>b` <button
        class="preview"
        style="--preview-color: ${e}"
        @click=${()=>this.selectPreset(e)}
      ></button>`);return b` <div class="swatches">${t}</div>`}handlePickerChange(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t.detail.value}}))}selectPreset(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t,close:!0}}))}};v([w({})],zt.prototype,"value",void 0);v([w({})],zt.prototype,"presets",void 0);zt=v([V("vaadin-dev-tools-color-picker-overlay-content")],zt);customElements.whenDefined("vaadin-overlay").then(()=>{const t=customElements.get("vaadin-overlay");class e extends as(t){}customElements.define("vaadin-dev-tools-color-picker-overlay",e)});customElements.define("vaadin-dev-tools-rgba-string-color-picker",rs);let Vi=class extends q{constructor(){super(...arguments),this.presets=new Nt}static get styles(){return[q.styles,x`
        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new Nt(this.propertyMetadata)),super.update(t)}renderEditor(){var t;return b`
      <vaadin-dev-tools-color-picker
        .value=${this.value}
        .presets=${this.presets.values}
        @color-picker-change=${this.handleColorPickerChange}
        @color-picker-commit=${this.handleColorPickerCommit}
        @color-picker-cancel=${this.handleColorPickerCancel}
      ></vaadin-dev-tools-color-picker>
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleInputChange(t){this.value=t.detail.value,this.dispatchChange(this.value)}handleColorPickerChange(t){this.value=t.detail.value}handleColorPickerCommit(){this.dispatchChange(this.value)}handleColorPickerCancel(){this.updateValueFromTheme()}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||"")}};Vi=v([V("vaadin-dev-tools-theme-color-property-editor")],Vi);class ls extends CustomEvent{constructor(e){super("open-css",{detail:{element:e}})}}let Mt=class extends N{static get styles(){return x`
      .section .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.4rem var(--theme-editor-section-horizontal-padding);
        color: var(--dev-tools-text-color-emphasis);
        background-color: rgba(0, 0, 0, 0.2);
      }

      .section .property-list .property-editor:not(:last-child) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .section .header .open-css {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--dev-tools-text-color);
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .section .header .open-css:hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}render(){const t=this.metadata.elements.map(e=>this.renderSection(e));return b` <div>${t}</div> `}renderSection(t){const e=t.properties.map(o=>this.renderPropertyEditor(t,o));return b`
      <div class="section" data-testid=${t==null?void 0:t.displayName}>
        <div class="header">
          <span> ${t.displayName} </span>
          <button class="open-css" @click=${()=>this.handleOpenCss(t)}>Edit CSS</button>
        </div>
        <div class="property-list">${e}</div>
      </div>
    `}handleOpenCss(t){this.dispatchEvent(new ls(t))}renderPropertyEditor(t,e){let o;switch(e.editorType){case R.checkbox:o=mt`vaadin-dev-tools-theme-checkbox-property-editor`;break;case R.range:o=mt`vaadin-dev-tools-theme-range-property-editor`;break;case R.color:o=mt`vaadin-dev-tools-theme-color-property-editor`;break;default:o=mt`vaadin-dev-tools-theme-text-property-editor`}return ha` <${o}
          class="property-editor"
          .elementMetadata=${t}
          .propertyMetadata=${e}
          .theme=${this.theme}
          data-testid=${e.propertyName}
        >
        </${o}>`}};v([w({})],Mt.prototype,"metadata",void 0);v([w({})],Mt.prototype,"theme",void 0);Mt=v([V("vaadin-dev-tools-theme-property-list")],Mt);let Vt=class extends N{render(){return b`<div
      tabindex="-1"
      @mousemove=${this.onMouseMove}
      @click=${this.onClick}
      @keydown=${this.onKeyDown}
    ></div>`}onClick(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-click",{detail:{target:e}}))}onMouseMove(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-mousemove",{detail:{target:e}}))}onKeyDown(t){this.dispatchEvent(new CustomEvent("shim-keydown",{detail:{originalEvent:t}}))}getTargetElement(t){this.style.display="none";const e=document.elementFromPoint(t.clientX,t.clientY);return this.style.display="",e}};Vt.shadowRootOptions={...N.shadowRootOptions,delegatesFocus:!0};Vt.styles=[x`
      div {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0);
        position: fixed;
        inset: 0px;
        z-index: 1000000;
      }
    `];Vt=v([V("vaadin-dev-tools-shim")],Vt);const Er=x`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`,cs={resolve:t=>ue(e=>e.classList.contains("cc-banner"),t)?document.querySelector("vaadin-cookie-consent"):void 0},ds={resolve:t=>{const e=ue(o=>o.localName==="vaadin-login-overlay-wrapper",t);return e?e.__dataHost:void 0}},us={resolve:t=>t.localName==="vaadin-dialog-overlay"?t.__dataHost:void 0},ps={resolve:t=>{const e=ue(o=>o.localName==="vaadin-confirm-dialog-overlay",t);return e?e.__dataHost:void 0}},ms={resolve:t=>{const e=ue(o=>o.localName==="vaadin-notification-card",t);return e?e.__dataHost:void 0}},hs={resolve:t=>t.localName!=="vaadin-menu-bar-item"?void 0:ue(e=>e.localName==="vaadin-menu-bar",t)},Di=[cs,ds,us,ps,ms,hs],vs={resolve:t=>ue(e=>e.classList.contains("cc-banner"),t)},gs={resolve:t=>{var e;const o=ue(i=>{var r;return((r=i.shadowRoot)==null?void 0:r.querySelector("[part=overlay]"))!=null},t);return(e=o==null?void 0:o.shadowRoot)==null?void 0:e.querySelector("[part=overlay]")}},fs={resolve:t=>{var e;const o=ue(i=>i.localName==="vaadin-login-overlay-wrapper",t);return(e=o==null?void 0:o.shadowRoot)==null?void 0:e.querySelector("[part=card]")}},ji=[fs,vs,gs],ue=function(t,e){return t(e)?e:e.parentNode&&e.parentNode instanceof HTMLElement?ue(t,e.parentNode):void 0};class bs{resolveElement(e){for(const o in Di){let i=e;if((i=Di[o].resolve(e))!==void 0)return i}return e}}class ys{resolveElement(e){for(const o in ji){let i=e;if((i=ji[o].resolve(e))!==void 0)return i}return e}}const xs=new bs,ws=new ys;let ve=class extends N{constructor(){super(),this.active=!1,this.components=[],this.selected=0,this.mouseMoveEvent=this.mouseMoveEvent.bind(this)}connectedCallback(){super.connectedCallback();const t=new CSSStyleSheet;t.replaceSync(`
    .vaadin-dev-tools-highlight-overlay {
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      background: rgba(158,44,198,0.25);
    }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t],this.overlayElement=document.createElement("div"),this.overlayElement.classList.add("vaadin-dev-tools-highlight-overlay"),this.addEventListener("mousemove",this.mouseMoveEvent)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousemove",this.mouseMoveEvent)}render(){var t;return this.active?(this.style.display="block",b`
      <vaadin-dev-tools-shim
        @shim-click=${this.shimClick}
        @shim-mousemove=${this.shimMove}
        @shim-keydown=${this.shimKeydown}
      ></vaadin-dev-tools-shim>
      <div class="window popup component-picker-info">${(t=this.options)==null?void 0:t.infoTemplate}</div>
      <div class="window popup component-picker-components-info">
        <div>
          ${this.components.map((e,o)=>b`<div class=${o===this.selected?"selected":""}>
                ${e.element.tagName.toLowerCase()}
              </div>`)}
        </div>
      </div>
    `):(this.style.display="none",null)}open(t){this.options=t,this.active=!0,this.dispatchEvent(new CustomEvent("component-picker-opened",{}))}close(){this.active=!1,this.dispatchEvent(new CustomEvent("component-picker-closed",{}))}update(t){if(super.update(t),(t.has("selected")||t.has("components"))&&this.highlight(this.components[this.selected]),t.has("active")){const e=t.get("active"),o=this.active;!e&&o?requestAnimationFrame(()=>this.shim.focus()):e&&!o&&this.highlight(void 0)}}mouseMoveEvent(t){var e;if(!this.active){this.style.display="none";return}const o=(e=this.shadowRoot)==null?void 0:e.querySelector(".component-picker-info");if(o){const i=o.getBoundingClientRect();t.x>i.x&&t.x<i.x+i.width&&t.y>i.y&&t.y<=i.y+i.height?o.style.opacity="0.05":o.style.opacity="1.0"}}shimKeydown(t){const e=t.detail.originalEvent;if(e.key==="Escape")this.close(),t.stopPropagation(),t.preventDefault();else if(e.key==="ArrowUp"){let o=this.selected-1;o<0&&(o=this.components.length-1),this.selected=o}else e.key==="ArrowDown"?this.selected=(this.selected+1)%this.components.length:e.key==="Enter"&&(this.pickSelectedComponent(),t.stopPropagation(),t.preventDefault())}shimMove(t){const e=xs.resolveElement(t.detail.target);this.components=fa(e),this.selected=this.components.length-1,this.components[this.selected].highlightElement=ws.resolveElement(t.detail.target)}shimClick(t){this.pickSelectedComponent()}pickSelectedComponent(){const t=this.components[this.selected];if(t&&this.options)try{this.options.pickCallback(t)}catch(e){console.error("Pick callback failed",e)}this.close()}highlight(t){let e=(t==null?void 0:t.highlightElement)??(t==null?void 0:t.element);if(this.highlighted!==e)if(e){const o=e.getBoundingClientRect(),i=getComputedStyle(e);this.overlayElement.style.top=`${o.top}px`,this.overlayElement.style.left=`${o.left}px`,this.overlayElement.style.width=`${o.width}px`,this.overlayElement.style.height=`${o.height}px`,this.overlayElement.style.borderRadius=i.borderRadius,document.body.append(this.overlayElement)}else this.overlayElement.remove();this.highlighted=e}};ve.styles=[Er,x`
      .component-picker-info {
        left: 1em;
        bottom: 1em;
      }

      .component-picker-components-info {
        right: 3em;
        bottom: 1em;
      }

      .component-picker-components-info .selected {
        font-weight: bold;
      }
    `];v([P()],ve.prototype,"active",void 0);v([P()],ve.prototype,"components",void 0);v([P()],ve.prototype,"selected",void 0);v([rt("vaadin-dev-tools-shim")],ve.prototype,"shim",void 0);ve=v([V("vaadin-dev-tools-component-picker")],ve);const _s=Object.freeze(Object.defineProperty({__proto__:null,get ComponentPicker(){return ve}},Symbol.toStringTag,{value:"Module"}));class Es{constructor(){this.currentActiveComponent=null,this.currentActiveComponentMetaData=null,this.componentPicked=async(e,o)=>{await this.hideOverlay(),this.currentActiveComponent=e,this.currentActiveComponentMetaData=o},this.showOverlay=()=>{!this.currentActiveComponent||!this.currentActiveComponentMetaData||this.currentActiveComponentMetaData.openOverlay&&this.currentActiveComponentMetaData.openOverlay(this.currentActiveComponent)},this.hideOverlay=()=>{!this.currentActiveComponent||!this.currentActiveComponentMetaData||this.currentActiveComponentMetaData.hideOverlay&&this.currentActiveComponentMetaData.hideOverlay(this.currentActiveComponent)},this.reset=()=>{this.currentActiveComponent=null,this.currentActiveComponentMetaData=null}}}const ye=new Es,bl=t=>{const e=t.element.$.comboBox,o=e.$.overlay;Ss(t.element,e,o)},yl=t=>{const e=t.element,o=e.$.comboBox,i=o.$.overlay;ks(e,o,i)},Ss=(t,e,o)=>{t.opened=!0,o._storedModeless=o.modeless,o.modeless=!0,document._themeEditorDocClickListener=Cs(t,e),document.addEventListener("click",document._themeEditorDocClickListener),e.removeEventListener("focusout",e._boundOnFocusout)},ks=(t,e,o)=>{t.opened=!1,!(!e||!o)&&(o.modeless=o._storedModeless,delete o._storedModeless,e.addEventListener("focusout",e._boundOnFocusout),document.removeEventListener("click",document._themeEditorDocClickListener),delete document._themeEditorDocClickListener)},Cs=(t,e)=>o=>{const i=o.target;i!=null&&(e.opened=!Ts(i,t))};function Ts(t,e){if(!t||!t.tagName)return!0;if(t.tagName.startsWith("VAADIN-DEV"))return!1;let o=t,i={nodeId:-1};for(;o&&o.parentNode&&(i=ho(o),i.nodeId===-1);)o=o.parentElement?o.parentElement:o.parentNode.host;const r=ho(e);return!(i.nodeId!==-1&&r.nodeId===i.nodeId)}Ao(x`
  .vaadin-theme-editor-highlight {
    outline: solid 2px #9e2cc6;
    outline-offset: 3px;
  }
`);let de=class extends N{constructor(){super(...arguments),this.expanded=!1,this.themeEditorState=Ve.enabled,this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null,this.markedAsUsed=!1}static get styles(){return x`
      :host {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        --theme-editor-section-horizontal-padding: 0.75rem;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }

      .notice {
        padding: var(--theme-editor-section-horizontal-padding);
      }

      .notice a {
        color: var(--dev-tools-text-color-emphasis);
      }

      .hint vaadin-icon {
        color: var(--dev-tools-green-color);
        font-size: var(--lumo-icon-size-m);
      }

      .hint {
        display: flex;
        align-items: center;
        gap: var(--theme-editor-section-horizontal-padding);
      }

      .header {
        flex: 0 0 auto;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .header .picker-row {
        padding: var(--theme-editor-section-horizontal-padding);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
      }

      .picker {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .picker button {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        padding: 0;
        line-height: 20px;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .picker button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .picker svg,
      .picker .component-type {
        flex: 0 0 auto;
        margin-right: 4px;
      }

      .picker .instance-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #e5a2fce5;
      }

      .picker .instance-name-quote {
        color: #e5a2fce5;
      }

      .picker .no-selection {
        font-style: italic;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .property-list {
        flex: 1 1 auto;
        overflow-y: auto;
      }

      .link-button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        color: inherit;
        font-weight: 600;
        text-decoration: underline;
      }

      .link-button:focus,
      .link-button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .icon-button {
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .icon-button:disabled {
        opacity: 0.5;
      }

      .icon-button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}firstUpdated(){this.api=new La(this.connection),this.history=new za(this.api),this.historyActions=this.history.allowedActions,this.undoRedoListener=t=>{var e,o;const i=t.key==="Z"||t.key==="z";i&&(t.ctrlKey||t.metaKey)&&t.shiftKey?(e=this.historyActions)!=null&&e.allowRedo&&this.handleRedo():i&&(t.ctrlKey||t.metaKey)&&(o=this.historyActions)!=null&&o.allowUndo&&this.handleUndo()},document.addEventListener("vaadin-theme-updated",()=>{be.clear(),this.refreshTheme()}),document.addEventListener("keydown",this.undoRedoListener),this.dispatchEvent(new CustomEvent("before-open"))}update(t){var e,o;super.update(t),t.has("expanded")&&(this.expanded?(this.highlightElement((e=this.context)==null?void 0:e.component.element),ye.showOverlay()):(ye.hideOverlay(),this.removeElementHighlight((o=this.context)==null?void 0:o.component.element)))}disconnectedCallback(){var t;super.disconnectedCallback(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),ye.hideOverlay(),ye.reset(),document.removeEventListener("keydown",this.undoRedoListener),this.dispatchEvent(new CustomEvent("after-close"))}render(){var t,e,o;return this.themeEditorState===Ve.missing_theme?this.renderMissingThemeNotice():b`
      <div class="header">
        <div class="picker-row">
          ${this.renderPicker()}
          <div class="actions">
            ${(t=this.context)!=null&&t.metadata?b` <vaadin-dev-tools-theme-scope-selector
                  .value=${this.context.scope}
                  .metadata=${this.context.metadata}
                  @scope-change=${this.handleScopeChange}
                ></vaadin-dev-tools-theme-scope-selector>`:null}
            <button
              class="icon-button"
              data-testid="undo"
              ?disabled=${!((e=this.historyActions)!=null&&e.allowUndo)}
              @click=${this.handleUndo}
            >
              ${wt.undo}
            </button>
            <button
              class="icon-button"
              data-testid="redo"
              ?disabled=${!((o=this.historyActions)!=null&&o.allowRedo)}
              @click=${this.handleRedo}
            >
              ${wt.redo}
            </button>
          </div>
        </div>
        ${this.renderLocalClassNameEditor()}
      </div>
      ${this.renderPropertyList()}
    `}renderMissingThemeNotice(){return b`
      <div class="notice">
        It looks like you have not set up an application theme yet. Theme editor requires an existing theme to work
        with. Please check our
        <a href="https://vaadin.com/docs/latest/styling/application-theme" target="_blank">documentation</a>
        on how to set up an application theme.
      </div>
    `}renderPropertyList(){if(!this.context)return null;if(!this.context.metadata){const t=this.context.component.element.localName;return b`
        <div class="notice">Styling <code>&lt;${t}&gt;</code> components is not supported at the moment.</div>
      `}if(this.context.scope===I.local&&!this.context.accessible){const t=this.context.metadata.displayName;return b`
        ${this.context.metadata.notAccessibleDescription&&this.context.scope===I.local?b`<div class="notice hint" style="padding-bottom: 0;">
              <vaadin-icon icon="vaadin:lightbulb"></vaadin-icon>
              <div>${this.context.metadata.notAccessibleDescription}</div>
            </div>`:""}
        <div class="notice">
          The selected ${t} cannot be styled locally. Currently, Theme Editor only supports styling
          instances that are assigned to a local variable, like so:
          <pre><code>Button saveButton = new Button("Save");</code></pre>
          If you want to modify the code so that it satisfies this requirement,
          <button class="link-button" @click=${this.handleShowComponent}>click here</button>
          to open it in your IDE. Alternatively you can choose to style all ${t}s by selecting "Global" from
          the scope dropdown above.
        </div>
      `}return b` ${this.context.metadata.description&&this.context.scope===I.local?b`<div class="notice hint">
            <vaadin-icon icon="vaadin:lightbulb"></vaadin-icon>
            <div>${this.context.metadata.description}</div>
          </div>`:""}
      <vaadin-dev-tools-theme-property-list
        class="property-list"
        .metadata=${this.context.metadata}
        .theme=${this.effectiveTheme}
        @theme-property-value-change=${this.handlePropertyChange}
        @open-css=${this.handleOpenCss}
      ></vaadin-dev-tools-theme-property-list>`}handleShowComponent(){if(!this.context)return;const t=this.context.component,e={nodeId:t.nodeId,uiId:t.uiId};this.connection.sendShowComponentCreateLocation(e)}async handleOpenCss(t){if(!this.context)return;await this.ensureLocalClassName();const e={themeScope:this.context.scope,localClassName:this.context.localClassName},o=De(t.detail.element,e);await this.api.openCss(o)}renderPicker(){var t;let e;if((t=this.context)!=null&&t.metadata){const o=this.context.scope===I.local?this.context.metadata.displayName:`All ${this.context.metadata.displayName}s`,i=b`<span class="component-type">${o}</span>`,r=this.context.scope===I.local?Ia(this.context.component):null,n=r?b` <span class="instance-name-quote">"</span><span class="instance-name">${r}</span
            ><span class="instance-name-quote">"</span>`:null;e=b`${i} ${n}`}else e=b`<span class="no-selection">Pick an element to get started</span>`;return b`
      <div class="picker">
        <button @click=${this.pickComponent}>${wt.crosshair} ${e}</button>
      </div>
    `}renderLocalClassNameEditor(){var t;const e=((t=this.context)==null?void 0:t.scope)===I.local&&this.context.accessible;if(!this.context||!e)return null;const o=this.context.localClassName||this.context.suggestedClassName;return b` <vaadin-dev-tools-theme-class-name-editor
      .className=${o}
      @class-name-change=${this.handleClassNameChange}
    >
    </vaadin-dev-tools-theme-class-name-editor>`}async handleClassNameChange(t){if(!this.context)return;const e=this.context.localClassName,o=t.detail.value;if(e){const i=this.context.component.element;this.context.localClassName=o;const r=await this.api.setLocalClassName(this.context.component,o);this.historyActions=this.history.push(r.requestId,()=>be.previewLocalClassName(i,o),()=>be.previewLocalClassName(i,e))}else this.context={...this.context,suggestedClassName:o}}async pickComponent(){var t;ye.hideOverlay(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),this.pickerProvider().open({infoTemplate:b`
        <div>
          <h3>Locate the component to style</h3>
          <p>Use the mouse cursor to highlight components in the UI.</p>
          <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
          <p>Click the primary mouse button to select the component.</p>
        </div>
      `,pickCallback:async e=>{var o;const i=await Aa.getMetadata(e);if(!i){this.context={component:e,scope:((o=this.context)==null?void 0:o.scope)||I.local},this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}await ye.componentPicked(e,i),this.highlightElement(e.element),this.refreshComponentAndTheme(e,i),ye.showOverlay()}})}handleScopeChange(t){this.context&&this.refreshTheme({...this.context,scope:t.detail.value})}async handlePropertyChange(t){if(!this.context||!this.baseTheme||!this.editedTheme)return;const{element:e,property:o,value:i}=t.detail;this.editedTheme.updatePropertyValue(e.selector,o.propertyName,i,!0),this.effectiveTheme=he.combine(this.baseTheme,this.editedTheme),await this.ensureLocalClassName();const r={themeScope:this.context.scope,localClassName:this.context.localClassName},n=Ra(e,r,o.propertyName,i);try{const a=await this.api.setCssRules([n]);this.historyActions=this.history.push(a.requestId);const l=Na(n);be.add(l)}catch(a){console.error("Failed to update property value",a)}}async handleUndo(){this.historyActions=await this.history.undo(),await this.refreshComponentAndTheme()}async handleRedo(){this.historyActions=await this.history.redo(),await this.refreshComponentAndTheme()}async ensureLocalClassName(){if(!this.context||this.context.scope===I.global||this.context.localClassName)return;if(!this.context.localClassName&&!this.context.suggestedClassName)throw new Error("Cannot assign local class name for the component because it does not have a suggested class name");const t=this.context.component.element,e=this.context.suggestedClassName;this.context.localClassName=e;const o=await this.api.setLocalClassName(this.context.component,e);this.historyActions=this.history.push(o.requestId,()=>be.previewLocalClassName(t,e),()=>be.previewLocalClassName(t))}async refreshComponentAndTheme(t,e){var o,i,r;if(t=t||((o=this.context)==null?void 0:o.component),e=e||((i=this.context)==null?void 0:i.metadata),!t||!e)return;const n=await this.api.loadComponentMetadata(t);this.markedAsUsed||this.api.markAsUsed().then(()=>{this.markedAsUsed=!0}),be.previewLocalClassName(t.element,n.className),await this.refreshTheme({scope:((r=this.context)==null?void 0:r.scope)||I.local,metadata:e,component:t,localClassName:n.className,suggestedClassName:n.suggestedClassName,accessible:n.accessible})}async refreshTheme(t){const e=t||this.context;if(!e||!e.metadata)return;if(e.scope===I.local&&!e.accessible){this.context=e,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}let o=new he(e.metadata);if(!(e.scope===I.local&&!e.localClassName)){const r={themeScope:e.scope,localClassName:e.localClassName},n=e.metadata.elements.map(l=>De(l,r)),a=await this.api.loadRules(n);o=he.fromServerRules(e.metadata,r,a.rules)}const i=await Pa(e.metadata);this.context=e,this.baseTheme=i,this.editedTheme=o,this.effectiveTheme=he.combine(i,this.editedTheme)}highlightElement(t){t&&t.classList.add("vaadin-theme-editor-highlight")}removeElementHighlight(t){t&&t.classList.remove("vaadin-theme-editor-highlight")}};v([w({})],de.prototype,"expanded",void 0);v([w({})],de.prototype,"themeEditorState",void 0);v([w({})],de.prototype,"pickerProvider",void 0);v([w({})],de.prototype,"connection",void 0);v([P()],de.prototype,"historyActions",void 0);v([P()],de.prototype,"context",void 0);v([P()],de.prototype,"effectiveTheme",void 0);de=v([V("vaadin-dev-tools-theme-editor")],de);const Po=1e3,Io=(t,e)=>{const o=Array.from(t.querySelectorAll(e.join(", "))),i=Array.from(t.querySelectorAll("*")).filter(r=>r.shadowRoot).flatMap(r=>Io(r.shadowRoot,e));return[...o,...i]};let Ui=!1;const ot=(t,e)=>{Ui||(window.addEventListener("message",r=>{r.data==="validate-license"&&window.location.reload()},!1),Ui=!0);const o=t._overlayElement;if(o){if(o.shadowRoot){const r=o.shadowRoot.querySelector("slot:not([name])");if(r&&r.assignedElements().length>0){ot(r.assignedElements()[0],e);return}}ot(o,e);return}const i=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");t.isConnected&&(t.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${i}</div></no-license>`)},Ge={},Fi={},Ue={},Sr={},re=t=>`${t.name}_${t.version}`,Bi=t=>{const{cvdlName:e,version:o}=t.constructor,i={name:e,version:o},r=t.tagName.toLowerCase();Ge[e]=Ge[e]??[],Ge[e].push(r);const n=Ue[re(i)];n&&setTimeout(()=>ot(t,n),Po),Ue[re(i)]||Sr[re(i)]||Fi[re(i)]||(Fi[re(i)]=!0,window.Vaadin.devTools.checkLicense(i))},$s=t=>{Sr[re(t)]=!0,console.debug("License check ok for",t)},kr=t=>{const e=t.product.name;Ue[re(t.product)]=t,console.error("License check failed for",e);const o=Ge[e];(o==null?void 0:o.length)>0&&Io(document,o).forEach(i=>{setTimeout(()=>ot(i,Ue[re(t.product)]),Po)})},As=t=>{const e=t.message,o=t.product.name;t.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,Ue[re(t.product)]=t,console.error("No license found when checking",o);const i=Ge[o];(i==null?void 0:i.length)>0&&Io(document,i).forEach(r=>{setTimeout(()=>ot(r,Ue[re(t.product)]),Po)})},Rs=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(t=>{Bi(t)}),window.Vaadin.devTools.createdCvdlElements={push:t=>{Bi(t)}}};var S;(function(t){t.ACTIVE="active",t.INACTIVE="inactive",t.UNAVAILABLE="unavailable",t.ERROR="error"})(S||(S={}));class ze extends Object{constructor(e){super(),this.status=S.UNAVAILABLE,e&&(this.webSocket=new WebSocket(e),this.webSocket.onmessage=o=>this.handleMessage(o),this.webSocket.onerror=o=>this.handleError(o),this.webSocket.onclose=o=>{this.status!==S.ERROR&&this.setStatus(S.UNAVAILABLE),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!==S.ERROR&&this.status!==S.UNAVAILABLE&&this.webSocket.send("")},ze.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onUpdate(e,o){}onConnectionError(e){}onStatusChange(e){}onMessage(e){console.error("Unknown message received from the live reload server:",e)}handleMessage(e){let o;if(e.data!=="X"){try{o=JSON.parse(e.data)}catch(i){this.handleError(`[${i.name}: ${i.message}`);return}o.command==="hello"?(this.setStatus(S.ACTIVE),this.onHandshake()):o.command==="reload"?this.status===S.ACTIVE&&this.onReload():o.command==="update"?this.status===S.ACTIVE&&this.onUpdate(o.path,o.content):o.command==="license-check-ok"?$s(o.data):o.command==="license-check-failed"?kr(o.data):o.command==="license-check-nokey"?As(o.data):this.onMessage(o)}}handleError(e){console.error(e),this.setStatus(S.ERROR),e instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(e)}setActive(e){!e&&this.status===S.ACTIVE?this.setStatus(S.INACTIVE):e&&this.status===S.INACTIVE&&this.setStatus(S.ACTIVE)}setStatus(e){this.status!==e&&(this.status=e,this.onStatusChange(e))}send(e,o){const i=JSON.stringify({command:e,data:o});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(i)):this.webSocket.send(i):console.error(`Unable to send message ${e}. No websocket is available`)}setFeature(e,o){this.send("setFeature",{featureId:e,enabled:o})}sendTelemetry(e){this.send("reportTelemetry",{browserData:e})}sendLicenseCheck(e){this.send("checkLicense",e)}sendShowComponentCreateLocation(e){this.send("showComponentCreateLocation",e)}sendShowComponentAttachLocation(e){this.send("showComponentAttachLocation",e)}}ze.HEARTBEAT_INTERVAL=18e4;let yo=class extends N{createRenderRoot(){return this}activate(){this._devTools.unreadErrors=!1,this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".message-tray .message:last-child");t&&t.scrollIntoView()})}render(){return b`<div class="message-tray">
      ${this._devTools.messages.map(t=>this._devTools.renderMessage(t))}
    </div>`}};v([w({type:Object})],yo.prototype,"_devTools",void 0);yo=v([V("vaadin-dev-tools-log")],yo);var Ns=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,o=[],i=0;i<t.rangeCount;i++)o.push(t.getRangeAt(i));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||o.forEach(function(r){t.addRange(r)}),e&&e.focus()}},Hi={"text/plain":"Text","text/html":"Url",default:"Text"},Ps="Copy to clipboard: #{key}, Enter";function Is(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function Os(t,e){var o,i,r,n,a,l,s=!1;e||(e={}),o=e.debug||!1;try{r=Ns(),n=document.createRange(),a=document.getSelection(),l=document.createElement("span"),l.textContent=t,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(d){if(d.stopPropagation(),e.format)if(d.preventDefault(),typeof d.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var m=Hi[e.format]||Hi.default;window.clipboardData.setData(m,t)}else d.clipboardData.clearData(),d.clipboardData.setData(e.format,t);e.onCopy&&(d.preventDefault(),e.onCopy(d.clipboardData))}),document.body.appendChild(l),n.selectNodeContents(l),a.addRange(n);var c=document.execCommand("copy");if(!c)throw new Error("copy command was unsuccessful");s=!0}catch(d){o&&console.error("unable to copy using execCommand: ",d),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),s=!0}catch(m){o&&console.error("unable to copy using clipboardData: ",m),o&&console.error("falling back to prompt"),i=Is("message"in e?e.message:Ps),window.prompt(i,t)}}finally{a&&(typeof a.removeRange=="function"?a.removeRange(n):a.removeAllRanges()),l&&document.body.removeChild(l),r()}return s}let Dt=class extends N{constructor(){super(...arguments),this.serverInfo={versions:[]}}createRenderRoot(){return this}render(){return b` <div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        ${this.serverInfo.versions.map(t=>b`
            <dt>${t.name}</dt>
            <dd>${t.version}</dd>
          `)}
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${!this._devTools.conf.enable||(this._devTools.frontendStatus===S.UNAVAILABLE||this._devTools.frontendStatus===S.ERROR)&&(this._devTools.javaStatus===S.UNAVAILABLE||this._devTools.javaStatus===S.ERROR)}
              ?checked="${this._devTools.frontendStatus===S.ACTIVE||this._devTools.javaStatus===S.ACTIVE}"
              @change=${t=>this._devTools.setActive(t.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd
          class="live-reload-status"
          style="--status-color: ${this._devTools.getStatusColor(this._devTools.javaStatus)}"
        >
          Java ${this._devTools.javaStatus}
          ${this._devTools.conf.backend?`(${C.BACKEND_DISPLAY_NAME[this._devTools.conf.backend]})`:""}
        </dd>
        <dd
          class="live-reload-status"
          style="--status-color: ${this._devTools.getStatusColor(this._devTools.frontendStatus)}"
        >
          Front end ${this._devTools.frontendStatus}
        </dd>
      </dl>
    </div>`}handleMessage(t){return(t==null?void 0:t.command)==="serverInfo"?(this.serverInfo=t.data,!0):!1}copyInfoToClipboard(){const t=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),e=Array.from(t).map(o=>(o.localName==="dd"?": ":`
`)+o.textContent.trim()).join("").replace(/^\n/,"");Os(e),this._devTools.showNotification(B.INFORMATION,"Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}};v([w({type:Object})],Dt.prototype,"_devTools",void 0);v([P()],Dt.prototype,"serverInfo",void 0);Dt=v([V("vaadin-dev-tools-info")],Dt);var T,B;(function(t){t.LOG="log",t.INFORMATION="information",t.WARNING="warning",t.ERROR="error"})(B||(B={}));let C=T=class extends N{static get styles(){return[x`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          color-scheme: dark;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: auto;
          margin: 0.5rem;
          min-width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,Er]}static get isActive(){const t=window.sessionStorage.getItem(T.ACTIVE_KEY_IN_SESSION_STORAGE);return t===null||t!=="false"}static notificationDismissed(t){const e=window.localStorage.getItem(T.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return e!==null&&e.includes(t)}elementTelemetry(){let t={};try{const e=localStorage.getItem("vaadin.statistics.basket");if(!e)return;t=JSON.parse(e)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(t)}openWebSocketConnection(){if(this.frontendStatus=S.UNAVAILABLE,this.javaStatus=S.UNAVAILABLE,!this.conf.token){console.error("Dev tools functionality denied for this host.");return}const t=l=>this.log(B.ERROR,l),e=()=>{this.showSplashMessage("Reloading…");const l=window.sessionStorage.getItem(T.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),s=l?parseInt(l,10)+1:1;window.sessionStorage.setItem(T.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,s.toString()),window.sessionStorage.setItem(T.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},o=(l,s)=>{let c=document.head.querySelector(`style[data-file-path='${l}']`);c?(this.log(B.INFORMATION,"Hot update of "+l),c.textContent=s,document.dispatchEvent(new CustomEvent("vaadin-theme-updated"))):e()},i=new ze(this.getDedicatedWebSocketUrl());i.onHandshake=()=>{this.log(B.LOG,"Vaadin development mode initialized"),T.isActive||i.setActive(!1),this.elementTelemetry()},i.onConnectionError=t,i.onReload=e,i.onUpdate=o,i.onStatusChange=l=>{this.frontendStatus=l},i.onMessage=l=>this.handleFrontendMessage(l),this.frontendConnection=i;let r;this.conf.backend===T.SPRING_BOOT_DEVTOOLS?(r=new ze(this.getSpringBootWebSocketUrl(window.location)),r.onHandshake=()=>{T.isActive||r.setActive(!1)},r.onReload=e,r.onConnectionError=t):this.conf.backend===T.JREBEL||this.conf.backend===T.HOTSWAP_AGENT?r=i:r=new ze(void 0);const n=r.onStatusChange;r.onStatusChange=l=>{n(l),this.javaStatus=l};const a=r.onHandshake;r.onHandshake=()=>{a(),this.conf.backend&&this.log(B.INFORMATION,`Java live reload available: ${T.BACKEND_DISPLAY_NAME[this.conf.backend]}`)},this.javaConnection=r,this.conf.backend||this.showNotification(B.WARNING,"Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}tabHandleMessage(t,e){const o=t;return o.handleMessage&&o.handleMessage.call(t,e)}handleFrontendMessage(t){for(const e of this.tabs)if(e.element&&this.tabHandleMessage(e.element,t))return;if((t==null?void 0:t.command)==="featureFlags")this.features=t.data.features;else if((t==null?void 0:t.command)==="themeEditorState"){const e=!!window.Vaadin.Flow;this.themeEditorState=t.data,e&&this.themeEditorState!==Ve.disabled&&(this.tabs.push({id:"theme-editor",title:"Theme Editor (Preview)",render:()=>this.renderThemeEditor()}),this.requestUpdate())}else this.unhandledMessages.push(t)}getDedicatedWebSocketUrl(){function t(o){const i=document.createElement("div");return i.innerHTML=`<a href="${o}"/>`,i.firstChild.href}if(this.conf.url===void 0)return;const e=t(this.conf.url);if(!e.startsWith("http://")&&!e.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${e.replace(/^http/,"ws")}?v-r=push&debug_window&token=${this.conf.token}`}getSpringBootWebSocketUrl(t){const{hostname:e}=t,o=t.protocol==="https:"?"wss":"ws";if(e.endsWith("gitpod.io")){const i=e.replace(/.*?-/,"");return`${o}://${this.conf.liveReloadPort}-${i}`}else return`${o}://${e}:${this.conf.liveReloadPort}`}constructor(){super(),this.unhandledMessages=[],this.conf={enable:!1,url:"",liveReloadPort:-1},this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=S.UNAVAILABLE,this.javaStatus=S.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:"vaadin-dev-tools-log"},{id:"info",title:"Info",render:"vaadin-dev-tools-info"},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.themeEditorState=Ve.disabled,this.nextMessageId=1,this.transitionDuration=0,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:()=>this.renderCode()})}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.conf=window.Vaadin.devToolsConf,this.disableEventListener=o=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),window.sessionStorage.getItem(T.TRIGGERED_KEY_IN_SESSION_STORAGE)){const o=new Date,i=`${`0${o.getHours()}`.slice(-2)}:${`0${o.getMinutes()}`.slice(-2)}:${`0${o.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${i}`),window.sessionStorage.removeItem(T.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const t=window;t.Vaadin=t.Vaadin||{},t.Vaadin.devTools=Object.assign(this,t.Vaadin.devTools),document.documentElement.addEventListener("vaadin-overlay-outside-click",o=>{const i=o,r=i.target.owner;r&&ba(this,r)||i.detail.sourceEvent.composedPath().includes(this)&&o.preventDefault()});const e=window.Vaadin;e.devToolsPlugins&&(Array.from(e.devToolsPlugins).forEach(o=>this.initPlugin(o)),e.devToolsPlugins={push:o=>this.initPlugin(o)}),this.openWebSocketConnection(),Rs()}async initPlugin(t){const e=this;t.init({addTab:(o,i)=>{e.tabs.push({id:o,title:o,render:i})},send:function(o,i){e.frontendConnection.send(o,i)}})}format(t){return t.toString()}catchErrors(){const t=window.Vaadin.ConsoleErrors;t&&t.forEach(e=>{this.log(B.ERROR,e.map(o=>this.format(o)).join(" "))}),window.Vaadin.ConsoleErrors={push:e=>{this.log(B.ERROR,e.map(o=>this.format(o)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(t=>this.dismissNotification(t.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(t){this.splashMessage=t,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},T.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log(B.LOG,this.splashMessage),this.showSplashMessage(void 0)}checkLicense(t){this.frontendConnection?this.frontendConnection.sendLicenseCheck(t):kr({message:"Internal error: no connection",product:t})}log(t,e,o,i,r){const n=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:n,type:t,message:e,details:o,link:i,dontShowAgain:!1,dontShowAgainMessage:r,deleted:!1});this.messages.length>T.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const a=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&a?(setTimeout(()=>a.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):t===B.ERROR&&(this.unreadErrors=!0)})}showNotification(t,e,o,i,r,n){if(r===void 0||!T.notificationDismissed(r)){if(this.notifications.filter(l=>l.persistentId===r).filter(l=>!l.deleted).length>0)return;const a=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:a,type:t,message:e,details:o,link:i,persistentId:r,dontShowAgain:!1,dontShowAgainMessage:n,deleted:!1}),i===void 0&&setTimeout(()=>{this.dismissNotification(a)},T.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(t,e,o,i)}dismissNotification(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];if(o.dontShowAgain&&o.persistentId&&!T.notificationDismissed(o.persistentId)){let i=window.localStorage.getItem(T.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);i=i===null?o.persistentId:`${i},${o.persistentId}`,window.localStorage.setItem(T.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,i)}o.deleted=!0,this.log(o.type,o.message,o.details,o.link),setTimeout(()=>{const i=this.findNotificationIndex(t);i!==-1&&(this.notifications.splice(i,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(t){let e=-1;return this.notifications.some((o,i)=>o.id===t?(e=i,!0):!1),e}toggleDontShowAgain(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];o.dontShowAgain=!o.dontShowAgain,this.requestUpdate()}}setActive(t){var e,o;(e=this.frontendConnection)==null||e.setActive(t),(o=this.javaConnection)==null||o.setActive(t),window.sessionStorage.setItem(T.ACTIVE_KEY_IN_SESSION_STORAGE,t?"true":"false")}getStatusColor(t){return t===S.ACTIVE?"var(--dev-tools-green-color)":t===S.INACTIVE?"var(--dev-tools-grey-color)":t===S.UNAVAILABLE?"var(--dev-tools-yellow-hsl)":t===S.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(t){return b`
      <div
        class="message ${t.type} ${t.deleted?"animate-out":""} ${t.details||t.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${t.message}</div>
          <div class="message-details" ?hidden="${!t.details&&!t.link}">
            ${t.details?b`<p>${t.details}</p>`:""}
            ${t.link?b`<a class="ahreflike" href="${t.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${t.persistentId?b`<div
                class="persist ${t.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(t.id)}
              >
              ${t.dontShowAgainMessage||"Don’t show again"}
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(t.id)}>Dismiss</div>
      </div>
    `}render(){return b` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${t=>t.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(t=>b`<button
                class=${$o({tab:!0,active:this.activeTab===t.id,unreadErrors:t.id==="log"&&this.unreadErrors})}
                id="${t.id}"
                @click=${()=>{const e=this.tabs.find(r=>r.id===this.activeTab);if(e&&e.element){const r=typeof e.render=="function"?e.element.firstElementChild:e.element,n=r==null?void 0:r.deactivate;n&&n.call(r)}this.activeTab=t.id;const o=typeof t.render=="function"?t.element.firstElementChild:t.element,i=o.activate;i&&i.call(o)}}
              >
                ${t.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        <div id="tabContainer"></div>
      </div>

      <div class="notification-tray">${this.notifications.map(t=>this.renderMessage(t))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
      style="display: var(--dev-tools-button-display, 'block')"
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?b`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:b`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?b`<span class="status-description">${this.splashMessage}</span></div>`:$}
      </div>`}updated(t){var e;super.updated(t);const o=this.renderRoot.querySelector("#tabContainer"),i=[];if(this.tabs.forEach(n=>{n.element||(typeof n.render=="function"?n.element=document.createElement("div"):(n.element=document.createElement(n.render),n.element._devTools=this),i.push(n.element))}),(o==null?void 0:o.childElementCount)!==this.tabs.length){for(let n=0;n<this.tabs.length;n++){const a=this.tabs[n];o.childElementCount>n&&o.children[n]===a.element||o.insertBefore(a.element,o.children[n])}for(;(o==null?void 0:o.childElementCount)>this.tabs.length;)(e=o.lastElementChild)==null||e.remove()}for(const n of this.tabs){typeof n.render=="function"?we(n.render(),n.element):n.element.requestUpdate&&n.element.requestUpdate();const a=n.id===this.activeTab;n.element.hidden=!a}for(const n of i)for(var r=0;r<this.unhandledMessages.length;r++)this.tabHandleMessage(n,this.unhandledMessages[r])&&(this.unhandledMessages.splice(r,1),r--)}renderCode(){return b`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${async()=>{await g(()=>Promise.resolve().then(()=>_s),void 0),this.componentPicker.open({infoTemplate:b`
                <div>
                  <h3>Locate a component in source code</h3>
                  <p>Use the mouse cursor to highlight components in the UI.</p>
                  <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
                  <p>
                    Click the primary mouse button to open the corresponding source code line of the highlighted
                    component in your IDE.
                  </p>
                </div>
              `,pickCallback:t=>{const e={nodeId:t.nodeId,uiId:t.uiId};this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.sendShowComponentCreateLocation(e):this.frontendConnection.sendShowComponentAttachLocation(e)}})}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderFeatures(){return b`<div class="features-tray">
      ${this.features.map(t=>b`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${t.id}"
              type="checkbox"
              ?checked=${t.enabled}
              @change=${e=>this.toggleFeatureFlag(e,t)}
            />
            <span class="slider"></span>
            ${t.title}
          </label>
          <a class="ahreflike" href="${t.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}disableJavaLiveReload(){var t;(t=this.javaConnection)==null||t.setActive(!1)}enableJavaLiveReload(){var t;(t=this.javaConnection)==null||t.setActive(!0)}renderThemeEditor(){return b` <vaadin-dev-tools-theme-editor
      .expanded=${this.expanded}
      .themeEditorState=${this.themeEditorState}
      .pickerProvider=${()=>this.componentPicker}
      .connection=${this.frontendConnection}
      @before-open=${this.disableJavaLiveReload}
      @after-close=${this.enableJavaLiveReload}
    ></vaadin-dev-tools-theme-editor>`}toggleFeatureFlag(t,e){const o=t.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(e.id,o),this.showNotification(B.INFORMATION,`“${e.title}” ${o?"enabled":"disabled"}`,e.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${e.id}${o?"Enabled":"Disabled"}`)):this.log(B.ERROR,`Unable to toggle feature ${e.title}: No server connection available`)}};C.MAX_LOG_ROWS=1e3;C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";C.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";C.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";C.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;C.HOTSWAP_AGENT="HOTSWAP_AGENT";C.JREBEL="JREBEL";C.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";C.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};v([w({type:Boolean,attribute:!1})],C.prototype,"expanded",void 0);v([w({type:Array,attribute:!1})],C.prototype,"messages",void 0);v([w({type:String,attribute:!1})],C.prototype,"splashMessage",void 0);v([w({type:Array,attribute:!1})],C.prototype,"notifications",void 0);v([w({type:String,attribute:!1})],C.prototype,"frontendStatus",void 0);v([w({type:String,attribute:!1})],C.prototype,"javaStatus",void 0);v([P()],C.prototype,"tabs",void 0);v([P()],C.prototype,"activeTab",void 0);v([P()],C.prototype,"features",void 0);v([P()],C.prototype,"unreadErrors",void 0);v([rt(".window")],C.prototype,"root",void 0);v([rt("vaadin-dev-tools-component-picker")],C.prototype,"componentPicker",void 0);v([P()],C.prototype,"componentPickActive",void 0);v([P()],C.prototype,"themeEditorState",void 0);C=T=v([V("vaadin-dev-tools")],C);const{toString:Ls}=Object.prototype;function zs(t){return Ls.call(t)==="[object RegExp]"}function Ms(t,{preserve:e=!0,whitespace:o=!0,all:i}={}){if(i)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let r=e,n;typeof e=="function"?(r=!1,n=e):zs(e)&&(r=!1,n=d=>e.test(d));let a=!1,l="",s="",c="";for(let d=0;d<t.length;d++){if(l=t[d],t[d-1]!=="\\"&&(l==='"'||l==="'")&&(a===l?a=!1:a||(a=l)),!a&&l==="/"&&t[d+1]==="*"){const m=t[d+2]==="!";let u=d+2;for(;u<t.length;u++){if(t[u]==="*"&&t[u+1]==="/"){r&&m||n&&n(s)?c+=`/*${s}*/`:o||(t[u+2]===`
`?u++:t[u+2]+t[u+3]===`\r
`&&(u+=2)),s="";break}s+=t[u]}d=u+1;continue}c+=l}return c}const Vs=CSSStyleSheet.toString().includes("document.createElement"),Ds=(t,e)=>{const o=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(t)!=null&&(t=Ms(t));for(var i,r=t;(i=o.exec(t))!==null;){r=r.replace(i[0],"");const n=document.createElement("link");n.rel="stylesheet",n.href=i[2]||i[4];const a=i[1]||i[5];a&&(n.media=a),e===document?document.head.appendChild(n):e.appendChild(n)}return r},js=(t,e,o)=>(o?e.adoptedStyleSheets=[t,...e.adoptedStyleSheets]:e.adoptedStyleSheets=[...e.adoptedStyleSheets,t],()=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(i=>i!==t)}),Us=(t,e,o)=>{const i=new CSSStyleSheet;return i.replaceSync(t),Vs?js(i,e,o):(o?e.adoptedStyleSheets.splice(0,0,i):e.adoptedStyleSheets.push(i),()=>{e.adoptedStyleSheets.splice(e.adoptedStyleSheets.indexOf(i),1)})},Fs=(t,e)=>{const o=document.createElement("style");o.type="text/css",o.textContent=t;let i;if(e){const n=Array.from(document.head.childNodes).filter(a=>a.nodeType===Node.COMMENT_NODE).find(a=>a.data.trim()===e);n&&(i=n)}return document.head.insertBefore(o,i),()=>{o.remove()}},We=(t,e,o,i)=>{if(o===document){const n=Bs(t);if(window.Vaadin.theme.injectedGlobalCss.indexOf(n)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(n)}const r=Ds(t,o);return o===document?Fs(r,e):Us(r,o,i)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function Wi(t){let e,o,i=2166136261;for(e=0,o=t.length;e<o;e++)i^=t.charCodeAt(e),i+=(i<<1)+(i<<4)+(i<<7)+(i<<8)+(i<<24);return("0000000"+(i>>>0).toString(16)).substr(-8)}function Bs(t){let e=Wi(t);return e+Wi(e+t)}document._vaadintheme_quizzypulse_componentCss||(document._vaadintheme_quizzypulse_componentCss=!0);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function Hs(t){const e=customElements.get(t.is);if(!e)Object.defineProperty(t,"version",{get(){return"24.3.0"}}),customElements.define(t.is,t);else{const o=e.version;o&&t.version&&o===t.version?console.warn(`The component ${t.is} has been loaded twice`):console.error(`Tried to define ${t.is} version ${t.version} when version ${e.version} is already in use. Something will probably break.`)}}/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ws extends HTMLElement{static get is(){return"vaadin-lumo-styles"}}Hs(Ws);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const qs=t=>class extends t{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(o,i,r){super.attributeChangedCallback(o,i,r),o==="theme"&&this._set_theme(r)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Cr=[];function Tr(t){return t&&Object.prototype.hasOwnProperty.call(t,"__themes")}function Gs(t){return Tr(customElements.get(t))}function Ks(t=[]){return[t].flat(1/0).filter(e=>e instanceof So?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function Ft(t,e,o={}){t&&Gs(t)&&console.warn(`The custom element definition for "${t}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),e=Ks(e),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(t,e,o):Cr.push({themeFor:t,styles:e,include:o.include,moduleId:o.moduleId})}function xo(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():Cr}function Js(t,e){return(t||"").split(" ").some(o=>new RegExp(`^${o.split("*").join(".*")}$`,"u").test(e))}function Ys(t=""){let e=0;return t.startsWith("lumo-")||t.startsWith("material-")?e=1:t.startsWith("vaadin-")&&(e=2),e}function $r(t){const e=[];return t.include&&[].concat(t.include).forEach(o=>{const i=xo().find(r=>r.moduleId===o);i?e.push(...$r(i),...i.styles):console.warn(`Included moduleId ${o} not found in style registry`)},t.styles),e}function Xs(t,e){const o=document.createElement("style");o.innerHTML=t.map(i=>i.cssText).join(`
`),e.content.appendChild(o)}function Qs(t){const e=`${t}-default-theme`,o=xo().filter(i=>i.moduleId!==e&&Js(i.themeFor,t)).map(i=>({...i,styles:[...$r(i),...i.styles],includePriority:Ys(i.moduleId)})).sort((i,r)=>r.includePriority-i.includePriority);return o.length>0?o:xo().filter(i=>i.moduleId===e)}const wl=t=>class extends qs(t){static finalize(){if(super.finalize(),this.elementStyles)return;const o=this.prototype._template;!o||Tr(this)||Xs(this.getStylesForThis(),o)}static finalizeStyles(o){const i=this.getStylesForThis();return o?[...super.finalizeStyles(o),...i]:i}static getStylesForThis(){const o=Object.getPrototypeOf(this.prototype),i=(o?o.constructor.__themes:[])||[];this.__themes=[...i,...Qs(this.is)];const r=this.__themes.flatMap(n=>n.styles);return r.filter((n,a)=>a===r.lastIndexOf(n))}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Zs=(t,...e)=>{const o=document.createElement("style");o.id=t,o.textContent=e.map(i=>i.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",o)},ge=(t,...e)=>{Zs(`lumo-${t}`,e)};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const el=x`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`,Oo=x`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;Ft("",Oo,{moduleId:"lumo-typography"});ge("typography-props",el);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const tl=x`
  ${lr(Oo.cssText.replace(/,\s*:host/su,""))}
`;ge("typography",tl);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ol=x`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`;ge("color-props",ol);const Lo=x`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`;Ft("",Lo,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ge("color",Lo);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ar=x`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`;ge("spacing-props",Ar);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const il=x`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`;x`
  html {
    /* Button */
    --vaadin-button-background: var(--lumo-contrast-5pct);
    --vaadin-button-border: none;
    --vaadin-button-border-radius: var(--lumo-border-radius-m);
    --vaadin-button-font-size: var(--lumo-font-size-m);
    --vaadin-button-font-weight: 500;
    --vaadin-button-height: var(--lumo-size-m);
    --vaadin-button-margin: var(--lumo-space-xs) 0;
    --vaadin-button-min-width: calc(var(--vaadin-button-height) * 2);
    --vaadin-button-padding: 0 calc(var(--vaadin-button-height) / 3 + var(--lumo-border-radius-m) / 2);
    --vaadin-button-text-color: var(--lumo-primary-text-color);
    --vaadin-button-primary-background: var(--lumo-primary-color);
    --vaadin-button-primary-border: none;
    --vaadin-button-primary-font-weight: 600;
    --vaadin-button-primary-text-color: var(--lumo-primary-contrast-color);
    --vaadin-button-tertiary-background: transparent !important;
    --vaadin-button-tertiary-text-color: var(--lumo-primary-text-color);
    --vaadin-button-tertiary-font-weight: 500;
    --vaadin-button-tertiary-padding: 0 calc(var(--vaadin-button-height) / 6);
    /* Checkbox */
    --vaadin-checkbox-background: var(--lumo-contrast-20pct);
    --vaadin-checkbox-background-hover: var(--lumo-contrast-30pct);
    --vaadin-checkbox-border-radius: var(--lumo-border-radius-s);
    --vaadin-checkbox-checkmark-char: var(--lumo-icons-checkmark);
    --vaadin-checkbox-checkmark-char-indeterminate: '';
    --vaadin-checkbox-checkmark-color: var(--lumo-primary-contrast-color);
    --vaadin-checkbox-checkmark-size: calc(var(--vaadin-checkbox-size) + 2px);
    --vaadin-checkbox-label-color: var(--lumo-body-text-color);
    --vaadin-checkbox-label-font-size: var(--lumo-font-size-m);
    --vaadin-checkbox-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs);
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    /* Radio button */
    --vaadin-radio-button-background: var(--lumo-contrast-20pct);
    --vaadin-radio-button-background-hover: var(--lumo-contrast-30pct);
    --vaadin-radio-button-dot-color: var(--lumo-primary-contrast-color);
    --vaadin-radio-button-dot-size: 3px;
    --vaadin-radio-button-label-color: var(--lumo-body-text-color);
    --vaadin-radio-button-label-font-size: var(--lumo-font-size-m);
    --vaadin-radio-button-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs)
      var(--lumo-space-xs);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-selection-color: var(--lumo-primary-color);
    --vaadin-selection-color-text: var(--lumo-primary-text-color);
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
    --vaadin-focus-ring-color: var(--lumo-primary-color-50pct);
    --vaadin-focus-ring-width: 2px;
    /* Label */
    --vaadin-input-field-label-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-focused-label-color: var(--lumo-primary-text-color);
    --vaadin-input-field-hovered-label-color: var(--lumo-body-text-color);
    --vaadin-input-field-label-font-size: var(--lumo-font-size-s);
    --vaadin-input-field-label-font-weight: 500;
    /* Helper */
    --vaadin-input-field-helper-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-helper-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-helper-font-weight: 400;
    --vaadin-input-field-helper-spacing: 0.4em;
    /* Error message */
    --vaadin-input-field-error-color: var(--lumo-error-text-color);
    --vaadin-input-field-error-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-error-font-weight: 400;
    /* Input field */
    --vaadin-input-field-background: var(--lumo-contrast-10pct);
    --vaadin-input-field-icon-color: var(--lumo-contrast-60pct);
    --vaadin-input-field-icon-size: var(--lumo-icon-size-m);
    --vaadin-input-field-invalid-background: var(--lumo-error-color-10pct);
    --vaadin-input-field-invalid-hover-highlight: var(--lumo-error-color-50pct);
    --vaadin-input-field-height: var(--lumo-size-m);
    --vaadin-input-field-hover-highlight: var(--lumo-contrast-50pct);
    --vaadin-input-field-placeholder-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-readonly-border: 1px dashed var(--lumo-contrast-30pct);
    --vaadin-input-field-value-color: var(--lumo-body-text-color);
    --vaadin-input-field-value-font-size: var(--lumo-font-size-m);
    --vaadin-input-field-value-font-weight: 400;
  }
`;ge("style-props",il);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const zo=x`
  [theme~='badge'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.4em calc(0.5em + var(--lumo-border-radius-s) / 4);
    color: var(--lumo-primary-text-color);
    background-color: var(--lumo-primary-color-10pct);
    border-radius: var(--lumo-border-radius-s);
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-s);
    line-height: 1;
    font-weight: 500;
    text-transform: initial;
    letter-spacing: initial;
    min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
    flex-shrink: 0;
  }

  /* Ensure proper vertical alignment */
  [theme~='badge']::before {
    display: inline-block;
    content: '\\2003';
    width: 0;
  }

  [theme~='badge'][theme~='small'] {
    font-size: var(--lumo-font-size-xxs);
    line-height: 1;
  }

  /* Colors */

  [theme~='badge'][theme~='success'] {
    color: var(--lumo-success-text-color);
    background-color: var(--lumo-success-color-10pct);
  }

  [theme~='badge'][theme~='error'] {
    color: var(--lumo-error-text-color);
    background-color: var(--lumo-error-color-10pct);
  }

  [theme~='badge'][theme~='warning'] {
    color: var(--lumo-warning-text-color);
    background-color: var(--lumo-warning-color-10pct);
  }

  [theme~='badge'][theme~='contrast'] {
    color: var(--lumo-contrast-80pct);
    background-color: var(--lumo-contrast-5pct);
  }

  /* Primary */

  [theme~='badge'][theme~='primary'] {
    color: var(--lumo-primary-contrast-color);
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='success'][theme~='primary'] {
    color: var(--lumo-success-contrast-color);
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error'][theme~='primary'] {
    color: var(--lumo-error-contrast-color);
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning'][theme~='primary'] {
    color: var(--lumo-warning-contrast-color);
    background-color: var(--lumo-warning-color);
  }

  [theme~='badge'][theme~='contrast'][theme~='primary'] {
    color: var(--lumo-base-color);
    background-color: var(--lumo-contrast);
  }

  /* Links */

  [theme~='badge'][href]:hover {
    text-decoration: none;
  }

  /* Icon */

  [theme~='badge'] vaadin-icon {
    margin: -0.25em 0;
  }

  [theme~='badge'] vaadin-icon:first-child {
    margin-left: -0.375em;
  }

  [theme~='badge'] vaadin-icon:last-child {
    margin-right: -0.375em;
  }

  vaadin-icon[theme~='badge'][icon] {
    min-width: 0;
    padding: 0;
    font-size: 1rem;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  vaadin-icon[theme~='badge'][icon][theme~='small'] {
    width: var(--lumo-icon-size-s);
    height: var(--lumo-icon-size-s);
  }

  /* Empty */

  [theme~='badge']:not([icon]):empty {
    min-width: 0;
    width: 1em;
    height: 1em;
    padding: 0;
    border-radius: 50%;
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='small']:not([icon]):empty {
    width: 0.75em;
    height: 0.75em;
  }

  [theme~='badge'][theme~='contrast']:not([icon]):empty {
    background-color: var(--lumo-contrast);
  }

  [theme~='badge'][theme~='success']:not([icon]):empty {
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error']:not([icon]):empty {
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning']:not([icon]):empty {
    background-color: var(--lumo-warning-color);
  }

  /* Pill */

  [theme~='badge'][theme~='pill'] {
    --lumo-border-radius-s: 1em;
  }

  /* RTL specific styles */

  [dir='rtl'][theme~='badge'] vaadin-icon:first-child {
    margin-right: -0.375em;
    margin-left: 0;
  }

  [dir='rtl'][theme~='badge'] vaadin-icon:last-child {
    margin-left: -0.375em;
    margin-right: 0;
  }
`;Ft("",zo,{moduleId:"lumo-badge"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ge("badge",zo);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const rl=x`
  /* === Screen readers === */
  .sr-only {
    border-width: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const nl=x`
  /* === Background color === */
  .bg-base {
    background-color: var(--lumo-base-color);
  }

  .bg-transparent {
    background-color: transparent;
  }

  .bg-tint-5 {
    background-color: var(--lumo-tint-5pct);
  }
  .bg-tint-10 {
    background-color: var(--lumo-tint-10pct);
  }
  .bg-tint-20 {
    background-color: var(--lumo-tint-20pct);
  }
  .bg-tint-30 {
    background-color: var(--lumo-tint-30pct);
  }
  .bg-tint-40 {
    background-color: var(--lumo-tint-40pct);
  }
  .bg-tint-50 {
    background-color: var(--lumo-tint-50pct);
  }
  .bg-tint-60 {
    background-color: var(--lumo-tint-60pct);
  }
  .bg-tint-70 {
    background-color: var(--lumo-tint-70pct);
  }
  .bg-tint-80 {
    background-color: var(--lumo-tint-80pct);
  }
  .bg-tint-90 {
    background-color: var(--lumo-tint-90pct);
  }
  .bg-tint {
    background-color: var(--lumo-tint);
  }

  .bg-shade-5 {
    background-color: var(--lumo-shade-5pct);
  }
  .bg-shade-10 {
    background-color: var(--lumo-shade-10pct);
  }
  .bg-shade-20 {
    background-color: var(--lumo-shade-20pct);
  }
  .bg-shade-30 {
    background-color: var(--lumo-shade-30pct);
  }
  .bg-shade-40 {
    background-color: var(--lumo-shade-40pct);
  }
  .bg-shade-50 {
    background-color: var(--lumo-shade-50pct);
  }
  .bg-shade-60 {
    background-color: var(--lumo-shade-60pct);
  }
  .bg-shade-70 {
    background-color: var(--lumo-shade-70pct);
  }
  .bg-shade-80 {
    background-color: var(--lumo-shade-80pct);
  }
  .bg-shade-90 {
    background-color: var(--lumo-shade-90pct);
  }
  .bg-shade {
    background-color: var(--lumo-shade);
  }

  .bg-contrast-5 {
    background-color: var(--lumo-contrast-5pct);
  }
  .bg-contrast-10 {
    background-color: var(--lumo-contrast-10pct);
  }
  .bg-contrast-20 {
    background-color: var(--lumo-contrast-20pct);
  }
  .bg-contrast-30 {
    background-color: var(--lumo-contrast-30pct);
  }
  .bg-contrast-40 {
    background-color: var(--lumo-contrast-40pct);
  }
  .bg-contrast-50 {
    background-color: var(--lumo-contrast-50pct);
  }
  .bg-contrast-60 {
    background-color: var(--lumo-contrast-60pct);
  }
  .bg-contrast-70 {
    background-color: var(--lumo-contrast-70pct);
  }
  .bg-contrast-80 {
    background-color: var(--lumo-contrast-80pct);
  }
  .bg-contrast-90 {
    background-color: var(--lumo-contrast-90pct);
  }
  .bg-contrast {
    background-color: var(--lumo-contrast);
  }

  .bg-primary {
    background-color: var(--lumo-primary-color);
  }
  .bg-primary-50 {
    background-color: var(--lumo-primary-color-50pct);
  }
  .bg-primary-10 {
    background-color: var(--lumo-primary-color-10pct);
  }

  .bg-error {
    background-color: var(--lumo-error-color);
  }
  .bg-error-50 {
    background-color: var(--lumo-error-color-50pct);
  }
  .bg-error-10 {
    background-color: var(--lumo-error-color-10pct);
  }

  .bg-success {
    background-color: var(--lumo-success-color);
  }
  .bg-success-50 {
    background-color: var(--lumo-success-color-50pct);
  }
  .bg-success-10 {
    background-color: var(--lumo-success-color-10pct);
  }

  .bg-warning {
    background-color: var(--lumo-warning-color);
  }
  .bg-warning-10 {
    background-color: var(--lumo-warning-color-10pct);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const al=x`
  /* === Border === */
  .border-0 {
    border: none;
  }
  .border {
    border: 1px var(--lumo-utility-border-style, solid) var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-b {
    border-bottom: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-e {
    border-inline-end: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-l {
    border-left: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-r {
    border-right: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-s {
    border-inline-start: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-t {
    border-top: 1px var(--lumo-utility-border-style, solid) var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-dashed {
    --lumo-utility-border-style: dashed;
  }
  .border-dotted {
    --lumo-utility-border-style: dotted;
  }

  /* === Border color === */
  .border-contrast-5 {
    --lumo-utility-border-color: var(--lumo-contrast-5pct);
  }
  .border-contrast-10 {
    --lumo-utility-border-color: var(--lumo-contrast-10pct);
  }
  .border-contrast-20 {
    --lumo-utility-border-color: var(--lumo-contrast-20pct);
  }
  .border-contrast-30 {
    --lumo-utility-border-color: var(--lumo-contrast-30pct);
  }
  .border-contrast-40 {
    --lumo-utility-border-color: var(--lumo-contrast-40pct);
  }
  .border-contrast-50 {
    --lumo-utility-border-color: var(--lumo-contrast-50pct);
  }
  .border-contrast-60 {
    --lumo-utility-border-color: var(--lumo-contrast-60pct);
  }
  .border-contrast-70 {
    --lumo-utility-border-color: var(--lumo-contrast-70pct);
  }
  .border-contrast-80 {
    --lumo-utility-border-color: var(--lumo-contrast-80pct);
  }
  .border-contrast-90 {
    --lumo-utility-border-color: var(--lumo-contrast-90pct);
  }
  .border-contrast {
    --lumo-utility-border-color: var(--lumo-contrast);
  }

  .border-primary {
    --lumo-utility-border-color: var(--lumo-primary-color);
  }
  .border-primary-50 {
    --lumo-utility-border-color: var(--lumo-primary-color-50pct);
  }
  .border-primary-10 {
    --lumo-utility-border-color: var(--lumo-primary-color-10pct);
  }

  .border-error {
    --lumo-utility-border-color: var(--lumo-error-color);
  }
  .border-error-50 {
    --lumo-utility-border-color: var(--lumo-error-color-50pct);
  }
  .border-error-10 {
    --lumo-utility-border-color: var(--lumo-error-color-10pct);
  }

  .border-success {
    --lumo-utility-border-color: var(--lumo-success-color);
  }
  .border-success-50 {
    --lumo-utility-border-color: var(--lumo-success-color-50pct);
  }
  .border-success-10 {
    --lumo-utility-border-color: var(--lumo-success-color-10pct);
  }

  .border-warning {
    --lumo-utility-border-color: var(--lumo-warning-color);
  }
  .border-warning-10 {
    --lumo-utility-border-color: var(--lumo-warning-color-10pct);
  }
  .border-warning-strong {
    --lumo-utility-border-color: var(--lumo-warning-text-color);
  }

  /* === Border radius === */
  .rounded-none {
    border-radius: 0;
  }
  .rounded-s {
    border-radius: var(--lumo-border-radius-s);
  }
  .rounded-m {
    border-radius: var(--lumo-border-radius-m);
  }
  .rounded-l {
    border-radius: var(--lumo-border-radius-l);
  }
  .rounded-full {
    border-radius: 9999px;
  }

  /* === Divide === */
  .divide-x > * + * {
    border-inline-start: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .divide-y > * + * {
    border-block-start: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const sl=x`
  /* === Backdrop filter === */
  .backdrop-blur-none {
    backdrop-filter: blur(0);
  }
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
  .backdrop-blur {
    backdrop-filter: blur(8px);
  }
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
  }
  .backdrop-blur-lg {
    backdrop-filter: blur(16px);
  }
  .backdrop-blur-xl {
    backdrop-filter: blur(24px);
  }
  .backdrop-blur-2xl {
    backdrop-filter: blur(40px);
  }
  .backdrop-blur-3xl {
    backdrop-filter: blur(64px);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ll=x`
  /* === Align content === */
  .content-center {
    align-content: center;
  }
  .content-end {
    align-content: flex-end;
  }
  .content-start {
    align-content: flex-start;
  }
  .content-around {
    align-content: space-around;
  }
  .content-between {
    align-content: space-between;
  }
  .content-evenly {
    align-content: space-evenly;
  }
  .content-stretch {
    align-content: stretch;
  }

  /* === Align items === */
  .items-baseline {
    align-items: baseline;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }

  /* === Align self === */
  .self-auto {
    align-self: auto;
  }
  .self-baseline {
    align-self: baseline;
  }
  .self-center {
    align-self: center;
  }
  .self-end {
    align-self: flex-end;
  }
  .self-start {
    align-self: flex-start;
  }
  .self-stretch {
    align-self: stretch;
  }

  /* === Flex === */
  .flex-auto {
    flex: auto;
  }
  .flex-none {
    flex: none;
  }

  /* === Flex direction === */
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-row-reverse {
    flex-direction: row-reverse;
  }

  /* === Flex grow === */
  .flex-grow-0 {
    flex-grow: 0;
  }
  .flex-grow {
    flex-grow: 1;
  }

  /* === Flex shrink === */
  .flex-shrink-0 {
    flex-shrink: 0;
  }
  .flex-shrink {
    flex-shrink: 1;
  }

  /* === Flex wrap === */
  .flex-nowrap {
    flex-wrap: nowrap;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }

  /* === Gap === */
  .gap-xs {
    gap: var(--lumo-space-xs);
  }
  .gap-s {
    gap: var(--lumo-space-s);
  }
  .gap-m {
    gap: var(--lumo-space-m);
  }
  .gap-l {
    gap: var(--lumo-space-l);
  }
  .gap-xl {
    gap: var(--lumo-space-xl);
  }

  /* === Gap (column) === */
  .gap-x-xs {
    column-gap: var(--lumo-space-xs);
  }
  .gap-x-s {
    column-gap: var(--lumo-space-s);
  }
  .gap-x-m {
    column-gap: var(--lumo-space-m);
  }
  .gap-x-l {
    column-gap: var(--lumo-space-l);
  }
  .gap-x-xl {
    column-gap: var(--lumo-space-xl);
  }

  /* === Gap (row) === */
  .gap-y-xs {
    row-gap: var(--lumo-space-xs);
  }
  .gap-y-s {
    row-gap: var(--lumo-space-s);
  }
  .gap-y-m {
    row-gap: var(--lumo-space-m);
  }
  .gap-y-l {
    row-gap: var(--lumo-space-l);
  }
  .gap-y-xl {
    row-gap: var(--lumo-space-xl);
  }

  /* === Grid auto flow === */
  .grid-flow-col {
    grid-auto-flow: column;
  }
  .grid-flow-row {
    grid-auto-flow: row;
  }

  /* === Grid columns === */
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
  .grid-cols-8 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .grid-cols-9 {
    grid-template-columns: repeat(9, minmax(0, 1fr));
  }
  .grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
  .grid-cols-11 {
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }
  .grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  /* === Grid rows === */
  .grid-rows-1 {
    grid-template-rows: repeat(1, minmax(0, 1fr));
  }
  .grid-rows-2 {
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  .grid-rows-3 {
    grid-template-rows: repeat(3, minmax(0, 1fr));
  }
  .grid-rows-4 {
    grid-template-rows: repeat(4, minmax(0, 1fr));
  }
  .grid-rows-5 {
    grid-template-rows: repeat(5, minmax(0, 1fr));
  }
  .grid-rows-6 {
    grid-template-rows: repeat(6, minmax(0, 1fr));
  }

  /* === Justify content === */
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-evenly {
    justify-content: space-evenly;
  }

  /* === Span (column) === */
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .col-span-3 {
    grid-column: span 3 / span 3;
  }
  .col-span-4 {
    grid-column: span 4 / span 4;
  }
  .col-span-5 {
    grid-column: span 5 / span 5;
  }
  .col-span-6 {
    grid-column: span 6 / span 6;
  }
  .col-span-7 {
    grid-column: span 7 / span 7;
  }
  .col-span-8 {
    grid-column: span 8 / span 8;
  }
  .col-span-9 {
    grid-column: span 9 / span 9;
  }
  .col-span-10 {
    grid-column: span 10 / span 10;
  }
  .col-span-11 {
    grid-column: span 11 / span 11;
  }
  .col-span-12 {
    grid-column: span 12 / span 12;
  }
  .col-span-full {
    grid-column: 1 / -1;
  }

  /* === Span (row) === */
  .row-span-1 {
    grid-row: span 1 / span 1;
  }
  .row-span-2 {
    grid-row: span 2 / span 2;
  }
  .row-span-3 {
    grid-row: span 3 / span 3;
  }
  .row-span-4 {
    grid-row: span 4 / span 4;
  }
  .row-span-5 {
    grid-row: span 5 / span 5;
  }
  .row-span-6 {
    grid-row: span 6 / span 6;
  }
  .row-span-full {
    grid-row: 1 / -1;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:flex-col {
      flex-direction: column;
    }
    .sm\\:flex-row {
      flex-direction: row;
    }
    .sm\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sm\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .sm\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .sm\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .sm\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .sm\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .sm\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .sm\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .sm\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .sm\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .sm\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .md\\:flex-col {
      flex-direction: column;
    }
    .md\\:flex-row {
      flex-direction: row;
    }
    .md\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .md\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .md\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .md\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .md\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .md\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .md\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .md\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .md\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .md\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px) {
    .lg\\:flex-col {
      flex-direction: column;
    }
    .lg\\:flex-row {
      flex-direction: row;
    }
    .lg\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .lg\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .lg\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .lg\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .lg\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .lg\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .lg\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .lg\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .lg\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .lg\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .lg\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .lg\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1280px) {
    .xl\\:flex-col {
      flex-direction: column;
    }
    .xl\\:flex-row {
      flex-direction: row;
    }
    .xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:flex-col {
      flex-direction: column;
    }
    .\\32xl\\:flex-row {
      flex-direction: row;
    }
    .\\32xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const cl=x`
  /* === Aspect ratio === */
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  .aspect-video {
    aspect-ratio: 16 / 9;
  }

  /* === Box sizing === */
  .box-border {
    box-sizing: border-box;
  }
  .box-content {
    box-sizing: content-box;
  }

  /* === Display === */
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .inline-grid {
    display: inline-grid;
  }

  /* === Overflow === */
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-scroll {
    overflow: scroll;
  }

  /* === Position === */
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .static {
    position: static;
  }
  .sticky {
    position: sticky;
  }
  .relative {
    position: relative;
  }

  /* === Top, end, bottom, start === */
  .-bottom-xs {
    bottom: calc(var(--lumo-space-xs) / -1);
  }
  .-bottom-s {
    bottom: calc(var(--lumo-space-s) / -1);
  }
  .-bottom-m {
    bottom: calc(var(--lumo-space-m) / -1);
  }
  .-bottom-l {
    bottom: calc(var(--lumo-space-l) / -1);
  }
  .-bottom-xl {
    bottom: calc(var(--lumo-space-xl) / -1);
  }
  .-bottom-full {
    bottom: -100%;
  }
  .bottom-0 {
    bottom: 0;
  }
  .bottom-xs {
    bottom: var(--lumo-space-xs);
  }
  .bottom-s {
    bottom: var(--lumo-space-s);
  }
  .bottom-m {
    bottom: var(--lumo-space-m);
  }
  .bottom-l {
    bottom: var(--lumo-space-l);
  }
  .bottom-xl {
    bottom: var(--lumo-space-xl);
  }
  .bottom-auto {
    bottom: auto;
  }
  .bottom-full {
    bottom: 100%;
  }

  .-end-xs {
    inset-inline-end: calc(var(--lumo-space-xs) / -1);
  }
  .-end-s {
    inset-inline-end: calc(var(--lumo-space-s) / -1);
  }
  .-end-m {
    inset-inline-end: calc(var(--lumo-space-m) / -1);
  }
  .-end-l {
    inset-inline-end: calc(var(--lumo-space-l) / -1);
  }
  .-end-xl {
    inset-inline-end: calc(var(--lumo-space-xl) / -1);
  }
  .-end-full {
    inset-inline-end: -100%;
  }
  .end-0 {
    inset-inline-end: 0;
  }
  .end-xs {
    inset-inline-end: var(--lumo-space-xs);
  }
  .end-s {
    inset-inline-end: var(--lumo-space-s);
  }
  .end-m {
    inset-inline-end: var(--lumo-space-m);
  }
  .end-l {
    inset-inline-end: var(--lumo-space-l);
  }
  .end-xl {
    inset-inline-end: var(--lumo-space-xl);
  }
  .end-auto {
    inset-inline-end: auto;
  }
  .end-full {
    inset-inline-end: 100%;
  }

  .-start-xs {
    inset-inline-start: calc(var(--lumo-space-xs) / -1);
  }
  .-start-s {
    inset-inline-start: calc(var(--lumo-space-s) / -1);
  }
  .-start-m {
    inset-inline-start: calc(var(--lumo-space-m) / -1);
  }
  .-start-l {
    inset-inline-start: calc(var(--lumo-space-l) / -1);
  }
  .-start-xl {
    inset-inline-start: calc(var(--lumo-space-xl) / -1);
  }
  .-start-full {
    inset-inline-start: -100%;
  }
  .start-0 {
    inset-inline-start: 0;
  }
  .start-xs {
    inset-inline-start: var(--lumo-space-xs);
  }
  .start-s {
    inset-inline-start: var(--lumo-space-s);
  }
  .start-m {
    inset-inline-start: var(--lumo-space-m);
  }
  .start-l {
    inset-inline-start: var(--lumo-space-l);
  }
  .start-xl {
    inset-inline-start: var(--lumo-space-xl);
  }
  .start-auto {
    inset-inline-start: auto;
  }
  .start-full {
    inset-inline-start: 100%;
  }

  .-top-xs {
    top: calc(var(--lumo-space-xs) / -1);
  }
  .-top-s {
    top: calc(var(--lumo-space-s) / -1);
  }
  .-top-m {
    top: calc(var(--lumo-space-m) / -1);
  }
  .-top-l {
    top: calc(var(--lumo-space-l) / -1);
  }
  .-top-xl {
    top: calc(var(--lumo-space-xl) / -1);
  }
  .-top-full {
    top: -100%;
  }
  .top-0 {
    top: 0;
  }
  .top-xs {
    top: var(--lumo-space-xs);
  }
  .top-s {
    top: var(--lumo-space-s);
  }
  .top-m {
    top: var(--lumo-space-m);
  }
  .top-l {
    top: var(--lumo-space-l);
  }
  .top-xl {
    top: var(--lumo-space-xl);
  }
  .top-auto {
    top: auto;
  }
  .top-full {
    top: 100%;
  }

  /* === Visibility === */
  .invisible {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }

  /* === Z-index === */
  .z-10 {
    z-index: 10;
  }
  .z-20 {
    z-index: 20;
  }
  .z-30 {
    z-index: 30;
  }
  .z-40 {
    z-index: 40;
  }
  .z-50 {
    z-index: 50;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    /* Display */
    .sm\\:block {
      display: block;
    }
    .sm\\:flex {
      display: flex;
    }
    .sm\\grid {
      display: grid;
    }
    .sm\\:hidden {
      display: none;
    }
    .sm\\:inline {
      display: inline;
    }
    .sm\\:inline-block {
      display: inline-block;
    }
    .sm\\:inline-flex {
      display: inline-flex;
    }
    .sm\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .sm\\:absolute {
      position: absolute;
    }
    .sm\\:fixed {
      position: fixed;
    }
    .sm\\:relative {
      position: relative;
    }
    .sm\\:static {
      position: static;
    }
    .sm\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 768px) {
    /* Display */
    .md\\:block {
      display: block;
    }
    .md\\:flex {
      display: flex;
    }
    .md\\grid {
      display: grid;
    }
    .md\\:hidden {
      display: none;
    }
    .md\\:inline {
      display: inline;
    }
    .md\\:inline-block {
      display: inline-block;
    }
    .md\\:inline-flex {
      display: inline-flex;
    }
    .md\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .md\\:absolute {
      position: absolute;
    }
    .md\\:fixed {
      position: fixed;
    }
    .md\\:relative {
      position: relative;
    }
    .md\\:static {
      position: static;
    }
    .md\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 1024px) {
    /* Display */
    .lg\\:block {
      display: block;
    }
    .lg\\:flex {
      display: flex;
    }
    .lg\\grid {
      display: grid;
    }
    .lg\\:hidden {
      display: none;
    }
    .lg\\:inline {
      display: inline;
    }
    .lg\\:inline-block {
      display: inline-block;
    }
    .lg\\:inline-flex {
      display: inline-flex;
    }
    .lg\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .lg\\:absolute {
      position: absolute;
    }
    .lg\\:fixed {
      position: fixed;
    }
    .lg\\:relative {
      position: relative;
    }
    .lg\\:static {
      position: static;
    }
    .lg\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 1280px) {
    /* Display */
    .xl\\:block {
      display: block;
    }
    .xl\\:flex {
      display: flex;
    }
    .xl\\grid {
      display: grid;
    }
    .xl\\:hidden {
      display: none;
    }
    .xl\\:inline {
      display: inline;
    }
    .xl\\:inline-block {
      display: inline-block;
    }
    .xl\\:inline-flex {
      display: inline-flex;
    }
    .xl\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .xl\\:absolute {
      position: absolute;
    }
    .xl\\:fixed {
      position: fixed;
    }
    .xl\\:relative {
      position: relative;
    }
    .xl\\:static {
      position: static;
    }
    .xl\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 1536px) {
    /* Display */
    .\\32xl\\:block {
      display: block;
    }
    .\\32xl\\:flex {
      display: flex;
    }
    .\\32xl\\grid {
      display: grid;
    }
    .\\32xl\\:hidden {
      display: none;
    }
    .\\32xl\\:inline {
      display: inline;
    }
    .\\32xl\\:inline-block {
      display: inline-block;
    }
    .\\32xl\\:inline-flex {
      display: inline-flex;
    }
    .\\32xl\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .\\32xl\\:absolute {
      position: absolute;
    }
    .\\32xl\\:fixed {
      position: fixed;
    }
    .\\32xl\\:relative {
      position: relative;
    }
    .\\32xl\\:static {
      position: static;
    }
    .\\32xl\\:sticky {
      position: sticky;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const dl=x`
  /* === Box shadow === */
  .shadow-xs {
    box-shadow: var(--lumo-box-shadow-xs);
  }
  .shadow-s {
    box-shadow: var(--lumo-box-shadow-s);
  }
  .shadow-m {
    box-shadow: var(--lumo-box-shadow-m);
  }
  .shadow-l {
    box-shadow: var(--lumo-box-shadow-l);
  }
  .shadow-xl {
    box-shadow: var(--lumo-box-shadow-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ul=x`
  /* === Height === */
  .h-0 {
    height: 0;
  }
  .h-xs {
    height: var(--lumo-size-xs);
  }
  .h-s {
    height: var(--lumo-size-s);
  }
  .h-m {
    height: var(--lumo-size-m);
  }
  .h-l {
    height: var(--lumo-size-l);
  }
  .h-xl {
    height: var(--lumo-size-xl);
  }
  .h-auto {
    height: auto;
  }
  .h-full {
    height: 100%;
  }
  .h-screen {
    height: 100vh;
  }

  /* === Height (max) === */
  .max-h-full {
    max-height: 100%;
  }
  .max-h-screen {
    max-height: 100vh;
  }

  /* === Height (min) === */
  .min-h-0 {
    min-height: 0;
  }
  .min-h-full {
    min-height: 100%;
  }
  .min-h-screen {
    min-height: 100vh;
  }

  /* === Icon sizing === */
  .icon-s {
    height: var(--lumo-icon-size-s);
    width: var(--lumo-icon-size-s);
  }
  .icon-m {
    height: var(--lumo-icon-size-m);
    width: var(--lumo-icon-size-m);
  }
  .icon-l {
    height: var(--lumo-icon-size-l);
    width: var(--lumo-icon-size-l);
  }

  /* === Width === */
  .w-xs {
    width: var(--lumo-size-xs);
  }
  .w-s {
    width: var(--lumo-size-s);
  }
  .w-m {
    width: var(--lumo-size-m);
  }
  .w-l {
    width: var(--lumo-size-l);
  }
  .w-xl {
    width: var(--lumo-size-xl);
  }
  .w-auto {
    width: auto;
  }
  .w-full {
    width: 100%;
  }

  /* === Width (max) === */
  .max-w-full {
    max-width: 100%;
  }
  .max-w-screen-sm {
    max-width: 640px;
  }
  .max-w-screen-md {
    max-width: 768px;
  }
  .max-w-screen-lg {
    max-width: 1024px;
  }
  .max-w-screen-xl {
    max-width: 1280px;
  }
  .max-w-screen-2xl {
    max-width: 1536px;
  }

  /* === Width (min) === */
  .min-w-0 {
    min-width: 0;
  }
  .min-w-full {
    min-width: 100%;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const pl=x`
  /* === Margin === */
  .-m-xs {
    margin: calc(var(--lumo-space-xs) / -1);
  }
  .-m-s {
    margin: calc(var(--lumo-space-s) / -1);
  }
  .-m-m {
    margin: calc(var(--lumo-space-m) / -1);
  }
  .-m-l {
    margin: calc(var(--lumo-space-l) / -1);
  }
  .-m-xl {
    margin: calc(var(--lumo-space-xl) / -1);
  }
  .m-0 {
    margin: 0;
  }
  .m-xs {
    margin: var(--lumo-space-xs);
  }
  .m-s {
    margin: var(--lumo-space-s);
  }
  .m-m {
    margin: var(--lumo-space-m);
  }
  .m-l {
    margin: var(--lumo-space-l);
  }
  .m-xl {
    margin: var(--lumo-space-xl);
  }
  .m-auto {
    margin: auto;
  }

  /* === Margin (bottom) === */
  .-mb-xs {
    margin-bottom: calc(var(--lumo-space-xs) / -1);
  }
  .-mb-s {
    margin-bottom: calc(var(--lumo-space-s) / -1);
  }
  .-mb-m {
    margin-bottom: calc(var(--lumo-space-m) / -1);
  }
  .-mb-l {
    margin-bottom: calc(var(--lumo-space-l) / -1);
  }
  .-mb-xl {
    margin-bottom: calc(var(--lumo-space-xl) / -1);
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .mb-xs {
    margin-bottom: var(--lumo-space-xs);
  }
  .mb-s {
    margin-bottom: var(--lumo-space-s);
  }
  .mb-m {
    margin-bottom: var(--lumo-space-m);
  }
  .mb-l {
    margin-bottom: var(--lumo-space-l);
  }
  .mb-xl {
    margin-bottom: var(--lumo-space-xl);
  }
  .mb-auto {
    margin-bottom: auto;
  }

  /* === Margin (end) === */
  .-me-xs {
    margin-inline-end: calc(var(--lumo-space-xs) / -1);
  }
  .-me-s {
    margin-inline-end: calc(var(--lumo-space-s) / -1);
  }
  .-me-m {
    margin-inline-end: calc(var(--lumo-space-m) / -1);
  }
  .-me-l {
    margin-inline-end: calc(var(--lumo-space-l) / -1);
  }
  .-me-xl {
    margin-inline-end: calc(var(--lumo-space-xl) / -1);
  }
  .me-0 {
    margin-inline-end: 0;
  }
  .me-xs {
    margin-inline-end: var(--lumo-space-xs);
  }
  .me-s {
    margin-inline-end: var(--lumo-space-s);
  }
  .me-m {
    margin-inline-end: var(--lumo-space-m);
  }
  .me-l {
    margin-inline-end: var(--lumo-space-l);
  }
  .me-xl {
    margin-inline-end: var(--lumo-space-xl);
  }
  .me-auto {
    margin-inline-end: auto;
  }

  /* === Margin (horizontal) === */
  .-mx-xs {
    margin-inline: calc(var(--lumo-space-xs) / -1);
  }
  .-mx-s {
    margin-inline: calc(var(--lumo-space-s) / -1);
  }
  .-mx-m {
    margin-inline: calc(var(--lumo-space-m) / -1);
  }
  .-mx-l {
    margin-inline: calc(var(--lumo-space-l) / -1);
  }
  .-mx-xl {
    margin-inline: calc(var(--lumo-space-xl) / -1);
  }
  .mx-0 {
    margin-inline: 0;
  }
  .mx-xs {
    margin-inline: var(--lumo-space-xs);
  }
  .mx-s {
    margin-inline: var(--lumo-space-s);
  }
  .mx-m {
    margin-inline: var(--lumo-space-m);
  }
  .mx-l {
    margin-inline: var(--lumo-space-l);
  }
  .mx-xl {
    margin-inline: var(--lumo-space-xl);
  }
  .mx-auto {
    margin-inline: auto;
  }

  /* === Margin (left) === */
  .-ml-xs {
    margin-left: calc(var(--lumo-space-xs) / -1);
  }
  .-ml-s {
    margin-left: calc(var(--lumo-space-s) / -1);
  }
  .-ml-m {
    margin-left: calc(var(--lumo-space-m) / -1);
  }
  .-ml-l {
    margin-left: calc(var(--lumo-space-l) / -1);
  }
  .-ml-xl {
    margin-left: calc(var(--lumo-space-xl) / -1);
  }
  .ml-0 {
    margin-left: 0;
  }
  .ml-xs {
    margin-left: var(--lumo-space-xs);
  }
  .ml-s {
    margin-left: var(--lumo-space-s);
  }
  .ml-m {
    margin-left: var(--lumo-space-m);
  }
  .ml-l {
    margin-left: var(--lumo-space-l);
  }
  .ml-xl {
    margin-left: var(--lumo-space-xl);
  }
  .ml-auto {
    margin-left: auto;
  }

  /* === Margin (right) === */
  .-mr-xs {
    margin-right: calc(var(--lumo-space-xs) / -1);
  }
  .-mr-s {
    margin-right: calc(var(--lumo-space-s) / -1);
  }
  .-mr-m {
    margin-right: calc(var(--lumo-space-m) / -1);
  }
  .-mr-l {
    margin-right: calc(var(--lumo-space-l) / -1);
  }
  .-mr-xl {
    margin-right: calc(var(--lumo-space-xl) / -1);
  }
  .mr-0 {
    margin-right: 0;
  }
  .mr-xs {
    margin-right: var(--lumo-space-xs);
  }
  .mr-s {
    margin-right: var(--lumo-space-s);
  }
  .mr-m {
    margin-right: var(--lumo-space-m);
  }
  .mr-l {
    margin-right: var(--lumo-space-l);
  }
  .mr-xl {
    margin-right: var(--lumo-space-xl);
  }
  .mr-auto {
    margin-right: auto;
  }

  /* === Margin (start) === */
  .-ms-xs {
    margin-inline-start: calc(var(--lumo-space-xs) / -1);
  }
  .-ms-s {
    margin-inline-start: calc(var(--lumo-space-s) / -1);
  }
  .-ms-m {
    margin-inline-start: calc(var(--lumo-space-m) / -1);
  }
  .-ms-l {
    margin-inline-start: calc(var(--lumo-space-l) / -1);
  }
  .-ms-xl {
    margin-inline-start: calc(var(--lumo-space-xl) / -1);
  }
  .ms-0 {
    margin-inline-start: 0;
  }
  .ms-xs {
    margin-inline-start: var(--lumo-space-xs);
  }
  .ms-s {
    margin-inline-start: var(--lumo-space-s);
  }
  .ms-m {
    margin-inline-start: var(--lumo-space-m);
  }
  .ms-l {
    margin-inline-start: var(--lumo-space-l);
  }
  .ms-xl {
    margin-inline-start: var(--lumo-space-xl);
  }
  .ms-auto {
    margin-inline-start: auto;
  }

  /* === Margin (top) === */
  .-mt-xs {
    margin-top: calc(var(--lumo-space-xs) / -1);
  }
  .-mt-s {
    margin-top: calc(var(--lumo-space-s) / -1);
  }
  .-mt-m {
    margin-top: calc(var(--lumo-space-m) / -1);
  }
  .-mt-l {
    margin-top: calc(var(--lumo-space-l) / -1);
  }
  .-mt-xl {
    margin-top: calc(var(--lumo-space-xl) / -1);
  }
  .mt-0 {
    margin-top: 0;
  }
  .mt-xs {
    margin-top: var(--lumo-space-xs);
  }
  .mt-s {
    margin-top: var(--lumo-space-s);
  }
  .mt-m {
    margin-top: var(--lumo-space-m);
  }
  .mt-l {
    margin-top: var(--lumo-space-l);
  }
  .mt-xl {
    margin-top: var(--lumo-space-xl);
  }
  .mt-auto {
    margin-top: auto;
  }

  /* === Margin (vertical) === */
  .-my-xs {
    margin-block: calc(var(--lumo-space-xs) / -1);
  }
  .-my-s {
    margin-block: calc(var(--lumo-space-s) / -1);
  }
  .-my-m {
    margin-block: calc(var(--lumo-space-m) / -1);
  }
  .-my-l {
    margin-block: calc(var(--lumo-space-l) / -1);
  }
  .-my-xl {
    margin-block: calc(var(--lumo-space-xl) / -1);
  }
  .my-0 {
    margin-block: 0;
  }
  .my-xs {
    margin-block: var(--lumo-space-xs);
  }
  .my-s {
    margin-block: var(--lumo-space-s);
  }
  .my-m {
    margin-block: var(--lumo-space-m);
  }
  .my-l {
    margin-block: var(--lumo-space-l);
  }
  .my-xl {
    margin-block: var(--lumo-space-xl);
  }
  .my-auto {
    margin-block: auto;
  }

  /* === Padding === */
  .p-0 {
    padding: 0;
  }
  .p-xs {
    padding: var(--lumo-space-xs);
  }
  .p-s {
    padding: var(--lumo-space-s);
  }
  .p-m {
    padding: var(--lumo-space-m);
  }
  .p-l {
    padding: var(--lumo-space-l);
  }
  .p-xl {
    padding: var(--lumo-space-xl);
  }

  /* === Padding (bottom) === */
  .pb-0 {
    padding-bottom: 0;
  }
  .pb-xs {
    padding-bottom: var(--lumo-space-xs);
  }
  .pb-s {
    padding-bottom: var(--lumo-space-s);
  }
  .pb-m {
    padding-bottom: var(--lumo-space-m);
  }
  .pb-l {
    padding-bottom: var(--lumo-space-l);
  }
  .pb-xl {
    padding-bottom: var(--lumo-space-xl);
  }

  /* === Padding (end) === */
  .pe-0 {
    padding-inline-end: 0;
  }
  .pe-xs {
    padding-inline-end: var(--lumo-space-xs);
  }
  .pe-s {
    padding-inline-end: var(--lumo-space-s);
  }
  .pe-m {
    padding-inline-end: var(--lumo-space-m);
  }
  .pe-l {
    padding-inline-end: var(--lumo-space-l);
  }
  .pe-xl {
    padding-inline-end: var(--lumo-space-xl);
  }

  /* === Padding (horizontal) === */
  .px-0 {
    padding-left: 0;
    padding-right: 0;
  }
  .px-xs {
    padding-left: var(--lumo-space-xs);
    padding-right: var(--lumo-space-xs);
  }
  .px-s {
    padding-left: var(--lumo-space-s);
    padding-right: var(--lumo-space-s);
  }
  .px-m {
    padding-left: var(--lumo-space-m);
    padding-right: var(--lumo-space-m);
  }
  .px-l {
    padding-left: var(--lumo-space-l);
    padding-right: var(--lumo-space-l);
  }
  .px-xl {
    padding-left: var(--lumo-space-xl);
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (left) === */
  .pl-0 {
    padding-left: 0;
  }
  .pl-xs {
    padding-left: var(--lumo-space-xs);
  }
  .pl-s {
    padding-left: var(--lumo-space-s);
  }
  .pl-m {
    padding-left: var(--lumo-space-m);
  }
  .pl-l {
    padding-left: var(--lumo-space-l);
  }
  .pl-xl {
    padding-left: var(--lumo-space-xl);
  }

  /* === Padding (right) === */
  .pr-0 {
    padding-right: 0;
  }
  .pr-xs {
    padding-right: var(--lumo-space-xs);
  }
  .pr-s {
    padding-right: var(--lumo-space-s);
  }
  .pr-m {
    padding-right: var(--lumo-space-m);
  }
  .pr-l {
    padding-right: var(--lumo-space-l);
  }
  .pr-xl {
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (start) === */
  .ps-0 {
    padding-inline-start: 0;
  }
  .ps-xs {
    padding-inline-start: var(--lumo-space-xs);
  }
  .ps-s {
    padding-inline-start: var(--lumo-space-s);
  }
  .ps-m {
    padding-inline-start: var(--lumo-space-m);
  }
  .ps-l {
    padding-inline-start: var(--lumo-space-l);
  }
  .ps-xl {
    padding-inline-start: var(--lumo-space-xl);
  }

  /* === Padding (top) === */
  .pt-0 {
    padding-top: 0;
  }
  .pt-xs {
    padding-top: var(--lumo-space-xs);
  }
  .pt-s {
    padding-top: var(--lumo-space-s);
  }
  .pt-m {
    padding-top: var(--lumo-space-m);
  }
  .pt-l {
    padding-top: var(--lumo-space-l);
  }
  .pt-xl {
    padding-top: var(--lumo-space-xl);
  }

  /* === Padding (vertical) === */
  .py-0 {
    padding-bottom: 0;
    padding-top: 0;
  }
  .py-xs {
    padding-bottom: var(--lumo-space-xs);
    padding-top: var(--lumo-space-xs);
  }
  .py-s {
    padding-bottom: var(--lumo-space-s);
    padding-top: var(--lumo-space-s);
  }
  .py-m {
    padding-bottom: var(--lumo-space-m);
    padding-top: var(--lumo-space-m);
  }
  .py-l {
    padding-bottom: var(--lumo-space-l);
    padding-top: var(--lumo-space-l);
  }
  .py-xl {
    padding-bottom: var(--lumo-space-xl);
    padding-top: var(--lumo-space-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ml=x`
  .transition {
    transition: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow,
      transform, filter, backdrop-filter 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-all {
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-colors {
    transition: color, background-color, border-color, text-decoration-color, fill,
      stroke 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-none {
    transition: none;
  }
  .transition-opacity {
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-shadow {
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .transition-transform {
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const hl=x`
  /* === Font size === */
  .text-2xs {
    font-size: var(--lumo-font-size-xxs);
  }
  .text-xs {
    font-size: var(--lumo-font-size-xs);
  }
  .text-s {
    font-size: var(--lumo-font-size-s);
  }
  .text-m {
    font-size: var(--lumo-font-size-m);
  }
  .text-l {
    font-size: var(--lumo-font-size-l);
  }
  .text-xl {
    font-size: var(--lumo-font-size-xl);
  }
  .text-2xl {
    font-size: var(--lumo-font-size-xxl);
  }
  .text-3xl {
    font-size: var(--lumo-font-size-xxxl);
  }

  /* === Font weight === */
  .font-thin {
    font-weight: 100;
  }
  .font-extralight {
    font-weight: 200;
  }
  .font-light {
    font-weight: 300;
  }
  .font-normal {
    font-weight: 400;
  }
  .font-medium {
    font-weight: 500;
  }
  .font-semibold {
    font-weight: 600;
  }
  .font-bold {
    font-weight: 700;
  }
  .font-extrabold {
    font-weight: 800;
  }
  .font-black {
    font-weight: 900;
  }

  /* === Line clamp === */
  [class*='line-clamp-'] {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
  .line-clamp-1 {
    -webkit-line-clamp: 1;
  }
  .line-clamp-2 {
    -webkit-line-clamp: 2;
  }
  .line-clamp-3 {
    -webkit-line-clamp: 3;
  }
  .line-clamp-4 {
    -webkit-line-clamp: 4;
  }
  .line-clamp-5 {
    -webkit-line-clamp: 5;
  }
  .line-clamp-6 {
    -webkit-line-clamp: 6;
  }

  /* === Line height === */
  .leading-none {
    line-height: 1;
  }
  .leading-xs {
    line-height: var(--lumo-line-height-xs);
  }
  .leading-s {
    line-height: var(--lumo-line-height-s);
  }
  .leading-m {
    line-height: var(--lumo-line-height-m);
  }

  /* === List style type === */
  .list-none {
    list-style-type: none;
  }

  /* === Text alignment === */
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-justify {
    text-align: justify;
  }

  /* === Text color === */
  .text-header {
    color: var(--lumo-header-text-color);
  }
  .text-body {
    color: var(--lumo-body-text-color);
  }
  .text-secondary {
    color: var(--lumo-secondary-text-color);
  }
  .text-tertiary {
    color: var(--lumo-tertiary-text-color);
  }
  .text-disabled {
    color: var(--lumo-disabled-text-color);
  }
  .text-primary {
    color: var(--lumo-primary-text-color);
  }
  .text-primary-contrast {
    color: var(--lumo-primary-contrast-color);
  }
  .text-error {
    color: var(--lumo-error-text-color);
  }
  .text-error-contrast {
    color: var(--lumo-error-contrast-color);
  }
  .text-success {
    color: var(--lumo-success-text-color);
  }
  .text-success-contrast {
    color: var(--lumo-success-contrast-color);
  }
  .text-warning {
    color: var(--lumo-warning-text-color);
  }
  .text-warning-contrast {
    color: var(--lumo-warning-contrast-color);
  }

  /* == Text decoration === */
  .line-through {
    text-decoration-line: line-through;
  }
  .no-underline {
    text-decoration-line: none;
  }
  .underline {
    text-decoration-line: underline;
  }

  /* === Text overflow === */
  .overflow-clip {
    text-overflow: clip;
  }
  .overflow-ellipsis {
    text-overflow: ellipsis;
  }

  /* === Text transform === */
  .capitalize {
    text-transform: capitalize;
  }
  .lowercase {
    text-transform: lowercase;
  }
  .uppercase {
    text-transform: uppercase;
  }

  /* === Whitespace === */
  .whitespace-normal {
    white-space: normal;
  }
  .whitespace-break-spaces {
    white-space: normal;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre {
    white-space: pre;
  }
  .whitespace-pre-line {
    white-space: pre-line;
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .sm\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .sm\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .sm\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .sm\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .sm\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .sm\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .sm\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 768px) {
    .md\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .md\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .md\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .md\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .md\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .md\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .md\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .md\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1024px) {
    .lg\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .lg\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .lg\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .lg\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .lg\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .lg\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .lg\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .lg\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1280px) {
    .xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .\\32xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .\\32xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .\\32xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .\\32xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .\\32xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .\\32xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .\\32xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Mo=x`
${rl}
${nl}
${al}
${sl}
${ll}
${cl}
${dl}
${ul}
${pl}
${ml}
${hl}
`;Ft("",Mo,{moduleId:"lumo-utility"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ge("utility",Mo);const vl=t=>{const e=[];t!==document&&(e.push(We(Oo.cssText,"",t,!0)),e.push(We(Lo.cssText,"",t,!0)),e.push(We(Ar.cssText,"",t,!0)),e.push(We(zo.cssText,"",t,!0)),e.push(We(Mo.cssText,"",t,!0)))},gl=vl;gl(document);export{na as D,Cs as E,Z as I,N as L,te as N,le as O,ia as P,wl as T,bl as X,yl as Z,vo as _,ge as a,qs as b,x as c,Hs as d,we as e,ra as f,Se as g,b as h,Lo as i,Oo as j,We as k,R as l,Ss as m,$ as n,Ea as o,wa as p,Ft as r,Pe as s,Cr as t,lr as u,Sa as w,ks as x,_a as y};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./vaadin-big-decimal-field-e51def24-CzFMke4m.js","./vaadin-text-field-0b3db014-Bhe5HKkb.js","./vaadin-button-2511ad84-CtEhsTkA.js","./vaadin-checkbox-group-a7c65bf2-BYl8iJdl.js","./vaadin-checkbox-4e68df64-BThz5U5s.js","./vaadin-combo-box-96451ddd-p3qfP0U9.js","./vaadin-confirm-dialog-4d718829-C4TCq13I.js","./vaadin-custom-field-42c85b9e-DhjmgTDV.js","./vaadin-date-picker-f2001167-Bsjp3QoC.js","./vaadin-date-time-picker-c8c047a7-Cus42mS5.js","./vaadin-email-field-d7a35f04-CqhwhP4Z.js","./vaadin-grid-pro-ff415555-By7FHJLx.js","./vaadin-grid-0a4791c2-5NhYkU1i.js","./vaadin-integer-field-85078932-DtBqRDU8.js","./vaadin-login-form-638996c6-CmBnIbGB.js","./vaadin-login-overlay-f8a5db8a-fRlFYEet.js","./vaadin-message-input-996ac37c-BOSWiDEG.js","./vaadin-multi-select-combo-box-a3373557-BKgMNAfJ.js","./vaadin-number-field-cb3ee8b2-D-7FSH4c.js","./vaadin-password-field-d289cb18-B0hWA2_-.js","./vaadin-radio-group-88b5afd8-B-ye9SoE.js","./vaadin-select-df6e9947-BktKJpLf.js","./vaadin-text-area-83627ebc-BYBKyrnW.js","./vaadin-time-picker-715ec415-DRiaHBAG.js","./vaadin-upload-d3c162ed-De-xPrQF.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}