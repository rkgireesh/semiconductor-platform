import React from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ArrowRight, Sparkles, Cpu, Layers } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#07090e] via-[#0b1322] to-[#05070a]">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 tech-grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        <div className="inline-flex items-center justify-center">
          <Badge variant="cyan" size="md" dot={true}>
            ACCELERATE YOUR HARDWARE CAREER
          </Badge>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-50 leading-tight">
          Start your semiconductor{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
            journey.
          </span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From fundamental quantum and solid-state concepts to cutting-edge nanosheet fabrication and global VLSI careers. Begin mastering semiconductors today.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="#roadmap"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-xl shadow-cyan-500/20"
          >
            Start Learning
          </Button>
          <Button
            href="#features"
            variant="secondary"
            size="lg"
            icon={<Cpu className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Explore Labs & Tools
          </Button>
        </div>

        {/* Engineering commitment guarantees */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Interactive SPICE & TCAD Visualizers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>Foundry & Fabless Aligned Curriculum</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span>Zero Prerequisites Required</span>
          </div>
        </div>

      </div>
    </section>
  );
}
