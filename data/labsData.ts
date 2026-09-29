export interface LabParam {
  id: string;
  name: string;
  symbol: string;
  min: number;
  max: number;
  step: number;
  defaultVal: number;
  unit: string;
  desc: string;
}

export interface VirtualLab {
  id: string;
  title: string;
  category: "Diodes" | "Transistors" | "Digital Logic" | "Capacitors" | "RF & Power";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  badgeVariant: "teal" | "sky" | "blue" | "purple" | "amber";
  description: string;
  theorySummary: string;
  equations: { label: string; formula: string }[];
  params: LabParam[];
  outputs: { id: string; label: string; unit: string; formulaDesc: string }[];
  compute: (inputs: Record<string, number>) => {
    metrics: { label: string; value: string; unit?: string }[];
    chartData: { x: number; y: number; label?: string }[];
    statusText: string;
  };
}

export const VIRTUAL_LABS: VirtualLab[] = [
  {
    id: "pn-junction-lab",
    title: "PN Junction Depletion & Electrostatics Lab",
    category: "Diodes",
    difficulty: "Beginner",
    badgeVariant: "teal",
    description: "Tune acceptor (Na) and donor (Nd) doping densities and applied bias to dynamically inspect built-in potential (Vbi), depletion width (W), and space-charge profiles.",
    theorySummary: "Thermal equilibrium electrostatics in step junctions governed by Poisson's equation and carrier diffusion-drift balance.",
    equations: [
      { label: "Built-in Potential", formula: "Vbi = (kT/q) · ln(Na · Nd / ni²)" },
      { label: "Depletion Width", formula: "W = √[ (2·ε_si/q) · (1/Na + 1/Nd) · (Vbi - V) ]" }
    ],
    params: [
      { id: "Na_exp", name: "Acceptor Doping (Na)", symbol: "Na", min: 14, max: 18, step: 0.5, defaultVal: 16, unit: "10^x cm⁻³", desc: "P-side doping" },
      { id: "Nd_exp", name: "Donor Doping (Nd)", symbol: "Nd", min: 14, max: 18, step: 0.5, defaultVal: 16, unit: "10^x cm⁻³", desc: "N-side doping" },
      { id: "V_bias", name: "Applied Voltage (V)", symbol: "V", min: -5.0, max: 0.6, step: 0.1, defaultVal: 0.0, unit: "Volts", desc: "Bias voltage" },
      { id: "temp", name: "Temperature (T)", symbol: "T", min: 200, max: 450, step: 25, defaultVal: 300, unit: "Kelvin", desc: "Operating temperature" }
    ],
    outputs: [
      { id: "vbi", label: "Built-in Potential (Vbi)", unit: "V", formulaDesc: "Vt · ln(Na·Nd/ni²)" },
      { id: "w_dep", label: "Depletion Width (W)", unit: "μm", formulaDesc: "Total space-charge width" },
      { id: "emax", label: "Peak Electric Field", unit: "kV/cm", formulaDesc: "Max field at junction" }
    ],
    compute: (inputs) => {
      const Na = Math.pow(10, inputs.Na_exp || 16);
      const Nd = Math.pow(10, inputs.Nd_exp || 16);
      const T = inputs.temp || 300;
      const V = inputs.V_bias !== undefined ? inputs.V_bias : 0;
      const Vt = (1.38e-23 * T) / 1.6e-19; // ~0.0259 at 300K
      const ni = 1.0e10 * Math.pow(T / 300, 1.5);
      const Vbi = Vt * Math.log((Na * Nd) / (ni * ni));
      const eps_si = 11.7 * 8.854e-14; // F/cm
      const q = 1.6e-19;

      const netV = Math.max(0.01, Vbi - V);
      const W_cm = Math.sqrt(((2 * eps_si) / q) * (1 / Na + 1 / Nd) * netV);
      const W_um = W_cm * 1e4;
      const Emax_kV = ((2 * netV) / W_cm) / 1000;

      // Generate electric field profile points
      const chartData: { x: number; y: number }[] = [];
      const xp = (Nd / (Na + Nd)) * W_um;
      const xn = (Na / (Na + Nd)) * W_um;

      for (let i = -1.5 * xp; i <= 1.5 * xn; i += (W_um / 20)) {
        let field = 0;
        if (i >= -xp && i <= 0) {
          field = Emax_kV * (1 + i / xp);
        } else if (i > 0 && i <= xn) {
          field = Emax_kV * (1 - i / xn);
        }
        chartData.push({ x: Number(i.toFixed(3)), y: Number(field.toFixed(1)) });
      }

      return {
        metrics: [
          { label: "Built-in Potential (Vbi)", value: Vbi.toFixed(3), unit: "V" },
          { label: "Depletion Width (W)", value: W_um.toFixed(3), unit: "μm" },
          { label: "Peak E-Field (Emax)", value: Emax_kV.toFixed(1), unit: "kV/cm" },
          { label: "Thermal Voltage (Vt)", value: (Vt * 1000).toFixed(2), unit: "mV" }
        ],
        chartData,
        statusText: V > 0 ? "Forward Biased: Barrier lowered, diffusion current conducting" : V < 0 ? "Reverse Biased: Depletion width expanded, leakage saturation" : "Thermal Equilibrium: Net current zero"
      };
    }
  },
  {
    id: "diode-iv-characteristics",
    title: "Diode I-V Characteristics & Temperature Tracer",
    category: "Diodes",
    difficulty: "Beginner",
    badgeVariant: "teal",
    description: "Simulate forward bias exponential diffusion conduction, ideality factor (η), reverse saturation leakage (I0), and thermal runaway.",
    theorySummary: "Shockley Ideal Diode Equation with series resistance and thermal leakage dependencies.",
    equations: [
      { label: "Shockley Equation", formula: "I = I0 · [ exp(q·V / (η·k·T)) - 1 ]" }
    ],
    params: [
      { id: "Is_exp", name: "Reverse Saturation Current (I0)", symbol: "I0", min: -14, max: -8, step: 1, defaultVal: -12, unit: "10^x A", desc: "Leakage current" },
      { id: "eta", name: "Ideality Factor (η)", symbol: "η", min: 1.0, max: 2.0, step: 0.1, defaultVal: 1.0, unit: "unitless", desc: "1.0 for diffusion, 2.0 for recombination" },
      { id: "temp", name: "Temperature (T)", symbol: "T", min: 250, max: 400, step: 25, defaultVal: 300, unit: "K", desc: "Ambient temperature" }
    ],
    outputs: [
      { id: "von", label: "Cut-in Knee Voltage (V)", unit: "V", formulaDesc: "Voltage at 1 mA conduction" }
    ],
    compute: (inputs) => {
      const I0 = Math.pow(10, inputs.Is_exp || -12);
      const eta = inputs.eta || 1.0;
      const T = inputs.temp || 300;
      const Vt = (1.38e-23 * T) / 1.6e-19;

      const chartData: { x: number; y: number }[] = [];
      for (let v = -0.5; v <= 0.85; v += 0.05) {
        let current_mA = 0;
        if (v < 0) {
          current_mA = -I0 * 1000;
        } else {
          current_mA = I0 * (Math.exp(v / (eta * Vt)) - 1) * 1000;
          if (current_mA > 50) current_mA = 50; // clamp for display
        }
        chartData.push({ x: Number(v.toFixed(2)), y: Number(current_mA.toFixed(3)) });
      }

      return {
        metrics: [
          { label: "Turn-on Knee Voltage", value: (0.65 + (eta - 1) * 0.15 - (T - 300) * 0.002).toFixed(2), unit: "V" },
          { label: "Reverse Leakage (I0)", value: (I0 * 1e12).toFixed(2), unit: "pA" },
          { label: "Dynamic Resistance (rd @ 1mA)", value: ((eta * Vt) / 0.001).toFixed(1), unit: "Ω" }
        ],
        chartData,
        statusText: `Forward conduction begins around ${(0.65 + (eta - 1) * 0.15).toFixed(2)} V. Dynamic resistance is ~${((eta * Vt) / 0.001).toFixed(1)} Ω.`
      };
    }
  },
  {
    id: "mosfet-characteristics-lab",
    title: "MOSFET DC Family of Curves (ID - VDS & ID - VGS)",
    category: "Transistors",
    difficulty: "Intermediate",
    badgeVariant: "blue",
    description: "Interactive square-law simulator: tune channel width/length (W/L), threshold voltage (Vth), gate overdrive (VGS), and channel-length modulation (λ).",
    theorySummary: "Gradual Channel Approximation and velocity saturation in linear, triode, and saturation regimes.",
    equations: [
      { label: "Linear Regime", formula: "ID = μ·Cox·(W/L) · [ (VGS - Vth)·VDS - VDS²/2 ]" },
      { label: "Saturation Regime", formula: "ID_sat = (1/2)·μ·Cox·(W/L)·(VGS - Vth)² · (1 + λ·VDS)" }
    ],
    params: [
      { id: "Vgs", name: "Gate Voltage (VGS)", symbol: "VGS", min: 0.5, max: 2.5, step: 0.25, defaultVal: 1.5, unit: "V", desc: "Gate bias" },
      { id: "Vth", name: "Threshold Voltage (Vth)", symbol: "Vth", min: 0.2, max: 0.8, step: 0.05, defaultVal: 0.45, unit: "V", desc: "Transistor threshold" },
      { id: "wl_ratio", name: "Aspect Ratio (W/L)", symbol: "W/L", min: 1, max: 50, step: 5, defaultVal: 20, unit: "ratio", desc: "Channel width to length ratio" },
      { id: "lambda", name: "Channel Mod. (λ)", symbol: "λ", min: 0.0, max: 0.1, step: 0.02, defaultVal: 0.04, unit: "V⁻¹", desc: "Early effect coefficient" }
    ],
    outputs: [
      { id: "id_sat", label: "Saturation Current (ID_sat)", unit: "mA", formulaDesc: "Max current at pinch-off" },
      { id: "vds_sat", label: "Pinch-off Voltage (VDS_sat)", unit: "V", formulaDesc: "VGS - Vth" }
    ],
    compute: (inputs) => {
      const Vgs = inputs.Vgs || 1.5;
      const Vth = inputs.Vth || 0.45;
      const wl = inputs.wl_ratio || 20;
      const lambda = inputs.lambda !== undefined ? inputs.lambda : 0.04;
      const kprime = 200e-6; // A/V^2 for NMOS (mu * Cox)

      const Vov = Math.max(0, Vgs - Vth);
      const Vds_sat = Vov;

      const chartData: { x: number; y: number }[] = [];
      for (let vds = 0; vds <= 2.5; vds += 0.1) {
        let Id = 0;
        if (Vov > 0) {
          if (vds < Vds_sat) {
            Id = kprime * wl * (Vov * vds - (vds * vds) / 2) * (1 + lambda * vds);
          } else {
            Id = 0.5 * kprime * wl * Vov * Vov * (1 + lambda * vds);
          }
        }
        chartData.push({ x: Number(vds.toFixed(1)), y: Number((Id * 1000).toFixed(3)) });
      }

      const id_sat_val = 0.5 * kprime * wl * Vov * Vov * (1 + lambda * Vds_sat) * 1000;
      const gm_mS = kprime * wl * Vov * 1000;

      return {
        metrics: [
          { label: "Overdrive Voltage (Vov)", value: Vov.toFixed(2), unit: "V" },
          { label: "Pinch-off VDS,sat", value: Vds_sat.toFixed(2), unit: "V" },
          { label: "Sat. Drain Current (ID)", value: id_sat_val.toFixed(2), unit: "mA" },
          { label: "Transconductance (gm)", value: gm_mS.toFixed(2), unit: "mS" }
        ],
        chartData,
        statusText: Vov > 0 ? `Active Inversion: Saturation begins at VDS = ${Vds_sat.toFixed(2)} V with gm = ${gm_mS.toFixed(2)} mS.` : "Cutoff Regime: VGS < Vth (Subthreshold leakage only)"
      };
    }
  },
  {
    id: "mos-capacitor-lab",
    title: "MOS Capacitor High/Low Frequency C-V Simulator",
    category: "Capacitors",
    difficulty: "Intermediate",
    badgeVariant: "blue",
    description: "Observe high-frequency vs low-frequency capacitance transitions across accumulation, depletion, and strong inversion as oxide thickness (tox) and substrate doping vary.",
    theorySummary: "Si-SiO2 surface state band bending, oxide capacitance Cox, and inversion layer carrier response rates.",
    equations: [
      { label: "Oxide Capacitance", formula: "Cox = ε_ox / tox" },
      { label: "Minimum Capacitance", formula: "Cmin = Cox · Cdep_max / (Cox + Cdep_max)" }
    ],
    params: [
      { id: "tox", name: "Oxide Thickness (tox)", symbol: "tox", min: 1.0, max: 10.0, step: 0.5, defaultVal: 2.5, unit: "nm", desc: "Gate dielectric physical thickness" },
      { id: "Na_exp", name: "Substrate Doping (Na)", symbol: "Na", min: 15, max: 18, step: 0.5, defaultVal: 16.5, unit: "10^x cm⁻³", desc: "P-type substrate doping" },
      { id: "high_k", name: "Dielectric Material", symbol: "ε_r", min: 3.9, max: 25.0, step: 21.1, defaultVal: 3.9, unit: "SiO2 / HfO2", desc: "3.9 for SiO2, 25 for HfO2" }
    ],
    outputs: [
      { id: "cox", label: "Oxide Capacitance (Cox)", unit: "fF/μm²", formulaDesc: "ε_ox / tox" }
    ],
    compute: (inputs) => {
      const tox_nm = inputs.tox || 2.5;
      const eps_r = inputs.high_k || 3.9;
      const tox_cm = tox_nm * 1e-7;
      const eps_0 = 8.854e-14;
      const Cox_uF = (eps_r * eps_0) / tox_cm * 1e6; // uF/cm2
      const Cox_fF_um2 = Cox_uF * 10; // fF/um2
      const Cmin_fF_um2 = Cox_fF_um2 * 0.35;

      const chartData: { x: number; y: number }[] = [];
      for (let v = -2.0; v <= 2.0; v += 0.2) {
        let C = 0;
        if (v < -0.5) {
          C = Cox_fF_um2; // accumulation
        } else if (v >= -0.5 && v < 0.5) {
          const frac = (0.5 - v) / 1.0;
          C = Cmin_fF_um2 + (Cox_fF_um2 - Cmin_fF_um2) * frac * frac;
        } else {
          C = Cmin_fF_um2; // High-frequency inversion
        }
        chartData.push({ x: Number(v.toFixed(1)), y: Number(C.toFixed(2)) });
      }

      return {
        metrics: [
          { label: "Oxide Capacitance (Cox)", value: Cox_fF_um2.toFixed(2), unit: "fF/μm²" },
          { label: "Min Depletion Cap (Cmin)", value: Cmin_fF_um2.toFixed(2), unit: "fF/μm²" },
          { label: "Equivalent Oxide (EOT)", value: ((3.9 / eps_r) * tox_nm).toFixed(2), unit: "nm" }
        ],
        chartData,
        statusText: `Dielectric EOT = ${((3.9 / eps_r) * tox_nm).toFixed(2)} nm. In accumulation (negative Vg), C = Cox = ${Cox_fF_um2.toFixed(2)} fF/μm².`
      };
    }
  },
  {
    id: "cmos-inverter-lab",
    title: "CMOS Inverter Voltage Transfer Curve (VTC) & Sizing",
    category: "Digital Logic",
    difficulty: "Intermediate",
    badgeVariant: "purple",
    description: "Tune PMOS-to-NMOS width ratio (Wp/Wn) to inspect the inverter switching threshold (VM), high/low noise margins (NMH, NML), and dynamic power switching.",
    theorySummary: "Equating NMOS and PMOS drain currents to derive the non-linear Voltage Transfer Characteristic.",
    equations: [
      { label: "Switching Threshold", formula: "VM = (Vthn + √(βp/βn)·(VDD - |Vthp|)) / (1 + √(βp/βn))" },
      { label: "Noise Margins", formula: "NMH = VOH - VIH,  NML = VIL - VOL" }
    ],
    params: [
      { id: "vdd", name: "Supply Voltage (VDD)", symbol: "VDD", min: 0.6, max: 1.8, step: 0.1, defaultVal: 1.2, unit: "V", desc: "Power supply rail" },
      { id: "wp_wn", name: "PMOS/NMOS Ratio (Wp/Wn)", symbol: "Wp/Wn", min: 1.0, max: 4.0, step: 0.5, defaultVal: 2.2, unit: "ratio", desc: "Accounts for hole mobility deficit (μn ≈ 2.2 · μp)" }
    ],
    outputs: [
      { id: "vm", label: "Switching Threshold (VM)", unit: "V", formulaDesc: "Symmetrical at VDD / 2" }
    ],
    compute: (inputs) => {
      const vdd = inputs.vdd || 1.2;
      const ratio = inputs.wp_wn || 2.2;
      const Vm = vdd * (0.42 + 0.08 * (ratio / 2.2));

      const chartData: { x: number; y: number }[] = [];
      for (let vin = 0; vin <= vdd; vin += vdd / 20) {
        let vout = 0;
        if (vin < Vm - 0.15) {
          vout = vdd;
        } else if (vin > Vm + 0.15) {
          vout = 0;
        } else {
          const frac = (vin - (Vm - 0.15)) / 0.3;
          vout = vdd * (1 - frac);
        }
        chartData.push({ x: Number(vin.toFixed(2)), y: Number(vout.toFixed(2)) });
      }

      const nmh = (vdd - (Vm + 0.15));
      const nml = (Vm - 0.15);

      return {
        metrics: [
          { label: "Switching Threshold (VM)", value: Vm.toFixed(2), unit: "V" },
          { label: "High Noise Margin (NMH)", value: nmh.toFixed(2), unit: "V" },
          { label: "Low Noise Margin (NML)", value: nml.toFixed(2), unit: "V" }
        ],
        chartData,
        statusText: `Symmetric inverter switching threshold VM = ${Vm.toFixed(2)} V (Ideal VDD/2 = ${(vdd / 2).toFixed(2)} V).`
      };
    }
  },
  {
    id: "bjt-characteristics-lab",
    title: "BJT Common-Emitter Output Characteristics & Early Voltage",
    category: "Transistors",
    difficulty: "Intermediate",
    badgeVariant: "sky",
    description: "Examine BJT Collector Current (IC) vs Collector-Emitter Voltage (VCE) family of curves across varying Base Currents (IB), DC current gain (β), and Early Voltage (VA).",
    theorySummary: "Minority carrier base transport, base-width modulation (Early effect), and active/saturation mode transitions.",
    equations: [
      { label: "Active Current", formula: "IC = β · IB · (1 + VCE / VA)" }
    ],
    params: [
      { id: "beta", name: "Current Gain (β)", symbol: "β", min: 50, max: 250, step: 25, defaultVal: 120, unit: "hFE", desc: "Common-emitter DC current gain" },
      { id: "va", name: "Early Voltage (VA)", symbol: "VA", min: 25, max: 150, step: 25, defaultVal: 75, unit: "V", desc: "Base-width modulation scale" },
      { id: "ib_uA", name: "Base Current (IB)", symbol: "IB", min: 10, max: 50, step: 10, defaultVal: 30, unit: "μA", desc: "Injected base bias current" }
    ],
    outputs: [
      { id: "ic_active", label: "Active Collector Current", unit: "mA", formulaDesc: "β · IB" }
    ],
    compute: (inputs) => {
      const beta = inputs.beta || 120;
      const va = inputs.va || 75;
      const ib_mA = (inputs.ib_uA || 30) / 1000; // in mA

      const chartData: { x: number; y: number }[] = [];
      for (let vce = 0; vce <= 10.0; vce += 0.5) {
        let ic = 0;
        if (vce < 0.3) {
          ic = beta * ib_mA * (vce / 0.3); // saturation slope
        } else {
          ic = beta * ib_mA * (1 + vce / va); // active mode with Early slope
        }
        chartData.push({ x: Number(vce.toFixed(1)), y: Number(ic.toFixed(2)) });
      }

      const ic_active_val = beta * ib_mA;
      const ro_kOhm = va / ic_active_val;

      return {
        metrics: [
          { label: "Active Current (IC)", value: ic_active_val.toFixed(2), unit: "mA" },
          { label: "Output Resistance (ro)", value: ro_kOhm.toFixed(1), unit: "kΩ" },
          { label: "Transconductance (gm)", value: (ic_active_val / 0.0259).toFixed(1), unit: "mS" }
        ],
        chartData,
        statusText: `Active amplification mode achieved for VCE > 0.3 V. Output resistance ro = ${ro_kOhm.toFixed(1)} kΩ.`
      };
    }
  }
];
