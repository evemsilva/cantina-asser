angular.module('cantina-asser').controller('CarrinhoController', function ($scope, Carrinho) {

    $scope.carrinho = {};

    function buscaCarrinho() {
        Carrinho.get(
            function (resultado) {
                console.log(resultado);
                $scope.carrinho = resultado;
                $scope.mensagem = {};
            },
            function (erro) {
                console.log(erro);
                $scope.mensagem = {
                    texto: 'Não foi possível obter a lista'
                };
            }
        );
    }

    buscaCarrinho();

});