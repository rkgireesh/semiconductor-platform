"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { COURSES_DATA, MODULES_DATA } from "@/data/curriculumData";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Layers,
  UserCheck
} from "lucide-react";

interface CoursesListViewProps {
  onNavigate?: (hash: string) => void;
}

export default function CoursesListView({ onNavigate }: CoursesListViewProps) {
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
            onClick={() => handleNav("#")}
            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>

          <Badge variant="sky" size="md">
            CURATED TRACKS
          </Badge>
        </div>

        {/* Hero Header */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 mb-10 relative overflow-hidden border border-slate-800">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-mono">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC & INDUSTRY CERTIFICATION PATHWAYS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
              Semiconductor Engineering Courses
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Comprehensive course paths covering solid-state physics, transistor compact modeling, VLSI RTL-to-GDSII tape-out, and advanced semiconductor packaging.
            </p>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="space-y-6 mb-12">
          {COURSES_DATA.map((course) => (
            <Card
              key={course.id}
              className="p-6 md:p-8 flex flex-col lg:flex-row justify-between gap-8 group hover:border-cyan-500/40"
            >
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="cyan" size="sm">
                    {course.code}
                  </Badge>
                  <Badge variant="outline" size="sm">
                    {course.level}
                  </Badge>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {course.instructor}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Modules Included Preview */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-slate-400 block mb-2">
                    MODULES IN THIS COURSE:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {course.modules.map((modId) => {
                      const mod = MODULES_DATA[modId];
                      return (
                        <button
                          key={modId}
                          onClick={() => handleNav(`#module/${modId}`)}
                          className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="text-cyan-400 font-bold">{mod ? mod.num : modId}</span>
                          <span>{mod ? mod.title : `Module ${modId}`}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-start lg:items-end gap-4 shrink-0 lg:border-l lg:border-slate-800 lg:pl-8">
                <div className="space-y-1.5 text-left lg:text-right">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 lg:justify-end">
                    <Sparkles className="w-3.5 h-3.5" />
                    VERIFIED CURRICULUM
                  </span>
                  <span className="text-xs text-slate-400 block">
                    Full lecture notes, SPICE circuits & quizzes
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto">
                  <Button
                    onClick={() => handleNav(`#course/${course.id}`)}
                    variant="primary"
                    size="md"
                    icon={<ChevronRight className="w-4 h-4" />}
                    className="w-full"
                  >
                    View Course Syllabus
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
