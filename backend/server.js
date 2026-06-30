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

// Middlewares
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://avyra.works",
  "https://www.avyra.works" // optional if you still use the Vercel URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Health Check API
app.use('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
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
