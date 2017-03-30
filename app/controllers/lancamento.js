module.exports = function (app) {
    var controller = {};
    Lancamento = app.models.lancamento;

    controller.listaLancamentos = function (req, res) {
        Lancamento.find().populate('cliente').exec()
            .then(
                function (resultado) {
                    res.json(resultado);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
    };

    return controller;
}