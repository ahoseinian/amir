(function(){
	'use strict';

	angular
		.module('app.routes.models')
		.controller('ModelsController', ModelsController);

	ModelsController.$inject = ['$scope', 'model'];
	function ModelsController($scope, model){
		if(!$scope.user){location.reload()};
		var vm = this; 
		vm.models = model.models;
		vm.remove = remove;

		function remove(id){ 
			model.remove(id);
		}
	}
})();