"use client";

import { useState } from "react";
import type { PortfolioData, Education } from "@/features/portfolio/types";

interface EducationStepProps {
  data: PortfolioData;
  onChange: (updates: Partial<PortfolioData>) => void;
}

const EMPTY: Omit<Education, "id"> = {
  school: "",
  degree: "",
  field: "",
  period: "",
  description: "",
};

export function EducationStep({ data, onChange }: EducationStepProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Education, "id">>(EMPTY);

  function openNew() {
    setForm(EMPTY);
    setEditingId(null);
    setIsAdding(true);
  }

  function openEdit(edu: Education) {
    setForm({ school: edu.school, degree: edu.degree, field: edu.field, period: edu.period, description: edu.description });
    setEditingId(edu.id);
    setIsAdding(true);
  }

  function save() {
    if (!form.school.trim() || !form.degree.trim()) return;
    if (editingId) {
      onChange({ education: data.education.map((e) => e.id === editingId ? { ...form, id: editingId } : e) });
    } else {
      onChange({ education: [...data.education, { ...form, id: Date.now().toString() }] });
    }
    setIsAdding(false);
    setEditingId(null);
    setForm(EMPTY);
  }

  function remove(id: string) {
    onChange({ education: data.education.filter((e) => e.id !== id) });
  }

  const inputClass = "w-full bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm";

  if (isAdding) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-purple-300">
            {editingId ? "Edit education" : "Add education"}
          </p>
          <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-gray-500 hover:text-gray-300 text-sm">
            Cancel
          </button>
        </div>

        <input
          type="text"
          value={form.school}
          onChange={(e) => setForm((f) => ({ ...f, school: e.target.value }))}
          placeholder="School / University *"
          className={inputClass}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={form.degree}
            onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))}
            placeholder="Degree * (e.g. B.S.)"
            className={inputClass}
          />
          <input
            type="text"
            value={form.field}
            onChange={(e) => setForm((f) => ({ ...f, field: e.target.value }))}
            placeholder="Field (e.g. CS)"
            className={inputClass}
          />
        </div>

        <input
          type="text"
          value={form.period}
          onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
          placeholder="Period (e.g. 2018 — 2022)"
          className={inputClass}
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Honors, activities, notable achievements... (optional)"
          rows={2}
          className={`${inputClass} resize-none`}
        />

        <button
          onClick={save}
          disabled={!form.school.trim() || !form.degree.trim()}
          className="w-full py-3 bg-purple-700 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-colors"
        >
          {editingId ? "Save Changes" : "Add Education"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Add degrees, bootcamps, certifications — anything counts!</p>

      {data.education.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-3xl mb-3">🎓</p>
          <p className="text-gray-400 text-sm mb-1">No education added yet.</p>
          <p className="text-gray-600 text-xs">Optional — skip if you prefer.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.education.map((edu) => (
            <div key={edu.id} className="bg-[#111120] border border-[#2d2d4e] rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {/* School with cap icon */}
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-base">🎓</span>
                    <p className="font-bold text-white text-sm truncate">{edu.school}</p>
                  </div>
                  <p className="text-purple-400 text-xs font-semibold">
                    {edu.degree}{edu.field ? ` · ${edu.field}` : ""}
                  </p>
                  {edu.period && <p className="text-gray-500 text-xs mt-0.5">{edu.period}</p>}
                  {edu.description && (
                    <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">{edu.description}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(edu)} className="text-xs text-gray-500 hover:text-purple-400 transition-colors px-2 py-1">Edit</button>
                  <button onClick={() => remove(edu.id)} className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2 py-1">Remove</button>
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
        + Add Education
      </button>
    </div>
  );
}
