var passport = require('passport');

module.exports = function (app) {
    
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/loginSuccess',
            failureRedirect: '/loginFailure'
        })
    );

    app.get('/loginFailure', function (req, res, next) {
        res.status(401).send('Failed to authenticate');
    });

    app.get('/loginSuccess', function (req, res, next) {
        res.status(200).send('Successfully authenticated');
    });

};