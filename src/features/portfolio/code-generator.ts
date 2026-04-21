import type { PortfolioData, SocialLink, PortfolioTemplate, FontStyle, HeadingStyle } from "./types";

function socialIconSvg(platform: SocialLink["platform"]): string {
  const icons: Record<string, string> = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    website: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    farcaster: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.24.24H5.76A5.76 5.76 0 0 0 0 6v12a5.76 5.76 0 0 0 5.76 5.76h12.48A5.76 5.76 0 0 0 24 18V6A5.76 5.76 0 0 0 18.24.24zm.816 17.166h-1.68v-5.25a2.154 2.154 0 0 0-2.154-2.154 2.154 2.154 0 0 0-2.154 2.154v5.25h-1.68V9.234H12.9v.826a3.648 3.648 0 0 1 2.322-.826 3.834 3.834 0 0 1 3.834 3.834v4.338zM9.402 9.234H7.722v8.172h1.68V9.234zm-.84-3.024a1.008 1.008 0 1 0 0 2.016 1.008 1.008 0 0 0 0-2.016z"/></svg>`,
    youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    dribbble: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.4 1.73 1.35 3.92 2.165 6.29 2.165 1.42 0 2.77-.29 4-.814zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.18zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.477 0-.946.03-1.4.09zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/></svg>`,
  };
  return icons[platform] ?? "";
}

const FONT_FAMILIES: Record<FontStyle, string> = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  serif: "'Playfair Display', Georgia, 'Times New Roman', Times, serif",
  mono: "'Fira Code', 'JetBrains Mono', 'Consolas', 'Courier New', monospace",
  display: "'Oswald', Impact, 'Arial Black', sans-serif",
};

const FONT_IMPORTS: Record<FontStyle, string> = {
  sans: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');",
  serif: "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');",
  mono: "@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;600;800&display=swap');",
  display: "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');",
};

interface TemplateVars {
  bg: string;
  bgAlt: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderHover: string;
  text: string;
  textMuted: string;
  textFaint: string;
  meshA: string;
  meshB: string;
  meshC: string;
  navBg: string;
  isDark: boolean;
}

function getTemplateVars(template: PortfolioTemplate, accent: string): TemplateVars {
  const map: Record<PortfolioTemplate, TemplateVars> = {
    "dark-pro": {
      bg: "#080810",
      bgAlt: "#0d0d18",
      surface: "rgba(255,255,255,0.04)",
      surfaceHover: "rgba(255,255,255,0.07)",
      border: "rgba(255,255,255,0.07)",
      borderHover: accent,
      text: "#f1f5f9",
      textMuted: "#94a3b8",
      textFaint: "#334155",
      meshA: accent,
      meshB: accent,
      meshC: "#6366f1",
      navBg: "rgba(8,8,16,0.85)",
      isDark: true,
    },
    "minimal-light": {
      bg: "#fafafa",
      bgAlt: "#f1f5f9",
      surface: "rgba(0,0,0,0.03)",
      surfaceHover: "rgba(0,0,0,0.055)",
      border: "rgba(0,0,0,0.09)",
      borderHover: accent,
      text: "#0f172a",
      textMuted: "#475569",
      textFaint: "#cbd5e1",
      meshA: accent,
      meshB: accent,
      meshC: accent,
      navBg: "rgba(250,250,250,0.88)",
      isDark: false,
    },
    "cyberpunk": {
      bg: "#04040e",
      bgAlt: "#08080f",
      surface: "rgba(0,245,255,0.04)",
      surfaceHover: "rgba(0,245,255,0.08)",
      border: "rgba(0,245,255,0.12)",
      borderHover: "#00f5ff",
      text: "#e0f7ff",
      textMuted: "#7ecfdb",
      textFaint: "#1e4a52",
      meshA: "#00f5ff",
      meshB: "#a855f7",
      meshC: "#ec4899",
      navBg: "rgba(4,4,14,0.92)",
      isDark: true,
    },
    "ocean": {
      bg: "#060d20",
      bgAlt: "#0c1535",
      surface: "rgba(56,189,248,0.05)",
      surfaceHover: "rgba(56,189,248,0.09)",
      border: "rgba(56,189,248,0.11)",
      borderHover: "#38bdf8",
      text: "#e0f2fe",
      textMuted: "#7dd3fc",
      textFaint: "#164e63",
      meshA: "#38bdf8",
      meshB: "#0ea5e9",
      meshC: "#6366f1",
      navBg: "rgba(6,13,32,0.88)",
      isDark: true,
    },
    "sunset": {
      bg: "#0f0508",
      bgAlt: "#180a0c",
      surface: "rgba(249,115,22,0.05)",
      surfaceHover: "rgba(249,115,22,0.09)",
      border: "rgba(249,115,22,0.12)",
      borderHover: "#fb923c",
      text: "#fef3c7",
      textMuted: "#fbbf24",
      textFaint: "#451a03",
      meshA: "#f97316",
      meshB: "#ec4899",
      meshC: "#f59e0b",
      navBg: "rgba(15,5,8,0.88)",
      isDark: true,
    },
    "forest": {
      bg: "#030a05",
      bgAlt: "#050f07",
      surface: "rgba(16,185,129,0.05)",
      surfaceHover: "rgba(16,185,129,0.09)",
      border: "rgba(16,185,129,0.12)",
      borderHover: "#10b981",
      text: "#d1fae5",
      textMuted: "#6ee7b7",
      textFaint: "#064e3b",
      meshA: "#10b981",
      meshB: "#059669",
      meshC: "#34d399",
      navBg: "rgba(3,10,5,0.88)",
      isDark: true,
    },
  };
  return map[template];
}

function getHeadingCSS(headingStyle: HeadingStyle, accent: string, t: TemplateVars): string {
  if (headingStyle === "gradient") return `
    .hero-name {
      background: linear-gradient(135deg, ${t.text} 0%, ${accent} 60%, ${t.meshC} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }`;
  if (headingStyle === "outline") return `
    .hero-name {
      -webkit-text-stroke: 2px ${accent};
      color: transparent !important;
      -webkit-text-fill-color: transparent;
    }`;
  if (headingStyle === "underline") return `
    .hero-name {
      color: ${t.text};
      position: relative;
      display: inline-block;
    }
    .hero-name::after {
      content: '';
      position: absolute;
      bottom: -6px; left: 0;
      width: 100%; height: 4px;
      background: linear-gradient(90deg, ${accent}, transparent);
      border-radius: 2px;
    }`;
  return `.hero-name { color: ${t.text}; }`;
}

export function generatePortfolioHTML(data: PortfolioData): string {
  const {
    name, title, heroLine, bio, avatarUrl, bannerUrl,
    location, email, skills, projects, experience, education,
    socials, accentColor, template, fontStyle, headingStyle,
  } = data;

  const t = getTemplateVars(template, accentColor);
  const fontFamily = FONT_FAMILIES[fontStyle ?? "sans"];
  const fontImport = FONT_IMPORTS[fontStyle ?? "sans"];

  // ── NAV LINKS ──────────────────────────────────────────────────────────────
  const navItems = [
    { id: "hero", label: "Home" },
    skills.length > 0 ? { id: "skills", label: "Skills" } : null,
    experience.length > 0 ? { id: "experience", label: "Experience" } : null,
    (education ?? []).length > 0 ? { id: "education", label: "Education" } : null,
    projects.length > 0 ? { id: "projects", label: "Projects" } : null,
    socials.length > 0 || email ? { id: "contact", label: "Contact" } : null,
  ].filter(Boolean) as { id: string; label: string }[];

  const navHtml = navItems
    .map((item) => `<a href="#${item.id}" class="nav-link">${item.label}</a>`)
    .join("");

  // ── HERO SOCIALS ───────────────────────────────────────────────────────────
  const socialsHtml = socials
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-pill" title="${s.platform}">${socialIconSvg(s.platform)}<span>${s.platform}</span></a>`)
    .join("");

  // ── CONTACT SOCIALS (footer) ───────────────────────────────────────────────
  const contactSocialsHtml = socials
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="contact-social" title="${s.platform}">${socialIconSvg(s.platform)}</a>`)
    .join("");

  // ── AVATAR ─────────────────────────────────────────────────────────────────
  const avatarHtml = avatarUrl
    ? `<div class="avatar-ring"><img src="${avatarUrl}" alt="${name}" class="avatar" /></div>`
    : `<div class="avatar-ring"><div class="avatar-initial">${name ? name[0].toUpperCase() : "?"}</div></div>`;

  // ── SKILLS ─────────────────────────────────────────────────────────────────
  const skillsHtml = skills
    .map((s, i) => `<span class="skill-tag reveal" style="--delay:${(i % 8) * 0.06}s">${s}</span>`)
    .join("");

  // ── EXPERIENCE ─────────────────────────────────────────────────────────────
  const experienceHtml = experience
    .map((exp, i) => `
    <div class="tl-item reveal" style="--delay:${i * 0.1}s">
      <div class="tl-marker">
        <div class="tl-dot"></div>
        ${i < experience.length - 1 ? '<div class="tl-line"></div>' : ""}
      </div>
      <div class="tl-body">
        <div class="tl-header">
          <span class="tl-role">${exp.role}</span>
          ${exp.period ? `<span class="tl-period">${exp.period}</span>` : ""}
        </div>
        <p class="tl-company">${exp.company}</p>
        ${exp.description ? `<p class="tl-desc">${exp.description}</p>` : ""}
      </div>
    </div>`)
    .join("");

  // ── EDUCATION ──────────────────────────────────────────────────────────────
  const educationHtml = (education ?? [])
    .map((edu, i) => `
    <div class="edu-card reveal" style="--delay:${i * 0.1}s">
      <div class="edu-badge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      </div>
      <div class="edu-info">
        <p class="edu-school">${edu.school}</p>
        <p class="edu-degree">${edu.degree}${edu.field ? ` &middot; ${edu.field}` : ""}</p>
        ${edu.period ? `<p class="edu-period">${edu.period}</p>` : ""}
        ${edu.description ? `<p class="edu-desc">${edu.description}</p>` : ""}
      </div>
    </div>`)
    .join("");

  // ── PROJECTS ───────────────────────────────────────────────────────────────
  const projectsHtml = projects
    .map((p, i) => {
      const tagsHtml = p.tags.length
        ? `<div class="proj-tags">${p.tags.map((tag) => `<span class="proj-tag">${tag}</span>`).join("")}</div>`
        : "";
      const imgHtml = p.imageUrl
        ? `<div class="proj-img"><img src="${p.imageUrl}" alt="${p.title}" loading="lazy" /></div>`
        : "";
      const inner = `
        ${imgHtml}
        <div class="proj-content">
          <div class="proj-top">
            <h3 class="proj-title">${p.title}</h3>
            ${p.url ? `<span class="proj-arrow">&#8599;</span>` : ""}
          </div>
          ${p.description ? `<p class="proj-desc">${p.description}</p>` : ""}
          ${tagsHtml}
        </div>`;
      return p.url
        ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="proj-card reveal" style="--delay:${i * 0.08}s">${inner}</a>`
        : `<div class="proj-card reveal" style="--delay:${i * 0.08}s">${inner}</div>`;
    })
    .join("");

  // ── BANNER ─────────────────────────────────────────────────────────────────
  const bannerHtml = bannerUrl
    ? `<div class="site-banner"><img src="${bannerUrl}" alt="Banner" /><div class="banner-grad"></div></div>`
    : "";

  // ── CTA BUTTONS ────────────────────────────────────────────────────────────
  const githubLink = socials.find((s) => s.platform === "github");
  const ctaHtml = `
    <div class="hero-cta">
      ${email ? `<a href="mailto:${email}" class="btn-primary">Get in Touch</a>` : ""}
      ${githubLink ? `<a href="${githubLink.url}" target="_blank" rel="noopener noreferrer" class="btn-ghost">${socialIconSvg("github")} GitHub</a>` : ""}
    </div>`;

  // ── STATS / META PILLS ─────────────────────────────────────────────────────
  const metaItems = [
    location ? `<span class="meta-pill"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><path d="M8 1.5a4 4 0 0 1 4 4c0 2.5-4 9-4 9s-4-6.5-4-9a4 4 0 0 1 4-4Z"/><circle cx="8" cy="5.5" r="1.25"/></svg>${location}</span>` : "",
    experience.length > 0 ? `<span class="meta-pill"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><rect x="1.5" y="5.5" width="13" height="9" rx="1.5"/><path d="M5.5 5.5V4a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 10.5 4v1.5"/></svg>${experience.length} Role${experience.length !== 1 ? "s" : ""}</span>` : "",
    projects.length > 0 ? `<span class="meta-pill"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><path d="M1.5 4.5a1 1 0 0 1 1-1h3.25L7 5h7a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5Z"/></svg>${projects.length} Project${projects.length !== 1 ? "s" : ""}</span>` : "",
  ].filter(Boolean).join("");

  // ── CONTACT SECTION ────────────────────────────────────────────────────────
  const contactHtml = `
  <section id="contact" class="section">
    <div class="section-label reveal">
      <span class="label-line"></span>
      <span class="label-text">Let&rsquo;s Work Together</span>
      <span class="label-line"></span>
    </div>
    <div class="contact-box reveal">
      <h2 class="contact-heading">${email ? "Say Hello" : "Connect"}</h2>
      <p class="contact-sub">${heroLine || bio || "Open to opportunities, collaborations, and interesting conversations."}</p>
      <div class="contact-actions">
        ${email ? `<a href="mailto:${email}" class="btn-primary-lg">Send a message</a>` : ""}
        ${contactSocialsHtml ? `<div class="contact-socials">${contactSocialsHtml}</div>` : ""}
      </div>
    </div>
  </section>`;

  // ── TEMPLATE-SPECIFIC EXTRAS ───────────────────────────────────────────────
  const cyberpunkExtras = template === "cyberpunk" ? `
    .hero-name { text-shadow: 0 0 40px ${accentColor}55; }
    .section-heading::after { box-shadow: 0 0 12px ${accentColor}; }
    .proj-card:hover { box-shadow: 0 0 30px ${accentColor}22, inset 0 0 30px ${accentColor}05; }
    .tl-dot { box-shadow: 0 0 12px #00f5ff, 0 0 24px #00f5ff44; }
    .nav-link::after { box-shadow: 0 0 8px ${accentColor}; }
    body::after {
      content: '';
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image:
        linear-gradient(${accentColor}06 1px, transparent 1px),
        linear-gradient(90deg, ${accentColor}06 1px, transparent 1px);
      background-size: 60px 60px;
    }` : "";

  const forestExtras = template === "forest" ? `
    .tl-dot { box-shadow: 0 0 10px #10b981, 0 0 20px #10b98144; }
    .proj-card:hover { box-shadow: 0 12px 40px rgba(16,185,129,0.18); }
    .skill-tag:hover { box-shadow: 0 4px 15px rgba(16,185,129,0.2); }` : "";

  const sunsetExtras = template === "sunset" ? `
    .hero::before {
      background: radial-gradient(ellipse 80% 60% at 50% 0%, #f9731618 0%, transparent 70%),
                  radial-gradient(ellipse 60% 40% at 0% 50%, #ec489918 0%, transparent 60%);
    }` : "";

  const lightExtras = template === "minimal-light" ? `
    .proj-card { box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
    .proj-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
    .contact-box { background: ${t.bgAlt}; }
    .nav-bar { border-bottom: 1px solid ${t.border}; }` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name || "Portfolio"}</title>
  <meta name="description" content="${bio || title || `${name}'s portfolio`}" />
  <meta property="og:title" content="${name || "Portfolio"}" />
  <meta property="og:description" content="${bio || title || `${name}'s portfolio`}" />
  ${avatarUrl ? `<meta property="og:image" content="${avatarUrl}" />` : ""}
  <style>
${fontImport}

/* ─── RESET & BASE ───────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: ${fontFamily};
  background: ${t.bg};
  color: ${t.text};
  min-height: 100vh;
  line-height: 1.65;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ─── CUSTOM PROPERTIES ──────────────────────────────────── */
:root {
  --accent: ${accentColor};
  --bg: ${t.bg};
  --bg-alt: ${t.bgAlt};
  --surface: ${t.surface};
  --surface-hover: ${t.surfaceHover};
  --border: ${t.border};
  --text: ${t.text};
  --text-muted: ${t.textMuted};
  --text-faint: ${t.textFaint};
  --mesh-a: ${t.meshA};
  --mesh-b: ${t.meshB};
  --mesh-c: ${t.meshC};
}

/* ─── MESH BACKGROUND ────────────────────────────────────── */
.bg-mesh {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 100% 55% at 50% -10%, ${t.meshA}20 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 90% 15%, ${t.meshB}12 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 5% 75%, ${t.meshC}0d 0%, transparent 55%),
    radial-gradient(ellipse 70% 60% at 50% 110%, ${t.meshA}10 0%, transparent 60%);
}

/* ─── NAV ────────────────────────────────────────────────── */
.nav-bar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem; height: 60px;
  background: ${t.navBg};
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid ${t.border};
  transition: box-shadow 0.3s;
}
.nav-bar.scrolled { box-shadow: 0 4px 30px rgba(0,0,0,0.25); }
.nav-brand {
  font-weight: 800; font-size: 1rem;
  color: ${t.text};
  text-decoration: none; letter-spacing: -0.01em;
}
.nav-brand span { color: var(--accent); }
.nav-links {
  display: flex; gap: 0.25rem; align-items: center;
  list-style: none;
}
.nav-link {
  font-size: 0.85rem; font-weight: 500;
  color: ${t.textMuted};
  text-decoration: none; padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  transition: color 0.2s, background 0.2s;
  position: relative;
}
.nav-link:hover { color: ${t.text}; background: ${t.surface}; }
.nav-link.active { color: var(--accent); }
.nav-cta {
  font-size: 0.82rem; font-weight: 700;
  color: #fff; background: var(--accent);
  text-decoration: none; padding: 0.4rem 1rem;
  border-radius: 9999px;
  transition: opacity 0.2s, transform 0.2s;
}
.nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }
.nav-mobile-btn { display: none; background: none; border: none; cursor: pointer; color: ${t.text}; }
@media(max-width:640px) {
  .nav-links { display: none; }
  .nav-mobile-btn { display: flex; }
}

/* ─── PAGE WRAPPER ───────────────────────────────────────── */
.page {
  position: relative; z-index: 1;
  padding-top: 60px;
}

/* ─── BANNER ─────────────────────────────────────────────── */
.site-banner {
  position: relative; width: 100%; height: 340px; overflow: hidden;
}
.site-banner img { width: 100%; height: 100%; object-fit: cover; display: block; }
.banner-grad {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, ${t.bg} 100%);
}

/* ─── HERO ───────────────────────────────────────────────── */
#hero {
  padding: ${bannerUrl ? "3rem 2rem 4rem" : "5rem 2rem 4rem"};
  position: relative;
}
#hero::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
}
.hero-inner {
  max-width: 900px; margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  align-items: center;
}
@media(max-width: 640px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-avatar-col { display: flex; justify-content: center; }
  .meta-pills, .social-pills, .hero-cta { justify-content: center; }
}

.hero-avatar-col { display: flex; flex-direction: column; align-items: center; gap: 1rem; }

.avatar-ring {
  width: 130px; height: 130px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 30%, transparent));
  display: inline-flex;
  flex-shrink: 0;
}
.avatar, .avatar-initial {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: flex; align-items: center; justify-content: center;
  background: ${t.bgAlt};
  border: 3px solid ${t.bg};
}
.avatar-initial {
  font-size: 2.8rem; font-weight: 900;
  color: var(--accent);
}

/* social icons under avatar */
.avatar-socials {
  display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;
}
.avatar-social {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  background: ${t.surface}; border: 1px solid ${t.border};
  color: ${t.textMuted}; text-decoration: none;
  transition: color 0.2s, border-color 0.2s, transform 0.2s;
}
.avatar-social:hover { color: var(--accent); border-color: var(--accent); transform: translateY(-2px); }

.hero-text-col { display: flex; flex-direction: column; gap: 0.75rem; }

.hero-label {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
  padding: 0.3rem 0.85rem; border-radius: 9999px;
  width: fit-content;
}
.hero-label::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.hero-name {
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0;
}
${getHeadingCSS(headingStyle ?? "gradient", accentColor, t)}

.hero-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: ${t.textMuted};
  letter-spacing: 0.01em;
}

.hero-line {
  font-size: 1rem;
  color: ${t.textMuted};
  font-weight: 500;
  max-width: 500px;
}

.hero-bio {
  font-size: 0.93rem;
  color: color-mix(in srgb, ${t.textMuted} 80%, transparent);
  max-width: 500px;
  line-height: 1.75;
}

.meta-pills {
  display: flex; flex-wrap: wrap; gap: 0.5rem;
}
.meta-pill {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.78rem; font-weight: 500;
  color: ${t.textMuted};
  background: ${t.surface};
  border: 1px solid ${t.border};
  padding: 0.28rem 0.8rem; border-radius: 9999px;
}

.social-pills { display: none; } /* moved to avatar column */

.hero-cta {
  display: flex; flex-wrap: wrap; gap: 0.65rem;
}
.btn-primary, .btn-ghost {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 9999px;
  font-size: 0.9rem; font-weight: 700;
  text-decoration: none; cursor: pointer;
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
  will-change: transform;
}
.btn-primary {
  background: var(--accent); color: #fff;
  box-shadow: 0 4px 20px color-mix(in srgb, var(--accent) 40%, transparent);
  position: relative; overflow: hidden;
}
.btn-primary::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.btn-primary:hover::after { transform: translateX(100%); }
.btn-primary:hover { opacity: 0.92; transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 32px color-mix(in srgb, var(--accent) 55%, transparent); }
.btn-ghost {
  background: ${t.surface}; color: ${t.text};
  border: 1.5px solid ${t.border};
}
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-3px) scale(1.02); }

/* ─── SECTION LAYOUT ─────────────────────────────────────── */
.section {
  padding: 4rem 2rem;
  max-width: 900px; margin: 0 auto;
}
.section-inner {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 3rem;
  align-items: start;
}
@media(max-width: 700px) {
  .section-inner { grid-template-columns: 1fr; gap: 1.5rem; }
}
.section-sidebar { padding-top: 0.2rem; }
.section-label {
  display: inline-flex; align-items: center; gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.label-line { display: none; }
.label-text {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--accent);
}
.section-heading {
  font-size: 1.5rem;
  font-weight: 900; letter-spacing: -0.02em;
  color: ${t.text};
  margin-bottom: 0.4rem;
  line-height: 1.2;
}
.section-sub {
  font-size: 0.875rem; color: ${t.textMuted};
  margin-bottom: 0; line-height: 1.6;
}
.section-body { min-width: 0; }

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
  transition-delay: var(--delay, 0s);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* stagger children of a reveal-group */
.reveal-group > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1);
}
.reveal-group.visible > *:nth-child(1) { opacity:1; transform:none; transition-delay:0.05s; }
.reveal-group.visible > *:nth-child(2) { opacity:1; transform:none; transition-delay:0.12s; }
.reveal-group.visible > *:nth-child(3) { opacity:1; transform:none; transition-delay:0.19s; }
.reveal-group.visible > *:nth-child(4) { opacity:1; transform:none; transition-delay:0.26s; }
.reveal-group.visible > *:nth-child(5) { opacity:1; transform:none; transition-delay:0.33s; }
.reveal-group.visible > *:nth-child(6) { opacity:1; transform:none; transition-delay:0.40s; }
.reveal-group.visible > *:nth-child(n+7) { opacity:1; transform:none; transition-delay:0.46s; }

/* ─── SKILLS ─────────────────────────────────────────────── */
.skills-cloud {
  display: flex; flex-wrap: wrap; gap: 0.65rem;
}
.skill-tag {
  font-size: 0.875rem; font-weight: 600;
  color: ${t.text};
  background: ${t.surface};
  border: 1px solid ${t.border};
  padding: 0.45rem 1rem; border-radius: 9999px;
  transition: color 0.22s ease, border-color 0.22s ease, background 0.22s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
  cursor: default;
}
.skill-tag:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 20%, transparent);
}

/* ─── TIMELINE ───────────────────────────────────────────── */
.timeline { display: flex; flex-direction: column; }
.tl-item {
  display: flex; gap: 1.5rem;
  position: relative;
}
.tl-marker {
  display: flex; flex-direction: column; align-items: center;
  padding-top: 0.35rem; width: 18px; flex-shrink: 0;
}
.tl-dot {
  width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
  background: var(--accent);
  box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 60%, transparent);
  border: 2px solid ${t.bg};
  z-index: 1;
}
.tl-line {
  width: 2px; flex: 1; min-height: 32px;
  background: linear-gradient(to bottom, var(--accent), ${t.border});
  margin-top: 4px;
  opacity: 0.4;
}
.tl-body { flex: 1; padding-bottom: 2rem; }
.tl-item:last-child .tl-body { padding-bottom: 0; }
.tl-header {
  display: flex; align-items: baseline;
  justify-content: space-between; gap: 1rem; flex-wrap: wrap;
  margin-bottom: 0.25rem;
}
.tl-role { font-size: 1.1rem; font-weight: 800; color: ${t.text}; }
.tl-period {
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
  padding: 0.15rem 0.6rem; border-radius: 9999px;
  white-space: nowrap;
}
.tl-company { font-size: 0.92rem; font-weight: 600; color: ${t.textMuted}; margin-bottom: 0.5rem; }
.tl-desc { font-size: 0.9rem; color: color-mix(in srgb, ${t.textMuted} 80%, transparent); line-height: 1.7; }

/* ─── EDUCATION ──────────────────────────────────────────── */
.edu-grid { display: grid; gap: 1rem; }
.edu-card {
  display: flex; gap: 1.25rem; align-items: flex-start;
  background: ${t.surface}; border: 1px solid ${t.border};
  border-radius: 16px; padding: 1.5rem;
  transition: border-color 0.2s, transform 0.2s;
}
.edu-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.edu-badge {
  width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  color: var(--accent);
}
.edu-info { flex: 1; }
.edu-school { font-size: 1rem; font-weight: 800; color: ${t.text}; }
.edu-degree { font-size: 0.87rem; font-weight: 600; color: var(--accent); margin-top: 2px; }
.edu-period { font-size: 0.78rem; color: ${t.textMuted}; margin-top: 3px; }
.edu-desc { font-size: 0.87rem; color: color-mix(in srgb, ${t.textMuted} 80%, transparent); margin-top: 0.5rem; line-height: 1.6; }

/* ─── PROJECTS ───────────────────────────────────────────── */
.proj-grid {
  display: grid; gap: 1.25rem;
  grid-template-columns: 1fr;
}
@media(min-width:560px) { .proj-grid { grid-template-columns: 1fr 1fr; } }
@media(min-width:900px) { .proj-grid { grid-template-columns: repeat(3, 1fr); } }

.proj-card {
  background: ${t.surface};
  border: 1px solid ${t.border};
  border-radius: 18px;
  overflow: hidden;
  display: flex; flex-direction: column;
  text-decoration: none; color: inherit;
  transition: border-color 0.25s ease, transform 0.35s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.35s ease, background 0.25s ease;
  will-change: transform;
}
.proj-card:hover {
  border-color: var(--accent);
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 20px 56px color-mix(in srgb, var(--accent) 18%, rgba(0,0,0,0.35));
  background: ${t.surfaceHover};
}
.proj-img { height: 160px; overflow: hidden; flex-shrink: 0; }
.proj-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.proj-card:hover .proj-img img { transform: scale(1.06); }
.proj-content { padding: 1.25rem; flex: 1; display: flex; flex-direction: column; gap: 0.6rem; }
.proj-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem; }
.proj-title { font-size: 1rem; font-weight: 800; color: ${t.text}; line-height: 1.3; }
.proj-arrow {
  font-size: 1.2rem; color: var(--accent); flex-shrink: 0;
  opacity: 0; transform: translate(-4px, 4px);
  transition: opacity 0.2s, transform 0.2s;
}
.proj-card:hover .proj-arrow { opacity: 1; transform: translate(0, 0); }
.proj-desc { font-size: 0.87rem; color: ${t.textMuted}; line-height: 1.6; flex: 1; }
.proj-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: auto; }
.proj-tag {
  font-size: 0.75rem; font-weight: 700;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border-radius: 4px; padding: 0.15rem 0.5rem;
}

/* ─── CONTACT ────────────────────────────────────────────── */
.contact-box {
  background: ${t.surface};
  border: 1px solid ${t.border};
  border-radius: 24px;
  padding: 3rem 2.5rem;
  text-align: center;
  max-width: 640px; margin: 0 auto;
  transition: border-color 0.3s;
}
.contact-box:hover { border-color: color-mix(in srgb, var(--accent) 40%, ${t.border}); }
.contact-heading {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900; letter-spacing: -0.02em;
  color: ${t.text}; margin-bottom: 0.75rem;
}
.contact-sub {
  font-size: 1rem; color: ${t.textMuted};
  max-width: 420px; margin: 0 auto 2.5rem; line-height: 1.7;
}
.contact-actions {
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
}
.btn-primary-lg {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.9rem 2.5rem;
  background: var(--accent); color: #fff;
  font-size: 1rem; font-weight: 700;
  text-decoration: none; border-radius: 9999px;
  box-shadow: 0 6px 28px color-mix(in srgb, var(--accent) 45%, transparent);
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
}
.btn-primary-lg:hover {
  opacity: 0.88; transform: translateY(-3px);
  box-shadow: 0 12px 36px color-mix(in srgb, var(--accent) 55%, transparent);
}
.contact-socials {
  display: flex; gap: 0.75rem; align-items: center;
}
.contact-social {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  background: ${t.surface}; border: 1px solid ${t.border};
  color: ${t.textMuted}; text-decoration: none;
  transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
}
.contact-social:hover {
  color: var(--accent); border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  transform: translateY(-3px);
}

/* ─── FOOTER ─────────────────────────────────────────────── */
.site-footer {
  text-align: center;
  padding: 3rem 2rem;
  border-top: 1px solid ${t.border};
  color: color-mix(in srgb, ${t.textMuted} 50%, transparent);
  font-size: 0.82rem;
}
.site-footer a { color: var(--accent); text-decoration: none; }
.site-footer a:hover { text-decoration: underline; }

/* ─── SECTION DIVIDER ────────────────────────────────────── */
.section-divider {
  height: 1px; max-width: 900px; margin: 0 auto;
  background: linear-gradient(90deg, transparent, ${t.border}, transparent);
}

/* ─── RESPONSIVE ─────────────────────────────────────────── */
@media(max-width:480px) {
  #hero { padding: 3.5rem 1.25rem 3rem; }
  .section { padding: 2.5rem 1.25rem; }
  .contact-box { padding: 2rem 1.25rem; }
  .nav-bar { padding: 0 1.25rem; }
}

/* ─── TEMPLATE EXTRAS ────────────────────────────────────── */
${cyberpunkExtras}
${forestExtras}
${sunsetExtras}
${lightExtras}
  </style>
</head>
<body>
  <div class="bg-mesh" aria-hidden="true"></div>

  <!-- Navigation -->
  <nav class="nav-bar" id="navbar">
    <a href="#hero" class="nav-brand">${name || "Portfolio"}<span>.</span></a>
    <div class="nav-links">
      ${navHtml}
    </div>
    ${email ? `<a href="mailto:${email}" class="nav-cta">Hire Me</a>` : ""}
  </nav>

  <div class="page">
    ${bannerHtml}

    <!-- Hero -->
    <section id="hero">
      <div class="hero-inner">
        <!-- Left: avatar + socials -->
        <div class="hero-avatar-col reveal" style="--delay:0s">
          ${avatarHtml}
          ${socialsHtml ? `<div class="avatar-socials">${socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="avatar-social" title="${s.platform}">${socialIconSvg(s.platform)}</a>`).join("")}</div>` : ""}
        </div>
        <!-- Right: text -->
        <div class="hero-text-col">
          ${title ? `<p class="hero-label reveal" style="--delay:0.05s">${title}</p>` : ""}
          <h1 class="hero-name reveal" style="--delay:0.08s">${name || "Your Name"}</h1>
          ${heroLine ? `<p class="hero-line reveal" style="--delay:0.12s">${heroLine}</p>` : ""}
          ${bio ? `<p class="hero-bio reveal" style="--delay:0.15s">${bio}</p>` : ""}
          ${metaItems ? `<div class="meta-pills reveal" style="--delay:0.18s">${metaItems}</div>` : ""}
          ${(email || githubLink) ? `<div class="hero-cta reveal" style="--delay:0.22s">${email ? `<a href="mailto:${email}" class="btn-primary">Get in Touch</a>` : ""}${githubLink ? `<a href="${githubLink.url}" target="_blank" rel="noopener noreferrer" class="btn-ghost">${socialIconSvg("github")} GitHub</a>` : ""}</div>` : ""}
        </div>
      </div>
    </section>

    ${skills.length ? `
    <div class="section-divider"></div>
    <section id="skills" class="section">
      <div class="section-inner">
        <div class="section-sidebar reveal" style="--delay:0s">
          <div class="section-label"><span class="label-text">Skills</span></div>
          <h2 class="section-heading">Skills &amp; Tools</h2>
          <p class="section-sub">Technologies I work with every day.</p>
        </div>
        <div class="section-body">
          <div class="skills-cloud reveal-group">${skillsHtml}</div>
        </div>
      </div>
    </section>` : ""}

    ${experience.length ? `
    <div class="section-divider"></div>
    <section id="experience" class="section">
      <div class="section-inner">
        <div class="section-sidebar reveal" style="--delay:0s">
          <div class="section-label"><span class="label-text">Career</span></div>
          <h2 class="section-heading">Experience</h2>
          <p class="section-sub">Where I&rsquo;ve worked and what I&rsquo;ve built.</p>
        </div>
        <div class="section-body">
          <div class="timeline">${experienceHtml}</div>
        </div>
      </div>
    </section>` : ""}

    ${(education ?? []).length ? `
    <div class="section-divider"></div>
    <section id="education" class="section">
      <div class="section-inner">
        <div class="section-sidebar reveal" style="--delay:0s">
          <div class="section-label"><span class="label-text">Background</span></div>
          <h2 class="section-heading">Education</h2>
          <p class="section-sub">The foundations I built on.</p>
        </div>
        <div class="section-body">
          <div class="edu-grid">${educationHtml}</div>
        </div>
      </div>
    </section>` : ""}

    ${projects.length ? `
    <div class="section-divider"></div>
    <section id="projects" class="section">
      <div class="section-inner">
        <div class="section-sidebar reveal" style="--delay:0s">
          <div class="section-label"><span class="label-text">Work</span></div>
          <h2 class="section-heading">Projects</h2>
          <p class="section-sub">Things I&rsquo;ve built that I&rsquo;m proud of.</p>
        </div>
        <div class="section-body">
          <div class="proj-grid reveal-group">${projectsHtml}</div>
        </div>
      </div>
    </section>` : ""}

    <div class="section-divider"></div>
    ${contactHtml}
  </div>

  <footer class="site-footer">
    <p>Crafted by ${name || "me"} &middot; Built with <a href="#">Portfolio Studio</a> &middot; ${new Date().getFullYear()}</p>
  </footer>

  <script>
    // ── PAGE LOAD ENTRANCE ──────────────────────────────────
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.45s ease';
    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
    });
    // Fallback if load already fired
    if (document.readyState === 'complete') document.body.style.opacity = '1';

    // ── SCROLL REVEAL ───────────────────────────────────────
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -36px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-group').forEach((el) => revealObserver.observe(el));

    // ── STICKY NAV SHADOW ───────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // ── ACTIVE NAV LINK ─────────────────────────────────────
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('active'));
            const active = document.querySelector('.nav-link[href="#' + e.target.id + '"]');
            if (active) active.classList.add('active');
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((s) => activeObserver.observe(s));

    // ── SMOOTH SCROLL FOR NAV LINKS ─────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        const target = href && href !== '#' ? document.querySelector(href) : null;
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 68;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    // ── BUTTON PRESS EFFECT ─────────────────────────────────
    document.querySelectorAll('.btn-primary, .btn-ghost, .btn-primary-lg').forEach((btn) => {
      btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.97)'; });
      btn.addEventListener('mouseup', () => { btn.style.transform = ''; });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    // ── CURSOR ACCENT GLOW (desktop only) ───────────────────
    if (window.matchMedia('(pointer: fine)').matches) {
      const glow = document.createElement('div');
      glow.style.cssText = [
        'position:fixed', 'pointer-events:none', 'z-index:9999',
        'width:320px', 'height:320px', 'border-radius:50%',
        'transform:translate(-50%,-50%)',
        'background:radial-gradient(circle, ' + getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() + '0d 0%, transparent 70%)',
        'transition:left 0.18s ease, top 0.18s ease, opacity 0.3s ease',
        'opacity:0', 'left:-9999px', 'top:-9999px',
      ].join(';');
      document.body.appendChild(glow);
      let glowVisible = false;
      window.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        if (!glowVisible) { glow.style.opacity = '1'; glowVisible = true; }
      }, { passive: true });
      window.addEventListener('mouseleave', () => { glow.style.opacity = '0'; glowVisible = false; });
    }

    // ── TILT ON PROJECT CARDS (desktop only) ────────────────
    if (window.matchMedia('(pointer: fine)').matches) {
      document.querySelectorAll('.proj-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = 'translateY(-6px) rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 5) + 'deg) scale(1.01)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }
  </script>
</body>
</html>`;
}
