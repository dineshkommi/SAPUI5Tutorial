/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','jquery.sap.global'],function(C,q){"use strict";return C.extend("sap.ui.documentation.sdk.controls.JSDocText",{metadata:{properties:{text:{type:"string",defaultValue:""}}},renderer:function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapUiJSD");r.writeClasses();r.write(">");r.write(q.sap._sanitizeHTML(c.getText()));r.write("</div>");}});});
