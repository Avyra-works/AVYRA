import React from 'react';

export const ProcessSection = React.memo(() => {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description: "In-depth strategy sessions to uncover your true brand potential."
    },
    {
      number: "02",
      title: "Design",
      description: "Translating strategy into high-fidelity, high-impact visual systems."
    },
    {
      number: "03",
      title: "Develop",
      description: "Precision engineering to bring the vision to life with flawless execution."
    },
    {
      number: "04",
      title: "Launch",
      description: "Deployment, optimization, and scaling for long-term success."
    }
  ];

  return (
    <section className="py-40 bg-background transition-colors duration-300">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop">
        <div className="text-center mb-24 space-y-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary">
            How we work
          </h2>
          <div className="w-20 h-1 bg-accent-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center p-8 reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="block text-accent-gold font-display text-5xl font-bold mb-6 select-none">
                {step.number}
              </span>
              <h3 className="font-body text-sm font-bold uppercase tracking-widest text-primary mb-4">
                {step.title}
              </h3>
              <p className="font-body text-sm text-secondary leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ProcessSection;
