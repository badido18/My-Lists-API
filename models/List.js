const mongoose = require('mongoose')
const User = require('./User')
const Item = require('./Item')

const ListSchema = mongoose.Schema({
    user : {
        type : User,
        required : true
    },
    Title : {
        type : String,
        required : true
    },
    items : [Item.schema],
    creationDate : Date,
    Deleted :{
        type :Boolean ,
        default : false
    }
})

module.exports = mongoose.model('List',ListSchema)