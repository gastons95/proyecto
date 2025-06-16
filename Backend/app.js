const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');
const usersRouter = require('./routes/users');
const RRoutes = require('./routes/RRoutes');
const productRoutes = require('./routes/products');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares base
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Cors
app.use(cors());

// sesiones
app.use(session({
  secret: 'miSecretoSuperSecreto123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// variable global de usuario logueado
app.use((req, res, next) => {
  res.locals.userLogged = req.session.userLogged || false;
  next();
});

// rutas
app.use('/', RRoutes);
app.use('/users', usersRouter);
app.use('/products', productRoutes);

// Api
app.use('/api/users', require('./routes/api/Users'));
app.use('/api/products', require('./routes/api/products'));


// 404 not found
app.use((req, res, next) => {
  console.log(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  next(createError(404));
});

// manejador de errores
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});

module.exports = app;