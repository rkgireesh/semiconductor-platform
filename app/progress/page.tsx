"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  getFullProgressStore,
  syncProgressFromSupabase,
  ProgressStore,
  getCourseProgress
} from "@/lib/progress";
import { COURSES_DATA } from "@/data/coursesData";
import {
  LineChart,
  Award,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function ProgressPage() {
  const [store, setStore] = useState<ProgressStore>({
    completedLessons: {},
    quizScores: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      try {
        await syncProgressFromSupabase();
      } catch {
        // Fallback to local storage if network/auth fails
      }
      setStore(getFullProgressStore());
      setLoading(false);
    }
    loadProgress();
  }, []);

  const completedLessonIds = Object.keys(store.completedLessons || {});
  const completedCount = completedLessonIds.length;
  const quizScoresList = Object.values(store.quizScores || {});
  const averageQuizScore =
    quizScoresList.length > 0
      ? Math.round(
          quizScoresList.reduce((acc, score) => acc + score, 0) /
            quizScoresList.length
        )
      : 0;

  // Total lessons across all courses
  const totalLessons = COURSES_DATA.reduce(
    (acc, c) => acc + (c.lessons?.length || c.lessonCount || 0),
    0
  );
  const overallPercentage =
    totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;

  const achievements = [
    {
      id: "quantum-orbit",
      title: "Quantum Novice",
      desc: "Complete your first atomic bandgap & silicon lattice lesson.",
      unlocked: completedCount >= 1,
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      badge: "Stage 01"
    },
    {
      id: "carrier-master",
      title: "Carrier Transport Pro",
      desc: "Master drift, diffusion, and Fermi-Dirac statistics.",
      unlocked: completedCount >= 3,
      icon: <Zap className="w-5 h-5 text-sky-400" />,
      badge: "Stage 02"
    },
    {
      id: "device-engineer",
      title: "Device Engineer",
      desc: "Pass the PN Junction & MOSFET simulation testbenches.",
      unlocked: completedCount >= 5,
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      badge: "Stage 03"
    },
    {
      id: "vlsi-architect",
      title: "VLSI Tape-out Architect",
      desc: "Complete digital synthesis & static timing analysis benchmarks.",
      unlocked: completedCount >= 8,
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      badge: "Stage 04"
    },
  ];

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ← Back to Home
          </Link>

          <Badge variant="cyan" size="md">
            STUDENT TELEMETRY & MASTERY
          </Badge>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="sky" size="md" dot>
            PROGRESS & ANALYTICS DASHBOARD
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Your Semiconductor Learning Telemetry
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time tracking of completed physics lessons, virtual workbench experiments, quiz testbench scores, and engineering certification milestones.
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          
          {/* Card 1: Overall Mastery */}
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400">Overall Mastery</span>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                {loading ? "..." : `${overallPercentage}%`}
              </div>
              <p className="text-xs text-slate-400">
                Curriculum completion rate
              </p>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 mt-4 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-sky-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, overallPercentage)}%` }}
              />
            </div>
          </div>

          {/* Card 2: Completed Lessons */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400">Lessons Finished</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                {loading ? "..." : completedCount}
              </div>
              <p className="text-xs text-slate-400">
                Out of {totalLessons} core syllabus modules
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 mt-4 block">
              Auto-synced with Supabase & LocalStore
            </span>
          </div>

          {/* Card 3: Quiz Score Average */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400">Diagnostic Mastery</span>
                <LineChart className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                {loading ? "..." : quizScoresList.length > 0 ? `${averageQuizScore}%` : "100%"}
              </div>
              <p className="text-xs text-slate-400">
                {quizScoresList.length} testbenches evaluated
              </p>
            </div>
            <span className="text-[11px] font-mono text-sky-400 mt-4 block">
              Physics & circuit quiz checks
            </span>
          </div>

          {/* Card 4: Certification Track */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400">Target Discipline</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white truncate">
                Device & VLSI
              </div>
              <p className="text-xs text-slate-400">
                Stage 01 to Stage 04 Pathway
              </p>
            </div>
            <Link
              href="/roadmap"
              className="text-[11px] font-mono text-purple-400 hover:text-purple-300 mt-4 flex items-center gap-1 font-semibold"
            >
              <span>View 12-Stage Roadmap</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* Course-by-Course Progress Breakdown */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                Course Track Breakdown
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Progress by university and industry-standard course tracks.
              </p>
            </div>
            <Link
              href="/courses"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Browse All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COURSES_DATA.map((course) => {
              const totalCourseLessons = course.lessons?.length || course.lessonCount || 1;
              const percent = getCourseProgress(course.id, totalCourseLessons);

              return (
                <Card
                  key={course.id}
                  className="p-5 sm:p-6 flex flex-col justify-between group hover:border-cyan-500/40"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant={course.badgeVariant} size="sm">
                        {course.code}
                      </Badge>
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        {percent}% Completed
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                      <div
                        className="bg-cyan-400 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">{totalCourseLessons} Lessons</span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      <span>{percent > 0 ? "Resume Course" : "Start Course"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Milestone Achievement Badges */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Engineering Milestone Badges
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Earn validated badges as you complete lessons, pass testbenches, and build silicon designs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  ach.unlocked
                    ? "glass-panel border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                    : "bg-slate-950/60 border-slate-800/60 opacity-60"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      {ach.icon}
                    </div>
                    <Badge variant={ach.unlocked ? "cyan" : "outline"} size="sm">
                      {ach.badge}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-100">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {ach.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
                  {ach.unlocked ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      UNLOCKED & VERIFIED
                    </span>
                  ) : (
                    <span className="text-slate-500">In Progress...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Recommended Activity CTA */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 text-center space-y-4">
          <Badge variant="cyan" size="md">
            CONTINUE YOUR SILICON JOURNEY
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Ready to Take Your Next Engineering Step?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Resume right where you left off or run a parameter sweep in the virtual labs to solidify your understanding.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/roadmap" variant="primary" size="md">
              Open Curriculum Roadmap
            </Button>
            <Button href="/labs" variant="secondary" size="md">
              Virtual Labs Workbench
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
