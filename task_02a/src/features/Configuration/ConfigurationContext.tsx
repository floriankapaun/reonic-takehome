import useLocalStorage from "@/hooks/useLocalStorage"
import {
    createContext,
    useContext,
    useMemo,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react"

export type Configuration = {
    id: string
    name: string
    numberOfChargepoints: number
    kWhPerCar: number
    kWPerChargepoint: number
    arrivalProbabilityMultiplier: number
}

const DEFAULT_CONFIGURATIONS = [
    {
        id: "default",
        name: "Default Configuration",
        numberOfChargepoints: 20,
        kWhPerCar: 18,
        kWPerChargepoint: 11,
        arrivalProbabilityMultiplier: 1,
    },
    {
        id: "high_capacity",
        name: "High Capacity",
        numberOfChargepoints: 50,
        kWhPerCar: 18,
        kWPerChargepoint: 22,
        arrivalProbabilityMultiplier: 1.2,
    },
    {
        id: "high_usage",
        name: "High Usage",
        numberOfChargepoints: 30,
        kWhPerCar: 25,
        kWPerChargepoint: 11,
        arrivalProbabilityMultiplier: 2,
    },
] as const satisfies Configuration[]

type ConfigurationContextType = {
    configurations: Configuration[]
    setConfigurations: Dispatch<SetStateAction<Configuration[]>>
    activeConfigurationId: string
    setActiveConfigurationId: Dispatch<SetStateAction<string>>
    activeConfiguration: Configuration
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined)

export const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
    const [configurations, setConfigurations] = useLocalStorage<Configuration[]>(
        "configurations",
        DEFAULT_CONFIGURATIONS,
    )
    const [activeConfigurationId, setActiveConfigurationId] = useLocalStorage<string>(
        "activeConfigurationId",
        DEFAULT_CONFIGURATIONS[0].id,
    )
    const activeConfiguration = useMemo<Configuration>(() => {
        return (
            configurations.find((config) => config.id === activeConfigurationId) ??
            configurations[0] ??
            DEFAULT_CONFIGURATIONS[0]
        )
    }, [activeConfigurationId, configurations])

    return (
        <ConfigurationContext.Provider
            value={{
                configurations,
                setConfigurations,
                activeConfigurationId,
                setActiveConfigurationId,
                activeConfiguration,
            }}
        >
            {children}
        </ConfigurationContext.Provider>
    )
}

export const useConfigurationContext = () => {
    const context = useContext(ConfigurationContext)
    if (!context) {
        throw new Error("useConfigurationContext must be used within a ConfigurationProvider")
    }
    return context
}
