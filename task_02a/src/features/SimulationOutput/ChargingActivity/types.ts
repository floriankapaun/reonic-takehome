import type { TIMEFRAME_OPTIONS } from "."

export type MonthlyChargingActivity = {
    month: string
    kWh: number
    charges: number
}

export type Timeframe = (typeof TIMEFRAME_OPTIONS)[number]
