import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import HeroSection from '../components/HeroSection';
import TrustSection from '../components/TrustSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedWork from '../components/FeaturedWork';
import PhilosophySection from '../components/PhilosophySection';
import ProcessSection from '../components/ProcessSection';
import Testimonials from '../components/Testimonials';
import MeetDeveloperSection from '../components/MeetDeveloperSection';
import ContactSection from '../components/ContactSection';
import CTASection from '../components/CTASection';

export const Home = ({ onOpenLeadModal }) => {
  // Activate CSS animations on viewport scroll
  useScrollReveal();

  return (
    <>
      <HeroSection onOpenLeadModal={onOpenLeadModal} />
      <TrustSection />
      <ServicesSection />
      <FeaturedWork />
      <PhilosophySection />
      <ProcessSection />
      <Testimonials />
      <MeetDeveloperSection />
      <CTASection onOpenLeadModal={onOpenLeadModal} />
      <ContactSection />
    </>
  );
};

export default Home;
