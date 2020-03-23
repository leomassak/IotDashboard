const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({

    buttonuser: {
        type: String,
        required: true,
    },

    nome: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true,
    },

    mensagem: {
        type: String,
        required: true,
    },
    
    // tipo: {
    //     type: String,
    //     requires: true,
    // },

    // icone: {
    //     type: String,
    //     required: true,
    // },

    /*categoria: {
        type: Schema.Types.ObjectId,
        ref: categoria,
        required: true
    },*/

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Buttons', buttonSchema);