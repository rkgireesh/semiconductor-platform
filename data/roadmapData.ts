export interface RoadmapStage {
  id: string;
  num: string;
  title: string;
  category: "Fundamentals" | "Devices" | "Circuit Design" | "Manufacturing" | "Frontier";
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  diffVariant: "teal" | "sky" | "blue" | "purple" | "amber";
  duration: string;
  status: "Available" | "Recommended" | "Advanced";
  desc: string;
  skills: string[];
  courseId: string;
  primaryLessonId: string;
  modulesIncluded: { name: string; duration: string }[];
  learningObjectives: string[];
}

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: "01",
    num: "01",
    title: "Electrical & Atomic Fundamentals",
    category: "Fundamentals",
    difficulty: "Beginner",
    diffVariant: "teal",
    duration: "4.5 Hours",
    status: "Available",
    desc: "Bohr atomic model, energy quantization, crystal lattice structures, silicon covalent bonding, and electron energy state splitting.",
    skills: ["Bohr Model", "Crystalline Silicon", "Diamond Cubic Lattice", "Valence & Conduction Bands"],
    courseId: "semiconductor-fundamentals",
    primaryLessonId: "bohr-atomic-model",
    modulesIncluded: [
      { name: "Atomic Quantization & Orbitals", duration: "1.5h" },
      { name: "Silicon Crystal Lattice (5.43 Å)", duration: "1.5h" },
      { name: "Bandgap Formation (1.12 eV)", duration: "1.5h" },
    ],
    learningObjectives: [
      "Derive discrete atomic energy levels and understand how atomic clusters form continuous energy bands.",
      "Calculate atomic density and unit cell dimensions for diamond cubic silicon.",
      "Analyze electron dispersion relations (E-k) and calculate carrier effective mass."
    ]
  },
  {
    id: "02",
    num: "02",
    title: "Semiconductor Fundamentals",
    category: "Fundamentals",
    difficulty: "Beginner",
    diffVariant: "teal",
    duration: "6.0 Hours",
    status: "Available",
    desc: "Intrinsic & extrinsic semiconductors, n-type/p-type doping, carrier concentration (ni), Fermi-Dirac distribution, and drift vs diffusion transport.",
    skills: ["Impurity Doping (B / P)", "Fermi Level (Ef)", "Mass Action Law", "Einstein Diffusion Relation"],
    courseId: "semiconductor-fundamentals",
    primaryLessonId: "intrinsic-extrinsic-doping",
    modulesIncluded: [
      { name: "Intrinsic vs Extrinsic Silicon", duration: "2.0h" },
      { name: "Fermi-Dirac Statistics & Ef", duration: "2.0h" },
      { name: "Carrier Drift & Diffusion Dynamics", duration: "2.0h" },
    ],
    learningObjectives: [
      "Calculate thermal equilibrium electron and hole densities using Fermi-Dirac statistics.",
      "Apply the Mass Action Law (n0 · p0 = ni²) across diverse doping ranges.",
      "Formulate carrier transport combining electric field drift (μ) and concentration gradient diffusion (D)."
    ]
  },
  {
    id: "03",
    num: "03",
    title: "PN Junction & Diodes",
    category: "Devices",
    difficulty: "Intermediate",
    diffVariant: "sky",
    duration: "7.5 Hours",
    status: "Available",
    desc: "Built-in potential (Vbi), depletion region dynamics, forward/reverse bias IV characteristics, junction capacitance, and breakdown mechanisms.",
    skills: ["Space-Charge Region", "Shockley Diode Equation", "Depletion Capacitance", "Zener & Avalanche Breakdown"],
    courseId: "pn-junction-diodes",
    primaryLessonId: "pn-electrostatics-vbi",
    modulesIncluded: [
      { name: "Equilibrium Electrostatics & Vbi", duration: "2.5h" },
      { name: "Shockley Diode Equation & Biasing", duration: "2.5h" },
      { name: "Dynamic Capacitance & Breakdown", duration: "2.5h" },
    ],
    learningObjectives: [
      "Solve Poisson's equation to derive depletion width W and electric field profiles in step junctions.",
      "Derive the Ideal Diode Equation for minority carrier injection and diffusion.",
      "Differentiate between quantum Zener tunneling and avalanche impact ionization."
    ]
  },
  {
    id: "04",
    num: "04",
    title: "BJT (Bipolar Junction Transistor)",
    category: "Devices",
    difficulty: "Intermediate",
    diffVariant: "sky",
    duration: "8.0 Hours",
    status: "Available",
    desc: "NPN/PNP physics, minority carrier injection, base transport factor, Ebers-Moll equations, and small-signal amplification modes.",
    skills: ["Minority Injection", "Base Narrowing", "Early Effect (VA)", "Hybrid-Pi Model"],
    courseId: "bjt-physics",
    primaryLessonId: "bjt-physics-operation",
    modulesIncluded: [
      { name: "NPN & PNP Physics & Gain (α, β)", duration: "2.5h" },
      { name: "Ebers-Moll Large Signal Model", duration: "2.5h" },
      { name: "Small-Signal Hybrid-Pi Modeling", duration: "3.0h" },
    ],
    learningObjectives: [
      "Calculate emitter injection efficiency (γ) and base transport factor (αT).",
      "Model base-width modulation (Early effect) and its impact on output resistance ro.",
      "Construct AC small-signal hybrid-pi circuits for analog amplifiers."
    ]
  },
  {
    id: "05",
    num: "05",
    title: "MOS Capacitor & MOSFET",
    category: "Devices",
    difficulty: "Advanced",
    diffVariant: "blue",
    duration: "9.5 Hours",
    status: "Recommended",
    desc: "MOS capacitor states (accumulation, depletion, inversion), threshold voltage (Vth), square-law IV equations, subthreshold slope, and short-channel effects.",
    skills: ["Surface Inversion (2ψB)", "Threshold Voltage (Vth)", "Body Effect (γ)", "DIBL & Velocity Saturation"],
    courseId: "mosfet-devices",
    primaryLessonId: "mos-capacitor-inversion",
    modulesIncluded: [
      { name: "MOS Capacitor Band Bending & C-V", duration: "3.0h" },
      { name: "Long-Channel MOSFET IV Equations", duration: "3.0h" },
      { name: "Short-Channel Effects (SCE) & DIBL", duration: "3.5h" },
    ],
    learningObjectives: [
      "Derive surface potential ψs at strong inversion and calculate oxide capacitance Cox.",
      "Formulate drain current ID in linear and saturation regimes with channel length modulation (λ).",
      "Analyze subthreshold swing SS (mV/dec) and drain-induced barrier lowering in scaled transistors."
    ]
  },
  {
    id: "06",
    num: "06",
    title: "CMOS & Digital Electronics",
    category: "Circuit Design",
    difficulty: "Intermediate",
    diffVariant: "blue",
    duration: "8.5 Hours",
    status: "Recommended",
    desc: "CMOS inverter voltage transfer curve (VTC), noise margins, propagation delay, dynamic and static power dissipation, and combinational logic sizing.",
    skills: ["CMOS Inverter VTC", "Noise Margins (NMH, NML)", "Logical Effort", "Dynamic Power (α·C·V²·f)"],
    courseId: "cmos-digital-design",
    primaryLessonId: "cmos-inverter-vtc",
    modulesIncluded: [
      { name: "CMOS Inverter DC Characteristics & VTC", duration: "2.5h" },
      { name: "Propagation Delay & Sizing", duration: "3.0h" },
      { name: "Static & Dynamic Power Mitigation", duration: "3.0h" },
    ],
    learningObjectives: [
      "Calculate switching threshold VM and symmetrical sizing ratios for PMOS vs NMOS mobilities.",
      "Apply the method of Logical Effort to minimize path delay across multi-stage digital logic gates.",
      "Analyze subthreshold leakage power and clock gating techniques."
    ]
  },
  {
    id: "07",
    num: "07",
    title: "Analog IC Design",
    category: "Circuit Design",
    difficulty: "Advanced",
    diffVariant: "purple",
    duration: "10.0 Hours",
    status: "Advanced",
    desc: "Single-stage amplifiers (CS, CG, CD), current mirrors, differential pairs, operational transconductance amplifiers (OTA), and frequency compensation.",
    skills: ["Common-Source Gain", "Cascode Current Mirrors", "Differential Amplifiers", "Miller Compensation"],
    courseId: "analog-ic-design",
    primaryLessonId: "analog-diff-pair",
    modulesIncluded: [
      { name: "Single-Stage MOS Amplifiers", duration: "3.0h" },
      { name: "Current Mirrors & Active Loads", duration: "3.0h" },
      { name: "Two-Stage CMOS Op-Amp & Stability", duration: "4.0h" },
    ],
    learningObjectives: [
      "Derive small-signal voltage gain Av, input impedance Rin, and output impedance Rout for MOS stages.",
      "Design high-output-impedance cascode current mirrors and evaluate common-mode rejection ratio (CMRR).",
      "Perform Bode plot stability analysis and design Miller pole-splitting frequency compensation."
    ]
  },
  {
    id: "08",
    num: "08",
    title: "Semiconductor Fabrication",
    category: "Manufacturing",
    difficulty: "Intermediate",
    diffVariant: "amber",
    duration: "8.0 Hours",
    status: "Available",
    desc: "Cleanroom processing: Czochralski wafer growth, photolithography (DUV & High-NA EUV), oxidation, ion implantation, chemical vapor deposition (CVD), and etching.",
    skills: ["EUV Photolithography", "Ion Implantation & Annealing", "Dry Plasma Etching (RIE)", "CMP & Metallization"],
    courseId: "semiconductor-fabrication",
    primaryLessonId: "lithography-euv-fab",
    modulesIncluded: [
      { name: "Silicon Ingot & Wafer Preparation", duration: "2.0h" },
      { name: "Extreme Ultraviolet (EUV) Litho", duration: "3.0h" },
      { name: "Thin Film Deposition (ALD/CVD) & Etch", duration: "3.0h" },
    ],
    learningObjectives: [
      "Explain the optical resolution limit (Rayleigh criterion: CD = k1 · λ / NA) in advanced lithography.",
      "Model dopant depth profiles following ion implantation and thermal diffusion/activation annealing.",
      "Describe atomic layer deposition (ALD) and reactive ion etching (RIE) for 3D multi-layer integration."
    ]
  },
  {
    id: "09",
    num: "09",
    title: "VLSI & Chip Design Flow",
    category: "Circuit Design",
    difficulty: "Advanced",
    diffVariant: "purple",
    duration: "12.0 Hours",
    status: "Recommended",
    desc: "RTL-to-GDSII flow: Verilog HDL, logic synthesis, static timing analysis (STA), floorplanning, placement, clock tree synthesis (CTS), routing, and DRC/LVS.",
    skills: ["Verilog RTL", "Static Timing Analysis (STA)", "Setup/Hold Slack", "Clock Tree Synthesis (CTS)"],
    courseId: "vlsi-chip-design",
    primaryLessonId: "vlsi-rtl-to-gdsii",
    modulesIncluded: [
      { name: "Synthesizable Verilog & Testbenches", duration: "3.5h" },
      { name: "Static Timing Analysis & Constraints", duration: "4.0h" },
      { name: "Physical Design: Floorplan to GDSII", duration: "4.5h" },
    ],
    learningObjectives: [
      "Write synthesizeable Verilog modules for synchronous finite state machines and datapath pipelines.",
      "Calculate setup slack (Tclk ≥ Tcq + Tcomb + Tsetup) and hold slack to prevent timing violations.",
      "Execute standard cell placement, CTS skew balancing, and power grid distribution."
    ]
  },
  {
    id: "10",
    num: "10",
    title: "Advanced Semiconductor Technology",
    category: "Frontier",
    difficulty: "Expert",
    diffVariant: "purple",
    duration: "10.5 Hours",
    status: "Advanced",
    desc: "Sub-2nm nodes, FinFET to GAAFET (Nanosheets/Forksheets), High-k Metal Gates (HKMG), Backside Power Delivery (BSPDN), and Advanced Packaging (CoWoS/3D-IC).",
    skills: ["GAAFET Nanosheets", "Backside Power Delivery", "2.5D/3D Packaging (CoWoS)", "Wide Bandgap GaN/SiC"],
    courseId: "advanced-devices",
    primaryLessonId: "gaafet-nanosheet-physics",
    modulesIncluded: [
      { name: "FinFET to GAAFET Nanosheet Evolution", duration: "3.5h" },
      { name: "Backside Power & Super-Power-Rails", duration: "3.5h" },
      { name: "Chiplet Packaging & High-Density Interconnects", duration: "3.5h" },
    ],
    learningObjectives: [
      "Analyze 4-sided electrostatic gate control in stacked horizontal nanosheets.",
      "Evaluate Backside Power Delivery Networks (BSPDN) for IR-drop reduction and standard cell area scaling.",
      "Compare hybrid bonding, silicon interposers (CoWoS), and micro-bump interconnect densities."
    ]
  },
  {
    id: "11",
    num: "11",
    title: "Semiconductor Research & Frontier",
    category: "Frontier",
    difficulty: "Expert",
    diffVariant: "teal",
    duration: "9.0 Hours",
    status: "Available",
    desc: "Emerging semiconductor materials: 2D Transition Metal Dichalcogenides (MoS2, WS2), Carbon Nanotube FETs, Neuromorphic memristors, and Cryogenic CMOS for quantum computing.",
    skills: ["2D Semiconductors (TMDs)", "Cryogenic CMOS", "Memristive AI Hardware", "Quantum Transistor Gates"],
    courseId: "research-hub-course",
    primaryLessonId: "research-2d-materials",
    modulesIncluded: [
      { name: "2D Atomic-Monolayer Transistors", duration: "3.0h" },
      { name: "Cryo-CMOS for Quantum Qubit Control", duration: "3.0h" },
      { name: "Neuromorphic Analog Computing Hardware", duration: "3.0h" },
    ],
    learningObjectives: [
      "Understand monolayer 2D material band structures and contact resistance engineering.",
      "Analyze transistor subthreshold performance and carrier freeze-out down to 4 Kelvin temperatures.",
      "Explore non-volatile analog memory crossbars for in-memory neural network acceleration."
    ]
  },
  {
    id: "12",
    num: "12",
    title: "Career & Industry Preparation",
    category: "Circuit Design",
    difficulty: "Intermediate",
    diffVariant: "sky",
    duration: "6.0 Hours",
    status: "Available",
    desc: "Preparation for top global semiconductor foundries and fabless firms: technical interview question banks, tape-out portfolio creation, resume keyword optimization, and domain specializations.",
    skills: ["VLSI Interview Questions", "PDK Tape-out Portfolio", "SystemVerilog / UVM Basics", "Technical Resume Review"],
    courseId: "semiconductor-careers-course",
    primaryLessonId: "career-interview-prep",
    modulesIncluded: [
      { name: "Semiconductor Industry Domain Map", duration: "1.5h" },
      { name: "Technical Interview Question Bank", duration: "2.5h" },
      { name: "Silicon Portfolio & Open-Source PDK Projects", duration: "2.0h" },
    ],
    learningObjectives: [
      "Master high-frequency technical interview questions across digital logic, STA, and device physics.",
      "Package your RTL designs, SPICE simulations, and layout screenshots into a hireable portfolio.",
      "Target high-growth career tracks across RTL, Physical Design, Verification, Fabrication, and Analog Design."
    ]
  }
];
