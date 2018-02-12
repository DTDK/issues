'use strict';
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
// const favicon = require('serve-favicon');

const index = require('./routes/index');
// const users = require('./routes/users');

const app = express();

// ---- Database ----

mongoose.connect('mongodb://localhost/we-got-issues-db', {
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

// ---- Routes ----

app.use('/', index);
// app.use('/users', users);

// ---- Error Handling ----

app.use(function (req, res, next) {
  res.status(404);
  res.render('not-found');
});

app.use(function (err, req, res, next) {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
