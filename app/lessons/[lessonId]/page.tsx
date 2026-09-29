"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { LESSONS_DATABASE, FullLessonData } from "@/data/lessonsData";
import { COURSES_DATA, CourseData } from "@/data/coursesData";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Sliders,
  AlertCircle,
  Award,
  ListOrdered,
  FileText
} from "lucide-react";

export default function LessonViewerPage() {
  const params = useParams();
  const lessonId = typeof params?.lessonId === "string" ? params.lessonId : "bohr-atomic-model";

  // Lookup lesson
  const lesson: FullLessonData = LESSONS_DATABASE[lessonId] || LESSONS_DATABASE["bohr-atomic-model"];
  const course: CourseData =
    COURSES_DATA.find((c) => c.id === lesson.courseId) || COURSES_DATA[0];

  // Interactive Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Try it yourself interactive simulation state
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [dopingExp, setDopingExp] = useState(16); // 10^16 cm^-3

  const vt = ((1.38e-23 * temperature) / 1.6e-19) * 1000; // mV
  const ni = Math.round(5.2e15 * Math.pow(temperature / 300, 1.5) * Math.exp(-0.56 / (8.62e-5 * temperature)));

  return (
    <div className="w-full py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/courses" className="hover:text-cyan-400 transition-colors">
              COURSES
            </Link>
            <span>/</span>
            <Link href={`/courses/${course.id}`} className="hover:text-cyan-400 transition-colors text-slate-300">
              {course.code}
            </Link>
            <span>/</span>
            <span className="text-cyan-400 truncate max-w-[200px] sm:max-w-xs">
              {lesson.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCompleted(!isCompleted)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isCompleted
                  ? "bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-sm shadow-emerald-500/20"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? "text-emerald-400" : "text-slate-500"}`} />
              <span>{isCompleted ? "Completed ✓" : "Mark Complete"}</span>
            </button>
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>EXIT VIEWER</span>
            </Link>
          </div>
        </div>

        {/* 3-Column Educational Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Course Navigation & Lesson List (3 cols) */}
          <div className="lg:col-span-3 space-y-4 sticky top-24 hidden lg:block">
            <Card className="p-4 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  CURRENT COURSE
                </span>
                <h3 className="font-bold text-slate-100 text-sm leading-snug">
                  {course.title}
                </h3>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">
                  COURSE LESSONS ({course.lessons.length})
                </span>

                <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                  {course.lessons.map((item, idx) => {
                    const isCurrent = item.id === lesson.id;
                    return (
                      <Link
                        key={item.id}
                        href={`/lessons/${item.id}`}
                        className={`p-2.5 rounded-xl text-xs font-medium flex items-start gap-2.5 transition-all block ${
                          isCurrent
                            ? "bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 shadow-sm"
                            : "text-slate-300 hover:bg-slate-900 hover:text-slate-100"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 ${
                            isCurrent
                              ? "bg-cyan-500 text-slate-950 font-bold"
                              : "bg-slate-900 border border-slate-800 text-slate-400"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="flex-1 truncate">
                          <div className="truncate">{item.title}</div>
                          <div className="text-[10px] font-mono text-slate-500 mt-0.5">{item.duration}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* CENTER COLUMN: Main Educational Content (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Lesson Title Header */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="cyan" size="sm">
                    {lesson.tag}
                  </Badge>
                  <Badge variant="outline" size="sm">
                    {lesson.difficulty}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                    {lesson.duration}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  {lesson.title}
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1">
                  {lesson.summary}
                </p>
              </div>
            </div>

            {/* Learning Objectives Box */}
            <Card className="p-6 border-sky-500/20 bg-slate-950/60">
              <h3 className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2 font-semibold">
                <Award className="w-4 h-4" />
                <span>Learning Objectives</span>
              </h3>
              <ul className="space-y-2">
                {lesson.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Key Formulas Section */}
            {lesson.keyFormulas && lesson.keyFormulas.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Governing Mathematical Equations</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lesson.keyFormulas.map((f, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="text-[11px] font-mono text-slate-400 mb-1.5 font-medium">
                        {f.label}
                      </div>
                      <div className="text-sm sm:text-base font-mono font-bold text-cyan-300 bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800 text-center mb-2">
                        {f.formula}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lesson Content Sections */}
            <div className="space-y-6">
              {lesson.sections.map((sec, sIdx) => (
                <Card key={sIdx} className="p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <span className="text-cyan-400 font-mono text-sm">§</span>
                    <span>{sec.title}</span>
                  </h2>

                  <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                    {sec.content.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {sec.callout && (
                    <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 text-cyan-200 text-xs sm:text-sm leading-relaxed">
                      <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-0.5 text-cyan-300">{sec.callout.title}</span>
                        {sec.callout.text}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* "Try It Yourself" Interactive Physics Sandbox */}
            <Card className="p-6 sm:p-8 border-cyan-500/20 bg-slate-950/90">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 text-sm sm:text-base">
                      Interactive Parameter Sandbox: Thermal & Doping
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tune temperature and donor concentration to see live changes in thermal voltage (Vt) and intrinsic carrier density (ni).
                    </p>
                  </div>
                </div>
                <Badge variant="teal" size="sm">
                  LIVE
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Temperature (T):</span>
                    <span className="text-cyan-400 font-bold">{temperature} K</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    step="10"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>100 K</span>
                    <span>300 K (Room)</span>
                    <span>500 K</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Doping (Nd):</span>
                    <span className="text-sky-400 font-bold">10^{dopingExp} cm⁻³</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="20"
                    step="1"
                    value={dopingExp}
                    onChange={(e) => setDopingExp(Number(e.target.value))}
                    className="w-full accent-sky-400 bg-slate-800 rounded-lg cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>10¹⁴ (Light)</span>
                    <span>10¹⁷ (Channel)</span>
                    <span>10²⁰ (Degenerate)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">Thermal Voltage (Vt)</span>
                  <span className="text-base font-mono font-bold text-cyan-400">{vt.toFixed(2)} mV</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">Intrinsic Density (ni)</span>
                  <span className="text-base font-mono font-bold text-sky-400">{ni > 1e12 ? ni.toExponential(2) : ni.toLocaleString()} cm⁻³</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-slate-400 block">Doping Regime</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {dopingExp >= 19 ? "Degenerate (Metal-like)" : "Extrinsic Active"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Checkpoint Quiz */}
            {lesson.checkpoint && (
              <Card className="p-6 sm:p-8 border-slate-700 bg-slate-950">
                <div className="flex items-center gap-2 text-cyan-400 mb-3">
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                    Checkpoint Knowledge Check
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-4">
                  {lesson.checkpoint.question}
                </h3>

                <div className="space-y-2.5 mb-6">
                  {lesson.checkpoint.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === lesson.checkpoint.correctIndex;

                    let optionStyles = "bg-slate-900/80 border-slate-800 text-slate-200 hover:border-cyan-500/40";
                    if (submittedQuiz) {
                      if (isCorrect) {
                        optionStyles = "bg-emerald-950/40 border-emerald-500/80 text-emerald-200";
                      } else if (isSelected && !isCorrect) {
                        optionStyles = "bg-rose-950/40 border-rose-500/80 text-rose-200";
                      }
                    } else if (isSelected) {
                      optionStyles = "bg-cyan-950/50 border-cyan-400 text-cyan-100";
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => {
                          if (!submittedQuiz) setSelectedOption(optIdx);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer ${optionStyles}`}
                      >
                        <span>{opt}</span>
                        {submittedQuiz && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {submittedQuiz && isSelected && !isCorrect && (
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!submittedQuiz ? (
                  <Button
                    onClick={() => {
                      if (selectedOption !== null) setSubmittedQuiz(true);
                    }}
                    disabled={selectedOption === null}
                    variant="primary"
                    size="md"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <div
                      className={`p-4 rounded-xl text-xs sm:text-sm ${
                        selectedOption === lesson.checkpoint.correctIndex
                          ? "bg-emerald-950/30 border border-emerald-500/40 text-emerald-200"
                          : "bg-rose-950/30 border border-rose-500/40 text-rose-200"
                      }`}
                    >
                      <span className="font-bold block mb-1">
                        {selectedOption === lesson.checkpoint.correctIndex ? "✓ Correct Answer" : "✗ Incorrect Answer"}
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {lesson.checkpoint.explanation}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 px-1">
                      <span className="text-slate-500">SCORE:</span>
                      <span className={`font-bold ${selectedOption === lesson.checkpoint.correctIndex ? "text-emerald-400" : "text-rose-400"}`}>
                        {selectedOption === lesson.checkpoint.correctIndex ? "1" : "0"} / 1
                      </span>
                      <span className="text-slate-600">—</span>
                      <span className={`font-bold ${selectedOption === lesson.checkpoint.correctIndex ? "text-emerald-400" : "text-rose-400"}`}>
                        {selectedOption === lesson.checkpoint.correctIndex ? "100%" : "0%"}
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        setSubmittedQuiz(false);
                        setSelectedOption(null);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Retry Question
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Bottom Lesson Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
              {lesson.prevLessonId ? (
                <Button
                  href={`/lessons/${lesson.prevLessonId}`}
                  variant="secondary"
                  size="md"
                  icon={<ChevronLeft className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Previous Lesson
                </Button>
              ) : (
                <Button
                  href={`/courses/${course.id}`}
                  variant="secondary"
                  size="md"
                  icon={<ArrowLeft className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Back to Course
                </Button>
              )}

              {lesson.nextLessonId ? (
                <Button
                  href={`/lessons/${lesson.nextLessonId}`}
                  variant="primary"
                  size="md"
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  Next Lesson
                </Button>
              ) : (
                <Button
                  href="/roadmap"
                  variant="primary"
                  size="md"
                  icon={<Award className="w-4 h-4" />}
                >
                  Complete Module & View Roadmap
                </Button>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Progress & Key Takeaways (3 cols) */}
          <div className="lg:col-span-3 space-y-5 sticky top-24">
            
            {/* Lesson Completion Status */}
            <Card className="p-4 space-y-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                LESSON PROGRESS
              </span>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Mastery Status</span>
                <span className={isCompleted ? "text-emerald-400 font-bold" : "text-amber-400"}>
                  {isCompleted ? "Completed" : "In Progress"}
                </span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    isCompleted ? "bg-emerald-400 w-full" : "bg-cyan-400 w-3/4"
                  }`}
                />
              </div>
            </Card>

            {/* Key Takeaways */}
            <Card className="p-4 space-y-3">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                KEY CONCEPTS & TAKEAWAYS
              </span>
              <ul className="space-y-2">
                {lesson.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Quick Virtual Lab Action */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-purple-950/30 border border-cyan-500/30 space-y-2 text-center">
              <h4 className="text-xs font-semibold text-slate-100">
                Hands-On Virtual Lab
              </h4>
              <p className="text-[11px] text-slate-400">
                Experiment with live numerical parameter sliders.
              </p>
              <Button href="/labs" variant="outline" size="sm" className="w-full mt-2">
                Open Virtual Lab
              </Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
