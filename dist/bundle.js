(()=>{var e={160:()=>{var e=document.querySelector("a");e.addEventListener("click",(function(t){t.preventDefault();var n=e.getAttribute("href").substr(1);document.getElementById(n).scrollIntoView({behavior:"smooth",block:"start"})}))}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}(()=>{"use strict";var e,t,r,o,a,c,u,l,i,s,d,m,v,f,p,h,g,y,b,E=function(e){var t=e.duration,n=e.draw,r=e.timing,o=performance.now();requestAnimationFrame((function e(a){var c=(a-o)/t;c>1&&(c=1);var u=r(c);n(u),c<1&&requestAnimationFrame(e)}))};function S(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){u=!0,a=e},f:function(){try{c||null==n.return||n.return()}finally{if(u)throw a}}}}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n(160),e=document.querySelector("#timer-hours"),t=document.querySelector("#timer-minutes"),r=document.querySelector("#timer-seconds"),o=null,a=function(e){return e>0&&e<10?"0"+e:e},(c=function(){var n,c,u,l=(n=(new Date("27 july 2021").getTime()-(new Date).getTime())/1e3,c=Math.floor(n%60),u=Math.floor(n/60%60),{timeRemaining:n,hours:Math.floor(n/60/60),minutes:u,seconds:c});l.hours<=0&&l.minutes<=0&&l.seconds<=0?(clearInterval(o),e.textContent="00",t.textContent="00",r.textContent="00"):(e.textContent=a(l.hours),t.textContent=a(l.minutes),r.textContent=a(l.seconds))})(),o=setInterval(c,1e3),u=document.querySelector("menu"),l=document.querySelector(".close-btn"),u.querySelectorAll("a").forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault();var t=e.target.getAttribute("href").substr(1);document.getElementById(t).scrollIntoView({behavior:"smooth",block:"start"})}))})),document.addEventListener("click",(function(e){var t=e.target;t.closest(".menu")?document.documentElement.clientWidth>768?E({duration:400,timing:function(e){return e},draw:function(e){var t=200*e-100;u.style.transform="translate(".concat(t,"%)")}}):u.style.transform&&"translate(-100%)"!==u.style.transform||(u.style.transform="translate(100%)"):!t.closest("a")&&t.closest("menu")||(u.style.transform="translate(-100%)")})),l.addEventListener("click",(function(e){return e.preventDefault()})),i=document.querySelector(".popup"),s=document.querySelectorAll(".popup-btn"),d=document.querySelector(".popup-content"),m=function(){E({duration:500,timing:function(e){return e},draw:function(e){var t=d.getBoundingClientRect().top,n=document.documentElement.clientHeight/5,r=(n- -100)*e-100;t<n&&(d.style.transform="translateY(".concat(r,"%)"))}})},s.forEach((function(e){e.addEventListener("click",(function(){var e=document.documentElement.clientWidth,t=document.querySelector(".popup-content"),n=100*(e-400)/(2*e);t.style.left="".concat(n,"%"),e>768?(i.style.display="block",t.style.transform="translateY(-100%)",m()):i.style.display="block"}))})),i.addEventListener("click",(function(e){var t=e.target;t.classList.contains("popup-close")?i.style.display="none":(t=t.closest(".popup-content"))||(i.style.display="none")})),v=document.querySelector(".service-header"),f=v.querySelectorAll(".service-header-tab"),p=document.querySelectorAll(".service-tab"),v.addEventListener("click",(function(e){var t=e.target;(t=t.closest(".service-header-tab"))&&f.forEach((function(e,n){e===t&&function(e){for(var t=0;t<p.length;t++)e===t?(f[t].classList.add("active"),p[t].classList.remove("d-none")):(f[t].classList.remove("active"),p[t].classList.add("d-none"))}(n)}))})),function(){var e,t=document.querySelectorAll(".portfolio-item"),n=document.querySelector(".portfolio-content"),r=document.querySelector(".portfolio-dots");(e=document.createElement("li")).classList.add("dot"),t.forEach((function(t,n){t[n]=e.cloneNode(!0),r.append(t[n])})),document.querySelectorAll(".dot")[0].classList.add("dot-active");var o=document.querySelectorAll(".dot"),a=0,c=null,u=function(e,t,n){e[t].classList.remove(n)},l=function(e,t,n){e[t].classList.add(n)},i=function(){u(t,a,"portfolio-item-active"),u(o,a,"dot-active"),++a>=t.length&&(a=0),l(t,a,"portfolio-item-active"),l(o,a,"dot-active")},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;c=setInterval(i,e)};n.addEventListener("click",(function(e){e.preventDefault();var n=e.target;n.matches(".portfolio-btn, .dot")&&(u(t,a,"portfolio-item-active"),u(o,a,"dot-active"),n.matches("#arrow-right")?a++:n.matches("#arrow-left")?a--:n.matches(".dot")&&o.forEach((function(e,t){e===n&&(a=t)})),a>=t.length&&(a=0),a<0&&(a=t.length-1),l(t,a,"portfolio-item-active"),l(o,a,"dot-active"))})),n.addEventListener("mouseover",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(c)})),n.addEventListener("mouseout",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&s(1500)})),s(1500)}(),(y=document.querySelector(".command")).addEventListener("mouseover",(function(e){h=e.target.dataset.img,g=e.target.getAttribute("src"),e.target.classList.contains("command__photo")&&(e.target.src=h)})),y.addEventListener("mouseout",(function(e){e.target.classList.contains("command__photo")&&(e.target.src=g)})),document.body.addEventListener("input",(function(e){var t=e.target;"Общая площадь*"!==t.placeholder&&"Количество помещений"!==t.placeholder&&"Срок исполнения (в днях)"!==t.placeholder||(t.value=t.value.replace(/[^0-9]/g,"")),"user_name"===t.name&&(t.value=t.value.replace(/[^а-яА-ЯёЁ-\s]/g,"")),"user_message"===t.name&&(t.value=t.value.replace(/[^а-яА-ЯёЁ0-9\.\s\-_,:;]/gm,"")),"user_email"===t.name&&(t.setAttribute("type","text"),t.value=t.value.replace(/[^\w-@\.\!\~\*\'\$]/g,"")),"user_phone"===t.name&&(t.setAttribute("type","text"),function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"+7 (___) ___-__-__",r=document.querySelectorAll(e),o=function(e){var t=e.keyCode,r=n,o=r.replace(/\D/g,""),a=this.value.replace(/\D/g,""),c=0,u=r.replace(/[_\d]/g,(function(e){return c<a.length?a.charAt(c++)||o.charAt(c):e}));-1!=(c=u.indexOf("_"))&&(u=u.slice(0,c));var l=r.substr(0,this.value.length).replace(/_+/g,(function(e){return"\\d{1,"+e.length+"}"})).replace(/[+()]/g,"\\$&");(!(l=new RegExp("^"+l+"$")).test(this.value)||this.value.length<5||t>47&&t<58)&&(this.value=u),"blur"===e.type&&this.value.length<5&&(this.value="")},a=S(r);try{for(a.s();!(t=a.n()).done;){var c=t.value;c.addEventListener("input",o),c.addEventListener("focus",o),c.addEventListener("blur",o)}}catch(e){a.e(e)}finally{a.f()}}(".form-phone"))})),b={correctName:!0,correctMail:!0,correctTel:!0,correctMess:!0},document.body.addEventListener("change",(function(e){var t=e.target,n=function(e){var n=t.closest("form");if(n){var r=n.querySelector(".form-btn");t.style.border=e?"3px solid #fe193f":"3px solid #19fe52",Object.values(b).every((function(e){return e}))?r.disabled=!1:r.disabled=!0}};if("user_message"===t.name||"user_name"===t.name||"user_phone"===t.name){var r=[/\s+/gm,/-+/gm,/,+/gm,/;+/gm,/:+/gm,/\.+/gm];[" ","-",",",";",":","."].forEach((function(e,n){t.value=t.value.replace(r[n],e)}))," "===t.value?(t.value="",b.correctMess=!1,n(!0)):(b.correctMess=!0,n(!1))}if("user_name"===t.name){t.value=t.value.replace(/\s+/g," ");var o=t.value.trim().split(" "),a="";o.forEach((function(e){a+="".concat(e.charAt(0).toUpperCase()+e.substring(1).toLowerCase())}))," "===a?(t.value="",b.correctName=!1,n(!0)):a.length<3?(t.value=a,b.correctName=!1,n(!0)):(t.value=a,b.correctName=!0,n(!1))}"user_email"===t.name&&(/^[\w\-\.\!\~\*\']+@[\w\-\.\!\~\*\']+(\.[a-z]{2,})$/.test(t.value)?(b.correctMail=!0,n(!1)):(b.correctMail=!1,n(!0))),"user_phone"===e.target.name&&(e.target.value=e.target.value.replace(/^\+\d{1}\s/g,"+7 "),e.target.value.replace(/[\s\+\(\)-]*/g,"").length<11?(b.correctTel=!1,n(!0)):(b.correctTel=!0,n(!1)))})),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=document.querySelector(".calc-block"),n=document.querySelector(".calc-square"),r=document.querySelector(".calc-count"),o=document.querySelector(".calc-day"),a=document.getElementById("total"),c=document.querySelector(".calc-type"),u=function(){var t=0,u=1,l=1,i=c.options[c.selectedIndex].value,s=+n.value;r.value>1&&(u+=(r.value-1)/10),o.value&&o.value<5?l*=2:o.value&&o.value<10&&(l*=1.5),i&&s&&(t=Math.round(e*i*s*l*u)),E({duration:700,timing:function(e){return e},draw:function(e){a.textContent=Math.round(t*e)}}),0===t&&(n.value="",r.value="",o.value="")};t.addEventListener("change",(function(e){(e.target.matches("select")||e.target.matches("input"))&&u()}))}(),function(){var e="Что-то пошло не так...",t="Загрузка...",n="Спасибо! Мы скоро свяжемся с Вами!",r=document.querySelector("#form1"),o=document.querySelector("#form2"),a=document.querySelector("#form3"),c=document.querySelectorAll("input"),u=document.createElement("div");u.style.cssText="font-size: 2rem;\n                                   color: white;";var l=function(e){return fetch("../server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:e,credentials:"include"})},i=function(){c.forEach((function(e){e.value="",e.style.border="none"}))};r.addEventListener("submit",(function(o){o.preventDefault(),r.append(u),u.textContent=t;var a=new FormData(r);l(a).then((function(e){if(200!==e.status)throw new Error("Status Network not 200");u.textContent=n})).catch((function(t){u.textContent=e,console.error(t)})),i()})),o.addEventListener("submit",(function(r){r.preventDefault(),o.append(u),u.textContent=t;var a=new FormData(o);l(a).then((function(e){if(200!==e.status)throw new Error("Status Network not 200");u.textContent=n})).catch((function(t){u.textContent=e,console.error(t)})),i()})),a.addEventListener("submit",(function(r){r.preventDefault(),a.append(u),u.textContent=t;var o=new FormData(a);l(o).then((function(e){if(200!==e.status)throw new Error("Status Network not 200");u.textContent=n})).catch((function(t){u.textContent=e,console.error(t)})),i()}))}()})()})();