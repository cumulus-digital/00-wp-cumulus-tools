!function(){"use strict";var e={n:function(l){var t=l&&l.__esModule?function(){return l.default}:function(){return l};return e.d(t,{a:t}),t},d:function(l,t){for(var n in t)e.o(t,n)&&!e.o(l,n)&&Object.defineProperty(l,n,{enumerable:!0,get:t[n]})},o:function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}},l=window.jQuery;let t=e.n(l)().noConflict();(()=>{if(!t("body.wp-cmls-collapsable").length)return;const e={};function l(){const l=[];for(let t in e)e[t].collapsed&&l.push(t);localStorage.setItem("wcc-state",JSON.stringify(l))}function n(n){if(e?.[n]){function c(l){t(l).addClass("wcc-hide"),t(l).after('<tr class="wcc-stripe"/>'),e[l.id]?.children?.length&&e[l.id].children.forEach(c)}e[n].collapsed=!0,t(e[n].node).addClass("wcc-collapsed"),e[n]?.children?.length&&e[n].children.forEach(c),l()}}function c(n){if(e[n]){function c(l){t(l).removeClass("wcc-hide"),t(l).siblings(".wcc-stripe").remove(),!e[l.id].collapsed&&e[l.id]?.children?.length&&e[l.id].children.forEach(c)}e[n].collapsed=!1,t(e[n].node).removeClass("wcc-collapsed"),e[n]?.children?.length&&e[n].children.forEach(c),l()}}!function(){const l=JSON.parse(localStorage.getItem("wcc-state"));l&&l.forEach((l=>{e[l]={collapsed:!0}}))}(),t("#the-list tr").each(((l,n)=>{const c=t(n),i=parseInt(c.find('input[name="post[]"],input[name="delete_tags[]"]').attr("value"));if(!i)return;const a=parseInt(c.find(".post_parent,.parent").text()),r=n.id.substring(0,n.id.indexOf("-")),o=r+"-"+a,s=r+"-"+i;let d=0,p=n.className.match(/level\-(\d+)/);p.length>1&&(d=parseInt(p[1]));const h={node:n,level:d,children:e[s]?.children||[],has_parent:e[s]?.has_parent||a,collapsed:e[s]?.collapsed||!1};e[s]=h,a&&(e[o]?.children?e[o].children.push(n):e[o]={children:[n]})})),function(){for(let l in e)e[l].collapsed&&n(l)}();const i=t('<i class="wpcch-toggle" title="Toggle children"></i>');t(document).on("click.wp-cmls-collapse-hierarchical",(l=>{if(t(l.target).is(".wpcch-toggle")){l.preventDefault();const i=t(l.target).parents("tr").attr("id");e[i].collapsed?c(i):n(i)}}));const a=t("<li/>"),r=t('<a href="#" />'),o=r.clone(!0).text("Expand All").on("click.wp-cmls-collapse-hierarchical",(function(l){l.preventDefault();for(let l in e)e[l].children?.length&&c(l)})),s=r.clone(!0).text("Collapse All").on("click.wp-cmls-collapse-hierarchical",(function(l){l.preventDefault();for(let l in e)e[l].children?.length&&n(l)}));let d=t(".subsubsub");d.length||(d=t('<ul class="subsubsub" style="float: right; vertical-align: middle" />').appendTo(".bulkactions")),d.find("li:last").append(" |").after("\n"),d.append(a.clone(!0).append(s).append(" |")).append("\n").append(a.clone(!0).append(o)).append("\n");for(let l in e){let n=e[l],c=t(n.node),a=c.find(".row-title");if(c.find(".row-actions"),c.css("--level",e[l].level),n.has_parent){c.addClass("wcc-has_parent"),a.text(a.text().replace(/— /g,"")),a.before("&nbsp;<cite>•</cite>");for(let e=1;e<n.level;e++)a.before("<cite>•</cite>")}if(n.children&&n.children.length){c.addClass("wcc-has_children");let e=i.clone(!0).attr("title",n.children.length>1?"Toggle children":"Toggle child");a.before(e),a.after(' <cite title="Item has '+n.children.length+(n.children.length>1?" children":" child")+'.">('+n.children.length+")</cite>"),n.collapsed&&c.addClass("wcc-collapsed")}}})()}();