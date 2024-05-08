const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
});

// create model from schema
const user = mongoose.model("user", userSchema);

module.exports = user;
