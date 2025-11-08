import { useQuery } from "@tanstack/react-query"
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { useGetMonthlyChargingActivity } from "./query"

const ChargingActivityChart = () => {
    const { data, isLoading } = useGetMonthlyChargingActivity()

    return (
        <LineChart
            style={{ width: "100%", aspectRatio: "24 / 9" }}
            responsive
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} />

            <Tooltip />

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
