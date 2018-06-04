/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.scfld.md.app.ApplicationImplementation");jQuery.sap.require("sap.ca.scfld.md.app.ConnectionManager");jQuery.sap.require("sap.ca.scfld.md.app.MasterHeaderFooterHelper");jQuery.sap.require("sap.ca.scfld.md.app.DetailHeaderFooterHelper");jQuery.sap.require("sap.ca.scfld.md.app.FullScreenHeaderFooterHelper");sap.ui.base.ManagedObject.extend("sap.ca.scfld.md.app.ApplicationImplementation",{metadata:{properties:{identity:"string",component:"object",oViewHook:"string"},methods:["getConnectionManager"]},init:function(){},sI18N:"i18n",startApplication:function(c){this.bManualMasterRefresh=false;this.oConfiguration=c;this.oMHFHelper=new sap.ca.scfld.md.app.MasterHeaderFooterHelper(this);this.oDHFHelper=new sap.ca.scfld.md.app.DetailHeaderFooterHelper(this);this.oFHFHelper=new sap.ca.scfld.md.app.FullScreenHeaderFooterHelper(this);this.aMasterKeys=c.getMasterKeyAttributes();this.aKeyValues=null;this.mApplicationModels={};var l=sap.ui.getCore().getConfiguration().getFormatLocale();var b=this.getIdentity()+".i18n.i18n";this.AppI18nModel=new sap.ui.model.resource.ResourceModel({bundleName:b,bundleLocale:l});var C=this.getComponent();if(!sap.ui.getCore().getConfiguration().getDisableCustomizing()){var m=C.getMetadata();if(m){var e=m.getConfig("sap.ca.i18Nconfigs");if(e.bundleName){this.AppI18nModel.enhance(e);}}}this.UilibI18nModel=new sap.ui.model.resource.ResourceModel({bundleName:"sap.ca.scfld.md.i18n.i18n",bundleLocale:l});this.oConnectionManager=sap.ca.scfld.md.app.ConnectionManager.getNewInstance(this.getIdentity(),this.oConfiguration,{},this.getComponent());this.bIsPhone=sap.ui.Device.system.phone;this.bIsIPad=sap.ui.Device.system.tablet;var h=sap.ui.getCore().byId(this.getOViewHook());h.setModel(this.AppI18nModel,this.sI18N);this.oCurController={};this.oCurController.MasterCtrl=null;this.oCurController.DetailCtrl=null;this.oCurController.FullCtrl=null;sap.ui.Device.orientation.attachHandler(this.onChangeDeviceOrientation,this);this.registerExitModule(jQuery.proxy(this.onAppExit,this));},onAppExit:function(){sap.ui.Device.orientation.detachHandler(this.onChangeDeviceOrientation,this);},getResourceBundle:function(){return this.AppI18nModel.getResourceBundle();},getUiLibResourceBundle:function(){return this.UilibI18nModel.getResourceBundle();},getODataModel:function(n){if(n==this.sI18N){return this.AppI18nModel;}return this.oConnectionManager.getModel(n);},setModels:function(c){var v=c.getView();v.setModel(this.AppI18nModel,this.sI18N);v.setModel(this.getComponent().getModel("device"),"device");jQuery.each(this.oConnectionManager.modelList,function(n,m){if(n=="undefined"){v.setModel(m);}else{v.setModel(m,n);}});},isMock:function(){var r=jQuery.sap.getUriParameters().get("responderOn");return(r==="true");},getConnectionManager:function(){return this.oConnectionManager;},isDetailNavigationPossible:function(c,C){var l=c.getList();if(l){var L=l.getSelectedItem();if(L===null){return false;}if(c.getDetailRouteName===undefined){var p=L.getBindingContext(c.sModelName).getPath().substr(1);if(p.indexOf("/")){p=encodeURIComponent(p);}if(c.oRouter.getURL("detail",{contextPath:p})!==C){return true;}}else{if(c.oRouter.getURL(c.getDetailRouteName(),c.getDetailNavigationParameters(L))!==C){return true;}}}return false;},onMasterRefreshed:function(c){var h=sap.ui.core.routing.HashChanger.getInstance();var C=h.getHash();this.setStoredSelectedItem(c);var a=false;if(this.bManualMasterRefresh===true){a=this.isDetailNavigationPossible(c,C);}this.fireEvent("_scfldOnMasterListRefresh",{bManualRefresh:this.bManualMasterRefresh,bAutoNavigation:a});this.bManualMasterRefresh=false;},onMasterChanged:function(c){this.oMHFHelper.defineMasterHeaderFooter(c);},setStoredSelectedItem:function(c){if(!this.aKeyValues||this.bManualMasterRefresh===true){return;}var l=c.getList();var I=l.getItems();l.removeSelections();var f=false;for(var i=0;i<I.length&&!f;i++){var L=I[i];if((L instanceof sap.m.GroupHeaderListItem)){continue;}var o=L.getBindingContext(c.sModelName);f=true;for(var j=0;f&&j<this.aKeyValues.length;j++){f=this.aKeyValues[j]==o.getProperty(this.aMasterKeys[j]);}}if(this.bIsPhone||(c._oControlStore&&c._oControlStore.bIsSearching)){if(f){L.setSelected(true);l.setSelectedItem(L,true);}if(c._oControlStore){c._oControlStore.bIsSearching=false;}}else{if(!f){var L=this.getFirstListItem(c);}if(L){c.setListItem(L);}}this.aKeyValues=null;},defineDetailHeaderFooter:function(c){this.oDHFHelper.defineDetailHeaderFooter(c);},defineFullscreenHeaderFooter:function(c){this.oFHFHelper.defineHeaderFooter(c);},setSplitContainer:function(s){this.oSplitContainer=s;},registerExitModule:function(e){if(!this.aExitModules){this.aExitModules=[];var c=this.getComponent();if(c.exit){var a=jQuery.proxy(c.exit,c);}else{var a=function(){};}c.exit=jQuery.proxy(function(){for(var i=0;i<this.aExitModules.length;i++){this.aExitModules[i]();}a();},this);}this.aExitModules.push(e);},setMasterListBinding:function(c,b){if(c._oMasterListBinding){c._oMasterListBinding.detachChange(c._onMasterListLoaded,c);c._oMasterListBinding.detachChange(c._onMasterListChanged,c);}c._oMasterListBinding=b;if(c._oMasterListBinding){c._oMasterListBinding.attachChange(c._onMasterListLoaded,c);c._oMasterListBinding.attachChange(c._onMasterListChanged,c);}},onChangeDeviceOrientation:function(p){if(this.oCurController.MasterCtrl&&this.oCurController.MasterCtrl._oHeaderFooterOptions){this.oMHFHelper.setHeaderFooter(this.oCurController.MasterCtrl,this.oCurController.MasterCtrl._oHeaderFooterOptions,this.oCurController.MasterCtrl._oControlStore.bAllDisabled,true);}if(this.oCurController.DetailCtrl&&this.oCurController.DetailCtrl._oHeaderFooterOptions){this.oDHFHelper.setHeaderFooter(this.oCurController.DetailCtrl,this.oCurController.DetailCtrl._oHeaderFooterOptions,true);}if(this.oCurController.FullCtrl&&this.oCurController.FullCtrl._oHeaderFooterOptions){this.oFHFHelper.setHeaderFooter(this.oCurController.FullCtrl,this.oCurController.FullCtrl._oHeaderFooterOptions,true);}},setApplicationModel:function(n,m){if(n!=null){if(this.mApplicationModels.hasOwnProperty(n)){jQuery.sap.log.warning("There was already an application model defined for the name "+n+" it will be overwritten");}this.mApplicationModels[n]=m;}else{jQuery.sap.log.error("You cannot set an application Model with a 'null' name");}},getApplicationModel:function(n){var m=null;if(this.mApplicationModels.hasOwnProperty(n)){m=this.mApplicationModels[n];}return m;},getFirstListItem:function(c){var l=c.getList(),I=l.getItems();for(var i=0;i<I.length;i++){if(!(I[i]instanceof sap.m.GroupHeaderListItem)){return I[i];}}return null;}});
