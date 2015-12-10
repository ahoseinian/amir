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
		    o.models.unshift(data);
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
		  	r = data.model;
		  	r.paginate = data.paginate;
		    angular.copy(r, o.model);
		  });
		};

		o.getByNameNextPage = function(){
			var page = parseInt(o.model.paginate.page) + 1;
			return $http.get('/api/models/by/name/'+ o.model.name +'/'+ page).success(function(data){
				o.model.products = o.model.products.concat(data.model.products);
				o.model.paginate = data.paginate;
			});
		}

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

		o.add_info = function(type, model, info, tag){
		  return $http.post('/api/models/'+model._id+'/infos/'+type+'/'+tag, info).success(function(data){
		  	angular.copy(data, model);	
		  });
		}

		o.save_info = function(type, model, info, tag){
		  return $http.put('/api/models/'+model._id+'/infos/'+type+'/'+tag, info).success(function(data){
		  	angular.copy(data, model);	
		  });
		}

		o.remove_info = function(type, model, info, tag){
		  return $http.delete('/api/models/'+ model._id +'/infos/'+ type +'/'+ tag +'/'+ info._id).success(function(data){
		  	angular.copy(data, model);	
		  });
		}

		o.removeProduct = function(id){
			return $http.delete('/api/products/'+ id).success(function(res){
				o.model.products = o.model.products.filter(filter);

				function filter(item){
					return item._id != id;
				}
			});
		};

		o.createProduct = function(product) {
		  return $http.post('/api/products', product).success(function(data){
		    o.model.products.unshift(data);
		  });
		};

		o.updateProduct = function(product){
			return $http.put('/api/products/'+ product._id, product).success(function(data){
				
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

		o.searchProducts = function(searchParams){
			return $http.post('/api/models/'+o.model._id+'/products/search', searchParams).success(function(data){
				data.model.paginate = data.paginate;
		    angular.copy(data.model, o.model);
		  });
		}

		o.searchProductsNextPage = function(searchParams){
			var page = parseInt(o.model.paginate.page) + 1;
			return $http.post('/api/models/'+o.model._id+'/products/search/'+ page, searchParams).success(function(data){
				o.model.products = o.model.products.concat(data.model.products);
				o.model.paginate = data.paginate;
			});
		}

		return o;
	}])