import useLocalStorage from "@/hooks/useLocalStorage"
import {
    createContext,
    useContext,
    useMemo,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react"

type ChargepointBatch = {
    numberOfChargepoints: number
    powerInKW: number
}

export type Configuration = {
    id: string
    name: string
    chargepointSetup: ChargepointBatch[]
    kWhPerCar: number
    arrivalProbabilityMultiplier: number
}

const DEFAULT_CONFIGURATIONS = [
    {
        id: "default",
        name: "Default Configuration",
        chargepointSetup: [{ numberOfChargepoints: 20, powerInKW: 11 }],
        kWhPerCar: 18,
        arrivalProbabilityMultiplier: 1,
    },
    {
        id: "many_standard_chargers",
        name: "Many Standard Chargers",
        chargepointSetup: [
            { numberOfChargepoints: 50, powerInKW: 11 },
            { numberOfChargepoints: 20, powerInKW: 22 },
            { numberOfChargepoints: 10, powerInKW: 50 },
        ],
        kWhPerCar: 18,
        arrivalProbabilityMultiplier: 1.2,
    },
    {
        id: "few_fast_chargers",
        name: "Few Fast Chargers",
        chargepointSetup: [
            { numberOfChargepoints: 10, powerInKW: 50 },
            { numberOfChargepoints: 5, powerInKW: 150 },
        ],
        kWhPerCar: 30,
        arrivalProbabilityMultiplier: 0.8,
    },
] as const satisfies Configuration[]

type ConfigurationContextType = {
    configurations: Configuration[]
    setConfigurations: Dispatch<SetStateAction<Configuration[]>>
    activeConfigurationId: string // TODO: Has to be nullable? Or prevent deleting last config...
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
