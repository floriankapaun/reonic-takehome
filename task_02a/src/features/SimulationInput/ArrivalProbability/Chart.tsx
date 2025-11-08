import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { ARRIVAL_PROBABILITIES } from "./data"

type ArrivalProbabilityChartProps = {
    multiplier: number
    className?: string
}

const ArrivalProbabilityChart = ({ multiplier, className = "" }: ArrivalProbabilityChartProps) => {
    const data = Object.entries(ARRIVAL_PROBABILITIES).map(([hour, probability]) => ({
        hour: `${hour.padStart(2, "0")}:00 – ${(Number(hour) + 1).toString().padStart(2, "0")}:00`,
        probability: (probability * multiplier * 100).toFixed(2),
    }))

    return (
        <LineChart
            className={`w-full aspect-40/9 ${className}`}
            responsive
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
            <XAxis dataKey="hour" tick={false} height={1} />
            <YAxis tick={false} width={1} />
            <Tooltip formatter={(value) => [`${value}%`, "Arrival Probability"]} />
            <Line
                dot={false}
                dataKey="probability"
                type="monotone"
                stroke="rgba(0, 0, 0, 0.87)"
                strokeWidth={1.5}
                isAnimationActive={false}
            />
        </LineChart>
    )
}

export default ArrivalProbabilityChart
