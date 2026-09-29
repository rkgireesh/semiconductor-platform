import React from "react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { Brain, Cpu, Car, Radio, Sparkles, Globe, Shield } from "lucide-react";

export default function WhySemiconductorsSection() {
  const cards = [
    {
      title: "AI & Supercomputing",
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      tag: "COMPUTE",
      desc: "From tensor processing units to massive datacenter accelerators, modern artificial intelligence models rely entirely on high-density silicon architectures and packaging.",
      stat: "100B+ Transistors / Chip",
    },
    {
      title: "Global Infrastructure & 5G/6G",
      icon: <Radio className="w-6 h-6 text-sky-400" />,
      tag: "CONNECTIVITY",
      desc: "High-frequency RF front-ends, optical interconnects, and cellular base stations enable real-time worldwide data synchronization and low-latency networks.",
      stat: "Sub-millisecond Latency",
    },
    {
      title: "Automotive & Clean Energy",
      icon: <Car className="w-6 h-6 text-teal-400" />,
      tag: "POWER & MOBILITY",
      desc: "Wide-bandgap materials like Silicon Carbide (SiC) and Gallium Nitride (GaN) maximize EV powertrain efficiency, solar inverters, and autonomous sensor suites.",
      stat: ">98% Inverter Efficiency",
    },
    {
      title: "National & Economic Strategic Tech",
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      tag: "CRITICAL INDUSTRY",
      desc: "Semiconductor fabrication is the cornerstone of sovereign technological leadership, advanced defense systems, medical imaging, and global consumer electronics.",
      stat: "$1 Trillion Market By 2030",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with primary quote */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="teal" size="md">
            THE SILICON IMPERATIVE
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Why Semiconductors?
          </h2>
          <blockquote className="text-lg md:text-xl text-cyan-200/90 font-medium italic border-y border-cyan-500/20 py-4 px-6 bg-cyan-950/20 rounded-xl">
            “Semiconductors power modern computing, communication, artificial intelligence, automobiles, electronics, and countless technologies.”
          </blockquote>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Every breakthrough in digital technology originates from semiconductor device physics and fabrication precision.
          </p>
        </div>

        {/* 4 Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Card key={card.title} className="flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:shadow-md group-hover:shadow-cyan-500/10 transition-all">
                    {card.icon}
                  </div>
                  <Badge variant="outline" size="sm">
                    {card.tag}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400/90 font-medium">
                  {card.stat}
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors" />
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
