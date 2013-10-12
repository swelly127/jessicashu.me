var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var postSchema = new mongoose.Schema({
	title: String,
	content: String,
	date: Date
});

var Post = mongoose.model("Post", postSchema)
