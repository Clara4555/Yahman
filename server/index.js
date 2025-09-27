// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const bookingRoutes = require('./routes/booking');

const app = express();
const PORT = process.env.PORT || 3001;

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

// Static files - serve your public folder (at project root)
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api', bookingRoutes);

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

app.listen(PORT, () => {
  console.log(`🚀 Yaahman Refreshment Server running at http://localhost:${PORT}`);
  console.log(`📧 Email system ready with: ${process.env.SMTP_USER || 'Not configured'}`);
});