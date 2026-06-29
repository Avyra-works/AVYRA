/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fbf9f9",
        primary: "#000000",
        secondary: "#5d5f5f",
        "accent-gold": "#C9A227",
        "on-background": "#1b1c1c",
        "on-secondary": "#ffffff",
        "on-primary": "#ffffff",
        "surface-container-low": "#f5f3f3",
        "surface-container": "#efeded",
        "surface-container-high": "#e9e8e7",
        "surface-container-highest": "#e3e2e2",
        "outline-variant": "#c4c7c7",
        "outline": "#747878",
        "tertiary": "#000000",
        "on-tertiary": "#ffffff",
        "on-primary-container": "#858383",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Hanken Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      spacing: {
        "margin-desktop": "80px",
        "margin-tablet": "40px",
        "margin-mobile": "24px",
        "gutter": "32px",
        "unit": "8px",
      },
      maxWidth: {
        "container-max-width": "1440px",
      },
    },
  },
  plugins: [],
}
