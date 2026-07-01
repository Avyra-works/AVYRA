import client from '../lib/sanity';
import { urlFor } from '../lib/imageUrl';

/**
 * Maps a raw projected Sanity document to the testimonial structure expected by the application.
 */
const mapTestimonial = (raw) => {
  if (!raw) return null;

  return {
    // --- Step 4 Required Fields ---
    name: raw.name || '',
    company: raw.company || '',
    designation: raw.designation || '',
    image: raw.image ? urlFor(raw.image).url() : '',
    rating: raw.rating || 5,
    review: raw.review || '',
    project: raw.project || '',
    featured: raw.featured ?? false,
    order: raw.order ?? 999,

    // --- Component-Compatibility Fields ---
    id: raw._id || raw.name || '',
  };
};

// Base GROQ projection query for Testimonials
const TESTIMONIAL_PROJECTION = `{
  name,
  company,
  designation,
  image,
  rating,
  review,
  project,
  featured,
  order
}`;

/**
 * Fetches all testimonials from Sanity, ordered by display order.
 * Falls back to an empty array on error.
 */
export const getTestimonials = async () => {
  try {
    const query = `*[_type == "testimonial"] | order(order asc) ${TESTIMONIAL_PROJECTION}`;
    const rawTestimonials = await client.fetch(query);
    return Array.isArray(rawTestimonials) ? rawTestimonials.map(mapTestimonial) : [];
  } catch (error) {
    console.error('[Avyra CMS Error]: Failed to fetch testimonials:', error);
    return [];
  }
};

/**
 * Fetches featured testimonials from Sanity, filtered and sorted ascending by display order.
 * Falls back to an empty array on error.
 */
export const getFeaturedTestimonials = async () => {
  try {
    const query = `*[_type == "testimonial" && featured == true] | order(order asc) ${TESTIMONIAL_PROJECTION}`;
    const rawTestimonials = await client.fetch(query);
    return Array.isArray(rawTestimonials) ? rawTestimonials.map(mapTestimonial) : [];
  } catch (error) {
    console.error('[Avyra CMS Error]: Failed to fetch featured testimonials:', error);
    return [];
  }
};
