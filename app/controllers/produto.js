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


module.exports = function () {
    var controller = {};

    controller.listaProdutos = function (req, res) {
        res.json(produtos);
    };

    controller.obtemProduto = function (req, res) {
        var idProduto = req.params.id;
        var produto = produtos.filter(function (produto) {
            return produto._id == idProduto;
        })[0];
        produto ? res.json(produto) : res.status(404).send('produto não encontrado');
    };

    controller.salvaProduto = function (req, res) {
        var produto = req.body;

        produto = produto._id ?
            atualiza(produto) :
            adiciona(produto);

        console.log(produto);
        res.json(produto);
        
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