// booking.js
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const router = express.Router();

// Email configuration
const config = {
    COMPANY_EMAIL: process.env.COMPANY_EMAIL || 'favourloyalty8@gmail.com',
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: process.env.SMTP_PORT || 587,
    SMTP_USER: process.env.SMTP_USER || 'favourloyalty8@gmail.com',
    SMTP_PASS: process.env.SMTP_PASS
};

console.log('📧 Email Configuration:');
console.log('   Host:', config.SMTP_HOST);
console.log('   Port:', config.SMTP_PORT);
console.log('   User:', config.SMTP_USER);
console.log('   Password:', config.SMTP_PASS ? '***' + config.SMTP_PASS.slice(-4) : 'Not set');

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'attachment-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Improved email function for Gmail
async function sendBookingEmails(bookingData, fileInfo = null) {
    // Check if we have email configuration
    if (!config.SMTP_PASS) {
        console.log('📧 Email disabled - no password configured');
        console.log('   Booking received for:', bookingData.name);
        console.log('   Contact email:', bookingData.email);
        return { success: true, method: 'log' };
    }

    try {
        // Create transporter with Gmail-specific settings
        const transporter = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log('🔐 Testing SMTP connection...');
        await transporter.verify();
        console.log('✅ SMTP connection successful!');

        // Email to company (Yaahman Refreshment)
        const companyMail = {
            from: `"Yaahman Refreshment Booking System" <${config.SMTP_USER}>`,
            to: config.COMPANY_EMAIL,
            replyTo: bookingData.email,
            subject: `NEW BOOKING: ${bookingData.eventType} on ${bookingData.eventDate}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #e8751a;">🎉 New Booking Request Received!</h2>
                    
                    <h3>Customer Information:</h3>
                    <p><strong>Name:</strong> ${bookingData.name}</p>
                    <p><strong>Email:</strong> ${bookingData.email}</p>
                    <p><strong>Phone:</strong> ${bookingData.phone || 'Not provided'}</p>
                    
                    <h3>Event Details:</h3>
                    <p><strong>Event Type:</strong> ${bookingData.eventType}</p>
                    <p><strong>Event Date:</strong> ${bookingData.eventDate}</p>
                    <p><strong>Number of Guests:</strong> ${bookingData.guests || 'Not specified'}</p>
                    <p><strong>Event Location:</strong> ${bookingData.eventLocation || 'Not specified'}</p>
                    
                    <h3>Preferences:</h3>
                    <p>${bookingData.preferences ? bookingData.preferences.join(', ') : 'No specific preferences'}</p>
                    
                    <h3>Additional Message:</h3>
                    <p>${bookingData.message || 'No additional message'}</p>
                    
                    <hr>
                    <p><small>This booking was received through the Yaahman Refreshment website.</small></p>
                </div>
            `,
            attachments: fileInfo ? [{
                filename: fileInfo.originalname,
                path: fileInfo.path
            }] : []
        };

        // Confirmation email to customer
        const customerMail = {
            from: `"Yaahman Refreshment" <${config.SMTP_USER}>`,
            to: bookingData.email,
            subject: 'Booking Confirmation - Yaahman Refreshment',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #e8751a;">Thank You, ${bookingData.name}! 🍹</h2>
                    
                    <p>We're excited to confirm that we've received your booking request for:</p>
                    
                    <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #e8751a; margin: 20px 0;">
                        <p><strong>Event Type:</strong> ${bookingData.eventType}</p>
                        <p><strong>Event Date:</strong> ${bookingData.eventDate}</p>
                        <p><strong>Number of Guests:</strong> ${bookingData.guests || 'To be confirmed'}</p>
                    </div>
                    
                    <h3>What Happens Next?</h3>
                    <ol>
                        <li>We'll review your request within 24 hours</li>
                        <li>We'll contact you to discuss details and provide a quote</li>
                        <li>We'll work with you to create the perfect beverage experience</li>
                    </ol>
                    
                    <p>If you have any immediate questions, feel free to reply to this email or call us at <strong>(876) 555-1234</strong>.</p>
                    
                    <p>Best regards,<br>
                    <strong>The Yaahman Refreshment Team</strong></p>
                    
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        Yaahman Refreshment - Premium Beverage Services<br>
                        Email: ${config.COMPANY_EMAIL} | Phone: (876) 555-1234
                    </p>
                </div>
            `
        };

        // Send both emails
        console.log('📤 Sending emails...');
        const companyResult = await transporter.sendMail(companyMail);
        console.log('✅ Email sent to company:', companyResult.messageId);
        
        const customerResult = await transporter.sendMail(customerMail);
        console.log('✅ Confirmation sent to customer:', customerResult.messageId);

        return { success: true, method: 'email' };

    } catch (error) {
        console.error('❌ Email error:', error.message);
        return { success: false, error: error.message };
    }
}

// Routes
router.get('/test', (req, res) => {
    res.json({ 
        ok: true, 
        message: '✅ Yaahman Refreshment API is working!',
        emailConfigured: !!config.SMTP_PASS,
        timestamp: new Date().toISOString()
    });
});

router.post('/bookings', upload.single('attachment'), async (req, res) => {
    console.log('📥 Received booking request:', req.body);
    
    try {
        const { name, email, phone, eventDate, eventType, guests, eventLocation, message, preferences } = req.body;

        // Validation
        if (!name || !email || !eventDate || !eventType) {
            return res.status(400).json({ 
                ok: false, 
                message: 'Please fill all required fields: name, email, event date, and event type.' 
            });
        }

        // Send emails
        const emailResult = await sendBookingEmails({
            name, email, phone, eventDate, eventType, guests, eventLocation, message, preferences
        }, req.file);

        // Cleanup file
        if (req.file) {
            setTimeout(() => {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }, 30000);
        }

        if (emailResult.success) {
            res.json({ 
                ok: true, 
                message: emailResult.method === 'email' 
                    ? 'Booking submitted successfully! Confirmation email sent.' 
                    : 'Booking received! We will contact you soon.'
            });
        } else {
            // Email failed but booking was still received
            res.json({ 
                ok: true, 
                message: 'Booking received! (Email notification failed - we still got your booking)' 
            });
        }

    } catch (error) {
        console.error('❌ Booking processing error:', error);
        
        // Cleanup file on error
        if (req.file) {
            fs.unlink(req.file.path, () => {});
        }
        
        res.status(500).json({ 
            ok: false, 
            message: 'Booking processing failed. Please try again or contact us directly.' 
        });
    }
});

// Test email endpoint
router.post('/test-email', async (req, res) => {
    try {
        if (!config.SMTP_PASS) {
            return res.json({ 
                ok: true, 
                message: 'ℹ️ Email not configured - running in log mode' 
            });
        }

        const transporter = nodemailer.createTransporter({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secure: false,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASS
            }
        });

        await transporter.verify();
        
        await transporter.sendMail({
            from: `"Yaahman Refreshment" <${config.SMTP_USER}>`,
            to: config.COMPANY_EMAIL,
            subject: 'Email Test - Yaahman Refreshment',
            html: '<h2>✅ Email system is working correctly!</h2><p>This is a test email from your booking system.</p>'
        });

        res.json({ ok: true, message: '✅ Test email sent successfully!' });
    } catch (error) {
        res.status(500).json({ ok: false, message: '❌ Email test failed: ' + error.message });
    }
});

module.exports = router;