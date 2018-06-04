/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/IconPool','sap/ushell/library'],function(q,C,I){"use strict";var S=C.extend("sap.ushell.ui.shell.ShellHeadItem",{metadata:{properties:{startsSection:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},showSeparator:{type:"boolean",group:"Appearance",defaultValue:true},enabled:{type:"boolean",group:"Appearance",defaultValue:true},selected:{type:"boolean",group:"Appearance",defaultValue:false},showMarker:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},target:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},ariaLabel:{type:"string",group:"Appearance",defaultValue:null},text:{type:"string",group:"Appearance",defaultValue:null},visible:{type:"boolean",group:"Appearance",defaultValue:true},floatingNumber:{type:"int",group:"Appearance",defaultValue:null},floatingNumberMaxValue:{type:"int",group:"Appearance",defaultValue:999}},events:{press:{}}},renderer:{render:function(r,i){if((i.getTarget()||"")!==""){r.write("<a tabindex='0' href='");r.writeEscaped(i.getTarget());r.write("'");}else{r.write("<a tabindex='0'");}r.writeAccessibilityState(i,{role:'button'});r.writeControlData(i);r.addClass("sapUshellShellHeadItm");var R=i._shouldRenderText();if(R){r.addClass("sapUshellShellHeadItmText");}if(i._headerHideSeperators){r.addClass("sapUshellHeaderHideSeparators");}if(!i.getEnabled()){r.addClass("sapUshellShellHeadItmDisabled");}if(i.getFloatingNumber&&i.getFloatingNumber()>0&&i.getVisible()){var f=i.getDisplayFloatingNumber();r.addClass("sapUshellShellHeadItmCounter");r.writeAttribute("data-counter-content",f);}if(i.getStartsSection()){r.addClass("sapUshellShellHeadItmDelim");}if(i.getShowSeparator()){r.addClass("sapUshellShellHeadItmSep");}if(!i.getVisible()){r.addClass("sapUshellShellHidden");}if(i.getAriaLabel()){r.writeAccessibilityState({label:i.getAriaLabel(),role:"button"});}if(i.getSelected()){r.addClass("sapUshellShellHeadItmSel");}if(i.getShowMarker()){r.addClass("sapUshellShellHeadItmMark");}r.writeClasses();var t=i.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}r.write("><span></span><div class='sapUshellShellHeadItmMarker'><div></div></div>");if(R){r.write("<b class='sapUshellShellHeadItmCenterText'>");r.writeEscaped(i.getText());r.write("</b>");}r.write("</a>");}}});S.prototype._shouldRenderText=function(){if(this.getText()&&this.getParent()){return!(this.getParent()instanceof sap.ushell.ui.shell.ShellHeader);}return false;};S.prototype.onAfterRendering=function(){this._refreshIcon();};S.prototype.onclick=function(e){if(this.getEnabled()){this.firePress();if(!this.getTarget()){e.preventDefault();}}};S.prototype.onsapspace=function(){var d=this.getDomRef();if(d){d.click();}};S.prototype.onsapenter=function(){this.onsapspace();};S.prototype.setStartsSection=function(s){s=!!s;this.setProperty("startsSection",s,true);this.$().toggleClass("sapUshellShellHeadItmDelim",s);return this;};S.prototype.setShowSeparator=function(s){s=!!s;this.setProperty("showSeparator",s,true);this.$().toggleClass("sapUshellShellHeadItmSep",s);return this;};S.prototype.setSelected=function(s){s=!!s;this.setProperty("selected",s,true);this.$().toggleClass("sapUshellShellHeadItmSel",s);return this;};S.prototype.setEnabled=function(e){e=!!e;this.setProperty("enabled",e,true);this.$().toggleClass("sapUshellShellHeadItmDisabled",!e);return this;};S.prototype.setAriaLabel=function(a){this.setProperty('ariaLabel',a);return this;};S.prototype.setVisible=function(v){if(sap.ui.Device.system.phone){this.setProperty("visible",!!v,false);}else{this.setProperty("visible",!!v,true);}if(v){this.$().removeClass('sapUshellShellHidden');}else{this.$().addClass('sapUshellShellHidden');}return this;};S.prototype.setShowMarker=function(m){m=!!m;this.setProperty("showMarker",m,true);this.$().toggleClass("sapUshellShellHeadItmMark",m);return this;};S.prototype.setIcon=function(i){this.setProperty("icon",i,true);if(this.getDomRef()){this._refreshIcon();}return this;};S.prototype._refreshIcon=function(){var i=q(this.$().children()[0]);var s=this.getIcon();if(I.isIconURI(s)){var o=I.getIconInfo(s);i.html("").css("style","");q(this.$().children()[0]).removeClass('userImgSpan');if(o){i.text(o.content).css("font-family","'"+o.fontFamily+"'");}}else{var $=this.$("img-inner");if($.length===0||$.attr("src")!==s){q(this.$().children()[0]).addClass('userImgSpan');i.css("style","").html("<img id='"+this.getId()+"-img-inner' src='"+q.sap.encodeHTML(s)+"'></img>");}}};S.prototype.getDisplayFloatingNumber=function(){var n=this.getFloatingNumber(),m=this.getFloatingNumberMaxValue();var d=n+"";if(n>m){d=m+"+";}return d;};q.sap.declare('sap.ui.unified.ShellHeadItem');sap.ui.unified.ShellHeadItem=S;return S;},true);
