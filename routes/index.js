'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/proposals');
  }
  res.render('index', { title: 'WE HAVE ISSUES' });
});

module.exports = router;
