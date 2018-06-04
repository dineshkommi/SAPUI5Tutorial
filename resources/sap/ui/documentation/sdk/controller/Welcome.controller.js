/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/documentation/sdk/controller/BaseController","sap/m/library","sap/ui/Device","sap/ui/model/json/JSONModel","sap/ui/model/resource/ResourceModel"],function(q,B,m,D,J,R){"use strict";return B.extend("sap.ui.documentation.sdk.controller.Welcome",{onInit:function(){var i=new R({bundleName:"sap.ui.documentation.sdk.i18n.i18n"});this.getView().setModel(i,"i18n");this.getRouter().getRoute("welcome").attachPatternMatched(this._onMatched,this);sap.ui.getVersionInfo({async:true}).then(function(v){var M=new J({isOpenUI5:v&&v.gav&&/openui5/i.test(v.gav)});this.getView().setModel(M,"welcomeView");}.bind(this));this._onOrientationChange({landscape:D.orientation.landscape});},onBeforeRendering:function(){this._deregisterOrientationChange();},onAfterRendering:function(){this._registerOrientationChange();},onExit:function(){this._deregisterOrientationChange();},navigateToDetails:function(e){var h=e.oSource.getHref()||e.oSource.getTarget();h=h.replace("#/","").split('/');var p=h[0];var a=h[1];e.preventDefault();this.getRouter().navTo(p,{id:a},true);},onGetStarted:function(){m.URLHelper.redirect("#/topic/8b49fc198bf04b2d9800fc37fecbb218");},onDownloadButtonPress:function(e){var i=this.getView().getModel("welcomeView").getProperty("/isOpenUI5"),u=i?"http://openui5.org/download.html":"https://tools.hana.ondemand.com/#sapui5";window.open(u,"_blank");},_onMatched:function(){try{this.hideMasterSide();}catch(e){q.sap.log.error(e);}}});});
