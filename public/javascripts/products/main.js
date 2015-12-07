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
				controller: ['$scope', 'model', function($scope, model){
					if(!$scope.user){location.reload()}
					$scope.models = model.models;
				}],
				resolve:{
					modelsPromise: ['model', function(model){
						return model.getAll();
					}],
				}
			})

			.state('products.models', {
				url: "/models/:model",
				templateUrl: "/javascripts/products/templates/models.html",

				controller: ['$scope', '$state', 'model',  function($scope, $state, model){
					$scope.model = model.model;
					$scope.remove = function(id){ model.removeProduct(id); }
				}],

				resolve:{
					modelPromise: ['model', '$stateParams', function(model, $stateParams){
						return model.getByName($stateParams.model);
					}],
				}
			})

			.state('products.models.new', {
				url: "/new/:id",
				templateUrl: "/javascripts/products/templates/new.html",
				controller: ['$scope', '$state', 'model', 'product', function($scope, $state, model, product){
					$scope.product = product.product;
					$scope.add = function(){
						model.saveProduct($scope.product);
						$state.go('products.models', {model: model.model.name});
					}
				}],
				resolve:{
					productPromise: ['product', '$stateParams', function(product, $stateParams){
						if($stateParams.id){
							return product.get($stateParams.id);
						}else{
							return product.product = {};
						}
					}],
				}
			})

	}])
