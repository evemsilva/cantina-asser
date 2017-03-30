angular.module('cantina-asser').controller('LancamentoController', function ($scope, Lancamento) {

    $scope.lancamentos = [];
    
    $scope.tipos = [{
        _id: 0,
        label: 'Débito'
    }, {
        _id: 1,
        label: 'Crédito'
    }];

    function buscaLancamento() {
        Lancamento.query(
            function (resultado) {
                $scope.lancamentos = resultado;
            },
            function (erro) {
                console.log(erro);
            }
        );
    }

    buscaLancamento();

});