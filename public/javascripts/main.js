angular.module('myApp', ['ui.router', 'app.directives', 'app.routes.products', 'users', 'models', 'customers'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "templates/home.html"
			})

	}]);

