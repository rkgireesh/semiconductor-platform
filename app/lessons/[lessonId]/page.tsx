"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { LESSONS_DATABASE, FullLessonData } from "@/data/lessonsData";
import { COURSES_DATA, CourseData } from "@/data/coursesData";
import { RESEARCH_TOPICS } from "@/data/researchData";
import { VIRTUAL_LABS } from "@/data/labsData";
import {
  markLessonComplete,
  isLessonComplete,
  syncProgressFromSupabase,
  getCompletedLessonIds,
} from "@/lib/progress";
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
  FileText,
  Compass,
  FlaskConical,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { PNJunctionVisualizer } from "@/components/visualizations/PNJunction";

export default function LessonViewerPage() {
  const params = useParams();
  const lessonId =
    typeof params?.lessonId === "string"
      ? params.lessonId
      : "bohr-atomic-model";

  // Lookup lesson
  const rawLesson: FullLessonData | undefined = LESSONS_DATABASE[lessonId];
  const lesson: FullLessonData = rawLesson || LESSONS_DATABASE["bohr-atomic-model"];

  const course: CourseData =
    COURSES_DATA.find((c) => c.id === lesson.courseId) || COURSES_DATA[0];

  // Derive previous and next lessons from course.lessons sequence if not explicitly set
  const courseLessons = course.lessons || [];
  const currentIdx = courseLessons.findIndex((l) => l.id === lessonId);
  const prevLessonId =
    lesson.prevLessonId ||
    (currentIdx > 0 ? courseLessons[currentIdx - 1]?.id : undefined);
  const nextLessonId =
    lesson.nextLessonId ||
    (currentIdx >= 0 && currentIdx < courseLessons.length - 1
      ? courseLessons[currentIdx + 1]?.id
      : undefined);

  // Normalize sections (handles both LessonSectionNew and LessonSectionOld formats)
  const normalizedSections = (lesson.sections || []).map((sec) => {
    const isNew = "title" in sec && Array.isArray((sec as { content?: string[] }).content);
    const title = isNew
      ? (sec as { title: string }).title
      : (sec as { heading?: string }).heading || "Detailed Analysis";

    let content: string[] = [];
    if (isNew) {
      content = (sec as { content: string[] }).content;
    } else if (typeof (sec as { body?: string }).body === "string") {
      content = (sec as { body: string }).body.split("\n\n").filter(Boolean);
    }

    const callout = "callout" in sec ? (sec as { callout?: { title: string; text: string } }).callout : undefined;
    return { title, content, callout };
  });

  // Normalize equations & formulas
  const formulas =
    lesson.keyFormulas && lesson.keyFormulas.length > 0
      ? lesson.keyFormulas
      : lesson.equations && lesson.equations.length > 0
      ? lesson.equations.map((eq) => ({
          label: eq.name,
          formula: eq.latex,
          desc: eq.explanation,
        }))
      : [];

  // Normalize quiz / checkpoint
  const checkpoint =
    lesson.checkpoint ||
    (lesson.quiz
      ? {
          question: lesson.quiz.question,
          options: lesson.quiz.options,
          correctIndex: lesson.quiz.correctAnswer,
          explanation: lesson.quiz.explanation,
        }
      : undefined);

  // Normalize learning objectives
  const learningObjectives: string[] =
    lesson.learningObjectives && lesson.learningObjectives.length > 0
      ? lesson.learningObjectives
      : lesson.description
      ? [lesson.description]
      : lesson.summary
      ? [lesson.summary]
      : [
          "Master core theoretical physics principles and governing equations",
          "Analyze key boundary conditions, doping dependencies, and scaling limits",
          "Connect physical theory directly to modern cleanroom fabrication practice",
        ];

  // Normalize key takeaways
  const keyTakeaways: string[] =
    lesson.keyTakeaways && lesson.keyTakeaways.length > 0
      ? lesson.keyTakeaways
      : lesson.practicalApplications && lesson.practicalApplications.length > 0
      ? lesson.practicalApplications
      : [
          "Core semiconductor physical equations and operational boundaries",
          "Material limits and scaling trade-offs in sub-micron processes",
          "Relevance to advanced packaging, lithography, and high-yield tape-outs",
        ];

  // Lookup related research topic and lab if configured
  const relatedResearch = lesson.relatedResearchTopicId
    ? RESEARCH_TOPICS.find((t) => t.id === lesson.relatedResearchTopicId)
    : undefined;

  const relatedLab = lesson.relatedLabId
    ? VIRTUAL_LABS.find((l) => l.id === lesson.relatedLabId)
    : undefined;

  // Interactive Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(() => isLessonComplete(lessonId));
  const [allCompletedIds, setAllCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      await syncProgressFromSupabase();

      if (!cancelled) {
        setIsCompleted(isLessonComplete(lessonId));
        setAllCompletedIds(new Set(getCompletedLessonIds()));
      }
    }

    void loadProgress();

    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  // Try it yourself interactive simulation state
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [dopingExp, setDopingExp] = useState(16); // 10^16 cm^-3

  const vt = ((1.38e-23 * temperature) / 1.6e-19) * 1000; // mV
  const ni = Math.round(
    5.2e15 * Math.pow(temperature / 300, 1.5) * Math.exp(-0.56 / (8.62e-5 * temperature))
  );

  const handleToggleComplete = () => {
    if (!isCompleted) {
      markLessonComplete(lessonId, lesson.courseId);
      setIsCompleted(true);
      setAllCompletedIds((prev) => new Set([...prev, lessonId]));
    } else {
      setIsCompleted(false);
      setAllCompletedIds((prev) => {
        const next = new Set(prev);
        next.delete(lessonId);
        return next;
      });
    }
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null || !checkpoint) return;
    setSubmittedQuiz(true);

    if (selectedOption === checkpoint.correctIndex) {
      markLessonComplete(lessonId, lesson.courseId, 100);
      setIsCompleted(true);
      setAllCompletedIds((prev) => new Set([...prev, lessonId]));
    }
  };

  const courseCompletedCount = courseLessons.filter((l) => allCompletedIds.has(l.id)).length;
  const courseProgressPct =
    courseLessons.length > 0
      ? Math.round((courseCompletedCount / courseLessons.length) * 100)
      : 0;

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
            <Link
              href={`/courses/${course.id}`}
              className="hover:text-cyan-400 transition-colors text-slate-300"
            >
              {course.code}
            </Link>
            <span>/</span>
            <span className="text-cyan-400 truncate max-w-[200px] sm:max-w-xs">
              {lesson.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleComplete}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isCompleted
                  ? "bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-sm shadow-emerald-500/20"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${isCompleted ? "text-emerald-400" : "text-slate-500"}`}
              />
              <span>{isCompleted ? "Completed ✓" : "Mark Complete"}</span>
            </button>

            <Badge variant={course.badgeVariant} size="sm">
              {course.code}
            </Badge>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          {/* LEFT COLUMN: Main Technical Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Lesson Title & Summary Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-medium">
                  {lesson.tag || course.code}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {lesson.duration}
                </span>
                <span className="text-xs font-mono text-slate-500">•</span>
                <span className="text-xs font-mono text-slate-400">
                  {lesson.difficulty || "Intermediate"} Level
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  {lesson.title}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
                  {lesson.summary || lesson.description}
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
                {learningObjectives.map((obj, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Governing Mathematical Equations */}
            {formulas.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Governing Mathematical Equations</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formulas.map((f, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="text-[11px] font-mono text-slate-400 mb-1.5 font-medium">
                        {f.label}
                      </div>
                      <div className="text-sm sm:text-base font-mono font-bold text-cyan-300 bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800 text-center mb-2 overflow-x-auto">
                        {f.formula}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Lesson Sections */}
            <div className="space-y-6">
              {normalizedSections.map((sec, sIdx) => (
                <Card key={sIdx} className="p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <span className="text-cyan-400 font-mono text-sm">§</span>
                    <span>{sec.title}</span>
                  </h2>

                  <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                    {sec.content.map((para: string, pIdx: number) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {sec.callout && (
                    <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 text-cyan-200 text-xs sm:text-sm leading-relaxed">
                      <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-0.5 text-cyan-300">
                          {sec.callout.title}
                        </span>
                        {sec.callout.text}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Interactive Physics Sandbox */}
            {lesson.courseId === "pn-junction-diodes" ||
            lesson.id === "pn-electrostatics-vbi" ? (
              <div id="pn-junction-visualizer" className="space-y-4">
                <PNJunctionVisualizer />
              </div>
            ) : (
              <Card className="p-6 sm:p-8 border-cyan-500/20 bg-slate-950/90">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
                      <Sliders className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-100 text-sm sm:text-base">
                        Interactive Parameter Sandbox: Thermal &amp; Doping
                      </h3>
                      <p className="text-xs text-slate-400">
                        Tune temperature and donor concentration to see live changes in
                        thermal voltage (Vt) and intrinsic carrier density (ni).
                      </p>
                    </div>
                  </div>
                  <Badge variant="teal" size="sm">
                    LIVE MODEL
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
                      <span className="text-sky-400 font-bold">
                        10<sup>{dopingExp}</sup> cm⁻³
                      </span>
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-xs text-slate-400 mb-2">Thermal Voltage (Vt)</p>
                    <p className="text-xl font-mono font-bold text-cyan-400">
                      {vt.toFixed(2)} mV
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Increases linearly with temperature.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-xs text-slate-400 mb-2">Intrinsic Carrier Density (ni)</p>
                    <p className="text-xl font-mono font-bold text-sky-400">
                      {ni > 1e12 ? ni.toExponential(2) : ni.toLocaleString("en-US")} cm⁻³
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Exponentially dependent on temperature.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-xs text-slate-400 mb-2">Doping Regime</p>
                    <p className="text-xl font-mono font-bold text-emerald-400">
                      {dopingExp >= 19
                        ? "Degenerate"
                        : dopingExp >= 17
                        ? "Heavy"
                        : "Moderate"}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Higher doping controls carrier concentration.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Checkpoint / Quiz Section */}
            {checkpoint && (
              <Card className="p-6 sm:p-8 border-slate-700 bg-slate-950">
                <div className="flex items-center gap-2 text-cyan-400 mb-3">
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                    Knowledge Checkpoint
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-4">
                  {checkpoint.question}
                </h3>

                <div className="space-y-3 mb-6">
                  {checkpoint.options.map((opt: string, optIdx: number) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === checkpoint.correctIndex;

                    let optionStyles = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

                    if (submittedQuiz) {
                      if (isCorrect) {
                        optionStyles = "bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-semibold";
                      } else if (isSelected && !isCorrect) {
                        optionStyles = "bg-rose-950/40 border-rose-500/60 text-rose-200";
                      }
                    } else if (isSelected) {
                      optionStyles = "bg-cyan-950/40 border-cyan-500 text-cyan-200 font-semibold";
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
                    onClick={handleQuizSubmit}
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
                        selectedOption === checkpoint.correctIndex
                          ? "bg-emerald-950/30 border border-emerald-500/40 text-emerald-200"
                          : "bg-rose-950/30 border border-rose-500/40 text-rose-200"
                      }`}
                    >
                      <span className="font-bold block mb-1">
                        {selectedOption === checkpoint.correctIndex
                          ? "✓ Correct! Lesson automatically marked complete."
                          : "✗ Incorrect Answer"}
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {checkpoint.explanation}
                      </p>
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

            {/* Connected Research & Lab Integration Section */}
            {(relatedResearch || relatedLab) && (
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Connected Frontier Explorations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedResearch && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-slate-900 border border-cyan-500/30 space-y-2">
                      <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-semibold">
                        <Compass className="w-3.5 h-3.5" />
                        <span>RESEARCH TOPIC #{relatedResearch.areaNumber}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100">
                        {relatedResearch.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {relatedResearch.explanation}
                      </p>
                      <div className="pt-2">
                        <Link
                          href={`/research#${relatedResearch.id}`}
                          className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <span>Explore Research Paper</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {relatedLab && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/30 to-slate-900 border border-purple-500/30 space-y-2">
                      <div className="flex items-center gap-1.5 text-purple-400 text-xs font-mono font-semibold">
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>VIRTUAL SIMULATION LAB</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100">
                        {relatedLab.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {relatedLab.description}
                      </p>
                      <div className="pt-2">
                        <Link
                          href={`/labs#${relatedLab.id}`}
                          className="inline-flex items-center gap-1 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <span>Launch Interactive Lab</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Lesson Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
              {prevLessonId ? (
                <Button
                  href={`/lessons/${prevLessonId}`}
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

              {nextLessonId ? (
                <Button
                  href={`/lessons/${nextLessonId}`}
                  variant="primary"
                  size="md"
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  Next Lesson
                </Button>
              ) : (
                <Button
                  href={`/courses/${course.id}`}
                  variant="primary"
                  size="md"
                  icon={<Award className="w-4 h-4" />}
                >
                  Complete Course Overview
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
                <span
                  className={
                    isCompleted
                      ? "text-emerald-400 font-bold"
                      : "text-amber-400"
                  }
                >
                  {isCompleted ? "Completed ✓" : "In Progress"}
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

            {/* Course Progress Card */}
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  COURSE COMPLETION
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {courseProgressPct}%
                </span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all"
                  style={{ width: `${courseProgressPct}%` }}
                />
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                {courseCompletedCount} of {courseLessons.length} lessons finished
              </p>
            </Card>

            {/* Key Takeaways */}
            <Card className="p-4 space-y-3">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                KEY CONCEPTS &amp; TAKEAWAYS
              </span>
              <ul className="space-y-2">
                {keyTakeaways.map((takeaway, tIdx) => (
                  <li
                    key={tIdx}
                    className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Course Navigation List */}
            <Card className="p-4 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                ALL COURSE LESSONS ({courseLessons.length})
              </span>
              <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                {courseLessons.map((l, idx) => {
                  const isCurrent = l.id === lessonId;
                  const isDone = allCompletedIds.has(l.id);

                  return (
                    <Link
                      key={l.id}
                      href={`/lessons/${l.id}`}
                      className={`block p-2 rounded-lg text-xs transition-colors ${
                        isCurrent
                          ? "bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold"
                          : "text-slate-300 hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-700 flex items-center justify-center text-[9px] font-mono text-slate-500 shrink-0">
                            {idx + 1}
                          </span>
                        )}
                        <span className="truncate">{l.title}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>

            {/* Quick Action: Virtual Lab */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-purple-950/30 border border-cyan-500/30 space-y-2 text-center">
              <h4 className="text-xs font-semibold text-slate-100">
                Hands-On Virtual Lab
              </h4>
              <p className="text-[11px] text-slate-400">
                Experiment with live semiconductor numerical simulations and device models.
              </p>
              <Button href="/labs" variant="outline" size="sm" className="w-full mt-2">
                Open Virtual Labs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
