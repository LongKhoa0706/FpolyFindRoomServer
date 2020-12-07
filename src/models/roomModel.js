const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomModel = new Schema({
  title: {
    type: String
  },
  price: {
    type: Number
  },
  type: {
    type: String
  },
  location: {
    type: String
  },
  image: [{
    type: String
  }],
  description: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  utilities: [{
    type: String
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model('Room', RoomModel);