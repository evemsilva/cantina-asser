var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = function () {

    var Usuario = mongoose.model('Usuario');

    passport.use(new LocalStrategy(function (username, password, done) {
        process.nextTick(function () {
            // Auth Check Logic
            Usuario.findOne({
                'username': username,
            }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false);
                }

                if (user.password != password) {
                    return done(null, false);
                }

                return done(null, user);
            });
        });
    }));

    /*
        Chamado apenas UMA vez e recebe o usuário do nosso
        banco disponibilizado pelo callback da estratégia de
        autenticação. Realizará a serialização apenas do
        ObjectId do usuário na sessão.
    */
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // Recebe o ObjectId do usuário armazenado na sessão
    // Chamado a CADA requisição
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};