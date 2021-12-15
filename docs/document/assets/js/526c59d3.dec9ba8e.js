"use strict";(self.webpackChunkartplayer_document=self.webpackChunkartplayer_document||[]).push([[338],{3905:function(e,n,t){t.d(n,{Zo:function(){return m},kt:function(){return d}});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=o.createContext({}),l=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},m=function(e){var n=l(e.components);return o.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},p=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),p=l(t),d=r,y=p["".concat(s,".").concat(d)]||p[d]||u[d]||a;return t?o.createElement(y,i(i({ref:n},m),{},{components:t})):o.createElement(y,i({ref:n},m))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=p;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<a;l++)i[l]=t[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}p.displayName="MDXCreateElement"},8249:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return m},default:function(){return p}});var o=t(7462),r=t(3366),a=(t(7294),t(3905)),i=["components"],c={title:"Handle a single component",sidebar_position:3},s=void 0,l={unversionedId:"en/Questions/Handle single component",id:"en/Questions/Handle single component",isDocsHomePage:!1,title:"Handle a single component",description:"When we add custom components in layers, contextmenu, controls, setting, It is best to add a name property that is used to position the DOM element of the component.",source:"@site/docs/en/Questions/Handle single component.md",sourceDirName:"en/Questions",slug:"/en/Questions/Handle single component",permalink:"/document/en/Questions/Handle single component",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Handle a single component",sidebar_position:3},sidebar:"en",previous:{title:"Add button to the controls",permalink:"/document/en/Questions/Create button in the controls"},next:{title:"How to import types",permalink:"/document/en/Questions/How to import types"}},m=[],u={toc:m};function p(e){var n=e.components,t=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"When we add custom components in ",(0,a.kt)("inlineCode",{parentName:"p"},"layers"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"contextmenu"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"controls"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"setting"),", It is best to add a ",(0,a.kt)("inlineCode",{parentName:"p"},"name")," property that is used to position the DOM element of the component."),(0,a.kt)("p",null,"Here are three ways to get the DOM element of the component: component method ",(0,a.kt)("inlineCode",{parentName:"p"},"mounted"),", instance method ",(0,a.kt)("inlineCode",{parentName:"p"},"query"),", recommended through ",(0,a.kt)("inlineCode",{parentName:"p"},"name")," direct acquisition."),(0,a.kt)("div",{className:"run-code"},"\u25b6 Run Code"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"var art = new Artplayer({\n    container: '.artplayer-app',\n    url: '/assets/sample/video.mp4',\n    setting: true,\n});\n\nart.on('ready', () => {\n    art.layers.add({\n        name: 'layer1',\n        html: 'your-layer',\n        mounted: function($layer1) {\n            //\n        }\n    });\n\n    art.contextmenu.add({\n        name: 'contextmenu1',\n        html: 'your-contextmenu',\n        mounted: function($contextmenu1) {\n            //\n        }\n    });\n\n    art.controls.add({\n        name: 'control1',\n        html: 'your-control',\n        position: 'right',\n        mounted: function($control1) {\n            //\n        }\n    });\n\n    art.setting.add({\n        name: 'setting1',\n        html: 'your-setting',\n        mounted: function($setting1) {\n            //\n        }\n    });\n\n    // Use the query method to get the DOM element of the component\n    var $layer1 = art.query('.art-layer-layer1');\n    var $contextmenu1 = art.query('.art-contextmenu-contextmenu1');\n    var $control1 = art.query('.art-control-control1');\n    var $setting1 = art.query('.art-setting-setting1');\n\n    // Recommended use the name to get the DOM element of the component\n    var $layer1 = art.layers['layer1'];\n    var $contextmenu1 = art.contextmenu['contextmenu1'];\n    var $control1 = art.controls['control1'];\n    var $setting1 = art.setting['setting1'];\n});\n")),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"\u63d0\u793a")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Note that you can't create components with the same name"))))}p.isMDXComponent=!0}}]);