import React from "react";
import Badge from "@/components/ui/Badge";
import { BookOpen, Eye, Code2, CheckCircle2, LineChart, Cpu, Award, ArrowRight } from "lucide-react";

export default function PlatformJourneySection() {
  const steps = [
    {
      id: "01",
      name: "LEARN",
      title: "Core Theory",
      desc: "Atomic physics, charge carrier dynamics, and semiconductor equations.",
      icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
      tag: "Foundations",
    },
    {
      id: "02",
      name: "VISUALIZE",
      title: "Device Dynamics",
      desc: "Interactive band diagrams, carrier distribution, and IV curves.",
      icon: <Eye className="w-5 h-5 text-sky-400" />,
      tag: "Simulations",
    },
    {
      id: "03",
      name: "PRACTICE",
      title: "Calculators & Labs",
      desc: "Hands-on parameter tuning for Fermi levels, depletion widths, and MOS capacitance.",
      icon: <Code2 className="w-5 h-5 text-teal-400" />,
      tag: "Engineering",
    },
    {
      id: "04",
      name: "TEST",
      title: "Concept Verification",
      desc: "Targeted problem sets, quiz challenges, and diagnostic test benches.",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      tag: "Validation",
    },
    {
      id: "05",
      name: "TRACK",
      title: "Mastery Analytics",
      desc: "Granular telemetry on topic retention, simulation accuracy, and milestones.",
      icon: <LineChart className="w-5 h-5 text-cyan-400" />,
      tag: "Telemetry",
    },
    {
      id: "06",
      name: "BUILD",
      title: "VLSI Projects",
      desc: "RTL design, SPICE modeling, standard cell layout, and tape-out exercises.",
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      tag: "Silicon Projects",
    },
    {
      id: "07",
      name: "CAREER",
      title: "Industry Ready",
      desc: "Portfolio generation, interview prep, and alignment with top semiconductor fabs & fabless firms.",
      icon: <Award className="w-5 h-5 text-teal-400" />,
      tag: "Employment",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#090d15]/60 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="sky" size="md">
            THE SYSTEM ARCHITECTURE
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            End-to-End Engineering Journey
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            A structured, rigorous pathway guiding students from theoretical quantum foundations to industry-standard silicon design and career placement.
          </p>
        </div>

        {/* Step Flow Banner / Visual Ribbon */}
        <div className="hidden lg:flex items-center justify-between mb-10 px-4 py-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-200 tracking-wider">
                  {step.name}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Flow Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="glass-panel glass-panel-hover rounded-xl p-5 flex flex-col justify-between relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    STEP {step.id}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                    {step.name}
                  </span>
                  <h3 className="text-base font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{step.tag}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
