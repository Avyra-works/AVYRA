import React from 'react';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <p className="font-display text-2xl md:text-4xl font-normal text-primary italic leading-relaxed tracking-tight">
        "{testimonial.review}"
      </p>
      <div className="flex flex-col items-center space-y-1">
        <p className="font-body text-xs font-bold uppercase tracking-widest text-primary">
          {testimonial.name}
        </p>
        <p className="font-body text-xs text-secondary">
          {testimonial.designation}, {testimonial.company}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
