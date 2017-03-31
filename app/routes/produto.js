function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json('Não autorizado');
    }
}

module.exports = function (app) {
    var controller = app.controllers.produto;
    app.route('/produtos')
        .get(verificaAutenticacao, controller.listaProdutos)
        .post(verificaAutenticacao, controller.salvaProduto);

    app.route('/produtos/:id')
        .get(controller.obtemProduto)
        .delete(controller.removeProduto);
};