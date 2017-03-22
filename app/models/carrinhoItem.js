module.exports = function (app) {
    
    var carrinhoItem = {
        produto: app.models.produto,
        quantidade: Number
    }

    return carrinhoItem;
};