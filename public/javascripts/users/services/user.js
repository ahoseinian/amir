angular.module('users')
	.factory('user', ['$http', function($http){
		var o = {
			users:[]
		};

		o.getAll = function() {
		  return $http.get('/api/users').success(function(data){
		    angular.copy(data, o.users);
		  });
		};

		o.create = function(user) {
		  return $http.post('/api/users', user).success(function(data){
		    o.users.push(data);
		  });
		};

		o.update = function(user){
			return $http.put('/api/users/'+ user._id, user).success(function(data){
				o.getAll();
			});
		}

		o.get = function(id) {
		  return $http.get('/api/users/' + id).then(function(res){
		    return res.data;
		  });
		};

		o.remove = function(id){
			return $http.delete('/api/users/'+ id).success(function(res){
				o.getAll();
			});
		};

		o.save = function(user){
			if(user._id){
				o.update(user);
			}else{
				o.create(user);
			}
		}

		return o;
	}])