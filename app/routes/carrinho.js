module.exports = function (app) {
    var controller = app.controllers.carrinho;
    app.get('/carrinho', controller.listaCarrinho)
    .post('/carrinho', controller.adicionaItem)
    .delete('/carrinho', controller.removeItem);
};