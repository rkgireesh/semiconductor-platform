export interface LessonData {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tag: string;
  summary: string;
  keyFormulas?: { label: string; formula: string; desc: string }[];
  sections: {
    title: string;
    content: string[];
    callout?: string;
  }[];
  checkpoint: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  simulationNotes?: string;
}

export interface ModuleData {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  diffVariant: "teal" | "sky" | "amber";
  duration: string;
  lessonCount: number;
  progressPct: number;
  description: string;
  overview: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  topics: string[];
  lessons: {
    id: string;
    title: string;
    duration: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    topics: string[];
    isCompleted?: boolean;
  }[];
}

export interface CourseData {
  id: string;
  title: string;
  code: string;
  level: string;
  duration: string;
  description: string;
  instructor: string;
  modules: string[]; // module IDs
  prerequisites: string[];
  skillsGained: string[];
}

export interface DeviceData {
  id: string;
  name: string;
  generation: string;
  nodeEra: string;
  category: string;
  desc: string;
  keyFeatures: string[];
  advantages: string[];
  limitations: string[];
  layers: { name: string; material: string; role: string; color: string }[];
  physicsSpecs: { label: string; value: string }[];
}

export const MODULES_DATA: Record<string, ModuleData> = {
  "01": {
    id: "01",
    num: "01",
    title: "Electrical & Atomic Fundamentals",
    subtitle: "Solid-State Physics & Crystal Structures",
    difficulty: "Beginner",
    diffVariant: "teal",
    duration: "4.5 Hours",
    lessonCount: 3,
    progressPct: 0,
    description: "Bohr atomic model, energy quantization, crystal lattice structures, silicon bonding, and free charge dynamics.",
    overview: [
      "Master how discrete atomic electron shells yield continuous energy bands in crystalline solids.",
      "Understand the diamond cubic crystal structure of silicon and why covalent bonding dictates conductivity.",
      "Calculate effective mass and understand how electron-wave interactions in periodic potentials form the basis of all microelectronics."
    ],
    learningOutcomes: [
      "Derive the relationship between atomic energy levels and conduction/valence energy band formation.",
      "Calculate atomic density and lattice constants for face-centered diamond cubic silicon (a = 5.43 Å).",
      "Explain effective mass (m*) and how periodic crystal potentials alter electron mobility under electric fields."
    ],
    prerequisites: ["Introductory Physics (Electromagnetism)", "Basic Chemistry (Atomic Structure)"],
    topics: ["Bohr Model", "Crystalline Silicon", "Valence & Conduction Bands", "Effective Mass"],
    lessons: [
      {
        id: "bohr-atomic-model",
        title: "Bohr Atomic Model & Energy Quantization",
        duration: "45 min",
        difficulty: "Beginner",
        topics: ["Quantized Energy Levels", "Orbital Transitions", "Photon Emission"]
      },
      {
        id: "silicon-crystal-lattice",
        title: "Silicon Crystal Lattice & Diamond Cubic Structure",
        duration: "55 min",
        difficulty: "Beginner",
        topics: ["Diamond Cubic Lattice", "Lattice Constant (5.43 Å)", "Miller Indices & Planes"]
      },
      {
        id: "energy-bands-effective-mass",
        title: "Energy Bands & Effective Mass (m*)",
        duration: "60 min",
        difficulty: "Intermediate",
        topics: ["E-k Dispersion", "Direct vs Indirect Bandgap", "Effective Mass Concept"]
      }
    ]
  },
  "02": {
    id: "02",
    num: "02",
    title: "Semiconductor Fundamentals",
    subtitle: "Doping, Fermi Levels & Carrier Transport",
    difficulty: "Beginner",
    diffVariant: "teal",
    duration: "6.0 Hours",
    lessonCount: 3,
    progressPct: 0,
    description: "Intrinsic & extrinsic semiconductors, n-type/p-type doping, carrier concentration (ni), Fermi-Dirac distribution, and drift vs diffusion.",
    overview: [
      "Understand thermal generation of electron-hole pairs and how intrinsic carrier concentration (ni) scales with temperature.",
      "Explore donor (Group V) and acceptor (Group III) impurity doping and calculation of majority/minority carrier densities.",
      "Master the Fermi-Dirac probability distribution function and calculate the precise location of the Fermi energy level (Ef)."
    ],
    learningOutcomes: [
      "Compute carrier densities n0 and p0 using effective density of states (Nc, Nv) and Fermi level position.",
      "Apply the Mass Action Law (n0 · p0 = ni^2) under thermal equilibrium conditions.",
      "Formulate total current equations combining electric field drift and concentration gradient diffusion (Einstein Relation)."
    ],
    prerequisites: ["Module 01: Electrical & Atomic Fundamentals"],
    topics: ["Doping (B / P)", "Fermi Level (Ef)", "Mass Action Law", "Drift & Diffusion"],
    lessons: [
      {
        id: "intrinsic-extrinsic-doping",
        title: "Intrinsic vs Extrinsic Silicon & Dopants",
        duration: "50 min",
        difficulty: "Beginner",
        topics: ["Intrinsic ni(T)", "Group III/V Doping", "Mass Action Law"]
      },
      {
        id: "fermi-dirac-statistics",
        title: "Fermi-Dirac Distribution & Fermi Level (Ef)",
        duration: "65 min",
        difficulty: "Intermediate",
        topics: ["Fermi-Dirac Function f(E)", "Degenerate vs Non-degenerate", "Ef shift with Doping"]
      },
      {
        id: "carrier-transport-drift-diffusion",
        title: "Carrier Transport: Drift & Diffusion Currents",
        duration: "60 min",
        difficulty: "Intermediate",
        topics: ["Electric Field Drift (μ)", "Concentration Diffusion (Dn, Dp)", "Einstein Relation"]
      }
    ]
  },
  "03": {
    id: "03",
    num: "03",
    title: "PN Junction & Diodes",
    subtitle: "Electrostatics, Biasing & Diode Dynamics",
    difficulty: "Intermediate",
    diffVariant: "sky",
    duration: "7.5 Hours",
    lessonCount: 3,
    progressPct: 0,
    description: "Built-in potential (Vbi), depletion region dynamics, forward/reverse bias IV characteristics, capacitance, and breakdown mechanisms.",
    overview: [
      "Analyze thermal equilibrium electrostatics when p-type and n-type silicon are metallurgically joined.",
      "Solve Poisson's equation to obtain the electric field distribution, depletion width (W), and built-in potential (Vbi).",
      "Derive the Ideal Diode Equation (Shockley equation) under forward bias diffusion and reverse bias leakage."
    ],
    learningOutcomes: [
      "Calculate built-in barrier potential Vbi = (kT/q) ln(Na·Nd / ni^2).",
      "Model depletion capacitance (Cj) vs reverse bias voltage and diffusion capacitance (Cd) under forward bias.",
      "Differentiate between Zener breakdown (quantum tunneling) and Avalanche breakdown (impact ionization)."
    ],
    prerequisites: ["Module 02: Semiconductor Fundamentals"],
    topics: ["Space-Charge Region", "Shockley Equation", "Depletion Capacitance", "Zener Breakdown"],
    lessons: [
      {
        id: "pn-electrostatics-vbi",
        title: "PN Junction Electrostatics & Built-in Potential (Vbi)",
        duration: "55 min",
        difficulty: "Intermediate",
        topics: ["Space-Charge Profile", "Electric Field Integral", "Depletion Width W(V)"]
      },
      {
        id: "shockley-diode-equation",
        title: "Forward & Reverse Bias: The Shockley Equation",
        duration: "60 min",
        difficulty: "Intermediate",
        topics: ["Minority Carrier Profiles", "Ideal Diode Equation", "Reverse Saturation Current I0"]
      },
      {
        id: "junction-capacitance-breakdown",
        title: "Junction Capacitance & Breakdown Phenomena",
        duration: "50 min",
        difficulty: "Intermediate",
        topics: ["Depletion vs Diffusion Capacitance", "Avalanche Multiplication", "Zener Tunneling"]
      }
    ]
  },
  "04": {
    id: "04",
    num: "04",
    title: "BJT (Bipolar Junction Transistor)",
    subtitle: "Minority Carrier Injection & Amplification",
    difficulty: "Intermediate",
    diffVariant: "sky",
    duration: "8.0 Hours",
    lessonCount: 3,
    progressPct: 0,
    description: "NPN/PNP physics, minority carrier injection, base transport factor, Ebers-Moll equations, and small-signal amplification modes.",
    overview: [
      "Explore double-junction electrostatics in NPN and PNP configurations and the physics of the thin neutral base.",
      "Master base transport factor (αT), emitter injection efficiency (γ), and common-emitter current gain (β).",
      "Analyze base-width modulation (Early effect) and construct small-signal hybrid-pi models for AC circuit simulation."
    ],
    learningOutcomes: [
      "Formulate terminal currents IE, IB, and IC using minority carrier gradient equations in the base.",
      "Analyze the 4 modes of operation: Forward Active, Saturation, Cutoff, and Reverse Active.",
      "Calculate small-signal transconductance gm = Ic / Vt and input resistance r_pi = beta / gm."
    ],
    prerequisites: ["Module 03: PN Junction & Diodes"],
    topics: ["Base Narrowing", "Early Effect", "Ebers-Moll Model", "Small-Signal Hybrid-Pi"],
    lessons: [
      {
        id: "bjt-physics-operation",
        title: "BJT Physics & Carrier Injection Dynamics",
        duration: "60 min",
        difficulty: "Intermediate",
        topics: ["NPN/PNP Structure", "Base Minority Carrier Gradient", "Gain Parameters (α, β)"]
      },
      {
        id: "ebers-moll-early-effect",
        title: "Ebers-Moll Model & Early Voltage (VA)",
        duration: "55 min",
        difficulty: "Intermediate",
        topics: ["Ebers-Moll Equations", "Base-Width Modulation", "Output Resistance ro"]
      },
      {
        id: "bjt-small-signal-modeling",
        title: "Small-Signal Hybrid-Pi Modeling & Biasing",
        duration: "65 min",
        difficulty: "Advanced",
        topics: ["Transconductance gm", "Hybrid-Pi Equivalent Circuit", "Cutoff Frequency fT"]
      }
    ]
  },
  "05": {
    id: "05",
    num: "05",
    title: "MOSFET (Metal-Oxide-Semiconductor)",
    subtitle: "Field Effect, Inversion & Nano-Scale Scaling",
    difficulty: "Advanced",
    diffVariant: "amber",
    duration: "9.5 Hours",
    lessonCount: 3,
    progressPct: 0,
    description: "MOS capacitor states (accumulation, depletion, inversion), threshold voltage (Vth), square-law IV equations, subthreshold slope, and short-channel effects.",
    overview: [
      "Understand the MOS capacitor physics across accumulation, depletion, weak inversion, and strong inversion.",
      "Derive the long-channel gradual channel approximation (GCA) and drain current equations in linear and saturation regimes.",
      "Examine modern nano-scale physics: Drain-Induced Barrier Lowering (DIBL), velocity saturation, and FinFET / GAAFET architectures."
    ],
    learningOutcomes: [
      "Calculate threshold voltage Vth including work-function difference, oxide capacitance Cox, and body effect.",
      "Plot family of ID-VDS and ID-VGS curves identifying pinch-off points and saturation current.",
      "Analyze subthreshold swing SS (ideal 60 mV/dec at 300K) and leakage mitigation in sub-5nm multi-gate nodes."
    ],
    prerequisites: ["Module 02: Semiconductor Fundamentals", "Module 03: PN Junction & Diodes"],
    topics: ["Strong Inversion", "Vth & Pinch-off", "Velocity Saturation", "Subthreshold Slope", "FinFET / GAAFET"],
    lessons: [
      {
        id: "mos-capacitor-inversion",
        title: "MOS Capacitor Physics: Accumulation to Strong Inversion",
        duration: "65 min",
        difficulty: "Intermediate",
        topics: ["Band Bending at Si-SiO2", "Surface Potential ψs", "High-Frequency C-V Curves"]
      },
      {
        id: "mosfet-iv-characteristics",
        title: "Threshold Voltage (Vth) & Long-Channel IV Equations",
        duration: "70 min",
        difficulty: "Advanced",
        topics: ["Gradual Channel Approx", "Linear & Saturation Equations", "Body Effect (γ)"]
      },
      {
        id: "short-channel-effects-nanoscale",
        title: "Short-Channel Effects (SCE) & Modern 3D Architectures",
        duration: "75 min",
        difficulty: "Advanced",
        topics: ["DIBL & Velocity Saturation", "Subthreshold Swing (SS)", "FinFET & GAAFET Nanosheets"]
      }
    ]
  }
};

export const LESSONS_DATA: Record<string, LessonData> = {
  "bohr-atomic-model": {
    id: "bohr-atomic-model",
    moduleId: "01",
    title: "Bohr Atomic Model & Energy Quantization",
    duration: "45 min",
    difficulty: "Beginner",
    tag: "QUANTUM FOUNDATIONS",
    summary: "Understand how electrons exist in discrete quantized orbital shells and why isolated atomic levels evolve into energy bands in semiconductors.",
    keyFormulas: [
      {
        label: "Quantized Angular Momentum",
        formula: "L = n · ℏ = n · (h / 2π)",
        desc: "Bohr's quantization postulate restricting electron orbits to integer multiples of reduced Planck's constant."
      },
      {
        label: "Hydrogen-like Energy Levels",
        formula: "En = -13.6 eV · (Z² / n²)",
        desc: "Energy of an electron in principal quantum number n for a nucleus of charge Z."
      },
      {
        label: "Photon Emission / Absorption",
        formula: "ΔE = E2 - E1 = h · ν = (h · c) / λ",
        desc: "Planck-Einstein relation for energy emitted during inter-orbital electron transition."
      }
    ],
    sections: [
      {
        title: "1. The Need for Quantized Atomic Models",
        content: [
          "Classical electromagnetic theory predicted that an orbiting electron would constantly radiate energy due to centripetal acceleration, causing it to spiral into the nucleus within picoseconds.",
          "In 1913, Niels Bohr resolved this paradox by postulating stable stationary orbits where electrons do not radiate energy unless they transition between distinct discrete energy states.",
          "This quantization of angular momentum and energy forms the fundamental baseline for all semiconductor band structure calculations."
        ],
        callout: "Key Insight: The discrete nature of atomic orbitals explains why semiconductor valence electrons occupy specific energy levels instead of a continuous spectrum."
      },
      {
        title: "2. Atomic Structure of Group IV Semiconductors",
        content: [
          "Silicon (Si, atomic number Z = 14) has an electron configuration of 1s² 2s² 2p⁶ 3s² 3p².",
          "The inner 10 electrons form a tightly bound core: 1s² 2s² 2p⁶ (Neon core).",
          "The outermost shell contains 4 valence electrons in the 3s and 3p subshells. These 4 valence electrons participate directly in covalent bonding with neighboring atoms in the crystal."
        ]
      },
      {
        title: "3. From Single Atoms to Periodic Crystal Lattices",
        content: [
          "When millions of silicon atoms are brought together to form a solid crystal, Pauli's Exclusion Principle dictates that no two electrons can occupy the identical quantum state.",
          "Consequently, the discrete atomic 3s and 3p levels split into billions of closely spaced energy levels, forming the continuous Valence Band and Conduction Band separated by the Forbidden Energy Bandgap (Eg = 1.12 eV at 300K)."
        ]
      }
    ],
    checkpoint: {
      question: "How many valence electrons does an isolated neutral Silicon (Si) atom have in its outermost shell?",
      options: [
        "2 valence electrons",
        "4 valence electrons",
        "8 valence electrons",
        "14 valence electrons"
      ],
      correctIndex: 1,
      explanation: "Silicon (atomic number 14) has electron configuration 1s² 2s² 2p⁶ 3s² 3p². The outermost n=3 shell has 2 + 2 = 4 valence electrons."
    },
    simulationNotes: "Bohr orbital radius for ground state n=1: a0 = 0.529 Å. In silicon crystal, covalent bond length is 2.35 Å."
  },
  "silicon-crystal-lattice": {
    id: "silicon-crystal-lattice",
    moduleId: "01",
    title: "Silicon Crystal Lattice & Diamond Cubic Structure",
    duration: "55 min",
    difficulty: "Beginner",
    tag: "CRYSTALLOGRAPHY",
    summary: "Explore the 3D diamond cubic lattice of silicon, sp³ hybridization, Miller indices (100), (110), (111), and atomic surface density.",
    keyFormulas: [
      {
        label: "Silicon Lattice Constant",
        formula: "a = 5.43 Å = 0.543 nm",
        desc: "Unit cell edge dimension for crystalline silicon at room temperature (300K)."
      },
      {
        label: "Atoms Per Unit Cell",
        formula: "N_cell = 8 atoms / unit cell",
        desc: "8 corner atoms × (1/8) + 6 face atoms × (1/2) + 4 internal tetrahedral atoms = 8 atoms."
      },
      {
        label: "Atomic Volume Density",
        formula: "n_atom = 8 / a³ ≈ 5.0 × 10²² atoms/cm³",
        desc: "Fundamental atomic density of crystalline silicon used to calculate doping ppm fractions."
      }
    ],
    sections: [
      {
        title: "1. Diamond Cubic Lattice Architecture",
        content: [
          "Silicon crystallizes in the diamond cubic lattice structure, which can be visualized as two interpenetrating Face-Centered Cubic (FCC) sublattices displaced along the body diagonal by (a/4, a/4, a/4).",
          "Each silicon atom forms 4 sp³ hybridized covalent bonds with its nearest neighbors, creating a tetrahedral bond angle of exactly 109.47°.",
          "This high tetrahedral bond strength gives crystalline silicon excellent mechanical rigidity and thermal stability up to temperatures exceeding 1000°C during fab processing."
        ],
        callout: "Crystal Geometry: 1 unit cell of silicon has 8 full atoms inside its volume of (5.43 × 10⁻⁸ cm)³."
      },
      {
        title: "2. Miller Indices & Wafer Crystallographic Planes",
        content: [
          "Semiconductor manufacturing uses specifically oriented silicon wafers designated by Miller indices: (100), (110), and (111).",
          "(100) Wafers: Most commonly used for standard CMOS logic because of lower surface state interface trap density (Dit) at the Si-SiO2 interface.",
          "(110) Wafers: Provides significantly higher hole mobility, frequently leveraged in FinFET sidewalls and 3D CMOS integration."
        ]
      }
    ],
    checkpoint: {
      question: "What is the atomic volume density of crystalline silicon at room temperature?",
      options: [
        "1.5 × 10¹⁰ atoms/cm³",
        "5.0 × 10¹⁵ atoms/cm³",
        "5.0 × 10²² atoms/cm³",
        "6.02 × 10²³ atoms/cm³"
      ],
      correctIndex: 2,
      explanation: "With 8 atoms in a unit cell of volume (5.43 × 10⁻⁸ cm)³, the atomic density is 8 / (5.43 × 10⁻⁸)³ ≈ 5.0 × 10²² atoms/cm³."
    }
  },
  "energy-bands-effective-mass": {
    id: "energy-bands-effective-mass",
    moduleId: "01",
    title: "Energy Bands & Effective Mass (m*)",
    duration: "60 min",
    difficulty: "Intermediate",
    tag: "BAND THEORY",
    summary: "Derive E-k diagrams, analyze the indirect bandgap of Silicon (1.12 eV) vs direct bandgap of GaAs, and calculate electron/hole effective mass.",
    keyFormulas: [
      {
        label: "Silicon Bandgap Energy",
        formula: "Eg(300K) = 1.12 eV",
        desc: "Energy separation between the valence band maximum (at k=0) and conduction band minimum."
      },
      {
        label: "Effective Mass Definition",
        formula: "m* = ℏ² / (d²E / dk²)",
        desc: "Inverse of the band curvature in E-k space representing carrier acceleration in crystal potential."
      }
    ],
    sections: [
      {
        title: "1. The E-k Diagram and Band Curvature",
        content: [
          "The relationship between electron energy (E) and crystal momentum wavevector (k) is called the dispersion relation.",
          "In free space, E = ℏ²k² / 2m0 (a perfect parabola). Inside a periodic crystal lattice, electron waves interact with positive ion cores, distorting this parabola into complex bands.",
          "The effective mass m* accounts for all internal quantum lattice forces, allowing engineers to treat electrons and holes as classical particles obeying Newton's second law: a = q·E / m*."
        ]
      },
      {
        title: "2. Direct vs Indirect Bandgaps",
        content: [
          "Silicon is an indirect bandgap semiconductor: the conduction band minimum does not align with the valence band maximum at k=0.",
          "Therefore, electron-hole recombination in silicon requires both energy conservation (photon) and momentum conservation (lattice phonon), making silicon an inefficient optical light emitter.",
          "Gallium Arsenide (GaAs, Eg = 1.42 eV) has a direct bandgap, allowing direct radiative transitions ideal for lasers and LEDs."
        ]
      }
    ],
    checkpoint: {
      question: "Why is silicon classified as an 'indirect bandgap' semiconductor?",
      options: [
        "Its bandgap changes value randomly with voltage",
        "The conduction band minimum and valence band maximum occur at different crystal momentum wavevectors (k)",
        "It cannot conduct electricity at any temperature",
        "It lacks a conduction band entirely"
      ],
      correctIndex: 1,
      explanation: "In silicon, the conduction band minimum is shifted along the <100> axis in k-space while the valence band maximum is at k=0, requiring phonon interaction for optical transitions."
    }
  },
  "intrinsic-extrinsic-doping": {
    id: "intrinsic-extrinsic-doping",
    moduleId: "02",
    title: "Intrinsic vs Extrinsic Silicon & Dopants",
    duration: "50 min",
    difficulty: "Beginner",
    tag: "CARRIER PHYSICS",
    summary: "Examine intrinsic carrier concentration ni(T), thermal generation, and donor (Phosphorus/Arsenic) vs acceptor (Boron) doping.",
    keyFormulas: [
      {
        label: "Intrinsic Carrier Density",
        formula: "ni(300K) ≈ 1.0 × 10¹⁰ cm⁻³",
        desc: "Thermally generated electron and hole density in ultra-pure intrinsic silicon."
      },
      {
        label: "Mass Action Law",
        formula: "n0 · p0 = ni²(T)",
        desc: "Fundamental relationship between thermal equilibrium electron density n0 and hole density p0."
      }
    ],
    sections: [
      {
        title: "1. Intrinsic Carrier Generation",
        content: [
          "In absolute zero (0 Kelvin), all valence electrons in silicon are locked in covalent bonds: the valence band is completely full and conduction band is empty (conductivity = 0).",
          "At room temperature (300K), thermal energy (kT ≈ 0.0259 eV) causes lattice vibrations (phonons) that break a small fraction of covalent bonds.",
          "This generates electron-hole pairs with ni ≈ 1.0 × 10¹⁰ cm⁻³. Compared to the 5 × 10²² atoms/cm³ density, only 1 in every 5 trillion atoms is ionized."
        ]
      },
      {
        title: "2. Extrinsic Doping: N-type and P-type",
        content: [
          "N-type Doping: Adding Group V elements (Phosphorus, Arsenic) introduces 5 valence electrons. 4 bond with silicon, leaving 1 weakly bound electron that ionizes into the conduction band at room temperature (n0 ≈ Nd).",
          "P-type Doping: Adding Group III elements (Boron) introduces 3 valence electrons. An empty state (hole) is created in the valence band (p0 ≈ Na).",
          "By controlling dopant concentration from 10¹⁴ to 10²⁰ cm⁻³, conductivity can be engineered over 8 orders of magnitude!"
        ]
      }
    ],
    checkpoint: {
      question: "If a silicon sample is doped with Nd = 10¹⁶ cm⁻³ Phosphorus donors at 300K, what is the minority hole concentration p0? (ni = 10¹⁰ cm⁻³)",
      options: [
        "10¹⁶ cm⁻³",
        "10¹⁰ cm⁻³",
        "10⁴ cm⁻³",
        "10²⁶ cm⁻³"
      ],
      correctIndex: 2,
      explanation: "Using the Mass Action Law: p0 = ni² / n0 = (10¹⁰)² / 10¹⁶ = 10²⁰ / 10¹⁶ = 10⁴ cm⁻³."
    }
  },
  "pn-electrostatics-vbi": {
    id: "pn-electrostatics-vbi",
    moduleId: "03",
    title: "PN Junction Electrostatics & Built-in Potential (Vbi)",
    duration: "55 min",
    difficulty: "Intermediate",
    tag: "JUNCTION PHYSICS",
    summary: "Derive the built-in potential barrier, depletion region charge profile, and electric field distribution using Poisson's equation.",
    keyFormulas: [
      {
        label: "Built-in Potential",
        formula: "Vbi = (kT / q) · ln(Na · Nd / ni²)",
        desc: "Electrostatic potential barrier developed across the metallurgical junction in thermal equilibrium."
      },
      {
        label: "Depletion Width W",
        formula: "W = √[ (2 · ε_si / q) · (1/Na + 1/Nd) · (Vbi - V_applied) ]",
        desc: "Total spatial width of the uncompensated space-charge region."
      }
    ],
    sections: [
      {
        title: "1. Formation of the Space-Charge Region",
        content: [
          "When P-type (high hole concentration) and N-type (high electron concentration) silicon regions meet, steep concentration gradients cause diffusion.",
          "Electrons diffuse into the P-region leaving uncompensated fixed positive donor ions (Nd⁺), while holes diffuse into the N-region leaving negative acceptor ions (Na⁻).",
          "This exposed region of fixed ions is devoid of mobile carriers and is called the Depletion Region (or Space-Charge Region)."
        ]
      },
      {
        title: "2. Equilibrium Drift-Diffusion Balance",
        content: [
          "The fixed ions establish a strong internal electric field pointing from N to P.",
          "This electric field opposes diffusion and creates a drift current in the opposite direction.",
          "In thermal equilibrium with zero external bias, the forward diffusion current exactly equals the reverse drift current: J_total = J_drift + J_diff = 0."
        ]
      }
    ],
    checkpoint: {
      question: "What happens to the PN junction depletion width (W) when a reverse bias voltage is applied?",
      options: [
        "It decreases to zero",
        "It widens/increases",
        "It remains completely unchanged",
        "It turns into a superconductor"
      ],
      correctIndex: 1,
      explanation: "Applying a reverse bias increases the total potential barrier across the junction (Vbi + |Vr|), pulling more mobile carriers away and widening the depletion region W."
    }
  },
  "mos-capacitor-inversion": {
    id: "mos-capacitor-inversion",
    moduleId: "05",
    title: "MOS Capacitor Physics: Accumulation to Strong Inversion",
    duration: "65 min",
    difficulty: "Intermediate",
    tag: "MOS PHYSICS",
    summary: "Analyze band bending, surface potential ψs, accumulation, depletion, weak inversion, and strong inversion under gate bias.",
    keyFormulas: [
      {
        label: "Oxide Capacitance",
        formula: "Cox = ε_ox / tox",
        desc: "Gate dielectric capacitance per unit area (SiO2: ε_ox = 3.9 · ε0, HfO2: ε_ox = 25 · ε0)."
      },
      {
        label: "Strong Inversion Condition",
        formula: "ψs = 2 · ψB = 2 · (kT/q) · ln(Na / ni)",
        desc: "Surface potential threshold where minority electron density at the Si-dielectric interface equals bulk majority doping."
      }
    ],
    sections: [
      {
        title: "1. The 3 Regimes of MOS Operation",
        content: [
          "Accumulation: Gate voltage attracts majority carriers (holes for p-substrate) directly to the surface.",
          "Depletion: Positive gate bias pushes majority holes away from the interface, exposing fixed negative acceptor ions.",
          "Inversion: As gate voltage exceeds Vth, energy bands bend sufficiently down (ψs ≥ 2ψB) so that conduction band approaches the Fermi level, creating a conducting 2D electron gas (inversion layer)."
        ]
      }
    ],
    checkpoint: {
      question: "Under strong inversion in an NMOS capacitor with p-substrate, what forms the conducting inversion channel at the oxide interface?",
      options: [
        "Accumulated majority holes",
        "A 2D sheet of minority electrons",
        "Metal atoms migrating through oxide",
        "Neutrons"
      ],
      correctIndex: 1,
      explanation: "In strong inversion, band bending pulls the conduction band below the Fermi level at the surface, creating an inversion layer of minority electrons."
    }
  }
};

export const COURSES_DATA: CourseData[] = [
  {
    id: "device-physics-mastery",
    title: "Foundations of Semiconductor Physics",
    code: "SEMI-101",
    level: "Undergraduate / Graduate Core",
    duration: "18 Hours • 5 Modules",
    instructor: "Dr. Chen & Industry Council",
    description: "Rigorous bottom-up mastery from quantum energy quantization to crystal band theory, PN junctions, and transistor electrostatics.",
    modules: ["01", "02", "03", "04", "05"],
    prerequisites: ["Introductory College Physics", "Linear Algebra & Calculus"],
    skillsGained: [
      "Bandgap Engineering & E-k Dispersion",
      "Carrier Drift-Diffusion Formulation",
      "PN & Schottky Junction Modeling",
      "MOSFET Threshold & Inversion Derivations"
    ]
  },
  {
    id: "transistor-nanoelectronics",
    title: "Transistor Nanoelectronics & Multi-Gate Devices",
    code: "SEMI-201",
    level: "Advanced Graduate / Professional",
    duration: "24 Hours • 4 Modules",
    instructor: "Dr. Al-Mansoor & Fab Engineers",
    description: "Deep dive into short-channel physics, sub-3nm nodes, FinFET, GAAFET Nanosheets, High-k Metal Gates, and cryogenic CMOS.",
    modules: ["03", "04", "05"],
    prerequisites: ["SEMI-101 or Equivalent Device Physics"],
    skillsGained: [
      "Short-Channel Effect Mitigation",
      "Gate-All-Around (GAAFET) Nanosheet Architecture",
      "High-k Metal Gate (HKMG) Stacks",
      "SPICE Compact Modeling (BSIM-CMG)"
    ]
  },
  {
    id: "vlsi-analog-digital",
    title: "VLSI Digital & Analog IC Design Flow",
    code: "VLSI-301",
    level: "Industry Track",
    duration: "30 Hours • 6 Modules",
    instructor: "VLSI Tape-out Team",
    description: "From transistor models to CMOS standard cell layout, RTL Verilog design, static timing analysis (STA), and open-source PDK silicon tape-outs.",
    modules: ["04", "05"],
    prerequisites: ["Digital Logic Design", "Basic Circuit Analysis"],
    skillsGained: [
      "CMOS Inverter Sizing & Delay Optimization",
      "Verilog RTL Synthesis & Verification",
      "SPICE Transient & AC Simulation",
      "DRC / LVS Physical Layout Flow"
    ]
  }
];

export const DEVICES_DATA: DeviceData[] = [
  {
    id: "planar-mosfet",
    name: "Planar MOSFET",
    generation: "Classical Planar (1970s - 2011)",
    nodeEra: "10 μm down to 28 nm node",
    category: "2D Planar Gate",
    desc: "Single top-gate architecture controlling the 2D inversion channel across the silicon substrate surface. Limited below 28nm by severe drain-induced barrier lowering (DIBL).",
    keyFeatures: [
      "Single planar top gate",
      "SiO2 gate dielectric (transitioned to High-k in 45nm)",
      "Source/Drain lateral implants",
      "Gradual channel approximation validity"
    ],
    advantages: ["Simple photolithographic manufacturing", "Lowest wafer fab cost", "Mature SPICE compact models"],
    limitations: ["High subthreshold leakage below 28nm", "Severe short-channel effects (SCE)", "Drain punch-through"],
    layers: [
      { name: "Top Gate Electrode", material: "Polysilicon / TiN Metal", role: "Electrostatic channel control", color: "bg-cyan-500/20 border-cyan-400" },
      { name: "Gate Dielectric (tox)", material: "SiO2 / HfO2 (1.2 nm)", role: "Insulating barrier preventing gate leakage", color: "bg-amber-500/20 border-amber-400" },
      { name: "Source & Drain", material: "n+ Doped Si (10²⁰ cm⁻³)", role: "Carrier injection & collection terminals", color: "bg-emerald-500/20 border-emerald-400" },
      { name: "Channel & Substrate", material: "p- Silicon Substrate", role: "Conducting inversion path", color: "bg-slate-700/40 border-slate-600" }
    ],
    physicsSpecs: [
      { label: "Gate Control Geometry", value: "1-Sided (Top Plane)" },
      { label: "Subthreshold Swing (SS)", value: "~85 - 110 mV/dec (at 28nm)" },
      { label: "DIBL Coefficient", value: "> 100 mV/V" },
      { label: "Current Density", value: "~1.0 mA/μm" }
    ]
  },
  {
    id: "finfet",
    name: "FinFET (3D Tri-Gate)",
    generation: "3D Multi-Gate (2011 - 2022)",
    nodeEra: "22 nm down to 3 nm node",
    category: "Tri-Gate 3D Fin",
    desc: "Vertical 3D silicon fin wrapped on three sides (top, left, right) by the gate electrode, dramatically improving electrostatic channel control and reducing subthreshold leakage.",
    keyFeatures: [
      "3-sided gate wrapping (Tri-Gate)",
      "Narrow vertical fin (width Wfin ≈ 5-7 nm)",
      "Epitaxial SiGe raised Source/Drain",
      "Superior DIBL and ON/OFF current ratio"
    ],
    advantages: ["Extremely low OFF-state leakage", "Steep subthreshold slope (~65-70 mV/dec)", "High drive current per footprint"],
    limitations: ["Quantized fin width restricts drive current sizing", "Fin height aspect ratio etching challenges", "Corner electrostatic effects"],
    layers: [
      { name: "Tri-Gate Wrap", material: "High-k Metal Gate (TiN/TaN)", role: "Wraps fin on top and both vertical sides", color: "bg-sky-500/20 border-sky-400" },
      { name: "High-k Dielectric", material: "HfO2 / Al2O3", role: "Prevents quantum tunneling at 1.0 nm EOT", color: "bg-amber-500/20 border-amber-400" },
      { name: "Silicon 3D Fin", material: "Crystalline Si Fin (Wfin = 6nm)", role: "Fully depleted 3D channel", color: "bg-cyan-500/20 border-cyan-400" },
      { name: "Buried Oxide / STI", material: "Shallow Trench Isolation SiO2", role: "Isolates adjacent transistor fins", color: "bg-slate-700/40 border-slate-600" }
    ],
    physicsSpecs: [
      { label: "Gate Control Geometry", value: "3-Sided (Top + 2 Sidewalls)" },
      { label: "Subthreshold Swing (SS)", value: "~68 mV/dec" },
      { label: "DIBL Coefficient", value: "< 45 mV/V" },
      { label: "Effective Width Weff", value: "2 × Hfin + Wfin" }
    ]
  },
  {
    id: "gaafet-nanosheet",
    name: "GAAFET (Gate-All-Around Nanosheet)",
    generation: "Next-Gen 3D (2022+)",
    nodeEra: "3 nm, 2 nm, and A16/A14 Angstrom nodes",
    category: "4-Sided All-Around Nanosheet",
    desc: "Stacked horizontal silicon nanosheets completely surrounded on all four sides by the gate electrode. Represents the pinnacle of silicon MOSFET channel electrostatic control.",
    keyFeatures: [
      "4-sided surround gate (100% perimeter wrap)",
      "Vertically stacked multi-nanosheets (3-4 sheets)",
      "Continuously tunable nanosheet width Wns",
      "Backside Power Delivery Network (BSPDN) ready"
    ],
    advantages: ["Near-ideal subthreshold slope (~62 mV/dec)", "Eliminates fin width quantization", "Unmatched energy efficiency at < 0.7V VDD"],
    limitations: ["Complex selective SiGe/Si superlattice etch", "Inner spacer lithography precision", "Thermal dissipation in suspended sheets"],
    layers: [
      { name: "All-Around Gate Matrix", material: "High-k Metal Gate (HKMG)", role: "Surrounds 100% of sheet perimeter", color: "bg-emerald-500/20 border-emerald-400" },
      { name: "Stacked Si Nanosheets", material: "Monocrystalline Si (5 nm thickness)", role: "Parallel conducting channels", color: "bg-cyan-500/20 border-cyan-400" },
      { name: "Inner Dielectric Spacers", material: "Low-k SiBCN / SiOCN", role: "Reduces parasitic gate-to-S/D capacitance", color: "bg-indigo-500/20 border-indigo-400" },
      { name: "Backside Power Rails", material: "Ruthenium / Copper via BSPDN", role: "Delivers VDD from backside of wafer", color: "bg-amber-500/20 border-amber-400" }
    ],
    physicsSpecs: [
      { label: "Gate Control Geometry", value: "4-Sided (Full All-Around Wrap)" },
      { label: "Subthreshold Swing (SS)", value: "~63 mV/dec (near theoretical limit)" },
      { label: "DIBL Coefficient", value: "< 25 mV/V" },
      { label: "Operating VDD", value: "0.65 V - 0.70 V" }
    ]
  },
  {
    id: "hemt-gan",
    name: "GaN HEMT (High-Electron-Mobility Transistor)",
    generation: "Wide Bandgap Power & RF",
    nodeEra: "Power Electronics (650V - 1200V) & 5G/6G RF",
    category: "Heterostructure 2DEG",
    desc: "Wide bandgap semiconductor (GaN, Eg = 3.4 eV) utilizing a spontaneous & piezoelectric polarization-induced 2D Electron Gas (2DEG) at the AlGaN/GaN heterojunction interface.",
    keyFeatures: [
      "High critical electric field (3.3 MV/cm vs 0.3 MV/cm in Si)",
      "High-density 2DEG sheet (ns ≈ 10¹³ cm⁻² without intentional doping)",
      "Electron mobility > 2000 cm²/V·s in 2DEG channel",
      "Exceptional high-frequency power switching efficiency"
    ],
    advantages: ["10× faster power switching than silicon", "Compact EV inverters & ultra-fast chargers", "High temperature operation up to 250°C"],
    limitations: ["Native GaN substrate cost (grown on Si/SiC)", "Trapping effects and dynamic Ron degradation", "Normally-ON depletion mode requiring p-GaN gate"],
    layers: [
      { name: "p-GaN Gate / Metal", material: "p-GaN with Ti/Au / Ni/Au", role: "Normally-OFF enhancement mode control", color: "bg-purple-500/20 border-purple-400" },
      { name: "AlGaN Barrier Layer", material: "Al0.25Ga0.75N (20 nm)", role: "Generates 2DEG via lattice polarization", color: "bg-sky-500/20 border-sky-400" },
      { name: "2DEG Electron Sheet", material: "Spontaneous 2D Electron Channel", role: "High-mobility ultra-fast carrier transport", color: "bg-cyan-400/30 border-cyan-300" },
      { name: "GaN Buffer & Substrate", material: "GaN on Si (111) / SiC", role: "High-voltage breakdown blocking layer", color: "bg-slate-700/40 border-slate-600" }
    ],
    physicsSpecs: [
      { label: "Bandgap Energy (Eg)", value: "3.4 eV (GaN) vs 1.12 eV (Si)" },
      { label: "Critical Breakdown Field", value: "3.3 MV/cm (10× Silicon)" },
      { label: "2DEG Sheet Carrier Density", value: "1.0 × 10¹³ cm⁻²" },
      { label: "Max Operating Temperature", value: "> 250 °C" }
    ]
  }
];
