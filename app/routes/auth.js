var passport = require('passport');

module.exports = function (app) {

    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
        })
    );

    app.get('/logout', function (req, res) {
        req.session.destroy();
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });
};