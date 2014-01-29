
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
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "jessicashu127@gmail.com",
    pass: "sushi4ever"
  }
})

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
app.get('/blog', routes.blog)
app.get('/resume', routes.resume)
app.get('/messages', routes.messages)
app.get('/new_post', routes.new_post)
app.get('/blog', routes.blog)
app.get('/plz_stop', routes.plz_stop)
app.post('/new_post', routes.add);
app.post('/', routes.addmsg);

passport.use(new FacebookStrategy({
    clientID: '502542769799772',
    clientSecret: '57a1ab34650ee8b151276a93abd7666f',
    callbackURL: "http://www.jessicashu.com/auth/facebook/callback"
  }, function(accessToken, refreshToken, profile, done) {
    var query = User.findOne({id: profile.id});
    query.exec(function (err, query) {
        if (err) { return done(err) };
        if (query) {
            done(null, query)
        } else {
            var temp = new User({
                id: profile.id,
                username: profile.username,
                first_name: profile.name.givenName,
                name: profile.displayName,
                tasks: []
            }).save(function(err, new_user){
                if (err) { return done(err); }
                done(null, new_user)
            })
        }
    })
  }
));

app.get('/secret', passport.authenticate('facebook'), function(req, res){});
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/plz_stop',
        failureRedirect: '/resume'
    }));

app.get('/logout', user.logout);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
