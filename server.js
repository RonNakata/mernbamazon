const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes");
// Pulling in my controllers to handle routing
// const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;
const passport = require("./passport/passport");

// Express Session 
const session = require("express-session"); 
// Used to store our session info insid of MongoDB
const MongoStore = require('connect-mongo')(session);

//Morgan Logger
// const logger = require("morgan")("tiny");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

// Telling express to use Morgan
// app.use(logger);

// Add routes, both API and view
app.use(routes);

//Setuup express to use sessions and also to save session information inside of Mongo
app.use(session({ 
  secret: "c0nt1nu3 c4t th3m3", 
  resave: true, 
  saveUninitialized: true,
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection,
    ttl: 8 * 60 * 60 // 8 Hours
  }) 
}));

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mernbamazon");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
