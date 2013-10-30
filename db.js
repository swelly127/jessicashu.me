var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var post = new Schema({
	title: String,
	content: String,
	date: Date
});

var msg = new Schema({
	name: String,
	email: String,
	content: String,
	date: Date
});

var cookie = new Schema({
	username: String,
	password: String
})

var task = new Schema({
	content: {
		type: String,
		unique: true
	},
	done: Boolean,
	user: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	due_date: Date
})


var user = new Schema({
	email: {
		type: String,
		unique: true
	},
	name: String,
	tasks: [Task]
})

var Post = mongoose.model("Post", post)
var Message = mongoose.model("Message", msg)
var User = mongoose.model("User", user)
var Task = mongoose.model("Task", task)
var Cookie = mongoose.model("Cookie", cookie)

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
