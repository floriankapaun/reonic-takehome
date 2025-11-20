import NumberInput from "@/components/NumberInput"
import Select from "@/components/Select"
import TextInput from "@/components/TextInput"
import { useConfigurationContext } from "@/features/Configuration"
import useLocalStorage from "@/hooks/useLocalStorage"
import { IconBolt, IconPlug, IconTrash } from "@tabler/icons-react"
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

            <div className="flex flex-row items-center gap-4">
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
        <div>
            <div className="p-4">
                <h2 className="text-xl font-medium">Configuration</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
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

            <div className="p-4 lg:grid grid-cols-3 gap-4">
                <div>
                    <div className="flex flex-row justify-start items-center">
                        <h3>Charging Zones</h3>
                        <button
                            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
                            type="button"
                            onClick={addZone}
                        >
                            Add Zone
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        {zones.length === 0 && <p>No charging zones configured.</p>}
                        {zones.map((zone, index) => (
                            <Zone key={zone.id} index={index + 1} zone={zone} setZones={setZones} />
                        ))}
                    </div>

                    <hr className="border-gray-200 my-8" aria-hidden="true" />

                    <div className="flex flex-row items-stretch gap-4">
                        <div className="w-full flex flex-col justify-between items-start gap-2 bg-gray-50 border border-gray-200 shadow-xs p-4 rounded-md">
                            <h3 className="text-sm text-gray-600 font-medium">Total Chargers</h3>
                            <div className="flex items-center justify-start gap-1">
                                <IconPlug size="1.375rem" />
                                <p className="font-medium text-xl">
                                    {zones.reduce((total, zone) => total + zone.chargers, 0)}
                                </p>
                            </div>
                        </div>

                        <div className="w-full flex flex-col justify-between items-start gap-2 bg-gray-200 border border-gray-300 shadow-xs p-4 rounded-md">
                            <h3 className="text-sm text-gray-600 font-medium">
                                Theoretical Maximum Power
                            </h3>

                            <div className="flex items-center justify-start gap-1">
                                <IconBolt size="1.375rem" />
                                <p className="font-medium text-xl">
                                    {zones.reduce(
                                        (total, zone) =>
                                            total + zone.chargers * zone.powerPerChargerInKW,
                                        0,
                                    )}{" "}
                                    kW
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <h2>Visualization Placeholder</h2>
                    {zones.map((zone) => (
                        <div key={zone.id} className="mb-6">
                            <div className="flex flex-row justify-between items-center mb-2">
                                <h3 className="font-semibold mb-2">Zone {zone.id}</h3>
                                <p>{zone.powerPerChargerInKW} kW</p>
                            </div>
                            <div className="grid grid-cols-10 gap-2">
                                {Array.from({ length: zone.chargers }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 bg-green-300 flex items-center justify-center rounded cursor-pointer"
                                        // Remove charger on click
                                        onClick={() => {
                                            setZones((prevZones) =>
                                                prevZones.map((z) =>
                                                    z.id === zone.id
                                                        ? {
                                                              ...z,
                                                              chargers: Math.max(z.chargers - 1, 0),
                                                          }
                                                        : z,
                                                ),
                                            )
                                        }}
                                    >
                                        {/* TODO: On hover, show "X" to remove charger */}
                                        <span className="text-sm">Spot {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end gap-2">
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
        </div>
    )
}
