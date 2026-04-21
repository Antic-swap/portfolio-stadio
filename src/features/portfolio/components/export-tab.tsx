"use client";

import { useState } from "react";
import { generatePortfolioHTML } from "@/features/portfolio/code-generator";
import type { PortfolioData } from "@/features/portfolio/types";
import { ShareButton } from "@/neynar-farcaster-sdk/mini";
import { GitHubIcon, NetlifyIcon, GlobeIcon, CodeIcon, CopyIcon, DownloadIcon, CheckIcon } from "@/features/app/icons";

interface ExportTabProps {
  data: PortfolioData;
}

type DeployOption = "github" | "netlify" | "domain" | "code";

const OPTIONS: { id: DeployOption; Icon: React.FC<{ size?: number; className?: string }>; label: string; desc: string }[] = [
  { id: "github",  Icon: GitHubIcon,  label: "GitHub Pages", desc: "Free via GitHub" },
  { id: "netlify", Icon: NetlifyIcon, label: "Netlify Drop",  desc: "Drag & drop deploy" },
  { id: "domain",  Icon: GlobeIcon,   label: "Custom Domain", desc: "Your own domain" },
  { id: "code",    Icon: CodeIcon,    label: "Get the Code",  desc: "Copy or download" },
];

export function ExportTab({ data }: ExportTabProps) {
  const [copied, setCopied] = useState(false);
  const [activeOption, setActiveOption] = useState<DeployOption>("github");

  const isReady = data.name && data.title;
  const html = isReady ? generatePortfolioHTML(data) : "";

  async function copyCode() {
    if (!html) return;
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadHTML() {
    if (!html) return;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name ? data.name.toLowerCase().replace(/\s+/g, "-") : "portfolio"}.html`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <div className="w-12 h-12 rounded-2xl bg-[#111120] border border-[#1a1a2e] flex items-center justify-center mb-4">
          <CodeIcon size={22} className="text-gray-600" />
        </div>
        <p className="text-white font-semibold text-sm mb-1">Almost there</p>
        <p className="text-gray-500 text-sm">Add your name and title in the Build tab first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* Deploy option cards */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Deploy method</p>
        <div className="grid grid-cols-2 gap-2">
          {OPTIONS.map(({ id, Icon, label, desc }) => {
            const isActive = activeOption === id;
            return (
              <button
                key={id}
                onClick={() => setActiveOption(id)}
                className="text-left p-3 rounded-xl border transition-all"
                style={{
                  background: isActive ? "#160d2e" : "#0d0d1a",
                  borderColor: isActive ? "#7c3aed" : "#1a1a2e",
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                  style={{ background: isActive ? "#7c3aed22" : "#111120", border: `1px solid ${isActive ? "#7c3aed44" : "#1a1a2e"}` }}
                >
                  <Icon size={14} className={isActive ? "text-purple-400" : "text-gray-600"} />
                </div>
                <p className="text-xs font-bold text-white">{label}</p>
                <p className="text-[11px] text-gray-600 mt-0.5">{desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[#0d0d1a] border border-[#1a1a2e] rounded-xl p-4">
        {activeOption === "github" && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-white">Deploy to GitHub Pages</p>
            {[
              { n: 1, text: <>Create a repo named <code className="text-purple-300 bg-[#1a1a2e] px-1 rounded text-[11px]">username.github.io</code> on GitHub</> },
              { n: 2, text: <>Download your code below, save as <code className="text-purple-300 bg-[#1a1a2e] px-1 rounded text-[11px]">index.html</code></> },
              { n: 3, text: <>Push to GitHub — live at <code className="text-purple-300 bg-[#1a1a2e] px-1 rounded text-[11px]">username.github.io</code></> },
            ].map(({ n, text }) => (
              <div key={n} className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-md bg-purple-900/40 text-purple-400 text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-bold">{n}</span>
                <span className="text-xs text-gray-400 leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        )}

        {activeOption === "netlify" && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-white">Deploy with Netlify Drop</p>
            {[
              { n: 1, text: <>Download your <code className="text-purple-300 bg-[#1a1a2e] px-1 rounded text-[11px]">index.html</code> file below</> },
              { n: 2, text: <>Go to <code className="text-purple-300 bg-[#1a1a2e] px-1 rounded text-[11px]">app.netlify.com/drop</code></> },
              { n: 3, text: "Drag and drop your file — live in seconds, free forever" },
            ].map(({ n, text }) => (
              <div key={n} className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-md bg-purple-900/40 text-purple-400 text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-bold">{n}</span>
                <span className="text-xs text-gray-400 leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        )}

        {activeOption === "domain" && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-white">Use a Custom Domain</p>
            {[
              { n: 1, text: "Deploy to GitHub Pages or Netlify first" },
              { n: 2, text: <>Buy a domain at <code className="text-purple-300 bg-[#1a1a2e] px-1 rounded text-[11px]">namecheap.com</code> or <code className="text-purple-300 bg-[#1a1a2e] px-1 rounded text-[11px]">cloudflare.com</code></> },
              { n: 3, text: "Point your DNS to the host — your portfolio is live on your own domain" },
            ].map(({ n, text }) => (
              <div key={n} className="flex gap-2.5 items-start">
                <span className="w-5 h-5 rounded-md bg-purple-900/40 text-purple-400 text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-bold">{n}</span>
                <span className="text-xs text-gray-400 leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        )}

        {activeOption === "code" && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-white">Your Portfolio Code</p>
            <p className="text-[11px] text-gray-500">One self-contained HTML file — no dependencies.</p>
            <div className="bg-[#080810] border border-[#1a1a2e] rounded-lg p-3 max-h-28 overflow-y-auto">
              <pre className="text-[11px] text-gray-500 whitespace-pre-wrap font-mono leading-relaxed">
                {html.slice(0, 400)}...
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={copyCode}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all"
          style={{ background: copied ? "#059669" : "#7c3aed", color: "#fff" }}
        >
          <CopyIcon size={14} />
          {copied ? "Copied!" : "Copy Code"}
        </button>
        <button
          onClick={downloadHTML}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-colors bg-[#111120] hover:bg-[#1a1a2e] text-white border border-[#1a1a2e]"
        >
          <DownloadIcon size={14} />
          Download
        </button>
      </div>

      {/* Share */}
      <div className="border-t border-[#1a1a2e] pt-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Share</p>
        <ShareButton
          text="I just built my portfolio with Portfolio Studio on Farcaster! Build yours too"
          variant="default"
          className="w-full bg-[#7c3aed] text-white"
        >
          Share on Farcaster
        </ShareButton>
      </div>

      <p className="text-[11px] text-center text-gray-700">
        Single HTML file · No frameworks · Loads instantly
      </p>
    </div>
  );
}
