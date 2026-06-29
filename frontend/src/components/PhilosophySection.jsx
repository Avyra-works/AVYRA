import React from 'react';

export const PhilosophySection = () => {
  const points = [
    {
      number: "01",
      title: "Human-centered",
      description: "Designing experiences that resonate on an emotional level while solving functional problems."
    },
    {
      number: "02",
      title: "Performance-first",
      description: "Speed and reliability are baked into our DNA. We never compromise on performance."
    },
    {
      number: "03",
      title: "Modern Stack",
      description: "Leveraging the latest technologies to build scalable, future-proof digital assets."
    }
  ];

  return (
    <section id="about" className="py-40 bg-tertiary text-on-tertiary relative overflow-hidden transition-colors duration-300">
      {/* Decorative skewed background panel */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-8">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold block">
              Our Philosophy
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-on-tertiary">
              Boundless creativity. <br /> Thoughtful design.
            </h2>
            <p className="font-body text-base md:text-lg text-on-primary-container leading-relaxed max-w-xl">
              We don't just build websites; we architect digital presence. Every project is a unique dialogue between your vision and our pursuit of excellence.
            </p>
          </div>

          <div className="space-y-16">
            {points.map((point, index) => (
              <div key={index} className="flex gap-8 group reveal">
                <span className="text-accent-gold font-display text-2xl font-bold">
                  {point.number}
                </span>
                <div className="space-y-3">
                  <h4 className="font-display text-xl font-bold text-on-tertiary group-hover:text-accent-gold transition-colors duration-300">
                    {point.title}
                  </h4>
                  <p className="text-on-primary-container font-body text-sm leading-relaxed max-w-lg">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
