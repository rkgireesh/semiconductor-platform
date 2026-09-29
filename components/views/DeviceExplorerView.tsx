"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { DEVICES_DATA, DeviceData } from "@/data/curriculumData";
import {
  ArrowLeft,
  Layers,
  Cpu,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  Microscope
} from "lucide-react";

interface DeviceExplorerViewProps {
  onNavigate?: (hash: string) => void;
}

export default function DeviceExplorerView({ onNavigate }: DeviceExplorerViewProps) {
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(0);

  const device: DeviceData = DEVICES_DATA[selectedDeviceIndex] || DEVICES_DATA[0];
  const activeLayer = selectedLayerIndex !== null ? device.layers[selectedLayerIndex] : null;

  const handleNav = (hash: string) => {
    if (onNavigate) {
      onNavigate(hash);
    } else {
      window.location.hash = hash;
    }
  };

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => handleNav("#features")}
            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO PLATFORM HUB</span>
          </button>

          <Badge variant="cyan" size="md">
            DEVICE TOPOLOGY EXPLORER
          </Badge>
        </div>

        {/* Hero Header */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 mb-8 relative overflow-hidden border border-slate-800">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <Microscope className="w-4 h-4" />
              <span>3D NANO-DEVICE INSPECTION SUITE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
              Semiconductor Device Explorer
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Interactively inspect cross-sectional topologies, material dielectric stacks, gate-wrapping electrostatics, and physical scaling limits from classical planar transistors to angstrom-era GAAFETs.
            </p>
          </div>
        </div>

        {/* Device Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {DEVICES_DATA.map((d, idx) => {
            const isSelected = selectedDeviceIndex === idx;
            return (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDeviceIndex(idx);
                  setSelectedLayerIndex(0);
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">
                    {d.category}
                  </span>
                  <h3
                    className={`text-sm sm:text-base font-bold transition-colors ${
                      isSelected ? "text-cyan-300" : "text-slate-200"
                    }`}
                  >
                    {d.name}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 mt-2 block">
                  {d.nodeEra}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Explorer Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Left: Device Cross-Section Schematic & Layer Stack */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-slate-100 text-lg">
                    {device.name} // Cross-Section Schematic
                  </h3>
                </div>
                <Badge variant="teal" size="sm">
                  {device.generation}
                </Badge>
              </div>

              {/* Layer Stack Interactive Visualizer */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-mono text-slate-400 block">
                  CLICK ANY LAYER TO INSPECT MATERIAL & ELECTROSTATICS:
                </span>

                <div className="space-y-2">
                  {device.layers.map((layer, lIdx) => {
                    const isLayerSelected = selectedLayerIndex === lIdx;
                    return (
                      <button
                        key={layer.name}
                        onClick={() => setSelectedLayerIndex(lIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isLayerSelected
                            ? "border-cyan-400 bg-cyan-950/50 shadow-md ring-1 ring-cyan-400/40"
                            : `${layer.color} hover:brightness-125`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                          <div>
                            <span className="font-semibold text-slate-100 text-sm block">
                              {layer.name}
                            </span>
                            <span className="text-xs font-mono text-slate-300">
                              {layer.material}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-cyan-300/80 hidden sm:inline">
                          {isLayerSelected ? "ACTIVE LAYER" : "INSPECT"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Layer Inspector Panel */}
              {activeLayer && (
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span>LAYER INSPECTION: {activeLayer.name}</span>
                    <span className="text-slate-400">Material: {activeLayer.material}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    <span className="text-slate-400 font-mono">Role: </span>
                    {activeLayer.role}
                  </p>
                </div>
              )}
            </div>

            {/* Device Description Bottom Note */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed">
              {device.desc}
            </div>
          </div>

          {/* Right: Physical Specifications & Scaling Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Key Physics Metrics Card */}
            <Card className="p-6">
              <div className="flex items-center gap-2 text-cyan-400 mb-4 pb-2 border-b border-slate-800">
                <Activity className="w-4 h-4" />
                <h4 className="font-mono text-sm font-semibold text-slate-200">
                  ELECTROSTATIC & SCALING METRICS
                </h4>
              </div>

              <div className="space-y-3">
                {device.physicsSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <span className="font-mono text-slate-400">{spec.label}</span>
                    <span className="font-mono font-bold text-cyan-300">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Architectural Features */}
            <Card className="p-6">
              <div className="flex items-center gap-2 text-emerald-400 mb-4 pb-2 border-b border-slate-800">
                <Zap className="w-4 h-4" />
                <h4 className="font-mono text-sm font-semibold text-slate-200">
                  ARCHITECTURAL ADVANTAGES
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                {device.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Fab Limitations & Scaling Challenges */}
            <Card className="p-6">
              <div className="flex items-center gap-2 text-amber-400 mb-4 pb-2 border-b border-slate-800">
                <AlertTriangle className="w-4 h-4" />
                <h4 className="font-mono text-sm font-semibold text-slate-200">
                  FABRICATION CHALLENGES
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                {device.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </Card>

          </div>

        </div>

        {/* Bottom Callout Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 glass-panel rounded-xl border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-semibold text-slate-200">
              Want to master MOSFET & GAAFET device physics?
            </h4>
            <p className="text-xs text-slate-400">
              Explore Module 05 for complete threshold voltage derivations and subthreshold swing equations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleNav("#module/05")}
              variant="primary"
              size="md"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Go to Module 05 (MOSFET)
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
