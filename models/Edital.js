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
    }
});

module.exports = mongoose.model('Editais', EditalSchema)