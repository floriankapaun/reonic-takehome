import NumberInput from "@/components/NumberInput"
import Select from "@/components/Select"
import TextInput from "@/components/TextInput"
import { useConfigurationContext } from "@/features/Configuration"
import ChargepointSetup from "@/features/Configuration/ChargepointSetup/ChargepointSetup"
import useLocalStorage from "@/hooks/useLocalStorage"
import { IconBolt, IconChargingPile, IconPlug, IconPlus, IconTrash } from "@tabler/icons-react"
import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { useState, type Dispatch, type SetStateAction } from "react"

export const Route = createLazyFileRoute("/configuration")({
    component: ConfigurationPage,
})

type ChargingZone = {
    id: number
    chargers: number
    powerPerChargerInKW: number
}

// TODO: Write a reducer

const Zone = ({
    zone,
    index,
    setZones,
}: {
    index: number
    zone: ChargingZone
    setZones: Dispatch<SetStateAction<ChargingZone[]>>
}) => {
    const [hasCustomPower, setHasCustomPower] = useState<boolean>(
        [11, 22, 50].includes(zone.powerPerChargerInKW) ? false : true,
    )

    const updateZone = (id: number, payload: Partial<Omit<ChargingZone, "id">>) => {
        setZones((prevZones) => prevZones.map((z) => (z.id === id ? { ...z, ...payload } : z)))
    }

    const removeZone = () => {
        setZones((prevZones) => prevZones.filter((z) => z.id !== zone.id))
    }

    return (
        <div className="flex flex-col gap-4 border border-gray-200 shadow-xs p-4 rounded-md">
            <div className="flex justify-between items-center gap-4">
                <h3 className="font-medium">Zone {index}</h3>
                <button
                    className="hover:text-red-600 bg-transparent p-1.5 rounded cursor-pointer hover:bg-red-600/20"
                    type="button"
                    onClick={removeZone}
                >
                    <IconTrash size="1.125rem" />
                    <span className="sr-only">Delete Zone</span>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* TODO: Don't directly mutate zone, but introduce a form */}
                <NumberInput
                    value={zone.chargers}
                    onChange={(value) => updateZone(zone.id, { chargers: value })}
                    label="Number of Chargers"
                />
                <Select
                    label="Power per Charger"
                    options={[
                        { label: "11 kW", value: "11" },
                        { label: "22 kW", value: "22" },
                        { label: "50 kW", value: "50" },
                        { label: "Custom", value: "custom" },
                    ]}
                    value={hasCustomPower ? "custom" : String(zone.powerPerChargerInKW)}
                    onChange={(value) => {
                        if (value === "custom") {
                            updateZone(zone.id, { powerPerChargerInKW: 11 })
                            setHasCustomPower(true)
                        } else {
                            updateZone(zone.id, { powerPerChargerInKW: Number(value) })
                            setHasCustomPower(false)
                        }
                    }}
                />
            </div>

            {hasCustomPower && (
                <NumberInput
                    label="Power per Charger (kW)"
                    value={zone.powerPerChargerInKW}
                    onChange={(value) => updateZone(zone.id, { powerPerChargerInKW: value })}
                />
            )}
        </div>
    )
}

function ConfigurationPage() {
    const { id } = Route.useSearch()
    const { configurations, activeConfiguration } = useConfigurationContext()
    const [zones, setZones] = useLocalStorage<ChargingZone[]>("chargingZones", [])

    const editConfigurationId = id ?? activeConfiguration?.id

    const editConfiguration = id
        ? configurations.find((config) => config.id === id)
        : activeConfiguration

    if (!editConfiguration) {
        // TODO: Better error handling
        return <div>Configuration not found</div>
    }

    const addZone = () => {
        const newZone: ChargingZone = {
            id: zones.length > 0 ? (zones[zones.length - 1]?.id ?? 0) + 1 : 1,
            chargers: 1,
            powerPerChargerInKW: 11,
        }
        setZones([...zones, newZone])
    }

    return (
        <main className="min-h-(--content-min-height) flex flex-col justify-between">
            <div className="max-w-7xl mx-auto h-full">
                <div className="p-4">
                    <h2 className="text-xl font-medium">Configuration</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-8 mb-2 p-4">
                    <TextInput
                        defaultValue={editConfiguration.name}
                        label="Configuration Name"
                        placeholder="Enter configuration name"
                        description="Name of the configuration"
                    />

                    <NumberInput
                        defaultValue={editConfiguration.kWhPerCar}
                        label="kWh/100 km per Car"
                        placeholder="e.g., 18"
                        description="Average cars energy demand to drive 100 km"
                    />

                    <NumberInput
                        defaultValue={editConfiguration.arrivalProbabilityMultiplier}
                        label="Arrival Probability Multiplier"
                        placeholder="e.g., 1.0"
                        description="Multiplier for arrival probability of cars"
                    />
                </div>

                <div className="px-4">
                    <ChargepointSetup configurationId={editConfigurationId} />
                </div>
            </div>

            <div className="sticky bottom-0 bg-white p-4 mt-6 border-t flex justify-end gap-2">
                <Link to="/" tabIndex={-1}>
                    <button
                        className="px-4 py-2 bg-gray-200 rounded"
                        type="button"
                        onClick={() => {
                            // TODO: Reset Form
                            // TODO: Ask for confirmation if changes were made
                        }}
                    >
                        Cancel
                    </button>
                </Link>

                <button className="px-4 py-2 bg-blue-600 text-white rounded" type="button">
                    Save Configuration
                </button>
            </div>
        </main>
    )
}
