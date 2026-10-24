"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  VisualizerMode,
  BiasMode,
  calculateLearnMetrics,
  calculateExploreMetrics,
  LEARN_STEPS,
} from "./pnJunctionModel";
import PNJunctionDiagram from "./PNJunctionDiagram";
import PNJunctionControls from "./PNJunctionControls";
import PNJunctionInfoPanel from "./PNJunctionInfoPanel";
import { Sparkles, Cpu, Maximize2, Minimize2 } from "lucide-react";

interface PNJunctionVisualizerProps {
  initialMode?: VisualizerMode;
  className?: string;
}

export default function PNJunctionVisualizer({
  initialMode = "learn",
  className = "",
}: PNJunctionVisualizerProps) {
  const [mode, setMode] = useState<VisualizerMode>(initialMode);
  const [learnStepIndex, setLearnStepIndex] = useState<number>(0);
  const [biasMode, setBiasMode] = useState<BiasMode>("equilibrium");
  const [voltageV, setVoltageV] = useState<number>(0.0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Detect user prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Compute live physics & educational metrics deterministically
  const currentMetrics = useMemo(() => {
    if (mode === "learn") {
      return calculateLearnMetrics(learnStepIndex);
    } else {
      return calculateExploreMetrics(biasMode, voltageV);
    }
  }, [mode, learnStepIndex, biasMode, voltageV]);

  // Mode change handler
  const handleModeChange = (newMode: VisualizerMode) => {
    setMode(newMode);
    if (newMode === "explore" && biasMode === "equilibrium") {
      setVoltageV(0.0);
    }
  };

  // Bias change handler
  const handleBiasChange = (newBias: BiasMode) => {
    setBiasMode(newBias);
    if (newBias === "equilibrium") {
      setVoltageV(0.0);
    } else if (newBias === "forward") {
      setVoltageV(0.6); // Default nominal forward conduction
    } else if (newBias === "reverse") {
      setVoltageV(1.5); // Default nominal reverse block
    }
  };

  // Reset handler
  const handleReset = () => {
    if (mode === "learn") {
      setLearnStepIndex(0);
    } else {
      setBiasMode("equilibrium");
      setVoltageV(0.0);
    }
  };

  return (
    <>
      {/* Full-screen Workstation Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-2 sm:p-6 flex items-start justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded PN Junction Laboratory Workstation"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="w-full max-w-7xl my-auto rounded-3xl border border-cyan-500/50 bg-slate-950 p-4 sm:p-8 space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Expanded Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
                    PN Junction Laboratory Workstation (Expanded View)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Interactive Silicon step junction device simulation and electrostatic potential modeling.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 text-xs font-mono transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
                <span>EXIT FULLSCREEN</span>
              </button>
            </div>

            {/* Diagram */}
            <PNJunctionDiagram
              metrics={currentMetrics}
              mode={mode}
              learnStepIndex={learnStepIndex}
              biasMode={biasMode}
              voltageV={voltageV}
              reducedMotion={reducedMotion}
            />

            {/* Side-by-side Controls & Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 w-full">
                <PNJunctionControls
                  mode={mode}
                  onModeChange={handleModeChange}
                  learnStepIndex={learnStepIndex}
                  onStepChange={setLearnStepIndex}
                  biasMode={biasMode}
                  onBiasChange={handleBiasChange}
                  voltageV={voltageV}
                  onVoltageChange={setVoltageV}
                  onReset={handleReset}
                  metrics={currentMetrics}
                />
              </div>
              <div className="lg:col-span-7 w-full">
                <PNJunctionInfoPanel
                  metrics={currentMetrics}
                  mode={mode}
                  learnStepIndex={learnStepIndex}
                  biasMode={biasMode}
                  voltageV={voltageV}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline Section */}
      <section
        id="pn-junction-visualizer"
        className={`w-full rounded-3xl border border-slate-800 bg-slate-950/95 p-4 sm:p-6 space-y-6 shadow-2xl relative overflow-hidden transition-all ${className}`}
      >
        {/* Background glow accent */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"
        />

        {/* Visualizer Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                <Cpu className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-cyan-400">
                INTERACTIVE SOLID-STATE VISUALIZATION
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              PN Junction Electrostatics & Carrier Dynamics
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore space-charge formation, the built-in potential barrier (Vbi), and carrier injection under forward and reverse bias.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Expand to Fullscreen Workstation"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Diagram */}
        <div className="relative z-10">
          <PNJunctionDiagram
            metrics={currentMetrics}
            mode={mode}
            learnStepIndex={learnStepIndex}
            biasMode={biasMode}
            voltageV={voltageV}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Controls and Information Panel Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start relative z-10">
          {/* Controls Column */}
          <div className="xl:col-span-5 w-full">
            <PNJunctionControls
              mode={mode}
              onModeChange={handleModeChange}
              learnStepIndex={learnStepIndex}
              onStepChange={setLearnStepIndex}
              biasMode={biasMode}
              onBiasChange={handleBiasChange}
              voltageV={voltageV}
              onVoltageChange={setVoltageV}
              onReset={handleReset}
              metrics={currentMetrics}
            />
          </div>

          {/* Telemetry & Info Panel Column */}
          <div className="xl:col-span-7 w-full">
            <PNJunctionInfoPanel
              metrics={currentMetrics}
              mode={mode}
              learnStepIndex={learnStepIndex}
              biasMode={biasMode}
              voltageV={voltageV}
            />
          </div>
        </div>
      </section>
    </>
  );
}
