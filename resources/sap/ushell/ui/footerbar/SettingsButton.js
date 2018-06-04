/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['sap/m/Button','sap/ushell/library','sap/ushell/resources','sap/ushell/ui/footerbar/AboutButton','sap/ushell/ui/footerbar/UserPreferencesButton','sap/ushell/ui/footerbar/LogoutButton'],function(B,l,r,A,U,L){"use strict";var S=B.extend("sap.ushell.ui.footerbar.SettingsButton",{metadata:{library:"sap.ushell"}});S.prototype.init=function(){this.setIcon('sap-icon://action-settings');this.setTooltip(r.i18n.getText("helpBtn_tooltip"));this.attachPress(this.showSettingsMenu);var a=new A(),u=new U(),o=new L();this.defaultMenuItems=[a,u,o];if(B.prototype.init){B.prototype.init.apply(this,arguments);}};S.prototype.setMenuItems=function(b){this.menuItems=b;};S.prototype.showSettingsMenu=function(){sap.ui.require(['sap/m/ActionSheet'],function(a){var o=new a({id:'settingsMenu',showHeader:false,buttons:(this.menuItems||[]).concat(this.defaultMenuItems)});o.setPlacement(sap.m.PlacementType.Vertical);o.openBy(this);o.attachAfterClose(function(){o.removeAllButtons();o.destroy();});}.bind(this));};return S;},true);
