/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./DatePicker','sap/ui/model/type/Date','sap/ui/unified/DateRange','./library','sap/ui/core/Control','sap/ui/Device','sap/ui/core/format/DateFormat','sap/ui/core/LocaleData','./DateTimePickerRenderer','jquery.sap.keycodes'],function(q,D,a,b,l,C,c,d,L,e){"use strict";var P=l.PlacementType;var f=D.extend("sap.m.DateTimePicker",{metadata:{library:"sap.m",aggregations:{_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},designtime:"sap/m/designtime/DateTimePicker.designtime"}});var g=C.extend("DateTimePickerPopup",{metadata:{aggregations:{_switcher:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},calendar:{type:"sap.ui.core.Control",multiple:false},timeSliders:{type:"sap.ui.core.Control",multiple:false}}},renderer:function(r,i){r.write("<div");r.writeControlData(i);r.addClass("sapMDateTimePopupCont");r.addClass("sapMTimePickerDropDown");r.writeClasses();r.write(">");var s=i.getAggregation("_switcher");if(s&&s.getVisible()){r.write("<div");r.addClass("sapMTimePickerSwitch");r.writeClasses();r.write(">");r.renderControl(s);r.write("</div>");}var j=i.getCalendar();if(j){r.renderControl(j);}r.write("<div");r.addClass("sapMTimePickerSep");r.writeClasses();r.write(">");r.write("</div>");var S=i.getTimeSliders();if(S){r.renderControl(S);}r.write("</div>");},init:function(){},onBeforeRendering:function(){var s=this.getAggregation("_switcher");if(c.system.phone||q('html').hasClass("sapUiMedia-Std-Phone")){if(!s){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var i=r.getText("DATETIMEPICKER_DATE");var t=r.getText("DATETIMEPICKER_TIME");s=new sap.m.SegmentedButton(this.getId()+"-Switch",{selectedKey:"Cal",items:[new sap.m.SegmentedButtonItem(this.getId()+"-Switch-Cal",{key:"Cal",text:i}),new sap.m.SegmentedButtonItem(this.getId()+"-Switch-Sli",{key:"Sli",text:t})]});s.attachSelect(this._handleSelect,this);this.setAggregation("_switcher",s,true);}else{s.setVisible(true);s.setSelectedKey("Cal");}}else if(s){s.setVisible(false);}},onAfterRendering:function(){if(c.system.phone||q('html').hasClass("sapUiMedia-Std-Phone")){var s=this.getAggregation("_switcher");var K=s.getSelectedKey();this._switchVisibility(K);if(c.system.phone){this._adjustTimePickerHeightOnPhone();}}},_adjustTimePickerHeightOnPhone:function(){var s=this.getAggregation("_switcher"),S=s.$().children(0).css("height").replace('px','');this.$().css("height",(document.documentElement.clientHeight-parseInt(S,10))+"px");},_handleSelect:function(E){this._switchVisibility(E.getParameter("key"));},_switchVisibility:function(K){var i=this.getCalendar();var s=this.getTimeSliders();if(!i||!s){return;}if(K=="Cal"){i.$().css("display","");s.$().css("display","none");}else{i.$().css("display","none");s.$().css("display","");s._updateSlidersValues();s._onOrientationChanged();s.openFirstSlider();}},switchToTime:function(){var s=this.getAggregation("_switcher");if(s&&s.getVisible()){s.setSelectedKey("Sli");this._switchVisibility("Sli");}},getSpecialDates:function(){return this._oDateTimePicker.getSpecialDates();}});f.prototype.init=function(){D.prototype.init.apply(this,arguments);this._bOnlyCalendar=false;};f.prototype.exit=function(){D.prototype.exit.apply(this,arguments);if(this._oSliders){this._oSliders.destroy();delete this._oSliders;}this._oPopupContent=undefined;};f.prototype.setDisplayFormat=function(s){D.prototype.setDisplayFormat.apply(this,arguments);if(this._oSliders){this._oSliders.setDisplayFormat(o.call(this));}return this;};f.prototype._getFormatInstance=function(A,i){var M=q.extend({},A);var s=-1;if(M.style){s=M.style.indexOf("/");}if(i){var j=q.extend({},M);if(s>0){j.style=j.style.substr(0,s);}this._oDisplayFormatDate=d.getInstance(j);}return d.getDateTimeInstance(M);};f.prototype._checkStyle=function(s){if(D.prototype._checkStyle.apply(this,arguments)){return true;}else if(s.indexOf("/")>0){var S=["short","medium","long","full"];var r=false;for(var i=0;i<S.length;i++){var t=S[i];for(var j=0;j<S.length;j++){var u=S[j];if(s==t+"/"+u){r=true;break;}}if(r){break;}}return r;}return false;};f.prototype._parseValue=function(v,i){var j=D.prototype._parseValue.apply(this,arguments);if(i&&!j){j=this._oDisplayFormatDate.parse(v);if(j){var O=this.getDateValue();if(!O){O=new Date();}j.setHours(O.getHours());j.setMinutes(O.getMinutes());j.setSeconds(O.getSeconds());j.setMilliseconds(O.getMilliseconds());}}return j;};f.prototype._getLocaleBasedPattern=function(s){var i=L.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()),S=s.indexOf("/");if(S>0){return i.getCombinedDateTimePattern(s.substr(0,S),s.substr(S+1));}else{return i.getCombinedDateTimePattern(s,s);}};f.prototype._createPopup=function(){if(!this._oPopup){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var O=r.getText("TIMEPICKER_SET");var s=r.getText("TIMEPICKER_CANCEL");this._oPopupContent=new g(this.getId()+"-PC");this._oPopupContent._oDateTimePicker=this;this._oPopup=new sap.m.ResponsivePopover(this.getId()+"-RP",{showCloseButton:false,showHeader:false,placement:P.VerticalPreferedBottom,beginButton:new sap.m.Button(this.getId()+"-OK",{text:O,press:q.proxy(_,this)}),endButton:new sap.m.Button(this.getId()+"-Cancel",{text:s,press:q.proxy(h,this)}),content:this._oPopupContent});this._oPopup.addStyleClass("sapMDateTimePopup");var i=this._oPopup.getAggregation("_popup");if(i.setShowArrow){i.setShowArrow(false);}this._oPopup.attachBeforeOpen(k,this);this._oPopup.attachAfterOpen(m,this);this._oPopup.attachAfterClose(n,this);if(c.system.desktop){this._oPopoverKeydownEventDelegate={onkeydown:function(E){var K=q.sap.KeyCodes,j=E.which||E.keyCode,A=E.altKey;if((A&&(j===K.ARROW_UP||j===K.ARROW_DOWN))||j===K.F4){_.call(this,E);this.focus();E.preventDefault();}}};this._oPopup.addEventDelegate(this._oPopoverKeydownEventDelegate,this);}this.setAggregation("_popup",this._oPopup,true);}};f.prototype._openPopup=function(){if(!this._oPopup){return;}var i=this._oPopup.getAggregation("_popup");i.oPopup.setAutoCloseAreas([this.getDomRef()]);this._oPopup.openBy(this);var s=this._oPopup.getContent()[0]&&this._oPopup.getContent()[0].getTimeSliders();if(s){q.sap.delayedCall(0,s,s._updateSlidersValues);}};f.prototype._createPopupContent=function(){var N=!this._oCalendar;D.prototype._createPopupContent.apply(this,arguments);if(N){this._oPopupContent.setCalendar(this._oCalendar);this._oCalendar.attachSelect(p,this);var t=this,H=this._oCalendar._hideMonthPicker,i=this._oCalendar._hideYearPicker;this._oCalendar._hideMonthPicker=function(s){H.apply(this,arguments);if(!s){t._selectFocusedDateValue(new b().setStartDate(this._getFocusedDate().toLocalJSDate()));}};this._oCalendar._hideYearPicker=function(s){i.apply(this,arguments);if(!s){t._selectFocusedDateValue(new b().setStartDate(this._getFocusedDate().toLocalJSDate()));}};}if(!this._oSliders){q.sap.require("sap.m.TimePickerSliders");this._oSliders=new sap.m.TimePickerSliders(this.getId()+"-Sliders",{displayFormat:o.call(this),localeId:this.getLocaleId()})._setShouldOpenSliderAfterRendering(true);this._oPopupContent.setTimeSliders(this._oSliders);}};f.prototype._selectFocusedDateValue=function(i){var j=this._oCalendar;j.removeAllSelectedDates();j.addSelectedDate(i);return this;};f.prototype._fillDateRange=function(){var i=this.getDateValue();if(i){i=new Date(i.getTime());}else{i=this._getInitialFocusedDateValue();var M=this._oMaxDate.getTime()+86400000;if(i.getTime()<this._oMinDate.getTime()||i.getTime()>M){i=this._oMinDate;}}this._oCalendar.focusDate(i);if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=i.getTime()){this._oDateRange.setStartDate(i);}this._oSliders._setTimeValues(i);};f.prototype._getSelectedDate=function(){var i=D.prototype._getSelectedDate.apply(this,arguments);if(i){var j=this._oSliders.getTimeValues();var s=this._oSliders._getDisplayFormatPattern();if(s.search("h")>=0||s.search("H")>=0){i.setHours(j.getHours());}if(s.search("m")>=0){i.setMinutes(j.getMinutes());}if(s.search("s")>=0){i.setSeconds(j.getSeconds());}if(i.getTime()<this._oMinDate.getTime()){i=new Date(this._oMinDate.getTime());}else if(i.getTime()>this._oMaxDate.getTime()){i=new Date(this._oMaxDate.getTime());}}return i;};f.prototype._getInitialFocusedDateValue=function(){return this.getInitialFocusedDateValue()||new Date();};f.prototype.getLocaleId=function(){return sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();};f.prototype.getAccessibilityInfo=function(){var i=D.prototype.getAccessibilityInfo.apply(this,arguments);i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATETIMEINPUT");return i;};function _(E){this._selectDate();}function h(E){this.onsaphide(E);this._oCalendar.removeAllSelectedDates();this._oCalendar.addSelectedDate(new b().setStartDate(this._getInitialFocusedDateValue()));}function k(){this._storeInputSelection(this._$input.get(0));}function m(E){this.$("inner").attr("aria-expanded",true);this._oCalendar.focus();this._oSliders._onOrientationChanged();}function n(){this.$("inner").attr("aria-expanded",false);this._restoreInputSelection(this._$input.get(0));}function o(){var s=this.getDisplayFormat();var t;var B=this.getBinding("value");if(B&&B.oType&&(B.oType instanceof a)){s=B.oType.getOutputPattern();}else if(B&&B.oType&&B.oType.oFormat){s=B.oType.oFormat.oFormatOptions.pattern;}else{s=this.getDisplayFormat();}if(!s){s="medium";}var S=s.indexOf("/");if(S>0&&this._checkStyle(s)){s=s.substr(S+1);}if(s=="short"||s=="medium"||s=="long"||s=="full"){var i=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var j=L.getInstance(i);t=j.getTimePattern(s);}else{t=s;}return t;}function p(E){this._oPopupContent.switchToTime();}return f;});