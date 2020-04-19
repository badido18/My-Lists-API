const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const auth = require('./routes/auth')
//building the express server
const app = express()

//connect to our data base
mongoose.connect(process.env.DB_CONNECT , { useNewUrlParser: true,useUnifiedTopology: true  } , () => console.log("Connected to DB"))

// midleware
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