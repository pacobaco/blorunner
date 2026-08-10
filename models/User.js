const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  facebookId: { type: String, required: true, unique: true },
  name: String,
  photo: String,
  credits: { type: Number, default: 1000 },
  stealth: { type: Number, default: 12 },
  tactics: { type: Number, default: 12 },
  resolve: { type: Number, default: 12 },
  detection: { type: Number, default: 11 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
