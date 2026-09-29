"use client";

import React, { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { COURSES_DATA, CourseData } from "@/data/coursesData";
import {
  BookOpen,
  Clock,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Layers,
  UserCheck,
  Search,
  Filter
} from "lucide-react";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filteredCourses = COURSES_DATA.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <Badge variant="sky" size="md">
            STRUCTURED CERTIFICATION PATHWAYS
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Semiconductor Engineering Courses
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Rigorous university and industry-standard courses covering solid-state physics, compact modeling, CMOS logic, cleanroom fabrication, and VLSI tape-outs.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#090E1D]/80 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, topics (e.g. FinFET, STA)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {["All", "Beginner", "Intermediate", "Advanced", "Professional"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  selectedLevel === lvl
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="p-6 md:p-8 flex flex-col justify-between group hover:border-cyan-500/50"
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
                  </div>

                  <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {course.duration}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Course Progress</span>
                    <span className="text-cyan-400 font-semibold">{course.progressPct}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-sky-500 h-full rounded-full transition-all"
                      style={{ width: `${course.progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Topic Pills */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {course.topics.slice(0, 4).map((topic) => (
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
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {course.lessons.length} Core Lessons
                </span>
                <Button
                  href={`/courses/${course.id}`}
                  variant="primary"
                  size="sm"
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  Continue Learning
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
