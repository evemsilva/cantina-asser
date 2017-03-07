angular.module('cantina-asser').controller('ProdutosController', function ($scope, Produto, Categoria, $routeParams) {

    if ($routeParams.produtoId) {
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
        }

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

        console.log($scope.produto);

        $scope.produto.$save()
            .then(function () {
                $scope.mensagem = {
                    texto: 'Salvo com sucesso'
                };
                // limpa o formulário
                $scope.produto = new Produto();
                console.log('Salvo com sucesso no front end');
                buscaProdutos();
            })
            .catch(function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível salvar'
                };
            });
    };

});