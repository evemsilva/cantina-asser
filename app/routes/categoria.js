module.exports = function (app) {
    var controller = app.controllers.categoria;
    app.get('/categorias', controller.listaCategorias);
};