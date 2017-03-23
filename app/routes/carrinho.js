module.exports = function (app) {
    var controller = app.controllers.carrinho;
    app.post('/carrinho', controller.adicionaItem);
};