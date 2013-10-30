
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
var User = mongoose.model("User");
var Message = mongoose.model("Message");

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user_id, done) {
  User.findOne({id:user_id}, function(err, user) {
    done(err, user);
  });
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.session({secret:'sushi4ever'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

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

passport.use(new FacebookStrategy({
    clientID: '502542769799772',
    clientSecret: '57a1ab34650ee8b151276a93abd7666f',
    callbackURL: "http://www.jessicashu.com/auth/facebook/callback"
  }, function(accessToken, refreshToken, profile, done) {
    var saved_user = User.find({id: profile.id});
    if (saved_user && saved_user[0]) {
        console.log("HELLLO")
        console.log(saved_user[0])
        console.log("GOODBYE")
        done(null, saved_user);
    } else {
        var temp = new User({
            id: profile.id,
            name: profile.displayName,
            tasks: []
        }).save(function(err, new_user){
            console.log("HELLLO AGAIN")
            console.log(new_user);
            console.log("BYEEE")
            if (err) { return done(err); }
            done(null, new_user)
        })
    }
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/resume'
    }));
//app.get('/logout', user.logout);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
