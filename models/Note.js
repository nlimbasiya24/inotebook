const mongoose = require('mongoose');
const { Schema } = mongoose; // in bulit schema have to import

const NotesSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId, //forgin Key purpose:only one user show his notes, another user is not able to show the notes
        //get user from user id
        ref:'user'
    
    },
    
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
       // unique:true
    },
    tag:{
        type:String,
        default:"General"
        
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model('notes',NotesSchema)//model name notes //also create collection in mongodb compass