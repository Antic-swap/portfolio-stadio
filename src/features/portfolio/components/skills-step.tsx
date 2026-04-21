"use client";

import { useState } from "react";
import type { PortfolioData } from "@/features/portfolio/types";

const SUGGESTED_SKILLS = [
  "React", "TypeScript", "Next.js", "Node.js", "Python",
  "Solidity", "Rust", "Go", "PostgreSQL", "Docker",
  "AWS", "Figma", "GraphQL", "TailwindCSS", "Vue",
];

interface SkillsStepProps {
  data: PortfolioData;
  onChange: (updates: Partial<PortfolioData>) => void;
}

export function SkillsStep({ data, onChange }: SkillsStepProps) {
  const [input, setInput] = useState("");

  function addSkill(skill: string) {
    const trimmed = skill.trim();
    if (!trimmed || data.skills.includes(trimmed)) return;
    onChange({ skills: [...data.skills, trimmed] });
    setInput("");
  }

  function removeSkill(skill: string) {
    onChange({ skills: data.skills.filter((s) => s !== skill) });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(input);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-purple-300 mb-1.5">
          Add a skill
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. React"
            className="flex-1 bg-[#111120] border border-[#2d2d4e] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
          <button
            onClick={() => addSkill(input)}
            className="px-4 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-sm font-semibold transition-colors min-w-[56px]"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-1">Press Enter or comma to add</p>
      </div>

      {data.skills.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-purple-300 mb-2">Your skills</p>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 bg-[#1a1a2e] border border-[#2d2d4e] text-purple-300 rounded-lg px-3 py-1.5 text-sm font-medium"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-gray-500 hover:text-red-400 transition-colors leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold text-gray-500 mb-2">Suggestions</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.filter((s) => !data.skills.includes(s)).map((s) => (
            <button
              key={s}
              onClick={() => addSkill(s)}
              className="bg-[#0f0f1a] border border-[#2d2d4e] text-gray-400 hover:text-purple-300 hover:border-purple-700 rounded-lg px-3 py-1.5 text-sm transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
