var mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        username: String,
        password: String
    }, {
            collection: 'userInfo'
        });

    return mongoose.model('Usuario', schema);
};