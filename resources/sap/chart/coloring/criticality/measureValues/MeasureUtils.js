sap.ui.define(['sap/chart/coloring/ColoringUtils','sap/chart/coloring/criticality/measureValues/ThresholdsUtils','sap/chart/ChartLog','sap/chart/coloring/CriticalityType','sap/chart/data/MeasureSemantics'],function(C,T,a,b,M){"use strict";var t=jQuery.type;var c={Static:{},Calculated:{},DynamicThresholds:{},ConstantThresholds:{},Unmentioned:{}};var S=['Maximize','Minimize','Target'];c.Static.validate=function(o,m,D,e,h){var j=o[m].Static;var k=function(q,r){if(p[r]===m){n=true;if(p.staticType){if(p.staticType!==j){var u='';Object.keys(M).forEach(function(q,v,w){var r=M[q];if(p[r]){if(v!==(w.length-1)){u+=p[r]+', ';}else{u+=p[r];}}});throw new a('error','Colorings.Criticality.Static','When '+u+' have semantic relationship, they must use the same Criticality type.');}}else{p.staticType=j;if(h[j]){throw new a('error','Colorings.Criticality.Static','Measures, '+h[j]+' and '+m+', which use Static Criticality must have different types.');}else{h[j]=m;}}return false;}};var n=false;for(var i=0;i<e.length;++i){var p=e[i];jQuery.each(M,k);if(n){break;}}return{supportMultiMsr:true};};c.Static.parse=function(o,e,p){var m=o.msr?o.msr.getName():undefined;var h=o.settings[o.type];p.callbacks=c.Static.getCallbacks(h,m);var D=o.msr.getLabel()||o.msr.getName();var i=o.settings.Legend||{};p.legend[h]=(i[h]!=null)?i[h]:D;};c.Static.getCallbacks=function(e,m){var h={};h[e]=[function(o){return o.hasOwnProperty(m);}];return h;};c.Calculated.validate=function(o,m,D){var e=o[m].Calculated;var h=D.allDim.filter(function(i){return i===e;})[0];if(!h){throw new a('error','Colorings.Criticality.Calculated','Calculated property, '+e+', does not exist in data model.');}};c.Calculated.parse=function(o,e,p,m){var h=o.settings[o.type];if(!C.find(h,e.aDims)){p.additionalDimensions.push(h);}p.status=e.oStatus;};c.Calculated.getCallbacks=function(p,e,m){var h=function(o){return(o[p]===e)&&o.hasOwnProperty(m);};return[h];};c.Calculated.getContextHandler=function(e,m,L){var o=e[0];var h=o.settings[o.type];return function(i){var j=o.parsed.status;j.legend=j.legend||{};j.callbacks=j.callbacks||{};o.parsed.legend=j.legend;o.parsed.callbacks=j.callbacks;var k=i.getProperty(h);if(b[k]){var n=this.getDimensionByName(h);var D=this.getDimensionByName(h).getDisplayText();e.legendTitle=e.legendTitle||n.getLabel();var p=n.getTextProperty();if(p&&D){var q=i.getProperty(p);o.parsed.legend[k]=q;}else if(k){o.parsed.legend[k]=L.getText("COLORING_TYPE_"+k.toUpperCase());}var r=o.msr.getName();var u=c.Calculated.getCallbacks(h,k,r);o.parsed.callbacks[k]=u;}};};c.DynamicThresholds.validate=function(o,m,D){var h=D.allMsr;var i=[],j=o[m].DynamicThresholds,k;if(S.indexOf(j.ImprovementDirection)>-1){k=j.ImprovementDirection;}else{throw new a('error','Colorings.Criticality.DynamicThresholds','ImprovementDirection should be one of \'Maximize\', \'Minimize\' and \'Target\'.');}var n=[j.ToleranceRangeLowValue,j.DeviationRangeLowValue,j.AcceptanceRangeLowValue];var p=[j.ToleranceRangeHighValue,j.DeviationRangeHighValue,j.AcceptanceRangeHighValue];switch(k){case"Maximize":i=n;break;case"Minimize":i=p;break;case"Target":i=n.concat(p);break;default:}if(C.isNumber.apply(null,i)){throw new a('error','Colorings.Criticality.DynamicThresholds','Invalid Thresholds settings.');}i=i.filter(function(e){return typeof e=="string";});C.notIn(i,h,'Colorings.Criticality.DynamicThresholds','Thresholds measure, ',', does not exist in data model.');};c.DynamicThresholds.parse=function(o,e,p,m,L){var h=o.settings[o.type];var i=o.msr?o.msr.getName():undefined;var D=h.ImprovementDirection.toLowerCase();var j={lo:h.ToleranceRangeLowValue,hi:h.ToleranceRangeHighValue};var k={lo:h.DeviationRangeLowValue,hi:h.DeviationRangeHighValue};var A={lo:h.AcceptanceRangeLowValue,hi:h.AcceptanceRangeHighValue};T.fillOmit(A,j,k);p.additionalMeasures=[A.lo,A.hi,j.lo,j.hi,k.lo,k.hi].filter(function(v){return t(v)==='string'&&e.aMsrs.filter(function(q){return q.getName()===v;}).length==0;});p.callbacks=T.improvement(D,i,A,j,k);var n={};jQuery.each(b,function(q,v){n[v]=L.getText("COLORING_TYPE_"+v.toUpperCase());});p.legend=jQuery.extend(true,{},n,o.settings.Legend);};c.DynamicThresholds.getContextHandler=function(e,m,L){var o=e[0],h=o.settings[o.type],D=h.ImprovementDirection.toLowerCase();function _(i,k){var r;if(typeof k==="number"){r=k;}else{r=k?i.getProperty(k):null;if(typeof r==="string"){r=Number.parseFloat(r);}}return r;}return function(i){var j={};j.lo=_(i,h.ToleranceRangeLowValue);j.hi=_(i,h.ToleranceRangeHighValue);var k={};k.lo=_(i,h.DeviationRangeLowValue);k.hi=_(i,h.DeviationRangeHighValue);var A={};A.lo=_(i,h.AcceptanceRangeLowValue);A.hi=_(i,h.AcceptanceRangeHighValue);T.fillOmit(A,j,k);T.checkThreshold(D,A,j,k);};};c.ConstantThresholds.validate=function(o,m){var e=o[m].ConstantThresholds;if(S.indexOf(e.ImprovementDirection)===-1){throw new a('error','Colorings.Criticality.ConstantThresholds','ImprovementDirection should be one of \'Maximize\', \'Minimize\' and \'Target\'.');}return{supportHeatMap:true};};c.ConstantThresholds.parse=function(o,e,p,m,L){var h=o.settings[o.type];var i=o.msr?o.msr.getName():undefined;var j=o.msr?o.msr.getLabel()||o.msr.getName():undefined;var D=h.ImprovementDirection.toLowerCase();var k={lo:o.byAggregation.ToleranceRangeLowValue,hi:o.byAggregation.ToleranceRangeHighValue};var n={lo:o.byAggregation.DeviationRangeLowValue,hi:o.byAggregation.DeviationRangeHighValue};var A={lo:o.byAggregation.AcceptanceRangeLowValue,hi:o.byAggregation.AcceptanceRangeHighValue};T.fillOmit(A,k,n);T.checkThreshold(D,A,k,n,true);if(m){p.legend=T.MBCimprovement(D,A,k,n);}else{p.callbacks=T.improvement(D,i,A,k,n);p.legend=c.ConstantThresholds.getLegend(D,j,A,k,n,L);}};var g="\u2265";var l="<";var d="\u2264";var f=">";var s={"<":">",">":"<","\u2265":"\u2264","\u2264":"\u2265"};c.ConstantThresholds.getLegend=function(D,m,A,o,h,L){var i={};var j=h.hi;var k=h.lo;var n=o.hi;var p=o.lo;var q=A.hi;var r=A.lo;function u(x,y,z){var B=x.length;var E=x[0]===Number.POSITIVE_INFINITY;var F=x[0]===Number.NEGATIVE_INFINITY;var G=x[B-1]===Number.POSITIVE_INFINITY;var H=x[B-1]===Number.NEGATIVE_INFINITY;if(z&&x[0]===x[B-1]){return"";}if(y){if(B===5&&!(F&&G)){if(G||H){x=x.slice(0,3);}if(E||F){x=x.slice(2);}if(x.length<=1){return"";}}else if(B===3&&(E||F||G||H)){return"";}}x=x.map(function(e){if(e===Number.POSITIVE_INFINITY){return L.getText("POSITIVE_INFINITY");}else if(e===Number.NEGATIVE_INFINITY){return L.getText("NEGATIVE_INFINITY");}return e;});if(x.length===3&&C.isNumber(x[0])){var I=s[x[1]];x=[x[2],I,x[0]];}return x.join(" ");}var v=function(e){return e&&e.length>0;};var w=function(e){return e.filter(v).join(' , ');};switch(D){case'maximize':i={Positive:u([m,g,r]),Critical:u([k,d,m,l,p],true),Neutral:u([p,d,m,l,r],true),Negative:u([m,l,k])};break;case'minimize':i={Positive:u([m,d,q]),Critical:u([n,l,m,d,j],true),Neutral:u([q,l,m,d,n],true),Negative:u([m,f,j])};break;case'target':i={Positive:u([r,d,m,d,q],true),Critical:w([u([k,d,m,l,p],true,true),u([n,l,m,d,j],true,true)]),Neutral:w([u([p,d,m,l,r],true,true),u([q,l,m,d,n],true,true)]),Negative:w([u([m,l,k],true),u([m,f,j],true)])};break;default:}return i;};c.ConstantThresholds.getContextHandler=function(e,m){if(m){var o=e[0];var h=o.msr.getName();var L=o.parsed.legend;return function(i){var v=i.getProperty(h);L.min=Math.min(L.min,v);L.max=Math.max(L.max,v);};}else{return null;}};return c;});
