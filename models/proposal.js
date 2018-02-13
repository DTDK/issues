'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProposalSchema = Schema({
  name: String,
  text: String,
  status: String,
  votes:
    {
      for: Number,
      against: Number
    },
  responses: [
    {
      text: String,
      category: String
    }
  ]
});

const Proposal = mongoose.model('Proposal', ProposalSchema);

module.exports = Proposal;
