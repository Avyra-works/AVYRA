import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { submitLead } from '../services/api';

export const LeadModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Name is required.' });
      return;
    }
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Email address is required.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    // Payload construction
    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!web3FormsKey || web3FormsKey === 'your_web3forms_key_here') {
      console.warn('Web3Forms Access Key is missing or is set to placeholder.');
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
      setLoading(false);
      return;
    }

    const web3FormsBody = {
      access_key: web3FormsKey,
      name: name.trim(),
      email: email.trim(),
      subject: 'New Project Inquiry - Avyra',
      source: 'Header Get In Touch Popup'
    };

    console.log('Submission started', {
      apiEndpoint: 'https://api.web3forms.com/submit',
      payload: web3FormsBody
    });

    try {
      // 1. Submit to local MongoDB backend
      await submitLead({ 
        name: name.trim(), 
        email: email.trim(), 
        source: 'Header Get In Touch Popup' 
      });

      // 2. Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(web3FormsBody)
      });

      console.log('Response received', response);
      const data = await response.json();

      if (response.ok && data.success) {
        console.log('Success', data);
        setMessage({ 
          type: 'success', 
          text: "Thank you. Your inquiry has been received. We'll get back to you shortly." 
        });
        setName('');
        setEmail('');
        setTimeout(() => {
          onClose();
          setMessage({ type: '', text: '' });
        }, 2500);
      } else {
        throw new Error(data.message || 'Web3Forms submission failed');
      }
    } catch (error) {
      console.log('Failure', error);
      console.error('Lead submission error:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/45 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md bg-background border border-outline-variant p-6 sm:p-8 shadow-2xl rounded-none max-h-[90vh] overflow-y-auto my-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <FiX size={20} />
        </button>

        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-primary mb-2">
          Start Your Project
        </h3>
        <p className="font-body text-xs text-secondary mb-6">
          Leave your details below and our principal architect will connect with you within 24 hours.
        </p>

        {message.text && (
          <div className={`p-4 mb-6 text-xs font-body ${
            message.type === 'success' 
              ? 'bg-green-500/10 text-green-700 border border-green-500/20' 
              : 'bg-red-500/10 text-red-700 border border-red-500/20'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="lead-name" className="block font-body text-[10px] uppercase tracking-widest text-secondary font-semibold">
              Name
            </label>
            <input 
              id="lead-name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 transition-colors font-body text-sm rounded-none outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="lead-email" className="block font-body text-[10px] uppercase tracking-widest text-secondary font-semibold">
              Email Address *
            </label>
            <input 
              id="lead-email"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 transition-colors font-body text-sm rounded-none outline-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 font-body text-xs font-bold uppercase tracking-widest hover:scale-[1.01] active:scale-95 disabled:opacity-50 transition-all duration-300 shadow-md"
          >
            {loading ? 'SUBMITTING...' : 'CONNECT NOW'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;
