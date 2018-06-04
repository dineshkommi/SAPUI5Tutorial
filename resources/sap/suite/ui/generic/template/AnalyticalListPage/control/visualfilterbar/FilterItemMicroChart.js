sap.ui.define(["sap/suite/ui/generic/template/AnalyticalListPage/control/visualfilterbar/FilterItem","sap/ui/model/Sorter","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil"],function(F,S,c){"use strict";var C="Donut";var d="Line";var f="Bar";var I="__IS_OTHER__";var g=F.extend("sap.suite.ui.generic.template.AnalyticalListPage.control.visualfilterbar.FilterItemMicroChart",{metadata:{properties:{smartFilterId:{type:"string",group:"Misc",defaultValue:null}},aggregations:{control:{type:"sap.ui5.controls.microchart",multiple:false}}},renderer:function(r,o){r.write("<div");r.writeControlData(o);r.writeClasses();r.addStyle("width","100%");jQuery(document.body).hasClass("sapUiSizeCozy")?r.addStyle("height","9.9rem"):r.addStyle("height","7.9rem");r.writeStyles();r.write(">");r.renderControl(o.getAggregation("control"));r.write("</div>");}});g.prototype._formattingId="__UI5__ShortIntegerMaxFraction2";g.prototype._maxFractionalDigits=2;g.prototype._maxFractionalDigitsValsLessThanZero=7;g.prototype._minFractionalDigits=0;g.prototype._shortRefNumber;g.prototype._isTriggeredBySync=false;g.prototype._multiUnit=false;g.prototype.technicalIssueMessage="TECHNICAL_ISSUES_OVERLAY_MESSAGE";g.prototype.noDataIssueMessage="NO_DATA_FOUND_OVERLAY_MESSAGE";g.prototype.requiredFilterMessage="REQUIRED_FIELDS_OVERLAY_MESSAGE";g.prototype.multipleCurrencyMessage="MULTIPLE_CURRENCY_OVERLAY_MESSAGE";g.prototype.multipleUnitMessage="MULTIPLE_UNIT_OVERLAY_MESSAGE";g.prototype.init=function(){this._bAllowBindingUpdateOnPropertyChange=false;this._attachChartEvents();};g.prototype._attachChartEvents=function(){var m=this;this._chart.addEventDelegate({onAfterRendering:function(){if(m._getChartAggregations().length){if(m._multiUnit){m.applyOverlay(m.getIsCurrency()?m.multipleCurrencyMessage:m.multipleUnitMessage);}}}});this._chart.attachSelectionChanged(this._onSelectionChanged,this);};g.prototype._getCurrentSelectedChart=function(r){if(this._chart.getPoints){return r?d:"point";}else if(this._chart.getSegments){return r?C:"segment";}else if(this._chart.getBars){return r?f:"bar";}};g.prototype._getCustomData=function(e){var s=this._getCurrentSelectedChart();var a=(s)?e.getParameter(s):undefined;if(s&&a){var b=a.getCustomData();var h={dimValue:b[0].getValue(),dimValueDisplay:a.getLabel()};return h;}};g.prototype._onSelectionChanged=function(e){var s=this.getFilterRestriction(),o=this._getCustomData(e),b=e.getParameter("selected"),a=(s==="single"&&o.dimValue===I&&b);if(o.dimValue===I&&b&&this.getIsDropDown()){e.getParameter("segment").setSelected(false);return;}if(a){e.getParameter("segment").setSelected(false);}if(b&&o.dimValue===I&&s==="multiple"||(b&&o.dimValue!==I)){this._onChartSelectData(e);}else if(!b){this._onChartDeselectData(e);}};g.prototype._onChartSelectData=function(e){var D,s=this.getFilterRestriction();if(s==="multiple"){D=jQuery.extend(true,{items:[],ranges:[],value:null},this.getDimensionFilter());var o=this._getCustomData(e),a=this._getCurrentSelectedChart(true);if(a===C){D=this._applyDonutChartSelections(o,D);}else{D.items.push({key:o.dimValue,text:o.dimValueDisplay});}}else{D=this.getDimensionFilter();if(D){D=null;var b=e.getParameter("bar")||e.getParameter("point")||e.getParameter("segment");this._setSelectedAggregation(b);b.setSelected(true);}var o=this._getCustomData(e);D=o.dimValue;}this.setProperty("dimensionFilter",D);this.fireFilterChange();};g.prototype._setSelectedAggregation=function(s){var a=this._chart.setSelectedBars||this._chart.setSelectedPoints||this._chart.setSelectedSegments;a.call(this._chart,s);};g.prototype._getChartAggregations=function(){var a=this._chart.getPoints||this._chart.getSegments||this._chart.getBars;return a.call(this._chart);};g.prototype._onChartDeselectData=function(e){var D,s=this.getFilterRestriction(),o=this._getCustomData(e),u=[],U=[];if(s==="single"){D=null;}else{D=jQuery.extend(true,{},this.getDimensionFilter());var a=(D&&D.items)?D.items:undefined,b=(D&&D.ranges)?D.ranges:undefined,h=(D&&D.value)?D.value:null;if(a){a.forEach(function(i){if(i.key!==o.dimValue){u.push(i);}});}D.items=u;if(h){if(o.dimValue===h){D.value=null;}}if(b){b.forEach(function(i){if(i.operation==="EQ"&&o.dimValue!==I&&i.exclude){U.push(i);}else if(i.operation==="EQ"&&!i.exclude){if(i.value1 instanceof Date&&o.dimValue instanceof Date){if(c.getDateInMedium(i.value1)!==c.getDateInMedium(o.dimValue)){U.push(i);}}else if(i.value1!==o.dimValue){U.push(i);}}else if(i.operation!=="EQ"&&!i.exclude&&i.value1!==o.dimValue){U.push(i);}});}D.ranges=U;}this.setProperty("dimensionFilter",D);this.fireFilterChange();};g._getSorter=function(s){var a=[],b=[],e=[];for(var i=0;i<s.length;i++){a[i]=s[i].Field.String;b[i]=s[i].Descending.Boolean;e.push(new S(a[i],b[i]));}var o={sorter:e,sortFields:a};return o;};g.prototype._getNumberFormatter=function(s){var a=sap.ui.core.format.NumberFormat.getIntegerInstance({style:"short",showScale:false,shortRefNumber:s});return a;};g.prototype.setWidth=function(w){this.setProperty("width",w);};g.prototype.setHeight=function(h){this.setProperty("height",h);};g.prototype.setEntitySet=function(e){this.setProperty("entitySet",e);};g.prototype.setDimensionField=function(a){this.setProperty("dimensionField",a);};g.prototype.setDimensionFieldIsDateTime=function(a){this.setProperty("dimensionFieldIsDateTime",a);};g.prototype.setDimensionFieldDisplay=function(a){this.setProperty("dimensionFieldDisplay",a);};g.prototype.setMeasureField=function(m){if(m&&m.constructor===Object){if(m.value){this.setProperty("measureField",m.value);}if(m.bUpdateBinding){this._updateBinding();}}else if(m&&m.constructor===Array){this.setProperty("measureField",m);}else{this.setProperty("measureField",m);}};g.prototype.setUnitField=function(u){this.setProperty("unitField",u);};g.prototype.setSortOrder=function(s){if(s&&s.constructor===Object){if(s.value){this.setProperty("sortOrder",s.value);}if(s.bUpdateBinding){this._updateBinding();}}else if(s&&s.constructor===Array){this.setProperty("sortOrder",s);}else{this.setProperty("sortOrder",s);}};g.prototype.setDimensionFilterExternal=function(a){this.setProperty("dimensionFilterExternal",a);if(this._bAllowBindingUpdateOnPropertyChange){this._updateBinding();}};g.prototype.getP13NConfig=function(){var p=["width","height","filterRestriction","isDropDown","sortOrder","measureField","scaleFactor","numberOfFractionalDigits","chartQualifier","entitySet","dimensionField","dimensionFieldDisplay","dimensionFieldIsDateTime","dimensionFilter","unitField","isCurrency","isMandatory","outParameter","inParameters","parentProperty"];var o={};for(var i=0;i<p.length;i++){var n=p[i];o[n]=this.getProperty(n);if((n=="outParameter"||n=="inParameters")&&o[n]==""){o[n]=undefined;}}return o;};g.prototype.setDimensionFilter=function(a,i){this.setProperty("dimensionFilter",a);};g.prototype._onDataReceived=function(a){if(!a){return;}this._determineUnit(a);this._getShortRefNumber(a.slice(0));};g.prototype._determineUnit=function(a){this._multiUnit=false;var u=this.getUnitField();if(u){var p=a[0][u];for(var i=1;i<a.length;i++){if(a[i].dimensionValue!==I){var b=a[i][u];}if(b!=p){if(a.length>1){this._multiUnit=true;}break;}p=b;}this._applyUnitValue(this._multiUnit?"":p);}else{this._applyUnitValue("");}};g.prototype._applyUnitValue=function(v){if(this._lastUnitValue!=v){this._lastUnitValue=v;this.fireTitleChange();}};g.prototype._getShortRefNumber=function(D){this._scaleValue="";this._shortRefNumber=undefined;var s=this.getScaleFactor(),a;if(!s){var b=this._getScaleFactorFromMedian(D);s=b.iShortRefNumber;a=b.scale;}else{var e=this._getNumberFormatter(s);a=e.getScale()?e.getScale():"";}this._shortRefNumber=s;this._scaleValue=a;this.fireTitleChange();};g.prototype._getScaleFactorFromMedian=function(D){var m=this.getMeasureField();D.sort(function(a,b){if(Number(a[m])<Number(b[m])){return-1;}if(Number(a[m])>Number(b[m])){return 1;}return 0;});var M=D.length/2,e=M%1===0?(parseFloat(D[M-1][m])+parseFloat(D[M][m]))/2:parseFloat(D[Math.floor(M)][m]),v=e,s;for(var i=0;i<14;i++){s=Math.pow(10,i);if(Math.round(Math.abs(v)/s)<10){break;}}var h=this._getNumberFormatter(s);for(var i=0;i<D.length;i++){var j=D[i],k=h.format(j[m]),l=k.split(".");if((!l[1]&&parseInt(l[0],10)===0)||(l[1]&&parseInt(l[0],10)===0&&l[1].indexOf('0')===0)||(k/1000)>=1000){s=undefined;break;}}return{iShortRefNumber:s,scale:s?h.getScale():""};};g.prototype._getScaleFactor=function(v){var v=parseFloat(v);var p=this._minFractionalDigits;for(var i=0;i<14;i++){var s=Math.pow(10,i);if(Math.round(Math.abs(v)/s,p-1)<10){return s;}}return undefined;};g.prototype.getTitle=function(){var m=this.getModel();if(!m){return"";}var a=c.getPropertyNameDisplay(m,this.getEntitySet(),this.getMeasureField());var b=c.getPropertyNameDisplay(m,this.getEntitySet(),this.getDimensionField());var u=this._lastUnitValue?this._lastUnitValue:"";var s=this._scaleValue?this._scaleValue:"";var i=this.getModel("i18n");if(!i){return"";}var r=i.getResourceBundle();var t="";if(s&&u){t=r.getText("VIS_FILTER_TITLE_MD_UNIT_CURR",[a,b,s,u]);}else if(u){t=r.getText("VIS_FILTER_TITLE_MD_UNIT",[a,b,u]);}else if(s){t=r.getText("VIS_FILTER_TITLE_MD_UNIT",[a,b,s]);}else{t=r.getText("VIS_FILTER_TITLE_MD",[a,b]);}return t;};g.prototype.getFormattedNumber=function(v,s){var n=this.getNumberOfFractionalDigits();if(n===""||n===undefined){n="1";}else{if(Number(n)>1){n="1";}}var a=sap.ui.core.format.NumberFormat.getFloatInstance({style:"short",decimals:Number(n),showScale:s,shortRefNumber:this._shortRefNumber,minFractionDigits:this._minFractionalDigits,maxFractionDigits:this._maxFractionalDigits});return a.format(parseFloat(v));};g.prototype._getFormattedNumberWithUoM=function(v,U){U=(U)?U:"";var l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var a=sap.ui.core.format.NumberFormat.getFloatInstance({maxFractionDigits:2,groupingEnabled:true},l).format(v);return(U==="%")?a+"%":a+" "+U;};g.prototype._getDisplayedValue=function(v,u){var s=(this._scaleValue===""),n=this.getFormattedNumber(v,s),i=(u==="%");return(i)?n+"%":""+n;};g.prototype._getToolTip=function(a,b,u){var n=this._getFormattedNumberWithUoM(b,u);return a+"\n"+n;};g.prototype._getSelected=function(o,D){var b=false,s=this.getFilterRestriction(),e=[];if(o){if(s==='multiple'){if(o.items){o.items.forEach(function(h){if(h.key===D){b=true;}});}if(o.value&&o.value===D){b=true;}if(o.ranges){for(var i=0;i<o.ranges.length;i++){var r=o.ranges[i];if(r.operation==="EQ"&&r.value1&&!r.exclude){if(r.value1 instanceof Date&&D instanceof Date){if(c.getDateInMedium(r.value1)===c.getDateInMedium(D)){b=true;break;}}else if(r.value1===D){b=true;break;}}else if(r.exclude&&r.operation==='EQ'){e.push(r.value1);}}if(e.length===2&&D===I){var v=0,a=this._chart.getSegments();a.forEach(function(h){var V=h.getCustomData()[0].getValue();if(e.indexOf(V)>-1){v++;}});if(v===2){b=true;}}}}else{if(o&&o===D){b=true;}}}return b;};g.prototype._getChartAggregationSettings=function(i){var D=i?'dimensionValue':this.getDimensionField(),s=this.getDimensionFieldDisplay(),m=this.getMeasureField(),u=this.getUnitField(),l=(D===s)?[s]:[s,D],t=(D===s)?[s,m,""]:[s,m,D],U=u?t.push(u):t,a=this,o={label:{parts:l,formatter:function(b,D){var T=a.getTextArrangement();return(b instanceof Date)?c.getDateInMedium(b):c.getTextArrangement(b,D,T);}},value:{path:m,formatter:function(v){return parseFloat(v);}},displayedValue:{parts:[m,u],formatter:function(v,b){return a._getDisplayedValue(v,b);}},tooltip:{parts:U.constructor===Array?U:t,formatter:function(b,e,D,h){var T=a.getTextArrangement();D=D.constructor===Object?undefined:D;b=(b instanceof Date)?c.getDateInMedium(b):c.getTextArrangement(b,D,T);return a._getToolTip(b,e,h);}},selected:{parts:["_filter>/"+a.getParentProperty(),D],formatter:function(b,e){return a._getSelected(b,e);}},customData:{Type:"sap.ui.core.CustomData",key:D,value:"{"+D+"}"},color:"{color}"};return o;};g.prototype.applyOverlay=function(i){var p=this.data("sPath");if(p){var s=p+"/showChartOverlay";var a=this.getModel('_visualFilterConfigModel');a.setProperty(s,(i?true:false));if(i){var o=p+"/overlayMessage";a.setProperty(o,i);}}};g.prototype.considerAnalyticBinding=function(b,s){if(s&&s.getAnalyticBindingPath&&s.getConsiderAnalyticalParameters()){try{var a=s.getAnalyticBindingPath();if(a){return a;}}catch(e){jQuery.sap.log.warning("Mandatory parameters have no values","","AnalyticalListPage");}}return b;};return g;},true);
