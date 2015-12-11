(function(){
	'use strict';

	angular
		.module('app.routes.models', [])
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider){
		$stateProvider

			.state('models', {
				url: "/models",
				templateUrl: "/javascripts/models/templates/index.html",
				controller: 'ModelsController',
				controllerAs: 'vm',
				resolve:{
					modelsPromise: ['model', function(model){
						return model.getAll();
					}]
				}
			})

			.state('models.new',{
				url: "/new/:id",
				templateUrl: "/javascripts/models/templates/new.html",
				controller: 'ModelsNewController',
				controllerAs: 'vm',	
			})

			.state('models.infos',{
				url: "/:id/infos/:infoType",
				templateUrl: "/javascripts/models/templates/infos.html",
				controller: 'ModelsInfosController',
				controllerAs: 'vm',	
			})
	}
})();
