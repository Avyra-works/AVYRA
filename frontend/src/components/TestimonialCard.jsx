import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const TestimonialCard = ({ testimonial }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < testimonial.rating);

  return (
    <motion.div 
      className="bg-background border border-outline-variant/30 p-6 sm:p-8 md:p-10 rounded-none flex flex-col justify-between h-full select-none text-left group"
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.04)",
        borderColor: "rgba(201, 162, 39, 0.3)" 
      }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="space-y-6">
        {/* Top bar: Rating and Optional Project */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {stars.map((filled, i) => (
              <Star 
                key={i} 
                size={14} 
                className={filled ? "fill-accent-gold text-accent-gold" : "text-outline-variant/30"} 
              />
            ))}
          </div>
          {testimonial.project && (
            <span className="font-body text-[10px] font-bold uppercase tracking-wider text-accent-gold/80 bg-accent-gold/5 px-2.5 py-1 border border-accent-gold/10">
              {testimonial.project}
            </span>
          )}
        </div>

        {/* Review text */}
        <p className="font-body text-sm md:text-base font-normal text-primary/80 leading-relaxed italic">
          "{testimonial.review}"
        </p>
      </div>

      {/* Client profile info at the bottom */}
      <div className="flex items-center gap-4 pt-8 mt-auto border-t border-outline-variant/20">
        {testimonial.image && (
          <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/35 flex-shrink-0">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 ease-out"
            />
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-body text-xs font-bold uppercase tracking-widest text-primary">
            {testimonial.name}
          </span>
          <span className="font-body text-[11px] text-secondary">
            {testimonial.designation}, {testimonial.company}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

