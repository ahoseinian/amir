(function(){
	'use strict';

	angular
		.module('app.routes.purchases')
		.controller('PurchasesModelsSearchController', PurchasesModelsSearchController);

	PurchasesModelsSearchController.$inject = ['model'];
	function PurchasesModelsSearchController(model){
		var vm = this;
		vm.purchase = {};
		vm.model = model.model;
		vm.search = search;

		function search(){
			model.searchPurchases(trimForSearch(vm.purchase));
		};

		function trimForSearch(item){
			for (var i in item) {
			  if (item[i] === "" || item[i] === null) {
			    delete item[i];
			  }
			}
			return item;
		}
	}
})();