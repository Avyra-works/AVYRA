/**
 * Environment configuration and validation module.
 * Validates that all required environment variables exist.
 * Logs a warning instead of crashing the application if any are missing.
 */

const requiredEnvVars = [
  'VITE_SANITY_PROJECT_ID',
  'VITE_SANITY_DATASET',
  'VITE_SANITY_API_VERSION',
];

export const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    console.warn(
      `[Avyra CMS Warning]: Missing required environment variable(s): ${missing.join(', ')}. Please check your .env configuration. The application will fall back to local mock data where appropriate.`
    );
  }
};

// Auto-run validation upon import
validateEnv();

export const env = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || '',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01',
};

export default env;
