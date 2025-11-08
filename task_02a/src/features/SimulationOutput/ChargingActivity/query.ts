import { useQuery } from "@tanstack/react-query"
import type { MonthlyChargingActivity } from "./types"

export const chargingActivityKeys = {
    all: ["charging-activity"] as const,
    monthly: () => [...chargingActivityKeys.all, "monthly"] as const,
}

export const useGetMonthlyChargingActivity = () => {
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
