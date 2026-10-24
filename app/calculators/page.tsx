"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    CALCULATORS_DATA,
    calculateSiliconBuiltInPotential,
} from "@/data/calculatorsData";

type CalculatorResult = {
    label: string;
    value: string;
    unit: string;
    note?: string;
};

type CalculatorValues = Record<string, number>;

const OHM_OPTIONS = [
    { id: "ohm-voltage", name: "Ohm's Law — Calculate Voltage" },
    { id: "ohm-current", name: "Ohm's Law — Calculate Current" },
    { id: "ohm-resistance", name: "Ohm's Law — Calculate Resistance" },
    { id: "ohm-power", name: "Electrical Power" },
];

const SEMICONDUCTOR_CALCULATORS = CALCULATORS_DATA.filter(
    (tool) => tool.id !== "ohms-law-calculator"
);


const OHM_FORMULAS: Record<string, string> = {
    "ohm-voltage": "V = I × R",
    "ohm-current": "I = V ÷ R",
    "ohm-resistance": "R = V ÷ I",
    "ohm-power": "P = V × I",
};

const OHM_DESCRIPTIONS: Record<string, string> = {
    "ohm-voltage": "Calculate voltage using current and resistance.",
    "ohm-current": "Calculate current using voltage and resistance.",
    "ohm-resistance": "Calculate resistance using voltage and current.",
    "ohm-power": "Calculate electrical power using voltage and current.",
};

function createDefaultValues(
    tool: (typeof SEMICONDUCTOR_CALCULATORS)[number]
): CalculatorValues {
    return Object.fromEntries(
        tool.fields.map((field) => [field.id, field.defaultVal])
    );
}

const emptySubscribe = () => () => {};

export default function CalculatorsPage() {
    const [selectedId, setSelectedId] = useState("ohm-voltage");
    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    const [values, setValues] = useState<CalculatorValues>(() => {
        const firstTool = SEMICONDUCTOR_CALCULATORS[0];
        return firstTool ? createDefaultValues(firstTool) : {};
    });

    const [results, setResults] = useState<CalculatorResult[]>([]);
    const [error, setError] = useState("");

    const selectedTool = SEMICONDUCTOR_CALCULATORS.find(
        (tool) => tool.id === selectedId
    );

    const isOhmCalculator = selectedId.startsWith("ohm-");

    const vbiGraphData = useMemo(() => {
        if (selectedId !== "vbi-calculator") return [];
        const Na = Math.pow(10, values.Na_exp ?? 16);
        const Nd = Math.pow(10, values.Nd_exp ?? 16);
        const points = [];
        for (let temp = 100; temp <= 500; temp += 20) {
            const potential = calculateSiliconBuiltInPotential(Na, Nd, temp);
            points.push({
                temperature: temp,
                potential: Number(potential.toFixed(4)),
            });
        }
        return points;
    }, [selectedId, values.Na_exp, values.Nd_exp]);

    function handleCalculatorChange(id: string) {
        setSelectedId(id);
        setResults([]);
        setError("");

        const tool = SEMICONDUCTOR_CALCULATORS.find(
            (item) => item.id === id
        );

        setValues(tool ? createDefaultValues(tool) : {});
    }

    function handleInputChange(fieldId: string, rawValue: string) {
        if (rawValue.trim() === "") {
            setValues((previous) => ({
                ...previous,
                [fieldId]: Number.NaN,
            }));
            return;
        }

        const numberValue = Number(rawValue);

        setValues((previous) => ({
            ...previous,
            [fieldId]: numberValue,
        }));
    }

    function handleCalculate() {
        setError("");
        setResults([]);

        if (isOhmCalculator) {
            calculateOhmsLaw();
            return;
        }

        if (!selectedTool) {
            setError("Please select a calculator.");
            return;
        }

        for (const field of selectedTool.fields) {
            const value = values[field.id];

            if (!Number.isFinite(value)) {
                setError(`Please enter a valid value for ${field.label}.`);
                return;
            }

            if (value < field.min || value > field.max) {
                setError(
                    `${field.label} must be between ${field.min} and ${field.max} ${field.unit}.`
                );
                return;
            }
        }

        try {
            const calculatedResults = selectedTool.calculate(values);
            setResults(calculatedResults);
        } catch (calculationError) {
            setError(
                calculationError instanceof Error
                    ? calculationError.message
                    : "The calculation failed. Please check your inputs."
            );
        }
    }

    function calculateOhmsLaw() {
        const voltage = values.voltage;
        const current = values.current;
        const resistance = values.resistance;

        if (selectedId === "ohm-voltage") {
            if (!Number.isFinite(current) || !Number.isFinite(resistance) ||
                current < 0 || resistance <= 0) {
                setError("Enter a current of 0 or greater and a resistance greater than 0.");
                return;
            }

            setResults([
                {
                    label: "Calculated Voltage",
                    value: formatResult(current * resistance),
                    unit: "V",
                },
            ]);
            return;
        }

        if (selectedId === "ohm-current") {
            if (!Number.isFinite(voltage) || !Number.isFinite(resistance) ||
                voltage < 0 || resistance <= 0) {
                setError("Enter a voltage of 0 or greater and a resistance greater than 0.");
                return;
            }

            setResults([
                {
                    label: "Calculated Current",
                    value: formatResult(voltage / resistance),
                    unit: "A",
                },
            ]);
            return;
        }

        if (selectedId === "ohm-resistance") {
            if (!Number.isFinite(voltage) || !Number.isFinite(current) ||
                voltage < 0 || current <= 0) {
                setError("Enter a voltage of 0 or greater and a current greater than 0.");
                return;
            }

            setResults([
                {
                    label: "Calculated Resistance",
                    value: formatResult(voltage / current),
                    unit: "Ω",
                },
            ]);
            return;
        }

        if (selectedId === "ohm-power") {
            if (!Number.isFinite(voltage) || !Number.isFinite(current) ||
                voltage < 0 || current < 0) {
                setError("Enter valid voltage and current values, both 0 or greater.");
                return;
            }

            setResults([
                {
                    label: "Electrical Power",
                    value: formatResult(voltage * current),
                    unit: "W",
                },
            ]);
        }
    }

    function formatResult(value: number): string {
        return Number.isFinite(value)
            ? value.toLocaleString("en-US", {
                maximumSignificantDigits: 8,
            })
            : "Not available";
    }

    function renderInput(
        id: string,
        label: string,
        unit: string,
        description: string,
        value: number,
        onChange: (raw: string) => void,
        min?: number,
        max?: number,
        step?: number
    ) {
        return (
            <div key={id}>
                <label
                    htmlFor={`calculator-${id}`}
                    className="mb-2 block text-sm font-medium text-slate-300"
                >
                    {label}
                    {unit && <span className="ml-1 text-slate-500">({unit})</span>}
                </label>

                {description && (
                    <p className="mb-2 text-xs leading-5 text-slate-500">
                        {description}
                    </p>
                )}

                <input
                    id={`calculator-${id}`}
                    type="number"
                    value={Number.isFinite(value) ? value : ""}
                    min={min}
                    max={max}
                    step={step ?? "any"}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
            </div>
        );
    }

    function renderOhmInputs() {
        const fields: {
            id: string;
            label: string;
            unit: string;
            description: string;
        }[] = [];

        if (selectedId === "ohm-voltage") {
            fields.push(
                {
                    id: "current",
                    label: "Current",
                    unit: "A",
                    description: "Current flowing through the component.",
                },
                {
                    id: "resistance",
                    label: "Resistance",
                    unit: "Ω",
                    description: "Resistance of the component.",
                }
            );
        } else if (selectedId === "ohm-current") {
            fields.push(
                {
                    id: "voltage",
                    label: "Voltage",
                    unit: "V",
                    description: "Voltage across the component.",
                },
                {
                    id: "resistance",
                    label: "Resistance",
                    unit: "Ω",
                    description: "Resistance of the component.",
                }
            );
        } else {
            fields.push(
                {
                    id: "voltage",
                    label: "Voltage",
                    unit: "V",
                    description: "Voltage across the component.",
                },
                {
                    id: "current",
                    label: "Current",
                    unit: "A",
                    description: "Current flowing through the component.",
                }
            );
        }

        return fields.map((field) =>
            renderInput(
                field.id,
                field.label,
                field.unit,
                field.description,
                values[field.id] ?? Number.NaN,
                (raw) => handleInputChange(field.id, raw),
                0,
                undefined,
                0.01
            )
        );
    }

    const formula = isOhmCalculator
        ? OHM_FORMULAS[selectedId]
        : selectedTool?.formulaText ?? "";

    const description = isOhmCalculator
        ? OHM_DESCRIPTIONS[selectedId]
        : selectedTool?.description ?? "";

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
            <div className="mx-auto max-w-4xl">
                <Link
                    href="/"
                    className="text-sm text-cyan-400 transition hover:text-cyan-300"
                >
                    ← Back to Home
                </Link>

                <header className="mb-8 mt-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                        Semiconductor Engineering Tools
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Universal Calculator
                    </h1>

                    <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                        Choose a calculation, enter the required values, and view the
                        result without switching between separate calculator cards.
                    </p>
                </header>

                <section className="glass-panel rounded-2xl border border-slate-800 p-5 shadow-xl sm:p-8">
                    <label
                        htmlFor="calculator-select"
                        className="mb-2 block text-sm font-semibold text-slate-200"
                    >
                        Select a calculation
                    </label>

                    <select
                        id="calculator-select"
                        value={selectedId}
                        onChange={(event) => handleCalculatorChange(event.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    >
                        <optgroup label="Electrical Calculations">
                            {OHM_OPTIONS.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </optgroup>

                        <optgroup label="Semiconductor Calculations">
                            {SEMICONDUCTOR_CALCULATORS.map((tool) => (
                                <option key={tool.id} value={tool.id}>
                                    {tool.name}
                                </option>
                            ))}
                        </optgroup>
                    </select>

                    {description && (
                        <p className="mt-4 text-sm leading-6 text-slate-400">
                            {description}
                        </p>
                    )}

                    {formula && (
                        <div className="mt-5 rounded-xl border border-cyan-900/60 bg-cyan-950/30 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                                Formula
                            </p>
                            <p className="mt-2 break-words font-mono text-base text-cyan-100 sm:text-lg">
                                {formula}
                            </p>
                        </div>
                    )}

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        {isOhmCalculator
                            ? renderOhmInputs()
                            : selectedTool?.fields.map((field) =>
                                renderInput(
                                    field.id,
                                    field.label,
                                    field.unit,
                                    field.desc,
                                    values[field.id] ?? field.defaultVal,
                                    (raw) => handleInputChange(field.id, raw),
                                    field.min,
                                    field.max,
                                    field.step
                                )
                            )}
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="mt-5 rounded-xl border border-red-800 bg-red-950/40 p-4 text-sm leading-6 text-red-300"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleCalculate}
                        className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 px-5 py-3.5 font-bold text-slate-950 transition hover:from-cyan-400 hover:to-sky-500 shadow-md shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
                    >
                        Calculate Result
                    </button>
                </section>

                <section
                    aria-live="polite"
                    className="glass-panel mt-6 rounded-2xl border border-slate-800 p-5 sm:p-8"
                >
                    <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                        Results
                    </p>

                    {results.length === 0 ? (
                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            Your calculated results will appear here.
                        </p>
                    ) : (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {results.map((result, index) => (
                                <div
                                    key={`${result.label}-${index}`}
                                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                                >
                                    <p className="text-sm text-slate-400">{result.label}</p>

                                    <p className="mt-2 break-words text-2xl font-bold text-white">
                                        {result.value}
                                        {result.unit && (
                                            <span className="ml-2 text-base font-medium text-emerald-400">
                                                {result.unit}
                                            </span>
                                        )}
                                    </p>

                                    {result.note && (
                                        <p className="mt-2 text-xs leading-5 text-slate-500">
                                            {result.note}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {selectedId === "vbi-calculator" && results.length > 0 && isMounted && (
                    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-8">
                        <h2 className="text-lg font-bold text-white">
                            Temperature vs Built-in Potential
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Built-in potential (Vbi) as a function of temperature (100 K to 500 K) calculated from current doping concentrations (Na = 10^{values.Na_exp ?? 16} cm⁻³, Nd = 10^{values.Nd_exp ?? 16} cm⁻³).
                        </p>

                        <div className="mt-6 h-72 w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <LineChart
                                    data={vbiGraphData}
                                    margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis
                                        dataKey="temperature"
                                        type="number"
                                        domain={[100, 500]}
                                        tick={{ fill: "#cbd5e1", fontSize: 12 }}
                                        tickFormatter={(value: number) => `${value} K`}
                                        label={{
                                            value: "Temperature (K)",
                                            position: "insideBottom",
                                            offset: -5,
                                            fill: "#94a3b8",
                                        }}
                                    />
                                    <YAxis
                                        dataKey="potential"
                                        tick={{ fill: "#cbd5e1", fontSize: 12 }}
                                        label={{
                                            value: "Built-in potential (V)",
                                            angle: -90,
                                            position: "insideLeft",
                                            fill: "#94a3b8",
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0f172a",
                                            border: "1px solid #334155",
                                            borderRadius: "8px",
                                            color: "#f8fafc",
                                        }}
                                        labelFormatter={(value) =>
                                            `Temperature: ${value} K`
                                        }
                                        formatter={(value) => [
                                            `${Number(value).toFixed(4)} V`,
                                            "Built-in potential",
                                        ]}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="potential"
                                        stroke="#22d3ee"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: "#22d3ee" }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                )}

                <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                    Educational calculations use the assumptions described for each
                    calculator. Check units and input ranges before interpreting results.
                </p>
            </div>
        </main>
    );
}