"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type CareerInfo = {
    title: string;
    category: string;
    description: string;
    skills: string[];
    courses: string[];
    projects: string[];
};

const careerData: Record<string, CareerInfo> = {
    "rtl-design": {
        title: "RTL Design Engineer",
        category: "Chip Design",
        description:
            "Learn to design digital hardware using Verilog and SystemVerilog, develop RTL modules, and understand the complete digital design workflow.",
        skills: ["Digital Logic", "Verilog", "SystemVerilog", "FSM Design", "RTL Debugging"],
        courses: [
            "Digital Electronics Fundamentals",
            "Verilog HDL from Basics to RTL Design",
            "Finite State Machines and RTL Coding",
            "SystemVerilog for Design",
            "RTL Synthesis and Timing Fundamentals",
        ],
        projects: [
            "Design a parameterized counter and timer",
            "Build an FSM-based traffic light controller",
            "Implement and verify a UART transmitter",
        ],
    },
    "soc-design": {
        title: "SoC Design Engineer",
        category: "Chip Design",
        description:
            "Understand how processors, memories, buses, and peripherals are integrated into a System-on-Chip.",
        skills: ["Computer Architecture", "RTL Design", "AMBA", "Memory Interfaces", "Integration"],
        courses: [
            "Digital Design Fundamentals",
            "Computer Architecture",
            "Verilog and SystemVerilog",
            "AMBA AXI and AHB Protocols",
            "SoC Integration and Debugging",
        ],
        projects: [
            "Integrate a processor with memory and peripherals",
            "Create a simple memory-mapped register block",
            "Build a basic SoC block diagram and integration plan",
        ],
    },
    "digital-ic-design": {
        title: "Digital IC Design Engineer",
        category: "Chip Design",
        description:
            "Learn how digital integrated circuits are designed, synthesized, optimized, and prepared for implementation.",
        skills: ["Logic Design", "Verilog", "Synthesis", "Timing", "Low-Power Design"],
        courses: [
            "Digital Electronics",
            "Verilog HDL",
            "Digital IC Design Flow",
            "Logic Synthesis",
            "Timing and Power Optimization",
        ],
        projects: [
            "Design an arithmetic logic unit",
            "Compare alternative RTL implementations",
            "Analyze synthesis area and timing reports",
        ],
    },
    "cpu-microarchitecture": {
        title: "CPU Microarchitecture Engineer",
        category: "Chip Design",
        description:
            "Explore processor pipelines, instruction execution, branch prediction, caches, and performance optimization.",
        skills: ["Computer Architecture", "Pipelining", "Caches", "RTL", "Performance Analysis"],
        courses: [
            "Computer Organization",
            "Instruction Set Architecture",
            "Pipelined Processor Design",
            "Cache and Memory Hierarchy",
            "Advanced CPU Microarchitecture",
        ],
        projects: [
            "Build a simple five-stage processor model",
            "Analyze pipeline hazards",
            "Compare cache configurations in a simulator",
        ],
    },
    "gpu-design": {
        title: "GPU Design Engineer",
        category: "Chip Design",
        description:
            "Study parallel processing architectures, GPU execution models, memory systems, and hardware acceleration.",
        skills: ["Computer Architecture", "Parallel Computing", "Memory Systems", "RTL", "Performance Modeling"],
        courses: [
            "Computer Architecture Fundamentals",
            "Parallel Computing",
            "GPU Architecture",
            "Memory Systems",
            "Hardware Performance Modeling",
        ],
        projects: [
            "Model a simple parallel execution unit",
            "Compare CPU and GPU workloads",
            "Explore memory bandwidth and parallelism",
        ],
    },
    "asic-design": {
        title: "ASIC Design Engineer",
        category: "Chip Design",
        description:
            "Learn the application-specific integrated circuit design flow from specification and RTL through synthesis and implementation.",
        skills: ["Digital Logic", "Verilog", "Synthesis", "Constraints", "Timing Analysis"],
        courses: [
            "Digital Design Fundamentals",
            "Verilog HDL",
            "ASIC Design Flow",
            "Logic Synthesis and Constraints",
            "Static Timing Analysis",
        ],
        projects: [
            "Design a small digital controller",
            "Synthesize an RTL design",
            "Review timing and area reports",
        ],
    },
    "design-verification": {
        title: "Design Verification Engineer",
        category: "Verification",
        description:
            "Learn to verify hardware designs through testbenches, assertions, functional coverage, and systematic debugging.",
        skills: ["SystemVerilog", "Testbenches", "Assertions", "Coverage", "Debugging"],
        courses: [
            "Digital Design Fundamentals",
            "Verilog and SystemVerilog",
            "SystemVerilog Testbenches",
            "Assertions and Functional Coverage",
            "UVM Verification Fundamentals",
        ],
        projects: [
            "Build a self-checking FIFO testbench",
            "Verify an arbiter with randomized tests",
            "Create functional coverage for a protocol",
        ],
    },
    "formal-verification": {
        title: "Formal Verification Engineer",
        category: "Verification",
        description:
            "Learn mathematical and tool-assisted methods for proving hardware properties and finding design corner cases.",
        skills: ["Boolean Logic", "SystemVerilog Assertions", "Formal Properties", "State Machines", "Debugging"],
        courses: [
            "Digital Logic and State Machines",
            "SystemVerilog Assertions",
            "Formal Verification Fundamentals",
            "Property Specification",
            "Formal Debugging and Coverage",
        ],
        projects: [
            "Write assertions for a FIFO",
            "Prove safety properties for an arbiter",
            "Investigate a counterexample trace",
        ],
    },
    "dft-engineering": {
        title: "Design-for-Test Engineer",
        category: "Test and Validation",
        description:
            "Study scan design, automatic test pattern generation, test coverage, and design techniques that improve chip testability.",
        skills: ["Digital Design", "Scan Chains", "ATPG", "Fault Models", "Test Coverage"],
        courses: [
            "Digital Logic Fundamentals",
            "Semiconductor Testing",
            "Design-for-Test Fundamentals",
            "Scan Insertion and ATPG",
            "Test Coverage and Diagnosis",
        ],
        projects: [
            "Explore stuck-at fault models",
            "Build a conceptual scan-chain model",
            "Analyze an ATPG coverage report",
        ],
    },
    "semiconductor-test": {
        title: "Semiconductor Test Engineer",
        category: "Test and Validation",
        description:
            "Learn how semiconductor devices are tested using test programs, measurement systems, and production test methodologies.",
        skills: ["Electronics", "Test Instruments", "ATE Concepts", "Data Analysis", "Debugging"],
        courses: [
            "Electronics Fundamentals",
            "Semiconductor Device Basics",
            "Semiconductor Test Fundamentals",
            "Automatic Test Equipment",
            "Test Data Analysis",
        ],
        projects: [
            "Analyze a sample semiconductor test dataset",
            "Create a test plan for a simple device",
            "Identify trends in test failures",
        ],
    },
    "silicon-validation": {
        title: "Silicon Validation Engineer",
        category: "Test and Validation",
        description:
            "Learn to validate silicon functionality and performance using lab equipment, test software, and structured debugging.",
        skills: ["Digital Design", "Python", "Lab Instruments", "Debugging", "Test Planning"],
        courses: [
            "Digital Design Fundamentals",
            "Python for Hardware Engineers",
            "Silicon Validation Fundamentals",
            "Lab Measurement Techniques",
            "Hardware Debugging",
        ],
        projects: [
            "Create a silicon validation test plan",
            "Analyze hardware test logs with Python",
            "Document a simulated validation failure",
        ],
    },
    "post-silicon-validation": {
        title: "Post-Silicon Validation Engineer",
        category: "Test and Validation",
        description:
            "Develop skills for debugging manufactured chips, validating interfaces, and investigating silicon behavior in laboratory environments.",
        skills: ["Hardware Debugging", "Python", "Oscilloscopes", "Protocols", "Root-Cause Analysis"],
        courses: [
            "Electronics and Digital Design",
            "Python for Test Automation",
            "High-Speed Interface Fundamentals",
            "Post-Silicon Debugging",
            "Validation Data Analysis",
        ],
        projects: [
            "Analyze a simulated hardware failure log",
            "Create an automated test report",
            "Build a validation checklist for an interface",
        ],
    },
    "physical-design": {
        title: "Physical Design Engineer",
        category: "Physical Design",
        description:
            "Learn how synthesized digital logic is transformed into a physical chip layout through floorplanning, placement, clock-tree synthesis, and routing.",
        skills: ["Digital Design", "CMOS Basics", "Timing", "Floorplanning", "Place and Route"],
        courses: [
            "Digital IC Design Flow",
            "CMOS and VLSI Fundamentals",
            "Physical Design Fundamentals",
            "Static Timing Analysis",
            "Physical Design Optimization",
        ],
        projects: [
            "Study a sample floorplan",
            "Analyze timing and congestion reports",
            "Compare placement and routing results",
        ],
    },
    "static-timing-analysis": {
        title: "Static Timing Analysis Engineer",
        category: "Physical Design",
        description:
            "Learn to analyze setup and hold timing, clock relationships, timing constraints, and critical paths in digital circuits.",
        skills: ["Digital Logic", "Timing Constraints", "STA", "Clocks", "Timing Reports"],
        courses: [
            "Digital Design Fundamentals",
            "Digital Circuit Timing",
            "Static Timing Analysis",
            "SDC Constraints",
            "Timing Closure Fundamentals",
        ],
        projects: [
            "Calculate setup and hold timing",
            "Interpret a timing report",
            "Analyze the effect of clock uncertainty",
        ],
    },
    "floorplanning": {
        title: "Floorplanning Engineer",
        category: "Physical Design",
        description:
            "Learn how chip dimensions, macros, power structures, and placement regions are planned before detailed physical implementation.",
        skills: ["VLSI Basics", "Chip Area", "Macro Placement", "Power Planning", "Congestion"],
        courses: [
            "VLSI Design Fundamentals",
            "Physical Design Flow",
            "Floorplanning Fundamentals",
            "Power Planning",
            "Congestion Analysis",
        ],
        projects: [
            "Create a conceptual chip floorplan",
            "Compare macro placement alternatives",
            "Analyze utilization and congestion trade-offs",
        ],
    },
    "place-and-route": {
        title: "Place and Route Engineer",
        category: "Physical Design",
        description:
            "Learn standard-cell placement, clock-tree synthesis, routing, and physical optimization.",
        skills: ["VLSI", "Placement", "Clock Trees", "Routing", "Timing Closure"],
        courses: [
            "Digital IC Design Flow",
            "Physical Design Fundamentals",
            "Standard-Cell Placement",
            "Clock-Tree Synthesis",
            "Routing and Physical Optimization",
        ],
        projects: [
            "Review a placement report",
            "Study clock-tree structure",
            "Analyze routing congestion and timing",
        ],
    },
    "power-integrity": {
        title: "Power Integrity Engineer",
        category: "Physical Design",
        description:
            "Understand chip power delivery, voltage drop, current density, and power integrity analysis.",
        skills: ["Circuit Theory", "Power Distribution", "IR Drop", "Electromigration", "Analysis"],
        courses: [
            "Circuit Theory Fundamentals",
            "VLSI Power Distribution",
            "Power Integrity Fundamentals",
            "IR Drop Analysis",
            "Electromigration and Reliability",
        ],
        projects: [
            "Estimate voltage drop in a simple network",
            "Analyze a sample power grid",
            "Compare power distribution design choices",
        ],
    },
    "signal-integrity": {
        title: "Signal Integrity Engineer",
        category: "Physical Design",
        description:
            "Learn how parasitics, crosstalk, reflections, and transmission-line effects influence high-speed signals.",
        skills: ["Electromagnetics", "Transmission Lines", "Crosstalk", "PCB Concepts", "Measurement"],
        courses: [
            "Circuit Theory",
            "Electromagnetics Fundamentals",
            "Transmission-Line Theory",
            "Signal Integrity",
            "High-Speed Measurement Techniques",
        ],
        projects: [
            "Model a transmission line",
            "Study reflection and termination",
            "Analyze a simulated crosstalk example",
        ],
    },
    "analog-design": {
        title: "Analog IC Design Engineer",
        category: "Analog and Mixed Signal",
        description:
            "Learn transistor-level circuit design, biasing, amplifiers, feedback, and analog circuit simulation.",
        skills: ["Circuit Theory", "MOSFETs", "Amplifiers", "SPICE", "Analog Layout"],
        courses: [
            "Circuit Analysis",
            "Semiconductor Devices",
            "MOSFET Fundamentals",
            "Analog Integrated Circuit Design",
            "SPICE Simulation",
        ],
        projects: [
            "Simulate a common-source amplifier",
            "Design a current mirror",
            "Study amplifier gain and frequency response",
        ],
    },
    "mixed-signal-design": {
        title: "Mixed-Signal IC Design Engineer",
        category: "Analog and Mixed Signal",
        description:
            "Learn how analog and digital circuits work together in converters, sensor interfaces, and communication systems.",
        skills: ["Analog Circuits", "Digital Design", "ADC/DAC", "Noise", "Simulation"],
        courses: [
            "Analog Electronics",
            "Digital Logic Design",
            "Data Converter Fundamentals",
            "Mixed-Signal Design",
            "Noise and Simulation",
        ],
        projects: [
            "Model a simple ADC",
            "Explore a DAC architecture",
            "Simulate a mixed-signal interface",
        ],
    },
    "rf-ic-design": {
        title: "RF IC Design Engineer",
        category: "Analog and Mixed Signal",
        description:
            "Study radio-frequency circuits, impedance matching, low-noise amplifiers, oscillators, and wireless front ends.",
        skills: ["Electromagnetics", "RF Circuits", "S-Parameters", "Matching Networks", "Simulation"],
        courses: [
            "Circuit Theory",
            "Electromagnetics",
            "RF Circuit Fundamentals",
            "Impedance Matching",
            "RF Simulation Techniques",
        ],
        projects: [
            "Calculate a matching network",
            "Analyze an RF amplifier",
            "Explore S-parameters in a simulated circuit",
        ],
    },
    "memory-design": {
        title: "Memory Design Engineer",
        category: "Analog and Mixed Signal",
        description:
            "Learn memory architectures, SRAM and DRAM fundamentals, memory timing, and memory circuit concepts.",
        skills: ["Digital Logic", "Memory Architecture", "CMOS", "Timing", "Circuit Analysis"],
        courses: [
            "Digital Design",
            "Computer Memory Hierarchy",
            "SRAM and DRAM Fundamentals",
            "Memory Circuit Design",
            "Memory Timing and Testing",
        ],
        projects: [
            "Model a small memory array",
            "Compare SRAM and DRAM architectures",
            "Analyze a memory timing diagram",
        ],
    },
    "high-speed-interface": {
        title: "High-Speed Interface Engineer",
        category: "Analog and Mixed Signal",
        description:
            "Learn the fundamentals of high-speed links, signal transmission, equalization, clock recovery, and interface validation.",
        skills: ["Digital Communications", "Signal Integrity", "SerDes", "Equalization", "Testing"],
        courses: [
            "Digital Communication Fundamentals",
            "Transmission Lines",
            "High-Speed Interface Basics",
            "SerDes Fundamentals",
            "Link Validation and Debugging",
        ],
        projects: [
            "Explore an eye diagram",
            "Model a simple channel",
            "Compare equalization approaches",
        ],
    },
    "power-management-ic": {
        title: "Power Management IC Engineer",
        category: "Analog and Mixed Signal",
        description:
            "Study voltage regulators, switching converters, power control, efficiency, and power-management integrated circuits.",
        skills: ["Circuit Theory", "Power Electronics", "Feedback", "MOSFETs", "Simulation"],
        courses: [
            "Circuit Analysis",
            "Power Electronics",
            "Feedback and Control",
            "Power Management IC Design",
            "Converter Simulation",
        ],
        projects: [
            "Model a buck converter",
            "Study linear regulator behavior",
            "Compare converter efficiency",
        ],
    },
    "semiconductor-process": {
        title: "Semiconductor Process Engineer",
        category: "Process and Manufacturing",
        description:
            "Understand wafer fabrication, lithography, deposition, etching, doping, cleaning, and process control.",
        skills: ["Semiconductor Physics", "Lithography", "Etching", "Deposition", "Process Control"],
        courses: [
            "Semiconductor Physics",
            "Wafer Fabrication Fundamentals",
            "Photolithography",
            "Etching and Deposition",
            "Process Control and Metrology",
        ],
        projects: [
            "Map the major wafer fabrication steps",
            "Compare deposition techniques",
            "Analyze a sample process-control dataset",
        ],
    },
    "semiconductor-device": {
        title: "Semiconductor Device Engineer",
        category: "Process and Manufacturing",
        description:
            "Learn semiconductor material properties, PN junctions, MOSFET operation, and device electrical characteristics.",
        skills: ["Solid-State Physics", "PN Junctions", "MOSFETs", "Device Modeling", "Measurements"],
        courses: [
            "Basic Electronics",
            "Semiconductor Physics",
            "PN Junction Devices",
            "MOSFET Device Physics",
            "Semiconductor Characterization",
        ],
        projects: [
            "Plot a diode I-V curve",
            "Explore MOSFET operating regions",
            "Compare simulated device characteristics",
        ],
    },
    "process-integration": {
        title: "Process Integration Engineer",
        category: "Process and Manufacturing",
        description:
            "Learn how fabrication steps are coordinated to achieve device performance, yield, and manufacturability.",
        skills: ["Wafer Processing", "Device Physics", "Process Flow", "Metrology", "Root-Cause Analysis"],
        courses: [
            "Semiconductor Device Fundamentals",
            "Wafer Fabrication",
            "Process Integration",
            "Process Characterization",
            "Failure Analysis",
        ],
        projects: [
            "Create a process integration flow",
            "Study interactions between fabrication steps",
            "Analyze a hypothetical process excursion",
        ],
    },
    "yield-enhancement": {
        title: "Yield Enhancement Engineer",
        category: "Process and Manufacturing",
        description:
            "Use statistical analysis and defect investigation to improve manufacturing yield and reduce process variation.",
        skills: ["Statistics", "SPC", "Defect Analysis", "Python", "Root-Cause Analysis"],
        courses: [
            "Statistics for Engineers",
            "Semiconductor Manufacturing",
            "Statistical Process Control",
            "Yield Analysis",
            "Defect and Failure Analysis",
        ],
        projects: [
            "Analyze wafer yield data",
            "Create a Pareto chart of defects",
            "Investigate a simulated yield excursion",
        ],
    },
    "semiconductor-equipment": {
        title: "Semiconductor Equipment Engineer",
        category: "Process and Manufacturing",
        description:
            "Learn the operation, maintenance, calibration, and troubleshooting of semiconductor fabrication equipment.",
        skills: ["Electronics", "Vacuum Systems", "Sensors", "Equipment Maintenance", "Troubleshooting"],
        courses: [
            "Electrical and Electronics Fundamentals",
            "Semiconductor Fabrication",
            "Vacuum and Plasma Basics",
            "Sensors and Instrumentation",
            "Equipment Troubleshooting",
        ],
        projects: [
            "Draw a simplified vacuum system",
            "Build an equipment maintenance checklist",
            "Analyze simulated equipment sensor data",
        ],
    },
    "semiconductor-reliability": {
        title: "Semiconductor Reliability Engineer",
        category: "Process and Manufacturing",
        description:
            "Study failure mechanisms, accelerated testing, lifetime estimation, and reliability qualification.",
        skills: ["Statistics", "Device Physics", "Failure Mechanisms", "Reliability Testing", "Data Analysis"],
        courses: [
            "Semiconductor Device Physics",
            "Probability and Statistics",
            "Semiconductor Failure Mechanisms",
            "Reliability Testing",
            "Lifetime Data Analysis",
        ],
        projects: [
            "Analyze a sample reliability dataset",
            "Compare failure-rate distributions",
            "Create a reliability test plan",
        ],
    },
    "eda-engineering": {
        title: "EDA Engineer",
        category: "Tools and Automation",
        description:
            "Learn how electronic design automation tools represent, analyze, and optimize semiconductor designs.",
        skills: ["Programming", "Digital Design", "Algorithms", "Linux", "EDA Workflows"],
        courses: [
            "Programming Fundamentals",
            "Digital Logic Design",
            "Algorithms and Data Structures",
            "EDA Tool Fundamentals",
            "Semiconductor Design Automation",
        ],
        projects: [
            "Write a script to parse a timing report",
            "Build a simple logic-netlist analyzer",
            "Automate a design-report summary",
        ],
    },
    "fpga-engineering": {
        title: "FPGA Engineer",
        category: "Tools and Automation",
        description:
            "Learn programmable logic design, RTL implementation, timing constraints, and hardware prototyping on FPGA devices.",
        skills: ["Digital Logic", "Verilog", "FPGA Tools", "Timing Constraints", "Hardware Debugging"],
        courses: [
            "Digital Electronics",
            "Verilog HDL",
            "FPGA Architecture",
            "Synthesis and Timing Constraints",
            "FPGA Verification and Debugging",
        ],
        projects: [
            "Implement a counter on an FPGA",
            "Build a UART communication module",
            "Create an FPGA-based digital controller",
        ],
    },
    "semiconductor-modeling": {
        title: "Semiconductor Modeling Engineer",
        category: "Tools and Automation",
        description:
            "Learn to model semiconductor devices and circuits using mathematical models, simulation, and data analysis.",
        skills: ["Mathematics", "Semiconductor Physics", "Python", "Numerical Methods", "Simulation"],
        courses: [
            "Engineering Mathematics",
            "Semiconductor Physics",
            "Python for Scientific Computing",
            "Numerical Methods",
            "Semiconductor Modeling",
        ],
        projects: [
            "Plot semiconductor device characteristics",
            "Fit a simple model to measured data",
            "Compare model predictions with simulated results",
        ],
    },
    "tcad-simulation": {
        title: "TCAD Simulation Engineer",
        category: "Tools and Automation",
        description:
            "Explore technology computer-aided design, device simulation, semiconductor process models, and numerical analysis.",
        skills: ["Semiconductor Physics", "Numerical Methods", "Device Modeling", "Simulation", "Data Analysis"],
        courses: [
            "Semiconductor Physics",
            "MOSFET Device Fundamentals",
            "Numerical Methods",
            "Device Simulation Fundamentals",
            "TCAD Modeling Concepts",
        ],
        projects: [
            "Study a simulated MOSFET cross-section",
            "Compare device characteristics across parameters",
            "Document a simulation experiment",
        ],
    },
    "chip-design-automation": {
        title: "Chip Design Automation Engineer",
        category: "Tools and Automation",
        description:
            "Use software, algorithms, and scripting to automate repetitive semiconductor design and analysis tasks.",
        skills: ["Python", "Algorithms", "Digital Design", "Linux", "Automation"],
        courses: [
            "Python Programming",
            "Algorithms and Data Structures",
            "Linux and Shell Scripting",
            "EDA Workflows",
            "Design Automation Techniques",
        ],
        projects: [
            "Automate report extraction with Python",
            "Build a batch log analyzer",
            "Create a simple design-flow automation script",
        ],
    },
    "semiconductor-ai-ml": {
        title: "Semiconductor AI/ML Engineer",
        category: "Tools and Automation",
        description:
            "Apply machine learning and data science to semiconductor test data, process monitoring, defect detection, and yield improvement.",
        skills: ["Python", "Statistics", "Machine Learning", "Data Visualization", "Semiconductor Fundamentals"],
        courses: [
            "Python for Data Analysis",
            "Statistics and Probability",
            "Machine Learning Fundamentals",
            "Semiconductor Manufacturing Data",
            "AI for Yield and Defect Analysis",
        ],
        projects: [
            "Build a wafer-yield prediction prototype",
            "Explore defect classification with sample data",
            "Create a dashboard for manufacturing metrics",
        ],
    },
};

export default function CareerDetailPage() {
    const params = useParams<{ careerId: string }>();
    const careerId = params.careerId;
    const career = careerData[careerId];

    if (!career) {
        return (
            <main className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-3xl font-bold">Career not found</h1>
                    <p className="mt-4 text-slate-300">
                        We could not find this career learning path.
                    </p>
                    <Link
                        href="/careers"
                        className="mt-6 inline-block rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
                    >
                        Back to Careers
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-10 md:py-16 text-slate-100">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                    ← Back to All Careers
                </Link>

                <section className="glass-panel mt-6 rounded-3xl border border-purple-500/30 p-7 sm:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 blur-[90px] rounded-full pointer-events-none" />
                    
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {career.category}
                    </span>

                    <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight text-white">
                        {career.title}
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-300">
                        {career.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/roadmap"
                            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 px-5 py-3 text-sm font-bold text-slate-950 transition hover:from-cyan-400 hover:to-sky-500 shadow-md shadow-cyan-500/20"
                        >
                            View Semiconductor Roadmap
                        </Link>
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
                        >
                            Browse All Courses
                        </Link>
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                        Essential Skills to Develop
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                        Industry-standard technical proficiencies required for {career.title}.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {career.skills.map((skill) => (
                            <div
                                key={skill}
                                className="glass-panel rounded-2xl p-4 flex items-center gap-3 border border-slate-800 hover:border-cyan-500/30 transition-colors"
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-950 border border-cyan-500/30 text-xs font-bold text-cyan-400">
                                    ✓
                                </span>
                                <span className="text-sm font-medium text-slate-200">{skill}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                        Recommended Learning Sequence
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                        Complete these course stages methodically from foundational physics to advanced design.
                    </p>
                    <div className="mt-5 space-y-3">
                        {career.courses.map((course, index) => (
                            <div
                                key={course}
                                className="glass-panel rounded-2xl p-5 flex items-center gap-4 border border-slate-800/90 hover:border-cyan-500/30 transition-colors"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-300">
                                    0{index + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm sm:text-base font-semibold text-slate-100">{course}</h3>
                                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                                        Stage {index + 1} Curriculum Module
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                        Tape-out & Portfolio Projects
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                        Build verified hardware designs to demonstrate competency to silicon hiring teams.
                    </p>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {career.projects.map((project, index) => (
                            <article
                                key={project}
                                className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between hover:border-purple-500/30 transition-colors"
                            >
                                <div>
                                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider block">
                                        PROJECT 0{index + 1}
                                    </span>
                                    <h3 className="mt-2 text-sm font-semibold leading-relaxed text-slate-200">{project}</h3>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="glass-panel mt-12 rounded-3xl border border-cyan-500/20 p-8 sm:p-10 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-100">
                        Ready to Start This Career Track?
                    </h2>
                    <p className="max-w-xl mx-auto text-sm text-slate-300 leading-relaxed">
                        Start with the first course stage, practice regularly with virtual labs, and build your silicon design portfolio.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 px-6 py-3 text-sm font-bold text-slate-950 transition hover:from-cyan-400 hover:to-sky-500 shadow-md shadow-cyan-500/20"
                        >
                            Start Learning Now
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}