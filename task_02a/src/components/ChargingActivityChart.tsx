import { useState } from "react"
import { Label, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import SegmentedControl from "./SegmentedControl"
import { useChargingActivity } from "../hooks/useChargingActivity"

const TIMEFRAME_OPTIONS = ["Day", "Week", "Month"] as const
type Timeframe = (typeof TIMEFRAME_OPTIONS)[number]

type ChargingActivityChartProps = {
    className?: string
}

const ChargingActivityChart = ({ className = "" }: ChargingActivityChartProps) => {
    const [timeframe, setTimeframe] = useState<Timeframe>("Month")
    const { data, isLoading } = useChargingActivity()

    return (
        <div className={className}>
            <div className="flex flex-row justify-between items-center flex-nowrap mb-6">
                <h2 className="text-lg font-semibold">Charging Activity</h2>
                <SegmentedControl<Timeframe>
                    options={[...TIMEFRAME_OPTIONS]}
                    value={timeframe}
                    onChange={setTimeframe}
                />
            </div>

            <LineChart
                className="w-full aspect-29/9"
                responsive
                data={data}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tickLine={false} />

                {isLoading && <Label value="Loading data..." position="center" />}

                <Tooltip
                    formatter={(value, name) => {
                        if (name === "kWh") return [`${value} kWh`, "Energy charged"]
                        return [value, "Charging events"]
                    }}
                />

                <Line
                    dataKey="kWh"
                    yAxisId="left"
                    dot={false}
                    type="monotone"
                    stroke="#8884d8"
                    strokeWidth={2}
                    fill="url(#colorKWH)"
                />
                <Line
                    dataKey="charges"
                    yAxisId="right"
                    dot={false}
                    type="monotone"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    fill="url(#colorCharges)"
                />
            </LineChart>
        </div>
    )
}

export default ChargingActivityChart
