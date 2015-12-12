(function(){
	'use strict';

	angular
		.module('app.routes.purchases')
		.controller('PurchasesModelsSearchController', PurchasesModelsSearchController);

	PurchasesModelsSearchController.$inject = ['model', 'customer'];
	function PurchasesModelsSearchController(model, customer){
		var vm = this;
		vm.route = 'جستجو';
		vm.purchase = {};
		vm.model = model.model;
		vm.customers = customer.customers;

		vm.processForm = processForm;
		vm.getProduct = getProduct;

		if(vm.purchase._product){
			vm.productCode = vm.purchase._product.code;
		}

		function processForm(){
			model.searchPurchases(trimForSearch(vm.purchase));
		};

		function trimForSearch(item){
			for (var i in item) {
			  if (item[i] === "" || item[i] === null || item[i]._id === null) {
			    delete item[i];
			  }
			}
			return item;
		}

		function getProduct(){
			if(vm.productCode){
				model
					.getProduct(vm.productCode)
					.success((data) => vm.purchase._product = data );
			}
		}
	}
})();