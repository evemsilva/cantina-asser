angular.module('cantina-asser').controller('ProdutosController', function ($scope, Produto, Categoria, $routeParams) {

    $scope.produto = new Produto();

    function buscaCategorias() {
        Categoria.query(
            function (resultado) {
                $scope.categorias = resultado;
                console.log(resultado);
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

    function buscaProdutos() {
        Produto.query(
            function (resultado) {
                $scope.produtos = resultado;
                $scope.mensagem = {};
                console.log(resultado);
            },
            function (erro) {
                console.log(erro);
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