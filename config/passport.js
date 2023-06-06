const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// configure passport provider options
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Extract the necessary user data from the profile object
      const { id, displayName, name, photos } = profile;

      const user = {
        googleId: id,
        displayName: displayName,
        firstName: name.givenName,
        lastName: name.familyName,
        avatar: photos[0].value,
      };

      done(null, user);
    }
  )
);

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

module.exports = passport;