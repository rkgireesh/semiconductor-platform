import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { COURSES_DATA, CourseData } from "@/data/coursesData";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Layers,
  UserCheck,
  CheckCircle2,
  Award
} from "lucide-react";

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export function generateStaticParams() {
  return COURSES_DATA.map((course) => ({
    courseId: course.id,
  }));
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = await params;
  const course: CourseData | undefined = COURSES_DATA.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL COURSES</span>
          </Link>

          <Badge variant={course.badgeVariant} size="md">
            {course.code}
          </Badge>
        </div>

        {/* Hero Header Banner */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-10 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" size="sm">
                {course.level}
              </Badge>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                {course.instructor}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed pt-1">
              {course.description}
            </p>

            {/* Quick Actions */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Button
                href={`/lessons/${course.lessons[0]?.id || "bohr-atomic-model"}`}
                variant="primary"
                size="lg"
                icon={<Sparkles className="w-4 h-4" />}
              >
                Start First Lesson
              </Button>
              <Button
                href="/roadmap"
                variant="secondary"
                size="lg"
              >
                View in Roadmap
              </Button>
            </div>
          </div>
        </div>

        {/* Course Syllabus / Lessons List */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">
                Course Syllabus & Interactive Lessons
              </h2>
              <p className="text-sm text-slate-400">
                Step-by-step physical derivations, band diagrams, and check-point quizzes.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              {course.lessons.length} LESSONS
            </span>
          </div>

          <div className="space-y-4">
            {course.lessons.map((lesson, idx) => (
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
                      <h3 className="text-base sm:text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {lesson.title}
                      </h3>
                      <Badge variant="outline" size="sm">
                        {lesson.duration}
                      </Badge>
                      <Badge variant="teal" size="sm">
                        {lesson.difficulty}
                      </Badge>
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
                Prerequisites & Foundation
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
