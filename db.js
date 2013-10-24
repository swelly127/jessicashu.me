var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	content: String,
	date: Date
});

var msgSchema = new Schema({
	name: String,
	email: String,
	content: String,
	date: Date
});

var Post = mongoose.model("Post", postSchema)
var Message = mongoose.model("Message", msgSchema)
var uri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/test"
mongoose.connect(uri);

/*
DATABASE EXAMPLES
var Task = new Schema({
	content : {
		type: String,
		unique: true
	},
	done: Boolean,
	user: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	date : Date
});

var User = new Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	tasks: [Task]

var Cookie = new Schema({
	username: String,
	password: String
});
});

mongoose.model('Task', Task);
mongoose.model('User', User);
mongoose.model('Cookie', Cookie);
*/
