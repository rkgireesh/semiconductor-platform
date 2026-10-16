"use client";

import React, { useState } from "react";
import {
  BiasMode,
  PNJunctionMetrics,
  LearnStep,
  LEARN_STEPS,
  SILICON_CONSTANTS,
} from "./pnJunctionModel";

interface PNJunctionDiagramProps {
  metrics: PNJunctionMetrics;
  mode: "learn" | "explore";
  learnStepIndex: number;
  biasMode: BiasMode;
  voltageV: number;
  reducedMotion?: boolean;
}

interface TooltipInfo {
  title: string;
  category: string;
  description: string;
  formula?: string;
  x: number;
  y: number;
}

export default function PNJunctionDiagram({
  metrics,
  mode,
  learnStepIndex,
  biasMode,
  voltageV,
  reducedMotion = false,
}: PNJunctionDiagramProps) {
  const [activeTooltip, setActiveTooltip] = useState<TooltipInfo | null>(null);

  const currentLearnStep: LearnStep =
    LEARN_STEPS[Math.max(0, Math.min(LEARN_STEPS.length - 1, learnStepIndex))];

  // SVG dimensions
  const SVG_WIDTH = 900;
  const SVG_HEIGHT = 490;

  // Silicon slab geometry
  const SLAB_X = 60;
  const SLAB_Y = 55;
  const SLAB_WIDTH = 780;
  const SLAB_HEIGHT = 230;
  const JUNCTION_X = SLAB_X + SLAB_WIDTH / 2; // 450

  // Calculate dynamic depletion boundaries
  // In Learn Mode: step-controlled factor (0 to 1)
  // In Explore Mode: factor (0.25 to 2.4)
  const nominalHalfWidth = 110; // pixels for nominal half-depletion width at equilibrium
  let halfDepletionWidthPx = nominalHalfWidth * metrics.depletionWidthFactor;

  // In Learn Mode Step 1, materials are isolated with a visible gap
  const isStep1Isolated = mode === "learn" && !currentLearnStep.materialsJoined;
  const separationGapPx = isStep1Isolated ? 40 : 0;

  // Clamp depletion boundaries so they don't exceed the crystal slab
  halfDepletionWidthPx = Math.min(halfDepletionWidthPx, SLAB_WIDTH / 2 - 40);

  const pDepletionLeft = JUNCTION_X - separationGapPx / 2 - halfDepletionWidthPx;
  const nDepletionRight = JUNCTION_X + separationGapPx / 2 + halfDepletionWidthPx;
  const depletionTotalWidthPx = nDepletionRight - pDepletionLeft - separationGapPx;

  // Potential barrier graph geometry (lower deck)
  const GRAPH_X = 60;
  const GRAPH_Y = 320;
  const GRAPH_WIDTH = 780;
  const GRAPH_HEIGHT = 135;
  const GRAPH_BASELINE_Y = GRAPH_Y + GRAPH_HEIGHT - 25; // 430
  const GRAPH_MAX_HEIGHT_PX = 90;

  // Calculate potential curve points
  // Normalized barrier height (Vbi is 0.70V -> ~60px height)
  const barrierPx = Math.min(
    GRAPH_MAX_HEIGHT_PX,
    Math.max(12, (metrics.barrierHeightV / SILICON_CONSTANTS.builtInPotentialVbi) * 60)
  );

  const pPotentialY = GRAPH_BASELINE_Y; // Ground / reference (0V)
  const nPotentialY = GRAPH_BASELINE_Y - barrierPx; // Elevated potential side

  // Cubic bezier for smooth potential transition across depletion region
  const curveStartX = Math.max(GRAPH_X + 20, pDepletionLeft);
  const curveEndX = Math.min(GRAPH_X + GRAPH_WIDTH - 20, nDepletionRight);
  const curveMidX = JUNCTION_X;

  const potentialPathD = `
    M ${GRAPH_X} ${pPotentialY}
    L ${curveStartX} ${pPotentialY}
    C ${curveStartX + (curveMidX - curveStartX) * 0.7} ${pPotentialY},
      ${curveMidX - (curveMidX - curveStartX) * 0.2} ${nPotentialY + (pPotentialY - nPotentialY) * 0.5},
      ${curveMidX} ${nPotentialY + (pPotentialY - nPotentialY) * 0.5}
    C ${curveMidX + (curveEndX - curveMidX) * 0.2} ${nPotentialY + (pPotentialY - nPotentialY) * 0.5},
      ${curveEndX - (curveEndX - curveMidX) * 0.7} ${nPotentialY},
      ${curveEndX} ${nPotentialY}
    L ${GRAPH_X + GRAPH_WIDTH} ${nPotentialY}
  `;

  // Static lattice coordinates for fixed ions
  // 3 columns of acceptor ions on P-side of depletion region
  // 3 columns of donor ions on N-side of depletion region
  const ionRows = [SLAB_Y + 45, SLAB_Y + 115, SLAB_Y + 185];

  // Electric field arrows count and strength
  const eFieldStrength = metrics.electricFieldStrength;
  const showEField =
    (mode === "explore" && eFieldStrength > 0.05) ||
    (mode === "learn" && currentLearnStep.electricFieldActive);

  // Active carrier injection animations
  const isForwardConduction = mode === "explore" && biasMode === "forward" && voltageV >= 0.25;
  const isHighForward = mode === "explore" && biasMode === "forward" && voltageV >= 0.6;
  const isReverseBias = mode === "explore" && biasMode === "reverse";

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-2 sm:p-4 shadow-2xl select-none">
      {/* Visual Header / Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-3 mb-2 border-b border-slate-800/80 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
          <span className="font-semibold text-slate-200">
            SOLID-STATE DEVICE CROSS-SECTION
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400">Silicon (Si) Step Junction</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="hidden sm:inline">
            T = <strong className="text-slate-200">300 K</strong>
          </span>
          <span className="hidden sm:inline">
            Vbi = <strong className="text-cyan-300">0.70 V</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            {mode === "learn" ? `GUIDED STEP ${currentLearnStep.step}/8` : `${biasMode.toUpperCase()} BIAS`}
          </span>
        </div>
      </div>

      {/* Main SVG Container */}
      <div className="w-full relative aspect-[900/490] max-h-[560px]">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Interactive PN Junction Device Cross-section and Electrostatic Potential Diagram"
        >
          <defs>
            {/* Background Grid Pattern */}
            <pattern id="pnTechGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(30, 41, 59, 0.45)"
                strokeWidth="0.8"
              />
            </pattern>

            {/* P-Type Bulk Gradient */}
            <linearGradient id="pBulkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#881337" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#4c0519" stopOpacity="0.22" />
            </linearGradient>

            {/* N-Type Bulk Gradient */}
            <linearGradient id="nBulkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#082f49" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.4" />
            </linearGradient>

            {/* Depletion Space-Charge Region Gradient */}
            <linearGradient id="depletionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#0f172a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.55" />
            </linearGradient>

            {/* Electric Field Arrow Marker */}
            <marker
              id="eFieldArrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
            </marker>

            {/* Carrier Flow Arrow Marker (Cyan) */}
            <marker
              id="electronArrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>

            {/* Carrier Flow Arrow Marker (Amber) */}
            <marker
              id="holeArrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#fb923c" />
            </marker>

            {/* Glow Filter for Active Elements */}
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Canvas Background with Subtle Engineering Grid */}
          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#030712" rx="14" />
          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#pnTechGrid)" rx="14" />

          {/* ========================================================= */}
          {/* TOP SECTION: SEMICONDUCTOR CRYSTAL SLAB                   */}
          {/* ========================================================= */}

          {/* Crystal Outer Frame Box */}
          <rect
            x={SLAB_X - 1}
            y={SLAB_Y - 1}
            width={SLAB_WIDTH + 2}
            height={SLAB_HEIGHT + 2}
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
            rx="8"
          />

          {/* LEFT SLAB: P-TYPE SILICON REGION */}
          <rect
            x={SLAB_X}
            y={SLAB_Y}
            width={SLAB_WIDTH / 2 - separationGapPx / 2}
            height={SLAB_HEIGHT}
            fill="url(#pBulkGrad)"
            stroke="#e11d48"
            strokeWidth="0.8"
            strokeOpacity="0.3"
            rx="7"
            className="cursor-pointer transition-colors hover:fill-rose-950/40"
            onMouseEnter={(e) =>
              setActiveTooltip({
                title: "P-Type Semiconductor Region",
                category: "Bulk Material",
                description:
                  "Extrinsic silicon doped with trivalent acceptor impurities (Boron, Na ≈ 10¹⁶ cm⁻³). Dominated by abundant mobile positive holes (h⁺) with negligible minority electrons.",
                formula: "p0 ≈ Na,  n0 = ni² / Na",
                x: e.clientX,
                y: e.clientY,
              })
            }
            onMouseLeave={() => setActiveTooltip(null)}
          />

          {/* RIGHT SLAB: N-TYPE SILICON REGION */}
          <rect
            x={JUNCTION_X + separationGapPx / 2}
            y={SLAB_Y}
            width={SLAB_WIDTH / 2 - separationGapPx / 2}
            height={SLAB_HEIGHT}
            fill="url(#nBulkGrad)"
            stroke="#0284c7"
            strokeWidth="0.8"
            strokeOpacity="0.3"
            rx="7"
            className="cursor-pointer transition-colors hover:fill-sky-950/40"
            onMouseEnter={(e) =>
              setActiveTooltip({
                title: "N-Type Semiconductor Region",
                category: "Bulk Material",
                description:
                  "Extrinsic silicon doped with pentavalent donor impurities (Phosphorus/Arsenic, Nd ≈ 10¹⁶ cm⁻³). Dominated by free mobile conduction electrons (e⁻).",
                formula: "n0 ≈ Nd,  p0 = ni² / Nd",
                x: e.clientX,
                y: e.clientY,
              })
            }
            onMouseLeave={() => setActiveTooltip(null)}
          />

          {/* DEPLETION (SPACE-CHARGE) REGION OVERLAY */}
          {(!isStep1Isolated && (mode === "explore" || currentLearnStep.depletionFormed)) && (
            <g>
              <rect
                x={pDepletionLeft}
                y={SLAB_Y}
                width={Math.max(6, depletionTotalWidthPx)}
                height={SLAB_HEIGHT}
                fill="url(#depletionGrad)"
                stroke="#6366f1"
                strokeWidth="1.2"
                strokeDasharray="4 2"
                strokeOpacity="0.8"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={(e) =>
                  setActiveTooltip({
                    title: "Depletion Region (Space-Charge Layer)",
                    category: "Transition Zone",
                    description:
                      "Zone surrounding the metallurgical junction stripped of mobile carriers by diffusion and recombination. Contains uncompensated, fixed ionized dopants creating built-in voltage Vbi.",
                    formula: "W = √[(2ε/q)(1/Na + 1/Nd)(Vbi - Va)]",
                    x: e.clientX,
                    y: e.clientY,
                  })
                }
                onMouseLeave={() => setActiveTooltip(null)}
              />

              {/* Depletion Width Top Dimension Line */}
              <line
                x1={pDepletionLeft}
                y1={SLAB_Y - 14}
                x2={nDepletionRight}
                y2={SLAB_Y - 14}
                stroke="#818cf8"
                strokeWidth="1.5"
              />
              <line
                x1={pDepletionLeft}
                y1={SLAB_Y - 20}
                x2={pDepletionLeft}
                y2={SLAB_Y - 8}
                stroke="#818cf8"
                strokeWidth="1.5"
              />
              <line
                x1={nDepletionRight}
                y1={SLAB_Y - 20}
                x2={nDepletionRight}
                y2={SLAB_Y - 8}
                stroke="#818cf8"
                strokeWidth="1.5"
              />
              <text
                x={(pDepletionLeft + nDepletionRight) / 2}
                y={SLAB_Y - 18}
                fill="#c7d2fe"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Depletion Width W ≈ {metrics.depletionWidthUm.toFixed(2)} µm
              </text>

              {/* Boundary markers (-xp and +xn) */}
              <text
                x={pDepletionLeft}
                y={SLAB_Y + SLAB_HEIGHT + 14}
                fill="#a5b4fc"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                -xp
              </text>
              <text
                x={nDepletionRight}
                y={SLAB_Y + SLAB_HEIGHT + 14}
                fill="#a5b4fc"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                +xn
              </text>
            </g>
          )}

          {/* METALLURGICAL JUNCTION INTERFACE (x = 0) */}
          {!isStep1Isolated && (
            <g>
              <line
                x1={JUNCTION_X}
                y1={SLAB_Y}
                x2={JUNCTION_X}
                y2={SLAB_Y + SLAB_HEIGHT}
                stroke="#22d3ee"
                strokeWidth="2"
                strokeDasharray="6 3"
                opacity="0.9"
                filter="url(#cyanGlow)"
              />
              <text
                x={JUNCTION_X}
                y={SLAB_Y + SLAB_HEIGHT + 16}
                fill="#22d3ee"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                x = 0 (Junction)
              </text>
            </g>
          )}

          {/* STEP 1 ISOLATION GAP INDICATION */}
          {isStep1Isolated && (
            <g>
              <rect
                x={JUNCTION_X - separationGapPx / 2}
                y={SLAB_Y}
                width={separationGapPx}
                height={SLAB_HEIGHT}
                fill="#020617"
                stroke="#475569"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={JUNCTION_X}
                y={SLAB_Y + SLAB_HEIGHT / 2}
                fill="#94a3b8"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
                transform={`rotate(-90, ${JUNCTION_X}, ${SLAB_Y + SLAB_HEIGHT / 2})`}
              >
                ISOLATED (NO CONTACT)
              </text>
            </g>
          )}

          {/* ========================================================= */}
          {/* REGION LABELS AND HEADERS                                 */}
          {/* ========================================================= */}
          <text
            x={SLAB_X + 90}
            y={SLAB_Y + 24}
            fill="#fb7185"
            fontSize="14"
            fontFamily="monospace"
            fontWeight="bold"
          >
            P-TYPE REGION
          </text>
          <text
            x={SLAB_X + 90}
            y={SLAB_Y + 38}
            fill="#fda4af"
            fontSize="10"
            fontFamily="monospace"
            opacity="0.8"
          >
            Silicon: Boron Doped (Acceptors Na)
          </text>

          <text
            x={SLAB_X + SLAB_WIDTH - 210}
            y={SLAB_Y + 24}
            fill="#38bdf8"
            fontSize="14"
            fontFamily="monospace"
            fontWeight="bold"
          >
            N-TYPE REGION
          </text>
          <text
            x={SLAB_X + SLAB_WIDTH - 210}
            y={SLAB_Y + 38}
            fill="#7dd3fc"
            fontSize="10"
            fontFamily="monospace"
            opacity="0.8"
          >
            Silicon: Phosphorus Doped (Donors Nd)
          </text>

          {/* ========================================================= */}
          {/* FIXED IMMOBILE DOPANT IONS INSIDE DEPLETION REGION       */}
          {/* P-side: Fixed Acceptor Ions (B⁻, Negative)                */}
          {/* N-side: Fixed Donor Ions (P⁺, Positive)                   */}
          {/* ========================================================= */}
          {(!isStep1Isolated && (mode === "explore" || currentLearnStep.depletionFormed)) && (
            <g>
              {/* Fixed Acceptor Ions (⊖) on P-Side */}
              {ionRows.map((yPos, rowIdx) => {
                // Dynamically place 1 to 3 columns of ions based on depletion width
                const ionX1 = JUNCTION_X - halfDepletionWidthPx * 0.35;
                const ionX2 = JUNCTION_X - halfDepletionWidthPx * 0.72;
                return (
                  <g key={`acceptor-row-${rowIdx}`}>
                    {/* Inner column of negative ions */}
                    <circle
                      cx={ionX1}
                      cy={yPos}
                      r="12"
                      fill="#4c0519"
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      className="cursor-pointer"
                      onMouseEnter={(e) =>
                        setActiveTooltip({
                          title: "Fixed Negative Acceptor Ion (Na⁻)",
                          category: "Immobile Space Charge",
                          description:
                            "Boron atom that accepted an electron into its covalent bond. Fixed securely in the silicon crystal lattice; cannot move.",
                          formula: "Charge = -q",
                          x: e.clientX,
                          y: e.clientY,
                        })
                      }
                      onMouseLeave={() => setActiveTooltip(null)}
                    />
                    <text
                      x={ionX1}
                      y={yPos + 4}
                      fill="#fecdd3"
                      fontSize="14"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      −
                    </text>

                    {/* Outer column if depletion region is wide enough */}
                    {halfDepletionWidthPx > 60 && (
                      <>
                        <circle
                          cx={ionX2}
                          cy={yPos}
                          r="12"
                          fill="#4c0519"
                          stroke="#f43f5e"
                          strokeWidth="1.5"
                          className="cursor-pointer"
                          onMouseEnter={(e) =>
                            setActiveTooltip({
                              title: "Fixed Negative Acceptor Ion (Na⁻)",
                              category: "Immobile Space Charge",
                              description:
                                "Ionized acceptor atom. Its negative uncompensated charge contributes to the built-in electric field.",
                              formula: "Charge = -q",
                              x: e.clientX,
                              y: e.clientY,
                            })
                          }
                          onMouseLeave={() => setActiveTooltip(null)}
                        />
                        <text
                          x={ionX2}
                          y={yPos + 4}
                          fill="#fecdd3"
                          fontSize="14"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          −
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

              {/* Fixed Donor Ions (⊕) on N-Side */}
              {ionRows.map((yPos, rowIdx) => {
                const ionX1 = JUNCTION_X + halfDepletionWidthPx * 0.35;
                const ionX2 = JUNCTION_X + halfDepletionWidthPx * 0.72;
                return (
                  <g key={`donor-row-${rowIdx}`}>
                    {/* Inner column of positive ions */}
                    <circle
                      cx={ionX1}
                      cy={yPos}
                      r="12"
                      fill="#082f49"
                      stroke="#0284c7"
                      strokeWidth="1.5"
                      className="cursor-pointer"
                      onMouseEnter={(e) =>
                        setActiveTooltip({
                          title: "Fixed Positive Donor Ion (Nd⁺)",
                          category: "Immobile Space Charge",
                          description:
                            "Phosphorus atom that donated its 5th valence electron. Fixed permanently in the crystal lattice.",
                          formula: "Charge = +q",
                          x: e.clientX,
                          y: e.clientY,
                        })
                      }
                      onMouseLeave={() => setActiveTooltip(null)}
                    />
                    <text
                      x={ionX1}
                      y={yPos + 4}
                      fill="#bae6fd"
                      fontSize="14"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      +
                    </text>

                    {/* Outer column if depletion region is wide enough */}
                    {halfDepletionWidthPx > 60 && (
                      <>
                        <circle
                          cx={ionX2}
                          cy={yPos}
                          r="12"
                          fill="#082f49"
                          stroke="#0284c7"
                          strokeWidth="1.5"
                          className="cursor-pointer"
                          onMouseEnter={(e) =>
                            setActiveTooltip({
                              title: "Fixed Positive Donor Ion (Nd⁺)",
                              category: "Immobile Space Charge",
                              description:
                                "Ionized donor atom. Its uncompensated positive charge forms the positive boundary of the dipole field.",
                              formula: "Charge = +q",
                              x: e.clientX,
                              y: e.clientY,
                            })
                          }
                          onMouseLeave={() => setActiveTooltip(null)}
                        />
                        <text
                          x={ionX2}
                          y={yPos + 4}
                          fill="#bae6fd"
                          fontSize="14"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          +
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* ========================================================= */}
          {/* MOBILE MAJORITY CARRIERS IN BULK REGIONS                  */}
          {/* P-side: Mobile Holes (h⁺, red-amber rings)                */}
          {/* N-side: Mobile Electrons (e⁻, cyan dots)                  */}
          {/* ========================================================= */}
          <g>
            {/* P-side Mobile Holes */}
            {[
              { x: SLAB_X + 45, y: SLAB_Y + 70 },
              { x: SLAB_X + 95, y: SLAB_Y + 115 },
              { x: SLAB_X + 50, y: SLAB_Y + 160 },
              { x: SLAB_X + 130, y: SLAB_Y + 75 },
              { x: SLAB_X + 155, y: SLAB_Y + 155 },
              { x: SLAB_X + 185, y: SLAB_Y + 110 },
              { x: SLAB_X + 75, y: SLAB_Y + 195 },
              { x: SLAB_X + 140, y: SLAB_Y + 200 },
            ].map((pt, idx) => {
              // Hide if covered by expanded depletion region
              if (pt.x >= pDepletionLeft) return null;
              return (
                <g
                  key={`hole-${idx}`}
                  className="cursor-pointer"
                  onMouseEnter={(e) =>
                    setActiveTooltip({
                      title: "Mobile Positive Hole (h⁺)",
                      category: "Majority Carrier (P-Type)",
                      description:
                        "Absence of an electron in a silicon valence bond behaving as an effective positive charge packet with effective mass mp*.",
                      formula: "p0 ≈ 10¹⁶ cm⁻³",
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8.5"
                    fill="#881337"
                    stroke="#fb7185"
                    strokeWidth="1.5"
                  />
                  <text
                    x={pt.x}
                    y={pt.y + 3.5}
                    fill="#ffe4e6"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    +
                  </text>
                </g>
              );
            })}

            {/* N-side Mobile Electrons */}
            {[
              { x: SLAB_X + SLAB_WIDTH - 45, y: SLAB_Y + 70 },
              { x: SLAB_X + SLAB_WIDTH - 95, y: SLAB_Y + 115 },
              { x: SLAB_X + SLAB_WIDTH - 50, y: SLAB_Y + 160 },
              { x: SLAB_X + SLAB_WIDTH - 130, y: SLAB_Y + 75 },
              { x: SLAB_X + SLAB_WIDTH - 155, y: SLAB_Y + 155 },
              { x: SLAB_X + SLAB_WIDTH - 185, y: SLAB_Y + 110 },
              { x: SLAB_X + SLAB_WIDTH - 75, y: SLAB_Y + 195 },
              { x: SLAB_X + SLAB_WIDTH - 140, y: SLAB_Y + 200 },
            ].map((pt, idx) => {
              if (pt.x <= nDepletionRight) return null;
              return (
                <g
                  key={`electron-${idx}`}
                  className="cursor-pointer"
                  onMouseEnter={(e) =>
                    setActiveTooltip({
                      title: "Mobile Free Electron (e⁻)",
                      category: "Majority Carrier (N-Type)",
                      description:
                        "Conduction-band mobile electron free to drift and diffuse with high mobility μn ≈ 1400 cm²/(V·s).",
                      formula: "n0 ≈ 10¹⁶ cm⁻³",
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8.5"
                    fill="#0369a1"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  <text
                    x={pt.x}
                    y={pt.y + 3.5}
                    fill="#e0f2fe"
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    −
                  </text>
                </g>
              );
            })}
          </g>

          {/* ========================================================= */}
          {/* BUILT-IN ELECTRIC FIELD (E_bi) ARROWS (POINTS N -> P)      */}
          {/* ========================================================= */}
          {showEField && (
            <g opacity={Math.min(1.0, Math.max(0.35, eFieldStrength * 0.8))}>
              {/* Horizontal E-field vector pointing left from N fixed positive to P fixed negative */}
              <line
                x1={JUNCTION_X + Math.min(halfDepletionWidthPx * 0.7, 75)}
                y1={SLAB_Y + SLAB_HEIGHT / 2 - 25}
                x2={JUNCTION_X - Math.min(halfDepletionWidthPx * 0.7, 75)}
                y2={SLAB_Y + SLAB_HEIGHT / 2 - 25}
                stroke="#06b6d4"
                strokeWidth={Math.min(3.5, 1.8 + eFieldStrength * 1.2)}
                markerEnd="url(#eFieldArrow)"
                filter="url(#cyanGlow)"
              />
              <line
                x1={JUNCTION_X + Math.min(halfDepletionWidthPx * 0.7, 75)}
                y1={SLAB_Y + SLAB_HEIGHT / 2 + 25}
                x2={JUNCTION_X - Math.min(halfDepletionWidthPx * 0.7, 75)}
                y2={SLAB_Y + SLAB_HEIGHT / 2 + 25}
                stroke="#06b6d4"
                strokeWidth={Math.min(3.5, 1.8 + eFieldStrength * 1.2)}
                markerEnd="url(#eFieldArrow)"
                filter="url(#cyanGlow)"
              />

              {/* Electric Field Badge */}
              <rect
                x={JUNCTION_X - 68}
                y={SLAB_Y + SLAB_HEIGHT / 2 - 12}
                width="136"
                height="24"
                fill="#020617"
                stroke="#06b6d4"
                strokeWidth="1"
                rx="5"
                opacity="0.95"
              />
              <text
                x={JUNCTION_X}
                y={SLAB_Y + SLAB_HEIGHT / 2 + 4}
                fill="#22d3ee"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                ← E-Field (N → P)
              </text>
            </g>
          )}

          {/* ========================================================= */}
          {/* CARRIER MOVEMENT INDICATORS FOR FORWARD / REVERSE / LEARN */}
          {/* ========================================================= */}

          {/* FORWARD BIAS: High carrier injection across junction */}
          {isForwardConduction && (
            <g>
              {/* Holes injected from P to N (moving right) */}
              <g className={!reducedMotion ? "animate-pulse" : ""}>
                <line
                  x1={JUNCTION_X - 65}
                  y1={SLAB_Y + 50}
                  x2={JUNCTION_X + 50}
                  y2={SLAB_Y + 50}
                  stroke="#fb923c"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#holeArrow)"
                />
                <text
                  x={JUNCTION_X - 10}
                  y={SLAB_Y + 42}
                  fill="#fdba74"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  h⁺ Injection →
                </text>
              </g>

              {/* Electrons injected from N to P (moving left) */}
              <g className={!reducedMotion ? "animate-pulse" : ""}>
                <line
                  x1={JUNCTION_X + 65}
                  y1={SLAB_Y + SLAB_HEIGHT - 45}
                  x2={JUNCTION_X - 50}
                  y2={SLAB_Y + SLAB_HEIGHT - 45}
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#electronArrow)"
                />
                <text
                  x={JUNCTION_X + 10}
                  y={SLAB_Y + SLAB_HEIGHT - 52}
                  fill="#7dd3fc"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  ← e⁻ Injection
                </text>
              </g>

              {/* High Forward Current Badge */}
              {isHighForward && (
                <g>
                  <rect
                    x={JUNCTION_X - 75}
                    y={SLAB_Y + SLAB_HEIGHT - 22}
                    width="150"
                    height="18"
                    fill="#15803d"
                    rx="4"
                    opacity="0.9"
                  />
                  <text
                    x={JUNCTION_X}
                    y={SLAB_Y + SLAB_HEIGHT - 9}
                    fill="#f0fdf4"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    HIGH FORWARD CURRENT
                  </text>
                </g>
              )}
            </g>
          )}

          {/* REVERSE BIAS: Minority leakage and carrier pull-back */}
          {isReverseBias && (
            <g>
              {/* Arrows showing majority carriers pulled away from junction */}
              <line
                x1={pDepletionLeft + 25}
                y1={SLAB_Y + 50}
                x2={pDepletionLeft - 30}
                y2={SLAB_Y + 50}
                stroke="#f43f5e"
                strokeWidth="1.8"
                strokeDasharray="3 3"
                markerEnd="url(#holeArrow)"
              />
              <line
                x1={nDepletionRight - 25}
                y1={SLAB_Y + SLAB_HEIGHT - 45}
                x2={nDepletionRight + 30}
                y2={SLAB_Y + SLAB_HEIGHT - 45}
                stroke="#0284c7"
                strokeWidth="1.8"
                strokeDasharray="3 3"
                markerEnd="url(#electronArrow)"
              />
              <text
                x={JUNCTION_X}
                y={SLAB_Y + 32}
                fill="#a5b4fc"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                Majority Carriers Blocked (Depleted)
              </text>
            </g>
          )}

          {/* LEARN MODE: Guided Carrier Animation Highlights */}
          {mode === "learn" && currentLearnStep.step === 3 && (
            <g>
              <line
                x1={JUNCTION_X + 55}
                y1={SLAB_Y + 115}
                x2={JUNCTION_X - 45}
                y2={SLAB_Y + 115}
                stroke="#38bdf8"
                strokeWidth="3"
                markerEnd="url(#electronArrow)"
              />
              <text
                x={JUNCTION_X}
                y={SLAB_Y + 105}
                fill="#38bdf8"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Electrons Diffuse to P-side
              </text>
            </g>
          )}

          {mode === "learn" && currentLearnStep.step === 4 && (
            <g>
              <line
                x1={JUNCTION_X - 55}
                y1={SLAB_Y + 115}
                x2={JUNCTION_X + 45}
                y2={SLAB_Y + 115}
                stroke="#fb923c"
                strokeWidth="3"
                markerEnd="url(#holeArrow)"
              />
              <text
                x={JUNCTION_X}
                y={SLAB_Y + 105}
                fill="#fb923c"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Holes Diffuse to N-side
              </text>
            </g>
          )}

          {mode === "learn" && currentLearnStep.step === 5 && (
            <g>
              <circle
                cx={JUNCTION_X}
                cy={SLAB_Y + 115}
                r="18"
                fill="#fbbf24"
                fillOpacity="0.25"
                stroke="#f59e0b"
                strokeWidth="2"
                className={!reducedMotion ? "animate-ping" : ""}
              />
              <text
                x={JUNCTION_X}
                y={SLAB_Y + 119}
                fill="#fef08a"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                e⁻ + h⁺ RECOMBINE
              </text>
            </g>
          )}

          {/* ========================================================= */}
          {/* EXTERNAL TERMINAL LEADS & BIAS POLARITY                   */}
          {/* ========================================================= */}
          <g>
            {/* Left Contact (Anode / P-Terminal) */}
            <rect
              x={SLAB_X - 16}
              y={SLAB_Y + SLAB_HEIGHT / 2 - 28}
              width="16"
              height="56"
              fill="#334155"
              stroke="#64748b"
              strokeWidth="1.5"
              rx="2"
            />
            <line
              x1={SLAB_X - 16}
              y1={SLAB_Y + SLAB_HEIGHT / 2}
              x2={SLAB_X - 38}
              y2={SLAB_Y + SLAB_HEIGHT / 2}
              stroke="#94a3b8"
              strokeWidth="2"
            />

            {/* Right Contact (Cathode / N-Terminal) */}
            <rect
              x={SLAB_X + SLAB_WIDTH}
              y={SLAB_Y + SLAB_HEIGHT / 2 - 28}
              width="16"
              height="56"
              fill="#334155"
              stroke="#64748b"
              strokeWidth="1.5"
              rx="2"
            />
            <line
              x1={SLAB_X + SLAB_WIDTH + 16}
              y1={SLAB_Y + SLAB_HEIGHT / 2}
              x2={SLAB_X + SLAB_WIDTH + 38}
              y2={SLAB_Y + SLAB_HEIGHT / 2}
              stroke="#94a3b8"
              strokeWidth="2"
            />

            {/* External Bias Indicators */}
            <g>
              {/* Left Lead Polarity */}
              <circle
                cx={SLAB_X - 42}
                cy={SLAB_Y + SLAB_HEIGHT / 2}
                r="11"
                fill={
                  biasMode === "forward"
                    ? "#15803d"
                    : biasMode === "reverse"
                    ? "#991b1b"
                    : "#1e293b"
                }
                stroke={
                  biasMode === "forward"
                    ? "#4ade80"
                    : biasMode === "reverse"
                    ? "#f87171"
                    : "#64748b"
                }
                strokeWidth="1.5"
              />
              <text
                x={SLAB_X - 42}
                y={SLAB_Y + SLAB_HEIGHT / 2 + 4}
                fill="#ffffff"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                {biasMode === "forward" ? "+" : biasMode === "reverse" ? "−" : "0"}
              </text>
              <text
                x={SLAB_X - 42}
                y={SLAB_Y + SLAB_HEIGHT / 2 - 16}
                fill="#94a3b8"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                Anode
              </text>

              {/* Right Lead Polarity */}
              <circle
                cx={SLAB_X + SLAB_WIDTH + 42}
                cy={SLAB_Y + SLAB_HEIGHT / 2}
                r="11"
                fill={
                  biasMode === "forward"
                    ? "#1e3a8a"
                    : biasMode === "reverse"
                    ? "#15803d"
                    : "#1e293b"
                }
                stroke={
                  biasMode === "forward"
                    ? "#60a5fa"
                    : biasMode === "reverse"
                    ? "#4ade80"
                    : "#64748b"
                }
                strokeWidth="1.5"
              />
              <text
                x={SLAB_X + SLAB_WIDTH + 42}
                y={SLAB_Y + SLAB_HEIGHT / 2 + 4}
                fill="#ffffff"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                {biasMode === "forward" ? "−" : biasMode === "reverse" ? "+" : "0"}
              </text>
              <text
                x={SLAB_X + SLAB_WIDTH + 42}
                y={SLAB_Y + SLAB_HEIGHT / 2 - 16}
                fill="#94a3b8"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                Cathode
              </text>
            </g>
          </g>

          {/* ========================================================= */}
          {/* LOWER DECK: ELECTROSTATIC POTENTIAL BARRIER GRAPH         */}
          {/* Shows V(x) across P-type -> Depletion -> N-type           */}
          {/* ========================================================= */}
          <g>
            {/* Graph Frame Box */}
            <rect
              x={GRAPH_X}
              y={GRAPH_Y}
              width={GRAPH_WIDTH}
              height={GRAPH_HEIGHT}
              fill="#020617"
              fillOpacity="0.85"
              stroke="#1e293b"
              strokeWidth="1.2"
              rx="8"
            />

            {/* Graph Title & Axis */}
            <text
              x={GRAPH_X + 16}
              y={GRAPH_Y + 20}
              fill="#38bdf8"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
            >
              ELECTROSTATIC POTENTIAL PROFILE V(x)
            </text>
            <text
              x={GRAPH_X + 16}
              y={GRAPH_Y + 34}
              fill="#64748b"
              fontSize="10"
              fontFamily="monospace"
            >
              Contact Potential Hill: Barrier Height V_barrier = {metrics.barrierHeightV.toFixed(2)} V
            </text>

            {/* Reference Center Line aligned with x = 0 */}
            <line
              x1={JUNCTION_X}
              y1={GRAPH_Y}
              x2={JUNCTION_X}
              y2={GRAPH_Y + GRAPH_HEIGHT}
              stroke="#1e293b"
              strokeDasharray="4 4"
              strokeWidth="1"
            />

            {/* Baseline 0V reference line (P-side) */}
            <line
              x1={GRAPH_X + 10}
              y1={GRAPH_BASELINE_Y}
              x2={GRAPH_X + GRAPH_WIDTH - 10}
              y2={GRAPH_BASELINE_Y}
              stroke="#334155"
              strokeDasharray="2 2"
              strokeWidth="0.8"
            />
            <text
              x={GRAPH_X + 16}
              y={GRAPH_BASELINE_Y - 4}
              fill="#64748b"
              fontSize="9"
              fontFamily="monospace"
            >
              0 V (P-neutral Ref)
            </text>

            {/* Area under potential curve */}
            <path
              d={`${potentialPathD} L ${GRAPH_X + GRAPH_WIDTH} ${GRAPH_BASELINE_Y} L ${GRAPH_X} ${GRAPH_BASELINE_Y} Z`}
              fill="rgba(6, 182, 212, 0.08)"
            />

            {/* Main Potential Curve V(x) */}
            <path
              d={potentialPathD}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              className="transition-all duration-300"
            />

            {/* Barrier Height Dimension Callout */}
            <line
              x1={GRAPH_X + GRAPH_WIDTH - 65}
              y1={pPotentialY}
              x2={GRAPH_X + GRAPH_WIDTH - 65}
              y2={nPotentialY}
              stroke="#f59e0b"
              strokeWidth="1.5"
            />
            <line
              x1={GRAPH_X + GRAPH_WIDTH - 72}
              y1={pPotentialY}
              x2={GRAPH_X + GRAPH_WIDTH - 58}
              y2={pPotentialY}
              stroke="#f59e0b"
              strokeWidth="1.5"
            />
            <line
              x1={GRAPH_X + GRAPH_WIDTH - 72}
              y1={nPotentialY}
              x2={GRAPH_X + GRAPH_WIDTH - 58}
              y2={nPotentialY}
              stroke="#f59e0b"
              strokeWidth="1.5"
            />
            <text
              x={GRAPH_X + GRAPH_WIDTH - 78}
              y={(pPotentialY + nPotentialY) / 2 + 4}
              fill="#fbbf24"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="end"
            >
              q · Vbarrier ({metrics.barrierHeightV.toFixed(2)} eV)
            </text>

            {/* Carrier Crossing Difficulty Legend */}
            <text
              x={GRAPH_X + 280}
              y={GRAPH_Y + GRAPH_HEIGHT - 12}
              fill="#94a3b8"
              fontSize="10"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {biasMode === "forward"
                ? "▼ Lowered Barrier allows exponential majority diffusion"
                : biasMode === "reverse"
                ? "▲ Elevated Barrier suppresses majority diffusion completely"
                : "◆ Equilibrium Barrier balances Diffusion with Field Drift"}
            </text>
          </g>
        </svg>

        {/* Interactive Tooltip Card Overlay */}
        {activeTooltip && (
          <div
            className="absolute z-30 pointer-events-none p-3 rounded-xl bg-slate-900/95 border border-cyan-500/50 shadow-xl backdrop-blur-md max-w-xs transition-opacity"
            style={{
              left: Math.min(
                Math.max(16, (activeTooltip.x / (window.innerWidth || 1000)) * SVG_WIDTH - 120),
                SVG_WIDTH - 280
              ),
              top: 20,
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                {activeTooltip.category}
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-100 mb-1">
              {activeTooltip.title}
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-1.5">
              {activeTooltip.description}
            </p>
            {activeTooltip.formula && (
              <div className="text-[10px] font-mono text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                {activeTooltip.formula}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Diagram Legend Strip */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-mono text-slate-400 px-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center text-[9px] text-rose-200 font-bold">
              +
            </span>
            <span>Mobile Hole (h⁺)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-sky-950 border border-sky-400 flex items-center justify-center text-[9px] text-sky-200 font-bold">
              −
            </span>
            <span>Mobile Electron (e⁻)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-rose-950/80 border border-rose-500 flex items-center justify-center text-[10px] text-rose-300 font-bold">
              −
            </span>
            <span>Fixed Acceptor (Na⁻)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-sky-950/80 border border-sky-500 flex items-center justify-center text-[10px] text-sky-300 font-bold">
              +
            </span>
            <span>Fixed Donor (Nd⁺)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 bg-cyan-400" />
            <span>Built-in Field (E_bi)</span>
          </span>
        </div>

        <div className="text-slate-500 text-[10px]">
          Hover elements for physics details
        </div>
      </div>
    </div>
  );
}
