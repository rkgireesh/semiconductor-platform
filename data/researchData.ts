export interface ResearchPaper {
  id: string;
  title: string;
  category: "Advanced Devices" | "Process Technology" | "VLSI & Compute" | "Wide Bandgap & Power" | "AI Hardware" | "Quantum Semiconductors";
  badgeVariant: "teal" | "sky" | "blue" | "purple" | "amber";
  year: string;
  source: string;
  abstract: string;
  keyInnovations: string[];
  impact: string;
  metrics: { label: string; value: string }[];
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "sub-2nm-gaafet-forksheet",
    title: "Sub-2nm Nanosheet & Forksheet Transistor Architectures",
    category: "Advanced Devices",
    badgeVariant: "purple",
    year: "2025-2026",
    source: "IEEE IEDM / Imec Advanced Node Consortium",
    abstract: "Investigates vertical dielectric wall separation in Forksheet FETs, shrinking n-to-p spacing from 50nm down to 17nm and reducing standard cell track heights while preserving drive current.",
    keyInnovations: [
      "Dielectric barrier wall separating NMOS and PMOS nanosheets",
      "Standard cell height reduction from 6-track down to 4.5-track",
      "Inner spacer capacitance reduction using low-k SiBCN"
    ],
    impact: "Enables continued Moore's Law density scaling beyond 2nm node without requiring extreme EUV double-patterning.",
    metrics: [
      { label: "N-to-P Separation", value: "17 nm (vs 50 nm in FinFET)" },
      { label: "Subthreshold Swing", value: "62.4 mV/dec" },
      { label: "Cell Area Savings", value: "24%" }
    ]
  },
  {
    id: "high-na-euv-lithography",
    title: "High-NA EUV (0.55 NA) Stochastic Defect Mitigation",
    category: "Process Technology",
    badgeVariant: "amber",
    year: "2025-2026",
    source: "ASML / SPIE Advanced Lithography",
    abstract: "Examines optical anamorphic magnification and inorganic metal-oxide resists (MOx) for single-exposure patterning of 8nm half-pitch interconnects.",
    keyInnovations: [
      "Anamorphic lens system (4× horizontal, 8× vertical magnification)",
      "Metal oxide photoresists reducing line-edge roughness (LER)",
      "Single-exposure printability for 16nm pitch metal lines"
    ],
    impact: "Replaces multi-patterning EUV with single-exposure High-NA EUV, cutting mask cycle times by 35%.",
    metrics: [
      { label: "Numerical Aperture", value: "0.55 NA (vs 0.33 NA standard)" },
      { label: "Resolution Limit (CD)", value: "8 nm Half-Pitch" },
      { label: "Exposure Dose", value: "38 mJ/cm²" }
    ]
  },
  {
    id: "backside-power-bspdn",
    title: "Backside Power Delivery (BSPDN) & Buried Power Rails",
    category: "VLSI & Compute",
    badgeVariant: "blue",
    year: "2025-2026",
    source: "IEEE ISSCC / Intel & TSMC Technology Symposium",
    abstract: "Decouples power distribution from signal routing by manufacturing Nano-Through-Silicon-Vias (nTSVs) from the backside of the thinned wafer, completely eliminating power grid routing congestion on the front side.",
    keyInnovations: [
      "Wafer thinning down to < 500 nm remaining substrate",
      "Direct power delivery to standard cell transistor source/drain terminals",
      "Front-side metal layers dedicated 100% to clock and logic signal routing"
    ],
    impact: "Reduces IR drop by over 30% and increases maximum operating frequency in AI accelerators by 6-10%.",
    metrics: [
      { label: "IR Drop Reduction", value: "32%" },
      { label: "Die Area Scaling", value: "15 - 20%" },
      { label: "Frequency Uplift", value: "+8.5% at same VDD" }
    ]
  },
  {
    id: "2d-monolayer-transistor-tmd",
    title: "2D Transition Metal Dichalcogenide (MoS2/WS2) Atomic Channel FETs",
    category: "Advanced Devices",
    badgeVariant: "teal",
    year: "2025-2026",
    source: "Nature Nanotechnology / Stanford Nanoelectronics Lab",
    abstract: "Demonstrates sub-1nm physical channel length transistors using monolayer MoS2 (0.65 nm thickness) with semimetallic Bismuth/Antimony contact resistance below 120 Ω·μm.",
    keyInnovations: [
      "Atomically pristine 2D semiconductor channels without dangling bonds",
      "Immunity to short-channel effect drain punch-through at Lg < 3 nm",
      "Low-temperature BEOL (Back-End-of-Line) 3D monolithic transistor integration"
    ],
    impact: "Paves the way for 3D monolithic logic stacking directly inside the interconnect metallization stack.",
    metrics: [
      { label: "Channel Thickness", value: "0.65 nm (1 Monolayer)" },
      { label: "Contact Resistance", value: "115 Ω·μm" },
      { label: "ON/OFF Current Ratio", value: "> 10⁸" }
    ]
  },
  {
    id: "gan-on-diamond-power",
    title: "GaN-on-Diamond High-Power RF & Inverter Transistors",
    category: "Wide Bandgap & Power",
    badgeVariant: "teal",
    year: "2025-2026",
    source: "IEEE Transactions on Power Electronics",
    abstract: "Direct chemical bonding of AlGaN/GaN heterostructures onto synthetic CVD polycrystalline diamond substrates (thermal conductivity > 1500 W/m·K) to eradicate thermal hotspots.",
    keyInnovations: [
      "Synthetic diamond heat-spreading substrate (5× higher thermal conductivity than SiC)",
      "Low-loss atomic transition interlayer",
      "Operation at current densities exceeding 3.5 A/mm"
    ],
    impact: "Unlocks 3× higher power density in satellite phased-array radars and aerospace electric propulsion.",
    metrics: [
      { label: "Substrate Thermal K", value: "1,800 W/m·K" },
      { label: "Power Density", value: "18.5 W/mm at 28 GHz" },
      { label: "Operating Temp", value: "> 250 °C Stable" }
    ]
  },
  {
    id: "cryo-cmos-quantum",
    title: "Cryogenic CMOS Readout Controllers for Superconducting Quantum Qubits",
    category: "Quantum Semiconductors",
    badgeVariant: "sky",
    year: "2025-2026",
    source: "IEEE Journal of Solid-State Circuits (JSSC)",
    abstract: "Integrated mixed-signal ASIC operating at 4 Kelvin inside a dilution refrigerator to control and measure hundreds of superconducting transmon qubits with milliwatt power budgets.",
    keyInnovations: [
      "Transistor models calibrated for carrier freeze-out and high mobility at 4 K",
      "Low-noise analog front-ends with sub-1 dB noise figures",
      "Direct microwave frequency synthesis without external coaxial cabling"
    ],
    impact: "Solves the quantum computing wiring bottleneck by placing the control chip directly adjacent to the quantum processor.",
    metrics: [
      { label: "Operating Temp", value: "4.0 Kelvin" },
      { label: "Qubit Control Channels", value: "64 Channels per ASIC" },
      { label: "Power Dissipation", value: "< 2.5 mW per Channel" }
    ]
  }
];
