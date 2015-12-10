(function(){
	'use strict';

	angular
		.module('app.routes.users', [])
		.config(config);

	config.$inject = ['$stateProvider']
  function config($stateProvider){

		$stateProvider
			.state('users', {
				url: "/users",
				templateUrl: "/javascripts/users/templates/index.html",
				controller: 'UsersController',
				controllerAs: 'vm',
				resolve:{
					usersPromise: ['user', function(user){
						return user.getAll();
					}]
				}
			})

			.state('users.new',{
				url: "/new/:id",
				templateUrl: "/javascripts/users/templates/new.html",
				controller: 'UsersNewController',
				controllerAs: 'vm',	
			})
			
	}
})();

