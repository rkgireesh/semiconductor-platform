import { FullLessonData } from "./types";

export const course9Lessons: Record<string, FullLessonData> = {
  "sic-power-mosfets-design": {
    lessonId: "sic-power-mosfets-design",
    courseId: "power-semiconductors",
    courseTitle: "Power Semiconductors: SiC & GaN Power Devices",
    title: "Silicon Carbide (SiC) Power MOSFET Physics & Planar vs Trench Architecture",
    description: "Deep dive into 4H-SiC material properties, critical breakdown field scaling, specific on-resistance limits, and planar DMOS vs trench UMOS designs.",
    duration: "45 mins",
    moduleNumber: 1,
    lessonNumber: 1,
    equations: [
      {
        latex: "R_{on,sp} = \\frac{4 V_{BR}^2}{\\epsilon_s \\mu_n E_c^3}",
        name: "Baliga Figure of Merit (BFOM) Ideal Drift Region Specific On-Resistance",
        explanation: "Because the critical electric field Ec of 4H-SiC (~2.8 MV/cm) is nearly 10x that of Silicon (0.3 MV/cm), the specific on-resistance for a given breakdown voltage VBR scales down by ~1000x theoretically, allowing ultra-thin, highly doped drift regions."
      },
      {
        latex: "W_{drift} = \\frac{2 V_{BR}}{E_c}, \\quad N_D = \\frac{\\epsilon_s E_c^2}{2 q V_{BR}}",
        name: "Drift Layer Thickness and Doping Concentration",
        explanation: "Defines the required unipolar drift epilayer thickness Wdrift and n-type doping ND needed to sustain high reverse standoff voltages in power MOSFETs."
      }
    ],
    sections: [
      {
        heading: "1. 4H-SiC Physical Properties & Wide Bandgap Advantage",
        body: "Silicon Carbide crystallizes in over 250 polytypes, but 4H-SiC has become the industry standard for power devices due to its wide bandgap (3.26 eV at 300 K), high critical breakdown electric field (2.8 to 3.0 MV/cm), high thermal conductivity (4.9 W/cm·K vs 1.5 for Si), and high electron saturation velocity (2.0 × 10^7 cm/s).\n\nThe wide bandgap virtually eliminates intrinsic thermal carrier generation up to 300°C+, enabling high-temperature power electronics without thermal runaway. More crucially, the ~10x higher critical electric field allows the drift layer in a 1200 V SiC MOSFET to be ~10x thinner with ~100x higher doping concentration than a comparable 1200 V Silicon device, collapsing the conduction resistance."
      },
      {
        heading: "2. Planar DMOS vs Double Trench (UMOS) Architecture",
        body: "Early commercial SiC MOSFETs utilized planar Double-diffused MOS (DMOS) structures. In planar DMOS, current flows horizontally along the surface inversion channel into the vertical drift region via an internal JFET region between adjacent p-body wells. The parasitic JFET resistance and low channel mobility (due to high interface state density Dit at the SiC/SiO2 interface) limited efficiency.\n\nModern 3rd and 4th generation SiC MOSFETs utilize Trench architectures (UMOS). By etching vertical trenches for the gate, the channel is oriented vertically along the crystalline c-axis or m-plane, significantly increasing channel packing density and eliminating the JFET pinch zone. To prevent gate dielectric breakdown from intense electric fields at trench corners, advanced designs incorporate deep p+ shielding wells beneath the trench bottom to clamp electric field peaks below 2 MV/cm in the SiO2 oxide."
      },
      {
        heading: "3. Body Diode Degradation & Basal Plane Dislocations",
        body: "Every vertical power MOSFET features an inherent body diode formed by the p-body to n-drift pn junction. In SiC, forwarding biasing this body diode (~2.8 V forward drop) can trigger recombination-enhanced dislocation glide, transforming Basal Plane Dislocations (BPDs) into Shockley Stacking Faults (SSFs). SSFs expand across the active drift layer, creating high-resistance barriers that cause forward on-resistance drift and irreversible degradation. Leading foundries employ high-temperature converting epilayers and synchronous rectification to prevent body diode conduction."
      }
    ],
    practicalApplications: [
      "Electric Vehicle (EV) 800V traction inverters achieving >98.5% efficiency (e.g., Tesla Model 3/Y, Porsche Taycan)",
      "High-voltage DC fast chargers (150 kW - 350 kW) with compact liquid-cooled power stacks",
      "Solar string inverters and commercial battery energy storage systems (BESS)"
    ],
    relatedResearchTopicId: "wide-bandgap-gan-sic",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "Why does 4H-SiC permit a drift layer ~10x thinner than Silicon for the exact same 1200V breakdown rating?",
      options: [
        "Because SiC has a critical electric field (~2.8 MV/cm) nearly 10 times higher than Silicon",
        "Because SiC has a lower dielectric permittivity than air",
        "Because SiC electrons have zero effective mass",
        "Because SiC does not conduct majority carriers in reverse bias"
      ],
      correctAnswer: 0,
      explanation: "From W_drift = 2*V_BR / E_c, the required drift thickness is inversely proportional to critical breakdown field E_c. Because E_c in SiC is ~10x higher than Si, the drift layer is ~10x thinner."
    }
  },

  "gan-hemt-switching-circuits": {
    lessonId: "gan-hemt-switching-circuits",
    courseId: "power-semiconductors",
    courseTitle: "Power Semiconductors: SiC & GaN Power Devices",
    title: "Gallium Nitride (GaN) HEMTs: 2DEG Physics, E-Mode Gates & MHz Switching",
    description: "Explore AlGaN/GaN heterostructures, spontaneous and piezoelectric polarization, Two-Dimensional Electron Gas (2DEG) formation, p-GaN enhancement-mode gates, and ultra-fast dv/dt circuit design.",
    duration: "40 mins",
    moduleNumber: 1,
    lessonNumber: 2,
    equations: [
      {
        latex: "P_{total} = P_{sp} + P_{pz} = P_{sp} + \\left[2 e_{31}\\left(\\frac{a - a_0}{a_0}\\right) + e_{33} \\epsilon_z\\right]",
        name: "Polarization-Induced Sheet Charge Density in AlGaN/GaN",
        explanation: "Strong spontaneous and piezoelectric polarization at the pseudomorphic AlGaN/GaN heterointerface induces a fixed positive sheet charge, drawing electrons into a triangular quantum well without any intentional impurity doping."
      },
      {
        latex: "n_s \\approx 1.0 \\times 10^{13} \\text{ cm}^{-2}, \\quad \\mu_{2DEG} \\approx 1500 - 2000 \\text{ cm}^2/\\text{V}\\cdot\\text{s}",
        name: "Two-Dimensional Electron Gas (2DEG) Carrier Density & Mobility",
        explanation: "Because there are no ionized dopant atoms in the channel to cause impurity scattering, 2DEG electron mobility is exceptionally high, yielding ultra-low on-state channel resistance."
      }
    ],
    sections: [
      {
        heading: "1. The 2DEG Phenomenon at the AlGaN/GaN Heterointerface",
        body: "Unlike traditional silicon MOSFETs that require thermal diffusion or ion implantation to supply conduction carriers, GaN High Electron Mobility Transistors (HEMTs) form a conduction channel naturally through polarization physics. GaN and AlGaN crystallize in the non-centrosymmetric wurtzite lattice, producing intense spontaneous electrical polarization along the c-axis.\n\nWhen a thin, strained AlGaN barrier is epitaxially grown atop a GaN buffer layer on a silicon substrate (GaN-on-Si), lattice mismatch produces additional piezoelectric strain polarization. The abrupt change in total polarization across the interface induces a massive positive sheet charge (>10^13 charges/cm^2). To neutralize this charge, free electrons pool in a nanometer-thin sheet known as the Two-Dimensional Electron Gas (2DEG)."
      },
      {
        heading: "2. Enhancement-Mode (p-GaN Gate) vs Cascode GaN",
        body: "A raw AlGaN/GaN HEMT is naturally normally-on (depletion-mode, d-mode) with a negative threshold voltage (Vth ≈ -4 V). Normally-on behavior is dangerous in power electronics because a gate driver failure results in a shoot-through short-circuit across the DC high-voltage rail.\n\nTo achieve true normally-off (enhancement-mode, e-mode) operation:\n1. p-GaN Gate: A p-doped GaN layer is grown atop the AlGaN barrier beneath the gate metal. The p-type work function lifts the conduction band above the Fermi level at zero gate bias, depleting the 2DEG under the gate (Vth ≈ +1.4 V to +1.8 V).\n2. Cascode Configuration: A high-voltage d-mode GaN HEMT is paired in series with a low-voltage (30 V) standard silicon MOSFET in a single package. The silicon FET provides a standard 0-5V gate drive interface."
      },
      {
        heading: "3. MHz Switching Dynamics & Dynamic RDS(on) Trap Effects",
        body: "Because GaN HEMTs lack a minority-carrier body diode, their reverse recovery charge is essentially zero (Qrr = 0 nC). Coupled with ultra-low input and output capacitances (Ciss, Coss), GaN devices achieve switching edge slew rates exceeding 100 V/ns and frequencies in the 1 MHz to 10 MHz range.\n\nA key physical challenge is dynamic on-resistance (Dynamic RDS(on)) caused by electron trapping in carbon-doped GaN buffer layers or surface states during high off-state drain bias. Trapped electrons fail to de-trap instantly during turn-on, temporarily constricting the 2DEG and increasing conduction losses unless proper buffer grading and field plates are employed."
      }
    ],
    practicalApplications: [
      "Ultra-compact 65W - 240W USB-C PD laptop and smartphone fast chargers",
      "High-density telecom DC-DC power modules and AI datacenter 48V-to-12V buck converters",
      "Class-D high-fidelity audio amplifiers with vanishingly low total harmonic distortion (THD)"
    ],
    relatedResearchTopicId: "wide-bandgap-gan-sic",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "What produces the Two-Dimensional Electron Gas (2DEG) in an AlGaN/GaN heterostructure without chemical doping?",
      options: [
        "Spontaneous and piezoelectric polarization charges resulting from crystal lattice non-centrosymmetry and strain",
        "Thermal ionization of heavy boron impurities at room temperature",
        "Direct photon absorption from ambient light",
        "Electrochemical galvanic reactions between source and drain metals"
      ],
      correctAnswer: 0,
      explanation: "The 2DEG forms spontaneously due to polarization divergence at the heterointerface between AlGaN and GaN without any intentional donor dopants."
    }
  },

  "gate-driver-isolation-cmti": {
    lessonId: "gate-driver-isolation-cmti",
    courseId: "power-semiconductors",
    courseTitle: "Power Semiconductors: SiC & GaN Power Devices",
    title: "High-Voltage Isolated Gate Drivers & Common-Mode Transient Immunity (CMTI)",
    description: "Master gate drive circuitry for WBG switches: galvanic isolation techniques, parasitic inductance Miller clamp, and maintaining >150 kV/μs CMTI.",
    duration: "40 mins",
    moduleNumber: 2,
    lessonNumber: 3,
    equations: [
      {
        latex: "i_{disp} = C_{iso} \\frac{dv}{dt}",
        name: "Displacement Current Across Galvanic Isolation Barrier",
        explanation: "During high-speed switching transitions, the common-mode voltage slew rate (dv/dt) forces a displacement current across the isolation barrier parasitic capacitance Ciso, potentially corrupting control signals or triggering false gate turn-on."
      },
      {
        latex: "V_{GS,spurious} = L_{source} \\frac{di_D}{dt} + R_G C_{GD} \\frac{dv_{DS}}{dt}",
        name: "Parasitic Gate-Source Voltage Spike",
        explanation: "High di/dt through common source inductance and high dv/dt through gate-drain Miller capacitance can induce spurious voltage spikes exceeding the threshold voltage, causing catastrophic bridge shoot-through."
      }
    ],
    sections: [
      {
        heading: "1. The Challenge of Fast Switching: Why Standard Gate Drivers Fail",
        body: "Silicon IGBTs typically switch with edge rates of 2 to 5 V/ns and switching frequencies below 30 kHz. In contrast, SiC MOSFETs switch at 20-50 V/ns, and GaN HEMTs exceed 100-150 V/ns. At these slew rates, stray parasitic circuit inductances and capacitances dominate behavior.\n\nA parasitic common source inductance (Ls) of merely 2 nH subjected to a 50 A/10 ns transition (5 A/ns) creates an inductive voltage drop of VL = L * (di/dt) = 2 nH * 5 Giga-A/s = 10 V. This voltage directly opposes the gate driver command, severely slowing switching or triggering uncontrolled parasitic oscillations."
      },
      {
        heading: "2. Common-Mode Transient Immunity (CMTI)",
        body: "In a half-bridge inverter, the midpoint node (switch node) between high-side and low-side switches swings violently between 0 V and the full DC bus voltage (up to 800 V - 1000 V) in nanoseconds. The high-side gate driver floats directly on this switch node.\n\nGalvanic isolation (via capacitive, optical, or micro-transformer inductive barriers) is mandatory to separate high-voltage noise from the low-voltage microcontrollers. CMTI represents the maximum allowable dv/dt rate the driver can endure across its isolation barrier without corrupting logic states. For modern SiC and GaN systems, CMTI ratings must exceed 150 kV/μs (150 V/ns) to guarantee robust, glitch-free control."
      },
      {
        heading: "3. Active Miller Clamp & Kelvin Source Connections",
        body: "To defeat spurious turn-on caused by Miller charge displacement current during turn-off:\n1. Kelvin Source Pin: High-performance discrete packages (e.g., TO-247-4L, DFN 8x8) separate the high-current power source lead from the low-current gate driver return reference (Kelvin source), completely bypassing inductive source degeneration.\n2. Active Miller Clamp: When the gate voltage drops below a threshold (e.g., 2 V) during turn-off, a dedicated low-impedance internal transistor shorts the gate directly to negative rail (or ground), shunting Miller displacement current away from the gate."
      }
    ],
    practicalApplications: [
      "Isolated half-bridge driver ICs for 800V automotive inverters (TI UCC217xx, ADI ADuM413x)",
      "Solar microinverters and active front-end power factor correction (PFC) stages",
      "Solid-State Circuit Breakers (SSCB) clearing high-power fault currents in microseconds"
    ],
    relatedResearchTopicId: "wide-bandgap-gan-sic",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "What does a high CMTI (e.g., >150 V/ns) in an isolated gate driver protect against?",
      options: [
        "False logic triggering or output state corruption caused by violent dv/dt common-mode swings across the isolation barrier",
        "Thermal runaway caused by slow heat dissipation from the PCB copper ground plane",
        "Corrosion of gold wirebonds due to ambient atmospheric moisture",
        "Direct current leakage through the primary transformer windings during standby"
      ],
      correctAnswer: 0,
      explanation: "CMTI (Common-Mode Transient Immunity) measures the driver's ability to maintain correct logic signaling across its galvanic barrier despite massive switch-node dv/dt transitions."
    }
  },

  "thermal-management-power-modules": {
    lessonId: "thermal-management-power-modules",
    courseId: "power-semiconductors",
    courseTitle: "Power Semiconductors: SiC & GaN Power Devices",
    title: "Power Module Packaging, Direct Bond Copper (DBC) & Thermal Management",
    description: "Explore the thermal stack of high-power modules: DBC/AMB ceramic substrates, silver sintering vs solder, transient thermal impedance Zth, and liquid cold plates.",
    duration: "40 mins",
    moduleNumber: 2,
    lessonNumber: 4,
    equations: [
      {
        latex: "T_j = T_a + P_{loss} \\times \\left(R_{th,jc} + R_{th,ch} + R_{th,ha}\\right)",
        name: "Steady-State Junction Temperature Thermal Resistance Network",
        explanation: "Relates maximum junction temperature Tj to ambient temperature Ta and total power loss Ploss through the junction-to-case, case-to-heatsink, and heatsink-to-ambient thermal resistances."
      },
      {
        latex: "Z_{th}(t) = \\sum_{i=1}^n R_i \\left(1 - e^{-t / \\tau_i}\\right), \\quad \\tau_i = R_i C_i",
        name: "Foster Thermal RC Network Transient Thermal Impedance",
        explanation: "Calculates the dynamic temperature rise during short-circuit pulses or transient power surges using thermal resistance and thermal capacitance time constants."
      }
    ],
    sections: [
      {
        heading: "1. The Power Module Layer Stack & Thermal Bottlenecks",
        body: "In high-power systems delivering hundreds of kilowatts, bare semiconductor dies cannot be packaged in standard plastic mould compounds. Instead, multiple SiC or Si dies are wire-bonded or ribbon-bonded inside power modules.\n\nThe vertical layer stack consists of:\n1. Semiconductor Die (SiC, GaN, or Si)\n2. Die-attach layer (Solder or Sintered Silver)\n3. Substrate Metallization (Top Copper)\n4. Ceramic Dielectric Isolator (Al2O3, AlN, or Si3N4)\n5. Substrate Metallization (Bottom Copper)\n6. Baseplate (Copper or AlSiC)\n7. Thermal Interface Material (TIM / thermal grease)\n8. Liquid-cooled cold plate or finned heatsink."
      },
      {
        heading: "2. Ceramic Substrates: DBC vs Active Metal Brazing (AMB)",
        body: "Direct Bonded Copper (DBC) bonds copper foils to an alumina (Al2O3) or aluminum nitride (AlN) ceramic core at high temperature (1065°C) via a Cu-Cu2O eutectic liquid phase. AlN provides excellent thermal conductivity (~170 W/m·K) but suffers from brittle mechanical fracture under severe thermal cycling.\n\nModern automotive SiC inverters adopt Active Metal Brazing (AMB) with Silicon Nitride (Si3N4). Although Si3N4 has a moderate thermal conductivity (~90 W/m·K), its fracture toughness is superior (~7 MPa·m^1/2 vs 3 for AlN). This allows ultra-thin ceramic sheets (0.25 mm) with thick copper layers (0.8 mm), cutting thermal resistance while enduring over 100,000 thermal shock cycles."
      },
      {
        heading: "3. Silver Sintering vs Solder Fatigue",
        body: "Traditional tin-lead or lead-free solders (e.g., SAC305) have melting points around 217°C to 220°C. Operating a SiC die at 175°C junction temperature places the solder near its homologous temperature (T/Tm > 0.8), accelerating intermetallic grain growth, creep fatigue, void formation, and delamination.\n\nSilver sintering uses nanoscale or microscale silver paste compressed under pressure (10-30 MPa) at 220°C-250°C. The silver particles diffuse solid-state to form a pure metallic silver bond. Once formed, the sintered joint has the melting point of bulk pure silver (961°C), providing virtually limitless thermal fatigue headroom, >3x higher thermal conductivity (250 W/m·K), and eliminating solder wear-out."
      }
    ],
    practicalApplications: [
      "Direct liquid-cooled traction inverter modules with integrated pin-fin baseplates",
      "High-speed rail traction converters (3.3 kV - 6.5 kV power blocks)",
      "Wind turbine full-power back-to-back converters operating in harsh offshore environments"
    ],
    relatedResearchTopicId: "wide-bandgap-gan-sic",
    relatedLabId: "mosfet-characteristics-lab",
    quiz: {
      question: "Why is pressure-assisted silver sintering superior to standard SAC305 solder for high-temperature SiC die attachment?",
      options: [
        "Sintered silver forms a pure metallic bond with a 961°C melting point, preventing thermal fatigue and creep at 175°C+ junction temperatures",
        "Silver paste is an electrical insulator that automatically eliminates parasitic capacitance",
        "Solder has too high a melting point (>1500°C) for clean room manufacturing",
        "Silver sintering makes the semiconductor transparent to infrared inspection"
      ],
      correctAnswer: 0,
      explanation: "Silver sintering processes at modest temperatures (~230°C) but creates a joint with the 961°C melting point of bulk silver, offering >3x higher thermal conductivity and vastly superior thermo-mechanical fatigue life."
    }
  }
};
