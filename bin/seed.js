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
    text: 'Orci sagittis eu volutpat odio facilisis mauris sit amet. In hac habitasse platea dictumst quisque sagittis purus sit amet',
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed euismod nisi porta lorem mollis aliquam. Purus semper eget duis at tellus at urna condimentum mattis. Elit at imperdiet dui accumsan. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Nisl nisi scelerisque eu ultrices vitae auctor eu. Aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod. Arcu non odio euismod lacinia at quis risus. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Id aliquet risus feugiat in ante. Pharetra convallis posuere morbi leo urna molestie at elementum. Feugiat in fermentum posuere urna nec. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Lectus nulla at volutpat diam ut venenatis tellus in. Consequat interdum varius sit amet mattis. Sed sed risus pretium quam vulputate.Velit euismod in pellentesque massa placerat duis.Luctus accumsan tortor posuere ac ut consequat semper viverra nam.Bibendum enim facilisis gravida neque convallis.Dignissim convallis aenean et tortor at risus viverra.Suscipit tellus mauris a diam.Tempor orci dapibus ultrices in.Iaculis nunc sed augue lacus viverra vitae.Velit scelerisque in dictum non consectetur a erat nam at.Egestas integer eget aliquet nibh praesent.Sed risus pretium quam vulputate dignissim suspendisse in est.Cum sociis natoque penatibus et magnis dis.Etiam sit amet nisl purus in mollis nunc sed id.Malesuada nunc vel risus commodo viverra maecenas.',
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
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
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
