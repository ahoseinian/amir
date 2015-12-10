(function(){
	'use strict';
	angular
		.module('app.routes.customers')
		.controller('CustomersController', CustomersController);

		CustomersController.$inject = ['customer'];
		function CustomersController(customer){
			var vm = this;
			vm.customers = customer.customers;
			vm.remove = remove;

			function remove(id){
				customer.remove(id);
			}
		}
})();