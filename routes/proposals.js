'use strict';

const express = require('express');
const router = express.Router();

const Proposal = require('../models/proposal');

router.get('/', (req, res, next) => {
  Proposal.find({}, (err, proposals) => {
    if (err) {
      return next(err);
    }

    res.render('proposals/proposals', {
      title: 'Group X\'s Proposals...',
      proposals
    });
  });
});

module.exports = router;
