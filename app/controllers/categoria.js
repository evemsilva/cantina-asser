var categorias = [
    {
        _id: 1,
        descricao: "Bomboniere"
    },
    {
        _id: 2,
        descricao: "Doces"
    },
    {
        _id: 3,
        descricao: "Bebidas"
    },
    {
        _id: 4,
        descricao: "Salgados"
    }
];

module.exports = function () {
    var controller = {};

    controller.listaCategorias = function (req, res) {
        res.json(categorias);
    };

    return controller;
}