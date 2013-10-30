
/**
 * Module dependencies.
 */
require("./db");

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var app = express();
var http = require('http');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

var passport = require('passport');

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

app.use(express.cookieParser());
app.use(express.session({secret:'sushi4ever'}));
app.use(passport.initialize());
app.use(passport.session());

//app.use(everyauth.middleware(app));
//app.use(mongooseAuth.middleware());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/contact', routes.contact)
app.get('/blog', routes.blog)
app.get('/resume', routes.resume)
app.get('/messages', routes.messages)
app.get('/new_post', routes.new_post)
app.get('/plz_stop', routes.plz_stop)
app.post('/new_post', routes.add);
app.post('/contact', routes.addmsg);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/resume'
    }));
app.get('/logout', user.logout);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
