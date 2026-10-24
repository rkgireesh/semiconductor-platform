import { FullLessonData } from "./types";

export const COURSE_8_LESSONS: Record<string, FullLessonData> = {
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
    practicalApplications: [
      "TSMC N2 and Intel 18A RibbonFET high-performance computing nodes",
      "Smartphone flagship SoC application processors",
      "Hyperscale AI training cluster server silicon"
    ],
    relatedResearchTopicId: "gaafet-nanosheet-superlattice-epitaxy",
    relatedLabId: "mosfet-characteristics-lab",
    prevLessonId: "plasma-etching-cmp-planarization",
    nextLessonId: "backside-power-delivery-bspdn"
  },
  "backside-power-delivery-bspdn": {
    id: "backside-power-delivery-bspdn",
    courseId: "advanced-devices",
    title: "Backside Power Delivery Networks (BSPDN) & Super-Power-Rails",
    duration: "65 min",
    difficulty: "Advanced",
    tag: "POWER INTEGRITY",
    summary: "Analyze the decoupling of power and signal routing: Backside Power Delivery (BSPDN), wafer thinning (< 500nm), nano-TSVs, buried power rails, and IR-drop elimination.",
    learningObjectives: [
      "Understand how frontside BEOL routing congestion and IR drop bottlenecked sub-2nm nodes.",
      "Explain the BSPDN fabrication sequence: frontside completion, carrier bonding, backgrind thinning, and backside metallization.",
      "Quantify IR-drop reduction (> 30%) and standard cell area compaction (15% - 20%)."
    ],
    keyFormulas: [
      {
        label: "IR Drop Improvement",
        formula: "ΔV_IR,backside ≈ 0.65 · ΔV_IR,frontside",
        desc: "Over 30% reduction in supply voltage droop by delivering power directly to transistor terminals."
      },
      {
        label: "Standard Cell Track Reduction",
        formula: "Cell Height = N_tracks · Metal_Pitch",
        desc: "Buried power rails allow cell height to shrink from 6-track down to 4.5-track."
      }
    ],
    sections: [
      {
        title: "1. The Frontside Interconnect Congestion Crisis",
        content: [
          "In traditional chips, both power wires (VDD/VSS) and signal wires compete for routing space inside the 15+ layer frontside BEOL interconnect stack.",
          "Power networks consume up to 20% to 30% of lower metal layers, forcing signal wires to take long detours and causing massive IR drop that degrades maximum clock frequency."
        ]
      },
      {
        title: "2. The Backside Power Delivery Architecture",
        content: [
          "Backside Power Delivery (Intel PowerVia, TSMC Super Power Rail) completely separates power from signal routing.",
          "Fabrication Flow: Complete frontside transistors and signal wiring, bond the top surface to a carrier wafer, flip the wafer, and mechanically/chemically grind the silicon substrate down to less than 500 nanometers thickness!",
          "Nano-TSVs (Through-Silicon Vias) are etched from the backside directly into Buried Power Rails (BPR) contacting transistor source and drain terminals.",
          "Benefits: The frontside is 100% dedicated to signals and clocks; power lines are wide, thick, low-resistance copper traces on the backside, slashing IR drop by 30% and delivering a 6% to 10% frequency boost!"
        ],
        callout: {
          type: "design",
          title: "Architecture Milestone",
          text: "Intel 18A PowerVia and TSMC A16 Super Power Rail represent the first commercial implementation of backside power in semiconductor history."
        }
      }
    ],
    checkpoint: {
      question: "What is the primary architectural benefit of Backside Power Delivery Networks (BSPDN) in sub-2nm chips?",
      options: [
        "It eliminates the need for software",
        "It decouples power delivery from signal routing, slashing IR drop and freeing up frontside metal layers for 100% signal density",
        "It makes wafers flexible enough to bend in half",
        "It replaces silicon with copper entirely"
      ],
      correctIndex: 1,
      explanation: "BSPDN routes power from the back of the thinned wafer, completely eliminating power grid congestion on the front side. This cuts IR voltage drop by >30% and allows standard cell area to shrink by 15-20%."
    },
    keyTakeaways: [
      "BSPDN physically separates power delivery (backside) from signal routing (frontside).",
      "Wafer thinning to < 500nm enables sub-micron nano-TSV connections directly to transistor rails.",
      "Reduces supply voltage IR drop by over 30% while compacting standard cell area."
    ],
    practicalApplications: [
      "Intel 18A / TSMC A16 high-performance CPU/GPU nodes",
      "Hyperscale AI accelerator clock frequency scaling",
      "Ultra-dense 4.5-track standard cell library implementation"
    ],
    relatedResearchTopicId: "backside-power-delivery-bspdn-buried-rails",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "gaafet-nanosheet-physics",
    nextLessonId: "wide-bandgap-gan-sic"
  },
  "wide-bandgap-gan-sic": {
    id: "wide-bandgap-gan-sic",
    courseId: "advanced-devices",
    title: "Wide Bandgap GaN HEMT & SiC Power MOSFETs",
    duration: "65 min",
    difficulty: "Advanced",
    tag: "POWER SEMICONDUCTORS",
    summary: "Master wide-bandgap physics: 4H-SiC double-trench MOSFETs, AlGaN/GaN High-Electron-Mobility Transistors (HEMT), 2D Electron Gas (2DEG) polarization, and EV inverter efficiencies.",
    learningObjectives: [
      "Compare material figures of merit (Baliga FOM) for Silicon, 4H-SiC (3.26 eV), and GaN (3.4 eV).",
      "Understand spontaneous and piezoelectric polarization forming the 2DEG at AlGaN/GaN interfaces.",
      "Analyze SiC MOSFET trench gate architectures and gate oxide reliability."
    ],
    keyFormulas: [
      {
        label: "Baliga's Figure of Merit (BFOM)",
        formula: "BFOM = ε_s · μ · E_crit³",
        desc: "Theoretical limit of specific on-resistance for high-voltage power devices; SiC is ~840× and GaN is ~3000× higher than Silicon!"
      },
      {
        label: "Specific On-Resistance",
        formula: "R_on,sp = 4 · V_breakdown² / (ε_s · μ · E_crit³)",
        desc: "Ideal drift-region resistance scaling inversely with the cube of critical breakdown field E_crit."
      }
    ],
    sections: [
      {
        title: "1. Wide Bandgap Advantages over Silicon",
        content: [
          "Silicon has a critical breakdown field of ~0.3 MV/cm. To block high voltages (1200V in EV inverters), silicon devices require thick, lightly doped drift regions with high electrical on-resistance (RDS,on), generating massive thermal losses.",
          "Silicon Carbide (4H-SiC, Eg = 3.26 eV) and Gallium Nitride (GaN, Eg = 3.4 eV) have critical electric fields ~10× higher (~3.0 MV/cm).",
          "Because drift resistance scales inversely with E_crit³, wide bandgap drift regions can be 10× thinner and 100× more heavily doped, slashing conduction losses by over 90%!"
        ]
      },
      {
        title: "2. The 2DEG in GaN HEMTs & SiC Trench MOSFETs",
        content: [
          "GaN HEMTs: Do not require intentional dopant atoms! Spontaneous and piezoelectric polarization charges at the AlGaN/GaN heterojunction naturally induce an undoped Two-Dimensional Electron Gas (2DEG) with sheet carrier density ns ≈ 10¹³ cm⁻² and high electron mobility (> 2000 cm²/V·s).",
          "SiC Power MOSFETs: Conduct high current through vertical channels. Modern double-trench designs shield the delicate gate oxide from high electric fields using buried p-wells, achieving 1200V to 1700V ratings in electric vehicle traction inverters."
        ],
        callout: {
          type: "design",
          title: "Electric Vehicle Revolution",
          text: "Replacing silicon IGBTs with SiC MOSFETs in electric vehicle inverters extends driving range by 6% to 10% and enables ultra-fast 800V DC fast charging!"
        }
      }
    ],
    checkpoint: {
      question: "Why do GaN HEMTs possess a high-density, high-mobility Two-Dimensional Electron Gas (2DEG) even without intentional dopant impurity atoms?",
      options: [
        "Because of spontaneous and piezoelectric polarization sheet charges originating from crystal asymmetry",
        "Because copper wires are placed inside the channel",
        "Because GaN melts at room temperature",
        "Because electrons are injected from the battery terminal"
      ],
      correctIndex: 0,
      explanation: "Wurtzite GaN has a non-centrosymmetric crystal lattice that generates spontaneous polarization, augmented by piezoelectric strain polarization from the lattice-mismatched AlGaN barrier. This sheet charge induces the 2DEG without any impurity doping."
    },
    keyTakeaways: [
      "Wide bandgaps provide 10× higher breakdown electric fields, slashing power on-resistance.",
      "GaN HEMTs utilize a high-mobility 2DEG formed by polarization without dopant scattering.",
      "4H-SiC power MOSFETs form the backbone of 800V electric vehicle traction inverters."
    ],
    practicalApplications: [
      "Electric vehicle main traction inverters (Tesla, Porsche, BYD)",
      "High-efficiency compact USB-C GaN fast chargers (65W - 240W)",
      "Solar string inverters and solid-state grid power converters"
    ],
    relatedResearchTopicId: "gan-hemt-2deg-polarization-piezoelectric",
    relatedLabId: "diode-iv-characteristics",
    prevLessonId: "backside-power-delivery-bspdn",
    nextLessonId: "advanced-3d-packaging-cowos"
  },
  "advanced-3d-packaging-cowos": {
    id: "advanced-3d-packaging-cowos",
    courseId: "advanced-devices",
    title: "2.5D/3D Advanced Packaging: CoWoS & Direct Hybrid Bonding",
    duration: "60 min",
    difficulty: "Advanced",
    tag: "ADVANCED PACKAGING",
    summary: "Explore the post-monolithic era: 2.5D silicon interposers (TSMC CoWoS), embedded silicon bridges (Intel EMIB), Through-Silicon Vias (TSV), and bumpless direct Cu-Cu hybrid bonding.",
    learningObjectives: [
      "Explain why reticle limits (858 mm²) force high-performance chips to disaggregate into modular chiplets.",
      "Compare 2.5D passive silicon interposers against embedded silicon bridges (EMIB).",
      "Understand bumpless Cu-Cu direct hybrid bonding achieving sub-4μm interconnect pitch."
    ],
    keyFormulas: [
      {
        label: "Interconnect Wire Density",
        formula: "Density = (Number of Wires) / (Die Edge Length · Layer Count)",
        desc: "Shoreline bandwidth density; advanced packaging reaches > 1000 lines/mm/layer."
      },
      {
        label: "Energy per Bit",
        formula: "E_bit = 1/2 · C_interconnect · VDD²",
        desc: "Inter-die communication energy; hybrid bonding slashes E_bit below 0.1 pJ/bit!"
      }
    ],
    sections: [
      {
        title: "1. The Chiplet Disaggregation Revolution",
        content: [
          "Moore's Law monolithic scaling is hitting optical limits: standard photolithography masks cannot expose a die larger than the reticle limit (≈ 26 mm × 33 mm = 858 mm²).",
          "Furthermore, building an 800mm² monolithic die in a new 3nm process yields terrible economics due to defect density.",
          "Chiplets disaggregate the processor: small, high-yielding compute tiles on 3nm connect to separate I/O dies on mature 6nm and High Bandwidth Memory (HBM3e) stacks on a common advanced package substrate."
        ]
      },
      {
        title: "2. 2.5D Interposers vs 3D Direct Hybrid Bonding",
        content: [
          "2.5D Packaging (TSMC CoWoS): Active dies mount side-by-side on a passive silicon interposer containing sub-micron copper wires and Through-Silicon Vias (TSVs), interconnected via 35μm microbumps.",
          "3D Direct Hybrid Bonding (TSMC SoIC, AMD 3D V-Cache): Eliminates solder microbumps entirely! Wafers or dies with polished dielectric (SiO2) and recessed copper pads are bonded atom-to-atom at room temperature and annealed at 250°C.",
          "Copper thermal expansion fuses the metal pads directly together, shrinking vertical interconnect pitch from 35μm down to < 4μm, increasing connection density by 1,000×, and slashing parasitic capacitance to femtofarads!"
        ],
        callout: {
          type: "design",
          title: "AI Superchip Engine",
          text: "Nvidia's Blackwell B200 and H100 AI GPUs use TSMC CoWoS packaging to integrate dual reticle-sized compute dies with 8 high-speed HBM3e memory stacks delivering over 8 Terabytes/sec bandwidth!"
        }
      }
    ],
    checkpoint: {
      question: "How does direct Cu-Cu hybrid bonding eliminate solder microbumps when stacking 3D chips?",
      options: [
        "By melting the entire chip with a blowtorch",
        "By chemically polishing dielectric and copper flat, joining surfaces via molecular van der Waals forces, and thermally annealing to fuse copper atoms directly",
        "By using conductive plastic glue",
        "By tying micro-threads between pads"
      ],
      correctIndex: 1,
      explanation: "Hybrid bonding achieves atomic fusion: precision CMP leaves copper slightly recessed in dielectric. Hydrophilic bonding joins the dielectric at room temperature; moderate annealing causes copper to expand and fuse directly together without solder."
    },
    keyTakeaways: [
      "Chiplet packaging overcomes the 858 mm² photolithographic reticle size ceiling.",
      "2.5D interposers (CoWoS) connect logic and High Bandwidth Memory (HBM) with sub-micron wiring.",
      "Direct Cu-Cu hybrid bonding eliminates microbumps, enabling 3D cache stacking with sub-4μm pitch."
    ],
    practicalApplications: [
      "Nvidia H100/B200 and AMD MI300 AI datacenter GPU packaging",
      "AMD 3D V-Cache 3D vertical SRAM stacking on Ryzen/EPYC CPUs",
      "High-density CMOS Image Sensor pixel-to-logic tier wafer bonding"
    ],
    relatedResearchTopicId: "direct-copper-hybrid-bonding-wafer-to-wafer",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "wide-bandgap-gan-sic",
    nextLessonId: "cryogenic-cmos-quantum-control"
  },
  "cryogenic-cmos-quantum-control": {
    id: "cryogenic-cmos-quantum-control",
    courseId: "advanced-devices",
    title: "Cryogenic CMOS & Spin Qubit Control Hardware",
    duration: "60 min",
    difficulty: "Advanced",
    tag: "QUANTUM HARDWARE",
    summary: "Explore transistor physics at near absolute zero: 4 Kelvin carrier freeze-out, threshold voltage elevation, flicker noise suppression, and on-chip Cryo-CMOS qubit readout ASICs.",
    learningObjectives: [
      "Understand semiconductor carrier freeze-out and high-mobility transport at 4 Kelvin.",
      "Analyze the quantum computing wiring bottleneck inside dilution refrigerators.",
      "Explain the design of cryogenic mixed-signal controller ASICs operating directly at 4K."
    ],
    keyFormulas: [
      {
        label: "Cryogenic Subthreshold Swing",
        formula: "SS_cryo = ln(10) · (k · T_cryo / q) · n_factor",
        desc: "Drops from ~65 mV/dec at 300K down to < 10 mV/dec at cryogenic temperatures before saturating."
      },
      {
        label: "Carrier Freeze-out Activation",
        formula: "n0(T) ∝ exp[ -ΔEd / (2 · k · T) ]",
        desc: "Thermal ionization ceases at low temperatures as electrons freeze back onto donor impurity atoms."
      }
    ],
    sections: [
      {
        title: "1. Transistor Physics at 4 Kelvin (-269 °C)",
        content: [
          "Superconducting quantum processors and silicon spin qubits operate inside dilution refrigerators at temperatures as low as 10 to 20 milliKelvin.",
          "When standard CMOS transistors are cooled to 4 Kelvin, thermal lattice vibrations (phonons) vanish, dramatically reducing scattering and boosting carrier mobility by 2× to 4×.",
          "Carrier Freeze-Out: In lightly doped silicon, thermal energy kT is too small (~0.35 meV at 4K) to ionize dopants, freezing carriers back onto impurity atoms. However, heavily doped degenerate regions (source/drain) remain fully conductive!",
          "Threshold voltage Vth shifts higher by ~150 to 250 mV, and subthreshold swing sharpens dramatically."
        ]
      },
      {
        title: "2. The Quantum Wiring Bottleneck and Cryo-CMOS",
        content: [
          "Today's quantum computers require individual coaxial cables running from room-temperature microwave equipment down through the cryostat to every single qubit.",
          "Scaling to 1,000+ qubits creates an impossible heat load and physical wiring bottleneck.",
          "Cryo-CMOS ASICs (e.g. Intel Horse Ridge) solve this by placing an integrated mixed-signal controller chip directly at the 4K stage inside the refrigerator.",
          "Operating within a strict 1-Watt refrigerator thermal budget, the Cryo-CMOS ASIC generates microwave pulses, multiplexes channels, and reads out qubit quantum states using a handful of digital lines to the outside world!"
        ],
        callout: {
          type: "physics",
          title: "Silicon Spin Qubits",
          text: "Silicon spin qubits use standard CMOS gate electrodes to trap single electrons inside quantum dots, allowing qubits and Cryo-CMOS controllers to be manufactured in the same commercial 300mm fabs!"
        }
      }
    ],
    checkpoint: {
      question: "What is the primary motivation for operating Cryo-CMOS controller ASICs directly inside a cryogenic dilution refrigerator at 4 Kelvin?",
      options: [
        "To freeze the transistors so they stop working",
        "To eliminate thousands of lossy, heat-conducting coaxial cables running to room temperature, solving the quantum computing wiring bottleneck",
        "To make the chip run on liquid nitrogen instead of electricity",
        "To prevent hackers from touching the computer"
      ],
      correctIndex: 1,
      explanation: "Running individual microwave coax cables to hundreds of qubits introduces unbearable thermal heat loads into the cryostat. Cryo-CMOS generates control pulses locally at 4K, replacing thousands of cables with a digital interface."
    },
    keyTakeaways: [
      "Cooling transistors to 4K eliminates phonon scattering, boosting carrier mobility.",
      "Degenerately doped silicon remains conductive at cryogenic temperatures without freeze-out.",
      "Cryo-CMOS mixed-signal ASICs solve the quantum wiring bottleneck within strict cooling budgets."
    ],
    practicalApplications: [
      "Cryogenic control and readout of superconducting transmon and silicon spin qubits",
      "Ultra-low-noise radio astronomy millimeter-wave receivers",
      "Deep-space exploration sensor electronics operating in extreme cold"
    ],
    relatedResearchTopicId: "cryo-cmos-control-readout-dilution",
    relatedLabId: "mosfet-characteristics-lab",
    prevLessonId: "advanced-3d-packaging-cowos"
  }
};
