module.exports = function (app) {
    var controller = app.controllers.produto;
    app.route('/produtos')
    .get(controller.listaProdutos)
    .post(controller.salvaProduto);

    app.route('/produtos/:id')
    .get(controller.obtemProduto);
};