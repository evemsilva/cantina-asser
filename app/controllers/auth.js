module.exports = function (app) {
    var controller = {};

    controller.verificaAutenticacao = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status('401').json('Não autorizado');
        }
    };

    return controller;
}