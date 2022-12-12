const express = require("express"); //improt express from node module
const router = express.Router();//use Router
const User = require("../models/User");//Users file access from models
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY;//jwttoken string
const fetchuser=require("../middleware/fetchuser");

//Route1:Create a user using:POST "api/auth/createuser" No login required end-point
router.post
("/createuser",
  [
    body("name", "Enter valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password must be atleast five character").isLength({min: 5}),
  ],

  async (req, res) => {
    let success=false;
    //If there are errors,return Bad request and the errors
    const errors = validationResult(req);
   // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    //check whether the user with this email exists already

    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res.status(400).json({ success,error: "Sorry a user with this email already exists" });
       }

      //Create a new user
      const salt=await bcrypt.genSalt(10);//genrate salt
      const secPass=await bcrypt.hash(req.body.password,salt);//update secure password it return the promise
      //Store hash in your password DB
      user = await User.create({
        name: req.body.name,
        password:secPass ,
        email: req.body.email,
      });

      const data = {
        user:{
          id:user.id,
         // email:user.email //use id for sending a data
        }
      }

      const authtoken=jwt.sign(data,JWT_SECRET);//jwtToken first argument is data and 
      //second argument is key and it return promise
      //console.log(jwtData);
      //   .then(user => res.json(user))
      //    .catch(err=>{console.log(err)
      //    res.json({error: 'Please enter a unique value for email',message:err.message})})
      success=true;
      res.json({success,authtoken});//send response for auth token
      //res.json({success});//send response for auth token
      //Catch errors
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);



//Route 2:Authenticate a user using:POST "api/auth/createuser" No login required
router.post("/login",
  [
   
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),

    
  ],async (req, res)=>{
   let success=false;

     //If there are errors,return Bad request and the errors
     const errors = validationResult(req);
     console.log(errors);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const{email,password} = req.body;//email and password from req.body
     try{
       let  user = await User.findOne({email});//find user using email
      
      if(!user){
        success=false;
        return res.status(400).json({error:"Please try to login with correct credentials"});// if the user is not exist after that send the json
      }

      const passwordCompare = await bcrypt.compare(password,user.password);//compare the password 
      if(!passwordCompare){
        success=false;
        return res.status(400).json({success,error:"Please try to login with correct credentials"});// if the user is not exist after that send the json

      }

      const data = {
        user:{
          id:user.id
         // id:user.email //use id for sending a data
        }
      }

      const authtoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken})

     }catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
    })

    //Route 3:Get logging User Details using:POST "api/auth/getuser" Login required
  
    router.post("/getuser",fetchuser,async (req, res)=>{//use fetchuser as a middleware
      //console.log(req);
    try {
      userId= req.user.id;
     // console.log(userId);
      const user = await User.findById(userId).select("-password") //select userid except password | get the user id
      res.send(user)
      } 
    catch (error) 
  {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
  module.exports = router; //export the router