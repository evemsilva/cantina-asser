var produtos = [{
        'codigo': 1,
        'nome': 'Chocolate Bis',
        'categoria': {
            'identificador': 1,
            descricao: 'Bomboniere'
        },
        'preco': 3.59
    },
    {
        'codigo': 2,
        'nome': 'Coca-Cola 2L',
        'categoria': {
            'identificador': 2,
            descricao: 'Bebidas'
        },
        'preco': 6.49
    }
];

module.exports = function () {
    var controller = {};

    controller.listaProdutos = function (req, res) {
        res.json(produtos);
    };

    controller.obtemProduto = function (req, res) {
        console.log(req.params.id);

        var idProduto = req.params.id;
        var produto = produtos.filter(function (produto) {
            return produto.codigo == idProduto;
        })[0];
        produto ? res.json(produto) : res.status(404).send('produto não encontrado');
    };

    return controller;
}