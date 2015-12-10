(function(){
	'use strict';

	angular
		.module('app.routes.models')
		.controller('ModelsNewController', ModelsNewController);

	ModelsNewController.$inject = ['model', '$stateParams'];
	function ModelsNewController(model, $stateParams){
		var vm = this;
		vm.model = model.find($stateParams.id);
		vm.add = add;

		function add(){
			model.save(vm.model);
			vm.model = {};
		}
	}
})();