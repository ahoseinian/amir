angular.module('myApp', ['ui.router', 'directives', 'products', 'users', 'models', 'customers'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "templates/home.html"
			})

	}]);

