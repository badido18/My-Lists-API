const mongoose = require('mongoose')
const List = require('./List')

const UserSchema = mongoose.Schema({
    Full_Name :  {
        type : String,
        required : true
    },
    Email :  {
        type : String,
        required : true
    },
    Password :  {
        type : String,
        required : true
    },
    Username : {
        type : String,
        required : true
    },
    Phone : String,
    Lists : [List.schema],
    Deleted :{
        type :Boolean ,
        default : false
    }
})

module.exports = mongoose.model('User' ,UserSchema)