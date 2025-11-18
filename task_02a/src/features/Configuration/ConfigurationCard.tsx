import type { ReactNode } from "react"
import { useConfigurationContext, type Configuration } from "./ConfigurationContext"

type ConfigValueProps = {
    label: string
    value: string | number
}

const ConfigValue = ({ label, value }: ConfigValueProps) => {
    return (
        <span className="group inline-flex flex-col items-start">
            <span className="leading-none">{value}</span>
            <span className="text-xs text-gray-600">{label}</span>
        </span>
    )
}

type ConfigurationCardProps = {
    configuration: Configuration
    rightSection?: ReactNode
}

export const ConfigurationCard = ({ configuration, rightSection }: ConfigurationCardProps) => {
    return (
        <div className="py-2 px-3 border border-gray-200 rounded-md">
            <div className="flex items-start justify-between">
                <p className="mb-2.5 text-md">{configuration.name}</p>
                <div>{rightSection}</div>
            </div>

            <div className="flex items-center flex-wrap justify-between gap-3 gap-y-1.5">
                <ConfigValue label="Chargers" value={configuration.numberOfChargepoints} />
                <ConfigValue label="per Charger" value={`${configuration.kWPerChargepoint} kW`} />
                <ConfigValue label="per Car" value={`${configuration.kWhPerCar} kWh`} />
                <ConfigValue
                    label="Arrival Rate"
                    value={`${configuration.arrivalProbabilityMultiplier}x`}
                />
            </div>
        </div>
    )
}
