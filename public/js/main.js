angular.module('cantina-asser', ['ngRoute', 'ngResource', 'smart-table'])
  .config(function ($routeProvider, $httpProvider) {

    $routeProvider.when('/produtos', {
      templateUrl: 'partials/home.html',
      controller: 'ProdutosController'
    });

    $routeProvider.when('/produtos/:produtoId', {
      templateUrl: 'partials/home.html',
      controller: 'ProdutosController'
    });

    $routeProvider.when('/clientes', {
      templateUrl: 'partials/clientes.html',
      controller: 'ClientesController'
    });

    $routeProvider.when('/blog', {
      templateUrl: 'partials/blog.html'
    });

    $routeProvider.when('/contato', {
      templateUrl: 'partials/contato.html'
    });

    $routeProvider.otherwise({ redirectTo: '/produtos' });
  });