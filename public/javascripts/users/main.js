angular.module('users', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('users', {
				url: "/users",
				templateUrl: "/javascripts/users/templates/index.html",
				controller: ['$scope', 'user', '$state', function($scope, user , $state){
					if(!$scope.user){location.reload()}
					$scope.users = user.users;

					$scope.remove = function(id){
						user.remove(id);
					}

					$scope.edit = function(user){
						$state.go('users.new', {user: user});
					}
				}],
				resolve:{
					usersPromise: ['user', function(user){
						return user.getAll();
					}]
				}
			})
			.state('users.new',{
				url: "/new",
				templateUrl: "/javascripts/users/templates/new.html",
				params:{
					user: null,
				},
				controller: ['$scope', 'user', '$stateParams', function($scope, user, $stateParams){
					$scope.user = $stateParams.user;
					$scope.add = function(){
						user.save($scope.user);
						$scope.user = {};
					}
				}],	
			})
	}])
