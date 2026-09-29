export interface CourseLessonRef {
  id: string;
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
}

export interface CourseData {
  id: string;
  title: string;
  code: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  duration: string;
  lessonCount: number;
  progressPct: number;
  description: string;
  instructor: string;
  badgeVariant: "teal" | "sky" | "blue" | "purple" | "amber";
  topics: string[];
  prerequisites: string[];
  skillsGained: string[];
  lessons: CourseLessonRef[];
}

export const COURSES_DATA: CourseData[] = [
  {
    id: "semiconductor-fundamentals",
    title: "Semiconductor Fundamentals & Band Theory",
    code: "SEMI-101",
    level: "Beginner",
    duration: "10.5 Hours",
    lessonCount: 6,
    progressPct: 65,
    description: "From Bohr atomic orbits and diamond cubic crystal lattices to energy bandgaps, intrinsic carrier generation, Fermi-Dirac statistics, and drift-diffusion current transport.",
    instructor: "Dr. Chen, Semiconductor Physics Chair",
    badgeVariant: "teal",
    topics: ["Bohr Model", "Silicon Crystal Lattice (5.43 Å)", "Energy Bandgap (1.12 eV)", "Fermi Level (Ef)", "Drift & Diffusion"],
    prerequisites: ["Introductory Physics (Electromagnetism)", "Basic Calculus"],
    skillsGained: [
      "Energy band diagram construction",
      "Carrier concentration calculations (ni, n0, p0)",
      "Fermi level shift with donor/acceptor doping",
      "Einstein diffusion relation application"
    ],
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
      },
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
  {
    id: "pn-junction-diodes",
    title: "PN Junction & Diode Dynamics",
    code: "SEMI-102",
    level: "Intermediate",
    duration: "8.0 Hours",
    lessonCount: 4,
    progressPct: 40,
    description: "Equilibrium space-charge electrostatics, built-in barrier potential Vbi, Shockley ideal diode equation under bias, depletion vs diffusion capacitance, and Zener/avalanche breakdown.",
    instructor: "Dr. Al-Mansoor, Microelectronics Lab",
    badgeVariant: "sky",
    topics: ["Space-Charge Region", "Built-in Potential (Vbi)", "Shockley Equation", "Depletion Capacitance", "Zener Breakdown"],
    prerequisites: ["SEMI-101 or Equivalent Semiconductor Physics"],
    skillsGained: [
      "Poisson's equation depletion width solutions",
      "Minority carrier injection profile derivations",
      "Diode dynamic AC capacitance modeling",
      "Breakdown voltage tuning for power rectifiers"
    ],
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
      },
      {
        id: "schottky-barrier-diodes",
        title: "Schottky Barrier Metal-Semiconductor Diodes",
        duration: "55 min",
        difficulty: "Intermediate",
        topics: ["Metal Work Function", "Fermi Level Pinning", "Thermionic Emission"]
      }
    ]
  },
  {
    id: "bjt-physics",
    title: "BJT Transistors & Amplification Physics",
    code: "SEMI-201",
    level: "Intermediate",
    duration: "9.0 Hours",
    lessonCount: 4,
    progressPct: 20,
    description: "Double-junction physics in NPN/PNP transistors, minority carrier gradient in the thin base, base-width modulation (Early effect), and high-frequency hybrid-pi equivalent circuits.",
    instructor: "Prof. Elena Rostova, Analog Circuit Design Group",
    badgeVariant: "sky",
    topics: ["Emitter Injection Efficiency", "Base Transport Factor", "Ebers-Moll Model", "Early Effect", "Hybrid-Pi"],
    prerequisites: ["SEMI-102 (PN Junctions)"],
    skillsGained: [
      "Minority carrier base transport derivations",
      "Common-emitter, common-base, and common-collector biasing",
      "Small-signal transconductance (gm = Ic/Vt) modeling",
      "High-frequency cutoff frequency (fT) estimation"
    ],
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
      },
      {
        id: "bjt-switching-transients",
        title: "BJT Switching Transients & Base Charge Storage",
        duration: "50 min",
        difficulty: "Intermediate",
        topics: ["Storage Delay Time", "Saturation Charge", "Schottky-Clamped Transistors"]
      }
    ]
  },
  {
    id: "mosfet-devices",
    title: "MOSFET Physics & Nanoscale Scaling",
    code: "SEMI-202",
    level: "Advanced",
    duration: "11.0 Hours",
    lessonCount: 5,
    progressPct: 80,
    description: "MOS capacitor electrostatics across accumulation, depletion, and inversion; long-channel square-law equations; velocity saturation; Drain-Induced Barrier Lowering (DIBL); and 3D FinFET architectures.",
    instructor: "Dr. Chen, Semiconductor Physics Chair",
    badgeVariant: "blue",
    topics: ["MOS Capacitor C-V", "Threshold Voltage (Vth)", "Gradual Channel Approx", "DIBL & Velocity Saturation", "FinFET 3D Gate"],
    prerequisites: ["SEMI-101", "SEMI-102"],
    skillsGained: [
      "Surface potential band-bending solutions",
      "Accurate threshold voltage Vth modeling including body effect",
      "Short-channel effect (SCE) mitigation analysis",
      "Multi-gate FinFET & GAAFET electrostatic wrapping"
    ],
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
      },
      {
        id: "high-k-metal-gate-stacks",
        title: "High-k Dielectrics & Metal Gate (HKMG) Stacks",
        duration: "55 min",
        difficulty: "Advanced",
        topics: ["HfO2 Dielectric Constant", "Equivalent Oxide Thickness (EOT)", "Gate Tunneling"]
      },
      {
        id: "compact-modeling-bsim",
        title: "Compact SPICE Modeling with BSIM-CMG",
        duration: "60 min",
        difficulty: "Advanced",
        topics: ["SPICE Parameter Extraction", "BSIM Compact Models", "Process Corners"]
      }
    ]
  },
  {
    id: "cmos-digital-design",
    title: "CMOS Digital IC Design & Logic Effort",
    code: "VLSI-201",
    level: "Intermediate",
    duration: "10.0 Hours",
    lessonCount: 4,
    progressPct: 15,
    description: "CMOS inverter voltage transfer curve (VTC), noise margin optimization, propagation delay modeling (Elmore delay), method of Logical Effort, and combinational logic path sizing.",
    instructor: "David Vance, Principal Digital Architect",
    badgeVariant: "blue",
    topics: ["CMOS Inverter VTC", "Noise Margins", "Elmore Delay", "Logical Effort", "Dynamic Power"],
    prerequisites: ["SEMI-202 (MOSFETs)", "Digital Logic Design"],
    skillsGained: [
      "Static CMOS gate design (NAND, NOR, XOR)",
      "Optimal stage sizing using Logical Effort",
      "Dynamic and subthreshold leakage power reduction",
      "Transmission gate and pass-transistor logic optimization"
    ],
    lessons: [
      {
        id: "cmos-inverter-vtc",
        title: "CMOS Inverter DC Characteristics & Noise Margins",
        duration: "60 min",
        difficulty: "Intermediate",
        topics: ["Switching Threshold VM", "NMH & NML Margins", "PMOS vs NMOS Sizing Ratio"]
      },
      {
        id: "elmore-delay-logical-effort",
        title: "Propagation Delay & The Method of Logical Effort",
        duration: "65 min",
        difficulty: "Advanced",
        topics: ["RC Delay Modeling", "Stage Effort & Path Effort", "Optimal Buffer Insertion"]
      },
      {
        id: "dynamic-cmos-pass-transistor",
        title: "Dynamic CMOS, Domino Logic & Pass Transistors",
        duration: "55 min",
        difficulty: "Advanced",
        topics: ["Precharge & Evaluate Phases", "Charge Sharing", "Domino Gate Cascading"]
      },
      {
        id: "sequential-latches-flipflops",
        title: "Sequential Circuits: Static Latches & Master-Slave Flip-Flops",
        duration: "60 min",
        difficulty: "Intermediate",
        topics: ["Setup & Hold Time Physics", "Clock-to-Q Delay", "Metastability Resolution"]
      }
    ]
  },
  {
    id: "vlsi-chip-design",
    title: "VLSI RTL to GDSII Physical Design Flow",
    code: "VLSI-301",
    level: "Professional",
    duration: "14.0 Hours",
    lessonCount: 5,
    progressPct: 30,
    description: "End-to-end ASIC design flow: synthesizable Verilog HDL, static timing analysis (STA), setup/hold constraints, floorplanning, placement, clock tree synthesis (CTS), and tape-out verification.",
    instructor: "VLSI Tape-out Team & Foundry Partners",
    badgeVariant: "purple",
    topics: ["Verilog RTL", "Logic Synthesis", "Static Timing Analysis (STA)", "Clock Tree Synthesis (CTS)", "GDSII Tape-out"],
    prerequisites: ["VLSI-201 (CMOS Digital)", "Basic Linux / EDA Tools"],
    skillsGained: [
      "Writing production synthesizable Verilog/SystemVerilog",
      "Constraining clocks and I/O using SDC files",
      "Resolving setup and hold timing violations across process corners",
      "Executing OpenLane / SkyWater 130nm ASIC physical flow"
    ],
    lessons: [
      {
        id: "vlsi-rtl-to-gdsii",
        title: "The ASIC Flow: From Verilog Specification to GDSII",
        duration: "65 min",
        difficulty: "Intermediate",
        topics: ["Architecture to Netlist", "Place & Route Stages", "DRC/LVS Signoff"]
      },
      {
        id: "static-timing-analysis-constraints",
        title: "Static Timing Analysis (STA) & SDC Constraints",
        duration: "75 min",
        difficulty: "Advanced",
        topics: ["Setup & Hold Slack", "Clock Skew & Jitter", "Multi-Corner Multi-Mode (MCMM)"]
      },
      {
        id: "floorplanning-power-grid",
        title: "Floorplanning, Core Utilization & Power Grid (IR Drop)",
        duration: "60 min",
        difficulty: "Advanced",
        topics: ["Macro Placement", "Power Ring & Straps", "Static & Dynamic IR Drop"]
      },
      {
        id: "clock-tree-synthesis-routing",
        title: "Clock Tree Synthesis (CTS) & Detailed Routing",
        duration: "70 min",
        difficulty: "Advanced",
        topics: ["H-Tree & Mesh Networks", "Clock Skew Balancing", "Crosstalk & Coupling Capacitance"]
      },
      {
        id: "physical-verification-drc-lvs",
        title: "Physical Verification: DRC, LVS & Antenna Checks",
        duration: "60 min",
        difficulty: "Advanced",
        topics: ["Design Rule Checking (DRC)", "Layout Versus Schematic (LVS)", "Antenna Diode Fixes"]
      }
    ]
  },
  {
    id: "semiconductor-fabrication",
    title: "Semiconductor Fabrication & Cleanroom Processing",
    code: "FAB-201",
    level: "Intermediate",
    duration: "9.5 Hours",
    lessonCount: 4,
    progressPct: 10,
    description: "Czochralski silicon ingot growth, High-NA EUV lithography, plasma etch, atomic layer deposition (ALD), ion implantation, and chemical-mechanical planarization (CMP).",
    instructor: "Cleanroom Operations & Yield Engineering Group",
    badgeVariant: "amber",
    topics: ["EUV Photolithography (13.5 nm)", "Ion Implantation", "Atomic Layer Deposition (ALD)", "Reactive Ion Etching (RIE)", "CMP"],
    prerequisites: ["SEMI-101 (Semiconductor Fundamentals)"],
    skillsGained: [
      "Rayleigh lithography resolution criterion modeling",
      "Ion implantation range and straggle calculations",
      "Plasma dry etch selectivity and anisotropy optimization",
      "Fab yield defect density modeling (Poisson/Murphy models)"
    ],
    lessons: [
      {
        id: "lithography-euv-fab",
        title: "High-NA EUV Photolithography (13.5 nm) & Patterning",
        duration: "65 min",
        difficulty: "Intermediate",
        topics: ["Rayleigh Criterion", "Reflective Mask Optics", "Stochastic Defects"]
      },
      {
        id: "ion-implantation-annealing",
        title: "Ion Implantation & Rapid Thermal Annealing (RTA)",
        duration: "55 min",
        difficulty: "Intermediate",
        topics: ["Projected Range Rp", "Lattice Damage Repair", "Channeling Effects"]
      },
      {
        id: "thin-film-deposition-ald-cvd",
        title: "Thin Film Deposition: ALD, CVD & PVD Sputtering",
        duration: "60 min",
        difficulty: "Intermediate",
        topics: ["Atomic Layer Conformal Growth", "High-k Stacks", "Barrier & Seed Layers"]
      },
      {
        id: "plasma-etching-cmp-planarization",
        title: "Plasma Dry Etch (RIE/ALE) & Chemical Mechanical Polishing",
        duration: "55 min",
        difficulty: "Intermediate",
        topics: ["Anisotropic Etching", "Atomic Layer Etching", "CMP Slurry Mechanics"]
      }
    ]
  },
  {
    id: "advanced-devices",
    title: "Advanced Transistors, GAAFET & 3D Packaging",
    code: "SEMI-401",
    level: "Professional",
    duration: "12.5 Hours",
    lessonCount: 5,
    progressPct: 5,
    description: "Sub-2nm physics: Gate-All-Around (GAAFET) horizontal nanosheets, Backside Power Delivery (BSPDN), GaN/SiC wide bandgap power devices, and 2.5D/3D chiplet packaging (CoWoS/3D-IC).",
    instructor: "Nanoelectronics Research Alliance",
    badgeVariant: "purple",
    topics: ["GAAFET Nanosheets", "Backside Power Rails", "Wide Bandgap GaN/SiC", "CoWoS 3D Packaging", "Cryogenic CMOS"],
    prerequisites: ["SEMI-202 (MOSFETs)", "FAB-201"],
    skillsGained: [
      "4-sided gate electrostatic channel modeling",
      "Backside power routing IR-drop elimination analysis",
      "Wide bandgap heterojunction 2DEG calculations",
      "Advanced chiplet interposer & hybrid bonding integration"
    ],
    lessons: [
      {
        id: "gaafet-nanosheet-physics",
        title: "GAAFET Stacked Nanosheets: Physics & Electrostatics",
        duration: "70 min",
        difficulty: "Advanced",
        topics: ["4-Sided Surround Gate", "Subthreshold Slope (SS ≈ 63 mV/dec)", "Inner Spacer Engineering"]
      },
      {
        id: "backside-power-delivery-bspdn",
        title: "Backside Power Delivery Networks (BSPDN) & Super-Power-Rails",
        duration: "65 min",
        difficulty: "Advanced",
        topics: ["Through-Silicon Vias (TSV)", "Power/Ground Decoupling", "Cell Area Scaling"]
      },
      {
        id: "wide-bandgap-gan-sic",
        title: "Wide Bandgap GaN HEMT & SiC Power MOSFETs",
        duration: "65 min",
        difficulty: "Advanced",
        topics: ["2D Electron Gas (2DEG)", "Critical Breakdown Field (3.3 MV/cm)", "EV Inverter Efficiencies"]
      },
      {
        id: "advanced-3d-packaging-cowos",
        title: "2.5D/3D Advanced Packaging: CoWoS & Direct Hybrid Bonding",
        duration: "60 min",
        difficulty: "Advanced",
        topics: ["Silicon Interposers", "High-Bandwidth Memory (HBM3e)", "Direct Cu-Cu Bonding"]
      },
      {
        id: "cryogenic-cmos-quantum-control",
        title: "Cryogenic CMOS & Spin Qubit Control Hardware",
        duration: "60 min",
        difficulty: "Advanced",
        topics: ["4 Kelvin Transistor Operation", "Carrier Freeze-out", "Low-Noise Quantum Readout"]
      }
    ]
  }
];
