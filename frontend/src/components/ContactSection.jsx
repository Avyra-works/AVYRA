import React, { useState, useEffect, useRef } from 'react';
import { FiMail, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { submitContactInquiry } from '../services/api';

export const ContactSection = React.memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Full Website Build',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef(null);

  const options = [
    'Full Website Build',
    'UI/UX Design Only',
    'Brand Identity',
    'Consultation'
  ];

  // Synchronize highlighted index with selected option when opening
  useEffect(() => {
    if (isOpen) {
      const selectedIndex = options.indexOf(formData.projectType);
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, formData.projectType]);

  // Click outside detection to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelect = (option) => {
    setFormData({
      ...formData,
      projectType: option
    });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen) {
          handleSelect(options[highlightedIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => (prev + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!formData.name.trim()) {
      setStatus({ type: 'error', text: 'Name is required.' });
      return;
    }
    if (!formData.email.trim()) {
      setStatus({ type: 'error', text: 'Email is required.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', text: 'Message is required.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      // 1. Submit to MONGODB via Express local backend
      await submitContactInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        projectType: formData.projectType,
        message: formData.message.trim()
      });

      // 2. Submit to WEB3FORMS (for email forwarding)
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!web3FormsKey || web3FormsKey === 'your_web3forms_key_here') {
        console.warn('Web3Forms Access Key is missing or is set to placeholder.');
        throw new Error('Web3Forms access key is not configured.');
      }

      const web3FormsBody = {
        access_key: web3FormsKey,
        subject: `New Avyra Inquiry from ${formData.name.trim()}`,
        from_name: 'Avyra Website',
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        projectType: formData.projectType,
        message: formData.message.trim()
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(web3FormsBody)
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Web3Forms submission failed');
      }

      setStatus({ 
        type: 'success', 
        text: "Thank you. Your inquiry has been received. We'll get back to you shortly." 
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'Full Website Build',
        message: ''
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus({ 
        type: 'error', 
        text: 'Something went wrong. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-40 bg-background border-t border-outline-variant transition-colors duration-300">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        
        {/* Left side: Contact details */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold block">
              GET IN TOUCH
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-primary">
              Let's Build Something
            </h2>
            <p className="font-body text-sm text-secondary leading-relaxed">
              Ready to elevate your project to elite status? Fill out the form or reach out directly.
            </p>
          </div>

          <div className="space-y-8 pt-4">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-surface-container-low border border-outline-variant rounded-full flex items-center justify-center text-primary">
                <FiMail size={18} />
              </div>
              <div className="space-y-1">
                <span className="block font-body text-xs font-bold uppercase tracking-wider text-primary">
                  Email Us
                </span>
                <span className="font-body text-sm text-secondary select-all break-all break-words">
                  teamm.avyra@gmail.com
                </span>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-surface-container-low border border-outline-variant rounded-full flex items-center justify-center text-primary">
                <FiMapPin size={18} />
              </div>
              <div className="space-y-1">
                <span className="block font-body text-xs font-bold uppercase tracking-wider text-primary">
                  Visit Us
                </span>
                <span className="font-body text-sm text-secondary">
                  Gandhinagar, Gujarat, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Contact Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-surface-container-low p-6 sm:p-8 md:p-12 border border-outline-variant space-y-8 rounded-none">
          {status.text && (
            <div className={`p-4 font-body text-xs ${
              status.type === 'success' 
                ? 'bg-green-500/10 text-green-700 border border-green-500/20' 
                : 'bg-red-500/10 text-red-700 border border-red-500/20'
            }`}>
              {status.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label htmlFor="contact-name" className="block font-body text-[10px] uppercase tracking-widest text-secondary font-semibold">
                Name *
              </label>
              <input 
                id="contact-name"
                type="text" 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Johnson"
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 transition-colors font-body text-sm rounded-none outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-email" className="block font-body text-[10px] uppercase tracking-widest text-secondary font-semibold">
                Email *
              </label>
              <input 
                id="contact-email"
                type="email" 
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 transition-colors font-body text-sm rounded-none outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label htmlFor="contact-company" className="block font-body text-[10px] uppercase tracking-widest text-secondary font-semibold">
                Company (Optional)
              </label>
              <input 
                id="contact-company"
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 transition-colors font-body text-sm rounded-none outline-none"
              />
            </div>

            <div className="space-y-1 relative" ref={dropdownRef}>
              <label className="block font-body text-[10px] uppercase tracking-widest text-secondary font-semibold">
                Project Type
              </label>
              
              <button
                id="project-type-button"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls="project-type-listbox"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary px-0 py-3 transition-colors font-body text-sm rounded-none outline-none text-left flex justify-between items-center cursor-pointer text-primary"
              >
                <span className={formData.projectType ? 'text-primary' : 'text-secondary'}>
                  {formData.projectType}
                </span>
                <FiChevronDown 
                  className={`text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                  size={16} 
                />
              </button>

              {/* Floating Custom Dropdown Options List */}
              <div
                id="project-type-listbox"
                role="listbox"
                aria-labelledby="project-type-button"
                className={`absolute left-0 w-full mt-1 bg-surface-container-low border border-outline-variant shadow-lg z-50 transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="py-1">
                  {options.map((option, index) => {
                    const isSelected = formData.projectType === option;
                    const isHighlighted = highlightedIndex === index;
                    
                    return (
                      <div
                        key={option}
                        role="option"
                        aria-selected={isSelected}
                        id={`project-type-option-${index}`}
                        onClick={() => handleSelect(option)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={`px-4 py-3 text-sm font-body cursor-pointer transition-colors duration-150 text-left ${
                          isSelected 
                            ? 'bg-surface-container text-primary font-semibold' 
                            : isHighlighted 
                              ? 'bg-surface-container/70 text-primary' 
                              : 'text-secondary hover:text-primary hover:bg-surface-container/30'
                        }`}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="contact-message" className="block font-body text-[10px] uppercase tracking-widest text-secondary font-semibold">
              Message *
            </label>
            <textarea 
              id="contact-message"
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your vision..."
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 transition-colors font-body text-sm rounded-none outline-none resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-on-primary py-5 font-body text-xs font-bold uppercase tracking-widest hover:scale-[1.01] active:scale-95 disabled:opacity-50 transition-all duration-300 shadow-md"
          >
            {loading ? 'SENDING INQUIRY...' : 'Send Inquiry'}
          </button>
        </form>

      </div>
    </section>
  );
});

export default ContactSection;
