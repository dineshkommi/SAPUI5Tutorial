/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/rules/ui/library","sap/ui/core/Control","sap/ui/layout/form/SimpleForm","sap/m/Label","sap/m/Switch","sap/m/Select","sap/m/MessageBox","sap/m/Table","sap/m/Column","sap/m/Text","sap/m/Input","sap/m/Button","sap/m/ComboBox","sap/rules/ui/ExpressionAdvanced","sap/ui/layout/VerticalLayout","sap/rules/ui/type/Expression"],function(q,l,C,S,L,a,b,M,T,c,d,I,B,f,E,V,g){"use strict";var t=C.extend("sap.rules.ui.TextRuleSettings",{metadata:{library:"sap.rules.ui",properties:{modelName:{type:"string",defaultValue:""},newTextRule:{type:"boolean",defaultValue:false}},aggregations:{mainLayout:{type:"sap.ui.layout.form.SimpleForm",multiple:false}},defaultAggregation:"mainLayout",associations:{expressionLanguage:{type:"sap.rules.ui.services.ExpressionLanguage",multiple:false,singularName:"expressionLanguage"}}}});sap.rules.ui.TextRuleSettings.prototype._callRefreshResultsFunctionImport=function(){var h=this;var o=this.getModel("oDataModel");var m=this.getModel("TextRuleModel").getData();var i={groupId:"changes"};o.setDeferredGroups([i.groupId]);var s=function(r){h._createPredefinedTable();h._internalModel.setProperty("/needToRefresh",false);};var j=function(e){sap.m.MessageToast.show(e);};var k=function(r){var R=m.ruleId;o.callFunction("/RefreshRuleResultDataObject",{method:"POST",groupId:i.groupId,urlParameters:{RuleId:R}});o.submitChanges({groupId:i.groupId,success:s,error:j});};if(this._internalModel.getProperty("/needToRefresh")){k();}};sap.rules.ui.TextRuleSettings.prototype._createInfoMessageStrip=function(e,h){var m=new sap.m.MessageStrip({visible:true,id:h,text:e,type:sap.ui.core.MessageType.Information,showIcon:true,showCloseButton:true}).addStyleClass("sapTextRuleSettingsMessageStrip");return m;};sap.rules.ui.TextRuleSettings.prototype._createLayout=function(){if(!this.oForm){this._destroyElements();this.oForm=new S("_formLayout",{editable:true,layout:"ResponsiveGridLayout",maxContainerCols:1,columnsL:1,columnsM:1,labelSpanM:1,content:[new L({text:this.oBundle.getText("output")}).setTooltip(this.oBundle.getText("output")),new sap.ui.layout.HorizontalLayout({content:[new b("__resultSelect",{width:"220px",items:{path:"settingModel>/results/resultsEnumeration",template:new sap.ui.core.Item({key:"{settingModel>Id}",text:"{settingModel>Name}"})},selectedKey:"{/ResultDataObjectId}",change:function(e){var s=e.getSource();var m=this.getModel().getData();if(m.ResultDataObjectStatus!="C"){m.ResultDataObjectId=s.getSelectedKey();m.ResultDataObjectName=s._getSelectedItemText();m.ResultDataObjectStatus="U";if(m.ResultDataObjectId!=s.getSelectedKey()){this._updateRefreshFlags(false,false);}}this._internalModel.setProperty("/resultDataObjectChanged",true);this._createPredefinedTable();}.bind(this)}),this._createRefreshButton()]}),new L(),this._createPredefinedResultsLayout()]}).addStyleClass("sapTextRuleSettingsForm");}this.oForm.setBusyIndicatorDelay(0);return this.oForm;};sap.rules.ui.TextRuleSettings.prototype._createPredefinedResultsLayout=function(){var r=false;var s=this.getModel("oDataModel").sServiceUrl;if(s=="/rules-service/rule_srv"){r=true;}if(r){var v=this._createVerticalLayout();return v;}else{return new L();}};sap.rules.ui.TextRuleSettings.prototype._createPredefinedTable=function(){if(!this.oPredefinedTable){this.oPredefinedTable=new T("idPredefinedTable",{backgroundDesign:sap.m.BackgroundDesign.Solid,showSeparators:sap.m.ListSeparators.All,swipeDirection:sap.m.SwipeDirection.Both,fixedLayout:true,layoutData:new sap.ui.layout.form.GridContainerData({halfGrid:false}),columns:[new c({width:"45%",header:new sap.m.Label({text:"Text Rule Results",design:sap.m.LabelDesign.Bold})}),new c({width:"25%",header:new sap.m.Label({text:"Access",design:sap.m.LabelDesign.Bold})}),new c({width:"45%",header:new sap.m.Label({text:"Value",design:sap.m.LabelDesign.Bold})})]});}var r=this._internalModel.getProperty("/resultDataObjectChanged");var R=this._internalModel.getProperty("/refreshButtonClicked");var m=this.getModel("oDataModel");if(!r&&!R){this.oPredefinedTable.setModel(m);var e=[this.getModel("TextRuleModel").getProperty("/ruleBindingPath"),"/TextRule/TextRuleResults"].join("");this.oPredefinedTable.bindItems({path:e,factory:this._tableFactory.bind(this)});this.oPredefinedTable.setBusyIndicatorDelay(0);return this.oPredefinedTable;}else{this._updatePredefinedTable(this.getModel().getData());}return null;};sap.rules.ui.TextRuleSettings.prototype._createRefreshButton=function(){var _=function(){this._internalModel.setProperty("/refreshButtonEnabled",true,null,true);return this.oBundle.getText("textRuleRefreshWarning");}.bind(this);var e=function(){this._updateRefreshFlags(true,false);}.bind(this);var h=_();var i=function(){var j=h;M.warning(j,{title:this.oBundle.getText("refeshResultWarningTitle"),actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],onClose:function(A){if(A===sap.m.MessageBox.Action.OK){e();}}});}.bind(this);var r=new B({layoutData:new sap.ui.layout.ResponsiveFlowLayoutData({weight:1}),icon:sap.ui.core.IconPool.getIconURI("synchronize"),width:"3rem",type:sap.m.ButtonType.Transparent,text:"",press:i,visible:true,enabled:"{settingModel>/refreshButtonEnabled}"}).setTooltip(this.oBundle.getText("refreshBtn"));this.refreshButton=r;return r;};sap.rules.ui.TextRuleSettings.prototype._createVerticalLayout=function(){var v=new sap.ui.layout.VerticalLayout("verticalLayout",{content:[this._createInfoMessageStrip(this.oBundle.getText("TRPredefinedMessageStripHiddenAccessInfoText"),"id_HiddenAccessMessageStrip"),this._createInfoMessageStrip(this.oBundle.getText("TRPredefinedMessageStripEditableAccessInfoText"),"id_EditableAccessMessageStrip"),this._createPredefinedTable()]});return v;};sap.rules.ui.TextRuleSettings.prototype._destroyElements=function(){if(sap.ui.getCore().byId("_formLayout")){sap.ui.getCore().byId("_formLayout").destroy();}if(sap.ui.getCore().byId("__elseCheckBox")){sap.ui.getCore().byId("__elseCheckBox").destroy();}if(sap.ui.getCore().byId("__resultSelect")){sap.ui.getCore().byId("__resultSelect").destroy();}if(sap.ui.getCore().byId("id_HiddenAccessMessageStrip")){sap.ui.getCore().byId("id_HiddenAccessMessageStrip").destroy();}if(sap.ui.getCore().byId("id_EditableAccessMessageStrip")){sap.ui.getCore().byId("id_EditableAccessMessageStrip").destroy();}if(sap.ui.getCore().byId("idPredefinedTable")){sap.ui.getCore().byId("idPredefinedTable").destroy();}};sap.rules.ui.TextRuleSettings.prototype._getAccessOptions=function(){var A={accessEnumration:[{key:"editableAccess",value:"Editable"},{key:"hiddenAccess",value:"Hidden"}]};return A;};sap.rules.ui.TextRuleSettings.prototype._getCurrentResult=function(){var m=this.getModel().getData();var e=this.getModel("TextRuleModel").getData();var h={Id:e.ruleId,Version:e.ruleVersion};var D=this.getModel("oDataModel");var p=D.createKey("/Rules",h);m.ResultDataObjectId=D.getProperty(p+"/ResultDataObjectId");m.ResultDataObjectName=D.getProperty(p+"/ResultDataObjectName");m.ResultDataObjectStatus="A";this._internalModel.getData("/results/resultsEnumeration").results.resultsEnumeration.splice(0,1);};sap.rules.ui.TextRuleSettings.prototype._getPredefinedExpressionAdvanced=function(o,e,h,i){var j=sap.ui.getCore().byId(this.getExpressionLanguage());var s=i?i:sap.rules.ui.ExpressionType.NonComparison;return new E({expressionLanguage:j,placeholder:this.oBundle.getText("expressionPlaceHolder"),validateOnLoad:true,id:e,type:s,value:h,editable:true,change:function(k){var m=k.getSource();var o=m.getBindingContext();o.getModel().setProperty(o.getPath()+"/Expression",m.getValue());this._internalModel.setProperty("/resultAttributeChanged",true);this._updateResultAttributeJSON(o,false,null,m.getValue());}.bind(this)});};sap.rules.ui.TextRuleSettings.prototype._getResultsData=function(){var e=this;var h=this.getProperty("newTextRule");var m=this.getModel("oDataModel");var r=this.getModel("TextRuleModel").getData();var H={Id:r.projectId,Version:r.projectVersion};var i=[m.createKey("/Projects",H),"/DataObjects"].join("");m.read(i,{success:function(j){e._readSuccess(j,h);},error:function(){console.log("Error reading DO");}});};sap.rules.ui.TextRuleSettings.prototype._getSelectedVisibilityStatus=function(A){if(A=="Hidden"){return"hiddenAccess";}else{return"editableAccess";}};sap.rules.ui.TextRuleSettings.prototype._initSettingsModel=function(r){var i={};i.predefinedResults=[];i.results=r;i.accessOptions=this._getAccessOptions();this._internalModel=new sap.ui.model.json.JSONModel(i);this.setModel(this._internalModel,"settingModel");};sap.rules.ui.TextRuleSettings.prototype._readSuccess=function(e,h){if(e){var r={resultsEnumeration:e.results};r.resultsEnumeration.unshift({Id:"0",Name:""});this._initSettingsModel(r);if(h){this._setDefaultResult();}else{this._getCurrentResult();}if(this.needCreateLayout){var i=this.getAggregation("mainLayout");if(i){i.destroy();}i=this._createLayout();this.setAggregation("mainLayout",i);this.needCreateLayout=false;}}};sap.rules.ui.TextRuleSettings.prototype._setDefaultResult=function(){var m=this.getModel().getData();var r=this._internalModel.getProperty("/results/resultsEnumeration");if(r.length>0){m.ResultDataObjectId=r[0].Id;m.ResultDataObjectName=r[0].Name;m.ResultDataObjectStatus="A";}};sap.rules.ui.TextRuleSettings.prototype._setColumnAccessMode=function(o,e){var s=e.getSource();var h="exp"+e.getSource().sId.split("select")[1];var i=sap.ui.getCore().byId(h);var j=s.getSelectedKey();if(j==="hiddenAccess"){o.getModel().setProperty(o.getPath()+"/AccessMode","Hidden");o.getModel().setProperty(o.getPath()+"/Expression","");i.setValue("");i.setValueStateText(this.oBundle.getText("defaultValue"));this._updateResultAttributeJSON(o,false,"Hidden",null);}else{o.getModel().setProperty(o.getPath()+"/AccessMode","Editable");this._updateResultAttributeJSON(o,false,"Editable",null);}this._internalModel.setProperty("/resultAttributeChanged",true);};sap.rules.ui.TextRuleSettings.prototype._tableFactory=function(i,o){var e=i.split("-")[1];var h="exp"+e;var j=o.getProperty("DataObjectAttributeName")?o.getProperty("DataObjectAttributeName"):o.getProperty("Name");var k=o.getProperty("DataObjectAttributeId")?o.getProperty("DataObjectAttributeId"):o.getProperty("Id");var m;var n=o.getProperty("BusinessDataType");var s;var A=this._internalModel.getProperty("/predefinedResults");if(this._internalModel.getProperty("/resultDataObjectChanged")){this._updateResultAttributeJSON(o,true,"Editable","");s="Editable";m="";}else if(this._internalModel.getProperty("/refreshButtonClicked")){var p=A[k];s=p?p.AccessMode:"Editable";m=p?p.Expression:"";this._updateResultAttributeJSON(o,false,s,m);}else{m=o.getProperty("Expression");s=o.getProperty("AccessMode");this._updateResultAttributeJSON(o,false,s,m);}var r=this._getSelectedVisibilityStatus(s);return new sap.m.ColumnListItem({visible:true,cells:[new sap.m.Label({visible:true,design:sap.m.LabelDesign.Standard,text:j,textAlign:sap.ui.core.TextAlign.Begin,textDirection:sap.ui.core.TextDirection.Inherit}),new sap.m.Select({width:"65%",id:"select"+e,items:{path:"settingModel>/accessOptions/accessEnumration",template:new sap.ui.core.Item({key:"{settingModel>key}",text:"{settingModel>value}"})},selectedKey:r,change:function(u){this._setColumnAccessMode(o,u);}.bind(this)}),this._getPredefinedExpressionAdvanced(o,h,m,n)]});};sap.rules.ui.TextRuleSettings.prototype._updatePredefinedTable=function(r){if(this._internalModel.getProperty("/resultDataObjectChanged")){this._internalModel.setProperty("/predefinedResults",[]);}var D=this.getModel("oDataModel");var e=this._internalModel.getProperty("/results/resultsEnumeration");var h;for(var i=0;i<e.length;i++){if(e[i].Id==r.ResultDataObjectId){h=e[i].Version;break;}}var j=this.getModel("TextRuleModel").getData();var H={Id:j.projectId,Version:j.projectVersion};var p=D.createKey("/Projects",H);H={Id:r.ResultDataObjectId,Version:h};var s=[p,D.createKey("/DataObjects",H),"/DataObjectAttributes"].join("");this.oPredefinedTable.setModel(D);this.oPredefinedTable.bindItems({path:s,factory:this._tableFactory.bind(this)});this.oPredefinedTable.setBusyIndicatorDelay(0);return this.oPredefinedTable;};sap.rules.ui.TextRuleSettings.prototype._updateRefreshFlags=function(n,i){this._internalModel.setProperty("/needToRefresh",n);this._internalModel.setProperty("/refreshButtonEnabled",i,null,true);this._internalModel.setProperty("/refreshButtonClicked",true);this._callRefreshResultsFunctionImport();};sap.rules.ui.TextRuleSettings.prototype._updateResultAttributeJSON=function(o,r,A,e){var i=this._internalModel.getProperty("/refreshButtonClicked");var s=o.getProperty("DataObjectAttributeId")?o.getProperty("DataObjectAttributeId"):o.getProperty("Id");if(this._internalModel.getProperty("/predefinedResults")){if(this._internalModel.getProperty("/predefinedResults/"+s)){if(r){this._internalModel.setProperty("/predefinedResults/"+s+"/AccessMode","Editable");this._internalModel.setProperty("/predefinedResults/"+s+"/Expression","");}if(i){this._internalModel.setProperty("/predefinedResults/"+s,o.getObject(o.sPath));this._internalModel.setProperty("/predefinedResults/"+s+"/isAttributeinBackend",true);}if(A){this._internalModel.setProperty("/predefinedResults/"+s+"/AccessMode",A);}if(e||e==""){this._internalModel.setProperty("/predefinedResults/"+s+"/Expression",e);}}else{this._internalModel.setProperty("/predefinedResults/"+s,o.getObject(o.sPath));if(r){this._internalModel.setProperty("/predefinedResults/"+s+"/AccessMode","Editable");this._internalModel.setProperty("/predefinedResults/"+s+"/Expression","");}if(i){this._internalModel.setProperty("/predefinedResults/"+s+"/AccessMode",A);this._internalModel.setProperty("/predefinedResults/"+s+"/Expression",e);this._internalModel.setProperty("/predefinedResults/"+s+"/isAttributeinBackend",true);}}}};sap.rules.ui.TextRuleSettings.prototype.getButtons=function(D){var e=[];var o=new B({text:this.oBundle.getText("cancelBtn")}).setTooltip(this.oBundle.getText("cancelBtn"));o.attachPress(function(){D.close();},this);var A=new B({text:this.oBundle.getText("applyChangesBtn")}).setTooltip(this.oBundle.getText("applyChangesBtn"));A.attachPress(function(){this._applySettingsModelChangesToOData(D);},this);e.push(A);e.push(o);return e;};sap.rules.ui.TextRuleSettings.prototype.init=function(){this.oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.rules.ui.i18n");this.needCreateLayout=true;this.firstLoad=true;this.setBusyIndicatorDelay(0);};sap.rules.ui.TextRuleSettings.prototype.onBeforeRendering=function(){if(this.firstLoad){this._getResultsData();this.firstLoad=false;}};sap.rules.ui.TextRuleSettings.prototype._applySettingsModelChangesToOData=function(D){var _=this.getModel();var o=this.getModel("oDataModel");var e=this.getModel("TextRuleModel");var s=this._internalModel;var r=e.getProperty("/ruleId");var R=e.getProperty("/ruleVersion");var h=_.getProperty("/ResultDataObjectId");var j=s.getProperty("/resultDataObjectChanged");var A=s.getProperty("/resultAttributeChanged");var k={groupId:"changes"};var m=false;var n=this.getProperty("newTextRule");var p=function(){D.setState(sap.ui.core.ValueState.Success);D.close();};o.setDeferredGroups([k.groupId]);var u=function(){var F=s.getProperty("/predefinedResults");for(var G in F){if(!F[G].isAttributeinBackend){var H={RuleId:F[G].RuleId,RuleVersion:F[G].RuleVersion,Id:F[G].Id};var J=o.createKey("/TextRuleResults",H);var K=new sap.ui.model.Context(o,J);o.deleteCreatedEntry(K);var N=e.getProperty("/textRuleResultExpressions");for(var i=0;i<N.length;i++){if(N[i].ResultId==F[G].Id){var O={RuleId:F[G].RuleId,RuleVersion:F[G].RuleVersion,ResultId:F[G].Id,ConditionId:N[i].ConditionId};J=o.createKey("/TextRuleResultExpressions",O);K=new sap.ui.model.Context(o,J);o.deleteCreatedEntry(K);}}}}};var v=function(){var P={};var i={RuleId:r,RuleVersion:R};var F=o.createKey("/TextRules",i);if(!o.getData(F)){P.properties=i;o.createEntry("/TextRules",P);}var G={RuleId:r,RuleVersion:R,Sequence:1};P.properties=G;o.createEntry("/TextRuleBranches",P);};var w=function(){var i=s.getProperty("/predefinedResults");if(i){var F;for(F in i){var G=i[F].AccessMode;var H=i[F].Expression?i[F].Expression:"";o.callFunction("/SetPredefinedResultAttributes",{method:"POST",groupId:k.groupId,urlParameters:{RuleId:r,DataObjectAttributeId:F,AccessMode:G,Expression:H}});}}};var x=function(){o.callFunction("/SetRuleResultDataObject",{method:"POST",groupId:k.groupId,urlParameters:{RuleId:r,ResultDataObjectId:h}});};var y=function(){o.callFunction("/RefreshRuleResultDataObject",{method:"POST",groupId:k.groupId,urlParameters:{RuleId:r}});};if(s.getProperty("/refreshButtonClicked")){u();}if(!j&&A){m=true;w();}else if(j){m=true;x();w();}var z=s.getProperty("/needToRefresh");if(z){m=true;y();}if(n){m=true;v();}var P={};P.success=p;P.groupId=k.groupId;if(m){o.submitChanges(P);return;}D.setState(sap.ui.core.ValueState.Success);D.close();};return t;},true);
