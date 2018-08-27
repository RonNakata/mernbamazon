const passport = require("passport");
const LocalStrategy = require("passport-local");
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// Grab the database models
const db = require("../models");

// Passport's serialize function. Choose what info gets stored in the session.
// In this case we're only storing the id in the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Using the id stored in the session, any requests coming in will perform this query
// to get the user and add the user to the request object
passport.deserializeUser(function(id, done) {
  console.log("deserialize");
  db.User.findById(id)
    .then(({ id, displayName, photoUrl }) => done(null, { id, displayName, photoUrl }))
    .catch(err => done(err));
});

/********************************Local Strategy******************************/
passport.use(
  new LocalStrategy(
    {
      // We are submitting from the client an object with the property "email" instead of "username"
      usernameField: "email" 
    },
    function(username, password, done) {
      db.User.findOne({ email: username })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }

          if (!user.validPassword(password)) {
            return done(null, false, { message: "Incorrect password." });
          }

          const { id, displayName, photoUrl } = user;

          return done(null, { id, displayName, photoUrl });
        })
        .catch(err => {
          console.log(err);
          done(err);
        });
    }
  )
);

/********************************Google Strategy******************************
 * 
 * You must go to Google's developer console and configure a project
 * https://developers.google.com/identity/sign-in/web/sign-in#specify_your_apps_client_id
 * 
 * 
 */
 
//Utilizing the dotenv package you can set your GOOGLE_CLIENT_ID and SECRET in the .env file
// const options = {
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/auth/google/callback"
// };

// passport.use(
//   new GoogleStrategy(options, function(accessToken, refreshToken, profile, cb) {
//     db.User.findOne({ googleId: profile.id })
//       .then(user => {
//         if (user) {
//           return user;
//         }

//         return db.User.create({
//           googleId: profile.id,
//           displayName: profile.displayName,
//           photoUrl: profile._json.image.url
//         });
//       })
//       .then(user => cb(null, user))
//       .catch(err => cb(err));
//   })
// );

module.exports = passport;
