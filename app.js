var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personajesRouter = require('./routes/personajes');
var peliculasRouter = require('./routes/peliculas');
var generosRouter = require('./routes/generos');
require('./bin/asociaciones')
const jwt = require('jsonwebtoken')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/characters', validacion, personajesRouter);
app.use('/movies', validacion, peliculasRouter);
app.use('/genres', validacion, generosRouter);
app.use('/auth', usersRouter);

// valido token

function validacion(req, res, next) {
  jwt.verify(req.headers["x-access-token"], "disney2022", function(error, decodificado) {
    if(error) {res.json({message: error.message})} else
    {console.log("Validado"); next()}

  })
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
