angular.module('cantina-asser').factory('Curso', function($resource) {
	return $resource('/cursos/:id');
});