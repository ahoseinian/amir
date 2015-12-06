angular.module('models')
	.factory('model', ['$http', function($http){
		var o = {
			model:{},
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
		  return $http.get('/api/models/' + id).success(function(data){
		    angular.copy(data, o.model);
		  });
		};

		o.getByName = function(name) {
		  return $http.get('/api/models/by/name/' + name).success(function(data){
		    angular.copy(data, o.model);
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

		o.add_info = function(type, model, info){
		  return $http.post('/api/models/'+model._id+'/infos/'+type, info).success(function(data){
		  	angular.copy(data, model);	
		  });
		}

		o.remove_info = function(type, model, info){
		  return $http.delete('/api/models/'+ model._id +'/infos/'+ type +'/'+ info._id).success(function(data){
		  	angular.copy(data, model);	
		  });
		}

		o.removeProduct = function(id){
			return $http.delete('/api/products/'+ id).success(function(res){
				o.get(o.model._id);
			});
		};

		o.createProduct = function(product) {
		  return $http.post('/api/products', product).success(function(data){
		    o.model.products.push(data);
		  });
		};

		o.updateProduct = function(product){
			return $http.put('/api/products/'+ product._id, product).success(function(data){
				o.get(o.model._id);
			});
		}

		o.saveProduct = function(product){
			product._model = o.model._id;
			if(product._id){
				o.updateProduct(product);
			}else{
				o.createProduct(product);
			}
		}

		return o;
	}])