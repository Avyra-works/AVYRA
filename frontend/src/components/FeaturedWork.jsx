import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import obsidianDesktop from '../assets/obsidian_desktop.webp';
import obsidianMobile from '../assets/obsidian_mobile.webp';

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
    }
  ];

  return (
    <section id="work" className="py-40 bg-background transition-colors duration-300 overflow-hidden">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop">
        <div className="flex justify-between items-center mb-24">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-primary">
            Featured Projects
          </h2>
          <div className="w-1/3 h-[1px] bg-outline-variant hidden md:block"></div>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center reveal"
              >
                {/* Image Showcase (Desktop & Mobile mockups overlapping) */}
                <div className={`col-span-12 lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Desktop Mockup container */}
                  <div className="relative aspect-[16/10] bg-surface-container-high overflow-hidden border border-outline-variant group cursor-pointer shadow-lg">
                    <img 
                      src={project.desktopImage} 
                      alt={`${project.title} Desktop`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.01] transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Overlapping Mobile Mockup */}
                  <div className={`absolute bottom-[-32px] w-[130px] md:w-[170px] aspect-[9/19] bg-surface-container-high overflow-hidden border-4 border-background shadow-2xl z-10 hidden sm:block ${
                    isEven ? 'right-[-20px] lg:right-[-40px]' : 'left-[-20px] lg:left-[-40px]'
                  }`}>
                    <img 
                      src={project.mobileImage} 
                      alt={`${project.title} Mobile`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className={`col-span-12 lg:col-span-5 space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Category and Badge */}
                  <div className="flex items-center gap-4">
                    <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold">
                      {project.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
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

                  {/* CTA Button */}
                  <div className="pt-4">
                    <a 
                      href={project.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 bg-primary text-on-primary hover:bg-transparent hover:text-primary border border-primary px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
                    >
                      View Live Project
                      <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </a>
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
