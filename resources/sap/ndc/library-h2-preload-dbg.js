/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.predefine('sap/ndc/library',['jquery.sap.global','sap/m/library','sap/ui/core/library'],function(q,l,a){"use strict";sap.ui.getCore().initLibrary({name:"sap.ndc",dependencies:["sap.ui.core","sap.m"],types:[],interfaces:[],controls:["sap.ndc.BarcodeScannerButton"],elements:[],noLibraryCSS:true,version:"1.54.3"});return sap.ndc;},false);
jQuery.sap.registerPreloadedModules({
"name":"sap/ndc/library-h2-preload",
"version":"2.0",
"modules":{
	"sap/ndc/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ndc","type":"library","embeds":[],"applicationVersion":{"version":"1.54.3"},"title":"SAPUI5 library with controls with native device capabilities.","description":"SAPUI5 library with controls with native device capabilities.","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.54","libs":{"sap.ui.core":{"minVersion":"1.54.3"},"sap.m":{"minVersion":"1.54.3"}}},"library":{"i18n":"messagebundle.properties","css":false,"content":{"controls":["sap.ndc.BarcodeScannerButton"],"elements":[],"types":[],"interfaces":[]}}}}'
}});
/* Bundle format 'h2' not supported (requires ui5loader)
"sap/ndc/BarcodeScanDialog.fragment.xml":["sap/m/Button.js","sap/m/Dialog.js","sap/m/Input.js","sap/m/Text.js","sap/ui/core/Fragment.js"],
"sap/ndc/BarcodeScanner.js":["jquery.sap.global.js"],
"sap/ndc/BarcodeScannerButton.js":["jquery.sap.global.js","sap/ndc/BarcodeScanner.js","sap/ndc/library.js","sap/ui/core/Control.js"],
"sap/ndc/BarcodeScannerButtonRenderer.js":["jquery.sap.global.js"],
"sap/ndc/library.js":["jquery.sap.global.js","sap/m/library.js","sap/ui/core/library.js"]
*/
//# sourceMappingURL=library-h2-preload.js.map