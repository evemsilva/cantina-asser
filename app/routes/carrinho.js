module.exports = function (app) {
    var controller = app.controllers.carrinho;
    app.route('/carrinho/:id')
        .delete(controller.removeItem);

    app.route('/carrinho')
        .get(controller.listaCarrinho)
        .post(controller.adicionaItem);

    app.route('/carrinho/alterar/:id')
        .delete(controller.decrementaItem);

    app.route('/carrinho/alterar')
        .post(controller.incrementaItem);
};