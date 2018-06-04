sap.ui.define(["sap/ovp/cards/generic/Component", "sap/ovp/cards/charts/SmartAnnotationManager",
        "sap/ovp/cards/charts/VizAnnotationManager"],

    function (CardComponent, SmartAnnotationManager, VizAnnotationManager) {
        "use strict";
        /*global jQuery, sap */

        return CardComponent.extend("sap.ovp.cards.charts.smart.chart.Component", {
            // use inline declaration instead of component.json to save 1 round trip
            metadata: {
                properties: {
                    "headerExtensionFragment": {
                        "type": "string",
                        "defaultValue": "sap.ovp.cards.generic.KPIHeader"
                    },
                    "contentFragment": {
                        "type": "string",
                        "defaultValue": "sap.ovp.cards.charts.smart.chart.analyticalChart"
                    }
                },

                version: "@version@",

                library: "sap.ovp",

                includes: [],

                dependencies: {
                    libs: ["sap.m", "sap.viz", "sap.ui.comp"],
                    components: []
                },
                config: {},
                customizing: {
                    "sap.ui.controllerExtensions": {
                        "sap.ovp.cards.generic.Card": {
                            controllerName: "sap.ovp.cards.charts.smart.chart.analyticalChart"
                        }
                    }
                }
            },

            onAfterRendering: function () {
                jQuery(".tabindex0").attr("tabindex", 0);
                jQuery(".tabindex-1").attr("tabindex", -1);
            }
        });
    }
);
