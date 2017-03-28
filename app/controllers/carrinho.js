module.exports = function (app) {

    var controller = {};
    let meuCarrinho = {};

    meuCarrinho.itens = [];

    var chocolate = {
        "_id": "58c8a4e06b24b41e88c1ed7e",
        "nome": "Diamante Negro",
        "preco": 1,
        "categoria": "58c8a48b8fece38e1c8c62ed"
    }

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

    controller.listaCarrinho = function (req, res) {
        somaTotaisCarrinho(meuCarrinho);
        res.status(200).json(meuCarrinho);
    }

    controller.adicionaItem = function (req, res) {

        var encontrado = false;

        var dados = {
            _id: req.body.produto._id,
            nome: req.body.produto.nome,
            preco: req.body.produto.preco,
            categoria: req.body.produto.categoria
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
        res.status(201).json(meuCarrinho);
    }

    controller.removeItem = function (req, res) {

        let _id = req.params.id;
        let indice = -1;

        meuCarrinho.itens.forEach(function (item, index) {
            if (_id == item.produto._id) {
                indice = index;
            }
        });

        if (indice > -1) {
            meuCarrinho.itens.splice(indice, 1);
            somaTotaisCarrinho(meuCarrinho);
            res.status(204).end();
        } else {
            res.status(404).send('Produto não encontrado');
        }

    }

    controller.incrementaItem = function (req, res) {
        let _id = req.body.id;
        var encontrado = false;

        meuCarrinho.itens.forEach(function (item, index) {
            if (_id == item.produto._id) {
                item.qtdeItem += 1;
                item.valorItem += item.produto.preco;
                encontrado = true;
            }
        });

        if (encontrado) {
            somaTotaisCarrinho(meuCarrinho);
            res.status(201).end();
        } else {
            res.status(404).send('Produto não encontrado');
        }

    }

    controller.decrementaItem = function (req, res) {
        let _id = req.params.id;
        let indice = -1;
        let qtdeItem = -1;

        meuCarrinho.itens.forEach(function (item, index) {
            if (_id == item.produto._id) {
                item.qtdeItem -= 1;
                item.valorItem -= item.produto.preco;
                indice = index;
                qtdeItem = item.qtdeItem;
            }
        });

        if (indice > -1) {

            if (qtdeItem == 0) {
                meuCarrinho.itens.splice(indice, 1);
                somaTotaisCarrinho(meuCarrinho);
                res.status(204).end();
            } else {
                somaTotaisCarrinho(meuCarrinho);
                res.status(204).end();
            }
        } else {
            res.status(404).send('Produto não encontrado');
        }

    }



    return controller;
}