"use client";

import { useState } from "react";
import { BUILD_STEPS, STEP_EMOJIS, STEP_LABELS, type BuildStep, type PortfolioData } from "@/features/portfolio/types";
import { ProfileStep } from "@/features/portfolio/components/profile-step";
import { SkillsStep } from "@/features/portfolio/components/skills-step";
import { ProjectsStep } from "@/features/portfolio/components/projects-step";
import { SocialsStep } from "@/features/portfolio/components/socials-step";
import { ExperienceStep } from "@/features/portfolio/components/experience-step";
import { EducationStep } from "@/features/portfolio/components/education-step";
import { TemplateStep } from "@/features/portfolio/components/template-step";
import {
  PaletteIcon, UserIcon, ZapIcon, BriefcaseIcon,
  GraduationIcon, FolderIcon, LinkIcon, CheckIcon, ArrowRightIcon, ArrowLeftIcon,
} from "@/features/app/icons";

const STEP_ICONS: Record<BuildStep, React.FC<{ size?: number; className?: string }>> = {
  template: PaletteIcon,
  profile: UserIcon,
  skills: ZapIcon,
  experience: BriefcaseIcon,
  education: GraduationIcon,
  projects: FolderIcon,
  socials: LinkIcon,
};

interface BuildTabProps {
  data: PortfolioData;
  onChange: (updates: Partial<PortfolioData>) => void;
  onFinish: () => void;
}

export function BuildTab({ data, onChange, onFinish }: BuildTabProps) {
  const [currentStep, setCurrentStep] = useState<BuildStep>("template");
  const stepIndex = BUILD_STEPS.indexOf(currentStep);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === BUILD_STEPS.length - 1;

  function goNext() {
    if (isLast) onFinish();
    else setCurrentStep(BUILD_STEPS[stepIndex + 1]);
  }

  function goPrev() {
    if (!isFirst) setCurrentStep(BUILD_STEPS[stepIndex - 1]);
  }

  return (
    <div className="flex flex-col h-full">

      {/* Step indicator */}
      <div className="shrink-0 px-4 pt-3 pb-0">
        <div className="flex items-center gap-0.5">
          {BUILD_STEPS.map((step, i) => {
            const isActive = step === currentStep;
            const isDone = i < stepIndex;
            const Icon = STEP_ICONS[step];
            return (
              <button
                key={step}
                onClick={() => setCurrentStep(step)}
                title={STEP_LABELS[step]}
                className="flex-1 flex flex-col items-center gap-1 py-2 group relative"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: isActive ? "#7c3aed" : isDone ? "#1e1040" : "#111120",
                    border: `1px solid ${isActive ? "#a78bfa" : isDone ? "#4c1d9544" : "#1a1a2e"}`,
                  }}
                >
                  {isDone ? (
                    <CheckIcon size={11} className="text-purple-400" />
                  ) : (
                    <Icon size={13} className={isActive ? "text-white" : "text-gray-600"} />
                  )}
                </div>
                {/* Active indicator dot */}
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-purple-500" />
                )}
              </button>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="mt-2 h-px bg-[#1a1a2e] rounded-full">
          <div
            className="h-px rounded-full transition-all duration-500"
            style={{
              width: `${((stepIndex + 1) / BUILD_STEPS.length) * 100}%`,
              background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
            }}
          />
        </div>
      </div>

      {/* Step header */}
      <div className="shrink-0 px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight">{STEP_LABELS[currentStep]}</h2>
          <p className="text-[11px] text-gray-600 mt-0.5">{stepIndex + 1} of {BUILD_STEPS.length}</p>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {currentStep === "template" && <TemplateStep data={data} onChange={onChange} />}
        {currentStep === "profile" && <ProfileStep data={data} onChange={onChange} />}
        {currentStep === "skills" && <SkillsStep data={data} onChange={onChange} />}
        {currentStep === "experience" && <ExperienceStep data={data} onChange={onChange} />}
        {currentStep === "education" && <EducationStep data={data} onChange={onChange} />}
        {currentStep === "projects" && <ProjectsStep data={data} onChange={onChange} />}
        {currentStep === "socials" && <SocialsStep data={data} onChange={onChange} />}
      </div>

      {/* Navigation */}
      <div className="shrink-0 px-4 pb-4 pt-2 flex gap-2 border-t border-[#1a1a2e]">
        {!isFirst && (
          <button
            onClick={goPrev}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#111120] hover:bg-[#1a1a2e] text-gray-400 border border-[#1a1a2e] transition-colors"
          >
            <ArrowLeftIcon size={13} />
            <span>Back</span>
          </button>
        )}
        <button
          onClick={goNext}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
        >
          <span>{isLast ? "Done — Preview" : "Continue"}</span>
          {!isLast && <ArrowRightIcon size={13} />}
          {isLast && <CheckIcon size={13} />}
        </button>
      </div>
    </div>
  );
}
