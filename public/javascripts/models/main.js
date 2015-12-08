angular.module('models', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

		$stateProvider

			.state('models', {
				url: "/models",
				templateUrl: "/javascripts/models/templates/index.html",
				controller: ['$scope', 'model', '$state', function($scope, model , $state){
					if(!$scope.user){location.reload()}
					$scope.models = model.models;

					$scope.remove = function(id){ model.remove(id);}
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

			.state('models.infos',{
				url: "/:id/infos/:infoType",
				templateUrl: "/javascripts/models/templates/infos.html",
				controller: ['$scope', '$stateParams', '$state', 'model', function($scope, $stateParams, $state, model){
					$scope.model = model.model;
					$scope.infoType = $stateParams.infoType;
					$scope.info = {};
					$scope.editInfo = null;

					$scope.add = function(tag){
						model.add_info($scope.infoType, $scope.model, $scope.info, tag);
						$scope.info = {};
					}

					$scope.remove = function(info, tag){
						model.remove_info($scope.infoType, $scope.model, info, tag);	
					}

					$scope.assignEditInfo = function(info){
						$scope.editInfo = info;
						$('#myModal').modal();
					}

					$scope.removeOption = function(option){
						console.log(option);
						console.log($scope.editInfo);
						$scope.editInfo.options = $scope.editInfo.options.filter(function(obj){
							return obj !== option;
						});

					}

					$scope.addOption = function(option){
						$scope.editInfo.options.push(option);
					}

					$scope.saveOptions = function(){
						model.save_info($scope.infoType, $scope.model, $scope.editInfo, 'selects');
						$scope.editInfo = null;
						$('#myModal').modal('hide');
					}

				}],
				resolve:{
					modelsPromise: ['model', '$stateParams', function(model, $stateParams){
						return model.get($stateParams.id);
					}]
				}
			})



	}])
