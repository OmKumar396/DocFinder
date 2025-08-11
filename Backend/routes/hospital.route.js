// routes/hospitalDetails.routes.js
const express = require('express');
const router = express.Router();
const {
  registerHospitalDetails,
  getAllHospitals,
   getHospitalCities,
} = require('../controller/hospital.controller');

router.post('/register-details', registerHospitalDetails);
router.get('/all', getAllHospitals);
router.get('/cities', getHospitalCities);
module.exports = router;
