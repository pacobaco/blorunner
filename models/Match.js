const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  matchId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['waiting', 'active', 'finished'],
    default: 'waiting'
  },
  mode: { type: String, enum: ['suburban', 'urban'], default: 'urban' },
  layout: { type: String, enum: ['known', 'unknown'], default: 'unknown' },
  searchLevel: { type: String, enum: ['light', 'standard', 'intensive'], default: 'standard' },
  attackers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  defenders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxAttackers: { type: Number, default: 4 },
  maxDefenders: { type: Number, default: 6 },
  handicap: {
    type: { type: String, enum: ['none', 'attackers', 'defenders'], default: 'none' },
    value: { type: Number, default: 0 }
  },
  pot: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  startedAt: Date,
  finishedAt: Date
});

module.exports = mongoose.model('Match', MatchSchema);
