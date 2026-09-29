import React from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Activity, BookCheck, Trophy, CheckCircle2, TrendingUp, Cpu, Flame, Target, ArrowRight } from "lucide-react";

export default function ProgressPreviewSection() {
  const metrics = [
    {
      label: "Overall Progress",
      value: "68%",
      subtext: "Foundational & Device Track",
      icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
      change: "+12% this week",
      barPct: 68,
      color: "from-cyan-500 to-sky-500",
    },
    {
      label: "Lessons Completed",
      value: "42 / 60",
      subtext: "7 modules fully mastered",
      icon: <BookCheck className="w-5 h-5 text-sky-400" />,
      change: "4 lessons remaining in MOSFET",
      barPct: 70,
      color: "from-sky-500 to-blue-500",
    },
    {
      label: "Quiz Score",
      value: "94.2%",
      subtext: "Average accuracy rate",
      icon: <Trophy className="w-5 h-5 text-teal-400" />,
      change: "Top 5% in Device Physics",
      barPct: 94,
      color: "from-teal-500 to-emerald-500",
    },
    {
      label: "Projects Completed",
      value: "5 Tape-outs",
      subtext: "Verified RTL & SPICE modules",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      change: "Latest: 5-Stage Ring Oscillator",
      barPct: 83,
      color: "from-emerald-500 to-cyan-500",
    },
  ];

  const recentModules = [
    { name: "MOSFET Subthreshold Slope & SCE", score: "98%", status: "Mastered", date: "Today" },
    { name: "PN Junction Breakdown & Zener Diodes", score: "92%", status: "Mastered", date: "Yesterday" },
    { name: "BJT Small-Signal Hybrid-Pi Model", score: "88%", status: "Completed", date: "3 days ago" },
    { name: "Carrier Drift-Diffusion & Einstein Relation", score: "100%", status: "Mastered", date: "5 days ago" },
  ];

  return (
    <section id="progress" className="py-20 bg-[#070a11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="cyan" size="md">
            STUDENT DASHBOARD & TELEMETRY
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Real-Time Mastery Tracking
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Monitor conceptual understanding, simulator laboratory runs, quiz accuracy, and tape-out project milestones in one integrated engineering console.
          </p>
        </div>

        {/* 4 Main Metrics Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {metrics.map((item) => (
            <Card key={item.label} className="p-5 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 font-medium">
                    {item.label}
                  </span>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                    {item.icon}
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-extrabold font-mono text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {item.subtext}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2 pt-3 border-t border-slate-800/80">
                <div className="w-full bg-slate-800/90 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${item.color} h-full rounded-full`}
                    style={{ width: `${item.barPct}%` }}
                  />
                </div>
                <div className="text-[11px] font-mono text-cyan-400/90 flex items-center justify-between">
                  <span>{item.change}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Dashboard Detailed Panel (Active Lab + Recent Mastery) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Active Device Simulation Lab State */}
          <div className="lg:col-span-7 glass-panel rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h4 className="font-mono text-sm font-semibold text-slate-200">
                    ACTIVE BENCH // MOSFET DC Characteristics
                  </h4>
                </div>
                <Badge variant="teal" size="sm">
                  LIVE BENCH
                </Badge>
              </div>

              {/* Lab Telemetry Display */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">Vgs (Gate)</div>
                  <div className="text-base font-mono font-bold text-cyan-400">1.20 V</div>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">Vds (Drain)</div>
                  <div className="text-base font-mono font-bold text-sky-400">0.85 V</div>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">Id (Drain Current)</div>
                  <div className="text-base font-mono font-bold text-teal-400">4.12 mA</div>
                </div>
                <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">State</div>
                  <div className="text-base font-mono font-bold text-emerald-400">Saturation</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Model: BSIM-CMG 111.0 (3nm node)</span>
                <span className="text-cyan-400">Convergence: 0.002 ps</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Continue your in-progress laboratory session
              </span>
              <Button href="#features" variant="primary" size="sm">
                Open Lab Console
              </Button>
            </div>
          </div>

          {/* Recent Module Mastery Records */}
          <div className="lg:col-span-5 glass-panel rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-mono text-sm font-semibold text-slate-200">
                  RECENT LESSON MASTERY
                </h4>
                <span className="text-[11px] font-mono text-slate-500">Last 7 Days</span>
              </div>

              <div className="space-y-2.5">
                {recentModules.map((mod) => (
                  <div
                    key={mod.name}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-xs">
                        {mod.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-cyan-400 font-semibold">{mod.score}</span>
                      <span className="text-[10px] text-slate-500">{mod.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
              <Button href="#roadmap" variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                View Complete Telemetry History
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
