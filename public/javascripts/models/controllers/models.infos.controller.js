(function(){
	'use strict';

	angular
		.module('app.routes.models')
		.controller('ModelsInfosController', ModelsInfosController);

	ModelsInfosController.$inject = ['$stateParams', 'model'];
	function ModelsInfosController($stateParams, model){
		var vm = this;	
		vm.model = model.find($stateParams.id);
		vm.infoType = $stateParams.infoType;
		vm.info = {};
		vm.editInfo = null;

		vm.add = add;
		vm.remove = remove;
		vm.assignEditInfo = assignEditInfo;
		vm.removeOption = removeOption;
		vm.addOption = addOption;
		vm.saveOptions = saveOptions;


	  function add(tag){
			model.add_info(vm.infoType, vm.model, vm.info, tag);
			vm.info = {};
		}

	  function remove(info, tag){
			model.remove_info(vm.infoType, vm.model, info, tag);	
		}

	  function assignEditInfo(info){
			vm.editInfo = info;
			$('#myModal').modal();
		}

	  function removeOption(option){
			vm.editInfo.options = vm.editInfo.options.filter(function(obj){
				return obj !== option;
			});
		}

	  function addOption(option){
			vm.editInfo.options.push(option);
		}

	  function saveOptions(){
			model.save_info(vm.infoType, vm.model, vm.editInfo, 'selects');
			vm.editInfo = null;
			$('#myModal').modal('hide');
		}

	}

})();