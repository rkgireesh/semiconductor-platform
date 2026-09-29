"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { VIRTUAL_LABS, VirtualLab } from "@/data/labsData";
import {
  FlaskConical,
  Sliders,
  Sparkles,
  Activity,
  Play,
  RotateCcw,
  Zap,
  Info,
  CheckCircle2,
  Layers
} from "lucide-react";

export default function LabsPage() {
  const [selectedLabId, setSelectedLabId] = useState<string>("pn-junction-lab");
  const [activeTabCategory, setActiveTabCategory] = useState<string>("All");

  const lab: VirtualLab =
    VIRTUAL_LABS.find((l) => l.id === selectedLabId) || VIRTUAL_LABS[0];

  // Store parameter slider values per lab
  const [paramValues, setParamValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    lab.params.forEach((p) => {
      initial[p.id] = p.defaultVal;
    });
    return initial;
  });

  // Handle switching lab
  const handleSelectLab = (newLabId: string) => {
    setSelectedLabId(newLabId);
    const targetLab = VIRTUAL_LABS.find((l) => l.id === newLabId) || VIRTUAL_LABS[0];
    const initial: Record<string, number> = {};
    targetLab.params.forEach((p) => {
      initial[p.id] = p.defaultVal;
    });
    setParamValues(initial);
  };

  const handleParamChange = (paramId: string, value: number) => {
    setParamValues((prev) => ({
      ...prev,
      [paramId]: value,
    }));
  };

  const handleReset = () => {
    const initial: Record<string, number> = {};
    lab.params.forEach((p) => {
      initial[p.id] = p.defaultVal;
    });
    setParamValues(initial);
  };

  // Run live simulation calculation
  const computed = lab.compute(paramValues);

  const categories = ["All", "Diodes", "Transistors", "Digital Logic", "Capacitors"];
  const filteredLabs =
    activeTabCategory === "All"
      ? VIRTUAL_LABS
      : VIRTUAL_LABS.filter((l) => l.category === activeTabCategory);

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <Badge variant="teal" size="md">
            COMPUTATIONAL SOLID-STATE WORKBENCH
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Semiconductor Virtual Labs
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experiment with live parameter sweeps: simulate band bending, space-charge depletion profiles, MOSFET drain current pinch-off, and CMOS inverter switching characteristics.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTabCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all cursor-pointer ${
                activeTabCategory === cat
                  ? "bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-teal-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lab Selection Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {filteredLabs.map((item) => {
            const isSelected = item.id === selectedLabId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectLab(item.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-teal-950/40 border-teal-400 shadow-xl shadow-teal-500/15 ring-1 ring-teal-400/40"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {item.category}
                    </span>
                    <Badge variant={item.badgeVariant} size="sm">
                      {item.difficulty}
                    </Badge>
                  </div>
                  <h3
                    className={`font-bold text-base transition-colors ${
                      isSelected ? "text-teal-300" : "text-slate-200"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-teal-400 font-semibold">
                    {isSelected ? "Active Workbench" : "Select Lab →"}
                  </span>
                  <span className="text-slate-500">{item.params.length} Sliders</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Simulator Active Interactive Console */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border border-teal-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Console Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider">
                  LIVE BENCH // {lab.title}
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-2xl">
                {lab.theorySummary}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-slate-100 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
              <Badge variant="teal" size="sm">
                COMPUTATIONAL ENGINE ACTIVE
              </Badge>
            </div>
          </div>

          {/* Split Screen: Sliders on Left, Telemetry & Waveform on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Parameter Tuning Controls</span>
              </div>

              <div className="space-y-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                {lab.params.map((param) => {
                  const currentVal = paramValues[param.id] !== undefined ? paramValues[param.id] : param.defaultVal;
                  return (
                    <div key={param.id} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-200 font-medium">{param.name}:</span>
                        <span className="text-teal-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {currentVal} {param.unit}
                        </span>
                      </div>

                      <input
                        type="range"
                        min={param.min}
                        max={param.max}
                        step={param.step}
                        value={currentVal}
                        onChange={(e) => handleParamChange(param.id, Number(e.target.value))}
                        className="w-full accent-teal-400 bg-slate-800 rounded-lg cursor-pointer h-2"
                      />

                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>Min: {param.min}</span>
                        <span>{param.desc}</span>
                        <span>Max: {param.max}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Governing Equations Box */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  GOVERNING EQUATIONS
                </span>
                {lab.equations.map((eq, eIdx) => (
                  <div key={eIdx} className="text-xs font-mono text-cyan-300">
                    <span className="text-slate-500">{eq.label}: </span>
                    <span>{eq.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Output Telemetry & Curve Visualizer (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Computed Metrics Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {computed.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1"
                  >
                    <span className="text-[10px] font-mono text-slate-400 block truncate">
                      {metric.label}
                    </span>
                    <div className="text-base sm:text-lg font-mono font-bold text-teal-300">
                      {metric.value} <span className="text-xs font-normal text-slate-400">{metric.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulated Output Curve / Graphic */}
              <Card className="p-6 bg-slate-950/90 border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-400" />
                    <span className="font-mono text-xs font-semibold text-slate-200 uppercase">
                      Calculated Waveform / Profile
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {computed.chartData.length} Sample Points
                  </span>
                </div>

                {/* SVG Curve Plot */}
                <div className="relative w-full h-48 sm:h-56 bg-slate-900/80 rounded-xl border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
                  
                  {/* Grid Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20">
                    <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#38BDF8" strokeDasharray="3 3" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#38BDF8" strokeDasharray="3 3" />
                    <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#38BDF8" strokeDasharray="3 3" />
                    <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#38BDF8" strokeDasharray="3 3" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#38BDF8" strokeDasharray="3 3" />
                    <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#38BDF8" strokeDasharray="3 3" />
                  </svg>

                  {/* Normalized Polyline render */}
                  {computed.chartData.length > 1 && (() => {
                    const maxY = Math.max(...computed.chartData.map((d) => d.y), 0.001);
                    const minY = Math.min(...computed.chartData.map((d) => d.y), 0);
                    const rangeY = Math.max(0.001, maxY - minY);

                    const pointsStr = computed.chartData
                      .map((pt, idx) => {
                        const xPct = (idx / (computed.chartData.length - 1)) * 100;
                        const yPct = 90 - ((pt.y - minY) / rangeY) * 75;
                        return `${xPct}%,${yPct}%`;
                      })
                      .join(" ");

                    return (
                      <svg className="absolute inset-0 w-full h-full p-4 overflow-visible">
                        <defs>
                          <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#2DD4BF" />
                            <stop offset="50%" stopColor="#38BDF8" />
                            <stop offset="100%" stopColor="#818CF8" />
                          </linearGradient>
                        </defs>
                        <polyline
                          fill="none"
                          stroke="url(#curveGradient)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={pointsStr}
                        />
                      </svg>
                    );
                  })()}

                  <div className="absolute top-2 left-3 text-[10px] font-mono text-slate-400">
                    Max: {Math.max(...computed.chartData.map((d) => d.y)).toFixed(2)}
                  </div>
                  <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-400">
                    Min: {Math.min(...computed.chartData.map((d) => d.y)).toFixed(2)}
                  </div>
                </div>

                {/* Status State Banner */}
                <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 text-xs font-mono text-teal-200 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>{computed.statusText}</div>
                </div>
              </Card>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
