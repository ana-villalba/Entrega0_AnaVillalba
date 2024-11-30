var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const SECRET_KEY = 'secreto'

// Middleware para la autorización.
// Verifica si el token proporcionado en los encabezados de la solicitud es válido.
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Se espera el encabezado "Authorization".
  const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del encabezado (formato "Bearer <token>").
  if (!token) {
      return res.status(403).json({ error: 'Acceso denegado: token requerido' }); // Retorna un error 403 si no hay token.
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
          return res.status(403).json({ error: 'Token inválido o expirado' }); // Retorna un error si el token no es válido.
      }
      req.user = user;
      next();
  });
};

app.use('/auth', loginRouter);

app.use(authenticateToken);

app.use('/', indexRouter);

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
