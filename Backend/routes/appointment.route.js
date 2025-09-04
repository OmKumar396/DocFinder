// routes/appointment.route.js
const express = require('express');
const router = express.Router();

const {
  bookBed,
  getUserAppointments,
  getHospitalAppointments,
  completeAppointment
} = require('../controller/appointment.controller'); 

// ✅ Appointment Routes
router.post('/book', bookBed);                          
router.get('/user/:userId', getUserAppointments);       
router.get('/hospital/:hospitalId', getHospitalAppointments); 
router.put('/complete/:appointmentId', completeAppointment);  

module.exports = router;
