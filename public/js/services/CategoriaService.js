angular.module('cantina-asser').factory('Categoria', function($resource) {
	return $resource('/categorias/:id');
});