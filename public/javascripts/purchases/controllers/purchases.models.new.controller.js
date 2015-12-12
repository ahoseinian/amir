(function(){
	'use strict';

	angular
		.module('app.routes.purchases')
		.controller('PurchasesModelsNewController', PurchasesModelsNewController);

	PurchasesModelsNewController.$inject = ['$stateParams', 'model', 'customer'];
	function PurchasesModelsNewController($stateParams, model, customer){
		const vm = this;
		vm.route = 'جدید';
		vm.newRoute = true;
		vm.model = model.model;
		vm.customers = customer.customers;
		vm.purchase = model.findPurchase($stateParams.pid);

		vm.processForm = processForm;
		vm.getProduct = getProduct;

		if(vm.purchase._product){
			vm.productCode = vm.purchase._product.code;
		}

		function processForm(){
			model.savePurchase(vm.purchase);
			
			if(!vm.purchase._id){
				vm.purchase = {};
				vm.productCode = null;
			}
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