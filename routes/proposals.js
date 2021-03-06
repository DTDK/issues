'use strict';

const express = require('express');
const router = express.Router();

const Proposal = require('../models/proposal');

router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  Proposal.find({}, (err, proposals) => {
    if (err) {
      return next(err);
    }
    const data = {
      title: 'IH Web Dev Proposals',
      proposals
    };
    res.render('proposals/proposals', data);
  });
});

/* Render the new proposal form */
router.get('/new', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  res.render('proposals/new', {
    title: 'Create Proposal'
  });
});

/* Handle the POST from the new proposal form */
router.post('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }

  // Backend validation goes here

  const theProposal = new Proposal({
    name: req.body.proposalName,
    text: req.body.proposalText,
    status: 'pre-vote',
    votes: {
      for: 0,
      against: 0
    },
    responses: []
  });

  theProposal.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/proposals');
  });
});

router.get('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
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
    res.render('proposals/proposal-details', data);
  });
});

/* Render the add NEW response GET */
router.get('/:id/responses/new', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
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
    res.render('proposals/responses/new', data);
  });
});

/* Handle the POST to create a response */
router.post('/:id/responses/new', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }

  const id = req.params.id;
  const updates =
    { $push:
      { responses:
        {
          text: req.body.responseText,
          category: req.body.responseValency
        }
      }
    };

  Proposal.update({_id: id}, updates, (err, proposal) => {
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
    res.redirect('/proposals/' + id);
  });
});

/* Handle the POST to count votes */
router.post('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }

  let update = {};

  if (req.body.vote === 'yes') {
    update = {$inc: {'votes.for': 1}};
  } else if (req.body.vote === 'no') {
    update = {$inc: {'votes.against': 1}};
  }

  const id = req.params.id;

  Proposal.update({_id: id}, update, (err, proposal) => {
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
    res.redirect('/proposals/' + id);
  });
});

module.exports = router;
