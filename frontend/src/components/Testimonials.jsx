import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

export const Testimonials = ({ testimonials = [] }) => {
  // 1. Filter and sort testimonials
  const featuredTestimonials = useMemo(() => {
    return [...testimonials]
      .filter(t => t.featured === true)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [testimonials]);

  const N = featuredTestimonials.length;

  // 2. Clone testimonials for infinite loop (3 copies)
  const loopItems = useMemo(() => {
    return N > 0 ? [...featuredTestimonials, ...featuredTestimonials, ...featuredTestimonials] : [];
  }, [featuredTestimonials, N]);

  const M = loopItems.length; // 3 * N

  // 3. Responsive visible count logic
  const getInitialVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const getInitialContainerWidth = () => {
    if (typeof window === 'undefined') return 1200;
    const padding = window.innerWidth >= 768 ? 160 : 48;
    return Math.max(280, window.innerWidth - padding);
  };

  const [visibleCount, setVisibleCount] = useState(getInitialVisibleCount);
  const [containerWidth, setContainerWidth] = useState(getInitialContainerWidth);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleResize = (entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
      
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    const rect = containerRef.current.getBoundingClientRect();
    setContainerWidth(rect.width);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 4. Slide state (starts at index N, which is the middle copy)
  const [slideState, setSlideState] = useState({
    index: N,
    animate: true
  });

  // Sync slideState index when N changes from 0 (after async load)
  useEffect(() => {
    if (N > 0) {
      setSlideState({
        index: N,
        animate: false
      });
    }
  }, [N]);

  const [autoplayActive, setAutoplayActive] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Auto play effect: transition every 3 seconds unless paused
  // Pauses for 6 seconds on interaction, then resumes
  useEffect(() => {
    if (!autoplayActive) {
      const timeout = setTimeout(() => {
        setAutoplayActive(true);
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, [autoplayActive]);

  const handleNext = () => {
    setSlideState(prev => ({
      index: prev.index + 1,
      animate: true
    }));
  };

  useEffect(() => {
    if (!autoplayActive) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [autoplayActive]); // Optimized: removed slideState.index to prevent interval recreate on every slide

  // ----------------------------------------
  // CONDITIONAL RETURN: Moved AFTER all hooks
  // ----------------------------------------
  if (N === 0) return null;

  const cardWidth = (containerWidth || 1200) / visibleCount;

  // 5. Handlers
  const handlePrev = () => {
    setAutoplayActive(false); // Pause autoplay temporarily on interaction
    setSlideState(prev => ({
      index: prev.index - 1,
      animate: true
    }));
  };

  // Manual Next click (pauses autoplay)
  const handleNextManual = () => {
    setAutoplayActive(false);
    handleNext();
  };

  // Infinite jump adjustment when animation finishes
  const handleAnimationComplete = () => {
    if (slideState.index >= 2 * N) {
      // Jump back to middle copy
      setSlideState({
        index: slideState.index - N,
        animate: false
      });
    } else if (slideState.index < N) {
      // Jump forward to middle copy
      setSlideState({
        index: slideState.index + N,
        animate: false
      });
    }
  };

  // Jump to a specific dot index (0 to N-1)
  const handleDotClick = (dotIndex) => {
    setAutoplayActive(false);
    
    // Find the closest equivalent target index to minimize jump visual distance
    const currentRelative = slideState.index % N;
    const diff = dotIndex - currentRelative;
    
    setSlideState({
      index: slideState.index + diff,
      animate: true
    });
  };

  const activeDot = ((slideState.index - N) % N + N) % N;

  // Swipe/Drag support
  const handleDragEnd = (event, info) => {
    setAutoplayActive(false);
    const swipeThreshold = 50;
    const swipe = info.offset.x;
    if (swipe < -swipeThreshold) {
      handleNext();
    } else if (swipe > swipeThreshold) {
      handlePrev();
    } else {
      // Trigger update with same index to snap back
      setSlideState(prev => ({ ...prev }));
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNextManual(); // Pause autoplay on arrow press
    }
  };

  // Transition definition based on reduced motion setting and state
  const slideTransition = shouldReduceMotion
    ? { duration: 0.1 }
    : (slideState.animate
      ? { type: "spring", stiffness: 260, damping: 32, mass: 1 }
      : { duration: 0 });

  return (
    <section 
      className="py-40 bg-surface-container-low border-y border-outline-variant transition-colors duration-300 overflow-hidden focus:outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Client testimonials"
    >
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

        {/* Slider container */}
        <div ref={containerRef} className="relative w-full overflow-hidden px-1 py-4">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={shouldReduceMotion ? 0 : 0.15}
            onDragEnd={handleDragEnd}
            animate={{ 
              x: -slideState.index * cardWidth 
            }}
            transition={slideTransition}
            onAnimationComplete={handleAnimationComplete}
            className="flex cursor-grab active:cursor-grabbing"
            style={{ 
              width: M * cardWidth,
              marginLeft: "-16px" // Offset card padding
            }}
          >
            {loopItems.map((testimonial, idx) => (
              <div 
                key={`${testimonial.id}-${idx}`}
                className="px-4 flex-shrink-0"
                style={{ width: cardWidth }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Controls: Prev/Next & Indicators */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16 max-w-4xl mx-auto">
          {/* Pagination Indicators (Dots) */}
          <div className="flex items-center gap-3 order-2 md:order-1">
            {featuredTestimonials.map((_, idx) => {
              const isActive = idx === activeDot;
              return (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className="relative h-2 focus:outline-none cursor-pointer"
                  style={{ width: isActive ? '24px' : '8px' }}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={isActive ? "true" : "false"}
                >
                  <motion.span
                    layout={!shouldReduceMotion}
                    className={`absolute inset-0 rounded-full ${
                      isActive ? 'bg-accent-gold' : 'bg-outline-variant/50 hover:bg-outline'
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </button>
              );
            })}
          </div>

          {/* Previous & Next Buttons */}
          <div className="flex items-center gap-4 order-1 md:order-2">
            <motion.button
              onClick={handlePrev}
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.05, 
                borderColor: "rgba(201, 162, 39, 0.8)",
                color: "var(--color-accent-gold)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-outline-variant/50 bg-background flex items-center justify-center text-primary/80 transition-colors duration-300 shadow-sm cursor-pointer focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={handleNextManual}
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.05, 
                borderColor: "rgba(201, 162, 39, 0.8)",
                color: "var(--color-accent-gold)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-outline-variant/50 bg-background flex items-center justify-center text-primary/80 transition-colors duration-300 shadow-sm cursor-pointer focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


