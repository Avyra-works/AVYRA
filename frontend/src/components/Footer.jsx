import React from 'react';
import { FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';
import { TbBrandBehance } from 'react-icons/tb';

export const Footer = () => {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background border-t border-outline-variant transition-colors duration-300">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop py-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-xs">
            <a 
              href="#" 
              onClick={(e) => handleScrollTo(e, 'hero')}
              className="font-display text-2xl font-bold text-primary mb-6 block tracking-tighter"
            >
              AVYRA
            </a>
            <p className="font-body text-sm text-secondary italic">Boundless Digital Craftsmanship.</p>
            <p className="font-body text-base text-primary mt-8 font-semibold select-all break-all break-words">teamm.avyra@gmail.com</p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
            <div className="flex flex-col gap-4">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-primary">Navigation</span>
              <a 
                href="#work" 
                onClick={(e) => handleScrollTo(e, 'work')}
                className="font-body text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors"
              >
                Work
              </a>
              <a 
                href="#services" 
                onClick={(e) => handleScrollTo(e, 'services')}
                className="font-body text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors"
              >
                Services
              </a>
              <a 
                href="#about" 
                onClick={(e) => handleScrollTo(e, 'about')}
                className="font-body text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors"
              >
                About
              </a>
              <a 
                href="#team" 
                onClick={(e) => handleScrollTo(e, 'team')}
                className="font-body text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors"
              >
                Team
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-primary">Social</span>
              <div className="flex items-center gap-2 mt-1">
                <a 
                  href="https://www.instagram.com/avyra.creations" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300 md:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 rounded-sm"
                >
                  <FiInstagram size={20} />
                </a>
                <a 
                  href="https://www.behance.net/avyra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Behance"
                  className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300 md:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 rounded-sm"
                >
                  <TbBrandBehance size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/company/135204244" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300 md:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 rounded-sm"
                >
                  <FiLinkedin size={20} />
                </a>
                <a 
                  href="https://github.com/Avyra-works" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300 md:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 rounded-sm"
                >
                  <FiGithub size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-outline-variant/30 pt-12">
          <p className="font-body text-[11px] uppercase tracking-widest text-secondary opacity-80">
            © {new Date().getFullYear()} AVYRA . ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="font-body text-[11px] uppercase tracking-widest text-secondary font-semibold">
              AVAILABLE FOR NEW PROJECTS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
