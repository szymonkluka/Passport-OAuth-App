const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/user/logged');
  }
);

router.get('/logout', (req, res) => {
  req.logout(); // This will end the user session
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.redirect('/'); // Redirect to the home page or any other desired page
  });
});

router.get('/profile', ensureAuthenticated, (req, res) => {
  const username = req.user ? req.user.username : 'Unknown User';
  res.render('profile', { username: username });
});

// Add a middleware to handle unauthorized access
router.use((req, res, next) => {
  res.redirect('/user/no-permission');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login'); // Redirect to the login page if not authenticated
}

module.exports = router;