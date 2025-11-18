import {
    IconBatteryVerticalCharging,
    IconGauge,
    IconPencil,
    IconPercentage,
    IconPlug,
    IconPlus,
    IconSwitch3,
    IconX,
} from "@tabler/icons-react"
import { useState, type ReactNode } from "react"
import Button from "./Button"

import { useConfigurationContext } from "@/features/Configuration/ConfigurationContext"
import { ConfigurationOptionList } from "@/features/Configuration/ConfigurationOptionList"

type BadgeProps = {
    icon?: ReactNode
    label?: string
    value?: string | number
}

const Badge = ({ icon, label, value }: BadgeProps) => {
    return (
        <span className="group inline-flex flex-col items-start">
            {icon && <span className="mb-1">{icon}</span>}
            {value && <span className="leading-none">{value}</span>}
            <span className="text-xs text-gray-600">{label}</span>
        </span>
    )
}

const InputBar = () => {
    const [isChanging, setIsChanging] = useState<boolean>(false)
    const { configurations, activeConfiguration } = useConfigurationContext()

    return (
        <div>
            <div className="py-2 px-3 border border-gray-200 rounded-md">
                <div className="flex items-start justify-between">
                    <p className="mb-2.5 text-md">{activeConfiguration.name}</p>
                    <div>
                        {!isChanging ? (
                            <Button
                                leftSection={<IconSwitch3 size="1em" aria-hidden />}
                                onClick={() => setIsChanging(true)}
                            >
                                Change
                            </Button>
                        ) : (
                            <>
                                <Button
                                    leftSection={<IconPlus size="1em" aria-hidden />}
                                    onClick={() => {}}
                                >
                                    Add
                                </Button>
                                <Button
                                    leftSection={<IconPencil size="1em" aria-hidden />}
                                    onClick={() => {}}
                                >
                                    Edit
                                </Button>
                                <Button
                                    leftSection={<IconX size="1em" aria-hidden />}
                                    onClick={() => setIsChanging(false)}
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center flex-wrap justify-between gap-3 gap-y-1.5">
                    <Badge
                        label="Chargers"
                        value={activeConfiguration.numberOfChargepoints}
                        icon={<IconPlug size="1em" />}
                    />
                    <Badge
                        label="per Charger"
                        value={`${activeConfiguration.kWPerChargepoint} kW`}
                        icon={<IconGauge size="1em" />}
                    />
                    <Badge
                        label="per Car"
                        value={`${activeConfiguration.kWhPerCar} kWh`}
                        icon={<IconBatteryVerticalCharging size="1em" />}
                    />
                    <Badge
                        label="Arrival Rate"
                        value={`${activeConfiguration.arrivalProbabilityMultiplier}x`}
                        icon={<IconPercentage size="1em" />}
                    />
                </div>
            </div>
            {isChanging && (
                <ConfigurationOptionList
                    configurations={configurations}
                    onSelect={() => setIsChanging(false)}
                />
            )}
        </div>
    )
}

export default InputBar
