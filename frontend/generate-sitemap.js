import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load env variables from .env file (for local development)
const loadEnv = () => {
  const envPath = path.resolve(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        process.env[key] = value;
      }
    });
  }
};

loadEnv();

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'r3i7pnrw';
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2025-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN to get the freshest data at build time
});

const generateSitemap = async () => {
  console.log('Generating sitemap.xml...');
  
  let projects = [];
  try {
    const query = `*[_type == "project"] { "slug": slug.current, _updatedAt }`;
    projects = await client.fetch(query);
    console.log(`Fetched ${projects.length} projects from Sanity CMS.`);
  } catch (error) {
    console.error('Error fetching projects from Sanity:', error);
  }

  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://avyra.works/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://avyra.works/#services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://avyra.works/#about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://avyra.works/#contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

  projects.forEach(project => {
    if (project.slug) {
      const lastMod = project._updatedAt ? project._updatedAt.split('T')[0] : currentDate;
      xml += `
  <url>
    <loc>https://avyra.works/project/${project.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  });

  xml += '\n</urlset>';

  const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`Sitemap written successfully to: ${sitemapPath}`);
};

generateSitemap();
