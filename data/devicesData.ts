export interface DeviceLayer {
  name: string;
  material: string;
  role: string;
  color: string;
}

export interface DeviceSpec {
  label: string;
  value: string;
}

export interface SemiconductorDevice {
  id: string;
  name: string;
  symbol: string;
  category: "Two-Terminal" | "Three-Terminal Transistors" | "Multi-Gate 3D" | "Power Semiconductors";
  generation: string;
  nodeEra: string;
  terminals: string[];
  structure: string;
  workingPrinciple: string;
  applications: string[];
  advantages: string[];
  limitations: string[];
  layers: DeviceLayer[];
  specs: DeviceSpec[];
}

export const SEMICONDUCTOR_DEVICES: SemiconductorDevice[] = [
  {
    id: "pn-diode",
    name: "PN Junction & Schottky Diode",
    symbol: "▶|— (Anode to Cathode)",
    category: "Two-Terminal",
    generation: "Foundational (1940s+)",
    nodeEra: "Universal Component",
    terminals: ["Anode (P-side / Metal)", "Cathode (N-side)"],
    structure: "Monocrystalline silicon p-n metallurgical boundary or metal-semiconductor Schottky barrier interface.",
    workingPrinciple: "Unidirectional charge flow: forward bias lowers the built-in potential barrier (Vbi) enabling exponential diffusion current; reverse bias widens the space-charge depletion zone allowing only microampere leakage.",
    applications: ["AC-DC Power Rectifiers", "Electrostatic Discharge (ESD) Protection", "RF Demodulation", "Solar Photovoltaic Cells"],
    advantages: ["Simple robust construction", "Extremely high reverse breakdown voltages (> 1000V available)", "Zero standby power"],
    limitations: ["0.7V forward knee drop causes power loss in low-voltage circuits", "Reverse recovery charge limits ultra-fast switching"],
    layers: [
      { name: "Anode Metallization", material: "Aluminum / Copper Ohmic Contact", role: "Positive terminal connection", color: "bg-slate-700/40 border-slate-600" },
      { name: "P+ Emitter Region", material: "Boron-doped Silicon (10¹⁹ cm⁻³)", role: "Supplies hole carriers across junction", color: "bg-purple-500/20 border-purple-400" },
      { name: "Depletion Zone", material: "Uncompensated Fixed Space-Charge", role: "Built-in electric field barrier", color: "bg-amber-500/20 border-amber-400" },
      { name: "N- Drift / Substrate", material: "Phosphorus-doped Silicon (10¹⁶ cm⁻³)", role: "Blocks reverse breakdown voltage", color: "bg-cyan-500/20 border-cyan-400" }
    ],
    specs: [
      { label: "Forward Voltage Drop (Vf)", value: "0.65 V - 0.75 V (Si) / 0.3 V (Schottky)" },
      { label: "Reverse Breakdown (Vbr)", value: "50 V to > 1500 V" },
      { label: "Switching Time (trr)", value: "10 ns - 100 ns (Ultra-fast recovery)" },
      { label: "Ideality Factor (η)", value: "1.02 - 1.15" }
    ]
  },
  {
    id: "bjt-transistor",
    name: "BJT (Bipolar Junction Transistor)",
    symbol: "NPN / PNP with Emitter Arrow",
    category: "Three-Terminal Transistors",
    generation: "Classic Analog (1947+)",
    nodeEra: "Discrete to BiCMOS 130nm",
    terminals: ["Emitter (E)", "Base (B)", "Collector (C)"],
    structure: "Three alternating semiconductor layers (N-P-N or P-N-P) sharing an ultra-thin neutral base region (Wb << Ln).",
    workingPrinciple: "Current-controlled current source: small base current forward-biases the base-emitter junction, injecting minority carriers that diffuse across the thin base and are collected by the reverse-biased collector.",
    applications: ["Low-Noise Analog RF Amplifiers", "Bandgap Voltage References", "High-Speed BiCMOS Mixers", "Audio Power Drivers"],
    advantages: ["High transconductance per unit current (gm = Ic/Vt)", "Exceptional 1/f low-frequency noise performance", "Tight Vbe threshold matching across wafer"],
    limitations: ["Continuous DC base current required (low input impedance compared to MOSFETs)", "Prone to thermal runaway without degeneration resistors"],
    layers: [
      { name: "Collector Terminal", material: "n- Silicon Epitaxial Layer", role: "Collects minority carriers swept across BC junction", color: "bg-cyan-500/20 border-cyan-400" },
      { name: "Thin Base Layer", material: "p- Silicon (Wb < 100 nm)", role: "Modulates carrier transport via base injection", color: "bg-purple-500/20 border-purple-400" },
      { name: "Heavy Emitter", material: "n+ Polysilicon / Si (10²⁰ cm⁻³)", role: "High-efficiency electron injector", color: "bg-emerald-500/20 border-emerald-400" }
    ],
    specs: [
      { label: "Current Gain (β / hFE)", value: "80 - 300" },
      { label: "Cutoff Frequency (fT)", value: "10 GHz - 200 GHz (SiGe BiCMOS)" },
      { label: "Early Voltage (VA)", value: "50 V - 150 V" },
      { label: "Transconductance (gm)", value: "38.6 mS per 1 mA collector current" }
    ]
  },
  {
    id: "planar-mosfet",
    name: "Planar MOSFET (Metal-Oxide-Semiconductor)",
    symbol: "4-Terminal Gate-Drain-Source-Body",
    category: "Three-Terminal Transistors",
    generation: "Classical CMOS (1970s - 2011)",
    nodeEra: "10 μm down to 28 nm node",
    terminals: ["Gate (G)", "Drain (D)", "Source (S)", "Body / Bulk (B)"],
    structure: "Single top gate separated from a p-type substrate by a thin dielectric (SiO2 / HfO2) between heavily doped n+ source/drain wells.",
    workingPrinciple: "Voltage-controlled field effect: gate voltage bends energy bands at the oxide-silicon interface into strong inversion (ψs ≥ 2ψB), forming a conducting 2D electron channel between source and drain.",
    applications: ["Microprocessors & Microcontrollers (28nm+)", "DRAM & Flash Memory Access Transistors", "Digital CMOS Logic"],
    advantages: ["Near-infinite DC input resistance (IG ≈ 0)", "Simple photolithographic manufacturing flow", "Extremely mature compact models (BSIM4)"],
    limitations: ["Severe drain-induced barrier lowering (DIBL) below 28nm", "High subthreshold leakage and punch-through at short channels"],
    layers: [
      { name: "Top Gate Electrode", material: "Polysilicon / TiN Metal Gate", role: "Electrostatic channel potential control", color: "bg-sky-500/20 border-sky-400" },
      { name: "Gate Oxide (tox)", material: "SiO2 / HfO2 (1.2 nm EOT)", role: "Dielectric insulating barrier", color: "bg-amber-500/20 border-amber-400" },
      { name: "Source / Drain Wells", material: "n+ Doped Si (10²⁰ cm⁻³)", role: "Carrier injection and collection terminals", color: "bg-emerald-500/20 border-emerald-400" },
      { name: "P-Substrate Channel", material: "p- Silicon Monocrystal", role: "Conducting inversion path", color: "bg-slate-700/40 border-slate-600" }
    ],
    specs: [
      { label: "Gate Control Geometry", value: "1-Sided (Top Plane)" },
      { label: "Subthreshold Swing (SS)", value: "85 - 110 mV/decade" },
      { label: "DIBL Coefficient", value: "> 100 mV/V (at 28nm)" },
      { label: "Operating VDD", value: "1.0 V - 3.3 V" }
    ]
  },
  {
    id: "finfet",
    name: "FinFET (3D Tri-Gate Transistor)",
    symbol: "Multi-Fin CMOS 3D Gate",
    category: "Multi-Gate 3D",
    generation: "3D Era (2011 - 2022)",
    nodeEra: "22 nm down to 3 nm node",
    terminals: ["Gate (G)", "Drain (D)", "Source (S)"],
    structure: "A thin vertical silicon fin standing upright on the substrate, wrapped on three sides (top, left, right) by the High-k Metal Gate.",
    workingPrinciple: "3-sided electrostatic wrapping pinches the thin channel fin from both vertical sidewalls, drastically suppressing subthreshold leakage and eliminating short-channel drain punch-through.",
    applications: ["Modern Smartphone SoCs", "High-Performance GPUs & AI Accelerators", "Servers & Data Center CPUs (5nm/4nm/3nm)"],
    advantages: ["Steep subthreshold slope (~68 mV/dec)", "Exceptional DIBL reduction (< 45 mV/V)", "High drive current per unit silicon footprint"],
    limitations: ["Drive current quantization: designers can only size transistors by adding discrete fin units (1 fin, 2 fins)", "Fin height aspect ratio etching challenges"],
    layers: [
      { name: "Tri-Gate Wrap", material: "High-k Metal Gate (HKMG TiN/TaN)", role: "Wraps top and two sidewalls of fin", color: "bg-blue-500/20 border-blue-400" },
      { name: "High-k Dielectric", material: "HfO2 / ZrO2 (0.9 nm EOT)", role: "Prevents quantum tunneling", color: "bg-amber-500/20 border-amber-400" },
      { name: "3D Silicon Fin", material: "Monocrystalline Si Fin (Wfin = 6 nm)", role: "Fully depleted conducting channel", color: "bg-cyan-500/20 border-cyan-400" },
      { name: "Shallow Trench Isolation", material: "SiO2 STI Oxide", role: "Electrically isolates adjacent transistor fins", color: "bg-slate-700/40 border-slate-600" }
    ],
    specs: [
      { label: "Gate Control Geometry", value: "3-Sided (Top + 2 Sidewalls)" },
      { label: "Subthreshold Swing (SS)", value: "~68 mV/decade" },
      { label: "DIBL Coefficient", value: "< 45 mV/V" },
      { label: "Effective Channel Width", value: "Weff = 2 · Hfin + Wfin" }
    ]
  },
  {
    id: "gaafet-nanosheet",
    name: "GAAFET (Gate-All-Around Nanosheet)",
    symbol: "All-Around 4-Sided Surround Gate",
    category: "Multi-Gate 3D",
    generation: "Angstrom Era (2022+)",
    nodeEra: "3 nm, 2 nm, A16 & A14 Nodes",
    terminals: ["Gate (G)", "Drain (D)", "Source (S)", "Backside Power (BSPDN)"],
    structure: "Stack of 3 to 4 horizontally suspended silicon nanosheets completely encircled on all four sides by the metal gate electrode.",
    workingPrinciple: "100% perimeter gate wrapping provides the maximum theoretical electrostatic channel control, virtually eliminating drain-induced barrier lowering and allowing VDD to scale below 0.7V.",
    applications: ["Next-Gen 2nm AI Training Processors", "Flagship Mobile APUs", "Exascale Cloud Computing"],
    advantages: ["Near-ideal subthreshold swing (~63 mV/dec)", "Continuously tunable nanosheet width (eliminates fin quantization)", "Backside power delivery network (BSPDN) compatible"],
    limitations: ["Extremely complex selective SiGe/Si superlattice etch", "Inner dielectric spacer lithographic placement tolerances"],
    layers: [
      { name: "All-Around Gate Matrix", material: "High-k Metal Gate (HKMG)", role: "Encloses 100% of sheet perimeter", color: "bg-purple-500/20 border-purple-400" },
      { name: "Stacked Si Nanosheets", material: "Monocrystalline Si (5 nm thick)", role: "Parallel low-leakage channels", color: "bg-cyan-500/20 border-cyan-400" },
      { name: "Inner Spacers", material: "Low-k SiBCN / SiOCN", role: "Minimizes parasitic gate-to-source capacitance", color: "bg-indigo-500/20 border-indigo-400" },
      { name: "Backside Power Rails", material: "Ruthenium / Cu Super-Power-Rails", role: "Zero-IR drop power from wafer backside", color: "bg-amber-500/20 border-amber-400" }
    ],
    specs: [
      { label: "Gate Control Geometry", value: "4-Sided (100% Surround Wrap)" },
      { label: "Subthreshold Swing (SS)", value: "~63 mV/decade (Near theoretical limit)" },
      { label: "Operating VDD", value: "0.65 V - 0.70 V" },
      { label: "DIBL Coefficient", value: "< 25 mV/V" }
    ]
  },
  {
    id: "igbt",
    name: "IGBT (Insulated Gate Bipolar Transistor)",
    symbol: "MOS Gate with BJT Output Stage",
    category: "Power Semiconductors",
    generation: "High-Voltage Power (1980s+)",
    nodeEra: "600 V to 6500 V Power Modules",
    terminals: ["Gate (G)", "Collector (C)", "Emitter (E)"],
    structure: "Monolithic hybrid merging a MOS gate input structure with a high-voltage bipolar p-n-p-n power transistor output stage.",
    workingPrinciple: "MOS gate creates an inversion channel that triggers heavy minority carrier conductivity modulation in the thick n- drift region, resulting in ultra-low on-state saturation voltage at hundreds of amperes.",
    applications: ["Electric Vehicle Traction Inverters", "Wind Turbine Converters", "High-Speed Rail Locomotives", "Industrial Motor Drives"],
    advantages: ["Easy MOS voltage gate drive (low gate power)", "Extremely high current density and low VCE(sat)", "High blocking voltage ratings (up to 6.5 kV)"],
    limitations: ["Current tail during turn-off increases switching losses", "Subject to parasitic thyristor latch-up under overcurrent"],
    layers: [
      { name: "MOS Gate & Dielectric", material: "Polysilicon / Thick SiO2", role: "Voltage-controlled channel trigger", color: "bg-sky-500/20 border-sky-400" },
      { name: "P-Body Region", material: "Boron-doped Silicon", role: "MOS channel and emitter p-n junction", color: "bg-purple-500/20 border-purple-400" },
      { name: "Thick N- Drift Region", material: "Lightly doped Silicon (100 - 500 μm)", role: "High-voltage breakdown blocking", color: "bg-cyan-500/20 border-cyan-400" },
      { name: "P+ Collector Substrate", material: "Heavy P+ Silicon Layer", role: "Injects minority holes for conductivity modulation", color: "bg-emerald-500/20 border-emerald-400" }
    ],
    specs: [
      { label: "Voltage Rating (Vces)", value: "650 V to 6,500 V" },
      { label: "Current Rating (Ic)", value: "50 A to 2,000 A per module" },
      { label: "On-State Drop VCE(sat)", value: "1.4 V - 1.9 V" },
      { label: "Switching Frequency", value: "2 kHz - 30 kHz" }
    ]
  },
  {
    id: "power-mosfet",
    name: "Power MOSFET (Vertical Trench & Superjunction)",
    symbol: "Power MOSFET with Body Diode",
    category: "Power Semiconductors",
    generation: "High-Frequency Power",
    nodeEra: "30 V to 900 V Power Electronics",
    terminals: ["Gate (G)", "Drain (D)", "Source (S)"],
    structure: "Vertical trench gate architecture where current flows vertically through the wafer from top source cells to bottom drain metallization.",
    workingPrinciple: "Majority carrier field-effect conduction without minority carrier storage, enabling megahertz-range high-frequency power switching.",
    applications: ["Server VRM Power Supplies (12V to 1V)", "USB-C Fast Chargers", "Solar Microinverters", "Automotive 48V Mild-Hybrid Systems"],
    advantages: ["No minority carrier storage time (ultra-fast switching > 1 MHz)", "Positive temperature coefficient prevents thermal runaway", "Low gate charge (Qg)"],
    limitations: ["On-resistance (Rds_on) scales sharply with breakdown voltage rating (Rds_on ∝ Vbr^2.5 in conventional silicon)"],
    layers: [
      { name: "Trench Gate Electrode", material: "Recessed Polysilicon Trench", role: "Vertical channel modulation", color: "bg-blue-500/20 border-blue-400" },
      { name: "Source Cells", material: "n+ Silicon", role: "High-current surface contacts", color: "bg-emerald-500/20 border-emerald-400" },
      { name: "Superjunction Drift Pillars", material: "Alternating P/N Silicon Pillars", role: "Charge-balanced high-voltage blocking", color: "bg-amber-500/20 border-amber-400" },
      { name: "Backside Drain Substrate", material: "Heavy N+ Substrate", role: "Bottom drain power terminal", color: "bg-slate-700/40 border-slate-600" }
    ],
    specs: [
      { label: "Voltage Rating (Vds)", value: "30 V to 900 V" },
      { label: "On-State Resistance (Rds_on)", value: "0.8 mΩ to 15 mΩ" },
      { label: "Switching Frequency", value: "100 kHz - 2 MHz" },
      { label: "Gate Charge (Qg)", value: "10 nC - 60 nC" }
    ]
  },
  {
    id: "gan-hemt",
    name: "GaN HEMT (High-Electron-Mobility Transistor)",
    symbol: "Wide Bandgap 2DEG Power Transistor",
    category: "Power Semiconductors",
    generation: "Wide Bandgap (WBG)",
    nodeEra: "650 V Power & 5G/6G RF",
    terminals: ["Gate (G)", "Drain (D)", "Source (S)"],
    structure: "AlGaN/GaN heterostructure grown epitaxially on silicon substrates, exploiting spontaneous and piezoelectric polarization.",
    workingPrinciple: "Polarization discontinuity creates a high-density, ultra-high-mobility Two-Dimensional Electron Gas (2DEG) without intentional dopants, delivering 10× faster power switching than silicon.",
    applications: ["Ultra-Compact GaN Chargers (65W - 240W)", "Electric Vehicle On-Board Chargers (OBC)", "5G/6G RF Base Station Power Amplifiers", "Aerospace Power Units"],
    advantages: ["10× faster switching speed than silicon MOSFETs", "Zero reverse recovery charge (Qrr = 0)", "Operation at extreme temperatures (> 200°C)"],
    limitations: ["Dynamic on-resistance (Ron) increase due to surface electron traps", "Normally-ON (depletion mode) unless p-GaN gate technology is utilized"],
    layers: [
      { name: "p-GaN Gate Stack", material: "p-GaN with TiN Metal", role: "Normally-OFF enhancement mode operation", color: "bg-purple-500/20 border-purple-400" },
      { name: "AlGaN Barrier Layer", material: "Al0.25Ga0.75N (20 nm)", role: "Induces 2DEG via crystal lattice strain", color: "bg-sky-500/20 border-sky-400" },
      { name: "2DEG Electron Sheet", material: "Spontaneous 2D Electron Channel", role: "Ultra-high mobility (μ > 2000 cm²/V·s)", color: "bg-cyan-400/30 border-cyan-300" },
      { name: "GaN Buffer & Si Substrate", material: "GaN on Si (111) / SiC", role: "High-voltage breakdown blocking", color: "bg-slate-700/40 border-slate-600" }
    ],
    specs: [
      { label: "Bandgap Energy (Eg)", value: "3.4 eV (GaN) vs 1.12 eV (Si)" },
      { label: "Critical Breakdown Field", value: "3.3 MV/cm (10× Silicon)" },
      { label: "2DEG Sheet Mobility", value: "> 2,000 cm²/V·s" },
      { label: "Reverse Recovery (Qrr)", value: "0 nC (True zero reverse recovery)" }
    ]
  }
];
