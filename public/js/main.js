angular.module('cantina-asser',['ngRoute'])
  .config(function($routeProvider, $httpProvider) {

    $routeProvider.when('/', {
      templateUrl: 'partials/principal.html'
    });

    // $routeProvider.otherwise({redirectTo: '/contatos'});
});