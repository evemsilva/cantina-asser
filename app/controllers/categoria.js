module.exports = function (app) {
    var controller = {};
    Categoria = app.models.categoria;

    controller.listaCategorias = function (req, res) {
        Categoria.find().exec()
            .then(
                function (categorias) {
                    res.json(categorias);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
    };

    return controller;
}