"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Activity, Zap, Layers, Sparkles, Orbit, Radio } from "lucide-react";

export default function HeroVisual() {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    { label: "GAAFET 2nm", state: "Active Node", voltage: "0.65V", current: "1.42 mA/μm" },
    { label: "Backside Power", state: "BSPDN Rail", voltage: "VDD 0.70V", current: "Zero IR-Drop" },
    { label: "EUV 13.5nm", state: "0.55 High-NA", voltage: "8nm Pitch", current: "MOx Resist" },
    { label: "AlGaN/GaN", state: "2DEG Channel", voltage: "650V Breakdown", current: "μ > 2000" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [nodes.length]);

  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center justify-center p-4">
      
      {/* Background radial spotlights */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-purple-500/15 blur-3xl rounded-full pointer-events-none" />
      
      {/* Main Die Substrate Frame */}
      <div className="relative w-full aspect-square max-w-[420px] rounded-3xl bg-[#090E1D]/90 border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-cyan-400/60 transition-all duration-500">
        
        {/* Subtle SVG Circuit Traces & Bus Grid */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="circuit-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="0.75" />
              <circle cx="0" cy="0" r="1.5" fill="rgba(6, 182, 212, 0.6)" />
            </pattern>
            <linearGradient id="trace-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#818CF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-grid)" />

          {/* Bus lines radiating to center chip */}
          <path d="M 20 60 L 100 60 L 140 100 L 140 140" fill="none" stroke="url(#trace-glow)" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M 400 60 L 320 60 L 280 100 L 280 140" fill="none" stroke="url(#trace-glow)" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M 20 360 L 100 360 L 140 320 L 140 280" fill="none" stroke="url(#trace-glow)" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M 400 360 L 320 360 L 280 320 L 280 280" fill="none" stroke="url(#trace-glow)" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>

        {/* Top Silicon Die Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-cyan-300 font-semibold tracking-wider uppercase">
              DIE 01 // TAPE-OUT ACTIVE
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
            TSMC N2 / Sky130
          </span>
        </div>

        {/* Center Glowing Silicon Core */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          
          {/* Concentric glowing rings */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-44 h-44 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 animate-pulse-glow" />
            <div className="absolute w-56 h-56 rounded-full border border-sky-500/15 animate-spin" style={{ animationDuration: "25s" }} />

            {/* Central Chip Micro-Architecture Package */}
            <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-[#0E172A] via-[#0F172A] to-[#1E1B4B] border-2 border-cyan-400/80 shadow-xl shadow-cyan-500/30 flex flex-col items-center justify-center p-3 text-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center mb-1 shadow-inner shadow-cyan-500/30">
                <Cpu className="w-5 h-5 text-cyan-300 animate-pulse" />
              </div>
              <span className="text-[11px] font-bold text-slate-100 font-mono tracking-tight">
                {nodes[activeNode].label}
              </span>
              <span className="text-[9px] font-mono text-cyan-400 font-medium mt-0.5">
                {nodes[activeNode].state}
              </span>
            </div>
          </div>

          {/* Live Telemetry Floating Pill */}
          <div className="mt-5 flex items-center gap-3 bg-slate-950/90 px-4 py-2 rounded-xl border border-slate-800/80 text-xs font-mono shadow-lg">
            <div className="flex items-center gap-1 text-sky-400">
              <Zap className="w-3.5 h-3.5" />
              <span>{nodes[activeNode].voltage}</span>
            </div>
            <div className="w-px h-3 bg-slate-800" />
            <div className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>{nodes[activeNode].current}</span>
            </div>
          </div>

        </div>

        {/* Bottom Technical Indicators */}
        <div className="relative z-10 pt-3 border-t border-slate-800/80 grid grid-cols-4 gap-2 text-center">
          {nodes.map((node, i) => (
            <button
              key={node.label}
              onClick={() => setActiveNode(i)}
              className={`p-1.5 rounded-lg border text-[10px] font-mono transition-all cursor-pointer ${
                activeNode === i
                  ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              0{i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
