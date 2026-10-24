import { FullLessonData } from "./types";

export const COURSE_3_LESSONS: Record<string, FullLessonData> = {
  "bjt-physics-operation": {
    id: "bjt-physics-operation",
    courseId: "bjt-physics",
    title: "BJT Physics & Carrier Injection Dynamics",
    duration: "60 min",
    difficulty: "Intermediate",
    tag: "BIPOLAR PHYSICS",
    summary: "Examine double-junction NPN/PNP transistor action, forward-active minority electron injection into a narrow base, emitter injection efficiency, and current gain (α, β).",
    learningObjectives: [
      "Understand the forward-active biasing configuration of an NPN Bipolar Junction Transistor.",
      "Derive the base transport factor αT and emitter injection efficiency γ.",
      "Calculate common-base current gain α and common-emitter current gain β = α / (1 - α)."
    ],
    keyFormulas: [
      {
        label: "Common-Emitter Current Gain",
        formula: "β = IC / IB = α / (1 - α)",
        desc: "Ratio of collector current to base current; typical values range from 50 to 300."
      },
      {
        label: "Base Transit Time",
        formula: "τB = WB² / (2 · Dn)",
        desc: "Average time for an injected minority electron to diffuse across neutral base width WB."
      },
      {
        label: "Collector Saturation Current (IS)",
        formula: "IS = (q · A · Dn · ni²) / (QB)",
        desc: "Current prefactor governed by the base Gummel number QB (integrated base dopant charge)."
      }
    ],
    sections: [
      {
        title: "1. The Double-Junction NPN Transistor Action",
        content: [
          "A Bipolar Junction Transistor consists of two closely spaced back-to-back PN junctions: the Base-Emitter Junction (BEJ) and the Base-Collector Junction (BCJ).",
          "In Forward-Active Mode, the BEJ is forward-biased (~0.7V) and the BCJ is reverse-biased (> 1V).",
          "The heavily doped n⁺ emitter injects a massive stream of electrons into the thin, lightly doped p-type base.",
          "Because the neutral base width WB is engineered to be much smaller than the electron diffusion length Ln (WB << Ln), over 99% of injected electrons diffuse across the base without recombining, reaching the reverse-biased collector junction where the high electric field sweeps them into the collector as output current IC!"
        ]
      },
      {
        title: "2. The Current Gain Parameters: α and β",
        content: [
          "Emitter Injection Efficiency (γ): Fraction of BEJ forward current carried by desired electrons injected from emitter into base rather than wasteful holes back-injected from base into emitter.",
          "Base Transport Factor (αT): Fraction of injected electrons that successfully traverse the base without recombining with majority holes: αT ≈ 1 - WB² / (2Ln²).",
          "Common-Base Gain α = γ · αT. In modern transistors, α is typically 0.990 to 0.998.",
          "Common-Emitter Gain β = α / (1 - α). If α = 0.99, β = 99; if α = 0.995, β = 199. A tiny base current IB provides massive control over collector current IC!"
        ],
        callout: {
          type: "physics",
          title: "Transconductance Advantage",
          text: "BJT transconductance gm = IC / Vt depends strictly on collector current and is completely independent of transistor geometry, giving BJTs much higher voltage gain than MOSFETs!"
        }
      }
    ],
    checkpoint: {
      question: "If an NPN transistor has a common-base current gain of α = 0.995, what is its common-emitter current gain β?",
      options: [
        "β = 99",
        "β = 199",
        "β = 49",
        "β = 0.005"
      ],
      correctIndex: 1,
      explanation: "Using β = α / (1 - α) = 0.995 / (1 - 0.995) = 0.995 / 0.005 = 199."
    },
    keyTakeaways: [
      "BJT operation requires the base width to be much smaller than the minority carrier diffusion length (WB << Ln).",
      "Base current IB feeds the tiny minority recombination loss and back-injection, controlling large collector current IC.",
      "High current gain β requires heavy emitter doping and ultra-thin base widths."
    ],
    practicalApplications: [
      "Low-noise analog operational amplifier input stages",
      "Bandgap voltage reference circuits (e.g. Brokaw bandgap)",
      "Millimeter-wave RF power amplifiers in cellular base stations"
    ],
    relatedResearchTopicId: "bjt-minority-transport-ebers-moll",
    relatedLabId: "bjt-characteristics-lab",
    prevLessonId: "schottky-barrier-diodes",
    nextLessonId: "ebers-moll-early-effect"
  },
  "ebers-moll-early-effect": {
    id: "ebers-moll-early-effect",
    courseId: "bjt-physics",
    title: "Ebers-Moll Model & Early Voltage (VA)",
    duration: "55 min",
    difficulty: "Intermediate",
    tag: "BIPOLAR MODELING",
    summary: "Formulate the non-linear Ebers-Moll coupled diode equations across all four operational modes and analyze base-width modulation (Early effect) and output resistance ro.",
    learningObjectives: [
      "Formulate the non-linear Ebers-Moll model for forward-active, reverse-active, saturation, and cutoff modes.",
      "Analyze base-width modulation (Early effect) as reverse collector voltage widens the collector space-charge region.",
      "Calculate small-signal output resistance ro = (VA + VCE) / IC from the Early voltage VA."
    ],
    keyFormulas: [
      {
        label: "Early-Corrected Collector Current",
        formula: "IC = IS · exp[ VBE / Vt ] · [ 1 + (VCE / VA) ]",
        desc: "Collector current accounting for finite output resistance and base-width modulation."
      },
      {
        label: "Small-Signal Output Resistance",
        formula: "ro = (VA + VCE) / IC ≈ VA / IC",
        desc: "Dynamic AC output resistance in the forward-active regime."
      },
      {
        label: "Ebers-Moll Reciprocity",
        formula: "αF · IES = αR · ICS = IS",
        desc: "Fundamental reciprocity relationship linking forward and reverse saturation currents."
      }
    ],
    sections: [
      {
        title: "1. The Ebers-Moll Large-Signal Formulation",
        content: [
          "The Ebers-Moll model represents the BJT as two cross-coupled ideal diodes with forward and reverse current sources driven by reciprocity.",
          "Four operational quadrants emerge: Forward-Active (BEJ forward, BCJ reverse), Saturation (both junctions forward), Cutoff (both junctions reverse), and Reverse-Active (BEJ reverse, BCJ forward).",
          "In saturation mode, excess electrons pile up in the base from both junctions, dropping collector-emitter saturation voltage VCE,sat down to ~0.2V."
        ]
      },
      {
        title: "2. The Early Effect (Base-Width Modulation)",
        content: [
          "In an ideal transistor, collector current IC is independent of collector voltage VCE. In reality, increasing reverse voltage VCE widens the collector-base depletion region.",
          "Because the base is lightly doped, the depletion region expands directly into the neutral base, shrinking the effective base width WB.",
          "A narrower base width WB increases the minority electron concentration gradient (dn/dx ≈ n0/WB), causing collector current IC to increase with VCE.",
          "Extrapolating the sloped IC-VCE output curves backward to the negative voltage axis intersects at a single common voltage point: the Early Voltage VA (typically 50V to 150V in silicon)."
        ],
        callout: {
          type: "design",
          title: "Analog Gain Ceiling",
          text: "The maximum open-circuit voltage gain achievable by a single BJT stage is the intrinsic gain A0 = gm · ro = (IC / Vt) · (VA / IC) = VA / Vt ≈ 40 · VA, which is fundamentally capped by the Early voltage!"
        }
      }
    ],
    checkpoint: {
      question: "If a BJT operates at collector current IC = 1.0 mA with an Early Voltage of VA = 100 V, what is its small-signal output resistance ro?",
      options: [
        "100 Ω",
        "10 kΩ",
        "100 kΩ",
        "1 MΩ"
      ],
      correctIndex: 2,
      explanation: "Using ro ≈ VA / IC = 100 V / 0.001 A = 100,000 Ω = 100 kΩ."
    },
    keyTakeaways: [
      "The Ebers-Moll model accurately predicts large-signal DC currents across all 4 operational regions.",
      "The Early effect describes base narrowing under reverse collector bias, yielding finite output resistance ro.",
      "Intrinsic analog voltage gain is set by VA / Vt."
    ],
    practicalApplications: [
      "High-output-impedance cascode current mirrors",
      "Differential pair common-mode rejection ratio (CMRR) optimization",
      "Precision analog gain stage design"
    ],
    relatedResearchTopicId: "early-effect-kirk-effect-high-injection",
    relatedLabId: "bjt-characteristics-lab",
    prevLessonId: "bjt-physics-operation",
    nextLessonId: "bjt-small-signal-modeling"
  },
  "bjt-small-signal-modeling": {
    id: "bjt-small-signal-modeling",
    courseId: "bjt-physics",
    title: "Small-Signal Hybrid-Pi Modeling & Biasing",
    duration: "65 min",
    difficulty: "Advanced",
    tag: "ANALOG CIRCUITS",
    summary: "Derive the small-signal hybrid-pi equivalent circuit (gm, rπ, ro, Cπ, Cμ), transition frequency fT, and high-frequency gain roll-off.",
    learningObjectives: [
      "Derive small-signal parameters gm = IC / Vt and rπ = β / gm from DC bias points.",
      "Construct the high-frequency Hybrid-Pi model incorporating junction capacitances Cπ and Cμ.",
      "Calculate the unit-gain cutoff frequency fT = gm / [2π · (Cπ + Cμ)]."
    ],
    keyFormulas: [
      {
        label: "Transconductance",
        formula: "gm = IC / Vt = q · IC / (k · T)",
        desc: "AC voltage-to-current gain factor; approximately 38.7 mS per mA of collector current at 300K."
      },
      {
        label: "Input Base Resistance",
        formula: "rπ = β / gm = (β · Vt) / IC",
        desc: "Small-signal resistance seen looking into the base terminal."
      },
      {
        label: "Transition Cutoff Frequency (fT)",
        formula: "fT = gm / [ 2 · π · (Cπ + Cμ) ]",
        desc: "Frequency at which short-circuit common-emitter current gain drops to unity (0 dB)."
      }
    ],
    sections: [
      {
        title: "1. The Hybrid-Pi Small-Signal Model",
        content: [
          "Linearizing non-linear BJT equations around a quiescent DC operating point (Q-point) allows small AC signals to be modeled using linear equivalent circuits.",
          "Transconductance gm defines how base-emitter AC voltage vbe modulates collector AC current ic: ic = gm · vbe.",
          "Input resistance rπ represents the small-signal base current required to support carrier recombination: rπ = β / gm.",
          "At DC and low audio frequencies, output resistance ro models the Early effect in parallel with the dependent current source gm·vbe."
        ]
      },
      {
        title: "2. High-Frequency Parasitics and the Miller Effect",
        content: [
          "At high RF frequencies, internal device capacitances limit circuit bandwidth.",
          "Base-Emitter Capacitance (Cπ): Sum of depletion capacitance Cj,be and large forward diffusion capacitance Cd,be.",
          "Base-Collector Capacitance (Cμ): Reverse-biased junction capacitance bridging input to output. By the Miller Effect, Cμ is multiplied by stage voltage gain (1 + |Av|), dramatically increasing effective input capacitance and creating dominant pole roll-off.",
          "In SiGe Heterojunction Bipolar Transistors (HBTs), Germanium grading in the base accelerates electron transit, shrinking base transit time and pushing cutoff frequencies fT beyond 300 GHz!"
        ],
        callout: {
          type: "design",
          title: "RF Milestone",
          text: "Modern Silicon-Germanium (SiGe) BiCMOS technologies achieve fT and fmax exceeding 500 GHz, competing directly with expensive InP chips in 77 GHz automotive radar!"
        }
      }
    ],
    checkpoint: {
      question: "If a BJT is biased at IC = 2.0 mA at room temperature (Vt ≈ 25.9 mV) with current gain β = 100, what is its transconductance gm and input resistance rπ?",
      options: [
        "gm ≈ 77.2 mS, rπ ≈ 1.30 kΩ",
        "gm ≈ 2.0 mS, rπ ≈ 50 kΩ",
        "gm ≈ 38.7 mS, rπ ≈ 2.58 kΩ",
        "gm ≈ 100 mS, rπ ≈ 100 Ω"
      ],
      correctIndex: 0,
      explanation: "gm = IC / Vt = 2.0 mA / 25.9 mV ≈ 77.2 mS. Then rπ = β / gm = 100 / 0.0772 S ≈ 1295 Ω ≈ 1.30 kΩ."
    },
    keyTakeaways: [
      "Small-signal parameters gm and rπ depend strictly on the DC collector bias current IC.",
      "The Miller effect magnifies collector-base feedback capacitance Cμ, limiting high-frequency bandwidth.",
      "The unity-gain cutoff frequency is given by fT = gm / [2π·(Cπ + Cμ)]."
    ],
    practicalApplications: [
      "Low-Noise Amplifiers (LNA) for GPS and 5G cellular receivers",
      "Wideband transimpedance amplifiers for optical communication",
      "High-speed digital-to-analog converter (DAC) current steering cells"
    ],
    relatedResearchTopicId: "sige-heterojunction-bipolar-transistors",
    relatedLabId: "bjt-characteristics-lab",
    prevLessonId: "ebers-moll-early-effect",
    nextLessonId: "bjt-switching-transients"
  },
  "bjt-switching-transients": {
    id: "bjt-switching-transients",
    courseId: "bjt-physics",
    title: "BJT Switching Transients & Base Charge Storage",
    duration: "50 min",
    difficulty: "Intermediate",
    tag: "SWITCHING DYNAMICS",
    summary: "Analyze transient switching delays, turn-on delay, rise time, base saturation charge storage, storage delay time (ts), and Schottky-clamped Baker clamps.",
    learningObjectives: [
      "Decompose BJT transient switching time into delay, rise, storage, and fall intervals.",
      "Calculate the storage delay time ts caused by excess minority carrier charge stored in deep saturation.",
      "Understand how Schottky-clamped transistors (74S / 74LS TTL) prevent deep saturation."
    ],
    keyFormulas: [
      {
        label: "Storage Delay Time",
        formula: "ts = τs · ln[ (IB1 - IB2) / (IC,sat / β - IB2) ]",
        desc: "Time required to remove excess saturated base charge before collector current can begin falling."
      },
      {
        label: "Total Base Charge",
        formula: "QB = τB · IC + τs · I_overdrive",
        desc: "Sum of active transit charge and excess saturation storage charge."
      }
    ],
    sections: [
      {
        title: "1. The 4 Phases of BJT Switching",
        content: [
          "When driving a BJT between cutoff (OFF) and saturation (ON) states in digital logic or power switching, the transition is not instantaneous.",
          "Turn-on Delay Time (td): Time required to charge BEJ depletion capacitance from reverse bias to the 0.7V forward threshold.",
          "Rise Time (tr): Time required for collector current to ramp from 10% to 90% of saturation current as minority charge populates the base.",
          "Storage Time (ts): When saturated, excess base current overdrives the base, storing large charge Qs. When turning off, collector current remains stuck at IC,sat until this excess charge is fully removed!",
          "Fall Time (tf): Time for collector current to drop from 90% to 10% as remaining active base charge decays."
        ]
      },
      {
        title: "2. Schottky-Clamped BJT Logic (TTL)",
        content: [
          "Storage delay time ts is the major bottleneck in bipolar logic, often taking tens of nanoseconds.",
          "A Schottky-Clamped Transistor places a Schottky barrier diode across the base and collector terminals.",
          "When the transistor approaches saturation, the base-collector voltage approaches 0.4V. Because the Schottky diode turns on at ~0.3V (lower than the 0.7V silicon BE junction), it diverts excess base drive current directly into the collector.",
          "This Baker clamp prevents the BJT from ever entering deep saturation, slashing storage time ts to near zero and boosting switching speed by over 5×!"
        ],
        callout: {
          type: "design",
          title: "Historical Impact",
          text: "The invention of Schottky-clamped TTL (74S and 74LS logic series) powered the minicomputer revolution and high-speed mainframe computing before CMOS took over!"
        }
      }
    ],
    checkpoint: {
      question: "What causes the storage delay time (ts) when turning off a Bipolar Junction Transistor from the saturation state?",
      options: [
        "Lattice overheating in the collector",
        "Excess minority carrier charge stored in the base that must be evacuated before current can drop",
        "The transistor melting and recrystallizing",
        "Magnetic flux trapped inside the packaging leads"
      ],
      correctIndex: 1,
      explanation: "In deep saturation, excess base current stores surplus minority charge in the base and collector regions. This charge must be removed by reverse base current or recombination before the collector current can begin falling."
    },
    keyTakeaways: [
      "BJT turn-off is delayed primarily by saturation storage time ts.",
      "Storage charge Qs accumulates whenever base current exceeds the minimum saturation drive (IB > IC,sat / β).",
      "Schottky Baker clamps prevent saturation by diverting excess base drive, enabling fast switching."
    ],
    practicalApplications: [
      "High-speed saturated bipolar logic gates (74LS TTL)",
      "BJT power inverter switching loss minimization",
      "Base drive acceleration networks in discrete power switches"
    ],
    relatedResearchTopicId: "bjt-minority-transport-ebers-moll",
    relatedLabId: "bjt-characteristics-lab",
    prevLessonId: "bjt-small-signal-modeling",
    nextLessonId: "mos-capacitor-inversion"
  }
};
