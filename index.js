require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
PORT = process.env.PORT || 80;
const loginRoute = require("./routes/loginRoute");
const userProfileRoute = require("./routes/userProfileRoute");
const macrosRoute = require("./routes/macrosRoute");
const recipesRoute = require("./routes/recipesRoute");
const signupRoute = require("./routes/signupRoute");
app.use(cors());
app.use(express.json());

//USE ROUTES
app.use("/recipe-library", recipesRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/macros-list", macrosRoute);
app.use("/user-profile", userProfileRoute);
//START A SERVER
app.listen(PORT, (req, res) => {
  console.log(`Running website at http://localhost:${PORT}`);
});
