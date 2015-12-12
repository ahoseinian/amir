(function(){
	'use strict';

	angular
		.module('app.routes.purchases')
		.controller('PurchasesModelsNewController', PurchasesModelsNewController);

	PurchasesModelsNewController.$inject = ['$stateParams', 'model', 'customer'];
	function PurchasesModelsNewController($stateParams, model, customer){
		var vm = this;
		vm.model = model.model;
		vm.customers = customer.customers;
		vm.purchase = model.findPurchase($stateParams.pid);

		vm.add = add;
		vm.getProduct = getProduct;

		if(vm.purchase._product){
			vm.productCode = vm.purchase._product.code;
		}

		function add(){
			model.savePurchase(vm.purchase);
			vm.purchase = {};
		}

		function getProduct(){
			if(vm.productCode){
				model.getProduct(vm.productCode).success(function(data){
					vm.purchase._product = data;
				});
			}
		}
	}
	
})();