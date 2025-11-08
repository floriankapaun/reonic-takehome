import { useEffect, useState } from "react"

export type MonthlyChargingActivity = {
    month: string
    kWh: number
    charges: number
}

// Mock data - in a real app this would come from an API
const MOCK_DATA: MonthlyChargingActivity[] = [
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
]

export const useChargingActivity = () => {
    const [data, setData] = useState<MonthlyChargingActivity[] | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 500))
                setData(MOCK_DATA)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return { data, isLoading }
}
