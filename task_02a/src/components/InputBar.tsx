import { IconPencil, IconPlus, IconSwitch3, IconX } from "@tabler/icons-react"
import { useState, type ReactNode } from "react"
import Button from "./Button"

import { useConfigurationContext } from "@/features/Configuration/ConfigurationContext"
import { ConfigurationOptionList } from "@/features/Configuration/ConfigurationOptionList"
import { ConfigurationCard } from "@/features/Configuration"

const InputBar = () => {
    const [isChanging, setIsChanging] = useState<boolean>(false)
    const { configurations, activeConfiguration } = useConfigurationContext()

    return (
        <div>
            <ConfigurationCard
                configuration={activeConfiguration}
                rightSection={
                    !isChanging ? (
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
                    )
                }
            />
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
