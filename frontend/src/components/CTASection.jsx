import React from 'react';

export const CTASection = ({ onOpenLeadModal }) => {
  return (
    <section className="py-64 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop text-center relative z-10 space-y-12">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-primary">
          Let's build something <br /> 
          <span className="italic font-normal text-secondary">exceptional.</span>
        </h2>
        <div className="reveal pt-4">
          <button 
            onClick={onOpenLeadModal}
            className="bg-primary text-on-primary px-16 py-6 font-body text-xs font-bold uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-95 transition-all duration-500 shadow-xl"
          >
            Start your project
          </button>
        </div>
      </div>

      {/* Abstract background grid elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[1px] bg-outline-variant/35 rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[1px] bg-outline-variant/35 -rotate-12"></div>
      </div>
    </section>
  );
};

export default CTASection;
