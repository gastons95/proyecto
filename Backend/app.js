var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const RRoutes = require('./routes/RRoutes');


var app = express();
console.log(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("wiews","ruta")

// configuraciones
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // archivos estaticos
app.use('/',RRoutes);



// marcan el inicio de ruteo
app.use('/', indexRouter);
app.use('/users', usersRouter);



app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});


// catch 404 and forward to error handler ( configuraciones para el manejor de errores)
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
