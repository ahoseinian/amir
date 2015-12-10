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

		vm.product = model.model.products.filter(function(obj){
			return obj._id == $stateParams.id;
		})[0] || {};

		function add(){
			model.saveProduct(vm.product);
		}
	}
})();