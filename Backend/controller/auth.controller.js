const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Hospital = require('../models/Hospital');
const HospitalDetail = require('../models/HospitalDetail');

// A single, secure secret key for the entire application.
// It should be in your .env file.
const JWT_SECRET = process.env.JWT_SECRET || 'a-very-strong-and-secret-key-for-dev';

// A single, reusable function to generate tokens
const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// USER SIGNUP
exports.signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// USER LOGIN
exports.loginUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const payload = { id: user._id, type: 'user' };
    const expiresIn = rememberMe ? '7d' : '1h';
    const token = generateToken(payload, expiresIn);

    res.status(200).json({
      token,
      user: { _id: user._id, username: user.username, email: user.email, role: 'user' }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// HOSPITAL SIGNUP
exports.signupHospital = async (req, res) => {
  const { registrationNumber, password } = req.body;
  try {
    if (await Hospital.findOne({ registrationNumber })) {
      return res.status(400).json({ message: 'Hospital already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newHospital = new Hospital({ registrationNumber, password: hashedPassword });
    await newHospital.save();
    res.status(201).json({ message: 'Hospital registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// HOSPITAL LOGIN
exports.loginHospital = async (req, res) => {
  const { registrationNumber, password } = req.body;
  try {
    const hospital = await Hospital.findOne({ registrationNumber });
    if (!hospital || !(await bcrypt.compare(password, hospital.password))) {
      return res.status(400).json({ message: 'Invalid registration number or password' });
    }

    const hospitalDetails = await HospitalDetail.findOne({ registrationNumber });
    if (!hospitalDetails) {
      return res.status(404).json({ message: 'Hospital details not found' });
    }

    const payload = { id: hospitalDetails._id, type: 'hospital' };
    const token = generateToken(payload);

    res.status(200).json({
      token,
      hospital: {
        _id: hospitalDetails._id,
        name: hospitalDetails.name,
        role: 'hospital',
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// VERIFY TOKEN
exports.verifyToken = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false, message: 'Authorization token missing' });
    }
  
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
      res.status(401).json({ valid: false, message: 'Invalid or expired token' });
    }
};