const mongoose = require('mongoose');
const { Schema } = mongoose; // in bulit schema have to import

const UserSchema = new Schema({ // bulit in schema it is given by mongoose

    name:{
        type:String,  //in built
        required:true
    },
    email:{
        type:String, //javascript
        required:true,
        unique:true
    },
    password:{//javascript
        type:String,
        required:true
    },
    date:{//javascript
        type:Date,
        default:Date.now //dont call the function 
    },
});

const User = mongoose.model('user',UserSchema);//name of model user
//User.createIndexes();
module.exports = User;//export the USER