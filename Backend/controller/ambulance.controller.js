const Ambulance = require('../models/Ambulance');
const User = require('../models/user');
const { sendMail } = require('../utils/sendMail');


exports.createAmbulance = async (req, res) => {
  try {
    const ambulance = new Ambulance(req.body);
    await ambulance.save();
    res.status(201).json(ambulance);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An ambulance with this vehicle number already exists.' });
    }
    res.status(500).json({ message: 'Failed to register ambulance', error: error.message });
  }
};


exports.getAmbulancesByHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
   
    const ambulances = await Ambulance.find({ hospital: hospitalId }).populate('hospital', 'name');
    res.status(200).json(ambulances);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ambulances', error: error.message });
  }
};


exports.updateAmbulance = async (req, res) => {
  try {
    const { ambulanceId } = req.params;
    const updated = await Ambulance.findByIdAndUpdate(ambulanceId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Ambulance not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ambulance', error: error.message });
  }
};


exports.deleteAmbulance = async (req, res) => {
  try {
    const { ambulanceId } = req.params;
    const deleted = await Ambulance.findByIdAndDelete(ambulanceId);
    if (!deleted) return res.status(404).json({ message: 'Ambulance not found' });
    res.status(200).json({ message: 'Ambulance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ambulance', error: error.message });
  }
};



exports.getAvailableAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find({ availability: true }).populate('hospital', 'name');
    res.json(ambulances);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.bookAmbulance = async (req, res) => {
  try {
    const ambulance = await Ambulance.findById(req.params.id).populate('hospital', 'name');

    if (!ambulance) {
      return res.status(404).json({ message: 'Ambulance not found' });
    }
    if (!ambulance.availability) {
      return res.status(400).json({ message: 'Ambulance is already booked' });
    }

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    ambulance.availability = false;
    await ambulance.save();

    const html = `
      <h2>Hello ${user.username},</h2>
      <p>Your ambulance booking has been confirmed. The ambulance is on its way!</p>
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Hospital:</strong> ${ambulance.hospital?.name || 'N/A'}</li>
        <li><strong>Vehicle Number:</strong> ${ambulance.vehicleNumber}</li>
        <li><strong>Driver Name:</strong> ${ambulance.driverName}</li>
        <li><strong>Driver Contact:</strong> ${ambulance.contact}</li>
      </ul>
      <p>Thank you for using DocFinder.</p>
    `;

    const subject = 'Ambulance Booking Confirmed';

    await sendMail(user.email, subject, html);

    res.json({ message: 'Ambulance booked successfully!', ambulance });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};