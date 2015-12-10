(function(){
	'use strict';

	angular
		.module('app.directives')
		.directive('confirmBtn', confirmBtn);

	function confirmBtn() {
	  var directive = {
	    link: link,
	    templateUrl: '/javascripts/directives/confirm/confirm.html',
	    scope:{
	    	clickFunc: '&'
	    },
	  };

	  return directive;

	  function link(scope, el, attrs) {
    	scope.confirmed = false;
    }	
	}
})();