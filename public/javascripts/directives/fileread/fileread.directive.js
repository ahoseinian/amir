(function(){
	'use strict';

	angular
		.module('app.directives')
		.directive("fileread", fileread); 

		function fileread() {
			var directive = {
				link: link,
        scope: {
          fileread: "="
        },
			}
	    return directive;


      function link(scope, element, attributes) {
        element.bind("change", changeEvent); 

        function changeEvent(changeEvent){
          var reader = new FileReader();
          reader.onload = loadEvent;
          reader.readAsDataURL(changeEvent.target.files[0]);

          function loadEvent(loadEvent){
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          }

        }
      }
    }

})();