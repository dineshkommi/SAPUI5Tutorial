sap.ui.define([], function(){
	'use strict';

	/**
	 * this ajax wrapper takes care of token handling on ajax requestsfor SAP CloudFoundry. It automatically fetches 
	 * the xsrf token and sets the proper request headers.
	  * @constructor
	 * @name sap.apf.cloudFoundry.AjaxHandler
	 * @since SAP UI5 1.54.0.
	 *
	 * @param {sap.apf.core.ajax} inject.functions.coreAjax the core ajax, to whom the ajax call is delegated
	 * @param {sap.apf.core.MessageHandler} inject.instances.messageHandler the message handler
	 */
	var AjaxHandler = function(inject) {
		var coreAjax = inject.functions.coreAjax;
		var messageHandler = inject.instances.messageHandler;
		var xsrfToken;

		function getXsrfTokenAsPromise() {
			var deferred = jQuery.Deferred();
			if (xsrfToken !== undefined) {
				deferred.resolve(xsrfToken);
			} else {
				coreAjax({
					url : "/",
					type : "HEAD",
					beforeSend : function(xhr) {
						xhr.setRequestHeader("x-csrf-token", "Fetch");
					},
					success : function(oData, sStatus, oXMLHttpRequest){
						xsrfToken =  oXMLHttpRequest.getResponseHeader("x-csrf-token");
						deferred.resolve(xsrfToken);
					},
					error : function() {
						//same handling as in session handler!
						xsrfToken = "";
						var messageObject = messageHandler.createMessageObject({code : 5105});
						messageHandler.putMessage(messageObject);
						deferred.resolve(xsrfToken);
					}
				});
			}
			return deferred.promise();
		}

		/**
		 * the ajax call
		 * @param {object} settings are equal to the ajax settings
		 */
		this.send = function(settings) {

			if (settings.type === "POST" || settings.type === "PUT" || settings.type === "DELETE") {
				getXsrfTokenAsPromise(coreAjax, messageHandler).done(function(xsrfToken){
					settings.headers = settings.headers || {};
					settings.headers["X-CSRF-Token"] = xsrfToken;
					if (settings.data && !settings.headers["Content-Type"]) {
						settings.headers["Content-Type"] = "application/json;charset=utf-8";
					}
					coreAjax(settings);
				});
			} else {
				coreAjax(settings);
			}
		};
	};

	/* BEGIN_COMPATIBILITY */
	sap.apf.cloudFoundry.AjaxHandler = AjaxHandler;
	/* END_COMPATIBILITY */
	return AjaxHandler;
}, true);