import { useConfigurationContext, type Configuration } from "@/features/Configuration"
import { IconChevronRight } from "@tabler/icons-react"

type ConfigurationOptionProps = {
    configuration: Configuration
    onSelect?: () => void
}

export const ConfigurationOption = ({ configuration, onSelect }: ConfigurationOptionProps) => {
    const { setActiveConfigurationId } = useConfigurationContext()

    return (
        <button
            className="w-full flex items-center justify-between rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-500 "
            onClick={() => {
                setActiveConfigurationId(configuration.id)
                onSelect?.()
            }}
        >
            <div className="flex-1 text-left py-2 pl-3">
                <h4>{configuration.name}</h4>
                <div className="text-sm text-gray-600">
                    {configuration.numberOfChargepoints} x {configuration.kWPerChargepoint} kW;{" "}
                    {configuration.kWhPerCar} kWh per car;{" "}
                    {configuration.arrivalProbabilityMultiplier}x arrival rate
                </div>
            </div>

            <div className="self-stretch flex items-center justify-center py-2 px-3">
                <IconChevronRight size="1.5em" aria-hidden />
            </div>
        </button>
    )
}

export const ConfigurationOptionSkeleton = () => {
    return (
        <div className="w-full flex items-center justify-between cursor-pointer  animate-pulse bg-gray-100">
            <div className="flex-1 text-left py-2 pl-3">
                <div className="h-4 w-32 bg-gray-300 mb-2 rounded"></div>
                <div className="h-3 w-48 bg-gray-300 rounded"></div>
            </div>

            <div className="self-stretch flex items-center justify-center py-2 px-3">
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    )
}
