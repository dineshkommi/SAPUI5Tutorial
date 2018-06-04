sap.ui.define([],function(){"use strict";jQuery.sap.declare('sap.ushell.renderers.fiori2.search.suggestions.TimeMerger');var T=sap.ushell.renderers.fiori2.search.suggestions.TimeMerger=function(){this.init.apply(this,arguments);};var c=0;T.prototype={init:function(p,t){this.promiseList=p||[];this.timeDelay=t||1000;this.pending=this.promiseList.length;this.returned=[];this.aborted=false;this.counter=++c;},abort:function(){this.aborted=true;},process:function(p){this.processorCallback=p;this.start();return this;},start:function(){for(var i=0;i<this.promiseList.length;++i){var p=this.promiseList[i];p.then(this.assembleDoneCallback(i));}this.scheduleProcessorNotification();},scheduleProcessorNotification:function(){var t=this;if(t.processorNotificationSchedule){window.clearTimeout(t.processorNotificationSchedule);t.processorNotificationSchedule=null;}t.processorNotificationSchedule=window.setTimeout(function(){t.notifyProcessor();},this.timeDelay);},notifyProcessor:function(){if(this.aborted){return;}if(this.returned.length>0){this.processorCallback(this.returned);this.returned=[];}if(this.pending>0){this.scheduleProcessorNotification();}},assembleDoneCallback:function(i){var t=this;return function(r){t.pending--;t.returned.push(r);if(t.pending===0){if(t.processorNotificationSchedule){window.clearTimeout(t.processorNotificationSchedule);t.processorNotificationSchedule=null;}t.notifyProcessor();}};}};return T;});
