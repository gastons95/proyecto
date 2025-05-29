var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');  

//Rutas
const usersRouter = require('./routes/users');
const RRoutes = require('./routes/RRoutes');
const productRoutes = require('./routes/products');


var app = express();
console.log(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// configuraciones
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // archivos estaticos
app.use(methodOverride('_method')); 

// configuracion de sesiones
app.use(session({
  secret: 'miSecretoSuperSecreto123', // cambia esto por algo seguro
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}));
// Pasar informacion del usuario logeado
app.use((req, res, next) => {
  if (req.session && req.session.userLogged) {
    res.locals.userLogged = req.session.userLogged;
  } else {
    res.locals.userLogged = false;
  }
  next();
});



// Activa las rutas de usuario
app.use('/users', usersRouter);



// Rutas principales
app.use('/', RRoutes);
app.use('/products', productRoutes)




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
