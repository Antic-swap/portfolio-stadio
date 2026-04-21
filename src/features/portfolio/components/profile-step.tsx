"use client";

import { useState } from "react";
import { type PortfolioData } from "@/features/portfolio/types";
import { GitHubIcon, LinkedInIcon, XIcon, CheckIcon, SparkleIcon } from "@/features/app/icons";

interface ProfileStepProps {
  data: PortfolioData;
  onChange: (updates: Partial<PortfolioData>) => void;
}

type ImportStatus = "idle" | "loading" | "success" | "error";

interface GitHubUser {
  name: string | null;
  bio: string | null;
  avatar_url: string;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  html_url: string;
}

export function ProfileStep({ data, onChange }: ProfileStepProps) {
  const [githubUsername, setGithubUsername] = useState("");
  const [importStatus, setImportStatus] = useState<ImportStatus>("idle");
  const [importError, setImportError] = useState("");

  async function handleGitHubImport() {
    const username = githubUsername.trim().replace(/^@/, "").replace(/^https?:\/\/github\.com\//i, "").replace(/\/$/, "");
    if (!username) return;

    setImportStatus("loading");
    setImportError("");

    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("User not found — check the username");
        throw new Error("GitHub API error — try again");
      }
      const user: GitHubUser = await res.json();

      const updates: Partial<PortfolioData> = {};
      if (user.name) updates.name = user.name;
      if (user.bio) updates.bio = user.bio;
      if (user.avatar_url) updates.avatarUrl = user.avatar_url;
      if (user.location) updates.location = user.location;

      // Build socials: always add GitHub, add Twitter if present, add website if blog set
      const newSocials = [...data.socials];
      const addIfMissing = (platform: PortfolioData["socials"][0]["platform"], url: string) => {
        if (!newSocials.find((s) => s.platform === platform)) {
          newSocials.push({ platform, url });
        }
      };
      addIfMissing("github", user.html_url);
      if (user.twitter_username) addIfMissing("twitter", `https://x.com/${user.twitter_username}`);
      if (user.blog && user.blog.startsWith("http")) addIfMissing("website", user.blog);
      updates.socials = newSocials;

      onChange(updates);
      setImportStatus("success");
      setTimeout(() => setImportStatus("idle"), 3000);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Something went wrong");
      setImportStatus("error");
      setTimeout(() => setImportStatus("idle"), 4000);
    }
  }

  return (
    <div className="space-y-5">

      {/* ── IMPORT FROM SOCIAL ───────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Auto-fill from</p>
        <div className="space-y-2">

          {/* GitHub — LIVE */}
          <div className="rounded-2xl border border-[#2d2d4e] bg-[#0d0d1a] overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-xl bg-[#1a1a2e] border border-[#2d2d4e] flex items-center justify-center text-white shrink-0">
                <GitHubIcon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">GitHub</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 uppercase tracking-wide">Live</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">Fetch name, bio, avatar, location &amp; socials</p>
              </div>
            </div>
            <div className="px-4 pb-3 flex gap-2">
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGitHubImport()}
                placeholder="your-github-username"
                disabled={importStatus === "loading"}
                className="flex-1 bg-[#111120] border border-[#2d2d4e] rounded-xl px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm disabled:opacity-50"
              />
              <button
                onClick={handleGitHubImport}
                disabled={!githubUsername.trim() || importStatus === "loading"}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: importStatus === "success" ? "rgba(16,185,129,0.15)" : "rgba(139,92,246,0.15)",
                  border: importStatus === "success" ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(139,92,246,0.3)",
                  color: importStatus === "success" ? "#10b981" : "#a78bfa",
                }}
              >
                {importStatus === "loading" ? (
                  <span className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                ) : importStatus === "success" ? (
                  <><CheckIcon size={14} /> Done</>
                ) : (
                  <><SparkleIcon size={14} /> Import</>
                )}
              </button>
            </div>
            {importStatus === "error" && (
              <p className="px-4 pb-3 text-xs text-red-400">{importError}</p>
            )}
            {importStatus === "success" && (
              <p className="px-4 pb-3 text-xs text-green-400">Profile imported successfully — review and edit below</p>
            )}
          </div>

          {/* LinkedIn — Coming Soon */}
          <div className="rounded-2xl border border-[#1e1e32] bg-[#0a0a14] px-4 py-3 flex items-center gap-3 opacity-60">
            <div className="w-8 h-8 rounded-xl bg-[#0a66c2]/10 border border-[#0a66c2]/20 flex items-center justify-center shrink-0">
              <LinkedInIcon size={16} className="text-[#0a66c2]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-400">LinkedIn</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500/80 border border-yellow-500/20 uppercase tracking-wide">Coming Soon</span>
              </div>
              <p className="text-xs text-gray-700 mt-0.5">Auto-fill from your LinkedIn profile</p>
            </div>
          </div>

          {/* X — Coming Soon */}
          <div className="rounded-2xl border border-[#1e1e32] bg-[#0a0a14] px-4 py-3 flex items-center gap-3 opacity-60">
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <XIcon size={15} className="text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-400">X (Twitter)</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500/80 border border-yellow-500/20 uppercase tracking-wide">Coming Soon</span>
              </div>
              <p className="text-xs text-gray-700 mt-0.5">Auto-fill from your X profile</p>
            </div>
          </div>

        </div>
      </div>

      <div className="h-px bg-[#1e1e32]" />

      {/* ── MANUAL FIELDS ────────────────────────────────────────── */}

      {/* Banner */}
      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-1.5">
          Hero Banner
          <span className="text-gray-600 font-normal ml-1">— full-width background image</span>
        </label>
        {data.bannerUrl && (
          <div className="relative mb-2 rounded-xl overflow-hidden h-20 border border-[#2d2d4e]">
            <img
              src={data.bannerUrl}
              alt="Banner preview"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={() => onChange({ bannerUrl: "" })}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-content-center hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              ×
            </button>
          </div>
        )}
        <input
          type="url"
          value={data.bannerUrl}
          onChange={(e) => onChange({ bannerUrl: e.target.value })}
          placeholder="https://images.unsplash.com/..."
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
        <p className="text-xs text-gray-600 mt-1">Tip: unsplash.com has free high-quality images</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-1.5">Full Name *</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Alex Johnson"
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-1.5">Title / Role *</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Full-Stack Developer"
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-1.5">
          Hero Tagline
          <span className="text-gray-600 font-normal ml-1">— bold line under your name</span>
        </label>
        <input
          type="text"
          value={data.heroLine}
          onChange={(e) => onChange({ heroLine: e.target.value })}
          placeholder="I build things for the internet"
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-1.5">Bio</label>
        <textarea
          value={data.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="I build beautiful web apps and love open source..."
          rows={3}
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-purple-300 mb-1.5">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="San Francisco, CA"
            className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-purple-300 mb-1.5">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="hello@you.com"
            className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-1.5">Avatar URL</label>
        <div className="flex gap-2 items-center">
          {data.avatarUrl && (
            <img
              src={data.avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-[#2d2d4e] shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          )}
          <input
            type="url"
            value={data.avatarUrl}
            onChange={(e) => onChange({ avatarUrl: e.target.value })}
            placeholder="https://github.com/yourname.png"
            className="flex-1 bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">Tip: github.com/USERNAME.png works great</p>
      </div>

    </div>
  );
}
