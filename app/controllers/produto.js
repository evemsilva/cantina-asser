var produtos = [{
        '_id': 1,
        'nome': 'Chocolate Bis',
        'categoria': {
            _id: 1,
            descricao: 'Bomboniere'
        },
        'preco': 3.59
    },
    {
        '_id': 2,
        'nome': 'Coca-Cola 2L',
        'categoria': {
            _id: 2,
            descricao: 'Bebidas'
        },
        'preco': 6.49
    }
];

var ID_produto_INC = 2;

module.exports = function (app) {
    var controller = {};
    var Produto = app.models.produto;

    controller.listaProdutos = function (req, res) {
        Produto.find().populate('categoria').exec()
            .then(
            function (produtos) {
                console.log(produtos);
                res.json(produtos);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
            );
    };

    controller.obtemProduto = function (req, res) {
        var idProduto = req.params.id;
        var produto = produtos.filter(function (produto) {
            return produto._id == idProduto;
        })[0];
        produto ? res.json(produto) : res.status(404).send('produto não encontrado');
    };

    controller.salvaProduto = function (req, res) {
        var _id = req.body._id;

        var dados = {
            "nome" : req.body.nome,
            "preco" : req.body.preco,
            "categoria" : req.body.categoria
        };

        if (_id) {
            Produto.findByIdAndUpdate(_id, dados).exec()
                .then(
                function (produto) {
                    res.json(produto);
                },
                function (erro) {
                    console.error(erro);
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
                    console.log(erro);
                    res.status(500).json(erro);
                }
                );
        }  
    }

    controller.removeProduto = function(req, res){
        console.log(req.params.id);
        remove(req.params.id);
        res.status(204).end();
    }

    return controller;
}

function adiciona(produtoNovo) {
    produtoNovo._id = ++ID_produto_INC;
    produtos.push(produtoNovo);
    return produtoNovo;
}

function atualiza(produtoAlterar) {
    produtos = produtos.map(function (produto) {
        if (produto._id == produtoAlterar._id) {
            produto = produtoAlterar;
        }
        return produto;
    });
    return produtoAlterar;
}

function remove(idProduto){

    var produtoExcluido;

    produtos.forEach(function(produto) {
        if(produto._id == idProduto){
            produtoExcluido = produto;
        }
    }, this);

    produtos = produtos.slice(produtos.indexOf(produtoExcluido),1);
}