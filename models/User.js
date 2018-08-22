const mongoose = require("mongoose");
//const Schema = mongoose.Schema;Vequivalent
const { Schema } = mongoose; //use mongoose to deconstruct into schema

const userSchema = new Schema({
  googleId: String
});

//create new collection called users using userSchema, wont overwrite
mongoose.model("users", userSchema);
