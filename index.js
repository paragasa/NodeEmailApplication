//*REQUIRES*
const express = require("express");
const mongoose = require("mongoose"); //DB
const passport = require("passport"); //PASSPORT AND STRATEGY
const cookieSession = require("cookie-session"); //apply cookie lib
const bodyParser = require("body-parser"); //allow req to parse in req.body
const keys = require("./config/keys");

require("./models/User"); //get user
require("./models/Survey");
require("./services/passport"); //check passport, w/ user
//mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI); //get db using user key
//each app is associate to every route handler
const app = express(); //generates a single application of express
//setup Cookies
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize()); //init
app.use(passport.session()); //new session

require("./routes/authRoutes")(app); //run auth pass in app
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

//production handlebar
if (process.env.NODE_ENV === "production") {
  //express will serve production assets eg main.js
  app.use(express.static("client/build")); //if route handler doesnt exist check

  //serve index.html if express doesnt recognize address
  //react will recognize it eg auth or builling routes
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/*PORTS*/
//*heroku ports*
//if ther isnt a port set by heroku, then set 5000
//use port that heroku provide
const PORT = process.env.PORT || 5000;
app.listen(PORT);
