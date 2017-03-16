angular.module('cantina-asser').factory('Cliente', function($resource) {
	return $resource('/clientes/:id');
});