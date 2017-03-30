angular.module('cantina-asser').factory('Lancamento', function($resource) {
	return $resource('/lancamentos');
});