const express = require('express');
const router = express.Router();

const {
  createAmbulance,
  getAmbulancesByHospital,
  updateAmbulance,
  deleteAmbulance,
  getAvailableAmbulances,
  bookAmbulance,
} = require('../controller/ambulance.controller');

// CRUD routes
router.post('/', createAmbulance);
router.get('/hospital/:hospitalId', getAmbulancesByHospital);
router.put('/:ambulanceId', updateAmbulance);
router.delete('/:ambulanceId', deleteAmbulance);

// Booking and availability routes
router.get('/available', getAvailableAmbulances);
router.post('/book/:id', bookAmbulance);

module.exports = router;