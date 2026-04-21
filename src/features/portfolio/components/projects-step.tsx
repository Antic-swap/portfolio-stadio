"use client";

import { useState } from "react";
import type { PortfolioData, Project } from "@/features/portfolio/types";

interface ProjectsStepProps {
  data: PortfolioData;
  onChange: (updates: Partial<PortfolioData>) => void;
}

const EMPTY_PROJECT: Omit<Project, "id"> = {
  title: "",
  description: "",
  url: "",
  imageUrl: "",
  tags: [],
};

export function ProjectsStep({ data, onChange }: ProjectsStepProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY_PROJECT);
  const [tagInput, setTagInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  function openNew() {
    setForm(EMPTY_PROJECT);
    setTagInput("");
    setEditingId(null);
    setIsAdding(true);
  }

  function openEdit(project: Project) {
    setForm({ title: project.title, description: project.description, url: project.url, imageUrl: project.imageUrl, tags: project.tags });
    setTagInput("");
    setEditingId(project.id);
    setIsAdding(true);
  }

  function addTag() {
    const t = tagInput.trim();
    if (!t || form.tags.includes(t)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    setTagInput("");
  }

  function removeTag(tag: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  }

  function save() {
    if (!form.title.trim()) return;
    if (editingId) {
      onChange({ projects: data.projects.map((p) => p.id === editingId ? { ...form, id: editingId } : p) });
    } else {
      onChange({ projects: [...data.projects, { ...form, id: Date.now().toString() }] });
    }
    setIsAdding(false);
    setEditingId(null);
    setForm(EMPTY_PROJECT);
  }

  function remove(id: string) {
    onChange({ projects: data.projects.filter((p) => p.id !== id) });
  }

  if (isAdding) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-purple-300">
            {editingId ? "Edit project" : "New project"}
          </p>
          <button
            onClick={() => { setIsAdding(false); setEditingId(null); }}
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            Cancel
          </button>
        </div>

        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Project name *"
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="What does it do?"
          rows={2}
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
        />

        {/* Project image */}
        <div>
          <label className="block text-xs font-semibold text-purple-300 mb-1.5">
            Project Photo / Screenshot
          </label>
          {form.imageUrl && (
            <div className="relative mb-2 rounded-xl overflow-hidden h-28 border border-[#2d2d4e]">
              <img
                src={form.imageUrl}
                alt="Project preview"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <button
                onClick={() => setForm((f) => ({ ...f, imageUrl: "" }))}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            placeholder="https://i.imgur.com/screenshot.png"
            className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
          <p className="text-xs text-gray-600 mt-1">Paste a screenshot or preview image URL</p>
        </div>

        <input
          type="url"
          value={form.url}
          onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
          placeholder="Project URL (optional)"
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />

        {/* Tags */}
        <div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
              placeholder="Add tag (e.g. React)"
              className="flex-1 bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
            />
            <button
              onClick={addTag}
              className="px-4 bg-[#1a1a2e] hover:bg-[#22224a] text-purple-300 rounded-xl text-sm font-medium transition-colors border border-[#2d2d4e]"
            >
              + Tag
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {form.tags.map((t) => (
                <span key={t} className="flex items-center gap-1 bg-purple-900/30 text-purple-300 rounded px-2 py-0.5 text-xs">
                  {t}
                  <button onClick={() => removeTag(t)} className="hover:text-red-400 ml-0.5">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={save}
          disabled={!form.title.trim()}
          className="w-full py-3 bg-purple-700 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-colors"
        >
          {editingId ? "Save Changes" : "Add Project"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Showcase your best work with screenshots and links.</p>

      {data.projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-3xl mb-3">🚀</p>
          <p className="text-gray-400 text-sm mb-1">No projects yet.</p>
          <p className="text-gray-600 text-xs">Show off what you've built!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.projects.map((p) => (
            <div key={p.id} className="bg-[#111120] border border-[#2d2d4e] rounded-xl overflow-hidden">
              {/* Project image thumbnail */}
              {p.imageUrl && (
                <div className="h-24 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}
              <div className="p-3 flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{p.title}</p>
                  {p.description && <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{p.description}</p>}
                  {p.tags.length > 0 && (
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs text-purple-400 bg-purple-900/20 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(p)} className="text-xs text-gray-500 hover:text-purple-400 transition-colors px-2 py-1">Edit</button>
                  <button onClick={() => remove(p.id)} className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={openNew}
        className="w-full py-3 border-2 border-dashed border-[#2d2d4e] hover:border-purple-700 text-gray-500 hover:text-purple-400 rounded-xl text-sm font-medium transition-colors"
      >
        + Add Project
      </button>
    </div>
  );
}
