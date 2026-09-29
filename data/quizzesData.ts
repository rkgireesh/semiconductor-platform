export interface QuizQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizTestBench {
  id: string;
  title: string;
  topic: string;
  badgeVariant: "teal" | "sky" | "blue" | "purple" | "amber";
  timeMinutes: number;
  questionCount: number;
  questions: QuizQuestion[];
}

export const QUIZ_BENCHES: QuizTestBench[] = [
  {
    id: "semiconductor-physics-diagnostic",
    title: "Semiconductor Physics & Band Theory Diagnostic",
    topic: "Solid-State Fundamentals",
    badgeVariant: "teal",
    timeMinutes: 10,
    questionCount: 4,
    questions: [
      {
        id: "q1",
        question: "Why is Silicon classified as an 'indirect bandgap' semiconductor?",
        category: "Band Theory",
        difficulty: "Beginner",
        options: [
          "Its bandgap value changes randomly with applied voltage",
          "The conduction band minimum and valence band maximum occur at different crystal momentum wavevectors (k)",
          "It conducts electricity only along one spatial direction",
          "It has no conduction band"
        ],
        correctIndex: 1,
        explanation: "In silicon, the conduction band minimum is shifted along the <100> axis in k-space while the valence band maximum is at k=0. Optical recombination therefore requires a phonon for momentum conservation."
      },
      {
        id: "q2",
        question: "If a silicon sample is doped with Nd = 10¹⁷ cm⁻³ donors at 300K, what is the minority hole concentration p0? (ni = 10¹⁰ cm⁻³)",
        category: "Doping Physics",
        difficulty: "Intermediate",
        options: [
          "10¹⁷ cm⁻³",
          "10¹⁰ cm⁻³",
          "10³ cm⁻³",
          "10²⁷ cm⁻³"
        ],
        correctIndex: 2,
        explanation: "By the Mass Action Law: p0 = ni² / n0 = (10¹⁰)² / 10¹⁷ = 10²⁰ / 10¹⁷ = 10³ cm⁻³."
      },
      {
        id: "q3",
        question: "What physical mechanism governs carrier transport when a spatial concentration gradient exists without an applied electric field?",
        category: "Carrier Dynamics",
        difficulty: "Beginner",
        options: [
          "Carrier drift via mobility",
          "Carrier diffusion via thermal random motion",
          "Impact ionization",
          "Quantum tunneling"
        ],
        correctIndex: 1,
        explanation: "Diffusion is the statistical motion of charge carriers from regions of high concentration to low concentration driven by thermal kinetic energy."
      },
      {
        id: "q4",
        question: "What is the atomic volume density of monocrystalline silicon at room temperature?",
        category: "Crystallography",
        difficulty: "Beginner",
        options: [
          "1.0 × 10¹⁰ atoms/cm³",
          "5.0 × 10²² atoms/cm³",
          "6.02 × 10²³ atoms/cm³",
          "3.8 × 10¹⁸ atoms/cm³"
        ],
        correctIndex: 1,
        explanation: "With 8 atoms per diamond cubic unit cell of edge length a = 5.43 Å, density = 8 / (5.43 × 10⁻⁸)³ ≈ 5.0 × 10²² atoms/cm³."
      }
    ]
  },
  {
    id: "transistor-vlsi-interview",
    title: "MOSFET & VLSI Interview Benchmark Test",
    topic: "Transistor & Digital VLSI",
    badgeVariant: "purple",
    timeMinutes: 12,
    questionCount: 4,
    questions: [
      {
        id: "q5",
        question: "What is the theoretical thermodynamic lower limit for MOSFET subthreshold swing (SS) at 300K?",
        category: "Transistor Scaling",
        difficulty: "Intermediate",
        options: [
          "10 mV/decade",
          "30 mV/decade",
          "60 mV/decade (59.6 mV/dec)",
          "100 mV/decade"
        ],
        correctIndex: 2,
        explanation: "Due to Boltzmann thermal carrier distribution statistics, SS = ln(10)·(kT/q) ≈ 2.303 × 25.86 mV ≈ 59.6 mV/decade at 300K."
      },
      {
        id: "q6",
        question: "In Static Timing Analysis (STA), what condition must hold to avoid a Setup Timing Violation?",
        category: "Static Timing Analysis",
        difficulty: "Advanced",
        options: [
          "Tclk + Tskew ≥ Tcq + Tcomb + Tsetup",
          "Tcq + Tcomb < Thold",
          "Tclk = Tsetup + Thold",
          "Tskew must be exactly zero"
        ],
        correctIndex: 0,
        explanation: "Data launched from the source flip-flop must arrive and stabilize at the destination flip-flop at least Tsetup before the next clock capture edge: Tclk + Tskew ≥ Tcq + Tcomb + Tsetup."
      },
      {
        id: "q7",
        question: "Why do FinFET and GAAFET architectures drastically suppress Drain-Induced Barrier Lowering (DIBL)?",
        category: "Device Architecture",
        difficulty: "Advanced",
        options: [
          "They use copper instead of silicon",
          "Multi-sided gate wrapping provides superior 3D electrostatic channel potential control",
          "They operate without any gate dielectric",
          "They only conduct at cryogenic temperatures"
        ],
        correctIndex: 1,
        explanation: "Wrapping the gate electrode around 3 sides (FinFET) or 4 sides (GAAFET) of the channel prevents electric field lines from the drain from penetrating the channel and lowering the source barrier."
      },
      {
        id: "q8",
        question: "In standard CMOS inverter sizing, why is PMOS channel width typically sized 2× to 3× wider than NMOS?",
        category: "CMOS Digital",
        difficulty: "Beginner",
        options: [
          "PMOS runs hotter than NMOS",
          "Electron mobility (μn) is approximately 2× to 3× higher than hole mobility (μp) in silicon",
          "PMOS requires higher threshold voltage",
          "To reduce gate oxide thickness"
        ],
        correctIndex: 1,
        explanation: "In silicon, electron mobility is ~1350 cm²/V·s while hole mobility is ~480 cm²/V·s. PMOS is sized wider (Wp/Wn ≈ 2.2) to equalize rise and fall propagation delays."
      }
    ]
  }
];
