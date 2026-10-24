"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { COURSES_DATA, CourseData } from "@/data/coursesData";
import {
  getCourseProgress,
  getCompletedCountForCourse,
  syncProgressFromSupabase,
  isLessonComplete,
} from "@/lib/progress";
import {
  BookOpen,
  Clock,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Layers,
  Search,
  CheckCircle2,
  PlayCircle,
  Award,
  ArrowRight,
  BarChart3,
  Filter
} from "lucide-react";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [progressMap, setProgressMap] = useState<Record<string, { pct: number; completed: number }>>({});
  const [resumeInfo, setResumeInfo] = useState<{ course: CourseData; nextLessonId: string; nextLessonTitle: string } | null>(null);

  // Sync Supabase progress and compute live client progress
  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      await syncProgressFromSupabase();
      if (cancelled) return;

      const map: Record<string, { pct: number; completed: number }> = {};
      let firstActiveCourse: { course: CourseData; nextLessonId: string; nextLessonTitle: string } | null = null;

      for (const course of COURSES_DATA) {
        // Count completed lessons
        let completedInCourse = 0;
        let firstUnfinishedLessonId: string | null = null;
        let firstUnfinishedLessonTitle: string | null = null;

        for (const l of course.lessons) {
          if (isLessonComplete(l.id)) {
            completedInCourse++;
          } else if (!firstUnfinishedLessonId) {
            firstUnfinishedLessonId = l.id;
            firstUnfinishedLessonTitle = l.title;
          }
        }

        const pct = course.lessons.length > 0 ? Math.round((completedInCourse / course.lessons.length) * 100) : 0;
        map[course.id] = { pct, completed: completedInCourse };

        // Determine resume target: the first course that has progress < 100% and either has completed > 0 or is the first course
        if (!firstActiveCourse && firstUnfinishedLessonId) {
          if (completedInCourse > 0 || course === COURSES_DATA[0]) {
            firstActiveCourse = {
              course,
              nextLessonId: firstUnfinishedLessonId,
              nextLessonTitle: firstUnfinishedLessonTitle || course.lessons[0].title,
            };
          }
        }
      }

      setProgressMap(map);
      if (firstActiveCourse) {
        setResumeInfo(firstActiveCourse);
      }
    }

    void loadProgress();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalLessonsCount = COURSES_DATA.reduce((sum, c) => sum + c.lessons.length, 0);
  const totalCompletedCount = Object.values(progressMap).reduce((sum, p) => sum + p.completed, 0);
  const platformProgressPct = totalLessonsCount > 0 ? Math.round((totalCompletedCount / totalLessonsCount) * 100) : 0;

  const filteredCourses = COURSES_DATA.filter((c) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      term === "" ||
      c.title.toLowerCase().includes(term) ||
      c.code.toLowerCase().includes(term) ||
      c.description.toLowerCase().includes(term) ||
      c.topics.some((t) => t.toLowerCase().includes(term)) ||
      c.skillsGained.some((s) => s.toLowerCase().includes(term));

    const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <Badge variant="cyan" size="md">
            COMPREHENSIVE SEMICONDUCTOR CURRICULUM
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Semiconductor Engineering Courses
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            11 rigorous university-grade courses covering quantum carrier transport, PN junctions, MOSFET scaling, CMOS logic, VLSI physical design, EUV fabrication, Wide Bandgap GaN/SiC, memory architectures, and TCAD reliability testing.
          </p>
        </div>

        {/* Global Progress & Resume Learning Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {/* Platform Progress Overview */}
          <Card className="p-5 flex flex-col justify-between border-slate-800 bg-slate-950/80">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold uppercase">
                  <BarChart3 className="w-4 h-4" />
                  Overall Curriculum Mastery
                </span>
                <span className="text-slate-300">{totalCompletedCount} / {totalLessonsCount} Lessons</span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-slate-100 font-mono">
                  {platformProgressPct}%
                </span>
                <span className="text-xs text-slate-400">curriculum completed</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${platformProgressPct}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-3 mt-3 border-t border-slate-800/80">
              <span>11 Specialized Courses</span>
              <span>49 Structured Lessons</span>
            </div>
          </Card>

          {/* Resume Learning Callout */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900/90 to-purple-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <PlayCircle className="w-3 h-3 text-cyan-400" />
                  READY TO LEARN
                </span>
                {resumeInfo && (
                  <span className="text-xs font-mono text-slate-400">
                    {resumeInfo.course.code}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                {resumeInfo ? resumeInfo.nextLessonTitle : "Begin with Bohr Atomic Model & Quantization"}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-1">
                {resumeInfo
                  ? `Continue your study in "${resumeInfo.course.title}"`
                  : "Start from Semiconductor Fundamentals to build a rock-solid physical grounding."}
              </p>
            </div>

            <Button
              href={resumeInfo ? `/lessons/${resumeInfo.nextLessonId}` : "/lessons/bohr-atomic-model"}
              variant="primary"
              size="md"
              className="shrink-0 shadow-lg shadow-cyan-500/20"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Resume Learning
            </Button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#090E1D]/80 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, topics (e.g. SiC, GAAFET, STA, TCAD)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {["All", "Beginner", "Intermediate", "Advanced", "Professional"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  selectedLevel === lvl
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-slate-700"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/60 rounded-2xl border border-slate-800">
            <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">No courses match your search or filter.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLevel("All");
              }}
              className="mt-3 text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {filteredCourses.map((course) => {
              const courseProgress = progressMap[course.id] || { pct: 0, completed: 0 };
              const isStarted = courseProgress.completed > 0;
              const isFinished = courseProgress.pct === 100;

              return (
                <Card
                  key={course.id}
                  className="p-6 md:p-8 flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={course.badgeVariant} size="sm">
                          {course.code}
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {course.level}
                        </Badge>
                        {isFinished && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Completed
                          </span>
                        )}
                      </div>

                      <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {course.duration}
                      </span>
                    </div>

                    <div>
                      <Link href={`/courses/${course.id}`}>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                          {course.title}
                        </h2>
                      </Link>
                      <p className="text-xs text-slate-400 font-mono mt-1">
                        Instructor: {course.instructor}
                      </p>
                      <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Dynamic Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">
                          {courseProgress.completed} of {course.lessons.length} lessons completed
                        </span>
                        <span className={`font-semibold ${isFinished ? "text-emerald-400" : "text-cyan-400"}`}>
                          {courseProgress.pct}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFinished
                              ? "bg-emerald-400"
                              : "bg-gradient-to-r from-cyan-500 to-sky-500"
                          }`}
                          style={{ width: `${courseProgress.pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Topic Pills */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {course.topics.slice(0, 5).map((topic) => (
                        <span
                          key={topic}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-slate-400">
                      {course.lessons.length} Structured Lessons
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        href={`/courses/${course.id}`}
                        variant="secondary"
                        size="sm"
                      >
                        Syllabus
                      </Button>
                      <Button
                        href={
                          course.lessons.find((l) => !isLessonComplete(l.id))
                            ? `/lessons/${course.lessons.find((l) => !isLessonComplete(l.id))!.id}`
                            : `/lessons/${course.lessons[0].id}`
                        }
                        variant={isFinished ? "outline" : "primary"}
                        size="sm"
                        icon={<ChevronRight className="w-4 h-4" />}
                      >
                        {isFinished ? "Review" : isStarted ? "Resume" : "Start Course"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
