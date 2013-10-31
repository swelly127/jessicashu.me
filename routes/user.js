
/*
 * GET users listing.
 */
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Task = mongoose.model("Task");
var utils = require('utils');

exports.addtask = function(req, res){
  if (req.body.content.trim()!=""){
    var temp = new Task({
      content: req.body.content.trim(),
      done: false,
      user: req.user._id,
      finished_date: null,
      due_date: utils.parse_date(req.body.date)
    }).save(function(err, task){
      if (err) { console.log("task not saved - error"); }
      else {
        req.user.tasks.push(task);
        req.user.save();
      }
    });
  } res.redirect('/');
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};
