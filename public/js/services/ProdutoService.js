angular.module('cantina-asser').factory('Produto', function($resource) {
	return $resource('/produtos/:id');
});