module.exports = function (app) {

    var controller = {};
    var meuCarrinho = app.models.carrinhoCompra;

    controller.adicionaItem = function (req, res) {

        var dados = {
            _id: req.body._id,
            nome: req.body.nome,
            preco: req.body.preco,
            categoria: req.body.categoria
        };

        if(!req.session.carrinho) {


        } else{
            
        }


    }

}