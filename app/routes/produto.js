module.exports = function (app) {
    var controller = app.controllers.produto;
    var autenticador = app.controllers.auth;

    app.route('/produtos')
        .get(autenticador.verificaAutenticacao, controller.listaProdutos)
        .post(autenticador.verificaAutenticacao, controller.salvaProduto);

    app.route('/produtos/:id')
        .get(autenticador.verificaAutenticacao, controller.obtemProduto)
        .delete(autenticador.verificaAutenticacao, controller.removeProduto);
};