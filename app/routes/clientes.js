module.exports = function (app) {
    var controller = app.controllers.cliente;
    var autenticador = app.controllers.auth;

    app.route('/clientes')
    .get(autenticador.verificaAutenticacao, controller.listaClientes)
    .post(autenticador.verificaAutenticacao, controller.salvaCliente);

    app.route('/clientes/:id')
    .get(autenticador.verificaAutenticacao, controller.obtemCliente);
    //.delete(autenticador.verificaAutenticacao, controller.removeCliente)
};