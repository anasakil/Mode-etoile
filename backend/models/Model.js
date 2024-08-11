const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: String,
  email: String,
  country: String,
  city: String,
  phone: String,
  sexe: String,
  dob: Date,
  height: Number,
  instagram: String,
  website: String,
  profileImage: String,
  fullLengthImage: String,
  halfProfileImage: String,
  closeUpImage: String
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
