sap.ui.define(["sap/ovp/cards/generic/Component", "sap/ovp/cards/charts/VizAnnotationManager"],

    function (CardComponent, VizAnnotationManager) {
        "use strict";

        return CardComponent.extend("sap.ovp.cards.charts.analytical.Component", {
            // use inline declaration instead of component.json to save 1 round trip
            metadata: {
                properties: {
                    "headerExtensionFragment": {
                        "type": "string",
                        "defaultValue": "sap.ovp.cards.generic.KPIHeader"
                    },
                    "contentFragment": {
                        "type": "string",
                        "defaultValue": "sap.ovp.cards.charts.analytical.analyticalChart"
                    }
                },

                version: "1.54.3",

                library: "sap.ovp",

                includes: [],

                dependencies: {
                    libs: ["sap.viz"],
                    components: []
                },
                config: {},
                customizing: {
                    "sap.ui.controllerExtensions": {
                        "sap.ovp.cards.generic.Card": {
                            controllerName: "sap.ovp.cards.charts.analytical.analyticalChart"
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
