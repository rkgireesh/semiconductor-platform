"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { COURSES_DATA, MODULES_DATA, CourseData } from "@/data/curriculumData";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers,
  Award,
  UserCheck
} from "lucide-react";

interface CourseViewProps {
  courseId: string;
  onNavigate?: (hash: string) => void;
}

export default function CourseView({ courseId, onNavigate }: CourseViewProps) {
  const course: CourseData =
    COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0];

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
            onClick={() => handleNav("#courses")}
            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL COURSES</span>
          </button>

          <Badge variant="cyan" size="md">
            {course.code}
          </Badge>
        </div>

        {/* Course Hero Banner */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 mb-10 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="sky" size="sm">
                {course.level}
              </Badge>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                {course.instructor}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed pt-2">
              {course.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  const firstMod = course.modules[0];
                  handleNav(`#module/${firstMod}`);
                }}
                variant="primary"
                size="lg"
                icon={<Sparkles className="w-4 h-4" />}
              >
                Enroll & Start Course
              </Button>
              <Button
                onClick={() => handleNav("#roadmap")}
                variant="secondary"
                size="lg"
              >
                Explore Full Curriculum
              </Button>
            </div>
          </div>
        </div>

        {/* Course Modules Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">
                Course Syllabus & Modules
              </h2>
              <p className="text-sm text-slate-400">
                Progressive stages included in this certification track.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              {course.modules.length} MODULES INCLUDED
            </span>
          </div>

          <div className="space-y-4">
            {course.modules.map((modId) => {
              const modData = MODULES_DATA[modId];
              if (!modData) return null;

              return (
                <Card
                  key={modId}
                  className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-cyan-500/40"
                >
                  <div className="flex items-start gap-4 md:gap-5 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 font-mono text-base font-bold text-cyan-400 group-hover:bg-cyan-950/40 transition-all">
                      {modData.num}
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {modData.title}
                        </h3>
                        <Badge variant={modData.diffVariant} size="sm">
                          {modData.difficulty}
                        </Badge>
                        <span className="text-xs font-mono text-slate-400">
                          {modData.duration}
                        </span>
                      </div>

                      <p className="text-xs md:text-sm text-slate-400 max-w-3xl leading-relaxed">
                        {modData.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {modData.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => handleNav(`#lesson/${lesson.id}`)}
                            className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <BookOpen className="w-3 h-3 text-cyan-400" />
                            <span>{lesson.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end shrink-0">
                    <Button
                      onClick={() => handleNav(`#module/${modData.id}`)}
                      variant="outline"
                      size="sm"
                      icon={<ChevronRight className="w-4 h-4" />}
                    >
                      View Module
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Skills Gained & Prerequisites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-2.5 mb-4 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
              <h3 className="font-semibold text-slate-100 text-lg">
                Skills You Will Master
              </h3>
            </div>
            <ul className="space-y-3">
              {course.skillsGained.map((skill, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2.5 mb-4 text-sky-400">
              <Layers className="w-5 h-5" />
              <h3 className="font-semibold text-slate-100 text-lg">
                Prerequisites & Setup
              </h3>
            </div>
            <ul className="space-y-3">
              {course.prerequisites.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

      </div>
    </div>
  );
}
