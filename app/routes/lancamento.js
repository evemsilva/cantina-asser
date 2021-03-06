module.exports = function (app) {
    var controller = app.controllers.lancamento;
    var autenticador = app.controllers.auth;
    app.get('/lancamentos', autenticador.verificaAutenticacao, controller.listaLancamentos);
    app.post('/lancamentos/pesquisar', autenticador.verificaAutenticacao, controller.pesquisaLancamentos);
    app.post('/lancamentos/finalizarPagamento', autenticador.verificaAutenticacao, controller.efetuaPagamento);
};