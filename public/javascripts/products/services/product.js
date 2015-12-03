angular.module('products')
	.service('product', [function(){
		var o = [
			{id: 1, name: "22"},
			{id: 2, name: "44"}
		];
		return o;
	}])