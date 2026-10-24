"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CourseData } from "@/data/coursesData";
import {
  isLessonComplete,
  syncProgressFromSupabase,
} from "@/lib/progress";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Layers,
  UserCheck,
  CheckCircle2,
  PlayCircle,
  FlaskConical,
  Compass,
  ArrowUpRight,
  Award
} from "lucide-react";

interface CourseDetailClientProps {
  course: CourseData;
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      await syncProgressFromSupabase();
      if (cancelled) return;

      const set = new Set<string>();
      for (const l of course.lessons) {
        if (isLessonComplete(l.id)) {
          set.add(l.id);
        }
      }
      setCompletedLessonIds(set);
      setIsLoaded(true);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [course.lessons]);

  const completedCount = completedLessonIds.size;
  const progressPct = course.lessons.length > 0 ? Math.round((completedCount / course.lessons.length) * 100) : 0;
  const isFinished = progressPct === 100;

  // Determine next uncompleted lesson to resume
  const firstUnfinishedLesson = course.lessons.find((l) => !completedLessonIds.has(l.id)) || course.lessons[0];

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL COURSES</span>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant={course.badgeVariant} size="md">
              {course.code}
            </Badge>
            <Badge variant="outline" size="md">
              {course.level}
            </Badge>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-10 relative overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-950 via-[#0B132B]/80 to-slate-950">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="space-y-5 max-w-4xl relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-800">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                {course.instructor}
              </span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-3 py-1 rounded-lg">
                {course.lessons.length} Modules &amp; Lessons
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed pt-1">
              {course.description}
            </p>

            {/* Dynamic Progress Card inside Hero */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  Course Mastery: {completedCount} / {course.lessons.length} Lessons Finished
                </span>
                <span className={isFinished ? "text-emerald-400 font-bold" : "text-cyan-400 font-bold"}>
                  {progressPct}% Completed
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isFinished
                      ? "bg-emerald-400"
                      : "bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400"
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4">
              <Button
                href={`/lessons/${firstUnfinishedLesson.id}`}
                variant="primary"
                size="lg"
                className="shadow-lg shadow-cyan-500/20"
                icon={<PlayCircle className="w-4 h-4" />}
              >
                {completedCount > 0 ? "Resume Course" : "Start First Lesson"}
              </Button>
              <Button
                href="/roadmap"
                variant="secondary"
                size="lg"
                icon={<Compass className="w-4 h-4" />}
              >
                View in Roadmap
              </Button>
            </div>
          </div>
        </div>

        {/* Course Syllabus / Lessons List */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
                Curriculum Syllabus &amp; In-Depth Lessons
              </h2>
              <p className="text-sm text-slate-400">
                Structured physical derivations, governing equations, real-world applications, and knowledge check quizzes.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
              {course.lessons.length} LESSONS
            </span>
          </div>

          <div className="space-y-4">
            {course.lessons.map((lesson, idx) => {
              const isCompleted = completedLessonIds.has(lesson.id);

              return (
                <Card
                  key={lesson.id}
                  className={`p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 group transition-all duration-200 ${
                    isCompleted
                      ? "border-emerald-500/30 bg-slate-950/70"
                      : "hover:border-cyan-500/40"
                  }`}
                >
                  <div className="flex items-start gap-4 md:gap-5 flex-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-mono text-sm font-bold transition-all ${
                        isCompleted
                          ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300"
                          : "bg-slate-900 border border-slate-800 text-cyan-400 group-hover:bg-cyan-950/40 group-hover:border-cyan-500/40"
                      }`}
                    >
                      {isCompleted ? "✓" : `0${idx + 1}`}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Link href={`/lessons/${lesson.id}`}>
                          <h3 className="text-base sm:text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                            {lesson.title}
                          </h3>
                        </Link>
                        <Badge variant="outline" size="sm">
                          {lesson.duration}
                        </Badge>
                        <Badge variant="teal" size="sm">
                          {lesson.difficulty}
                        </Badge>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
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
                      href={`/lessons/${lesson.id}`}
                      variant={isCompleted ? "outline" : "primary"}
                      size="sm"
                      icon={<ChevronRight className="w-4 h-4" />}
                    >
                      {isCompleted ? "Review Lesson" : "Start Lesson"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Integration Hub: Research Hub & Virtual Labs Connections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Research Hub Integration */}
          <Card className="p-6 border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-slate-950 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400">
                <Compass className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Frontier Research Connection
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100">
                Connected 100-Topic Research Hub
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Explore deep peer-reviewed physical literature, IEEE papers, and cutting-edge industrial developments related to {course.title}.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800">
              <Button
                href="/research"
                variant="outline"
                size="sm"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Browse Research Hub Topics
              </Button>
            </div>
          </Card>

          {/* Virtual Labs Integration */}
          <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-purple-950/30 to-slate-950 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-purple-400">
                <FlaskConical className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Interactive Experimentation
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100">
                Hands-On Virtual Simulation Labs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tune physical parameters such as doping concentrations, gate dimensions, and temperature in live numerical simulations.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800">
              <Button
                href="/labs"
                variant="outline"
                size="sm"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Launch Virtual Labs
              </Button>
            </div>
          </Card>
        </div>

        {/* Skills & Prerequisites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2.5 mb-4 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
              <h3 className="font-semibold text-slate-100 text-lg">
                Key Skills You Will Master
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
                Prerequisites &amp; Foundation
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
