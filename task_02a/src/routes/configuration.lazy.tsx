import NumberInput from "@/components/NumberInput"
import Select from "@/components/Select"
import TextInput from "@/components/TextInput"
import { useConfigurationContext } from "@/features/Configuration"
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

            <div className="p-4 lg:grid grid-cols-3 gap-4">
                <div className="col-span-2 flex flex-col justify-start gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="sticky top-0 flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-start items-center gap-1">
                                <h3 className="text-sm leading-snug font-medium">Charging Zones</h3>
                                <p className="text-sm leading-snug font-medium">({zones.length})</p>
                            </div>
                            <button
                                className="h-8 inline-flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap text-sm font-medium transition-[color,box-shadow,translate] outline-none border border-gray-300 bg-transparent px-3 [&_svg]:w-4 has-[>svg]:px-2.5 shadow-xs rounded-md cursor-pointer hover:bg-gray-100 focus-visible:border-blue-500 focus-visible:ring-blue-500/40 focus-visible:ring-3 active:translate-y-[1px]"
                                type="button"
                                onClick={addZone}
                            >
                                <IconPlus />
                                Add Zone
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {zones.length === 0 && <p>No charging zones configured.</p>}
                            {zones.map((zone, index) => (
                                <Zone
                                    key={zone.id}
                                    index={index + 1}
                                    zone={zone}
                                    setZones={setZones}
                                />
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-200" aria-hidden="true" />

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

                <div className="col-span-1 flex flex-col gap-4">
                    <div className="h-8 flex items-center shrink-0">
                        <h3 className="text-sm leading-snug font-medium">Visual Zone Overview</h3>
                    </div>

                    <div className="h-full p-6 bg-gray-50 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:24px_24px] border border-gray-200 shadow-xs rounded">
                        {zones.map((zone, index) => (
                            <div key={zone.id} className="flex flex-col gap-4 mb-8 last:mb-0">
                                <div className="h-6 flex flex-row justify-between items-center gap-4">
                                    <h3 className="text-sm text-gray-600 uppercase font-medium shrink-0">
                                        Zone {index + 1}
                                    </h3>
                                    <hr className="border-gray-200 w-full shrink-1" />
                                    <p className="border border-gray-200 bg-gray-100 px-2 py-1 leading-none rounded-full text-xs font-semibold shrink-0">
                                        {zone.powerPerChargerInKW} kW
                                    </p>
                                </div>

                                <div className="grid grid-cols-5 gap-4">
                                    {Array.from({ length: zone.chargers }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-full aspect-square bg-gray-200 border border-gray-300 shadow-xs flex flex-col items-center justify-center rounded cursor-pointer"
                                            // Remove charger on click
                                            onClick={() => {
                                                setZones((prevZones) =>
                                                    prevZones.map((z) =>
                                                        z.id === zone.id
                                                            ? {
                                                                  ...z,
                                                                  chargers: Math.max(
                                                                      z.chargers - 1,
                                                                      0,
                                                                  ),
                                                              }
                                                            : z,
                                                    ),
                                                )
                                            }}
                                        >
                                            {/* TODO: On hover, show "X" to remove charger */}
                                            <IconPlug size="1.5rem" />
                                            <p className="text-xs">Spot {i + 1}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
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
