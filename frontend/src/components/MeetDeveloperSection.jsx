import React from 'react';

export const MeetDeveloperSection = () => {
  const pillars = [
    {
      title: "Research & Strategy",
      description: "Understanding goals, audiences, and opportunities before design begins.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <circle cx="12" cy="12" r="9" className="opacity-30" />
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="1" x2="12" y2="23" />
          <line x1="1" y1="12" x2="23" y2="12" />
        </svg>
      )
    },
    {
      title: "Thoughtful Design",
      description: "Creating clean, user-focused experiences that feel intuitive and professional.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <rect x="3" y="3" width="18" height="18" rx="2" className="opacity-30" />
          <circle cx="12" cy="12" r="5" />
          <line x1="3" y1="12" x2="21" y2="12" strokeDasharray="2 2" className="opacity-50" />
          <line x1="12" y1="3" x2="12" y2="21" strokeDasharray="2 2" className="opacity-50" />
        </svg>
      )
    },
    {
      title: "Reliable Development",
      description: "Building fast, responsive, and scalable websites using modern technologies.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
          <line x1="2" y1="12" x2="22" y2="12" strokeDasharray="2 2" className="opacity-30" />
        </svg>
      )
    },
    {
      title: "Long-Term Value",
      description: "Delivering solutions that remain effective beyond launch day.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M12 2L2 12l10 10 10-10L12 2z" className="opacity-30" />
          <path d="M12 6L6 12l6 6 6-6-6-6z" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <section id="team" className="py-40 bg-background transition-colors duration-300 border-t border-outline-variant/30">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-gutter items-start">
          
          {/* Left Column: Editorial Brand Heading and Content */}
          <div className="col-span-12 lg:col-span-5 space-y-8 lg:sticky lg:top-32 reveal">
            <div className="space-y-4">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold block">
                The Philosophy
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-primary tracking-tight">
                The Philosophy <br />Behind Avyra
              </h2>
              <p className="font-display text-lg md:text-xl text-secondary italic font-light leading-relaxed">
                Building Digital Experiences Without Boundaries
              </p>
            </div>
            
            <div className="w-16 h-[1.5px] bg-accent-gold/40"></div>
            
            <div className="font-body text-base text-secondary leading-relaxed space-y-6 max-w-xl">
              <p>
                Avyra was founded on a simple belief: great digital experiences are created through thoughtful design, reliable development, and attention to detail.
              </p>
              <p>
                Every project is approached with a focus on clarity, usability, performance, and long-term value. Rather than following trends, we focus on creating websites and digital experiences that genuinely serve businesses and their audiences.
              </p>
              <p>
                Whether it's a portfolio, business website, landing page, or custom digital experience, our goal remains the same — deliver work that is purposeful, refined, and built to last.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Supporting Pillar Cards */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <div 
                  key={index} 
                  className="bg-surface-container-low/20 border border-outline-variant/40 p-8 md:p-10 flex flex-col justify-between hover:border-accent-gold hover:bg-background transition-all duration-500 ease-out group reveal"
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div>
                    {/* SVG Graphic Element */}
                    <div className="w-12 h-12 mb-8 text-secondary group-hover:text-accent-gold transition-colors duration-500">
                      {pillar.icon}
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-display text-lg font-bold text-primary mb-3 group-hover:text-accent-gold transition-colors duration-500">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MeetDeveloperSection;
