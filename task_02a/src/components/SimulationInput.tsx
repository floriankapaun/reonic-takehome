import { useState } from "react"
import { Area, AreaChart, Tooltip } from "recharts"
import NumberInput from "./NumberInput"

const ARRIVAL_PROBABILITIES: Record<number, number> = {
    0: 0.0094,
    1: 0.0094,
    2: 0.0094,
    3: 0.0094,
    4: 0.0094,
    5: 0.0094,
    6: 0.0094,
    7: 0.0094,
    8: 0.0283,
    9: 0.0283,
    10: 0.0566,
    11: 0.0566,
    12: 0.0566,
    13: 0.0755,
    14: 0.0755,
    15: 0.0755,
    16: 0.1038,
    17: 0.1038,
    18: 0.1038,
    19: 0.0472,
    20: 0.0472,
    21: 0.0472,
    22: 0.0094,
    23: 0.0094,
} as const

type ArrivalProbabilityProps = {
    multiplier: number
}

const ArrivalProbability = ({ multiplier }: ArrivalProbabilityProps) => {
    const data = Object.entries(ARRIVAL_PROBABILITIES).map(([hour, probability]) => ({
        hour: `${hour.padStart(2, "0")}:00 – ${(Number(hour) + 1).toString().padStart(2, "0")}:00`,
        probability: (probability * multiplier * 100).toFixed(2),
    }))

    return (
        <div className="mt-4 px-3 py-2 bg-gray-100 rounded-sm group">
            <table className="text-sm tabular-nums">
                <tbody>
                    {data.map(({ hour, probability }) => (
                        <tr key={hour}>
                            <td className="w-full">{hour}</td>
                            <td className="text-right">
                                <span className="font-medium">{probability}</span>%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AreaChart
                className="w-full aspect-40/9 mt-4 opacity-30 group-hover:opacity-100 transition-opacity duration-200"
                responsive
                data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="probabilityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(0, 0, 0, 0.87)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="rgba(0, 0, 0, 0.87)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Tooltip
                    formatter={(value) => [`${value}%`, "Arrival Probability"]}
                    allowEscapeViewBox={{ x: true, y: true }}
                />
                <Area
                    dataKey="probability"
                    type="monotone"
                    stroke="rgba(0, 0, 0, 0.87)"
                    strokeWidth={1}
                    fill="url(#probabilityGradient)"
                    isAnimationActive={false}
                />
            </AreaChart>
        </div>
    )
}

const SimulationInput = () => {
    const [state, setState] = useState({
        numberOfChargepoints: 20,
        kWhPerCar: 18,
        kWPerChargepoint: 11,
        arrivalProbabilityMultiplier: 1,
    })

    return (
        <>
            <h2 className="font-semibold px-4 pt-4">Simulation Parameters</h2>
            <p className="text-xs text-gray-600 px-4 mb-1">Adjust and run simulation</p>

            <div className="sticky top-0 p-4 flex flex-col gap-1">
                <NumberInput
                    label="Chargepoints"
                    value={state.numberOfChargepoints}
                    onChange={(value) =>
                        setState((prev) => ({ ...prev, numberOfChargepoints: value }))
                    }
                />
                <NumberInput
                    label="kWh per car"
                    value={state.kWhPerCar}
                    onChange={(value) => setState((prev) => ({ ...prev, kWhPerCar: value }))}
                />
                <NumberInput
                    label="kW per Chargepoint"
                    value={state.kWPerChargepoint}
                    onChange={(value) => setState((prev) => ({ ...prev, kWPerChargepoint: value }))}
                />

                <NumberInput
                    label="Multiplier (0.2 - 2x)"
                    min={0.2}
                    max={2}
                    step={0.1}
                    value={state.arrivalProbabilityMultiplier}
                    onChange={(newValue) => {
                        return setState((prev) => ({
                            ...prev,
                            arrivalProbabilityMultiplier: isNaN(newValue) ? 1 : newValue,
                        }))
                    }}
                />

                <ArrivalProbability multiplier={state.arrivalProbabilityMultiplier} />
            </div>
        </>
    )
}

export default SimulationInput
