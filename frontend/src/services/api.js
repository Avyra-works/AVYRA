import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitContactInquiry = async (data) => {
  try {
    const response = await api.post('/contact', data);
    return response.data;
  } catch (error) {
    console.error('API Error submitting contact inquiry:', error);
    throw error.response?.data || new Error('Connection failed');
  }
};

export const submitLead = async (data) => {
  try {
    const response = await api.post('/leads', data);
    return response.data;
  } catch (error) {
    console.error('API Error saving marketing lead:', error);
    throw error.response?.data || new Error('Connection failed');
  }
};

export default api;
