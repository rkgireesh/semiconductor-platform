import { FullLessonData } from "./types";

export const course10Lessons: Record<string, FullLessonData> = {
  "sram-dram-architectures-refresh": {
    lessonId: "sram-dram-architectures-refresh",
    courseId: "memory-and-packaging",
    courseTitle: "Memory Technologies & Advanced 3D Packaging",
    title: "SRAM 6T Bitcell Stability & DRAM 1T1C Deep Capacitor Refresh Dynamics",
    description: "Analyze static RAM cross-coupled inverters, Static Noise Margin (SNM), read/write margins, and dynamic RAM high-aspect-ratio cylinder capacitors with refresh timing.",
    duration: "45 mins",
    moduleNumber: 1,
    lessonNumber: 1,
    equations: [
      {
        latex: "SNM = \\min(SNM_L, SNM_R) = \\max \\left[s \\mid \\text{square of side } s \\text{ fits inside butterfly curve}\\right]",
        name: "Static Noise Margin (SNM) of 6T SRAM",
        explanation: "Quantifies the maximum DC noise voltage on storage nodes that a 6T SRAM cell can withstand without flipping its logical state during hold, read, and write operations."
      },
      {
        latex: "Q_{cell} = C_s V_{DD}, \\quad \\Delta V_{BL} = \\frac{C_s}{C_s + C_{BL}} \\left(V_{cell} - \\frac{V_{DD}}{2}\\right)",
        name: "DRAM Charge Sharing & Bitline Sense Voltage",
        explanation: "When a DRAM wordline opens the access transistor, the tiny cell capacitance Cs (~25 fF) shares charge with the large parasitic bitline capacitance CBL (~100 fF), generating a sensitive ~100-200 mV differential signal for the cross-coupled sense amplifier."
      }
    ],
    sections: [
      {
        heading: "1. 6T SRAM Cell Architecture & Operating Margins",
        body: "Static Random-Access Memory (SRAM) provides the fast, volatile cache memory (L1, L2, L3) inside high-performance microprocessors and GPUs. The canonical 6T SRAM cell consists of two cross-coupled CMOS inverters (four transistors: PU1, PU2, PD1, PD2) forming a bistable latch, accessed by two NMOS pass-gate transistors (PG1, PG2) controlled by the Wordline (WL).\n\nKey design trade-offs require careful transistor sizing ratios:\n- Cell Ratio (CR = W_PD / W_PG): Must be greater than ~1.2 to 1.5 to prevent the internal node holding '0' from rising above the switching threshold of the opposing inverter during a read access (Read Stability).\n- Pull-up Ratio (PR = W_PU / W_PG): Must be less than ~1.0 to allow the pass-gate transistor to easily overpower the PMOS pull-up transistor when writing a new value into the cell (Write Margin)."
      },
      {
        heading: "2. 1T1C DRAM Architecture & Extreme Aspect-Ratio Capacitors",
        body: "Dynamic RAM (DRAM) sacrifices speed and static retention for massive density, storing binary bits as electric charges inside a 1-Transistor 1-Capacitor (1T1C) cell. Because sub-micron planar capacitors cannot supply sufficient capacitance, modern DRAM fabricates 3D vertical cylinder or trench capacitors with aspect ratios exceeding 50:1.\n\nTo achieve ~25 fF in a footprint under 30 nm × 30 nm, foundries employ high-k dielectric nanolaminates (such as ZrO2/Al2O3/ZrO2 or ZAZ dielectric stacks) sandwiched between titanium nitride (TiN) metal electrodes. Dielectric leakage and subthreshold junction leakage through the access transistor slowly bleed charge away."
      },
      {
        heading: "3. Retention Time & Refresh Architectures (tREFI, tRFC)",
        body: "Because capacitor charge leaks over tens of milliseconds, every DRAM cell must be periodically refreshed. Standard JEDEC DDR4/DDR5 specifications mandate that all rows be refreshed within tRET (typically 64 ms at normal temperatures, or 32 ms above 85°C).\n\nThe memory controller issues auto-refresh commands at regular average intervals (tREFI ≈ 7.8 μs or 3.9 μs). Each refresh command blocks memory access for a refresh cycle time (tRFC ≈ 260 ns to 410 ns) while an entire internal bank of rows is sensed, restored to full rail, and closed. In modern high-density chips, refresh commands consume 10-20% of memory bandwidth and power, spurring on-die error correction (ODECC) and row-hammer mitigation architectures."
      }
    ],
    practicalApplications: [
      "Ultra-low latency L1/L2/L3 cache blocks on modern x86/ARM processors (e.g., AMD 3D V-Cache)",
      "High-speed DDR5 and LPDDR5X main memory systems in smartphones and cloud servers",
      "Massive memory capacity for training multi-billion parameter foundation AI models"
    ],
    relatedResearchTopicId: "sram-dram-architectures",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "Why must the Cell Ratio (W_pull-down / W_pass-gate) in a 6T SRAM cell be greater than 1?",
      options: [
        "To ensure the internal low node does not rise high enough to accidentally flip the opposing inverter during a read access",
        "To maximize write speed when writing a logical '1'",
        "To eliminate all leakage current when the chip is powered off",
        "To allow direct coupling to inductive interconnect lines"
      ],
      correctAnswer: 0,
      explanation: "A high Cell Ratio ensures the pull-down NMOS can sink the current flowing through the pass-gate transistor during a read without letting the node voltage rise above the switching threshold of the other inverter."
    }
  },

  "3d-nand-flash-string-stacking": {
    lessonId: "3d-nand-flash-string-stacking",
    courseId: "memory-and-packaging",
    courseTitle: "Memory Technologies & Advanced 3D Packaging",
    title: "3D NAND Flash: Charge Trap Physics, String Stacking & TLC/QLC Scaling",
    description: "Explore Charge Trap Flash (CTF) transconductance, macaroni channel etching, wordline staircase architectures with >200 layers, and multi-level threshold voltage distribution.",
    duration: "45 mins",
    moduleNumber: 1,
    lessonNumber: 2,
    equations: [
      {
        latex: "\\Delta V_{th} = -\\frac{Q_{trap}}{\\epsilon_{ox}} t_{blocking}",
        name: "Threshold Voltage Shift in Charge Trap Flash",
        explanation: "Electrons injected via Fowler-Nordheim tunneling into localized traps within a silicon nitride (Si3N4) layer shift the cell's threshold voltage proportionally to the trapped charge density."
      },
      {
        latex: "N_{states} = 2^b \\implies 16 \\text{ states for QLC } (b=4)",
        name: "Multi-Level Cell Storage Distribution",
        explanation: "Quad-Level Cell (QLC) encodes 4 binary bits per memory cell by precisely programming the threshold voltage into one of 16 distinct, narrow voltage distributions with millivolt tolerances."
      }
    ],
    sections: [
      {
        heading: "1. The Transition from 2D Planar Floating Gate to 3D Charge Trap",
        body: "Planar 2D NAND Flash hit a hard scaling wall at the 15 nm node. At that scale, adjacent floating gates were separated by less than 15 nm, causing severe cross-talk capacitive coupling. Furthermore, thin tunnel oxides could not tolerate a single defect without leaking all stored electrons, causing catastrophic data corruption.\n\n3D NAND solved this crisis by switching from conductive polycrystalline floating gates to insulating Silicon Nitride (Si3N4) Charge Trap Layers (Charge Trap Flash, CTF). Because the trapped charge is localized in non-conductive potential wells, a pinhole defect in the oxide only discharges electrons in the immediate vicinity, eliminating entire-cell data loss."
      },
      {
        heading: "2. Vertical Macaroni Channels & High-Aspect-Ratio Etching",
        body: "In 3D NAND (BiCS or TCAT architectures), memory cells are fabricated vertically along a cylindrical hole etched through alternating stacks of sacrificial silicon oxide and silicon nitride layers. Today's leading-edge chips exceed 200 to 300 vertical layers.\n\nEtching vertical channel holes with diameters under 100 nm through several micrometers of alternating materials requires cryogenic reactive ion etching (RIE) with aspect ratios exceeding 70:1. The channel itself is formed as a hollow cylinder ('macaroni channel') of polycrystalline silicon surrounding an insulating oxide core, minimizing carrier scattering and providing uniform gate control from the surrounding wordlines."
      },
      {
        heading: "3. Wordline Staircases, String Stacking & QLC Reliability",
        body: "To connect electrical wordline drivers to hundreds of individual layers, the edges of the 3D stack are etched into a 3D staircase structure where each step exposes a single wordline contact pad. When stacking exceeds ~150 layers, physical wafer stress and channel hole tilt induce yield collapse; manufacturers overcome this via String Stacking (stacking two separately processed 3D memory decks atop one another with precision alignment).\n\nProgramming 4 bits per cell (QLC) requires partitioning a 4-5 V voltage window into 16 tightly controlled threshold states with narrow margins (<200 mV per state). Read disturb, charge de-trapping, and temperature variations require sophisticated on-controller LDPC (Low-Density Parity-Check) error correction engines to guarantee enterprise SSD retention."
      }
    ],
    practicalApplications: [
      "High-capacity PCIe Gen5 NVMe solid-state drives (SSDs) for cloud datacenters and gaming PCs",
      "High-density UFS 4.0 flash storage in smartphones and portable electronics",
      "Automotive black-box data logging and in-vehicle infotainment flash arrays"
    ],
    relatedResearchTopicId: "3d-nand-flash-scaling",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "Why did 3D NAND transition from conductive polysilicon floating gates to insulating Silicon Nitride charge trap layers?",
      options: [
        "Trapped electrons in an insulator are localized, preventing a single oxide defect from draining all stored cell charge",
        "Silicon nitride is cheaper to extract from natural sea sand",
        "Insulating layers conduct electrical current faster than pure copper",
        "Floating gates cannot be viewed under electron microscopes"
      ],
      correctAnswer: 0,
      explanation: "In an insulating charge trap layer, electrons are trapped in isolated atomic sites; a localized defect in the tunnel oxide only discharges nearby traps rather than draining the entire charge packet."
    }
  },

  "emerging-mram-rram-crossbars": {
    lessonId: "emerging-mram-rram-crossbars",
    courseId: "memory-and-packaging",
    courseTitle: "Memory Technologies & Advanced 3D Packaging",
    title: "Emerging Non-Volatile Memory: STT-MRAM, OxRAM & Neuromorphic Crossbars",
    description: "Explore Magnetic Tunnel Junctions (MTJ), spin-transfer torque, filamentary resistive switching (ReRAM), Phase Change Memory (PCM), and in-memory analog computing.",
    duration: "40 mins",
    moduleNumber: 2,
    lessonNumber: 3,
    equations: [
      {
        latex: "TMR = \\frac{R_{AP} - R_P}{R_P} \\times 100\\%",
        name: "Tunneling Magnetoresistance (TMR) Ratio",
        explanation: "Quantifies the resistance difference between anti-parallel (RAP, high resistance) and parallel (RP, low resistance) magnetization states in an MgO-barrier Magnetic Tunnel Junction (MTJ)."
      },
      {
        latex: "I_{col,j} = \\sum_{i=1}^N V_i \\times G_{i,j}",
        name: "Ohm's & Kirchhoff's Current Laws in Analog In-Memory Crossbars",
        explanation: "When input voltages Vi are applied along crossbar wordlines, current accumulation along bitlines computes matrix-vector multiplication (MVM) in constant time O(1) inside memory array hardware."
      }
    ],
    sections: [
      {
        heading: "1. STT-MRAM Physics & Magnetic Tunnel Junctions (MTJ)",
        body: "Spin-Transfer Torque Magnetic RAM (STT-MRAM) combines the non-volatility of flash with the nanosecond switching speed and near-infinite endurance of SRAM. At the heart of STT-MRAM is the Magnetic Tunnel Junction (MTJ), composed of two ferromagnetic CoFeB layers separated by an atomically thin (~1 nm) crystalline Magnesium Oxide (MgO) tunnel barrier.\n\nOne ferromagnetic layer has fixed magnetization (the Reference Layer), while the other has switchable magnetization (the Free Layer). When spin-polarized electron current passes through the junction, transferred spin angular momentum exerts a torque on the free layer's magnetic moment, switching it between Parallel (low resistance, '0') and Anti-Parallel (high resistance, '1') configurations via quantum tunneling."
      },
      {
        heading: "2. Resistive RAM (ReRAM / OxRAM) & Conductive Filaments",
        body: "Resistive RAM stores data through the reversible formation and dissolution of a nanoscale conductive filament inside an insulating transition metal oxide (such as HfO2, Ta2O5, or TiO2). Applying an electroforming voltage pulse drives oxygen vacancies to coalesce into a sub-nanometer metallic filament connecting top and bottom electrodes (Low Resistance State, LRS).\n\nReversing the voltage polarity or magnitude drives oxygen ions back to re-oxidize and rupture the filament (High Resistance State, HRS). ReRAM cells exhibit extreme scalability (<5 nm), non-volatility, and multi-level analog conductance states."
      },
      {
        heading: "3. Neuromorphic Computing & In-Memory Matrix Multiplication",
        body: "Conventional Von Neumann computing architectures suffer from severe memory bottlenecks: moving weight matrices between memory and CPU/GPU cores consumes >80% of total system energy during deep learning inference.\n\nIn-memory analog crossbar arrays eliminate data movement entirely. ReRAM or MRAM cells are placed at every intersection of a 2D grid with programmable conductance G_ij representing neural network synaptic weights. Applying input activation vector voltages V_i simultaneously across rows induces currents I_j = Σ (V_i * G_ij) along columns by Kirchhoff's current law, completing deep learning matrix multiplication in a single physical clock cycle with orders-of-magnitude energy efficiency."
      }
    ],
    practicalApplications: [
      "Embedded non-volatile memory (eMRAM) replacing flash in microcontroller units (MCUs) at 22nm and 16nm",
      "Neuromorphic analog AI inference accelerators for ultra-low-power edge audio and vision processing",
      "Radiation-hardened satellite and aerospace non-volatile memory modules"
    ],
    relatedResearchTopicId: "emerging-memory-mram-rram",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "How does an analog ReRAM crossbar array calculate deep learning matrix-vector multiplication in O(1) time?",
      options: [
        "By exploiting Ohm's Law (I = V * G) across conductance elements and Kirchhoff's Current Law summing currents along output bitlines",
        "By running multi-threaded CUDA software kernels in an external DRAM buffer",
        "By converting voltages to optical lasers that reflect off mirrored capacitors",
        "By cooling the chip to 0 Kelvin so electrons travel without resistance"
      ],
      correctAnswer: 0,
      explanation: "Applying voltages along rows causes local currents proportional to conductance (Ohm's law: I = V*G), which naturally sum along columns according to Kirchhoff's current law, performing matrix-vector multiplication directly in the analog domain."
    }
  },

  "chiplets-interposers-hybrid-bonding": {
    lessonId: "chiplets-interposers-hybrid-bonding",
    courseId: "memory-and-packaging",
    courseTitle: "Memory Technologies & Advanced 3D Packaging",
    title: "Advanced 2.5D/3D Packaging: Silicon Interposers, TSVs & Cu-Cu Hybrid Bonding",
    description: "Master modern advanced packaging: passive/active silicon interposers (CoWoS, EMIB), Through-Silicon Vias, microbumps, and direct copper-to-copper hybrid bonding.",
    duration: "45 mins",
    moduleNumber: 2,
    lessonNumber: 4,
    equations: [
      {
        latex: "P_{interconnect} = \\frac{1}{2} C_{bump} V^2 f + I_{leak} V",
        name: "Die-to-Die Interconnect Dynamic Power Dissipation",
        explanation: "Reducing interconnect parasitic capacitance Cbump from microbump values (~20-50 fF) to hybrid bonding values (<1-2 fF) slashes communication energy per bit from >1 pJ/bit to <0.05 pJ/bit."
      },
      {
        latex: "R_{th} = \\sum_{i=1}^N \\frac{t_i}{k_i A_i}",
        name: "3D Stack Vertical Thermal Resistance",
        explanation: "Thermal management in 3D multi-die stacks is governed by the thickness ti and thermal conductivity ki of die silicon, adhesive underfill polymers, and inter-die dielectric layers."
      }
    ],
    sections: [
      {
        heading: "1. The Demise of Monolithic Dies & The Chiplet Revolution",
        body: "As photolithography reticle limits (~858 mm^2) constrain maximum single-die area and cutting-edge wafer costs exceed $20,000 per wafer at 3 nm, fabricating gigantic monolithic chips yields prohibitive defect rates (defect yield scales exponentially with area via the Murphy/Poisson yield models).\n\nChiplet architectures disaggregate a monolithic SoC into modular, optimized dies: compute cores (CPU, GPU, NPU) are built on leading-edge 3nm/4nm nodes, while I/O controllers, analog interfaces, and memory PHYs remain on cost-effective 6nm/12nm mature nodes. These disaggregated dies are then recombined on a high-density package substrate."
      },
      {
        heading: "2. 2.5D Packaging: Silicon Interposers (CoWoS) & Silicon Bridges (EMIB)",
        body: "To connect chiplets with thousands of parallel lines without the excessive parasitic capacitance and spacing of standard PCB traces:\n1. 2.5D Silicon Interposers (TSMC CoWoS-S): A dedicated, un-doped passive silicon wafer with sub-micron metallization layers and Through-Silicon Vias (TSVs) serves as a floorplan substrate. Compute dies and High Bandwidth Memory (HBM3/HBM4) stacks are mounted side-by-side atop it via microbumps with ~40 μm pitch.\n2. Embedded Multi-die Interconnect Bridges (Intel EMIB): Small, ultra-high-density silicon bridge chips are embedded directly inside the organic packaging substrate only where high-density die-to-die routing is required, avoiding the cost of a full wafer-sized silicon interposer."
      },
      {
        heading: "3. 3D Die Stacking & Direct Cu-Cu Hybrid Bonding",
        body: "When latency and bandwidth demand vertical integration, 3D die stacking places one active die directly on top of another. Traditional 3D stacking utilizes microbumps (solder spheres with 30-50 μm pitch). However, solder squeeze-out limits minimum pitch to ~20 μm, creating parasitic capacitance bottlenecks.\n\nTSMC SoIC (System-on-Integrated-Chips) and Intel Foveros Direct replace solder bumps with Direct Copper-to-Copper (Cu-Cu) Hybrid Bonding. The wafer surfaces are polished to atomic planarity (<0.5 nm RMS roughness) using CMP, exposing flush copper pads surrounded by SiO2 or carbon-doped dielectric. Bonding at room temperature forms immediate dielectric van der Waals bonds; subsequent annealing at 300°C causes the copper pads to expand thermally, fusing into seamless, atomic metallic crystal grains. This achieves <1 μm interconnect pitch, >100x interconnect density, and <0.05 pJ/bit communication energy."
      }
    ],
    practicalApplications: [
      "AI accelerators (NVIDIA H100, B200 Blackwell, AMD MI300X) integrating HBM3e stacks with dual-compute chiplets",
      "AMD 3D V-Cache packaging adding 64 MB of direct hybrid-bonded L3 SRAM atop Ryzen/Epyc CPU cores",
      "High-speed networking switches combining 51.2 Tbps ASICs with co-packaged optics (CPO)"
    ],
    relatedResearchTopicId: "advanced-packaging-cowos",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "What primary electrical advantage does Cu-Cu hybrid bonding provide over standard solder microbumps in 3D die stacking?",
      options: [
        "It eliminates solder bumps, slashing interconnect pitch below 1 μm and cutting parasitic capacitance by over an order of magnitude",
        "It eliminates the need for electric power in the top die",
        "It allows chips to communicate using radio frequency Wi-Fi rather than wires",
        "It makes the packaged die completely flexible like rubber"
      ],
      correctAnswer: 0,
      explanation: "Hybrid bonding eliminates solder spheres, enabling sub-micrometer interconnect pitch and atomic copper grain fusion, which reduces parasitic capacitance to <2 fF and drops interconnect energy to under 0.05 pJ/bit."
    }
  }
};
