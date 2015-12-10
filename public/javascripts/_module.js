(function(){
	'use strict';
	angular
		.module('myApp', [
			'ui.router',
			'app.directives', 
			'app.routes.products', 
			'app.routes.users', 
			'models', 
			'app.routes.customers'
		])
		.config(config);


	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function config($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "templates/home.html",
			})
	};

})();
