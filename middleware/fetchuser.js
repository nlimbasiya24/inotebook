var jwt = require("jsonwebtoken");//get the token
const JWT_SECRET = "Nividisgoodb$oy";

const fetchuser = (req, res, next) => {
// call the next function
//get the user from the jwt token and add id to req object
  const token = req.header("auth-token"); //get token from header
  //console.log("fecth-user",token);
  if (!token) {// if the token is not present
    res.status(401).send({ error: "Please authenicate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data);
    req.user = data.user;
   console.log("Nivid",data.user)
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenicate using a valid token" });
  }
};
module.exports = fetchuser;//export the fetchuser
