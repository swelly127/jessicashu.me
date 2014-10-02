
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var app = express();
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.session({secret:'sushi4ever'}));
app.use(app.router);

//app.use(everyauth.middleware(app));
//app.use(mongooseAuth.middleware());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/wind', routes.wind)
app.get('/poker', routes.poker)
app.get('/chrome', routes.chrome)
app.get('/resume', routes.resume)
app.post('/', routes.addmsg);


app.listen(process.env.PORT || 4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
