!function(){"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){return function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],_n=!0,l=!1;try{for(n=n.call(e);!(_n=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);_n=!0);}catch(e){l=!0,o=e}finally{try{_n||null==n.return||n.return()}finally{if(l)throw o}}return a}}(t,n)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var n=window.wp.element,r=wp.hooks.addFilter,o=wp.compose.createHigherOrderComponent,a=wp.components,l=a.Panel,i=a.PanelBody,c=a.SelectControl,u=wp.blockEditor.InspectorControls,s=wp.data.useSelect,m=wp.element,p=m.useState,f=m.useEffect,d=["core/post-terms"];r("editor.BlockEdit","cmls/block-extentions/post-types",o((function(e){return function(r){if(!d.includes(r.name))return(0,n.createElement)(e,r);var o=r.attributes,a=r.setAttributes,m=r.isSelected,y=o.term,g=t(p(!1),2),v=g[0],h=g[1],b=t(p([]),2),w=b[0],x=b[1],E=s((function(e){return{postType:e("core/editor").getCurrentPostType()}}),[]).postType,T=s((function(e){var t={type:E,context:"view",per_page:-1};return{availableTaxonomies:e("core").getTaxonomies(t),isLoading:e("core/data").isResolving("core","getTaxonomies",t)}}),[E]),S=T.availableTaxonomies,A=T.isLoading;return f((function(){if(S)if(S.length){var e=!1,t=S.map((function(t){return t.slug===y&&(e=!0),{label:t.name,value:t.slug}}));if(e)h(!1);else{var n=null;"post_tag"===y&&(n=S.find((function(e){return!1===e.hierarchical}))),"category"===y&&(n=S.find((function(e){return!0===e.hierarchical}))),n?a({term:n.slug}):(h(!0),a({term:t[0].value})),t.unshift({label:"Select a taxonomy",value:null})}x(t)}else x([{label:"None available"}]);else x([{label:"Loading..."}])}),[S]),(0,n.createElement)(n.Fragment,null,m&&!A&&(0,n.createElement)(u,null,(0,n.createElement)(l,null,(0,n.createElement)(i,{title:"Taxonomy",initialOpen:v},(0,n.createElement)(c,{label:"Taxonomy Type",value:y,options:w,onChange:function(e){return a({term:e})},help:"Only taxonomies associated with the current post type are available."})))),(0,n.createElement)(e,r))}}),"withTaxTypeSelector"));var y={foreground:"#00588d",src:(0,n.createElement)("svg",{className:"custom-icon custom-icon-cumulus",enableBackground:"new 0 0 645.28 645.45",viewBox:"0 0 645.28 645.45",xmlns:"http://www.w3.org/2000/svg"},(0,n.createElement)("path",{d:"m543.62 329.45c-3.21 19.07-19.75 33.62-39.74 33.62-22.28 0-40.34-18.06-40.34-40.34s18.06-40.34 40.34-40.34c19.98 0 36.53 14.54 39.74 33.62h101.66c-3.59-175.13-146.57-316.01-322.56-316.01-178.23 0-322.72 144.49-322.72 322.72 0 178.24 144.49 322.72 322.72 322.72 175.98 0 318.96-140.88 322.55-316h-101.65zm-220.9 235.32c-133.68 0-242.04-108.37-242.04-242.04s108.37-242.05 242.04-242.05c77.12 0 145.76 36.11 190.09 92.3l-86.74 86.74c-21.26-34.79-59.58-58.02-103.34-58.02-66.84 0-121.02 54.18-121.02 121.02s54.18 121.02 121.02 121.02c43.76 0 82.09-23.23 103.34-58.02l86.74 86.74c-44.32 56.2-112.97 92.31-190.09 92.31z",fill:"#00588d"}))};wp.blocks.updateCategory("cmls",{icon:y.src})}();