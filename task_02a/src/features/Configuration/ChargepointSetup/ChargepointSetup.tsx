import NumberInput from "@/components/NumberInput"
import {
    IconBolt,
    IconChargingPile,
    IconChartCohort,
    IconList,
    IconPlug,
    IconPlus,
    IconTrash,
    IconX,
} from "@tabler/icons-react"
import { useConfigurationContext, type Configuration } from "../ConfigurationContext"
import Button from "@/components/Button"
import SegmentedControl from "@/components/SegmentedControl"
import useLocalStorage from "@/hooks/useLocalStorage"
import { Fragment } from "react/jsx-runtime"

enum Mode {
    Visual = "visual",
    Table = "table",
}

type ChargepointSetupProps = {
    configurationId: string
}

const ChargepointSetup = ({ configurationId }: ChargepointSetupProps) => {
    const { configurations, setConfigurations } = useConfigurationContext()
    const [mode, setMode] = useLocalStorage<Mode>("chargepoint-setup-mode", Mode.Table)

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
        <div className="flex flex-col lg:grid grid-cols-3 gap-6 lg:gap-4">
            <div className="col-span-2 flex flex-row justify-between items-center gap-4">
                <div className="flex flex-row justify-start items-center gap-1">
                    <h3 className="text-sm leading-snug font-medium">Charging Zones</h3>
                    <p className="text-sm leading-snug font-medium">({zones.length})</p>
                </div>

                <SegmentedControl<Mode>
                    options={Object.values(Mode)}
                    value={mode}
                    onChange={setMode}
                    renderOption={(option) => {
                        switch (option) {
                            case Mode.Table:
                                return <IconList size="1rem" />
                            case Mode.Visual:
                                return <IconChartCohort size="1rem" />
                        }
                    }}
                />
            </div>

            <div className="col-span-2 flex flex-col justify-start gap-6">
                {mode === Mode.Table && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="w-full overflow-x-auto">
                            <table className="min-w-full text-sm text-left table-fixed">
                                <thead className="h-10 bg-gray-100 [&_th]:font-medium [&_th]:px-2 [&_th]:whitespace-nowrap">
                                    <tr>
                                        <th>Zone</th>
                                        <th>Chargers</th>
                                        <th>Power per Charger (kW)</th>
                                        <th className="text-right w-30">Total capacity</th>
                                        <th className="w-12"></th>
                                    </tr>
                                </thead>

                                <tbody className="[&_tr]:border-t [&_tr]:border-gray-200 [&_td]:p-2 [&_td]:whitespace-nowrap">
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
                                                    className="h-8! max-w-24"
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
                                                    className="h-8! max-w-24"
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
                                                {/* TODO: Handle NaN case */}
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
                                            <Button
                                                leftSection={<IconPlus />}
                                                size="xs"
                                                onClick={addZone}
                                            >
                                                Add Zone
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {mode === Mode.Visual && (
                    <div className="h-full p-4 lg:p-6 bg-gray-50 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:24px_24px] border border-gray-200 shadow-xs rounded-lg">
                        {zones.map((zone, index) => (
                            <div key={index} className="flex flex-col gap-4 mb-8 last:mb-0">
                                <div className="h-6 flex flex-row justify-between items-center gap-4">
                                    <h3 className="text-sm text-gray-600 uppercase font-medium shrink-0">
                                        Zone {index + 1}
                                    </h3>
                                    <hr className="border-gray-200 w-full shrink-1" />
                                    <div className="flex flex-row items-center nowrap gap-1">
                                        <NumberInput
                                            className="h-8! w-24 "
                                            value={zone.powerInKW}
                                            min={0}
                                            rightSection="kW"
                                            onChange={(value) =>
                                                updateZone(index, { powerInKW: value })
                                            }
                                        />

                                        <Button
                                            size="sm"
                                            color="subtle-gray"
                                            onClick={() => removeZone(index)}
                                        >
                                            <IconTrash size="1rem" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-5 md:grid-cols-12 gap-2">
                                    {Array.from({ length: zone.numberOfChargepoints }).map(
                                        (_, i) => (
                                            <button
                                                key={i}
                                                aria-label={`Delete spot ${i + 1}`}
                                                className="group w-full aspect-square bg-gray-200 border border-gray-300 flex flex-col items-center justify-center rounded-lg outline-none cursor-pointer hover:bg-gray-300 hover:border-gray-500 focus-visible:ring-3 focus-visible:border-blue-500 focus-visible:ring-blue-500/40"
                                                type="button"
                                                onClick={() => {
                                                    return updateZone(index, {
                                                        numberOfChargepoints:
                                                            zone.numberOfChargepoints - 1,
                                                    })
                                                }}
                                            >
                                                {/* TODO: Adjust icon and text-size to container width, by using container queries */}
                                                <div className="hidden group-hover:flex group-focus-visible:flex flex-col items-center nowrap">
                                                    <IconX size="1.5rem" />
                                                    <p className="text-xs text-gray-600 leading-none">
                                                        Remove
                                                    </p>
                                                </div>

                                                <div className="flex flex-row items-center nowrap gap-0.5 group-hover:hidden group-focus-visible:hidden">
                                                    <IconChargingPile
                                                        size="1.4rem"
                                                        stroke={1.5}
                                                        className="text-gray-600"
                                                    />
                                                    <p className="text-xl leading-none">{i + 1}</p>
                                                </div>
                                            </button>
                                        ),
                                    )}
                                    <button
                                        aria-label="Add Charger"
                                        className="w-full aspect-square text-gray-400 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg cursor-pointer outline-none hover:bg-gray-100 hover:border-gray-500 hover:text-black focus-visible:ring-3 focus-visible:border focus-visible:border-solid focus-visible:border-blue-500 focus-visible:ring-blue-500/40 focus-visible:text-black"
                                        type="button"
                                        onClick={() => {
                                            return updateZone(index, {
                                                numberOfChargepoints: zone.numberOfChargepoints + 1,
                                            })
                                        }}
                                    >
                                        <p className="text-xs text-center leading-[1.1]">
                                            <IconPlus size="1rem" className="inline -mt-0.5" />
                                            Add Charger
                                        </p>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="mt-2">
                            <Button leftSection={<IconPlus />} size="xs" onClick={addZone}>
                                Add Zone
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="col-span-1 flex flex-col gap-4">
                <div className="w-full flex flex-col justify-between items-start gap-2 bg-gray-100 border border-gray-200 shadow-xs p-4 rounded-md">
                    <h3 className="text-sm text-gray-600 font-medium">Total Chargers</h3>
                    <div className="flex items-center justify-start gap-1">
                        <IconPlug size="1.375rem" />
                        <p className="font-medium text-xl">
                            {zones.reduce((total, zone) => total + zone.numberOfChargepoints, 0)}
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-between items-start gap-2 border border-gray-200 shadow-xs p-4 rounded-md">
                    <h3 className="text-sm text-gray-600 font-medium">Theoretical Maximum Power</h3>

                    <div className="flex items-center justify-start gap-1">
                        <IconBolt size="1.375rem" />
                        <p className="font-medium text-xl">
                            {zones.reduce(
                                (total, zone) => total + zone.numberOfChargepoints * zone.powerInKW,
                                0,
                            )}{" "}
                            kW
                        </p>
                    </div>
                </div>

                {mode === Mode.Visual && (
                    <div className="w-full flex flex-col gap-2 border border-gray-200 shadow-xs p-4 rounded-md">
                        <h3 className="text-sm text-gray-600 font-medium">Zone Breakdown</h3>
                        <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-1 text-sm">
                            {zones.map((zone, index) => (
                                <Fragment key={index}>
                                    <p className="text-gray-600">Zone {index + 1}</p>
                                    <p className="font-medium tabular-nums text-right">
                                        {zone.numberOfChargepoints}
                                    </p>
                                    <IconX size="1em" />
                                    <p className="font-medium tabular-nums text-right">
                                        {zone.powerInKW} kW
                                    </p>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChargepointSetup
