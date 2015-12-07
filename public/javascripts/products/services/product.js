angular.module('products')
	.factory('product', ['$http', function($http){
		var o = {
			product:{},
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
		  return $http.get('/api/products/' + id).success(function(data){
		    angular.copy(data, o.product);
		  });
		};

		o.remove = function(id){
			return $http.delete('/api/products/'+ id).success(function(res){
				o.getAll();
			});
		};

		o.save = function(product){
			if(product._id){
				o.update(product);
			}else{
				o.create(product);
			}
		}

		return o;
	}])