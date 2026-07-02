import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Avyra | Web Design & Development Studio</title>
        <meta name="description" content="Avyra creates modern websites and digital experiences through thoughtful design, reliable development, and user-focused solutions." />
        <link rel="canonical" href="https://avyra.works/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://avyra.works/" />
        <meta property="og:title" content="Avyra | Web Design & Development Studio" />
        <meta property="og:description" content="Avyra creates modern websites and digital experiences through thoughtful design, reliable development, and user-focused solutions." />
        <meta property="og:image" content="https://avyra.works/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://avyra.works/" />
        <meta name="twitter:title" content="Avyra | Web Design & Development Studio" />
        <meta name="twitter:description" content="Avyra creates modern websites and digital experiences through thoughtful design, reliable development, and user-focused solutions." />
        <meta name="twitter:image" content="https://avyra.works/og-image.png" />
      </Helmet>

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

