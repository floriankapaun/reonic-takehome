import { IconPencil, IconPlus, IconSwitch3, IconX } from "@tabler/icons-react"
import { useState } from "react"
import Button from "./Button"

import {
    ConfigurationCard,
    useConfigurationContext,
    ConfigurationOptionList,
} from "@/features/Configuration"
import { Link } from "@tanstack/react-router"

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
                            <Button leftSection={<IconPlus size="1em" aria-hidden />}>Add</Button>
                            <Link
                                to="/configuration"
                                search={{ id: activeConfiguration.id }}
                                tabIndex={-1}
                            >
                                <Button leftSection={<IconPencil size="1em" aria-hidden />}>
                                    Edit
                                </Button>
                            </Link>
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
