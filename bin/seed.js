'use strict';
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/we-got-issues-database');

const User = require('../models/user');
const Proposal = require('../models/proposal');

const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

const mattpasswordHash = bcrypt.hashSync('12345cheese', salt);
const danipasswordHash = bcrypt.hashSync('123apple', salt);

const users = [
  {
    username: 'dani',
    password: danipasswordHash
  },
  {
    username: 'matt',
    password: mattpasswordHash
  }
];

const proposals = [
  {
    name: 'No more post-it note pranks',
    text: 'Guys, I really think we should stop pranking the UX class with post-it notes through the glass. It\'s immature and makes us look like silly children.',
    status: 'pre-vote',
    votes:
      {
        for: 0,
        against: 0
      },
    responses: []
  },
  {
    name: 'Ice Cream Machine',
    text: 'If we had an ice cream machine then everyone would be happy all the time! Ice cream solves all you problems, and I like it.',
    status: 'voting-in-progress',
    votes:
      {
        for: 0,
        against: 0
      },
    responses: [
      {
        text: 'No thanks Sheng, all our teeth will fall out!',
        category: 'negative'
      },
      {
        text: 'I heard those machines are only 30 euros - great idea!',
        category: 'positive'
      },
      {
        text: 'Mmmmm, ice cream makes me happy!',
        category: 'positive'
      }
    ]
  },
  {
    name: 'Schedule for Friday',
    text: 'This Friday, we should do these sessions, in the following order: - Learn about Javascript Promises - In parallel: - Review doubts - Project work in pairs - Learn about industry culture (with beers!)',
    status: 'accepted',
    votes:
      {
        for: 17,
        against: 3
      },
    responses: [
      {
        text: 'Culture is a good session to do at the end of the day when we are tired.',
        category: 'positive'
      },
      {
        text: 'People should just learn about Promises on their own - google it idiots!',
        category: 'negative'
      },
      {
        text: 'It would be good to make sure everyone knows promises before project week.',
        category: 'positive'
      }
    ]
  },
  {
    name: 'Giovanni Hummus',
    text: 'Hi guys, I would like everyone to spread hummus on my body and watch me run around Ironhack on Friday night. It would be an important bonding experience and makes me really excited! Thanks, Gio xx',
    status: 'rejected',
    votes:
      {
        for: 4,
        against: 10
      },
    responses: [
      {
        text: 'Haha - nice idea but I think I\'ll pass',
        category: 'negative'
      },
      {
        text: 'You\'re disgusting',
        category: 'negative'
      },
      {
        text: 'Oh, what a great idea - we could all do with some \'release\' ;-)',
        category: 'positive'
      },
      {
        text: 'Giovanni, this is Adrià. Come see me in my office.',
        category: 'negative'
      }
    ]
  }
];

User.remove({}, (err) => {
  if (err) { throw err; }

  Proposal.remove({}, (err) => {
    if (err) { throw err; }

    User.create(users, (err, regUsers) => {
      if (err) { throw err; }

      regUsers.forEach(theUser => {
        console.log(`${theUser.username} - ${theUser._id}`);
      });

      Proposal.create(proposals, (err, regUsers) => {
        if (err) { throw err; }

        regUsers.forEach(theUser => {
          console.log(`${theUser.name} - ${theUser._id}`);
        });
        mongoose.disconnect();
      });
    });
  });
});
// db.proposals.remove( { _id: ObjectId("5a82eef6d871e9129710255c") }, true )
