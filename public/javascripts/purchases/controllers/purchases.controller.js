(function(){
	'use strict';

	angular
		.module('app.routes.purchases')
		.controller('PurchasesController', PurchasesController);

	PurchasesController.$inject = ['$scope', 'model'];
	function PurchasesController($scope, model){
		var vm = this;
		if(!$scope.user){location.reload()}
		vm.models = model.models;
	}
})();