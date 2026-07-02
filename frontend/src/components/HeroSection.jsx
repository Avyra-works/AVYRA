import React from 'react';

export const HeroSection = React.memo(({ onOpenLeadModal }) => {
  const handleScrollToWork = (e) => {
    e.preventDefault();
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-48 pb-32 hero-gradient min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop grid grid-cols-12 gap-y-12 md:gap-x-gutter items-center w-full z-10">
        <div className="col-span-12 md:col-span-10 lg:col-span-9 space-y-8">
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-accent-gold block animate-fade-in">
            DIGITAL CRAFTSMANSHIP
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] text-primary tracking-tight animate-fade-in delay-100">
            Building Digital Experiences <br /> 
            <span className="text-accent-gold">Without Boundaries.</span>
          </h1>
          <p className="font-body text-base md:text-lg text-secondary max-w-2xl leading-relaxed animate-fade-in delay-200">
            We design and develop digital experiences that help ambitious businesses build credibility, connect with customers, and grow with confidence.
          </p>
          <div className="flex flex-wrap gap-6 items-center pt-4 animate-fade-in delay-300">
            <button 
              onClick={onOpenLeadModal}
              className="bg-primary text-on-primary px-10 py-5 font-body text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md"
            >
              Start Your Project
            </button>
            <a 
              href="#work" 
              onClick={handleScrollToWork}
              className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold border-b border-accent-gold/30 hover:border-accent-gold pb-1 transition-all duration-300"
            >
              Explore Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
