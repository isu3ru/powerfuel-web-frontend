const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const flash = require('express-flash');

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Use the session middleware with the router
app.use(session({
  secret: 'Hn7887NOH78679^&5y7Tub867Uu5302ofpk,wuwijw9eyoweg',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 2628000000 }
}));

app.use(flash());

app.use(function(req, res, next) {
  if(req.session && req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const customersRouter = require('./src/routes/customer');
const adminRouter = require('./src/routes/admin');
const stationRouter = require('./src/routes/station');
const authRouter = require('./src/routes/auth');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/customer', customersRouter);
app.use('/station', stationRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(res.locals.user == undefined) {
    res.redirect('/auth/login');
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
