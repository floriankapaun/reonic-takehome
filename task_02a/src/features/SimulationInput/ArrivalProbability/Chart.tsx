import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts"
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
        <AreaChart
            className={`w-full aspect-40/9 ${className}`}
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
            <XAxis dataKey="hour" tick={false} height={1} />
            <YAxis tick={false} width={1} />
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
    )
}

export default ArrivalProbabilityChart
