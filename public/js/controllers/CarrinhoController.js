angular.module('cantina-asser').controller('CarrinhoController', function ($scope, $http, Carrinho, CarrinhoItem, Cliente) {

    $scope.carrinho = {};
    $scope.carrinhoItem = new CarrinhoItem();
    $scope.clientes = [];

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

    function buscaClientes() {
        Cliente.query(
            function (resultado) {
                $scope.clientes = resultado;
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
    buscaClientes();

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

    $scope.finalizaCompra = function (carrinho) {
        console.log(carrinho);
        $http.post('/carrinho/finalizarCompra', carrinho)
            .success(function (data) {
                console.log(data);
        }).error(function (erro) {
            console.log(erro);
        });

    }

});