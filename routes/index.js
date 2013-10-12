
/*
 * GET home page.
 */
var mongoose = require("mongoose");
var Post = mongoose.model("Post");

exports.index = function(req, res){
  res.render('index', {
  	title: 'Express',
  	user: "Jessica Shu",
  	line_var: "This variable gets an entire <p> to itself."
  });
};

exports.add = function(req, res){
	var temp = new Post({
		title: req.body.title,
		content: req.body.content,
		date: new Date(req.body.date)
	}).save(function(){
		console.log("post saved!");
		res.redirect('/');
	});
}
