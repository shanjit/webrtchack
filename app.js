var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var everyauth = require('everyauth')
  , connect = require('connect');


//Dropbox login
var conf = require('./conf.js')
  , everyauthRoot = __dirname + '/..';
everyauth.debug = true;

everyauth.dropbox
  .entryPath('/auth/dropbox')
  .callbackPath('/auth/dropbox/callback');

var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

var usersByDropboxId = {};

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

everyauth.everymodule.moduleErrback( function (err) {
  console.log(err);
});


everyauth
  .dropbox
    .consumerKey(conf.dropbox.consumerKey)
    .consumerSecret(conf.dropbox.consumerSecret)
    .findOrCreateUser( function (sess, accessToken, accessSecret, dropboxUserMetadata) {
      console.log(usersByDropboxId[dropboxUserMetadata.uid]);
      return usersByDropboxId[dropboxUserMetadata.uid] ||
        (usersByDropboxId[dropboxUserMetadata.uid] = addUser('dropbox', dropboxUserMetadata));
    })
    .redirectPath('/')




var routes = require('./routes/index');
var users = require('./routes/users');
var editor = require('./routes/editor');
var welcome = require('./routes/welcome');
var search = require('./routes/search');


var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('htuayreve'));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: '<mysecret>', 
                 saveUninitialized: true,
                 resave: true}));

app.use('/auth/dropbox/callback', welcome);


app.use(everyauth.middleware(app));



app.use('/', routes);

app.use('/downloadbin', function(req, res){

    res.download('exe/main.bin', 'main.bin');
      res.sendfile('exe/main.bin');
});


// The editor page for the hackgecko app

app.use('/editor', editor);
app.use('/room', search );
app.use('/welcome', welcome);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
