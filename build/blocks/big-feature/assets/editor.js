!function(){"use strict";var e=window.wp.element,t="#00588d",r={foreground:t,src:(0,e.createElement)("svg",{enableBackground:"new 0 0 20 20",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)("path",{d:"m18.58 0h-17.16c-.78 0-1.42.64-1.42 1.42v17.15c0 .79.64 1.43 1.42 1.43h17.15c.79 0 1.42-.64 1.42-1.42v-17.16c.01-.78-.63-1.42-1.41-1.42zm-9.38 17.77c0 .43-.35.78-.78.78h-6.19c-.43 0-.78-.35-.78-.78v-6.19c0-.43.35-.78.78-.78h6.19c.43 0 .78.35.78.78zm9.35 0c0 .43-.35.78-.78.78h-6.19c-.43 0-.78-.35-.78-.78v-6.19c0-.43.35-.78.78-.78h6.19c.43 0 .78.35.78.78zm0-9.47c0 .43-.35.78-.78.78h-15.54c-.43 0-.78-.35-.78-.78v-6.07c0-.43.35-.78.78-.78h15.54c.43 0 .78.35.78.78z",fill:"#00588d"}))},l=JSON.parse('{"u2":"cumulus-gutenberg/big-feature"}');function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,l=new Array(t);r<t;r++)l[r]=e[r];return l}function a(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}function o(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||a(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c=JSON.parse('{"_#":"Wordpress features support","apiVersion":2,"keywords":["cumulus","cmls","feature","panel","hero"],"icon":"star-filled","category":"cmls","attributes":{},"supports":{"_#":"Allow customizing border","anchor":false,"align":false,"alignWide":false,"className":true,"color":{"background":false,"__experimentalDuotone":false,"gradients":false,"link":false,"text":false},"customClassName":false,"defaultStylePicker":false,"html":false,"inserter":false,"multiple":true,"reusable":true,"lock":true,"spacing":{"margin":false,"padding":false,"blockGap":false},"typography":{"align":false,"fontSize":false,"lineHeight":false,"fontWeight":false,"fontStyle":false,"textTransform":false,"__experimentalFontWeight":false,"__experimentalFontStyle":false,"__experimentalTextTransform":false},"border":{"color":false,"radius":false,"style":false,"width":false,"defaultControls":{"color":false,"radius":false,"style":false,"width":false}},"__experimentalBorder":{"color":false,"radius":false,"style":false,"width":false,"__experimentalDefaultControls":{"color":false,"radius":false,"style":false,"width":false}}}}'),u=window.wp.blocks,s=window.wp.blockEditor;function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var p={className:"g-bf-column"};function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var l,n,a=[],_n=!0,o=!1;try{for(r=r.call(e);!(_n=(l=r.next()).done)&&(a.push(l.value),!t||a.length!==t);_n=!0);}catch(e){o=!0,n=e}finally{try{_n||null==r.return||r.return()}finally{if(o)throw n}}return a}}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(0,u.registerBlockType)("cumulus-gutenberg/big-feature-column",f(f({},c),{},{title:"Big Feature Column",description:"Column within a Big Feature",keywords:[].concat(o(c.keywords),["feature","box","column"]),parent:["cumulus-gutenberg/big-feature"],icon:{src:"columns",foreground:t},edit:function(t){var r=(0,s.useBlockProps)(p),l=(0,s.useInnerBlocksProps)({title:"Big Feature Column"},{template:[["cumulus-gutenberg/big-feature-square",{className:"g-bf-big"}],["cumulus-gutenberg/big-feature-small-cluster"]],templateLock:!1});return(0,e.createElement)("ul",r,l.children)},save:function(){var t=s.useBlockProps.save(p);return(0,e.createElement)("ul",t,(0,e.createElement)(s.InnerBlocks.Content,null))}}));var d=window.wp.primitives,b=(0,e.createElement)(d.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(d.Path,{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v8.4l-3-2.9c-.3-.3-.8-.3-1 0L11.9 14 9 12c-.3-.2-.6-.2-.8 0l-3.6 2.6V5c-.1-.3.1-.5.4-.5zm14 15H5c-.3 0-.5-.2-.5-.5v-2.4l4.1-3 3 1.9c.3.2.7.2.9-.1L16 12l3.5 3.4V19c0 .3-.2.5-.5.5z"})),h=(0,e.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(d.Path,{d:"M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"})),w=(0,e.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(d.Path,{d:"M15.6 7.3h-.7l1.6-3.5-.9-.4-3.9 8.5H9v1.5h2l-1.3 2.8H8.4c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7H10V7.3H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H9l-1.4 3.2.9.4 5.7-12.5h1.4c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2z"})),y=window.wp.components,v=window.wp.url,E=window.wp.dom;function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var A=function(e){return(0,v.getAuthority)(e).toLowerCase().includes(window.location.host.toLowerCase())?((0,v.getPathAndQueryString)(e)||"")+((0,v.getFragment)(e)||""):e},P={type:"string",source:"attribute"},T={mediaUrl:O(O({},P),{},{selector:"img",attribute:"src",default:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="}),alt:O(O({},P),{},{selector:"img",attribute:"alt",default:""}),href:O(O({},P),{},{selector:"a",attribute:"href",default:null}),linkTarget:O(O({},P),{},{selector:"a",attribute:"target"}),rel:O(O({},P),{},{selector:"a",attribute:"rel"})},S=function(e,t){return!(!T[t].hasOwnProperty("default")||e[t]!=T[t].default)};function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}(0,u.registerBlockType)("cumulus-gutenberg/big-feature-square",O(O({},c),{},{title:"Big Feature Square",description:"Image container within a Big Feature",keywords:[].concat(o(c.keywords),["box","image"]),parent:["cumulus-gutenberg/big-feature-column","cumulus-gutenberg/big-feature-small-cluster"],icon:{src:"format-image",foreground:t},attributes:T,edit:function(t){var r=t.attributes,l=t.setAttributes,n=(0,e.createElement)(y.Icon,{icon:"warning",style:{color:"red"}}),a=function(e){var t,r,n,a,o,i=(null==e||null===(t=e.sizes)||void 0===t||null===(r=t.full)||void 0===r?void 0:r.url)||(null==e||null===(n=e.media_details)||void 0===n||null===(a=n.sizes)||void 0===a||null===(o=a.full)||void 0===o?void 0:o.source_url),c=null==e?void 0:e.alt,u={mediaUrl:A(i||e.url)};c&&(u.alt=c),l(u)},o=function(){var e={};for(var t in r)e[t]=square.attributes[t].default;l(e)},i=(0,e.createElement)(y.TextControl,{label:"Image Alt Attribute",help:(0,e.createElement)(e.Fragment,null,!r.alt&&(0,e.createElement)("strong",{style:{color:"red",fontStyle:"italic"}},"Alt attributes are ",(0,e.createElement)("u",null,"necessary")," for SEO and accessibility!"),(0,e.createElement)(e.Fragment,null," "),"This should be the name of the show you're featuring or some other short, text interpretation of the image/link."),value:r.alt,onChange:function(e){return l({alt:e})}}),c=function(){return(0,e.createElement)(s.__experimentalLinkControl,{searchInputPlaceholder:"Search here…",value:{url:r.href,title:r.alt,opensInNewTab:"_blank"===r.linkTarget,useTitleAsAlt:!0},settings:[{id:"opensInNewTab",title:"Open in a new tab"},{id:"useTitleAsAlt",title:'Use Post Title as "alt" attribute'}],onChange:function(e){l({href:A(e.url),alt:e.useTitleAsAlt?e.title:r.alt,linkTarget:e.opensInNewTab?"_blank":"_self",rel:e.opensInNewTab?"noopener":""})},onRemove:function(){return l({href:null,linkTarget:null,rel:null})}})},u=g((0,e.useState)([]),2),m=u[0],f=u[1],p=g((0,e.useState)([]),2),d=p[0],k=p[1];(0,e.useEffect)((function(){if(S(r,"mediaUrl"))f(["is-placeholder"]);else{var e=[],t=[];S(r,"href")?(e.push("is-unlinked"),t.push("Image needs a link.")):e.push("is-linked"),S(r,"alt")&&(e.push("is-inaccessable"),t.push('Image needs an "alt" attribute.')),e.length&&(f(e),k(t))}}),[r]);var O=(0,s.useBlockProps)({className:m,title:d.join("\n")});return(0,e.createElement)("li",O,(0,e.createElement)(s.BlockControls,null,!S(r,"mediaUrl")&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(y.ToolbarGroup,null,(0,e.createElement)(s.MediaReplaceFlow,{mediaId:r.mediaId,mediaURL:r.mediaUrl,allowedTypes:["image"],accept:"image/*",onSelect:a,label:"Replace image",title:"Replace image",showTooltip:!0,name:(0,e.createElement)(e.Fragment,null,(0,e.createElement)(y.Icon,{icon:b}),"Replace")})),(0,e.createElement)(y.ToolbarGroup,null,(0,e.createElement)(y.Dropdown,{headerTitle:"Alt Attribute",contentClassNAme:"is-alternate",renderToggle:function(t){var l=t.isOpen,a=t.onToggle;return(0,e.createElement)(y.ToolbarButton,{icon:r.alt?"awards":n,label:r.alt?'Change "alt" attribute':'Set an "alt" attribute!',title:r.alt?'Change "alt" attribute':'Set an "alt" attribute!',isActive:!!r.alt,showTooltip:!0,"aria-expanded":l,"aria-haspopup":!0,onClick:a})},renderContent:function(){return(0,e.createElement)("div",{style:{minWidth:"250px",paddingTop:"6px",paddingRight:"16px",paddingLeft:"16px"}},i)}})),(0,e.createElement)(y.ToolbarGroup,null,(0,e.createElement)(y.Dropdown,{headerTitle:"Link",renderToggle:function(t){var l=t.isOpen,n=t.onToggle;return(0,e.createElement)(e.Fragment,null,!r.href&&(0,e.createElement)(y.ToolbarButton,{name:"link",icon:h,title:"Set a link",onClick:n,"aria-expanded":l,"aria-haspopup":!0,showTooltip:!0}),r.href&&(0,e.createElement)(y.ToolbarButton,{name:"link",icon:w,title:"Change link",onClick:n,isActive:!0,"aria-expanded":l,"aria-haspopup":!0,showTooltip:!0}))},renderContent:function(){return(0,e.createElement)(c,null)}})))),(0,e.createElement)(s.InspectorControls,null,(0,e.createElement)(y.Panel,null,(0,e.createElement)(y.PanelBody,null,!S(r,"mediaUrl")&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(y.PanelRow,{title:"Link"},r.href&&(0,e.createElement)(y.Flex,null,(0,e.createElement)(y.FlexItem,null,(0,e.createElement)(y.ExternalLink,{href:r.href,style:{display:"block"}},(0,E.__unstableStripHTML)(r.alt||r.href)),(0,e.createElement)("span",{style:{color:"#757575",fontSize:"0.9em",lineHeight:1.3,wordBreak:"break-all"}},(0,v.filterURLForDisplay)((0,v.safeDecodeURI)(r.href),16)||"")),(0,e.createElement)(y.FlexItem,{style:{minWidth:"32px"}},(0,e.createElement)(y.Dropdown,{headerTitle:"Set a link",renderToggle:function(t){var r=t.isOpen,l=t.onToggle;return(0,e.createElement)(y.IconButton,{isPrimary:!0,icon:w,onClick:l,"aria-expanded":r,"aria-haspopup":!0})},renderContent:function(){return(0,e.createElement)(c,null)}}))),!r.href&&(0,e.createElement)(y.Dropdown,{headerTitle:"Set a link",renderToggle:function(t){var r=t.isOpen,l=t.onToggle;return(0,e.createElement)(y.IconButton,{isPrimary:!0,icon:h,onClick:l,"aria-expanded":r,"aria-haspopup":!0},"Set a link")},renderContent:function(){return(0,e.createElement)(c,null)}})),(0,e.createElement)("hr",{style:{width:"100%"}}),(0,e.createElement)(y.PanelRow,{style:{display:"block"}},i),(0,e.createElement)(y.PanelRow,null,(0,e.createElement)("img",{src:r.mediaUrl,width:"100%"})),(0,e.createElement)(y.PanelRow,null,(0,e.createElement)(s.MediaUploadCheck,null,(0,e.createElement)(s.MediaUpload,{Label:"Square Image",type:"image",value:r.mediaUrl,render:function(t){var l=t.open;return(0,e.createElement)(y.Flex,null,(0,e.createElement)(y.Button,{className:"button button-large",onClick:l},S(r,"mediaUrl")?"Choose Image":"Replace Image"),!S(r,"mediaUrl")&&(0,e.createElement)(y.Button,{className:"button button-large",onClick:o},"Remove"))},onSelect:a})))),S(r,"mediaUrl")&&(0,e.createElement)(s.MediaPlaceholder,{icon:"format-image",accept:"image/*",allowedTypes:["image"],onSelect:a})))),S(r,"mediaUrl")?(0,e.createElement)(s.MediaUploadCheck,null,(0,e.createElement)(s.MediaUpload,{label:"Square Image",type:"image",value:r.mediaUrl,render:function(t){var l=t.open;return(0,e.createElement)("img",{className:"g-bf-placeholder",src:r.mediaUrl,alt:"Click to add an image",title:"Click to add an image",onClick:l,style:{cursor:"pointer"}})},onSelect:a})):(0,e.createElement)("img",{src:r.mediaUrl,alt:r.alt}))},save:function(t){var r=t.attributes,l=s.useBlockProps.save();return r.mediaUrl&&!S(r,"mediaUrl")?(0,e.createElement)("li",l,(0,e.createElement)((function(t){return t.href?(0,e.createElement)("a",{href:t.href,target:t.linkTarget,rel:t.rel},t.children):(0,e.createElement)(e.Fragment,null,null==t?void 0:t.children)}),r,(0,e.createElement)("img",{src:r.mediaUrl,alt:r.alt}))):(0,e.createElement)("li",l)}}));var x={className:"g-bf-cluster"};(0,u.registerBlockType)("cumulus-gutenberg/big-feature-small-cluster",C(C({},c),{},{title:"Big Feature Small Cluster",description:"Cluster of small boxes in a Big Feature Column",keywords:[].concat(o(c.keywords),["box"]),parent:["cumulus-gutenberg/big-feature-column"],icon:{src:"columns",foreground:t},edit:function(t){var r=(0,s.useBlockProps)(x),l=(0,s.useInnerBlocksProps)({},{orientation:"horizontal",template:[["cumulus-gutenberg/big-feature-square",{className:"g-bf-small"}],["cumulus-gutenberg/big-feature-square",{className:"g-bf-small"}]],templateLock:!1});return(0,e.createElement)("li",r,(0,e.createElement)("ul",null,l.children))},save:function(t){var r=s.useBlockProps.save(x);return(0,e.createElement)("li",r,(0,e.createElement)("ul",null,(0,e.createElement)(s.InnerBlocks.Content,null)))}}));var j={className:"g-big-feature"};(0,u.registerBlockType)(l.u2,{icon:r,edit:function(t){var r=(0,s.useBlockProps)(j),l=(0,s.useInnerBlocksProps)({},{template:[["cumulus-gutenberg/big-feature-column"],["cumulus-gutenberg/big-feature-column"],["cumulus-gutenberg/big-feature-column"]],templateLock:!1});return(0,e.createElement)("section",r,l.children)},save:function(){var t=s.useBlockProps.save(j);return(0,e.createElement)("section",t,(0,e.createElement)(InnerBlocks.Content,null))}})}();