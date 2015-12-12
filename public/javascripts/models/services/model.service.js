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
		factory.remove = remove; 
		factory.save = save; 
		factory.add_info = add_info; 
		factory.save_info = save_info;
		factory.remove_info = remove_info;
		
		factory.getProduct = getProduct;
		factory.getProducts = getProducts; 
		factory.getProductsNextPage = getProductsNextPage; 
		factory.findProduct = findProduct;
		factory.removeProduct = removeProduct; 
		factory.createProduct = createProduct; 
		factory.updateProduct = updateProduct; 
		factory.saveProduct = saveProduct; 
		factory.searchProducts = searchProducts; 
		factory.searchProductsNextPage = searchProductsNextPage; 

		factory.getPurchases = getPurchases; 
		factory.getPurchasesNextPage = getPurchasesNextPage; 
		factory.findPurchase = findPurchase;
		factory.removePurchase = removePurchase;
		factory.createPurchase = createPurchase;
		factory.updatePurchase = updatePurchase;
		factory.savePurchase = savePurchase; 
		factory.searchPurchases = searchPurchases; 
		factory.searchPurchasesNextPage = searchPurchasesNextPage; 

		return factory;

		function find(id){
			return factory.models.find(byId) || {};

			function byId(item){
				return item._id == id;
			};
		};


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
		  return $http.delete('/api/models/'+ model._id +'/infos/'+ type +'/'+ tag +'/'+ info._id).success(function(data){
		  	angular.copy(data, model);	
		  });
		}

		/*
		*
		* Products methods
		*/
		
		function findProduct(id){
			return factory.model.products.find(byId) || {};

			function byId(item){
				return item._id == id;
			};
		}

		function getProduct(id) {
		  return $http.get('/api/models/' + factory.model._id + '/products/' + id).success(function(data){
		    return data;
		  });
		};

		function getProducts(name) {
		  return $http.get('/api/models/' + name + '/products/page').success(function(data){
		  	var r = data.model;
		  	r.paginate = data.paginate;
		    angular.copy(r, factory.model);
		  });
		};

		function getProductsNextPage(){
			var page = parseInt(factory.model.paginate.page) + 1;
			return $http.get('/api/models/'+ factory.model._id +'/products/page/'+ page).success(function(data){
				factory.model.products = factory.model.products.concat(data.model.products);
				factory.model.paginate = data.paginate;
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



		/*
		*
		* Purchase methods
		*/
		function changePurchase(id, data){
			console.log(data);
			factory.model.purchases.forEach(fixer);

			function fixer(item, i){
				if(item._id == data._id){
					factory.model.purchases[i] = data;
				}
			}
		}

		function findPurchase(id){
			return factory.model.purchases.find(byId) || {};

			function byId(item){
				return item._id == id;
			};
		}

		function getPurchases(name) {
		  return $http.get('/api/models/' + name + '/purchases').success(function(data){
		  	var r = data.model;
		  	r.paginate = data.paginate;
		    angular.copy(r, factory.model);
		  });
		};

		function getPurchasesNextPage(){
			var page = parseInt(factory.model.paginate.page) + 1;
			return $http.get('/api/models/'+ factory.model._id +'/purchases/'+ page).success(function(data){
				factory.model.purchases = factory.model.purchases.concat(data.model.purchases);
				factory.model.paginate = data.paginate;
			});
		}

		function removePurchase(id){
			return $http.delete('/api/purchases/'+ id).success(function(res){
				factory.model.purchases = factory.model.purchases.filter(filter);

				function filter(item){
					return item._id != id;
				}
			});
		};

		function createPurchase(purchase) {
		  return $http.post('/api/purchases', purchase).success(function(data){
		    factory.model.purchases.unshift(data);
		  });
		};

		function updatePurchase(purchase){
			return $http.put('/api/purchases/'+ purchase._id, purchase).success(function(data){
				changePurchase(purchase._id, data);
			});
		}

		function savePurchase(purchase){
			purchase._model = factory.model._id;
			if(purchase._id){
				factory.updatePurchase(purchase);
			}else{
				factory.createPurchase(purchase);
			}
		}

		function searchPurchases(searchParams){
			return $http.post('/api/models/'+factory.model._id+'/purchases/search', searchParams).success(function(data){
				data.model.paginate = data.paginate;
		    angular.copy(data.model, factory.model);
		  });
		}

		function searchPurchasesNextPage(searchParams){
			var page = parseInt(factory.model.paginate.page) + 1;
			return $http.post('/api/models/'+factory.model._id+'/purchases/search/'+ page, searchParams).success(function(data){
				factory.model.purchases = factory.model.purchases.concat(data.model.purchases);
				factory.model.paginate = data.paginate;
			});
		}


	}
})();