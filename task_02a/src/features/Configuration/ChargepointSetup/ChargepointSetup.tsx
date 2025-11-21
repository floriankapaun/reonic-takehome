import NumberInput from "@/components/NumberInput"
import { IconBolt, IconPlug, IconPlus, IconTrash } from "@tabler/icons-react"
import { useConfigurationContext, type Configuration } from "../ConfigurationContext"

type ChargepointSetupProps = {
    configurationId: string
}

const ChargepointSetup = ({ configurationId }: ChargepointSetupProps) => {
    const { configurations, setConfigurations } = useConfigurationContext()

    const configuration = configurations.find((config) => config.id === configurationId)

    if (!configuration) {
        return <p className="text-red-600 border border-red-600 p-2">Configuration not found.</p>
    }

    const zones = configuration.chargepointSetup

    const addZone = () => {
        const newZone = { numberOfChargepoints: 10, powerInKW: 11 }
        const updatedConfigurations = configurations.map((config) => {
            if (config.id === configurationId) {
                return {
                    ...config,
                    chargepointSetup: [...config.chargepointSetup, newZone],
                }
            }
            return config
        })
        setConfigurations(updatedConfigurations)
    }

    const updateZone = (
        index: number,
        payload: Partial<Configuration["chargepointSetup"][number]>,
    ) => {
        const updatedConfigurations = configurations.map((config) => {
            if (config.id === configurationId) {
                const updatedChargepointSetup = config.chargepointSetup.map((zone, i) =>
                    i === index ? { ...zone, ...payload } : zone,
                )
                return {
                    ...config,
                    chargepointSetup: updatedChargepointSetup,
                }
            }
            return config
        })
        setConfigurations(updatedConfigurations)
    }

    const removeZone = (index: number) => {
        const updatedConfigurations = configurations.map((config) => {
            if (config.id === configurationId) {
                const updatedChargepointSetup = config.chargepointSetup.filter(
                    (_, i) => i !== index,
                )
                return {
                    ...config,
                    chargepointSetup: updatedChargepointSetup,
                }
            }
            return config
        })
        setConfigurations(updatedConfigurations)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-start items-center gap-1">
                <h3 className="text-sm leading-snug font-medium">Charging Zones</h3>
                <p className="text-sm leading-snug font-medium">({zones.length})</p>
            </div>

            <div className="lg:grid grid-cols-3 gap-4">
                <div className="col-span-2 flex flex-col justify-start gap-6">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left table-fixed">
                            <thead className="h-10 bg-gray-100 [&_th]:font-medium [&_th]:px-2">
                                <tr>
                                    <th>Zone</th>
                                    <th>Chargers</th>
                                    <th>Power per Charger (kW)</th>
                                    <th className="text-right w-30">Total capacity</th>
                                    <th className="w-12"></th>
                                </tr>
                            </thead>

                            <tbody className="[&_tr]:border-t [&_tr]:border-gray-200 [&_td]:p-2">
                                {zones.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-gray-500">
                                            No charging zones configured yet.
                                        </td>
                                    </tr>
                                )}

                                {zones.map((zone, index) => (
                                    <tr key={index}>
                                        <td>Zone {index + 1}</td>

                                        <td>
                                            <NumberInput
                                                className="h-8!"
                                                placeholder="0"
                                                variant="subtle"
                                                value={zone.numberOfChargepoints}
                                                min={0}
                                                onChange={(value) =>
                                                    updateZone(index, {
                                                        numberOfChargepoints: value,
                                                    })
                                                }
                                            />
                                        </td>

                                        <td>
                                            {/* TODO: Could add a autocomplete here for standard values 11, 22, 50 */}
                                            <NumberInput
                                                className="h-8!"
                                                placeholder="0"
                                                variant="subtle"
                                                value={zone.powerInKW}
                                                min={0}
                                                onChange={(value) =>
                                                    updateZone(index, { powerInKW: value })
                                                }
                                            />
                                        </td>

                                        <td className="text-right">
                                            {zone.numberOfChargepoints * zone.powerInKW} kW
                                        </td>

                                        <td>
                                            <button
                                                className="hover:text-red-600 bg-transparent p-1.5 rounded cursor-pointer hover:bg-red-600/20"
                                                type="button"
                                                onClick={() => removeZone(index)}
                                            >
                                                <IconTrash size="1rem" />
                                                <span className="sr-only">Delete Zone</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan={5}>
                                        <button
                                            className="flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap text-sm font-medium transition-[color,box-shadow,translate] outline-none border border-gray-300 bg-transparent px-3 [&_svg]:w-4 has-[>svg]:px-2.5 shadow-xs rounded-md cursor-pointer hover:bg-gray-100 focus-visible:border-blue-500 focus-visible:ring-blue-500/40 focus-visible:ring-3 active:translate-y-[1px]"
                                            type="button"
                                            onClick={addZone}
                                        >
                                            <IconPlus />
                                            Add Zone
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* TODO: Add toggle to switch between table and this: */}
                    {/* <Visualization /> */}
                </div>

                <div className="col-span-1 flex flex-col gap-4">
                    <div className="w-full flex flex-col justify-between items-start gap-2 bg-gray-100 border border-gray-200 shadow-xs p-4 rounded-md">
                        <h3 className="text-sm text-gray-600 font-medium">Total Chargers</h3>
                        <div className="flex items-center justify-start gap-1">
                            <IconPlug size="1.375rem" />
                            <p className="font-medium text-xl">
                                {zones.reduce(
                                    (total, zone) => total + zone.numberOfChargepoints,
                                    0,
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-between items-start gap-2 border border-gray-200 shadow-xs p-4 rounded-md">
                        <h3 className="text-sm text-gray-600 font-medium">
                            Theoretical Maximum Power
                        </h3>

                        <div className="flex items-center justify-start gap-1">
                            <IconBolt size="1.375rem" />
                            <p className="font-medium text-xl">
                                {zones.reduce(
                                    (total, zone) =>
                                        total + zone.numberOfChargepoints * zone.powerInKW,
                                    0,
                                )}{" "}
                                kW
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChargepointSetup

const Visualization = () => {
    return (
        <>
            <div className="h-8 flex items-center shrink-0">
                <h3 className="text-sm leading-snug font-medium">Visual Zone Overview</h3>
            </div>

            <div className="h-full p-6 bg-gray-50 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:24px_24px] border border-gray-200 shadow-xs rounded">
                {[].map((zone, index) => (
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
                                        // setZones((prevZones) =>
                                        //     prevZones.map((z) =>
                                        //         z.id === zone.id
                                        //             ? {
                                        //                   ...z,
                                        //                   chargers: Math.max(z.chargers - 1, 0),
                                        //               }
                                        //             : z,
                                        //     ),
                                        // )
                                    }}
                                >
                                    {/* TODO: On hover, show "X" to remove charger */}
                                    <IconPlug size="1.5rem" />
                                    <p className="text-xs">Spot {i + 1}</p>
                                    {/* TODO: Drag and drop */}
                                </div>
                            ))}
                            <div
                                className="w-full aspect-square border-2 border-dashed border-gray-400 shadow-xs flex flex-col items-center justify-center rounded cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    // setZones((prevZones) =>
                                    //     prevZones.map((z) =>
                                    //         z.id === zone.id
                                    //             ? { ...z, chargers: z.chargers + 1 }
                                    //             : z,
                                    //     ),
                                    // )
                                }}
                            >
                                <IconPlus size="1.5rem" />
                                <p className="text-xs">Add Spot</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
