angular.module('cantina-asser').controller('LancamentoController', function ($scope, $http, Lancamento, Cliente) {

    $scope.lancamentos = [];
    $scope.filtro = {};
    $scope.pagamento = {};
    
    $scope.tipos = [{
        _id: 0,
        label: 'Compra'
    }, {
        _id: 1,
        label: 'Pagamento'
    }];

    function buscaLancamento() {
        Lancamento.query(
            function (resultado) {
                $scope.lancamentos = resultado;
                buscaTotais();
            },
            function (erro) {
                console.log(erro);
            }
        );
    }

    function buscaTodosClientes() {
        Cliente.query(
            function (resultado) {
                $scope.clientes = resultado;
            },
            function (erro) {
                console.log(erro);
            }
        );
    }

    function buscaTotais() {
        
        $scope.totalPago = 0;
        $scope.totalDevido = 0;
        $scope.saldo = 0;

        $scope.lancamentos.forEach(function (item, index) {
            
            if(item.tipo == 0){
                $scope.totalDevido += item.valor;
            } else {
                $scope.totalPago += item.valor;
            }
            
            $scope.saldo = $scope.totalPago - $scope.totalDevido;
        });

    }

    $scope.pesquisaLancamento = function (filtro) {
        $http.post('/lancamentos/pesquisar', filtro)
            .success(function (resultado) {
                $scope.lancamentos = resultado;
                buscaTotais();
        }).error(function (erro) {
            console.log(erro);
        });
    }

    $scope.efetuarPagamento = function (pagamento) {
        $http.post('/lancamentos/finalizarPagamento', pagamento)
            .success(function (data) {
                $scope.filtro = {};
                buscaTodosClientes();
                buscaLancamento();
        }).error(function (erro) {
            console.log(erro);
        });

    }

    $scope.limpaPagamento = function () {
       $scope.pagamento = {};
    }

    buscaTodosClientes();
    buscaLancamento();

});