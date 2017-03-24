module.exports = function (app) {

    var controller = {};
    let meuCarrinho = {};

    meuCarrinho.itens = [];

    var fanta = {
        "_id": "58c922cfbc861c43146eab70",
        "nome": "Fanta Laranja",
        "preco": 2.99,
        "categoria": "58c922874564dd22f1614c31"
    };

    var suspiro = {
        "_id": "58c922ecbc861c43146eab71",
        "nome": "Suspiro",
        "preco": 1.5,
        "categoria": "58c922914564dd22f1614c32"
    }

    function somaTotaisCarrinho(carrinho) {

        carrinho.qtdeTotal = 0;
        carrinho.valorTotal = 0;

        carrinho.itens.forEach(function (item, index) {
            carrinho.qtdeTotal += item.qtdeItem;
            carrinho.valorTotal += item.valorItem;
        });
    }

    controller.adicionaItem = function (req, res) {

        var encontrado = false;

        if (req.session.carrinho) {
            meuCarrinho = req.session.carrinho;
        }

        var dados = {
            _id: req.body._id,
            nome: req.body.nome,
            preco: req.body.preco,
            categoria: req.body.categoria
        };

        meuCarrinho.itens.forEach(function (item, index) {
            if (dados._id == item.produto._id) {
                item.qtdeItem += 1;
                item.valorItem += item.produto.preco;
                encontrado = true;
            }
        });

        if (!encontrado) {
            let carrinhoItem = {};
            carrinhoItem.produto = dados;
            carrinhoItem.qtdeItem = 1;
            carrinhoItem.valorItem = carrinhoItem.produto.preco;
            meuCarrinho.itens.push(carrinhoItem);
        }

        somaTotaisCarrinho(meuCarrinho);

        console.log(meuCarrinho.itens);
        req.session.carrinho = meuCarrinho;
        res.status(201).json(meuCarrinho);
    }

    controller.removeItem = function(req, resp){

        let _id = req.body._id;

        let indice = meuCarrinho.itens.forEach(function (item, index) {
            if (_id == item.produto._id) {
               return index;
            }
        });

        delete meuCarrinho.itens[indice];

        res.status(202).json(meuCarrinho);
    } 



    return controller;
}