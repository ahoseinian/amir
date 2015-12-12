(function(){
	'use strict';

	angular
		.module('app.routes.purchases')
		.controller('PurchasesModelsController', PurchasesModelsController);

	PurchasesModelsController.$inject = ['$scope', 'model'];
	function PurchasesModelsController($scope, model){
		var vm = this;
		vm.model = model.model;
		vm.remove = remove;
		vm.loadMore = loadMore;

		function remove(id){
			model.removePurchase(id);
		}

		function loadMore(){
			if($scope.$$childHead.vm.purchase){
				model.searchPurchasesNextPage($scope.$$childHead.vm.purchase);
			}else{
				model.getPurchasesNextPage();
			}
		}
	}
})();