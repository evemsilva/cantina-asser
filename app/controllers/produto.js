module.exports = function (app) {
    var controller = {};
    var Produto = app.models.produto;

    controller.listaProdutos = function (req, res) {
        Produto.find().populate('categoria').exec()
            .then(
                function (produtos) {
                    res.json(produtos);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
    };

    controller.obtemProduto = function (req, res) {
        var _id = req.params.id;
        Produto.findById(_id).exec()
            .then(
                function (produto) {
                    if (!produto) throw new Error("Produto não encontrado.");
                    res.json(produto);
                },
                function (erro) {
                    res.status(500).json(erro);
                }
            );
    };

    controller.salvaProduto = function (req, res) {
        var _id = req.body._id;

        var dados = {
            "nome": req.body.nome,
            "preco": req.body.preco,
            "categoria": req.body.categoria
        };

        if (_id) {
            Produto.findByIdAndUpdate(_id, dados).exec()
                .then(
                    function (produto) {
                        res.json(produto);
                    },
                    function (erro) {
                        res.status(500).json(erro);
                    }
                );
        } else {
            Produto.create(dados)
                .then(
                    function (produto) {
                        res.status(201).json(produto);
                    },
                    function (erro) {
                        res.status(500).json(erro);
                    }
                );
        }
    }

    controller.removeProduto = function (req, res) {
        var _id = req.params.id;
        
        Produto.remove({ "_id": _id }).exec()
            .then(
            function () {
                res.status(204).end();
            },
            function (erro) {
                res.status(500).json(erro);
            }
            );
    }

    return controller;
}