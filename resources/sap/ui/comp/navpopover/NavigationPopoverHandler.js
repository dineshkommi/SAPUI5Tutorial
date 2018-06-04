/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/comp/library',"sap/ui/base/ManagedObject",'./SemanticObjectController','sap/ui/model/json/JSONModel','sap/ui/core/Control','./Factory','./NavigationPopover','./Util','sap/m/VBox','./LinkData','sap/m/MessageBox','sap/ui/comp/personalization/Controller','sap/ui/comp/personalization/Util','./FlexHandler','./NavigationContainer','./ContactDetailsController'],function(q,C,M,S,J,a,F,N,U,V,L,b,c,P,d,e,f){"use strict";var g=M.extend("sap.ui.comp.navpopover.NavigationPopoverHandler",{metadata:{library:"sap.ui.comp",properties:{semanticObject:{type:"string",defaultValue:null},additionalSemanticObjects:{type:"string[]",defaultValue:[]},semanticObjectController:{type:"any",defaultValue:null},fieldName:{type:"string",defaultValue:null},semanticObjectLabel:{type:"string",defaultValue:null},mapFieldToSemanticObject:{type:"boolean",defaultValue:true},contactAnnotationPath:{type:"string",defaultValue:undefined},enableAvailableActionsPersonalization:{type:"boolean",defaultValue:true}},associations:{control:{type:"sap.ui.core.Control",multiple:false}},events:{beforePopoverOpens:{parameters:{semanticObject:{type:"string"},semanticAttributes:{type:"object"},semanticAttributesOfSemanticObjects:{type:"object"},setSemanticAttributes:{type:"function"},setAppStateKey:{type:"function"},originalId:{type:"string"},open:{type:"function"}}},navigationTargetsObtained:{parameters:{mainNavigation:{type:"sap.ui.comp.navpopover.LinkData"},actions:{type:"sap.ui.comp.navpopover.LinkData[]"},ownNavigation:{type:"sap.ui.comp.navpopover.LinkData"},popoverForms:{type:"sap.ui.layout.form.SimpleForm[]"},semanticObject:{type:"string"},semanticAttributes:{type:"object"},originalId:{type:"string"},show:{type:"function"}}},innerNavigate:{parameters:{text:{type:"string"},href:{type:"string"},semanticObject:{type:"string"},semanticAttributes:{type:"object"},originalId:{type:"string"}}}}}});g.prototype.init=function(){this._oPopover=null;this._oContactDetailsController=new f();var m=new J({semanticObject:undefined,semanticAttributes:undefined,appStateKey:undefined,mainNavigationId:undefined,navigationTarget:{mainNavigation:undefined,enableAvailableActionsPersonalization:undefined,availableActionsPersonalizationText:undefined,extraContent:undefined},availableActions:[]});m.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);m.setSizeLimit(1000);this.setModel(m,"$sapuicompNavigationPopoverHandler");};g.prototype.applySettings=function(s){M.prototype.applySettings.apply(this,arguments);this._setSemanticAttributes(this._calculateSemanticAttributes(null));};g.prototype.openPopover=function(D){var t=this;return this._getPopover().then(function(p){if(!p.hasContent()){t._showErrorDialog(sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("POPOVER_DETAILS_NAV_NOT_POSSIBLE"),sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("POPOVER_MSG_NAV_NOT_POSSIBLE"),p);t._destroyPopover();return;}var l=p.getDirectLink();if(l){t._fireInnerNavigate({text:l.getText(),href:l.getHref()});window.location.href=l.getHref();t._destroyPopover();return;}p.show(D);});};g.prototype.getSemanticObjectValue=function(){var s=this._getSemanticAttributes();if(s){return s[this.getSemanticObject()][this.getSemanticObject()];}return undefined;};g.prototype.getNavigationPopoverStableId=function(){var A=this._getAppComponent();var s=this.getModel("$sapuicompNavigationPopoverHandler").getProperty("/semanticObject");if(!A||!s){return undefined;}var h=[s].concat(this.getAdditionalSemanticObjects());U.sortArrayAlphabetical(h);var i=h.join("--");return A.createId("sapuicompnavpopoverNavigationPopover---"+i);};g.prototype.updateBindingContext=function(){a.prototype.updateBindingContext.apply(this,arguments);this._setSemanticAttributes(this._calculateSemanticAttributes(null));this._destroyPopover();};g.prototype.setSemanticObject=function(s){this._destroyPopover();this.setProperty("semanticObject",s);this.getModel("$sapuicompNavigationPopoverHandler").setProperty("/semanticObject",s);this._setSemanticAttributes(this._calculateSemanticAttributes(null));return this;};g.prototype._setSemanticAttributes=function(s){this.getModel("$sapuicompNavigationPopoverHandler").setProperty("/semanticAttributes",s);};g.prototype._getSemanticAttributes=function(){return this.getModel("$sapuicompNavigationPopoverHandler").getProperty("/semanticAttributes");};g.prototype.setEnableAvailableActionsPersonalization=function(E){this.setProperty("enableAvailableActionsPersonalization",E);this.getModel("$sapuicompNavigationPopoverHandler").setProperty("/navigationTarget/enableAvailableActionsPersonalization",E);return this;};g.prototype.setFieldName=function(s){this.setProperty("fieldName",s);this._setSemanticAttributes(this._calculateSemanticAttributes(null));return this;};g.prototype.setControl=function(o){this.setAssociation("control",o);this.setModel(o.getModel());this._destroyPopover();this._updateSemanticObjectController();this._setSemanticAttributes(this._calculateSemanticAttributes(null));return this;};g.prototype.setMapFieldToSemanticObject=function(m){this.setProperty("mapFieldToSemanticObject",m);this._setSemanticAttributes(this._calculateSemanticAttributes(null));return this;};g.prototype.setSemanticObjectController=function(s){this._updateSemanticObjectController(s);this._setSemanticAttributes(this._calculateSemanticAttributes(null));return this;};g.prototype.exit=function(){this._oContactDetailsController.destroy();this._destroyPopover();if(this.getSemanticObjectController()){this.getSemanticObjectController().unregisterControl(this);}if(this.getModel("$sapuicompNavigationPopoverHandler")){this.getModel("$sapuicompNavigationPopoverHandler").destroy();}};g.prototype._initModel=function(){var t=this;var s;var h=this.getSemanticObject();var A=this.getAdditionalSemanticObjects();var i=this.getContactAnnotationPath();if(i===undefined&&this.getSemanticObjectController()&&this.getSemanticObjectController().getContactAnnotationPaths()&&this.getSemanticObjectController().getContactAnnotationPaths()[this.getFieldName()]!==undefined){i=this.getSemanticObjectController().getContactAnnotationPaths()[this.getFieldName()];}var o=sap.ui.getCore().byId(this.getControl());var B=o&&o.getBindingContext()?o.getBindingContext().getPath():null;if(!B){q.sap.log.warning("sap.ui.comp.navpopover.NavigationPopoverHandler: Binding Context is null. Please be aware that without binding context no semantic attributes can be calculated. Without semantic attributes no URL parameters can be created.");}var O=this.getModel();var j=this._getComponent();var I=o&&o.getId();var m,k,n;return U.retrieveSemanticObjectMapping(this.getFieldName(),O,B).then(function(l){t._setSemanticAttributes(t._calculateSemanticAttributes(l));s=t._getSemanticAttributes();return t._fireBeforePopoverOpens(s,h,I);}).then(function(r){s=r.semanticAttributes;t._setSemanticAttributes(s);k=t.getSemanticObjectValue();m=(o&&o._getTextOfDom&&o._getTextOfDom())||t.getSemanticObjectValue();t.getModel("$sapuicompNavigationPopoverHandler").setProperty("/appStateKey",r.appStateKey);return U.retrieveNavigationTargets(h,A,r.appStateKey,j,s,m);}).then(function(T){n=T;t._oContactDetailsController.setModel(O);return t._oContactDetailsController.getBindingPath4ContactAnnotation(B,i,k);}).then(function(l){var p=t._oContactDetailsController.getContactDetailsContainers(l);return t._fireNavigationTargetsObtained(m,h,s,I,p,n);}).then(function(r){var l=t.getModel("$sapuicompNavigationPopoverHandler");l.setProperty("/mainNavigationId",r.mainNavigationId);l.setProperty("/navigationTarget/mainNavigation",r.mainNavigation);l.setProperty("/navigationTarget/extraContent",r.extraContent);l.setProperty("/availableActions",t._updateVisibilityOfAvailableActions(L.convert2Json(r.availableActions)));l.setProperty("/navigationTarget/enableAvailableActionsPersonalization",t._isAvailableActionsPersonalizationTextEnabled(l.getProperty("/availableActions")));});};g.prototype._initPopover=function(){var t=this;return this._initModel().then(function(){var m=t.getModel("$sapuicompNavigationPopoverHandler");var p=t._createPopover();p.setModel(m,"$sapuicompNavigationPopoverHandler");var o=sap.ui.getCore().byId(t.getControl());if(o){o.addDependent(p);}p.getContent()[0]._updateAvailableActionsPersonalizationText();return p;});};g.prototype._initNavigationContainer=function(){var t=this;return this._initModel().then(function(){var m=t.getModel("$sapuicompNavigationPopoverHandler");var n=t._createNavigationContainer();n.setModel(m,"$sapuicompNavigationPopoverHandler");var o=sap.ui.getCore().byId(t.getControl());if(o){o.addDependent(n);}n._updateAvailableActionsPersonalizationText();return n;});};g.prototype._getPopover=function(){if(!this._oPopover){return this._initPopover();}else{return Promise.resolve(this._oPopover);}};g.prototype._getNavigationContainer=function(){return this._initNavigationContainer().then(function(n){return n;});};g.prototype._destroyPopover=function(){if(this._oPopover){this._oPopover.destroy();this._oPopover=null;}};g.prototype._createPopover=function(){if(this._oPopover){return this._oPopover;}var n=this._createNavigationContainer();n.attachAvailableActionsPersonalizationPress(this._onAvailableActionsPersonalizationPress,this);var i=new sap.ui.core.InvisibleText({text:"{$sapuicompNavigationPopoverHandler>/mainNavigationId}"});this._oPopover=new N({customData:new sap.ui.core.CustomData({key:"useExternalContent"}),content:[n,i],ariaLabelledBy:i,semanticObjectName:"{$sapuicompNavigationPopoverHandler>/semanticObject}",semanticAttributes:"{$sapuicompNavigationPopoverHandler>/semanticAttributes}",appStateKey:"{$sapuicompNavigationPopoverHandler>/appStateKey}",source:this.getControl(),beforeClose:function(){this.removeAllContent().forEach(function(o){o.destroy();});},afterClose:this._destroyPopover.bind(this)});return this._oPopover;};g.prototype._createNavigationContainer=function(){if(!!sap.ui.getCore().byId(this.getNavigationPopoverStableId())){q.sap.log.error("Duplicate ID '"+this.getNavigationPopoverStableId()+"'. The instance of NavigationContainer should be destroyed first in order to avoid duplicate creation of NavigationContainer with stable ID.");throw"Duplicate ID";}var m=this.getModel("$sapuicompNavigationPopoverHandler");var n=new e(this.getNavigationPopoverStableId(),{mainNavigationId:"{$sapuicompNavigationPopoverHandler>/mainNavigationId}",mainNavigation:m.getProperty("/navigationTarget/mainNavigation"),availableActions:{path:'$sapuicompNavigationPopoverHandler>/availableActions',templateShareable:false,template:new L({key:"{$sapuicompNavigationPopoverHandler>key}",href:"{$sapuicompNavigationPopoverHandler>href}",text:"{$sapuicompNavigationPopoverHandler>text}",target:"{$sapuicompNavigationPopoverHandler>target}",description:"{$sapuicompNavigationPopoverHandler>description}",visible:"{$sapuicompNavigationPopoverHandler>visible}"})},extraContent:m.getProperty("/navigationTarget/extraContent")?m.getProperty("/navigationTarget/extraContent").getId():undefined,component:this._getComponent(),enableAvailableActionsPersonalization:"{$sapuicompNavigationPopoverHandler>/navigationTarget/enableAvailableActionsPersonalization}",availableActionsPersonalizationText:"{$sapuicompNavigationPopoverHandler>/navigationTarget/availableActionsPersonalizationText}",navigate:this._onNavigate.bind(this)});n._getFlexHandler().setInitialSnapshot(d.convertArrayToSnapshot("key",m.getProperty("/availableActions")));return n;};g.prototype._fireBeforePopoverOpens=function(s,h,i){var t=this;return new Promise(function(r){var R={semanticAttributes:s,appStateKey:undefined};if(!t.hasListeners("beforePopoverOpens")){return r(R);}t.fireBeforePopoverOpens({originalId:i,semanticObject:h,semanticAttributes:s?s[h]:s,semanticAttributesOfSemanticObjects:s,setSemanticAttributes:function(j,k){k=k||h;R.semanticAttributes=R.semanticAttributes||{};R.semanticAttributes[k]=j;},setAppStateKey:function(A){R.appStateKey=A;},open:function(){return r(R);}});});};g.prototype._fireNavigationTargetsObtained=function(m,s,o,i,h,n){var t=this;return new Promise(function(r){var R={mainNavigationId:m,mainNavigation:n.mainNavigation,availableActions:n.availableActions,ownNavigation:n.ownNavigation,extraContent:h.length?new V({items:h}):undefined};if(!t.hasListeners("navigationTargetsObtained")){return r(R);}t.fireNavigationTargetsObtained({mainNavigation:n.mainNavigation,actions:n.availableActions,ownNavigation:n.ownNavigation,popoverForms:h,semanticObject:s,semanticAttributes:o?o[s]:o,originalId:i,show:function(m,j,A,k){if(arguments.length>0&&!(typeof m==="string"||j instanceof sap.ui.comp.navpopover.LinkData||q.isArray(A))&&k===undefined){k=A;A=j;j=m;m=undefined;}if(m!==undefined&&m!==null){R.mainNavigationId=m;}if(j!==undefined){R.mainNavigation=j;}if(A){A.forEach(function(l){if(l.getKey()===undefined){q.sap.log.error("'key' attribute of 'availableAction' '"+l.getText()+"' is undefined. Links without 'key' can not be persisted.");q.sap.log.warning("The 'visible' attribute of 'availableAction' '"+l.getText()+"' is set to 'true'");l.setVisible(true);}});R.availableActions=A;}if(k){R.extraContent=k;}return r(R);}});});};g.prototype._onNavigate=function(E){var p=E.getParameters();this._fireInnerNavigate({text:p.text,href:p.href});};g.prototype._onAvailableActionsPersonalizationPress=function(E){var t=this;var n=E.getSource();this._oPopover.setModal(true);n.openSelectionDialog(false,true,undefined,true,undefined).then(function(){if(t._oPopover){t._oPopover.setModal(false);}});};g.prototype._fireInnerNavigate=function(p){var o=sap.ui.getCore().byId(this.getControl());var s=this.getSemanticObject();var h=this._getSemanticAttributes();this.fireInnerNavigate({text:p.text,href:p.href,originalId:o?o.getId():undefined,semanticObject:s,semanticAttributes:h?h[s]:h});};g.prototype._getComponent=function(){var o=sap.ui.getCore().byId(this.getControl());if(!o){return null;}var p=o.getParent();while(p){if(p instanceof sap.ui.core.Component){if(p&&p.getAppComponent){p=p.getAppComponent();}return p;}p=p.getParent();}return null;};g.prototype._getAppComponent=function(){return F.getService("FlexConnector").getAppComponentForControl(sap.ui.getCore().byId(this.getControl()));};g.prototype._calculateSemanticAttributes=function(s){var o=sap.ui.getCore().byId(this.getControl());var B=this.getBindingContext()||(o&&o.getBindingContext());if(!B){return null;}var t=this;var h=this.getFieldName();var i=B.getObject(B.getPath());var j=["",this.getSemanticObject()].concat(this.getAdditionalSemanticObjects());var m=this.getMapFieldToSemanticObject();if(this.getSemanticObjectController()&&this.getSemanticObjectController().getMapFieldToSemanticObject()!==undefined){m=this.getSemanticObjectController().getMapFieldToSemanticObject();}var r={};j.forEach(function(k){r[k]={};for(var A in i){if(A==="__metadata"){continue;}if(i[A]===undefined||i[A]===null){continue;}if(q.isPlainObject(i[A])){continue;}var l;if(s){l=(s[k]&&s[k][A])?s[k][A]:A;}else{l=A;if(m){l=t._mapFieldToSemanticObject(A);}}var n=i[A];if(r[k][l]){if(i[h]){if(l===t._mapFieldToSemanticObject(t.getFieldName())){n=i[h];}else{q.sap.log.error("During the mapping of the attribute "+A+" a clash situation is occurred. This can lead to wrong navigation later on.");}}}r[k][l]=n;}});return r;};g.prototype._mapFieldToSemanticObject=function(s){if(this.getFieldName()===s&&this.getSemanticObject()){return this.getSemanticObject();}var o=this.getSemanticObjectController();if(!o){return s;}var m=o.getFieldSemanticObjectMap();if(!m){return s;}return m[s]||s;};g.prototype._updateSemanticObjectController=function(o){var h=this.getProperty("semanticObjectController");var i=sap.ui.getCore().byId(this.getControl());o=o||this.getSemanticObjectController()||this._getSemanticObjectControllerOfControl(i);if(o&&i&&o.isControlRegistered(i)){o.unregisterControl(this);}if(o!==h&&h){h.unregisterControl(this);}this.setProperty("semanticObjectController",o);if(o&&!o.isControlRegistered(i)){o.registerControl(this);}};g.prototype._getSemanticObjectControllerOfControl=function(o){if(!o){return undefined;}var s;var p=o.getParent();while(p){if(p.getSemanticObjectController){s=p.getSemanticObjectController();if(s){this.setSemanticObjectController(s);break;}}p=p.getParent();}return s;};g.prototype._updateVisibilityOfAvailableActions=function(m){if(!this._getEnabledAvailableActionsPersonalizationTotal()){return m;}var h=U.getStorableAvailableActions(m);var H=h.some(function(o){return!!o.isSuperiorAction;});h.forEach(function(o){if(m.length>10){o.visible=false;}if(H){o.visible=false;}if(o.isSuperiorAction){o.visible=true;}});return m;};g.prototype._isAvailableActionsPersonalizationTextEnabled=function(m){var h=U.getStorableAvailableActions(m);if(h.length===0){return false;}return this._getEnabledAvailableActionsPersonalizationTotal();};g.prototype._getEnabledAvailableActionsPersonalizationTotal=function(){var E=this.getEnableAvailableActionsPersonalization();if(this.getSemanticObjectController()&&this.getSemanticObjectController().getEnableAvailableActionsPersonalization()&&this.getSemanticObjectController().getEnableAvailableActionsPersonalization()[this.getFieldName()]!==undefined){E=this.getSemanticObjectController().getEnableAvailableActionsPersonalization()[this.getFieldName()];}return E;};g.prototype._showErrorDialog=function(t,T,o){b.show(t,{icon:b.Icon.ERROR,title:T,actions:[sap.m.MessageBox.Action.CLOSE],styleClass:(o.$()&&o.$().closest(".sapUiSizeCompact").length)?"sapUiSizeCompact navigationPopoverErrorDialog":"navigationPopoverErrorDialog"});};return g;},true);
