import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let history = useHistory();

  const handleSubmit=async(e)=>{
    const {name,email,password}=credentials;
    e.preventDefault();
    const response = await fetch(
      "/api/auth/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const json = await response.json()
    console.log(json);
    if(json.success){
        //Save the auth Token and redirect
      //  localStorage.setItem('token',json.authtoken);
        props.showAlert("Account Created Sucessfully","success")
        history.push("/login");
    }
    else{
        props.showAlert("Invalid Credentials","danger")
    }
}
const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})//sperad Operator

}
  return (
    <div className="conatainer mt-2">
     
            <h2 className='my-2'> Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Your Name"/>
       
        </div>
         <div className="mb-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="email"name="email"onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password"onChange={onChange}placeholder="Password" minLength={5} required />
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword"onChange={onChange} placeholder="Password" minLength={5} required/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp