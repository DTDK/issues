'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();

const loginTitle = 'Log In...';

// Login GET
router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/proposals');
  }

  const data = {
    title: loginTitle
  };
  res.render('auth/login', data);
});

// Login POST
router.post('/login', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username === '' || password === '') {
    const data = {
      title: loginTitle,
      message: 'Please provide both your username and password...'
    };
    return res.render('auth/login', data);
  }

  User.findOne({ 'username': username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const data = {
        title: loginTitle,
        message: 'Incorrect username or password...'
      };
      return res.render('auth/login', data);
    }

    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/proposals');
    } else {
      const data = {
        title: loginTitle,
        message: 'Incorrect username or password...'
      };
      res.render('auth/login', data);
    }
  });
});

// Sign out POST
router.post('/logout', (req, res, next) => {
  req.session.currentUser = null;
  res.redirect('/');
});

module.exports = router;
