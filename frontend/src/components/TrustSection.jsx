import React, { useRef, useEffect } from 'react';

export const TrustSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeftVal = 0;
    
    // Inertia & Momentum variables
    let velocity = 0;
    let animationId = null;
    let lastTime = 0;
    let lastX = 0;
    
    // Smooth wheel scroll variables
    let targetScrollLeft = el.scrollLeft;
    let isWheelScrolling = false;

    const smoothWheelScrollLoop = () => {
      if (!isWheelScrolling) return;
      
      const diff = targetScrollLeft - el.scrollLeft;
      if (Math.abs(diff) > 0.5) {
        el.scrollLeft += diff * 0.15; // smooth interpolation speed
        animationId = requestAnimationFrame(smoothWheelScrollLoop);
      } else {
        el.scrollLeft = targetScrollLeft;
        isWheelScrolling = false;
      }
    };

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;

      const canScrollLeft = el.scrollLeft > 0;
      const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((scrollingDown && canScrollRight) || (scrollingUp && canScrollLeft)) {
        e.preventDefault();
        velocity = 0;
        
        if (!isWheelScrolling) {
          isWheelScrolling = true;
          targetScrollLeft = el.scrollLeft;
        }

        targetScrollLeft = Math.max(
          0,
          Math.min(el.scrollWidth - el.clientWidth, targetScrollLeft + e.deltaY * 1.2)
        );

        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(smoothWheelScrollLoop);
      }
    };

    const handleMouseDown = (e) => {
      isDown = true;
      isWheelScrolling = false;
      
      startX = e.pageX - el.offsetLeft;
      scrollLeftVal = el.scrollLeft;
      
      lastX = e.pageX;
      lastTime = performance.now();
      velocity = 0;
      
      cancelAnimationFrame(animationId);
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      
      const currentTime = performance.now();
      const timeDiff = currentTime - lastTime;
      const xDiff = e.pageX - lastX;
      
      if (timeDiff > 0) {
        velocity = xDiff / timeDiff;
      }
      
      el.scrollLeft = scrollLeftVal - walk;
      
      lastX = e.pageX;
      lastTime = currentTime;
    };

    const applyInertia = () => {
      if (Math.abs(velocity) < 0.05) return;
      
      const friction = 0.95;
      
      const step = () => {
        if (Math.abs(velocity) > 0.05 && !isDown) {
          el.scrollLeft -= velocity * 16;
          velocity *= friction;
          animationId = requestAnimationFrame(step);
        } else {
          velocity = 0;
        }
      };
      
      animationId = requestAnimationFrame(step);
    };

    const handleMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      applyInertia();
    };

    const handleMouseLeave = () => {
      if (!isDown) return;
      isDown = false;
      applyInertia();
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="py-24 border-y border-outline-variant bg-background/50">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-4 space-y-2">
            <h2 className="font-display text-lg md:text-xl font-bold text-primary uppercase tracking-wide">
              Built for Businesses That Value Quality
            </h2>
            <p className="font-body text-xs md:text-sm text-secondary">
              Helping industry leaders redefine their digital presence through meticulous craftsmanship.
            </p>
          </div>
          <div 
            ref={containerRef}
            className="lg:col-span-8 flex flex-nowrap items-center gap-16 md:gap-24 overflow-x-auto scrollbar-hide opacity-40 hover:opacity-100 transition-opacity duration-700 cursor-grab active:cursor-grabbing select-none"
          >
            <div className="font-display text-xl md:text-2xl font-bold tracking-widest text-primary hover:text-accent-gold transition-colors cursor-default select-none">
              AUTOMOTIVE
            </div>
            <div className="font-display text-xl md:text-2xl font-bold tracking-[0.25em] text-primary hover:text-accent-gold transition-colors cursor-default select-none">
              HOSPITALITY
            </div>
            <div className="font-display text-xl md:text-2xl font-bold italic text-primary hover:text-accent-gold transition-colors cursor-default select-none">
              HEALTHCARE
            </div>
            <div className="font-display text-xl md:text-2xl font-bold tracking-tighter text-primary hover:text-accent-gold transition-colors cursor-default select-none uppercase">
              TECHNOLOGY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
