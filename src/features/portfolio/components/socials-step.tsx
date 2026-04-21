"use client";

import type { PortfolioData, SocialLink } from "@/features/portfolio/types";

const PLATFORMS: { id: SocialLink["platform"]; label: string; placeholder: string; icon: string }[] = [
  { id: "github", label: "GitHub", placeholder: "https://github.com/username", icon: "⌥" },
  { id: "twitter", label: "X / Twitter", placeholder: "https://x.com/username", icon: "𝕏" },
  { id: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username", icon: "in" },
  { id: "farcaster", label: "Farcaster", placeholder: "https://warpcast.com/username", icon: "⬡" },
  { id: "website", label: "Website", placeholder: "https://yoursite.com", icon: "🌐" },
  { id: "youtube", label: "YouTube", placeholder: "https://youtube.com/@username", icon: "▶" },
  { id: "dribbble", label: "Dribbble", placeholder: "https://dribbble.com/username", icon: "●" },
];

interface SocialsStepProps {
  data: PortfolioData;
  onChange: (updates: Partial<PortfolioData>) => void;
}

export function SocialsStep({ data, onChange }: SocialsStepProps) {
  function getSocialUrl(platform: SocialLink["platform"]): string {
    return data.socials.find((s) => s.platform === platform)?.url ?? "";
  }

  function setSocialUrl(platform: SocialLink["platform"], url: string) {
    const existing = data.socials.filter((s) => s.platform !== platform);
    if (url.trim()) {
      onChange({ socials: [...existing, { platform, url: url.trim() }] });
    } else {
      onChange({ socials: existing });
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Add your social links — leave blank to skip.</p>

      {PLATFORMS.map((p) => (
        <div key={p.id}>
          <label className="flex items-center gap-2 text-sm font-semibold text-purple-300 mb-1.5">
            <span className="w-6 h-6 rounded-md bg-[#1a1a2e] flex items-center justify-center text-xs font-bold text-purple-400 border border-[#2d2d4e]">
              {p.icon}
            </span>
            {p.label}
          </label>
          <input
            type="url"
            value={getSocialUrl(p.id)}
            onChange={(e) => setSocialUrl(p.id, e.target.value)}
            placeholder={p.placeholder}
            className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
        </div>
      ))}
    </div>
  );
}
