/**
 * Pure TypeScript educational and physical model for the PN Junction Visualization.
 * Keeps physics calculations, educational step progressions, and telemetry separate
 * from React rendering and SVG display logic.
 */

export type VisualizerMode = "learn" | "explore";
export type BiasMode = "equilibrium" | "forward" | "reverse";

export interface LearnStep {
  step: number;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  physicsDetail: string;
  // Visual configuration flags for this guided step
  materialsJoined: boolean;
  electronDiffusionActive: boolean;
  holeDiffusionActive: boolean;
  recombinationActive: boolean;
  depletionFormed: boolean;
  electricFieldActive: boolean;
  equilibriumReached: boolean;
  // Normalized physical values for SVG diagram
  depletionWidthFactor: number; // 0 (none) to 1 (full equilibrium width)
  barrierHeightV: number; // in Volts
  electricFieldStrength: number; // 0 to 1
  netCurrentText: string;
}

export interface PNJunctionMetrics {
  mode: VisualizerMode;
  biasMode: BiasMode;
  voltageV: number;
  barrierHeightV: number;
  depletionWidthUm: number;
  depletionWidthFactor: number; // 0.2 (narrow) to 2.2 (wide) relative to W0
  electricFieldStrength: number; // 0.1 to 1.0 (relative intensity)
  currentTrendText: string;
  currentType: "zero" | "exponential" | "leakage";
  currentMa: number;
  carrierInjectionRate: "None" | "Low" | "Moderate" | "High" | "Extremely High";
  depletionTrend: "Contracted (Narrow)" | "Nominal Equilibrium" | "Expanded (Wide)";
  barrierTrend: "Lowered" | "Balanced (Vbi = 0.70V)" | "Elevated";
  explanation: string;
  stepIndex?: number;
  stepTotal?: number;
}

// Built-in Silicon physical constants (conceptual reference)
export const SILICON_CONSTANTS = {
  material: "Silicon (Si)",
  bandGapEg: 1.12, // eV at 300K
  builtInPotentialVbi: 0.70, // Volts
  nominalDepletionWidthW0: 0.50, // micrometers
  thermalVoltageVt: 0.026, // Volts at 300K
  reverseSaturationCurrentPa: 10, // picoamps
  dopingConcentrationCm3: "1.0 × 10¹⁶ cm⁻³",
};

/**
 * 8 Guided Educational Steps for "Learn" Mode
 */
export const LEARN_STEPS: LearnStep[] = [
  {
    step: 1,
    title: "Isolated P-Type and N-Type Materials",
    badge: "STEP 1 OF 8",
    subtitle: "Doped semiconductor blocks before physical junction contact",
    description:
      "P-type silicon is doped with trivalent Boron, creating abundant mobile positive holes (h⁺) alongside fixed negative acceptor ions. N-type silicon is doped with pentavalent Phosphorus, providing mobile electrons (e⁻) and fixed positive donor ions. Both blocks are electrically neutral.",
    physicsDetail:
      "At this initial stage, no contact exists. Carrier distributions are uniform within each crystal slab, and electrostatic potential across each block is completely flat.",
    materialsJoined: false,
    electronDiffusionActive: false,
    holeDiffusionActive: false,
    recombinationActive: false,
    depletionFormed: false,
    electricFieldActive: false,
    equilibriumReached: false,
    depletionWidthFactor: 0,
    barrierHeightV: 0,
    electricFieldStrength: 0,
    netCurrentText: "0.00 mA (Isolated)",
  },
  {
    step: 2,
    title: "Metallurgical Junction Formed",
    badge: "STEP 2 OF 8",
    subtitle: "Contact established at x = 0, creating steep concentration gradient",
    description:
      "When P-type and N-type crystals join at an atomic metallurgical interface, a colossal carrier concentration gradient appears: 10¹⁶ electrons/cm³ on the N-side face almost zero on the P-side, and vice versa.",
    physicsDetail:
      "Thermodynamics dictates that particles naturally diffuse from regions of high concentration to regions of low concentration, driven by random thermal velocity (vth ≈ 10⁷ cm/s).",
    materialsJoined: true,
    electronDiffusionActive: false,
    holeDiffusionActive: false,
    recombinationActive: false,
    depletionFormed: false,
    electricFieldActive: false,
    equilibriumReached: false,
    depletionWidthFactor: 0.05,
    barrierHeightV: 0.05,
    electricFieldStrength: 0.05,
    netCurrentText: "Gradient Established",
  },
  {
    step: 3,
    title: "Electrons Diffuse Toward P-Side",
    badge: "STEP 3 OF 8",
    subtitle: "Majority electrons cross from high density N-region to low density P-region",
    description:
      "Free conduction-band electrons in the N-type region immediately begin diffusing across the junction boundary into the P-side due to the steep concentration gradient.",
    physicsDetail:
      "Fick's First Law of Diffusion governs this flux: Jn,diff = q · Dn · (dn/dx). High local electron density gradient dn/dx produces an instantaneous initial diffusion current.",
    materialsJoined: true,
    electronDiffusionActive: true,
    holeDiffusionActive: false,
    recombinationActive: false,
    depletionFormed: false,
    electricFieldActive: false,
    equilibriumReached: false,
    depletionWidthFactor: 0.15,
    barrierHeightV: 0.12,
    electricFieldStrength: 0.15,
    netCurrentText: "Electron Diffusion Initialized",
  },
  {
    step: 4,
    title: "Holes Diffuse Toward N-Side",
    badge: "STEP 4 OF 8",
    subtitle: "Majority holes cross from high density P-region to low density N-region",
    description:
      "Simultaneously, valence-band holes in the P-type region diffuse across the junction into the N-type region, following their own concentration gradient.",
    physicsDetail:
      "Hole diffusion flux Jp,diff = -q · Dp · (dp/dx). Both mobile carrier species are now actively crossing the metallurgical interface in opposite physical directions.",
    materialsJoined: true,
    electronDiffusionActive: true,
    holeDiffusionActive: true,
    recombinationActive: false,
    depletionFormed: false,
    electricFieldActive: false,
    equilibriumReached: false,
    depletionWidthFactor: 0.3,
    barrierHeightV: 0.25,
    electricFieldStrength: 0.3,
    netCurrentText: "Dual Carrier Diffusion",
  },
  {
    step: 5,
    title: "Carrier Recombination at Interface",
    badge: "STEP 5 OF 8",
    subtitle: "Diffusing electrons and holes meet near x = 0 and annihilate",
    description:
      "As electrons cross into the P-region and holes cross into the N-region, they encounter high concentrations of opposite carriers and recombine into covalent bonds. Mobile charge carriers are eliminated in the immediate junction vicinity.",
    physicsDetail:
      "Recombination restores complete valence shells: e⁻ + h⁺ → energy (phonons / photons). This permanently removes mobile charge carriers right at the junction interface.",
    materialsJoined: true,
    electronDiffusionActive: true,
    holeDiffusionActive: true,
    recombinationActive: true,
    depletionFormed: true,
    electricFieldActive: false,
    equilibriumReached: false,
    depletionWidthFactor: 0.5,
    barrierHeightV: 0.4,
    electricFieldStrength: 0.5,
    netCurrentText: "Recombination in Transition Zone",
  },
  {
    step: 6,
    title: "Depletion Region (Space-Charge) Forms",
    badge: "STEP 6 OF 8",
    subtitle: "Immobile ionized dopants remain uncompensated in the lattice",
    description:
      "Because electrons left the N-side, they leave behind uncompensated positively charged donor atoms (Nd⁺). Because holes left the P-side, they leave behind uncompensated negatively charged acceptor atoms (Na⁻). This zone, stripped of mobile carriers, is the Depletion Region.",
    physicsDetail:
      "These donor and acceptor ions are chemically bonded into the silicon crystal lattice and cannot move. They form a static space-charge layer with total charge neutrality: q · Na · xp = q · Nd · xn.",
    materialsJoined: true,
    electronDiffusionActive: false,
    holeDiffusionActive: false,
    recombinationActive: true,
    depletionFormed: true,
    electricFieldActive: true,
    equilibriumReached: false,
    depletionWidthFactor: 0.75,
    barrierHeightV: 0.55,
    electricFieldStrength: 0.75,
    netCurrentText: "Space Charge Layer Established",
  },
  {
    step: 7,
    title: "Internal Electric Field Develops",
    badge: "STEP 7 OF 8",
    subtitle: "Fixed charge separation produces built-in electrostatic field E pointing N → P",
    description:
      "The physical separation between positive donor ions (N-side) and negative acceptor ions (P-side) creates a powerful internal electric field (E_bi) pointing from N to P. This field pushes diffusing electrons back to the N-side and holes back to the P-side.",
    physicsDetail:
      "Poisson's equation dictates the electrostatic profile: dE/dx = ρ(x) / ε_si. The electric field peaks precisely at the metallurgical junction (x = 0) and creates a counter-acting drift force: F = q · E.",
    materialsJoined: true,
    electronDiffusionActive: false,
    holeDiffusionActive: false,
    recombinationActive: false,
    depletionFormed: true,
    electricFieldActive: true,
    equilibriumReached: false,
    depletionWidthFactor: 0.9,
    barrierHeightV: 0.65,
    electricFieldStrength: 0.9,
    netCurrentText: "Drift Opposes Diffusion",
  },
  {
    step: 8,
    title: "Thermal Equilibrium Established",
    badge: "STEP 8 OF 8",
    subtitle: "Diffusion current is exactly balanced by drift current (J_total = 0)",
    description:
      "The built-in electric field strengthens until drift current exactly cancels diffusion current. A contact potential barrier (Vbi ≈ 0.70 V in silicon) is permanently established. Without external bias, no net current flows through the device.",
    physicsDetail:
      "J_total = J_drift + J_diffusion = 0 for both electrons and holes individually. The Fermi level EF aligns horizontally flat throughout the entire structure.",
    materialsJoined: true,
    electronDiffusionActive: false,
    holeDiffusionActive: false,
    recombinationActive: false,
    depletionFormed: true,
    electricFieldActive: true,
    equilibriumReached: true,
    depletionWidthFactor: 1.0,
    barrierHeightV: 0.70,
    electricFieldStrength: 1.0,
    netCurrentText: "0.00 mA (Equilibrium Balance)",
  },
];

/**
 * Computes deterministic physical metrics for Explore Mode based on applied voltage and bias mode.
 */
export function calculateExploreMetrics(
  biasMode: BiasMode,
  voltageV: number
): PNJunctionMetrics {
  const Vbi = SILICON_CONSTANTS.builtInPotentialVbi; // 0.70 V
  const W0 = SILICON_CONSTANTS.nominalDepletionWidthW0; // 0.50 um

  let effectiveVoltage = 0;
  let barrierHeightV = Vbi;
  let depletionWidthFactor = 1.0;
  let currentTrendText = "0.00 mA (Balanced)";
  let currentType: "zero" | "exponential" | "leakage" = "zero";
  let currentMa = 0;
  let carrierInjectionRate: PNJunctionMetrics["carrierInjectionRate"] = "None";
  let depletionTrend: PNJunctionMetrics["depletionTrend"] = "Nominal Equilibrium";
  let barrierTrend: PNJunctionMetrics["barrierTrend"] = "Balanced (Vbi = 0.70V)";
  let explanation = "";

  if (biasMode === "equilibrium") {
    effectiveVoltage = 0;
    barrierHeightV = Vbi;
    depletionWidthFactor = 1.0;
    currentMa = 0;
    currentType = "zero";
    currentTrendText = "0.00 mA (Dynamic Balance)";
    carrierInjectionRate = "None";
    depletionTrend = "Nominal Equilibrium";
    barrierTrend = "Balanced (Vbi = 0.70V)";
    explanation =
      "The PN junction has formed a stable depletion region. Fixed ions create an internal electric field (E_bi) that exactly opposes further carrier diffusion, maintaining J_drift + J_diff = 0.";
  } else if (biasMode === "forward") {
    // Clamp voltage between 0.05 and 0.75V
    effectiveVoltage = Math.max(0.05, Math.min(0.75, voltageV));
    // Barrier is lowered by applied forward voltage: V_barrier = Vbi - Va
    barrierHeightV = Math.max(0.04, Number((Vbi - effectiveVoltage).toFixed(3)));
    // Depletion width shrinks proportional to sqrt(V_barrier / Vbi)
    depletionWidthFactor = Math.max(0.25, Math.sqrt(barrierHeightV / Vbi));

    // Approximate Shockley exponential forward current: I ~ Is * (exp(Va / Vt) - 1)
    // Scaled for educational visualization (mA)
    const normalizedExp = Math.exp((effectiveVoltage - 0.4) / 0.075);
    currentMa = Number(Math.min(95.0, normalizedExp * 1.5).toFixed(2));
    currentType = "exponential";
    currentTrendText = `${currentMa} mA (Exponential Forward Current)`;

    if (effectiveVoltage < 0.3) {
      carrierInjectionRate = "Low";
    } else if (effectiveVoltage < 0.5) {
      carrierInjectionRate = "Moderate";
    } else if (effectiveVoltage < 0.65) {
      carrierInjectionRate = "High";
    } else {
      carrierInjectionRate = "Extremely High";
    }

    depletionTrend = "Contracted (Narrow)";
    barrierTrend = "Lowered";
    explanation = `Applying forward bias (${effectiveVoltage.toFixed(2)} V) reduces the electrostatic barrier to ${barrierHeightV.toFixed(2)} V and narrows the depletion width. Energetic majority carriers overcome the barrier and inject across the junction, causing exponential forward conduction.`;
  } else if (biasMode === "reverse") {
    // Reverse voltage is negative, range -0.1V to -5.0V
    effectiveVoltage = -Math.abs(Math.max(0.1, Math.min(5.0, Math.abs(voltageV))));
    const absV = Math.abs(effectiveVoltage);
    // Barrier is increased by applied reverse voltage: V_barrier = Vbi + |Va|
    barrierHeightV = Number((Vbi + absV).toFixed(3));
    // Depletion width expands proportional to sqrt((Vbi + |Va|) / Vbi)
    depletionWidthFactor = Math.min(2.4, Math.sqrt((Vbi + absV) / Vbi));

    currentMa = 0.00001; // tiny leakage
    currentType = "leakage";
    currentTrendText = "~10 pA (Reverse Saturation Leakage Is)";
    carrierInjectionRate = "None";
    depletionTrend = "Expanded (Wide)";
    barrierTrend = "Elevated";
    explanation = `Applying reverse bias (${effectiveVoltage.toFixed(2)} V) widens the depletion region to ${(W0 * depletionWidthFactor).toFixed(2)} µm and elevates the potential barrier to ${barrierHeightV.toFixed(2)} V. Majority carriers are pulled away from the junction; current is restricted to tiny minority thermal leakage.`;
  }

  const depletionWidthUm = Number((W0 * depletionWidthFactor).toFixed(3));
  // Electric field strength: Emax = 2 * V_barrier / W
  // Normalized to 1.0 at equilibrium
  const electricFieldStrength = Number(
    Math.min(2.5, (barrierHeightV / Vbi) / depletionWidthFactor).toFixed(2)
  );

  return {
    mode: "explore",
    biasMode,
    voltageV: effectiveVoltage,
    barrierHeightV,
    depletionWidthUm,
    depletionWidthFactor,
    electricFieldStrength,
    currentTrendText,
    currentType,
    currentMa,
    carrierInjectionRate,
    depletionTrend,
    barrierTrend,
    explanation,
  };
}

/**
 * Returns the state metrics for a given Learn Mode step.
 */
export function calculateLearnMetrics(stepIndex: number): PNJunctionMetrics {
  const stepData = LEARN_STEPS[Math.max(0, Math.min(LEARN_STEPS.length - 1, stepIndex))];
  const W0 = SILICON_CONSTANTS.nominalDepletionWidthW0;

  const depletionWidthUm = Number((W0 * stepData.depletionWidthFactor).toFixed(3));

  return {
    mode: "learn",
    biasMode: "equilibrium",
    voltageV: 0.0,
    barrierHeightV: stepData.barrierHeightV,
    depletionWidthUm,
    depletionWidthFactor: stepData.depletionWidthFactor,
    electricFieldStrength: stepData.electricFieldStrength,
    currentTrendText: stepData.netCurrentText,
    currentType: "zero",
    currentMa: 0,
    carrierInjectionRate: stepData.recombinationActive ? "Moderate" : "None",
    depletionTrend: stepData.depletionFormed ? "Nominal Equilibrium" : "Contracted (Narrow)",
    barrierTrend: "Balanced (Vbi = 0.70V)",
    explanation: stepData.description,
    stepIndex: stepData.step,
    stepTotal: LEARN_STEPS.length,
  };
}
