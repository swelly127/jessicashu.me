
/**
 * Module dependencies.
 */
require("./db");

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/contact', routes.contact)
app.get('/blog', routes.blog)
app.get('/resume', routes.resume)
app.get('/users', user.list);
app.get('/messages', routes.messages)
app.get('/new_post', routes.new_post)
app.get('/plz_stop', routes.plz_stop)
app.post('/new_post', routes.add);
app.post('/contact', routes.addmsg);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
