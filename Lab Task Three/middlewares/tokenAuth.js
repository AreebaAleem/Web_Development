const jwt = require("jsonwebtoken");
function tokenAuth(req, res, next) {
  let token = req.header("x-auth-token");

  if (!token) return res.status(400).send("Token not Provided");

  try {
    let order = jwt.verify(token,"myprivatekey" );
    req.order  = order ;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid token");
  }
}

module.exports = tokenAuth;

//assignment 4 restful api and token based authentication