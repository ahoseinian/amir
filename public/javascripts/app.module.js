(function(){
	'use strict';
	angular
		.module('myApp', [
			'ui.router',
			'app.common',
			'app.directives', 
			'app.routes.users', 
			'app.routes.models', 
			'app.routes.customers',
			'app.routes.products', 
			'app.routes.purchases', 
			'angular-loading-bar',
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
