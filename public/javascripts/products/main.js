angular.module('products', ['notification'])
	.controller('IndexController', ['$scope', 'product', '$notification', '$state', function($scope, product ,$notification, $state){
		$scope.products = product.products;

		$scope.remove = function(id){
			product.remove(id);
			$notification('Message',{
				body: 'Product has been removed'
			})
		}

		$scope.edit = function(product){
			console.log(product);
			$state.go('products.new', {product: product});
		}
	}])

	.controller('NewController', ['$scope', 'product', '$notification', '$stateParams', function($scope, product, $notification, $stateParams){

		$scope.product = $stateParams.product;
		$scope.add = function(){

			if($scope.product._id){
				product.update($scope.product);
				$notification('Product',{
					body: 'Product has been updated'
				})
			}else{
				product.create($scope.product);
				$notification('Product',{
					body: 'Product has been added'
				})
			}
			$scope.product = {};
		}
	}])

	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('products', {
				url: "/products",
				templateUrl: "/javascripts/products/templates/index.html",
				controller: 'IndexController',
				resolve:{
					productsPromise: ['product', function(product){
						return product.getAll();
					}]
				}
			})
			.state('products.new',{
				url: "/new",
				templateUrl: "/javascripts/products/templates/new.html",
				params:{
					product: null,
				},
				controller: 'NewController',	
			})
	}])
