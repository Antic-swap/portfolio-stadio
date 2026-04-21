"use client";

import { useState } from "react";
import type { PortfolioData, Experience } from "@/features/portfolio/types";

interface ExperienceStepProps {
  data: PortfolioData;
  onChange: (updates: Partial<PortfolioData>) => void;
}

const EMPTY: Omit<Experience, "id"> = {
  company: "",
  role: "",
  period: "",
  description: "",
};

export function ExperienceStep({ data, onChange }: ExperienceStepProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Experience, "id">>(EMPTY);

  function openNew() {
    setForm(EMPTY);
    setEditingId(null);
    setIsAdding(true);
  }

  function openEdit(exp: Experience) {
    setForm({ company: exp.company, role: exp.role, period: exp.period, description: exp.description });
    setEditingId(exp.id);
    setIsAdding(true);
  }

  function save() {
    if (!form.company.trim() || !form.role.trim()) return;
    if (editingId) {
      onChange({ experience: data.experience.map((e) => e.id === editingId ? { ...form, id: editingId } : e) });
    } else {
      onChange({ experience: [...data.experience, { ...form, id: Date.now().toString() }] });
    }
    setIsAdding(false);
    setEditingId(null);
    setForm(EMPTY);
  }

  function remove(id: string) {
    onChange({ experience: data.experience.filter((e) => e.id !== id) });
  }

  if (isAdding) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-purple-300">
            {editingId ? "Edit experience" : "Add experience"}
          </p>
          <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-gray-500 hover:text-gray-300 text-sm">
            Cancel
          </button>
        </div>

        <input
          type="text"
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          placeholder="Role / Job Title *"
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
        <input
          type="text"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          placeholder="Company Name *"
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
        <input
          type="text"
          value={form.period}
          onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
          placeholder="Period (e.g. Jan 2022 — Present)"
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="What did you do there?"
          rows={3}
          className="w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
        />

        <button
          onClick={save}
          disabled={!form.company.trim() || !form.role.trim()}
          className="w-full py-3 bg-purple-700 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-colors"
        >
          {editingId ? "Save Changes" : "Add Experience"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Add your work history — internships, jobs, freelance, anything!</p>

      {data.experience.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-3xl mb-3">💼</p>
          <p className="text-gray-400 text-sm mb-4">No experience added yet.</p>
          <p className="text-gray-600 text-xs">Optional — skip if you prefer.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.experience.map((exp) => (
            <div key={exp.id} className="bg-[#111120] border border-[#2d2d4e] rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm">{exp.role}</p>
                  <p className="text-purple-400 text-xs font-semibold mt-0.5">{exp.company}</p>
                  {exp.period && (
                    <p className="text-gray-500 text-xs mt-0.5">{exp.period}</p>
                  )}
                  {exp.description && (
                    <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">{exp.description}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(exp)} className="text-xs text-gray-500 hover:text-purple-400 transition-colors px-2 py-1">Edit</button>
                  <button onClick={() => remove(exp.id)} className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1">Remove</button>
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
        + Add Experience
      </button>
    </div>
  );
}
