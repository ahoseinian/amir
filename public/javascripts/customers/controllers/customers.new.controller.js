(function(){
	'use strict';
	angular
		.module('app.routes.customers')
		.controller('CustomersNewController', CustomersNewController);

		CustomersNewController.$inject = ['customer', '$stateParams'];
		function CustomersNewController(customer, $stateParams){
			var vm = this;
			vm.customer = customer.find($stateParams.id);
			vm.add = add;
			
			function add(){
				customer.save(vm.customer);
				vm.customer = {};
			}
		}
})();