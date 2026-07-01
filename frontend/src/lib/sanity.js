import { createClient } from '@sanity/client';
import env from '../config/env';

export const client = createClient({
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: env.apiVersion,
  useCdn: true, // Enable CDN caching for fast loading
});

export default client;
