
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
      if (err) {
      	console.log(err); }
      else {
      	req.user.tasks.push(task)
        User.findOneAndUpdate({id: req.user.id}, {tasks: req.user.tasks}, function(err){
        	console.log("couldn't save task to user");
        })
      }
    });
  } res.redirect('/');
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};
