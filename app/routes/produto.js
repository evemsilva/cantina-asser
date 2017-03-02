module.exports = function (app) {
    var controller = app.controllers.produto;
    app.get('/produtos', controller.listaProdutos);
    app.get('/produtos/:id', controller.obtemProduto);
};