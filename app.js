'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const index = require('./routes/index');
const auth = require('./routes/auth');
const proposals = require('./routes/proposals');

const app = express();

// ---- Database ----

mongoose.connect('mongodb://localhost/we-got-issues-database', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// ---- View Engine ----

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// ---- Middlewares ----

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -- Session --

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'issuesissuessecret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  app.locals.user = req.session.currentUser; // the latter at this stage is JSUT an object - none of the methods of
  next(); // ...a mongoose schema (a mongoose schema property has special methods like .save() - look into this )
});

// ---- Routes ----

app.use('/', index);
app.use('/auth', auth);
app.use('/proposals', proposals);

// ---- Error Handling ----

app.use(function (req, res, next) {
  res.status(404);
  res.render('not-found', {title: 'Not found'});
});

app.use(function (err, req, res, next) {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error', {title: 'Error'});
  }
});

module.exports = app;
