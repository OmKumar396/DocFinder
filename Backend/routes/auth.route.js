const express = require('express');
const router = express.Router();
const {
  signupUser,
  loginUser,
  signupHospital,
  loginHospital,
  verifyToken
} = require('../controller/auth.controller');

// User routes
router.post('/signup/user', signupUser);
router.post('/login/user', loginUser);

// Hospital routes
router.post('/signup/hospital', signupHospital);
router.post('/login/hospital', loginHospital);

// Token verification route
router.get('/verify-token', verifyToken);

module.exports = router;