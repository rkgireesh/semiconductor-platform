"use client";

import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { MODULES_DATA, ModuleData } from "@/data/curriculumData";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers,
  Award
} from "lucide-react";

interface ModuleViewProps {
  moduleId: string;
  onNavigate?: (hash: string) => void;
}

export default function ModuleView({ moduleId, onNavigate }: ModuleViewProps) {
  // Normalize module id (e.g., "1" -> "01", or "01")
  const formattedId = moduleId.padStart(2, "0");
  const moduleData: ModuleData = MODULES_DATA[formattedId] || MODULES_DATA["01"];

  const handleNav = (hash: string) => {
    if (onNavigate) {
      onNavigate(hash);
    } else {
      window.location.hash = hash;
    }
  };

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => handleNav("#roadmap")}
            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ROADMAP</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">STAGE</span>
            <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              {moduleData.num} / 05
            </span>
          </div>
        </div>

        {/* Module Hero Header */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 mb-10 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={moduleData.diffVariant} size="md">
                {moduleData.difficulty} Level
              </Badge>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {moduleData.duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                {moduleData.lessons.length} Core Lessons
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
              {moduleData.title}
            </h1>
            <p className="text-cyan-300 font-mono text-sm sm:text-base">
              // {moduleData.subtitle}
            </p>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed pt-2">
              {moduleData.description}
            </p>
          </div>

          {/* Module Stage Meta Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">PREREQUISITES</span>
              <ul className="text-xs text-slate-300 space-y-1">
                {moduleData.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">CORE TOPICS</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {moduleData.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-1">MODULE PROGRESS</span>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-300">Completion</span>
                  <span className="text-cyan-400 font-bold">{moduleData.progressPct}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all"
                    style={{ width: `${moduleData.progressPct}%` }}
                  />
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-2 block">
                {moduleData.lessons.length} lessons remaining
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Detailed Lessons Curriculum List */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">
                Interactive Lessons
              </h2>
              <p className="text-sm text-slate-400">
                Complete all physical derivations, band diagrams, and check-point quizzes.
              </p>
            </div>
            <Badge variant="cyan" size="sm">
              SYLLABUS
            </Badge>
          </div>

          <div className="space-y-4">
            {moduleData.lessons.map((lesson, idx) => (
              <Card
                key={lesson.id}
                className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 group hover:border-cyan-500/40"
              >
                <div className="flex items-start gap-4 md:gap-5 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 font-mono text-sm font-bold text-cyan-400 group-hover:bg-cyan-950/40 group-hover:border-cyan-500/40 transition-all">
                    0{idx + 1}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {lesson.title}
                      </h3>
                      <Badge variant="outline" size="sm">
                        {lesson.duration}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {lesson.topics.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end shrink-0">
                  <Button
                    onClick={() => handleNav(`#lesson/${lesson.id}`)}
                    variant="primary"
                    size="sm"
                    icon={<ChevronRight className="w-4 h-4" />}
                  >
                    Start Lesson
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 2: Learning Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-2.5 mb-4 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
              <h3 className="font-semibold text-slate-100 text-lg">
                Key Learning Outcomes
              </h3>
            </div>
            <ul className="space-y-3">
              {moduleData.learningOutcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2.5 mb-4 text-sky-400">
              <Award className="w-5 h-5" />
              <h3 className="font-semibold text-slate-100 text-lg">
                Theoretical Overview
              </h3>
            </div>
            <ul className="space-y-3">
              {moduleData.overview.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Bottom Callout Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 glass-panel rounded-xl border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-semibold text-slate-200">
              Ready to begin this module?
            </h4>
            <p className="text-xs text-slate-400">
              Start with Lesson 1 to build solid quantum and solid-state intuition.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleNav("#roadmap")}
              variant="secondary"
              size="md"
            >
              Back to Roadmap
            </Button>
            <Button
              onClick={() => handleNav(`#lesson/${moduleData.lessons[0].id}`)}
              variant="primary"
              size="md"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Start First Lesson
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
