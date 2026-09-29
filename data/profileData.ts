export interface StudentProfile {
  name: string;
  role: string;
  avatarInitials: string;
  institution: string;
  degree: string;
  graduationYear: string;
  careerGoal: string;
  overallProgressPct: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  quizAccuracy: string;
  tapeoutsCompleted: number;
  skills: { name: string; level: "Mastered" | "Proficient" | "Learning"; pct: number }[];
  completedCourses: { id: string; name: string; score: string; date: string }[];
  projects: { id: string; name: string; tag: string; repoUrl: string; status: "Completed" | "In Progress" }[];
  certificates: { id: string; title: string; issuer: string; date: string; verifyId: string }[];
  achievements: { title: string; desc: string; icon: string; date: string }[];
  savedTopics: { title: string; category: string; route: string }[];
  recommendedNextStep: {
    title: string;
    category: string;
    desc: string;
    route: string;
    duration: string;
  };
}

export const USER_PROFILE_DATA: StudentProfile = {
  name: "Alex Vance",
  role: "Semiconductor Engineering Student & Chip Designer",
  avatarInitials: "AV",
  institution: "Institute of Microelectronics & Electrical Engineering",
  degree: "B.S. in Electrical & Computer Engineering",
  graduationYear: "2026",
  careerGoal: "Physical Design & STA Engineer",
  overallProgressPct: 42,
  completedLessonsCount: 18,
  totalLessonsCount: 42,
  quizAccuracy: "94.2%",
  tapeoutsCompleted: 3,
  skills: [
    { name: "Verilog / SystemVerilog", level: "Mastered", pct: 92 },
    { name: "Digital Logic & FSMs", level: "Mastered", pct: 95 },
    { name: "CMOS Inverter & Delay", level: "Proficient", pct: 85 },
    { name: "Linux & Bash / Tcl", level: "Proficient", pct: 80 },
    { name: "Static Timing Analysis (STA)", level: "Learning", pct: 60 },
    { name: "Python / EDA Scripting", level: "Proficient", pct: 88 },
    { name: "SPICE / Transistor Simulation", level: "Learning", pct: 65 }
  ],
  completedCourses: [
    { id: "semiconductor-fundamentals", name: "Semiconductor Fundamentals & Band Theory", score: "98%", date: "March 2026" },
    { id: "pn-junction-diodes", name: "PN Junction & Diode Dynamics", score: "94%", date: "April 2026" },
    { id: "cmos-digital-design", name: "CMOS Digital IC Design & Logic Effort", score: "91%", date: "May 2026" }
  ],
  projects: [
    { id: "p1", name: "5-Stage Pipelined RV32I Processor", tag: "SystemVerilog / Verilator", repoUrl: "https://github.com", status: "Completed" },
    { id: "p2", name: "SkyWater 130nm ASIC UART Tape-out", tag: "OpenLane / Magic", repoUrl: "https://github.com", status: "Completed" },
    { id: "p3", name: "Two-Stage Miller Op-Amp (130nm)", tag: "NGSPICE / Xschem", repoUrl: "https://github.com", status: "In Progress" }
  ],
  certificates: [
    { id: "c1", title: "Certificate of Mastery in Semiconductor Device Physics", issuer: "Semiconductor Platform Academy", date: "April 2026", verifyId: "SEMI-PHY-88421" },
    { id: "c2", title: "Verified ASIC RTL Synthesis Specialist", issuer: "VLSI Industry Alliance", date: "May 2026", verifyId: "VLSI-RTL-99120" }
  ],
  achievements: [
    { title: "First Tape-out Verified", desc: "Generated DRC/LVS clean GDSII for SkyWater 130nm PDK", icon: "Cpu", date: "May 2026" },
    { title: "Quiz Master (Top 5%)", desc: "Maintained >90% average across 10 diagnostic testbenches", icon: "Trophy", date: "April 2026" },
    { title: "Quantum & Band Theory Scholar", desc: "Completed all Bohr model & E-k dispersion derivations", icon: "Atom", date: "March 2026" }
  ],
  savedTopics: [
    { title: "GAAFET Stacked Nanosheets: Physics & Electrostatics", category: "Advanced Devices", route: "/lessons/gaafet-nanosheet-physics" },
    { title: "Static Timing Analysis (STA) & SDC Constraints", category: "VLSI Design", route: "/courses/vlsi-chip-design" },
    { title: "Extreme Ultraviolet Lithography (EUV)", category: "Fabrication", route: "/glossary" }
  ],
  recommendedNextStep: {
    title: "Learn Static Timing Analysis (STA) & Slack Optimization",
    category: "VLSI & Chip Design",
    desc: "Master setup/hold slacks, clock skew, and multi-corner constraint budgeting to qualify for Physical Design Engineer roles.",
    route: "/courses/vlsi-chip-design",
    duration: "4.0 Hours"
  }
};
