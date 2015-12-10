(function(){
	'use strict';

	angular
		.module('app.routes.users')
		.controller('UsersController', UsersController);

	UsersController.$inject = ['$scope', 'user', '$state'];
	function UsersController($scope, user, $state){
		if(!$scope.user){location.reload()}
		var vm = this;
		vm.users = user.users;
		vm.remove = remove;

		function remove(id){
			user.remove(id);
		}
	}
	
})();