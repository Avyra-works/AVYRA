import imageUrlBuilder from '@sanity/image-url';
import client from './sanity';

const builder = imageUrlBuilder(client);

/**
 * Returns a builder to start chained image manipulations.
 * @param {object} source - The Sanity image asset source.
 * @returns {object} The image builder object.
 */
export const urlFor = (source) => {
  return builder.image(source);
};

/**
 * Helper to construct responsive image attributes (src, srcSet, sizes) for optimal and responsive loading.
 * @param {object} source - The Sanity image asset source.
 * @param {object} options - Custom options such as custom widths, quality, and sizes.
 * @returns {object} Object with src, srcSet, and sizes attributes.
 */
export const getResponsiveImageAttrs = (source, options = {}) => {
  if (!source) {
    return { src: '', srcSet: '', sizes: '' };
  }

  const quality = options.quality || 80;
  const widths = options.widths || [320, 480, 768, 1024, 1200, 1600];
  
  // Base image url
  const baseBuilder = builder.image(source).quality(quality).auto('format');
  const src = baseBuilder.width(widths[Math.floor(widths.length / 2)]).url();

  // Create srcSet URLs for each width
  const srcSet = widths
    .map((w) => `${builder.image(source).width(w).quality(quality).auto('format').url()} ${w}w`)
    .join(', ');

  const sizes = options.sizes || '(max-width: 768px) 100vw, 50vw';

  return {
    src,
    srcSet,
    sizes,
  };
};
