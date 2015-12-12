(function(){
	'use strict';

	angular
		.module('app.routes.purchases')
		.factory('purchase', purchase); 

		purchase.$inject = ['$http'];
		
		function purchase($http){
			var factory = {};
			factory.purchase= {};
			factory.purchases=[];
			factory.getAll = getAll;
			factory.create = create;
			factory.update = update;
			factory.get = get;
			factory.save = save;

			return factory;

			function getAll() {
			  return $http.get('/api/purchases').success(function(data){
			    angular.copy(data, factory.purchases);
			  });
			};

			function create(purchase) {
			  return $http.post('/api/purchases', purchase).success(function(data){
			    factory.purchases.push(data);
			  });
			};

			function update(purchase){
				return $http.put('/api/purchases/'+ purchase._id, purchase).success(function(data){
					factory.getAll();
				});
			}

			function get(id) {
			  return $http.get('/api/purchases/' + id).success(function(data){
			    angular.copy(data, factory.purchase);
			  });
			};

			function remove(id){
				return $http.delete('/api/purchases/'+ id).success(function(res){
					factory.getAll();
				});
			};

			function save(purchase){
				if(purchase._id){
					factory.update(purchase);
				}else{
					factory.create(purchase);
				}
			}
		}
})();