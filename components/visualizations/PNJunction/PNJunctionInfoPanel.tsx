"use client";

import React, { useState } from "react";
import {
  PNJunctionMetrics,
  BiasMode,
  VisualizerMode,
  LEARN_STEPS,
} from "./pnJunctionModel";
import {
  Activity,
  Zap,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
} from "lucide-react";

interface PNJunctionInfoPanelProps {
  metrics: PNJunctionMetrics;
  mode: VisualizerMode;
  learnStepIndex: number;
  biasMode: BiasMode;
  voltageV: number;
}

export default function PNJunctionInfoPanel({
  metrics,
  mode,
  learnStepIndex,
  biasMode,
  voltageV,
}: PNJunctionInfoPanelProps) {
  const [showFaq, setShowFaq] = useState(false);

  const currentLearnStep = LEARN_STEPS[learnStepIndex];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 p-4 sm:p-6 space-y-6">
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
            DEVICE TELEMETRY & PHYSICAL METRICS
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
          LIVE COMPUTED
        </span>
      </div>

      {/* Primary Metrics Grid (Section 10) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Metric 1: Operating Mode */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">
            Current Mode
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 block truncate">
            {mode === "learn" ? `Learn (${learnStepIndex + 1}/8)` : "Explore"}
          </span>
        </div>

        {/* Metric 2: Bias Condition */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">
            Bias Condition
          </span>
          <span
            className={`text-xs sm:text-sm font-mono font-bold block truncate ${
              biasMode === "forward"
                ? "text-emerald-400"
                : biasMode === "reverse"
                ? "text-rose-400"
                : "text-slate-200"
            }`}
          >
            {mode === "learn" ? "Guided State" : biasMode.toUpperCase()}
          </span>
        </div>

        {/* Metric 3: Applied Voltage */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">
            Applied Voltage
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-slate-100 block">
            {mode === "learn"
              ? "0.00 V"
              : biasMode === "reverse"
              ? `−${Math.abs(voltageV).toFixed(2)} V`
              : `${voltageV.toFixed(2)} V`}
          </span>
        </div>

        {/* Metric 4: Depletion Width */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">
            Depletion Width (W)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xs sm:text-sm font-mono font-bold text-indigo-300">
              {metrics.depletionWidthUm.toFixed(2)}
            </span>
            <span className="text-[10px] font-mono text-slate-400">µm</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 block truncate mt-0.5">
            {metrics.depletionTrend}
          </span>
        </div>

        {/* Metric 5: Barrier Height */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">
            Barrier Potential
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-xs sm:text-sm font-mono font-bold ${
                metrics.barrierTrend === "Lowered"
                  ? "text-amber-400"
                  : metrics.barrierTrend === "Elevated"
                  ? "text-purple-400"
                  : "text-cyan-300"
              }`}
            >
              {metrics.barrierHeightV.toFixed(2)}
            </span>
            <span className="text-[10px] font-mono text-slate-400">V</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 block truncate mt-0.5">
            {metrics.barrierTrend}
          </span>
        </div>

        {/* Metric 6: Net Current Indication */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">
            Current Trend
          </span>
          <span
            className={`text-xs sm:text-sm font-mono font-bold block truncate ${
              metrics.currentType === "exponential"
                ? "text-emerald-400"
                : metrics.currentType === "leakage"
                ? "text-rose-400"
                : "text-slate-300"
            }`}
          >
            {metrics.currentType === "exponential"
              ? `${metrics.currentMa.toFixed(1)} mA`
              : metrics.currentType === "leakage"
              ? "pA (Leakage)"
              : "0.00 mA"}
          </span>
          <span className="text-[9px] font-mono text-slate-400 block truncate mt-0.5">
            Injection: {metrics.carrierInjectionRate}
          </span>
        </div>
      </div>

      {/* Dynamic Educational Physics Explanation (Section 11) */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-cyan-500/20 relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                PHYSICAL BEHAVIOR EXPLANATION
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {mode === "learn" ? currentLearnStep.badge : "Live Dynamics"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {metrics.explanation}
            </p>
            {mode === "learn" && currentLearnStep.physicsDetail && (
              <p className="text-[11px] font-mono text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
                Governing Law: {currentLearnStep.physicsDetail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Visual Feedback Causality Flowchart (Section 9) */}
      <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
          PHYSICAL CAUSALITY CHAIN ({biasMode.toUpperCase()})
        </span>

        {biasMode === "forward" ? (
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            <span className="px-2 py-1 rounded bg-slate-800 text-slate-200">
              Voltage ↑ (Va = +{voltageV.toFixed(2)}V)
            </span>
            <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-slate-800 text-amber-300">
              Barrier ↓ ({metrics.barrierHeightV.toFixed(2)}V)
            </span>
            <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-slate-800 text-indigo-300">
              Depletion Width ↓ ({metrics.depletionWidthUm.toFixed(2)}µm)
            </span>
            <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300">
              Injection ↑ ({metrics.carrierInjectionRate})
            </span>
            <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40">
              Current ↑ (Exponential)
            </span>
          </div>
        ) : biasMode === "reverse" ? (
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            <span className="px-2 py-1 rounded bg-slate-800 text-slate-200">
              Voltage ↑ (|Vr| = {Math.abs(voltageV).toFixed(1)}V)
            </span>
            <ArrowRight className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-slate-800 text-purple-300">
              Barrier ↑ ({metrics.barrierHeightV.toFixed(2)}V)
            </span>
            <ArrowRight className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-slate-800 text-indigo-300">
              Depletion Width ↑ ({metrics.depletionWidthUm.toFixed(2)}µm)
            </span>
            <ArrowRight className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">
              Majority Flow Blocked
            </span>
            <ArrowRight className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-rose-950 text-rose-300 font-bold border border-rose-500/40">
              Current ≈ Is (Leakage)
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            <span className="px-2 py-1 rounded bg-slate-800 text-slate-200">
              Applied Voltage = 0.00 V
            </span>
            <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-slate-800 text-cyan-300">
              Nominal Vbi = 0.70 V
            </span>
            <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-slate-800 text-indigo-300">
              W0 ≈ 0.50 µm
            </span>
            <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-slate-800 text-slate-200">
              Diffusion = Drift
            </span>
            <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40">
              Net Current = 0.00 mA
            </span>
          </div>
        )}
      </div>

      {/* "What happens when P-type and N-type materials are joined?" Explainer Accordion (Section 5) */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
        <button
          onClick={() => setShowFaq(!showFaq)}
          className="w-full p-3.5 flex items-center justify-between text-left text-xs font-mono font-medium text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>What happens when P-type and N-type materials are joined?</span>
          </span>
          {showFaq ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showFaq && (
          <div className="p-4 pt-1 border-t border-slate-800/80 text-xs text-slate-300 space-y-2.5">
            <p>
              When P-type and N-type semiconductor crystals join at a metallurgical interface, three sequential physical processes take place:
            </p>
            <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
              <li>
                <strong className="text-cyan-300">Diffusion:</strong> Electrons diffuse from the high-density N-side to the P-side, while holes diffuse from the high-density P-side to the N-side.
              </li>
              <li>
                <strong className="text-cyan-300">Recombination:</strong> Diffusing carriers meet near the interface and annihilate, leaving behind uncompensated immobile donor (Nd⁺) and acceptor (Na⁻) lattice ions.
              </li>
              <li>
                <strong className="text-cyan-300">Field Formation & Equilibrium:</strong> The fixed space charges create a built-in electric field (E_bi) pointing from N to P. This field drives an opposing drift current until <span className="font-mono text-cyan-200">J_diffusion + J_drift = 0</span>.
              </li>
            </ol>
            <p className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
              Tip: Switch to <strong>MODE 1 — LEARN</strong> to see this 8-step evolution step by step!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
