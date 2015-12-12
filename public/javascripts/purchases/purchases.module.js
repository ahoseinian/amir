(function(){
	'use strict';

	angular
		.module('app.routes.purchases', [])
		.config(config);

		config.$inject = ['$stateProvider'];
		function config($stateProvider){
			$stateProvider

				.state('purchases', {
					url: "/purchases",
					templateUrl: "/javascripts/purchases/templates/index.html",
					controller: 'PurchasesController',
					controllerAs: 'vm',
					resolve:{
						modelsPromise: ['model', function(model){
							return model.getAll();
						}],
					}
				})

				.state('purchases.models', {
					url: "/models/:id",
					templateUrl: "/javascripts/purchases/templates/models.html",
					controller: 'PurchasesModelsController',
					controllerAs: 'vm',
					resolve:{
						modelPromise: ['model', '$stateParams', function(model, $stateParams){
							return model.getPurchases($stateParams.id);
						}],
					}
				})

				.state('purchases.models.new', {
					url: "/new/:pid",
					templateUrl: "/javascripts/purchases/templates/new.html",
					controller: 'PurchasesModelsNewController',
					controllerAs: 'vm',
					resolve:{
						customerPromise: ['customer', function(customer){
							return customer.getAll();
						}],
					}
				})

				.state('purchases.models.search', {
					url: '/search',
					templateUrl: "/javascripts/purchases/templates/search.html",
					controller: 'PurchasesModelsSearchController',
					controllerAs: 'vm',
				})

		}
})();
