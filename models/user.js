const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  // `name` must be unique and of type String
  email: {
    type: String,
    unique: true
  },
  // `notes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Note model
  // This allows us to populate the User with any associated Notes
  password: {
    // Store ObjectIds in the array
    type: String
  },

  // googleId: {
  //   type: String
  // },

  displayName: String,
  photoUrl: String
});

UserSchema.pre("save", function(next) {
  this.hashPassword();

  if(this.email){
    this.displayName = this.email;
  }

  next();
});

UserSchema.methods.hashPassword = function(){
  if(!this.password) return;
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
}

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;