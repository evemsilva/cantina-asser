module.exports = function (app) {
    var controller = {};
    Lancamento = app.models.lancamento;

    controller.listaLancamentos = function (req, res) {
        Lancamento.find().sort('-data').populate('cliente').exec()
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


    controller.pesquisaLancamentos = function (req, res) {

        var dados = req.body;
        var query = Lancamento.find();

        if (dados.dataInicial && dados.dataFinal) {
            query.where('data').gte(new Date(2017, 3, 1)).lte(new Date(2017, 3, 2));
        }

        if (!dados.dataInicial && dados.dataFinal) {
            query.where('data').lte(new Date(2017, 3, 2));
        }

        if (dados.dataInicial && !dados.dataFinal) {
            query.where('data').gte(new Date(2017, 3, 1));
        }

        if (dados.cliente) {
            query.where('cliente').equals(dados.cliente);
        }

        if (dados.tipo) {
            query.where('tipo').equals(dados.tipo);
        }

        query.sort('-data').populate('cliente').exec()
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