(function(){
	'use strict';

	angular
		.module('app.routes.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope', 'model'];
	function ProductsController($scope, model){
		var vm = this;
		if(!$scope.user){location.reload()}
		vm.models = model.models;
	}
})();