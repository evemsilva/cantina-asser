module.exports = function (app) {
    var controller = {};
    Curso = app.models.curso;

    controller.listaCursos = function (req, res) {
        Curso.find().exec()
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