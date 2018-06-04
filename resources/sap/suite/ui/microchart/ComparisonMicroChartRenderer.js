/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','./library'],function(q,l){"use strict";var C={};C.render=function(r,c){if(!c._bThemeApplied){return;}var a=c.getAltText();r.write("<div");r.writeControlData(c);r.addClass("sapSuiteCpMC");r.addClass("sapSuiteCpMCChartContent");var s=c.getIsResponsive()?"sapSuiteCpMCResponsive":"sapSuiteCpMCSize"+c.getSize();r.addClass(s);if(c.hasListeners("press")){r.writeAttribute("tabindex","0");r.addClass("sapSuiteUiMicroChartPointer");}r.writeClasses();r.writeAttribute("role","presentation");r.writeAttributeEscaped("aria-label",a);if(c.getShrinkable()){r.addStyle("min-height","0px");}if(!c.getIsResponsive()&&c.getWidth()){r.addStyle("width",c.getWidth());}if(!c.getIsResponsive()&&c.getHeight()){r.addStyle("height",c.getHeight());}r.writeStyles();r.write(">");this._renderInnerContent(r,c,a);r.write("<div");r.writeAttribute("id",c.getId()+"-info");r.writeAttribute("aria-hidden","true");r.addStyle("display","none");r.writeStyles();r.write(">");r.writeEscaped(a);r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-hidden");r.writeAttribute("aria-hidden","true");r.writeAttribute("tabindex","-1");r.writeStyles();r.write(">");r.write("</div>");r.write("</div>");};C._renderInnerContent=function(r,c,a){var b=c.getColorPalette().length;var d=0;var n=function(){if(b){if(d==b){d=0;}return c.getColorPalette()[d++];}};r.write("<div");r.addClass("sapSuiteCpMCVerticalAlignmentContainer");r.writeClasses();r.write(">");var e=c._calculateChartData();for(var i=0;i<e.length;i++){this._renderChartItem(r,c,e[i],i,n());}r.write("</div>");};C._renderChartItem=function(r,c,o,i,s){var S=c.getIsResponsive()?"sapSuiteCpMCResponsive":"sapSuiteCpMCSize"+c.getSize();r.write("<div");r.writeAttribute("id",c.getId()+"-chart-item-"+i);r.addClass("sapSuiteCpMCChartItem");r.addClass("sapSuiteCpMCViewType"+c.getView());if(!c.getIsResponsive()){r.addClass(S);}r.writeClasses();r.write(">");this._renderChartHeader(r,c,i,s);this._renderChartBar(r,c,o,i,s);r.write("</div>");};C._renderChartBar=function(r,c,o,i,s){var S=c.getIsResponsive()?"sapSuiteCpMCResponsive":"sapSuiteCpMCSize"+c.getSize();var d=c.getData()[i];r.write("<div");r.writeAttribute("id",c.getId()+"-chart-item-bar-"+i);r.addClass("sapSuiteCpMCChartBar");r.addClass("sapSuiteCpMCViewType"+c.getView());r.addClass(S);if(c.getData()[i].hasListeners("press")){if(i===0){r.writeAttribute("tabindex","0");}r.writeAttribute("role","presentation");r.writeAttributeEscaped("aria-label",c._getBarAltText(i));if(!l._isTooltipSuppressed(c._getBarAltText(i))){r.writeAttributeEscaped("title",c._getBarAltText(i));}else{r.writeAttribute("title","");}r.writeAttribute("data-bar-index",i);r.addClass("sapSuiteUiMicroChartPointer");}r.writeClasses();r.write(">");if(o.negativeNoValue>0){r.write("<div");r.writeAttribute("data-bar-index",i);r.addClass("sapSuiteCpMCChartBarNegNoValue");if(o.value>0||o.positiveNoValue>0){r.addClass("sapSuiteCpMCNotLastBarPart");}r.writeClasses();r.addStyle("width",q.sap.encodeHTML(o.negativeNoValue+"%"));r.writeStyles();r.write("></div>");}if(o.value>0){r.write("<div");r.writeAttribute("data-bar-index",i);r.addClass("sapSuiteCpMCChartBarValue");r.addClass(q.sap.encodeHTML("sapSuiteCpMCSemanticColor"+d.getColor()));r.writeClasses();r.addStyle("background-color",s?q.sap.encodeHTML(s):"");r.addStyle("width",q.sap.encodeHTML(o.value+"%"));r.writeStyles();r.write("></div>");}if(o.positiveNoValue>0){r.write("<div");r.writeAttribute("data-bar-index",i);r.addClass("sapSuiteCpMCChartBarNoValue");if(!!o.negativeNoValue&&!o.value){r.addClass("sapSuiteCpMCNegPosNoValue");}else if(!!o.negativeNoValue||!!o.value){r.addClass("sapSuiteCpMCNotFirstBarPart");}r.writeClasses();r.addStyle("width",q.sap.encodeHTML(o.positiveNoValue+"%"));r.writeStyles();r.write("></div>");}r.write("</div>");};C._renderChartHeader=function(r,c,i,s){var S=c.getIsResponsive()?"sapSuiteCpMCResponsive":"sapSuiteCpMCSize"+c.getSize();var d=c.getData()[i];var a=c.getScale();var D=d.getDisplayValue();var A=D?D:""+d.getValue();var v=A+a;r.write("<div");r.writeAttribute("id",c.getId()+"-chart-item-"+i+"-header");r.addClass("sapSuiteCpMCChartItemHeader");r.addClass("sapSuiteCpMCViewType"+c.getView());r.addClass(S);r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-chart-item-"+i+"-value");r.addClass("sapSuiteCpMCChartItemValue");r.addClass(S);r.addClass(q.sap.encodeHTML("sapSuiteCpMCViewType"+c.getView()));if(!s){r.addClass(q.sap.encodeHTML("sapSuiteCpMCSemanticColor"+d.getColor()));}if(d.getTitle()){r.addClass("sapSuiteCpMCTitle");}r.writeClasses();r.write(">");if(!isNaN(d.getValue())){r.writeEscaped(v);}r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-chart-item-"+i+"-title");r.addClass("sapSuiteCpMCChartItemTitle");r.writeClasses();r.write(">");r.writeEscaped(d.getTitle());r.write("</div>");r.write("</div>");};return C;},true);