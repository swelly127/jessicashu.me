
/*
 * GET home page.
 */
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var utils = require('utils');

exports.index = function(req, res){
  res.render('index', {
    picture: utils.get_picture(req.user),
    user: req.user,
  	title: "Homepage"
  });
};

exports.resume = function(req, res){
  res.render('resume', {
    title: "Experience"
  });
};

exports.wind = function(req, res){
  res.render('wind');
};

exports.chrome = function(req, res){
  res.render('chrome');
};

exports.addmsg = function(req, res){
  sendgrid.send({
    to:       "Jessica <jessicashu127@gmail.com>",
    from:     "Jessica <jessicashu127@gmail.com>",
    subject:  "New message from " + req.body.name + " at " + req.body.email,
    text:     req.body.message
  }, function(err, json) {
    if (err) {
      console.error(err);
      alert(err);
      alert(process.env);
    }
    s = req.body.name != "" && req.body.message != "" && req.body.email.indexOf("@") != -1
    console.log("message sent!");
    res.render('index', {
      name: req.body.name,
      email: req.body.email,
      msg: req.body.message,
      email_sym: req.body.email.indexOf("@"),
      success: s
    });
  });
};

