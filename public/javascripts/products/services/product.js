angular.module('products')
	.factory('product', ['$http', function($http){
		var o = {
			products:[]
		};

		o.getAll = function() {
		  return $http.get('/api/products').success(function(data){
		    angular.copy(data, o.products);
		  });
		};

		o.create = function(product) {
		  return $http.post('/api/products', product).success(function(data){
		    o.products.push(data);
		  });
		};

		o.update = function(product){
			return $http.put('/api/products/'+ product._id, product).success(function(data){
				o.getAll();
			});
		}

		o.get = function(id) {
		  return $http.get('/api/products/' + id).then(function(res){
		    return res.data;
		  });
		};

		o.remove = function(id){
			return $http.delete('/api/products/'+ id).success(function(res){
				o.getAll();
			});
		};

		return o;
	}])