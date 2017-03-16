angular.module('cantina-asser').controller('ClientesController', function ($scope, Cliente, Curso) {

    $scope.cliente = new Cliente();
    $scope.clientes = [];

    function buscaCursos() {
        Curso.query(
            function (resultado) {
                $scope.cursos = resultado;
                $scope.mensagem = {};
            },
            function (erro) {
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
                $scope.mensagem = {
                    texto: 'Não foi possível obter a lista'
                };
            }
        );
    }

    buscaClientes();
    buscaCursos();

    $scope.limparCliente = function () {
        $scope.cliente = new Cliente();
    }

    $scope.salva = function () {
        $scope.cliente.$save()
            .then(function () {
                $scope.mensagem = {
                    texto: 'Salvo com sucesso'
                };
                $scope.cliente = new Cliente();
                buscaClientes();
            })
            .catch(function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível salvar'
                };
            });
    };

    $scope.selecionarCliente = function (idCliente) {
        Cliente.get({ id: idCliente },
            function (resultado) {
                console.log(resultado);
                $scope.cliente = resultado;
            },
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível obter o cliente.'
                };
                console.log(erro);
            }
        );
    }

    $scope.removeCliente = function (cliente) {
        Cliente.delete({ id: cliente._id },
            buscaClientes,
            function (erro) {
                $scope.mensagem = {
                    texto: 'Não foi possível remover o contato'
                };
                console.log(erro);
            }
        );
    };

});