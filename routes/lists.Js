const List = require('../models/List')
const express = require("express")
const router = express.Router()
const {ValidateLIST}= require('../tools/validator')
const Vtkn = require('../tools/verifyToken')
const jwt = require('jsonwebtoken')

//get lists
router.get("/Lists", Vtkn , async (req,res) => {
    
    //decoding the token
    const {id} = jwt.decode(req.header('auth-token'))

    try {   
        const lists = await List.find({UserID : id, Deleted : false})
        res.send(lists)
    } catch (error) {
        res.status(400).send("Failed finding your lists !")
    }

} )

//add list

router.post("/Lists/add", Vtkn , async (req,res) => {

    const {error,msg} = ValidateLIST(req.body)
    if (error) return res.status(400).send(msg)
    //decoding the token
    const {id} = jwt.decode(req.header('auth-token'))

    const list = new List({
        UserID : id,
        Title : req.body.Title
    })

    const li = await List.findOne({Title : req.body.Title , UserID : id})
    if (li) return res.status(400).send("this title name already exists ")

    try {
        const saved = await list.save()
        res.send(saved)
    } catch (err) {
        res.status(400).send("Failed adding your list to DB !")
    }

} )

//delete list

router.delete("/Lists/delete", Vtkn , async (req,res) => {
    const {id} = jwt.decode(req.header('auth-token'))
    try {  
        await List.deleteOne({Title : req.body.Title ,UserID : id})
        res.send("Deleted successfully")
    } catch (err) {
        res.status(400).send("Failed deleting list from DB !")
    }
    
})

//updating list's title

router.patch("/Lists/update", Vtkn , async (req,res) => {
    const {id} = jwt.decode(req.header('auth-token'))
    try {  
        const upd = await List.updateOne({Title : req.body.Title ,UserID : id},{Title : req.body.newTitle})
        upd.nModified ? res.send("Updated successfully") : res.send("No modifications was made")
    } catch (err) {
        res.status(400).send("Failed updating list's title from DB !")
    }
    
})

//delete all data
router.delete("/del/Lists", Vtkn , async (req,res) => {
    
    //decoding the token
    const {id} = jwt.decode(req.header('auth-token'))

    try {   
        const lists = await List.updateMany({UserID : id},{Deleted : true})
        res.send(lists)
    } catch (error) {
        res.status(400).send("Failed deleting all your lists !")
    }

} )



//delete all backup
router.delete("/del/Lists/backup", Vtkn , async (req,res) => {
    
    //decoding the token
    const {id} = jwt.decode(req.header('auth-token'))

    try {   
        const lists = await List.deleteMany({UserID : id,Deleted : true})
        res.send("Backup deleted")
    } catch (error) {
        res.status(400).send("Failed deleting all your backup !")
    }

} )






module.exports = router