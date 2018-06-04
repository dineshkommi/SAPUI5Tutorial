/* SAP APF Analysis Path Framework
* 
* (c) Copyright 2012-2014 SAP SE. All rights reserved
*/
jQuery.sap.declare("sap.apf.ui.representations.table");jQuery.sap.require("sap.apf.core.constants");jQuery.sap.require('sap.apf.ui.utils.formatter');jQuery.sap.require("sap.apf.ui.representations.utils.paginationHandler");jQuery.sap.require("sap.apf.ui.representations.BaseUI5ChartRepresentation");jQuery.sap.require("sap.apf.ui.representations.utils.paginationDisplayOptionHandler");jQuery.sap.require("sap.ui.model.Sorter");jQuery.sap.require("sap.ui.table.Table");jQuery.sap.require("sap.ui.table.Column");jQuery.sap.require("sap.ui.core.CustomData");jQuery.sap.require("sap.ui.model.json.JSONModel");jQuery.sap.require("sap.ui.core.Icon");jQuery.sap.require("sap.ui.layout.VerticalLayout");jQuery.sap.require("sap.m.Text");jQuery.sap.require("sap.m.Label");jQuery.sap.require("sap.m.Button");jQuery.sap.require("sap.m.HBox");jQuery.sap.require("sap.m.VBox");jQuery.sap.require("sap.m.ScrollContainer");jQuery.sap.require('sap.ui.export.Spreadsheet');jQuery.sap.require("sap.apf.ui.utils.determineColumnSettingsForSpreadSheetExport");jQuery.sap.require("sap.ui.export.EdmType");(function(){'use strict';function _(t,s){s.forEach(function(i){t.addSelectionInterval(i,i);});}function a(C){C.loadAllButton.attachEvent("setFocusOnLoadAllButtonEvent",C.loadAllButton.setFocusOnLoadAllButton);}function b(t,r){if(t.bIsAlternateRepresentation&&t.oApi.getActiveStep()){t.oApi.getActiveStep().getSelectedRepresentation().oRepresentationFilterHandler.getFilterValues().forEach(function(F){if(t.aFiltersInTable.indexOf(F)===-1){t.aFiltersInTable.push(F);}});}if((r&&t.oParameter.top)||t.oParameter.isAlternateRepresentation){t.aFiltersInTable=d(t,r);}}function c(t,r){var s=[];t.aDataResponse.forEach(function(i,n){var o=i[r];if(t.aFiltersInTable.indexOf(o)!==-1){s.push(n);}});return s;}function d(t,r){var F=[];t.aFiltersInTable.forEach(function(i){t.aDataResponse.forEach(function(n){var o=n[r];if(o==i&&F.indexOf(i)===-1){F.push(i);}});});return F;}function e(E){var r=this.oParameter.requiredFilters;var R=r&&(r.length>0)?r[0]:undefined;var i=E.getParameter("userInteraction");var C=E.getParameter("rowIndices");if(!i||C.length===0){return;}if(E.getSource().getFocusDomRef()&&E.getSource().getFocusDomRef().offsetTop!==0){this.nFirstVisibleRow=this.tableControl.getFirstVisibleRow();}f(this,R,C);var n=jQuery.unique(this.aFiltersInTable);g(this,n);}function f(t,r,C){var s=t.tableControl.getContextByIndex(C[0]).getProperty(r);if((t.tableControl.isIndexSelected(C[0]))&&(t.aFiltersInTable.indexOf(s))===-1){t.aFiltersInTable.push(s);}else{var i=t.aFiltersInTable.indexOf(s);if(i!==-1){t.aFiltersInTable.splice(i,1);}}}function g(t,C){h(t);t.aFiltersInTable=C;t.oApi.getActiveStep().getSelectedRepresentation().oRepresentationFilterHandler.updateFilterFromSelection(C);t.oApi.selectionChanged();}function h(t){t.oRepresentationFilterHandler.clearFilters();t.oApi.getActiveStep().getSelectedRepresentation().oRepresentationFilterHandler.clearFilters();t.aValidatedFilter=[];t.aFiltersInTable=[];}function j(C,s,i,n,w){var o=C.nDataResponseCount||0;var p,t;var q=C.oApi.getTextNotHtmlEncoded("buttonTextExport");var r=new sap.m.Button({text:q,press:function(){C.exportExcel(s);}}).addStyleClass("sapUiTinyMarginBeginEnd");C.titleControl=new sap.m.Title({level:sap.ui.core.TitleLevel.H1}).addStyleClass("sapUiTinyMarginBegin").addStyleClass("sapUiTinyMarginTop");if(w){t=C.title;}else if(C.oParameter.top){p=new sap.m.HBox({items:[r]});t=C.title;}else if(n){p=new sap.m.HBox({items:[r]});t=C.oApi.getTextNotHtmlEncoded("stepTitleWithNumberOfRecords",[C.title,i,i]);}else{q=C.oApi.getTextNotHtmlEncoded("buttonTextLoadAll");if(C.loadAllButton===undefined){C.loadAllButton=new sap.m.Button({text:q,press:C.loadAll.bind(C)});C.loadAllButton.setFocusOnLoadAllButton=function(){this.focus();this.detachEvent("setFocusOnLoadAllButtonEvent",this.setFocusOnLoadAllButton);};}p=new sap.m.HBox({items:[C.loadAllButton,r]});t=C.oApi.getTextNotHtmlEncoded("stepTitleWithNumberOfRecords",[C.title,i,o]);C.loadAllButton.addAriaLabelledBy(C.titleControl);}r.addAriaLabelledBy(C.titleControl);C.titleControl.setText(t);var u=new sap.m.HBox({alignItems:"Start",justifyContent:"SpaceBetween",items:[C.titleControl,p]});return u;}function k(t,s,T,w){var i=function(D){return function(E){if(T.metadata!==undefined){var F;if(t.value[D]&&E){F=T.oFormatter.getFormattedValueAsString(t.value[D],E);if(F!==undefined){return F;}}}return E;};};var o=new sap.ui.table.Table({title:s,showNoData:false,enableSelectAll:false,visibleRowCountMode:sap.ui.table.VisibleRowCountMode.Auto});if(w){o.setWidth(w+"px");}o.setLayoutData(new sap.m.FlexItemData({growFactor:1}));if(sap.ui.Device.system.desktop){o.addStyleClass("sapUiSizeCompact");}var r=T.oParameter.requiredFilters;var n=(r&&(r.length>0))?"MultiToggle":"None";o.setSelectionMode(n);var p=[],C,q,u;for(var v=0;v<t.name.length;v++){C=new sap.m.Text({wrapping:false});C.bindText(t.value[v],i(v),sap.ui.model.BindingMode.OneWay);C.bindProperty("tooltip",t.value[v],i(v));q=new sap.ui.table.Column({label:new sap.m.Label({text:t.name[v]}),template:C});u=new sap.ui.core.CustomData({value:{text:t.name[v],key:t.value[v]}});if(w){q.setMinWidth(125);}q.addCustomData(u);p.push(q);}var x;x=p;x.forEach(function(D){o.addColumn(D);});if(p.length>10){o.getColumns().forEach(function(q){q.setWidth("125px");});}var M=new sap.ui.model.json.JSONModel();M.setSizeLimit(10000);var y=T.getData();M.setData({tableData:y});o.setModel(M);o.bindRows("/tableData");if(T.metadata!==undefined){for(var z=0;z<t.name.length;z++){var A=T.metadata.getPropertyMetadata(t.value[z]);if(A["aggregation-role"]==="measure"){var B=o.getColumns()[z];B.setHAlign(sap.ui.core.HorizontalAlign.End);}}}return o;}function l(t){var T=t.getData();var p=[],n;var C={name:[],value:[]};p=t.oParameter.dimensions.concat(t.oParameter.measures).length?t.oParameter.dimensions.concat(t.oParameter.measures):t.parameter.properties;if(T.length!==0){for(var i=0;i<p.length;i++){C.value[i]=p[i].fieldName;var o=t.metadata.getPropertyMetadata(p[i].fieldName).label||t.metadata.getPropertyMetadata(p[i].fieldName).name;var u="";if(t.metadata!==undefined&&t.metadata.getPropertyMetadata(p[i].fieldName).unit!==undefined){var U=t.metadata.getPropertyMetadata(p[i].fieldName).unit;u=t.getData()[0][U];for(n=0;n<t.getData().length;n++){if(u!==t.getData()[n][U]){u=undefined;break;}}C.name[i]=p[i].fieldDesc===undefined||!t.oApi.getTextNotHtmlEncoded(p[i].fieldDesc).length?o:t.oApi.getTextNotHtmlEncoded(p[i].fieldDesc);if(u!==undefined&&u!==""){C.name[i]=t.oApi.getTextNotHtmlEncoded("displayUnit",[C.name[i],u]);}}else{C.name[i]=p[i].fieldDesc===undefined||!t.oApi.getTextNotHtmlEncoded(p[i].fieldDesc).length?o:t.oApi.getTextNotHtmlEncoded(p[i].fieldDesc);}}}return C;}function m(v){var s;var S=v.getSelectedSortItem();v.getSortItems().forEach(function(o){if(o.getId()===S){s=o.getKey();}});return s;}sap.apf.ui.representations.table=function(A,p){this.oViewSettingDialog=undefined;this.aDataResponse=[];this.aValidatedFilter=[];this.aFiltersInTable=[];this.oParameter=p;this.orderby=p.orderby;this.omitTopAndSkipOptionsForNextPathUpdate=false;sap.apf.ui.representations.BaseUI5ChartRepresentation.apply(this,[A,p]);this.alternateRepresentation=p.alternateRepresentationType;this.type=sap.apf.ui.utils.CONSTANTS.representationTypes.TABLE_REPRESENTATION;this.oPaginationHandler=new sap.apf.ui.representations.utils.PaginationHandler(this);this.oPaginationDisplayOptionHandler=new sap.apf.ui.representations.utils.PaginationDisplayOptionHandler();};sap.apf.ui.representations.table.prototype=Object.create(sap.apf.ui.representations.BaseUI5ChartRepresentation.prototype);sap.apf.ui.representations.table.prototype.constructor=sap.apf.ui.representations.table;sap.apf.ui.representations.table.prototype.setData=function(D,i,n,v){var s=this;var r,o;if(!i){var M=this.oApi.createMessageObject({code:"6004",aParameters:[this.oApi.getTextNotHtmlEncoded("step")]});this.oApi.putMessage(M);}this.metadata=i;this.oFormatter=new sap.apf.ui.utils.formatter({getEventCallback:this.oApi.getEventCallback.bind(this.oApi),getTextNotHtmlEncoded:this.oApi.getTextNotHtmlEncoded,getExits:this.oApi.getExits()},this.metadata,this.aDataResponse);if(this.oParameter.requiredFilters.length>0){r=this.oParameter.requiredFilters[0];o=i.getPropertyMetadata(r).text;}if(!this.oParameter.isAlternateRepresentation){if(r){this.aValidatedFilter=[];if(v&&v.length>0){v.forEach(function(w){s.aValidatedFilter.push(w[r]);s.oPaginationDisplayOptionHandler.createDisplayValueLookupForPaginatedFilter(w[r],w[o]);});s.aFiltersInTable=s.aValidatedFilter;}else{s.aFiltersInTable=[];}}var p=this.getRequestOptions();var q=p.paging&&p.paging.skip;this.nDataResponseCount=n;if(q===undefined||q===0){this.aDataResponse=D;}else{D.map(function(w){s.aDataResponse.push(w);});}if(!this.oParameter.top&&this.titleControl){var t=(this.aDataResponse&&this.aDataResponse.length)||0;var u=this.oApi.getTextNotHtmlEncoded("stepTitleWithNumberOfRecords",[this.title,t,n]);this.titleControl.setText(u);}}else{this.aDataResponse=D;}if(o){this.aDataResponse.forEach(function(w){s.oPaginationDisplayOptionHandler.createDisplayValueLookupForPaginatedFilter(w[r],w[o]);});}};sap.apf.ui.representations.table.prototype.getFilter=function(){this.filter=this.oRepresentationFilterHandler.createFilterFromSelectedValues(this.aFiltersInTable);return this.filter;};sap.apf.ui.representations.table.prototype.getSelections=function(){var t=this,s=[],S;var r=t.parameter.requiredFilters[0];b(t,r);t.aFiltersInTable.forEach(function(i){S=t.oPaginationDisplayOptionHandler.getDisplayNameForPaginatedFilter(i,t.parameter.requiredFilterOptions,r,t.oFormatter,t.metadata);s.push({id:i,text:S});});return s;};sap.apf.ui.representations.table.prototype.markSelectionInTable=function(i){var r=this.oParameter.requiredFilters?this.oParameter.requiredFilters[0]:undefined;if(r){var s=c(this,r);if(this.oParameter.isAlternateRepresentation){var S=[];var n=this.tableControl.getBinding().aIndices;s.forEach(function(o){S.push(n.indexOf(o));});s=S;}this.tableControl.clearSelection();if(s.length>0){_(this.tableControl,s);}}};sap.apf.ui.representations.table.prototype.getRequestOptions=function(F,i){this.bIsAlternateRepresentation=i;if(F){this.oPaginationHandler.resetPaginationOption();}var r={paging:{},orderby:[]};if(F){this.omitTopAndSkipOptionsForNextPathUpdate=false;}if(this.omitTopAndSkipOptionsForNextPathUpdate){r.paging={inlineCount:true};}else if(!this.bIsAlternateRepresentation){r.paging=this.oPaginationHandler.getPagingOption(this.oParameter.top);}if(this.orderby){r.orderby=this.orderby;}if(this.oViewSettingDialog){var s=m(this.oViewSettingDialog);if(s){var S={property:m(this.oViewSettingDialog),ascending:!this.oViewSettingDialog.getSortDescending()};this.orderby=[S];r.orderby=[S];}}return r;};sap.apf.ui.representations.table.prototype.resetPaginationForTable=function(){this.omitTopAndSkipOptionsForNextPathUpdate=false;this.oPaginationHandler.resetPaginationOption();};sap.apf.ui.representations.table.prototype.getMainContent=function(s,w,i){var n=this;var t=this.getData();this.title=s;var o=this.oParameter.dimensions.concat(this.oParameter.measures).length?this.oParameter.dimensions.concat(this.oParameter.measures):this.oParameter.properties;var p=l(this);var M;if(!s){M=this.oApi.createMessageObject({code:"6002",aParameters:["title",this.oApi.getTextNotHtmlEncoded("step")]});this.oApi.putMessage(M);}if(o.length===0){M=this.oApi.createMessageObject({code:"6002",aParameters:["dimensions",s]});this.oApi.putMessage(M);}if(!t||t.length===0){M=this.oApi.createMessageObject({code:"6000",aParameters:[s]});this.oApi.putMessage(M);}var q;if(this.oParameter.isAlternateRepresentation){q=j(this,s,t.length,true,w);}else{q=j(this,s,t.length,false,w);}this.tableControl=k(p,q,this,w);this.tableControl.addAriaLabelledBy(q.getItems()[0]);this.tableControl.addEventDelegate({onAfterRendering:function(){if(n.oParameter){n.markSelectionInTable(true);if(n.loadAllButton){n.loadAllButton.fireEvent("setFocusOnLoadAllButtonEvent");}if(!n.oParameter.top&&!n.oParameter.isAlternateRepresentation&&n.nDataResponseCount>100){n.oPaginationHandler.attachPaginationOnTable(n);}}}});this.tableControl.attachRowSelectionChange(e.bind(n));this.oLoadMoreLink=new sap.m.Link({text:this.oApi.getTextNotHtmlEncoded("moreIcon"),visible:false});var v=new sap.m.VBox({fitContainer:true,items:[this.tableControl,this.oLoadMoreLink]}).addStyleClass("tableRepresentation");if(i){v.setHeight(i+"px");}return v;};sap.apf.ui.representations.table.prototype.getThumbnailContent=function(){var t;var T=this.getData();var i=this.oParameter.isAlternateRepresentation?"sap-icon://table-view":"sap-icon://table-chart";if(T!==undefined&&T.length!==0){var o=new sap.ui.core.Icon({src:i,size:"70px"}).addStyleClass('thumbnailTableImage');t=o;}else{var n=new sap.m.Text({text:this.oApi.getTextNotHtmlEncoded("noDataText")}).addStyleClass('noDataText');t=new sap.ui.layout.VerticalLayout({content:n});}return t;};sap.apf.ui.representations.table.prototype.removeAllSelection=function(){h(this);this.tableControl.clearSelection();this.oApi.selectionChanged();};sap.apf.ui.representations.table.prototype.getPrintContent=function(s){var p=this.tableControl.clone();p.getColumns().forEach(function(i){i.setWidth("auto");i.getTemplate().setWrapping(true);});var S=this.tableControl.getSelectedIndices();p.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);p.setVisibleRowCount(p.getModel().getData().tableData.length);p.onAfterRendering=function(){S.forEach(function(i){p.getRows()[i].addStyleClass("sapTableSelectionForPrint");});};var P={oRepresentation:p};return P;};sap.apf.ui.representations.table.prototype.getViewSettingDialog=function(){if(!this.oViewSettingDialog){var v={oTableInstance:this};var V=new sap.ui.view({type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.apf.ui.reuse.view.viewSetting",viewData:v});this.oViewSettingDialog=V.getContent()[0];this.oViewSettingDialog.addStyleClass("sapUiSizeCompact");}return this.oViewSettingDialog;};sap.apf.ui.representations.table.prototype.loadAll=function(){this.omitTopAndSkipOptionsForNextPathUpdate=true;if(this.loadAllButton){a(this);}this.oApi.selectionChanged();};sap.apf.ui.representations.table.prototype.exportExcel=function(s){var t=this;function n(){var r=l(t);var p=[];var i,u;for(i=0;i<r.value.length;i++){u=sap.apf.ui.utils.determineColumnSettingsForSpreadSheetExport(r.value[i],t.metadata);u.property=r.value[i];u.label=r.name[i];p.push(u);}return p;}var o=this.getData();var p=n();var S={workbook:{columns:p},dataSource:o,fileName:s+".xlsx"};var q=new sap.ui.export.Spreadsheet(S);q.build();};sap.apf.ui.representations.table.prototype.onChartSwitch=function(){this.resetPaginationForTable();};sap.apf.ui.representations.table.prototype.destroy=function(){if(this.orderby){this.orderby=null;}if(this.oParameter){this.oParameter=null;}if(this.oViewSettingDialog){this.oViewSettingDialog.destroy();}if(this.aDataResponse){this.aDataResponse=null;}if(this.aValidatedFilter){this.aValidatedFilter=[];}if(this.aFiltersInTable){this.aFiltersInTable=[];}};}());
