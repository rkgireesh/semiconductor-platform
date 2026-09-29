import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { FlaskConical, Calculator, CheckSquare, Layers, FolderGit2, BookMarked, ArrowUpRight } from "lucide-react";

export default function LearningFeaturesSection() {
  const features = [
    {
      title: "Interactive Labs",
      href: "#labs",
      icon: <FlaskConical className="w-6 h-6 text-cyan-400" />,
      tag: "SIMULATION",
      desc: "Dynamically visualize energy band diagrams, carrier injection profiles, PN junction depletion zones, and real-time IV characteristic curves.",
      features: ["Energy Bandgap Tuning", "PN Junction IV Tracer", "MOS Capacitance (C-V)"],
    },
    {
      title: "Calculators",
      href: "#lesson/intrinsic-extrinsic-doping",
      icon: <Calculator className="w-6 h-6 text-sky-400" />,
      tag: "ENGINEERING TOOLS",
      desc: "Instant precision mathematical tools for semiconductor physics: calculate built-in potential, Debye length, drift velocity, and sheet resistance.",
      features: ["Fermi-Dirac Solver", "Depletion Width Calculator", "Carrier Concentration (ni)"],
    },
    {
      title: "Quizzes",
      href: "#lesson/bohr-atomic-model",
      icon: <CheckSquare className="w-6 h-6 text-teal-400" />,
      tag: "KNOWLEDGE CHECK",
      desc: "Concept-verification assessments with detailed step-by-step physical derivations, diagnostic test questions, and gate-level logic quizzes.",
      features: ["Concept Checkpoints", "Derivation Reviews", "Interview Test Benches"],
    },
    {
      title: "Device Explorer",
      href: "#explore",
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      tag: "3D TOPOLOGY",
      desc: "Interactive 2D/3D cross-sectional views of planar MOSFETs, FinFETs, GAA Nanosheets, High-Electron-Mobility Transistors (HEMT), and CMOS inverters.",
      features: ["Planar to GAAFET Evolution", "Doping Profile Heatmaps", "Gate Oxide Stacks"],
    },
    {
      title: "Projects",
      href: "#careers",
      icon: <FolderGit2 className="w-6 h-6 text-cyan-400" />,
      tag: "SILICON TAPE-OUT",
      desc: "Hands-on engineering projects: design CMOS op-amps in SPICE, write synthesizeable RTL Verilog for RISC-V peripherals, and simulate cell layouts.",
      features: ["SPICE Circuit Simulations", "Verilog RTL Modules", "Open-Source PDK Flow"],
    },
    {
      title: "Research Hub",
      href: "#features",
      icon: <BookMarked className="w-6 h-6 text-sky-400" />,
      tag: "FRONTIER TECH",
      desc: "Stay ahead of cutting-edge research: High-NA EUV lithography, 2D transition metal dichalcogenides (TMDs), 3D packaging, and cryogenic CMOS.",
      features: ["Sub-2nm Node Reports", "Advanced Packaging (CoWoS)", "Wide Bandgap GaN/SiC"],
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#06080e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="sky" size="md">
            TOOLING & EXPERIENCES
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Comprehensive Learning Features
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Everything you need to master physical semiconductor science and VLSI digital/analog engineering in one unified workspace.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <Link key={item.title} href={item.href} className="flex">
              <Card className="flex flex-col justify-between w-full group hover:border-cyan-500/40 cursor-pointer">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:bg-cyan-950/20 transition-all">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" size="sm">
                        {item.tag}
                      </Badge>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Specific features checklist */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                  {item.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
