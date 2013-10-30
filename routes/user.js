
/*
 * GET users listing.
 */
var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require('passport');

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};
