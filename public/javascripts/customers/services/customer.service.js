(function(){
	'use strict';

	angular
		.module('app.routes.customers')
		.factory('customer', customer);

	customer.$inject = ['$http'];
	function customer($http){
		var factory = {};
		factory.customers = [];

		factory.find = find;
		factory.get = get;
		factory.getAll = getAll;
		factory.create = create;
		factory.update = update;
		factory.save = save;
		factory.remove = remove;

		return factory;

		function find(id){
			return factory.customers.find(byId) || {};

			function byId(item){
				return item._id == id;
			}
		}

		function get(id) {
		  return $http.get('/api/customers/' + id).then(function(res){
		    return res.data;
		  });
		};

		function getAll() {
		  return $http.get('/api/customers').success(function(data){
		    angular.copy(data, factory.customers);
		  });
		};

		function create(customer) {
		  return $http.post('/api/customers', customer).success(function(data){
		    factory.customers.push(data);
		  });
		};

		function update(customer){
			return $http.put('/api/customers/'+ customer._id, customer).success(function(data){
				factory.getAll();
			});
		}

		function save(customer){
			if(customer._id){
				factory.update(customer);
			}else{
				factory.create(customer);
			}
		}

		function remove(id){
			return $http.delete('/api/customers/'+ id).success(function(res){
				angular.copy(factory.customers.filter(filter), factory.customers);
				
				function filter(item){
					return item._id != id;
				}
			});
		};


	}

})();