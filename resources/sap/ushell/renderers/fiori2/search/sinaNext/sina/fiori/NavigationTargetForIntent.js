sinaDefine(['../NavigationTarget'],function(N){var _;if(typeof sap!=="undefined"&&sap.ushell&&sap.ushell.Container){_=(sap.ushell.Container.getService("SmartNavigation")||sap.ushell.Container.getService("CrossApplicationNavigation"));}return N.derive({_meta:{properties:{externalTarget:{required:true},systemId:{required:false},client:{required:false}}},performNavigation:function(p){p=p||{};var s=p.suppressTracking||false;var t=p.trackingOnly||false;if(_){if(!s){this._trackNavigation();}if(!t){_.toExternal(this.externalTarget);}}else{N.prototype.performNavigation.apply(this,arguments);}},_trackNavigation:function(){if(_&&_.trackNavigation){_.trackNavigation({target:this.externalTarget.target});}}});});
