const Appointment = require('../models/Appointment');
const HospitalDetails = require('../models/HospitalDetail')

const {sendMail} = require('../utils/sendMail');

exports.bookBed = async (req, res) => {
  try {
    console.log("📩 Request Body:", req.body);

    const { userId, hospitalId, patientName, age, reason, email } = req.body;

  
    if (!userId || !hospitalId || !patientName || !age || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hospital = await HospitalDetails.findById(hospitalId);
    if (!hospital) {
      console.log("❌ Hospital not found:", hospitalId);
      return res.status(404).json({ message: 'Hospital not found' });
    }

    if (hospital.bedsAvailable <= 0) {
      return res.status(400).json({ message: 'No beds available' });
    }

   
    const appointment = new Appointment({ userId, hospitalId, patientName, age, reason });
    await appointment.save();

   
    hospital.bedsAvailable -= 1;
   hospital.bedsBooked = hospital.bedsBooked ? hospital.bedsBooked + 1 : 1;
    await hospital.save();
   
    const html = `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #4CAF50;">🛏️ Bed Booking Confirmed</h2>
    <p>Dear <strong>${patientName}</strong>,</p>
    <p>We are pleased to inform you that your bed has been successfully booked at:</p>

    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="padding: 8px; font-weight: bold;">Hospital</td>
        <td style="padding: 8px;">${hospital.name}, ${hospital.city}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Patient Name</td>
        <td style="padding: 8px;">${patientName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Age</td>
        <td style="padding: 8px;">${age}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Reason</td>
        <td style="padding: 8px;">${reason || 'N/A'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Booking Date</td>
        <td style="padding: 8px;">${new Date().toLocaleString()}</td>
      </tr>
    </table>

    <p>Thank you for choosing <strong>Medical Help System</strong>. If you have any questions or need assistance, please contact our support team.</p>

    <p style="margin-top: 30px;">Regards,<br /><strong>Medical Help System Team</strong></p>
    <hr style="margin-top: 40px;" />
    <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply to this email.</p>
  </div>
`;

    await sendMail(email, '✅ Bed Booking Confirmation - Medical Help System', html);

    console.log("✅ Appointment saved:", appointment);
    res.status(201).json({ message: 'Bed booked successfully', appointment });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.params.userId;

    const appointments = await Appointment.find({ userId }).populate('hospitalId', 'name address city');

    res.status(200).json(appointments);
  } catch (err) {
    console.error("❌ Fetch user appointments error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getHospitalAppointments = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const appointments = await Appointment.find({ hospitalId })
      .populate('userId', 'name email') 
      .populate('hospitalId', 'name city');

    res.status(200).json(appointments);
  } catch (err) {
    console.error("❌ Error fetching hospital appointments:", err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const hospital = await HospitalDetails.findById(appointment.hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    await appointment.deleteOne();

    hospital.bedsAvailable += 1;
   hospital.bedsBooked = Math.max(0, hospital.bedsBooked - 1);
    await hospital.save();

    res.status(200).json({ message: 'Appointment marked as completed' });
  } catch (err) {
    console.error("❌ Error completing appointment:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
