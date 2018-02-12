'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/we-got-issues-db');

const User = require('../models/user');
const Proposal = require('../models/proposal');

const users = [
  {
    username: 'dani',
    password: '123'
  },
  {
    username: 'matt',
    password: '123'
  }
];

const proposals = [
  {
    name: 'Pizza Fridays',
    text: 'SSDFSDF SDFsdfsdf sdfsdfkjhsdkfj ksjdhfkjsdhfkjsdh sdkjfhskjdfhksjdf kjdhfskjdhfkjsdhfkjshdfkjsdhfkjsdhfkj',
    status: 'pre-vote',
    votes:
      {
        for: 6,
        against: 3
      },
    responses: [
      {
        body: 'Yes! I love the taste of pizza',
        affirm: true
      },
      {
        body: 'Pizza makes you fat',
        affirm: false
      },
      {
        body: 'Pizza is much cheaper than our usual lunch choice',
        affirm: true
      }
    ]
  },
  {
    name: 'Catalunya should be independent',
    text: 'SSDFSDF SDFsdfsdf sdfsdfkjhsdkfj ksjdhfkjsdhfkjsdh sdkjfhskjdfhksjdf kjdhfskjdhfkjsdhfkjshdfkjsdhfkjsdhfkj',
    status: 'voting-in-progress',
    votes:
      {
        for: 50,
        against: 50
      },
    responses: [
      {
        body: 'We will be more free without Spain!',
        affirm: true
      },
      {
        body: 'We won\'t be in the EU',
        affirm: false
      },
      {
        body: 'Pizza prices will rise if we leave',
        affirm: false
      }
    ]
  },
  {
    name: 'Compulsory water drinking',
    text: 'SSDFSDF SDFsdfsdf sdfsdfkjhsdkfj ksjdhfkjsdhfkjsdh sdkjfhskjdfhksjdf kjdhfskjdhfkjsdhfkjshdfkjsdhfkjsdhfkj',
    status: 'accepted',
    votes:
      {
        for: 9,
        against: 0
      },
    responses: [
      {
        body: 'Water is nice',
        affirm: true
      },
      {
        body: 'Water is nasty',
        affirm: false
      }
    ]
  },
  {
    name: 'Lets go to Mars on Thurday',
    text: 'SSDFSDF SDFsdfsdf sdfsdfkjhsdkfj ksjdhfkjsdhfkjsdh sdkjfhskjdfhksjdf kjdhfskjdhfkjsdhfkjshdfkjsdhfkjsdhfkj',
    status: 'rejected',
    votes:
      {
        for: 4,
        against: 10
      },
    responses: [
      {
        body: 'Yes! Mars is very fun',
        affirm: true
      },
      {
        body: 'We will die you idiots',
        affirm: false
      },
      {
        body: 'Its impossible to get there',
        affirm: false
      }
    ]
  }
];

User.create(users, (err, regUsers) => {
  if (err) { throw err; }

  regUsers.forEach(theUser => {
    console.log(`${theUser.username} - ${theUser._id}`);
  });
  mongoose.disconnect();
  mongoose.connect('mongodb://localhost/we-got-issues-db');
});

Proposal.create(proposals, (err, regUsers) => {
  if (err) { throw err; }

  regUsers.forEach(theUser => {
    console.log(`${theUser.name} - ${theUser._id}`);
  });
  mongoose.disconnect();
});
