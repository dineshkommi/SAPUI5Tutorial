// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
this.sap=this.sap||{};(function(){"use strict";sap.ui2=sap.ui2||{};sap.ui2.srvc=sap.ui2.srvc||{};var c={},r=String;if(typeof jQuery==="function"&&jQuery.sap){jQuery.sap.declare("sap.ui2.srvc.chip");r=function(){jQuery.sap.require.apply(this,arguments);};}sap.ui2.srvc.testPublishAt=sap.ui2.srvc.testPublishAt||function(){};function g(n){return Object.prototype.hasOwnProperty.call(c,n)?c[n]:null;}sap.ui2.srvc.Chip=function(A,f){var t=this,b,C,o,d,E,h,l,R,w;function j(){if(!d){throw new sap.ui2.srvc.Error(t+": CHIP is just a stub","sap.ui2.srvc.Chip");}}function k(e){var i;b=new sap.ui2.srvc.Map();if(!e){return;}for(i=0;i<e.length;i+=1){r("sap.ui2.srvc.bag");b.put(e[i].id,new sap.ui2.srvc.Bag(f,e[i]));}}function m(i){var B=i.basePath,L,M,n,v=i.viewName;if(i.componentName){i.$Namespace=i.componentName;}else{M=/^(?:([^\/]+)\/)?(.*)\.view\.(.*)$/.exec(v);if(!M){throw new sap.ui2.srvc.Error(t+": Illegal view name: "+v,"sap.ui2.srvc.Chip");}n=M[1];v=M[2];i.$ViewType=M[3].toUpperCase();if(n){v=n+"."+v;}else{L=v.lastIndexOf(".");if(L<1){throw new sap.ui2.srvc.Error(t+": Missing namespace: "+v,"sap.ui2.srvc.Chip");}n=v.substring(0,L);}i.$Namespace=n;i.$ViewName=v;}i.$UrlPrefix=i.$Namespace.replace(/\./g,"/");if(B!=="."){B=B.replace(/\/?$/,'/');i.$UrlPrefix=B+i.$UrlPrefix;}i.$UrlPrefix=t.toAbsoluteUrl(i.$UrlPrefix);}function p(){o={};if(d.contracts.configuration&&d.contracts.configuration.parameters){o=JSON.parse(JSON.stringify(d.contracts.configuration.parameters));}t.updateConfiguration(o,A.configuration);}function q(n){var i,e;if(d){throw new sap.ui2.srvc.Error(t+": cannot initialize twice",null,"sap.ui2.srvc.Chip");}d=n;d.contracts=d.contracts||{};if(!d.implementation||!d.implementation.sapui5){throw new sap.ui2.srvc.Error(t+": Missing SAPUI5 implementation","sap.ui2.srvc.Chip");}m(d.implementation.sapui5);p();jQuery.sap.log.debug("Initialized: "+t,null,"sap.ui2.srvc.Chip");if(l){for(i=0,e=l.length;i<e;i+=2){l[i]();}l=null;}}sap.ui2.srvc.testPublishAt(t);function u(e){var i,K,n=b.keys();for(i=0;i<e.length;i+=1){K=e[i].id;if(b.containsKey(K)){b.get(K).update(e[i]);n.splice(n.indexOf(K),1);}else{b.put(K,new sap.ui2.srvc.Bag(f,e[i]));}}for(i=0;i<n.length;i+=1){b.remove(n[i]);}}this.createApi=function(e,i){var n={},s,I,N,v;j();v=d.contracts;if(v){for(N in v){if(Object.prototype.hasOwnProperty.call(v,N)){I=g(N);if(!I){throw new sap.ui2.srvc.Error(this+": Contract '"+N+"' is not supported","sap.ui2.srvc.Chip");}n[N]={};s=I.call(n[N],e);if(i){i.put(N,s);}}}}return n;};this.getAvailableTypes=function(){var T;j();if(d.contracts.types&&d.contracts.types.parameters&&typeof d.contracts.types.parameters.supportedTypes==="string"&&d.contracts.types.parameters.supportedTypes!==""){T=d.contracts.types.parameters.supportedTypes.toLowerCase();return T.split(",");}return[];};this.getBag=function(B){if(!B){throw new sap.ui2.srvc.Error("Missing bag ID","sap.ui2.srvc.Chip");}return b.get(B);};this.getBagIds=function(){return b.keys();};this.getBaseChipId=function(){return A.baseChipId;};this.getCatalog=function(){if(R){return R;}return A.$proxy?undefined:f.createCatalog(A.catalogId);};this.getConfigurationParameter=function(K){j();return o[K];};this.getDescription=function(){return A.description;};this.getId=function(){return A.id;};this.getImplementationAsSapui5=function(e){var D,i,B;j();D={chip:e};i=d.implementation.sapui5;B=this.getBaseChipId();if((B!=="X-SAP-UI2-CHIP:/UI2/STATIC_APPLAUNCHER")&&(B!=="X-SAP-UI2-CHIP:/UI2/DYNAMIC_APPLAUNCHER")){jQuery.sap.registerModulePath(i.$Namespace,i.$UrlPrefix);}if(i.componentName){return new sap.ui.core.ComponentContainer({component:sap.ui.getCore().createComponent({componentData:D,name:i.componentName})});}return sap.ui.view({type:i.$ViewType,viewName:i.$ViewName,viewData:D});};this.getRemoteCatalog=function(){return R;};this.getTitle=function(){return A.title||(d&&d.appearance&&d.appearance.title);};this.isBasedOn=function(e){var s="X-SAP-UI2-PAGE:"+e.getPage().getId()+":"+e.getId();function i(n){return n===s||n.indexOf(s+':')===0;}return(A.referenceChipId&&i(A.referenceChipId))||i(A.id);};this.isReference=function(){return!!A.referenceChipId;};this.isBrokenReference=function(){return A.referenceChipId==="O";};this.isStub=function(){return!d;};this.load=function(s,F){function e(y,z){E=y;h=z;var i,n;if(l){for(i=1,n=l.length;i<n;i+=2){l[i](y,z);}l=null;}}function v(){if(f){f.createChipDefinition(A.url,q,e);return;}sap.ui2.srvc.get(A.url,true,function(X){jQuery.sap.log.debug("Loaded: "+t,null,"sap.ui2.srvc.Chip");q(new sap.ui2.srvc.ChipDefinition(X));},e);}function x(){if(!A.url){if(w){throw new sap.ui2.srvc.Error("Remote catalog did not deliver CHIP '"+A.id+"'","sap.ui2.srvc.Chip");}throw new sap.ui2.srvc.Error("Missing module URL","sap.ui2.srvc.Chip");}w=false;C=sap.ui2.srvc.absoluteUrl(A.url);v();}if(!this.isStub()){throw new sap.ui2.srvc.Error("Chip is not a stub anymore","sap.ui2.srvc.Chip");}if(typeof s!=="function"){throw new sap.ui2.srvc.Error("Missing success handler","sap.ui2.srvc.Chip");}F=F||f.getPageBuildingService().getDefaultErrorHandler();if(E){sap.ui2.srvc.call(F.bind(null,E,h),null,true);return;}if(l){l.push(s,F);return;}if(A.url){v();}else if(A.remoteCatalogId){this.getRemoteCatalog().readRegisteredChips(x,e);w=true;}else{f.getPageBuildingService().readChip(A.id,function(i){A=i;x();},e);}l=[s,F];};this.refresh=function(s,F){function e(n){A.title=n.title;A.configuration=n.configuration;A.referenceChipId=n.referenceChipId;k(n.ChipBags&&n.ChipBags.results);if(!t.isStub()){t.updateConfiguration(o,A.configuration);}s();}function i(n){if(n.results[0]){e(n.results[0]);}else{F=F||f.getPageBuildingService().getDefaultErrorHandler();F("Could not refresh CHIP. No update received from catalog "+A.remoteCatalogId);}}if(typeof s!=="function"){throw new sap.ui2.srvc.Error("Missing success handler","sap.ui2.srvc.Chip");}if(!A.url){throw new sap.ui2.srvc.Error(t+": CHIP is just a stub","sap.ui2.srvc.Chip");}if(A.remoteCatalogId){this.getRemoteCatalog().readChips([A.id],i,F);}else{f.getPageBuildingService().readChip(A.id,e,F);}};this.update=function(n){if(typeof n!=="object"||n.id!==this.getId()){throw new sap.ui2.srvc.Error("Invalid update data: "+this,"sap.ui2.srvc.Chip");}if(n.ChipBags&&n.ChipBags.results){u(n.ChipBags&&n.ChipBags.results);}if(A.url){return;}if(!n.url){return;}A=n;C=sap.ui2.srvc.absoluteUrl(A.url);jQuery.sap.log.debug("Updated: "+this,null,"sap.ui2.srvc.Chip");};this.updateConfiguration=function(P,v){var i,K,V;if(!v){return;}if(typeof v==='string'){try{i=JSON.parse(v);}catch(e){jQuery.sap.log.warning(this+': ignoring invalid configuration "'+v+'"',null,"sap.ui2.srvc.Chip");return;}}else{i=v;}for(K in i){if(Object.prototype.hasOwnProperty.call(i,K)){if(Object.prototype.hasOwnProperty.call(o,K)){V=i[K];if(V===undefined){delete P[K];}else if(typeof V!=='string'){throw new sap.ui2.srvc.Error("Value for '"+K+"' must be a string","sap.ui2.srvc.Chip");}else{P[K]=V;}}else{jQuery.sap.log.warning(this+': ignoring unknown configuration parameter '+K,null,"sap.ui2.srvc.Chip");}}}};this.toAbsoluteUrl=function(U){return sap.ui2.srvc.absoluteUrl(U,C);};this.toString=function(v){var e=['sap.ui2.srvc.Chip({sChipUrl:"',C,'"'];if(v){e.push(',oAlterEgo:',JSON.stringify(A),',oBags:',b.toString(),',oDefinition:',JSON.stringify(d));}e.push('})');return e.join('');};this.isInitiallyDefined=function(D){return D;}.bind(null,A&&!A.hasOwnProperty("$proxy"));if(!sap.ui2.srvc.Map){r("sap.ui2.srvc.utils");}if(!A){throw new sap.ui2.srvc.Error("Missing CHIP description","sap.ui2.srvc.Chip");}C=sap.ui2.srvc.absoluteUrl(A.url);if(A.remoteCatalogId){R=f.createCatalog(A.remoteCatalogId);if(!A.url){R.registerChip(this);}}k(A.ChipBags&&A.ChipBags.results);jQuery.sap.log.debug("Created: "+this,null,"sap.ui2.srvc.Chip");};sap.ui2.srvc.Chip.addContract=function(n,i){if(g(n)){if(!sap.ui2.srvc.Error){r("sap.ui2.srvc.error");}throw new sap.ui2.srvc.Error("Cannot register contract '"+n+"' twice","sap.ui2.srvc.Chip");}c[n]=i;};sap.ui2.srvc.testPublishAt(sap.ui2.srvc.Chip);function a(n){delete c[n];}}());
