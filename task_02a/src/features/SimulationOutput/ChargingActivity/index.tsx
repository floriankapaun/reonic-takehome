import SegmentedControl from "@/features/Form/SegmentedControl"
import ChargingActivityChart from "./Chart"
import { useState } from "react"
import type { Timeframe } from "./types"

type ChargingActivityProps = {
    className?: string
}

export const TIMEFRAME_OPTIONS = ["Day", "Week", "Month"]

const ChargingActivity = ({ className = "" }: ChargingActivityProps) => {
    const [timeframe, setTimeframe] = useState<Timeframe>("Month")

    return (
        <div className={className}>
            <div className="flex flex-row justify-between items-center flex-nowrap mb-6">
                <h2 className="text-lg font-semibold">Charging Activity</h2>
                <SegmentedControl<Timeframe>
                    options={TIMEFRAME_OPTIONS}
                    value={timeframe}
                    onChange={setTimeframe}
                />
            </div>

            <ChargingActivityChart timeframe={timeframe} />
        </div>
    )
}

export default ChargingActivity
