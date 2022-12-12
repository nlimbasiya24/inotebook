//ENTRY POINT of backend
require("dotenv").config();
const connectToMongo= require('./db');//connect with db 
const express = require('express')//from node-module
const path = require("path");

var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000


app.use(cors())

app.use(express.json())//middleware have to use to send the request

//Available Routes

app.use('/api/auth',require('./routes/auth'))//using app.use  authnication for logging process
app.use('/api/notes',require('./routes/notes'))//using app.use notes is for crud application

app.use(express.static(path.join(__dirname,"./client/build")))
app.get("*",function(_,res){
   res.sendFile(
    path.join(__dirname,"./client/build/index.html"),
    function(err){
     res.status(500).send(err) 
    }
   )
})

app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`)
})
