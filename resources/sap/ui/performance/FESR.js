/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/URI','sap/ui/Device','sap/ui/performance/E2ETrace/Passport','./Interaction','./XHRInterceptor','sap/base/log','sap/base/Version'],function(U,D,P,I,X,l,V){"use strict";var f=false,R=P.getRootId(),C=P.createGUID().substr(-8,8)+R,H=window.location.host,a=D.os.name+"_"+D.os.version,b=D.browser.name+"_"+D.browser.version,A="",s="",e,F,S=0,c,d;function i(u){var o=new U(u).host();return o&&o!==H;}function r(){X.register("PASSPORT_HEADER","open",function(){if(!i(arguments[1])){var p=I.getPending();if(p){if(s!=p.appVersion){s=p.appVersion;A=s?k(s):"";}}this.setRequestHeader("SAP-PASSPORT",P.header(e,R,P.getTransactionId(),p?p.component+A:undefined,p?p.trigger+"_"+p.event+"_"+S:undefined));}});X.register("FESR","open",function(){if(!i(arguments[1])){if(c){this.setRequestHeader("SAP-Perf-FESRec",c);this.setRequestHeader("SAP-Perf-FESRec-opt",d);c=null;d=null;S++;}}});}function g(o){return[j(R,32),j(F,32),j(o.navigation,16),j(o.roundtrip,16),j(o.duration,16),j(o.completeRoundtrips,8),j(C,40),j(o.networkTime,16),j(o.requestTime,16),j(a,20),"SAP_UI5"].join(",");}function h(o){return[j(o.component,20,true),j(o.trigger+"_"+I.getPending().event,20,true),"",j(b,20),j(o.bytesSent,16),j(o.bytesReceived,16),"","",j(o.processing,16),o.requestCompression?"X":"","","","","",j(o.busyDuration,16),"","","","",j(o.component,70,true)].join(",");}function j(v,L,o){if(!v){v=v===0?"0":"";}else if(typeof v==="number"){var p=v;v=Math.round(v).toString();if(v.length>L||p<0){v="-1";}}else{v=o?v.substr(-L,L):v.substr(0,L);}return v;}function k(v){var o=new V(v);return"@"+o.getMajor()+"."+o.getMinor()+"."+o.getPatch();}function m(o){c=g(o);d=h(o);}var n={};n.setActive=function(o){if(o){f=true;P.setActive(true);I.setActive(true);e=P.traceFlags();r();I.onInteractionFinished=function(p){if(p.requests.length>0){m(p);F=P.createGUID();}};}else if(!o&&f){f=false;I.setActive(false);X.unregister("FESR","open");if(X.isRegistered("PASSPORT_HEADER","open")){X.register("PASSPORT_HEADER","open",function(){this.setRequestHeader("SAP-PASSPORT",P.header(e,R,P.getTransactionId()));});}I.onInteractionFinished=null;}};n.getActive=function(){return f;};return n;});
