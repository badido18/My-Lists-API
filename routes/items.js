const Item = require('../models/Item')
const List = require('../models/List')
const express = require("express")
const router = express.Router()
const {ValidateITM}= require('../tools/validator')
const Vtkn = require('../tools/verifyToken')
const mongoose = require('mongoose')

//get items
router.get("/:ListID/items", Vtkn , async (req,res) => {
    
    const lid = req.params.ListID

    try {   
        const items = await Item.find({ListID : lid, Deleted : false})
        res.send(items)
    } catch (error) {
        res.status(400).send("Failed finding your list items !")
    }

} )

//add item

router.post("/:ListID/add", Vtkn , async (req,res) => {

    const {error,msg} = ValidateITM(req.body)
    if (error) return res.status(400).send(msg)
    const lid = req.params.ListID.toString()

    
    //const li = await List.findOne({_id : mongoose.Types.ObjectId(lid)})
    //if (li) return res.status(400).send("this list doesn't exist ")


    const item = new Item({
        ListID : lid,
        Title : req.body.Title,
        Deadline : req.body.Deadline,
        Description : req.body.Description
    })

    try {
        const saved = await item.save()
        res.send(saved)
    } catch (err) {
        res.status(400).send("Failed adding your item to DB !")
    }

} )

//delete item

router.delete("/:ListID/del/:ItemID", Vtkn , async (req,res) => {
    const lid = req.params.ListID
    try {  
        await Item.updateOne({_id : mongoose.Types.ObjectId(req.params.ItemID),ListID : lid},{Deleted : true})
        res.send("Deleted successfully")
    } catch (err) {
        res.status(400).send("Failed deleting item from DB !")
    }
    
})

//updating item

router.patch("/:ListID/upd/:ItemID", Vtkn , async (req,res) => {
    const lid = req.params.ListID
    try {  
        const upd = await Item.updateOne({_id : mongoose.Types.ObjectId(req.params.ItemID),ListID : lid},req.body)
        upd.nModified ? res.send("Updated successfully") : res.send("No modifications was made")
    } catch (err) {
        res.status(400).send("Failed updating item in the DB !")
    }
    
})

//delete all data
router.delete("/:ListID/del", Vtkn , async (req,res) => {
    
    const lid = req.params.ListID

    try {   
        const items = await Item.updateMany({ListID : lid},{Deleted : true})
        res.send(items)
    } catch (error) {
        res.status(400).send("Failed deleting all your list items !")
    }

} )



//delete all backup
router.delete("/:ListID/backup/del", Vtkn , async (req,res) => {
    
    const lid = req.params.ListID

    try {   
        const items = await Item.deleteMany({ListID : lid,Deleted : true})
        res.send("Backup deleted")
    } catch (error) {
        res.status(400).send("Failed deleting your backup items !")
    }

} )






module.exports = router