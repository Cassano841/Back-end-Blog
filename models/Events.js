const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
    summary:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    dataEvento:{
        type: Date,
        require: true
    },
    dateCriacao:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Eventos', EventSchema)