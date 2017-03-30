module.exports = function (app) {
    var controller = app.controllers.lancamento;
    app.get('/lancamentos', controller.listaLancamentos);
};