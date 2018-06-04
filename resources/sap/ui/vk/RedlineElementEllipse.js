/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./RedlineElement"],function(q,R){"use strict";var a=R.extend("sap.ui.vk.RedlineElementEllipse",{metadata:{library:"sap.ui.vk",properties:{radiusX:{type:"float",defaultValue:0.0001},radiusY:{type:"float",defaultValue:0.0001},fillColor:{type:"sap.ui.core.CSSColor",defaultValue:"rgba(0, 0, 0, 0)"}}}});a.prototype.init=function(){};a.prototype.edit=function(o,b){var p=this.getParent(),t=p._toVirtualSpace(o,b),r=t.x-this.getOriginX(),c=t.y-this.getOriginY(),d=p._toVirtualSpace(1);this.setRadiusX(r>0?r:d);this.setRadiusY(c>0?c:d);return this;};a.prototype.applyZoom=function(z){this.setProperty("radiusX",this.getRadiusX()*z,true);this.setProperty("radiusY",this.getRadiusY()*z,true);return this;};a.prototype.setRadiusX=function(r){this.setProperty("radiusX",r,true);var d=this.getDomRef();if(d){d.setAttribute("rx",this.getParent()._toPixelSpace(r));}};a.prototype.setRadiusY=function(r){this.setProperty("radiusY",r,true);var d=this.getDomRef();if(d){d.setAttribute("ry",this.getParent()._toPixelSpace(r));}};a.prototype.render=function(r){var p=this.getParent();r.write("<ellipse");r.writeElementData(this);var o=p._toPixelSpace(this.getOriginX(),this.getOriginY());r.writeAttribute("cx",o.x);r.writeAttribute("cy",o.y);r.writeAttribute("rx",p._toPixelSpace(this.getRadiusX()));r.writeAttribute("ry",p._toPixelSpace(this.getRadiusY()));r.writeAttribute("fill",this.getFillColor());r.writeAttribute("stroke",this.getStrokeColor());r.writeAttribute("stroke-width",this.getStrokeWidth());r.writeAttribute("opacity",this.getOpacity());r.write("></ellipse>");};a.prototype.exportJSON=function(){return q.extend(true,R.prototype.exportJSON.call(this),{type:sap.ui.vk.Redline.ElementType.Ellipse,version:1,radiusX:this.getRadiusX(),radiusY:this.getRadiusY(),fillColor:this.getFillColor()});};a.prototype.importJSON=function(j){if(j.type===sap.ui.vk.Redline.ElementType.Ellipse){if(j.version===1){R.prototype.importJSON.call(this,j);if(j.hasOwnProperty("radiusX")){this.setRadiusX(j.radiusX);}if(j.hasOwnProperty("radiusY")){this.setRadiusY(j.radiusY);}if(j.hasOwnProperty("fillColor")){this.setFillColor(j.fillColor);}}else{q.sap.log.error("wrong version number");}}else{q.sap.log.error("Redlining JSON import: Wrong element type");}return this;};a.prototype.exportSVG=function(){var r=R.prototype.exportSVG.call(this);var s="http://www.w3.org/2000/svg";var e=document.createElementNS(s,"ellipse");e.setAttributeNS(null,"rx",this.getRadiusX());e.setAttributeNS(null,"ry",this.getRadiusY());e.setAttributeNS(null,"fill",this.getFillColor());e.setAttributeNS(null,"stroke",r.strokeColor);e.setAttributeNS(null,"stroke-width",r.strokeWidth);e.setAttributeNS(null,"x",r.originX);e.setAttributeNS(null,"y",r.originY);return e;};a.prototype.importSVG=function(s){if(s.tagName==="ellipse"){R.prototype.importSVG.call(this,s);if(s.getAttribute("rx")){this.setRadiusX(parseFloat(s.getAttribute("rx")));}if(s.getAttribute("ry")){this.setRadiusY(parseFloat(s.getAttribute("ry")));}if(s.getAttribute("fill")){this.setFillColor(s.getAttribute("fill"));}}else{q.sap.log("Redlining SVG import: Wrong element type");}return this;};return a;});
