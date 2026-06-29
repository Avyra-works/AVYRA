import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  source: {
    type: String,
    default: 'direct',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
