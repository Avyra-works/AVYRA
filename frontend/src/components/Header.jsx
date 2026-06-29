import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export const Header = ({ onOpenLeadModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef({});

  const navItems = [
    { id: 'work', label: 'WORK' },
    { id: 'services', label: 'SERVICES' },
    { id: 'about', label: 'ABOUT' },
    { id: 'team', label: 'TEAM' }
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Scroll-Spy detection logic
  useEffect(() => {
    const handleScroll = () => {
      const servicesEl = document.getElementById('services');
      const workEl = document.getElementById('work');
      const aboutEl = document.getElementById('about');
      const teamEl = document.getElementById('team');
      
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      
      // Highlight the team section when user reaches the bottom
      if (scrollPos + viewportHeight >= scrollHeight - 50) {
        setActiveSection('team');
        return;
      }
      
      const triggerOffset = viewportHeight * 0.4;
      let current = 'work'; // default to work, as per "Hero -> Work active"
      
      if (servicesEl && scrollPos >= servicesEl.offsetTop - triggerOffset) {
        current = 'services';
      }
      if (workEl && scrollPos >= workEl.offsetTop - triggerOffset) {
        current = 'work';
      }
      if (aboutEl && scrollPos >= aboutEl.offsetTop - triggerOffset) {
        current = 'about';
      }
      if (teamEl && scrollPos >= teamEl.offsetTop - triggerOffset) {
        current = 'team';
      }
      
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth sliding active indicator alignment
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = navRefs.current[activeSection];
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1
        });
      }
    };

    updateIndicator();
    
    // Safety timeout for dynamic font layout recalculation
    const timer = setTimeout(updateIndicator, 100);
    
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timer);
    };
  }, [activeSection]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant transition-all duration-300">
      <nav className="flex justify-between items-center w-full px-6 md:px-10 lg:px-margin-desktop py-4 max-w-container-max-width mx-auto">
        <a 
          href="#" 
          onClick={(e) => handleLinkClick(e, 'hero')}
          className="font-display text-2xl font-bold tracking-tighter text-primary hover:opacity-85 transition-opacity"
        >
          AVYRA
        </a>

        {/* Desktop Navigation */}
        <div className="relative hidden md:flex items-center gap-6 lg:gap-10">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              ref={(el) => (navRefs.current[item.id] = el)}
              onClick={(e) => handleLinkClick(e, item.id)}
              className={`nav-link font-body text-sm uppercase tracking-widest cursor-pointer ${
                activeSection === item.id 
                  ? 'active text-primary opacity-100' 
                  : 'text-secondary opacity-80 hover:opacity-100'
              }`}
            >
              {item.label}
            </a>
          ))}
          
          {/* Smooth sliding active indicator line */}
          <div 
            className="active-indicator"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
        </div>

        <button 
          onClick={onOpenLeadModal}
          className="hidden md:block bg-primary text-on-primary px-6 lg:px-8 py-3 font-body text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-sm"
        >
          GET IN TOUCH
        </button>

        {/* Mobile Burger Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-primary focus:outline-none hover:opacity-75 transition-opacity duration-300"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Full-screen Overlay Menu */}
      <div 
        className={`fixed inset-0 bg-background/98 backdrop-blur-md flex flex-col z-50 md:hidden transition-all duration-500 ease-in-out h-screen w-screen ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto visible' 
            : 'opacity-0 -translate-y-4 pointer-events-none invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Header mimicking top bar for seamless transition */}
        <div className="flex justify-between items-center w-full px-6 py-4 border-b border-outline-variant/30 shrink-0">
          <span className="font-display text-2xl font-bold tracking-tighter text-primary select-none">
            AVYRA
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileMenu();
            }}
            className="p-2 text-primary focus:outline-none hover:opacity-75 transition-opacity"
            aria-label="Close Menu"
          >
            <FiX size={24} className={`transition-transform duration-500 ${mobileMenuOpen ? 'rotate-0' : '-rotate-90'}`} />
          </button>
        </div>

        {/* Centered navigation links with scroll support */}
        <div className="flex-1 flex flex-col justify-center items-center gap-10 py-8 px-6 overflow-y-auto">
          <nav 
            className="flex flex-col items-center gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`font-display text-2xl uppercase tracking-widest transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-accent-gold font-bold'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileMenu();
              onOpenLeadModal();
            }}
            className="bg-primary text-on-primary px-10 py-5 font-body text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg mt-4 shrink-0"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
