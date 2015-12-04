angular.module('products', ['notification', 'ngFileUpload'])
	.directive("fileread", [function () {
	    return {
	        scope: {
	            fileread: "="
	        },
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                var reader = new FileReader();
	                reader.onload = function (loadEvent) {
	                    scope.$apply(function () {
	                        scope.fileread = loadEvent.target.result;
	                    });
	                }
	                reader.readAsDataURL(changeEvent.target.files[0]);
	            });
	        }
	    }
	}])
	.controller('IndexController', ['$scope', 'product', '$notification', '$state', function($scope, product ,$notification, $state){
		$scope.products = product.products;

		$scope.remove = function(id){
			product.remove(id);
		}

		$scope.edit = function(product){
			$state.go('products.new', {product: product});
		}
	}])

	.controller('NewController', ['$scope', 'product', '$notification', '$stateParams', function($scope, product, $notification, $stateParams){

		$scope.product = $stateParams.product;
		$scope.add = function(){
			product.save($scope.product);
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
