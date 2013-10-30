
/*
 * GET users listing.
 */
var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '502542769799772',
    clientSecret: '57a1ab34650ee8b151276a93abd7666f',
    callbackURL: "http://www.jessicashu.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var saved_user = User.find({email: profile.emails[0].value});
    if (saved_user) {
        done(null, saved_user);
    } else {
        var temp = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            tasks: []
        }).save(function(err){
            if (err) { return done(err); }
            done(null, user)
        })
    }
  }
));

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};
