import React, { useState, useEffect } from 'react';
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
import { getProjects } from '../services/projectService';
import { getTestimonials } from '../services/testimonialService';

export const Home = ({ onOpenLeadModal }) => {
  // Activate CSS animations on viewport scroll
  useScrollReveal();

  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        const [fetchedProjects, fetchedTestimonials] = await Promise.all([
          getProjects(),
          getTestimonials()
        ]);
        console.log("Fetched Projects:", fetchedProjects);
        console.log("Number of Projects:", fetchedProjects.length);
        if (active) {
          setProjects(fetchedProjects);
          console.log("Projects from Sanity:", fetchedProjects);
          setTestimonials(fetchedTestimonials);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <HeroSection onOpenLeadModal={onOpenLeadModal} />
      <TrustSection />
      <ServicesSection />
      <FeaturedWork projects={projects} />
      <PhilosophySection />
      <ProcessSection />
      <Testimonials testimonials={testimonials} />
      <MeetDeveloperSection />
      <CTASection onOpenLeadModal={onOpenLeadModal} />
      <ContactSection />
    </>
  );
};

export default Home;
