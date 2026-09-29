import React from "react";
import { Cpu, Zap, Activity, Layers, Radio, ShieldCheck } from "lucide-react";

export default function ChipVisual() {
  return (
    <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-sky-500/15 to-teal-500/5 rounded-3xl filter blur-2xl -z-10 animate-pulse" />

      {/* Wafer / Carrier circular outer ring */}
      <div className="absolute inset-2 sm:inset-4 rounded-full border border-slate-800/80 bg-slate-950/40 tech-grid-pattern flex items-center justify-center">
        {/* Radar concentric sweep circles */}
        <div className="absolute inset-8 rounded-full border border-cyan-500/15 border-dashed" />
        <div className="absolute inset-16 rounded-full border border-sky-500/10" />
      </div>

      {/* Main Semiconductor Die Core */}
      <div className="relative z-10 w-4/5 aspect-square bg-[#0b111d] rounded-2xl border border-cyan-500/30 p-5 shadow-2xl shadow-cyan-950/50 flex flex-col justify-between backdrop-blur-md">
        
        {/* Die Header & Telemetry */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400">
              CORE_IC // 3nm GAAFET
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
            1.2V • 4.8 GHz
          </span>
        </div>

        {/* Die Core Architecture Grid (Silicon blocks & inter-connects) */}
        <div className="grid grid-cols-3 gap-2.5 my-3 flex-1 items-stretch">
          
          {/* Block 1: Quantum Well & Bandgap */}
          <div className="group/block bg-slate-900/80 rounded-lg p-2.5 border border-slate-800/90 hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">Si / SiO2</span>
              <Layers className="w-3.5 h-3.5 text-cyan-400/80" />
            </div>
            <div className="font-mono text-xs font-semibold text-slate-200">
              Eg = 1.12 eV
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full w-4/5 animate-pulse" />
            </div>
          </div>

          {/* Block 2: Logic & Gate Matrix */}
          <div className="group/block bg-gradient-to-b from-cyan-950/30 to-slate-900/90 rounded-lg p-2.5 border border-cyan-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-cyan-300">Nanosheet</span>
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="font-mono text-xs font-semibold text-cyan-200">
              18.4 B FETs
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-sky-400 h-full w-full" />
            </div>
          </div>

          {/* Block 3: Carrier Transport */}
          <div className="group/block bg-slate-900/80 rounded-lg p-2.5 border border-slate-800/90 hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">Drift μn</span>
              <Zap className="w-3.5 h-3.5 text-sky-400/80" />
            </div>
            <div className="font-mono text-xs font-semibold text-slate-200">
              1400 cm²/Vs
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-sky-400 h-full w-3/4" />
            </div>
          </div>

          {/* Circuit Interconnect Bus Map (Middle horizontal trace) */}
          <div className="col-span-3 bg-slate-950/90 rounded-lg p-3 border border-slate-800/80 relative overflow-hidden flex items-center justify-between">
            {/* SVG Circuit Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
              <path
                d="M 10,25 L 80,25 L 120,10 L 220,10 L 260,35 L 350,35"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <path
                d="M 20,40 L 90,40 L 140,50 L 280,50 L 320,20 L 400,20"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1"
              />
            </svg>

            <div className="relative z-10 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400">RTL Verilog Pipeline</div>
                <div className="text-xs font-medium text-slate-200">RISC-V 64-bit Core</div>
              </div>
            </div>

            <div className="relative z-10 font-mono text-[10px] text-teal-400 bg-teal-950/60 border border-teal-500/30 px-2 py-1 rounded">
              PASSED (0 LVS ERR)
            </div>
          </div>
        </div>

        {/* Die Footer: Status and Substrate details */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>FAB NODE: FIN-300</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>VLSI TAPE-OUT READY</span>
          </div>
        </div>

      </div>

      {/* Floating Floating Microchip Pin Badges */}
      <div className="absolute -top-2 -left-2 bg-slate-900/90 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-md text-[10px] font-mono backdrop-blur-md shadow-lg hidden sm:block">
        Vth = 0.28V
      </div>
      <div className="absolute -bottom-3 -right-2 bg-slate-900/90 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-md text-[10px] font-mono backdrop-blur-md shadow-lg hidden sm:block">
        Lg = 12nm
      </div>
      <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-slate-900/90 text-sky-300 border border-sky-500/30 px-2 py-1 rounded-md text-[10px] font-mono backdrop-blur-md shadow-lg hidden md:block">
        EUV Litho
      </div>
    </div>
  );
}
