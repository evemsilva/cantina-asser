var mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        }
    });

    return mongoose.model('Usuario', schema);
};