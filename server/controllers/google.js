const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
// const mongoose = require("mongoose");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLEINTID,
      clientSecret: process.env.GOOGLE_CLEINTSECRET,
      callbackURL: "/auth/google/redirect",
    },
    (_accessToken, _refreshToken, profile, done) => {
      //passport callback function
      //check if the user already exists in our dbwith the given  profile ID
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          //if we alreaady have the record with the given profile
          done(null, currentUser);
        } else {
          //if not, create new user
          new User({
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      })
    }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    })
  });

  //middleware to check if the user is autheticated
  function isUserAutheticated(req,res,next){
    if(req.user){
        next();
    } else {
        res.send("you must login")
    }
  };
  // Routes
  app.get('/auth/google',passport.authenticate('google',{
      scope: ['profile'],
  }));

  app.use('/secret', isUserAutheticated,(req,res)=>{
      res.send('You habe reached our secret route')
  });

  app.get('/logout',(req,res)=>{
      req.logout();
      res.redirect('/');
  });

