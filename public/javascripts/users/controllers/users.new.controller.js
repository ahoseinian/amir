(function(){
	'use strict';

	angular
		.module('app.routes.users')
		.controller('UsersNewController', UsersNewController);

	UsersNewController.$inject = ['$stateParams', 'user'];
	function UsersNewController($stateParams, user){
		var vm = this;
		vm.user = user.find($stateParams.id);
		vm.add = add;

		function add(){
			user.save(vm.user);
			vm.user = {};
		}
	}
	
})();