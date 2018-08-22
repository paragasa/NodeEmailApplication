//*REQUIRES*
const express = require("express");
const mongoose = require("mongoose"); //DB
const passport = require("passport"); //PASSPORT AND STRATEGY
const cookieSession = require("cookie-session"); //apply cookie lib
const keys = require("./config/keys");
require("./models/User"); //get user
require("./services/passport"); //check passport, w/ user

mongoose.connect(keys.mongoURI); //get db using user key
//each app is associate to every route handler
const app = express(); //generates a single application of express
//setup Cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize()); //init
app.use(passport.session()); //new session
require("./routes/authRoutes")(app); //run auth pass in app

/*PORTS*/
//*heroku ports*
//if ther isnt a port set by heroku, then set 5000
//use port that heroku provide
const PORT = process.env.PORT || 5000;
app.listen(PORT);
