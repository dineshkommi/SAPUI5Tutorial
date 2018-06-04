(function(){var d={};var r=function(e){var h=c(e);var n=e.split('.');var t=Function('return this;')();for(var i=0;i<n.length-1;++i){if(t[n[i]]===undefined)t[n[i]]={};t=t[n[i]];}t[n[n.length-1]]=h;};var a=function(e){var h=d[e];var n=h.deps;var o=h.defn;var p=n.length;var q=new Array(p);for(var i=0;i<p;++i)q[i]=c(n[i]);var s=o.apply(null,q);if(s===undefined)throw'module ['+e+'] returned undefined';h.instance=s;};var b=function(i,e,h){if(typeof i!=='string')throw'module id must be a string';else if(e===undefined)throw'no dependencies for '+i;else if(h===undefined)throw'no definition function for '+i;d[i]={deps:e,defn:h,instance:undefined};};var c=function(i){var e=d[i];if(e===undefined)throw'module ['+i+'] was undefined';else if(e.instance===undefined)a(i);return e.instance;};var f=function(e,h){var n=e.length;var o=new Array(n);for(var i=0;i<n;++i)o.push(c(e[i]));h.apply(null,h);};var g={};g.bolt={module:{api:{define:b,require:f,demand:c}}};var j=b;var k=f;var l=c;var m=function(i,e){j(i,[],function(){return e;});};m("global!tinymce.Env",tinymce.Env);m("global!tinymce.EditorManager",tinymce.EditorManager);m("global!tinymce.ThemeManager",tinymce.ThemeManager);m("global!tinymce.util.Tools",tinymce.util.Tools);m("global!tinymce.ui.Factory",tinymce.ui.Factory);m("global!tinymce.DOM",tinymce.DOM);j('tinymce.modern.ui.Toolbar',['global!tinymce.util.Tools','global!tinymce.ui.Factory'],function(T,F){var e="undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | "+"bullist numlist outdent indent | link image";var h=function(i,o,s){var t=[],p;if(!o){return;}T.each(o.split(/[ ,]/),function(q){var u;var v=function(){var w=i.selection;if(q.settings.stateSelector){w.selectorChanged(q.settings.stateSelector,function(x){q.active(x);},true);}if(q.settings.disabledStateSelector){w.selectorChanged(q.settings.disabledStateSelector,function(x){q.disabled(x);});}};if(q=="|"){p=null;}else{if(F.has(q)){q={type:q,size:s};t.push(q);p=null;}else{if(!p){p={type:'buttongroup',items:[]};t.push(p);}if(i.buttons[q]){u=q;q=i.buttons[u];if(typeof q=="function"){q=q();}q.type=q.type||'button';q.size=s;q=F.create(q);p.items.push(q);if(i.initialized){v();}else{i.on('init',v);}}}}});return{type:'toolbar',layout:'flow',items:t};};var n=function(o,s){var t=[],p=o.settings;var q=function(u){if(u){t.push(h(o,u,s));return true;}};if(T.isArray(p.toolbar)){if(p.toolbar.length===0){return;}T.each(p.toolbar,function(u,i){p["toolbar"+(i+1)]=u;});delete p.toolbar;}for(var i=1;i<10;i++){if(!q(p["toolbar"+i])){break;}}if(!t.length&&p.toolbar!==false){q(p.toolbar||e);}if(t.length){return{type:'panel',layout:'stack',classes:"toolbar-grp",ariaRoot:true,ariaRemember:true,items:t};}};return{createToolbar:h,createToolbars:n};});j('tinymce.modern.ui.Menubar',['global!tinymce.util.Tools'],function(T){var e={file:{title:'File',items:'newdocument'},edit:{title:'Edit',items:'undo redo | cut copy paste pastetext | selectall'},insert:{title:'Insert',items:'|'},view:{title:'View',items:'visualaid |'},format:{title:'Format',items:'bold italic underline strikethrough superscript subscript | formats | removeformat'},table:{title:'Table'},tools:{title:'Tools'}};var h=function(i,p){var q;if(p=='|'){return{text:'|'};}q=i[p];return q;};var n=function(p,s,q){var t,u,v,w,x;x=T.makeMap((s.removed_menuitems||'').split(/[ ,]/));if(s.menu){u=s.menu[q];w=true;}else{u=e[q];}if(u){t={text:u.title};v=[];T.each((u.items||'').split(/[ ,]/),function(y){var z=h(p,y);if(z&&!x[y]){v.push(h(p,y));}});if(!w){T.each(p,function(y){if(y.context==q){if(y.separator=='before'){v.push({text:'|'});}if(y.prependToContext){v.unshift(y);}else{v.push(y);}if(y.separator=='after'){v.push({text:'|'});}}});}for(var i=0;i<v.length;i++){if(v[i].text=='|'){if(i===0||i==v.length-1){v.splice(i,1);}}}t.menu=v;if(!t.menu.length){return null;}}return t;};var o=function(p){var q,s=[],t=p.settings;var u=[];if(t.menu){for(q in t.menu){u.push(q);}}else{for(q in e){u.push(q);}}var v=typeof t.menubar=="string"?t.menubar.split(/[ ,]/):u;for(var i=0;i<v.length;i++){var w=v[i];w=n(p.menuItems,p.settings,w);if(w){s.push(w);}}return s;};return{createMenuButtons:o};});m("global!tinymce.util.Delay",tinymce.util.Delay);m("global!tinymce.geom.Rect",tinymce.geom.Rect);j('tinymce.modern.ui.ContextToolbars',['global!tinymce.DOM','global!tinymce.util.Tools','global!tinymce.util.Delay','tinymce.modern.ui.Toolbar','global!tinymce.ui.Factory','global!tinymce.geom.Rect'],function(D,T,h,n,F,R){var t=function(e){return{left:e.x,top:e.y,width:e.w,height:e.h,right:e.x+e.w,bottom:e.y+e.h};};var o=function(e){T.each(e.contextToolbars,function(i){if(i.panel){i.panel.hide();}});};var p=function(e,i){e.moveTo(i.left,i.top);};var q=function(e,i,v){i=i?i.substr(0,2):'';T.each({t:'down',b:'up'},function(w,x){e.classes.toggle('arrow-'+w,v(x,i.substr(0,1)));});T.each({l:'left',r:'right'},function(w,x){e.classes.toggle('arrow-'+w,v(x,i.substr(1,1)));});};var u=function(e,x,y,i,v,w){w=t({x:x,y:y,w:w.w,h:w.h});if(e){w=e({elementRect:t(i),contentAreaRect:t(v),panelRect:w});}return w;};var s=function(v){var w,x=v.settings;var z=function(){return v.contextToolbars||[];};var A=function(e){var i,y,J;i=D.getPos(v.getContentAreaContainer());y=v.dom.getRect(e);J=v.dom.getRoot();if(J.nodeName==='BODY'){y.x-=J.ownerDocument.documentElement.scrollLeft||J.scrollLeft;y.y-=J.ownerDocument.documentElement.scrollTop||J.scrollTop;}y.x+=i.x;y.y+=i.y;return y;};var B=function(e,i){var y,J,K,L,M,N,O,P;var Q=x.inline_toolbar_position_handler;if(v.removed){return;}if(!e||!e.toolbar.panel){o(v);return;}O=['bc-tc','tc-bc','tl-bl','bl-tl','tr-br','br-tr'];M=e.toolbar.panel;if(i){M.show();}K=A(e.element);J=D.getRect(M.getEl());L=D.getRect(v.getContentAreaContainer()||v.getBody());P=25;if(D.getStyle(e.element,'display',true)!=='inline'){K.w=e.element.clientWidth;K.h=e.element.clientHeight;}if(!v.inline){L.w=v.getDoc().documentElement.offsetWidth;}if(v.selection.controlSelection.isResizable(e.element)&&K.w<P){K=R.inflate(K,0,8);}y=R.findBestRelativePosition(J,K,L,O);K=R.clamp(K,L);if(y){N=R.relativePosition(J,K,y);p(M,u(Q,N.x,N.y,K,L,J));}else{L.h+=J.h;K=R.intersect(L,K);if(K){y=R.findBestRelativePosition(J,K,L,['bc-tc','bl-tl','br-tr']);if(y){N=R.relativePosition(J,K,y);p(M,u(Q,N.x,N.y,K,L,J));}else{p(M,u(Q,K.x,K.y,K,L,J));}}else{M.hide();}}q(M,y,function(S,U){return S===U;});};var C=function(e){return function(){var i=function(){if(v.selection){B(I(v.selection.getNode()),e);}};h.requestAnimationFrame(i);};};var E=function(){if(!w){w=v.selection.getScrollContainer()||v.getWin();D.bind(w,'scroll',C(true));v.on('remove',function(){D.unbind(w,'scroll');});}};var G=function(e){var i;if(e.toolbar.panel){e.toolbar.panel.show();B(e);return;}E();i=F.create({type:'floatpanel',role:'dialog',classes:'tinymce tinymce-inline arrow',ariaLabel:'Inline toolbar',layout:'flex',direction:'column',align:'stretch',autohide:false,autofix:true,fixed:true,border:1,items:n.createToolbar(v,e.toolbar.items),oncancel:function(){v.focus();}});e.toolbar.panel=i;i.renderTo(document.body).reflow();B(e);};var H=function(){T.each(z(),function(e){if(e.panel){e.panel.hide();}});};var I=function(e){var i,y,J,K=z();J=v.$(e).parents().add(e);for(i=J.length-1;i>=0;i--){for(y=K.length-1;y>=0;y--){if(K[y].predicate(J[i])){return{toolbar:K[y],element:J[i]};}}}return null;};v.on('click keyup setContent ObjectResized',function(e){if(e.type==='setcontent'&&!e.selection){return;}h.setEditorTimeout(v,function(){var i;i=I(v.selection.getNode());if(i){H();G(i);}else{H();}});});v.on('blur hide contextmenu',H);v.on('ObjectResizeStart',function(){var e=I(v.selection.getNode());if(e&&e.toolbar.panel){e.toolbar.panel.hide();}});v.on('ResizeEditor ResizeWindow',C(true));v.on('nodeChange',C(false));v.on('remove',function(){T.each(z(),function(e){if(e.panel){e.panel.remove();}});v.contextToolbars={};});v.shortcuts.add('ctrl+shift+e > ctrl+shift+p','',function(){var e=I(v.selection.getNode());if(e&&e.toolbar.panel){e.toolbar.panel.items()[0].focus();}});};return{addContextualToolbars:s};});j('tinymce.modern.ui.A11y',[],function(){var e=function(p,t){return function(){var i=p.find(t)[0];if(i){i.focus(true);}};};var h=function(i,p){i.shortcuts.add('Alt+F9','',e(p,'menubar'));i.shortcuts.add('Alt+F10,F10','',e(p,'toolbar'));i.shortcuts.add('Alt+F11','',e(p,'elementpath'));p.on('cancel',function(){i.focus();});};return{addKeys:h};});j('tinymce.modern.ui.Sidebar',['global!tinymce.util.Tools','global!tinymce.ui.Factory','global!tinymce.Env'],function(T,F,E){var h=function(e){return{element:function(){return e;}};};var t=function(e,v,w){var x=e.settings[w];if(x){x(h(v.getEl('body')));}};var i=function(e,v,w){T.each(w,function(x){var y=v.items().filter('#'+x.name)[0];if(y&&y.visible()&&x.name!==e){t(x,y,'onhide');y.visible(false);}});};var n=function(e){e.items().each(function(v){v.active(false);});};var o=function(e,v){return T.grep(e,function(w){return w.name===v;})[0];};var s=function(v,w,x){return function(e){var y=e.control;var z=y.parents().filter('panel')[0];var A=z.find('#'+w)[0];var B=o(x,w);i(w,z,x);n(y.parent());if(A&&A.visible()){t(B,A,'onhide');A.hide();y.active(false);}else{if(A){A.show();t(B,A,'onshow');}else{A=F.create({type:'container',name:w,layout:'stack',classes:'sidebar-panel',html:''});z.prepend(A);t(B,A,'onrender');t(B,A,'onshow');}y.active(true);}v.fire('ResizeEditor');};};var p=function(){return!E.ie||E.ie>=11;};var q=function(e){return p()&&e.sidebars?e.sidebars.length>0:false;};var u=function(e){var v=T.map(e.sidebars,function(w){var x=w.settings;return{type:'button',icon:x.icon,image:x.image,tooltip:x.tooltip,onclick:s(e,w.name,e.sidebars)};});return{type:'panel',name:'sidebar',layout:'stack',classes:'sidebar',items:[{type:'toolbar',layout:'stack',classes:'sidebar-toolbar',items:v}]};};return{hasSidebar:q,createSidebar:u};});j('tinymce.modern.ui.SkinLoaded',[],function(){var e=function(h){var i=function(){h._skinLoaded=true;h.fire('SkinLoaded');};return function(){if(h.initialized){i();}else{h.on('init',i);}};};return{fireSkinLoaded:e};});j('tinymce.modern.ui.Resize',['global!tinymce.DOM'],function(D){var e=function(n){return{width:n.clientWidth,height:n.clientHeight};};var h=function(n,w,o){var p,q,s,t,u=n.settings;p=n.getContainer();q=n.getContentAreaContainer().firstChild;s=e(p);t=e(q);if(w!==null){w=Math.max(u.min_width||100,w);w=Math.min(u.max_width||0xFFFF,w);D.setStyle(p,'width',w+(s.width-t.width));D.setStyle(q,'width',w);}o=Math.max(u.min_height||100,o);o=Math.min(u.max_height||0xFFFF,o);D.setStyle(q,'height',o);n.fire('ResizeEditor');};var i=function(n,o,p){var q=n.getContentAreaContainer();h(n,q.clientWidth+o,q.clientHeight+p);};return{resizeTo:h,resizeBy:i};});j('tinymce.modern.modes.Iframe',['global!tinymce.util.Tools','global!tinymce.ui.Factory','global!tinymce.DOM','tinymce.modern.ui.Toolbar','tinymce.modern.ui.Menubar','tinymce.modern.ui.ContextToolbars','tinymce.modern.ui.A11y','tinymce.modern.ui.Sidebar','tinymce.modern.ui.SkinLoaded','tinymce.modern.ui.Resize'],function(T,F,D,h,M,C,A,S,i,R){var s=function(q){return function(e){q.find('*').disabled(e.mode==='readonly');};};var n=function(e){return{type:'panel',name:'iframe',layout:'stack',classes:'edit-area',border:e,html:''};};var o=function(e){return{type:'panel',layout:'stack',classes:'edit-aria-container',border:'1 0 0 0',items:[n('0'),S.createSidebar(e)]};};var p=function(q,t,u){var v,w,x,y=q.settings;if(u.skinUiCss){D.styleSheetLoader.load(u.skinUiCss,i.fireSkinLoaded(q));}v=t.panel=F.create({type:'panel',role:'application',classes:'tinymce',style:'visibility: hidden',layout:'stack',border:1,items:[y.menubar===false?null:{type:'menubar',border:'0 0 1 0',items:M.createMenuButtons(q)},h.createToolbars(q,y.toolbar_items_size),S.hasSidebar(q)?o(q):n('1 0 0 0')]});if(y.resize!==false){w={type:'resizehandle',direction:y.resize,onResizeStart:function(){var e=q.getContentAreaContainer().firstChild;x={width:e.clientWidth,height:e.clientHeight};},onResize:function(e){if(y.resize==='both'){R.resizeTo(q,x.width+e.deltaX,x.height+e.deltaY);}else{R.resizeTo(q,null,x.height+e.deltaY);}}};}if(y.statusbar!==false){v.add({type:'panel',name:'statusbar',classes:'statusbar',layout:'flow',border:'1 0 0 0',ariaRoot:true,items:[{type:'elementpath',editor:q},w]});}q.fire('BeforeRenderUI');q.on('SwitchMode',s(v));v.renderBefore(u.targetNode).reflow();if(y.readonly){q.setMode('readonly');}if(y.width){D.setStyle(v.getEl(),'width',y.width);}q.on('remove',function(){v.remove();v=null;});A.addKeys(q,v);C.addContextualToolbars(q);return{iframeContainer:v.find('#iframe')[0].getEl(),editorContainer:v.getEl()};};return{render:p};});m("global!tinymce.ui.FloatPanel",tinymce.ui.FloatPanel);j('tinymce.modern.modes.Inline',['global!tinymce.util.Tools','global!tinymce.ui.Factory','global!tinymce.DOM','global!tinymce.ui.FloatPanel','tinymce.modern.ui.Toolbar','tinymce.modern.ui.Menubar','tinymce.modern.ui.ContextToolbars','tinymce.modern.ui.A11y','tinymce.modern.ui.SkinLoaded'],function(T,F,D,e,h,M,C,A,S){var i=function(n,t,o){var p,q,s=n.settings;if(s.fixed_toolbar_container){q=D.select(s.fixed_toolbar_container)[0];}var u=function(){if(p&&p.moveRel&&p.visible()&&!p._fixed){var x=n.selection.getScrollContainer(),y=n.getBody();var z=0,B=0;if(x){var E=D.getPos(y),G=D.getPos(x);z=Math.max(0,G.x-E.x);B=Math.max(0,G.y-E.y);}p.fixed(false).moveRel(y,n.rtl?['tr-br','br-tr']:['tl-bl','bl-tl','tr-br']).moveBy(z,B);}};var v=function(){if(p){p.show();u();D.addClass(n.getBody(),'mce-edit-focus');}};var w=function(){if(p){p.hide();e.hideAll();D.removeClass(n.getBody(),'mce-edit-focus');}};var i=function(){if(p){if(!p.visible()){v();}return;}p=t.panel=F.create({type:q?'panel':'floatpanel',role:'application',classes:'tinymce tinymce-inline',layout:'flex',direction:'column',align:'stretch',autohide:false,autofix:true,fixed:!!q,border:1,items:[s.menubar===false?null:{type:'menubar',border:'0 0 1 0',items:M.createMenuButtons(n)},h.createToolbars(n,s.toolbar_items_size)]});n.fire('BeforeRenderUI');p.renderTo(q||document.body).reflow();A.addKeys(n,p);v();C.addContextualToolbars(n);n.on('nodeChange',u);n.on('activate',v);n.on('deactivate',w);n.nodeChanged();};s.content_editable=true;n.on('focus',function(){if(o.skinUiCss){D.styleSheetLoader.load(o.skinUiCss,i,i);}else{i();}});n.on('blur hide',w);n.on('remove',function(){if(p){p.remove();p=null;}});if(o.skinUiCss){D.styleSheetLoader.load(o.skinUiCss,S.fireSkinLoaded(n));}return{};};return{render:i};});m("global!tinymce.ui.Throbber",tinymce.ui.Throbber);j('tinymce.modern.ui.ProgressState',['global!tinymce.ui.Throbber'],function(T){var s=function(h,t){var i;h.on('ProgressState',function(e){i=i||new T(t.panel.getEl('body'));if(e.state){i.show(e.time);}else{i.hide();}});};return{setup:s};});j('tinymce.modern.Theme',['global!tinymce.Env','global!tinymce.EditorManager','global!tinymce.ThemeManager','tinymce.modern.modes.Iframe','tinymce.modern.modes.Inline','tinymce.modern.ui.Resize','tinymce.modern.ui.ProgressState'],function(E,e,T,I,i,R,P){var n=function(h,t,o){var s=h.settings;var p=s.skin!==false?s.skin||'lightgray':false;if(p){var q=s.skin_url;if(q){q=h.documentBaseURI.toAbsolute(q);}else{q=e.baseURL+'/skins/'+p;}if(E.documentMode<=7){o.skinUiCss=q+'/skin.ie7.min.css';}else{o.skinUiCss=q+'/skin.min.css';}h.contentCSS.push(q+'/content'+(h.inline?'.inline':'')+'.min.css');}P.setup(h,t);if(s.inline){return i.render(h,t,o);}return I.render(h,t,o);};T.add('modern',function(o){return{renderUI:function(h){return n(o,this,h);},resizeTo:function(w,h){return R.resizeTo(o,w,h);},resizeBy:function(h,p){return R.resizeBy(o,h,p);}};});return function(){};});c('tinymce.modern.Theme')();})();
