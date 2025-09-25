# Yaahman Foods Marketing Website

A modern, responsive marketing website for Yaahman Foods featuring animated loading screens, PDF menu viewer, contact forms with email functionality, and professional bartender service bookings.

## Features

### Frontend
- **Animated Landing Page** with 3D logo effects and smooth transitions
- **Multi-section Navigation** (Home, About, Services, Menu, Gallery, Book Us, Contact)
- **PDF Menu Viewer** - Opens in modal overlay using PDF.js (no redirects)
- **Image Gallery** with lightbox functionality
- **Contact & Booking Forms** with file upload support
- **Responsive Design** optimized for all devices
- **3D Text Animations** and stacked text effects
- **Hardware-accelerated animations** for smooth performance

### Backend
- **Node.js + Express** server with security middleware
- **Nodemailer integration** for automated email sending
- **Dual email system** - sends confirmation to customer + notification to company
- **File upload support** with Multer (attachments in booking emails)
- **Rate limiting** and input validation for security
- **CORS and Helmet** security middleware

### Email Functionality
- **Booking confirmations** sent to customers with event details
- **Company notifications** with all booking information and attachments
- **Contact form responses** with professional HTML templates
- **SMTP configuration** via environment variables

## Installation & Setup

### 1. Clone and Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
COMPANY_EMAIL=bookings@yaahmanfoods.com

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Gmail Setup (if using Gmail SMTP)
1. Enable 2-factor authentication on your Google account
2. Generate an "App Password" for the application
3. Use your Gmail address as `SMTP_USER`
4. Use the generated app password as `SMTP_PASS`

### 4. Run the Application
```bash
npm run dev
```

Visit: `http://localhost:3000`

## Project Structure

```
yaahman-foods-website/
├── public/
│   ├── css/
│   │   └── main.css         # All styles with animations
│   ├── js/
│   │   ├── app.js           # Main application logic
│   │   ├── loader.js        # Loading screen functionality
│   │   └── pdfViewer.js     # PDF modal viewer
│   ├── assets/
│   │   └── menu.pdf         # Demo menu PDF
│   └── index.html           # Main HTML file
├── server/
│   ├── routes/
│   │   └── booking.js       # API endpoints for forms
│   └── index.js             # Express server setup
├── uploads/                 # File upload directory (auto-created)
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

## API Endpoints

### POST /api/book
Handles booking form submissions
- **Body**: Multipart form data with booking details
- **Files**: Optional attachment upload
- **Response**: JSON with success/error status
- **Emails**: Sends confirmation to customer + notification to company

### POST /api/contact
Handles contact form submissions
- **Body**: JSON with contact details
- **Response**: JSON with success/error status
- **Emails**: Sends acknowledgment to customer + notification to company

## Key Features Explained

### 1. Animated Loader
- Preloads critical assets including PDF and images
- Shows progress bar with percentage updates
- Smooth transition to landing page

### 2. Landing Page Animation
- 3D rotating logo with hover effects
- Stacked text animations with staggered timing
- Click-to-enter functionality that transitions to main site

### 3. PDF Viewer Modal
- Uses axios to fetch PDF without page redirect
- Displays styled menu content in modal overlay
- Download functionality for offline viewing
- Responsive design for mobile devices

### 4. Form Processing
- Client-side validation with visual feedback
- Async submission with loading states
- File upload support (5MB limit, various formats)
- Success/error toast notifications

### 5. Email Templates
- Professional HTML email templates
- Company branding with colors and logo
- Responsive email design for all devices
- Automatic attachment handling

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Server-side validation for all form fields
- **File Upload Filtering**: Restricted file types and size limits
- **CORS Protection**: Configured for secure cross-origin requests
- **Helmet Security**: Additional HTTP security headers
- **Environment Variables**: Sensitive data stored securely

## Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 768px (tablet) and 1024px (desktop)
- **Touch-friendly**: Large buttons and touch targets
- **Performance**: Optimized images and efficient animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Development

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding styles in `main.css`
3. Update navigation in `app.js`
4. Test responsive design

### Customizing Email Templates
1. Edit templates in `server/routes/booking.js`
2. Update company branding and colors
3. Test email delivery with various providers

### Adding New APIs
1. Create new route files in `server/routes/`
2. Import and use in `server/index.js`
3. Add corresponding frontend code in `js/app.js`

## Deployment

### Environment Variables
Ensure all production environment variables are set:
- SMTP credentials for email service
- Company email addresses
- Server port and environment

### File Permissions
Ensure `uploads/` directory has proper write permissions for file uploads.

### SSL Certificate
For production, use HTTPS to secure form submissions and email data.

## Troubleshooting

### Email Not Sending
1. Check SMTP credentials in `.env`
2. Verify email provider settings (Gmail, Outlook, etc.)
3. Check firewall settings for SMTP ports
4. Enable "Less secure app access" if using Gmail (or use App Passwords)

### PDF Not Loading
1. Verify `public/assets/menu.pdf` exists
2. Check PDF.js CDN connection
3. Ensure proper CORS settings for PDF access

### Form Submission Issues
1. Check network connectivity
2. Verify API endpoints are accessible
3. Check browser console for JavaScript errors
4. Ensure file upload sizes are within limits

## License

This project is proprietary to Yaahman Foods. All rights reserved.

## Support

For technical support or questions:
- Email: developer@yaahmanfoods.com
- Documentation: Internal wiki
- Issues: Internal tracking system