import { FullLessonData } from "./types";

export const COURSE_4_LESSONS: Record<string, FullLessonData> = {
  "mos-capacitor-inversion": {
    id: "mos-capacitor-inversion",
    courseId: "mosfet-devices",
    title: "MOS Capacitor Physics: Accumulation to Strong Inversion",
    duration: "65 min",
    difficulty: "Intermediate",
    tag: "MOS PHYSICS",
    summary: "Analyze band bending, surface potential ψs, accumulation, depletion, weak inversion, and strong inversion under gate voltage bias.",
    learningObjectives: [
      "Identify the 3 operational regimes of a MOS capacitor: accumulation, depletion, and inversion.",
      "Derive the strong inversion condition: surface potential ψs = 2 · ψB.",
      "Explain the high-frequency and low-frequency C-V characteristics of a MOS stack."
    ],
    keyFormulas: [
      {
        label: "Oxide Capacitance per Area",
        formula: "Cox = ε_ox / tox",
        desc: "Dielectric capacitance per unit area where ε_ox = 3.9 · ε0 for SiO2 and ~25 · ε0 for HfO2."
      },
      {
        label: "Bulk Potential (ψB)",
        formula: "ψB = (kT / q) · ln(Na / ni)",
        desc: "Energy difference between intrinsic Fermi level Ei and Fermi level Ef in the p-type semiconductor substrate."
      },
      {
        label: "Strong Inversion Surface Potential",
        formula: "ψs = 2 · ψB",
        desc: "Threshold condition where surface electron concentration equals bulk majority hole concentration."
      }
    ],
    sections: [
      {
        title: "1. The 3 Regimes of MOS Electrostatics",
        content: [
          "Accumulation (Vg < 0 for p-substrate): Negative gate voltage attracts majority holes directly to the Si-dielectric interface, causing total capacitance to equal Cox.",
          "Depletion (0 < Vg < Vth): Positive gate voltage repels majority holes away from the interface, uncovering fixed negative acceptor ions (Na⁻). The gate capacitance is the series combination of Cox and depletion capacitance Cdep.",
          "Inversion (Vg ≥ Vth): When gate voltage exceeds threshold, band bending pulls the conduction band down near the Fermi level (ψs ≥ 2ψB), forming a conducting 2D sheet of minority electrons (the inversion channel)."
        ]
      },
      {
        title: "2. C-V Characteristic Curves & Frequency Response",
        content: [
          "At low frequencies (< 100 Hz), thermal generation-recombination can supply minority electrons fast enough to follow the AC signal, so capacitance returns to Cox in inversion.",
          "At high frequencies (> 1 MHz, typical in CMOS digital switching), minority carriers cannot respond to rapid AC probe signals, so total capacitance remains pinned at the minimum depletion capacitance value Cmin."
        ],
        callout: {
          type: "design",
          title: "MOSFET Transistor Action",
          text: "In a 4-terminal MOSFET, the heavily doped n+ source and drain supply minority electrons in picoseconds, allowing the inversion channel to conduct at gigahertz clock speeds."
        }
      }
    ],
    checkpoint: {
      question: "In an NMOS capacitor (p-type substrate), what condition defines the onset of strong inversion?",
      options: [
        "Surface potential ψs = 0",
        "Surface potential ψs = ψB",
        "Surface potential ψs = 2 · ψB",
        "Surface potential ψs = -ψB"
      ],
      correctIndex: 2,
      explanation: "Strong inversion occurs when the surface potential ψs reaches twice the bulk Fermi potential (2·ψB), making the electron concentration at the surface equal to the bulk hole concentration."
    },
    keyTakeaways: [
      "A MOS capacitor operates across accumulation, depletion, and inversion regimes under applied gate voltage.",
      "Strong inversion occurs at ψs = 2ψB, creating the conducting channel of a MOSFET.",
      "Oxide thickness scaling tox requires high-k dielectrics (HfO2) to prevent quantum mechanical tunneling leakage."
    ],
    practicalApplications: [
      "In-line cleanroom C-V characterization of gate oxide thickness",
      "Measurement of interface trap state density Dit via high/low frequency C-V stretchout",
      "DRAM storage cell capacitor dielectric optimization"
    ],
    relatedResearchTopicId: "mos-capacitor-c-v-accumulation-depletion-inversion",
    relatedLabId: "mos-capacitor-lab",
    prevLessonId: "bjt-switching-transients",
    nextLessonId: "mosfet-iv-characteristics"
  },
  "mosfet-iv-characteristics": {
    id: "mosfet-iv-characteristics",
    courseId: "mosfet-devices",
    title: "Threshold Voltage (Vth) & Long-Channel IV Equations",
    duration: "70 min",
    difficulty: "Advanced",
    tag: "MOSFET OPERATION",
    summary: "Formulate threshold voltage Vth, flatband voltage Vfb, body effect coefficient γ, and derive the gradual channel approximation linear and saturation current equations.",
    learningObjectives: [
      "Formulate threshold voltage Vth including workfunction difference Φms, oxide fixed charge, and body bias.",
      "Derive the Gradual Channel Approximation (GCA) drain current equations for linear and saturation regimes.",
      "Calculate transconductance gm and output conductance gds in the saturation regime."
    ],
    keyFormulas: [
      {
        label: "Threshold Voltage Equation",
        formula: "Vth = Vfb + 2·ψB + [ √(2·q·ε_si·Na·(2ψB + Vsb)) ] / Cox",
        desc: "Gate voltage required to achieve strong inversion at the surface, accounting for body bias Vsb."
      },
      {
        label: "Linear Regime Drain Current",
        formula: "ID = μn · Cox · (W / L) · [ (Vgs - Vth) · Vds - (Vds² / 2) ]",
        desc: "Conduction current when drain-source voltage is small (Vds < Vgs - Vth)."
      },
      {
        label: "Saturation Regime Drain Current",
        formula: "ID,sat = (1 / 2) · μn · Cox · (W / L) · (Vgs - Vth)² · (1 + λ · Vds)",
        desc: "Pinch-off square-law saturation current including channel-length modulation parameter λ."
      }
    ],
    sections: [
      {
        title: "1. Threshold Voltage Physics and Body Effect",
        content: [
          "The threshold voltage Vth is the gate voltage required to achieve strong surface inversion (ψs = 2ψB).",
          "It depends on flatband voltage Vfb (metal-semiconductor workfunction mismatch and oxide charges), surface band-bending energy, and the uncompensated depletion region bulk charge.",
          "Applying a reverse substrate-source bias (Vsb > 0) expands the depletion layer under the channel, increasing fixed charge that must be counteracted by the gate. This raises the threshold voltage via the Body Effect Coefficient γ: Vth = Vth0 + γ · [√(2ψB + Vsb) - √(2ψB)]."
        ]
      },
      {
        title: "2. The Gradual Channel Approximation (GCA)",
        content: [
          "Under the Gradual Channel Approximation, we assume the vertical electric field (governed by gate bias) is much stronger than the lateral electric field (governed by drain bias), allowing 1D electrostatic decoupling.",
          "Linear Regime (Vds < Vgs - Vth): The inversion channel connects source to drain continuously. Current increases almost linearly with Vds as a voltage-controlled resistor.",
          "Pinch-Off and Saturation (Vds ≥ Vgs - Vth): At the drain edge, the local gate-to-channel voltage drops to Vth. The inversion charge pinches off to zero. Carriers reaching the pinch-off point are swept across the high-field drain depletion region, causing current to saturate at a constant plateau ID,sat."
        ],
        callout: {
          type: "design",
          title: "Channel-Length Modulation",
          text: "In short channels, increasing Vds expands the drain depletion region backward into the channel, reducing effective channel length L_eff. This introduces a slight slope (λ) to the saturation current: ID = ID,sat · (1 + λ·Vds)."
        }
      }
    ],
    checkpoint: {
      question: "What physical event occurs inside an NMOS transistor when drain-source voltage reaches Vds = Vgs - Vth?",
      options: [
        "The gate dielectric ruptures catastrophically",
        "The inversion layer pinches off at the drain end, and current enters saturation",
        "The source-body diode enters forward conduction",
        "Carrier mobility increases to infinity"
      ],
      correctIndex: 1,
      explanation: "When Vds reaches Vgs - Vth, the local voltage across the oxide at the drain edge drops to exactly Vth, pinching off the surface inversion charge. Current saturates at ID,sat."
    },
    keyTakeaways: [
      "Threshold voltage Vth shifts with body bias Vsb via the body effect coefficient γ.",
      "In the linear regime, current follows a parabolic relationship with Vds; in saturation, current saturates quadratically with gate overdrive (Vgs - Vth)².",
      "Channel-length modulation λ causes a non-zero output conductance in saturation."
    ],
    practicalApplications: [
      "Standard cell multi-Vth transistor sizing for low-power SoCs",
      "Analog current mirror matching and saturation headroom budgeting",
      "Adaptive body biasing (ABB) in FD-SOI platforms"
    ],
    relatedResearchTopicId: "mosfet-threshold-voltage-body-effect-gradual-channel",
    relatedLabId: "mosfet-characteristics-lab",
    prevLessonId: "mos-capacitor-inversion",
    nextLessonId: "short-channel-effects-nanoscale"
  },
  "short-channel-effects-nanoscale": {
    id: "short-channel-effects-nanoscale",
    courseId: "mosfet-devices",
    title: "Short-Channel Effects (SCE) & Modern 3D Architectures",
    duration: "75 min",
    difficulty: "Advanced",
    tag: "NANOELECTRONICS",
    summary: "Explore the breakdown of classical MOSFET scaling: Drain-Induced Barrier Lowering (DIBL), subthreshold swing degradation, velocity saturation, and the transition to 3D FinFETs.",
    learningObjectives: [
      "Quantify Drain-Induced Barrier Lowering (DIBL) and Vth roll-off in sub-micron channels.",
      "Derive the subthreshold swing SS equation and calculate the thermodynamic 60 mV/dec limit at 300K.",
      "Analyze velocity saturation and explain why modern nanoscale MOSFETs exhibit linear rather than quadratic saturation current."
    ],
    keyFormulas: [
      {
        label: "Subthreshold Swing",
        formula: "SS = ln(10) · (k · T / q) · [ 1 + (Cdep / Cox) ]",
        desc: "Gate voltage required to change subthreshold leakage current by a factor of 10; ideal limit is 59.6 mV/dec at 300K."
      },
      {
        label: "DIBL Parameter",
        formula: "DIBL = [ Vth(low Vds) - Vth(high Vds) ] / [ Vds,high - Vds,low ]",
        desc: "Metric of drain coupling into channel potential barrier, measured in mV/V."
      },
      {
        label: "Velocity-Saturated Current",
        formula: "ID,sat = W · Cox · (Vgs - Vth) · vsat",
        desc: "Nanoscale saturation current linear with gate overdrive when high fields clamp carrier velocity to vsat."
      }
    ],
    sections: [
      {
        title: "1. The Breakdown of Classical Scaling: DIBL and Vth Roll-Off",
        content: [
          "As gate length Lg scales below 45nm, the drain depletion region begins to occupy a substantial fraction of the total channel length.",
          "Drain-Induced Barrier Lowering (DIBL): High drain voltage penetrates electrostatically into the channel, lowering the source-channel potential barrier even when the gate is turned OFF. This causes threshold voltage to roll off and off-state leakage current (Ioff) to explode exponentially!",
          "Subthreshold Swing (SS) degrades from near-ideal 65 mV/dec up to > 100 mV/dec in short planar devices, preventing further reduction in supply voltage VDD without causing intolerable standby power leakage."
        ]
      },
      {
        title: "2. Velocity Saturation & Linear Overdrive",
        content: [
          "In long-channel transistors, drift velocity increases linearly with electric field: vd = μ·E. In nanoscale channels, lateral electric fields easily exceed 10⁴ V/cm.",
          "Optical phonon emission causes carrier velocity to saturate at a maximum ceiling vsat ≈ 1.0 × 10⁷ cm/s in silicon.",
          "Consequently, nanoscale MOSFET saturation current loses its classical quadratic square-law dependence, becoming strictly linear with gate overdrive: ID,sat = W · Cox · (Vgs - Vth) · vsat.",
          "To restore gate control over short channels, the semiconductor industry abandoned planar silicon at 22nm, transitioning to 3-dimensional FinFETs where a raised vertical fin is wrapped on 3 sides by the gate electrode!"
        ],
        callout: {
          type: "physics",
          title: "Scale Length Criterion",
          text: "To suppress DIBL, the channel length must exceed approximately 4.5× the natural electrostatic scale length λ = √[(ε_si / ε_ox) · tox · Wfin]."
        }
      }
    ],
    checkpoint: {
      question: "Why does the drain saturation current ID,sat of a sub-10nm MOSFET increase linearly with (Vgs - Vth) rather than quadratically?",
      options: [
        "Because electrons turn into holes at high voltages",
        "Because extreme electric fields cause carrier velocity saturation at vsat",
        "Because gate oxide thickness becomes negative",
        "Because silicon turns into a superconductor"
      ],
      correctIndex: 1,
      explanation: "In ultra-short channels, lateral electric fields exceed 10⁴ V/cm, causing optical phonon emission that caps carrier drift velocity at vsat ≈ 10⁷ cm/s. Current therefore scales as ID = W·Cox·(Vgs - Vth)·vsat (linear overdrive)."
    },
    keyTakeaways: [
      "DIBL lowers the source injection barrier, causing severe off-state leakage in short channels.",
      "Velocity saturation clamps carrier speed, linearizing the ID-VGS transfer characteristic.",
      "FinFET 3D trigate architectures rescued Moore's Law by wrapping channels to suppress short-channel effects."
    ],
    practicalApplications: [
      "Sub-10nm FinFET and nanosheet transistor performance modeling",
      "Dynamic power vs static leakage optimization in smartphone processors",
      "Analog transconductance efficiency (gm / ID) optimization in nanometer CMOS"
    ],
    relatedResearchTopicId: "subthreshold-swing-dibl-short-channel-effects",
    relatedLabId: "mosfet-characteristics-lab",
    prevLessonId: "mosfet-iv-characteristics",
    nextLessonId: "high-k-metal-gate-stacks"
  },
  "high-k-metal-gate-stacks": {
    id: "high-k-metal-gate-stacks",
    courseId: "mosfet-devices",
    title: "High-k Dielectrics & Metal Gate (HKMG) Stacks",
    duration: "55 min",
    difficulty: "Advanced",
    tag: "MATERIALS ENGINEERING",
    summary: "Examine quantum mechanical direct gate oxide tunneling, Equivalent Oxide Thickness (EOT), HfO2 high-k dielectrics, and dual workfunction metal gate engineering.",
    learningObjectives: [
      "Calculate quantum direct tunneling leakage current through sub-1.5nm SiO2 dielectric films.",
      "Understand Equivalent Oxide Thickness: EOT = tox,high-k · (ε_SiO2 / ε_high-k).",
      "Differentiate between Gate-First and Gate-Last (Replacement Metal Gate / RMG) integration flows."
    ],
    keyFormulas: [
      {
        label: "Equivalent Oxide Thickness (EOT)",
        formula: "EOT = t_high-k · (ε_SiO2 / ε_high-k) = t_high-k · (3.9 / 25)",
        desc: "Equivalent physical thickness of SiO2 providing identical electrostatic capacitance as a high-k layer."
      },
      {
        label: "Direct Quantum Tunneling Current",
        formula: "J_tunnel ∝ exp[ -2 · tox · √(2·m*·q·ΦB) / ℏ ]",
        desc: "Exponential gate leakage current through ultra-thin dielectric potential barriers."
      }
    ],
    sections: [
      {
        title: "1. The Quantum Tunneling Crisis of Silicon Dioxide",
        content: [
          "Historically, silicon dioxide (SiO2, dielectric constant κ = 3.9) was the ideal gate insulator because it forms a pristine, atomically smooth interface with silicon.",
          "However, to maintain gate capacitance as gate length scaled, SiO2 thickness had to be scaled below 1.2nm—a distance of only ~4 to 5 silicon atoms!",
          "At sub-1.2nm dimensions, quantum mechanical wavefunctions penetrate directly through the barrier. Direct tunneling gate leakage exploded past 100 A/cm², draining smartphone batteries even when idle!"
        ]
      },
      {
        title: "2. The High-k Solution & Replacement Metal Gate (RMG)",
        content: [
          "In 2007, the semiconductor industry replaced SiO2 with Hafnium Dioxide (HfO2, κ ≈ 25), a high-permittivity dielectric.",
          "Because HfO2 has a dielectric constant ~6× higher than SiO2, a physically thick 3.0nm HfO2 film provides the same electrostatic capacitance as a fragile 0.5nm SiO2 layer (EOT = 0.5nm), while slashing quantum tunneling leakage by over 1,000×!",
          "Concurrently, polysilicon gates were replaced with Workfunction Metal Gates (TiN, TaN, Al alloys) to eliminate polysilicon gate depletion. The Replacement Metal Gate (RMG / Gate-Last) flow deposits the sensitive metal stack after high-temperature source/drain anneals."
        ],
        callout: {
          type: "design",
          title: "Industrial Milestone",
          text: "Intel's commercial introduction of High-k Metal Gate (HKMG) at the 45nm node is widely regarded as the most radical transistor materials change in 40 years!"
        }
      }
    ],
    checkpoint: {
      question: "If an advanced transistor uses a 2.5 nm physical film of HfO2 (κ = 25) as its gate dielectric, what is its Equivalent Oxide Thickness (EOT) relative to SiO2 (κ = 3.9)?",
      options: [
        "EOT = 2.5 nm",
        "EOT = 0.39 nm",
        "EOT = 16.0 nm",
        "EOT = 1.0 nm"
      ],
      correctIndex: 1,
      explanation: "Using EOT = t_high-k · (ε_SiO2 / ε_high-k) = 2.5 nm · (3.9 / 25) = 2.5 · 0.156 = 0.39 nm."
    },
    keyTakeaways: [
      "High-k dielectrics (HfO2) allow thicker physical films while maintaining sub-1nm Equivalent Oxide Thickness.",
      "Workfunction metal gates eliminate polysilicon gate depletion and allow threshold voltage tuning.",
      "Replacement Metal Gate (RMG) protects sensitive gate stacks from high-temperature dopant activation."
    ],
    practicalApplications: [
      "Sub-2nm Gate-All-Around nanosheet HKMG stack optimization",
      "Dipole layer engineering (La, Al) for multi-Vth threshold customization",
      "High-density MIM capacitor dielectrics in DRAM memory"
    ],
    relatedResearchTopicId: "high-k-metal-gate-hkmg-workfunction-engineering",
    relatedLabId: "mos-capacitor-lab",
    prevLessonId: "short-channel-effects-nanoscale",
    nextLessonId: "compact-modeling-bsim"
  },
  "compact-modeling-bsim": {
    id: "compact-modeling-bsim",
    courseId: "mosfet-devices",
    title: "Compact SPICE Modeling with BSIM-CMG",
    duration: "60 min",
    difficulty: "Advanced",
    tag: "EDA & SIMULATION",
    summary: "Understand how device physics is translated into industry-standard compact models (BSIM-CMG) for circuit simulation, process corners, and PDK characterization.",
    learningObjectives: [
      "Understand the purpose of compact models bridging foundry physics to fabless circuit designers.",
      "Analyze the core surface-potential formulation in the BSIM-CMG (Common Multi-Gate) standard.",
      "Understand statistical Monte Carlo mismatch modeling and Process-Voltage-Temperature (PVT) corners."
    ],
    keyFormulas: [
      {
        label: "Unified Charge-Sheet Formulation",
        formula: "qis = -Cox · (Vgs - Vth - ψs)",
        desc: "Continuous analytical description of inversion charge valid smoothly from subthreshold to strong inversion."
      },
      {
        label: "Pelgrom Mismatch Scaling Law",
        formula: "σ(ΔVth) = Avt / √(W · L)",
        desc: "Statistical standard deviation of threshold voltage mismatch between identical paired transistors."
      }
    ],
    sections: [
      {
        title: "1. The Bridge Between Foundry and Circuit Designer",
        content: [
          "Numerical TCAD solvers numerically compute 3D differential equations, taking hours to simulate a single transistor. Circuit designers, however, need SPICE to simulate millions of transistors in seconds.",
          "Compact Models are closed-form, mathematically rigorous analytical equations that capture all physical phenomena—quantum confinement, mobility degradation, parasitic capacitances, and thermal noise—with infinite derivative continuity (C∞).",
          "BSIM-CMG (Berkeley Short-Channel IGFET Model - Common Multi-Gate), developed by UC Berkeley, is the universal golden industry standard model for FinFETs and GAA nanosheets."
        ]
      },
      {
        title: "2. Process Design Kits (PDKs) and Process Corners",
        content: [
          "Foundries deliver compact models inside a Process Design Kit (PDK) containing calibrated model card parameters extracted from silicon test wafers.",
          "Circuit reliability is verified across PVT Corners: TT (Typical-Typical), FF (Fast NMOS, Fast PMOS - highest speed and dynamic power), SS (Slow NMOS, Slow PMOS - lowest speed and worst setup timing), and cross corners (FS, SF).",
          "Monte Carlo mismatch simulation uses Pelgrom's Law to model Random Dopant Fluctuation (RDF) and line-edge roughness in SRAM bitcells."
        ],
        callout: {
          type: "design",
          title: "Golden Sign-Off",
          text: "No chip tapes out without passing SPICE simulation across all PVT corners using foundry-calibrated BSIM-CMG model cards!"
        }
      }
    ],
    checkpoint: {
      question: "According to Pelgrom's Law, what happens to threshold voltage mismatch variability σ(ΔVth) between two adjacent matched transistors as transistor area (W · L) shrinks?",
      options: [
        "Variability decreases to zero",
        "Variability increases inversely with √(W · L)",
        "Variability stays exactly constant",
        "Variability depends only on supply voltage"
      ],
      correctIndex: 1,
      explanation: "Pelgrom's Law states σ(ΔVth) = Avt / √(W·L). As transistor dimensions shrink, random dopant fluctuations and atomistic edge roughness cause mismatch variability to increase sharply."
    },
    keyTakeaways: [
      "Compact models like BSIM-CMG translate complex quantum device physics into ultra-fast SPICE equations.",
      "Model equations must have continuous derivatives to prevent non-physical convergence failures in analog solvers.",
      "PDKs characterize performance across Process-Voltage-Temperature (PVT) sign-off corners."
    ],
    practicalApplications: [
      "Analog and RF circuit simulation in Cadence Spectre and Synopsys HSPICE",
      "Standard cell library timing and power characterization (.lib Liberty files)",
      "SRAM bitcell static noise margin (SNM) yield verification"
    ],
    relatedResearchTopicId: "compact-modeling-bsim-cmg-psp-spice",
    relatedLabId: "mosfet-characteristics-lab",
    prevLessonId: "high-k-metal-gate-stacks",
    nextLessonId: "cmos-inverter-vtc"
  }
};
