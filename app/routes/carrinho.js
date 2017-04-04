module.exports = function (app) {
    var controller = app.controllers.carrinho;
    var autenticador = app.controllers.auth;

    app.route('/carrinho/:id')
        .delete(autenticador.verificaAutenticacao, controller.removeItem);

    app.route('/carrinho')
        .get(autenticador.verificaAutenticacao, controller.listaCarrinho)
        .post(autenticador.verificaAutenticacao, controller.adicionaItem);

    app.route('/carrinho/alterar/:id')
        .delete(autenticador.verificaAutenticacao, controller.decrementaItem);

    app.route('/carrinho/alterar')
        .post(autenticador.verificaAutenticacao, controller.incrementaItem);

    app.route('/carrinho/finalizarCompra')
        .post(autenticador.verificaAutenticacao, controller.finalizarCompra);
};