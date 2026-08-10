const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  res.status(401).json({ error: 'Not authenticated' });
});

module.exports = router;
