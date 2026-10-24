import { ResearchTopic } from "./types";
import { TOPICS_PART_1 } from "./topicsPart1";
import { TOPICS_PART_2 } from "./topicsPart2";
import { TOPICS_PART_3 } from "./topicsPart3";
import { TOPICS_PART_4 } from "./topicsPart4";

export * from "./types";

export const RESEARCH_TOPICS: ResearchTopic[] = [
  ...TOPICS_PART_1,
  ...TOPICS_PART_2,
  ...TOPICS_PART_3,
  ...TOPICS_PART_4,
];

// 30 Core Curriculum Areas as specified
export const RESEARCH_AREAS = [
  "1. Semiconductor fundamentals and solid-state physics",
  "2. Quantum mechanics and energy-band theory",
  "3. Charge carriers, mobility, diffusion, and recombination",
  "4. PN junctions, diodes, and rectification",
  "5. BJT devices and transistor operation",
  "6. MOS capacitors and MOSFET physics",
  "7. FinFETs, Gate-All-Around transistors, and nanosheet devices",
  "8. CMOS technology and logic design",
  "9. VLSI design, RTL, verification, and synthesis",
  "10. Physical design, floorplanning, placement, and routing",
  "11. Semiconductor process integration",
  "12. Wafer manufacturing and crystal growth",
  "13. Photolithography, EUV, and High-NA EUV",
  "14. Etching, deposition, oxidation, and ion implantation",
  "15. Doping, annealing, defects, and contamination control",
  "16. Silicon, SOI, and alternative semiconductor substrates",
  "17. Silicon carbide and gallium nitride power devices",
  "18. Gallium arsenide, indium phosphide, and compound semiconductors",
  "19. Memory technologies: SRAM, DRAM, NAND, and emerging memories",
  "20. Advanced packaging, chiplets, and 3D integration",
  "21. Interconnects, parasitics, electromigration, and thermal management",
  "22. Semiconductor device modelling and TCAD",
  "23. Electrical characterization and measurement techniques",
  "24. Yield engineering, reliability, and failure analysis",
  "25. Semiconductor testing and design-for-test",
  "26. AI accelerators, GPUs, and specialized computing hardware",
  "27. Photonics, optoelectronics, and silicon photonics",
  "28. Quantum devices and quantum computing hardware",
  "29. Neuromorphic and in-memory computing",
  "30. Emerging materials, 2D semiconductors, and future device architectures"
] as const;

// Curated Category Groupings for intuitive library browsing
export const RESEARCH_CATEGORIES = [
  "All",
  "Solid-State Physics",
  "Quantum & Band Theory",
  "Carrier Transport",
  "Junctions & Diodes",
  "Bipolar Transistors",
  "MOS Physics",
  "Advanced Transistors",
  "CMOS & Logic",
  "VLSI & Architecture",
  "Physical Design",
  "Process Integration",
  "Wafer Manufacturing",
  "Lithography & EUV",
  "Etch & Deposition",
  "Doping & Defects",
  "Substrates & SOI",
  "Wide Bandgap & Power",
  "Compound Semiconductors",
  "Memory Architectures",
  "Packaging & 3D Integration",
  "Interconnects & Thermal",
  "TCAD & Modeling",
  "Characterization & Metrology",
  "Yield & Reliability",
  "Testing & DFT",
  "AI & Computing Hardware",
  "Photonics & Optoelectronics",
  "Quantum Hardware",
  "Neuromorphic Computing",
  "Emerging Materials"
] as const;
