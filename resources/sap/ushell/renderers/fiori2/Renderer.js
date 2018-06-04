// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ui/core/UIComponent','./RendererExtensions','sap/ushell/resources',"sap/ushell/components/applicationIntegration/API"],function(U,R,r,m){"use strict";var a=U.extend("sap.ushell.renderers.fiori2.Renderer",{metadata:{version:"1.54.3",dependencies:{version:"1.54.3",libs:["sap.ui.core","sap.m"],components:[]}}});a.prototype.addRightViewPort=function(v){this.shellCtrl.oViewPortContainer.addRightViewPort(v);this.shellCtrl.oViewPortContainer.navTo('rightViewPort',v.getId(),'show');};a.prototype.addLeftViewPort=function(v){this.shellCtrl.oViewPortContainer.addLeftViewPort(v);this.shellCtrl.oViewPortContainer.navTo('leftViewPort',v.getId(),'show');};a.prototype.getShellController=function(){return this.shellCtrl;};a.prototype.createContent=function(){var p=jQuery.sap.getUriParameters().get("appState")||jQuery.sap.getUriParameters().get("sap-ushell-config"),w,v=this.getComponentData()||{},P,A={applications:{"Shell-home":{}},rootIntent:"Shell-home"},V;var b=function(){var c=false,d={};function M(h,n,s,i){this.hash=h;this.name=n;this.start=s;this.end=0;this.duration=0;this.info=i;};function B(h,n,s,e,g){this.hash=h;this.name=n;this.scenario=e;this.sequence=g;this.start=s;this.end=0;this.percent=null;this.duration=0;this.funcs={};}this.start=function(s,e,g){var t=jQuery.sap.now(),o;if(!c){return;}if(d[s]===undefined||d[s]===null){d[s]={};}if(d[s][e]===undefined){d[s][e]=null;}if(d[s][e]===null){o=new B(this.hash(),e,t,s,g);d[s][o.name]=o;}};this.startFunc=function(s,e,g,h,i){if(!c)return;var t=jQuery.sap.now();var j=null;if(d[s]===undefined||d[s]===null){d[s]={};}if(d[s][e]===undefined){d[s][e]=null;}if(d[s][e]===null){j=new B(this.hash(),e,t,s,g);d[s][e]=j;}var k=new M(this.hash(),h,t,i);d[s][e].funcs[k.hash]=k;return k.hash;};this.end=function(s,e){if(!c)return;var t=jQuery.sap.now();if(d[s][e]===undefined){d[s][e]=null;}if(d[s][e]!=null){d[s][e].end=t;d[s][e].duration=Math.round(d[s][e].end-d[s][e].start);}};this.endFunc=function(s,e,g){if(!c)return;var t=jQuery.sap.now();if(d[s][e]===undefined){d[s][e]=null;}if(d[s][e]!=null){d[s][e].end=t;d[s][e].duration=Math.round(d[s][e].end-d[s][e].start);d[s][e].funcs[g].end=t;d[s][e].funcs[g].duration=Math.round(d[s][e].funcs[g].end-d[s][e].funcs[g].start);}};this.calc=function(){if(!c)return;return d;};this.hash=function(){if(!c)return;var e=(new Date()).valueOf().toString()+Math.random().toString();var h=5381;for(var i=0;i<e.length;i++){var g=e.charCodeAt(i);h=((h<<5)+h)+g;}return h;};this.getActive=function(){return c;};this.setActive=function(o,C){if(c===o){return;}c=o;document.addEventListener('keyup',function(e){if(e.shiftKey&&e.ctrlKey&&e.altKey&&e.keyCode==77){window.calc=JSON.stringify(jQuery.sap.flpmeasure.calc());window.open(jQuery.sap.getResourcePath("sap/ushell/renderers/fiori2/stat.html"));}},false);return c;};var f=location.href.match(/sap-flp-measure=([^\&]*)/);if(f&&f[1]){if(f[1]==="true"||f[1]==="x"||f[1]==="X"){this.setActive(true);}else{this.setActive(true,f[1]);}}};jQuery.sap.flpmeasure=new b();w=(p==="headerless-opt")?"headerless":p;if(w){if(!v.config){v.config={};}v.config.appState=w;v.config.appStateOrig=p;v.config.inHeaderLessOpt=(p==="headerless-opt");}if(v.config){P=["enablePersonalization","enableTagFiltering","enableLockedGroupsCompactLayout","enableCatalogSelection","enableSearchFiltering","enableTilesOpacity","enableDragIndicator","enableActionModeMenuButton","enableActionModeMenuButton","enableActionModeFloatingButton","enableTileActionsIcon","enableHideGroups"];if(v.config.rootIntent===undefined){v.config.migrationConfig=true;}v.config=jQuery.extend(A,v.config);if(v.config.applications["Shell-home"]){P.forEach(function(s){var c=v.config[s];if(c!==undefined){v.config.applications["Shell-home"][s]=c;}if(s!=="enablePersonalization"){delete v.config[s];}});}}jQuery.sap.flpmeasure.start(0,"Creating Shell",0);if(v.config&&v.config.customViews){Object.keys(v.config.customViews).forEach(function(s){var V=v.config.customViews[s];sap.ui.view(s,{type:V.viewType,viewName:V.viewName,viewData:V.componentData});});}V=sap.ui.view('mainShell',{type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.renderers.fiori2.Shell",viewData:v});sap.ushell.renderers.fiori2.utils.init(V.getController());this.shellCtrl=V.oController;this.oShellModel=sap.ushell.components.applicationIntegration.AppLifeCycle;return V;};a.prototype.createExtendedShellState=function(s,c){return this.oShellModel.createExtendedShellState(s,c);};a.prototype.applyExtendedShellState=function(s,c){this.oShellModel.applyExtendedShellState(s,c);};a.prototype.showLeftPaneContent=function(i,c,s){if(typeof i==="string"){this.oShellModel.addLeftPaneContent([i],c,s);}else{this.oShellModel.addLeftPaneContent(i,c,s);}};a.prototype.showHeaderItem=function(i,c,s){if(typeof i==="string"){this.oShellModel.addHeaderItem([i],c,s);}else{this.oShellModel.addHeaderItem(i,c,s);}};a.prototype.showRightFloatingContainerItem=function(i,c,s){if(typeof i==="string"){this.oShellModel.addRightFloatingContainerItem([i],c,s);}else{this.oShellModel.addRightFloatingContainerItem(i,c,s);}};a.prototype.showRightFloatingContainer=function(s){this.oShellModel.showRightFloatingContainer(s);};a.prototype.showToolAreaItem=function(i,c,s){this.oShellModel.addToolAreaItem(i,c,s);};a.prototype.showActionButton=function(i,c,s,I){var b=[],A=[],B;if(typeof i==="string"){i=[i];}b=i.filter(function(d){B=sap.ui.getCore().byId(d);return B instanceof sap.m.Button&&!(B instanceof sap.ushell.ui.launchpad.ActionItem);});A=i.filter(function(d){B=sap.ui.getCore().byId(d);return B instanceof sap.ushell.ui.launchpad.ActionItem;});if(b.length){this.convertButtonsToActions(b,c,s,I);}if(A.length){this.oShellModel.addActionButton(A,c,s,I);}this.toggleOverFlowActions();};a.prototype.showFloatingActionButton=function(i,c,s){if(typeof i==="string"){this.oShellModel.addFloatingActionButton([i],c,s);}else{this.oShellModel.addFloatingActionButton(i,c,s);}};a.prototype.showHeaderEndItem=function(i,c,s){if(typeof i==="string"){this.oShellModel.addHeaderEndItem([i],c,s);}else{this.oShellModel.addHeaderEndItem(i,c,s);}};a.prototype.setHeaderVisibility=function(v,c,s){this.oShellModel.setHeaderVisibility(v,c,s);};a.prototype.showSubHeader=function(i,c,s){if(typeof i==="string"){this.oShellModel.addSubHeader([i],c,s);}else{this.oShellModel.addSubHeader(i,c,s);}};a.prototype.showSignOutItem=function(c,s){this.oShellModel.showSignOutButton(c,s);};a.prototype.showSettingsItem=function(c,s){this.oShellModel.showSettingsButton(c,s);};a.prototype.setFooter=function(f){this.shellCtrl.setFooter(f);};a.prototype.setShellFooter=function(p){var d=new jQuery.Deferred(),t=this,c,C,b=p.controlType,o=p.oControlProperties;if(o&&o.id&&sap.ui.getCore().byId(o.id)){C=sap.ui.getCore().byId(o.id);if(C){if(this.lastFooterId){this.removeFooter();}this.lastFooterId=oInnerControl.getId();this.shellCtrl.setFooter(C);d.resolve(C);}}if(b){c=b.replace(/\./g,"/");sap.ui.require([c],function(e){C=new e(o);if(t.lastFooterId){t.removeFooter();}t.oShellModel.addElementToManagedQueue(C);t.lastFooterId=C.getId();t.shellCtrl.setFooter(C);d.resolve(C);});}else{jQuery.sap.log.warning("You must specify control type in order to create it");}return d.promise();};a.prototype.setFooterControl=function(c,C){var s=c.replace(/\./g,"/"),o=sap.ui.require(s),b,f,d=false;if(o){d=true;}else{if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}}f=function(C){if(c){if(d){return new o(C);}else{var e=jQuery.sap.getObject(c);return new e(C);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};b=this.createItem(C,undefined,undefined,f);if(this.lastFooterId){this.removeFooter();}this.lastFooterId=b.getId();this.shellCtrl.setFooter(b);return b;};a.prototype.hideHeaderItem=function(i,c,s){if(typeof i==="string"){this.oShellModel.removeHeaderItem([i],c,s);}else{this.oShellModel.removeHeaderItem(i,c,s);}};a.prototype.removeToolAreaItem=function(i,c,s){if(typeof i==="string"){this.oShellModel.removeToolAreaItem([i],c,s);}else{this.oShellModel.removeToolAreaItem(i,c,s);}};a.prototype.removeRightFloatingContainerItem=function(i,c,s){if(typeof i==="string"){this.oShellModel.removeRightFloatingContainerItem([i],c,s);}else{this.oShellModel.removeRightFloatingContainerItem(i,c,s);}};a.prototype.hideActionButton=function(i,c,s){if(typeof i==="string"){this.oShellModel.removeActionButton([i],c,s);}else{this.oShellModel.removeActionButton(i,c,s);}this.toggleOverFlowActions();};a.prototype.toggleOverFlowActions=function(){jQuery.sap.measure.start("FLP:Shell.controller.toggleMeAreaView","show or hide actionbox if no actions in me area","FLP");var b=sap.ui.getCore().byId('meArea');var B={};try{if(b){if(b.actionBox){if(b.actionBox._getControlsIds().length===0){sap.ui.getCore().byId('overflowActions').setVisible(false);}else{b.actionBox._getControlsIds().forEach(function(c){var d=sap.ui.getCore().byId(c);if(d.getVisible()){throw B;}});sap.ui.getCore().byId('overflowActions').setVisible(false);}}}}catch(e){if(e!==B){throw e;}else{sap.ui.getCore().byId('overflowActions').setVisible(true);}}jQuery.sap.measure.end("FLP:Shell.controller.toggleMeAreaView");};a.prototype.hideLeftPaneContent=function(i,c,s){if(typeof i==="string"){this.oShellModel.removeLeftPaneContent([i],c,s);}else{this.oShellModel.removeLeftPaneContent(i,c,s);}};a.prototype.hideFloatingActionButton=function(i,c,s){if(typeof i==="string"){this.oShellModel.removeFloatingActionButton([i],c,s);}else{this.oShellModel.removeFloatingActionButton(i,c,s);}};a.prototype.hideHeaderEndItem=function(i,c,s){if(typeof i==="string"){this.oShellModel.removeHeaderEndItem([i],c,s);}else{this.oShellModel.removeHeaderEndItem(i,c,s);}};a.prototype.hideSubHeader=function(i,c,s){if(typeof i==="string"){this.oShellModel.removeSubHeader([i],c,s);}else{this.oShellModel.removeSubHeader(i,c,s);}};a.prototype.removeFooter=function(){this.shellCtrl.removeFooter();if(this.lastFooterId){var f=sap.ui.getCore().byId(this.lastFooterId);if(f){f.destroy();}this.lastFooterId=undefined;}};a.prototype.getCurrentViewportState=function(){return this.shellCtrl.getCurrentViewportState();};a.prototype.addShellSubHeader=function(p){var d=new jQuery.Deferred(),t=this,c,C,b=p.controlType,o=p.oControlProperties,i=p.bIsVisible,e=p.bCurrentState,s=p.aStates;if(o&&o.id&&sap.ui.getCore().byId(o.id)){C=sap.ui.getCore().byId(o.id);if(C){if(i){this.showSubHeader(C.getId(),e,s);}d.resolve(C);}}if(b){c=b.replace(/\./g,"/");sap.ui.require([c],function(f){C=new f(o);if(i){t.showSubHeader(C.getId(),e,s);t.oShellModel.addElementToManagedQueue(C);}d.resolve(C);});}else{jQuery.sap.log.warning("You must specify control type in order to create it");}return d.promise();};a.prototype.addSubHeader=function(c,C,i,b,s){var d=c.replace(/\./g,"/"),o=sap.ui.require(d),e,f,g=false;if(o){g=true;}else{if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}}f=function(C){if(c){if(g){return new o(C);}else{var h=jQuery.sap.getObject(c);return new h(C);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};e=this.createItem(C,b,s,f);if(i){this.showSubHeader(e.getId(),b,s);}return e;};a.prototype.addUserAction=function(p){var d=new jQuery.Deferred(),t=this,M=this.oShellModel.getModelToUpdate(),c,C,b=p.controlType,o=p.oControlProperties,i=p.bIsVisible,e=p.bCurrentState,s=p.aStates,I=p.bIsFirst||true,n;if(o&&o.id&&sap.ui.getCore().byId(o.id)){C=sap.ui.getCore().byId(o.id);if(C){d.resolve(C);}}if(b){if(b==="sap.m.Button"){b="sap.ushell.ui.launchpad.ActionItem";}c=b.replace(/\./g,"/");sap.ui.require([c],function(f){var O=t.oShellModel.getModelToUpdate();t.oShellModel.setModelToUpdate(M,true);var g;if(o){if(o.id){g=o.id;}}C=sap.ui.getCore().byId(g)||new f(o);if(!C.getActionType){C=new f(o);}if(i){t.showActionButton(C.getId(),e,s,I);t.oShellModel.addElementToManagedQueue(C);}t.oShellModel.setModelToUpdate(O,false);d.resolve(C);});}else{n="You must specify control type in order to create it";jQuery.sap.log.warning(n);d.reject(n);}return d.promise();};a.prototype.addActionButton=function(c,C,i,b,s,I){var d,o,e,f,g=false;if(c==="sap.m.Button"){c="sap.ushell.ui.launchpad.ActionItem";}d=c.replace(/\./g,"/");o=sap.ui.require(d);if(o){g=true;}else{if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}}f=function(C){if(c){if(g){return new o(C);}else{var h=jQuery.sap.getObject(c);return new h(C);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};e=this.createItem(C,b,s,f);if(i){this.showActionButton(e.getId(),b,s,I);}return e;};a.prototype.addFloatingButton=function(p){var d=new jQuery.Deferred(),t=this,c,C,b=p.controlType,o=p.oControlProperties,i=p.bIsVisible,e=p.bCurrentState,s=p.aStates;if(o&&o.id&&sap.ui.getCore().byId(o.id)){C=sap.ui.getCore().byId(o.id);if(C){if(i){t.oShellModel.addElementToManagedQueue(C);t.showFloatingActionButton(oItem.getId(),e,s);}d.resolve(C);}}if(b){c=b.replace(/\./g,"/");}else{c="sap/m/Button";}sap.ui.require([c],function(f){C=new f(o);if(i){this.showFloatingActionButton(oItem.getId(),e,s);}d.resolve(C);});return d.promise();};a.prototype.addFloatingActionButton=function(c,C,i,b,s){var d,o,e,f,g=false;if(!c){c="sap.m.Button";}d=c.replace(/\./g,"/");o=sap.ui.require(d);if(o){g=true;}else{if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}}f=function(C){if(c){if(g){return new o(C);}else{var h=jQuery.sap.getObject(c);return new h(C);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};e=this.createItem(C,b,s,f);if(i){this.showFloatingActionButton(e.getId(),b,s);}return e;};a.prototype.addSidePaneContent=function(p){var d=new jQuery.Deferred(),t=this,c,C,b=false,e=p.controlType,o=p.oControlProperties,i=p.bIsVisible,f=p.bCurrentState,s=p.aStates;if(o&&o.id&&sap.ui.getCore().byId(o.id)){C=sap.ui.getCore().byId(o.id);if(C){d.resolve(C);}}if(e){c=e.replace(/\./g,"/");sap.ui.require([c],function(g){C=new g(o);if(i){t.oShellModel.addElementToManagedQueue(C);t.showLeftPaneContent(oItem.getId(),f,s);}d.resolve(C);});}else{jQuery.sap.log.warning("You must specify control type in order to create it");}return d.promise();};a.prototype.addLeftPaneContent=function(c,C,i,b,s){var t=this,d=c.replace(/\./g,"/"),o=sap.ui.require(d),e,f,g;if(o){g=true;}else{if(!jQuery.sap.getObject(c)){jQuery.sap.require(c);}}f=function(C){if(c){if(g){return new o(C);}else{var h=jQuery.sap.getObject(c);return new h(C);}}else{jQuery.sap.log.warning("You must specify control type in order to create it");}};e=this.createItem(C,b,s,f);if(i){this.showLeftPaneContent(e.getId(),b,s);}return e;};a.prototype.addHeaderItem=function(c,C,i,b,s){if(typeof(arguments[0])==='object'&&typeof(arguments[1])==='boolean'){C=arguments[0];i=arguments[1];b=arguments[2];s=arguments[3];}else{jQuery.sap.log.warning("sap.ushell.renderers.fiori2.Renderer: The parameter 'controlType' of the function 'addHeaderItem' is deprecated. Usage will be ignored!");}var p=C;p.showSeparator=false;var f=function(C){return new sap.ushell.ui.shell.ShellHeadItem(C);},I=this.createItem(p,b,s,f);if(i){this.showHeaderItem(I.getId(),b,s);}return I;};a.prototype.addRightFloatingContainerItem=function(c,i,C,s){var f=function(c){return new sap.m.NotificationListItem(c);},I=this.createItem(c,C,s,f);if(i){this.showRightFloatingContainerItem(I.getId(),C,s);}return I;};a.prototype.addToolAreaItem=function(c,i,C,s){var f=function(c){return new sap.ushell.ui.shell.ToolAreaItem(c);},I=this.createItem(c,C,s,f);if(i){this.showToolAreaItem(I.getId(),C,s);}return I;};a.prototype.addHeaderEndItem=function(c,C,i,b,s){var p=C;p.showSeparator=false;var f=function(C){return new sap.ushell.ui.shell.ShellHeadItem(C);},I=this.createItem(p,b,s,f);if(i){this.showHeaderEndItem(I.getId(),b,s);}return I;};a.prototype.getModelConfiguration=function(){return this.shellCtrl.getModelConfiguration();};a.prototype.addEndUserFeedbackCustomUI=function(c,s){this.shellCtrl.addEndUserFeedbackCustomUI(c,s);};a.prototype.addUserPreferencesEntry=function(e){return this.shellCtrl.addUserPreferencesEntry(e);};a.prototype.setHeaderTitle=function(t,c,C){var s,o=null,b,l=a.prototype.LaunchpadState;if(C&&C.id&&sap.ui.getCore().byId(C.id)){o=sap.ui.getCore().byId(C.id);this.shellCtrl.setHeaderTitle(t,o);}else if(c){s=c.replace(/\./g,"/");b=sap.ui.require(s);if(b){o=new b(C);this.shellCtrl.setHeaderTitle(t,o);}else{sap.ui.require([s],function(b){o=new b(C);this.shellCtrl.setHeaderTitle(t,o);});}}else{this.shellCtrl.setHeaderTitle(t,o);}};a.prototype.setLeftPaneVisibility=function(l,v){this.oShellModel.setLeftPaneVisibility(v,false,[l]);};a.prototype.showToolArea=function(l,v){this.oShellModel.showShellItem("/toolAreaVisible",l,v);};a.prototype.setHeaderHiding=function(h){return this.oShellModel.setHeaderHiding(h);};a.prototype.setFloatingContainerContent=function(c,C,s){this.shellCtrl.setFloatingContainerContent("floatingContainerContent",[c.getId()],C,s);};a.prototype.setFloatingContainerVisibility=function(v){this.shellCtrl.setFloatingContainerVisibility(v);};a.prototype.getFloatingContainerState=function(){return this.shellCtrl.getFloatingContainerState();};a.prototype.getFloatingContainerVisiblity=function(){return this.shellCtrl.getFloatingContainerVisibility();};a.prototype.getRightFloatingContainerVisibility=function(){return this.shellCtrl.getRightFloatingContainerVisibility();};a.prototype.setFloatingContainerDragSelector=function(e){this.shellCtrl.setFloatingContainerDragSelector(e);};a.prototype.makeEndUserFeedbackAnonymousByDefault=function(e){this.shellCtrl.makeEndUserFeedbackAnonymousByDefault(e);};a.prototype.showEndUserFeedbackLegalAgreement=function(s){this.shellCtrl.showEndUserFeedbackLegalAgreement(s);};a.prototype.LaunchpadState={App:"app",Home:"home"};a.prototype.createInspection=function(A,c,C,s){this.oShellModel.createInspection(A,c,C,s);};a.prototype.createTriggers=function(t,c,s){this.oShellModel.createTriggers(t,c,s);};a.prototype.convertButtonsToActions=function(i,c,s,I){var p={},b,t=this;i.forEach(function(d){b=sap.ui.getCore().byId(d);p.id=b.getId();p.text=b.getText();p.icon=b.getIcon();p.tooltip=b.getTooltip();p.enabled=b.getEnabled();p.visible=b.getVisible();if(b.mEventRegistry&&b.mEventRegistry.press){p.press=b.mEventRegistry.press[0].fFunction;}b.destroy();t.addActionButton("sap.ushell.ui.launchpad.ActionItem",p,p.visible,c,s,I);});};a.prototype.createItem=function(c,C,s,f){var i;if(c&&c.id){i=sap.ui.getCore().byId(c.id);}if(!i){i=f(c);if(C){this.oShellModel.addElementToManagedQueue(i);}}return i;};a.prototype.addEntryInShellStates=function(n,e,A,f,s){this.oShellModel.addEntryInShellStates(n,e,A,f,s);};a.prototype.removeCustomItems=function(s,i,c,S){if(typeof i==="string"){this.oShellModel.removeCustomItems(s,[i],c,S);}else{this.oShellModel.removeCustomItems(s,i,c,S);}};a.prototype.addCustomItems=function(s,i,c,S){if(typeof i==="string"){this.oShellModel.addCustomItems(s,[i],c,S);}else{this.oShellModel.addCustomItems(s,i,c,S);}};return a;});
