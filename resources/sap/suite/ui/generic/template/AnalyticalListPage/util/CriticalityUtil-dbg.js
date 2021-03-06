sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/Context",
	"sap/suite/ui/generic/template/AnalyticalListPage/util/OperationCode",
	"sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil",
	"jquery.sap.global"
	],  function(BaseObject, Context, OperationCode, FilterUtil, jQuery) {
		"use strict";
	var POSITIVE = "Positive",
	NEGATIVE = "Negative",
	CRITICAL = "Critical",
	NEUTRAL = "Neutral",
	TARGET = "Target",
	MAXIMIZE = "Maximize",
	MINIMIZE = "Minimize",
	MAX_VALUE = Number.POSITIVE_INFINITY, //+INF
	MIN_VALUE = Number.NEGATIVE_INFINITY; //-INF
	var CriticalityUtil = BaseObject.extend("sap.suite.ui.generic.template.AnalyticalListPage.util.CriticalityUtil");
		/**
		* This function set values for all the keys
		* @param  {number} vToleranceLow toleranceLow value from annotations
		* @param  {number} vToleranceHigh deviationLow value from annotations
		* @param  {number} vDeviationLow toleranceHigh value from annotations
		* @param  {number} vDeviationHigh toleranceHigh value from annotations
		* @param {number} vValue Value for comparison
		*/
		CriticalityUtil.setVals = function(vToleranceLow, vToleranceHigh, vDeviationLow, vDeviationHigh, vValue) {
			//Thresholds are optional. For unassigned values, defaults are determined in this order:
			/*For DeviationRange, an omitted LowValue translates into the smallest possible number (-INF), 
				an omitted HighValue translates into the largest possible number (+INF)
			*/
			/*For ToleranceRange, an omitted LowValue will be initialized with DeviationRangeLowValue, 
				an omitted HighValue will be initialized with DeviationRangeHighValue
			*/
			this.deviationLow = (vDeviationLow || vDeviationLow === 0) ? vDeviationLow : MIN_VALUE;
			this.deviationHigh = (vDeviationHigh || vDeviationHigh === 0) ? vDeviationHigh : MAX_VALUE;
			this.toleranceLow = (vToleranceLow || vToleranceLow === 0) ? vToleranceLow : vDeviationLow;
			this.toleranceHigh = (vToleranceHigh || vToleranceHigh === 0) ? vToleranceHigh : vDeviationHigh;
			this._value = vValue;
			this.state = undefined;
		};
		/**
		* This calculate the Criticality color for Maximizing KPI
		* @return {state} returns the state for Criticality color indicator
		*/
		CriticalityUtil.Maximize = function() {
			if (this.toleranceLow || this.deviationLow || this.toleranceLow === 0 || this.deviationLow === 0) {
				if (this._value >= this.toleranceLow) {
					this.state = sap.m.ValueColor.Good;
				} else if (this._value < this.deviationLow) {
					this.state = sap.m.ValueColor.Error;
				} else {
					this.state = sap.m.ValueColor.Critical;
				}
			}
			return this.state;
		};
		CriticalityUtil.Maximizing = function(){
			this.Maximize();
		};
		/**
		* This function calculate the the criticality color for Minimizing KPI
		* @return {state} returns the state for Criticality color indicator
		*/
		CriticalityUtil.Minimize = function() {
			if (this.toleranceHigh || this.deviationHigh || this.toleranceHigh === 0 || this.deviationHigh === 0) {
				if (this._value <= this.toleranceHigh) {
					this.state = sap.m.ValueColor.Good;
				} else if (this._value > this.deviationHigh) {
					this.state = sap.m.ValueColor.Error;
				} else {
					this.state = sap.m.ValueColor.Critical;
				}
			}
			return this.state;
		};
		CriticalityUtil.Minimizing = function() {
			this.Minimize();
		};
		/**
		* This function calculate the Criticality color for Target KPI
		* @return {state} returns the state for Criticality color indicator
		*/
		CriticalityUtil.Target = function() {
			//Target is evaluated based on all threshold values.
			if (this._value >= this.toleranceLow && this._value <= this.toleranceHigh) {
				this.state = sap.m.ValueColor.Good;
			} else if (this._value < this.deviationLow || this._value > this.deviationHigh) {
				this.state = sap.m.ValueColor.Error;
			} else if ((this._value >= this.deviationLow && this._value < this.toleranceLow) || (this._value <= this.deviationHigh && this._value > this.toleranceHigh)) {
				this.state = sap.m.ValueColor.Critical;
			}
			return this.state;
		};
		/**
		* This function returns the datapoint associated with the particular chart
		* @param {oModel} The model object
		* @param {me} The particular FilterItemChart context
		* @return {oDatapoint} returns Datapoint Object related to that chart
		*/
		CriticalityUtil.getDataPoint = function(oModel, me) {
			var metaModel = oModel.getMetaModel(),
			oEntityType = metaModel.getODataEntityType(metaModel.getODataEntitySet(me.getEntitySet()).entityType),
			oChart = me.getChartQualifier() in oEntityType ? oEntityType[me.getChartQualifier()] : undefined,
			oDatapoint,
			count  = 0,
			measureAttribute = oChart ? oChart.MeasureAttributes : undefined;
			if (measureAttribute) {
				for (var i = 0; i < measureAttribute.length; i++) {
					if (measureAttribute[i].Measure && measureAttribute[i].Measure.PropertyPath === me.getMeasureField()) {
						oDatapoint = measureAttribute[i].DataPoint ? oEntityType[measureAttribute[i].DataPoint.AnnotationPath.substring(1)] : undefined;
						if (oDatapoint) {
							count++;
							break;
						}
					}
				}
			}
			if (count === 0) {
				jQuery.sap.log.info("There is no datapoint for the measure " + me.getMeasureField());
			}
			return oDatapoint;
		};
		/**
		* This function returns the path properties if any mentioned in the datapoint annoataion
		* @param {oDatapoint} Datapoint Object related to that chart
		* @return [aRelativeToProperties] returns the array of path properties in datapoint annotation
		*/
		CriticalityUtil.getCriticalityRefProperties = function(oDataPoint) {
			var aRelativeToProperties = [];
			var crit = oDataPoint.Criticality;
			if (crit) {
				var sCritPath = FilterUtil.readProperty(crit,"Path");
				if (sCritPath) {
					aRelativeToProperties.push(sCritPath);
				}
			} else {
				var cCalc = oDataPoint.CriticalityCalculation,
				sImproveDirection = FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.ImprovementDirection.EnumMember") ? FilterUtil.getPrimitiveValue(oDataPoint.CriticalityCalculation.ImprovementDirection) : undefined,
				sDeviationRangeLow = FilterUtil.readProperty(cCalc,"DeviationRangeLowValue.Path"),
				sDeviationRangeHigh = FilterUtil.readProperty(cCalc,"DeviationRangeHighValue.Path"),
				sToleranceRangeLow = FilterUtil.readProperty(cCalc,"ToleranceRangeLowValue.Path"),
				sToleranceRangeHigh = FilterUtil.readProperty(cCalc,"ToleranceRangeHighValue.Path");
				if (sImproveDirection === MAXIMIZE) {
					if (sDeviationRangeLow) {
						aRelativeToProperties.push(sDeviationRangeLow);
					}
					if (sToleranceRangeLow) {
						aRelativeToProperties.push(sToleranceRangeLow);
					}
				} else if (sImproveDirection === MINIMIZE) {
					if (sToleranceRangeHigh) {
						aRelativeToProperties.push(sToleranceRangeHigh);
					}
					if (sDeviationRangeHigh) {
						aRelativeToProperties.push(sDeviationRangeHigh);
					}
				} else if (sImproveDirection === TARGET) {
					if (sDeviationRangeLow) {
						aRelativeToProperties.push(sDeviationRangeLow);
					}
					if (sToleranceRangeLow) {
						aRelativeToProperties.push(sToleranceRangeLow);
					}
					if (sDeviationRangeHigh) {
						aRelativeToProperties.push(sDeviationRangeHigh);
					}
					if (sToleranceRangeHigh) {
						aRelativeToProperties.push(sToleranceRangeHigh);
					}
				}
			}
			return aRelativeToProperties.length > 0 ? aRelativeToProperties : undefined;
		};
		/**
		* This function returns the criticality indicator from annotations if criticality is EnumMember
		* @param {sCriticality} criticality provided in the annotations
		* @return {sIndicator} return the indicator for criticality
		*/
		CriticalityUtil.getCriticalityIndicatorFromEnum = function(sCriticality) {
			var sIndicator;
			if (sCriticality === NEGATIVE) {
				sIndicator = sap.m.ValueColor.Error;
			} else if (sCriticality === POSITIVE) {
				sIndicator = sap.m.ValueColor.Good;
			} else if (sCriticality === CRITICAL) {
				sIndicator = sap.m.ValueColor.Critical;
			} else if (sCriticality === NEUTRAL) {
				sIndicator = sap.m.ValueColor.Neutral;
			}
			return sIndicator;
		} ;
		/**
		* This function returns the chart data with color property added to it
		* @param {oDatapoint} Datapoint Object related to that chart
		* @param {data} Data returned from back end with result array
		* @param {measureField} measureField for which the Criticality is calculated
		* @return {data} returns the data object obtained from back end but with Color property added to it
		*/
		CriticalityUtil.CalculateCriticality = function(oDataPoint,data,measureField) {
			for (var i = 0; i < data.results.length; i++) {
				if (oDataPoint && oDataPoint.Criticality) {
					var criticality = (oDataPoint.Criticality.EnumMember || oDataPoint.Criticality.Path) ? FilterUtil.getPathOrPrimitiveValue(oDataPoint.Criticality) : undefined;
					if (criticality) {
						if (criticality.indexOf("path") !== -1) {
							criticality = oDataPoint.Criticality.Path ? data.results[i][oDataPoint.Criticality.Path] : undefined;
						}
						data.results[i].color = this.getCriticalityIndicatorFromEnum(criticality);
					}
				} else {
					var sImproveDirection = FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.ImprovementDirection.EnumMember") ? FilterUtil.getPrimitiveValue(oDataPoint.CriticalityCalculation.ImprovementDirection) : undefined;
					if (sImproveDirection) {
						//checks if each of the threshold values are defined, if not, returns undefined
						//If defined and value is hard-coded, returns that value and if path is mentioned, returns value from path
						if (FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.ToleranceRangeLowValue")) {
							var toleranceLow = FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.ToleranceRangeLowValue.Int") ? Number(oDataPoint.CriticalityCalculation.ToleranceRangeLowValue.Int) : Number(data.results[i][oDataPoint.CriticalityCalculation.ToleranceRangeLowValue.Path]);
						}
						if (FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.ToleranceRangeHighValue")) {
							var toleranceHigh = FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.ToleranceRangeHighValue.Int") ? Number(oDataPoint.CriticalityCalculation.ToleranceRangeHighValue.Int) : Number(data.results[i][oDataPoint.CriticalityCalculation.ToleranceRangeHighValue.Path]);
						}
						if (FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.DeviationRangeLowValue")) {
							var deviationLow = FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.DeviationRangeLowValue.Int") ? Number(oDataPoint.CriticalityCalculation.DeviationRangeLowValue.Int) : Number(data.results[i][oDataPoint.CriticalityCalculation.DeviationRangeLowValue.Path]);
						}
						if (FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.DeviationRangeHighValue")) {
							var deviationHigh = FilterUtil.readProperty(oDataPoint,"CriticalityCalculation.DeviationRangeHighValue.Int") ? Number(oDataPoint.CriticalityCalculation.DeviationRangeHighValue.Int) : Number(data.results[i][oDataPoint.CriticalityCalculation.DeviationRangeHighValue.Path]);
						}
						//This is to ensure that any value other than number is treated as undefined
						if (isNaN(deviationLow)) {
							deviationLow = undefined;
						}
						if (isNaN(deviationHigh)) {
							deviationHigh = undefined;
						}
						if (isNaN(toleranceLow)) {
							toleranceLow = undefined;
						}
						if (isNaN(toleranceHigh)) {
							toleranceHigh = undefined;
						}
						var value = Number(data.results[i][measureField]);
						this.setVals(toleranceLow, toleranceHigh, deviationLow, deviationHigh, value);
						data.results[i].color = (this[sImproveDirection]());
					}
				}
			}
			return data;
		};
	return CriticalityUtil;
}, true);
