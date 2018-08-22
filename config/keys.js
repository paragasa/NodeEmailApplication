//find keys for credentials
if (process.env.NODE_ENV === "production") {
  //we are in production - return prod set keys heroku
  module.exports = require("./prod");
} else {
  //we are in development -return dev keys
  module.exports = require("./dev"); //get dev set to module
}
