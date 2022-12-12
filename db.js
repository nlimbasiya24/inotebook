const mongoose = require('mongoose');//import from node-module folder
require("dotenv").config();

const mongoURI = process.env.DATABASE;
//connection string 
const connectToMongo = ()=>{  //for connect to database 
    mongoose.connect(mongoURI,()=>{//function (call back)

        console.log("Connected to Mongo Sucessfully");
    })
}

module.exports = connectToMongo;//export the connectToMongo