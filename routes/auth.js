const express = require("express")
const User = require('../models/User.js')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {ValidateSP}= require('../tools/validator')
router.post("/SignUp" , async (req,res) => {

    //validate syntax
    const {error,msg} = ValidateSP(req.body)
    if (error) return res.send(msg)

    const user = new User({
        Full_Name : req.body.Full_Name ,
        Email : req.body.Email ,
        Password : req.body.Password,
        Username : req.body.Username,
        Phone : req.body.Phone,
    })
    
    try{
        const savingUser = await user.save()
        console.log("User added successfuly !")
    } 
    catch (err) {
        res.json(err)
    }
    try {
        jwt.sign({user},process.env.PAYLOAD,(err,token)=> {
        res.json(token)
    })
    } catch (err) {
        res.json(err)
    }


})

router.post("/?:username&:password", async (req,res) => {
    const FindingUser = await User.find({Username : req.params.username , Password : req.params.password})
    res.json(FindingUser)
})

router.delete("/:id", async (req,res) => {
    const removedUser = await User.deleteOne({_id : req.params.id})
    res.json(removedUser)
})


module.exports= router ;