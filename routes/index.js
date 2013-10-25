
/*
 * GET home page.
 */
var mongoose = require("mongoose");
var Post = mongoose.model("Post");
var Message = mongoose.model("Message");

exports.index = function(req, res){
  res.render('index', {
  	title: "Jessica Shu",
  	software: "Express",
  	stylesheet: "homepage.css"
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
  res.render('new_post', {
    title: "New"
  });
};

exports.messages = function(req, res){
  Message.find().sort({date: -1}).exec(function(err, message){
    if (message && message[0]){
      res.render('messages', {
        title: "Inbox",
        messages: message
      });
    }
    else {
      res.redirect('/');
    };
  });
};

exports.add = function(req, res){
  if (req.body.password.trim() == "sushi4ever"){
    var temp = new Post({
      title: req.body.title,
      content: req.body.content,
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
    content: req.body.message.trim(),
    date: Date.now()
  }).save(function(){
    console.log("message saved!");
    s = req.body.name != "" && req.body.message != "" && req.body.email.indexOf("@") != -1
    res.render('contact', {
      title: "Contact Me",
      name: req.body.name,
      email: req.body.email,
      msg: req.body.message,
      email_sym: req.body.email.indexOf("@"),
      success: s
    });
  });
};

