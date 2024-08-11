const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ville: {
    type: String,
  },
  pays: {
    type: String,
  },
  dob: {
    type: Date,
  },
  age: {
    type: Number,
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
  }],
  taille: {  
    type: String,
  },
  socialMedia: {  
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
