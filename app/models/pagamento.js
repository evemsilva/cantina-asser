var mongoose = require('mongoose');

module.exports = function () {
    var schema = mongoose.Schema({
        
        cliente: {
            type: mongoose.Schema.ObjectId,
            ref: 'Cliente'
        },

        data: {
            type: Date,
            default: Date.now,
            required: true,
        },

        produto: {
            type: String,
            required: true,
        },

        quantidade: {
            type: Number,
            required: true,
        },

        valor: {
            type: Number,
            required: true,
        }
    });

    return mongoose.model('Pagamento', schema);
};