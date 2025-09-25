const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Booking form endpoint
router.post('/book', upload.single('attachment'), async (req, res) => {
  try {
    const { name, email, phone, eventDate, eventType, guests, message } = req.body;

    // Basic validation
    if (!name || !email || !eventDate || !eventType) {
      return res.status(400).json({
        ok: false,
        message: 'Please fill in all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        message: 'Please enter a valid email address'
      });
    }

    // Prepare email content
    const bookingDetails = `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Event Date:</strong> ${eventDate}</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Number of Guests:</strong> ${guests || 'Not specified'}</p>
      <p><strong>Message:</strong> ${message || 'None'}</p>
    `;

    // Email to company
    const companyMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL,
      subject: `New Booking Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FF6B35; color: white; padding: 20px; text-align: center;">
            <h1>Yaahman Foods</h1>
            <p>New Booking Request</p>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            ${bookingDetails}
          </div>
          <div style="padding: 20px; text-align: center; background-color: #4ECDC4; color: white;">
            <p>Please respond to the customer within 24 hours.</p>
          </div>
        </div>
      `,
      attachments: req.file ? [{
        filename: req.file.originalname,
        path: req.file.path
      }] : []
    };

    // Email to customer
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Booking Confirmation - Yaahman Foods',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FF6B35; color: white; padding: 20px; text-align: center;">
            <h1>Yaahman Foods</h1>
            <p>Booking Confirmation</p>
          </div>
          <div style="padding: 20px;">
            <h2>Thank you for your booking request, ${name}!</h2>
            <p>We've received your request for a <strong>${eventType}</strong> on <strong>${eventDate}</strong>.</p>
            
            <div style="background-color: #f0f8ff; padding: 15px; margin: 20px 0; border-left: 4px solid #4ECDC4;">
              <h3>Your Booking Details:</h3>
              <p><strong>Event Date:</strong> ${eventDate}</p>
              <p><strong>Event Type:</strong> ${eventType}</p>
              <p><strong>Number of Guests:</strong> ${guests || 'Not specified'}</p>
            </div>
            
            <p>Our team will review your request and get back to you within 24 hours with a customized quote and next steps.</p>
            
            <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #4ECDC4; color: white; text-align: center; border-radius: 5px;">
              <h3>What's Next?</h3>
              <p>1. We'll review your requirements</p>
              <p>2. Prepare a customized quote</p>
              <p>3. Schedule a consultation call</p>
              <p>4. Finalize your event details</p>
            </div>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #f9f9f9; color: #666;">
            <p>Best regards,<br>The Yaahman Foods Team</p>
          </div>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(companyMailOptions);
    await transporter.sendMail(customerMailOptions);

    // Clean up uploaded file after sending (optional)
    if (req.file) {
      setTimeout(() => {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }, 60000); // Delete after 1 minute
    }

    res.json({
      ok: true,
      message: 'Booking received successfully! Confirmation email sent.'
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      ok: false,
      message: 'Unable to process booking at this time. Please try again.'
    });
  }
});

// Contact form endpoint (reuses booking logic with simpler structure)
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        ok: false,
        message: 'Please fill in all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        message: 'Please enter a valid email address'
      });
    }

    // Email to company
    const companyMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FF6B35; color: white; padding: 20px; text-align: center;">
            <h1>Yaahman Foods</h1>
            <p>New Contact Message</p>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h2>Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 3px solid #4ECDC4;">
              ${message}
            </div>
          </div>
        </div>
      `
    };

    // Email to customer
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Message Received - Yaahman Foods',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FF6B35; color: white; padding: 20px; text-align: center;">
            <h1>Yaahman Foods</h1>
            <p>Thank You for Contacting Us</p>
          </div>
          <div style="padding: 20px;">
            <h2>Hi ${name},</h2>
            <p>Thank you for reaching out to us! We've received your message regarding "<strong>${subject}</strong>" and will get back to you as soon as possible.</p>
            
            <p>Our typical response time is within 24 hours during business days.</p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #4ECDC4; color: white; text-align: center; border-radius: 5px;">
              <p>We appreciate your interest in Yaahman Foods!</p>
            </div>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #f9f9f9; color: #666;">
            <p>Best regards,<br>The Yaahman Foods Team</p>
          </div>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(companyMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.json({
      ok: true,
      message: 'Message sent successfully! We\'ll get back to you soon.'
    });

  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({
      ok: false,
      message: 'Unable to send message at this time. Please try again.'
    });
  }
});

module.exports = router;