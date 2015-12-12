(function(){
	'use strict';

	angular
		.module('app.routes.products')
		.controller('ProductsModelsController', ProductsModelsController);

	ProductsModelsController.$inject = ['$scope', 'model'];
	function ProductsModelsController($scope, model){
		var vm = this;
		vm.model = model.model;
		vm.remove = remove;
		vm.loadMore = loadMore;

		function remove(id){
			model.removeProduct(id);
		}

		function loadMore(){
			if($scope.$$childHead.vm.product){
				model.searchProductsNextPage($scope.$$childHead.vm.product);
			}else{
				model.getProductsNextPage();
			}
		}
	}
})();