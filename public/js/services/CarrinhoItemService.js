angular.module('cantina-asser').factory('CarrinhoItem', function($resource) {
	return $resource('/carrinho/alterar/:id');
});