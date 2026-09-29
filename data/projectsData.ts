export interface SemiconductorProject {
  id: string;
  title: string;
  category: "Digital VLSI / RTL" | "Analog SPICE" | "Physical Design (P&R)" | "Device TCAD" | "Open-Source PDK";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  badgeVariant: "teal" | "sky" | "blue" | "purple" | "amber";
  duration: string;
  description: string;
  architectureDetails: string[];
  deliverables: string[];
  toolsUsed: string[];
  githubReady: boolean;
}

export const SEMICONDUCTOR_PROJECTS: SemiconductorProject[] = [
  {
    id: "riscv-5stage-core",
    title: "5-Stage Pipelined RV32I Processor with Forwarding",
    category: "Digital VLSI / RTL",
    difficulty: "Advanced",
    badgeVariant: "purple",
    duration: "25 Hours",
    description: "Design, verify, and synthesize a complete 32-bit RISC-V integer core (RV32I) featuring fetch, decode, execute, memory, and writeback pipeline stages, data hazard forwarding unit, and branch prediction.",
    architectureDetails: [
      "Harvard architecture with separate instruction and data memory buses",
      "Hazard detection unit that stalls load-use dependencies automatically",
      "ALU supporting 37 base integer instructions including branch and jump targets",
      "Full SystemVerilog testbench running compliance tests and Dhrystone benchmarks"
    ],
    deliverables: [
      "Synthesizable SystemVerilog RTL modules",
      "Automated Verilator C++ testbench harness",
      "Waveform execution dumps (VCD/FST) in GTKWave",
      "Gate-level synthesis timing report in Yosys"
    ],
    toolsUsed: ["SystemVerilog", "Verilator", "GTKWave", "Yosys Open Synthesis"],
    githubReady: true
  },
  {
    id: "cmos-two-stage-opamp",
    title: "Two-Stage CMOS Op-Amp with Miller Compensation (130nm)",
    category: "Analog SPICE",
    difficulty: "Intermediate",
    badgeVariant: "blue",
    duration: "18 Hours",
    description: "Design, size, and simulate a two-stage operational transconductance amplifier in SkyWater 130nm PDK achieving >72dB DC open-loop gain, >65° phase margin, and 60MHz unity gain bandwidth.",
    architectureDetails: [
      "Differential input pair with active PMOS current mirror load",
      "Common-Source second stage with active NMOS current source",
      "Miller pole-splitting capacitor (Cc) and nulling resistor (Rz) to eliminate right-half-plane zero",
      "Monte Carlo mismatch simulation across TT, FF, SS process corners"
    ],
    deliverables: [
      "SPICE schematic and subcircuit netlist (.sp / .cir)",
      "Bode plots for magnitude and phase margin",
      "CMRR, PSRR, and slew rate characterization tables",
      "Transient step response settling time verification"
    ],
    toolsUsed: ["NGSPICE / Xschem", "SkyWater 130nm PDK", "Python matplotlib"],
    githubReady: true
  },
  {
    id: "asic-tapeout-sky130",
    title: "Complete ASIC Physical Tape-out Flow: OpenLane to GDSII",
    category: "Open-Source PDK",
    difficulty: "Advanced",
    badgeVariant: "purple",
    duration: "20 Hours",
    description: "End-to-end silicon implementation taking a parameterized UART/SPI crypto peripheral through logic synthesis, floorplanning, placement, clock tree synthesis (CTS), routing, and DRC/LVS signoff.",
    architectureDetails: [
      "OpenLane ASIC physical design automated flow",
      "Power distribution network (PDN) with 1.8V standard cell rails",
      "Static timing analysis signoff using OpenSTA at 50MHz clock rate",
      "Magic DRC and Netgen LVS zero-violation silicon tape-out package"
    ],
    deliverables: [
      "Production-ready GDSII mask layout file",
      "DEF and LEF physical layout views",
      "OpenSTA timing slack reports (setup/hold slacks > +0.5 ns)",
      "OpenLane configuration .json scripts"
    ],
    toolsUsed: ["OpenLane", "OpenROAD", "Magic VLSI", "Netgen LVS", "Sky130 PDK"],
    githubReady: true
  },
  {
    id: "bandgap-reference-circuit",
    title: "Curvature-Compensated Bandgap Voltage Reference",
    category: "Analog SPICE",
    difficulty: "Advanced",
    badgeVariant: "teal",
    duration: "15 Hours",
    description: "Design a temperature-independent 1.205V reference circuit combining CTAT voltage (Vbe of BJT) and PTAT voltage (ΔVbe across scaled BJT pair) for precision ADC bias.",
    architectureDetails: [
      "Brokaw cell / Widlar bandgap core with 8:1 BJT area ratio",
      "Self-biased start-up circuit preventing zero-current metastable state",
      "Temperature coefficient < 15 ppm/°C across -40°C to +125°C",
      "Supply voltage rejection ratio (PSRR) > 55dB at 100kHz"
    ],
    deliverables: [
      "Temperature sweep curves across process corners",
      "Start-up circuit transient turn-on waveforms",
      "Sensitivity analysis with respect to resistor matching"
    ],
    toolsUsed: ["Cadence Virtuoso / NGSPICE", "SkyWater 130nm PDK"],
    githubReady: true
  }
];
