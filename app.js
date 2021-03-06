

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session=require('express-session');

var passport=require('passport');
var strategy= require('passport-local').Strategy;


//setup routing
var routes = require('./routes/index');
var users = require('./routes/users');
var login= require('./routes/login');
var course = require('./routes/course');
var test = require('./routes/test');
var add_user = require('./routes/create_user');
var school_info = require('./routes/school_info');

/*var emis_students = require('./routes/students');
var emis_classes = require('./routes/classes');*/

var mongoose= require('mongoose');
mongoose.Promise=global.Promise;

var uri = "mongodb://root:9235@ds139428.mlab.com:39428/integrated_system";
mongoose.connect(uri);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/course', course);
app.use('/test', test);
app.use('/student', add_user);
app.use('/school', school_info);

/*app.use('/students', emis_students);
app.use('/classes', emis_classes);*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
