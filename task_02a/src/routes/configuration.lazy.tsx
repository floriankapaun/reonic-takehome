import NumberInput from "@/components/NumberInput"
import TextInput from "@/components/TextInput"
import { useConfigurationContext } from "@/features/Configuration"
import useLocalStorage from "@/hooks/useLocalStorage"
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
        <div className="border p-4 rounded-md mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold mb-2">Zone {index}</h3>
                <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    type="button"
                    onClick={removeZone}
                >
                    Delete Zone
                </button>
            </div>
            <div className="flex flex-row gap-4 mb-4">
                <div className="mb-2">
                    <label className="block mb-1">Number of Chargers:</label>
                    <input
                        type="number"
                        className="border rounded p-2 w-full"
                        defaultValue={zone.chargers}
                        onChange={(e) => updateZone(zone.id, { chargers: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label className="block mb-1">Power per Charger (kW):</label>
                    {/* Select, 11kW, 22kW, 50kW or custom */}
                    <select
                        className="border rounded p-2 w-full"
                        value={hasCustomPower ? "custom" : zone.powerPerChargerInKW}
                        onChange={(e) => {
                            const value = e.target.value
                            if (value === "custom") {
                                updateZone(zone.id, { powerPerChargerInKW: 11 })
                                setHasCustomPower(true)
                            } else {
                                updateZone(zone.id, { powerPerChargerInKW: Number(value) })
                                setHasCustomPower(false)
                            }
                        }}
                    >
                        <option value={11}>11 kW</option>
                        <option value={22}>22 kW</option>
                        <option value={50}>50 kW</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
            </div>

            {hasCustomPower && (
                <div>
                    <label className="block mb-1">Power per Charger (kW):</label>
                    <input
                        type="number"
                        className="border rounded p-2 w-full"
                        defaultValue={zone.powerPerChargerInKW}
                        onChange={(e) =>
                            updateZone(zone.id, { powerPerChargerInKW: Number(e.target.value) })
                        }
                    />
                </div>
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
                            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded"
                            type="button"
                            onClick={addZone}
                        >
                            Add Zone
                        </button>
                    </div>
                    <div className="mt-4">
                        {zones.length === 0 && <p>No charging zones configured.</p>}
                        {zones.map((zone, index) => (
                            <Zone key={zone.id} index={index + 1} zone={zone} setZones={setZones} />
                        ))}
                    </div>

                    <hr />

                    <div className="flex flex-row">
                        <div className="mt-4 p-4 border rounded-md bg-gray-50">
                            <h3 className="font-semibold mb-2">Total Chargers</h3>
                            <p className="text-lg">
                                {zones.reduce((total, zone) => total + zone.chargers, 0)}
                            </p>
                        </div>
                        <div className="mt-4 p-4 border rounded-md bg-gray-50">
                            <h3 className="font-semibold mb-2">Total Theoretical Maximum Power</h3>
                            <p className="text-lg">
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
                                        className="w-12 h-12 bg-green-300 flex items-center justify-center rounded"
                                    >
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
