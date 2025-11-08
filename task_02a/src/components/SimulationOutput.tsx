import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Label, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import SegmentedControl from "./SegmentedControl"
import { queryClient } from "../App"

const TIMEFRAME_OPTIONS = ["Day", "Week", "Month"] as const
type Timeframe = (typeof TIMEFRAME_OPTIONS)[number]

type HighlightProps = {
    title: string
    subtitle: string
}

const Highlight = ({ title, subtitle }: HighlightProps) => {
    return (
        <div>
            <p className="text-5xl font-semibold leading-none">{title}</p>
            <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
    )
}

const chargingActivityKeys = {
    all: ["charging-activity"] as const,
    monthly: () => [...chargingActivityKeys.all, "monthly"] as const,
}

type MonthlyChargingActivity = {
    month: string
    kWh: number
    charges: number
}

const useGetMonthlyChargingActivity = () => {
    return useQuery({
        queryKey: chargingActivityKeys.monthly(),
        queryFn: async () => {
            const response = await new Promise<MonthlyChargingActivity[]>((resolve) => {
                return setTimeout(() => {
                    return resolve([
                        { month: "Jan", kWh: 21301, charges: 1291 },
                        { month: "Feb", kWh: 19745, charges: 1196 },
                        { month: "Mar", kWh: 22234, charges: 1568 },
                        { month: "Apr", kWh: 27123, charges: 1645 },
                        { month: "May", kWh: 26456, charges: 1845 },
                        { month: "Jun", kWh: 28789, charges: 1743 },
                        { month: "Jul", kWh: 26345, charges: 1698 },
                        { month: "Aug", kWh: 25678, charges: 1550 },
                        { month: "Sep", kWh: 23456, charges: 1423 },
                        { month: "Oct", kWh: 22345, charges: 1356 },
                        { month: "Nov", kWh: 20123, charges: 1334 },
                        { month: "Dec", kWh: 19876, charges: 1190 },
                    ])
                }, 500)
            })
            return response
        },
    })
}

type ChargingActivityProps = {
    className?: string
}

const ChargingActivity = ({ className = "" }: ChargingActivityProps) => {
    const [timeframe, setTimeframe] = useState<Timeframe>("Month")

    const { data, isLoading, isFetching } = useGetMonthlyChargingActivity()

    useEffect(() => {
        // Just to simulate refetching, I'm not even switching the data.
        queryClient.invalidateQueries({ queryKey: chargingActivityKeys.monthly() })
    }, [timeframe])

    return (
        <div className={className}>
            <div className="flex flex-row justify-between items-center flex-nowrap mb-6">
                <h2 className="text-lg font-semibold">Charging Activity</h2>
                <SegmentedControl<Timeframe>
                    options={TIMEFRAME_OPTIONS as unknown as Timeframe[]}
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

                {(isLoading || isFetching) && <Label value="Loading data..." position="center" />}

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
        </div>
    )
}

const SimulationOutput = () => {
    return (
        <>
            <section className="grid grid-cols-3 gap-4 mt-4">
                <Highlight title="1896 kWh" subtitle="total energy charged p.a." />
                <Highlight title="1.5hrs" subtitle="average charging time p.a." />
                <Highlight title="250" subtitle="charging events p.a." />
            </section>

            <ChargingActivity className="mt-10" />

            {/* Displaying this component multiple times as a placeholder for other charts. */}
            <ChargingActivity className="mt-10" />
            <ChargingActivity className="mt-10" />
        </>
    )
}

export default SimulationOutput
