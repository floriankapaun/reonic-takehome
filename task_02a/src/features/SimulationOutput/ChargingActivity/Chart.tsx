import { useQuery } from "@tanstack/react-query"
import { Label, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { useGetMonthlyChargingActivity } from "./query"

const ChargingActivityChart = () => {
    const { data, isLoading } = useGetMonthlyChargingActivity()

    return (
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

            {!isLoading && !data && <Label value="No data available" position="center" />}

            <Tooltip
                formatter={(value, name) => {
                    if (name === "kWh") return [`${value} kWh`, "Energy charged"]
                    return [value, "Charging events"]
                }}
            />

            <Line
                yAxisId="left"
                dot={false}
                dataKey="kWh"
                type="monotone"
                stroke="#8884d8"
                strokeWidth={2}
                fill="url(#colorKWH)"
            />
            <Line
                strokeWidth={2}
                type="monotone"
                dot={false}
                yAxisId="right"
                dataKey="charges"
                stroke="#82ca9d"
                fill="url(#colorCharges)"
            />
        </LineChart>
    )
}

export default ChargingActivityChart
