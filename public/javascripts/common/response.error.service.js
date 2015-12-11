(function(){
	'use strict';

	angular
		.module('app.common')
		.factory('responseErrorService', responseErrorService);

	responseErrorService.$inject = ['$q'];	
	function responseErrorService($q){
		var factory = {};
		factory.check = check;
		return factory;

		function check(response){
			if(response.status == 409){
				toastr.error("آیتم مورد نظر وجود دارد");
			}else if(response.status == 400){
				toastr.error("اطلاعات وارد شده صحیح نمیباشند یا قبلا وارد شده اند");
			}else{
				toastr.error("مشکلی در برقراری ارتباط وجود دارد دوباره تلاش کنید");
			}
			return $q.reject(response);
		}
	}
})();