angular.module('cantina-asser',['ngRoute','smart-table'])
  .config(function($routeProvider, $httpProvider) {

    $routeProvider.when('/', {
      templateUrl: 'partials/home.html',
      controller: 'ProdutosController'
    });

    $routeProvider.when('/sobre', {
      templateUrl: 'partials/sobre.html'
    });

    $routeProvider.when('/blog', {
      templateUrl: 'partials/blog.html'
    });

    $routeProvider.when('/contato', {
      templateUrl: 'partials/contato.html'
    });

    // $routeProvider.otherwise({redirectTo: '/contatos'});
});