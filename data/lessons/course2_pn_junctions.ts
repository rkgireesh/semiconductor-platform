import { FullLessonData } from "./types";

export const COURSE_2_LESSONS: Record<string, FullLessonData> = {
  "pn-electrostatics-vbi": {
    id: "pn-electrostatics-vbi",
    courseId: "pn-junction-diodes",
    title: "PN Junction Electrostatics & Built-in Potential (Vbi)",
    duration: "55 min",
    difficulty: "Intermediate",
    tag: "JUNCTION PHYSICS",
    summary: "Derive the built-in potential barrier, depletion region charge profile, and electric field distribution using Poisson's equation.",
    learningObjectives: [
      "Calculate the built-in potential Vbi across a metallurgical p-n junction.",
      "Solve Poisson's equation to obtain the electric field distribution E(x).",
      "Calculate total depletion region width W as a function of applied reverse or forward bias voltage."
    ],
    keyFormulas: [
      {
        label: "Built-in Potential (Vbi)",
        formula: "Vbi = (kT / q) · ln(Na · Nd / ni²)",
        desc: "Contact potential barrier established in thermal equilibrium across the space-charge region."
      },
      {
        label: "Depletion Region Width (W)",
        formula: "W = √[ (2 · ε_si / q) · (1/Na + 1/Nd) · (Vbi - V_applied) ]",
        desc: "Total spatial width of uncompensated fixed space charges."
      },
      {
        label: "Peak Electric Field (Emax)",
        formula: "Emax = -2 · (Vbi - V) / W = -q · Nd · xn / ε_si",
        desc: "Maximum electric field occurring precisely at the metallurgical junction (x = 0)."
      }
    ],
    sections: [
      {
        title: "1. Formation of the Space-Charge Region",
        content: [
          "When P-type silicon (high hole concentration) and N-type silicon (high electron concentration) form a metallurgical interface, steep concentration gradients drive carrier diffusion.",
          "Electrons diffuse from the N-side into the P-side, leaving behind uncompensated positively charged fixed donor ions (Nd⁺).",
          "Holes diffuse from the P-side into the N-side, leaving behind negatively charged fixed acceptor ions (Na⁻).",
          "This zone around the junction is stripped of mobile charge carriers and is termed the Depletion Region (or Space-Charge Region)."
        ]
      },
      {
        title: "2. Thermal Equilibrium & Electric Field Balance",
        content: [
          "The fixed ions create a strong internal electric field directed from the positive donor ions (N-side) to the negative acceptor ions (P-side).",
          "This built-in electric field opposes further carrier diffusion by generating a counter-balancing drift current.",
          "In thermal equilibrium with zero external bias, the forward diffusion current exactly cancels the reverse drift current: J_total = J_drift + J_diffusion = 0."
        ],
        callout: {
          type: "physics",
          title: "Electrostatic Insight",
          text: "The depletion width extends deeper into the more lightly doped side of the junction to maintain total charge neutrality: q · Na · xp = q · Nd · xn."
        }
      }
    ],
    checkpoint: {
      question: "What happens to the PN junction depletion region width (W) when an external reverse bias voltage (Vr) is applied?",
      options: [
        "It decreases to zero",
        "It widens/increases",
        "It stays completely unchanged",
        "It turns into a conducting channel"
      ],
      correctIndex: 1,
      explanation: "Reverse bias pulls mobile carriers further away from the junction, increasing the total barrier voltage (Vbi + Vr) and expanding the depletion width W."
    },
    keyTakeaways: [
      "Diffusion of mobile carriers leaves behind fixed ionized dopants that form the space-charge region.",
      "The built-in potential barrier is Vbi = (kT/q) ln(Na·Nd / ni²), typically 0.6V - 0.9V in silicon.",
      "Applying reverse bias widens the depletion width W; forward bias narrows W and lowers the barrier."
    ],
    practicalApplications: [
      "CMOS well junction isolation design",
      "Varactor diode voltage-controlled tuning in RF VCOs",
      "Solar cell depletion region carrier separation"
    ],
    relatedResearchTopicId: "pn-junction-electrostatics-built-in-potential",
    relatedLabId: "pn-junction-lab",
    prevLessonId: "carrier-transport-drift-diffusion",
    nextLessonId: "shockley-diode-equation"
  },
  "shockley-diode-equation": {
    id: "shockley-diode-equation",
    courseId: "pn-junction-diodes",
    title: "Forward & Reverse Bias: The Shockley Equation",
    duration: "60 min",
    difficulty: "Intermediate",
    tag: "DIODE DYNAMICS",
    summary: "Derive the ideal diode equation from minority carrier injection profiles, continuity equations, and diffusion currents.",
    learningObjectives: [
      "Derive the minority carrier boundary conditions under forward bias: np(0) = np0 · exp(qVa / kT).",
      "Solve the steady-state continuity equation to obtain the Shockley Ideal Diode Equation.",
      "Analyze the reverse saturation current I0 as a function of material parameters and temperature."
    ],
    keyFormulas: [
      {
        label: "Shockley Diode Equation",
        formula: "I = I0 · [ exp(q·Va / (n·k·T)) - 1 ]",
        desc: "Ideal current-voltage relationship for PN junction diodes under external voltage Va."
      },
      {
        label: "Reverse Saturation Current (I0)",
        formula: "I0 = q · A · [ (Dp · pn0 / Lp) + (Dn · np0 / Ln) ]",
        desc: "Thermally generated minority carrier leakage current when reverse biased."
      },
      {
        label: "Law of the Junction",
        formula: "pn(xn) = pn0 · exp(q·Va / kT)",
        desc: "Excess minority carrier density injected across the lowered electrostatic barrier."
      }
    ],
    sections: [
      {
        title: "1. The Law of the Junction & Carrier Injection",
        content: [
          "Under forward bias Va, the electrostatic barrier across the space-charge layer drops from Vbi to (Vbi - Va).",
          "This lowered barrier allows majority carriers with sufficient thermal kinetic energy to surmount the junction and inject into the opposite neutral region as excess minority carriers.",
          "At the depletion edges, the minority carrier concentration increases exponentially with applied voltage: pn(xn) = pn0 · exp(Va / Vt) and np(-xp) = np0 · exp(Va / Vt)."
        ]
      },
      {
        title: "2. Continuity & Diffusion Current Derivation",
        content: [
          "Once injected, excess minority carriers diffuse through the quasi-neutral regions while undergoing recombination with majority carriers.",
          "Solving the steady-state minority carrier diffusion equations yields exponential decay profiles with characteristic diffusion lengths Lp = √(Dp · τp) and Ln = √(Dn · τn).",
          "Summing the electron and hole diffusion currents at the depletion boundaries produces the famous Shockley diode equation: I = I0 · [exp(Va / Vt) - 1]."
        ],
        callout: {
          type: "physics",
          title: "Diode Turn-On Threshold",
          text: "Because of the exponential exp(Va / Vt) dependency (where Vt ≈ 26 mV at room temperature), current remains negligible until Va reaches approximately 0.6V to 0.7V in silicon."
        }
      }
    ],
    checkpoint: {
      question: "Why does forward diode current increase exponentially with applied voltage Va?",
      options: [
        "Because the silicon crystal melts under forward current",
        "Because the potential barrier lowers, allowing an exponentially larger fraction of Maxwell-Boltzmann distributed carriers to inject across",
        "Because capacitance increases to infinity",
        "Because holes turn into electrons"
      ],
      correctIndex: 1,
      explanation: "Carrier energies follow a Maxwell-Boltzmann thermal distribution. Lowering the barrier by Va allows exp(qVa/kT) more energetic carriers to surmount the junction and inject across as diffusion current."
    },
    keyTakeaways: [
      "Forward bias lowers the junction barrier, enabling exponential minority carrier injection.",
      "The Shockley equation I = I0 [exp(qVa/kT) - 1] describes the asymmetric rectification characteristic.",
      "In silicon diodes at 300K, the noticeable conduction knee occurs between 0.6V and 0.7V."
    ],
    practicalApplications: [
      "AC to DC full-bridge power rectification",
      "Clamping and clipping protection in analog signal chains",
      "Bandgap voltage reference generation"
    ],
    relatedResearchTopicId: "pn-junction-electrostatics-built-in-potential",
    relatedLabId: "diode-iv-characteristics",
    prevLessonId: "pn-electrostatics-vbi",
    nextLessonId: "junction-capacitance-breakdown"
  },
  "junction-capacitance-breakdown": {
    id: "junction-capacitance-breakdown",
    courseId: "pn-junction-diodes",
    title: "Junction Capacitances & Breakdown Phenomena",
    duration: "50 min",
    difficulty: "Intermediate",
    tag: "DYNAMIC DIODES",
    summary: "Examine voltage-dependent depletion capacitance Cj, minority charge storage diffusion capacitance Cd, diode reverse recovery transients, and Zener vs avalanche breakdown.",
    learningObjectives: [
      "Differentiate between depletion capacitance (dominant in reverse bias) and diffusion capacitance (dominant in forward bias).",
      "Understand minority carrier storage time and reverse recovery current spikes during high-speed switching.",
      "Distinguish the physical mechanisms and temperature coefficients of Avalanche Multiplication vs Zener Quantum Tunneling."
    ],
    keyFormulas: [
      {
        label: "Depletion Capacitance (Cj)",
        formula: "Cj = (ε_si · A) / W = Cj0 / √[ 1 - (V_applied / Vbi) ]",
        desc: "Capacitance arising from voltage-induced dipole charge modulation across the space-charge width W."
      },
      {
        label: "Diffusion Capacitance (Cd)",
        formula: "Cd = (τ_T · I_forward) / (η · Vt)",
        desc: "Capacitance due to stored excess minority carrier charge in quasi-neutral regions under forward conduction."
      },
      {
        label: "Reverse Recovery Time",
        formula: "trr = ts + tt",
        desc: "Total time required to sweep out stored minority charge before the diode can block reverse voltage."
      }
    ],
    sections: [
      {
        title: "1. Depletion vs Diffusion Capacitance",
        content: [
          "A PN junction exhibits two distinct capacitive mechanisms depending on bias state.",
          "Depletion Capacitance (Cj): In reverse bias, changing voltage alters the depletion width W, modulating fixed space-charge at the edges. Cj acts as a parallel-plate capacitor with plate separation W(V). Because W widens with reverse voltage, Cj decreases with reverse bias (forming a voltage-variable capacitor or varactor).",
          "Diffusion Capacitance (Cd): In forward bias, current conduction stores millions of excess minority carriers in the quasi-neutral regions. Changing voltage requires injecting or extracting this stored charge, yielding a diffusion capacitance proportional to forward current: Cd = (τ·If)/Vt."
        ]
      },
      {
        title: "2. Reverse Breakdown: Avalanche vs Zener",
        content: [
          "Under extreme reverse bias, diodes enter breakdown, conducting large reverse currents without damage if heat dissipation is controlled.",
          "Zener Breakdown: Occurs in heavily doped junctions (breakdown voltage < 5V) where the depletion region is so thin (< 10nm) that valence electrons quantum tunnel directly across the forbidden bandgap into the conduction band. Zener breakdown exhibits a negative temperature coefficient.",
          "Avalanche Breakdown: Occurs in lightly doped junctions (breakdown voltage > 7V) with wide depletion regions. High electric fields (> 300 kV/cm) accelerate carriers to kinetic energies sufficient to knock valence electrons into the conduction band via impact ionization, creating a self-multiplying carrier cascade. Avalanche exhibits a positive temperature coefficient."
        ],
        callout: {
          type: "design",
          title: "Power Switching Bottleneck",
          text: "When a silicon power diode switches from forward conduction to reverse blocking, stored minority charge creates a massive reverse recovery current spike (Irr), causing major switching energy loss. SiC Schottky diodes eliminate this completely because they are majority carrier devices!"
        }
      }
    ],
    checkpoint: {
      question: "Which breakdown mechanism dominates in silicon PN junctions with breakdown voltages greater than 7V, and what is its temperature coefficient?",
      options: [
        "Zener quantum tunneling with a negative temperature coefficient",
        "Avalanche multiplication with a positive temperature coefficient",
        "Thermal runaway with zero temperature coefficient",
        "Dielectric breakdown with infinite temperature coefficient"
      ],
      correctIndex: 1,
      explanation: "In lightly doped junctions with Vbr > 7V, impact ionization avalanche multiplication dominates. Its breakdown voltage increases with temperature (positive temperature coefficient) because increased lattice phonon scattering slows down carrier acceleration."
    },
    keyTakeaways: [
      "Depletion capacitance dominates in reverse bias (varactor action); diffusion capacitance dominates in forward bias.",
      "Reverse recovery time trr is set by stored minority carrier recombination time.",
      "Zener breakdown is quantum tunneling (<5V); Avalanche breakdown is impact ionization (>7V)."
    ],
    practicalApplications: [
      "Fast-recovery diodes (FRD) in switch-mode power supplies",
      "On-chip ESD protection clamps protecting I/O pins",
      "Voltage reference Zener diodes in power management ICs"
    ],
    relatedResearchTopicId: "junction-capacitances-reverse-recovery-switching",
    relatedLabId: "diode-iv-characteristics",
    prevLessonId: "shockley-diode-equation",
    nextLessonId: "schottky-barrier-diodes"
  },
  "schottky-barrier-diodes": {
    id: "schottky-barrier-diodes",
    courseId: "pn-junction-diodes",
    title: "Schottky Barrier Metal-Semiconductor Diodes",
    duration: "55 min",
    difficulty: "Intermediate",
    tag: "HETEROSTRUCTURES",
    summary: "Analyze metal-semiconductor junctions, Schottky barrier height ΦBn, thermionic emission conduction, Ohmic contacts, and zero reverse-recovery majority carrier switching.",
    learningObjectives: [
      "Calculate the Schottky barrier height ΦBn using the Schottky-Mott rule and analyze Fermi-level pinning.",
      "Understand thermionic emission current transport compared to PN diffusion current.",
      "Explain why majority-carrier Schottky diodes have virtually zero reverse recovery time (trr ≈ 0)."
    ],
    keyFormulas: [
      {
        label: "Schottky Barrier Height (Ideal)",
        formula: "ΦBn = Φm - χ_si",
        desc: "Ideal barrier established by difference between metal workfunction Φm and semiconductor electron affinity χ."
      },
      {
        label: "Thermionic Emission Current",
        formula: "I = A* · T² · A_area · exp[-q·ΦBn / (k·T)] · [ exp(q·Va / (k·T)) - 1 ]",
        desc: "Current governed by energetic majority carriers traversing over the potential barrier into the metal."
      },
      {
        label: "Richardson Constant",
        formula: "A* = (4 · π · q · m* · k²) / h³",
        desc: "Material-dependent thermionic emission coefficient (≈ 112 A/cm²·K² for n-type silicon)."
      }
    ],
    sections: [
      {
        title: "1. Schottky Barrier vs Ohmic Contact Physics",
        content: [
          "When a metal contacts an n-type semiconductor where metal workfunction Φm exceeds electron affinity χ_si, electrons transfer to the metal, creating a depletion region and an energy barrier ΦBn to electron flow.",
          "In forward bias, majority electrons in the semiconductor conduction band thermally overcome the barrier via thermionic emission, conducting current at a lower turn-on voltage (0.2V - 0.4V) than silicon PN diodes (0.7V).",
          "If the semiconductor is degenerately doped (Nd > 10¹⁹ cm⁻³), the depletion width shrinks below 2nm, allowing electrons to quantum tunnel directly through the barrier. This creates an Ohmic Contact with linear, bi-directional current flow and low contact resistance."
        ]
      },
      {
        title: "2. The Majority Carrier Advantage: Zero Reverse Recovery",
        content: [
          "In a standard PN diode, current relies on minority carrier injection into neutral regions, storing charge that must recombine during turn-off.",
          "In a Schottky diode, current is conducted entirely by majority carriers (electrons) that enter the metal as energetic 'hot electrons' and thermalize in femtoseconds.",
          "Because there is zero minority carrier storage charge, Schottky diodes have near-zero reverse recovery time (trr ≈ 0), eliminating switching spikes in high-frequency converters."
        ],
        callout: {
          type: "design",
          title: "Silicon Carbide (SiC) Revolution",
          text: "High-voltage silicon Schottky diodes are limited to < 200V due to high reverse leakage. Silicon Carbide (SiC) Schottky diodes handle up to 1200V with zero reverse recovery, powering modern EV traction inverters!"
        }
      }
    ],
    checkpoint: {
      question: "Why do Schottky barrier diodes have virtually zero reverse recovery charge (Qrr ≈ 0) compared to PN junction diodes?",
      options: [
        "Because they operate at absolute zero temperature",
        "Because conduction is mediated by majority carriers without minority carrier storage",
        "Because metal has infinite electrical resistance",
        "Because the barrier height is negative"
      ],
      correctIndex: 1,
      explanation: "Schottky diodes conduct via majority carriers through thermionic emission. Without minority carriers injected into quasi-neutral regions, there is no stored charge to evacuate during reverse turn-off."
    },
    keyTakeaways: [
      "Schottky diodes offer lower forward drop (0.2V - 0.4V) and ultra-fast switching with trr ≈ 0.",
      "Heavily doped metal-semiconductor contacts enable quantum tunneling to form Ohmic contacts.",
      "Silicon Carbide (SiC) Schottky diodes extend zero-reverse-recovery benefits into high-voltage EV applications."
    ],
    practicalApplications: [
      "High-efficiency switch-mode power supply (SMPS) freewheeling rectifiers",
      "Low-voltage drop reverse battery protection circuits",
      "Source/drain silicide Ohmic contacts (TiSi2, NiSi) in CMOS transistors"
    ],
    relatedResearchTopicId: "avalanche-vs-zener-breakdown-mechanisms",
    relatedLabId: "diode-iv-characteristics",
    prevLessonId: "junction-capacitance-breakdown",
    nextLessonId: "bjt-physics-operation"
  }
};
