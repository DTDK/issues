'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/we-got-issues-database');

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
        text: 'Yes! I love the taste of pizza',
        category: 'positive'
      },
      {
        text: 'Pizza makes you fat',
        category: 'negative'
      },
      {
        text: 'Pizza is much cheaper than our usual lunch choice',
        category: 'positive'
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
        text: 'We will be more free without Spain!',
        category: 'positive'
      },
      {
        text: 'We won\'t be in the EU',
        category: 'negative'
      },
      {
        text: 'Pizza prices will rise if we leave',
        category: 'negative'
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
        text: 'Water is nice',
        category: 'positive'
      },
      {
        text: 'Water is nasty',
        category: 'negative'
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
        text: 'Yes! Mars is very fun',
        category: 'positive'
      },
      {
        text: 'We will die you idiots',
        category: 'negative'
      },
      {
        text: 'Its impossible to get there',
        category: 'negative'
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
  mongoose.connect('mongodb://localhost/we-got-issues-database');
});

Proposal.create(proposals, (err, regUsers) => {
  if (err) { throw err; }

  regUsers.forEach(theUser => {
    console.log(`${theUser.name} - ${theUser._id}`);
  });
  mongoose.disconnect();
});

// db.proposals.remove( { _id: ObjectId("5a82eef6d871e9129710255c") }, true )
