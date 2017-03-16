angular.module('cantina-asser').controller('ProdutosController', function ($scope, Produto, Categoria, $routeParams) {

    /*if ($routeParams.produtoId) {
        Produto.get({ id: $routeParams.produtoId },
            function (resultado) {
                console.log(resultado);
                $scope.produto = resultado;
            },
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível obter o produto.'
                };
                console.log(erro);
            }
        );
    } else {
        $scope.produto = new Produto();
    }*/

    $scope.produto = new Produto();
    $scope.produtos = [];

    function buscaCategorias() {
        Categoria.query(
            function (resultado) {
                $scope.categorias = resultado;
                $scope.mensagem = {};
            },
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível obter a lista'
                };
            }
        );
    }

    function buscaProdutos() {
        Produto.query(
            function (resultado) {
                $scope.produtos = resultado;
                $scope.mensagem = {};
            },
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível obter a lista'
                };
            }
        );
    }

    buscaProdutos();
    buscaCategorias();

    $scope.salva = function () {

        $scope.produto.$save()
            .then(function () {
                $scope.mensagem = {
                    texto: 'Salvo com sucesso'
                };
                $scope.produto = new Produto();
                buscaProdutos();
            })
            .catch(function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível salvar'
                };
            });
    };

    $scope.selecionarProduto = function (idProduto) {
        Produto.get({ id: idProduto },
            function (resultado) {
                console.log(resultado);
                $scope.produto = resultado;
            },
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível obter o produto.'
                };
                console.log(erro);
            }
        );
    }

    $scope.limparProduto = function () {
        $scope.produto = new Produto();
    }

    $scope.removeProduto = function (produto) {
        Produto.delete({ id: produto._id },
            buscaProdutos,
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível remover o contato'
                };
                console.log(erro);
            }
        );
    };

});