sap.ui.define([
	"sap/ui/demo/cardExplorer/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/DocumentationNavigationModel",
	"sap/ui/Device"
], function(
	BaseController,
	JSONModel,
	DocumentationNavigationModel,
	Device
) {
	"use strict";

	return BaseController.extend("sap.ui.demo.cardExplorer.controller.LearnDetail", {

		/**
		 * Called when the controller is instantiated.
		 */
		onInit : function () {
			this.getRouter().getRoute("learnDetail").attachPatternMatched(this._onTopicMatched, this);
			this.getRouter().getRoute("default").attachPatternMatched(this._onTopicMatched, this);

			this.jsonDefModel = new JSONModel();
			this.getView().setModel(this.jsonDefModel);
		},

		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} event pattern match event in route 'topicId'
		 * @private
		 */
		_onTopicMatched: function (event) {
			var topicId = event.getParameter("arguments").key || 'overview',
				navEntry = this._findNavEntry(topicId),
				topicURL = "./topics/learn/" + topicId + '.html',
				pageTitle = navEntry.topicTitle ||  navEntry.title;

			var jsonObj = {
				pageTitle: pageTitle,
				topicURL : topicURL,
				bIsPhone : Device.system.phone
			};

			this.jsonDefModel.setData(jsonObj);
		},

		_findNavEntry: function (key) {
			var navEntries = DocumentationNavigationModel.getProperty('/navigation'),
				navEntry,
				subItems,
				i,
				j;

			for (i = 0; i < navEntries.length; i++) {
				navEntry  = navEntries[i];

				if (navEntry.key === key) {
					return navEntry;
				}

				subItems = navEntry.items;

				if (subItems) {
					for (j = 0; j < subItems.length; j++) {
						if (subItems[j].key === key) {
							return subItems[j];
						}
					}
				}
			}
		}
	});
});