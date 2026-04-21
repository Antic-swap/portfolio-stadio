"use client";

import {
  ACCENT_COLORS, TEMPLATES, FONT_STYLES, HEADING_STYLES,
  type PortfolioData, type PortfolioTemplate, type FontStyle, type HeadingStyle,
} from "@/features/portfolio/types";

interface TemplateStepProps {
  data: PortfolioData;
  onChange: (updates: Partial<PortfolioData>) => void;
}

const FONT_CSS: Record<FontStyle, string> = {
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "'Fira Code', 'Consolas', monospace",
  display: "Impact, 'Arial Black', sans-serif",
};

export function TemplateStep({ data, onChange }: TemplateStepProps) {
  return (
    <div className="space-y-6">

      {/* ── Template picker ── */}
      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-3">Template style</label>
        <div className="space-y-2">
          {TEMPLATES.map((t) => {
            const isActive = data.template === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChange({ template: t.id as PortfolioTemplate })}
                className="w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all text-left"
                style={{
                  borderColor: isActive ? "#7c3aed" : "#2d2d4e",
                  background: isActive ? "#1a0f2e" : "#0f0f1a",
                }}
              >
                <div
                  className="w-14 h-10 rounded-lg shrink-0 flex flex-col items-center justify-center gap-1 overflow-hidden"
                  style={{ background: t.bg }}
                >
                  <div className="w-6 h-1.5 rounded-full opacity-90" style={{ background: t.preview }} />
                  <div className="w-8 h-1 rounded-full opacity-50" style={{ background: t.text }} />
                  <div className="w-5 h-1 rounded-full opacity-30" style={{ background: t.text }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{t.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                </div>
                {isActive && (
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Font Style ── */}
      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-3">Font style</label>
        <div className="grid grid-cols-2 gap-2">
          {FONT_STYLES.map((f) => {
            const isActive = data.fontStyle === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onChange({ fontStyle: f.id as FontStyle })}
                className="p-3 rounded-xl border-2 transition-all text-left"
                style={{
                  borderColor: isActive ? "#7c3aed" : "#2d2d4e",
                  background: isActive ? "#1a0f2e" : "#0f0f1a",
                }}
              >
                <p
                  className="text-base font-bold text-white mb-0.5 truncate"
                  style={{ fontFamily: FONT_CSS[f.id] }}
                >
                  {f.preview}
                </p>
                <p className="text-xs font-semibold text-gray-300">{f.label}</p>
                <p className="text-xs text-gray-600">{f.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Heading Style ── */}
      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-3">Heading style</label>
        <div className="grid grid-cols-2 gap-2">
          {HEADING_STYLES.map((h) => {
            const isActive = data.headingStyle === h.id;
            return (
              <button
                key={h.id}
                onClick={() => onChange({ headingStyle: h.id as HeadingStyle })}
                className="p-3 rounded-xl border-2 transition-all text-left"
                style={{
                  borderColor: isActive ? "#7c3aed" : "#2d2d4e",
                  background: isActive ? "#1a0f2e" : "#0f0f1a",
                }}
              >
                {/* Mini preview of heading style */}
                <div className="mb-1.5 h-6 flex items-center">
                  {h.id === "gradient" && (
                    <span className="text-sm font-black" style={{
                      background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>Aa</span>
                  )}
                  {h.id === "normal" && (
                    <span className="text-sm font-black text-white">Aa</span>
                  )}
                  {h.id === "outline" && (
                    <span className="text-sm font-black" style={{
                      WebkitTextStroke: "1px #7c3aed", color: "transparent",
                    }}>Aa</span>
                  )}
                  {h.id === "underline" && (
                    <span className="text-sm font-black text-white border-b-2 border-purple-500">Aa</span>
                  )}
                </div>
                <p className="text-xs font-semibold text-gray-300">{h.label}</p>
                <p className="text-xs text-gray-600">{h.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Accent color ── */}
      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-3">Accent color</label>
        <div className="flex gap-3 flex-wrap">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => onChange({ accentColor: c.value })}
              className="w-10 h-10 rounded-full border-2 transition-all"
              style={{
                backgroundColor: c.value,
                borderColor: data.accentColor === c.value ? "#fff" : "transparent",
                transform: data.accentColor === c.value ? "scale(1.2)" : "scale(1)",
                boxShadow: data.accentColor === c.value ? `0 0 12px ${c.value}88` : "none",
              }}
              title={c.label}
            />
          ))}
        </div>
        {/* Custom hex */}
        <div className="flex gap-2 items-center mt-3">
          <div className="w-8 h-8 rounded-lg border border-[#2d2d4e] shrink-0" style={{ backgroundColor: data.accentColor }} />
          <input
            type="text"
            value={data.accentColor}
            onChange={(e) => { const v = e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange({ accentColor: v }); }}
            placeholder="#7c3aed"
            className="flex-1 bg-[#111120] border border-[#2d2d4e] rounded-xl px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm font-mono"
          />
        </div>
      </div>

    </div>
  );
}
