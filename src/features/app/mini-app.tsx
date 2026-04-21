"use client";

import { useState, useEffect, useCallback } from "react";
import { DEFAULT_PORTFOLIO, type PortfolioData } from "@/features/portfolio/types";
import { BuildTab } from "@/features/portfolio/components/build-tab";
import { PortfolioPreview } from "@/features/portfolio/components/portfolio-preview";
import { ExportTab } from "@/features/portfolio/components/export-tab";
import { PencilIcon, EyeIcon, UploadIcon, CheckIcon, SparkleIcon, TrashIcon } from "@/features/app/icons";

type AppTab = "build" | "preview" | "export";

const TABS: { id: AppTab; label: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: "build", label: "Build", Icon: PencilIcon },
  { id: "preview", label: "Preview", Icon: EyeIcon },
  { id: "export", label: "Export", Icon: UploadIcon },
];

const SAVE_KEY = "portfolio-studio-draft";

function loadDraft(): PortfolioData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PortfolioData;
  } catch {
    return null;
  }
}

function saveDraft(data: PortfolioData) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable — silently ignore
  }
}

function clearDraft() {
  try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ }
}

function hasMeaningfulData(data: PortfolioData): boolean {
  return !!(data.name || data.title || data.bio || data.skills.length || data.projects.length);
}

export function MiniApp() {
  const [activeTab, setActiveTab] = useState<AppTab>("build");
  const [portfolio, setPortfolio] = useState<PortfolioData>(DEFAULT_PORTFOLIO);
  const [showRestoreBanner, setShowRestoreBanner] = useState(false);
  const [savedDraft, setSavedDraft] = useState<PortfolioData | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const isReady = !!(portfolio.name && portfolio.title);

  // On mount: check for saved draft
  useEffect(() => {
    const draft = loadDraft();
    if (draft && hasMeaningfulData(draft)) {
      setSavedDraft(draft);
      setShowRestoreBanner(true);
    }
  }, []);

  // Auto-save whenever portfolio changes (debounced)
  useEffect(() => {
    if (!hasMeaningfulData(portfolio)) return;
    const timer = setTimeout(() => {
      saveDraft(portfolio);
      setLastSaved(new Date());
    }, 800);
    return () => clearTimeout(timer);
  }, [portfolio]);

  const handleChange = useCallback((updates: Partial<PortfolioData>) => {
    setPortfolio((prev) => ({ ...prev, ...updates }));
  }, []);

  function handleFinish() {
    setActiveTab("export");
  }

  function restoreDraft() {
    if (savedDraft) {
      setPortfolio(savedDraft);
    }
    setShowRestoreBanner(false);
    setSavedDraft(null);
  }

  function dismissRestore() {
    setShowRestoreBanner(false);
    setSavedDraft(null);
  }

  function handleReset() {
    if (!confirm("Start fresh? Your current progress will be cleared.")) return;
    clearDraft();
    setPortfolio(DEFAULT_PORTFOLIO);
    setLastSaved(null);
    setActiveTab("build");
  }

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-[#0a0a0f]">

      {/* ── Restore Banner ── */}
      {showRestoreBanner && (
        <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-2.5 bg-[#1a0f2e] border-b border-purple-900/40">
          <div className="flex items-center gap-2 min-w-0">
            <SparkleIcon size={13} className="text-purple-400 shrink-0" />
            <p className="text-xs text-purple-200 font-medium truncate">
              Welcome back! You have a saved draft — <span className="font-bold">{savedDraft?.name || "untitled"}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={restoreDraft}
              className="text-xs font-bold px-3 py-1 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
            >
              Restore
            </button>
            <button
              onClick={dismissRestore}
              className="text-xs font-medium px-2 py-1 rounded-lg text-gray-500 hover:text-gray-300 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-[#1a1a2e]">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="white" opacity="0.9"/>
              <rect x="7.5" y="1" width="5.5" height="5.5" rx="1" fill="white" opacity="0.6"/>
              <rect x="1" y="7.5" width="5.5" height="5.5" rx="1" fill="white" opacity="0.6"/>
              <rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none tracking-tight">Portfolio Studio</h1>
            <p className="text-[10px] text-gray-600 leading-none mt-0.5 tracking-wide uppercase">Build · Preview · Deploy</p>
          </div>
        </div>

        {/* Tab switcher */}
        <nav className="flex items-center gap-0.5 bg-[#0f0f1a] rounded-xl p-1 border border-[#1a1a2e]">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: activeTab === id ? "#7c3aed" : "transparent",
                color: activeTab === id ? "#fff" : "#4b5563",
              }}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>

        {/* Status + actions */}
        <div className="flex items-center gap-2">
          {/* Auto-save indicator */}
          {lastSaved && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-gray-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 inline-block" />
              Saved
            </span>
          )}
          {/* Reset */}
          {hasMeaningfulData(portfolio) && (
            <button
              onClick={handleReset}
              title="Start fresh"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <TrashIcon size={13} />
            </button>
          )}
          {/* Ready pill */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
            style={{
              background: isReady ? "#1a0f2e" : "#0f0f1a",
              color: isReady ? "#c4b5fd" : "#374151",
              borderColor: isReady ? "#7c3aed44" : "#1a1a2e",
            }}
          >
            {isReady ? <CheckIcon size={12} /> : (
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600 inline-block" />
            )}
            <span className="hidden sm:inline">{isReady ? "Ready" : "In progress"}</span>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="flex-1 min-h-0 flex overflow-hidden">

        {activeTab === "build" && (
          <>
            <div className="w-full sm:w-[400px] shrink-0 flex flex-col border-r border-[#1a1a2e] overflow-hidden">
              <BuildTab data={portfolio} onChange={handleChange} onFinish={handleFinish} />
            </div>
            <div className="hidden sm:flex flex-1 flex-col overflow-hidden bg-[#06060e]">
              <div className="shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-[#1a1a2e]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[11px] text-gray-700 font-mono ml-1">localhost · preview</span>
                </div>
                <span className="text-[11px] text-gray-700 font-medium">Live Preview</span>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto">
                  <PortfolioPreview data={portfolio} />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "preview" && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#06060e]">
            <div className="shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-[#1a1a2e]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-gray-700 font-mono ml-1">localhost · preview</span>
              </div>
              <button
                onClick={() => setActiveTab("export")}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{ background: "#7c3aed", color: "#fff" }}
              >
                <UploadIcon size={12} />
                Export
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-2xl mx-auto">
                <PortfolioPreview data={portfolio} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "export" && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="mb-5">
                  <h2 className="text-base font-bold text-white tracking-tight">Deploy Your Portfolio</h2>
                  <p className="text-sm text-gray-500 mt-1">Choose how to get your site live.</p>
                </div>
                <ExportTab data={portfolio} />
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="mb-5">
                  <h2 className="text-base font-bold text-white tracking-tight">Preview</h2>
                  <p className="text-sm text-gray-500 mt-1">What your visitors will see.</p>
                </div>
                <PortfolioPreview data={portfolio} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
