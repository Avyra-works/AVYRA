import React from 'react';
import ProjectCard from './ProjectCard';

export const FeaturedWork = ({ projects = [] }) => {
  const featuredProjects = React.useMemo(() => {
    return [...projects]
      .filter(p => p.featured === true)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [projects]);

  React.useEffect(() => {
    if (featuredProjects.length === 0) return;

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
  }, [featuredProjects]);

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
            aspect-ratio: auto !important;
          }
          #work .desktop-img {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
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

        {/* Dedicated Mobile Layout (< 768px) */}
        <div className="block md:hidden space-y-[64px]">
          {featuredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isMobile={true} 
            />
          ))}
        </div>

        {/* Dedicated Desktop Layout (>= 768px) */}
        <div className="hidden md:block space-y-32">
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isMobile={false} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
