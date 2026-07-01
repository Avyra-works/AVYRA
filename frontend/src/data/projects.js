import obsidianDesktop from '../assets/obsidian_desktop.webp';
import obsidianMobile from '../assets/obsidian_mobile.webp';
import anjuDesktop from '../assets/anju_desktop.webp';
import anjuMobile from '../assets/anju_mobile.webp';

export const projects = [
  {
    id: "obsidian-auto-spa",
    featured: true,
    order: 1,
    title: "Obsidian Auto Spa",
    category: "Web Design & Development",
    shortDescription: "A premium automotive detailing website designed to showcase luxury car care services through sophisticated visual design, strong typography, and a refined user experience.",
    description: "Obsidian Auto Spa was created as a high-end digital experience for a premium car detailing and protection studio. Every section was carefully crafted to communicate professionalism, attention to detail, and premium service quality while maintaining excellent responsiveness across all devices.",
    technologies: [
      "Premium Editorial Design",
      "Responsive Across All Devices",
      "Luxury Automotive Branding",
      "Interactive Service Showcase",
      "Custom UI Components",
      "Modern User Experience",
      "Conversion-Focused Layout",
      "Performance Optimized"
    ],
    image: obsidianDesktop,
    gallery: [obsidianMobile],
    liveUrl: "https://obsidian-auto-demo.vercel.app/",
    githubUrl: "",
    behanceUrl: "",
    year: "2024",
    client: "Obsidian Auto Spa",
    status: "Live Project",
    featuredImageAlt: "Obsidian Auto Spa Screenshot",
    slug: "obsidian-auto-spa"
  },
  {
    id: "anju-house-redesign",
    featured: true,
    order: 2,
    title: "Anju House Restaurant Website Redesign",
    category: "UI/UX Redesign • Frontend Development",
    shortDescription: "A premium concept redesign of a Korean family restaurant website focused on improving user experience, online reservations, branding, and customer engagement.",
    description: "Redesigned the complete digital experience of Anju House with a modern luxury aesthetic, immersive visuals, responsive layouts, interactive reservation flow, improved navigation, optimized menu presentation, and a stronger brand identity while preserving the restaurant's Korean family atmosphere and sports-night culture.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "React Router",
      "Responsive Design"
    ],
    image: anjuDesktop,
    gallery: [anjuMobile],
    liveUrl: "https://anju-house-redesign.vercel.app/",
    githubUrl: "",
    behanceUrl: "",
    year: "2024",
    client: "Anju House",
    status: "Website Redesign",
    featuredImageAlt: "Anju House Restaurant Website Redesign Screenshot",
    slug: "anju-house-redesign",
    primaryButtonText: "Live Demo"
  }
];

export default projects;
