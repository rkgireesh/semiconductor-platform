import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Briefcase, ArrowRight, Binary, Cpu, Waves, ShieldCheck, Factory, Microscope, Sparkles } from "lucide-react";

export default function CareerPreviewSection() {
  const careerPaths = [
    {
      title: "VLSI Design",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      domain: "Silicon Architecture",
      desc: "Architect complex SoC subsystems, microarchitectures, and high-performance digital logic from specification to silicon.",
      skills: ["SystemVerilog", "SoC Architecture", "Timing Closure"],
    },
    {
      title: "RTL / Verilog",
      icon: <Binary className="w-5 h-5 text-sky-400" />,
      domain: "Logic Design",
      desc: "Implement synchronous circuits, state machines, and hardware accelerators with synthesizeable HDL code.",
      skills: ["Verilog / VHDL", "FSM Design", "Logic Synthesis"],
    },
    {
      title: "Physical Design",
      icon: <Cpu className="w-5 h-5 text-teal-400" />,
      domain: "Backend / P&R",
      desc: "Floorplanning, place and route (P&R), clock tree synthesis (CTS), static timing analysis (STA), and DRC/LVS closure.",
      skills: ["Place & Route", "CTS", "STA (PrimeTime)"],
    },
    {
      title: "Analog IC Design",
      icon: <Waves className="w-5 h-5 text-emerald-400" />,
      domain: "Custom Circuitry",
      desc: "Design high-speed ADCs, DACs, PLLs, low-dropout regulators (LDOs), and RF amplifiers in submicron CMOS nodes.",
      skills: ["Cadence Virtuoso", "SPICE", "Noise Analysis"],
    },
    {
      title: "Verification",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      domain: "Functional Safety",
      desc: "Build constrained random testbenches, assertions, coverage models, and formal verification frameworks using UVM.",
      skills: ["UVM / SystemVerilog", "Assertions (SVA)", "Coverage Metrics"],
    },
    {
      title: "Semiconductor Fabrication",
      icon: <Factory className="w-5 h-5 text-sky-400" />,
      domain: "Fab Process",
      desc: "Process engineering in cleanrooms: lithography, dry/wet etching, chemical vapor deposition (CVD), CMP, and yield optimization.",
      skills: ["EUV Photolithography", "Plasma Etch", "Yield Analytics"],
    },
    {
      title: "Device Engineering",
      icon: <Microscope className="w-5 h-5 text-teal-400" />,
      domain: "TCAD & Physics",
      desc: "Simulate novel transistor architectures (FinFET, CFET, GAAFET) using TCAD tools and characterize wafer test structures.",
      skills: ["TCAD Modeling", "C-V / I-V Characterization", "Defect Metrology"],
    },
  ];

  return (
    <section id="careers" className="py-20 bg-[#080c14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="teal" size="md">
              INDUSTRY ALIGNMENT & ROLES
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
              Turn semiconductor knowledge into career-ready skills.
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Explore specialized pathways aligned with leading semiconductor foundries, fabless semiconductor giants, and hardware innovation labs worldwide.
            </p>
          </div>

          <Button
            href="#careers"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Careers
          </Button>
        </div>

        {/* Career Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {careerPaths.map((career) => (
            <Card key={career.title} className="p-5 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                    {career.icon}
                  </div>
                  <Badge variant="slate" size="sm">
                    {career.domain}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {career.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {career.desc}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
                  Core Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {career.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}

          {/* Interactive Career Consultation Promo Box */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-950 border border-cyan-500/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-900/40 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">
                Semiconductor Career Navigator
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Match your physics and EE background with high-demand job profiles across foundries and design houses.
              </p>
            </div>

            <Button
              href="#careers"
              variant="primary"
              size="sm"
              className="mt-6 w-full"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Explore Careers
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
