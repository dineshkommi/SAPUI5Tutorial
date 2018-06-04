// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ushell/services/_Personalization/utils","sap/ushell/services/_Personalization/constants.private","sap/ui/core/format/DateFormat"],function(u,p,c,D){"use strict";function C(){this._init.apply(this,arguments);};C.prototype._init=function(s,a,b,S,o){this._oService=s;this._sContainerKey=b;this._oAdapterContainer={};this._oScope=S||p.adjustScope(S);this._aLoadedKeys=[];this._oUnmodifiableContainer=undefined;var A;if(!(o instanceof sap.ui.core.UIComponent)&&o!==undefined){throw new Error("oComponent passed must be a UI5 Component or must be undefined");}if(o&&o.getMetadata&&o.getMetadata().getLibraryName){A=o.getMetadata().getLibraryName();}this.clear();if(!this._sContainerKey||typeof this._sContainerKey!=="string"){throw new u.Error("Invalid container key: sap.ushell.services.Personalization"," ");}this._oAdapterContainer=a.getAdapterContainer(this._sContainerKey,this._oScope,A);return this;};C.prototype.getValidity=function(){return this._oScope.validity;};C.prototype.clear=function(){this._oItemMap={};this._aLoadedItemKeys=[];this._clear=true;this._oItemMap=new u.Map();};C.prototype.load=function(){var d={},P,t=this;d=new jQuery.Deferred();if(!this._sContainerKey){throw new u.Error("Invalid container key: sap.ushell.services.Personalization"," ");}this.clear();P=this._oService._pendingContainerOperations_flushAddNext(this._sContainerKey,d);P.always(function(){t._oAdapterContainer.load().fail(function(){d.reject();}).done(function(){t._copyFromAdapter();if(t._isExpired()){t.clear();}d.resolve();});});return d.promise();};C.prototype._copyFromAdapter=function(){var t=this,a;a=t._oAdapterContainer.getItemKeys().splice(0);a.forEach(function(i){t._oItemMap.put(i,JSON.stringify(t._oAdapterContainer.getItemValue(i)));});this._aLoadedItemKeys=t._oItemMap.keys().splice(0);};C.prototype._isExpired=function(){var f,t,T;if(this.getValidity()===Infinity||this.getValidity()===0){return false;}t=this._getItemValueInternal(c.S_ADMIN_PREFIX,c.S_ITEMKEY_EXPIRE);f=D.getDateInstance({pattern:c.S_ABAPTIMESTAMPFORMAT});T=f.format(this._getNow(),true);return t&&T>t;};C.prototype._getNow=function(){return new Date();};C.prototype._copyToAdapterUpdatingValidity=function(){var i=[],d=[],t=this,n,f,T,s;if(this._clear){i=this._oAdapterContainer.getItemKeys().splice(0);i.forEach(function(I){t._oAdapterContainer.delItem(I);});this._clear=false;}if(this.getValidity()===Infinity||this.getValidity()===0){this._delItemInternal(c.S_ADMIN_PREFIX,c.S_ITEMKEY_SCOPE);this._delItemInternal(c.S_ADMIN_PREFIX,c.S_ITEMKEY_EXPIRE);this._delItemInternal(c.S_ADMIN_PREFIX,c.S_ITEMKEY_STORAGE);}else{f=D.getDateInstance({pattern:c.S_ABAPTIMESTAMPFORMAT});n=this._getNow();s=f.format(n,true);T=f.format(new Date(n.getTime()+this.getValidity()*60000),true);this._setItemValueInternal(c.S_ADMIN_PREFIX,c.S_ITEMKEY_SCOPE,this._oScope);this._setItemValueInternal(c.S_ADMIN_PREFIX,c.S_ITEMKEY_EXPIRE,T);this._setItemValueInternal(c.S_ADMIN_PREFIX,c.S_ITEMKEY_STORAGE,s);}i=this._oItemMap.keys();i.forEach(function(I){t._oAdapterContainer.setItemValue(I,p.cloneToObject(t._oItemMap.get(I)));});d=this._aLoadedItemKeys.filter(function(I){return!(i.indexOf(I)>-1);});d.forEach(function(I){t._oAdapterContainer.delItem(I);});};C.prototype.save=function(){var s,P,t=this;this._copyToAdapterUpdatingValidity();s=new jQuery.Deferred();P=this._oService._pendingContainerOperations_cancelAddNext(this._sContainerKey,s);P.always(function(){try{t._oAdapterContainer.save().fail(function(){s.reject();}).done(function(){s.resolve();});}catch(e){s.reject();}});return s.promise();};C.prototype.saveDeferred=function(n){var s,P,t=this;this._copyToAdapterUpdatingValidity();s=new jQuery.Deferred();P=this._oService._pendingContainerOperations_cancelAddNext(this._sContainerKey,s);function d(){P.always(function(){try{t._oAdapterContainer.save().fail(function(){s.reject();}).done(function(){s.resolve();});}catch(e){s.reject();}});}s._sapFnSave=d;s._sapTimeoutId=setTimeout(d,n);return s.promise();};C.prototype.flush=function(){var s,P;this._copyToAdapterUpdatingValidity();s=new jQuery.Deferred();P=this._oService._pendingContainerOperations_flushAddNext(this._sContainerKey,s);P.fail(function(){s.reject();}).done(function(){s.resolve();});return s.promise();};C.prototype.getItemKeys=function(){var f=this._oItemMap.keys().filter(function(s){return s.indexOf(c.S_ITEM_PREFIX)===0;});return f.map(function(e){return e.replace(c.S_ITEM_PREFIX,"","");});};C.prototype._getInternalKeys=function(){return this._oItemMap.keys().splice(0);};C.prototype.getItemValue=function(i){return this._getItemValueInternal(c.S_ITEM_PREFIX,i);};C.prototype._getItemValueInternal=function(P,i){if(typeof i!=="string"||typeof P!=="string"){return undefined;}return p.cloneToObject(this._oItemMap.get(P+i));};C.prototype.containsItem=function(i){if(typeof i!=="string"){return undefined;}return this._oItemMap.containsKey(c.S_ITEM_PREFIX+i);};C.prototype.setItemValue=function(i,I){this._setItemValueInternal(c.S_ITEM_PREFIX,i,I);};C.prototype._setItemValueInternal=function(i,I,o){if(typeof I!=="string"||typeof i!=="string"){throw new u.Error("Parameter value of sItemKey or sItemValue is not a string: sap.ushell.services.Personalization"," ");}if(I.length>40){jQuery.sap.log.error("Personalization Service item key/variant set name (\""+I+"\") should be less than 40 characters [current :"+I.length+"]");}this._oItemMap.put(i+I,JSON.stringify(o));};C.prototype.delItem=function(i){this._delItemInternal(c.S_ITEM_PREFIX,i);};C.prototype._delItemInternal=function(P,i){if(typeof i!=="string"){return undefined;}if(typeof P!=="string"){return undefined;}this._oItemMap.remove(P+i);};C.prototype.getKey=function(){return this._sContainerKey.substring(c.S_CONTAINER_PREFIX.length);};C.prototype.getUnmodifiableContainer=function(){var t=this;if(!this._oUnmodifiableContainer){this._oUnmodifiableContainer=(function(){var U={};["clear","delItem","flush","load","save","saveDeferred","setItemValue"].forEach(function(f){U[f]=function(n){throw new u.Error("Function "+n+" can't be called on unmodifiable container","ContextContainer"," ");}.bind(undefined,f);});["containsItem","getItemKeys","getItemValue","getUnmodifiableContainer","getValidity"].forEach(function(f){if(t[f]){U[f]=t[f].bind(t);}});return U;}());}return this._oUnmodifiableContainer;};return C;});
