const nodemailer = require('nodemailer');

// 1. A single, reusable transporter configuration (This part is correct)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env
    pass: process.env.EMAIL_PASS, // Your App Password from .env
  },
});

// 2. A generic and reusable function to send any email
//    (IMPROVEMENT: It now throws an error on failure)
const sendMail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"DocFinder" <${process.env.EMAIL_USER}>`, // Your App Name
      to,
      subject,
      html,
    });
    console.log(`📩 Email sent successfully to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    // This makes sure that if an email fails, the calling function knows about it.
    throw new Error('Failed to send confirmation email.');
  }
};


// 4. Export all the functions you need (This part is correct)
module.exports = {
  sendMail
};