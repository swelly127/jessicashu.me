
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
    user: "Jessica Shu",
  });
};

exports.resume = function(req, res){
  res.render('resume', {
    title: "Experience"
  });
};

exports.add = function(req, res){
	var temp = new Post({
		title: req.body.title,
		content: req.body.content,
		date: Date.now()
	}).save(function(){
		console.log("post saved!");
		res.redirect('/');
	});
};

exports.addmsg = function(req, res){
  var temp = new Message({
    name: req.body.name,
    email: req.body.email,
    content: req.body.message
  }).save(function(){
    console.log("post saved!");
    res.redirect('/contact');
  });
};

