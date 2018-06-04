/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2018 SAP SE. All rights reserved
 */
sap.ui.define(['sap/apf/utils/proxyTextHandlerForLocalTexts','sap/apf/cloudFoundry/utils'],function(P,c){'use strict';function M(s,a){var b=a.instances.messageHandler;var d=a.manifests.manifest;var e=d["sap.app"].dataSources;var f=e&&e["apf.designTime.customer.applications"]&&e["apf.designTime.customer.applications"].uri;var g=e&&e["apf.designTime.customer.analyticalConfigurations"]&&e["apf.designTime.customer.analyticalConfigurations"].uri;var h=e&&e["apf.designTime.customer.applicationAndAnalyticalConfiguration"]&&e["apf.designTime.customer.applicationAndAnalyticalConfiguration"].uri;var t=e&&e["apf.designTime.textFileAndAnalyticalConfigurations"]&&e["apf.designTime.textFileAndAnalyticalConfigurations"].uri;var j=e&&e["apf.designTime.textFiles"]&&e["apf.designTime.textFiles"].uri;var v=e&&e["apf.designTime.vendor.importToCustomerLayer"]&&e["apf.designTime.vendor.importToCustomerLayer"].uri;var k=e&&e["apf.designTime.vendor.analyticalConfigurations"]&&e["apf.designTime.vendor.analyticalConfigurations"].uri;var p=a.instances.proxyTextHandlerForLocalTexts;function l(){return{};}this.create=function(i,J,K){if(i==='application'){n(J,K);}else if(i==='configuration'&&J.CreationUTCDateTime&&J.LastChangeUTCDateTime){A(J,K);}else if(i==='configuration'){o(J,K);}else if(i==='texts'){q(J,K);}else{b.check(false,'The create operation on entity set '+i+' is currently not supported by the modeler proxy.');}};function n(i,J){var K={applicationName:i.ApplicationName,textFile:{inDevelopmentLanguage:""}};I({type:"POST",url:f,data:JSON.stringify(K),dataType:"json",success:function(L,S,N){if(L&&!jQuery.isEmptyObject(L)){var O={ApplicationName:i.ApplicationName,Application:L.application};J(O,l(),undefined);}else{var Q=c.buildErrorMessage(N,"5227",[],undefined,b);J(undefined,l(),Q);}},error:function(L,S,N,O){var Q=c.buildErrorMessage(L,"5227",[],O,b);J(undefined,l(),Q);},async:true});}function o(i,J){var K=JSON.parse(i.SerializedAnalyticalConfiguration);var L=i.Application;var N={Application:L,AnalyticalConfigurationName:i.AnalyticalConfigurationName};K=jQuery.extend(true,K,{configHeader:N});var O={analyticalConfigurationName:i.AnalyticalConfigurationName,application:L,serializedAnalyticalConfiguration:JSON.stringify(K),textFile:{inDevelopmentLanguage:p.createTextFileOfApplication(L)}};I({type:"POST",url:g,data:JSON.stringify(O),dataType:"json",success:function(Q,S,R){if(Q&&!jQuery.isEmptyObject(Q)){var T={AnalyticalConfiguration:Q.analyticalConfiguration,AnalyticalConfigurationName:O.analyticalConfigurationName};J(T,l(),undefined);}else{var U=c.buildErrorMessage(R,"5226",[L],undefined,b);J(undefined,l(),U);}},error:function(Q,S,R,T){var U=c.buildErrorMessage(Q,"5226",[L],T,b);J(undefined,l(),U);},async:true});}function q(i,J){var K=p.addText(i);i.TextElement=K;J(i,l());}this.readCollection=function(i,J,K,L,N){if(i==='application'){r(J);}else if(i==='configuration'){u(J,N);}else if(i==='texts'){J([],undefined);}else{b.check(false,'The read collection operation on entity set '+i+' is currently not supported by the modeler proxy.');}};function r(i){var J=f+"?$select=Application,ApplicationName";I({type:"GET",url:J,success:function(K,S,L){if(K&&!jQuery.isEmptyObject(K)){var N=[];if(K.applications!==null){K.applications.forEach(function(Q){N.push({Application:Q.application,ApplicationName:Q.applicationName,SemanticObject:""});});}i(N,l(),undefined);}else{var O=c.buildErrorMessage(L,"5229",[],undefined,b);i(undefined,l(),O);}},error:function(K,S,L,N){var O=c.buildErrorMessage(K,"5229",[],N,b);i(undefined,l(),O);},async:true});}function u(i,J){var T=J.getFilterTermsForProperty('Application');var K=T[0].getValue();var L=t+"?$select=AnalyticalConfiguration,AnalyticalConfigurationName&$filter="+J.toUrlParam();I({type:"GET",url:L,success:function(N,S,O){if(N&&!jQuery.isEmptyObject(N)){var Q=[];if(N.analyticalConfigurations!==null){N.analyticalConfigurations.forEach(function(U){Q.push({AnalyticalConfiguration:U.analyticalConfiguration,Application:K,AnalyticalConfigurationName:U.analyticalConfigurationName});});}p.initApplicationTexts(K,N.textFile.inDevelopmentLanguage);i(Q,l(),undefined);}else{var R=c.buildErrorMessage(O,"5223",[K],undefined,b);i(undefined,l(),R);}},error:function(N,S,O,Q){var R=c.buildErrorMessage(N,"5223",[K],Q,b);i(undefined,l(),R);},async:true});}this.readEntity=function(i,J,K,L,N){if(i==='configuration'){var O=K[0].value;if(L&&L.length===2&&jQuery.inArray("CreationUTCDateTime",L)>-1&&jQuery.inArray("LastChangeUTCDateTime",L)>-1){w(O,N,J);}else{x(O,N,J);}}else{b.check(false,'The read single entity operation on entity set '+i+' is currently not supported by the modeler proxy.');}};function w(i,J,K){var L=g+"/"+i+"?$select=Application,CreationUtcDateTime,LastChangeUtcDateTime,ServiceInstance";I({type:"GET",url:L,success:function(N,S,O){if(N&&!jQuery.isEmptyObject(N)){var Q={CreationUTCDateTime:N.analyticalConfiguration.creationUtcDateTime,LastChangeUTCDateTime:N.analyticalConfiguration.lastChangeUtcDateTime};K(Q,l());}else{var R=c.buildErrorMessage(O,"5221",[J,i],undefined,b);K(undefined,l(),R);}},error:function(N,S,O,Q){var R=c.buildErrorMessage(N,"5221",[J,i],Q,b);K(undefined,l(),R);},async:true});}function x(i,J,K){var L=g+"/"+i+"?$select=AnalyticalConfigurationName,SerializedAnalyticalConfiguration";I({type:"GET",url:L,success:function(N,S,O){if(N&&!jQuery.isEmptyObject(N)){var Q={Application:J,SerializedAnalyticalConfiguration:N.analyticalConfiguration.serializedAnalyticalConfiguration,AnalyticalConfiguration:i};K(Q,l(),undefined);}else{var R=c.buildErrorMessage(O,"5221",[J,i],undefined,b);K(undefined,l(),R);}},error:function(N,S,O,Q){var R=c.buildErrorMessage(N,"5221",[J,i],Q,b);K(undefined,l(),R);},async:true});}this.update=function(i,J,K,L){if(i==='application'){var N=L[0].value;y(J,N,K);}else if(i==='configuration'&&J.CreationUTCDateTime&&J.LastChangeUTCDateTime){A(J,K);}else if(i==='configuration'){z(J,K);}else{b.check(false,'The update operation on entity set '+i+' is currently not supported by the modeler proxy.');}};function y(i,J,K){var L={applicationName:i.ApplicationName};var N=f+'/'+J;I({type:"PUT",url:N,data:JSON.stringify(L),dataType:"json",success:function(O,S,Q){K(l(),undefined);},error:function(O,S,Q,R){var T=c.buildErrorMessage(O,"5228",[J],R,b);K(l(),T);},async:true});}function z(i,J){var K=JSON.parse(i.SerializedAnalyticalConfiguration);var L=i.AnalyticalConfiguration;var N=g+'/'+L;var O=i.Application;K.configHeader={Application:O,AnalyticalConfiguration:L,AnalyticalConfigurationName:i.AnalyticalConfigurationName,CreationUTCDateTime:i.CreationUTCDateTime,LastChangeUTCDateTime:i.LastChangeUTCDateTime};var Q={analyticalConfigurationName:i.AnalyticalConfigurationName,serializedAnalyticalConfiguration:JSON.stringify(K),textFile:{inDevelopmentLanguage:p.createTextFileOfApplication(O)}};I({type:"PUT",url:N,data:JSON.stringify(Q),dataType:"json",success:function(R,S,T){J(l(),undefined);},error:function(R,S,T,U){var V=c.buildErrorMessage(R,"5233",[O,L],U,b);J(l(),V);},async:true});}function A(i,J){var K=JSON.parse(i.SerializedAnalyticalConfiguration);var L=K.configHeader.AnalyticalConfiguration;var N=h+'/'+L;var O=i.Application;var Q={analyticalConfigurationName:i.AnalyticalConfigurationName,application:O,serializedAnalyticalConfiguration:i.SerializedAnalyticalConfiguration};I({type:"PUT",url:N,data:JSON.stringify(Q),dataType:"json",success:function(R,S,T){J(l(),undefined);},error:function(R,S,T,U){var V=c.buildErrorMessage(R,"5233",[O,L],U,b);J(l(),V);},async:true});}this.remove=function(i,J,K,L,N,O){if(i==='application'){var Q=J[0].value;B(Q,K);}else if(i==='configuration'){var R=J[0].value;C(R,N,K);}else{b.check(false,'The delete operation on entity set '+i+' is currently not supported by the modeler proxy.');}};function B(i,J){var K=f+'/'+i;I({type:"DELETE",url:K,success:function(L,S,N){J(l(),undefined);},error:function(L,S,N,O){var Q=c.buildErrorMessage(L,"5237",[i],O,b);J(l(),Q);},async:true});}function C(i,J,K){var L=g+'/'+i;I({type:"DELETE",url:L,success:function(N,S,O){K(l(),undefined);},error:function(N,S,O,Q){var R=c.buildErrorMessage(N,"5225",[J,i],Q,b);K(l(),R);},async:true});}this.doChangeOperationsInBatch=function(i,J,K){i.forEach(function(L){if(L.entitySetName!=='texts'){b.check(false,'The create/update/delete operation in batch on entity set '+L.entitySetName+' is not supported by the modeler proxy.');}});this._readConfigurationListAndTextFile(K).then(function(L){var N=L.textFile.inDevelopmentLanguage;this._initText(K,N);this._applyChangesOnTextFile(i);var O=this._createTextFileOfApplication(K);this._updateRemoteTextFile(K,'DEV',O).then(function(){J(undefined);},function(Q){J(Q);});}.bind(this),function(L){J(L);});};this._readConfigurationListAndTextFile=function(i){var J=new Promise(function(K,L){var N=t+'?$select=AnalyticalConfiguration,AnalyticalConfigurationName,SerializedAnalyticalConfiguration'+'&$filter=(Application%20eq%20'+i+')';I({type:"GET",url:N,success:function(O,S,Q){var R=[];if(O.analyticalConfigurations!==null){O.analyticalConfigurations.forEach(function(U){R.push({analyticalConfiguration:U.analyticalConfiguration,analyticalConfigurationName:U.analyticalConfigurationName,serializedAnalyticalConfiguration:U.serializedAnalyticalConfiguration});});}var T={analyticalConfigurations:R,textFile:{inDevelopmentLanguage:O.textFile.inDevelopmentLanguage}};K(T);},error:function(O,S,Q,R){var T=c.buildErrorMessage(O,"5222",[i],R,b);L(T);},async:true});});return J;};this._initText=function(i,J){p.initApplicationTexts(i,J);};this._applyChangesOnTextFile=function(i){i.forEach(function(J){if(J.entitySetName==='texts'){switch(J.method){case"POST":var K=J.data;this._createOrUpdateLocalText(K);break;case"PUT":var L=J.data;this._createOrUpdateLocalText(L);break;case"DELETE":var N=J.application;var O=J.inputParameters[0].value;this._deleteLocalText(N,O);break;default:b.check(false,'The method '+J.method+' is not supported during text processing in batch mode by the modeler proxy.');break;}}else{b.check(false,'The create/update/delete operation on entity set '+J.entitySetName+' is not supported by the modeler proxy.');}}.bind(this));};this._createTextFileOfApplication=function(i){return p.createTextFileOfApplication(i);};this._createOrUpdateLocalText=function(i){p.addText(i);};this._deleteLocalText=function(i,J){var K={application:i,inputParameters:[{value:J}]};p.removeText(K);};this._updateRemoteTextFile=function(i,J,K){var L=new Promise(function(N,O){var Q=j+'/'+i+'/'+J;var R={serializedTextFile:K};I({type:"PUT",data:JSON.stringify(R),url:Q,success:function(S,T,U){N();},error:function(S,T,U,V){var W=c.buildErrorMessage(S,"5230",[i],V,b);O(W);},async:true});});return L;};this.readCollectionsInBatch=function(i,J){var K=i[0];b.check(K.entitySetName==='configuration',"wrong usage, only 'configuration' is allowed");var T=K.filter.getFilterTermsForProperty('Application');var L=T[0].getValue();function N(){function O(Q,R,S){if(S){J(undefined,S);}else{var U=[];U.push(Q);U.push(p.getTextElements(L));J(U);}}return O;}this.readCollection(K.entitySetName,N(),K.inputParameters,K.selectList,K.filter);};function D(i,J,b){var K=b.createMessageObject({code:"5214",aParameters:[i.status,i.statusText]});if(J){K.setPrevious(J);}return K;}this.importVendorContent=function(i,J,K,L,N){this.readAllConfigurationsFromVendorLayer().done(function(O){E(i,J,K,L,N,O);}).fail(function(O){L(undefined,undefined,O);});};function E(J,K,L,N,O,Q){var i;var R,S;var T=J+"."+K;for(i=0;i<Q.length;i++){if(Q[i].value===T){S=Q[i].configurationText;R=Q[i].applicationText;break;}}I({type:"HEAD",url:g+"/"+K,success:function(){L(V,W,S);},error:function(X,Y,Z,$){if(X.status===404){G(K,U);}else{var _=D(X,$,b);N(undefined,undefined,_);}}});function U(X,Y,Z){if(!Z){O(J,R);}N(X,Y,Z);}function V(){G(K,N);}function W(X){var Y=k+"/"+K+"?$select=SerializedAnalyticalConfiguration";I({type:"GET",url:Y,success:function(Z){F(J,X,Z.serializedAnalyticalConfiguration,N);},error:function(Z,$,_,a1){var b1=D(Z,a1,b);N(undefined,undefined,b1);}});}}function F(i,J,K,L){var N="/sap/apf/design-time/customer-content/v1/AnalyticalConfigurations";var O={analyticalConfigurationName:J,application:i,serializedAnalyticalConfiguration:K};I({type:"POST",url:N,dataType:"json",data:JSON.stringify(O),success:function(O){L(O.analyticalConfiguration);},error:function(Q,R,S,T){var U=D(Q,T,b);L(undefined,undefined,U);}});}function G(i,J){I({type:"PUT",url:v+"/"+i,contentType:'application/x-www-form-urlencoded',success:function(){J(i);},error:function(K,L,N,O){var Q=D(K,O,b);J(undefined,undefined,Q);}});}var H;this.readAllConfigurationsFromVendorLayer=function(){var i=jQuery.Deferred();if(H){i.resolve(H);}else{I({url:k+"?$select=Application,ApplicationName,AnalyticalConfiguration,AnalyticalConfigurationName",success:function(J){var K=[];if(J!==null){J.forEach(function(L){K.push({configurationText:L.analyticalConfigurationName,applicationText:L.applicationName,value:L.application+'.'+L.analyticalConfiguration});});}H=K;i.resolve(K);},error:function(J,K,L,N){var O=D(J,N,b);var Q=b.createMessageObject({code:'5231'});Q.setPrevious(O);i.reject(Q);}});}return i.promise();};function I(S){return a.instances.ajaxHandler.send(S);}}var m={ModelerProxy:M};return m;},true);