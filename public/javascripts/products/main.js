angular.module('products', [])
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


	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('products', {
				url: "/products",
				templateUrl: "/javascripts/products/templates/index.html",
				controller: ['$scope', 'product', '$state', function($scope, product , $state){
					if(!$scope.user){location.reload()}
					$scope.products = product.products;

					$scope.remove = function(id){ product.remove(id); }
					$scope.edit = function(product){ $state.go('products.new', {product: product}); }
				}],
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
				controller: ['$scope', 'product', '$stateParams', function($scope, product, $stateParams){

					$scope.product = $stateParams.product;
					$scope.add = function(){
						product.save($scope.product);
						$scope.product = {};
					}
				}],	
			})
	}])
