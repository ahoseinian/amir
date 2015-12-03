angular.module('products', [])
	.controller('indexController', ['$scope', 'product', function($scope, product){
		$scope.products = product.product;
	}])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('products', {
				url: "/index",
				templateUrl: "/javascripts/products/templates/index.html",
				controller: 'indexController',
			})
	}])
