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
<<<<<<< HEAD
    date:{
=======
>>>>>>> parent of 82450f0 (updates cron e modelagem de esquemas)
    created:{
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date,
        default: Date.now
    },
    checked:{
        type: Boolean
    },
    etapas:{
        type: Array,
        default: [Date]
    }
});

module.exports = mongoose.model('Editais', EditalSchema)

