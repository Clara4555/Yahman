// server/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const bookingRoutes = require('./routes/booking');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, try again later.'
});
app.use('/api', limiter);

// API routes
app.use('/api', bookingRoutes);

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve booking page
app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/booking.html'));
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, message: 'Something went wrong!' });
});

// Export for Vercel serverless functions
module.exports = app;