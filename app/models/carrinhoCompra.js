module.exports = function (app) {
    
    var carrinhoCompra = {
        itens: [app.models.carrinhoItem]
    }

    return carrinhoCompra;
};