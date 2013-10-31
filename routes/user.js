
/*
 * GET users listing.
 */
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Task = mongoose.model("Task");
var utils = require('utils');

exports.addtask = function(req, res){
  console.log("date we have is");
  console.log(req.body.date);
  console.log("we made");
  console.log(utils.parse_date(req.body.date));
  if (req.body.content.trim()!=""){
    var temp = new Task({
      content: req.body.content.trim(),
      done: false,
      user: req.user._id,
      finished_date: null,
      due_date: utils.parse_date(req.body.date)
    }).save(function(err, task){
      if (err) { console.log("task not saved - error");
      console.log(err); }
      else {
      	req.users.tasks.push(task)
      	console.log("LOOKATME!!")
      	console.log(req.users.tasks)
        User.update({username: req.user.username}, {tasks: req.users.tasks})
      }
    });
  } res.redirect('/');
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};
