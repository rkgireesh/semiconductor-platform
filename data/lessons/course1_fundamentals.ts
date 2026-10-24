import { FullLessonData } from "./types";

export const COURSE_1_LESSONS: Record<string, FullLessonData> = {
  "bohr-atomic-model": {
    id: "bohr-atomic-model",
    courseId: "semiconductor-fundamentals",
    title: "Bohr Atomic Model & Energy Quantization",
    duration: "45 min",
    difficulty: "Beginner",
    tag: "QUANTUM PHYSICS",
    summary: "Understand how electrons exist in discrete quantized orbital shells and why isolated atomic levels split into continuous energy bands in crystal lattices.",
    learningObjectives: [
      "Derive the quantized angular momentum condition postulated by Niels Bohr.",
      "Calculate photon wavelength (λ) emitted during electron transition between energy levels.",
      "Explain why Pauli's Exclusion Principle splits atomic orbitals into semiconductor valence and conduction bands."
    ],
    keyFormulas: [
      {
        label: "Quantized Angular Momentum",
        formula: "L = n · ℏ = n · (h / 2π)",
        desc: "Bohr's quantization postulate restricting electron orbits to integer multiples of reduced Planck's constant (n = 1, 2, 3...)."
      },
      {
        label: "Hydrogen-like Energy Levels",
        formula: "En = -13.6 eV · (Z² / n²)",
        desc: "Total energy of an electron in principal quantum number n around a nucleus with atomic charge Z."
      },
      {
        label: "Photon Energy & Wavelength",
        formula: "ΔE = E2 - E1 = h · ν = (h · c) / λ",
        desc: "Planck-Einstein relation for electromagnetic radiation during inter-orbital electron relaxation."
      }
    ],
    sections: [
      {
        title: "1. Classical Breakdown and the Bohr Postulates",
        content: [
          "Under classical electrodynamics, an accelerating charge continuously radiates electromagnetic energy. An orbiting electron would therefore lose kinetic energy within picoseconds and spiral catastrophically into the nucleus.",
          "In 1913, Niels Bohr resolved this fundamental paradox by postulating stable stationary orbits where electrons do not radiate energy unless they transition between distinct discrete energy states.",
          "By equating centripetal acceleration to Coulomb electrostatic attraction (m·v²/r = q² / (4πε0·r²)) and applying angular momentum quantization (m·v·r = n·ℏ), discrete orbital radii and energy levels emerge."
        ],
        callout: {
          type: "physics",
          title: "Physical Intuition",
          text: "Energy quantization is why semiconductors absorb and emit light only above their characteristic bandgap threshold."
        }
      },
      {
        title: "2. From Isolated Atoms to Periodic Crystal Bands",
        content: [
          "When millions of silicon atoms are brought together from infinite separation to form a crystal lattice (lattice spacing a = 5.43 Å), outer 3s and 3p valence electron wavefunctions overlap.",
          "By Pauli's Exclusion Principle, no two electrons can occupy identical quantum numbers. Consequently, the discrete atomic energy levels split into 10²³ closely spaced sublevels, forming continuous energy bands: the lower Valence Band and the upper Conduction Band, separated by an Energy Bandgap (Eg = 1.12 eV for silicon at 300K)."
        ]
      }
    ],
    checkpoint: {
      question: "What physical principle forces isolated atomic energy levels to split into energy bands when forming a solid semiconductor lattice?",
      options: [
        "Newton's Third Law of Motion",
        "Pauli's Exclusion Principle",
        "Coulomb's Law of Electrostatics",
        "Gauss's Divergence Theorem"
      ],
      correctIndex: 1,
      explanation: "Pauli's Exclusion Principle forbids multiple electrons from occupying the same quantum state. As wavefunctions overlap, each discrete atomic energy level splits into millions of infinitesimally separated levels that form continuous bands."
    },
    keyTakeaways: [
      "Electrons occupy discrete quantized energy states in isolated atoms.",
      "Lattice formation causes atomic orbital overlap and energy level splitting into bands.",
      "The forbidden energy gap Eg separates the valence band from the conduction band."
    ],
    practicalApplications: [
      "Optical emission wavelength engineering in semiconductor lasers",
      "Photodetector bandgap absorption cutoff calculation",
      "Solar cell spectral absorption efficiency limits"
    ],
    relatedResearchTopicId: "crystal-structure-diamond-cubic-zincblende",
    relatedLabId: "pn-junction-lab",
    nextLessonId: "silicon-crystal-lattice"
  },
  "silicon-crystal-lattice": {
    id: "silicon-crystal-lattice",
    courseId: "semiconductor-fundamentals",
    title: "Silicon Crystal Lattice & Diamond Cubic Structure",
    duration: "55 min",
    difficulty: "Beginner",
    tag: "CRYSTALLOGRAPHY",
    summary: "Explore the 3D diamond cubic lattice of silicon, sp³ tetrahedral hybridization, Miller indices (100), (110), (111), and wafer manufacturing planes.",
    learningObjectives: [
      "Calculate the unit cell volume and atomic density of diamond cubic silicon.",
      "Understand tetrahedral sp³ hybridization and covalent bond angles of 109.47°.",
      "Differentiate between crystallographic planes (100), (110), and (111) used in semiconductor wafer fabrication."
    ],
    keyFormulas: [
      {
        label: "Silicon Lattice Constant",
        formula: "a = 5.43 Å = 0.543 nm",
        desc: "Unit cell edge dimension for crystalline silicon at room temperature (300K)."
      },
      {
        label: "Atoms per Unit Cell",
        formula: "N_cell = 8 atoms / unit cell",
        desc: "8 corner atoms × (1/8) + 6 face atoms × (1/2) + 4 interior tetrahedral atoms = 8 atoms total."
      },
      {
        label: "Silicon Atomic Density",
        formula: "n_atom = 8 / a³ ≈ 5.0 × 10²² atoms/cm³",
        desc: "Fundamental atomic density of crystalline silicon used to calculate parts-per-million (ppm) dopant fractions."
      }
    ],
    sections: [
      {
        title: "1. Diamond Cubic Lattice Architecture",
        content: [
          "Silicon crystallizes in the diamond cubic lattice structure, which can be visualized as two interpenetrating Face-Centered Cubic (FCC) sublattices displaced along the body diagonal by (a/4, a/4, a/4).",
          "Each silicon atom forms 4 sp³ hybridized covalent bonds with its nearest neighbors, creating a tetrahedral bond angle of exactly 109.47°.",
          "This high tetrahedral bond strength gives crystalline silicon exceptional mechanical rigidity and thermal stability up to temperatures exceeding 1000°C during cleanroom furnace oxidation and annealing."
        ]
      },
      {
        title: "2. Miller Indices & Crystallographic Planes",
        content: [
          "Semiconductor manufacturing uses specifically oriented monocrystalline silicon wafers designated by Miller indices: (100), (110), and (111).",
          "(100) Wafers: Most widely used for standard planar CMOS logic because of lower surface state interface trap density (Dit) at the Si-SiO2 interface.",
          "(110) Wafers: Provides significantly higher hole mobility (approx. 2× higher than (100)), frequently leveraged in vertical FinFET sidewalls and PMOS transistor performance."
        ],
        callout: {
          type: "design",
          title: "Manufacturing Fact",
          text: "Silicon ingots grown via the Czochralski method are precisely notched or flat-ground along specific crystallographic axes so automated fab tools can align photolithography masks."
        }
      }
    ],
    checkpoint: {
      question: "What is the total number of full Silicon atoms contained inside one unit cell of diamond cubic silicon?",
      options: [
        "2 atoms",
        "4 atoms",
        "8 atoms",
        "16 atoms"
      ],
      correctIndex: 2,
      explanation: "Diamond cubic lattice has 8 corner atoms × (1/8) + 6 face-center atoms × (1/2) + 4 internal tetrahedral atoms = 1 + 3 + 4 = 8 full atoms per unit cell."
    },
    keyTakeaways: [
      "Silicon crystallizes into a diamond cubic structure with 8 atoms per unit cell and lattice constant a = 5.43 Å.",
      "Atomic volume density is approximately 5.0 × 10²² atoms/cm³.",
      "(100) and (110) crystallographic orientations govern surface trap density and carrier mobility in CMOS transistors."
    ],
    practicalApplications: [
      "Wafer alignment notch registration in automated steppers",
      "Anisotropic wet chemical etching (KOH) in silicon MEMS fabrication",
      "FinFET sidewall plane orientation selection for mobility matching"
    ],
    relatedResearchTopicId: "crystal-structure-diamond-cubic-zincblende",
    relatedLabId: "pn-junction-lab",
    prevLessonId: "bohr-atomic-model",
    nextLessonId: "energy-bands-effective-mass"
  },
  "energy-bands-effective-mass": {
    id: "energy-bands-effective-mass",
    courseId: "semiconductor-fundamentals",
    title: "Energy Bands & Carrier Effective Mass (m*)",
    duration: "60 min",
    difficulty: "Intermediate",
    tag: "BAND THEORY",
    summary: "Derive electron E-k dispersion relations in periodic lattices, direct vs indirect bandgaps, and the quantum mechanical effective mass tensor.",
    learningObjectives: [
      "Understand the E-k relationship and First Brillouin Zone representation of semiconductors.",
      "Derive the carrier effective mass equation m* = ħ² / (d²E/dk²) from crystal wavepacket dynamics.",
      "Explain the fundamental physical difference between direct bandgap (GaAs) and indirect bandgap (Si) materials."
    ],
    keyFormulas: [
      {
        label: "Effective Mass Definition",
        formula: "m* = ħ² / [ d²E / dk² ]",
        desc: "Curvature of the energy-momentum band dispersion; high curvature yields light, fast carriers, while flat bands yield heavy, slow carriers."
      },
      {
        label: "Electron Wavepacket Group Velocity",
        formula: "vg = (1 / ħ) · [ dE / dk ]",
        desc: "Velocity at which electron wavepackets propagate through the periodic lattice potential."
      },
      {
        label: "Indirect Momentum Phonon Assistance",
        formula: "ħω_photon = Eg ± ħΩ_phonon",
        desc: "Conservation of energy and crystal momentum in indirect bandgap optical transitions."
      }
    ],
    sections: [
      {
        title: "1. The E-k Dispersion Diagram and Brillouin Zones",
        content: [
          "In quantum solid-state physics, electron motion inside a periodic lattice potential is described by Bloch wavefunctions with crystal momentum wavevector k.",
          "Plotting allowed electron energy E versus wavevector k produces the E-k dispersion curve inside the First Brillouin Zone.",
          "In direct bandgap materials (e.g. GaAs, InP), the conduction band minimum and valence band maximum align at the exact same wavevector (k = 0, Γ-point). Optical emission is fast and efficient without requiring momentum transfer.",
          "In indirect bandgap materials (e.g. Silicon, Germanium), the conduction band minimum is shifted to k ≠ 0. Photon emission requires emitting or absorbing a lattice vibration (phonon) to conserve momentum, making silicon a fundamentally poor light emitter."
        ]
      },
      {
        title: "2. The Effective Mass Concept (m*)",
        content: [
          "When an external electric field is applied, the electron accelerates not as a free particle in vacuum, but under the combined influence of the external field and millions of periodic atomic Coulomb potentials.",
          "Rather than solving complex many-body quantum interactions for every acceleration step, we lump all internal crystal forces into a single modified parameter: the Effective Mass m*.",
          "Mathematically, effective mass is inversely proportional to the second derivative (curvature) of the E-k band. A sharply curved parabolic band gives a tiny effective mass (e.g. m* = 0.067 m0 in GaAs), yielding high carrier mobility."
        ],
        callout: {
          type: "physics",
          title: "Engineering Strain",
          text: "Modern 3nm nodes apply mechanical strain (uniaxial SiGe stressors) to distort the silicon E-k band, increasing curvature and boosting hole mobility by over 50%!"
        }
      }
    ],
    checkpoint: {
      question: "How does the effective mass m* of a charge carrier relate to the curvature (d²E/dk²) of its energy band?",
      options: [
        "m* is directly proportional to curvature",
        "m* is inversely proportional to curvature",
        "m* is completely independent of band curvature",
        "m* is always equal to the free electron mass m0"
      ],
      correctIndex: 1,
      explanation: "By definition, m* = ħ² / (d²E/dk²). A band with higher curvature (sharper parabola) has a smaller effective mass, meaning the electron accelerates more rapidly under an external electric field."
    },
    keyTakeaways: [
      "Silicon is an indirect bandgap semiconductor requiring phonon assistance for optical transitions.",
      "Effective mass m* = ħ²/(d²E/dk²) encapsulates all internal crystal lattice forces.",
      "Strain engineering modifies band curvature to accelerate carrier velocity in transistors."
    ],
    practicalApplications: [
      "Strained silicon channel engineering in advanced CMOS nodes",
      "High-speed III-V compound semiconductor transistor design",
      "Semiconductor laser and LED active region design"
    ],
    relatedResearchTopicId: "effective-mass-non-parabolicity",
    relatedLabId: "mosfet-characteristics-lab",
    prevLessonId: "silicon-crystal-lattice",
    nextLessonId: "intrinsic-extrinsic-doping"
  },
  "intrinsic-extrinsic-doping": {
    id: "intrinsic-extrinsic-doping",
    courseId: "semiconductor-fundamentals",
    title: "Intrinsic vs Extrinsic Silicon & Dopants",
    duration: "50 min",
    difficulty: "Beginner",
    tag: "CARRIER PHYSICS",
    summary: "Examine intrinsic carrier concentration ni(T), thermal generation, donor (Phosphorus/Arsenic) and acceptor (Boron) doping, and the Mass Action Law.",
    learningObjectives: [
      "Calculate intrinsic carrier concentration ni as a function of temperature T.",
      "Calculate majority and minority carrier concentrations in n-type and p-type silicon.",
      "Apply the Mass Action Law (n0 · p0 = ni²) under thermal equilibrium conditions."
    ],
    keyFormulas: [
      {
        label: "Intrinsic Carrier Density",
        formula: "ni(300K) ≈ 1.0 × 10¹⁰ cm⁻³",
        desc: "Thermally generated electron and hole density in ultra-pure intrinsic silicon at room temperature."
      },
      {
        label: "Mass Action Law",
        formula: "n0 · p0 = ni²(T)",
        desc: "Fundamental relationship between thermal equilibrium electron density n0 and hole density p0."
      },
      {
        label: "Majority Carrier Approx (N-type)",
        formula: "n0 ≈ Nd  and  p0 ≈ ni² / Nd",
        desc: "When donor concentration Nd >> ni, electron concentration equals donor density and minority hole concentration drops."
      }
    ],
    sections: [
      {
        title: "1. Intrinsic Carrier Generation & Recombination",
        content: [
          "At absolute zero (0 K), all valence electrons are locked inside covalent bonds: the valence band is completely full and the conduction band is completely empty (conductivity = 0).",
          "At room temperature (300 K), thermal vibrations (phonons) spontaneously break a small fraction of covalent bonds, exciting electrons across the bandgap into the conduction band and leaving behind mobile holes.",
          "In thermal equilibrium, the thermal generation rate Gth exactly equals the recombination rate Rth, maintaining ni ≈ 1.0 × 10¹⁰ cm⁻³ at 300 K."
        ]
      },
      {
        title: "2. Extrinsic Doping: Group III and Group V Impurities",
        content: [
          "N-type Doping (Donors): Adding Group V elements (Phosphorus P, Arsenic As) replaces silicon atoms in the lattice. Four valence electrons form covalent bonds, while the 5th electron is weakly bound (ionization energy ~0.045 eV) and ionizes into the conduction band at room temperature (n0 ≈ Nd).",
          "P-type Doping (Acceptors): Adding Group III elements (Boron B) introduces only 3 valence electrons. An empty state (hole) is created in the valence band (p0 ≈ Na).",
          "By intentionally controlling dopant concentrations from 10¹⁴ to 10²⁰ cm⁻³, semiconductor electrical conductivity can be engineered across 8 orders of magnitude!"
        ],
        callout: {
          type: "physics",
          title: "Mass Action Law",
          text: "Adding donor electrons (Nd) drives up the recombination rate, reducing minority hole concentration p0 such that their product remains constant: n0 · p0 = ni²."
        }
      }
    ],
    checkpoint: {
      question: "If a silicon wafer is doped with Nd = 10¹⁶ cm⁻³ Phosphorus donor atoms at 300K, what is the minority hole concentration p0? (Take ni = 10¹⁰ cm⁻³)",
      options: [
        "10¹⁶ cm⁻³",
        "10¹⁰ cm⁻³",
        "10⁴ cm⁻³",
        "10²⁰ cm⁻³"
      ],
      correctIndex: 2,
      explanation: "Using the Mass Action Law: p0 = ni² / n0 = (10¹⁰)² / 10¹⁶ = 10²⁰ / 10¹⁶ = 10⁴ cm⁻³."
    },
    keyTakeaways: [
      "Intrinsic silicon has equal electron and hole densities ni ≈ 10¹⁰ cm⁻³ at 300K.",
      "Donor doping (Group V: P, As) creates n-type silicon with n0 ≈ Nd.",
      "Acceptor doping (Group III: B) creates p-type silicon with p0 ≈ Na.",
      "Mass Action Law states that in thermal equilibrium, n0 · p0 = ni²(T)."
    ],
    practicalApplications: [
      "CMOS well formation via ion implantation",
      "Source/drain low-resistance contact doping",
      "Resistivity and sheet resistance tuning of silicon substrates"
    ],
    relatedResearchTopicId: "fermi-dirac-statistics-doping-ionization",
    relatedLabId: "pn-junction-lab",
    prevLessonId: "energy-bands-effective-mass",
    nextLessonId: "fermi-dirac-statistics"
  },
  "fermi-dirac-statistics": {
    id: "fermi-dirac-statistics",
    courseId: "semiconductor-fundamentals",
    title: "Fermi-Dirac Distribution & Fermi Level (Ef)",
    duration: "65 min",
    difficulty: "Intermediate",
    tag: "STATISTICAL PHYSICS",
    summary: "Master Fermi-Dirac quantum distribution statistics, intrinsic Fermi level Efi, Fermi level shifts with n-type/p-type doping, and degenerate vs non-degenerate regimes.",
    learningObjectives: [
      "Apply the Fermi-Dirac probability function f(E) = 1 / [1 + exp((E - Ef)/kT)].",
      "Calculate the spatial position of the Fermi level relative to intrinsic level Efi as doping varies.",
      "Identify the transition into degenerate semiconductor regimes when doping exceeds the effective density of states (Nc, Nv)."
    ],
    keyFormulas: [
      {
        label: "Fermi-Dirac Distribution Function",
        formula: "f(E) = 1 / [ 1 + exp((E - Ef) / (k · T)) ]",
        desc: "Probability that an available quantum energy state E is occupied by an electron at temperature T."
      },
      {
        label: "Electron Concentration via Ef",
        formula: "n0 = Nc · exp[ -(Ec - Ef) / (k · T) ]",
        desc: "Thermal equilibrium electron concentration in non-degenerate semiconductors, where Nc is effective conduction DOS."
      },
      {
        label: "Fermi Level Shift with Doping",
        formula: "Ef - Efi = k · T · ln(Nd / ni)",
        desc: "Energy shift of the chemical potential toward the conduction band upon n-type donor doping."
      }
    ],
    sections: [
      {
        title: "1. The Fermi-Dirac Distribution Function",
        content: [
          "Electrons are fermions governed by the Pauli Exclusion Principle. The probability f(E) that an electron occupies an available quantum state at energy E is given by Fermi-Dirac statistics.",
          "At absolute zero (T = 0 K), f(E) is a perfect step function: all states below the Fermi level Ef are 100% full, and all states above Ef are 100% empty.",
          "At finite temperatures (T > 0 K), thermal energy smears the step function over an energy window of approximately 4kT around Ef. At E = Ef, the occupation probability is exactly 50% (f(Ef) = 0.5)."
        ]
      },
      {
        title: "2. Moving the Fermi Level with Doping",
        content: [
          "In intrinsic silicon, the Fermi level sits almost precisely at mid-gap (Efi ≈ Eg / 2).",
          "Adding n-type donors introduces a vast supply of conduction electrons, pulling the Fermi level up toward the conduction band edge Ec: Ef - Efi = kT·ln(Nd / ni).",
          "Adding p-type acceptors introduces holes, pulling the Fermi level down toward the valence band edge Ev: Efi - Ef = kT·ln(Na / ni).",
          "When doping exceeds ~10¹⁹ cm⁻³ in silicon, the Fermi level enters the conduction or valence band directly. The semiconductor becomes degenerate, behaving like a metal with temperature-independent carrier density!"
        ],
        callout: {
          type: "physics",
          title: "Thermal Voltage",
          text: "The thermal energy scale kT / q at room temperature (300 K) is approximately 25.86 mV, a universal constant used across all semiconductor equations."
        }
      }
    ],
    checkpoint: {
      question: "At any finite temperature T > 0 K, what is the exact probability that an available electron state located precisely at the Fermi level (E = Ef) is occupied?",
      options: [
        "0% (0.0)",
        "50% (0.5)",
        "100% (1.0)",
        "It depends on the volume of the silicon crystal"
      ],
      correctIndex: 1,
      explanation: "Plugging E = Ef into f(E) = 1 / [1 + exp((Ef - Ef)/kT)] = 1 / [1 + exp(0)] = 1 / [1 + 1] = 1/2 = 0.50 (50%)."
    },
    keyTakeaways: [
      "The Fermi level Ef represents the chemical potential where electron occupation probability is 50%.",
      "N-type doping shifts Ef upward toward Ec; P-type doping shifts Ef downward toward Ev.",
      "Degenerate semiconductors have Ef inside the conduction or valence band, behaving like semi-metals."
    ],
    practicalApplications: [
      "Metal-semiconductor workfunction difference (Φms) engineering in MOSFETs",
      "Thermoelectric Seebeck coefficient optimization",
      "Ohmic contact silicide barrier height design"
    ],
    relatedResearchTopicId: "fermi-dirac-statistics-doping-ionization",
    relatedLabId: "mos-capacitor-lab",
    prevLessonId: "intrinsic-extrinsic-doping",
    nextLessonId: "carrier-transport-drift-diffusion"
  },
  "carrier-transport-drift-diffusion": {
    id: "carrier-transport-drift-diffusion",
    courseId: "semiconductor-fundamentals",
    title: "Carrier Transport: Drift, Diffusion & Einstein Relation",
    duration: "60 min",
    difficulty: "Intermediate",
    tag: "TRANSPORT DYNAMICS",
    summary: "Formulate total semiconductor current density as the sum of electric field drift and concentration gradient diffusion, connecting mobility to diffusivity via the Einstein Relation.",
    learningObjectives: [
      "Derive total electron and hole current densities combining drift and diffusion terms.",
      "Understand carrier mobility μ, acoustic phonon scattering, and ionized impurity scattering.",
      "Derive the Einstein Relation Dn / μn = Dp / μp = kT / q under thermal equilibrium conditions."
    ],
    keyFormulas: [
      {
        label: "Total Current Density (Electrons)",
        formula: "Jn = q · n · μn · E + q · Dn · (dn / dx)",
        desc: "Total electron current density combining field-driven drift and concentration-driven diffusion."
      },
      {
        label: "Total Current Density (Holes)",
        formula: "Jp = q · p · μp · E - q · Dp · (dp / dx)",
        desc: "Total hole current density combining field-driven drift and concentration-driven diffusion."
      },
      {
        label: "Einstein Diffusion Relation",
        formula: "Dn / μn = Dp / μp = (k · T) / q = Vt",
        desc: "Fundamental thermodynamic bridge connecting carrier mobility μ to diffusion coefficient D."
      }
    ],
    sections: [
      {
        title: "1. Drift Current and Carrier Mobility",
        content: [
          "Drift is the coordinated motion of charged carriers accelerated by an external electric field E. The average drift velocity is vd = μ·E, where μ is carrier mobility (cm²/V·s).",
          "Mobility is limited by collision scattering: at low temperatures, ionized impurity scattering dominates; at room temperature, lattice acoustic phonon scattering dominates.",
          "In silicon at 300 K, electron mobility (μn ≈ 1400 cm²/V·s) is roughly 3× higher than hole mobility (μp ≈ 450 cm²/V·s) because of the lower effective mass of electrons."
        ]
      },
      {
        title: "2. Diffusion Current and the Einstein Relation",
        content: [
          "Diffusion is the net flux of particles from regions of high concentration to regions of low concentration, driven strictly by random thermal motion without requiring an electric field.",
          "By Fick's First Law, diffusion current density is proportional to the spatial concentration gradient: Jn,diff = q·Dn·(dn/dx).",
          "In thermal equilibrium, if a non-uniform doping profile sets up a built-in electric field, the drift and diffusion currents must cancel each other out identically (J_net = 0). Equating drift to diffusion rigorously proves the Einstein Relation: D / μ = kT / q."
        ],
        callout: {
          type: "design",
          title: "Circuit Sizing Impact",
          text: "Because electron mobility μn is ~2.5× to 3× higher than hole mobility μp in silicon, standard CMOS inverters must size PMOS transistors 2× to 3× wider than NMOS transistors to achieve equal rise and fall propagation delays!"
        }
      }
    ],
    checkpoint: {
      question: "In crystalline silicon at room temperature (300K, Vt ≈ 26 mV), if electron mobility is μn = 1400 cm²/V·s, what is the electron diffusion coefficient Dn?",
      options: [
        "≈ 36.4 cm²/s",
        "≈ 140 cm²/s",
        "≈ 1.4 cm²/s",
        "≈ 364 cm²/s"
      ],
      correctIndex: 0,
      explanation: "Using the Einstein Relation: Dn = μn · (kT/q) = 1400 cm²/V·s × 0.0259 V ≈ 36.26 - 36.4 cm²/s."
    },
    keyTakeaways: [
      "Total current in semiconductors is always the superposition of drift current and diffusion current.",
      "Electron mobility is significantly higher than hole mobility in silicon due to effective mass asymmetry.",
      "The Einstein Relation D / μ = kT / q mathematically unifies drift and diffusion through thermal energy."
    ],
    practicalApplications: [
      "CMOS inverter PMOS/NMOS channel width ratio sizing",
      "Minority carrier base transport delay in BJTs",
      "Velocity saturation modeling in sub-10nm transistor channels"
    ],
    relatedResearchTopicId: "carrier-mobility-scattering-velocity-saturation",
    relatedLabId: "mosfet-characteristics-lab",
    prevLessonId: "fermi-dirac-statistics",
    nextLessonId: "pn-electrostatics-vbi"
  }
};
