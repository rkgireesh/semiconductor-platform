export interface CalculatorTool {
  id: string;
  name: string;
  category: "Semiconductor Physics" | "PN Junctions" | "MOSFETs & Scaling" | "Resistivity & Sheet Resistance";
  badgeVariant: "teal" | "sky" | "blue" | "purple" | "amber";
  formulaText: string;
  description: string;
  fields: {
    id: string;
    label: string;
    unit: string;
    defaultVal: number;
    step: number;
    min: number;
    max: number;
    desc: string;
  }[];
  calculate: (values: Record<string, number>) => { label: string; value: string; unit: string; note?: string }[];
}

export const CALCULATORS_DATA: CalculatorTool[] = [
  {
    id: "vbi-calculator",
    name: "PN Junction Built-in Potential (Vbi) Solver",
    category: "PN Junctions",
    badgeVariant: "teal",
    formulaText: "Vbi = (kT/q) · ln(Na · Nd / ni²)",
    description: "Calculates the contact potential barrier established across a silicon, GaAs, or GaN p-n junction under thermal equilibrium.",
    fields: [
      { id: "Na_exp", label: "Acceptor Concentration (Na)", unit: "10^x cm⁻³", defaultVal: 16, step: 0.5, min: 14, max: 19, desc: "P-type doping density" },
      { id: "Nd_exp", label: "Donor Concentration (Nd)", unit: "10^x cm⁻³", defaultVal: 16, step: 0.5, min: 14, max: 19, desc: "N-type doping density" },
      { id: "temp", label: "Temperature (T)", unit: "Kelvin", defaultVal: 300, step: 10, min: 100, max: 500, desc: "Operating temperature" }
    ],
    calculate: (v) => {
      const Na = Math.pow(10, v.Na_exp || 16);
      const Nd = Math.pow(10, v.Nd_exp || 16);
      const T = v.temp || 300;
      const Vt = (1.38e-23 * T) / 1.6e-19;
      const ni = 1.0e10 * Math.pow(T / 300, 1.5) * Math.exp(-0.56 / (8.62e-5 * T) + 0.56 / (8.62e-5 * 300));
      const Vbi = Vt * Math.log((Na * Nd) / (ni * ni));

      return [
        { label: "Built-in Potential (Vbi)", value: Vbi.toFixed(3), unit: "Volts" },
        { label: "Thermal Voltage (Vt)", value: (Vt * 1000).toFixed(2), unit: "mV" },
        { label: "Intrinsic Carrier Density (ni)", value: ni > 1e12 ? ni.toExponential(2) : ni.toLocaleString(), unit: "cm⁻³" }
      ];
    }
  },
  {
    id: "depletion-width-calculator",
    name: "Depletion Region Width & Maximum E-Field",
    category: "PN Junctions",
    badgeVariant: "sky",
    formulaText: "W = √[ (2·ε_si/q) · (1/Na + 1/Nd) · (Vbi - V) ]",
    description: "Computes total space-charge depletion width, p-side penetration (xp), n-side penetration (xn), and peak junction electric field (Emax).",
    fields: [
      { id: "Na_exp", label: "Acceptor Concentration (Na)", unit: "10^x cm⁻³", defaultVal: 16.5, step: 0.5, min: 14, max: 19, desc: "P-side doping" },
      { id: "Nd_exp", label: "Donor Concentration (Nd)", unit: "10^x cm⁻³", defaultVal: 15.5, step: 0.5, min: 14, max: 19, desc: "N-side doping" },
      { id: "v_bias", label: "Applied Voltage (V)", unit: "Volts", defaultVal: -2.0, step: 0.5, min: -20, max: 0.6, desc: "Negative for reverse bias" }
    ],
    calculate: (v) => {
      const Na = Math.pow(10, v.Na_exp || 16.5);
      const Nd = Math.pow(10, v.Nd_exp || 15.5);
      const V = v.v_bias !== undefined ? v.v_bias : -2.0;
      const Vt = 0.0259;
      const ni = 1.0e10;
      const Vbi = Vt * Math.log((Na * Nd) / (ni * ni));
      const netV = Math.max(0.001, Vbi - V);

      const eps_si = 11.7 * 8.854e-14;
      const q = 1.6e-19;
      const W_cm = Math.sqrt(((2 * eps_si) / q) * (1 / Na + 1 / Nd) * netV);
      const W_um = W_cm * 1e4;
      const xp_um = (Nd / (Na + Nd)) * W_um;
      const xn_um = (Na / (Na + Nd)) * W_um;
      const Emax_kV = ((2 * netV) / W_cm) / 1000;

      return [
        { label: "Total Depletion Width (W)", value: W_um.toFixed(3), unit: "μm" },
        { label: "P-Side Penetration (xp)", value: xp_um.toFixed(3), unit: "μm" },
        { label: "N-Side Penetration (xn)", value: xn_um.toFixed(3), unit: "μm" },
        { label: "Peak Electric Field (Emax)", value: Emax_kV.toFixed(1), unit: "kV/cm" }
      ];
    }
  },
  {
    id: "sheet-resistance-calculator",
    name: "Sheet Resistance (Rs) & Thin-Film Resistivity",
    category: "Resistivity & Sheet Resistance",
    badgeVariant: "amber",
    formulaText: "Rs = ρ / t = 1 / (q · μ · N · t)",
    description: "Calculates four-point probe sheet resistance (ohms/square) for doped silicon layers, polysilicon interconnects, and copper/ruthenium metallization.",
    fields: [
      { id: "doping_exp", label: "Doping / Carrier Density (N)", unit: "10^x cm⁻³", defaultVal: 18.0, step: 0.5, min: 15, max: 21, desc: "Active carrier concentration" },
      { id: "mobility", label: "Carrier Mobility (μ)", unit: "cm²/V·s", defaultVal: 450, step: 25, min: 50, max: 1500, desc: "Electron or hole mobility" },
      { id: "thickness_nm", label: "Film Thickness (t)", unit: "nm", defaultVal: 50, step: 5, min: 2, max: 1000, desc: "Physical layer thickness" }
    ],
    calculate: (v) => {
      const N = Math.pow(10, v.doping_exp || 18);
      const mu = v.mobility || 450;
      const t_cm = (v.thickness_nm || 50) * 1e-7;
      const q = 1.6e-19;

      const sigma = q * mu * N; // S/cm
      const rho = 1 / sigma; // ohm-cm
      const Rs = rho / t_cm; // ohms/sq

      return [
        { label: "Sheet Resistance (Rs)", value: Rs.toFixed(2), unit: "Ω/sq" },
        { label: "Resistivity (ρ)", value: (rho * 1000).toFixed(3), unit: "mΩ·cm" },
        { label: "Conductivity (σ)", value: sigma.toFixed(1), unit: "S/cm" }
      ];
    }
  },
  {
    id: "mosfet-vth-calculator",
    name: "MOSFET Threshold Voltage (Vth) Solver",
    category: "MOSFETs & Scaling",
    badgeVariant: "purple",
    formulaText: "Vth = Vfb + 2·ψB + [ √(2·ε_si·q·Na·(2ψB)) / Cox ]",
    description: "Calculates flatband voltage, bulk potential, oxide capacitance, and threshold voltage including substrate body bias effects.",
    fields: [
      { id: "tox_nm", label: "Oxide Thickness (tox)", unit: "nm", defaultVal: 1.5, step: 0.1, min: 0.8, max: 5.0, desc: "Gate dielectric thickness" },
      { id: "Na_exp", label: "Substrate Doping (Na)", unit: "10^x cm⁻³", defaultVal: 17.0, step: 0.5, min: 15, max: 18.5, desc: "Channel substrate doping" },
      { id: "eps_ox", label: "Dielectric Constant (εr)", unit: "relative", defaultVal: 3.9, step: 1.0, min: 3.9, max: 25.0, desc: "3.9 for SiO2, 25 for HfO2" }
    ],
    calculate: (v) => {
      const tox_cm = (v.tox_nm || 1.5) * 1e-7;
      const Na = Math.pow(10, v.Na_exp || 17.0);
      const eps_ox_val = (v.eps_ox || 3.9) * 8.854e-14;
      const Cox = eps_ox_val / tox_cm; // F/cm2

      const Vt = 0.0259;
      const ni = 1.0e10;
      const psiB = Vt * Math.log(Na / ni);
      const eps_si = 11.7 * 8.854e-14;
      const q = 1.6e-19;
      const Qdep = Math.sqrt(2 * eps_si * q * Na * (2 * psiB));
      const Vth = -0.85 + 2 * psiB + Qdep / Cox;

      return [
        { label: "Threshold Voltage (Vth)", value: Math.max(0.2, Vth).toFixed(3), unit: "Volts" },
        { label: "Bulk Potential (2·ψB)", value: (2 * psiB).toFixed(3), unit: "Volts" },
        { label: "Oxide Capacitance (Cox)", value: (Cox * 1e6).toFixed(2), unit: "μF/cm²" }
      ];
    }
  }
];
