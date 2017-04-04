module.exports = function () {
    var controller = {};

    controller.index = function (req, res) {

        var login = '';

        if (req.user) {
            login = req.user.username;
        }

        res.render('index', {usuario: login});
    };

    return controller;
}