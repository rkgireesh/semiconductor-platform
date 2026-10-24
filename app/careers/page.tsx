"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Briefcase, ArrowRight, Sparkles } from "lucide-react";

type Career = {
    id: string;
    title: string;
    category: string;
    description: string;
    skills: string[];
};

const careers: Career[] = [
    {
        id: "rtl-design",
        title: "RTL Design Engineer",
        category: "Chip Design",
        description: "Design digital circuits using hardware description languages.",
        skills: ["Verilog", "SystemVerilog", "Digital Logic"],
    },
    {
        id: "soc-design",
        title: "SoC Design Engineer",
        category: "Chip Design",
        description: "Integrate processors, memory, interfaces, and other components into a system-on-chip.",
        skills: ["Computer Architecture", "AMBA", "RTL Design"],
    },
    {
        id: "digital-ic-design",
        title: "Digital IC Design Engineer",
        category: "Chip Design",
        description: "Design and implement digital integrated circuits.",
        skills: ["Digital Electronics", "Verilog", "Synthesis"],
    },
    {
        id: "cpu-microarchitecture",
        title: "CPU Microarchitecture Engineer",
        category: "Chip Design",
        description: "Develop processor pipelines, execution units, and control architectures.",
        skills: ["Computer Architecture", "Pipelining", "RTL"],
    },
    {
        id: "gpu-design",
        title: "GPU Design Engineer",
        category: "Chip Design",
        description: "Develop hardware architectures for parallel computing and graphics processing.",
        skills: ["Parallel Computing", "Digital Design", "Computer Architecture"],
    },
    {
        id: "asic-design",
        title: "ASIC Design Engineer",
        category: "Chip Design",
        description: "Develop application-specific integrated circuits from specifications to implementation.",
        skills: ["RTL", "Synthesis", "Digital Design"],
    },
    {
        id: "design-verification",
        title: "Design Verification Engineer",
        category: "Verification",
        description: "Verify that chip designs meet their functional specifications.",
        skills: ["SystemVerilog", "UVM", "Simulation"],
    },
    {
        id: "formal-verification",
        title: "Formal Verification Engineer",
        category: "Verification",
        description: "Use mathematical methods and formal tools to verify hardware behavior.",
        skills: ["Logic", "Assertions", "Formal Methods"],
    },
    {
        id: "dft-engineering",
        title: "DFT Engineer",
        category: "Verification",
        description: "Develop design-for-test features that help detect manufacturing defects.",
        skills: ["Scan Chains", "ATPG", "Digital Design"],
    },
    {
        id: "semiconductor-test",
        title: "Semiconductor Test Engineer",
        category: "Verification",
        description: "Develop and execute tests that evaluate semiconductor devices.",
        skills: ["Test Methods", "Electronics", "Data Analysis"],
    },
    {
        id: "silicon-validation",
        title: "Silicon Validation Engineer",
        category: "Verification",
        description: "Validate chip functionality and performance on physical silicon.",
        skills: ["Debugging", "Lab Instruments", "Computer Architecture"],
    },
    {
        id: "post-silicon-validation",
        title: "Post-Silicon Validation Engineer",
        category: "Verification",
        description: "Investigate and validate integrated circuit behavior after fabrication.",
        skills: ["Board Debugging", "Firmware", "Validation"],
    },
    {
        id: "physical-design",
        title: "Physical Design Engineer",
        category: "Physical Design",
        description: "Transform synthesized designs into physical layouts while meeting timing, power, and area targets.",
        skills: ["Floorplanning", "Placement", "Routing"],
    },
    {
        id: "static-timing-analysis",
        title: "Static Timing Analysis Engineer",
        category: "Physical Design",
        description: "Analyze timing paths and help designs meet clock constraints.",
        skills: ["Timing Analysis", "Constraints", "Digital Design"],
    },
    {
        id: "floorplanning",
        title: "Floorplanning Engineer",
        category: "Physical Design",
        description: "Plan the physical arrangement of chip blocks and major components.",
        skills: ["Chip Layout", "Area Planning", "Physical Design"],
    },
    {
        id: "place-and-route",
        title: "Place and Route Engineer",
        category: "Physical Design",
        description: "Place circuit cells and route their connections on a chip.",
        skills: ["EDA Tools", "Routing", "Timing"],
    },
    {
        id: "power-integrity",
        title: "Power Integrity Engineer",
        category: "Physical Design",
        description: "Analyze power delivery, voltage drop, and power-related reliability risks.",
        skills: ["Power Networks", "IR Drop", "Electronics"],
    },
    {
        id: "signal-integrity",
        title: "Signal Integrity Engineer",
        category: "Physical Design",
        description: "Analyze signal quality, noise, crosstalk, and high-speed interconnect behavior.",
        skills: ["High-Speed Design", "Electromagnetics", "Signal Analysis"],
    },
    {
        id: "analog-design",
        title: "Analog IC Design Engineer",
        category: "Specialized Design",
        description: "Design analog circuits such as amplifiers, references, and oscillators.",
        skills: ["Analog Electronics", "CMOS", "Circuit Simulation"],
    },
    {
        id: "mixed-signal-design",
        title: "Mixed-Signal Design Engineer",
        category: "Specialized Design",
        description: "Design integrated circuits combining analog and digital functions.",
        skills: ["Analog Design", "Digital Design", "ADC/DAC"],
    },
    {
        id: "rf-ic-design",
        title: "RF IC Design Engineer",
        category: "Specialized Design",
        description: "Design radio-frequency circuits used in wireless communication systems.",
        skills: ["RF Circuits", "Electromagnetics", "S-Parameters"],
    },
    {
        id: "memory-design",
        title: "Memory Design Engineer",
        category: "Specialized Design",
        description: "Develop memory circuits and architectures such as SRAM and DRAM.",
        skills: ["Memory Circuits", "CMOS", "Circuit Design"],
    },
    {
        id: "high-speed-interface",
        title: "High-Speed Interface Design Engineer",
        category: "Specialized Design",
        description: "Develop high-speed chip interfaces and communication links.",
        skills: ["SerDes", "Signal Integrity", "Digital Design"],
    },
    {
        id: "power-management-ic",
        title: "Power Management IC Design Engineer",
        category: "Specialized Design",
        description: "Design circuits that regulate and manage power in electronic systems.",
        skills: ["Power Electronics", "Analog Circuits", "Control Systems"],
    },
    {
        id: "semiconductor-process",
        title: "Semiconductor Process Engineer",
        category: "Fabrication",
        description: "Optimize semiconductor manufacturing processes such as deposition, etching, and lithography.",
        skills: ["Fabrication", "Process Control", "Materials Science"],
    },
    {
        id: "semiconductor-device",
        title: "Semiconductor Device Engineer",
        category: "Fabrication",
        description: "Study and improve the electrical behavior of semiconductor devices.",
        skills: ["Device Physics", "PN Junctions", "MOSFETs"],
    },
    {
        id: "process-integration",
        title: "Process Integration Engineer",
        category: "Fabrication",
        description: "Coordinate fabrication steps to achieve device performance and manufacturing targets.",
        skills: ["Process Integration", "Device Physics", "Yield"],
    },
    {
        id: "yield-enhancement",
        title: "Yield Enhancement Engineer",
        category: "Fabrication",
        description: "Analyze manufacturing data and identify causes of semiconductor yield loss.",
        skills: ["Statistics", "Failure Analysis", "Data Analysis"],
    },
    {
        id: "semiconductor-equipment",
        title: "Semiconductor Equipment Engineer",
        category: "Fabrication",
        description: "Maintain and improve the specialized equipment used in chip manufacturing.",
        skills: ["Equipment Maintenance", "Troubleshooting", "Process Basics"],
    },
    {
        id: "semiconductor-reliability",
        title: "Semiconductor Reliability Engineer",
        category: "Fabrication",
        description: "Evaluate device lifetime, failure mechanisms, and long-term reliability.",
        skills: ["Reliability Testing", "Failure Analysis", "Statistics"],
    },
    {
        id: "eda-engineering",
        title: "EDA Tools Engineer",
        category: "Tools and Computing",
        description: "Develop, support, or improve software used to design and verify integrated circuits.",
        skills: ["Programming", "Algorithms", "Chip Design"],
    },
    {
        id: "fpga-engineering",
        title: "FPGA Design Engineer",
        category: "Tools and Computing",
        description: "Build and test programmable hardware systems using FPGA devices.",
        skills: ["Verilog", "FPGA Tools", "Digital Logic"],
    },
    {
        id: "semiconductor-modeling",
        title: "Semiconductor Modeling Engineer",
        category: "Tools and Computing",
        description: "Develop mathematical and computational models of semiconductor behavior.",
        skills: ["Mathematics", "Device Physics", "Programming"],
    },
    {
        id: "tcad-simulation",
        title: "TCAD Simulation Engineer",
        category: "Tools and Computing",
        description: "Simulate semiconductor fabrication processes and device characteristics.",
        skills: ["Semiconductor Physics", "Numerical Methods", "Simulation"],
    },
    {
        id: "chip-design-automation",
        title: "Chip Design Automation Engineer",
        category: "Tools and Computing",
        description: "Automate hardware design workflows and improve engineering productivity.",
        skills: ["Python", "Algorithms", "EDA Workflows"],
    },
    {
        id: "semiconductor-ai-ml",
        title: "Semiconductor AI/ML Engineer",
        category: "Tools and Computing",
        description: "Apply machine learning to chip design, manufacturing analysis, and yield improvement.",
        skills: ["Python", "Machine Learning", "Data Analysis"],
    },
];

export default function CareersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        ...Array.from(new Set(careers.map((career) => career.category))),
    ];

    const filteredCareers = careers.filter((career) => {
        const matchesSearch =
            career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            career.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory =
            selectedCategory === "All" || career.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen text-slate-100 py-10 md:py-16">
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-medium tracking-wide bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <Briefcase className="w-3.5 h-3.5" />
                        GLOBAL SILICON INDUSTRY PATHWAYS
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100">
                        Semiconductor Career Pathways
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        Explore 36 specialized engineering disciplines spanning RTL digital design, verification, physical design, fabrication cleanroom engineering, and TCAD modeling.
                    </p>
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
                    <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
                        <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400">36</p>
                        <p className="mt-1 text-xs font-mono text-slate-400 uppercase">Career Disciplines</p>
                    </div>
                    <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
                        <p className="text-2xl sm:text-3xl font-extrabold text-purple-400">6</p>
                        <p className="mt-1 text-xs font-mono text-slate-400 uppercase">Core Domains</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 glass-panel rounded-2xl p-4 text-center border border-slate-800">
                        <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</p>
                        <p className="mt-1 text-xs font-mono text-slate-400 uppercase">Dedicated Syllabi</p>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="glass-panel p-4 rounded-2xl mb-10 space-y-4 border border-slate-800">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by role or skill (e.g. RTL, STA, UVM, TCAD)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                            />
                        </div>

                        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                            <span>Showing {filteredCareers.length} of {careers.length} Career Tracks</span>
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                                    selectedCategory === cat
                                        ? "bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20"
                                        : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-purple-300 hover:border-slate-700"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Careers Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
                    {filteredCareers.map((career) => (
                        <article
                            key={career.id}
                            className="glass-panel glass-panel-hover flex h-full flex-col rounded-2xl p-6 transition-all duration-300 border border-slate-800/80 group hover:border-purple-500/40 relative overflow-hidden"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-full border border-purple-500/30 bg-purple-950/40 px-2.5 py-0.5 text-[11px] font-mono font-medium text-purple-300">
                                    {career.category}
                                </span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold leading-snug text-slate-100 group-hover:text-purple-300 transition-colors">
                                {career.title}
                            </h2>

                            <p className="mt-2.5 flex-1 text-xs sm:text-sm leading-relaxed text-slate-400">
                                {career.description}
                            </p>

                            <div className="mt-5 pt-3 border-t border-slate-800/80">
                                <h3 className="mb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                    Core Competencies:
                                </h3>

                                <div className="mb-5 flex flex-wrap gap-1.5">
                                    {career.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-md border border-slate-800 bg-slate-950/90 px-2 py-0.5 text-[11px] font-mono text-slate-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={`/careers/${career.id}`}
                                    className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 px-4 py-2.5 text-center text-xs sm:text-sm font-bold text-slate-950 transition hover:from-cyan-400 hover:to-sky-500 shadow-md shadow-cyan-500/15"
                                >
                                    <span>Explore Learning Courses</span>
                                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Assistance Banner */}
                <section className="glass-panel rounded-3xl border border-cyan-500/20 p-8 sm:p-10 text-center space-y-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        SYSTEMATIC ENGINEERING ROADMAP
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
                        Not sure where to begin your career journey?
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm leading-relaxed text-slate-400">
                        Start with solid-state physics and digital logic foundations. You can specialize into analog, physical design, or fab engineering as you discover your passion.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/roadmap"
                            className="inline-flex items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-900/60"
                        >
                            Explore Learning Roadmap →
                        </Link>
                    </div>
                </section>

            </section>
        </main>
    );
}