require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
URL = process.env.WEB_URL || 9000;
const loginRoute = require("./routes/loginRoute");
const userProfileRoute = require("./routes/userProfileRoute");
app.use(cors());
app.use(express.json());

//USE ROUTES
app.use("/login", loginRoute);
app.use("/user-profile", userProfileRoute);
//START A SERVER
app.listen(URL, (req, res) => {
  console.log(`Running website at http://localhost:${URL}`);
});
