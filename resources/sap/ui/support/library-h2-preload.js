/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/support/library',["sap/ui/core/library"],function(l){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.support",dependencies:["sap.ui.core"],types:["sap.ui.support.Severity"],interfaces:[],controls:[],elements:[],noLibraryCSS:true,version:"1.54.3",extensions:{"sap.ui.support":{internalRules:true}}});sap.ui.support.Severity={Medium:"Medium",High:"High",Low:"Low"};sap.ui.support.Audiences={Control:"Control",Internal:"Internal",Application:"Application"};sap.ui.support.Categories={Accessibility:"Accessibility",Performance:"Performance",Memory:"Memory",Bindings:"Bindings",Consistency:"Consistency",Functionality:"Functionality",Usability:"Usability",DataModel:"DataModel",Usage:"Usage",Other:"Other"};return sap.ui.support;});jQuery.sap.registerPreloadedModules({"name":"sap/ui/support/library-h2-preload","version":"2.0","modules":{"sap/ui/support/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ui.support","type":"library","embeds":[],"applicationVersion":{"version":"1.54.3"},"title":"UI5 library: sap.ui.support","description":"UI5 library: sap.ui.support","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.54","libs":{"sap.ui.core":{"minVersion":"1.54.3"}}},"library":{"i18n":false,"css":false,"content":{"controls":[],"elements":[],"types":["sap.ui.support.Severity"],"interfaces":[]}}}}'}});
