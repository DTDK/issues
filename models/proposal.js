const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProposalSchema = Schema({
  name: String,
  text: String,
  status: String,
  votes: [],
  responses: []
});

const Proposal = mongoose.model('Proposal', ProposalSchema);

module.exports = Proposal;
