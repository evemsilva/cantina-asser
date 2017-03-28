angular.module('cantina-asser').controller('CarrinhoController', function ($scope, Carrinho, CarrinhoItem) {

    $scope.carrinho = {};
    $scope.carrinhoItem = new CarrinhoItem();

    function buscaCarrinho() {
        Carrinho.get(
            function (resultado) {
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

    $scope.removeItem = function (produtoId) {
        Carrinho.delete({ id: produtoId },
            buscaCarrinho,
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível remover o contato'
                };
                console.log(erro);
            }
        );
    };


    $scope.incrementaItem = function (produtoId) {
        $scope.carrinhoItem.id = produtoId;
        $scope.carrinhoItem.$save()
            .then(function () {
                $scope.carrinho = new Carrinho();
                buscaCarrinho();
            })
            .catch(function (erro) {
                console.log(erro);
            });
    }

    $scope.decrementaItem = function (produtoId) {
        CarrinhoItem.delete({ id: produtoId },
            buscaCarrinho,
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível remover o contato'
                };
                console.log(erro);
            }
        );
    }

});