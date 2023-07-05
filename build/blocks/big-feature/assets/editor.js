!function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,r,n){return(r=function(t){var r=function(t,r){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var l=n.call(t,"string");if("object"!==e(l))return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===e(r)?r:String(r)}(r))in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t}var r=window.wp.element,n="#00588d",l={foreground:n,src:(0,r.createElement)("svg",{enableBackground:"new 0 0 20 20",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},(0,r.createElement)("path",{d:"m18.58 0h-17.16c-.78 0-1.42.64-1.42 1.42v17.15c0 .79.64 1.43 1.42 1.43h17.15c.79 0 1.42-.64 1.42-1.42v-17.16c.01-.78-.63-1.42-1.41-1.42zm-9.38 17.77c0 .43-.35.78-.78.78h-6.19c-.43 0-.78-.35-.78-.78v-6.19c0-.43.35-.78.78-.78h6.19c.43 0 .78.35.78.78zm9.35 0c0 .43-.35.78-.78.78h-6.19c-.43 0-.78-.35-.78-.78v-6.19c0-.43.35-.78.78-.78h6.19c.43 0 .78.35.78.78zm0-9.47c0 .43-.35.78-.78.78h-15.54c-.43 0-.78-.35-.78-.78v-6.07c0-.43.35-.78.78-.78h15.54c.43 0 .78.35.78.78z",fill:"#00588d"}))},a=JSON.parse('{"_#":"Wordpress features support","apiVersion":2,"name":"cumulus-gutenberg/big-feature","title":"Big Feature","description":"A special grid of linked images for featuring content","keywords":["cumulus","cmls","feature","panel","hero"],"icon":"star-filled","category":"cmls","editorScript":"file:./assets/editor.js","viewScript":"file:./assets/frontend.js","style":"file:./assets/frontend.css","editorStyle":"file:./assets/editor.css","attributes":{"lazyLoad":{"type":"boolean","default":true}},"providesContext":{"cmlsBigFeature/lazyLoad":"lazyLoad"},"supports":{"_#":"Allow customizing border","anchor":true,"align":true,"alignWide":false,"className":true,"color":{"background":true,"__experimentalDuotone":false,"gradients":true,"link":true,"text":true},"customClassName":false,"defaultStylePicker":true,"html":false,"inserter":true,"multiple":true,"reusable":true,"lock":true,"spacing":{"margin":true,"padding":true,"blockGap":true},"typography":{"align":true,"fontSize":true,"lineHeight":false,"fontWeight":true,"fontStyle":true,"textTransform":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true},"border":{"color":true,"radius":true,"style":true,"width":true,"defaultControls":{"color":true,"radius":true,"style":true,"width":true}},"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"radius":true,"style":true,"width":true}}}}');function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){if(e){if("string"==typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,t):void 0}}function s(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var u=JSON.parse('{"_#":"Wordpress features support","apiVersion":2,"keywords":["cumulus","cmls","feature","panel","hero"],"icon":"star-filled","category":"cmls","attributes":{},"supports":{"_#":"Allow customizing border","anchor":false,"align":false,"alignWide":false,"className":true,"color":{"background":false,"__experimentalDuotone":false,"gradients":false,"link":false,"text":false},"customClassName":false,"defaultStylePicker":false,"html":false,"inserter":false,"multiple":true,"reusable":true,"lock":true,"spacing":{"margin":false,"padding":false,"blockGap":false},"typography":{"align":false,"fontSize":false,"lineHeight":false,"fontWeight":false,"fontStyle":false,"textTransform":false,"__experimentalFontWeight":false,"__experimentalFontStyle":false,"__experimentalTextTransform":false},"border":{"color":false,"radius":false,"style":false,"width":false,"defaultControls":{"color":false,"radius":false,"style":false,"width":false}},"__experimentalBorder":{"color":false,"radius":false,"style":false,"width":false,"__experimentalDefaultControls":{"color":false,"radius":false,"style":false,"width":false}}}}'),c={className:"g-bf-column"},m=window.wp.blockEditor,d=[{save:function(e){var t=m.useBlockProps.save({className:"g-bf-container"});return(0,r.createElement)("ul",t,(0,r.createElement)(m.InnerBlocks.Content,null))}}],f=window.wp.blocks;function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function g(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?p(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}(0,f.registerBlockType)("cumulus-gutenberg/big-feature-column",g(g({},u),{},{title:"Big Feature Column",description:"Column within a Big Feature",keywords:[].concat(s(u.keywords),["feature","box","column"]),parent:["cumulus-gutenberg/big-feature"],icon:{src:"columns",foreground:n},edit:function(e){var t=(0,m.useBlockProps)(c),n=(0,m.useInnerBlocksProps)({title:"Big Feature Column"},{template:[["cumulus-gutenberg/big-feature-square"],["cumulus-gutenberg/big-feature-small-cluster"]],templateLock:!1});return(0,r.createElement)("ul",t,n.children)},save:function(){var e=m.useBlockProps.save(c);return(0,r.createElement)("ul",e,(0,r.createElement)(m.InnerBlocks.Content,null))},deprecated:d}));var b=JSON.parse('{"_#":"Wordpress features support","apiVersion":2,"name":"cumulus-gutenberg/big-feature-square","title":"Big Feature Square","description":"Image container within a Big Feature","keywords":["cumulus","cmls","feature","panel","hero","bo","image"],"icon":"star-filled","category":"cmls","parent":["cumulus-gutenberg/big-feature-column","cumulus-gutenberg/big-feature-small-cluster"],"attributes":{"mediaUrl":{"type":"string","source":"attribute","selector":"img","attribute":"src","default":"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="},"mediaId":{"type":"integer"},"mediaDimensions":{"type":"object","default":{"width":null,"height":null}},"alt":{"type":"string","source":"attribute","selector":"img","attribute":"alt","default":""},"href":{"type":"string","source":"attribute","selector":"a","attribute":"href","default":null},"linkTarget":{"type":"string","source":"attribute","selector":"a","attribute":"target"},"rel":{"type":"string","source":"attribute","selector":"a","attribute":"rel"},"lazyLoad":{"type":"boolean","default":true}},"usesContext":["cmlsBigFeature/lazyLoad"],"supports":{"_#":"Allow customizing border","anchor":false,"align":false,"alignWide":false,"className":true,"color":{"background":false,"__experimentalDuotone":false,"gradients":false,"link":false,"text":false},"customClassName":false,"defaultStylePicker":false,"html":false,"inserter":false,"multiple":true,"reusable":true,"lock":true,"spacing":{"margin":false,"padding":false,"blockGap":false},"typography":{"align":false,"fontSize":false,"lineHeight":false,"fontWeight":false,"fontStyle":false,"textTransform":false,"__experimentalFontWeight":false,"__experimentalFontStyle":false,"__experimentalTextTransform":false},"border":{"color":false,"radius":false,"style":false,"width":false,"defaultControls":{"color":false,"radius":false,"style":false,"width":false}},"__experimentalBorder":{"color":false,"radius":false,"style":false,"width":false,"__experimentalDefaultControls":{"color":false,"radius":false,"style":false,"width":false}}}}');function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},h.apply(this,arguments)}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,l,_x,a,i=[],_n=!0,o=!1;try{if(_x=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;_n=!1}else for(;!(_n=(n=_x.call(r)).done)&&(i.push(n.value),i.length!==t);_n=!0);}catch(e){o=!0,l=e}finally{try{if(!_n&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(o)throw l}}return i}}(e,t)||o(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var v=window.wp.url;function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?w(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var k=function(e){var t=(0,v.getAuthority)(e);return t&&t.toLowerCase().includes(window.location.host.toLowerCase())?((0,v.getPathAndQueryString)(e)||"")+((0,v.getFragment)(e)||""):e},O=function(e){var t,r,n,l,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"full";if(null!=e&&null!==(t=e.sizes)&&void 0!==t&&t[a])n=null==e||null===(l=e.sizes)||void 0===l?void 0:l[a];else if(null!=e&&null!==(r=e.media_details)&&void 0!==r&&null!==(r=r.sizes)&&void 0!==r&&r[sizes]){var i,o;n=E(E({},null==e||null===(i=e.media_details)||void 0===i||null===(i=i.sizes)||void 0===i?void 0:i[sizes]),{},{url:null==e||null===(o=e.media_details)||void 0===o||null===(o=o.sizes)||void 0===o?void 0:o[sizes].source_url})}else n=e;var s=null==e?void 0:e.alt;return{mediaUrl:k(n.url),mediaId:e.id,alt:s||"",mediaDimensions:{width:n.width,height:n.height}}},S=function(e,t){return!(!b.attributes[t].hasOwnProperty("default")||e[t]!=b.attributes[t].default)},P=window.wp.primitives,A=(0,r.createElement)(P.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,r.createElement)(P.Path,{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v8.4l-3-2.9c-.3-.3-.8-.3-1 0L11.9 14 9 12c-.3-.2-.6-.2-.8 0l-3.6 2.6V5c-.1-.3.1-.5.4-.5zm14 15H5c-.3 0-.5-.2-.5-.5v-2.4l4.1-3 3 1.9c.3.2.7.2.9-.1L16 12l3.5 3.4V19c0 .3-.2.5-.5.5z"})),x=window.wp.components,j=function(e){var t=e.attributes,n=e.setAttributes,l=e.mediaSize;return(0,r.createElement)(m.MediaUploadCheck,null,(0,r.createElement)(m.MediaUpload,h({title:"Big Feature Square",label:"Square Image",type:"image",allowedTypes:["image"],value:t.mediaId,onSelect:function(e){n(O(e,l))}},e)))},T=function(e){var t=e.attributes,n=e.setAttributes,l=e.mediaSize;return(0,r.createElement)(m.MediaReplaceFlow,{mediaId:t.mediaId,mediaURL:t.mediaUrl,allowedTypes:["image"],accept:"image/*",onSelect:function(e){n(O(e,l))},label:"Replace image",title:"Replace image",showTooltip:!0,name:(0,r.createElement)(r.Fragment,null,(0,r.createElement)(x.Icon,{icon:A}),"Replace")})},B=function(e){var t=e.attributes,n=e.setAttributes;return(0,r.createElement)(x.TextControl,{label:"Image Alt Attribute",help:(0,r.createElement)(r.Fragment,null,!t.alt&&(0,r.createElement)("strong",{style:{color:"red",fontStyle:"italic"}},"Alt attributes are ",(0,r.createElement)("u",null,"necessary")," for SEO and accessibility!"),(0,r.createElement)(r.Fragment,null," "),"This should be the name of the show you're featuring or some other short, text interpretation of the image/link."),value:t.alt,onChange:function(e){return n({alt:e})}})},_=function(e){var t=e.attributes,n=e.setAttributes;return(0,r.createElement)(m.__experimentalLinkControl,{searchInputPlaceholder:"Search here…",value:{url:t.href,title:t.alt,opensInNewTab:"_blank"===t.linkTarget,useTitleAsAlt:!0},settings:[{id:"opensInNewTab",title:"Open in a new tab"},{id:"useTitleAsAlt",title:'Use Post Title as "alt" attribute'}],onChange:function(e){n({href:k(e.url),alt:e.useTitleAsAlt?e.title:t.alt,linkTarget:e.opensInNewTab?"_blank":"",rel:e.opensInNewTab?"noopener":""})},onRemove:function(){return n({href:null,linkTarget:null,rel:null})}})},C=(0,r.createElement)(P.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(P.Path,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"})),z=(0,r.createElement)(P.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(P.Path,{d:"M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z"})),I=function(e){var t=e.attributes,n=e.setAttributes,l=e.mediaSize,a=(0,r.createElement)(x.Icon,{icon:"warning",style:{color:"red"}});return(0,r.createElement)(m.BlockControls,null,!S(t,"mediaUrl")&&(0,r.createElement)(r.Fragment,null,(0,r.createElement)(x.ToolbarGroup,null,(0,r.createElement)(T,{attributes:t,setAttributes:n,mediaSize:l})),(0,r.createElement)(x.ToolbarGroup,null,(0,r.createElement)(x.Dropdown,{headerTitle:"Alt Attribute",contentClassNAme:"is-alternate",renderToggle:function(e){var n=e.isOpen,l=e.onToggle;return(0,r.createElement)(x.ToolbarButton,{icon:t.alt?"awards":a,label:t.alt?'Change "alt" attribute':'Set an "alt" attribute!',name:"Alt",title:t.alt?'Change "alt" attribute':'Set an "alt" attribute!',isActive:!!t.alt,showTooltip:!0,"aria-expanded":n,"aria-haspopup":!0,onClick:l})},renderContent:function(){return(0,r.createElement)("div",{style:{minWidth:"250px",paddingTop:"6px",paddingRight:"16px",paddingLeft:"16px"}},(0,r.createElement)(B,{attributes:t,setAttributes:n}))}})),(0,r.createElement)(x.ToolbarGroup,null,(0,r.createElement)(x.Dropdown,{headerTitle:"Link",renderToggle:function(e){var n=e.isOpen,l=e.onToggle;return(0,r.createElement)(r.Fragment,null,!t.href&&(0,r.createElement)(x.ToolbarButton,{name:"link",icon:C,title:"Set a link",onClick:l,"aria-expanded":n,"aria-haspopup":!0,showTooltip:!0}),t.href&&(0,r.createElement)(x.ToolbarButton,{name:"link",icon:z,title:"Change link",onClick:l,isActive:!0,"aria-expanded":n,"aria-haspopup":!0,showTooltip:!0}))},renderContent:function(){return(0,r.createElement)(_,{attributes:t,setAttributes:n})}}))))},D=(0,r.forwardRef)((function(e,t){e.className;var n=e.children;return(0,r.createElement)("div",{className:"components-panel__row",style:{display:"block"},ref:t},n)})),F=window.wp.dom,N=function(e){var t=e.attributes,n=e.setAttributes,l=e.alerts,a=e.mediaSize;return(0,r.createElement)(m.InspectorControls,null,(0,r.createElement)(x.Panel,null,(0,r.createElement)(x.PanelBody,null,l&&l.length?(0,r.createElement)(D,null,(0,r.createElement)("div",{style:{display:"block",position:"relative",width:"100%"}},(0,r.createElement)("ul",{style:{margin:"0 0 0 2ch",listStyle:"square"}},l.map((function(e,t){return(0,r.createElement)("li",{key:t,style:{color:"red"}},e)}))))):null,S(t,"mediaUrl")?(0,r.createElement)(m.MediaPlaceholder,{icon:A,accept:"image/*",allowedTypes:["image"],onSelect:function(e){n(O(e))}}):(0,r.createElement)(r.Fragment,null,(0,r.createElement)(D,{title:"Link"},t.href?(0,r.createElement)(x.Flex,null,(0,r.createElement)(x.FlexItem,null,(0,r.createElement)(x.ExternalLink,{href:t.href,style:{display:"block"}},(0,F.__unstableStripHTML)(t.alt||t.href)),(0,r.createElement)("span",{style:{color:"#757575",fontSize:"0.9em",lineHeight:1.3,wordBreak:"break-all"}},(0,v.filterURLForDisplay)((0,v.safeDecodeURI)(t.href),16)||"")),(0,r.createElement)(x.FlexItem,{style:{minWidth:"32px"}},(0,r.createElement)(x.Dropdown,{headerTitle:"Set a link",renderToggle:function(e){var t=e.isOpen,n=e.onToggle;return(0,r.createElement)(x.Button,{isPrimary:!0,icon:z,onClick:n,"aria-expanded":t,"aria-haspopup":!0})},renderContent:function(){return(0,r.createElement)(_,{attributes:t,setAttributes:n})}}))):(0,r.createElement)(x.Dropdown,{headerTitle:"Set a link",renderToggle:function(e){var t=e.isOpen,n=e.onToggle;return(0,r.createElement)(x.Button,{isPrimary:!0,icon:C,onClick:n,"aria-expanded":t,"aria-haspopup":!0},"Set a link")},renderContent:function(){return(0,r.createElement)(_,{attributes:t,setAttributes:n})}})),(0,r.createElement)("hr",{style:{width:"100%"}}),(0,r.createElement)(D,{style:{display:"block"}},(0,r.createElement)(B,{attributes:t,setAttributes:n})),(0,r.createElement)(D,null,(0,r.createElement)(j,{attributes:t,setAttributes:n,mediaSize:a,render:function(e){var l=e.open;return(0,r.createElement)(x.Flex,{direction:"column"},(0,r.createElement)("div",null,(0,r.createElement)("img",{src:t.mediaUrl,width:"100%",onClick:l,className:"wp-image-".concat(t.mediaId)})),(0,r.createElement)(x.Flex,{direction:"row"},(0,r.createElement)(x.Button,{className:"button button-large",onClick:l},"Replace Image"),(0,r.createElement)(x.Button,{className:"button button-large",onClick:function(){!function(e){var t=e.attributes,r=e.setAttributes,n={};for(var l in t)n[l]=b.attributes[l].default;r(n)}({attributes:t,setAttributes:n})}},"Remove")))}}))))))},L=window.wp.data,U=function(e){if(e.href){var t={href:e.href};return e.linkTarget&&(t.target=e.linkTarget),e.rel&&(t.rel=e.rel),(0,r.createElement)("a",t,e.children)}return(0,r.createElement)(r.Fragment,null,null==e?void 0:e.children)},H=[{attributes:b.attributes,save:function(e){var t,n,l=e.attributes,a=m.useBlockProps.save(),i=null==l||null===(t=l.mediaDimensions)||void 0===t?void 0:t.width,o=null==l||null===(n=l.mediaDimensions)||void 0===n?void 0:n.height;return l.mediaUrl&&!S(l,"mediaUrl")?(0,r.createElement)("li",a,(0,r.createElement)(U,l,(0,r.createElement)("img",{src:l.mediaUrl,alt:l.alt,className:"wp-image-".concat(l.mediaId),width:i?"".concat(i,"px"):"1000px",height:o?"".concat(o,"px"):"1000px"}))):(0,r.createElement)("li",a)}},{attributes:b.attributes,save:function(e){var t=e.attributes,n=m.useBlockProps.save();return t.mediaUrl&&!S(t,"mediaUrl")?(0,r.createElement)("li",n,(0,r.createElement)(U,e.attributes,(0,r.createElement)("img",{src:e.attributes.mediaUrl,alt:e.attributes.alt,width:"1000px",height:"1000px"}))):(0,r.createElement)("li",n)}}];function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function W(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?R(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}(0,f.registerBlockType)(b.name,W(W({},b),{},{icon:{src:"format-image",foreground:n},edit:function(e){var t,n,l=e.attributes,a=e.setAttributes,i=e.context,o=y((0,r.useState)([]),2),s=o[0],u=o[1],c=y((0,r.useState)("medium"),2),d=c[0],f=c[1],p=y((0,r.useState)([]),2),g=p[0],b=p[1],v=y((0,r.useState)([]),2),w=v[0],E=v[1],k=(0,L.select)("core/block-editor").getBlockParentsByBlockName(e.clientId,"cumulus-gutenberg/big-feature-small-cluster");(0,r.useEffect)((function(){if(i["cmlsBigFeature/lazyLoad"]!==l.lazyLoad&&a({lazyLoad:i["cmlsBigFeature/lazyLoad"]}),null!=k&&k.length?f("medium"):f("full"),S(l,"mediaUrl"))u(["is-placeholder"]);else{var e=[],t=[],n=[];S(l,"href")?(e.push("is-unlinked"),t.push("Needs a link."),n.push((0,r.createElement)(x.Icon,{key:"1",icon:"editor-unlink"}))):e.push("is-linked"),S(l,"alt")&&(e.push("is-inaccessable"),t.push('Needs an "alt" attribute.'),n.push((0,r.createElement)(x.Icon,{key:"2",icon:"warning"}))),S(l,"mediaDimensions")||l.mediaDimensions.width===l.mediaDimensions.height||(e.push("is-not-square"),t.push("Is not square."),n.push((0,r.createElement)(x.Icon,{key:"3",icon:"image-crop"}))),e.length&&(u(e),b(t),E(n))}}),[l,k,i]),(0,r.useEffect)((function(){var e,t;null!==(e=l.linkTarget)&&void 0!==e&&e.length&&"_self"!==l.linkTarget||a({linkTarget:"",rel:null==l||null===(t=l.rel)||void 0===t?void 0:t.replace("noopener","")})}),[]);var O=(0,m.useBlockProps)({className:s,title:g.join("\n")}),P=null==l||null===(t=l.mediaDimensions)||void 0===t?void 0:t.width,A=null==l||null===(n=l.mediaDimensions)||void 0===n?void 0:n.height;return(0,r.createElement)("li",O,(0,r.createElement)("div",{className:"g-bf-square_container"},(0,r.createElement)(I,h({},e,{mediaSize:d})),(0,r.createElement)(N,h({},e,{alerts:g,mediaSize:d})),S(l,"mediaUrl")?(0,r.createElement)(j,h({},e,{mediaSize:d,render:function(e){var t=e.open;return(0,r.createElement)("img",{className:"g-bf-placeholder wp-image-".concat(l.mediaId),src:l.mediaUrl,alt:"Click to add an image",title:"Click to add an image",onClick:t,style:{cursor:"pointer"}})}})):(0,r.createElement)(r.Fragment,null,(0,r.createElement)("img",{src:l.mediaUrl,alt:l.alt,className:"wp-image-".concat(l.mediaId),width:P?"".concat(P,"px"):"",height:A?"".concat(A,"px"):"",sizes:P<800?"(min-width: 1000px) 33vw, 50vw":"75vw"}),w.length?(0,r.createElement)("div",{className:"g-bf-notice-icons"},w):null)))},save:function(e){var t=m.useBlockProps.save(),n=e.attributes;if(n.mediaUrl&&!S(n,"mediaUrl")){var l,a,i=null==n||null===(l=n.mediaDimensions)||void 0===l?void 0:l.width,o=null==n||null===(a=n.mediaDimensions)||void 0===a?void 0:a.height;return(0,r.createElement)("li",t,(0,r.createElement)((function(e){if(e.href){var t={href:e.href};return e.linkTarget&&(t.target=e.linkTarget),e.rel&&(t.rel=e.rel),(0,r.createElement)("a",t,e.children)}return(0,r.createElement)(r.Fragment,null,null==e?void 0:e.children)}),n,(0,r.createElement)("img",{src:n.mediaUrl,alt:n.alt,className:"wp-image-".concat(n.mediaId),loading:n.lazyLoad?"lazy":"eager",width:i?"".concat(i,"px"):"",height:o?"".concat(o,"px"):"",sizes:i<800?"(min-width: 1000px) 33vw, 50vw":"75vw"})))}return(0,r.createElement)("li",t)},deprecated:H}));var V={className:"g-bf-cluster"};function q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function M(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?q(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function G(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Z(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?G(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}(0,f.registerBlockType)("cumulus-gutenberg/big-feature-small-cluster",M(M({},u),{},{title:"Big Feature Small Cluster",description:"Cluster of small boxes in a Big Feature Column",keywords:[].concat(s(u.keywords),["box"]),parent:["cumulus-gutenberg/big-feature-column"],icon:{src:"columns",foreground:n},edit:function(e){var t=(0,m.useBlockProps)(V),n=(0,m.useInnerBlocksProps)({},{orientation:"horizontal",template:[["cumulus-gutenberg/big-feature-square"],["cumulus-gutenberg/big-feature-square"]],templateLock:!1});return(0,r.createElement)("li",t,(0,r.createElement)("ul",null,n.children))},save:function(e){var t=m.useBlockProps.save(V);return(0,r.createElement)("li",t,(0,r.createElement)("ul",null,(0,r.createElement)(m.InnerBlocks.Content,null)))}}));var J={className:"g-big-feature"};(0,f.registerBlockType)(a.name,Z(Z({},a),{},{icon:l,edit:function(e){var t=(0,m.useBlockProps)(J),n=e.attributes,l=e.setAttributes,a=(0,m.useInnerBlocksProps)({},{template:[["cumulus-gutenberg/big-feature-column"],["cumulus-gutenberg/big-feature-column"],["cumulus-gutenberg/big-feature-column"]],templateLock:!1});return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(m.InspectorControls,null,(0,r.createElement)(x.Panel,null,(0,r.createElement)(x.PanelBody,null,(0,r.createElement)(x.PanelRow,null,(0,r.createElement)(x.ToggleControl,{label:"Lazy Load Images",checked:n.lazyLoad,onChange:function(e){return l({lazyLoad:e})}}))))),(0,r.createElement)("section",t,a.children))},save:function(){var e=m.useBlockProps.save(J);return(0,r.createElement)("section",e,(0,r.createElement)(m.InnerBlocks.Content,null))}}))}();