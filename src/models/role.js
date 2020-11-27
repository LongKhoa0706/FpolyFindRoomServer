const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role_name: {
    type: String,
    requried: true,
    unique: true
  },
  capabilities: [{
    type: String
  }]
});

module.exports = mongoose.model('Role', roleSchema);