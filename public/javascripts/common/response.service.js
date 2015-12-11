(function(){
	'use strict';

	angular
		.module('app.common')
		.factory('responseService', responseService);

	function responseService(){
		var factory = {};
		factory.check = check;
		return factory;

		function check(response){
			//response.data.paginate means that it is a search request
			if(response.config.method == "POST" && !response.data.paginate){
				toastr.success("آیتم با موفقیت افزوده شد");
			}
			if(response.config.method == "PUT"){
				toastr.success("آیتم با موفقیت ویرایش شد");
			}
			if(response.config.method == "DELETE"){
				toastr.warning("آیتم با موفقیت حذف شد");
			}

			return response;
		}
	}
})();