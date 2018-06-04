/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2015 SAP AG. All rights reserved
 */
jQuery.sap.require("sap.collaboration.library");sap.ui.base.Object.extend("sap.collaboration.components.socialtimeline.validation.InputValidator",{constructor:function(s){this._oLogger=jQuery.sap.log.getLogger("sap.collaboration.components.socialtimeline.validation.InputValidator");this._bCustomFilterValid=true;this._bSocialFeaturesEnabled=true;this._bBackendFeaturesEnabled=true;this._oSocialTimeline=s;},areCustomFiltersValid:function(){return this._bCustomFilterValid;},areSocialFeaturesEnabled:function(){return this._bSocialFeaturesEnabled;},areBackendFeaturesEnabled:function(){return this._bBackendFeaturesEnabled;},isBusinessObjectMapValid:function(b){var i=true;if(typeof(b)!=='object'){this._oLogger.error("The argument passed to the function 'setBusinessObjectMap' is of type "+typeof(b)+", expected type is object.");i=false;}else if(!b.collection||!b.applicationContext||!b.servicePath){this._oLogger.error("The object passed to the method setBusinessObjectMap has property 'collection', 'applicationContext', or 'servicePath' as undefined.");i=false;}else if(typeof(b.collection)!=='string'||typeof(b.applicationContext)!=='string'||typeof(b.servicePath)!=='string'){this._oLogger.error("The property 'collection', 'applicationContext', or 'servicePath' in the object passed to the method setBusinessObjectMap is not a string.");i=false;}else if(b.customActionCallback&&typeof(b.customActionCallback)!=='function'){this._oLogger.error("The type defined for the property 'customActionCallback' is "+typeof(b.customActionCallback)+", expected type is function.");i=false;}return i;},isBusinessObjectValid:function(b){var i=true;if(!b.key){this._oLogger.error("The key in the object passed to the function 'setBusinessObject' is undefined.");i=false;}else if(typeof(b.key)!=='string'){this._oLogger.error("The key in the object passed to the function 'setBusinessObject' is not of type string.");i=false;}if(!b.name){this._oLogger.error("The name in the object passed to the function 'setBusinessObject' is undefined.");i=false;}else if(typeof(b.name)!=='string'){this._oLogger.error("The name in the object passed to the function 'setBusinessObject' is not of type string.");i=false;}return i;},createTermsUtilityForBackend:function(s){var t;try{t=new sap.collaboration.components.socialtimeline.annotations.TimelineTermsUtility(s.getServiceMetadata(),s.getServiceAnnotations());this._bBackendFeaturesEnabled=true;}catch(e){t=undefined;this._bBackendFeaturesEnabled=false;this._oLogger.error("The Business Object Service is not configured properly.");this._oSocialTimeline._oCommonUtil.displayError();}return t;},validateEnableSocial:function(){if(this._oSocialTimeline.getEnableSocial()===true){return this._bSocialFeaturesEnabled=this._checkJamConfiguration();}else{return this._bSocialFeaturesEnabled=false;}},validateCustomFilter:function(){var c=this._oSocialTimeline.getCustomFilter();this._bCustomFilterValid=true;if(!jQuery.isEmptyObject(c)){if(!jQuery.isArray(c)){this._oLogger.error("The type defined for the property 'customFilter' is "+typeof(c)+", expected type is array.");this._bCustomFilterValid=false;}else{for(var i=0;i<c.length;i++){if(!c[i].value||!c[i].text||typeof(c[i].value)!=="string"||typeof(c[i].text)!=="string"){this._oLogger.error("The type defined for the property 'text' or 'value' for the filter "+JSON.stringify(c[i])+" is undefined or not of type 'string'.");this._bCustomFilterValid=false;}}}}return this._bCustomFilterValid;},_checkJamConfiguration:function(){var s=true;var t=this;var S=function(c){if(c===false){s=false;}};var e=function(E){t._oSocialTimeline._oCommonUtil.displayError();};this._oSocialTimeline._oSMIntegrationDataHandler.getJamConfigurationStatus(S,e);return s;},});
