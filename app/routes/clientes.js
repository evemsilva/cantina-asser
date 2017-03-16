module.exports = function (app) {
    var controller = app.controllers.cliente;
    app.route('/clientes')
    .get(controller.listaClientes)
    .post(controller.salvaCliente);

    app.route('/clientes/:id')
    .get(controller.obtemCliente)
    .delete(controller.removeCliente);
};