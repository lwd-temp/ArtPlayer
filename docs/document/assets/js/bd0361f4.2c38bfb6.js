"use strict";(self.webpackChunkartplayer_document=self.webpackChunkartplayer_document||[]).push([[122],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),p=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,y=m["".concat(o,".").concat(d)]||m[d]||c[d]||l;return n?r.createElement(y,s(s({ref:t},u),{},{components:n})):r.createElement(y,s({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,s=new Array(l);s[0]=m;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var p=2;p<l;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2360:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(7294),a=n(6010),l="tabItem_OmH5";function s(e){var t=e.children,n=e.hidden,s=e.className;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(l,s),hidden:n},t)}},9877:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(7462),a=n(7294),l=n(2389),s=n(7392),i=n(7094),o=n(2466),p=n(6010),u="tabList_uSqn",c="tabItem_LplD";function m(e){var t,n,l,m=e.lazy,d=e.block,y=e.defaultValue,v=e.values,f=e.groupId,h=e.className,b=a.Children.map(e.children,(function(e){if((0,a.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),g=null!=v?v:b.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),k=(0,s.l)(g,(function(e,t){return e.value===t.value}));if(k.length>0)throw new Error('Docusaurus error: Duplicate values "'+k.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var N=null===y?y:null!=(t=null!=y?y:null==(n=b.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(l=b[0])?void 0:l.props.value;if(null!==N&&!g.some((function(e){return e.value===N})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+N+'" but none of its children has the corresponding value. Available values are: '+g.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var x=(0,i.U)(),j=x.tabGroupChoices,w=x.setTabGroupChoices,T=(0,a.useState)(N),A=T[0],O=T[1],I=[],Z=(0,o.o5)().blockElementScrollPositionUntilNextRender;if(null!=f){var E=j[f];null!=E&&E!==A&&g.some((function(e){return e.value===E}))&&O(E)}var P=function(e){var t=e.currentTarget,n=I.indexOf(t),r=g[n].value;r!==A&&(Z(t),O(r),null!=f&&w(f,r))},L=function(e){var t,n=null;switch(e.key){case"ArrowRight":var r=I.indexOf(e.currentTarget)+1;n=I[r]||I[0];break;case"ArrowLeft":var a=I.indexOf(e.currentTarget)-1;n=I[a]||I[I.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:(0,p.Z)("tabs-container",u)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,p.Z)("tabs",{"tabs--block":d},h)},g.map((function(e){var t=e.value,n=e.label,l=e.attributes;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:A===t?0:-1,"aria-selected":A===t,key:t,ref:function(e){return I.push(e)},onKeyDown:L,onFocus:P,onClick:P},l,{className:(0,p.Z)("tabs__item",c,null==l?void 0:l.className,{"tabs__item--active":A===t})}),null!=n?n:t)}))),m?(0,a.cloneElement)(b.filter((function(e){return e.props.value===A}))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},b.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==A})}))))}function d(e){var t=(0,l.Z)();return a.createElement(m,(0,r.Z)({key:String(t)},e))}},1975:function(e,t,n){n.r(t),n.d(t,{assets:function(){return m},contentTitle:function(){return u},default:function(){return v},frontMatter:function(){return p},metadata:function(){return c},toc:function(){return d}});var r=n(7462),a=n(3366),l=(n(7294),n(3905)),s=n(9877),i=n(2360),o=["components"],p={title:"Quick start",sidebar_position:1,slug:"/"},u=void 0,c={unversionedId:"en/Overview",id:"en/Overview",title:"Quick start",description:"Install",source:"@site/docs/en/Overview.mdx",sourceDirName:"en",slug:"/",permalink:"/document/",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Quick start",sidebar_position:1,slug:"/"},sidebar:"en",next:{title:"Basic options",permalink:"/document/options"}},m={},d=[{value:"Install",id:"install",level:2},{value:"Use",id:"use",level:2},{value:"Use in <code>Html</code>",id:"use-in-html",level:3},{value:"Use in <code>Vue.js</code> or <code>Nuxt.js</code>",id:"use-in-vuejs-or-nuxtjs",level:3},{value:"Use in <code>React.js</code> or <code>Next.js</code>",id:"use-in-reactjs-or-nextjs",level:3}],y={toc:d};function v(e){var t=e.components,n=(0,a.Z)(e,o);return(0,l.kt)("wrapper",(0,r.Z)({},y,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"install"},"Install"),(0,l.kt)(s.Z,{mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"npm",label:"npm",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm install artplayer\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"import Artplayer from 'artplayer';\n\nconst art = new Artplayer({\n    container: '.artplayer-app',\n    url: '/assets/sample/video.mp4',\n});\n"))),(0,l.kt)(i.Z,{value:"yarn",label:"yarn",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add artplayer\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"import Artplayer from 'artplayer';\n\nconst art = new Artplayer({\n    container: '.artplayer-app',\n    url: '/assets/sample/video.mp4',\n});\n"))),(0,l.kt)(i.Z,{value:"script",label:"script",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html",metastring:"showLineNumbers",showLineNumbers:!0},'\x3c!-- local --\x3e\n<script src="path/to/artplayer.js"><\/script>\n\n\x3c!-- jsdelivr --\x3e\n<script src="https://cdn.jsdelivr.net/npm/artplayer/dist/artplayer.js"><\/script>\n\n\x3c!-- unpkg --\x3e\n<script src="https://unpkg.com/artplayer/dist/artplayer.js"><\/script>\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:"showLineNumbers",showLineNumbers:!0},"const art = new window.Artplayer({\n    container: '.artplayer-app',\n    url: '/assets/sample/video.mp4',\n});\n")))),(0,l.kt)("h2",{id:"use"},"Use"),(0,l.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"Tip")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"The size of the player depends on the size of the ",(0,l.kt)("inlineCode",{parentName:"p"},"container"),", so your ",(0,l.kt)("inlineCode",{parentName:"p"},"container")," must have a size."))),(0,l.kt)("h3",{id:"use-in-html"},"Use in ",(0,l.kt)("inlineCode",{parentName:"h3"},"Html")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html",metastring:'showLineNumbers title="index.html"',showLineNumbers:!0,title:'"index.html"'},'<!DOCTYPE html>\n<html>\n    <head>\n        <title>ArtPlayer</title>\n        <meta charset="UTF-8" />\n        <style>\n            .artplayer-app {\n                width: 400px;\n                height: 300px;\n            }\n        </style>\n    </head>\n    <body>\n        <div class="artplayer-app"></div>\n        <script src="path/to/artplayer.js"><\/script>\n        <script>\n            var art = new Artplayer({\n                container: \'.artplayer-app\',\n                url: \'/assets/sample/video.mp4\',\n            });\n        <\/script>\n    </body>\n</html>\n')),(0,l.kt)("h3",{id:"use-in-vuejs-or-nuxtjs"},"Use in ",(0,l.kt)("inlineCode",{parentName:"h3"},"Vue.js")," or ",(0,l.kt)("inlineCode",{parentName:"h3"},"Nuxt.js")),(0,l.kt)(s.Z,{mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"Vue.js",label:"Vue.js Template",mdxType:"TabItem"},(0,l.kt)("p",null,"\ud83d\ude80 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/zhw2590582/ArtPlayer/tree/master/packages/artplayer-template/vue.js"},"artplayer-template/vue.js"))),(0,l.kt)(i.Z,{value:"Nuxt.js",label:"Nuxt.js Template",mdxType:"TabItem"},(0,l.kt)("p",null,"\ud83d\ude80 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/zhw2590582/ArtPlayer/tree/master/packages/artplayer-template/nuxt.js"},"artplayer-template/nuxt.js")))),(0,l.kt)(s.Z,{mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"Artplayer.vue",label:"Artplayer.vue",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'showLineNumbers title="Artplayer.vue"',showLineNumbers:!0,title:'"Artplayer.vue"'},'<template>\n  <div ref="artRef"></div>\n</template>\n\n<script>\nimport Artplayer from "artplayer";\n\nexport default {\n  data() {\n    return {\n      instance: null,\n    };\n  },\n  props: {\n    option: {\n      type: Object,\n      required: true,\n    },\n  },\n  mounted() {\n    this.instance = new Artplayer({\n      ...this.option,\n      container: this.$refs.artRef,\n    });\n\n    this.$nextTick(() => {\n      this.$emit("get-instance", this.instance);\n    });\n  },\n  beforeUnmount() {\n    if (this.instance && this.instance.destroy) {\n      this.instance.destroy(false);\n    }\n  },\n};\n<\/script>\n'))),(0,l.kt)(i.Z,{value:"App.vue",label:"App.vue",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js",metastring:'showLineNumbers title="App.vue"',showLineNumbers:!0,title:'"App.vue"'},'<template>\n  <Artplayer @get-instance="getInstance" :option="option" :style="style" />\n</template>\n\n<script>\nimport Artplayer from "./Artplayer.vue";\n\nexport default {\n  data() {\n    return {\n      option: {\n        url: "https://artplayer.org/assets/sample/video.mp4",\n      },\n      style: {\n        width: "600px",\n        height: "400px",\n        margin: "60px auto 0",\n      },\n    };\n  },\n  components: {\n    Artplayer,\n  },\n  methods: {\n    getInstance(art) {\n      console.log(art);\n    },\n  },\n};\n<\/script>\n')))),(0,l.kt)("h3",{id:"use-in-reactjs-or-nextjs"},"Use in ",(0,l.kt)("inlineCode",{parentName:"h3"},"React.js")," or ",(0,l.kt)("inlineCode",{parentName:"h3"},"Next.js")),(0,l.kt)(s.Z,{mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"React.js",label:"React.js Template",mdxType:"TabItem"},(0,l.kt)("p",null,"\ud83d\ude80 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/zhw2590582/ArtPlayer/tree/master/packages/artplayer-template/react.js"},"artplayer-template/react.js"))),(0,l.kt)(i.Z,{value:"Next.js",label:"Next.js Template",mdxType:"TabItem"},(0,l.kt)("p",null,"\ud83d\ude80 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/zhw2590582/ArtPlayer/tree/master/packages/artplayer-template/next.js"},"artplayer-template/next.js")))),(0,l.kt)(s.Z,{mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"ArtPlayer.jsx",label:"ArtPlayer.jsx",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'showLineNumbers title="ArtPlayer.jsx"',showLineNumbers:!0,title:'"ArtPlayer.jsx"'},"import { useEffect, useRef } from 'react';\nimport Artplayer from 'artplayer';\n\nexport default function Player({ option, getInstance, ...rest }) {\n    const artRef = useRef();\n\n    useEffect(() => {\n        const art = new Artplayer({\n            ...option,\n            container: artRef.current,\n        });\n\n        if (getInstance && typeof getInstance === 'function') {\n            getInstance(art);\n        }\n\n        return () => {\n            if (art && art.destroy) {\n                art.destroy(false);\n            }\n        };\n    }, []);\n\n    return <div ref={artRef} {...rest}></div>;\n}\n"))),(0,l.kt)(i.Z,{value:"App.jsx",label:"App.jsx",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'showLineNumbers title="App.jsx"',showLineNumbers:!0,title:'"App.jsx"'},"import React from 'react';\nimport Artplayer from './ArtPlayer';\n\nfunction App() {\n    return (\n        <div>\n            <Artplayer\n                option={{\n                    url: 'https://artplayer.org/assets/sample/video.mp4',\n                }}\n                style={{\n                    width: '600px',\n                    height: '400px',\n                    margin: '60px auto 0',\n                }}\n                getInstance={(art) => console.log(art)}\n            />\n        </div>\n    );\n}\n\nexport default App;\n")))))}v.isMDXComponent=!0}}]);