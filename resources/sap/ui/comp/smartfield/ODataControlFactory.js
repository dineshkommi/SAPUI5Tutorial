/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/comp/library","sap/m/TextArea","sap/m/Link","sap/m/CheckBox","sap/m/ComboBox","sap/m/DatePicker","sap/m/DateTimePicker","sap/m/FlexItemData","sap/m/FlexJustifyContent","sap/m/HBox","sap/m/Input","sap/m/InputType","sap/m/Select","sap/m/Text","sap/ui/core/Renderer","sap/ui/core/TextAlign","sap/ui/comp/navpopover/SmartLink","./ControlFactoryBase","./FieldControl","./ODataControlSelector","./ODataHelper","./ODataTypes","sap/m/ObjectNumber","sap/m/ObjectIdentifier","sap/m/ObjectStatus","sap/ui/core/ValueState","sap/m/TimePicker","sap/ui/comp/navpopover/SemanticObjectController","sap/ui/comp/util/FormatUtil","sap/ui/comp/smartfield/type/TextArrangementString","sap/ui/comp/odata/MetadataAnalyser"],function(q,l,T,L,C,a,D,b,F,c,H,I,d,S,e,R,f,g,h,i,O,j,k,m,o,p,V,r,s,t,u,M){"use strict";var v=l.smartfield.TextInEditModeSource;var w=h.extend("sap.ui.comp.smartfield.ODataControlFactory",{constructor:function(n,P,x){h.apply(this,[n,P]);this.sName="ODataControlFactory";this._oMetaData={annotations:{}};this._oMeta=x;this._oHelper=new j(n,this._oBinding);this._oFieldControl=new i(P,this._oHelper);this._oTypes=new k(P);this._oSelector=new O(this._oMetaData,P,this._oTypes);this._bInitialized=false;this.bPending=false;}});w.prototype._init=function(n){this._oMetaData.model=n.model;this._oMetaData.path=n.path;this._oMetaData.entitySet=n.entitySetObject||this._oHelper.oMeta.getODataEntitySet(n.entitySet);this._oMetaData.entityType=n.entityType||this._oHelper.oMeta.getODataEntityType(this._oMetaData.entitySet.entityType);this._oMetaData.navigationPath=n.navigationPath||null;if(this._oModel){this._oHelper.checkNavigationProperty(this._oMetaData,this._oParent);this._oHelper.getProperty(this._oMetaData);var x=this.getEdmProperty();if(x){if(this._oParent&&this._oParent.getExpandNavigationProperties()){var y=this._oParent.getBindingContext();var z=y.getObject().__metadata.created;if(!z){var A=this._oHelper.getAutoExpandProperties(x);if(A.length>0){this._oParent.bindElement({path:"",parameters:{expand:A,select:A}});}}}this._oMetaData.annotations.text=this._oHelper.getTextProperty2(this._oMetaData);this._oMetaData.annotations.uom=this._oHelper.getUnitOfMeasure2(this._oMetaData);this._oHelper.getValueListData(this._oMetaData);this._oMetaData.annotations.lineitem=this._oHelper.getAnalyzer().getLineItemAnnotation(this._oMetaData.entitySet.entityType);this._oHelper.getUOMValueListAnnotationPath(this._oMetaData);this._oMetaData.annotations.semantic=M.getSemanticObjectsFromProperty(x);this._oMetaData.annotations.semanticKeys=this._oHelper.getAnalyzer().getSemanticKeyAnnotation(this._oMetaData.entitySet.entityType);if(this._oMetaData.annotations.uom){this._oMetaData.annotations.uom.annotations={};this._oHelper.getValueListData(this._oMetaData.annotations.uom);}this._oHelper.getUOMTextAnnotation(this._oMetaData);}else{q.sap.log.warning("SmartField: Property "+n.path+" does not exist","SmartField: Property "+n.path+" does not exist","sap.ui.comp.smartfield.ODataControlFactory");}}else{this._oMetaData.modelObject=n.modelObject;this._oMetaData.property=n.property;this._oMetaData.property.valueListAnnotation=null;this._oMetaData.property.valueListKeyProperty=null;this._oMetaData.property.valueListEntitySet=null;this._oMetaData.property.valueListEntityType=null;this._oMetaData.annotations.text=n.annotations.text;this._oMetaData.annotations.uom=n.annotations.uom;if(this._oMetaData.annotations.uom&&!this._oMetaData.annotations.uom.annotations){this._oMetaData.annotations.uom.annotations={};}this._oMetaData.annotations.valuelist=n.annotations.valuelist;this._oMetaData.annotations.valuelistType=n.annotations.valuelistType;this._oMetaData.annotations.lineitem=n.annotations.lineitem;this._oMetaData.annotations.semantic=n.annotations.semantic;this._oMetaData.annotations.valuelistuom=n.annotations.valuelistuom;}};w.prototype._initValueList=function(n){if(!n){return null;}var x=this._oMetaData.property,y=n.primaryValueListAnnotation;this._oMetaData.annotations.valueListData=y;x.valueListAnnotation=y;x.valueListKeyProperty=y.fields.find(function(z){return z.name===y.keyField;});x.valueListEntitySet=this._oHelper.oMeta.getODataEntitySet(y.valueListEntitySetName);x.valueListEntityType=this._oHelper.oMeta.getODataEntityType(this._oHelper.oMeta.getODataEntitySet(y.valueListEntitySetName).entityType);};w.prototype._createEdmDisplay=function(){var n,x,y,z,A=this,N={width:true,textAlign:true},B=this.getEdmProperty();if(B){z=this._oHelper.oAnnotation.getText(B);}var E=this._oParent.data("configdata");var G=((E&&(E.isInnerControl!==true))||this._oParent.isContextTable());var J=this._oSelector.checkComboBox(G);if(J.combobox&&(this._oParent.getFetchValueListReadOnly()||(z===undefined))){return this._createComboBox({annotation:J.annotation,noDialog:true,noTypeAhead:true},true);}if(this._checkLink()&&!this._oSelector.useObjectIdentifier()){return this._createLink();}var K=this.createAttributes(null,this._oMetaData.property,N);var P=this._oSelector.checkDatePicker();if(P){var Q=this.getFormatSettings("dateFormatSettings");K.text={model:this._oMetaData.model,path:this._oMetaData.path,type:this._oTypes.getType(this._oMetaData.property,Q,{displayFormat:"Date"})};}else{K.text={model:this._oMetaData.model,path:this._oHelper.getEdmDisplayPath(this._oMetaData),type:this._oTypes.getType(this._oMetaData.property)};}if(B){x=this._oHelper.oAnnotation.isMasked(B);if(x){K.text.formatter=k.formatMask;}if(z){y=this._oSelector.useObjectIdentifier(P,x);if(y){delete K.width;delete K.textAlign;K.text={path:this._oMetaData.path};K.title={path:this._oHelper.getEdmDisplayPath(this._oMetaData)};if(this._oParent.hasListeners("press")){K.titleActive=true;K.titlePress=function(X){A._oParent.firePress(X);};}else if(this._oMetaData.annotations.semantic&&this._oMetaData.annotations.semantic.defaultSemanticObject){var U;var W;s.getDistinctSemanticObjects().then(function(X){U=s.hasDistinctSemanticObject(A._oMetaData.annotations.semantic.defaultSemanticObject,X);if(U){var Y=A._oParent.getBindingInfo("value");var Z=Y.parts[0].path;var $=A._oHelper.oAnnotation.getLabel(A._oMetaData.property.property);if(A._oMetaData.annotations.lineitem&&A._oMetaData.annotations.lineitem.labels&&A._oMetaData.annotations.lineitem.labels[Z]){$=A._oMetaData.annotations.lineitem.labels[Z];}q.sap.require("sap.ui.comp.navpopover.NavigationPopoverHandler");W=new sap.ui.comp.navpopover.NavigationPopoverHandler({semanticObject:A._oMetaData.annotations.semantic.defaultSemanticObject,additionalSemanticObjects:A._oMetaData.annotations.semantic.additionalSemanticObjects,semanticObjectLabel:$,fieldName:Z,navigationTargetsObtained:function(_){var a1=sap.ui.getCore().byId(_.getSource().getControl());var b1=_.getParameters().mainNavigation;if(b1){b1.setDescription(a1.getText());}_.getParameters().show(a1.getTitle(),b1,undefined,undefined);}});}});K.titleActive={path:"$sapuicompsmartfield_distinctSO>/distinctSemanticObjects/"+this._oMetaData.annotations.semantic.defaultSemanticObject,formatter:function(X){return!!X;}};K.titlePress=function(X){if(U&&W){W.setControl(X.getSource(X.getParameter("domRef")));W.openPopover();}};}}else if(!(E&&(E.isInnerControl===true))){K.text={};K.text.parts=[];K.text.parts.push(this._oMetaData.path);K.text.parts.push(this._oHelper.getEdmDisplayPath(this._oMetaData));K.text.formatter=function(X,Y){if(J&&J.combobox){return A._formatDisplayBehaviour("defaultComboBoxReadOnlyDisplayBehaviour",X,Y);}else{return A._formatDisplayBehaviour("defaultInputFieldDisplayBehaviour",X,Y);}};}}else if(this._oSelector.checkCheckBox()){K.text.formatter=function(X){return A._formatDisplayBehaviour("defaultCheckBoxDisplayBehaviour",X);};}}if(y){n=new o(this._oParent.getId()+"-objIdentifier",K);if(this._oMetaData.annotations.semantic){n.setModel(s.getJSONModel(),"$sapuicompsmartfield_distinctSO");}}else{if(K.text.type&&(K.text.type instanceof sap.ui.comp.smartfield.type.DateTime)&&K.text.type.oConstraints&&K.text.type.oConstraints.isDateOnly){K.wrapping=false;}if(this._oParent.isContextTable()&&sap.ui.getCore().getConfiguration().getRTL()){K.textDirection="LTR";}n=new e(this._oParent.getId()+"-text",K);}if(!y&&E&&E.configdata&&E.configdata.onText){E.configdata.onText(n);}return{control:n,onCreate:"_onCreate",params:{noValidations:true}};};w.prototype._createEdmTime=function(){var n={width:true,placeholder:true,valueState:true,valueStateText:true};var A=this.createAttributes("value",this._oMetaData.property,n,{event:"change"});A.valueFormat="HH:mm:ss";if(A.width===""){A.width="100%";}var x=new r(this._oParent.getId()+"-timePicker",A);return{control:x,onCreate:"_onCreate",params:{getValue:"getValue",type:{type:A.value.type,property:this._oMetaData.property}}};};w.prototype._createObjectStatus=function(){var A,n,x;A=this.createAttributes(null,this._oMetaData.property,null);n=this._oHelper.oAnnotation.getText(this.getEdmProperty());if(n){A.text={parts:[]};A.text.parts.push(this._oHelper.getEdmDisplayPath(this._oMetaData));}else{A.text={model:this._oMetaData.model,path:this._oMetaData.path,type:this._oTypes.getType(this._oMetaData.property)};}this._addObjectStatusAttributes(A);x=new p(this._oParent.getId()+"-objStatus",A);return{control:x,onCreate:"_onCreate",params:{getValue:"getText",noValidation:true}};};w.prototype._addObjectStatusAttributes=function(A){var n,P=this._oParent.getControlProposal(),x=P.getObjectStatus();if(x){n=x.getBindingInfo("criticality");}var y=function(B){var E={0:V.None,1:V.Error,2:V.Warning,3:V.Success};var G={"com.sap.vocabularies.UI.v1.CriticalityType/Neutral":V.Neutral,"com.sap.vocabularies.UI.v1.CriticalityType/Negative":V.Warning,"com.sap.vocabularies.UI.v1.CriticalityType/Critical":V.Error,"com.sap.vocabularies.UI.v1.CriticalityType/Positive":V.Success};return G[B]||E[B]||V.None;};var z=function(){var B,E={"Error":"sap-icon://status-negative","Warning":"sap-icon://status-critical","Success":"sap-icon://status-positive","None":"sap-icon://status-inactive"};if(n){if(n.formatter){B=n.formatter.apply(null,arguments);}else{B=arguments[0];}}else{B=x.getCriticality();}if((B===undefined)||(B===null)){return null;}return E[y(B)];};if(n){A.state={formatter:function(){var B;if(n.formatter){B=n.formatter.apply(null,arguments);}else{B=arguments[0];}return y(B);},parts:n.parts};if(x.getCriticalityRepresentationType()!==sap.ui.comp.smartfield.CriticalityRepresentationType.WithoutIcon){A.icon={formatter:z,parts:n.parts};}}else{if(x){A.state=y(x.getCriticality());if(x.getCriticalityRepresentationType()!==sap.ui.comp.smartfield.CriticalityRepresentationType.WithoutIcon){A.icon=z();}}else{A.icon=z();}}};w.prototype._createEdmString=function(){var A,n={width:true,textAlign:true,placeholder:true,tooltip:true,name:true,valueState:true,valueStateText:true};if(this._oSelector.checkCheckBox()){return this._createCheckBox();}var x=this._oSelector.checkSelection();if(x.selection){return this._createSelect({annotation:x.annotation,noDialog:true,noTypeAhead:true});}x=this._oSelector.checkComboBox();if(x.combobox){return this._createComboBox({annotation:x.annotation,noDialog:true,noTypeAhead:true});}var E=this.getEdmProperty();if(E){if(this._oHelper.oAnnotation.isMultiLineText(E)){delete n["width"];return this._createMultiLineText(n);}}var y=this._oParent.isTextInEditModeSourceValid();if(y){}if(y&&(E.type==="Edm.String")){A=this.createAttributes("",this._oMetaData.property,n);A.value={model:this._oMetaData.model,type:this._oTypes.getType(this._oMetaData.property,null,null,{composite:true}),parts:[{path:this._oMetaData.path},{path:this._getTextPath()}]};}else{A=this.createAttributes("value",this._oMetaData.property,n);}var z=new I(this._oParent.getId()+"-input",A);if(E){if(this._oHelper.oAnnotation.isMasked(E)){z.setType(d.Password);}this._handleEventingForEdmString(z,this._oMetaData.property);}var B=this._oParent.data("configdata");if(B&&B.configdata&&B.configdata.onInput){B.configdata.onInput(z);}return{control:z,onCreate:"_onCreate",params:{valuehelp:{annotation:x.annotation,noDialog:!this._oParent.getShowValueHelp(),noTypeAhead:!this._oParent.getShowSuggestion(),aggregation:"suggestionRows"},getValue:"getValue",type:{type:A.value.type,property:this._oMetaData.property}}};};w.prototype._getTextPath=function(){switch(this._oParent.getTextInEditModeSource()){case v.NavigationProperty:return this._oHelper.getEdmDisplayPath(this._oMetaData);case v.ValueList:return this._oHelper.getTextPathFromValueList(this._oMetaData);case v.None:return"";}};w.prototype._getMaxLength=function(){return this._oTypes.getMaxLength(this._oMetaData.property,this._oParent.getBindingInfo("value"));};w.prototype._addAriaLabelledBy=function(n){var x,y,z;if((this._oParent.getControlContext()===sap.ui.comp.smartfield.ControlContextType.None)||(this._oParent.getControlContext()===sap.ui.comp.smartfield.ControlContextType.Form)||(this._oParent.getControlContext()===sap.ui.comp.smartfield.ControlContextType.SmartFormGrid)){h.prototype._addAriaLabelledBy.apply(this,arguments);z=this._oParent.data("configdata");if(z&&z.configdata.isInnerControl&&z.configdata.isUOM){if(n){y=n.control;if(y instanceof H){if(y.getItems().length>0){y=y.getItems()[0];}}}if(y&&y.getAriaLabelledBy&&y.getAriaLabelledBy().length===0){var E=this.getEdmProperty();if(this._oHelper.oAnnotation.getLabel(E)){q.sap.require("sap.ui.core.InvisibleText");x=new sap.ui.core.InvisibleText({text:this._oHelper.oAnnotation.getLabel(E)});y.addAriaLabelledBy(x);this._oParent.addAggregation("_ariaLabelInvisibleText",x);}}}}};w.prototype._handleEventingForEdmString=function(n,P){if(!n){return;}var U=this._oHelper.oAnnotation.isUpperCase(P.property),x=this;n.attachChange(function onTextInputFieldChange(y){var N={},z=y&&y.getParameters();if(z){var A=z.value;if(U&&A){A=A.toUpperCase();n.setValue(A);}N.value=A;N.newValue=A;if(z.validated){N.validated=z.validated;}if(n._oSuggestionPopup&&n._oSuggestionPopup.isOpen()){if(!z.validated){if(n._iPopupListSelectedIndex>=0){return;}}}try{var B=x._oParent;if(B.isTextInEditModeSourceValid()){var E=B.getBinding("value");B.bWaitingForValueValidation=E&&(A!==E.getValue());}else{B.fireChange(N);}}catch(G){q.sap.log.error(G);}}});};w.prototype._createComboBox=function(n,x){var y=null,z,A,N={width:true,textAlign:true,placeholder:true,tooltip:true,name:true};z=this._oParent.data("configdata");A=this.createAttributes("selectedKey",this._oMetaData.property,N);A.selectionChange=this._oHelper.getSelectionChangeHandler(this._oParent);A.change=function(E){if(E.getParameter("itemPressed")){return;}var B=E.getSource().getSelectedKey();this._oParent.fireChange({value:B,newValue:B});}.bind(this);if(A.width===""){A.width="100%";}if(x){y=this._createDisplayedComboBox(A);}else{y=new a(this._oParent.getId()+"-comboBoxEdit",A);}if(z&&z.configdata&&z.configdata.onText){z.configdata.onText(y);}return{control:y,onCreate:"_onCreate",params:{valuehelp:{annotation:n.annotation,aggregation:"items",noDialog:n.noDialog,noTypeAhead:n.noTypeAhead},getValue:"getSelectedKey",type:{type:A.selectedKey.type,property:this._oMetaData.property}}};};w.prototype._createDisplayedComboBox=function(A){var n=a.extend("sap.ui.comp.smartfield.DisplayComboBox",{metadata:{library:"sap.ui.comp"},renderer:function(x,y){var W=y.getWidth(),z=y.getValue(),B=y.getTextDirection(),E=y.getTextAlign();z.replace(/\r\n/g,"\n");x.write("<span");x.writeControlData(y);x.addClass("sapMText");x.addClass("sapUiSelectable");if(W){x.addStyle("width",W);}else{x.addClass("sapMTextMaxWidth");}if(B!==sap.ui.core.TextDirection.Inherit){x.writeAttribute("dir",B.toLowerCase());}if(E){E=R.getTextAlign(E,B);if(E){x.addStyle("text-align",E);}}x.writeClasses();x.writeStyles();x.write(">");x.writeEscaped(z);x.write("</span>");},updateDomValue:function(x){if(!this.isActive()){return this;}x=this._getInputValue(x);if(this.$().text()!==x){this.$().text(x);this._bCheckDomValue=true;}return this;},getValue:function(){return this.getProperty("value");},getFocusDomRef:function(){return this.getDomRef();},getEditable:function(){return false;}});return new n(this._oParent.getId()+"-comboBoxDisp",A);};w.prototype._createSelect=function(n){var N={width:true,name:true},A=this.createAttributes("selectedKey",this._oMetaData.property,N);A.change=this._oHelper.getSelectionChangeHandler(this._oParent);A.forceSelection=false;if(A.width===""){A.width="100%";}return{control:new S(this._oParent.getId()+"-select",A),onCreate:"_onCreate",params:{valuehelp:{annotation:n.annotation,aggregation:"items",noDialog:n.noDialog,noTypeAhead:n.noTypeAhead},getValue:"getSelectedKey",type:{type:A.selectedKey.type,property:this._oMetaData.property}}};};w.prototype._createCheckBox=function(){var A=this.createAttributes("selected",null,{},{event:"select",parameter:"selected"});A.editable=(this._oParent.getEditable()&&this._oParent.getEnabled()&&this._oParent.getContextEditable());A.selected.type=this._oTypes.getAbapBoolean();return{control:new C(this._oParent.getId()+"-cBox",A),onCreate:"_onCreate",params:{getValue:"getSelected"}};};w.prototype._createEdmDateTime=function(){var n={width:true,textAlign:true,placeholder:true,name:true},A=this.createAttributes(null,this._oMetaData.property,n,{event:"change",parameter:"value"}),x=this.getFormatSettings("dateFormatSettings");if(this._oSelector.checkDatePicker()){A.value={path:this._oMetaData.path,type:this._oTypes.getType(this._oMetaData.property,x,{displayFormat:"Date"}),model:this._oMetaData.model};if(x&&x.style){A.displayFormat=x.style;}return{control:new D(this._oParent.getId()+"-datePicker",A),onCreate:"_onCreate",params:{getValue:"getValue",type:{type:A.value.type,property:this._oMetaData.property}}};}A.value={path:this._oMetaData.path,model:this._oMetaData.model,type:this._oTypes.getType(this._oMetaData.property,x)};return{control:new b(this._oParent.getId()+"-input",A),onCreate:"_onCreate",params:{getValue:"getValue",type:{type:A.value.type,property:this._oMetaData.property}}};};w.prototype._createEdmDateTimeOffset=function(){var n=this.getFormatSettings("dateFormatSettings");if(n){n.UTC=false;}var N={width:true,textAlign:true,placeholder:true,name:true};var A=this.createAttributes(null,this._oMetaData.property,N,{event:"change",parameter:"value"});A.value={model:this._oMetaData.model,path:this._oMetaData.path,type:this._oTypes.getType(this._oMetaData.property,n)};return{control:new b(this._oParent.getId()+"-input",A),onCreate:"_onCreate",params:{getValue:"getValue",type:{type:A.value.type,property:this._oMetaData.property}}};};w.prototype._createEdmNumeric=function(){var n={width:true,textAlign:true,placeholder:true,name:true},A=this.createAttributes("value",this._oMetaData.property,n,{event:"change",parameter:"value"});if(this._oParent.isContextTable()&&sap.ui.getCore().getConfiguration().getRTL()){A.textDirection="LTR";}return{control:new I(this._oParent.getId()+"-input",A),onCreate:"_onCreate",params:{getValue:"getValue",type:{type:A.value.type,property:this._oMetaData.property}}};};w.prototype._createEdmUOM=function(){var A=this._createEdmUOMAttributes(),n=this._oParent.getObjectBinding(this._oMetaData.model),x=sap.ui.getCore().getConfiguration().getRTL(),y=x&&this._oParent.isContextTable(),z=this._oParent.getId(),B=this,E;this.addObjectBinding(A,n);if(y){A.textDirection="LTR";}var G=new I(z+"-input",A);if(this._oParent.data("suppressUnit")==="true"){var P={getValue:"getValue"};if(!this._oHelper.oAnnotation.isCurrency(this._oMetaData.annotations.uom.property.property)){P.type={type:A.value.type,property:this._oMetaData.property};}return{control:G,onCreate:"_onCreate",params:P};}if(!this._oHelper.oAnnotation.isCurrency(this._oMetaData.annotations.uom.property.property)){E={type:A.value.type,property:this._oMetaData.property};}var J=this._oHelper.getUOMPath(this._oMetaData);A={value:{model:this._oMetaData.model,path:J},change:this._oHelper.getUOMChangeHandler(this._oParent,true),textAlign:this._getEdmUOMTextAlignment()};this.addObjectBinding(A,n);this.mapBindings(A,{"uomEditable":"editable","uomEnabled":"enabled","uomVisible":"visible","mandatory":"mandatory","contextEditable":"contextEditable"});if(this._oParent.getConfiguration()){A.configuration=new sap.ui.comp.smartfield.Configuration({preventInitialDataFetchInValueHelpDialog:this._getPreventInitialDataFetchInVHDialog()});}var K=new sap.ui.comp.smartfield.SmartField(z+"-sfEdit",A);K.data("configdata",{"configdata":{isInnerControl:true,isUOM:!this._oParent.data("configdata"),model:this._oMetaData.model,navigationPath:this._oMetaData.annotations.uom.navigationPath||null,path:J,entitySetObject:this._oMetaData.annotations.uom.entitySet,entityType:this._oMetaData.annotations.uom.entityType,property:this._oMetaData.annotations.uom.property,annotations:{valuelist:this._oMetaData.annotations.valuelistuom,valuelistType:this._oMetaData.annotations.uom.annotations.valuelistType,text:this._oMetaData.annotations.textuom},modelObject:this._oMetaData.modelObject||this._oModel,onText:function(Q){G.setLayoutData(new F({growFactor:1}));K.setLayoutData(new F({shrinkFactor:0,styleClass:"sapUiCompSmartFieldFlexItemUnit"}));if(Q){if(y&&Q.setTextDirection){Q.setTextDirection("LTR");}if((B._oParent.getControlContext()!=="table")&&(B._oParent.getControlContext()!=="responsiveTable")){Q.addStyleClass("sapUiCompSmartFieldUnit");}}},onInput:function(Q){G.setLayoutData(new F({growFactor:1}));K.setLayoutData(new F({growFactor:0,styleClass:"sapUiCompSmartFieldFlexItemUnit"}));if(Q){if(y&&Q.setTextDirection){Q.setTextDirection("LTR");}if(B._oParent&&(B._oParent.getControlContext()!=="table")&&(B._oParent.getControlContext()!=="responsiveTable")){Q.addStyleClass("sapUiCompSmartFieldUnit");}}}}});K.data("errorCheck","setComplexClientErrorSecondOperandNested");G.addAriaLabelledBy(K);G.addStyleClass("smartFieldPaddingRight");G.addStyleClass("sapUiCompSmartFieldValue");var U=[G,K];if(x){U.reverse();}var N=new H({justifyContent:c.End,items:U,fitContainer:true,width:this._oParent.getWidth()});N.addStyleClass("sapUiCompUOM");if(this._oParent.isContextTable()){if(y){N.addStyleClass("sapUiCompDirectionLTR");}N.addStyleClass("sapUiCompUOMInTable");if(this._oParent.getMode()!=="edit"){N.addStyleClass("sapUiCompUOMInTableDisplay");}}return{control:N,onCreate:"_onCreateUOM",params:{getValue:true,valuehelp:true,type:E}};};w.prototype._createEdmUOMAttributes=function(){var A={textAlign:this._getEdmUOMTextAlignment(),placeholder:this.getAttribute("placeholder"),name:this.getAttribute("name"),change:this._oHelper.getUOMChangeHandler(this._oParent)};if(this._oMetaData.annotations.uom&&this._oHelper.oAnnotation.isCurrency(this._oMetaData.annotations.uom.property.property)){A.value={parts:[{path:this._oMetaData.path},{path:this._oHelper.getUOMPath(this._oMetaData)}],model:this._oMetaData.model,type:this._oTypes.getCurrencyType(this._oMetaData.property)};}else{A.value={model:this._oMetaData.model,path:this._oMetaData.path,type:this._oTypes.getType(this._oMetaData.property)};}return A;};w.prototype._getEdmUOMTextAlignment=function(){var A=this.getAttribute("textAlign");if(!A){A=f.Initial;}if(A===f.Initial){if(this._oParent.isContextTable()){return f.End;}else{return f.Begin;}}return A;};w.prototype._createEdmUOMDisplay=function(){var n=this,P=this._oHelper.getUOMPath(this._oMetaData),A=this._getEdmUOMTextAlignment(),x=null,E=this.getEdmProperty(),y=this._oParent.isContextTable()&&sap.ui.getCore().getConfiguration().getRTL();var z={text:{parts:[{path:this._oMetaData.path,type:this._oTypes.getType(this._oMetaData.property)},{path:P}],model:this._oMetaData.model,formatter:this._oTypes.getDisplayFormatter(E,{currency:this._oHelper.oAnnotation.isCurrency(E),mask:this._oHelper.oAnnotation.isMasked(E)}),useRawValues:true},textAlign:A};if(y){z.textDirection="LTR";}var B=this._oParent.getObjectBinding(this._oMetaData.model);this.addObjectBinding(z,B);var G=new e(this._oParent.getId()+"-text",z);P=this._oHelper.getUOMPath(this._oMetaData);z={value:{model:this._oMetaData.model,path:P},change:this._oHelper.getUOMChangeHandler(this._oParent,true),textAlign:this._getEdmUOMTextAlignment()};this.addObjectBinding(z,B);this.mapBindings(z,{"uomEditable":"editable","uomEnabled":"enabled","uomVisible":"visible","mandatory":"mandatory","contextEditable":"contextEditable"});G.addStyleClass("smartFieldPaddingRight");G.addStyleClass("sapUiCompSmartFieldValue");if(!this._checkSuppressUnit()){x=new sap.ui.comp.smartfield.SmartField(this._oParent.getId()+"-sfDisp",z);x.data("configdata",{"configdata":{isInnerControl:true,isUOM:!this._oParent.data("configdata"),model:this._oMetaData.model,navigationPath:this._oMetaData.annotations.uom.navigationPath||null,path:P,entitySetObject:this._oMetaData.annotations.uom.entitySet,entityType:this._oMetaData.annotations.uom.entityType,property:this._oMetaData.annotations.uom.property,annotations:{valuelist:this._oMetaData.annotations.valuelistuom,text:this._oMetaData.annotations.textuom},modelObject:this._oMetaData.modelObject||this._oModel,onText:function(K){if(K){if(K.setWrapping){K.setWrapping(false);}if(y&&K.setTextDirection){K.setTextDirection("LTR");}if(n._oParent&&(n._oParent.getControlContext()!=="table")&&(n._oParent.getControlContext()!=="responsiveTable")){K.addStyleClass("sapUiCompSmartFieldUnit");}}},onInput:function(K){G.setLayoutData(new F({growFactor:0}));x.setLayoutData(new F({growFactor:0}));if(K){if(y&&K.setTextDirection){K.setTextDirection("LTR");}if((n._oParent.getControlContext()!=="table")&&(n._oParent.getControlContext()!=="responsiveTable")){K.addStyleClass("sapUiCompSmartFieldUnit");}}},getContextEditable:function(){return n._oParent.getContextEditable();}}});x.data("errorCheck","setComplexClientErrorSecondOperandNested");var J=new H({items:[G,x],fitContainer:true,width:this._oParent.getWidth()});if(this._oParent.isContextTable()){J.setJustifyContent("End");this._oParent.addStyleClass("sapUiCompUOMInTable");if(y){J.addStyleClass("sapUiCompDirectionLTR");}J.addStyleClass("sapUiCompUOMInTable");}return{control:J};}return{control:G};};w.prototype._checkSuppressUnit=function(){if(this._oParent.data("suppressUnit")==="true"){return true;}var n=this._oParent.getBindingInfo("uomVisible");return(!n&&!this._oParent.getUomVisible());};w.prototype._createEdmUOMObjectStatus=function(){var n,x,E=this.getEdmProperty(),y=this._oTypes.getDisplayFormatter(E,{currency:this._oHelper.oAnnotation.isCurrency(E)}),P=this._oHelper.getUOMPath(this._oMetaData),A={text:{parts:[{path:this._oMetaData.path,type:this._oTypes.getType(this._oMetaData.property)},{path:P}],formatter:function(){var z=y.apply(this,arguments);return z+arguments[1];},useRawValues:true}};this._addObjectStatusAttributes(A);n=this._oParent.getObjectBinding(this._oMetaData.model);this.addObjectBinding(A,n);x=new p(this._oParent.getId()+"-objStatus",A);x.addStyleClass("sapUiCompUOM");return{control:x};};w.prototype._createEdmUOMObjectNumber=function(){var A,n,x,y=this._getEdmUOMTextAlignment();if(this._oMetaData.annotations.uom&&this._oHelper.oAnnotation.isCurrency(this._oMetaData.annotations.uom.property.property)){A={number:{parts:[{path:this._oMetaData.path},{path:this._oHelper.getUOMPath(this._oMetaData)}],type:this._oTypes.getCurrencyType(this._oMetaData.property)},unit:{path:this._oHelper.getUOMPath(this._oMetaData)},model:this._oMetaData.model,textAlign:y};}else{A={model:this._oMetaData.model,number:{path:this._oMetaData.path,type:this._oTypes.getType(this._oMetaData.property)},unit:{path:this._oHelper.getUOMPath(this._oMetaData)},textAlign:y};}n=this._oParent.getObjectBinding(this._oMetaData.model);this.addObjectBinding(A,n);x=new m(this._oParent.getId()+"-objNumber",A);x.addStyleClass("sapUiCompUOM");return{control:x};};w.prototype._createEdmSemantic=function(){var A,n,U,x=this,y=this._oParent.getBindingInfo("value"),P=y.parts[0].path,E=this.getEdmProperty(),z=this._oHelper.oAnnotation.getLabel(E);if(this._oMetaData.annotations.lineitem&&this._oMetaData.annotations.lineitem.labels&&this._oMetaData.annotations.lineitem.labels[P]){z=this._oMetaData.annotations.lineitem.labels[P];}A={semanticObject:this._oMetaData.annotations.semantic.defaultSemanticObject,additionalSemanticObjects:this._oMetaData.annotations.semantic.additionalSemanticObjects,semanticObjectLabel:z,fieldName:P,width:this.getAttribute("width"),createControlCallback:function(){var B=this.createControl(true);if(B){return B.control;}return null;}.bind(this)};n=this._oHelper.oAnnotation.getText(E);if(n){A.text={parts:[this._oMetaData.path,this._oHelper.getEdmDisplayPath(this._oMetaData)],model:this._oMetaData.model,formatter:function(B,G){if(B&&G){return x._formatDisplayBehaviour("defaultInputFieldDisplayBehaviour",B,G);}return B?B:"";}};A.navigationTargetsObtained=function(B){var G=this.getBinding("text");if(!q.isArray(G.getValue())){B.getParameters().show();return;}var J=G.getValue();var K=x._getDisplayBehaviourConfiguration("defaultInputFieldDisplayBehaviour")||"idOnly";var N=t.getTextsFromDisplayBehaviour(K,J[0],J[1]);var Q=B.getParameters().mainNavigation;if(Q){Q.setDescription(N.secondText);}B.getParameters().show(N.firstText,Q,undefined,undefined);};}else{U=this._oHelper.getUOMPath(this._oMetaData);if(U){A.text={parts:[{path:P},{path:U}],model:this._oMetaData.model,formatter:this._oHelper.oAnnotation.isCurrency(this._oMetaData.annotations.uom.property.property)?t.getAmountCurrencyFormatter():t.getMeasureUnitFormatter(),useRawValues:true};A.uom={path:U};}else{A.text={path:P,model:this._oMetaData.model};}}return{control:new g(this._oParent.getId()+"-sl",A),onCreate:"_onCreate",params:{getValue:"getInnerControlValue"}};};w.prototype._createMultiLineText=function(n){var A=this.createAttributes("value",this._oMetaData.property,n);var x=this.getFormatSettings("multiLineSettings");A=q.extend(true,A,x);if(this._oParent.isContextTable()){A.width="100%";}var y=new T(this._oParent.getId()+"-textArea",A);this._handleEventingForEdmString(y,this._oMetaData.property);return{control:y,onCreate:"_onCreate",params:{type:{type:A.value.type,property:this._oMetaData.property},getValue:"getValue"}};};w.prototype.getEdmProperty=function(){var n=this._oHelper;if(n){return n.getEdmProperty(this._oMetaData);}return null;};w.prototype.getEntityType=function(){if(this._oMetaData){return this._oMetaData.entityType;}return null;};w.prototype._checkLink=function(){var n=this._oParent.getBindingInfo("url"),P=this.getEdmProperty();if(n||this._oParent.getUrl()||w.isSpecialLink(P)){return true;}return this._oParent.hasListeners("press");};w.prototype._createLink=function(){var n=this;var A={text:"",href:""},P=this._oParent,B=P.getBindingInfo("url");if(B){A.href=this._oBinding.toBinding(B);}else{A.href=P.getUrl();}if(P.hasListeners("press")){A.press=function(G){G.preventDefault();P.firePress(G);};}B=P.getBindingInfo("value");if(B){var x=this._oMetaData,y=x.path,z=x.property.property;if(x.annotations.text&&(z.type==="Edm.String")){A.text={parts:[x.path,this._oHelper.getEdmDisplayPath(x)],formatter:this._formatText.bind(n)};}else if(w.isSpecialLink(z)){var E=w[w._getLinkFormatterFunctionName(z)];A.text={path:y};A.href={path:y,formatter:null};if(typeof E==="function"){A.href.formatter=E;}}else{A.text=this._oBinding.toBinding(B);}}else{A.text=P.getValue();}return{control:new L(P.getId()+"-link",A),onCreate:"_onCreate",params:{noValidation:true}};};w.isSpecialLink=function(P){return M.isEmailAddress(P)||M.isPhoneNumber(P)||M.isURL(P);};w._getLinkFormatterFunctionName=function(P){return"_format"+M.getLinkDisplayFormat(P);};w._formatEmailAddress=function(E){return"mailto:"+E;};w._formatPhoneNumber=function(P){return"tel:"+P;};w._formatURL=function(U){return q.sap.validateUrl(U)?U:"";};w.prototype._formatText=function(n,x){if(n&&x){return this._formatDisplayBehaviour("defaultInputFieldDisplayBehaviour",n,x);}return n||"";};w.prototype._createEdmBoolean=function(){var n=this._oSelector.checkComboBox(),E=this._oParent.getEditable()&&this._oParent.getEnabled()&&this._oParent.getContextEditable(),x=this,P=null,A,y;if(n.combobox){if(E||this._oParent.getFetchValueListReadOnly()){return this._createComboBox({annotation:n.annotation,noDialog:true,noTypeAhead:true},!E);}}if(E){A=this.createAttributes("selected",this._oMetaData.property,{},{event:"select",parameter:"selected"});y=new C(this._oParent.getId()+"-cBoxBool",A);P={getValue:"getSelected"};}else{A=this.createAttributes("text",this._oMetaData.property,{width:true,textAlign:true});A.text={model:this._oMetaData.model,path:this._oMetaData.path,formatter:function(z){return x._formatDisplayBehaviour("defaultCheckBoxDisplayBehaviour",z);}};y=new e(this._oParent.getId()+"-text",A);}return{control:y,onCreate:"_onCreate",params:P};};w.prototype._getCreator=function(B){return this._oSelector.getCreator(B);};w.prototype._onCreate=function(n,P){var G,x,y=true,z=this;if(P){if(P.noValidation){y=false;}if(P.valuehelp&&this.shouldCreateValueHelpForControl(n)){this._getValueHelpDialogTitle(P.valuehelp);P.valuehelp["analyser"]=this._oHelper.getAnalyzer(this._oModel||this._oMetaData.modelObject);this.createValueHelp(n,this.getEdmProperty(),P.valuehelp,this._oModel||this._oMetaData.modelObject,function(E){z._oParent.fireValueListChanged({"changes":E.mParameters.changes});});}if(P.getValue){G=P.getValue;P.getValue=function(){return n[G]();};}if(P.type){x=this._oFieldControl.getMandatoryCheck(P.type.property);if(x){P.type.type.oFieldControl=x;}}}if(y){this.addValidations(n,this._oParent.data("errorCheck")||"setSimpleClientError");if(this._oParent.getMode()!=="display"){n.attachValidationSuccess(function(E){if(!z._oParent.getValue()){if(z._oMetaData.property&&z._oMetaData.property.property&&z._oHelper.oAnnotation.isStaticMandatory(z._oMetaData.property.property)){if(n.setValueStateText){n.setValueStateText(z._oRb.getText("VALUEHELPVALDLG_FIELDMESSAGE"));n.setValueState(sap.ui.core.ValueState.Error);z._oParent.setSimpleClientError(true);}}}});}}if(!this._checkUOM()){n.addStyleClass("sapUiCompSmartFieldValue");}};w.prototype._createValueHelp=function(){var n=this._oParent.getContent();if(!n){return;}var x={annotation:this._oMetaData.annotations.valuelist,noDialog:!this._oParent.getShowValueHelp(),noTypeAhead:!this._oParent.getShowSuggestion(),aggregation:"suggestionRows"};this._getValueHelpDialogTitle(x);x["analyser"]=this._oHelper.getAnalyzer(this._oModel||this._oMetaData.modelObject);this.createValueHelp(n,this.getEdmProperty(),x,this._oModel||this._oMetaData.modelObject,function(E){this._oParent.fireValueListChanged({"changes":E.mParameters.changes});}.bind(this));};w.prototype._checkUOM=function(){var n=this._oParent.data("configdata");if(n&&n.configdata){if(n.configdata.onInput||n.configdata.onText){return true;}}return false;};w.prototype._getValueHelpDialogTitle=function(n){n.dialogtitle=this._oParent.getTextLabel();if(!n.dialogtitle){var E=this.getEdmProperty();n.dialogtitle=this._oHelper.oAnnotation.getLabel(E)||E.name;}};w.prototype._onCreateUOM=function(n,P){var x=n.getItems(),y,z=this;this.addValidations(x[0],"setComplexClientErrorFirstOperand");if(this._oParent.getMode()!=="display"){x[0].attachValidationSuccess(function(E){if(!z._oParent.getValue()){if(z._oMetaData.property&&z._oMetaData.property.property&&z._oHelper.oAnnotation.isStaticMandatory(z._oMetaData.property.property)){if(x[0].setValueStateText){x[0].setValueStateText(z._oRb.getText("VALUEHELPVALDLG_FIELDMESSAGE"));x[0].setValueState(sap.ui.core.ValueState.Error);z._oParent.setComplexClientErrorFirstOperand(true);}}}});}if(P&&P.getValue){P.getValue=function(){return x[0].getValue();};}P.uom=function(){return x[1].getValue();};P.uomset=function(A){x[1].setValue(A);};if(P.type){y=this._oFieldControl.getMandatoryCheck(P.type.property);if(y){P.type.type.oFieldControl=y;}}};w.prototype.bind=function(){var n=this.getMetadata().getName();var x=function(A,B){try{this._init(A);this._setUOMEditState();this._bind(B);}catch(E){q.sap.log.error(E,null,n+".bind.fnInit");}}.bind(this);if(!this._bInitialized&&!this.bPending){this._bInitialized=true;var N=this._oFieldControl.getBindableAttributes(),y=this._oParent.data("configdata");if(y&&y.configdata){x(this._oMeta,N);}else if(this._oModel){this.bPending=true;var z=this._oParent&&this._oParent.isTextInEditModeSourceValid();var P=this._oModel.getMetaModel().loaded().then(function onMetaModelLoaded(){if(z){this._init(this._oMeta);return this._oHelper.loadValueListAnnotation(this._oMetaData.annotations.valuelist);}this.bPending=false;x(this._oMeta,N);}.bind(this)).catch(function(E){q.sap.log.error(E,null,n+".onMetaModelLoaded");});if(z){return P.then(function(A){this.bPending=false;return A;}.bind(this)).then(this._initValueList.bind(this)).then(function(){this._setUOMEditState();this._bind(N);}.bind(this)).catch(function(E){q.sap.log.error(E,null,n+".bind");});}return P;}}};w.prototype._bind=function(B){var x,y=this._oFieldControl.getControlProperties(this._oMetaData,B);for(var n in y){x=this._oBinding.fromFormatter(this._oMetaData.model,y[n]);this._oParent.bindProperty(n,x);}this._addLabelAndQuickInfo();this._oParent.fireInitialise();};w.prototype._addLabelAndQuickInfo=function(){var P=this.getDataProperty();P=P.property;var n=this._oHelper.oAnnotation.getLabel(P);var Q=this._oHelper.oAnnotation.getQuickInfo(P);if(n&&this._oParent.isPropertyInitial("textLabel")){this._oParent.setTextLabel(n);}if(Q&&this._oParent.isPropertyInitial("tooltipLabel")){this._oParent.setTooltipLabel(Q);}};w.prototype.rebindOnCreated=function(){var B,x=this._oFieldControl.getControlProperties(this._oMetaData,["editable"]);for(var n in x){B=this._oBinding.fromFormatter(this._oMetaData.model,x[n]);this._oParent.bindProperty(n,B);}};w.prototype._setUOMEditState=function(){if(this._oFieldControl.hasUomEditState(this._oMetaData)){var n=this._oFieldControl.getUOMEditState(this._oMetaData);if(n){var B=this._oBinding.fromFormatter(this._oMetaData.model,n);this._oParent.bindProperty("uomEditState",B);}}};w.prototype.getDataProperty=function(){return this._oMetaData.property;};w.prototype.getMetaData=function(){return this._oMetaData;};w.prototype.getODataHelper=function(){return this._oHelper;};w.prototype.destroy=function(){if(this._oFieldControl){this._oFieldControl.destroy();}if(this._oSelector){this._oSelector.destroy();}if(this._oTypes){this._oTypes.destroy();}if(this._oHelper){this._oHelper.destroy();}this._oHelper=null;this._oFieldControl=null;this._oTypes=null;this._oSelector=null;this._oMetaData=null;h.prototype.destroy.apply(this,arguments);};return w;},true);
