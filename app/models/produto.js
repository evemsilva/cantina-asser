var mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        categoria: {
            type: mongoose.Schema.ObjectId,
            ref: 'Categoria',
            required: true
        },
        preco: {
            type: Number,
            required: true
        }
    });

    return mongoose.model('Produto', schema);
};