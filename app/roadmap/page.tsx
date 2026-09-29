"use client";

import React, { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ROADMAP_STAGES, RoadmapStage } from "@/data/roadmapData";
import {
  Compass,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Filter,
  GraduationCap,
  Layers,
  ArrowRight
} from "lucide-react";

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Fundamentals", "Devices", "Circuit Design", "Manufacturing", "Frontier"];

  const filteredStages =
    selectedCategory === "All"
      ? ROADMAP_STAGES
      : ROADMAP_STAGES.filter((s) => s.category === selectedCategory);

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="cyan" size="md">
            12-STAGE INTERACTIVE CURRICULUM
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Semiconductor Learning Roadmap
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Follow our structured engineering timeline from quantum atomic orbits to sub-2nm GAAFETs, VLSI design, and wafer fabrication cleanroom techniques.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25"
                  : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Vertical Timeline */}
        <div className="relative border-l-2 border-slate-800/80 ml-4 md:ml-32 space-y-10 pl-6 md:pl-10">
          {filteredStages.map((stage, idx) => (
            <div key={stage.id} className="relative group">
              
              {/* Timeline Node Badge on the line */}
              <div className="absolute -left-[35px] md:-left-[51px] top-6 w-9 h-9 rounded-xl bg-slate-900 border-2 border-cyan-500/60 flex items-center justify-center font-mono text-xs font-bold text-cyan-300 group-hover:border-cyan-400 group-hover:bg-cyan-950/60 group-hover:scale-110 transition-all shadow-md shadow-cyan-500/20">
                {stage.num}
              </div>

              {/* Stage Card */}
              <Card className="p-6 md:p-8 space-y-6 group hover:border-cyan-500/50">
                
                {/* Top Row: Title, Meta, Badge */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                        STAGE {stage.num} // {stage.category}
                      </span>
                      <Badge variant={stage.diffVariant} size="sm">
                        {stage.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                        <Clock className="w-3.5 h-3.5 text-sky-400" />
                        {stage.duration}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {stage.title}
                    </h2>

                    <p className="text-slate-300 text-sm leading-relaxed max-w-4xl pt-1">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="shrink-0 flex md:flex-col items-end gap-2">
                    <Button
                      href={`/courses/${stage.courseId}`}
                      variant="primary"
                      size="sm"
                      icon={<ChevronRight className="w-4 h-4" />}
                    >
                      Start Stage
                    </Button>
                    <Link
                      href={`/lessons/${stage.primaryLessonId}`}
                      className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors hidden md:block"
                    >
                      Quick Lesson Jump →
                    </Link>
                  </div>
                </div>

                {/* Modules Included in this Stage */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {stage.modulesIncluded.map((mod, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-200 font-medium truncate pr-2">
                        {mod.name}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px] shrink-0">
                        {mod.duration}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Skills Chips */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase mr-1">Skills:</span>
                    {stage.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {stage.status}
                  </span>
                </div>

              </Card>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
