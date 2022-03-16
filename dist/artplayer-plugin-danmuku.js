/*!
 * artplayer-plugin-danmuku.js v4.3.0
 * Github: https://github.com/zhw2590582/ArtPlayer#readme
 * (c) 2017-2022 Harvey Zack
 * Released under the MIT License.
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).artplayerPluginDanmuku=e()}(this,(function(){"use strict";function t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var n={"zh-cn":{"Danmu opacity":"弹幕透明度","Danmu speed":"弹幕速度","Danmu size":"弹幕大小","Danmu text cannot be empty":"弹幕文本不能为空","The length of the danmu does not exceed":"弹幕文本字数不能超过","Danmu speed synchronous playback multiple":"弹幕速度同步播放倍数"},"zh-tw":{"Danmu opacity":"彈幕透明度","Danmu speed":"彈幕速度","Danmu size":"弹幕大小","Danmu text cannot be empty":"彈幕文本不能為空","The length of the danmu does not exceed":"彈幕文本字數不能超過","Danmu speed synchronous playback multiple":"彈幕速度同步播放倍數"}};function r(t,e,n){return t.filter((function(t){return t.$state===e})).map(n)}function i(t,e){var n=t.getBoundingClientRect();return e?n[e]:n}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,i,a=[],o=!0,s=!1;try{for(n=n.call(t);!(o=(r=n.next()).done)&&(a.push(r.value),!e||a.length!==e);o=!0);}catch(t){s=!0,i=t}finally{try{o||null==n.return||n.return()}finally{if(s)throw i}}return a}}(t,e)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t){switch(t){case 1:case 2:case 3:default:return 0;case 4:case 5:return 1}}function u(t){return fetch(t).then((function(t){return t.text()})).then((function(t){return function(t){if("string"!=typeof t)return[];var e=t.match(/<d([\S ]*?>[\S ]*?)<\/d>/gi);return e&&e.length?e.map((function(t){var e=o(t.match(/<d p="(.+)">(.+)<\/d>/),3),n=e[1],r=e[2],i=n.split(",");return 8===i.length&&r.trim()?{text:r,time:Number(i[0]),mode:s(Number(i[1])),fontSize:Number(i[2]),color:"#".concat(Number(i[3]).toString(16)),timestamp:Number(i[4]),pool:Number(i[5]),userID:i[6],rowID:Number(i[7])}:null})):[]}(t)}))}function l(t,e){var n=o(t.option.margin,2),r=n[0],a=n[1],s=i(t.art.template.$player),u=t.queue.filter((function(t){return t.mode===e.mode&&"emit"===t.$state&&t.$ref&&t.$ref.style.fontSize===e.$ref.style.fontSize&&parseFloat(t.$ref.style.top)<=s.height-a})).map((function(t){var e=i(t.$ref),n=e.width,r=e.height,a=e.top-s.top,o=e.left-s.left;return{top:a,left:o,height:r,width:n,right:s.width-o-n}})).sort((function(t,e){return t.top-e.top}));return 0===u.length?r:(u.unshift({top:0,left:0,right:0,height:r,width:s.width}),u.push({top:s.height-a,left:0,right:0,height:a,width:s.width}),function(t){for(var e=0,n={},r=0;r<t.length;r+=1){var i=t[r];n[i.top]?n[i.top].push(i):n[i.top]=[i]}for(var a=Object.keys(n),s=0,u=1;u<t.length;u+=1){var l=t[u],f=t[u-1],c=f.top+f.height,h=l.top-c;h>s&&(e=c,s=h)}if(0===e)for(var p=0,m=0;m<a.length;m+=1){for(var d=t[0].width,y=a[m],g=n[y],b=0;b<g.length;b+=1){var $=g[b];$.right<d&&(d=$.right)}d>p&&(p=d,e=o(g,1)[0].top)}if(0===e){var v=a.filter((function(t,e){return 0!==e&&e!==a.length-1})).sort((function(t,e){return n[t].length-n[e].length}));e=o(v,1)[0]}return e}(u))}function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?f(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var h=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e.i18n.update(n),this.art=e,this.queue=[],this.option={},this.config(r),this.isStop=!1,this.isHide=!1,this.animationFrameTimer=null,this.$danmuku=e.template.$danmuku,e.on("video:play",this.start.bind(this)),e.on("video:playing",this.start.bind(this)),e.on("video:pause",this.stop.bind(this)),e.on("video:waiting",this.stop.bind(this)),e.on("resize",this.resize.bind(this)),e.on("destroy",this.stop.bind(this)),this.load()}var a,o,s;return a=t,o=[{key:"load",value:function(){var t=this;return"function"==typeof this.option.danmuku?this.option.danmuku().then((function(e){t.queue=[],t.$danmuku.innerText="",e.forEach(t.emit.bind(t)),t.art.emit("artplayerPluginDanmuku:loaded")})):"string"==typeof this.option.danmuku?u(this.option.danmuku).then((function(e){t.queue=[],t.$danmuku.innerText="",e.forEach(t.emit.bind(t)),t.art.emit("artplayerPluginDanmuku:loaded")})):(this.queue=[],this.$danmuku.innerText="",this.option.danmuku.forEach(this.emit.bind(this)),this.art.emit("artplayerPluginDanmuku:loaded")),this}},{key:"config",value:function(e){var n=this.art.constructor,r=n.utils.clamp,i=n.validator;return this.option=Object.assign({},t.option,this.option,e),i(this.option,t.scheme),this.option.speed=r(this.option.speed,1,10),this.option.maxlength=r(this.option.maxlength,10,100),this.option.margin[0]=r(this.option.margin[0],0,100),this.option.margin[1]=r(this.option.margin[1],0,100),this.option.opacity=r(this.option.opacity,0,1),this.option.fontSize=r(this.option.fontSize,12,30),this.art.emit("artplayerPluginDanmuku:config",this.option),this}},{key:"continue",value:function(){return r(this.queue,"stop",(function(t){t.$state="emit",t.$lastStartTime=Date.now(),0===t.mode&&(t.$ref.style.transform="translateX(".concat(-t.$restWidth,"px) translateY(0px) translateZ(0px)"),t.$ref.style.transition="transform ".concat(t.$restTime,"s linear 0s"))})),this}},{key:"suspend",value:function(){var t=this.art.template.$player;return r(this.queue,"emit",(function(e){if(e.$state="stop",0===e.mode){var n=i(t),r=n.left,a=n.width-(i(e.$ref).left-r)+5;e.$ref.style.transform="translateX(".concat(-a,"px) translateY(0px) translateZ(0px)"),e.$ref.style.transition="transform 0s linear 0s"}})),this}},{key:"resize",value:function(){var t=i(this.art.template.$player,"width");return r(this.queue,"wait",(function(e){e.$ref&&(e.$ref.style.border="none",e.$ref.style.left="".concat(t,"px"),e.$ref.style.marginLeft="0px",e.$ref.style.transform="translateX(0px) translateY(0px) translateZ(0px)",e.$ref.style.transition="transform 0s linear 0s")})),this}},{key:"update",value:function(){var t=this,e=this.art.template.$player;return this.animationFrameTimer=window.requestAnimationFrame((function(){if(t.art.playing&&!t.isHide){var n=i(e,"width");r(t.queue,"emit",(function(t){t.$restTime-=(Date.now()-t.$lastStartTime)/1e3,t.$lastStartTime=Date.now(),t.$restTime<=0&&(t.$state="wait",t.$ref.style.border="none",t.$ref.style.left="".concat(n,"px"),t.$ref.style.marginLeft="0px",t.$ref.style.transform="translateX(0px) translateY(0px) translateZ(0px)",t.$ref.style.transition="transform 0s linear 0s")})),t.queue.filter((function(e){return t.art.currentTime+.1>=e.time&&e.time>=t.art.currentTime-.1&&"wait"===e.$state})).forEach((function(e){e.$ref=function(t){var e=t.find((function(t){return t.$ref&&"wait"===t.$state}));if(e){var n=e.$ref;return e.$ref=null,n}var r=document.createElement("div");return r.style.cssText='\n        user-select: none;\n        position: absolute;\n        white-space: pre;\n        pointer-events: none;\n        perspective: 500px;\n        display: inline-block;\n        will-change: transform;\n        font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;\n        font-weight: normal;\n        line-height: 1.125;\n        text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;\n    ',r}(t.queue),t.$danmuku.appendChild(e.$ref),e.$ref.style.opacity=t.option.opacity,e.$ref.style.fontSize="".concat(t.option.fontSize,"px"),e.$ref.innerText=e.text,e.$ref.style.color=e.color||"#fff",e.$ref.style.border=e.border?"1px solid ".concat(e.color||"#fff"):"none",e.$restTime=t.option.synchronousPlayback&&t.art.playbackRate?t.option.speed/Number(t.art.playbackRate):t.option.speed,e.$lastStartTime=Date.now();var r=i(e.$ref,"width"),a=l(t,e);switch(e.$state="emit",e.mode){case 0:e.$restWidth=n+r+5,e.$ref.style.left="".concat(n,"px"),e.$ref.style.top="".concat(a,"px"),e.$ref.style.transform="translateX(".concat(-e.$restWidth,"px) translateY(0px) translateZ(0px)"),e.$ref.style.transition="transform ".concat(e.$restTime,"s linear 0s");break;case 1:e.$ref.style.top="".concat(a,"px"),e.$ref.style.left="50%",e.$ref.style.marginLeft="-".concat(r/2,"px")}}))}t.isStop||t.update()})),this}},{key:"stop",value:function(){return this.isStop=!0,this.suspend(),window.cancelAnimationFrame(this.animationFrameTimer),this.art.emit("artplayerPluginDanmuku:stop"),this}},{key:"start",value:function(){return this.isStop=!1,this.continue(),this.update(),this.art.emit("artplayerPluginDanmuku:start"),this}},{key:"show",value:function(){return this.isHide=!1,this.$danmuku.style.display="block",this.art.emit("artplayerPluginDanmuku:show"),this}},{key:"hide",value:function(){return this.isHide=!0,this.$danmuku.style.display="none",this.art.emit("artplayerPluginDanmuku:hide"),this}},{key:"emit",value:function(t){var e=this.art,n=e.notice,r=e.i18n,i=this.art.constructor,a=i.utils.clamp;return(0,i.validator)(t,{text:"string",mode:"number|undefined",color:"string|undefined",time:"number|undefined",border:"boolean|undefined"}),t.text.trim()?t.text.length>this.option.maxlength?(n.show="".concat(r.get("The length of the danmu does not exceed")," ").concat(this.option.maxlength),this):(t.time?t.time=a(t.time,0,1/0):t.time=this.art.currentTime+.5,this.queue.push(c(c({mode:0},t),{},{$state:"wait",$ref:null,$restTime:0,$lastStartTime:0,$restWidth:0})),this):(n.show=r.get("Danmu text cannot be empty"),this)}}],s=[{key:"option",get:function(){return{danmuku:[],speed:5,maxlength:50,margin:[10,100],opacity:1,fontSize:25,synchronousPlayback:!1}}},{key:"scheme",get:function(){return{danmuku:"array|function|string",speed:"number",maxlength:"number",margin:"array",opacity:"number",fontSize:"number",synchronousPlayback:"boolean"}}}],o&&e(a.prototype,o),s&&e(a,s),t}();return function(t){return function(e){var n=new h(e,t);return{name:"artplayerPluginDanmuku",emit:n.emit.bind(n),config:n.config.bind(n),hide:n.hide.bind(n),show:n.show.bind(n),get isHide(){return n.isHide}}}}}));
