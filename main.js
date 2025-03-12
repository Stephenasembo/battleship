(()=>{"use strict";var e={936:(e,t,n)=>{n.d(t,{A:()=>s});var o=n(601),r=n.n(o),i=n(314),a=n.n(i)()(r());a.push([e.id,"#player1 {\n  display: flex;\n  flex-direction: column;\n}\n\n#player2 {\n  display: flex;\n  flex-direction: column;\n}\n\n@media (min-width: 600px) {\n  .board button {\n    width: 30px;\n  }\n  .board > div {\n    height: 30px;\n  }\n  #infoDiv {\n    width: max-content;\n  }\n}\n\n@media (min-width: 1000px) {\n  #turnDialog {\n    margin-left: 30%;\n  }\n}",""]);const s=a},386:(e,t,n)=>{n.d(t,{A:()=>h});var o=n(601),r=n.n(o),i=n(314),a=n.n(i),s=n(417),l=n.n(s),c=new URL(n(215),n.b),u=new URL(n(393),n.b),p=a()(r()),d=l()(c),m=l()(u);p.push([e.id,`.shipHit {\n  background-image: url(${d});\n  background-size: cover;\n  background-position: center;\n}\n\n.missedHit {\n  background-image: url(${m});\n  background-size: cover;\n  background-position: center;\n}`,""]);const h=p},159:(e,t,n)=>{n.d(t,{A:()=>s});var o=n(601),r=n.n(o),i=n(314),a=n.n(i)()(r());a.push([e.id,":root * {\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n\n#container {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 1fr;\n  gap: 10px;\n  position: relative;\n}\n\n.board button {\n  width: 10%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  vertical-align: middle;\n}\n\nbutton {\n  border: 1px solid rgb(202, 202, 202);\n}\n\n.board > div {\n  width: 100%;\n  height: 15px;\n}\n\n.startCol {\n  border-top: 1px solid blue;\n  border-left: 1px solid blue;\n  border-bottom: 1px solid blue;\n  border-right: none;\n}\n\n.endCol {\n  border-top: 1px solid blue;\n  border-right: 1px solid blue;\n  border-bottom: 1px solid blue;\n  border-left: none;\n}\n\n.midCol {\n  border-top: 1px solid blue;\n  border-bottom: 1px solid blue;\n  border-right: none;\n  border-left: none;\n}\n\n.onlyCol {\n  border: 1px solid blue;\n}\n\n.ship {\n  background-color: grey;\n}\n\n#player1, #player2 {\n  display: flex;\n}\n\n#p1ShipPlacement > button, #p2ShipPlacement > button {\n  margin: 10px;\n  padding: 10px;\n  border-radius: 16px;\n  font-size: 16px;\n  background-color: #1F2937;\n  color: #fff;\n}\n\n#p1Submit, #p1Cancel, #p2Submit, #p2Cancel {\n  padding: 10px;\n  border-radius: 16px;\n  font-size: 16px;\n  margin: 4px;\n  background-color: #1F2937;\n  color: #fff;\n}\n\n#p1ShipPlacement > button:hover, #p2ShipPlacement > button:hover,\n#p1Submit:hover, #p1Cancel:hover, #p2Submit:hover, #p2Cancel:hover {\n  background-color: #9CA3AF;\n  color: #000;\n}\n\n#turnDialog {\n  position: absolute;\n  top: 5px;\n  border-radius: 25px;\n  width: max-content;\n  padding: 4px;\n  margin: 0px auto;\n  font-size: 14px;\n  transition: visibility 2s;\n}\n\n#turnDialog > p {\n  margin: 2px;\n}\n\n.invisible {\n  visibility: hidden;\n}\n\n#infoDiv {\n  border: 2px red solid;\n  border-radius: 10px;\n  background-color: rgb(223 223 84);\n  margin: auto;\n  padding: 3px;\n}\n\n.winDialog {\n  text-align: center;\n}\n\n.winImg {\n  height: 100%;\n  width: 100%;\n}\n\n.winDialog > button {\n  padding: 10px;\n  border-radius: 16px;\n  font-size: 16px;\n}",""]);const s=a},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",o=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),o&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),o&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,o,r,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(o)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(a[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);o&&a[u[0]]||(void 0!==i&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=i),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),r&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=r):u[4]="".concat(r)),t.push(u))}},t}},417:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]|(%20)/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var t=[];function n(e){for(var n=-1,o=0;o<t.length;o++)if(t[o].identifier===e){n=o;break}return n}function o(e,o){for(var i={},a=[],s=0;s<e.length;s++){var l=e[s],c=o.base?l[0]+o.base:l[0],u=i[c]||0,p="".concat(c," ").concat(u);i[c]=u+1;var d=n(p),m={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==d)t[d].references++,t[d].updater(m);else{var h=r(m,o);o.byIndex=s,t.splice(s,0,{identifier:p,updater:h,references:1})}a.push(p)}return a}function r(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,r){var i=o(e=e||[],r=r||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var s=n(i[a]);t[s].references--}for(var l=o(e,r),c=0;c<i.length;c++){var u=n(i[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}i=l}}},659:e=>{var t={};e.exports=function(e,n){var o=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,r&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(o,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},215:(e,t,n)=>{e.exports=n.p+"cfd6969a80fa5b00a2e0.gif"},393:(e,t,n)=>{e.exports=n.p+"6a320e19d75ed3ca7d5b.gif"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={id:o,exports:{}};return e[o](i,i.exports,n),i.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var o=t.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!e||!/^http(s?):/.test(e));)e=o[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.b=document.baseURI||self.location.href,n.nc=void 0,n.d({},{a8:()=>D,Dv:()=>N,LM:()=>G,ms:()=>Q});class o{constructor(e){this.length=e,this.hits=0}hit(){return this.hits+=1,this.hits}isSunk(){return this.hits>=this.length}}function r(e){const t=function(){const e=[];for(let t=0;t<10;t+=1){const t=[];for(let e=0;e<10;e+=1){const e=[];t.push(e)}e.push(t)}const t=new Set,n=new Set,r=new Set,i=new Set;let a=0;const s=[];function l(e=0){const t=Math.floor(10*Math.random()),n=Math.floor(10*Math.random());return n>e?l():[n,t]}function c(e,n=0){const o=l(n),r=[];let i=o[0];const a=o[1];for(let o=0;o<e;o+=1){const o=JSON.stringify([i,a]);if(t.has(o))return c(e,n);r.push([i,a]),i+=1}return r.forEach((e=>{t.add(JSON.stringify(e))})),r}return{board:e,getRandomLocation:l,createPlayerShip:function(){let e=0;const t=[];do{if(0===e){const e=new o(4);t.push(e)}else if(e<3){const e=new o(3);t.push(e)}else if(e<6){const e=new o(2);t.push(e)}else if(e>=6){const e=new o(1);t.push(e)}e+=1}while(e<10);return t},placeShip:function(e){const t=e,n=[];for(let e=0;e<t.length;e+=1){if(4===t[e].length){const o=c(4,6);t[e].boardLocation=o,n.push(o)}if(3===t[e].length){const o=c(3,7);t[e].boardLocation=o,n.push(o)}if(2===t[e].length){const o=c(2,8);t[e].boardLocation=o,n.push(o)}if(1===t[e].length){const o=c(1,9);t[e].boardLocation=o,n.push(o)}}return n},markedLocation:t,receiveAttack:function(e,o,l){if(t.has(JSON.stringify(e))){if(r.has(JSON.stringify(e)))return"invalid move";const t=e[0],n=e[1];let i=o.filter((e=>e.find((e=>function(e,t){return e[0]===t[0]&&e[1]===t[1]}([t,n],e)))))[0];return i=l.find((e=>JSON.stringify(e.boardLocation)===JSON.stringify(i))),i.hit(),r.add(JSON.stringify(e)),i.hits===i.length&&(i.isSunk=!0,s.push(i),a+=1,o.length===a)?"All player ships sunk":"ship hit"}return n.has(JSON.stringify(e))?"invalid move":(n.add(JSON.stringify(e)),i.add(e),"missed shot")},missedShots:n,shipsHit:r,shipsSunkArr:s}}(),n=t.createPlayerShip();return{gameBoard:t,type:e,unplacedShips:n,isReady:!1,playerPlacedShips:[]}}var i=n(72),a=n.n(i),s=n(825),l=n.n(s),c=n(659),u=n.n(c),p=n(56),d=n.n(p),m=n(540),h=n.n(m),f=n(113),y=n.n(f),g=n(159),b={};b.styleTagTransform=y(),b.setAttributes=d(),b.insert=u().bind(null,"head"),b.domAPI=l(),b.insertStyleElement=h(),a()(g.A,b),g.A&&g.A.locals&&g.A.locals;const v=function(){const e=document.querySelector("#container"),t=document.querySelector("#p1Dialog"),n=document.querySelector("#p2Dialog"),o=document.querySelector("#p1Manual"),r=document.querySelector("#p1Auto"),i=document.querySelector("#p2Manual"),a=document.querySelector("#p2Auto"),s=document.querySelector(".infoPara"),l=document.querySelector("#turnDialog"),c=document.querySelector("#turnPara"),u=document.querySelector("#p1Hits"),p=document.querySelector("#p1SunkShips"),d=document.querySelector("#p1Hits"),m=document.querySelector("#p1SunkShips");return{container:e,p1Dialog:t,p2Dialog:n,p1ManualBtn:o,p1AutoBtn:r,p2ManualBtn:i,p2AutoBtn:a,player1Board:document.querySelector(".one"),player2Board:document.querySelector(".two"),infoPara:s,turnDialog:l,turnPara:c,p1HitsPara:u,p1SunkShipsPara:p,p2HitsPara:d,p2SunkShipsPara:m}}();function S(){return{p1SubmitBtn:document.querySelector("#p1Submit"),p1CancelBtn:document.querySelector("#p1Cancel"),p2SubmitBtn:document.querySelector("#p2Submit"),p2CancelBtn:document.querySelector("#p2Cancel"),p1size4:document.querySelector("#p1size4"),p1size3a:document.querySelector("#p1size3a"),p1size3b:document.querySelector("#p1size3b"),p1size2a:document.querySelector("#p1size2a"),p1size2b:document.querySelector("#p1size2b"),p1size2c:document.querySelector("#p1size2c"),p1size1a:document.querySelector("#p1size1a"),p1size1b:document.querySelector("#p1size1b"),p1size1c:document.querySelector("#p1size1c"),p1size1d:document.querySelector("#p1size1d"),p2size4:document.querySelector("#p2size4"),p2size3a:document.querySelector("#p2size3a"),p2size3b:document.querySelector("#p2size3b"),p2size2a:document.querySelector("#p2size2a"),p2size2b:document.querySelector("#p2size2b"),p2size2c:document.querySelector("#p2size2c"),p2size1a:document.querySelector("#p2size1a"),p2size1b:document.querySelector("#p2size1b"),p2size1c:document.querySelector("#p2size1c"),p2size1d:document.querySelector("#p2size1d")}}const z=n.p+"487767dafc5bab0c3275.mp3",x=n.p+"774ade3a7d0e715f1d5b.mp3",k=n.p+"fd2c2fea27379cbc44da.mp3",w=n.p+"2eb706e607d7caf368a9.gif",C=new Audio(z),A=new Audio(x),L=new Audio(k);function q(e){for(let t=0;t<2;t+=1){let n;const o=document.createElement("p");0===t?(n="p1",o.textContent="Player1's board"):(n="p2",o.textContent="Player2's board");for(let o=0;o<10;o+=1){const r=document.createElement("div");r.setAttribute("id",`${n}krow${o}`);for(let e=0;e<10;e+=1){const t=document.createElement("button");t.setAttribute("id",`${n}krow${o}kcol${e}`),r.appendChild(t)}e[t].displayBoard.appendChild(r)}e[t].displayBoard.appendChild(o)}}function B(e,t){let n,o;for(let r=0;r<e.length;r+=1){e.boardLocation?[n,o]=e.boardLocation[r]:[n,o]=e[r],o=o.toString(),n=n.toString();const i=`#${t}krow${o}kcol${n}`,a=document.querySelector(i);a.classList.toggle("ship"),0===r?r===e.length-1?a.classList.toggle("onlyCol"):a.classList.toggle("startCol"):r===e.length-1?a.classList.toggle("endCol"):a.classList.toggle("midCol")}}function P(e,t){"human"===e.type?(v.p1AutoBtn.removeEventListener("click",t),v.p1ManualBtn.removeEventListener("click",D)):"computer"===e.type&&(v.p2AutoBtn.removeEventListener("click",t),v.p2ManualBtn.removeEventListener("click",N))}function E(e){const t=e;t.playerPlacedShips=t.gameBoard.placeShip(t.unplacedShips),function(e){const t=e.playerPlacedShips;let n;"human"===e.type?n="p1":"computer"===e.type&&(n="p2");for(let e=0;e<t.length;e+=1)B(t[e],n)}(t),t.isReady=!0,console.log(t.playerPlacedShips)}function M(e){e.preventDefault(),"p1Cancel"===e.target.id?v.p1Dialog.close():v.p2Dialog.close()}function D(){v.p1Dialog.show();const e=S();e.p1SubmitBtn.addEventListener("submit",G),e.p1CancelBtn.addEventListener("click",M)}function N(){v.p2Dialog.show();const e=S();e.p2SubmitBtn.addEventListener("submit",Q),e.p2CancelBtn.addEventListener("click",M)}function H(e){const t=S();let n;return"human"===e.type?(v.p1Dialog.close(),n={size4:t.p1size4.value,size3a:t.p1size3a.value,size3b:t.p1size3b.value,size2a:t.p1size2a.value,size2b:t.p1size2b.value,size2c:t.p1size2c.value,size1a:t.p1size1a.value,size1b:t.p1size1b.value,size1c:t.p1size1c.value,size1d:t.p1size1d.value}):"computer"===e.type&&(v.p2Dialog.close(),n={size4:t.p2size4.value,size3a:t.p2size3a.value,size3b:t.p2size3b.value,size2a:t.p2size2a.value,size2b:t.p2size2b.value,size2c:t.p2size2c.value,size1a:t.p2size1a.value,size1b:t.p2size1b.value,size1c:t.p2size1c.value,size1d:t.p2size1d.value}),n}var T=n(936),$={};$.styleTagTransform=y(),$.setAttributes=d(),$.insert=u().bind(null,"head"),$.domAPI=l(),$.insertStyleElement=h(),a()(T.A,$),T.A&&T.A.locals&&T.A.locals;var O=n(386),R={};R.styleTagTransform=y(),R.setAttributes=d(),R.insert=u().bind(null,"head"),R.domAPI=l(),R.insertStyleElement=h(),a()(O.A,R),O.A&&O.A.locals&&O.A.locals;let I=r("human"),J=r("computer");function U(){let e=!1,t=I;function n(e){t===I?J.displayBoard.addEventListener("click",e):t===J&&I.displayBoard.addEventListener("click",e)}n((function o(r,i=null){let a;if(e)return;r?a=function(e){const t=e.split("k"),n=Number(t[1].split("row")[1]);return[Number(t[2].split("col")[1]),n]}(r.target.id):r||(a=i);const s=function(t,n){let o,r;n===I?(o="p2",r=J):(o="p1",r=I);const i=document.querySelector(`#${o}krow${t[1]}kcol${t[0]}`),a=r.gameBoard.receiveAttack(t,r.playerPlacedShips,r.unplacedShips);if(function(e,t){let n,o;"human"===e.type?(n=document.querySelector("#p1Hits"),o=document.querySelector("#p1SunkShips")):(n=document.querySelector("#p2Hits"),o=document.querySelector("#p2SunkShips")),n.textContent=`You have ${t.gameBoard.shipsHit.size} hits on the enemy's ships.`,o.textContent=`You have sunk ${t.gameBoard.shipsSunkArr.length} enemy ships.`}(n,r),"ship hit"===a)return i.textContent="x",(s=i).classList.toggle("shipHit"),C.play(),setTimeout((()=>s.classList.toggle("shipHit")),3e3),{valid:!0,status:"hit"};var s;if("missed shot"===a)return i.textContent="o",function(e){e.classList.toggle("missedHit"),A.play(),setTimeout((()=>e.classList.toggle("missedHit")),3e3)}(i),{valid:!0,status:"miss"};if("All player ships sunk"===a){let t;i.textContent="x",e=!0,"human"===n.type?t="player1":"computer"===n.type&&(t="player2"),function(e){const t=document.createElement("dialog"),n=document.createElement("p"),o=document.createElement("img");o.setAttribute("src",w),o.setAttribute("width","220"),o.setAttribute("height","150"),o.classList.add("winImg");const r=document.createElement("button");r.textContent="Restart Game",r.setAttribute("id","restart"),n.textContent=`\n  Congratulations ${e}.\n  You won the game`,t.appendChild(n),t.appendChild(o),t.appendChild(r),t.classList.add("winDialog"),v.container.appendChild(t),t.showModal(),L.play()}(t),document.querySelector("#restart").addEventListener("click",Y)}return{valid:!1}}(a,t);var l;if(s.valid&&"miss"===s.status&&(l=o,I.displayBoard.removeEventListener("click",l),J.displayBoard.removeEventListener("click",l),t===I?t=J:t===J&&(t=I),function(e){let t;t="human"===e?"player1":"player2",v.turnPara.textContent=`It's ${t}'s turn`,v.turnDialog.classList.toggle("invisible")}(t.type),n(o)),t===J){let e;if("hit"===s.status){const t=Array.from(I.gameBoard.shipsHit);e=JSON.parse(t[t.length-1]),e[0]=Number(e[0]),e[1]=Number(e[1])}setTimeout((()=>{const t=function(e=null){let t;return e?(e[0]<9?t=[e[0]+1,e[1]]:e[0]>0&&(t=[e[0]-1,e[1]]),t):(t=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],t)}(e);o(null,t)}),1400)}}))}function j(){I.isReady&&J.isReady&&(v.turnPara.textContent="Everyone is ready to play.",v.turnDialog.classList.toggle("invisible"),U())}function F(e=null,t=null){let n;e&&("p1Auto"===e.target.id?n=I:"p2Auto"===e.target.id&&(n=J)),t?(E(I),P(I,F),E(J),P(J,F)):(E(n),P(n,F),j())}function Y(){!function(){const e=document.querySelector(".winDialog");e.close(),v.container.removeChild(e)}(),I=r("human"),J=r("computer"),I.displayBoard=v.player1Board,J.displayBoard=v.player2Board,I.displayBoard.innerHTML="",J.displayBoard.innerHTML="",q([I,J]),F(null,!0),v.p1HitsPara.textContent="You have 0 hits on the enemy's ships",v.p1SunkShipsPara.textContent="You have sunk 0 enemy ships.",v.p2HitsPara.textContent="You have 0 hits on the enemy's ships",v.p2SunkShipsPara.textContent="You have sunk 0 enemy ships.",v.turnDialog.classList.toggle("invisible"),j()}function _(e,t){let n;n=e===I?"p1":"p2",function(e,t,n){const o=e.unplacedShips,r=Object.values(t);for(let t=0;t<r.length;t+=1){let i=r[t];i=i.split(" "),i=i.map((e=>e.split(",")));for(let e=0;e<i.length;e+=1)i[e]=i[e].map((e=>Number(e)));i=i.map((e=>e.map((e=>Number(e))))),o[t].boardLocation=i,e.playerPlacedShips.push(i),"human"===e.type&&B(o[t],n)}for(let t=0;t<e.playerPlacedShips.length;t+=1)e.playerPlacedShips[t].forEach((t=>{e.gameBoard.markedLocation.add(JSON.stringify(t))}))}(e,t,n),P(e,F),j()}function G(){const e=H(I);_(I,e),I.isReady=!0,P(I)}function Q(){const e=H(I);_(J,e),J.isReady=!0,P(J)}I.displayBoard=v.player1Board,J.displayBoard=v.player2Board,q([I,J]),v.turnDialog.show(),v.p1ManualBtn.addEventListener("click",D),v.p2ManualBtn.addEventListener("click",N),v.p1AutoBtn.addEventListener("click",F),v.p2AutoBtn.addEventListener("click",F)})();