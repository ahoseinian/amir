angular.module('models')
	.factory('model', ['$http', function($http){
		var o = {
			models:[]
		};

		o.getAll = function() {
		  return $http.get('/api/models').success(function(data){
		    angular.copy(data, o.models);
		  });
		};

		o.create = function(model) {
		  return $http.post('/api/models', model).success(function(data){
		    o.models.push(data);
		  });
		};

		o.update = function(model){
			return $http.put('/api/models/'+ model._id, model).success(function(data){
				o.getAll();
			});
		}

		o.get = function(id) {
		  return $http.get('/api/models/' + id).then(function(res){
		    return res.data;
		  });
		};

		o.remove = function(id){
			return $http.delete('/api/models/'+ id).success(function(res){
				o.getAll();
			});
		};

		o.save = function(model){
			if(model._id){
				o.update(model);
			}else{
				o.create(model);
			}
		}

		return o;
	}])