const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HospitalDetail',
    required: true,
  },
  patientName: String,
  age: Number,
  reason: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
