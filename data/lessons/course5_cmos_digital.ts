import { FullLessonData } from "./types";

export const COURSE_5_LESSONS: Record<string, FullLessonData> = {
  "cmos-inverter-vtc": {
    id: "cmos-inverter-vtc",
    courseId: "cmos-digital-design",
    title: "CMOS Inverter DC Characteristics & Noise Margins",
    duration: "60 min",
    difficulty: "Intermediate",
    tag: "DIGITAL CMOS",
    summary: "Analyze the complementary CMOS inverter, Voltage Transfer Characteristic (VTC), switching threshold VM, high/low noise margins, and PMOS/NMOS width sizing.",
    learningObjectives: [
      "Derive the 5 operational regions of the CMOS Voltage Transfer Characteristic (VTC).",
      "Calculate the switching threshold VM and determine the optimal PMOS-to-NMOS sizing ratio (Wp/Wn).",
      "Calculate High Noise Margin (NMH = VOH - VIH) and Low Noise Margin (NML = VIL - VOL)."
    ],
    keyFormulas: [
      {
        label: "Symmetric Switching Threshold",
        formula: "VM = (Vthn + √(βp/βn) · (VDD - |Vthp|)) / [ 1 + √(βp/βn) ]",
        desc: "Point where Vin = Vout; equals VDD / 2 when βn = βp and symmetric thresholds."
      },
      {
        label: "PMOS/NMOS Width Ratio",
        formula: "(Wp / Lp) / (Wn / Ln) ≈ μn / μp ≈ 2.2 to 2.5",
        desc: "Sizing ratio compensating for lower hole mobility in silicon."
      },
      {
        label: "High Noise Margin (NMH)",
        formula: "NMH = VOH - VIH",
        desc: "Tolerance against positive-going noise glitches on logic-1 levels."
      }
    ],
    sections: [
      {
        title: "1. The Complementary Architecture and VTC",
        content: [
          "The static CMOS inverter pairs an NMOS pull-down network with a PMOS pull-up network.",
          "When Vin = 0 (Logic 0), the NMOS is OFF and the PMOS is strongly ON, connecting Vout directly to VDD with rail-to-rail swing (VOH = VDD) and near-zero static DC power.",
          "When Vin = VDD (Logic 1), the PMOS is OFF and the NMOS is strongly ON, pulling Vout to ground (VOL = 0V).",
          "Plotting Vout vs Vin produces the Voltage Transfer Characteristic (VTC). In the transition region, both transistors operate in saturation simultaneously, generating extremely steep voltage gain (-Av > 10 to 50)."
        ]
      },
      {
        title: "2. Noise Margins and PMOS Sizing",
        content: [
          "Noise Margins define the circuit's immunity against electrical noise. VIH and VIL are defined at the unity-gain points where the slope dVout/dVin = -1.",
          "Low Noise Margin: NML = VIL - VOL. High Noise Margin: NMH = VOH - VIH.",
          "Because electron mobility μn is ~2.2× to 3× higher than hole mobility μp in silicon, an equal-sized PMOS conducts less current than NMOS, shifting the switching threshold VM below VDD/2.",
          "By sizing the PMOS width (Wp/Wn ≈ 2.2), current driving capabilities balance, centering the switching threshold symmetrically at VM = VDD / 2 and maximizing noise margins."
        ],
        callout: {
          type: "design",
          title: "Standard Cell Track Height",
          text: "Standard cell library track heights (e.g. 6-track vs 4.5-track) dictate the maximum PMOS and NMOS fin/nanosheet count that can fit inside logic cell boundaries!"
        }
      }
    ],
    checkpoint: {
      question: "Why is the PMOS transistor in a standard silicon CMOS inverter typically sized 2 to 2.5 times wider than the NMOS transistor?",
      options: [
        "Because PMOS transistors handle higher supply voltage",
        "Because hole mobility in silicon is significantly lower than electron mobility",
        "Because PMOS gate dielectric is 2× thicker",
        "Because PMOS transistors are prone to thermal runaway"
      ],
      correctIndex: 1,
      explanation: "Hole mobility in silicon (μp ≈ 450 cm²/V·s) is roughly 2.5× lower than electron mobility (μn ≈ 1400 cm²/V·s). To achieve equal current drive (βn = βp) and symmetric rise/fall times, PMOS width must be scaled wider."
    },
    keyTakeaways: [
      "CMOS provides rail-to-rail output swing with zero static power dissipation in steady state.",
      "Symmetric switching threshold VM = VDD/2 maximizes high and low noise margins.",
      "PMOS channel width is sized ~2× to 2.5× wider than NMOS to compensate for hole mobility."
    ],
    practicalApplications: [
      "Standard cell digital logic library design (Inverters, NAND, NOR)",
      "Clock buffer tree sizing and skew balancing",
      "SRAM cross-coupled inverter storage cell stability"
    ],
    relatedResearchTopicId: "cmos-inverter-transfer-noise-margins-latchup",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "compact-modeling-bsim",
    nextLessonId: "elmore-delay-logical-effort"
  },
  "elmore-delay-logical-effort": {
    id: "elmore-delay-logical-effort",
    courseId: "cmos-digital-design",
    title: "Propagation Delay & The Method of Logical Effort",
    duration: "65 min",
    difficulty: "Advanced",
    tag: "TIMING OPTIMIZATION",
    summary: "Master RC tree propagation delay (Elmore delay), dynamic switching energy, and Sutherland's Method of Logical Effort for optimal gate sizing and buffer insertion.",
    learningObjectives: [
      "Calculate combinational propagation delay using the Elmore RC distributed delay model.",
      "Calculate dynamic switching power P_dyn = α · C_load · VDD² · f.",
      "Apply the Method of Logical Effort to determine optimal stage counts and gate sizes along critical timing paths."
    ],
    keyFormulas: [
      {
        label: "Dynamic Switching Power",
        formula: "P_dynamic = α · C_load · VDD² · f",
        desc: "Power consumed charging and discharging capacitive loads at clock frequency f with activity factor α."
      },
      {
        label: "Elmore RC Delay",
        formula: "t_pd = ∑ [ R_k · C_downstream,k ]",
        desc: "First moment of impulse response in distributed RC networks."
      },
      {
        label: "Stage Effort",
        formula: "f = g · h + p = g · (C_out / C_in) + p",
        desc: "Normalized delay decomposed into logical effort g, electrical effort h (fanout), and parasitic delay p."
      }
    ],
    sections: [
      {
        title: "1. Delay Modeling: From RC Trees to Elmore Delay",
        content: [
          "Transistors behave as non-linear switched resistors driving capacitive gate and interconnect loads.",
          "The Elmore Delay model sums the product of each resistance with the total downstream capacitance attached to it: t_pd = Σ Ri · Ci,downstream.",
          "In long on-chip interconnect wires, delay scales quadratically with wire length (t ∝ Rwire · Cwire ∝ L²). Inserting repeaters (buffers) breaks long wires into linear segments, dramatically reducing wire delay."
        ]
      },
      {
        title: "2. The Method of Logical Effort",
        content: [
          "Developed by Ivan Sutherland, Logical Effort provides an elegant pencil-and-paper method to size multi-stage combinational logic paths for minimum delay.",
          "Total delay of a logic gate is normalized: d = g·h + p.",
          "Logical Effort (g): Ratio of gate input capacitance to an inverter input capacitance delivering equal drive current (g = 1 for Inverter, g = 4/3 for 2-input NAND, g = 5/3 for 2-input NOR).",
          "Electrical Effort (h): Fanout ratio h = Cout / Cin.",
          "To minimize total path delay D, every stage along an N-stage path must bear an identical stage effort: f* = F^(1/N) = (G · B · H)^(1/N) ≈ 3.5 to 4.0!"
        ],
        callout: {
          type: "design",
          title: "Golden Sizing Rule",
          text: "When driving large off-chip or clock loads, the optimal fanout per buffer stage is mathematically equal to Euler's number e ≈ 2.718 (practically ~3.5 to 4.0 in real silicon with parasitics)!"
        }
      }
    ],
    checkpoint: {
      question: "According to the Method of Logical Effort, what is the logical effort (g) of a 2-input CMOS NAND gate relative to a standard inverter (g = 1)?",
      options: [
        "g = 1.0",
        "g = 4/3 (≈ 1.33)",
        "g = 5/3 (≈ 1.67)",
        "g = 2.5"
      ],
      correctIndex: 1,
      explanation: "A 2-input NAND has 2 PMOS in parallel (size 2 each) and 2 NMOS in series (size 2 each). Input capacitance per pin is 2 + 2 = 4. An inverter with equal drive has 2 PMOS + 1 NMOS = 3. Therefore g = 4/3."
    },
    keyTakeaways: [
      "Dynamic power scales quadratically with supply voltage: P = α · C · VDD² · f.",
      "Elmore delay accurately approximates distributed RC interconnect and gate tree delays.",
      "Minimum path delay is achieved when stage effort is distributed equally across all stages (f* ≈ 4)."
    ],
    practicalApplications: [
      "Automated gate sizing and buffer tree insertion in ASIC synthesis tools (Design Compiler)",
      "64-bit adder carry-lookahead critical path optimization",
      "Dynamic voltage and frequency scaling (DVFS) power optimization"
    ],
    relatedResearchTopicId: "dynamic-power-capacitance-switching-activity",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "cmos-inverter-vtc",
    nextLessonId: "dynamic-cmos-pass-transistor"
  },
  "dynamic-cmos-pass-transistor": {
    id: "dynamic-cmos-pass-transistor",
    courseId: "cmos-digital-design",
    title: "Dynamic CMOS, Domino Logic & Pass Transistors",
    duration: "55 min",
    difficulty: "Advanced",
    tag: "HIGH-SPEED CIRCUITS",
    summary: "Examine pass-transistor logic, transmission gates, dynamic precharge/evaluate clocking, charge sharing, keeper transistors, and Domino CMOS cascading.",
    learningObjectives: [
      "Analyze full rail-to-rail transmission gates and explain the threshold voltage drop (Vth) in pure NMOS pass transistors.",
      "Understand the two clock phases of dynamic logic: Precharge (CLK = 0) and Evaluate (CLK = 1).",
      "Address charge-sharing noise glitches using weak PMOS feedback keeper transistors."
    ],
    keyFormulas: [
      {
        label: "Pass Transistor High Level",
        formula: "V_out,max = V_gate - Vthn",
        desc: "Threshold drop penalty when using single NMOS pass transistors to pass high logic levels."
      },
      {
        label: "Dynamic Charge Sharing",
        formula: "V_drop = VDD · [ C_internal / (C_dynamic + C_internal) ]",
        desc: "Voltage glitch on dynamic node when internal parasitic nodes discharge during evaluation."
      }
    ],
    sections: [
      {
        title: "1. Pass Transistors & Full-Swing Transmission Gates",
        content: [
          "Static CMOS requires 2N transistors for an N-input gate. Pass-transistor logic uses input signals to drive source/drain terminals directly, building multiplexers and XOR gates with 50% fewer transistors.",
          "However, an NMOS transistor cannot pass a full high rail: when Vout reaches VDD - Vthn, the transistor turns off, degrading noise margin and causing static leakage in downstream inverters.",
          "The Transmission Gate (TG) pairs an NMOS and PMOS in parallel with complementary gate clocks. The NMOS pulls down cleanly to 0V, while the PMOS pulls up cleanly to VDD, passing full rail-to-rail signals."
        ]
      },
      {
        title: "2. Dynamic Domino Logic & Keepers",
        content: [
          "To achieve maximum gigahertz performance in microprocessors, dynamic logic replaces the bulky PMOS pull-up network with a single clocked precharge transistor.",
          "Precharge Phase (CLK = 0): The dynamic node is precharged to VDD.",
          "Evaluate Phase (CLK = 1): If the NMOS pull-down logic evaluates TRUE, the dynamic node discharges to ground. If FALSE, the node floats high.",
          "Because the floating node is vulnerable to subthreshold leakage and capacitive charge sharing, a static inverter followed by a small feedback PMOS Keeper transistor is added, creating Domino Logic."
        ],
        callout: {
          type: "design",
          title: "Monotonicity Requirement",
          text: "In Domino logic, inputs to downstream dynamic gates must make only 0-to-1 transitions during evaluation. A 1-to-0 transition cannot recharge an accidentally discharged dynamic node until the next clock cycle!"
        }
      }
    ],
    checkpoint: {
      question: "Why must a weak PMOS feedback keeper transistor be added to the dynamic node in Domino CMOS logic?",
      options: [
        "To increase supply voltage to 5V",
        "To prevent charge loss from subthreshold leakage and charge sharing when the node floats high",
        "To turn the circuit into a radio antenna",
        "To invert the clock signal"
      ],
      correctIndex: 1,
      explanation: "During the evaluate phase, if the pull-down network is OFF, the dynamic node floats high. Subthreshold leakage and charge sharing could discharge the node, flipping the output. A weak PMOS keeper supplies trickle current to maintain VDD."
    },
    keyTakeaways: [
      "Transmission gates combine NMOS and PMOS to pass full rail-to-rail digital signals without threshold drops.",
      "Dynamic logic eliminates PMOS pull-up networks, reducing input capacitance and boosting speed.",
      "Domino logic requires monotonicity and PMOS keepers to maintain noise margin integrity."
    ],
    practicalApplications: [
      "Microprocessor integer ALU 64-bit adder execution units",
      "Content Addressable Memory (CAM) high-speed search match lines",
      "High-throughput crossbar multiplexer networks"
    ],
    relatedResearchTopicId: "transmission-gates-pass-transistor-domino-logic",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "elmore-delay-logical-effort",
    nextLessonId: "sequential-latches-flipflops"
  },
  "sequential-latches-flipflops": {
    id: "sequential-latches-flipflops",
    courseId: "cmos-digital-design",
    title: "Sequential Circuits: Static Latches & Master-Slave Flip-Flops",
    duration: "60 min",
    difficulty: "Intermediate",
    tag: "TIMING & REGISTERS",
    summary: "Formulate sequential bistable storage, setup time (t_setup), hold time (t_hold), clock-to-Q delay, master-slave D flip-flops, and metastability resolution.",
    learningObjectives: [
      "Understand the difference between level-sensitive latches and edge-triggered master-slave flip-flops.",
      "Derive the physical definitions of Setup Time (t_setup) and Hold Time (t_hold).",
      "Understand metastability in flip-flops and calculate Mean Time Between Failures (MTBF) for synchronizers."
    ],
    keyFormulas: [
      {
        label: "Maximum Operating Frequency",
        formula: "f_max = 1 / [ t_cq + t_logic,max + t_setup + t_skew ]",
        desc: "Maximum clock frequency bounded by register delays, combinational logic delay, and clock skew."
      },
      {
        label: "Hold Time Constraint",
        formula: "t_cq + t_logic,min ≥ t_hold + t_skew",
        desc: "Fundamental race condition requirement: new data must not contaminate current state before hold expires."
      },
      {
        label: "Synchronizer MTBF",
        formula: "MTBF = exp[ (t_resolve - t_setup) / τ ] / (T0 · f_clk · f_data)",
        desc: "Mean Time Between Failures for two-flip-flop synchronizers resolving asynchronous inputs."
      }
    ],
    sections: [
      {
        title: "1. Level-Sensitive Latches vs Edge-Triggered Flip-Flops",
        content: [
          "A Latch is level-sensitive: when clock is high (transparent phase), output Q follows input D directly. When clock drops low (opaque phase), cross-coupled inverters trap and store the bit.",
          "A Master-Slave Flip-Flop cascades two latches with complementary clocks: the Master latch samples data on CLK=0, and the Slave latch transfers data to output Q on the rising edge of CLK=1.",
          "This guarantees that data changes state strictly on the clock edge, preventing race-through conditions across pipelined logic blocks."
        ]
      },
      {
        title: "2. Setup, Hold, and Metastability Physics",
        content: [
          "Setup Time (t_setup): Minimum time data D must be stable before the active clock edge so the internal bistable feedback loop can resolve.",
          "Hold Time (t_hold): Minimum time data D must remain stable after the active clock edge so the master latch can isolate completely.",
          "Metastability: If an asynchronous input violates setup or hold constraints, the cross-coupled inverter feedback loop gets trapped at its intermediate balanced tipping point (VM ≈ VDD/2). The output lingers in an indeterminate state for an unpredictable duration before randomly resolving to 0 or 1!"
        ],
        callout: {
          type: "design",
          title: "Hold Violations Fatal in Silicon",
          text: "Setup violations can be cured by slowing down the clock frequency. Hold violations cannot be fixed by changing clock speed; a single silicon hold violation renders the chip non-functional and requires a multi-million-dollar mask re-spin!"
        }
      }
    ],
    checkpoint: {
      question: "Why can setup timing violations be mitigated by reducing the clock frequency, while hold timing violations cannot?",
      options: [
        "Because hold time depends on the moon phase",
        "Because hold constraints depend only on fast-path propagation delay (tcq + tlogic) relative to thold, which is completely independent of clock period T",
        "Because flip-flops only consume power during setup time",
        "Because hold violations only occur in software"
      ],
      correctIndex: 1,
      explanation: "The hold inequality is tcq + tlogic,min ≥ thold + tskew. The clock period T does not appear in this equation! Slowing down the clock gives more time for setup paths (tpd < T - tsetup), but does not help hold paths."
    },
    keyTakeaways: [
      "Master-slave flip-flops isolate sampling from driving to prevent pipeline race conditions.",
      "Setup time enforces data stability before the clock edge; hold time enforces stability after the clock edge.",
      "Asynchronous clock domain crossings require multi-stage synchronizers to mitigate metastability."
    ],
    practicalApplications: [
      "Pipelined RISC-V and ARM CPU register files and pipeline stage boundaries",
      "Asynchronous Clock Domain Crossing (CDC) synchronizer design",
      "Static timing analysis sign-off in ASIC physical design"
    ],
    relatedResearchTopicId: "static-timing-analysis-sta-pocv-si",
    relatedLabId: "cmos-inverter-lab",
    prevLessonId: "dynamic-cmos-pass-transistor",
    nextLessonId: "vlsi-rtl-to-gdsii"
  }
};
