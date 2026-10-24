import { FullLessonData } from "./types";

export const COURSE_6_LESSONS: Record<string, FullLessonData> = {
  "vlsi-rtl-to-gdsii": {
    id: "vlsi-rtl-to-gdsii",
    courseId: "vlsi-chip-design",
    title: "The ASIC Flow: From Verilog Specification to GDSII",
    duration: "65 min",
    difficulty: "Intermediate",
    tag: "ASIC DESIGN",
    summary: "Journey through the end-to-end digital ASIC physical implementation flow: RTL synthesis, technology mapping, floorplanning, placement, CTS, routing, and tape-out sign-off.",
    learningObjectives: [
      "Navigate the sequential stages of the digital ASIC design flow from Verilog specification to foundry tape-out.",
      "Understand the role of standard cell libraries (.lib), design exchange format (.lef), and timing constraints (.sdc).",
      "Differentiate logical equivalence checking (LEC) from structural physical verification (DRC/LVS)."
    ],
    keyFormulas: [
      {
        label: "Logic Gate Density",
        formula: "Gates / mm² = Total Transistor Count / (4 · Core Area)",
        desc: "Metric of architectural silicon packing density based on standard 2-input NAND gate equivalents."
      },
      {
        label: "Wireload Estimation",
        formula: "HPWL = (X_max - X_min) + (Y_max - Y_min)",
        desc: "Half-Perimeter Wirelength heuristic used during early placement to predict interconnect delay."
      }
    ],
    sections: [
      {
        title: "1. The Front-End: RTL to Gate-Level Netlist",
        content: [
          "The ASIC implementation flow translates behavioral human ideas into physical patterns on silicon.",
          "Designers author synthesizable hardware description code in SystemVerilog or VHDL, verified against architectural specifications using testbenches and UVM.",
          "Logic Synthesis (e.g. Synopsys Design Compiler, Cadence Genus) parses RTL, performs Boolean logic minimization (And-Inverter Graphs), and maps abstract gates into physical standard cells chosen from foundry Liberty (.lib) timing and power characterization libraries, generating a gate-level netlist."
        ]
      },
      {
        title: "2. The Back-End: Place and Route (P&R) to GDSII",
        content: [
          "Floorplanning: Establishes die dimensions, I/O pads, large macro placement (SRAMs, PLLs), and synthesizes the power delivery grid (VDD/VSS stripes).",
          "Placement: Algorithmic placement engines position millions of standard cells to minimize wirelength and congestion while avoiding cell overlaps.",
          "Clock Tree Synthesis (CTS): Inserts balanced buffer networks to distribute reference clock edges with minimum skew and insertion delay.",
          "Detailed Routing: Global and track maze-routing engines connect signal pins across 12 to 18 metal layers according to strict design rules.",
          "Tape-Out: Once timing (STA), electrical (IR drop), and geometric (DRC/LVS) rules are clean, layout database format GDSII or OASIS is generated and transmitted to the foundry masks cleanroom!"
        ],
        callout: {
          type: "design",
          title: "Modern Tape-Out Cost",
          text: "A single set of 3nm EUV lithography photomasks costs over $30 Million USD, making right-first-time verification and rigorous sign-off an existential necessity."
        }
      }
    ],
    checkpoint: {
      question: "Which file format is delivered by foundries to provide physical dimension, boundary, and pin obstruction geometries of standard cells without revealing confidential internal doping layers?",
      options: [
        "Liberty (.lib) format",
        "Library Exchange Format (.lef)",
        "Synopsys Design Constraints (.sdc)",
        "Value Change Dump (.vcd)"
      ],
      correctIndex: 1,
      explanation: "LEF (Library Exchange Format) contains abstract physical representations (cell boundaries, pin locations, and metal layer blockages) needed by place-and-route tools, keeping proprietary transistor doping physics secret."
    },
    keyTakeaways: [
      "The ASIC flow cleanly divides into front-end logic design/synthesis and back-end physical implementation.",
      "Synthesis technology-maps RTL into foundry standard cell libraries characterized in .lib format.",
      "The final tape-out deliverable sent to the mask shop is encoded in GDSII or OASIS format."
    ],
    practicalApplications: [
      "Commercial ASIC tape-outs (Synopsys IC Compiler II, Cadence Innovus)",
      "Open-source silicon tape-outs using OpenLane and SkyWater 130nm PDK",
      "Digital signal processor microarchitecture implementation"
    ],
    relatedResearchTopicId: "rtl-design-synthesis-logic-optimization",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "sequential-latches-flipflops",
    nextLessonId: "static-timing-analysis-constraints"
  },
  "static-timing-analysis-constraints": {
    id: "static-timing-analysis-constraints",
    courseId: "vlsi-chip-design",
    title: "Static Timing Analysis (STA) & SDC Constraints",
    duration: "75 min",
    difficulty: "Advanced",
    tag: "TIMING SIGN-OFF",
    summary: "Formulate vectorless Static Timing Analysis (STA), Synopsys Design Constraints (SDC), setup/hold slack, clock skew, jitter, and on-chip variation (OCV/POCV).",
    learningObjectives: [
      "Write accurate clock, input delay, and output delay constraints in SDC format.",
      "Calculate setup slack (max path) and hold slack (min path) across complex combinational logic cones.",
      "Understand Parametric On-Chip Variation (POCV) statistical derating to avoid over-pessimism."
    ],
    keyFormulas: [
      {
        label: "Setup Slack Equation",
        formula: "Setup Slack = (T_period + T_skew) - (t_cq + t_logic,max + t_setup) - Jitter",
        desc: "Must be ≥ 0 ps across all slow/cold/hot PVT corners to prevent frequency capping."
      },
      {
        label: "Hold Slack Equation",
        formula: "Hold Slack = (t_cq + t_logic,min) - (t_hold + T_skew)",
        desc: "Must be ≥ 0 ps across fast/cold corners to prevent catastrophic functional failure."
      },
      {
        label: "Statistical Delay (POCV)",
        formula: "Delay = D_nominal · [ 1 + C_sigma · σ ]",
        desc: "Gaussian variation distribution accounting for independent atomistic process variation."
      }
    ],
    sections: [
      {
        title: "1. Vectorless Timing Verification Principle",
        content: [
          "Dynamic simulation tests circuit timing by applying input test vectors, but verifying every state combination in a 64-bit ALU would take billions of years.",
          "Static Timing Analysis (STA, e.g. PrimeTime, Tempus) breaks sequential designs into distinct timing paths: Register-to-Register, Input-to-Register, Register-to-Output, and Input-to-Output.",
          "STA traces every single path, calculating propagation delay through cells and parasitic interconnect RC networks to find the worst-case maximum delay and minimum delay without requiring vector simulation."
        ]
      },
      {
        title: "2. Setup vs Hold Constraints and SDC",
        content: [
          "Synopsys Design Constraints (.sdc) define system intent: create_clock -period 1.0 -name CLK [get_ports clk], set_input_delay, set_output_delay, and set_false_path.",
          "Setup Check (Max Delay): Validates that data launched from Reg A arrives at Reg B before the next clock edge minus setup time. If setup slack is negative, the chip cannot run at target clock frequency.",
          "Hold Check (Min Delay): Validates that data launched from Reg A does not arrive so fast that it corrupts the currently sampled data before hold time expires. If hold slack is negative, the chip fails at ANY clock frequency!",
          "Fixing Violations: Setup violations are fixed by upsizing drivers, inserting buffers, or logic restructuring. Hold violations are fixed by deliberately inserting delay delay-buffers along the fast path."
        ],
        callout: {
          type: "design",
          title: "On-Chip Variation (OCV)",
          text: "Transistors on opposite sides of a 20mm reticle die experience different local temperatures, supply voltages, and dopant variations. POCV uses statistical Gaussian variation to prevent design over-conservatism."
        }
      }
    ],
    checkpoint: {
      question: "If a circuit path has clock period T = 1000 ps, clock skew = 50 ps, t_cq = 150 ps, t_logic,max = 700 ps, t_setup = 100 ps, and jitter = 20 ps, what is the Setup Slack?",
      options: [
        "+80 ps (Meeting timing)",
        "-20 ps (Setup timing violation)",
        "+150 ps (Meeting timing)",
        "+30 ps (Meeting timing)"
      ],
      correctIndex: 0,
      explanation: "Required arrival time = T + skew - t_setup - jitter = 1000 + 50 - 100 - 20 = 930 ps. Data arrival time = t_cq + t_logic,max = 150 + 700 = 850 ps. Setup Slack = Required - Arrival = 930 - 850 = +80 ps (Pass)."
    },
    keyTakeaways: [
      "STA validates maximum (setup) and minimum (hold) timing across all possible paths without vectors.",
      "SDC files establish golden timing constraints for synthesis and physical implementation.",
      "Hold violations must be fixed prior to tape-out by inserting delay buffers on fast paths."
    ],
    practicalApplications: [
      "Automated timing closure in Synopsys PrimeTime and Cadence Tempus",
      "High-speed DDR5 memory interface timing budget sign-off",
      "Automotive ASIL-D multi-corner temperature (-40°C to 125°C) timing sign-off"
    ],
    relatedResearchTopicId: "static-timing-analysis-sta-pocv-si",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "vlsi-rtl-to-gdsii",
    nextLessonId: "floorplanning-power-grid"
  },
  "floorplanning-power-grid": {
    id: "floorplanning-power-grid",
    courseId: "vlsi-chip-design",
    title: "Floorplanning, Core Utilization & Power Grid (IR Drop)",
    duration: "60 min",
    difficulty: "Advanced",
    tag: "PHYSICAL DESIGN",
    summary: "Master hierarchical floorplanning, aspect ratios, macro placement halos, standard cell core utilization, and robust VDD/VSS power mesh synthesis for IR-drop integrity.",
    learningObjectives: [
      "Calculate core area from gate count and target core utilization (typically 65% - 75%).",
      "Apply macro placement strategies, halos, and routing channel clearances for large memory SRAMs.",
      "Design multi-tier VDD/VSS power meshes to maintain static and dynamic IR drop below 2% of nominal voltage."
    ],
    keyFormulas: [
      {
        label: "Core Utilization Factor",
        formula: "Utilization = (Total Standard Cell Area + Macro Area) / Core Area",
        desc: "Design density ratio; excessive utilization (> 85%) leads to unresolvable routing congestion."
      },
      {
        label: "Static IR Voltage Drop",
        formula: "V_drop = I_avg · R_mesh",
        desc: "DC voltage degradation across resistive metal power stripes from supply bumps to transistors."
      },
      {
        label: "Dynamic L·di/dt Drop",
        formula: "ΔV_inductive = L_package · (di / dt)",
        desc: "Transient ground bounce voltage spike caused by simultaneous switching of millions of transistors."
      }
    ],
    sections: [
      {
        title: "1. Macro Placement and Floorplanning Heuristics",
        content: [
          "Floorplanning is the most critical decision in physical design; a flawed floorplan guarantees timing failure and routing congestion.",
          "Large hard macros (e.g. SRAM register files, caches, PLLs, analog PHYs) must be pushed to the die periphery, facing outward to keep the central core clear for standard cell routing.",
          "Keep-out Halos: Placement blockages surrounding macros prevent standard cells from packing tightly against memory pins, ensuring sufficient routing access channels.",
          "Aspect Ratio and Die Sizing: Dictated by pad count limits (pad-limited designs) or internal gate count (core-limited designs)."
        ]
      },
      {
        title: "2. Power Mesh Synthesis and IR Drop Integrity",
        content: [
          "Modern processors draw peak currents exceeding 100 Amperes at sub-1.0V supply voltages. Even 5 milliohms of power grid resistance causes fatal supply drops!",
          "Static IR Drop: Steady-state resistive loss in the metal stripes reducing the local voltage delivered to transistors, slowing down gate switching speed.",
          "Dynamic IR Drop: High-frequency transient current spikes occurring when millions of clock buffers switch simultaneously on the clock edge.",
          "Power Mesh Architecture: Thick, low-resistance top metal layers (M10, M11) carry wide VDD/VSS stripes that feed down through dense via arrays into finer intermediate metal stripes, terminating on standard cell M1 rails."
        ],
        callout: {
          type: "design",
          title: "Decoupling Capacitors (Decaps)",
          text: "Physical designers fill empty white-space with Decoupling Capacitor (Decap) cells—on-chip MOS capacitors that act as local charge reservoirs to suppress dynamic L·di/dt ground bounce spikes!"
        }
      }
    ],
    checkpoint: {
      question: "Why are large memory macros (SRAMs) pushed to the die periphery during floorplanning rather than placed in the center of the chip?",
      options: [
        "Because memories must receive sunlight",
        "To leave a continuous, contiguous central core area for standard cell placement and avoid fragmented routing channels",
        "Because SRAMs cannot conduct electricity in the center",
        "To make the chip heavier on the sides"
      ],
      correctIndex: 1,
      explanation: "Placing macros in the center fragments the routing space, causing severe routing congestion and long detour wires. Pushing macros to die edges keeps the core region unified and contiguous for standard cell logic."
    },
    keyTakeaways: [
      "Floorplanning sets die area, macro placement, I/O pin assignments, and power delivery grids.",
      "Core utilization is balanced between 65% and 75% to preserve routing track channels.",
      "Robust power grids combine multi-layer metal meshes and decoupling capacitors to eliminate IR drop."
    ],
    practicalApplications: [
      "AI GPU and multi-core CPU physical floorplanning",
      "Power integrity sign-off using Ansys RedHawk and Cadence Voltus",
      "Decap cell optimization for simultaneous switching noise suppression"
    ],
    relatedResearchTopicId: "floorplanning-power-grid-pin-assignment",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "static-timing-analysis-constraints",
    nextLessonId: "clock-tree-synthesis-routing"
  },
  "clock-tree-synthesis-routing": {
    id: "clock-tree-synthesis-routing",
    courseId: "vlsi-chip-design",
    title: "Clock Tree Synthesis (CTS) & Detailed Routing",
    duration: "70 min",
    difficulty: "Advanced",
    tag: "PHYSICAL IMPLEMENTATION",
    summary: "Synthesize balanced clock distribution trees, minimize skew and insertion delay, leverage intentional useful skew, and execute multi-layer detailed track routing.",
    learningObjectives: [
      "Analyze symmetric H-Tree vs mesh clock distribution network architectures.",
      "Understand clock skew balancing and insertion delay minimization.",
      "Execute multi-layer detailed track maze routing with cross-talk noise shielding."
    ],
    keyFormulas: [
      {
        label: "Clock Skew Definition",
        formula: "T_skew = t_clock,arrival(Reg B) - t_clock,arrival(Reg A)",
        desc: "Difference in reference clock edge arrival times between communicating flip-flops."
      },
      {
        label: "Crosstalk Coupling Capacitance",
        formula: "ΔV_victim = VDD · [ C_coupling / (C_ground + C_coupling) ]",
        desc: "Capacitive noise glitch induced on a victim net by a concurrently switching aggressor net."
      }
    ],
    sections: [
      {
        title: "1. Clock Tree Synthesis (CTS) Engineering",
        content: [
          "Prior to CTS, the clock is treated as an idealized zero-delay signal. In silicon, distributing a clock edge to 2 million flip-flops across a 15mm die creates immense insertion delay.",
          "Clock Tree Synthesis inserts a balanced hierarchy of dedicated, low-skew clock buffers.",
          "Symmetric H-Tree: Perfect geometric symmetry matching wire lengths to every quadrant, delivering near-zero skew at the expense of higher routing area.",
          "Clock Mesh: High-speed grid driven by parallel drivers; delivers the lowest jitter and highest variation tolerance for gigahertz microprocessors, but consumes up to 30% of total dynamic power."
        ]
      },
      {
        title: "2. Detailed Track Routing & Crosstalk Mitigation",
        content: [
          "Once the clock tree is built, signal nets are routed using gridded track routing engines (e.g. Lee's maze router, Dijkstra algorithms).",
          "Routing alternates directions by layer: Metal 1 Horizontal, Metal 2 Vertical, Metal 3 Horizontal, etc., to minimize parallel wire overlap.",
          "Crosstalk Noise & Glitch: In sub-7nm BEOL stacks, vertical metal aspect ratios (> 2:1) cause lateral coupling capacitance Cc between adjacent parallel wires to exceed line-to-ground capacitance. Switching aggressor nets induce false logic glitches or delay inflation on victim nets.",
          "Mitigation: Routing tools insert VDD/VSS shielding traces around critical clock and data buses and enforce double-width, double-spacing design rules."
        ],
        callout: {
          type: "design",
          title: "Useful Skew Optimization",
          text: "Modern physical design tools intentionally delay clock arrival to a capture flip-flop with a negative setup slack, 'stealing' unused time from the subsequent cycle to close timing without silicon area penalty!"
        }
      }
    ],
    checkpoint: {
      question: "What is 'Useful Skew' in modern ASIC clock tree synthesis?",
      options: [
        "A clock network that runs backwards in time",
        "Deliberately engineering clock arrival differences to borrow time from non-critical paths to fix timing violations on critical paths",
        "A manufacturing defect that makes all clocks identical",
        "Using software to bypass the clock tree entirely"
      ],
      correctIndex: 1,
      explanation: "Useful skew intentionally delays clock arrival to a critical receiving flip-flop, widening the available combinational time window and solving setup violations without modifying logic gates."
    },
    keyTakeaways: [
      "Clock Tree Synthesis balances arrival times across millions of registers to control clock skew.",
      "High-speed processors use clock meshes for jitter tolerance; SoCs use balance trees for power savings.",
      "Interconnect detailed routing alternates layer directions and shields wires against capacitive crosstalk."
    ],
    practicalApplications: [
      "Automated clock tree construction in Cadence Clock Concurrent Optimization (CCOpt)",
      "High-speed microprocessor clock mesh synthesis",
      "Signal integrity and crosstalk glitch noise sign-off"
    ],
    relatedResearchTopicId: "clock-tree-synthesis-cts-skew-jitter",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "floorplanning-power-grid",
    nextLessonId: "physical-verification-drc-lvs"
  },
  "physical-verification-drc-lvs": {
    id: "physical-verification-drc-lvs",
    courseId: "vlsi-chip-design",
    title: "Physical Verification: DRC, LVS & Antenna Checks",
    duration: "60 min",
    difficulty: "Advanced",
    tag: "SIGN-OFF VERIFICATION",
    summary: "Execute golden sign-off physical verification: Design Rule Checking (DRC), Layout Versus Schematic (LVS), electrical rule checks (ERC), and Antenna rule diode fixes.",
    learningObjectives: [
      "Understand Design Rule Checking (DRC) minimum width, spacing, enclosure, and density constraints.",
      "Execute Layout Versus Schematic (LVS) device extraction and netlist graph isomorphism.",
      "Identify the Plasma Antenna Effect and resolve gate dielectric breakdown using reverse diode clamps."
    ],
    keyFormulas: [
      {
        label: "Antenna Area Ratio (AAR)",
        formula: "AAR = Metal Interconnect Area / Thin Gate Oxide Area ≤ Max Permitted Ratio",
        desc: "Foundry rule restricting metal antenna area to prevent electrostatic breakdown during plasma etching."
      }
    ],
    sections: [
      {
        title: "1. Design Rule Checking (DRC) Geometry",
        content: [
          "Foundry manufacturing lines have strict physical limitations set by photolithography, optical diffraction, and chemical etching tolerances.",
          "Design Rule Checking (DRC) tools (e.g. Siemens Calibre, Synopsys IC Validator) verify millions of geometric polygon constraints.",
          "Width Rules: Minimum metal wire width to prevent physical open-circuit breaks.",
          "Spacing Rules: Minimum clearance between adjacent conductors to prevent short-circuit bridging.",
          "Enclosure Rules: Contact via overlap margins to account for mask overlay misalignment.",
          "Density Rules: Minimum and maximum metal density percentage across sliding windows (e.g. 35% - 70%) to ensure uniform CMP planarization without dishing or erosion."
        ]
      },
      {
        title: "2. Layout Versus Schematic (LVS) & The Antenna Effect",
        content: [
          "Layout Versus Schematic (LVS): Extracts transistors and interconnect networks directly from drawn layout shapes and mathematically proves graph isomorphism against the golden schematic netlist. Catches short circuits, open circuits, and swapped pins.",
          "The Plasma Antenna Effect: During plasma dry etching of upper metal layers, long floating metal wires act as antennas, collecting electrostatic charges from the plasma.",
          "Because the wire is connected to a microscopic MOS gate oxide, the accumulated charge discharges through the fragile dielectric, causing catastrophic gate oxide dielectric rupture!",
          "Antenna Fixes: Physical design tools fix antenna violations by routing the metal up to a higher layer (jumper) to break antenna length, or by inserting an Antenna Diode connected to ground that harmlessly bleeds off plasma charge."
        ],
        callout: {
          type: "design",
          title: "Zero Tolerance",
          text: "Foundry reticle cleanrooms reject any layout file with even a single DRC or LVS violation; tape-out requires 100% clean rule deck execution!"
        }
      }
    ],
    checkpoint: {
      question: "What physical damage occurs if the Plasma Antenna Rule is violated during BEOL interconnect manufacturing?",
      options: [
        "The wafer turns into a microwave transmitter",
        "Electrostatic charge collected by long metal lines during plasma etching discharges through and ruptures the gate dielectric",
        "The wafer breaks under gravitational bending",
        "The metal wires evaporate instantly"
      ],
      correctIndex: 1,
      explanation: "Long floating metal wires collect charge from plasma ions. If the antenna area ratio exceeds foundry limits, the electric field across the connected gate dielectric exceeds breakdown strength, punching a conductive hole through the gate oxide."
    },
    keyTakeaways: [
      "DRC verifies geometric polygon manufacturing rules including width, spacing, and density.",
      "LVS proves that the drawn physical layout matches the electrical schematic netlist with zero mismatches.",
      "Antenna rule violations are cured by inserting reverse-biased protection diodes or jumper layer routing."
    ],
    practicalApplications: [
      "Tape-out DRC/LVS golden sign-off in Siemens Calibre and Synopsys IC Validator",
      "Automated metal dummy fill insertion for CMP density compliance",
      "Antenna diode insertion in standard cell layouts"
    ],
    relatedResearchTopicId: "feol-beol-mol-integration-flow",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "clock-tree-synthesis-routing",
    nextLessonId: "lithography-euv-fab"
  }
};
