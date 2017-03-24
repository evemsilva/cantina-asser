module.exports = function (app) {
    
    var carrinhoItem = {
        produto: app.models.produto,
        quantidade: 1
    }

    return carrinhoItem;
};