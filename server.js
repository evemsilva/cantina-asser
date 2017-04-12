var http = require('http');
var app = require('./config/express')();

require('./config/passport')();
require('./config/database.js')(process.env.MONGODB_URI || 'mongodb://localhost/cantina');

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server escutando na porta ' +
        app.get('port'));
});