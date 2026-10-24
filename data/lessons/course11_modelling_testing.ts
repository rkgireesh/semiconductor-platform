import { FullLessonData } from "./types";

export const course11Lessons: Record<string, FullLessonData> = {
  "tcad-device-physics-solvers": {
    lessonId: "tcad-device-physics-solvers",
    courseId: "device-modelling-testing",
    courseTitle: "Semiconductor Device Modelling, Testing & Reliability",
    title: "TCAD Device Simulation: Poisson-Drift-Diffusion & Quantum Corrections",
    description: "Understand Technology CAD (TCAD) simulation physics, coupled nonlinear PDE solvers (Newton-Raphson), quantum mechanical corrections, and meshing strategies.",
    duration: "45 mins",
    moduleNumber: 1,
    lessonNumber: 1,
    equations: [
      {
        latex: "\\nabla \\cdot \\left(\\epsilon \\nabla \\psi\\right) = -q \\left(p - n + N_D^+ - N_A^-\\right)",
        name: "Nonlinear Electrostatic Poisson Equation",
        explanation: "Relates spatial electrostatic potential ψ across the 2D/3D semiconductor domain to local mobile charge densities (n, p) and fixed ionized donor/acceptor impurities."
      },
      {
        latex: "J_n = q n \\mu_n \\mathbf{E} + q D_n \\nabla n, \\quad \\nabla \\cdot \\mathbf{J}_n = q R_{net} + q \\frac{\\partial n}{\\partial t}",
        name: "Electron Current Density & Continuity Equation",
        explanation: "Coupled with the hole continuity equation, solves for steady-state and transient non-equilibrium carrier transport under drift and diffusion fields."
      }
    ],
    sections: [
      {
        heading: "1. The Role of TCAD in Modern Semiconductor Development",
        body: "Technology Computer-Aided Design (TCAD) tools (such as Synopsys Sentaurus or Silvaco Victory) simulate the physical fabrication processes (Process TCAD: ion implantation, oxidation, diffusion, etching, epitaxy) and electrical performance (Device TCAD) of semiconductor components before committing millions of dollars to physical wafer runs.\n\nTCAD bridges fundamental solid-state physics equations with experimental fab calibration. It allows device engineers to predict threshold voltage shifts, short-channel roll-off, breakdown voltages, and capacitance profiles across process parameter variations."
      },
      {
        heading: "2. The Coupled PDE Solver Engine (Gummel vs Newton-Raphson)",
        body: "Device TCAD fundamentally solves a system of coupled partial differential equations across a discretized finite-element or finite-volume mesh:\n1. Poisson's Equation for electrostatic potential.\n2. Electron Continuity Equation.\n3. Hole Continuity Equation.\n\nTwo primary numerical approaches exist:\n- Gummel's Decoupled Method: Solves Poisson's equation holding carrier concentrations fixed, then solves electron and hole continuity equations iteratively until convergence. Gummel's method is computationally fast and stable for low-field, equilibrium conditions, but fails when strong coupling occurs (e.g., avalanche breakdown or high forward bias).\n- Fully Coupled Newton-Raphson Method: Linearizes all three equations into a massive sparse Jacobian matrix, solving for potential and carrier densities simultaneously. While computationally intensive, it provides quadratic convergence even under extreme non-equilibrium and strong inversion conditions."
      },
      {
        heading: "3. Quantum Corrections & Hydrodynamic Transport Models",
        body: "As transistor dimensions shrank below 20 nm, classical drift-diffusion approximations broke down. In modern nanosheet transistors (with channel thicknesses <5 nm):\n- Density Gradient & Schrödinger-Poisson Models: Quantum confinement displaces the peak carrier inversion density several angstroms away from the physical semiconductor-dielectric interface, reducing the effective gate capacitance (Cox,eff).\n- Hydrodynamic & Monte Carlo Models: Under intense localized electric fields (>100 kV/cm), electrons absorb energy faster than they can scatter it to the crystal lattice, leading to non-equilibrium 'velocity overshoot' where electron speeds temporarily exceed the saturation velocity vsat."
      }
    ],
    practicalApplications: [
      "Process-Design Co-Optimization (PDCO) for leading-edge 2nm and 1.4nm transistor architectures",
      "Power semiconductor breakdown voltage optimization and edge termination guard ring design",
      "Radiation effects simulation for aerospace electronics (Single Event Effects, SEU/SEL)"
    ],
    relatedResearchTopicId: "compact-modeling-bsim-cmg",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "Why do nanoscale (<10nm) TCAD simulations require quantum mechanical corrections (such as Density Gradient or Schrödinger-Poisson solvers)?",
      options: [
        "Quantum confinement causes the peak carrier inversion concentration to shift away from the physical interface, which classical drift-diffusion neglects",
        "Classical equations cannot calculate electrical current in amperes",
        "Silicon atoms disappear when electric fields exceed 1 V/cm",
        "To allow the simulation to run on quantum computers only"
      ],
      correctAnswer: 0,
      explanation: "Quantum confinement in ultra-thin channels forms discrete sub-bands, pushing the wave function peak away from the dielectric boundary and lowering effective gate capacitance, an effect missed by classical Poisson-Boltzmann physics."
    }
  },

  "wafer-sort-dft-atpg-testing": {
    lessonId: "wafer-sort-dft-atpg-testing",
    courseId: "device-modelling-testing",
    courseTitle: "Semiconductor Device Modelling, Testing & Reliability",
    title: "Wafer Sort, Design for Testability (DFT) & Automated Test Pattern Generation (ATPG)",
    description: "Explore Automated Test Equipment (ATE), wafer probe testing, scan chain architectures, built-in self-test (BIST), and fault modeling for zero-defect manufacturing.",
    duration: "45 mins",
    moduleNumber: 1,
    lessonNumber: 2,
    equations: [
      {
        latex: "FC = \\frac{\\text{Detected Faults}}{\\text{Total Detectable Faults}} \\times 100\\%",
        name: "Fault Coverage (FC) Metric",
        explanation: "Measures the percentage of modeled physical manufacturing faults (stuck-at, transition delay, bridging) that can be verified and isolated by a specific ATPG test vector suite."
      },
      {
        latex: "Y_{final} = e^{-D_0 A} \\times (1 - \\text{Test Escapes})",
        name: "Defect-Driven Die Yield & Test Escape Relation",
        explanation: "Relates wafer defect density D0 and die area A to functional manufacturing yield and test effectiveness in preventing defective silicon from reaching production customers."
      }
    ],
    sections: [
      {
        heading: "1. Wafer Sort, Probe Cards & Automated Test Equipment (ATE)",
        body: "Following front-end wafer fabrication (FEOL/BEOL), full 300mm silicon wafers must undergo testing before being sliced into individual dies. Automated Test Equipment (ATE) from vendors like Advantest or Teradyne docks with high-precision probe stations.\n\nA custom probe card with tens of thousands of microscopic vertical needle-like probe tips makes electrical contact with every bond pad on a die. Wafer Sort (also known as Circuit Probe or CP) exercises basic DC parametrics (leakage current, continuity, supply shorts) and high-speed functional patterns to identify bad dies. Bad dies are cataloged in an electronic wafer map or physically marked with ink dots so they are discarded prior to packaging."
      },
      {
        heading: "2. Design for Testability (DFT) & Scan Chain Insertion",
        body: "Modern microprocessors contain billions of logic gates. Testing deeply nested internal sequential registers through primary I/O pins would require exponential test cycles (O(2^N)). Design for Testability (DFT) solves this by replacing standard flip-flops with Scan Flip-Flops.\n\nIn 'Scan Mode', thousands of internal flip-flops are reconfigured into long serial shift registers ('Scan Chains'). An external ATE tester shifts test patterns serially into the flip-flops (Scan-In), pulses the functional system clock for one capture cycle (Capture), and shifts the resulting logic responses out for comparison against gold-standard vectors (Scan-Out). Scan architectures transform an impossible sequential testing problem into a tractable combinational logic test."
      },
      {
        heading: "3. ATPG Fault Models & Built-In Self-Test (BIST)",
        body: "Automatic Test Pattern Generation (ATPG) algorithms (such as the D-Algorithm or PODEM) generate deterministic test vectors targeting specific physical defect models:\n- Stuck-at Fault Model: Tests whether any internal node is permanently shorted to VDD (stuck-at-1) or GND (stuck-at-0).\n- Transition Delay Faults: Verifies that logic transitions propagate across timing paths within the operational clock frequency window (at-speed testing).\n\nFor large memory arrays (SRAM/eDRAM) where external tester bandwidth is limited, Built-In Self-Test (MBIST) circuits are integrated directly on-die. An autonomous state machine writes marching algorithmic patterns (March C+, MATS+) to locate defective memory cells and automatically remap them to spare redundant rows and columns."
      }
    ],
    practicalApplications: [
      "High-throughput ATE testing of enterprise server CPUs with >99.9% fault coverage",
      "Automotive AEC-Q100 zero-defect test screening for mission-critical ADAS processors",
      "On-die memory repair using laser fuses and electronic antifuse registers (eFuse)"
    ],
    relatedResearchTopicId: "transistor-reliability-aging-bti",
    relatedLabId: "cmos-inverter-lab",
    quiz: {
      question: "How does Scan-based DFT transform the testing of complex digital sequential logic circuits?",
      options: [
        "It chains internal flip-flops into serial shift registers during test mode, converting intractable sequential test problems into simple combinational testing",
        "It replaces all transistors with copper wires during testing",
        "It heats the wafer to 500°C so faults burn away",
        "It allows testing without applying any electrical power"
      ],
      correctAnswer: 0,
      explanation: "By reconfiguring internal state registers into serial shift registers (scan chains), DFT enables direct controllability and observability of every internal flip-flop, allowing ATPG to treat the intervening logic as purely combinational."
    }
  },

  "transistor-reliability-aging-bti": {
    lessonId: "transistor-reliability-aging-bti",
    courseId: "device-modelling-testing",
    courseTitle: "Semiconductor Device Modelling, Testing & Reliability",
    title: "Transistor Aging & Reliability: BTI, HCI, TDDB & Electromigration",
    description: "Deep dive into physical transistor wear-out mechanisms: Bias Temperature Instability (BTI), Hot-Carrier Injection, dielectric breakdown, and interconnect electromigration.",
    duration: "45 mins",
    moduleNumber: 2,
    lessonNumber: 3,
    equations: [
      {
        latex: "\\Delta V_{th}(t) = A \\cdot \\exp\\left(\\frac{\\gamma V_{GS}}{k_B T}\\right) t^n",
        name: "Reaction-Diffusion Power Law of BTI Aging",
        explanation: "Quantifies the continuous drift in threshold voltage over years of continuous electrical and thermal stress, where n typically ranges from 1/6 to 1/4."
      },
      {
        latex: "MTTF = \\frac{A}{J^n} \\exp\\left(\\frac{E_a}{k_B T}\\right)",
        name: "Black's Equation for Interconnect Electromigration",
        explanation: "Predicts the Mean Time To Failure (MTTF) of metallic copper or aluminum interconnects under high current density J and elevated temperature T."
      }
    ],
    sections: [
      {
        heading: "1. Bias Temperature Instability (NBTI / PBTI)",
        body: "Bias Temperature Instability is the dominant wear-out mechanism limiting the operational lifespan of modern advanced CMOS transistors. Under elevated temperature and gate bias:\n- Negative Bias Temperature Instability (NBTI) degrades PMOS transistors: Electric field stress across the gate dielectric breaks silicon-hydrogen (Si-H) bonds at the channel/dielectric interface, releasing hydrogen and creating positively charged donor interface traps (Dit).\n- Positive Bias Temperature Instability (PBTI) affects NMOS transistors with high-k metal gates (HKMG): Electrons tunnel from the channel and become trapped in pre-existing bulk defects within the hafnium oxide (HfO2) dielectric layer.\n\nBoth mechanisms manifest as a progressive increase in threshold voltage magnitude (|Vth| increases), cutting drive current (Idsat) and degrading circuit clock frequencies over years of operation."
      },
      {
        heading: "2. Hot Carrier Injection (HCI) & Time-Dependent Dielectric Breakdown (TDDB)",
        body: "Under high drain-to-source bias, electrons entering the high-field pinch-off region near the drain gain kinetic energy far exceeding thermal equilibrium ('hot carriers'). These energetic electrons collide with the silicon lattice (impact ionization) or inject directly into the gate oxide, creating fixed oxide charge traps near the drain.\n\nConcurrently, Time-Dependent Dielectric Breakdown (TDDB) occurs across thin gate dielectrics under continuous electrostatic field stress. Over time, localized trap sites are generated probabilistically within the oxide bulk. When the density of defects reaches a critical percolation threshold, a conductive percolation filament shorts the gate to the channel, causing catastrophic gate dielectric rupture."
      },
      {
        heading: "3. Interconnect Electromigration & Back-End Failure",
        body: "Reliability degradation is not restricted to the transistor channel. In back-end-of-line (BEOL) copper interconnects, high current densities (>10^6 A/cm^2) create an intense 'electron wind'. The momentum transfer from moving electrons to stationary metal ions physically displaces copper atoms along grain boundaries and interfaces.\n\nOver time, atomic depletion creates voids near the cathode (leading to open-circuit failures or high resistance spikes), while atomic accumulation at the anode creates hillocks or whiskers (leading to short circuits between adjacent metal lines). Black's Equation governs lifetime predictions and establishes strict maximum current density limits in physical design design rule checks (DRC)."
      }
    ],
    practicalApplications: [
      "10-year mission-profile qualification for automotive powertrain controllers and safety ASICs",
      "Dynamic voltage and frequency scaling (DVFS) guard-banding to compensate for 10-year aging drift",
      "High-reliability aerospace satellite payload processor screening"
    ],
    relatedResearchTopicId: "transistor-reliability-aging-bti",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "According to Black's Equation, how does increasing current density through a copper interconnect affect its Mean Time to Failure (MTTF)?",
      options: [
        "It dramatically decreases MTTF inversely proportional to the current density raised to an exponent (typically n ≈ 1.5 to 2)",
        "It increases MTTF because electrons cool the wire down",
        "It has zero effect because copper atoms cannot move once solidified",
        "It linearly doubles the expected operating lifespan"
      ],
      correctAnswer: 0,
      explanation: "From Black's Equation (MTTF = A / J^n * exp(Ea/kT)), higher current density J severely shortens electromigration lifetime due to momentum transfer displacing metal atoms and creating voids."
    }
  },

  "failure-analysis-fault-isolation": {
    lessonId: "failure-analysis-fault-isolation",
    courseId: "device-modelling-testing",
    courseTitle: "Semiconductor Device Modelling, Testing & Reliability",
    title: "Physical Failure Analysis: Dual-Beam FIB, TEM, EMMI & Nanoprobing",
    description: "Master techniques for diagnosing semiconductor defects: photon emission microscopy (PEM/EMMI), dual-beam focused ion beam (FIB) micro-machining, and high-resolution TEM atomic imaging.",
    duration: "40 mins",
    moduleNumber: 2,
    lessonNumber: 4,
    equations: [
      {
        latex: "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2 m_e q V_{acc}}} \\approx \\frac{1.22}{\\sqrt{V_{acc}}} \\text{ nm}",
        name: "De Broglie Wavelength of Relativistic Electron Beam in TEM",
        explanation: "At an accelerating voltage of 200 kV to 300 kV, the relativistic de Broglie wavelength of electrons is below 0.0025 nm, enabling atomic lattice resolution down to sub-angstrom scales."
      },
      {
        latex: "I_{emission} \\propto \\exp\\left(-\\frac{h\\nu}{k_B T_e}\\right)",
        name: "Photon Emission Microscopy Hot Carrier Emission Spectrum",
        explanation: "Defects causing localized leakage currents or junction breakdown emit infrared photons through radiative recombination and intraband electron-phonon relaxation."
      }
    ],
    sections: [
      {
        heading: "1. The Failure Analysis (FA) Workflow: Non-Destructive to Destructive",
        body: "When a customer returns a failed chip (RMA: Return Material Authorization) or early yield excursions occur on a fab line, Failure Analysis (FA) engineers must locate the exact microscopic defect among billions of transistors.\n\nThe investigation strictly follows a hierarchical workflow:\n1. Non-destructive electrical verification (curve tracer, ATE bench testing).\n2. Non-destructive imaging (Scanning Acoustic Microscopy (C-SAM) to find package delamination, high-resolution X-ray tomography).\n3. Non-destructive physical fault isolation (Optical Beam Induced Resistance Change (OBIRCH), Photon Emission Microscopy (PEM/EMMI)).\n4. Destructive physical analysis (de-capsulation, delayering, Focused Ion Beam (FIB) cross-sectioning, and atomic-scale TEM imaging)."
      },
      {
        heading: "2. Fault Isolation: EMMI, OBIRCH & Lock-in Thermography",
        body: "Before cutting into a silicon die, engineers must isolate the fault to a micron-sized coordinate:\n- Photon Emission Microscopy (EMMI / PEM): When biased near breakdown, anomalous leakage sites, gate oxide pinholes, and forward-biased pn junctions emit faint infrared photons. Sensitive InGaAs detectors map these photon hotspots directly onto CAD layout schematics.\n- OBIRCH / TIVA: A focused infrared laser scans the backside of the active die. At a localized resistive defect (such as an incomplete via or void), laser heating changes local electrical resistance, causing a detectable variation in the external supply current."
      },
      {
        heading: "3. Nanoprobing, Dual-Beam FIB & Atomic Resolution TEM",
        body: "Once isolated to an individual transistor:\n- Atomic Force / SEM Nanoprobing: Four to eight tungsten needles with tip radii <20 nm are guided inside an ultra-high vacuum SEM to make direct contact with source, drain, and gate contacts of a single failing transistor, measuring individual IV curves.\n- Dual-Beam FIB-SEM: Combines a Gallium ion (Ga+) beam for precision micro-machining with an electron beam for real-time imaging. The FIB cuts a precise microscopic lamella (<50 nm thick) containing the defect.\n- Transmission Electron Microscopy (TEM): Accelerating electrons at 200-300 kV through the ultrathin lamella reveals individual atomic columns, interfacial oxide layers, crystalline lattice dislocations, and chemical elemental maps via Energy-Dispersive X-ray Spectroscopy (EDS) and Electron Energy Loss Spectroscopy (EELS)."
      }
    ],
    practicalApplications: [
      "Root-cause identification of new process yield baseline dropouts at fab start-up",
      "Analysis of electrostatic discharge (ESD) and electrical overstress (EOS) field customer returns",
      "Atomic verification of gate dielectric thickness and nanosheet channel geometry"
    ],
    relatedResearchTopicId: "compact-modeling-bsim-cmg",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "Why is non-destructive fault isolation (such as EMMI or OBIRCH) performed before Focused Ion Beam (FIB) physical cross-sectioning?",
      options: [
        "Because once a chip is physically cut or de-processed by FIB, the original electrical defect cannot be re-isolated or tested again",
        "Because FIB tools require sunlight to operate",
        "Because EMMI repairs all physical damage automatically",
        "Because ATE testers cannot connect to cut packages"
      ],
      correctAnswer: 0,
      explanation: "Destructive physical cross-sectioning is irreversible. If the fault location is not accurately pinpointed to within micrometers using non-destructive optical/thermal techniques first, the cut will miss the defect and destroy the evidence."
    }
  }
};
