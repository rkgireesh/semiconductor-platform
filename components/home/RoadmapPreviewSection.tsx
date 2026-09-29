import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ArrowRight, Compass, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

export default function RoadmapPreviewSection() {
  const stages = [
    {
      num: "01",
      title: "Electrical & Atomic Fundamentals",
      desc: "Bohr atomic model, energy quantization, crystal lattice structures, silicon bonding, and free charge dynamics.",
      difficulty: "Beginner",
      diffVariant: "teal" as const,
      progress: "Ready to start",
      progressPct: 0,
      topics: ["Bohr Model", "Crystalline Silicon", "Valence & Conduction"],
    },
    {
      num: "02",
      title: "Semiconductor Fundamentals",
      desc: "Intrinsic & extrinsic semiconductors, n-type/p-type doping, carrier concentration (ni), Fermi-Dirac distribution, and drift vs diffusion.",
      difficulty: "Beginner",
      diffVariant: "teal" as const,
      progress: "Ready to start",
      progressPct: 0,
      topics: ["Doping (B / P)", "Fermi Level (Ef)", "Drift & Diffusion"],
    },
    {
      num: "03",
      title: "PN Junction & Diodes",
      desc: "Built-in potential (Vbi), depletion region dynamics, forward/reverse bias IV characteristics, capacitance, and breakdown mechanisms.",
      difficulty: "Intermediate",
      diffVariant: "sky" as const,
      progress: "Ready to start",
      progressPct: 0,
      topics: ["Space-Charge Region", "Shockley Equation", "Zener Breakdown"],
    },
    {
      num: "04",
      title: "BJT (Bipolar Junction Transistor)",
      desc: "NPN/PNP physics, minority carrier injection, base transport factor, Ebers-Moll equations, and small-signal amplification modes.",
      difficulty: "Intermediate",
      diffVariant: "sky" as const,
      progress: "Ready to start",
      progressPct: 0,
      topics: ["Base Narrowing", "Early Effect", "BJT Biasing"],
    },
    {
      num: "05",
      title: "MOSFET (Metal-Oxide-Semiconductor)",
      desc: "MOS capacitor states (accumulation, depletion, inversion), threshold voltage (Vth), square-law IV equations, subthreshold slope, and short-channel effects.",
      difficulty: "Advanced",
      diffVariant: "amber" as const,
      progress: "Ready to start",
      progressPct: 0,
      topics: ["Strong Inversion", "Vth & Pinch-off", "Velocity Saturation"],
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-[#070b12] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="cyan" size="md">
              CURRICULUM ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
              Learning Roadmap Preview
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Step through our foundational stages designed specifically for electrical engineering, physics, and VLSI students.
            </p>
          </div>

          <Button
            href="#roadmap"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View Full Roadmap
          </Button>
        </div>

        {/* 5 Stages List/Cards */}
        <div className="space-y-4">
          {stages.map((stage) => (
            <Card
              key={stage.num}
              className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-cyan-500/40"
            >
              {/* Left Column: Number and Main Details */}
              <div className="flex items-start gap-4 md:gap-6 flex-1">
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center shrink-0 font-mono text-lg font-bold text-cyan-400 group-hover:border-cyan-500/50 group-hover:bg-cyan-950/30 transition-all">
                  {stage.num}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg md:text-xl font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {stage.title}
                    </h3>
                    <Badge variant={stage.diffVariant} size="sm">
                      {stage.difficulty}
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
                    {stage.desc}
                  </p>

                  {/* Core topics pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {stage.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-slate-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Progress Placeholder & Explore Action */}
              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="text-left md:text-right space-y-1">
                  <div className="flex items-center gap-2 md:justify-end">
                    <span className="text-xs font-mono text-slate-400">Progress:</span>
                    <span className="text-xs font-mono text-cyan-400 font-medium">
                      {stage.progressPct}%
                    </span>
                  </div>
                  <div className="w-24 md:w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all"
                      style={{ width: `${stage.progressPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {stage.progress}
                  </span>
                </div>

                <Button
                  href={`#module/${stage.num}`}
                  variant="secondary"
                  size="sm"
                  icon={<ChevronRight className="w-3.5 h-3.5" />}
                  className="group-hover:bg-cyan-950/60 group-hover:border-cyan-500/50 group-hover:text-cyan-200"
                >
                  Explore Module
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Callout button */}
        <div className="mt-10 text-center">
          <Button
            href="#roadmap"
            variant="primary"
            size="lg"
            icon={<Sparkles className="w-4 h-4" />}
          >
            View Full Roadmap
          </Button>
        </div>

      </div>
    </section>
  );
}
