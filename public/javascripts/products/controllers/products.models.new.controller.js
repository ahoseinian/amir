(function(){
	'use strict';

	angular
		.module('app.routes.products')
		.controller('ProductsModelsNewController', ProductsModelsNewController);

	ProductsModelsNewController.$inject = ['$stateParams', 'model'];
	function ProductsModelsNewController($stateParams, model){
		var vm = this;
		vm.add = add;
		vm.model = model.model;
		vm.product = model.findProduct($stateParams.pid);

		function add(){
			model.saveProduct(vm.product);
			vm.product = {};
		}
	}
	
})();