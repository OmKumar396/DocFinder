const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
vehicleNumber: {
  type: String,
  required: true,
  trim: true,
  unique: true, // ADD THIS
},

  driverName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HospitalDetail',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);
