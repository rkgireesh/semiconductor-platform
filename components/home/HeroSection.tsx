import React from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ChipVisual from "@/components/ui/ChipVisual";
import { ArrowRight, Compass, Sparkles, Binary, Cpu, Layers } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Background radial gradient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Engineering Indicator Badge */}
            <div className="inline-flex items-center justify-center lg:justify-start">
              <Badge variant="cyan" dot={true} size="md">
                NEXT-GEN SEMICONDUCTOR EDUCATION PLATFORM
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-50 leading-[1.1]">
              Master Semiconductor{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
                Technology.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              From atoms and charge carriers to transistors, fabrication, VLSI, and advanced semiconductor technologies.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                href="#roadmap"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Start Learning
              </Button>
              <Button
                href="#roadmap"
                variant="secondary"
                size="lg"
                icon={<Compass className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Explore Roadmap
              </Button>
            </div>

            {/* Key Platform Highlights / Fast Metrics */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono">
                  <Binary className="w-3.5 h-3.5" />
                  <span>FOUNDATIONS</span>
                </div>
                <span className="text-sm font-semibold text-slate-200 mt-1">Bandgap to GAAFET</span>
              </div>
              <div className="flex flex-col border-x border-slate-800/80 px-2 sm:px-4">
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>CHIP DESIGN</span>
                </div>
                <span className="text-sm font-semibold text-slate-200 mt-1">RTL, VLSI & Tape-out</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-teal-400 text-xs font-mono">
                  <Layers className="w-3.5 h-3.5" />
                  <span>CAREERS</span>
                </div>
                <span className="text-sm font-semibold text-slate-200 mt-1">Global IC Industry</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <ChipVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
