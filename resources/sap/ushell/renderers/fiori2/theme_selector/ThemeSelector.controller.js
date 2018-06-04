// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(function(){"use strict";sap.ui.controller("sap.ushell.renderers.fiori2.theme_selector.ThemeSelector",{onInit:function(){try{this.userInfoService=sap.ushell.Container.getService("UserInfo");this.oUser=this.userInfoService.getUser();}catch(e){jQuery.sap.log.error("Getting UserInfo service failed.");this.oUser=sap.ushell.Container.getUser();}this.currentThemeId=this.oUser.getTheme();this.origThemeId=this.currentThemeId;this.aThemeList=null;this.isContentLoaded=false;this.aSapThemeMap={"base":"sapUshellBaseIconStyle","sap_bluecrystal":"sapUshellBlueCrystalIconStyle","sap_belize_hcb":"sapUshellHCBIconStyle","sap_belize_hcw":"sapUshellHCWIconStyle","sap_belize":"sapUshellBelizeIconStyle","sap_belize_plus":"sapUshellPlusIconStyle"};},getConfigurationModel:function(){var c=new sap.ui.model.json.JSONModel({});var a=this.getView().getModel()?this.getView().getModel().getProperty("/animationMode"):undefined;this.originalAnimationModeKey=a?a:"full";this.currentAnimationModeKey=this.originalAnimationModeKey;c.setData({isRTL:sap.ui.getCore().getConfiguration().getRTL(),sapUiContentIconColor:sap.ui.core.theming.Parameters.get('sapUiContentIconColor'),isContentDensitySwitchEnable:this.isContentDensitySwitchEnable(),flexAlignItems:'Center',textAlign:sap.ui.Device.system.phone?'Left':'Right',textDirection:'Row',labelWidth:'auto',isCozyContentMode:this.isCozyContentMode(),animationMode:this.currentAnimationModeKey});return c;},_getIsChangeThemePermitted:function(){return this.oUser.isSetThemePermitted();},onAfterRendering:function(){var l=sap.ui.getCore().byId("userPrefThemeSelector--themeList"),i=l.getItems(),I,t,a=this;l.toggleStyleClass("sapUshellThemeListDisabled",!this.isListActive());i.forEach(function(L){t=L.getCustomData()[0].getValue();I=L.getContent()[0].getItems()[0].getItems()[0];if(!a.isListActive()){L.isSelectable=function(){return false;};}if(t===a.currentThemeId){L.setSelected(true);if(!a.isListActive()){L.toggleStyleClass("sapUshellThemeListItemSelected",true);}}else{L.setSelected(false);}I.addStyleClass(a.aSapThemeMap[t]);I.toggleStyleClass("sapUshellHCBIconStyleOnHCB",t===a.currentThemeId&&t==="sap_belize_hcb");I.toggleStyleClass("sapUshellHCWIconStyleOnHCW",a.currentThemeId!=="sap_belize_hcb"&&t==="sap_belize_hcw");});var c=sap.ui.getCore().byId("userPrefThemeSelector--contentDensitySwitch");if(c){c.setState(this.currentContentDensity==="cozy");c.setEnabled(this.isContentDensitySwitchEnable());}jQuery('.sapUshellAppearanceTable > table').attr('role','list');},getContent:function(){var t=this;var d=jQuery.Deferred();var r=sap.ushell.resources.getTranslationModel();this.getView().setModel(r,"i18n");this.getView().setModel(this.getConfigurationModel(),"config");if(this.isContentDensitySwitchEnable()){this.origContentDensity=this.currentContentDensity;if(this.oUser.getContentDensity()){this.currentContentDensity=this.oUser.getContentDensity();}else{this.currentContentDensity="cozy";}}if(this.isContentLoaded===true){d.resolve(this.getView());}else{var a=this._getThemeList();a.done(function(T){if(T.length>0){T.sort(function(b,c){var e=b.name,f=c.name;if(e<f){return-1;}if(e>f){return 1;}return 0;});for(var i=0;i<T.length;i++){if(T[i].id==t.currentThemeId){T[i].isSelected=true;}else{T[i].isSelected=false;}}t.getView().getModel().setProperty("/options",T);d.resolve(t.getView());}else{d.reject();}});a.fail(function(){d.reject();});}return d.promise();},getValue:function(){var d=jQuery.Deferred();var t=this._getThemeList();var a=this;var b;t.done(function(T){a.aThemeList=T;b=a._getThemeNameById(a.currentThemeId);d.resolve(b);});t.fail(function(e){d.reject(e);});return d.promise();},onCancel:function(){this.currentThemeId=this.oUser.getTheme();if(this.isContentDensitySwitchEnable()){this.currentContentDensity=this.oUser.getContentDensity();}this.currentAnimationModeKey=this.originalAnimationModeKey;var a=sap.ui.getCore().byId("userPrefThemeSelector--animationModeCombo");if(a){a.setSelectedKey(this.originalAnimationModeKey);}},onSave:function(){var r=jQuery.Deferred(),w,p=[],t=0,s=0,f=0,F=[],a=this,b=function(){s++;r.notify();},c=function(){s++;r.notify();a.getView().getModel().setProperty("/animationMode",a.currentAnimationModeKey);a.originalAnimationModeKey=a.currentAnimationModeKey;},d=function(e){F.push({entry:"currEntryTitle",message:e});f++;r.notify();};var T=this.onSaveThemes();T.done(b);T.fail(d);p.push(T);if(this.currentAnimationModeKey!==this.originalAnimationModeKey){var A=this.writeUserAnimationModeToPersonalization(this.currentAnimationModeKey);A.done(c);A.fail(d);p.push(A);}if(this.isContentDensitySwitchEnable()){var C=this.onSaveContentDensity();C.done(b);C.fail(d);p.push(C);}w=jQuery.when.apply(null,p);w.done(function(){r.resolve();});r.progress(function(){if(f>0&&(f+s===t)){r.reject("At least one save action failed");}});return r.promise();},onSaveThemes:function(){var d=jQuery.Deferred();var u;if(this.oUser.getTheme()!=this.currentThemeId&&this.isListActive()){if(this.currentThemeId){this.oUser.setTheme(this.currentThemeId);u=this.userInfoService.updateUserPreferences(this.oUser);u.done(function(){this.origThemeId=this.currentThemeId;this.oUser.resetChangedProperties();d.resolve();}.bind(this));u.fail(function(e){this.oUser.setTheme(this.origThemeId);this.oUser.resetChangedProperties();this.currentThemeId=this.origThemeId;jQuery.sap.log.error(e);d.reject(e);}.bind(this));}else{d.reject("Could not find theme: "+this.currentThemeId);}}else{d.resolve();}return d.promise();},_getThemeList:function(){var d=jQuery.Deferred(),t=this;if(!this.aThemeList){var g=this.userInfoService.getThemeList();g.done(function(D){t.aThemeList=D.options;if(t._getIsChangeThemePermitted()==false){t.aThemeList=[{id:t.currentThemeId,name:t._getThemeNameById(t.currentThemeId)}];}d.resolve(t.aThemeList);});g.fail(function(){d.reject("Failed to load theme list.");});}else{d.resolve(this.aThemeList);}return d.promise();},getCurrentThemeId:function(){return this.currentThemeId;},setCurrentThemeId:function(n){this.currentThemeId=n;},_getThemeNameById:function(t){if(this.aThemeList){for(var i=0;i<this.aThemeList.length;i++){if(this.aThemeList[i].id==t){return this.aThemeList[i].name;}}}return t;},onSaveContentDensity:function(){var d=jQuery.Deferred();var u;if(this.oUser.getContentDensity()!=this.currentContentDensity&&this.isContentDensitySwitchEnable()){if(this.currentContentDensity){this.oUser.setContentDensity(this.currentContentDensity);u=this.userInfoService.updateUserPreferences(this.oUser);u.done(function(){this.oUser.resetChangedProperties();this.origContentDensity=this.currentContentDensity;sap.ui.getCore().getEventBus().publish("launchpad","toggleContentDensity",{contentDensity:this.currentContentDensity});d.resolve();}.bind(this));u.fail(function(e){this.oUser.setContentDensity(this.origContentDensity);this.oUser.resetChangedProperties();this.currentContentDensity=this.origContentDensity;jQuery.sap.log.error(e);d.reject(e);}.bind(this));}else{d.reject("Could not find mode: "+this.currentContentDensity);}}else{d.resolve();}return d.promise();},getCurrentContentDensity:function(){return this.currentContentDensity;},isCozyContentMode:function(){return jQuery("body.sapUiSizeCozy").length?true:false;},setCurrentContentDensity:function(e){var n=e.getSource().getState()?"cozy":"compact";this.currentContentDensity=n;},setCurrentAnimationMode:function(e){var n=e.getSource().getSelectedKey();this.currentAnimationModeKey=n;},getIconFormatter:function(t){if(this.aSapThemeMap[t]){return"";}else{return"sap-icon://palette";}},onSelectHandler:function(e){var i=e.getParameters().listItem;this.setCurrentThemeId(i.getBindingContext().getProperty("id"));},isContentDensitySwitchEnable:function(){return(sap.ui.Device.system.combi&&this.getView().getModel().getProperty("/contentDensity")&&this.oUser.isSetContentDensityPermitted())||false;},isListActive:function(){return this.getView().getModel().getProperty("/setTheme");},getUserStatusSetting:function(){var p=this._getUserSettingsPersonalizer();return p.getPersData();},writeUserAnimationModeToPersonalization:function(u){var d,p;try{p=this.getPersonalizer().setPersData(u);}catch(e){jQuery.sap.log.error("Personalization service does not work:");jQuery.sap.log.error(e.name+": "+e.message);d=new jQuery.Deferred();d.reject(e);p=d.promise();}return p;},getPersonalizer:function(){if(this.oPersonalizer){return this.oPersonalizer;}var p=sap.ushell.Container.getService("Personalization");var c=sap.ui.core.Component.getOwnerComponentFor(this);var s={keyCategory:p.constants.keyCategory.FIXED_KEY,writeFrequency:p.constants.writeFrequency.LOW,clientStorageAllowed:true};var P={container:"flp.launchpad.animation.mode",item:"animationMode"};this.oPersonalizer=p.getPersonalizer(P,s,c);return this.oPersonalizer;}});},false);