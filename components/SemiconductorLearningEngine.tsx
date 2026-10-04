"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import ThinkingOrb to avoid SSR canvas issues
const ThinkingOrb = dynamic(
  () => import("thinking-orbs").then((mod) => mod.ThinkingOrb),
  { ssr: false }
);

type OrbState =
  | "working"
  | "searching"
  | "solving"
  | "listening"
  | "connecting"
  | "weaving"
  | "composing"
  | "breathing"
  | "shaping";

interface OrbActivity {
  state: OrbState;
  label: string;
}

const ORB_ACTIVITIES: OrbActivity[] = [
  { state: "searching",  label: "Searching semiconductor concepts..."     },
  { state: "working",    label: "Analyzing semiconductor devices..."      },
  { state: "solving",    label: "Solving semiconductor problems..."       },
  { state: "connecting", label: "Connecting device concepts..."           },
  { state: "weaving",    label: "Connecting semiconductor physics..."     },
  { state: "composing",  label: "Building chip knowledge..."              },
  { state: "shaping",    label: "Designing semiconductor devices..."      },
  { state: "breathing",  label: "Exploring semiconductor fundamentals..." },
  { state: "listening",  label: "Ready for your next concept..."          },
];

const CYCLE_INTERVAL_MS = 3500;

type CornerPos = "top-left" | "top-right" | "bottom-left" | "bottom-right";

function CornerAccent({ position }: { position: CornerPos }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 16,
    height: 16,
    borderColor: "rgba(56,189,248,0.35)",
  };

  const sides: Record<CornerPos, React.CSSProperties> = {
    "top-left":     { top: 12, left: 12,   borderTop: "1px solid",    borderLeft:   "1px solid"  },
    "top-right":    { top: 12, right: 12,  borderTop: "1px solid",    borderRight:  "1px solid"  },
    "bottom-left":  { bottom: 12, left: 12,  borderBottom: "1px solid", borderLeft:   "1px solid"  },
    "bottom-right": { bottom: 12, right: 12, borderBottom: "1px solid", borderRight:  "1px solid"  },
  };

  return <div aria-hidden="true" style={{ ...base, ...sides[position] }} />;
}

const FEATURE_PILLS = [
  { label: "Quantum Physics Engine",  dotColor: "bg-cyan-400"   },
  { label: "Device Simulation",       dotColor: "bg-sky-400"    },
  { label: "VLSI Knowledge Graph",    dotColor: "bg-blue-400"   },
  { label: "Fabrication Process Map", dotColor: "bg-teal-400"   },
  { label: "Career Path Analyzer",    dotColor: "bg-purple-400" },
];

export default function SemiconductorLearningEngine() {
  const [activityIndex, setActivityIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToIndex = useCallback((i: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActivityIndex(i);
      setIsTransitioning(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goToIndex((activityIndex + 1) % ORB_ACTIVITIES.length);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [activityIndex, goToIndex]);

  const current = ORB_ACTIVITIES[activityIndex];

  return (
    <section className="py-8 relative">
      {/* Ambient background glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(6,182,212,0.07)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full blur-[60px]"
          style={{ background: "rgba(56,189,248,0.05)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.18em] text-cyan-400 uppercase bg-cyan-950/50 border border-cyan-500/25 rounded-full px-4 py-1.5">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
            />
            SEMICONDUCTOR LEARNING ENGINE
          </span>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Explore, visualize and understand semiconductor technology through
            interactive learning.
          </p>
        </div>

        {/* ── Orb panel ── */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl" style={{ isolation: "isolate" }}>

            {/* Main glass card */}
            <div
              className="glass-panel rounded-3xl overflow-hidden"
              style={{
                border: "1px solid rgba(56,189,248,0.18)",
                boxShadow:
                  "0 0 0 1px rgba(56,189,248,0.06), " +
                  "0 24px 64px -16px rgba(6,182,212,0.14), " +
                  "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Technical grid overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 tech-grid-pattern pointer-events-none"
                style={{ opacity: 0.5 }}
              />

              {/* Corner accents */}
              <CornerAccent position="top-left"     />
              <CornerAccent position="top-right"    />
              <CornerAccent position="bottom-left"  />
              <CornerAccent position="bottom-right" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center px-6 sm:px-12 py-12 sm:py-16 gap-8">

                {/* Orb with pulsing rings */}
                <div className="relative flex items-center justify-center">
                  {/* Outer pulse ring */}
                  <div
                    aria-hidden="true"
                    className="absolute rounded-full border animate-pulse-glow"
                    style={{
                      inset: "-24px",
                      borderColor: "rgba(6,182,212,0.12)",
                    }}
                  />
                  {/* Mid ring */}
                  <div
                    aria-hidden="true"
                    className="absolute rounded-full border"
                    style={{
                      inset: "-12px",
                      borderColor: "rgba(56,189,248,0.10)",
                    }}
                  />

                  {/* Orb wrapper — fixed size container */}
                  <div className="flex items-center justify-center" style={{ width: 200, height: 200 }}>
                    <ThinkingOrb
                      state={current.state}
                      size={64}
                      theme="dark"
                    />
                  </div>
                </div>

                {/* State chip + activity text */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-slate-600 uppercase">
                    ACTIVE STATE
                  </span>

                  <span
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-500/25 rounded-full px-3.5 py-1 uppercase"
                  >
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      style={{ boxShadow: "0 0 6px 1px rgba(34,211,238,0.65)" }}
                    />
                    {current.state}
                  </span>

                  {/* Animated label */}
                  <p
                    className="text-base sm:text-lg font-medium text-slate-200 mt-1"
                    style={{
                      transition: "opacity 300ms ease, transform 300ms ease",
                      opacity:   isTransitioning ? 0 : 1,
                      transform: isTransitioning ? "translateY(8px)" : "translateY(0px)",
                    }}
                  >
                    {current.label}
                  </p>
                </div>

                {/* Progress dots (clickable) */}
                <div
                  role="tablist"
                  aria-label="Learning engine state indicators"
                  className="flex items-center gap-2"
                >
                  {ORB_ACTIVITIES.map((activity, i) => (
                    <button
                      key={activity.state}
                      role="tab"
                      aria-selected={i === activityIndex}
                      aria-label={`Switch to ${activity.state} state`}
                      onClick={() => goToIndex(i)}
                      className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      style={{
                        height: 6,
                        width:  i === activityIndex ? 22 : 6,
                        background:
                          i === activityIndex
                            ? "rgb(34 211 238)"
                            : "rgba(56 189 248 / 0.22)",
                        transition: "width 300ms ease, background 300ms ease",
                        border: "none",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Status bar below panel */}
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
                9 learning modes
              </span>
              <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
                Auto-cycling · {CYCLE_INTERVAL_MS / 1000}s
              </span>
            </div>
          </div>
        </div>

        {/* ── Feature pills row ── */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {FEATURE_PILLS.map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-2 text-[10px] font-mono text-slate-500 border border-slate-800/80 rounded-full px-3.5 py-1.5 bg-slate-950/40"
            >
              <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${pill.dotColor}`} />
              {pill.label}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
