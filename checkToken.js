require("dotenv").config();
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  // check and verify JWT token
  if (token && jwt.verify(token, JWT_SECRET)) {
    req.user = jwt.decode(token); // attach decoded token to req object
    next();
  } else {
    next();
  }
};
