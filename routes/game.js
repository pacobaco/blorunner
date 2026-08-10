const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const User = require('../models/User');

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Login required' });
}

function calculateHandicap(attackersCount, defendersCount) {
  const diff = defendersCount - attackersCount;
  if (diff >= 2) {
    return { type: 'attackers', value: 10 + (diff * 4) };
  }
  if (diff <= -2) {
    return { type: 'defenders', value: 10 + (Math.abs(diff) * 4) };
  }
  return { type: 'none', value: 0 };
}

// Get current profile
router.get('/profile', ensureAuth, (req, res) => {
  res.json(req.user);
});

// Create match
router.post('/match/create', ensureAuth, async (req, res) => {
  try {
    const { mode = 'urban', layout = 'unknown', searchLevel = 'standard' } = req.body;
    const matchId = 'BLR-' + Date.now().toString(36).toUpperCase();

    const match = await Match.create({
      matchId,
      mode,
      layout,
      searchLevel,
      attackers: [req.user._id],
      defenders: []
    });

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Join match
router.post('/match/:matchId/join', ensureAuth, async (req, res) => {
  try {
    const { side } = req.body;
    const match = await Match.findOne({ matchId: req.params.matchId, status: 'waiting' })
      .populate('attackers', 'name photo')
      .populate('defenders', 'name photo');

    if (!match) return res.status(404).json({ error: 'Match not found or already started' });

    const userId = req.user._id.toString();
    const alreadyIn =
      match.attackers.some(u => u._id.toString() === userId) ||
      match.defenders.some(u => u._id.toString() === userId);

    if (alreadyIn) return res.status(400).json({ error: 'Already in this match' });

    if (side === 'attackers') {
      if (match.attackers.length >= match.maxAttackers) {
        return res.status(400).json({ error: 'Attackers team is full' });
      }
      match.attackers.push(req.user._id);
    } else {
      if (match.defenders.length >= match.maxDefenders) {
        return res.status(400).json({ error: 'Defenders team is full' });
      }
      match.defenders.push(req.user._id);
    }

    match.handicap = calculateHandicap(match.attackers.length, match.defenders.length);
    await match.save();

    const updated = await Match.findById(match._id)
      .populate('attackers', 'name photo')
      .populate('defenders', 'name photo');

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start match
router.post('/match/:matchId/start', ensureAuth, async (req, res) => {
  try {
    const match = await Match.findOne({ matchId: req.params.matchId });
    if (!match) return res.status(404).json({ error: 'Match not found' });

    if (match.attackers.length === 0 || match.defenders.length === 0) {
      return res.status(400).json({ error: 'Both teams need at least one player' });
    }

    match.status = 'active';
    match.startedAt = new Date();
    match.handicap = calculateHandicap(match.attackers.length, match.defenders.length);
    await match.save();

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
