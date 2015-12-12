(function(){
	'use strict';

	angular
		.module('app.routes.products', [])
		.config(config);

		config.$inject = ['$stateProvider'];
		function config($stateProvider){
			$stateProvider

				.state('products', {
					url: "/products",
					templateUrl: "/javascripts/products/templates/index.html",
					controller: 'ProductsController',
					controllerAs: 'vm',
					resolve:{
						modelsPromise: ['model', function(model){
							return model.getAll();
						}],
					}
				})

				.state('products.models', {
					url: "/models/:id",
					templateUrl: "/javascripts/products/templates/models.html",
					controller: 'ProductsModelsController',
					controllerAs: 'vm',
					resolve:{
						modelPromise: ['model', '$stateParams', function(model, $stateParams){
							return model.getProducts($stateParams.id);
						}],
					}
				})

				.state('products.models.new', {
					url: "/new/:pid",
					templateUrl: "/javascripts/products/templates/new.html",
					controller: 'ProductsModelsNewController',
					controllerAs: 'vm',
				})

				.state('products.models.search', {
					url: '/search',
					templateUrl: "/javascripts/products/templates/search.html",
					controller: 'ProductsModelsSearchController',
					controllerAs: 'vm',
				})

		}
})();
