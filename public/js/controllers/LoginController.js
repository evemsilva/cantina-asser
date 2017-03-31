angular.module('cantina-asser').controller('LoginController', function ($scope, $http, $window) {

    $scope.login = {};
    $scope.mensagem = '';

    $scope.efetuarLogin = function (usuario) {
        console.log(usuario);

        $http.post('/login', usuario)
            .success(function (data, status) {
                $scope.mensagem = '';
                $window.location.href = '/';
            }).error(function (erro, status) {
                if (status == 401) {
                    $scope.mensagem = 'Usuario ou senha incorretos'
                } else {
                    console.log(erro);
                }
            });

    }



});