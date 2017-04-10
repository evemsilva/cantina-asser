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
            var inicio = dados.dataInicial.split('/');
            var fim = dados.dataFinal.split('/');
            query.where('data').gte(new Date(inicio[2], (inicio[1] - 1), inicio[0])).lte(new Date(fim[2], (fim[1] - 1), fim[0], 23, 59, 59));
        }

        if (!dados.dataInicial && dados.dataFinal) {
            var fim = dados.dataFinal.split('/');
            query.where('data').lte(new Date(fim[2], (fim[1] - 1), fim[0], 23, 59, 59));
        }

        if (dados.dataInicial && !dados.dataFinal) {
            var inicio = dados.dataInicial.split('/');
            query.where('data').gte(new Date(inicio[2], (inicio[1] - 1), inicio[0]));
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

    controller.efetuaPagamento = function (req, res) {
        var pagamento = req.body;
        pagamento.tipo = 1;
        pagamento.quantidade = 1;

        Lancamento.create(pagamento)
            .then(
                function (resultado) {
                    res.status(201).json(resultado);
                },
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                }
            );

    }

    return controller;
}