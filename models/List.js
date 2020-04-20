const mongoose = require('mongoose')

const ListSchema = mongoose.Schema({
    UserID : {
        type : String,
        required :true
    },
    Title : {
        type : String,
        required : true
    },
    creationDate : {
        type :Date,
        default : Date.now ,
    },
    Deleted :{
        type :Boolean ,
        default : false
    }
})

module.exports = mongoose.model('List',ListSchema)