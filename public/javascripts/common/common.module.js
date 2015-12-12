(function(){
	'use strict';
	angular
		.module('app.common', [])
		.config(configure);

	configure.$inject = ['$httpProvider'];
	function configure($httpProvider){

		//toastr options

		// toastr.options.progressBar = true;
		toastr.options.timeOut = 3000;

		//interceptor
		responseInterceptor.$inject = ["responseService", "responseErrorService"];
		function responseInterceptor(responseService, responseErrorService){
	    var interceptor = { response: handler, responseError: errorHandler };
	    return interceptor;

	    function handler(response) {
      	return responseService.check(response);
	    }
	    function errorHandler(response) {
      	return responseErrorService.check(response);
	    }
		}

    $httpProvider.interceptors.push(responseInterceptor);
	}
})();