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
      callbackURL: "/auth/google/callback", //handle user coming back from google
      proxy: true //trust proxy HEROKU host
    },
    //use async  for better concurrency
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      //check if existing user
      if (existingUser) {
        return done(null, existingUser);
      }
      //create a user record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
