import { useId } from "react"

type SelectProps = {
    name?: string
    label?: string
    placeholder?: string
    description?: string
    error?: string
    options: { label: string; value: string }[]
    defaultValue?: string
} & (
    | { value?: never; onChange?: (newValue: string) => void }
    | { value: string; onChange: (newValue: string) => void }
)

const Select = ({ label, description, error, onChange, options, ...selectProps }: SelectProps) => {
    const id = useId()

    return (
        <div className="flex flex-col gap-2 w-full max-w-sm">
            {label && (
                <label htmlFor={id} className="text-sm leading-snug font-medium">
                    {label}
                </label>
            )}

            {description && <p className="text-sm text-gray-600 leading-snug">{description}</p>}

            <select
                {...selectProps}
                aria-invalid={error ? "true" : "false"}
                className="h-9 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-500/40 aria-invalid:ring-red-600/20 aria-invalid:border-red-600"
                id={id}
                onChange={(e) => onChange?.(e.target.value)}
            >
                {selectProps.placeholder && (
                    <option
                        value=""
                        disabled
                        selected={!selectProps.value && !selectProps.defaultValue}
                    >
                        {selectProps.placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    )
}

export default Select
