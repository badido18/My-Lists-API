const mongoose = require('mongoose')


const ItemSchema = mongoose.Schema({
    ListID : {
        type : String,
        required : true
    },
    Title : {
        type : String,
        required : true
    },
    Description : String,
    Creation  : {
        type :Date,
        default : Date.now ,
    },
    Deadline : Date,
    Deleted :{
        type :Boolean ,
        default : false
    }
})

module.exports = mongoose.model('Item',ItemSchema)