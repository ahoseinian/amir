angular.module('directives', [])
  .directive('confirmBtn', function () {
  return {
    restrict: 'A',
    templateUrl: '/javascripts/directives/templates/confirm.html',
    scope:{
    	clickFunc: '&'
    },
    link: function (scope, el, attrs) {
    	scope.confirmed = false;
    }
  };
});

