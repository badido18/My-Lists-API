const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const auth = require('./routes/auth')
const BodyParser = require("body-parser")
//building the express server
const app = express()

//connect to our data base
console.log("Server Started !")
console.log("Connecting to DB...")
mongoose.connect(process.env.DB_CONNECT , 
    { useNewUrlParser: true,useUnifiedTopology: true  } ,
     () => console.log("Connected to DB"))

// midlewares
app.use(BodyParser.json())
app.use("/auth",auth)
//routes
app.get("/",(req,res) => {
    res.send("Welcome to My List API\nLook at the documentation by geting /doc")
    console.log("Server reached")
})

app.get("/doc", (req,res, ) => {
    res.send("Helo welcome to My Lists Api documentation")
    console.log("Documentation accessed")
})


// listening on server
app.listen(3000)