angular.module('models', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('models', {
				url: "/models",
				templateUrl: "/javascripts/models/templates/index.html",
				controller: ['$scope', 'model', '$state', function($scope, model , $state){
					if(!$scope.user){location.reload()}
					$scope.models = model.models;

					$scope.remove = function(id){ model.remove(id); }
					$scope.edit = function(model){ $state.go('models.new', {model: model}); }
				}],
				resolve:{
					modelsPromise: ['model', function(model){
						return model.getAll();
					}]
				}
			})
			.state('models.new',{
				url: "/new",
				templateUrl: "/javascripts/models/templates/new.html",
				params:{
					model: null,
				},
				controller: ['$scope', 'model', '$stateParams', function($scope, model, $stateParams){

					$scope.model = $stateParams.model;
					$scope.add = function(){
						model.save($scope.model);
						$scope.model = {};
					}
				}],	
			})
	}])
