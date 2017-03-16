module.exports = function (app) {
    var controller = {};
    var Cliente = app.models.cliente;

    controller.listaClientes = function (req, res) {
        Cliente.find().populate('curso').exec()
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

    controller.obtemCliente = function (req, res) {
        var _id = req.params.id;
        Cliente.findById(_id).exec()
            .then(
                function (resultado) {
                    if (!resultado) throw new Error("Cliente não encontrado");
                    res.json(resultado);
                },
                function (erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };

    controller.salvaCliente = function (req, res) {
        var _id = req.body._id;

        var dados = {
            "nome": req.body.nome,
            "cpf": req.body.cpf,
            "telefone1": req.body.telefone1,
            "telefone2": req.body.telefone2,
            "curso": req.body.curso
        };

        if (_id) {
            Cliente.findByIdAndUpdate(_id, dados).exec()
                .then(
                    function (resultado) {
                        res.json(resultado);
                    },
                    function (erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        } else {
            Cliente.create(dados)
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
    }

    controller.removeCliente = function (req, res) {
        var _id = req.params.id;
        
        Cliente.remove({ "_id": _id }).exec()
            .then(
            function () {
                res.status(204).end();
            },
            function (erro) {
                return console.error(erro);
            }
            );
    }

    return controller;
}