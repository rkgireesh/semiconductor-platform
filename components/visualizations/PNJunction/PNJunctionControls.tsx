"use client";

import React from "react";
import {
  BiasMode,
  VisualizerMode,
  PNJunctionMetrics,
  LEARN_STEPS,
} from "./pnJunctionModel";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Compass,
  Zap,
  Sliders,
  CheckCircle2,
  Info,
} from "lucide-react";

interface PNJunctionControlsProps {
  mode: VisualizerMode;
  onModeChange: (mode: VisualizerMode) => void;
  learnStepIndex: number;
  onStepChange: (stepIndex: number) => void;
  biasMode: BiasMode;
  onBiasChange: (bias: BiasMode) => void;
  voltageV: number;
  onVoltageChange: (voltage: number) => void;
  onReset: () => void;
  metrics: PNJunctionMetrics;
}

export default function PNJunctionControls({
  mode,
  onModeChange,
  learnStepIndex,
  onStepChange,
  biasMode,
  onBiasChange,
  voltageV,
  onVoltageChange,
  onReset,
  metrics,
}: PNJunctionControlsProps) {
  const currentLearnStep = LEARN_STEPS[learnStepIndex];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 p-4 sm:p-6 space-y-6">
      {/* Top Mode Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => onModeChange("learn")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              mode === "learn"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>MODE 1 — LEARN</span>
          </button>

          <button
            onClick={() => onModeChange("explore")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              mode === "explore"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>MODE 2 — EXPLORE</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Reset to default state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: LEARN MODE CONTROLS                               */}
      {/* ========================================================= */}
      {mode === "learn" && (
        <div className="space-y-5">
          {/* Step Timeline Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-400 font-semibold tracking-wider">
                {currentLearnStep.badge}
              </span>
              <span className="text-slate-400">
                {learnStepIndex + 1} of {LEARN_STEPS.length} Steps
              </span>
            </div>

            {/* Stepper Dots Bar */}
            <div className="grid grid-cols-8 gap-1.5">
              {LEARN_STEPS.map((step, idx) => {
                const isActive = idx === learnStepIndex;
                const isPast = idx < learnStepIndex;
                return (
                  <button
                    key={step.step}
                    onClick={() => onStepChange(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      isActive
                        ? "bg-cyan-400 shadow-sm shadow-cyan-400/50"
                        : isPast
                        ? "bg-cyan-800 hover:bg-cyan-700"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                    title={`Jump to Step ${step.step}: ${step.title}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Current Step Title & Subtitle Card */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                {currentLearnStep.step}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                {currentLearnStep.title}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentLearnStep.subtitle}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() => onStepChange(Math.max(0, learnStepIndex - 1))}
              disabled={learnStepIndex === 0}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono font-medium transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>

            <button
              onClick={() =>
                onStepChange(Math.min(LEARN_STEPS.length - 1, learnStepIndex + 1))
              }
              disabled={learnStepIndex === LEARN_STEPS.length - 1}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <span>NEXT STEP</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: EXPLORE MODE CONTROLS                             */}
      {/* ========================================================= */}
      {mode === "explore" && (
        <div className="space-y-6">
          {/* Bias Selector Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              OPERATING BIAS CONDITION
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  onBiasChange("equilibrium");
                  onVoltageChange(0);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer text-center ${
                  biasMode === "equilibrium"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/40"
                }`}
              >
                Equilibrium (0 V)
              </button>

              <button
                onClick={() => {
                  onBiasChange("forward");
                  if (voltageV <= 0) onVoltageChange(0.6);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer text-center ${
                  biasMode === "forward"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/40"
                }`}
              >
                Forward Bias (+Va)
              </button>

              <button
                onClick={() => {
                  onBiasChange("reverse");
                  if (voltageV >= 0) onVoltageChange(1.5);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer text-center ${
                  biasMode === "reverse"
                    ? "bg-rose-500 text-slate-950 shadow-md shadow-rose-500/25"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-rose-500/40"
                }`}
              >
                Reverse Bias (−Vr)
              </button>
            </div>
          </div>

          {/* Voltage Parameter Slider */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>External Applied Voltage:</span>
              </span>
              <span
                className={`text-sm font-bold font-mono px-2 py-0.5 rounded border ${
                  biasMode === "forward"
                    ? "text-emerald-400 bg-emerald-950/60 border-emerald-500/40"
                    : biasMode === "reverse"
                    ? "text-rose-400 bg-rose-950/60 border-rose-500/40"
                    : "text-cyan-400 bg-cyan-950/60 border-cyan-500/40"
                }`}
              >
                {biasMode === "reverse" ? `−${Math.abs(voltageV).toFixed(2)} V` : `${voltageV.toFixed(2)} V`}
              </span>
            </div>

            {/* Slider depends on active bias */}
            {biasMode === "equilibrium" ? (
              <div className="py-2 text-xs font-mono text-slate-400 text-center bg-slate-900 rounded-lg border border-slate-800">
                Zero applied voltage in thermal equilibrium (Va = 0.00 V)
              </div>
            ) : biasMode === "forward" ? (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0.05"
                  max="0.75"
                  step="0.05"
                  value={voltageV}
                  onChange={(e) => onVoltageChange(Number(e.target.value))}
                  className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.05 V (Weak)</span>
                  <span>0.50 V (Knee)</span>
                  <span>0.65 V (Active)</span>
                  <span>0.75 V (Strong)</span>
                </div>

                {/* Forward Bias Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[10px] font-mono text-slate-400 self-center mr-1">
                    Presets:
                  </span>
                  {[0.1, 0.3, 0.5, 0.65, 0.7].map((val) => (
                    <button
                      key={val}
                      onClick={() => onVoltageChange(val)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                        Math.abs(voltageV - val) < 0.01
                          ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {val.toFixed(2)} V
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={Math.abs(voltageV)}
                  onChange={(e) => onVoltageChange(Number(e.target.value))}
                  className="w-full accent-rose-400 bg-slate-800 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>−0.1 V (Low)</span>
                  <span>−1.5 V</span>
                  <span>−3.0 V</span>
                  <span>−5.0 V (High Field)</span>
                </div>

                {/* Reverse Bias Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-[10px] font-mono text-slate-400 self-center mr-1">
                    Presets:
                  </span>
                  {[0.5, 1.0, 2.5, 5.0].map((val) => (
                    <button
                      key={val}
                      onClick={() => onVoltageChange(val)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                        Math.abs(Math.abs(voltageV) - val) < 0.05
                          ? "bg-rose-500 text-slate-950 font-bold border-rose-400"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      −{val.toFixed(1)} V
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Model Disclaimer Notice */}
      <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-[11px] font-mono text-slate-400">
        <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
        <span>
          Conceptual educational model of an abrupt Silicon step junction (Vbi = 0.70 V at 300 K).
        </span>
      </div>
    </div>
  );
}
