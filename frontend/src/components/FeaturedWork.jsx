import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import obsidianDesktop from '../assets/obsidian_desktop.webp';
import obsidianMobile from '../assets/obsidian_mobile.webp';
import anjuDesktop from '../assets/anju_desktop.webp';
import anjuMobile from '../assets/anju_mobile.webp';

export const FeaturedWork = () => {
  const projects = [
    {
      id: "obsidian-auto-spa",
      title: "Obsidian Auto Spa",
      category: "Web Design & Development",
      statusBadge: "Live Project",
      shortDescription: "A premium automotive detailing website designed to showcase luxury car care services through sophisticated visual design, strong typography, and a refined user experience.",
      detailedDescription: "Obsidian Auto Spa was created as a high-end digital experience for a premium car detailing and protection studio. The project focuses on luxury branding, service presentation, customer trust, and conversion-focused design. Every section was carefully crafted to communicate professionalism, attention to detail, and premium service quality while maintaining excellent responsiveness across all devices.",
      highlights: [
        "Premium Editorial Design",
        "Responsive Across All Devices",
        "Luxury Automotive Branding",
        "Interactive Service Showcase",
        "Custom UI Components",
        "Modern User Experience",
        "Conversion-Focused Layout",
        "Performance Optimized"
      ],
      desktopImage: obsidianDesktop,
      mobileImage: obsidianMobile,
      url: "https://obsidian-auto-demo.vercel.app/"
    },
    {
      id: "anju-house-redesign",
      title: "Anju House Restaurant Website Redesign",
      category: "UI/UX Redesign • Frontend Development",
      statusBadge: "Website Redesign",
      shortDescription: "A premium concept redesign of a Korean family restaurant website focused on improving user experience, online reservations, branding, and customer engagement.",
      detailedDescription: "Redesigned the complete digital experience of Anju House with a modern luxury aesthetic, immersive visuals, responsive layouts, interactive reservation flow, improved navigation, optimized menu presentation, and a stronger brand identity while preserving the restaurant's Korean family atmosphere and sports-night culture.",
      highlights: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "React Router",
        "Responsive Design"
      ],
      desktopImage: anjuDesktop,
      mobileImage: anjuMobile,
      primaryButton: {
        text: "Live Demo",
        url: "https://anju-house-redesign.vercel.app/"
      },
    }
  ];

  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('#work .project-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section id="work" className="py-40 bg-background transition-colors duration-300 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Enforce box-sizing and prevent horizontal scrolling */
        #work, #work * {
          box-sizing: border-box !important;
        }
        #work {
          overflow-x: hidden !important;
        }

        /* Custom project card scroll reveal */
        #work .project-reveal {
          opacity: 0;
          transform: translateY(40px);
          will-change: transform, opacity;
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #work .project-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* Desktop-only hover effects */
        @media (hover: hover) {
          #work .project-desktop-card:hover .desktop-img {
            filter: grayscale(0%) !important;
            transform: scale(1.015) !important;
          }
          #work .project-desktop-card:hover .hover-overlay {
            opacity: 1 !important;
          }
          #work .mobile-img-hover:hover {
            filter: grayscale(0%) !important;
          }
        }

        /* Strict mobile image constraints */
        @media (max-width: 767px) {
          #work .project-desktop-card {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            aspect-ratio: 16/10 !important;
          }
          #work .desktop-img {
            width: 100% !important;
            max-width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
        }

        /* Accessibility: respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          #work .project-reveal {
            opacity: 0;
            transform: none !important;
            transition: opacity 0.3s ease-in-out !important;
          }
          #work .project-reveal.active {
            opacity: 1;
          }
          #work .project-desktop-card:hover .desktop-img {
            transform: none !important;
            transition: none !important;
          }
        }
      `}} />
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop">
        <div className="flex justify-between items-center mb-24">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-primary">
            Featured Projects
          </h2>
          <div className="w-1/3 h-[1px] bg-outline-variant hidden md:block"></div>
        </div>

        <div className="space-y-20 md:space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center project-reveal"
              >
                {/* Image Showcase (Desktop & Mobile mockups overlapping) */}
                <div className={`col-span-12 lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Desktop Mockup container */}
                  <div className="relative aspect-[16/10] bg-surface-container-high overflow-hidden border border-outline-variant group project-desktop-card cursor-pointer shadow-lg mb-8 lg:mb-0">
                    <img 
                      src={project.desktopImage} 
                      alt={`${project.title} Desktop`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale desktop-img transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 hover-overlay transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Overlapping Mobile Mockup */}
                  <div className={`absolute bottom-[-24px] lg:bottom-[-32px] w-[130px] md:w-[170px] aspect-[9/19] bg-surface-container-high overflow-hidden border-4 border-background shadow-2xl z-10 hidden md:block ${
                    isEven ? 'right-2 md:right-4 lg:right-[-40px]' : 'left-2 md:left-4 lg:left-[-40px]'
                  }`}>
                    <img 
                      src={project.mobileImage} 
                      alt={`${project.title} Mobile`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale mobile-img-hover transition-all duration-500" 
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className={`col-span-12 lg:col-span-5 space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Category and Badge */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold">
                      {project.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant hidden sm:block"></span>
                    <span className="inline-block bg-accent-gold/10 text-accent-gold px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider rounded-full border border-accent-gold/20">
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
                      {project.title}
                    </h3>
                    <p className="font-body text-base text-primary font-medium leading-relaxed italic border-l-2 border-accent-gold pl-4">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <p className="font-body text-sm text-secondary leading-relaxed">
                    {project.detailedDescription}
                  </p>

                  {/* Highlights Grid */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-body text-[10px] uppercase tracking-widest text-secondary font-bold">
                      Key Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2 font-body text-secondary text-xs font-semibold tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
                    {project.primaryButton ? (
                      <a 
                        href={project.primaryButton.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 sm:gap-4 bg-primary text-on-primary hover:bg-transparent hover:text-primary border border-primary px-4 sm:px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group w-full sm:w-auto"
                      >
                        {project.primaryButton.text}
                        <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      project.url && (
                        <a 
                          href={project.url}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 sm:gap-4 bg-primary text-on-primary hover:bg-transparent hover:text-primary border border-primary px-4 sm:px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group w-full sm:w-auto"
                        >
                          View Live Project
                          <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                        </a>
                      )
                    )}
                    {project.secondaryButton && (
                      <a 
                        href={project.secondaryButton.url}
                        className="inline-flex items-center justify-center gap-2 sm:gap-4 bg-transparent text-primary hover:bg-primary hover:text-on-primary border border-primary px-4 sm:px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group w-full sm:w-auto"
                      >
                        {project.secondaryButton.text}
                        <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;

