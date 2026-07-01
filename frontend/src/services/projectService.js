import client from '../lib/sanity';
import { urlFor, getResponsiveImageAttrs } from '../lib/imageUrl';

/**
 * Maps a raw projected Sanity document to the project structure expected by the application,
 * resolving images, responsive loading attributes, and button labels.
 */
const mapProject = (raw) => {
  if (!raw) return null;

  // Resolve cover image src
  const coverImageSrc = raw.coverImage ? urlFor(raw.coverImage).url() : '';
  
  // Resolve mobile mockup image src: try dedicated mobileImage field first, fallback to first gallery image
  const rawMobileImage = raw.mobileImage || (raw.galleryImages && raw.galleryImages[0]);
  const mobileImageSrc = rawMobileImage ? urlFor(rawMobileImage).url() : '';

  // Resolve gallery image srcs for backward compatibility
  const galleryUrls = raw.galleryImages ? raw.galleryImages.map(img => urlFor(img).url()) : [];

  // Generate responsive image attributes for performance optimization
  const coverImageAttrs = getResponsiveImageAttrs(raw.coverImage, {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px',
  });
  
  const mobileImageAttrs = rawMobileImage
    ? getResponsiveImageAttrs(rawMobileImage, { sizes: '(max-width: 768px) 130px, 170px' })
    : { src: '', srcSet: '', sizes: '' };

  const primaryButtonText = raw.slug === 'anju-house-redesign' ? 'Live Demo' : 'View Live Project';

  return {
    // --- Step 4 Required Fields ---
    title: raw.title || '',
    slug: raw.slug || '',
    featured: raw.featured ?? false,
    order: raw.order ?? 999,
    category: raw.category || '',
    client: raw.client || '',
    year: raw.year || '',
    status: raw.status || 'Completed',
    shortDescription: raw.shortDescription || '',
    description: raw.description || '',
    technologies: raw.technologies || [],
    coverImage: raw.coverImage || null,
    galleryImages: raw.galleryImages || [],
    liveUrl: raw.liveUrl || '',
    githubUrl: raw.githubUrl || '',
    behanceUrl: raw.behanceUrl || '',
    figmaUrl: raw.figmaUrl || '',
    seoTitle: raw.seoTitle || '',
    seoDescription: raw.seoDescription || '',
    altText: raw.altText || '',

    // --- Component-Compatibility Fields ---
    id: raw.slug || '',
    statusBadge: raw.status || 'Completed',
    detailedDescription: raw.description || '',
    highlights: raw.technologies || [],
    desktopImage: coverImageSrc,
    mobileImage: mobileImageSrc,
    image: coverImageSrc,
    gallery: galleryUrls,
    url: raw.liveUrl || '',
    primaryButtonText: primaryButtonText,

    // --- Responsive Image Attributes ---
    coverImageAttrs,
    mobileImageAttrs,
  };
};

// Base GROQ projection query for Projects
const PROJECT_PROJECTION = `{
  title,
  "slug": slug.current,
  featured,
  order,
  category,
  client,
  year,
  status,
  shortDescription,
  description,
  technologies,
  "coverImage": image,
  "mobileImage": mobileImage,
  "galleryImages": gallery,
  liveUrl,
  githubUrl,
  behanceUrl,
  figmaUrl,
  seoTitle,
  seoDescription,
  "altText": featuredImageAlt
}`;

/**
 * Fetches all projects from Sanity, ordered by display order.
 * Falls back to an empty array on error.
 */
export const getProjects = async () => {
  try {
    const query = `*[_type == "project"] | order(order asc) ${PROJECT_PROJECTION}`;
    const rawProjects = await client.fetch(query);
    return Array.isArray(rawProjects) ? rawProjects.map(mapProject) : [];
  } catch (error) {
    console.error('[Avyra CMS Error]: Failed to fetch projects:', error);
    return [];
  }
};

/**
 * Fetches featured projects from Sanity, filtered and sorted ascending by display order.
 * Falls back to an empty array on error.
 */
export const getFeaturedProjects = async () => {
  try {
    const query = `*[_type == "project" && featured == true] | order(order asc) ${PROJECT_PROJECTION}`;
    const rawProjects = await client.fetch(query);
    return Array.isArray(rawProjects) ? rawProjects.map(mapProject) : [];
  } catch (error) {
    console.error('[Avyra CMS Error]: Failed to fetch featured projects:', error);
    return [];
  }
};

/**
 * Fetches a single project by its slug.
 * Falls back to null on error or not found.
 */
export const getProjectBySlug = async (slug) => {
  if (!slug) return null;
  try {
    const query = `*[_type == "project" && slug.current == $slug][0] ${PROJECT_PROJECTION}`;
    const rawProject = await client.fetch(query, { slug });
    return rawProject ? mapProject(rawProject) : null;
  } catch (error) {
    console.error(`[Avyra CMS Error]: Failed to fetch project for slug "${slug}":`, error);
    return null;
  }
};
