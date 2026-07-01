import React from 'react';
import TestimonialCard from './TestimonialCard';

export const Testimonials = ({ testimonials = [] }) => {
  const featuredTestimonials = React.useMemo(() => {
    return [...testimonials]
      .filter(t => t.featured === true)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [testimonials]);

  return (
    <section className="py-40 bg-surface-container-low border-y border-outline-variant transition-colors duration-300">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop text-center">
        {/* Large Custom Double Quote SVG */}
        <div className="flex justify-center mb-12">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-accent-gold"
          >
            <path 
              d="M9.5 7.5c-1.93 0-3.5 1.57-3.5 3.5 0 .5.1.97.28 1.41C5.17 13.06 4.5 14.2 4.5 15.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-.93-.37-1.78-.96-2.41.6-.63.96-1.48.96-2.41 0-1.93-1.57-3.5-3.5-3.5zm10 0c-1.93 0-3.5 1.57-3.5 3.5 0 .5.1.97.28 1.41-1.11.65-1.78 1.79-1.78 3.09 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-.93-.37-1.78-.96-2.41.6-.63.96-1.48.96-2.41 0-1.93-1.57-3.5-3.5-3.5z" 
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="space-y-24">
          {featuredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
