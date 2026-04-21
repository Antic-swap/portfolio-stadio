export interface SocialLink {
  platform: "github" | "twitter" | "linkedin" | "website" | "farcaster" | "youtube" | "dribbble";
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  tags: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  period: string;
  description: string;
}

export type PortfolioTemplate = "dark-pro" | "minimal-light" | "cyberpunk" | "ocean" | "sunset" | "forest";
export type FontStyle = "sans" | "serif" | "mono" | "display";
export type HeadingStyle = "normal" | "gradient" | "outline" | "underline";

export interface PortfolioData {
  // Profile
  name: string;
  title: string;
  heroLine: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  location: string;
  email: string;
  // Skills
  skills: string[];
  // Projects
  projects: Project[];
  // Experience
  experience: Experience[];
  // Education
  education: Education[];
  // Social links
  socials: SocialLink[];
  // Theme
  accentColor: string;
  template: PortfolioTemplate;
  fontStyle: FontStyle;
  headingStyle: HeadingStyle;
}

export type BuildStep = "template" | "profile" | "skills" | "experience" | "education" | "projects" | "socials";

export const BUILD_STEPS: BuildStep[] = ["template", "profile", "skills", "experience", "education", "projects", "socials"];

export const STEP_LABELS: Record<BuildStep, string> = {
  template: "Style",
  profile: "Profile",
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  socials: "Socials",
};

export const STEP_EMOJIS: Record<BuildStep, string> = {
  template: "🎨",
  profile: "👤",
  skills: "⚡",
  experience: "💼",
  education: "🎓",
  projects: "🚀",
  socials: "🔗",
};

export const DEFAULT_PORTFOLIO: PortfolioData = {
  name: "",
  title: "",
  heroLine: "",
  bio: "",
  avatarUrl: "",
  bannerUrl: "",
  location: "",
  email: "",
  skills: [],
  projects: [],
  experience: [],
  education: [],
  socials: [],
  accentColor: "#7c3aed",
  template: "dark-pro",
  fontStyle: "sans",
  headingStyle: "gradient",
};

export const FONT_STYLES: { id: FontStyle; label: string; desc: string; preview: string }[] = [
  { id: "sans", label: "Modern Sans", desc: "Clean, contemporary", preview: "Inter" },
  { id: "serif", label: "Classic Serif", desc: "Elegant, editorial", preview: "Georgia" },
  { id: "mono", label: "Developer Mono", desc: "Code-style, techy", preview: "Monospace" },
  { id: "display", label: "Bold Display", desc: "Strong, eye-catching", preview: "Impact" },
];

export const HEADING_STYLES: { id: HeadingStyle; label: string; desc: string }[] = [
  { id: "gradient", label: "Gradient", desc: "Color gradient fill" },
  { id: "normal", label: "Solid White", desc: "Clean solid color" },
  { id: "outline", label: "Outline", desc: "Hollow stroke effect" },
  { id: "underline", label: "Underline", desc: "Accent underline" },
];

export const ACCENT_COLORS = [
  { label: "Purple", value: "#7c3aed" },
  { label: "Blue", value: "#2563eb" },
  { label: "Emerald", value: "#059669" },
  { label: "Rose", value: "#e11d48" },
  { label: "Amber", value: "#d97706" },
  { label: "Cyan", value: "#0891b2" },
  { label: "Pink", value: "#db2777" },
  { label: "Orange", value: "#ea580c" },
];

export const TEMPLATES: { id: PortfolioTemplate; label: string; desc: string; bg: string; text: string; preview: string }[] = [
  {
    id: "dark-pro",
    label: "Dark Pro",
    desc: "Sleek dark background with mesh gradient",
    bg: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1e 50%, #0a0a0f 100%)",
    text: "#ffffff",
    preview: "#7c3aed",
  },
  {
    id: "minimal-light",
    label: "Minimal Light",
    desc: "Clean white, lots of whitespace",
    bg: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    text: "#0f172a",
    preview: "#2563eb",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    desc: "Neon glow on deep black",
    bg: "linear-gradient(135deg, #050510 0%, #0d0d1a 100%)",
    text: "#ffffff",
    preview: "#00f5ff",
  },
  {
    id: "ocean",
    label: "Ocean Deep",
    desc: "Rich navy with teal accents",
    bg: "linear-gradient(135deg, #0c1445 0%, #0a2a4a 50%, #0d1b3e 100%)",
    text: "#e0f2fe",
    preview: "#0ea5e9",
  },
  {
    id: "sunset",
    label: "Sunset",
    desc: "Warm dark tones, orange-pink glow",
    bg: "linear-gradient(135deg, #1a0a0a 0%, #1f0f05 50%, #1a0a12 100%)",
    text: "#fef3c7",
    preview: "#f97316",
  },
  {
    id: "forest",
    label: "Forest",
    desc: "Deep green, earthy & fresh",
    bg: "linear-gradient(135deg, #030f07 0%, #071a0e 50%, #030f07 100%)",
    text: "#d1fae5",
    preview: "#10b981",
  },
];
