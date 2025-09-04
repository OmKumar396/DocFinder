//Hospital Schema 
const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;
