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
					$scope.modelService = model;
					$scope.model = model.model;
					$scope.remove = function(id){ model.removeProduct(id); }
					$scope.loadMore = function(){
						if($scope.$$childHead.product){
							model.searchProductsNextPage($scope.$$childHead.product);
						}else{
							model.getByNameNextPage();
						}
					}
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
				controller: ['$scope', '$state', '$stateParams', 'model', 'product', function($scope, $state, $stateParams, model, product){
					$scope.product = $scope.modelService.model.products.filter(function(obj){
						return obj._id == $stateParams.id;
					})[0] || {};
					$scope.add = function(){
						$scope.modelService.saveProduct($scope.product);
						$state.go('products.models', {model: model.model.name});
					}
				}],
			})

			.state('products.models.search', {
				url: '/search',
				templateUrl: "/javascripts/products/templates/search.html",
				controller: ['$scope', '$stateParams', function($scope, $stateParams){
					$scope.product = {};
					$scope.search = function(){
						for (var i in $scope.product) {
						  if ($scope.product[i] === "" || $scope.product[i] === null) {
						    delete $scope.product[i];
						  }
						}
						$scope.$parent.modelService.searchProducts($scope.product);
					};

					$scope.loadMore = function(){

					}
				}],
			})

	}])
