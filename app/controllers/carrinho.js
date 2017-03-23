module.exports = function (app) {

    var controller = {};
    var meuCarrinho = app.models.carrinhoCompra;
    var carrinhoItem = app.models.carrinhoItem;

    controller.adicionaItem = function (req, res) {

        var dados = {
            _id: req.body._id,
            nome: req.body.nome,
            preco: req.body.preco,
            categoria: req.body.categoria
        };

        carrinhoItem.produto = dados;
        console.log(carrinhoItem.produto);
        carrinhoItem.quantidade = 1;

        meuCarrinho.itens.push(carrinhoItem);
        console.log(meuCarrinho);
        res.status(201).json(dados);
        


    }

    return controller;
}