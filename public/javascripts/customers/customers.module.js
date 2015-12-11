(function(){
	'use strict';
	angular
		.module('app.routes.customers', [])
		.config(config);

	config.$inject = ['$stateProvider'];

	function config($stateProvider){
		$stateProvider
			.state('customers', {
				url: "/customers",
				templateUrl: "/javascripts/customers/templates/index.html",
				controller: 'CustomersController',
				controllerAs: 'vm',
				resolve:{
					customersPromise: ['customer', function(customer){
						return customer.getAll();
					}]
				}
			})
			
			.state('customers.new',{
				url: "/new/:id",
				templateUrl: "/javascripts/customers/templates/new.html",
				controller: 'CustomersNewController',
				controllerAs: 'vm',
			})
	}
})();
