module.exports = function (app) {

    var controller = {};
    var Lancamento = app.models.lancamento;

    function somaTotaisCarrinho(carrinho) {
        carrinho.qtdeTotal = 0;
        carrinho.valorTotal = 0;

        carrinho.itens.forEach(function (item, index) {
            carrinho.qtdeTotal += item.qtdeItem;
            carrinho.valorTotal += item.valorItem;
        });
    }

    controller.listaCarrinho = function (req, res) {
        
        if(!req.session.carinho){
            req.session.carinho = {};
            req.session.carinho.itens = [];
        }
        
        somaTotaisCarrinho(req.session.carinho);
        res.status(200).json(req.session.carinho);
    }

    controller.adicionaItem = function (req, res) {

         if(!req.session.carinho){
            req.session.carinho = {};
            req.session.carinho.itens = [];
        }

        var encontrado = false;

        var dados = {
            _id: req.body.produto._id,
            nome: req.body.produto.nome,
            preco: req.body.produto.preco,
            categoria: req.body.produto.categoria
        };

        req.session.carinho.itens.forEach(function (item, index) {
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
            req.session.carinho.itens.push(carrinhoItem);
        }

        somaTotaisCarrinho(req.session.carinho);
        res.status(201).json(req.session.carinho);
    }

    controller.removeItem = function (req, res) {
        let _id = req.params.id;
        let indice = -1;

        req.session.carinho.itens.forEach(function (item, index) {
            if (_id == item.produto._id) {
                indice = index;
            }
        });

        if (indice > -1) {
            req.session.carinho.itens.splice(indice, 1);
            somaTotaisCarrinho(req.session.carinho);
            res.status(204).end();
        } else {
            res.status(404).send('Produto não encontrado');
        }

    }

    controller.incrementaItem = function (req, res) {
        let _id = req.body.id;
        var encontrado = false;

        req.session.carinho.itens.forEach(function (item, index) {
            if (_id == item.produto._id) {
                item.qtdeItem += 1;
                item.valorItem += item.produto.preco;
                encontrado = true;
            }
        });

        if (encontrado) {
            somaTotaisCarrinho(req.session.carinho);
            res.status(201).end();
        } else {
            res.status(404).send('Produto não encontrado');
        }

    }

    controller.decrementaItem = function (req, res) {
        let _id = req.params.id;
        let indice = -1;
        let qtdeItem = -1;

        req.session.carinho.itens.forEach(function (item, index) {
            if (_id == item.produto._id) {
                item.qtdeItem -= 1;
                item.valorItem -= item.produto.preco;
                indice = index;
                qtdeItem = item.qtdeItem;
            }
        });

        if (indice > -1) {

            if (qtdeItem == 0) {
                req.session.carinho.itens.splice(indice, 1);
                somaTotaisCarrinho(req.session.carinho);
                res.status(204).end();
            } else {
                somaTotaisCarrinho(req.session.carinho);
                res.status(204).end();
            }
        } else {
            res.status(404).send('Produto não encontrado');
        }

    }

    controller.finalizarCompra = function (req, res) {

        var carrinho = req.body;

        carrinho.itens.forEach(function (item, index) {
            let novoLancamento = {};
            novoLancamento.cliente = carrinho.cliente;
            novoLancamento.produto = item.produto.nome;
            novoLancamento.quantidade = item.qtdeItem;
            novoLancamento.valor = item.valorItem;
            novoLancamento.tipo = 0;

            Lancamento.create(novoLancamento)
                .then(
                function (resultado) {
                    
                },
                function (erro) {
                    res.status(500).json(erro);
                }
                );
        });

        req.session.carinho = null;
        res.status(201).send('Compra finalizada com sucesso!');
    }

    return controller;
}