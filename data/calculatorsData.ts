export interface CalculatorTool {
  id: string;
  name: string;
  category:
  | "Semiconductor Physics"
  | "PN Junctions"
  | "MOSFETs & Scaling"
  | "Resistivity & Sheet Resistance";
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
  calculate: (
    values: Record<string, number>
  ) => { label: string; value: string; unit: string; note?: string }[];
}

const BOLTZMANN_EV = 8.617333262e-5; // eV/K
const BOLTZMANN_J = 1.380649e-23; // J/K
const ELEMENTARY_CHARGE = 1.602176634e-19; // C
const VACUUM_PERMITTIVITY = 8.8541878128e-14; // F/cm
const SILICON_PERMITTIVITY = 11.7 * VACUUM_PERMITTIVITY;

function formatNumber(value: number, digits = 6): string {
  if (!Number.isFinite(value)) {
    return "Not available";
  }

  return value.toLocaleString("en-US", {
    maximumSignificantDigits: digits,
  });
}

// Approximate silicon intrinsic carrier concentration.
// This is a simplified educational model, not a material database.
export function siliconIntrinsicConcentration(temperature: number): number {
  const referenceTemperature = 300;
  const referenceNi = 1.0e10;
  const bandGapEv = 1.12;

  return (
    referenceNi *
    Math.pow(temperature / referenceTemperature, 1.5) *
    Math.exp(
      (-bandGapEv / (2 * BOLTZMANN_EV)) *
      (1 / temperature - 1 / referenceTemperature)
    )
  );
}

export function calculateSiliconBuiltInPotential(
  Na: number,
  Nd: number,
  temperature: number
): number {
  const ni = siliconIntrinsicConcentration(temperature);
  const thermalVoltage =
    (BOLTZMANN_J * temperature) / ELEMENTARY_CHARGE;

  return thermalVoltage * Math.log((Na * Nd) / (ni * ni));
}

export const CALCULATORS_DATA: CalculatorTool[] = [
  {
    id: "vbi-calculator",
    name: "PN Junction Built-in Potential (Vbi) Solver",
    category: "PN Junctions",
    badgeVariant: "teal",
    formulaText: "Vbi = (kT/q) · ln(Na · Nd / ni²)",
    description:
      "Estimates the built-in potential and thermal voltage of a silicon p-n junction at thermal equilibrium.",
    fields: [
      {
        id: "Na_exp",
        label: "Acceptor Concentration (Na)",
        unit: "10^x cm⁻³",
        defaultVal: 16,
        step: 0.5,
        min: 14,
        max: 19,
        desc: "P-type doping density",
      },
      {
        id: "Nd_exp",
        label: "Donor Concentration (Nd)",
        unit: "10^x cm⁻³",
        defaultVal: 16,
        step: 0.5,
        min: 14,
        max: 19,
        desc: "N-type doping density",
      },
      {
        id: "temp",
        label: "Temperature (T)",
        unit: "Kelvin",
        defaultVal: 300,
        step: 10,
        min: 100,
        max: 500,
        desc: "Operating temperature",
      },
    ],
    calculate: (v) => {
      const Na = Math.pow(10, v.Na_exp ?? 16);
      const Nd = Math.pow(10, v.Nd_exp ?? 16);
      const T = v.temp ?? 300;

      const ni = siliconIntrinsicConcentration(T);
      const Vt = (BOLTZMANN_J * T) / ELEMENTARY_CHARGE;
      const Vbi = calculateSiliconBuiltInPotential(Na, Nd, T);

      return [
        {
          label: "Built-in Potential (Vbi)",
          value: formatNumber(Vbi, 5),
          unit: "V",
        },
        {
          label: "Thermal Voltage (Vt)",
          value: formatNumber(Vt * 1000, 5),
          unit: "mV",
        },
        {
          label: "Intrinsic Carrier Density (ni)",
          value: ni.toExponential(3),
          unit: "cm⁻³",
        },
      ];
    },
  },

  {
    id: "depletion-width-calculator",
    name: "Depletion Region Width & Maximum E-Field",
    category: "PN Junctions",
    badgeVariant: "sky",
    formulaText: "W = √[(2εsi/q) · (1/Na + 1/Nd) · (Vbi - V)]",
    description:
      "Estimates total depletion width, p-side and n-side penetration, and peak electric-field magnitude for an abrupt silicon p-n junction.",
    fields: [
      {
        id: "Na_exp",
        label: "Acceptor Concentration (Na)",
        unit: "10^x cm⁻³",
        defaultVal: 16.5,
        step: 0.5,
        min: 14,
        max: 19,
        desc: "P-side doping",
      },
      {
        id: "Nd_exp",
        label: "Donor Concentration (Nd)",
        unit: "10^x cm⁻³",
        defaultVal: 15.5,
        step: 0.5,
        min: 14,
        max: 19,
        desc: "N-side doping",
      },
      {
        id: "v_bias",
        label: "Applied Voltage (V)",
        unit: "V",
        defaultVal: -2,
        step: 0.5,
        min: -20,
        max: 0.6,
        desc: "Negative values indicate reverse bias; positive values indicate forward bias.",
      },
    ],
    calculate: (v) => {
      const Na = Math.pow(10, v.Na_exp ?? 16.5);
      const Nd = Math.pow(10, v.Nd_exp ?? 15.5);
      const appliedVoltage = v.v_bias ?? -2;
      const temperature = 300;

      const ni = siliconIntrinsicConcentration(temperature);
      const Vbi = calculateSiliconBuiltInPotential(
        Na,
        Nd,
        temperature
      );

      const junctionVoltage = Vbi - appliedVoltage;

      if (junctionVoltage <= 0) {
        return [
          {
            label: "Calculation Status",
            value: "Outside model range",
            unit: "",
            note:
              "The applied forward bias is at or above the estimated built-in potential. The depletion approximation is not suitable here.",
          },
        ];
      }

      const W_cm = Math.sqrt(
        ((2 * SILICON_PERMITTIVITY) / ELEMENTARY_CHARGE) *
        (1 / Na + 1 / Nd) *
        junctionVoltage
      );

      const W_um = W_cm * 1e4;
      const xp_um = (Nd / (Na + Nd)) * W_um;
      const xn_um = (Na / (Na + Nd)) * W_um;
      const Emax_V_per_cm = (2 * junctionVoltage) / W_cm;
      const Emax_kV_per_cm = Emax_V_per_cm / 1000;

      return [
        {
          label: "Built-in Potential (Vbi)",
          value: formatNumber(Vbi, 5),
          unit: "V",
        },
        {
          label: "Total Depletion Width (W)",
          value: formatNumber(W_um, 6),
          unit: "μm",
        },
        {
          label: "P-Side Penetration (xp)",
          value: formatNumber(xp_um, 6),
          unit: "μm",
        },
        {
          label: "N-Side Penetration (xn)",
          value: formatNumber(xn_um, 6),
          unit: "μm",
        },
        {
          label: "Peak Electric Field (Emax)",
          value: formatNumber(Emax_kV_per_cm, 6),
          unit: "kV/cm",
        },
      ];
    },
  },

  {
    id: "sheet-resistance-calculator",
    name: "Sheet Resistance (Rs) & Thin-Film Resistivity",
    category: "Resistivity & Sheet Resistance",
    badgeVariant: "amber",
    formulaText: "Rs = ρ/t = 1/(q · μ · N · t)",
    description:
      "Estimates sheet resistance, bulk resistivity, and conductivity from carrier concentration, mobility, and film thickness.",
    fields: [
      {
        id: "doping_exp",
        label: "Doping / Carrier Density (N)",
        unit: "10^x cm⁻³",
        defaultVal: 18,
        step: 0.5,
        min: 15,
        max: 21,
        desc: "Active carrier concentration",
      },
      {
        id: "mobility",
        label: "Carrier Mobility (μ)",
        unit: "cm²/V·s",
        defaultVal: 450,
        step: 25,
        min: 50,
        max: 1500,
        desc: "Carrier mobility",
      },
      {
        id: "thickness_nm",
        label: "Film Thickness (t)",
        unit: "nm",
        defaultVal: 50,
        step: 5,
        min: 2,
        max: 1000,
        desc: "Physical layer thickness",
      },
    ],
    calculate: (v) => {
      const N = Math.pow(10, v.doping_exp ?? 18);
      const mobility = v.mobility ?? 450;
      const thicknessNm = v.thickness_nm ?? 50;

      if (N <= 0 || mobility <= 0 || thicknessNm <= 0) {
        return [
          {
            label: "Calculation Status",
            value: "Invalid input",
            unit: "",
            note:
              "Carrier concentration, mobility, and film thickness must be greater than zero.",
          },
        ];
      }

      const thicknessCm = thicknessNm * 1e-7;
      const conductivity = ELEMENTARY_CHARGE * mobility * N;
      const resistivity = 1 / conductivity;
      const sheetResistance = resistivity / thicknessCm;

      return [
        {
          label: "Sheet Resistance (Rs)",
          value: formatNumber(sheetResistance, 7),
          unit: "Ω/sq",
        },
        {
          label: "Resistivity (ρ)",
          value: formatNumber(resistivity * 1000, 7),
          unit: "mΩ·cm",
        },
        {
          label: "Conductivity (σ)",
          value: formatNumber(conductivity, 7),
          unit: "S/cm",
        },
      ];
    },
  },

  {
    id: "mosfet-vth-calculator",
    name: "MOSFET Threshold Voltage (Vth) Solver",
    category: "MOSFETs & Scaling",
    badgeVariant: "purple",
    formulaText: "Vth = Vfb + 2ψB + |Qdep|/Cox",
    description:
      "Estimates the threshold voltage of an idealized n-channel MOSFET using a configurable flatband voltage, substrate doping, and gate dielectric.",
    fields: [
      {
        id: "tox_nm",
        label: "Oxide Thickness (tox)",
        unit: "nm",
        defaultVal: 1.5,
        step: 0.1,
        min: 0.8,
        max: 5,
        desc: "Gate dielectric thickness",
      },
      {
        id: "Na_exp",
        label: "Substrate Doping (Na)",
        unit: "10^x cm⁻³",
        defaultVal: 17,
        step: 0.5,
        min: 15,
        max: 18.5,
        desc: "P-type substrate doping",
      },
      {
        id: "eps_ox",
        label: "Dielectric Constant (εr)",
        unit: "relative",
        defaultVal: 3.9,
        step: 0.1,
        min: 3.9,
        max: 25,
        desc: "3.9 for SiO₂; approximately 20–25 for some high-k dielectrics",
      },
    ],
    calculate: (v) => {
      const toxNm = v.tox_nm ?? 1.5;
      const Na = Math.pow(10, v.Na_exp ?? 17);
      const relativePermittivity = v.eps_ox ?? 3.9;

      if (toxNm <= 0 || Na <= 0 || relativePermittivity <= 0) {
        return [
          {
            label: "Calculation Status",
            value: "Invalid input",
            unit: "",
            note:
              "Oxide thickness, substrate doping, and dielectric constant must be greater than zero.",
          },
        ];
      }

      const toxCm = toxNm * 1e-7;
      const epsOx = relativePermittivity * VACUUM_PERMITTIVITY;
      const Cox = epsOx / toxCm;

      const ni = siliconIntrinsicConcentration(300);
      const Vt = (BOLTZMANN_J * 300) / ELEMENTARY_CHARGE;
      const psiB = Vt * Math.log(Na / ni);
      const Qdep = Math.sqrt(
        2 * SILICON_PERMITTIVITY * ELEMENTARY_CHARGE * Na * (2 * psiB)
      );

      // Assumed flatband voltage; actual Vfb depends on the gate and substrate.
      const flatbandVoltage = -0.85;
      const Vth = flatbandVoltage + 2 * psiB + Qdep / Cox;

      return [
        {
          label: "Threshold Voltage (Vth)",
          value: formatNumber(Vth, 6),
          unit: "V",
          note:
            "Uses an assumed flatband voltage of -0.85 V. Actual devices may differ.",
        },
        {
          label: "Bulk Potential (2ψB)",
          value: formatNumber(2 * psiB, 6),
          unit: "V",
        },
        {
          label: "Oxide Capacitance (Cox)",
          value: formatNumber(Cox * 1e6, 7),
          unit: "μF/cm²",
        },
      ];
    },
  },

  {
    id: "ohms-law-calculator",
    name: "Ohm's Law & Electrical Power Calculator",
    category: "Semiconductor Physics",
    badgeVariant: "blue",
    formulaText: "V = I × R | I = V/R | R = V/I | P = V × I",
    description:
      "Calculates electrical power and checks the voltage, current, and resistance values entered for a simple DC circuit.",
    fields: [
      {
        id: "voltage",
        label: "Voltage (V)",
        unit: "V",
        defaultVal: 5,
        step: 0.1,
        min: 0,
        max: 1000,
        desc: "Voltage across the circuit element",
      },
      {
        id: "current",
        label: "Current (I)",
        unit: "A",
        defaultVal: 0.01,
        step: 0.001,
        min: 0,
        max: 100,
        desc: "Current through the circuit element",
      },
      {
        id: "resistance",
        label: "Resistance (R)",
        unit: "Ω",
        defaultVal: 500,
        step: 1,
        min: 0.001,
        max: 1000000,
        desc: "Resistance of the circuit element",
      },
    ],
    calculate: (v) => {
      const voltage = v.voltage ?? 5;
      const current = v.current ?? 0.01;
      const resistance = v.resistance ?? 500;

      const calculatedVoltage = current * resistance;
      const calculatedCurrent =
        resistance > 0 ? voltage / resistance : Number.NaN;
      const calculatedResistance =
        current > 0 ? voltage / current : Number.NaN;
      const power = voltage * current;

      return [
        {
          label: "Entered Voltage (V)",
          value: formatNumber(voltage, 7),
          unit: "V",
        },
        {
          label: "Entered Current (I)",
          value: formatNumber(current, 7),
          unit: "A",
        },
        {
          label: "Entered Resistance (R)",
          value: formatNumber(resistance, 7),
          unit: "Ω",
        },
        {
          label: "Voltage from I × R",
          value: formatNumber(calculatedVoltage, 7),
          unit: "V",
          note:
            "For values consistent with Ohm's law, this should match the entered voltage.",
        },
        {
          label: "Current from V / R",
          value: formatNumber(calculatedCurrent, 7),
          unit: "A",
        },
        {
          label: "Resistance from V / I",
          value: formatNumber(calculatedResistance, 7),
          unit: "Ω",
        },
        {
          label: "Electrical Power (P)",
          value: formatNumber(power, 7),
          unit: "W",
          note: "Calculated using P = V × I.",
        },
      ];
    },
  },
];