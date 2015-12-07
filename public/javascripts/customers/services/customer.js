angular.module('customers')
	.factory('customer', ['$http', function($http){
		var o = {
			customers:[]
		};

		o.getAll = function() {
		  return $http.get('/api/customers').success(function(data){
		    angular.copy(data, o.customers);
		  });
		};

		o.create = function(customer) {
		  return $http.post('/api/customers', customer).success(function(data){
		    o.customers.push(data);
		  });
		};

		o.update = function(customer){
			return $http.put('/api/customers/'+ customer._id, customer).success(function(data){
				o.getAll();
			});
		}

		o.get = function(id) {
		  return $http.get('/api/customers/' + id).then(function(res){
		    return res.data;
		  });
		};

		o.remove = function(id){
			return $http.delete('/api/customers/'+ id).success(function(res){
				o.getAll();
			});
		};

		o.save = function(customer){
			if(customer._id){
				o.update(customer);
			}else{
				o.create(customer);
			}
		}

		return o;
	}])