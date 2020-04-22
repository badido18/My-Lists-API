const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv/config')
const auth = require('./routes/auth')
const lists = require('./routes/lists')
const items = require('./routes/items')
const BodyParser = require("body-parser")

//building the express server
const app = express()
//connect to our data base
console.log("Server Started ! Listening on port 3000")
console.log("Connecting to DB...",)
mongoose.connect(process.env.DB_CONNECT , 
    { useNewUrlParser: true,useUnifiedTopology: true  } ,
     () => console.log("Connected to DB !"))

// midlewares
app.use(BodyParser.json())
app.use("/auth",auth)
app.use("/api",lists,items)

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