'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
<<<<<<< HEAD
  res.render('index', { title: 'WE GOT ISSUES' });
=======
  if (req.session.currentUser) {
    return res.redirect('/proposals');
  }
  res.render('index', { title: 'WE HAVE ISSUES' });
>>>>>>> cd3929d385179b84bd474874b5424968217e0a39
});

module.exports = router;
