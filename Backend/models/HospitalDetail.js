// models/HospitalDetails.js
const mongoose = require('mongoose');

const hospitalDetailsSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  phone: String,
  email: String,
  bedsAvailable: Number,
  bedsBooked: {
    type: Number,
    default: 0
  },
  description: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('HospitalDetail', hospitalDetailsSchema);
