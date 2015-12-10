(function(){
	'use strict';

	angular
		.module('app.routes.products')
		.factory('product', product); 

		product.$inject = ['$http'];
		
		function product($http){
			var factory = {};
			factory.product= {};
			factory.products=[];
			factory.getAll = getAll;
			factory.create = create;
			factory.update = update;
			factory.get = get;
			factory.save = save;

			return factory;

			function getAll() {
			  return $http.get('/api/products').success(function(data){
			    angular.copy(data, factory.products);
			  });
			};

			function create(product) {
			  return $http.post('/api/products', product).success(function(data){
			    factory.products.push(data);
			  });
			};

			function update(product){
				return $http.put('/api/products/'+ product._id, product).success(function(data){
					factory.getAll();
				});
			}

			function get(id) {
			  return $http.get('/api/products/' + id).success(function(data){
			    angular.copy(data, factory.product);
			  });
			};

			function remove(id){
				return $http.delete('/api/products/'+ id).success(function(res){
					factory.getAll();
				});
			};

			function save(product){
				if(product._id){
					factory.update(product);
				}else{
					factory.create(product);
				}
			}
		}
})();