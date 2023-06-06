const express = require('express');
const router = express.Router();

router.get('/logged', ensureAuthenticated, (req, res) => {
  const logoutLink = '/auth/logout';
  const user = req.user;
  res.render('logged', { logoutLink: logoutLink, user: user });
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', ensureAuthenticated, (req, res) => {
  const username = req.user ? req.user.username : 'Unknown User';
  res.render('profile', { username: username });
});

router.get('/settings', ensureAuthenticated, (req, res) => {
  res.render('settings');
});

// Add a middleware to handle unauthorized access
router.use((req, res, next) => {
  res.redirect('/user/no-permission');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
}

module.exports = router;