export interface CareerPath {
  id: string;
  title: string;
  category: "Digital VLSI" | "Analog & Mixed-Signal" | "Fab & Manufacturing" | "Systems & Validation" | "Frontier R&D";
  badgeVariant: "teal" | "sky" | "blue" | "purple" | "amber";
  salaryRange: string;
  demandIndex: "Extremely High" | "High" | "Growing";
  overview: string;
  whatYouDo: string[];
  requiredSkills: string[];
  industryTools: string[];
  projectsToBuild: { title: string; desc: string; tools: string }[];
  internshipPrep: string[];
  resumeKeywords: string[];
  interviewTopics: string[];
  entryLevelRoles: string[];
}

export const CAREER_PATHS: CareerPath[] = [
  {
    id: "physical-design",
    title: "Physical Design Engineer",
    category: "Digital VLSI",
    badgeVariant: "purple",
    salaryRange: "$115,000 - $185,000 / yr",
    demandIndex: "Extremely High",
    overview: "Transforms gate-level Verilog netlists into verified silicon layouts (GDSII) ready for foundry fabrication. Manages floorplanning, placement, clock tree synthesis (CTS), routing, and static timing analysis (STA).",
    whatYouDo: [
      "Floorplan chip dies, define core-to-die boundaries, and place hard memory/analog macros.",
      "Design low-IR drop power delivery networks (power rings, stripes, standard cell rails).",
      "Perform Clock Tree Synthesis (CTS) to balance clock skew and minimize clock tree power.",
      "Execute full-chip detailed routing and optimize setup/hold timing slacks across process corners.",
      "Run DRC (Design Rule Check), LVS (Layout Versus Schematic), and IR drop electro-migration signoff."
    ],
    requiredSkills: [
      "Static Timing Analysis (STA) & SDC constraints",
      "Tcl / Python scripting for EDA automation",
      "Understanding of CMOS cell delay, transition times, and crosstalk",
      "DRC / LVS clean layout methodologies"
    ],
    industryTools: ["Synopsys IC Compiler II / Fusion Compiler", "Cadence Innovus", "Synopsys PrimeTime", "Mentor Calibre", "OpenROAD / OpenLane"],
    projectsToBuild: [
      {
        title: "Complete ASIC Physical Design Flow (SkyWater 130nm)",
        desc: "Take a RISC-V core netlist from synthesis through floorplan, placement, CTS, and DRC-clean GDSII generation.",
        tools: "OpenLane / Innovus / Sky130 PDK"
      },
      {
        title: "Tcl Automated Timing Slack Fixer",
        desc: "Script that automatically identifies hold violations and inserts optimal delay buffer pairs.",
        tools: "PrimeTime Tcl API / Python"
      }
    ],
    internshipPrep: [
      "Master setup time (Tclk ≥ Tcq + Tcomb + Tsetup) and hold time equations thoroughly.",
      "Practice writing Tcl scripts to parse timing report files.",
      "Be able to draw and explain Clock Tree Synthesis (H-Tree, Mesh) on a whiteboard."
    ],
    resumeKeywords: ["Physical Design", "STA", "PrimeTime", "Innovus", "CTS", "Setup/Hold Slack", "DRC/LVS", "IR Drop", "SDC Constraints", "Tcl"],
    interviewTopics: [
      "How do you fix a hold violation without breaking setup timing?",
      "Explain the impact of clock skew and jitter on maximum operating frequency.",
      "What causes dynamic IR drop in standard cell rows during clock switching?",
      "How does OCV (On-Chip Variation) affect timing analysis in advanced sub-7nm nodes?"
    ],
    entryLevelRoles: ["Associate Physical Design Engineer", "P&R Engineer", "STA Timing Engineer", "Silicon Implementation Engineer"]
  },
  {
    id: "rtl-verilog-design",
    title: "RTL / Logic Design Engineer",
    category: "Digital VLSI",
    badgeVariant: "blue",
    salaryRange: "$110,000 - $180,000 / yr",
    demandIndex: "Extremely High",
    overview: "Architects and writes hardware description language (Verilog / SystemVerilog) code that defines the digital logic, datapaths, control units, and processors on a silicon chip.",
    whatYouDo: [
      "Design synthesizable digital architectures for AI accelerators, CPU cores, GPU shaders, and peripheral controllers.",
      "Write clean, parameterized SystemVerilog / Verilog RTL code optimized for area, power, and clock speed (PPA).",
      "Design synchronous finite state machines (FSM), FIFO buffers, arbiters, and pipeline registers.",
      "Run linting (SpyGlass), clock domain crossing (CDC) analysis, and basic simulation testbenches."
    ],
    requiredSkills: [
      "Synthesizable Verilog / SystemVerilog HDL",
      "Digital logic design (K-maps, Boolean minimization, FSMs)",
      "Pipelining, hazard handling, and computer architecture",
      "Clock Domain Crossing (CDC) & Reset synchronization"
    ],
    industryTools: ["Synopsys Design Compiler", "Cadence Genus", "Synopsys SpyGlass (CDC/Lint)", "Siemens Questa / ModelSim", "Verilator / Icarus Verilog"],
    projectsToBuild: [
      {
        title: "5-Stage Pipelined 32-bit RISC-V Processor (RV32I)",
        desc: "Implement fetch, decode, execute, memory, and writeback stages with forwarding unit and hazard detection.",
        tools: "SystemVerilog / Verilator / GTKWave"
      },
      {
        title: "AXI4-Lite Master/Slave Memory Controller",
        desc: "Design full AXI bus handshake protocol with burst read/write capabilities and verification testbench.",
        tools: "Verilog / QuestaSim"
      }
    ],
    internshipPrep: [
      "Be prepared to write synthesizable Verilog code on a whiteboard without syntax errors.",
      "Know how to design synchronous vs asynchronous reset flip-flops.",
      "Practice designing a 2-flip-flop synchronizer for multi-clock domain data transfer."
    ],
    resumeKeywords: ["RTL Design", "SystemVerilog", "Verilog", "RISC-V", "AXI Protocol", "Pipelining", "CDC", "FSM", "Synthesis", "PPA Optimization"],
    interviewTopics: [
      "Write Verilog code for a sequence detector that detects '1011' with overlapping states.",
      "Explain the difference between blocking (=) and non-blocking (<=) assignments.",
      "How do you safely transfer a multi-bit signal across asynchronous clock domains?",
      "Design an asynchronous FIFO using Gray code pointers."
    ],
    entryLevelRoles: ["RTL Design Engineer", "Logic Design Engineer", "ASIC Digital Design Engineer", "FPGA Design Engineer"]
  },
  {
    id: "analog-ic-design",
    title: "Analog & Mixed-Signal IC Design Engineer",
    category: "Analog & Mixed-Signal",
    badgeVariant: "purple",
    salaryRange: "$120,000 - $195,000 / yr",
    demandIndex: "High",
    overview: "Designs transistor-level analog circuits that interface with the physical world, including operational amplifiers, bandgap references, ADCs/DACs, PLLs, and RF frontends.",
    whatYouDo: [
      "Design schematic topologies for low-noise op-amps, differential pairs, and current mirrors.",
      "Simulate AC frequency response, transient settling, noise, and Monte Carlo process variations in SPICE.",
      "Design high-speed analog-to-digital converters (SAR ADC, Delta-Sigma ADC) and phase-locked loops (PLL).",
      "Perform precision analog layout: common-centroid matching, dummy transistor insertion, and guard rings."
    ],
    requiredSkills: [
      "MOS transistor small-signal models (gm, ro, Cgs, Cgd)",
      "Negative feedback analysis, phase margin, and Miller frequency compensation",
      "Noise analysis (thermal noise, flicker 1/f noise)",
      "SPICE simulation scripting (Spectre / HSPICE)"
    ],
    industryTools: ["Cadence Virtuoso Schematic Editor", "Cadence Spectre / HSPICE", "Synopsys Custom Compiler", "Cadence ADE-XL", "NGSPICE"],
    projectsToBuild: [
      {
        title: "Two-Stage CMOS Operational Amplifier with Miller Compensation",
        desc: "Design an op-amp with >70dB DC gain, >60° phase margin, and 50MHz unity-gain bandwidth.",
        tools: "Cadence Virtuoso / NGSPICE"
      },
      {
        title: "Curvature-Compensated CMOS Bandgap Voltage Reference",
        desc: "Generate a temperature-independent 1.2V reference stable across -40°C to +125°C.",
        tools: "HSPICE / SkyWater 130nm PDK"
      }
    ],
    internshipPrep: [
      "Be able to derive small-signal voltage gain and output impedance of Common-Source, Common-Gate, and Cascode stages by hand.",
      "Understand why common-centroid layout is essential for differential pair transistor matching."
    ],
    resumeKeywords: ["Analog IC Design", "Cadence Virtuoso", "Spectre", "Op-Amp", "Bandgap Reference", "ADC", "PLL", "Phase Margin", "Miller Compensation", "Monte Carlo"],
    interviewTopics: [
      "Derive the gain and frequency poles of a two-stage Miller compensated CMOS op-amp.",
      "How does channel length modulation (λ) impact the output resistance of a cascode current mirror?",
      "Explain the trade-off between gain-bandwidth product (GBW) and power consumption.",
      "What is the physical origin of flicker (1/f) noise in MOSFETs?"
    ],
    entryLevelRoles: ["Associate Analog Design Engineer", "Mixed-Signal Design Engineer", "Power Management IC (PMIC) Engineer"]
  },
  {
    id: "design-verification",
    title: "Design Verification (DV) Engineer",
    category: "Digital VLSI",
    badgeVariant: "sky",
    demandIndex: "Extremely High",
    salaryRange: "$110,000 - $175,000 / yr",
    overview: "Ensures that digital chip designs function with 100% correctness before sending masks to the multi-million-dollar foundry. Constructs automated verification testbenches using SystemVerilog and UVM.",
    whatYouDo: [
      "Develop constrained-random testbenches and UVM environments (drivers, monitors, scoreboards, sequencers).",
      "Write functional coverage models and SystemVerilog Assertions (SVA) to verify complex corner cases.",
      "Run regression suites on cloud compute farms and debug failing simulation waveforms.",
      "Conduct formal verification using mathematical proofs to detect elusive silicon deadlock bugs."
    ],
    requiredSkills: ["SystemVerilog OOP (Classes, Interfaces, Virtual Methods)", "Universal Verification Methodology (UVM)", "SystemVerilog Assertions (SVA)", "Functional Coverage & Code Coverage"],
    industryTools: ["Synopsys VCS", "Cadence Xcelium", "Siemens QuestaSim", "Synopsys VC Formal", "Python / Perl"],
    projectsToBuild: [
      {
        title: "UVM Verification Testbench for AXI4 Stream FIFO",
        desc: "Build complete UVM environment with constrained-random transaction generation and self-checking scoreboard.",
        tools: "SystemVerilog / UVM / Questa"
      }
    ],
    internshipPrep: ["Learn the UVM testbench hierarchy: uvm_env, uvm_agent, uvm_driver, uvm_monitor, uvm_scoreboard."],
    resumeKeywords: ["Design Verification", "UVM", "SystemVerilog", "Assertions (SVA)", "Functional Coverage", "VCS", "Xcelium", "Constrained-Random", "Regressions"],
    interviewTopics: [
      "Explain the difference between code coverage (line/branch/toggle) and functional coverage.",
      "What is the role of a factory and config_db in UVM?",
      "Write a SystemVerilog constraint to generate unique random prime numbers."
    ],
    entryLevelRoles: ["Design Verification Engineer", "ASIC Verification Engineer", "Emulation Engineer"]
  },
  {
    id: "dft-engineer",
    title: "DFT (Design for Testability) Engineer",
    category: "Digital VLSI",
    badgeVariant: "teal",
    demandIndex: "High",
    salaryRange: "$110,000 - $170,000 / yr",
    overview: "Embeds test circuitry (scan chains, Built-In Self-Test BIST, JTAG, boundary scan) into chips to detect physical manufacturing silicon defects on automated test equipment (ATE).",
    whatYouDo: [
      "Insert scan chains and test compression logic into synthesized gate netlists.",
      "Generate Automatic Test Pattern Generation (ATPG) vectors achieving >99% stuck-at and at-speed fault coverage.",
      "Implement Memory Built-In Self-Test (MBIST) controllers for on-chip SRAM/eDRAM arrays."
    ],
    requiredSkills: ["Scan chain insertion & compression", "ATPG algorithms (D-Algorithm, PODEM)", "JTAG (IEEE 1149.1) standard", "Memory BIST"],
    industryTools: ["Synopsys DFTMAX / TetraMAX", "Cadence Modus", "Siemens Tessent"],
    projectsToBuild: [
      {
        title: "Boundary Scan & JTAG TAP Controller in Verilog",
        desc: "Design 16-state JTAG TAP controller with instruction register (BYPASS, EXTEST, SAMPLE).",
        tools: "Verilog / ModelSim"
      }
    ],
    internshipPrep: ["Understand stuck-at-0, stuck-at-1, transition, and path delay fault models."],
    resumeKeywords: ["DFT", "ATPG", "Scan Chains", "TetraMAX", "Tessent", "MBIST", "JTAG", "Fault Coverage", "ATE"],
    interviewTopics: [
      "How does scan chain insertion convert sequential sequential circuits into combinational logic for testing?",
      "Explain the difference between stuck-at fault testing and at-speed transition testing."
    ],
    entryLevelRoles: ["DFT Engineer", "Testability Engineer", "Silicon Test Development Engineer"]
  },
  {
    id: "device-engineering",
    title: "Device Engineer / Transistor Physicist",
    category: "Fab & Manufacturing",
    badgeVariant: "teal",
    demandIndex: "High",
    salaryRange: "$115,000 - $180,000 / yr",
    overview: "Simulates, characterizes, and optimizes semiconductor transistor physics, threshold voltages, doping profiles, and quantum electrostatics for next-generation technology nodes.",
    whatYouDo: [
      "Perform TCAD (Technology Computer-Aided Design) 2D/3D physics simulations of FinFETs, GAAFETs, and wide bandgap devices.",
      "Extract compact SPICE model parameters (BSIM-CMG, BSIM-BULK) from experimental fab wafer measurements.",
      "Analyze subthreshold swing, DIBL, gate tunneling leakage, and hot-carrier degradation."
    ],
    requiredSkills: ["Semiconductor device physics & quantum electrostatics", "TCAD simulation (Sentaurus / Silvaco)", "Compact model parameter extraction (BSIM)", "Wafer probestation electrical characterization"],
    industryTools: ["Synopsys Sentaurus TCAD", "Silvaco Atlas / Athena", "Keysight ICCAP", "MATLAB / Python"],
    projectsToBuild: [
      {
        title: "Sentaurus TCAD Simulation of 3nm GAAFET Nanosheet",
        desc: "Model 4-sided gate electrostatic control, quantization, and I-V transfer curves.",
        tools: "TCAD / Python"
      }
    ],
    internshipPrep: ["Be fluent with 1D Poisson's equation, Schrödinger-Poisson self-consistent solvers, and Boltzmann transport."],
    resumeKeywords: ["Device Engineering", "TCAD", "Sentaurus", "BSIM", "GAAFET", "FinFET", "DIBL", "Threshold Voltage", "Device Physics"],
    interviewTopics: [
      "How does quantum confinement affect the effective bandgap and threshold voltage in sub-5nm nanosheets?",
      "Explain the physical mechanisms of Drain-Induced Barrier Lowering (DIBL)."
    ],
    entryLevelRoles: ["Device Engineer", "TCAD Modeling Engineer", "Compact Modeling Engineer"]
  },
  {
    id: "process-engineering",
    title: "Semiconductor Process Engineer",
    category: "Fab & Manufacturing",
    badgeVariant: "amber",
    demandIndex: "Extremely High",
    salaryRange: "$100,000 - $165,000 / yr",
    overview: "Operates in cleanroom wafer fabs optimizing chemical and physical processing modules: photolithography, dry etch, thin-film ALD/CVD, ion implantation, and chemical-mechanical polishing (CMP).",
    whatYouDo: [
      "Optimize EUV photolithography dose, focus, and critical dimension (CD) uniformity across 300mm silicon wafers.",
      "Tune plasma reactive ion etching (RIE) gas ratios for nanometer-scale feature vertical anisotropy.",
      "Troubleshoot wafer yield excursions and analyze defect inspection scans (KLA-Tencor)."
    ],
    requiredSkills: ["Cleanroom processing & safety", "Statistical Process Control (SPC) & Design of Experiments (DOE)", "Thin film physics (ALD, CVD, PVD)", "Plasma etching & lithography"],
    industryTools: ["KLA Klarity", "JMP / Minitab (Statistical analysis)", "ASML Litho simulators", "SEM / TEM metrology"],
    projectsToBuild: [
      {
        title: "Statistical Yield Optimization Study using DOE",
        desc: "Design full-factorial experiment optimizing RIE etch gas pressure and RF power for minimal sidewall roughness.",
        tools: "JMP / Python"
      }
    ],
    internshipPrep: ["Understand the difference between wet isotropic etching and dry anisotropic plasma etching."],
    resumeKeywords: ["Process Engineering", "Cleanroom", "Photolithography", "EUV", "Etch (RIE)", "ALD", "CVD", "CMP", "SPC", "Yield"],
    interviewTopics: [
      "Explain the Rayleigh resolution equation in optical lithography.",
      "What is the difference between physical sputtering (PVD) and chemical vapor deposition (CVD)?"
    ],
    entryLevelRoles: ["Process Engineer", "Photolithography Engineer", "Etch Process Engineer", "Thin Films Engineer"]
  },
  {
    id: "packaging-3d-integration",
    title: "Advanced Packaging & 3D Integration Engineer",
    category: "Fab & Manufacturing",
    badgeVariant: "blue",
    demandIndex: "Extremely High",
    salaryRange: "$110,000 - $175,000 / yr",
    overview: "Designs and implements 2.5D/3D multi-die chiplet packaging, silicon interposers (CoWoS), high-bandwidth memory (HBM) stacking, and hybrid copper bonding.",
    whatYouDo: [
      "Design silicon interposers, redistribution layers (RDL), and micro-bump interconnects for heterogeneous multi-chiplet modules.",
      "Simulate thermal dissipation, thermo-mechanical stress, and warpage in multi-die stacks.",
      "Model signal integrity (SI) and power integrity (PI) across ultra-dense chip-to-chip interfaces (UCIe standard)."
    ],
    requiredSkills: ["2.5D/3D packaging architectures (CoWoS, EMIB, SoIC)", "Thermal and mechanical stress modeling (FEA)", "Signal & Power Integrity (SI/PI)", "UCIe / high-speed interconnect protocols"],
    industryTools: ["Ansys HFSS / Icepak / SIwave", "Cadence Allegro Package Designer (APD)", "Synopsys 3DIC Compiler"],
    projectsToBuild: [
      {
        title: "Thermal & SI Modeling of 4-Die Chiplet on Silicon Interposer",
        desc: "Simulate thermal hotspots and high-speed eye diagrams across micro-bump interconnects.",
        tools: "Ansys HFSS / Icepak"
      }
    ],
    internshipPrep: ["Learn the differences between traditional wire-bonding, flip-chip BGA, 2.5D interposers, and 3D direct hybrid bonding."],
    resumeKeywords: ["Advanced Packaging", "3D-IC", "CoWoS", "Chiplets", "Interposer", "UCIe", "Thermal FEA", "Ansys HFSS", "Signal Integrity"],
    interviewTopics: [
      "Why are modern AI processors migrating from monolithic dies to heterogeneous chiplet packaging?",
      "How do Through-Silicon Vias (TSVs) enable high-bandwidth memory (HBM) vertical stacking?"
    ],
    entryLevelRoles: ["Packaging Engineer", "3D-IC Design Engineer", "Signal Integrity Engineer"]
  }
];
