import React from 'react';
import { 
  FiGlobe, 
  FiLayers, 
  FiRefreshCw, 
  FiZap, 
  FiSearch, 
  FiTarget, 
  FiShield, 
  FiFileText, 
  FiCheck 
} from 'react-icons/fi';

export const ServicesSection = () => {
  const mainServices = [
    {
      icon: <FiGlobe size={32} className="text-primary group-hover:text-accent-gold transition-colors duration-300" />,
      title: "Business Website Development",
      description: "Create professional, responsive websites designed to build trust, showcase your business, and convert visitors into customers.",
      deliverables: [
        "Company Websites",
        "Corporate Websites",
        "Service Business Websites",
        "Portfolio Websites",
        "Landing Pages"
      ]
    },
    {
      icon: <FiLayers size={32} className="text-primary group-hover:text-accent-gold transition-colors duration-300" />,
      title: "UI/UX Design",
      description: "Design intuitive interfaces that improve usability, engagement, and customer experience across every device.",
      deliverables: [
        "Wireframes",
        "High-Fidelity UI",
        "Design Systems",
        "Mobile-First Design",
        "User Experience Optimization"
      ]
    },
    {
      icon: <FiRefreshCw size={32} className="text-primary group-hover:text-accent-gold transition-colors duration-300" />,
      title: "Website Redesign",
      description: "Modernize outdated websites with improved design, performance, accessibility, and conversion-focused user journeys.",
      note: "Suitable for businesses looking to refresh their digital presence."
    },
    {
      icon: <FiZap size={32} className="text-primary group-hover:text-accent-gold transition-colors duration-300" />,
      title: "Performance & Speed Optimization",
      description: "Improve loading speed, Core Web Vitals, mobile responsiveness, and overall website performance to deliver a better user experience.",
      deliverables: [
        "Performance Audits",
        "Image Optimization",
        "Code Optimization",
        "Mobile Performance",
        "Core Web Vitals Improvements"
      ]
    },
    {
      icon: <FiSearch size={32} className="text-primary group-hover:text-accent-gold transition-colors duration-300" />,
      title: "Search & AI Visibility Optimization",
      description: "Help businesses become easier to discover through search engines and emerging AI-powered search experiences.",
      deliverables: [
        "Technical SEO Foundations",
        "On-Page SEO",
        "Structured Data",
        "Local SEO Setup",
        "AI Search Readiness",
        "Answer Engine Optimization (AEO)"
      ]
    },
    {
      icon: <FiTarget size={32} className="text-primary group-hover:text-accent-gold transition-colors duration-300" />,
      title: "Lead Generation Websites",
      description: "Create conversion-focused websites designed to generate enquiries, bookings, and qualified leads.",
      deliverables: [
        "Contact Forms",
        "Appointment Booking",
        "WhatsApp Integration",
        "Lead Capture",
        "CRM Integration Ready"
      ]
    },
    {
      icon: <FiShield size={32} className="text-primary group-hover:text-accent-gold transition-colors duration-300" />,
      title: "Website Maintenance & Support",
      description: "Provide ongoing updates, security improvements, content changes, bug fixes, and performance monitoring after launch."
    },
    {
      icon: <FiFileText size={32} className="text-primary group-hover:text-accent-gold transition-colors duration-300" />,
      title: "Website Audits & Consulting",
      description: "Evaluate existing websites and provide actionable recommendations covering performance, SEO, accessibility, UX, conversion, and technical improvements.",
      deliverables: [
        "Performance",
        "SEO",
        "Accessibility",
        "User Experience",
        "Conversion Optimization",
        "Technical Improvements"
      ]
    }
  ];

  const comingSoonServices = [
    "E-Commerce Development",
    "Custom Web Applications",
    "Client Portals",
    "AI Chatbot Integration",
    "Workflow Automation",
    "Analytics Dashboards",
    "API Integrations"
  ];

  const whyChooseUs = [
    "Human-Centered Design",
    "Fast & Responsive Websites",
    "SEO & AI Search Ready",
    "Mobile-First Development",
    "Conversion-Focused Experiences",
    "Scalable & Maintainable Code",
    "Accessibility Best Practices",
    "Transparent Communication"
  ];

  return (
    <section id="services" className="py-32 md:py-40 bg-surface-container-lowest transition-colors duration-300">
      <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop space-y-24 md:space-y-32">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold block">
              Core Services
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-primary">
              Digital Solutions That Drive Business Growth
            </h2>
          </div>
          <p className="font-body text-sm text-secondary max-w-md pb-2 leading-relaxed">
            We help businesses build stronger digital experiences through strategy, design, development, optimization, and ongoing support.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {mainServices.map((service, index) => (
            <div 
              key={index} 
              className="p-8 md:p-10 border border-outline-variant hover:border-primary transition-all duration-500 group reveal bg-background/30 hover:bg-background shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="mb-8 block">
                  {service.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-4 transition-colors duration-300 group-hover:text-accent-gold">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-secondary leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {service.deliverables && (
                <div className="pt-4 border-t border-outline-variant/50">
                  <span className="block font-body text-[11px] font-semibold uppercase tracking-wider text-primary/80 mb-3">
                    {service.title === "Website Audits & Consulting" ? "Covering:" : service.title === "Lead Generation Websites" ? "Key Features:" : service.title === "Performance & Speed Optimization" || service.title === "Search & AI Visibility Optimization" ? "Includes:" : "Deliverables:"}
                  </span>
                  <ul className="space-y-1.5 font-body text-xs text-secondary">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent-gold/70 inline-block"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.note && (
                <div className="pt-4 border-t border-outline-variant/50 font-body text-xs text-secondary/90 italic">
                  {service.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Why Clients Choose Avyra Section */}
        <div className="pt-12 border-t border-outline-variant">
          <div className="mb-12 space-y-3">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold block">
              The Avyra Advantage
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-primary">
              Why Clients Choose Avyra
            </h2>
            <p className="font-body text-sm text-secondary max-w-xl">
              We focus on delivering measurable business outcomes rather than just technical implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((outcome, index) => (
              <div 
                key={index} 
                className="p-6 border border-outline-variant/70 bg-background/20 flex items-center gap-4 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center text-accent-gold shrink-0">
                  <FiCheck size={16} />
                </div>
                <span className="font-body text-sm font-semibold text-primary">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon / Expanding Our Services Section */}
        <div className="p-8 md:p-12 border border-outline-variant bg-surface-container-low/50 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-outline-variant/60">
            <div className="space-y-2">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold block">
                Future Capabilities
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary">
                Expanding Our Services
              </h2>
            </div>
            <p className="font-body text-xs md:text-sm text-secondary max-w-md leading-relaxed">
              We are continuously evolving our technical capabilities to meet next-generation digital demand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {comingSoonServices.map((csService, index) => (
              <div 
                key={index} 
                className="p-4 border border-outline-variant/40 bg-background/40 flex items-center justify-between gap-3 text-secondary"
              >
                <span className="font-body text-xs font-medium text-primary">
                  {csService}
                </span>
                <span className="font-body text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-surface-container text-secondary/80 border border-outline-variant/30 shrink-0">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
