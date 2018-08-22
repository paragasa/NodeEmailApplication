//passports and passport strategy
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); //get keys
const mongoose = require("mongoose");

const User = mongoose.model("users"); //one argument fetch, two load into

//serialization
passport.serializeUser((user, done) => {
  //user is the newly pulled user
  done(null, user.id);
});

//deserialize
//get token id (id)
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//pass config into google strat how to handle client
//access to db is async, need promise
passport.use(
  //google strat decides on the correct domain url
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback" //handle user coming back from google
      proxy: true //trust proxy HEROKU host
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        //find user
        //check if record exists, return promise
        if (existingUser) {
          //user exists in DB records
          return done(null, existingUser); //need return on exist
        } else {
          //user doesn't exists in DB records, create new record
          new User({ googleId: profile.id }) //pass google id(profile.id)
            .save() //take record and save to db
            .then(user => done(null, user));
          // console.log("record created for user");
        }
      });
    }
  )
);
