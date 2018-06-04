// Copyright (c) 2009-2017 SAP SE, All Rights Reserved

sap.ui.define([
    'sap/m/GenericTile',
    'sap/m/TileContent',
    'sap/m/NumericContent'
    ], function(GenericTile, TileContent, NumericContent) {
	"use strict";

    sap.ui.jsview("sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile", {
        getControllerName: function () {
            return "sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile";
        },
        createContent: function (oController) {
            this.setHeight('100%');
            this.setWidth('100%');

            return new GenericTile({
                size:       'Auto',
                header:     '{/properties/title}',
                subheader:  '{/properties/subtitle}',
                tileContent: [new TileContent({
                    size: 'Auto',
                    footer: '{/properties/info}',
                    footerColor: '{/data/display_info_state}',
                    unit:   '{/properties/number_unit}',
                    content: [new NumericContent({
                        truncateValueTo: 5,//Otherwise, The default value is 4.
                        scale:      '{/properties/number_factor}',
                        value:      '{/properties/number_value}',
                        indicator:  '{/properties/number_state_arrow}',
                        valueColor: '{/properties/number_value_state}',
                        icon:       '{/properties/icon}',
                        width: '100%'
                    })]
                })],
                press : [ oController.onPress, oController ]
            });
        }

    });


}, /* bExport= */ true);
