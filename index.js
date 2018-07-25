//root file
//import express library
const express = require("express");

//generates a single application of express
//each app is associate to every route handler
const app = express();

//create route handler
//watch for '/' using get, / is route
//req is request for incoming request, res is object representing outgonig response
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

//if ther isnt a port set by heroku, then set 5000
//use port that heroku provide
const PORT = process.env.PORT || 5000;
app.listen(5000);
