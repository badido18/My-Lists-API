const express = require("express")
const User = require('../models/User.js')

const router = express.Router()


router.post("/SignUp" , async (req,res) => {

    const user = new User({
        Full_Name : req.body.Full_Name ,
        Email : req.body.Email ,
        Password : req.body.Password,
        Username : req.body.Username,
        Phone : req.body.Phone,
    })
    
    try{
        const savingUser = await user.save()
        res.json(savingUser)
        console.log("User added successfuly !")
    } 
    catch (err) {
        res.json(err)
    }

})




module.exports= router ;