sap.ui.define([],function(){"use strict";jQuery.sap.require("sap.ovp.ui.UIActions");var R=function(s){this.init(s);};R.prototype.init=function(s){s.beforeDragCallback=this._beforeDragHandler.bind(this);s.dragStartCallback=this._dragStartHandler.bind(this);s.dragMoveCallback=this._dragMoveHandler.bind(this);s.dragEndCallback=this._dragEndHandler.bind(this);s.resizeStartCallback=this._resizeStartHandler.bind(this);s.resizeMoveCallback=this._resizeMoveHandler.bind(this);s.resizeEndCallback=this._resizeEndHandler.bind(this);s.endCallback=this._endHandler.bind(this);this.placeHolderClass=s.placeHolderClass;this.layout=s.layout;this.settings=s;this.destroy();this.uiActions=new sap.ovp.ui.UIActions(this.settings).enable();this.aCardsOrder=null;this.aCards=s.aCards;this.layoutUtil=s.layoutUtil;this.verticalMargin=null;this.horizontalMargin=null;this.top=null;this.left=null;this.width=null;this.layoutOffset=null;this.jqLayout=null;this.jqLayoutInner=null;this.isRTLEnabled=null;this.rowHeight=s.rowHeight;this.floaterData=null;this.resizeData={};this.updatedScrollTop=0;this.SCROLL_OFFSET=16;};R.prototype.destroy=function(){if(this.uiActions){this.uiActions.disable();this.uiActions=null;}};R.prototype._resizeStartHandler=function(e,c){if(!sap.ui.Device.system.desktop){return;}var C=this.layoutUtil.dashboardLayoutModel.getCardById(this.layoutUtil.getCardId(c.id));if(C.template==="sap.ovp.cards.stack"||C.settings.stopResizing){return;}this.layoutUtil.dragOrResizeChanges=[];this.layoutUtil.resizeStartCard={cardId:C.id,rowSpan:C.dashboardLayout.rowSpan,colSpan:C.dashboardLayout.colSpan,maxColSpan:C.dashboardLayout.maxColSpan,noOfItems:C.dashboardLayout.noOfItems,autoSpan:C.dashboardLayout.autoSpan,showOnlyHeader:C.dashboardLayout.showOnlyHeader};if(jQuery(window).getSelection){var s=jQuery(window).getSelection();s.removeAllRanges();}c.classList.add('sapOvpCardResize');C.dashboardLayout.autoSpan=false;this.initCardsSettings();};R.prototype._resizeEndHandler=function(e,c){if(c){c.classList.remove('sapOvpCardResize');if(this.uiActions.isResizeX&&!this.uiActions.isResizeY&&c.classList.contains('sapOvpNotResizableLeftRight')){return;}this.updatedScrollTop=0;c.style.zIndex='auto';var C=this.layoutUtil.changedCards.resizeCard;if(C){C.dashboardLayout.maxColSpan=C.dashboardLayout.colSpan;this.layoutUtil._sizeCard(C);this.layoutUtil.dragOrResizeChanges.push({changeType:"dragOrResize",content:{cardId:C.id,dashboardLayout:{rowSpan:C.dashboardLayout.rowSpan,oldRowSpan:this.layoutUtil.resizeStartCard.rowSpan,colSpan:C.dashboardLayout.colSpan,oldColSpan:this.layoutUtil.resizeStartCard.colSpan,maxColSpan:C.dashboardLayout.maxColSpan,oldMaxColSpan:this.layoutUtil.resizeStartCard.maxColSpan,noOfItems:C.dashboardLayout.noOfItems,oldNoOfItems:this.layoutUtil.resizeStartCard.noOfItems,autoSpan:C.dashboardLayout.autoSpan,oldAutoSpan:this.layoutUtil.resizeStartCard.autoSpan,showOnlyHeader:C.dashboardLayout.showOnlyHeader,oldShowOnlyHeader:this.layoutUtil.resizeStartCard.showOnlyHeader}},isUserDependent:true});}this.layoutUtil.changedCards={};if(sap.ui.Device.system.desktop){jQuery("body").removeClass("sapOVPDisableUserSelect sapOVPDisableImageDrag");}jQuery(this.settings.wrapper).removeClass("dragAndDropMode");jQuery("#sapOvpOverlayDivForCursor").remove();jQuery("#ovpResizeRubberBand").remove();this.layoutUtil.getDashboardLayoutModel().extractCurrentLayoutVariant();this.layoutUtil.oLayoutCtrl.fireAfterDragEnds({positionChanges:this.layoutUtil.dragOrResizeChanges});if(jQuery(window).getSelection){var s=jQuery(window).getSelection();s.removeAllRanges();}}};R.prototype._resizeMoveHandler=function(a){if(!sap.ui.Device.system.desktop){return;}if(a.element){var c,b,g,d,C=this.layoutUtil.dashboardLayoutModel.getCardById(this.layoutUtil.getCardId(a.element.id));if(C.template==="sap.ovp.cards.stack"||C.settings.stopResizing){return;}var v=document.getElementsByClassName("sapFDynamicPageContentWrapper")[0];var e=v.offsetHeight;var f=v.getBoundingClientRect();if((a.evt.clientY-v.offsetTop+this.SCROLL_OFFSET)>e){v.scrollTop=v.scrollTop+this.SCROLL_OFFSET;this.updatedScrollTop+=this.SCROLL_OFFSET;}else if(((a.evt.clientY-v.offsetTop)<f.top+this.SCROLL_OFFSET)&&v.scrollTop!==0){v.scrollTop=v.scrollTop-this.SCROLL_OFFSET;this.updatedScrollTop-=this.SCROLL_OFFSET;}b=this.layoutUtil.calculateCardProperties(C.id);c=this._calculateMinimumCardHeight(a,b,C.dashboardLayout.showOnlyHeader);d=c.ghostHeightCursor;g=c.ghostWidthCursor<=this.layoutUtil.getColWidthPx()?this.layoutUtil.getColWidthPx():c.ghostWidthCursor;if(!this.uiActions.isResizeY){if(a.element.classList.contains('sapOvpNotResizableLeftRight')||(a.element.classList.contains('sapOvpNotResizableRight')&&c.ghostWidthCursor>C.dashboardLayout.colSpan*this.layoutUtil.getColWidthPx())){return;}else{jQuery.sap.log.info('Not a valid scenario');}if(C.template==="sap.ovp.cards.list"&&g>this.layoutUtil.getColWidthPx()*2||(C.template==="sap.ovp.cards.linklist"&&C.settings.listFlavor==='carousel'&&(g>this.layoutUtil.getColWidthPx()*3))){return;}}if(C.template==="sap.ovp.cards.linklist"&&C.settings.listFlavor==='carousel'&&d>this.layoutUtil.getRowHeightPx()*45){a.element.classList.add('sapOvpNotResizableDown');return;}var l=b.leastHeight+2*this.layoutUtil.CARD_BORDER_PX;var m=b.minCardHeight+2*this.layoutUtil.CARD_BORDER_PX;a.element.classList.remove("sapOvpMinHeightContainer");if(d<=l){d=l;a.element.classList.add("sapOvpMinHeightContainer");this.resizeData.showOnlyHeader=true;}else if(d>l&&d<=m){var h=(l+m)/2;if(d>h){d=m;this.resizeData.showOnlyHeader=false;}else{d=l;a.element.classList.add("sapOvpMinHeightContainer");this.resizeData.showOnlyHeader=true;}}else{if(!this.uiActions.isResizeX&&(C.template==='sap.ovp.cards.list'||C.template==='sap.ovp.cards.table')){var i=b.headerHeight+b.dropDownHeight+2*this.layoutUtil.CARD_BORDER_PX;var p=Math.round((d-i)/b.itemHeight);d=p*b.itemHeight+i;}this.resizeData.showOnlyHeader=false;}this._addOverLay(c.cursor);this.resizeData.colSpan=Math.round(g/this.layoutUtil.getColWidthPx());this.resizeData.rowSpan=Math.ceil(d/this.layoutUtil.getRowHeightPx());this.layoutUtil.updateCardSize(C.id,d,g,this.resizeData.rowSpan);this.showGhostWhileResize(a,c);if(this.resizeData.colSpan&&this.resizeData.rowSpan){this.layoutUtil.resizeCard(a.element.getAttribute("id"),this.resizeData,this.layoutUtil.dragOrResizeChanges);}this.resizeData={};this.layoutUtil.setKpiNumericContentWidth(a.element);}};R.prototype._beforeDragHandler=function(e,c){if(e.type==="mousedown"){e.preventDefault();}if(sap.ui.Device.browser.mobile){this.selectableElemets=jQuery(c).find(".sapUiSelectable");this.selectableElemets.removeClass("sapUiSelectable");}jQuery(this.settings.wrapper).addClass("dragAndDropMode");};R.prototype._dragStartHandler=function(e,c){if(sap.ui.Device.system.desktop){jQuery("body").addClass("sapOVPDisableUserSelect sapOVPDisableImageDrag");}this.layoutUtil.dragOrResizeChanges=[];var C=this.layoutUtil.getCardId(c.id);var o=this.layoutUtil.dashboardLayoutModel.getCardById(C);this.layoutUtil.dragStartCard={cardId:o.id,row:o.dashboardLayout.row,column:o.dashboardLayout.column};jQuery.sap.log.info(c);if(jQuery(window).getSelection){var s=jQuery(window).getSelection();s.removeAllRanges();}this.initCardsSettings();var a=c.children[0].getBoundingClientRect();this.floaterData={width:a.width,height:a.height,startLeft:a.left-this.layoutOffset.left,startTop:a.top-this.layoutOffset.top};};R.prototype._dragMoveHandler=function(a){if(a.element){var m=0;var v=document.getElementsByClassName("sapFDynamicPageContentWrapper")[0];var b=document.getElementsByClassName("sapFDynamicPageTitleWrapper")[0].offsetHeight;var u=document.getElementsByClassName("sapUshellShellHeadCenter")[0].offsetHeight;var c=v.offsetHeight;var d=v.getBoundingClientRect();var e;if(document.getElementsByClassName("sapFDynamicPageHeader")[0]){m=document.getElementsByClassName("sapFDynamicPageHeader")[0].offsetHeight;}if((a.evt.clientY-v.offsetTop+this.SCROLL_OFFSET)>c){v.scrollTop=v.scrollTop+this.SCROLL_OFFSET;e=v.scrollTop;}else if(((a.evt.clientY-v.offsetTop)<d.top+this.SCROLL_OFFSET)&&v.scrollTop!==0){v.scrollTop=v.scrollTop-this.SCROLL_OFFSET;e=v.scrollTop;}else{e=v.scrollTop;}this.floaterData.id=a.element.id;this.floaterData.left=a.clone.getBoundingClientRect().left;this.floaterData.top=a.clone.getBoundingClientRect().top+e-(b+m+u);var n={row:Math.round(this.floaterData.top/this.layoutUtil.getRowHeightPx())+1,column:Math.round(this.floaterData.left/this.layoutUtil.getColWidthPx())+1};n.row=n.row<=0?1:n.row;n.column=n.column<=1?1:n.column;var C=this.layoutUtil.dashboardLayoutModel.getCardById(this.layoutUtil.getCardId(this.floaterData.id));if(n.column+C.dashboardLayout.colSpan>this.columnCount){n.column=(this.columnCount-C.dashboardLayout.colSpan)+1;}this.floaterData.row=n.row;this.floaterData.column=n.column;jQuery.when(this.layoutUtil.dashboardLayoutModel._arrangeCards(C,this.floaterData,'drag',this.layoutUtil.dragOrResizeChanges)).done(function(){this.layoutUtil._positionCards(this.aCards);this.layoutUtil.dashboardLayoutModel._removeSpaceBeforeCard();}.bind(this));this.showGhostWhileDragMove({row:C.dashboardLayout.row,column:C.dashboardLayout.column},a);}};R.prototype._dragEndHandler=function(e,c,a){if(c){var b=c.getBoundingClientRect();var d=a.getBoundingClientRect();var f=window.getComputedStyle(a).transform.split(",");var t=b.top-d.top;var l=b.left-d.left;var g=parseInt(f[4],10)+l;var h=parseInt(f[5],10)+t;a.style[this.layoutUtil.cssVendorTransition]='transform 0.3s cubic-bezier(0.46, 0, 0.44, 1)';g=Math.abs(g)-8<0?0:g-8;h=Math.abs(h)-8<0?0:h-8;a.style[this.layoutUtil.cssVendorTransform]='translate3d('+g+'px, '+h+'px, 0px) ';this.layoutUtil._positionCards(this.aCards);jQuery(a).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(i){jQuery("#ovpDashboardLayoutMarker").remove();this.layoutUtil.getDashboardLayoutModel().extractCurrentLayoutVariant();var C=this.layoutUtil.getCardId(c.id);var o=this.layoutUtil.dashboardLayoutModel.getCardById(C);this.layoutUtil.dragOrResizeChanges.push({changeType:"dragOrResize",content:{cardId:C,dashboardLayout:{row:o.dashboardLayout.row,oldRow:this.layoutUtil.dragStartCard.row,column:o.dashboardLayout.column,oldColumn:this.layoutUtil.dragStartCard.column}},isUserDependent:true});this.layoutUtil.oLayoutCtrl.fireAfterDragEnds({positionChanges:this.layoutUtil.dragOrResizeChanges});if(sap.ui.Device.system.desktop){jQuery("body").removeClass("sapOVPDisableUserSelect sapOVPDisableImageDrag");}jQuery(this.settings.wrapper).removeClass("dragAndDropMode");if(jQuery(window).getSelection){var s=jQuery(window).getSelection();s.removeAllRanges();}this.uiActions.removeClone();c.classList.remove(this.placeHolderClass);var j=(this.layoutUtil.dashboardLayoutModel._findHighestOccupiedRow()*this.layoutUtil.ROW_HEIGHT_PX)+32;jQuery(".sapUshellEasyScanLayoutInner").css({"height":j+"px","z-index":"1"});}.bind(this));}};R.prototype._endHandler=function(e,c){jQuery.sap.log.info(c);if(sap.ui.Device.browser.mobile&&this.selectableElemets){this.selectableElemets.addClass("sapUiSelectable");}};R.prototype.initCardsSettings=function(){this.jqLayout=this.layout.$();this.jqLayoutInner=this.jqLayout.children().first();var l=this.jqLayout.scrollTop();var a=this.jqLayoutInner.height();this.isRTLEnabled=sap.ui.getCore().getConfiguration().getRTL();this.aCardsOrder=[];this.layoutOffset=this.jqLayout.offset();this.corrY=this.jqLayout.get(0).getBoundingClientRect().top+this.jqLayout.scrollTop();this.corrX=this.layoutOffset.left;this.columnCount=this.layoutUtil.oLayoutData.colCount;var v=this.layout.getVisibleLayoutItems();if(!v){return;}function g(e){return e.$().parent()[0];}this.aCardsOrder=v.map(g);var j=this.jqLayoutInner.children().first();var m=this.isRTLEnabled?"margin-left":"margin-right";this.verticalMargin=parseInt(j.css(m),10);var f=this.aCardsOrder[0];var F=f.getBoundingClientRect();var J=this.jqLayoutInner[0].getBoundingClientRect();this.horizontalMargin=parseInt(jQuery(f).css("margin-bottom"),10);this.verticalMargin=this.horizontalMargin;this.top=F.top-J.top;this.left=F.left-J.left;this.width=f.offsetWidth;jQuery(this.aCardsOrder).css("position","absolute");this.drawLayout(this.aCardsOrder);this.jqLayoutInner.height(a);this.jqLayout.scrollTop(l);};R.prototype.drawLayout=function(c){function u(d){var $=jQuery(d).position();d.style[this.layoutUtil.cssVendorTransition]='all 300ms ease';d.style[this.layoutUtil.cssVendorTransform]='translate3d('+$.left+','+$.top+', 0px) ';}var C=c.length;if(C>0){for(var i=0;i<C;i++){requestAnimationFrame(u.bind(this,c[i]));}}};R.prototype.showGhostWhileDragMove=function(n,a){var e=document.getElementById('ovpDashboardLayoutMarker');var p={top:(n.row-1)*this.layoutUtil.getRowHeightPx()+this.layoutUtil.CARD_BORDER_PX,left:(n.column-1)*this.layoutUtil.getColWidthPx()+this.layoutUtil.CARD_BORDER_PX};if(!e){var d=document.createElement('div');d.id='ovpDashboardLayoutMarker';d.position='absolute';d.style.height=this.floaterData.height+'px';d.style.width=this.floaterData.width+'px';d.style[this.layoutUtil.cssVendorTransform]='translate3d('+(this.isRTLEnabled?-p.left:p.left)+'px,'+p.top+'px, 0px) ';document.getElementsByClassName('sapUshellEasyScanLayoutInner')[0].appendChild(d);}else{e.style[this.layoutUtil.cssVendorTransition]='all 300ms ease';e.style[this.layoutUtil.cssVendorTransform]='translate3d('+(this.isRTLEnabled?-p.left:p.left)+'px,'+p.top+'px, 0px) ';}a.element.style[this.layoutUtil.cssVendorTransition]='all 300ms ease';a.element.style[this.layoutUtil.cssVendorTransform]='translate3d('+(this.isRTLEnabled?-p.left:p.left)+'px,'+p.top+'px, 0px) ';};R.prototype.showGhostWhileResize=function(a,c){var e=document.getElementById('ovpResizeRubberBand');var E=a.element.parentElement;var l=c.fElementPosLeft+this.layoutUtil.CARD_BORDER_PX-2;var t=c.fElementPosTop+this.layoutUtil.CARD_BORDER_PX-2;var h=this.resizeData.rowSpan*this.layoutUtil.getRowHeightPx()-2*this.layoutUtil.CARD_BORDER_PX+2;var w=this.resizeData.colSpan*this.layoutUtil.getColWidthPx()-2*this.layoutUtil.CARD_BORDER_PX+2;if(!e){var d=document.createElement('div');d.id='ovpResizeRubberBand';d.classList.add('ovpResizeRubberBand');d.position='absolute';d.style.height=h+'px';d.style.width=w+'px';d.style[this.layoutUtil.cssVendorTransition]='all 300ms ease';d.style[this.layoutUtil.cssVendorTransform]='translate3d('+(this.isRTLEnabled?-l:l)+'px, '+t+'px, 0px) ';E.appendChild(d);}else{e.style.height=h+'px';e.style.width=w+'px';}};R.prototype._addOverLay=function(c){var e=document.getElementById('sapOvpOverlayDivForCursor');if(!e){var o=document.createElement('div');o.id='sapOvpOverlayDivForCursor';o.style.cursor=c;this.jqLayout[0].appendChild(o);}else{e.style.cursor=c;}};R.prototype._calculateMinimumCardHeight=function(a,c,s){var $=jQuery(a.element),e=$.position().left,E=$.position().top,g,b,d;if(this.uiActions.isResizeX&&!this.uiActions.isResizeY){g=a.moveX-e-this.layoutOffset.left;b=$.outerHeight();d="ew-resize";}else if(!this.uiActions.isResizeX&&this.uiActions.isResizeY){g=$.outerWidth();b=a.moveY+this.updatedScrollTop-E-this.layoutOffset.top+2*this.layoutUtil.CARD_BORDER_PX;d="ns-resize";}else{g=a.moveX-e-this.layoutOffset.left;b=a.moveY+this.updatedScrollTop-E-this.layoutOffset.top+2*this.layoutUtil.CARD_BORDER_PX;d="nwse-resize";}return{ghostWidthCursor:g,ghostHeightCursor:b,cursor:d,fElementPosTop:E,fElementPosLeft:e};};return R;});
