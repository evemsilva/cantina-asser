angular.module('cantina-asser').factory('Carrinho', function($resource) {
	return $resource('/carrinho');
});