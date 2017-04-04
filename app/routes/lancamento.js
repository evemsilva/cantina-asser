module.exports = function (app) {
    var controller = app.controllers.lancamento;
    var autenticador = app.controllers.auth;
    app.get('/lancamentos', autenticador.verificaAutenticacao, controller.listaLancamentos);
};