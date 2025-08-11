//forgot password route setup
const express = require('express');
const bcrypt = require('bcryptjs'); // ← import bcrypt
const router = express.Router();
const User = require('../models/user');
const {sendMail} = require('../utils/sendMail');

// In-memory OTP store
const otpStore = {};

// 1. Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; 

  try {
    await sendMail(email, 'Password Reset OTP', `Your OTP is: ${otp}`);
    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// 2. Reset Password
router.post('/reset', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const stored = otpStore[email];

  if (!stored || stored.otp !== otp || Date.now() > stored.expiresAt) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10); 
    user.password = hashedPassword;
    await user.save();

    delete otpStore[email];
    res.json({ message: 'Password reset successful!' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Server error during password reset' });
  }
});

module.exports = router;
