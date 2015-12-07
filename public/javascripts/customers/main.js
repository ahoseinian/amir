angular.module('customers', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('customers', {
				url: "/customers",
				templateUrl: "/javascripts/customers/templates/index.html",
				controller: ['$scope', 'customer', '$state', function($scope, customer , $state){
					$scope.customers = customer.customers;

					$scope.remove = function(id){
						customer.remove(id);
					}

					$scope.edit = function(customer){
						$state.go('customers.new', {customer: customer});
					}
				}],
				resolve:{
					customersPromise: ['customer', function(customer){
						return customer.getAll();
					}]
				}
			})
			.state('customers.new',{
				url: "/new",
				templateUrl: "/javascripts/customers/templates/new.html",
				params:{
					customer: null,
				},
				controller: ['$scope', 'customer', '$stateParams', function($scope, customer, $stateParams){
					$scope.customer = $stateParams.customer;
					$scope.add = function(){
						customer.save($scope.customer);
						$scope.customer = {};
					}
				}],	
			})
	}])
