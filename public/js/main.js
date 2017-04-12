angular.module('cantina-asser', ['ngRoute', 'ngResource', 'smart-table','datetimepicker', 'ui.utils.masks', 'idf.br-filters'])
  .config(function ($routeProvider, $httpProvider) {

    // Interceptador de requisicao
    $httpProvider.interceptors.push('meuInterceptor');

    $routeProvider.when('/', {
      templateUrl: 'partials/produto.html',
      controller: 'ProdutosController'
    });

    $routeProvider.when('/produtos/:produtoId', {
      templateUrl: 'partials/produto.html',
      controller: 'ProdutosController'
    });

    $routeProvider.when('/clientes', {
      templateUrl: 'partials/cliente.html',
      controller: 'ClientesController'
    });

    $routeProvider.when('/carrinho', {
      templateUrl: 'partials/carrinho.html',
      controller: 'CarrinhoController'
    });

    $routeProvider.when('/lancamentos', {
      templateUrl: 'partials/lancamento.html',
      controller: 'LancamentoController'
    });

    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    });

    $routeProvider.otherwise({ redirectTo: '/' });
  });