/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./library","./Tool","./RotateToolHandler","./RotateToolGizmo"],function(q,l,T,R,a){"use strict";var b=T.extend("sap.ui.vk.tools.RotateTool",{metadata:{publicMethods:["getCoordinateSystem","setCoordinateSystem","rotate"],events:{rotating:{parameters:{x:"float",y:"float",z:"float"}},rotated:{parameters:{x:"float",y:"float",z:"float"}}}},constructor:function(i,s){T.apply(this,arguments);this._viewport=null;this._handler=null;this._gizmo=null;}});b.prototype.init=function(){if(T.prototype.init){T.prototype.init.call(this);}this.setFootprint(["sap.ui.vk.threejs.Viewport"]);this.setAggregation("gizmo",new a());};b.prototype.isViewportType=function(t){if(this._viewport&&this._viewport.getMetadata().getName()===t){return true;}return false;};b.prototype.setActive=function(v,c,g){if(T.prototype.setActive){T.prototype.setActive.call(this,v,c,g);}if(v){this._activateTool(c);}else{this._deactivateTool();}if(c){c.setShouldRenderFrame();}return this;};b.prototype._activateTool=function(c){this._viewport=c;this._handler=new R(this);this._gizmo=this.getGizmo();if(this._gizmo){this._gizmo.show(c,this);}this._prepare();};b.prototype._deactivateTool=function(){if(this._handler){if(this._viewport._loco){this._viewport._loco.removeHandler(this._handler);}this._handler=null;}if(this._gizmo){this._gizmo.hide();this._gizmo=null;}};b.prototype._prepare=function(){var o=false;if(this._viewport._loco){this._viewport._loco.addHandler(this._handler);o=true;}return o;};b.prototype.queueCommand=function(c){if(this._prepare()){if(this.isViewportType("sap.ui.vk.threejs.Viewport")){c();}}return this;};b.prototype.destroy=function(){T.prototype.destroy.call(this);this._viewport=null;this._handler=null;};b.prototype.getCoordinateSystem=function(){return this.getGizmo().getCoordinateSystem();};b.prototype.setCoordinateSystem=function(v){this.getGizmo().setCoordinateSystem(v);if(this._viewport){this._viewport.setShouldRenderFrame();}return this;};b.prototype.rotate=function(v){if(this._gizmo){this._gizmo.rotate(v);}if(this._viewport){this._viewport.setShouldRenderFrame();}return this;};return b;});
