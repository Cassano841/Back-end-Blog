const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EditalSchema = new Schema ({
    title:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    label:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date
<<<<<<< HEAD
=======
    },
    checked:{
        type: Boolean
>>>>>>> parent of 0a57cd6 (atuaização rotas e server.js)
    }
});

module.exports = mongoose.model('Editais', EditalSchema)

