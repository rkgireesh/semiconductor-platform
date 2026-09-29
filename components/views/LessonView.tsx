"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { LESSONS_DATA, MODULES_DATA, LessonData } from "@/data/curriculumData";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Sliders,
  Award,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  AlertCircle
} from "lucide-react";

interface LessonViewProps {
  lessonId: string;
  onNavigate?: (hash: string) => void;
}

export default function LessonView({ lessonId, onNavigate }: LessonViewProps) {
  // Try to find the exact lesson or find by substring/module
  let lesson: LessonData = LESSONS_DATA[lessonId];

  // If not found directly, look across all modules
  if (!lesson) {
    for (const modKey in MODULES_DATA) {
      const mod = MODULES_DATA[modKey];
      const found = mod.lessons.find((l) => l.id === lessonId);
      if (found) {
        lesson = {
          id: found.id,
          moduleId: mod.id,
          title: found.title,
          duration: found.duration,
          difficulty: found.difficulty,
          tag: "SEMICONDUCTOR THEORY",
          summary: `Comprehensive engineering exploration of ${found.title}.`,
          sections: [
            {
              title: "1. Theoretical Physics Foundations",
              content: [
                `Understanding the core principles of ${found.title} is essential for modeling modern semiconductor devices.`,
                "In solid-state physics, charge carrier dynamics and electrostatic field equations determine current conduction, switching speed, and leakage.",
                "Review the derivations, band bending diagrams, and mathematical formulations below."
              ],
              callout: `Key Takeaway: Master the fundamental governing equations of ${found.title} to analyze both planar and 3D nanoscale transistor nodes.`
            },
            {
              title: "2. Mathematical Modeling & Derivations",
              content: [
                "Apply Poisson's equation and carrier continuity equations to obtain spatial charge and potential profiles.",
                "Examine how temperature, doping impurity levels, and material dielectric constants dictate physical boundary conditions."
              ]
            }
          ],
          keyFormulas: [
            {
              label: "Thermal Voltage (Vt)",
              formula: "Vt = (k · T) / q ≈ 25.86 mV (at 300K)",
              desc: "Fundamental thermal energy per unit electron charge."
            },
            {
              label: "Carrier Continuity",
              formula: "∂n/∂t = (1/q) ∇·Jn + Gn - Rn",
              desc: "Conservation of electron charge under drift, diffusion, generation, and recombination."
            }
          ],
          checkpoint: {
            question: `What is the primary physical mechanism governing carrier motion under an applied electric field?`,
            options: [
              "Carrier drift governed by mobility (μ)",
              "Thermal conduction solely by phonons",
              "Random Brownian motion with zero net velocity",
              "Superconducting flux pinning"
            ],
            correctIndex: 0,
            explanation: "Under an electric field (E), mobile carriers experience an electrostatic force F = qE resulting in net directional drift velocity vd = μ · E."
          }
        };
        break;
      }
    }
  }

  // Final fallback if still null
  if (!lesson) {
    lesson = LESSONS_DATA["bohr-atomic-model"];
  }

  const moduleData = MODULES_DATA[lesson.moduleId] || MODULES_DATA["01"];

  // Quiz interactive state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Interactive sandbox slider state
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [dopingExp, setDopingExp] = useState(16); // 10^16 cm^-3

  // Calculated sandbox metrics
  const vt = ((1.38e-23 * temperature) / 1.6e-19) * 1000; // mV
  const ni = Math.round(5.2e15 * Math.pow(temperature / 300, 1.5) * Math.exp(-0.56 / (8.62e-5 * temperature))); // approx ni

  const handleNav = (hash: string) => {
    if (onNavigate) {
      onNavigate(hash);
    } else {
      window.location.hash = hash;
    }
  };

  // Find next and previous lessons in the module
  const currentLessonIndex = moduleData.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentLessonIndex > 0 ? moduleData.lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < moduleData.lessons.length - 1
      ? moduleData.lessons[currentLessonIndex + 1]
      : null;

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <button
              onClick={() => handleNav("#roadmap")}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              ROADMAP
            </button>
            <span>/</span>
            <button
              onClick={() => handleNav(`#module/${moduleData.id}`)}
              className="hover:text-cyan-400 transition-colors cursor-pointer text-slate-300"
            >
              MODULE {moduleData.num}
            </button>
            <span>/</span>
            <span className="text-cyan-400 truncate max-w-[200px] sm:max-w-xs">
              {lesson.title}
            </span>
          </div>

          <button
            onClick={() => handleNav(`#module/${moduleData.id}`)}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO MODULE</span>
          </button>
        </div>

        {/* Lesson Header Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 mb-10 border border-slate-800 relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="cyan" size="sm">
                {lesson.tag}
              </Badge>
              <Badge variant="outline" size="sm">
                {lesson.difficulty}
              </Badge>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                {lesson.duration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              {lesson.title}
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed pt-1">
              {lesson.summary}
            </p>
          </div>
        </div>

        {/* Key Formulas Section */}
        {lesson.keyFormulas && lesson.keyFormulas.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Core Governing Equations</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.keyFormulas.map((formula, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="text-xs font-mono text-slate-400 mb-2 font-medium">
                    {formula.label}
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-cyan-300 bg-slate-900/90 px-3.5 py-2.5 rounded-lg border border-slate-800/80 mb-2.5 text-center group-hover:text-cyan-200">
                    {formula.formula}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {formula.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Lesson Sections */}
        <div className="space-y-8 mb-12">
          {lesson.sections.map((section, idx) => (
            <Card key={idx} className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-base">§</span>
                <span>{section.title}</span>
              </h2>

              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {section.callout && (
                <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 text-cyan-200 text-xs sm:text-sm leading-relaxed">
                  <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>{section.callout}</div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Interactive Physics Micro-Sandbox */}
        <Card className="p-6 sm:p-8 mb-12 border-cyan-500/20 bg-slate-950/90">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
                <Sliders className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 text-base">
                  Interactive Physics Sandbox: Thermal & Doping Calculator
                </h3>
                <p className="text-xs text-slate-400">
                  Tune temperature and donor concentration to see live changes in thermal voltage (Vt) and intrinsic carrier density (ni).
                </p>
              </div>
            </div>
            <Badge variant="teal" size="sm">
              LIVE SOLVER
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Slider 1: Temperature */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Temperature (T):</span>
                <span className="text-cyan-400 font-bold">{temperature} K ({(temperature - 273.15).toFixed(1)} °C)</span>
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
                <span>100 K (Cryogenic)</span>
                <span>300 K (Room)</span>
                <span>500 K (High-Temp Fab)</span>
              </div>
            </div>

            {/* Slider 2: Doping */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Donor Doping (Nd):</span>
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
                <span>10¹⁴ (Lightly Doped)</span>
                <span>10¹⁷ (Channel)</span>
                <span>10²⁰ (Degenerate S/D)</span>
              </div>
            </div>
          </div>

          {/* Computed Output Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">Thermal Voltage (Vt)</span>
              <span className="text-lg font-mono font-bold text-cyan-400">{vt.toFixed(2)} mV</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 block">Intrinsic Density (ni)</span>
              <span className="text-lg font-mono font-bold text-sky-400">{ni > 1e12 ? ni.toExponential(2) : ni.toLocaleString()} cm⁻³</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-slate-400 block">Doping Regime</span>
              <span className="text-base font-mono font-semibold text-emerald-400">
                {dopingExp >= 19 ? "Degenerate (Metal-like)" : dopingExp >= 16 ? "Extrinsic Active" : "Lightly Doped"}
              </span>
            </div>
          </div>
        </Card>

        {/* Concept Checkpoint Quiz */}
        {lesson.checkpoint && (
          <Card className="p-6 sm:p-8 mb-12 border-slate-700 bg-slate-950">
            <div className="flex items-center gap-2 text-cyan-400 mb-3">
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                Concept Checkpoint
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-4">
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
                    {selectedOption === lesson.checkpoint.correctIndex
                      ? "✓ Correct!"
                      : "✗ Review Explanation:"}
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {lesson.checkpoint.explanation}
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

        {/* Bottom Pagination & Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
          {prevLesson ? (
            <Button
              onClick={() => handleNav(`#lesson/${prevLesson.id}`)}
              variant="secondary"
              size="md"
              icon={<ChevronLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              Previous: {prevLesson.title.slice(0, 24)}...
            </Button>
          ) : (
            <Button
              onClick={() => handleNav(`#module/${moduleData.id}`)}
              variant="secondary"
              size="md"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              Back to Module
            </Button>
          )}

          {nextLesson ? (
            <Button
              onClick={() => handleNav(`#lesson/${nextLesson.id}`)}
              variant="primary"
              size="md"
              icon={<ChevronRight className="w-4 h-4" />}
            >
              Next: {nextLesson.title.slice(0, 24)}...
            </Button>
          ) : (
            <Button
              onClick={() => handleNav("#roadmap")}
              variant="primary"
              size="md"
              icon={<Award className="w-4 h-4" />}
            >
              Complete Module & View Roadmap
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
