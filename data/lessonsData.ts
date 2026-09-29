export interface LessonFormula {
  label: string;
  formula: string;
  desc: string;
}

export interface LessonSection {
  title: string;
  content: string[];
  callout?: {
    type: "info" | "physics" | "design" | "warning";
    title: string;
    text: string;
  };
  diagram?: {
    type: "energy-band" | "cross-section" | "iv-curve" | "schematic";
    caption: string;
  };
}

export interface LessonTryItYourself {
  title: string;
  description: string;
  params: {
    id: string;
    name: string;
    min: number;
    max: number;
    step: number;
    defaultVal: number;
    unit: string;
  }[];
  computeOutput: (values: Record<string, number>) => { label: string; value: string; note?: string }[];
}

export interface FullLessonData {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tag: string;
  summary: string;
  learningObjectives: string[];
  keyFormulas: LessonFormula[];
  sections: LessonSection[];
  tryItYourself?: LessonTryItYourself;
  checkpoint: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  keyTakeaways: string[];
  prevLessonId?: string;
  nextLessonId?: string;
}

export const LESSONS_DATABASE: Record<string, FullLessonData> = {
  "bohr-atomic-model": {
    id: "bohr-atomic-model",
    courseId: "semiconductor-fundamentals",
    title: "Bohr Atomic Model & Energy Quantization",
    duration: "45 min",
    difficulty: "Beginner",
    tag: "QUANTUM PHYSICS",
    summary: "Understand how electrons exist in discrete quantized orbital shells and why isolated atomic levels split into continuous energy bands in crystal lattices.",
    learningObjectives: [
      "Derive the quantized angular momentum condition postulated by Niels Bohr.",
      "Calculate photon wavelength (λ) emitted during electron transition between energy levels.",
      "Explain why Pauli's Exclusion Principle splits atomic orbitals into semiconductor valence and conduction bands."
    ],
    keyFormulas: [
      {
        label: "Quantized Angular Momentum",
        formula: "L = n · ℏ = n · (h / 2π)",
        desc: "Bohr's quantization postulate restricting electron orbits to integer multiples of reduced Planck's constant (n = 1, 2, 3...)."
      },
      {
        label: "Hydrogen-like Energy Levels",
        formula: "En = -13.6 eV · (Z² / n²)",
        desc: "Total energy of an electron in principal quantum number n around a nucleus with atomic charge Z."
      },
      {
        label: "Photon Energy & Wavelength",
        formula: "ΔE = E2 - E1 = h · ν = (h · c) / λ",
        desc: "Planck-Einstein relation for electromagnetic radiation during inter-orbital electron relaxation."
      }
    ],
    sections: [
      {
        title: "1. Classical Breakdown and the Bohr Postulates",
        content: [
          "Under classical electrodynamics, an accelerating charge continuously radiates electromagnetic energy. An orbiting electron would therefore lose kinetic energy within picoseconds and spiral catastrophically into the nucleus.",
          "In 1913, Niels Bohr resolved this fundamental paradox by postulating stable stationary orbits where electrons do not radiate energy unless they transition between distinct discrete energy states.",
          "By equating the centripetal acceleration to Coulomb electrostatic attraction (m·v²/r = q² / (4πε0·r²)) and applying angular momentum quantization (m·v·r = n·ℏ), discrete orbital radii and energy levels emerge."
        ],
        callout: {
          type: "physics",
          title: "Physical Intuition",
          text: "Energy quantization is why semiconductors have a well-defined bandgap (Eg) instead of allowing arbitrary continuous electron energy transitions."
        }
      },
      {
        title: "2. Atomic Structure of Silicon (Group IV)",
        content: [
          "Silicon (Si, atomic number Z = 14) has an electron configuration of 1s² 2s² 2p⁶ 3s² 3p².",
          "The inner 10 electrons form a tightly bound Neon noble gas core: 1s² 2s² 2p⁶.",
          "The outermost shell contains 4 valence electrons (two in 3s and two in 3p). When silicon atoms assemble into a crystal lattice, these 4 valence electrons hybridize into sp³ orbitals to form covalent bonds with four neighboring silicon atoms."
        ]
      },
      {
        title: "3. Orbital Splitting and Energy Band Formation",
        content: [
          "In an isolated single silicon atom, the 3s and 3p orbitals are sharp discrete energy states.",
          "When N silicon atoms approach one another to form a solid crystal, Pauli's Exclusion Principle forbids any two electrons from occupying the identical quantum state.",
          "Consequently, each discrete atomic energy state splits into N closely spaced sub-states. With N ≈ 5.0 × 10²² atoms/cm³, these split states form the continuous Valence Band and Conduction Band, separated by the Forbidden Energy Bandgap (Eg = 1.12 eV at 300K)."
        ],
        callout: {
          type: "design",
          title: "Engineering Relevance",
          text: "At room temperature (300K), thermal energy (kT ≈ 25.9 meV) is small compared to 1.12 eV, meaning pure silicon is an insulator without intentional doping or excitation."
        }
      }
    ],
    checkpoint: {
      question: "How many valence electrons does an isolated neutral Silicon atom have in its outermost shell to participate in covalent bonding?",
      options: [
        "2 valence electrons",
        "4 valence electrons",
        "8 valence electrons",
        "14 valence electrons"
      ],
      correctIndex: 1,
      explanation: "Silicon (atomic number 14) has electron configuration 1s² 2s² 2p⁶ 3s² 3p². The outermost n=3 principal shell contains 2 (3s) + 2 (3p) = 4 valence electrons."
    },
    keyTakeaways: [
      "Electrons exist only in discrete, quantized stationary orbits with quantized angular momentum L = n·ℏ.",
      "Silicon has 4 outermost valence electrons in the 3s/3p subshells that form 4 covalent bonds in the crystal.",
      "Pauli's Exclusion Principle causes discrete atomic levels to split into continuous energy bands when atoms form solid crystals."
    ],
    nextLessonId: "silicon-crystal-lattice"
  },
  "silicon-crystal-lattice": {
    id: "silicon-crystal-lattice",
    courseId: "semiconductor-fundamentals",
    title: "Silicon Crystal Lattice & Diamond Cubic Structure",
    duration: "55 min",
    difficulty: "Beginner",
    tag: "CRYSTALLOGRAPHY",
    summary: "Explore the 3D diamond cubic lattice of silicon, sp³ tetrahedral hybridization, Miller indices (100), (110), (111), and wafer manufacturing planes.",
    learningObjectives: [
      "Calculate the unit cell volume and atomic density of diamond cubic silicon.",
      "Understand tetrahedral sp³ hybridization and covalent bond angles of 109.47°.",
      "Differentiate between crystallographic planes (100), (110), and (111) used in semiconductor wafer fabrication."
    ],
    keyFormulas: [
      {
        label: "Silicon Lattice Constant",
        formula: "a = 5.43 Å = 0.543 nm",
        desc: "Unit cell edge dimension for crystalline silicon at room temperature (300K)."
      },
      {
        label: "Atoms per Unit Cell",
        formula: "N_cell = 8 atoms / unit cell",
        desc: "8 corner atoms × (1/8) + 6 face atoms × (1/2) + 4 interior tetrahedral atoms = 8 atoms total."
      },
      {
        label: "Silicon Atomic Density",
        formula: "n_atom = 8 / a³ ≈ 5.0 × 10²² atoms/cm³",
        desc: "Fundamental atomic density of crystalline silicon used to calculate parts-per-million (ppm) dopant fractions."
      }
    ],
    sections: [
      {
        title: "1. Diamond Cubic Lattice Architecture",
        content: [
          "Silicon crystallizes in the diamond cubic lattice structure, which can be visualized as two interpenetrating Face-Centered Cubic (FCC) sublattices displaced along the body diagonal by (a/4, a/4, a/4).",
          "Each silicon atom forms 4 sp³ hybridized covalent bonds with its nearest neighbors, creating a tetrahedral bond angle of exactly 109.47°.",
          "This high tetrahedral bond strength gives crystalline silicon exceptional mechanical rigidity and thermal stability up to temperatures exceeding 1000°C during cleanroom furnace oxidation and annealing."
        ]
      },
      {
        title: "2. Miller Indices & Crystallographic Planes",
        content: [
          "Semiconductor manufacturing uses specifically oriented monocrystalline silicon wafers designated by Miller indices: (100), (110), and (111).",
          "(100) Wafers: Most widely used for standard planar CMOS logic because of lower surface state interface trap density (Dit) at the Si-SiO2 interface.",
          "(110) Wafers: Provides significantly higher hole mobility (approx. 2× higher than (100)), frequently leveraged in vertical FinFET sidewalls and PMOS transistor performance."
        ],
        callout: {
          type: "design",
          title: "Manufacturing Fact",
          text: "Silicon ingots grown via the Czochralski method are precisely notched or flat-ground along specific crystallographic axes so automated fab tools can align photolithography masks."
        }
      }
    ],
    checkpoint: {
      question: "What is the total number of full Silicon atoms contained inside one unit cell of diamond cubic silicon?",
      options: [
        "2 atoms",
        "4 atoms",
        "8 atoms",
        "16 atoms"
      ],
      correctIndex: 2,
      explanation: "Diamond cubic lattice has 8 corner atoms × (1/8) + 6 face-center atoms × (1/2) + 4 internal tetrahedral atoms = 1 + 3 + 4 = 8 full atoms per unit cell."
    },
    keyTakeaways: [
      "Silicon crystallizes into a diamond cubic structure with 8 atoms per unit cell and lattice constant a = 5.43 Å.",
      "Atomic volume density is approximately 5.0 × 10²² atoms/cm³.",
      "(100) and (110) crystallographic orientations govern surface trap density and carrier mobility in CMOS transistors."
    ],
    prevLessonId: "bohr-atomic-model",
    nextLessonId: "intrinsic-extrinsic-doping"
  },
  "intrinsic-extrinsic-doping": {
    id: "intrinsic-extrinsic-doping",
    courseId: "semiconductor-fundamentals",
    title: "Intrinsic vs Extrinsic Silicon & Dopants",
    duration: "50 min",
    difficulty: "Beginner",
    tag: "CARRIER PHYSICS",
    summary: "Examine intrinsic carrier concentration ni(T), thermal generation, donor (Phosphorus/Arsenic) and acceptor (Boron) doping, and the Mass Action Law.",
    learningObjectives: [
      "Calculate intrinsic carrier concentration ni as a function of temperature T.",
      "Calculate majority and minority carrier concentrations in n-type and p-type silicon.",
      "Apply the Mass Action Law (n0 · p0 = ni²) under thermal equilibrium conditions."
    ],
    keyFormulas: [
      {
        label: "Intrinsic Carrier Density",
        formula: "ni(300K) ≈ 1.0 × 10¹⁰ cm⁻³",
        desc: "Thermally generated electron and hole density in ultra-pure intrinsic silicon at room temperature."
      },
      {
        label: "Mass Action Law",
        formula: "n0 · p0 = ni²(T)",
        desc: "Fundamental relationship between thermal equilibrium electron density n0 and hole density p0."
      },
      {
        label: "Majority Carrier Approx (N-type)",
        formula: "n0 ≈ Nd  and  p0 ≈ ni² / Nd",
        desc: "When donor concentration Nd >> ni, electron concentration equals donor density and minority hole concentration drops."
      }
    ],
    sections: [
      {
        title: "1. Intrinsic Carrier Generation & Recombination",
        content: [
          "At absolute zero (0 K), all valence electrons are locked inside covalent bonds: the valence band is completely full and the conduction band is completely empty (conductivity = 0).",
          "At room temperature (300 K), thermal vibrations (phonons) spontaneously break a small fraction of covalent bonds, exciting electrons across the bandgap into the conduction band and leaving behind mobile holes.",
          "In thermal equilibrium, the thermal generation rate Gth exactly equals the recombination rate Rth, maintaining ni ≈ 1.0 × 10¹⁰ cm⁻³ at 300 K."
        ]
      },
      {
        title: "2. Extrinsic Doping: Group III and Group V Impurities",
        content: [
          "N-type Doping (Donors): Adding Group V elements (Phosphorus P, Arsenic As) replaces silicon atoms in the lattice. Four valence electrons form covalent bonds, while the 5th electron is weakly bound (ionization energy ~0.045 eV) and ionizes into the conduction band at room temperature (n0 ≈ Nd).",
          "P-type Doping (Acceptors): Adding Group III elements (Boron B) introduces only 3 valence electrons. An empty state (hole) is created in the valence band (p0 ≈ Na).",
          "By intentionally controlling dopant concentrations from 10¹⁴ to 10²⁰ cm⁻³, semiconductor electrical conductivity can be engineered across 8 orders of magnitude!"
        ],
        callout: {
          type: "physics",
          title: "Mass Action Law",
          text: "Adding donor electrons (Nd) drives up the recombination rate, reducing minority hole concentration p0 such that their product remains constant: n0 · p0 = ni²."
        }
      }
    ],
    checkpoint: {
      question: "If a silicon wafer is doped with Nd = 10¹⁶ cm⁻³ Phosphorus donor atoms at 300K, what is the minority hole concentration p0? (Take ni = 10¹⁰ cm⁻³)",
      options: [
        "10¹⁶ cm⁻³",
        "10¹⁰ cm⁻³",
        "10⁴ cm⁻³",
        "10²⁰ cm⁻³"
      ],
      correctIndex: 2,
      explanation: "Using the Mass Action Law: p0 = ni² / n0 = (10¹⁰)² / 10¹⁶ = 10²⁰ / 10¹⁶ = 10⁴ cm⁻³."
    },
    keyTakeaways: [
      "Intrinsic silicon has equal electron and hole densities ni ≈ 10¹⁰ cm⁻³ at 300K.",
      "Donor doping (Group V: P, As) creates n-type silicon with n0 ≈ Nd.",
      "Acceptor doping (Group III: B) creates p-type silicon with p0 ≈ Na.",
      "Mass Action Law states that in thermal equilibrium, n0 · p0 = ni²(T)."
    ],
    prevLessonId: "silicon-crystal-lattice",
    nextLessonId: "pn-electrostatics-vbi"
  },
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
    prevLessonId: "intrinsic-extrinsic-doping",
    nextLessonId: "mos-capacitor-inversion"
  },
  "mos-capacitor-inversion": {
    id: "mos-capacitor-inversion",
    courseId: "mosfet-devices",
    title: "MOS Capacitor Physics: Accumulation to Strong Inversion",
    duration: "65 min",
    difficulty: "Advanced",
    tag: "MOS PHYSICS",
    summary: "Analyze band bending, surface potential ψs, accumulation, depletion, weak inversion, and strong inversion under gate voltage bias.",
    learningObjectives: [
      "Identify the 3 operational regimes of a MOS capacitor: accumulation, depletion, and inversion.",
      "Derive the strong inversion condition: surface potential ψs = 2 · ψB.",
      "Explain the high-frequency and low-frequency C-V characteristics of a MOS stack."
    ],
    keyFormulas: [
      {
        label: "Oxide Capacitance per Area",
        formula: "Cox = ε_ox / tox",
        desc: "Dielectric capacitance per unit area where ε_ox = 3.9 · ε0 for SiO2 and ~25 · ε0 for HfO2."
      },
      {
        label: "Bulk Potential (ψB)",
        formula: "ψB = (kT / q) · ln(Na / ni)",
        desc: "Energy difference between intrinsic Fermi level Ei and Fermi level Ef in the p-type semiconductor substrate."
      },
      {
        label: "Strong Inversion Surface Potential",
        formula: "ψs = 2 · ψB",
        desc: "Threshold condition where surface electron concentration equals bulk majority hole concentration."
      }
    ],
    sections: [
      {
        title: "1. The 3 Regimes of MOS Electrostatics",
        content: [
          "Accumulation (Vg < 0 for p-substrate): Negative gate voltage attracts majority holes directly to the Si-dielectric interface, causing total capacitance to equal Cox.",
          "Depletion (0 < Vg < Vth): Positive gate voltage repels majority holes away from the interface, uncovering fixed negative acceptor ions (Na⁻). The gate capacitance is the series combination of Cox and depletion capacitance Cdep.",
          "Inversion (Vg ≥ Vth): When gate voltage exceeds threshold, band bending pulls the conduction band down near the Fermi level (ψs ≥ 2ψB), forming a conducting 2D sheet of minority electrons (the inversion channel)."
        ]
      },
      {
        title: "2. C-V Characteristic Curves & Frequency Response",
        content: [
          "At low frequencies (< 100 Hz), thermal generation-recombination can supply minority electrons fast enough to follow the AC signal, so capacitance returns to Cox in inversion.",
          "At high frequencies (> 1 MHz, typical in CMOS digital switching), minority carriers cannot respond to rapid AC probe signals, so total capacitance remains pinned at the minimum depletion capacitance value Cmin."
        ],
        callout: {
          type: "design",
          title: "MOSFET Transistor Action",
          text: "In a 4-terminal MOSFET, the heavily doped n+ source and drain supply minority electrons in picoseconds, allowing the inversion channel to conduct at gigahertz clock speeds."
        }
      }
    ],
    checkpoint: {
      question: "In an NMOS capacitor (p-type substrate), what condition defines the onset of strong inversion?",
      options: [
        "Surface potential ψs = 0",
        "Surface potential ψs = ψB",
        "Surface potential ψs = 2 · ψB",
        "Surface potential ψs = -ψB"
      ],
      correctIndex: 2,
      explanation: "Strong inversion occurs when the surface potential ψs reaches twice the bulk Fermi potential (2·ψB), making the electron concentration at the surface equal to the bulk hole concentration."
    },
    keyTakeaways: [
      "A MOS capacitor operates across accumulation, depletion, and inversion regimes under applied gate voltage.",
      "Strong inversion occurs at ψs = 2ψB, creating the conducting channel of a MOSFET.",
      "Oxide thickness scaling tox requires high-k dielectrics (HfO2) to prevent quantum mechanical tunneling leakage."
    ],
    prevLessonId: "pn-electrostatics-vbi",
    nextLessonId: "gaafet-nanosheet-physics"
  },
  "gaafet-nanosheet-physics": {
    id: "gaafet-nanosheet-physics",
    courseId: "advanced-devices",
    title: "GAAFET Stacked Nanosheets: Physics & Electrostatics",
    duration: "70 min",
    difficulty: "Advanced",
    tag: "NANOELECTRONICS",
    summary: "Examine 4-sided Gate-All-Around (GAAFET) horizontal nanosheets, sub-2nm node physics, subthreshold swing near 60 mV/dec, and inner spacer parasitic reduction.",
    learningObjectives: [
      "Compare gate electrostatic channel control in Planar, FinFET (3-sided), and GAAFET (4-sided).",
      "Analyze the subthreshold swing SS equation and calculate the theoretical limit of 60 mV/dec at 300K.",
      "Understand the fabrication process of selective SiGe/Si superlattice release and inner spacer formation."
    ],
    keyFormulas: [
      {
        label: "Subthreshold Swing (SS)",
        formula: "SS = ln(10) · (kT / q) · [ 1 + (Cdep / Cox) ]",
        desc: "Gate voltage required to increase subthreshold drain current by one decade (10×). Ideal limit at 300K is 59.6 mV/dec when Cox >> Cdep."
      },
      {
        label: "Natural Electrostatic Length (λ)",
        formula: "λ_GAA ≈ √[ (ε_si / 4·ε_ox) · tox · Tns ]",
        desc: "Characteristic scale length for drain-induced barrier lowering (DIBL) suppression in 4-sided gate surround."
      }
    ],
    sections: [
      {
        title: "1. Evolution from FinFET to Gate-All-Around (GAAFET)",
        content: [
          "As transistor gate lengths scaled below 10nm, 3D FinFETs began suffering from subthreshold leakage because the bottom of the fin lacked gate control.",
          "GAAFET solves this by suspending 3 to 4 monocrystalline silicon nanosheets horizontally and wrapping the High-k Metal Gate (HKMG) around all 4 sides (100% perimeter wrap).",
          "This 4-sided electrostatic gate control eliminates drain punch-through leakage, lowers the subthreshold swing to ~63 mV/dec (near the theoretical 60 mV/dec limit), and allows supply voltage (VDD) to scale to 0.65V."
        ]
      },
      {
        title: "2. Nanosheet Width Tunability vs Fin Quantization",
        content: [
          "In FinFETs, drive current is discrete (quantized) because designers can only add integer numbers of fins (1 fin, 2 fins, etc.).",
          "In GAAFET nanosheets, the width (Wns) of the horizontal sheet can be continuously customized in layout from 15nm to 60nm, allowing circuit designers to optimize speed versus power per logic gate."
        ],
        callout: {
          type: "design",
          title: "Industry Milestone",
          text: "GAAFET architectures (known as MBCFET at Samsung and RibbonFET at Intel) represent the foundation of 3nm, 2nm, and Angstrom-era (A16/A14) semiconductor nodes."
        }
      }
    ],
    checkpoint: {
      question: "What is the theoretical thermodynamic lower limit for MOSFET subthreshold swing (SS) at room temperature (300K)?",
      options: [
        "10 mV/decade",
        "30 mV/decade",
        "60 mV/decade",
        "100 mV/decade"
      ],
      correctIndex: 2,
      explanation: "Due to Boltzmann carrier thermal distribution statistics, SS = ln(10)·(kT/q) ≈ 2.303 × 25.86 mV ≈ 59.6 mV/decade at 300K."
    },
    keyTakeaways: [
      "GAAFET wraps the gate electrode around all 4 sides of stacked silicon nanosheets.",
      "4-sided gate control suppresses short-channel effects and achieves near-ideal subthreshold slope.",
      "Continuously tunable nanosheet width eliminates FinFET fin quantization."
    ],
    prevLessonId: "mos-capacitor-inversion"
  }
};
