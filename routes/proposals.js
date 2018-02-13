'use strict';

const express = require('express');
const router = express.Router();

const Proposal = require('../models/proposal');

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Proposal.findById(id, (err, proposal) => {
    if (err) {
      return next(err);
    }
    if (!proposal) {
      res.status(404);
      const data = {
        title: '404 Not Found'
      };
      return res.render('not-found', data);
    }
    const data = {
      title: proposal.name,
      proposal
    };
    res.render('proposals/one-proposal', data);
  });
});

router.get('/', (req, res, next) => {
  Proposal.find({}, (err, proposals) => {
    if (err) {
      return next(err);
    }

    res.render('proposals/proposals', {
      title: 'Group X\'s Proposals',
      proposals
    });
  });
});

module.exports = router;
