
/*
 * GET home page.
 */
var mongoose = require("mongoose");
var Post = mongoose.model("Post");
var Message = mongoose.model("Message");
var utils = require('utils');

exports.index = function(req, res){
  res.render('index', {
    picture: utils.get_picture(req.user),
    user: req.user,
  	title: "Homepage"
  });
};

exports.blog = function(req, res){
  Post.find().sort({date: -1}).exec(function(err, post){
    if (post && post[0]){
      res.render('archive', {
        title: "Archives",
        text_blob: post
      });
    }
    else {
      res.redirect('/');
    };
  });
};

exports.contact = function(req, res){
  res.render('contact', {
  	title: "Contact Me",
    user: "Jessica Shu"
  });
};

exports.resume = function(req, res){
  res.render('resume', {
    title: "Experience"
  });
};

exports.plz_stop = function(req, res){
  res.render('plz_stop', {
    title: "Hey you"
  });
};

exports.new_post = function(req, res){
  if (req.user && req.user.username=='swelly127'){
    res.render('new_post', {
      title: "New"
    });
  } else {
    res.redirect('/');
  }
};

exports.messages = function(req, res){
//  Message.find().sort({date: -1}).exec(function(err, message){
//    if (message && message[0] && req.user && req.user.username=='swelly127'){
      res.render('messages', {
        title: "Inbox",
        messages: message
      });
//    }
//    else {
//      res.redirect('/');
//    };
//  });
};

exports.add = function(req, res){
  if (req.body.title == "" || req.body.content == "") {
    res.render('new_post', {
      title: "New",
      post_title: req.body.title,
      body: req.body.content
    });
  } else if (req.body.password.trim() == "sushi4ever") {
    var temp = new Post({
      title: req.body.title,
      content: utils.parse_input(req.body.content),
      date: Date.now()
    }).save(function(){
      console.log("post saved!");
      res.redirect('/blog');
    });
  } else {
      res.redirect('/plz_stop');
  }
};

exports.addmsg = function(req, res){
  var temp = new Message({
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    content: utils.parse_input(req.body.message),
    date: Date.now()
  }).save(function(){
    console.log("message saved!");
    s = req.body.name != "" && req.body.message != "" && req.body.email.indexOf("@") != -1
    res.render('index', {
      name: req.body.name,
      email: req.body.email,
      msg: req.body.message,
      email_sym: req.body.email.indexOf("@"),
      success: s
    });
  });
};

