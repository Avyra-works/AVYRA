import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export const ProjectCard = ({ project, isMobile, index }) => {
  const desktopImage = project.desktopImage || project.image;
  const mobileImage = project.mobileImage || (project.gallery && project.gallery[0]) || (project.galleryImages && project.galleryImages[0]);
  const statusBadge = project.status;
  const highlights = project.technologies || [];
  const url = project.liveUrl || project.url;
  const detailedDescription = project.description;
  const primaryButtonText = project.primaryButtonText || "View Live Project";

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-stretch project-reveal">
        {/* Project Screenshot */}
        <div className="w-full shadow-md rounded border border-outline-variant/40 overflow-hidden bg-surface-container-high">
          <img 
            src={desktopImage} 
            srcSet={project.coverImageAttrs?.srcSet || undefined}
            sizes={project.coverImageAttrs?.sizes || undefined}
            alt={project.featuredImageAlt || project.altText || `${project.title} Screenshot`}
            loading="lazy"
            className="w-full h-auto block object-contain"
          />
        </div>

        {/* Spacing: 32px */}
        <div className="h-8"></div>

        {/* Category and status badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold">
            {project.category}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
          <span className="inline-block bg-accent-gold/10 text-accent-gold px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider rounded-full border border-accent-gold/20">
            {statusBadge}
          </span>
        </div>

        {/* Spacing: 16px */}
        <div className="h-4"></div>

        {/* Project Title */}
        <h3 className="font-display text-2xl font-bold text-primary leading-tight">
          {project.title}
        </h3>

        {/* Spacing: 20px */}
        <div className="h-5"></div>

        {/* Short Description */}
        <p className="font-body text-base text-primary font-medium leading-relaxed italic border-l-2 border-accent-gold pl-4">
          {project.shortDescription}
        </p>

        {/* Spacing: 24px */}
        <div className="h-6"></div>

        {/* Key Highlights */}
        <div className="space-y-3">
          <h4 className="font-body text-[10px] uppercase tracking-widest text-secondary font-bold">
            Key Highlights
          </h4>
          <ul className="grid grid-cols-1 gap-y-2 text-sm">
            {highlights.map((highlight, hIdx) => (
              <li key={hIdx} className="flex items-center gap-2 font-body text-secondary text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0"></span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacing: 32px */}
        <div className="h-8"></div>

        {/* Primary Button */}
        <div className="w-full flex flex-col gap-4">
          {url && (
            <a 
              href={url}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-transparent hover:text-primary border border-primary px-4 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group w-full"
            >
              {primaryButtonText}
              <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          {project.behanceUrl && (
            <a 
              href={project.behanceUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-primary hover:bg-primary hover:text-on-primary border border-primary px-4 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group w-full"
            >
              Behance
              <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    );
  }

  // Desktop layout (isMobile === false)
  const isEven = index % 2 === 0;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center project-reveal">
      {/* Image Showcase (Desktop & Mobile mockups overlapping) */}
      <div className={`col-span-12 lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        {/* Desktop Mockup container */}
        <div className="relative aspect-[16/10] bg-surface-container-high overflow-hidden border border-outline-variant group project-desktop-card cursor-pointer shadow-lg">
          <img 
            src={desktopImage} 
            srcSet={project.coverImageAttrs?.srcSet || undefined}
            sizes={project.coverImageAttrs?.sizes || undefined}
            alt={project.featuredImageAlt || project.altText || `${project.title} Desktop`}
            loading="lazy"
            className="w-full h-full object-cover grayscale desktop-img transition-all duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-primary/5 opacity-0 hover-overlay transition-opacity duration-500"></div>
        </div>
        
        {/* Overlapping Mobile Mockup */}
        {mobileImage && (
          <div className={`absolute bottom-[-32px] w-[130px] md:w-[170px] aspect-[9/19] bg-surface-container-high overflow-hidden border-4 border-background shadow-2xl z-10 hidden md:block ${
            isEven ? 'right-[-20px] lg:right-[-40px]' : 'left-[-20px] lg:left-[-40px]'
          }`}>
            <img 
              src={mobileImage} 
              srcSet={project.mobileImageAttrs?.srcSet || undefined}
              sizes={project.mobileImageAttrs?.sizes || undefined}
              alt={project.featuredImageAlt ? `${project.featuredImageAlt} Mobile` : `${project.title} Mobile`}
              loading="lazy"
              className="w-full h-full object-cover grayscale mobile-img-hover transition-all duration-500" 
            />
          </div>
        )}
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
            {statusBadge}
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
          {detailedDescription}
        </p>

        {/* Highlights Grid */}
        <div className="space-y-3 pt-2">
          <h4 className="font-body text-[10px] uppercase tracking-widest text-secondary font-bold">
            Key Highlights
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {highlights.map((highlight, hIdx) => (
              <li key={hIdx} className="flex items-center gap-2 font-body text-secondary text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0"></span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          {url && (
            <a 
              href={url}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-primary text-on-primary hover:bg-transparent hover:text-primary border border-primary px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
            >
              {primaryButtonText}
              <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          {project.secondaryButton && (
            <a 
              href={project.secondaryButton.url}
              className="inline-flex items-center gap-4 bg-transparent text-primary hover:bg-primary hover:text-on-primary border border-primary px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
            >
              {project.secondaryButton.text}
              <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          {project.behanceUrl && (
            <a 
              href={project.behanceUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-transparent text-primary hover:bg-primary hover:text-on-primary border border-primary px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
            >
              Behance
              <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
