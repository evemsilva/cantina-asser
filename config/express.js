var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function () {
    var app = express();

    // Configuracao do ambiente
    app.set('port', 3000);

    // middleware
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.use(cookieParser('cantina'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));

    app.use(require('method-override')());

    load('models', { cwd: 'app' })
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};