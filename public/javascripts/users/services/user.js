(function(){
	'use strict';

	angular
		.module('app.routes.users')
		.factory('user', user); 

	user.$inject = ['$http'];
	function user($http){
		var factory = {};
		factory.users = [];
		factory.find = find;
		factory.getAll = getAll; 
		factory.create = create; 
		factory.update = update; 
		factory.get = get; 
		factory.remove = remove; 
		factory.save = save;

		return factory;


		function find(id){
			return factory.users.find(byId) || {};

			function byId(item){
				return item._id == id;
			}
		}	

		function getAll() {
		  return $http.get('/api/users').success(function(data){
		    angular.copy(data, factory.users);
		  });
		};

		function create(user) {
		  return $http.post('/api/users', user).success(function(data){
		    factory.users.push(data);
		  });
		};

		function update(user){
			return $http.put('/api/users/'+ user._id, user).success(function(data){
				factory.getAll();
			});
		}

		function get(id) {
		  return $http.get('/api/users/' + id).then(function(res){
		    return res.data;
		  });
		};

		function remove(id){
			return $http.delete('/api/users/'+ id).success(function(res){
				factory.getAll();
			});
		};

		function save(user){
			if(user._id){
				factory.update(user);
			}else{
				factory.create(user);
			}
		}

	}

})();
