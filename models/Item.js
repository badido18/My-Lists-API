const mongoose = require('mongoose')
const List = require('./List')

const ItemSchema = mongoose.Schema({
    list : {
        type : List,
        required : true
    },
    Title : {
        type : String,
        required : true
    },
    Description : String,
    Creation  : Date,
    Deadline : Date,
    Deleted :{
        type :Boolean ,
        default : false
    }
})

module.exports = mongoose.model('Item',ItemSchema)