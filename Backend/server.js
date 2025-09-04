const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI,)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

//contact route api
const contactRoute = require('./routes/contact');
app.use('/api/contact', contactRoute);

// User Route api
const authRoutes = require('./routes/auth.route');
app.use('/api', authRoutes);

//Forgot Password Route api
const forgotPasswordRoutes = require('./routes/forgotPassword.routes');
app.use('/api/forgot-password', forgotPasswordRoutes);


const hospitalAuthRoutes = require("./routes/hospital.route");
app.use("/api/hospital", hospitalAuthRoutes);

const appointmentRoutes = require('./routes/appointment.route');
app.use('/api/appointments', appointmentRoutes);

const ambulanceRoute = require('./routes/ambulance.route');
app.use('/api/ambulances', ambulanceRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
