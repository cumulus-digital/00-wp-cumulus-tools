!function(){"use strict";var e={n:function(t){var l=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(l,{a:l}),l},d:function(t,l){for(var n in l)e.o(l,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:l[n]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.React,l={foreground:"#00588d",src:(0,t.createElement)("svg",{enableBackground:"new 0 0 40 40",viewBox:"0 0 40 40",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)("path",{d:"m34.5 3c.6 0 1 .4 1 1v32c0 .6-.4 1-1 1h-29c-.6 0-1-.4-1-1v-32c0-.6.4-1 1-1zm0-3h-29c-2.2 0-4 1.8-4 4v32c0 2.2 1.8 4 4 4h28.9c2.2 0 4-1.8 4-4v-32c0-2.2-1.7-4-3.9-4zm-3.4 9.8h-18.2c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h18.2c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm-22 0h-.2c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h.1c.8 0 1.4.6 1.4 1.4s-.5 1.4-1.3 1.4zm22 17.4h-18.2c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h18.2c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm-22 0h-.2c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h.1c.8 0 1.4.6 1.4 1.4s-.5 1.4-1.3 1.4zm3-11.6h-.1c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h.1c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm19 0h-15.2c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h15.2c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm-19 5.8h-.1c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h.1c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm19 0h-15.2c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h15.2c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm-19 11.6h-.1c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h.1c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4zm19 0h-15.2c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h15.2c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4z",fill:"#00588d"}))},n=JSON.parse('{"_#":"Wordpress features support","$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"cumulus-gutenberg/family-links","title":"Family Links","description":"Insert links to a page\'s children or siblings","keywords":["cumulus","cmls","family","parent","child","children","siblings"],"icon":"admin-links","category":"cmls","editorScript":"file:./assets/editor.js","style":"file:./assets/editor.css","attributes":{"postType":{"type":"string"},"parentPostId":{"type":"number"},"showCurrentChildren":{"type":"boolean","default":true},"maxDepth":{"type":"integer","default":0},"excludeNoindex":{"type":"boolean","default":true},"excludeAdditionalIDs":{"type":"array","default":[]},"displayType":{"type":"string","enum":["plain","bullets","square","numbered","custom"],"default":"plain"},"customBullet":{"type":"string","default":""},"itemMargin":{"type":"object","default":null},"childrenMargin":{"type":"object","default":{"left":"1em"}},"bulletColor":{"type":"string","default":null},"underlineLinks":{"type":"boolean","default":true},"underlineOnHover":{"type":"boolean","default":true},"linkColor":{"type":"string","default":null},"linkColorHover":{"type":"string","default":null},"textAlign":{"type":"string","default":null},"fontWeight":{"type":"string","default":null},"fontStyle":{"type":"string","default":null},"highlightCurrent":{"type":"boolean","default":true},"currentFontSize":{"type":"string","default":null},"currentFontWeight":{"type":"string","default":"700"},"currentFontStyle":{"type":"string","default":"normal"},"currentUnderlineLinks":{"type":"boolean","default":true},"currentUnderlineOnHover":{"type":"boolean","default":true},"currentLinkColor":{"type":"string","default":null},"currentLinkColorHover":{"type":"string","default":null}},"supports":{"_#":"Allow customizing border","anchor":true,"align":true,"alignWide":true,"className":true,"color":{"background":true,"__experimentalDuotone":false,"gradients":true,"link":false,"text":false},"customClassName":false,"defaultStylePicker":true,"html":false,"inserter":true,"multiple":true,"reusable":true,"lock":true,"spacing":{"margin":true,"padding":true,"blockGap":false},"typography":{"align":true,"fontSize":true,"lineHeight":true,"fontWeight":true,"fontStyle":true,"textTransform":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true},"border":{"color":true,"radius":true,"style":true,"width":true,"defaultControls":{"color":true,"radius":true,"style":true,"width":true}},"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"radius":true,"style":true,"width":true}}}}'),r=window.wp.components,o=window.wp.blockEditor,a=window.wp.primitives,s=(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(a.Path,{d:"M7.1 6.8L3.1 18h1.6l1.1-3h4.3l1.1 3h1.6l-4-11.2H7.1zm-.8 6.8L8 8.9l1.7 4.7H6.3zm14.5-1.5c-.3-.6-.7-1.1-1.2-1.5-.6-.4-1.2-.6-1.9-.6-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8V6h-1.4v12h1.3l.2-1c.2.4.6.6 1 .8.4.2.9.3 1.4.3.7 0 1.2-.2 1.8-.5.5-.4 1-.9 1.3-1.5.3-.6.5-1.3.5-2.1-.1-.6-.2-1.3-.5-1.9zm-1.7 4c-.4.5-.9.8-1.6.8s-1.2-.2-1.7-.7c-.4-.5-.7-1.2-.7-2.1 0-.9.2-1.6.7-2.1.4-.5 1-.7 1.7-.7s1.2.3 1.6.8c.4.5.6 1.2.6 2 .1.8-.2 1.4-.6 2z"})),i=(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(a.Path,{d:"M6.1 6.8L2.1 18h1.6l1.1-3h4.3l1.1 3h1.6l-4-11.2H6.1zm-.8 6.8L7 8.9l1.7 4.7H5.3zm15.1-.7c-.4-.5-.9-.8-1.6-1 .4-.2.7-.5.8-.9.2-.4.3-.9.3-1.4 0-.9-.3-1.6-.8-2-.6-.5-1.3-.7-2.4-.7h-3.5V18h4.2c1.1 0 2-.3 2.6-.8.6-.6 1-1.4 1-2.4-.1-.8-.3-1.4-.6-1.9zm-5.7-4.7h1.8c.6 0 1.1.1 1.4.4.3.2.5.7.5 1.3 0 .6-.2 1.1-.5 1.3-.3.2-.8.4-1.4.4h-1.8V8.2zm4 8c-.4.3-.9.5-1.5.5h-2.6v-3.8h2.6c1.4 0 2 .6 2 1.9.1.6-.1 1-.5 1.4z"})),c=(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(a.Path,{d:"M11 16.8c-.1-.1-.2-.3-.3-.5v-2.6c0-.9-.1-1.7-.3-2.2-.2-.5-.5-.9-.9-1.2-.4-.2-.9-.3-1.6-.3-.5 0-1 .1-1.5.2s-.9.3-1.2.6l.2 1.2c.4-.3.7-.4 1.1-.5.3-.1.7-.2 1-.2.6 0 1 .1 1.3.4.3.2.4.7.4 1.4-1.2 0-2.3.2-3.3.7s-1.4 1.1-1.4 2.1c0 .7.2 1.2.7 1.6.4.4 1 .6 1.8.6.9 0 1.7-.4 2.4-1.2.1.3.2.5.4.7.1.2.3.3.6.4.3.1.6.1 1.1.1h.1l.2-1.2h-.1c-.4.1-.6 0-.7-.1zM9.2 16c-.2.3-.5.6-.9.8-.3.1-.7.2-1.1.2-.4 0-.7-.1-.9-.3-.2-.2-.3-.5-.3-.9 0-.6.2-1 .7-1.3.5-.3 1.3-.4 2.5-.5v2zm10.6-3.9c-.3-.6-.7-1.1-1.2-1.5-.6-.4-1.2-.6-1.9-.6-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8V6h-1.4v12h1.3l.2-1c.2.4.6.6 1 .8.4.2.9.3 1.4.3.7 0 1.2-.2 1.8-.5.5-.4 1-.9 1.3-1.5.3-.6.5-1.3.5-2.1-.1-.6-.2-1.3-.5-1.9zm-1.7 4c-.4.5-.9.8-1.6.8s-1.2-.2-1.7-.7c-.4-.5-.7-1.2-.7-2.1 0-.9.2-1.6.7-2.1.4-.5 1-.7 1.7-.7s1.2.3 1.6.8c.4.5.6 1.2.6 2s-.2 1.4-.6 2z"})),u=(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(a.Path,{d:"M14.7 11.3c1-.6 1.5-1.6 1.5-3 0-2.3-1.3-3.4-4-3.4H7v14h5.8c1.4 0 2.5-.3 3.3-1 .8-.7 1.2-1.7 1.2-2.9.1-1.9-.8-3.1-2.6-3.7zm-5.1-4h2.3c.6 0 1.1.1 1.4.4.3.3.5.7.5 1.2s-.2 1-.5 1.2c-.3.3-.8.4-1.4.4H9.6V7.3zm4.6 9c-.4.3-1 .4-1.7.4H9.6v-3.9h2.9c.7 0 1.3.2 1.7.5.4.3.6.8.6 1.5s-.2 1.2-.6 1.5z"})),d=(0,t.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(a.Path,{d:"M12.5 5L10 19h1.9l2.5-14z"}));const{useRef:p,useEffect:m,useState:h}=wp.element;var g=e=>{const{attributes:l,setAttributes:n}=e,[a,p]=h(s);m((()=>{const e={uppercase:i,lowercase:c};p(e?.[l.style?.typography?.textTransform]||s)}),[l.style]);const g=()=>l.style?.typography?.fontWeight&&(l.style?.typography?.fontWeight?.toString()?.includes("bold")||l.style?.typography?.fontWeight>500),y=()=>"italic"==l.style?.typography?.fontStyle,f=(e,t)=>{const r={...l.style?.typography,[e]:t};t||delete r?.typography?.[e],n({style:{...l.style,typography:r}})};return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o.AlignmentToolbar,{value:l.style?.typography?.textAlign,onChange:e=>n({textAlign:e})}),(0,t.createElement)(r.ToolbarGroup,null,(0,t.createElement)(r.ToolbarDropdownMenu,{label:"Letter Case",icon:a,controls:[{title:"Normal",icon:s,isActive:!l.style?.typography?.textTransform,onClick:()=>f("textTransform",null)},{title:"UPPERCASE",isActive:"uppercase"===l.style?.typography?.textTransform,icon:i,onClick:()=>f("textTransform","uppercase")},{title:"Capitalize",isActive:"capitalize"===l.style?.typography?.textTransform,icon:s,onClick:()=>f("textTransform","capitalize")},{title:"lowercase",isActive:"lowercase"===l.style?.typography?.textTransform,icon:c,onClick:()=>f("textTransform","lowercase")}]})),(0,t.createElement)(r.ToolbarGroup,null,(0,t.createElement)(r.ToolbarButton,{icon:u,label:"Bold",isPressed:g(),onClick:()=>{f("fontWeight",g()?null:700)}}),(0,t.createElement)(r.ToolbarButton,{icon:d,label:"Italic",isPressed:y(),onClick:()=>{f("fontStyle",y()?null:"italic")}})))},y=window.wp.element,f=window.wp.data,b=window.wp.htmlEntities,C=window.wp.apiFetch,E=e.n(C),w=window.wp.url,x=e=>{const l=Object.assign({selectedPostType:null,onChange:()=>{},filter:!1},e),{selectedPostType:n,onChange:o,filter:a}=l,s="undefined"==typeof AbortController?void 0:new AbortController,[i,c]=(0,y.useState)(!1),[u,d]=(0,y.useState)();(0,y.useEffect)((()=>()=>s.abort()),[]);const{currentPostType:p}=(0,f.useSelect)((e=>({currentPostType:e("core/editor").getCurrentPostType()})),[]);(0,y.useMemo)((()=>{c(!1);const e={path:(0,w.addQueryArgs)("/wp/v2/types",{context:"view"}),signal:s?.signal};return E()(e).then((e=>d(e))),e}),[]);const m=(0,y.useMemo)((()=>{if(!u)return;let e=Object.values(u);a&&(e=e?.filter(a));const t=e?.map((e=>({id:e.slug,name:(0,b.decodeEntities)(e.name)})));return c(!0),t}),[u]);return(0,y.useEffect)((()=>{if(m?.length&&(1===m.length&&o(m[0].id),!n)){const e=m.find((e=>e.id===p));e?.id&&o(e.id)}}),[m]),(0,t.createElement)(t.Fragment,null,i?(0,t.createElement)((e=>{const l=Object.assign({label:"Post Type",style:{lineHeight:1.3}},e);let a=e=>e.children;if(u&&m){if(1===m.length)return`Post type: ${m[0].name}`;Object.assign(l,{selectedId:n,onChange:o,tree:m})}else a=r.Disabled,l.noOptionLabel="None available";return(0,t.createElement)(a,null,(0,t.createElement)(r.TreeSelect,{...l}))}),null):(0,t.createElement)(r.Flex,{direction:"row",justify:"left",align:"center"},(0,t.createElement)(r.Spinner,null),"Loading post types…"))},_=e=>{const l=Object.assign({label:"",help:"",noOptionLabel:null,postType:"page",parentPostId:null,selectedId:null,onChange:()=>{},onLoad:()=>{},multiple:!1,style:{}},e),{postType:n,parentPostId:o,selectedId:a,multiple:s}=l;let{onChange:i,onLoad:c}=l;if(!n)return(0,t.createElement)(t.Fragment,null);const u="undefined"==typeof AbortController?void 0:new AbortController,[d,p]=(0,y.useState)(!1),[m,h]=(0,y.useState)(),[g,f]=(0,y.useState)();(0,y.useEffect)((()=>()=>u.abort()),[]),(0,y.useMemo)((()=>{const e={path:(0,w.addQueryArgs)(`/wp/v2/types/${n}`,{context:"view"}),signal:u?.signal};return n&&(p(!1),E()(e).then((e=>{e.hierarchical&&h(e)}))),e}),[n]),(0,y.useMemo)((()=>{if(m){const e={type:m?.slug,per_page:-1,_fields:"id,title,parent",context:"view"},t={path:(0,w.addQueryArgs)(`/cumulus-gutenberg-family-links/v1/children-of/${o||0}`,e),signal:u?.signal};p(!1),E()(t).then((e=>{f(e)}))}}),[m,o]);const{childPageOptions:C}=(0,y.useMemo)((()=>{let e;return g?.length&&(e=function(e){const t=e.map((e=>({children:[],parent:null,...e}))),l=t.reduce(((e,t)=>(e[t.parent]||(e[t.parent]=[]),e[t.parent].push(t),e)),{});if(l.null&&l.null.length)return t;const n=e=>e.map((e=>{const t=l[e.id];return{...e,children:t&&t.length?n(t):[]}}));return l[0]?n(l[0]):Object.values(l).length?n(Object.values(l)[0]):[]}(g?.map((e=>{var t;if(e?.id)return{id:e.id,parent:e.parent,name:(t=e,t?.title?.rendered?(0,b.decodeEntities)(t.title.rendered):`#${t.id} (n)`)}})).filter(Boolean)),p(!0)),{childPageOptions:e}}),[g]);return(0,y.useEffect)((()=>{c(C)}),[C]),(0,t.createElement)(t.Fragment,null,d?(0,t.createElement)((e=>{const n=Object.assign(l.multiple&&C?.length?{height:"auto",minHeight:"6em",padding:"8px"}:{},l.style);let o=l.noOptionLabel||`No ${m?.labels?.singular_name||"page"} selected`;!1===l.noOptionLabel&&(o=null);const s=Object.assign({label:l.label||`Select a ${m?.labels?.singular_name||"page"}`,help:l?.help,className:"editor-page-attributes__parent",style:{lineHeight:1.3},multiple:l.multiple,style:n},e);let c=e=>e.children;if(C?.length){let e=C;l.multiple||(e=[{id:0,name:"• None Selected"},...e]),Object.assign(s,{selectedId:a,tree:e,onChange:i})}else c=r.Disabled,s.noOptionLabel="None available";return(0,t.createElement)(c,null,(0,t.createElement)(r.TreeSelect,{...s}))}),null):(0,t.createElement)(r.Flex,{direction:"row",justify:"left",align:"center",style:l.multiple?{height:"auto",minHeight:"6em",padding:"8px"}:{}},(0,t.createElement)(r.Spinner,null),`Loading ${m?.labels?.plural_name||"pages"}…`))},v=e=>{const l=Object.assign({showPostType:!0,onPostTypeChange:()=>{},selectedPostType:null,onPostChange:()=>{},selectedPostId:null,onPostListLoad:()=>{},beginTreeFrom:null},e),{showPostType:n,onPostTypeChange:o,selectedPostType:a,onPostChange:s,selectedPostId:i,beginTreeFrom:c,onPostListLoad:u}=l;return(0,t.createElement)(t.Fragment,null,n&&(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(x,{selectedPostType:a,onChange:o,filter:e=>e.hierarchical})),a&&(0,t.createElement)(r.PanelRow,null,(0,t.createElement)(_,{postType:a,selectedId:i,onChange:s,beginTreeFrom:c,onLoad:u})))},P=window.wp.i18n;const k=[{name:(0,P._x)("Regular","font style"),value:"normal"},{name:(0,P._x)("Italic","font style"),value:"italic"}],T=[{name:(0,P._x)("Thin","font weight"),value:"100"},{name:(0,P._x)("Extra Light","font weight"),value:"200"},{name:(0,P._x)("Light","font weight"),value:"300"},{name:(0,P._x)("Regular","font weight"),value:"400"},{name:(0,P._x)("Medium","font weight"),value:"500"},{name:(0,P._x)("Semi Bold","font weight"),value:"600"},{name:(0,P._x)("Bold","font weight"),value:"700"},{name:(0,P._x)("Extra Bold","font weight"),value:"800"},{name:(0,P._x)("Black","font weight"),value:"900"}];function S(e){const{onChange:l,hasFontStyles:n=!0,hasFontWeights:o=!0,value:{fontStyle:a,fontWeight:s},...i}=e,c=n||o,u=((e,t)=>e?t?(0,P.__)("Appearance"):(0,P.__)("Font style"):(0,P.__)("Font weight"))(n,o),d={key:"default",name:(0,P.__)("Default"),style:{fontStyle:void 0,fontWeight:void 0}},p=(0,y.useMemo)((()=>n&&o?(()=>{const e=[d];return k.forEach((({name:t,value:l})=>{T.forEach((({name:n,value:r})=>{const o="normal"===l?n:(0,P.sprintf)(/* translators: 1: Font weight name. 2: Font style name. */ /* translators: 1: Font weight name. 2: Font style name. */
(0,P.__)("%1$s %2$s"),n,t);e.push({key:`${l}-${r}`,name:o,style:{fontStyle:l,fontWeight:r}})}))})),e})():n?(()=>{const e=[d];return k.forEach((({name:t,value:l})=>{e.push({key:l,name:t,style:{fontStyle:l,fontWeight:void 0}})})),e})():(()=>{const e=[d];return T.forEach((({name:t,value:l})=>{e.push({key:l,name:t,style:{fontStyle:void 0,fontWeight:l}})})),e})()),[e.options]),m=p.find((e=>e.style.fontStyle===a&&e.style.fontWeight===s))||p[0];return c&&(0,t.createElement)(r.CustomSelectControl,{...i,className:"components-font-appearance-control",label:u,describedBy:m?n?o?(0,P.sprintf)(
// translators: %s: Currently selected font appearance.
// translators: %s: Currently selected font appearance.
(0,P.__)("Currently selected font appearance: %s"),m.name):(0,P.sprintf)(
// translators: %s: Currently selected font style.
// translators: %s: Currently selected font style.
(0,P.__)("Currently selected font style: %s"),m.name):(0,P.sprintf)(
// translators: %s: Currently selected font weight.
// translators: %s: Currently selected font weight.
(0,P.__)("Currently selected font weight: %s"),m.name):(0,P.__)("No selected font appearance"),options:p,value:m,onChange:({selectedItem:e})=>l(e.style)})}var I=e=>{const{settings:l}=e,n=(()=>{const e={disableCustomColors:!(0,o.useSetting)("color.custom"),disableCustomGradients:!(0,o.useSetting)("color.customGradient")},t=(0,o.useSetting)("color.palette.custom"),l=(0,o.useSetting)("color.palette.theme"),n=(0,o.useSetting)("color.palette.default"),r=(0,o.useSetting)("color.defaultPalette");return e.__experimentalHasMultipleOrigins=!0,e.colors=(0,y.useMemo)((()=>{const e=[];return l&&l.length&&e.push({name:(0,P._x)("Theme","Indicates this palette comes from the theme."),colors:l}),r&&n&&n.length&&e.push({name:(0,P._x)("Default","Indicates this palette comes from WordPress."),colors:n}),t&&t.length&&e.push({name:(0,P._x)("Custom","Indicates this palette comes from the theme."),colors:t}),e}),[n,l,t]),e})();return(0,t.createElement)(r.__experimentalItemGroup,{isBordered:!0,isSeparated:!0,className:"block-editor-panel-color-gradient-settings__item-group"},l.map(((e,l)=>e&&(0,t.createElement)(r.Dropdown,{key:l,position:"bottom left",className:"block-editor-panel-color-gradient-settings__dropdown",contentClassName:"block-editor-panel-color-gradient-settings__dropdown-content",renderToggle:({isOpen:l,onToggle:n})=>{var o;return(0,t.createElement)(r.__experimentalItem,{onClick:n,className:["block-editor-panel-color-gradient-settings__item",l?"is-open":""].filter((e=>e))},(0,t.createElement)(r.__experimentalHStack,{justify:"flex-start"},(0,t.createElement)(r.ColorIndicator,{className:"block-editor-panel-color-gradient-settings__color-indicator",colorValue:null!==(o=e.gradientValue)&&void 0!==o?o:e.colorValue}),(0,t.createElement)(r.FlexItem,null,e.label)))},renderContent:()=>(0,t.createElement)(o.__experimentalColorGradientControl,{showTitle:!!e.label,__experimentalIsRenderedInSidebar:!0,...n,...e})}))))},A=(0,y.forwardRef)((({className:e,children:l},n)=>(0,t.createElement)("div",{className:"components-panel__row",style:{display:"block"},ref:n},l))),F=window.lodash;const L=(e,t,l)=>{for(const n in e)return!!t(e[n])||Array.isArray(e[n]?.[l])&&L(e[n][l],t,l);return!1};var z=L;const H=e=>{const{attributes:l,setAttributes:a}=e,{currentPostId:s,parentPostId:i}=(0,f.useSelect)((e=>({currentPostId:e("core/editor").getCurrentPostId(),parentPostId:e("core/editor").getEditedPostAttribute("parent")}))),c=e=>{if(n.attributes.hasOwnProperty(e)&&n.attributes[e].hasOwnProperty("default"))return n.attributes[e].default},u=e=>!(e=Array.isArray(e)?e:[e]).some((e=>!(0,F.isEqual)(l[e],c(e)))),d=e=>{e=Array.isArray(e)?e:[e];const t={};e.forEach((e=>{t[e]=c(e)})),a(t)};return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o.InspectorControls,{group:"settings"},(0,t.createElement)(r.__experimentalToolsPanel,{label:"Query",resetAll:e=>{e.forEach((e=>e()))}},(0,t.createElement)(r.__experimentalToolsPanelItem,{hasValue:()=>!0,label:"Parent Context",isShownByDefault:!0},(0,t.createElement)(A,null,(0,t.createElement)(v,{selectedPostType:l.postType,onPostTypeChange:e=>{a({postType:e})},selectedPostId:l.parentPostId,onPostChange:e=>{a({parentPostId:parseInt(e)})},onPostListLoad:e=>{e?.length&&i&&void 0===l.parentPostId&&z(e,(e=>e?.id===i),"children")&&(console.debug("Setting parent",i,l.parentPostId),a({parentPostId:i}))}})),l.parentPostId!==s&&(0,t.createElement)(A,null,(0,t.createElement)(r.ToggleControl,{label:"Include This Page's Children",help:"Applies only if the current page is a child of the selected parent.",checked:l.showCurrentChildren,onChange:e=>a({showCurrentChildren:e})}))),null!==l.parentPostId&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Max Depth",hasValue:()=>!u("maxDepth"),resetAllFilter:()=>d(["maxDepth"]),isShownByDefault:!0},(0,t.createElement)(r.RangeControl,{label:"Maximum depth of children to display",allowReset:!0,resetFallbackValue:0,step:1,type:"stepper",withInputField:!1,marks:[{value:0,label:"All"},...[1,2,3,4,5,6].map((e=>({value:e,label:e})))],value:l.maxDepth,onChange:e=>a({maxDepth:e}),min:0,max:6})),(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Exclusions",hasValue:()=>!u("excludeAdditionalIDs"),resetAllFilter:()=>d(["excludeAdditionalIDs","excludeNoIndex"]),isShownByDefault:!0},(0,t.createElement)(A,null,(0,t.createElement)(_,{label:"Exclude Specific Child Pages",help:`Select multiple or deselect an item by holding\n\t\t\t\t\t\t\t\t\t\t\t\t${0==(navigator?.userAgentData?.platform||navigator?.platform||"unknown").toUpperCase().indexOf("MAC")?"Command (⌘)":"Control"}\n\t\t\t\t\t\t\t\t\t\t\t\twhile clicking.`,noOptionLabel:!1,multiple:!0,postType:l.postType,parentPostId:l.parentPostId,selectedId:l.excludeAdditionalIDs,onChange:e=>a({excludeAdditionalIDs:e})}),l.excludeAdditionalIDs.length>0&&(0,t.createElement)(r.TextControl,{label:"Raw excluded page IDs",value:l.excludeAdditionalIDs.join(","),onChange:e=>{const t=e.match(/(?<id>\d+)/);a(t?.groups?.id&&t?.groups?.id?.length?{excludeAdditionalIDs:t.groups.id}:{excludeAdditionalIDs:[]})}})),(0,t.createElement)(A,null,(0,t.createElement)(r.ToggleControl,{label:"Exclude 'noindex' Pages",help:"Automatically exclude pages marked 'noindex' in popular SEO plugins.",checked:l.excludeNoindex,onChange:e=>a({excludeNoindex:e})})))))),(0,t.createElement)(o.InspectorControls,{group:"styles"},(0,t.createElement)(r.__experimentalToolsPanel,{label:"List",resetAll:e=>e.forEach((e=>e()))},(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"List Type",isShownByDefault:!0,hasValue:()=>!u("displayType"),resetAllFilter:()=>d(["displayType"])},(0,t.createElement)(r.SelectControl,{label:"Display Type",labelPosition:"side",value:l.displayType,onChange:e=>a({displayType:e}),options:n.attributes.displayType.enum.map((e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1)})))})),"plain"!==l.displayType&&(0,t.createElement)(r.__experimentalToolsPanelItem,{isShownByDefault:!0,label:"Bullet Style",hasValue:()=>{u(["customBullet","bulletColor"])},resetAllFilter:()=>{d(["customBullet","bulletColor"])}},"custom"==l.displayType&&(0,t.createElement)(A,null,(0,t.createElement)(r.TextControl,{label:"Custom Bullet",value:l.customBullet,style:{width:"10ch"},onChange:e=>a({customBullet:e.substring(0,1)})})),(0,t.createElement)(A,null,(0,t.createElement)(I,{settings:[{label:"Bullet Color",colorValue:l.bulletColor,onColorChange:e=>a({bulletColor:e})}]}))),(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Item Margins",hasValue:()=>!u(["itemMargin","childrenMargin"]),resetAllFilter:()=>{d(["itemMargin","childrenMargin"])}},(0,t.createElement)(A,null,(0,t.createElement)(o.__experimentalSpacingSizesControl,{label:"Item Margin",values:l.itemMargin,onChange:e=>a({itemMargin:e})})),0===l.maxDepth||l.maxDepth>1&&(0,t.createElement)(A,null,(0,t.createElement)(o.__experimentalSpacingSizesControl,{label:"Children Container Margin",values:l.childrenMargin,onChange:e=>a({childrenMargin:e})})))),(0,t.createElement)(r.__experimentalToolsPanel,{label:"Links",resetAll:e=>e.forEach((e=>e()))},(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Link Color",hasValue:()=>!u(["linkColor","linkColorHover"]),resetAllFilter:()=>{d(["linkColor","linkColorHover"])},isShownByDefault:!0},(0,t.createElement)(A,null,(0,t.createElement)(I,{settings:[{label:"Color",colorValue:l.linkColor,onColorChange:e=>a({linkColor:e})},{label:"Hover",colorValue:l.linkColorHover,onColorChange:e=>a({linkColorHover:e})}]}))),(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Link Underlines",hasValue:()=>!u(["underlineLinks","underlineOnHover"]),resetAllFilter:()=>{d(["underlineLinks","underlineOnHover"])},isShownByDefault:!0},(0,t.createElement)(A,null,(0,t.createElement)(r.ToggleControl,{label:"Underline Links",checked:l.underlineLinks,onChange:e=>a({underlineLinks:e})})),(0,t.createElement)(A,null,(0,t.createElement)(r.ToggleControl,{label:"Underline Links on Hover",checked:l.underlineOnHover,onChange:e=>a({underlineOnHover:e})})))),(0,t.createElement)(r.__experimentalToolsPanel,{label:"Current Page Item",resetAll:e=>e.forEach((e=>e()))},(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Highlight Current Page",hasValue:()=>!u("highlightCurrent"),isShownByDefault:!0},(0,t.createElement)(r.ToggleControl,{label:"Highlight Current Page",checked:l.highlightCurrent,onChange:e=>a({highlightCurrent:e})})),l.highlightCurrent&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Item Color",hasValue:()=>!u(["currentLinkColor","currentLinkColorHover"]),resetAllFilter:()=>{d(["currentLinkColor","currentLinkColorHover"])}},(0,t.createElement)(A,null,(0,t.createElement)(I,{settings:[{label:"Link Color",colorValue:l.currentLinkColor,onColorChange:e=>a({currentLinkColor:e})},{label:"Hover Color",colorValue:l.currentLinkColorHover,onColorChange:e=>a({currentLinkColorHover:e})}]}))),(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Font Size",hasValue:()=>!u("currentFontSize"),resetAllFilter:()=>{d(["currentFontSize"])}},(0,t.createElement)(A,null,(0,t.createElement)(o.FontSizePicker,{value:l.currentFontSize,onChange:e=>a({currentFontSize:e})}))),(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Font Style",hasValue:()=>!u(["currentFontStyle","currentFontWeight"]),resetAllFilter:()=>{d(["currentFontStyle","currentFontWeight"])}},(0,t.createElement)(A,null,(0,t.createElement)(S,{value:{fontStyle:l.currentFontStyle,fontWeight:l.currentFontWeight},onChange:e=>a({currentFontStyle:e.fontStyle,currentFontWeight:e.fontWeight})}))),(0,t.createElement)(r.__experimentalToolsPanelItem,{label:"Underlines",hasValue:()=>!u(["currentUnderlineLinks","currentUnderlineOnHover"]),resetAllFilter:()=>{d(["currentUnderlineLinks","currentUnderlineOnHover"])}},(0,t.createElement)(A,null,(0,t.createElement)(r.ToggleControl,{label:"Underline",checked:l.currentUnderlineLinks,onChange:e=>a({currentUnderlineLinks:e})})),(0,t.createElement)(A,null,(0,t.createElement)(r.ToggleControl,{label:"Underline on Hover",checked:l.currentUnderlineOnHover,onChange:e=>a({currentUnderlineOnHover:e})})))))))},{useDebounce:O,usePrevious:B}=wp.compose,{RawHTML:D,useEffect:M,useRef:V,useState:W,useCallback:N}=wp.element,{__:__,sprintf:j}=wp.i18n,{addQueryArgs:U}=(wp.apiFetch,wp.url),{Placeholder:R,Spinner:$}=wp.components,{getBlockType:G}=wp.blocks;var Q=window.wp.serverSideRender,q=e.n(Q);const J=()=>(0,t.createElement)(t.Fragment,null,(0,t.createElement)(r.Spinner,null),(0,t.createElement)("small",null,"Loading Family…"));(0,window.wp.blocks.registerBlockType)(n.name,{...n,icon:l,edit:e=>{const l=(0,o.useBlockProps)(),{attributes:r}=e,{currentPostId:a,parentPostId:s}=(0,f.useSelect)((e=>({currentPostId:e("core/editor").getCurrentPostId(),parentPostId:e("core/editor").getEditedPostAttribute("parent")})));return(0,t.createElement)("div",{...l},(0,t.createElement)(o.BlockControls,null,(0,t.createElement)(g,{...e})),(0,t.createElement)(H,{...e}),null===r.parentPostId?(0,t.createElement)(J,null):(0,t.createElement)(q(),{block:n.name,attributes:r,urlQueryArgs:{"attributes[parentPostId]":void 0!==r.parentPostId?r.parentPostId:s,post_id:a}}))}})}();