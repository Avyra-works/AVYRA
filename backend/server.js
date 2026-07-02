import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Contact from './models/Contact.js';
import Lead from './models/Lead.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://*.sanity.io https://*.api.sanity.io https://*.apicdn.sanity.io; frame-ancestors 'none'; upgrade-insecure-requests;"
  );
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});


const allowedOrigins = [
  "http://localhost:5173",
  "https://avyra.works",
  "https://www.avyra.works",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());
app.use(express.json());

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});
app.get("/", (req, res) => {
  res.send("AVYRA Backend Version 2");
});
// Contact Submission API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, projectType, message } = req.body;

    if (!name || !email || !projectType || !message) {
      return res.status(400).json({ error: 'Please fill all required fields (name, email, projectType, message)' });
    }

    const contact = new Contact({ name, email, company, projectType, message });
    await contact.save();

    res.status(201).json({ success: true, message: 'Inquiry saved successfully', data: contact });
  } catch (error) {
    console.error('Error saving contact inquiry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Lead Capture API
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, source } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const lead = new Lead({ name, email, source });
    await lead.save();

    res.status(201).json({ success: true, message: 'Lead captured successfully', data: lead });
  } catch (error) {
    console.error('Error saving marketing lead:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
