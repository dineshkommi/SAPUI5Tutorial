/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/m/library','./P13nPanel','./P13nSortModel','sap/ui/model/json/JSONModel'],function(q,M,P,a,J){"use strict";var b=P.extend("sap.ui.mdc.experimental.P13nSortQBGridPanel",{metadata:{library:"sap.ui.mdc"}});b.prototype.init=function(){P.prototype.init.apply(this,arguments);this._oInternalModel=undefined;this._proxyOnModelContextChange=q.proxy(this._onModelContextChange,this);this.attachModelContextChange(this._proxyOnModelContextChange);};b.prototype.refreshInitialState=function(){this._bInternalModelToBeUpdated=true;this.invalidate();};b.prototype._onModelContextChange=function(){if(!this.getModel()){return;}this._updateInternalModel();};b.prototype.onBeforeRendering=function(){this._updateInternalModel();};b.prototype.exit=function(){this.detachModelContextChange(this._proxyOnModelContextChange);};b.prototype.onChangeSortOrderBySelection=function(e){var t=e.getSource().getParent();var i=this._getTable().indexOfContent(t);this._oInternalModel.updateProperties(i,{sortOrder:this._getSelectedSortOrder(e.getParameter("selectedItem"))});};b.prototype.onSelectionChange=function(e){if(!e.getParameter("selectedItem")){return;}var t=e.getSource().getParent();this._selectTableItem(t);};b.prototype.onChangeComboBox=function(e){var t=e.getSource().getParent();this._selectTableItem(t);};b.prototype._selectTableItem=function(t){var i=this._getTable().indexOfContent(t);this._oInternalModel.replaceModelItemOfIndex(i);};b.prototype.onPressAdd=function(e){var t=e.getSource().getParent().getParent();var i=this._getTable().indexOfContent(t);this._oInternalModel.insertModelItemOfIndex(i);};b.prototype.onPressRemove=function(e){var t=e.getSource().getParent().getParent();var i=this._getTable().indexOfContent(t);this._oInternalModel.removeModelItemOfIndex(i);};b.prototype.onPressDown=function(e){var t=e.getSource().getParent().getParent();var v=this._getVisibleTableItems();this._moveTableItem(t,v[v.indexOf(t)+1]);};b.prototype.onPressUp=function(e){var t=e.getSource().getParent().getParent();var v=this._getVisibleTableItems();this._moveTableItem(t,v[v.indexOf(t)-1]);};b.prototype._moveTableItem=function(t,T){var i=this._getTable().indexOfContent(t);var I=this._getTable().indexOfContent(T);this._oInternalModel.moveModelItemPosition(i,I);this._oInternalModel.moveModelItem(i,I);};b.prototype._getVisibleTableItems=function(){return this._getTable().getContent().filter(function(t){return!!t.getVisible();});};b.prototype._getTable=function(){return sap.ui.getCore().byId(this.getId()+"--IDVerticalLayout")||null;};b.prototype._getSelectedSortOrder=function(c){return c.getKey();};b.prototype._updateInternalModel=function(){if(!this._bInternalModelToBeUpdated){return;}this._bInternalModelToBeUpdated=false;this._oInternalModel=new a({tableItems:this.getItems().filter(function(i){return i.getSelected();}),availableItems:this.getItems().filter(function(i){return i;})});this._getTable().setModel(this._oInternalModel,"JSONItems");};return b;},true);
