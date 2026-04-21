"use client";

import type { PortfolioData, FontStyle, HeadingStyle } from "@/features/portfolio/types";
import { TEMPLATES } from "@/features/portfolio/types";

const FONT_CSS: Record<FontStyle, string> = {
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "'Fira Code', 'Consolas', monospace",
  display: "Impact, 'Arial Black', sans-serif",
};

interface PortfolioPreviewProps {
  data: PortfolioData;
}

const SOCIAL_ICONS: Record<string, string> = {
  github: "G",
  twitter: "𝕏",
  linkedin: "in",
  farcaster: "⬡",
  website: "🌐",
  youtube: "▶",
  dribbble: "●",
};

export function PortfolioPreview({ data }: PortfolioPreviewProps) {
  const accent = data.accentColor || "#7c3aed";
  const tpl = TEMPLATES.find((t) => t.id === data.template) ?? TEMPLATES[0];
  const isDark = data.template !== "minimal-light";
  const isForest = data.template === "forest";
  const textColor = isDark ? "#ffffff" : "#0f172a";
  const mutedColor = isDark ? "#94a3b8" : "#64748b";
  const cardBg = isForest ? "rgba(16,185,129,0.06)" : isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const cardBorder = isForest ? "rgba(16,185,129,0.18)" : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tagBg = isDark ? `${accent}22` : `${accent}18`;
  const fontFamily = FONT_CSS[data.fontStyle ?? "sans"];

  function headingStyle(text: string): React.ReactNode {
    const hs: HeadingStyle = data.headingStyle ?? "gradient";
    if (hs === "gradient") return (
      <span style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{text}</span>
    );
    if (hs === "outline") return (
      <span style={{ WebkitTextStroke: `1.5px ${accent}`, color: "transparent" }}>{text}</span>
    );
    if (hs === "underline") return (
      <span style={{ color: textColor, borderBottom: `3px solid ${accent}`, paddingBottom: "2px" }}>{text}</span>
    );
    return <span style={{ color: textColor }}>{text}</span>;
  }

  const hasContent = data.name || data.title || data.bio || data.skills.length > 0 || data.projects.length > 0;

  if (!hasContent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <div className="text-5xl mb-4">👁️</div>
        <p className="text-gray-400 text-sm">Fill in the Build tab to see your portfolio live here.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        background: tpl.bg,
        borderColor: cardBorder,
        fontFamily,
      }}
    >
      {/* Banner */}
      {data.bannerUrl && (
        <div className="relative h-28 overflow-hidden">
          <img src={data.bannerUrl} alt="Banner" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
        </div>
      )}

      {/* Mesh overlay for dark templates */}
      {isDark && !data.bannerUrl && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${accent}22 0%, transparent 70%)` }}
        />
      )}

      <div className="relative">
        {/* Hero Section */}
        <div className={`flex flex-col items-center text-center px-6 pb-6 gap-3 ${data.bannerUrl ? "pt-4 -mt-10 relative z-10" : "pt-8"}`}>
          {/* Avatar */}
          {data.avatarUrl ? (
            <img
              src={data.avatarUrl}
              alt={data.name}
              className="w-20 h-20 rounded-full object-cover"
              style={{ border: `3px solid ${accent}`, boxShadow: `0 0 20px ${accent}44` }}
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black"
              style={{
                border: `3px solid ${accent}`,
                background: isDark ? "#1a1a2e" : "#f1f5f9",
                color: accent,
                boxShadow: `0 0 20px ${accent}33`,
              }}
            >
              {data.name ? data.name[0].toUpperCase() : "?"}
            </div>
          )}

          {/* Name */}
          {data.name && (
            <h1 className="text-2xl font-black leading-tight" style={{ color: textColor }}>
              {data.name}
            </h1>
          )}

          {/* Title badge */}
          {data.title && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}
            >
              {data.title}
            </span>
          )}

          {/* Hero line */}
          {data.heroLine && (
            <p className="text-sm font-semibold max-w-[300px] leading-relaxed" style={{ color: mutedColor }}>
              {data.heroLine}
            </p>
          )}

          {/* Bio */}
          {data.bio && (
            <p className="text-xs max-w-[280px] leading-relaxed" style={{ color: mutedColor }}>
              {data.bio}
            </p>
          )}

          {/* Location + Email */}
          {(data.location || data.email) && (
            <div className="flex flex-wrap gap-3 justify-center">
              {data.location && (
                <span className="flex items-center gap-1 text-xs" style={{ color: mutedColor }}>
                  📍 {data.location}
                </span>
              )}
              {data.email && (
                <span className="flex items-center gap-1 text-xs" style={{ color: accent }}>
                  ✉️ {data.email}
                </span>
              )}
            </div>
          )}

          {/* Socials */}
          {data.socials.length > 0 && (
            <div className="flex gap-2 mt-1">
              {data.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-110"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                    color: mutedColor,
                  }}
                  title={s.platform}
                >
                  {SOCIAL_ICONS[s.platform] ?? "?"}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px mx-6" style={{ background: cardBorder }} />

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="px-6 py-5">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}`, color: textColor }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <>
            <div className="h-px mx-6" style={{ background: cardBorder }} />
            <div className="px-6 py-5">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="flex gap-3">
                    <div
                      className="w-1.5 rounded-full shrink-0 mt-1"
                      style={{ background: `${accent}66`, minHeight: "40px" }}
                    />
                    <div>
                      <p className="text-sm font-bold" style={{ color: textColor }}>{exp.role}</p>
                      <p className="text-xs font-semibold" style={{ color: accent }}>{exp.company}</p>
                      {exp.period && <p className="text-xs mt-0.5" style={{ color: mutedColor }}>{exp.period}</p>}
                      {exp.description && <p className="text-xs mt-1 leading-relaxed" style={{ color: mutedColor }}>{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <>
            <div className="h-px mx-6" style={{ background: cardBorder }} />
            <div className="px-6 py-5">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-base mt-0.5"
                      style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}>
                      🎓
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: textColor }}>{edu.school}</p>
                      <p className="text-xs font-semibold" style={{ color: accent }}>
                        {edu.degree}{edu.field ? ` · ${edu.field}` : ""}
                      </p>
                      {edu.period && <p className="text-xs mt-0.5" style={{ color: mutedColor }}>{edu.period}</p>}
                      {edu.description && <p className="text-xs mt-1 leading-relaxed" style={{ color: mutedColor }}>{edu.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <>
            <div className="h-px mx-6" style={{ background: cardBorder }} />
            <div className="px-6 py-5">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl overflow-hidden transition-all"
                    style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                  >
                    {/* Project image */}
                    {p.imageUrl && (
                      <div className="h-28 overflow-hidden">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                    )}
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold" style={{ color: textColor }}>{p.title}</span>
                        {p.url && <span className="text-xs font-bold" style={{ color: accent }}>↗</span>}
                      </div>
                      {p.description && (
                        <p className="text-xs leading-relaxed mb-2 line-clamp-2" style={{ color: mutedColor }}>{p.description}</p>
                      )}
                      {p.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {p.tags.map((t) => (
                            <span key={t} className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ color: accent, background: tagBg }}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-6 py-4 text-center">
          <p className="text-xs" style={{ color: isDark ? "#334155" : "#cbd5e1" }}>
            Built with Portfolio Studio
          </p>
        </div>
      </div>
    </div>
  );
}
