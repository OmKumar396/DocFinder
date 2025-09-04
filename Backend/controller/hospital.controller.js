// controllers/hospitalDetails.controller.js
const HospitalDetails = require('../models/HospitalDetail');

// Register hospital details (only after login/signup)
exports.registerHospitalDetails = async (req, res) => {
  const data = req.body;

  try {
    const exists = await HospitalDetails.findOne({ registrationNumber: data.registrationNumber });
    if (exists) {
      return res.status(400).json({ message: 'Hospital details already registered' });
    }

    const newHospital = new HospitalDetails(data);
    await newHospital.save();

    res.status(201).json({ message: 'Hospital details registered successfully' });
  } catch (error) {
    console.error('Error saving hospital details:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await HospitalDetails.find();
    res.status(200).json(hospitals);
  } catch (error) {
    console.error('Fetching error:', error.message);
    res.status(500).json({ message: 'Failed to fetch hospitals' });
  }
};
exports.getHospitalCities = async (req, res) => {
  try {
    const cityData = await HospitalDetails.aggregate([
      // Stage 1: Group hospitals by city and sum their available beds
      {
        $group: {
          _id: '$city', // Group by the 'city' field
          totalBedsAvailable: { $sum: '$bedsAvailable' } // Sum the beds for each city
        }
      },
      // Stage 2: Sort the results by city name (alphabetically)
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json(cityData);
  } catch (err) {
    console.error("❌ Error fetching hospital cities:", err);
    res.status(500).json({ message: "Server error" });
  }
};