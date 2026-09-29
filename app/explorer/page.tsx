"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { SEMICONDUCTOR_DEVICES, SemiconductorDevice } from "@/data/devicesData";
import {
  Layers,
  Cpu,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  Microscope,
  Box,
  Compass,
  ArrowRight
} from "lucide-react";

export default function DeviceExplorerPage() {
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(0);

  const device: SemiconductorDevice =
    SEMICONDUCTOR_DEVICES[selectedDeviceIndex] || SEMICONDUCTOR_DEVICES[0];
  const activeLayer =
    selectedLayerIndex !== null && device.layers[selectedLayerIndex]
      ? device.layers[selectedLayerIndex]
      : null;

  return (
    <div className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <Badge variant="cyan" size="md">
            3D NANO-DEVICE TOPOLOGY SUITE
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Semiconductor Device Explorer
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Interactively explore cross-sectional physical topologies, material stacks, gate wrapping electrostatics, and scaling physics from foundational PN diodes to 2nm GAAFETs and wide bandgap power HEMTs.
          </p>
        </div>

        {/* Device Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
          {SEMICONDUCTOR_DEVICES.map((d, idx) => {
            const isSelected = selectedDeviceIndex === idx;
            return (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDeviceIndex(idx);
                  setSelectedLayerIndex(0);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400/40"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  <span className="text-[9px] font-mono text-slate-400 block truncate">
                    {d.category}
                  </span>
                  <h3
                    className={`text-xs sm:text-sm font-bold mt-1 leading-tight ${
                      isSelected ? "text-cyan-300" : "text-slate-200"
                    }`}
                  >
                    {d.name.split(" ")[0]}
                  </h3>
                </div>
                <span className="text-[9px] font-mono text-cyan-400 mt-2 block truncate">
                  {d.generation.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Device Detailed Showcase Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT: Schematic, Layers, and Working Principle (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Device Overview Banner */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                      {device.name}
                    </h2>
                    <span className="text-xs font-mono text-cyan-400">
                      {device.nodeEra} • {device.generation}
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-sky-300">
                  {device.symbol}
                </div>
              </div>

              {/* Terminals */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Device Terminals:</span>
                <div className="flex flex-wrap gap-2">
                  {device.terminals.map((term) => (
                    <span
                      key={term}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Principle */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Working Principle:</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {device.workingPrinciple}
                </p>
              </div>

              {/* Physical Structure */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Physical Structure:</span>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {device.structure}
                </p>
              </div>
            </div>

            {/* Interactive Layer Stack Inspector */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase">
                  <Layers className="w-4 h-4" />
                  <span>Interactive Layer & Dielectric Stack</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  Click layer to inspect
                </span>
              </div>

              <div className="space-y-2">
                {device.layers.map((layer, lIdx) => {
                  const isLayerSelected = selectedLayerIndex === lIdx;
                  return (
                    <button
                      key={layer.name}
                      onClick={() => setSelectedLayerIndex(lIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isLayerSelected
                          ? "border-cyan-400 bg-cyan-950/60 shadow-md ring-1 ring-cyan-400/40"
                          : `${layer.color} hover:brightness-125`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                        <div>
                          <span className="font-semibold text-slate-100 text-xs sm:text-sm block">
                            {layer.name}
                          </span>
                          <span className="text-[11px] font-mono text-slate-300">
                            {layer.material}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 hidden sm:inline">
                        {isLayerSelected ? "ACTIVE" : "INSPECT"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Layer Details */}
              {activeLayer && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5 mt-4">
                  <div className="flex items-center justify-between text-cyan-300 font-bold">
                    <span>LAYER: {activeLayer.name}</span>
                    <span className="text-slate-400">{activeLayer.material}</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">
                    <span className="text-slate-500 font-mono">Role: </span>
                    {activeLayer.role}
                  </p>
                </div>
              )}
            </Card>

          </div>

          {/* RIGHT: Physics Specs, Advantages, Applications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Physics Specs Table */}
            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 pb-2 border-b border-slate-800">
                <Activity className="w-4 h-4" />
                <h4 className="font-mono text-xs font-semibold text-slate-200 uppercase">
                  Physical & Scaling Specifications
                </h4>
              </div>

              <div className="space-y-2.5">
                {device.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <span className="font-mono text-slate-400">{spec.label}</span>
                    <span className="font-mono font-bold text-cyan-300">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Advantages */}
            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 pb-2 border-b border-slate-800">
                <Zap className="w-4 h-4" />
                <h4 className="font-mono text-xs font-semibold text-slate-200 uppercase">
                  Engineering Advantages
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

            {/* Limitations */}
            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 pb-2 border-b border-slate-800">
                <AlertTriangle className="w-4 h-4" />
                <h4 className="font-mono text-xs font-semibold text-slate-200 uppercase">
                  Physical Limitations & Bottlenecks
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

            {/* Target Applications */}
            <Card className="p-6 space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold block">
                PRIMARY INDUSTRY APPLICATIONS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {device.applications.map((app) => (
                  <span
                    key={app}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-500/30 text-purple-200"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
}
