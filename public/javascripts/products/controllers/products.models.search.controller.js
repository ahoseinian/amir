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
			model.searchProducts(trimForSearch(vm.product));
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