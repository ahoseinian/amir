(function(){
	'use strict';

	angular
		.module('app.routes.models')
		.factory('model', model);

	model.$inject = ['$http'];
	function model($http){
		var factory = {
			model:{},
			models:[]
		};

		factory.find = find;
		factory.getAll = getAll; 
		factory.create = create; 
		factory.update = update; 
		factory.get = get; 
		factory.getByName = getByName; 
		factory.getByNameNextPage = getByNameNextPage; 
		factory.remove = remove; 
		factory.save = save; 
		factory.add_info = add_info; 
		factory.save_info = save_info;
		factory.remove_info = remove_info;
		
		factory.findProduct = findProduct;
		factory.removeProduct = removeProduct; 
		factory.createProduct = createProduct; 
		factory.updateProduct = updateProduct; 
		factory.saveProduct = saveProduct; 
		factory.searchProducts = searchProducts; 
		factory.searchProductsNextPage = searchProductsNextPage; 

		return factory;

		function find(id){
			return factory.models.find(byId) || {};

			function byId(item){
				return item._id == id;
			};
		}
		
		function findProduct(id){
			return factory.model.products.find(byId) || {};

			function byId(item){
				return item._id == id;
			};
		}

		function getAll() {
		  return $http.get('/api/models').success(function(data){
		    angular.copy(data, factory.models);
		  });
		};

		function create(model) {
		  return $http.post('/api/models', model).success(function(data){
		    factory.models.unshift(data);
		  });
		};

		function update(model){
			return $http.put('/api/models/'+ model._id, model).success(function(data){
				factory.getAll();
			});
		}

		function get(id) {
		  return $http.get('/api/models/' + id).success(function(data){
		    angular.copy(data, factory.model);
		  });
		};

		function getByName(name) {
		  return $http.get('/api/models/by/name/' + name).success(function(data){
		  	var r = data.model;
		  	r.paginate = data.paginate;
		    angular.copy(r, factory.model);
		  });
		};

		function getByNameNextPage(){
			var page = parseInt(factory.model.paginate.page) + 1;
			return $http.get('/api/models/by/name/'+ factory.model.name +'/'+ page).success(function(data){
				factory.model.products = factory.model.products.concat(data.model.products);
				factory.model.paginate = data.paginate;
			});
		}

		function remove(id){
			return $http.delete('/api/models/'+ id).success(function(res){
				factory.getAll();
			});
		};

		function save(model){
			if(model._id){
				factory.update(model);
			}else{
				factory.create(model);
			}
		}

		function add_info(type, model, info, tag){
		  return $http.post('/api/models/'+model._id+'/infos/'+type+'/'+tag, info).success(function(data){
		  	angular.copy(data, model);	
		  });
		}

		function save_info(type, model, info, tag){
		  return $http.put('/api/models/'+model._id+'/infos/'+type+'/'+tag, info).success(function(data){
		  	angular.copy(data, model);	
		  });
		}

		function remove_info(type, model, info, tag){
		  return $http.delete('/api/models/'+ model._id +'/infos/'+ type +'/'+ tag +'/'+ inffactory._id).success(function(data){
		  	angular.copy(data, model);	
		  });
		}

		function removeProduct(id){
			return $http.delete('/api/products/'+ id).success(function(res){
				factory.model.products = factory.model.products.filter(filter);

				function filter(item){
					return item._id != id;
				}
			});
		};

		function createProduct(product) {
		  return $http.post('/api/products', product).success(function(data){
		    factory.model.products.unshift(data);
		  });
		};

		function updateProduct(product){
			return $http.put('/api/products/'+ product._id, product).success(function(data){
				
			});
		}

		function saveProduct(product){
			product._model = factory.model._id;
			if(product._id){
				factory.updateProduct(product);
			}else{
				factory.createProduct(product);
			}
		}

		function searchProducts(searchParams){
			return $http.post('/api/models/'+factory.model._id+'/products/search', searchParams).success(function(data){
				data.model.paginate = data.paginate;
		    angular.copy(data.model, factory.model);
		  });
		}

		function searchProductsNextPage(searchParams){
			var page = parseInt(factory.model.paginate.page) + 1;
			return $http.post('/api/models/'+factory.model._id+'/products/search/'+ page, searchParams).success(function(data){
				factory.model.products = factory.model.products.concat(data.model.products);
				factory.model.paginate = data.paginate;
			});
		}

	}
})();