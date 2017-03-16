var mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true,
        },
        cpf: {
            type: String
        },
        telefone1: {
            type: String
        },
        telefone2: {
            type: String
        },
        curso: {
            type: mongoose.Schema.ObjectId,
            ref: 'Curso'
        }
    });

    return mongoose.model('Cliente', schema);
};