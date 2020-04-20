const express = require("express")
const User = require('../models/User.js')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Vtkn = require('../tools/verifyToken')
const {ValidateSP,ValidateLI}= require('../tools/validator')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
router.post("/SignUp" , async (req,res) => {

    //Validate syntax
    const {error,msg} = ValidateSP(req.body)
    if (error) return res.send(msg)
    //Check user if exists
    const RegistredBefore = await User.findOne({Email :req.body.Email})
    if(RegistredBefore) return res.send("This Email is already used !")

    //hashpassword
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.Password,salt)

    const user = new User({
        Full_Name : req.body.Full_Name ,
        Email : req.body.Email ,
        Password : hash,
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
        jwt.sign({id : user._id},process.env.PAYLOAD,(err,token)=> {
            res.header('auth-token',token).send(token)
    })
    } catch (err) {
        res.json(err)
    }


})

router.post("/login", async (req,res) => {

    //Validate syntax
    const {error,msg} = ValidateLI(req.body)
    if (error) return res.send(msg)
    //checking if username exists
    const UserExist = await User.findOne({Username : req.body.Username})
    if(!UserExist || UserExist.Deleted ) {
        return res.send("This Username doesn't exists !")
    }
    //checking password
    const LoginPass = await bcrypt.compare(req.body.Password,UserExist.Password)
    if (LoginPass)  {
        jwt.sign({id : UserExist._id},process.env.PAYLOAD,(err,token)=> {
            if(err)  return res.send("Error while giving a token")
            res.header('auth-token',token).send(token)
            console.log("Logged On !")
        })
    }
    else res.send("Password is wrong")

})

//delete user
router.delete("/user/delete", Vtkn ,async (req,res) => {
    const {id} = jwt.decode(req.header('auth-token'))
    const removedUser = await User.updateOne({_id : mongoose.Types.ObjectId(id)},{Deleted : false})
    res.json(removedUser)
})

//disconnect 
router.get("/logout",Vtkn, (req,res) => {
    res.header('auth-token',null).send("Disconnected")
    //last will be handle on client side
})


module.exports= router ;