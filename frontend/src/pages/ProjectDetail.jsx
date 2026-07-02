import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { getProjectBySlug } from '../services/projectService';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchProject = async () => {
      setLoading(true);
      try {
        const data = await getProjectBySlug(slug);
        if (active) {
          setProject(data);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchProject();
    return () => {
      active = false;
    };
  }, [slug]);

  // Smooth scroll to top on page render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-background text-primary">
        <div className="w-10 h-10 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin mb-4"></div>
        <p className="font-body text-xs uppercase tracking-widest text-secondary font-medium">
          Loading project details...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-background text-primary px-6 text-center space-y-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold">Project Not Found</h2>
        <p className="font-body text-sm text-secondary max-w-md leading-relaxed">
          The project you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/#work" 
          className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-transparent hover:text-primary border border-primary px-8 py-3.5 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300"
        >
          <FiArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  // Fallback calculations for SEO Title & Description
  const seoTitle = project.seoTitle || `${project.title} | Web Design & Development by Avyra`;
  const seoDescription = project.seoDescription || project.shortDescription || project.description || `Read the full case study on ${project.title}. A premium digital experience created by Avyra.`;
  const canonicalUrl = `https://avyra.works/project/${project.slug}`;
  const ogImageUrl = project.desktopImage || project.image || 'https://avyra.works/og-image.png';

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://avyra.works"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://avyra.works/#work"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": canonicalUrl
      }
    ]
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.shortDescription || project.description || seoDescription,
    "url": canonicalUrl,
    "image": ogImageUrl,
    "author": {
      "@type": "Organization",
      "name": "AVYRA",
      "url": "https://avyra.works"
    },
    "creator": {
      "@type": "Organization",
      "name": "AVYRA"
    },
    "keywords": project.technologies ? project.technologies.join(", ") : "",
    "genre": project.category,
    "creativeWorkStatus": project.status
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={ogImageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* Structured Data / JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(creativeWorkSchema)}
        </script>
      </Helmet>

      <section className="py-32 md:py-48 bg-background relative overflow-hidden transition-colors duration-300">
        <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop space-y-16">
          
          {/* Back Navigation Link */}
          <Link 
            to="/#work"
            className="inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-secondary hover:text-accent-gold transition-colors duration-300 group"
          >
            <FiArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left Content (Title, Description, Details) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Category, Status, & Metadata */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-gold">
                  {project.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                <span className="inline-block bg-accent-gold/10 text-accent-gold px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider rounded-full border border-accent-gold/20">
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                {project.title}
              </h1>

              {/* Meta details list */}
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-outline-variant/30 font-body text-xs">
                {project.client && (
                  <div>
                    <h3 className="uppercase tracking-widest text-secondary font-bold mb-1">Client</h3>
                    <p className="text-primary font-semibold">{project.client}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <h3 className="uppercase tracking-widest text-secondary font-bold mb-1">Year</h3>
                    <p className="text-primary font-semibold">{project.year}</p>
                  </div>
                )}
              </div>

              {/* Short description */}
              <p className="font-body text-base md:text-lg text-primary font-medium leading-relaxed italic border-l-2 border-accent-gold pl-4">
                {project.shortDescription}
              </p>

              {/* Detailed Description */}
              {project.description && (
                <p className="font-body text-sm text-secondary leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              )}

              {/* Key Highlights / Technology Tags */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-body text-[10px] uppercase tracking-widest text-secondary font-bold">
                    Key Highlights & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="bg-surface-container text-primary font-body text-xs font-semibold px-3 py-1.5 tracking-wide border border-outline-variant/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action / Link Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-primary text-on-primary hover:bg-transparent hover:text-primary border border-primary px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
                  >
                    View Live Project
                    <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-transparent text-primary hover:bg-primary hover:text-on-primary border border-primary px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
                  >
                    GitHub Codebase
                    <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                {project.behanceUrl && (
                  <a 
                    href={project.behanceUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-transparent text-primary hover:bg-primary hover:text-on-primary border border-primary px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
                  >
                    Behance Case Study
                    <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                {project.figmaUrl && (
                  <a 
                    href={project.figmaUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-transparent text-primary hover:bg-primary hover:text-on-primary border border-primary px-8 py-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
                  >
                    Figma Designs
                    <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Content (Image Showcases) */}
            <div className="lg:col-span-7 space-y-12">
              {/* Primary mockup container */}
              {project.desktopImage && (
                <div className="relative aspect-[16/10] bg-surface-container-high overflow-hidden border border-outline-variant group shadow-lg">
                  <img 
                    src={project.desktopImage} 
                    alt={`${project.title} Desktop Screenshot`}
                    loading="eager"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-[1.015] transition-all duration-700 ease-out" 
                  />
                </div>
              )}

              {/* Mobile mockup container */}
              {project.mobileImage && (
                <div className="flex justify-center md:justify-start">
                  <div className="w-[200px] md:w-[260px] aspect-[9/19] bg-surface-container-high overflow-hidden border border-outline-variant shadow-2xl">
                    <img 
                      src={project.mobileImage} 
                      alt={`${project.title} Mobile Screenshot`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500 ease-out" 
                    />
                  </div>
                </div>
              )}

              {/* Gallery Grid */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  {project.gallery.slice(1).map((imgUrl, gIdx) => (
                    <div 
                      key={gIdx}
                      className="aspect-[4/3] bg-surface-container-high overflow-hidden border border-outline-variant shadow-md"
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${project.title} Gallery Screen ${gIdx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-[1.015] transition-all duration-500 ease-out" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
