(function(){
	'use strict';

	angular
		.module('app.routes.products')
		.controller('ProductsModelsSearchController', ProductsModelsSearchController);

	ProductsModelsSearchController.$inject = ['model'];
	function ProductsModelsSearchController(model){
		var vm = this;
		vm.product = {};
		vm.model = model.model;
		vm.search = search;


		function search(){
			for (var i in vm.product) {
			  if (vm.product[i] === "" || vm.product[i] === null) {
			    delete vm.product[i];
			  }
			}
			model.searchProducts(vm.product);
		};
	}
})();