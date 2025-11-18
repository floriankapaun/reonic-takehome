import type { Configuration } from "./ConfigurationContext"
import { ConfigurationOption } from "./ConfigurationOption"

type ConfigurationOptionListProps = {
    configurations: Configuration[]
    onSelect?: () => void
}

export const ConfigurationOptionList = ({
    configurations,
    onSelect,
}: ConfigurationOptionListProps) => {
    return (
        <div className="border border-gray-400 rounded-md divide-y divide-gray-200">
            {configurations.map((config) => (
                <div key={config.id}>
                    <ConfigurationOption configuration={config} onSelect={onSelect} />
                </div>
            ))}
        </div>
    )
}
